const mysql = require('mysql2/promise');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const config = require('../config');

let pool = null;
let sqliteDb = null;
let activeEngine = 'none';

async function initDatabase() {
  const dbType = (config.db.type || 'auto').toLowerCase();

  if (dbType === 'mysql' || dbType === 'auto') {
    try {
      const testPool = mysql.createPool({
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database,
        waitForConnections: true,
        connectionLimit: config.db.connectionLimit,
        queueLimit: 0
      });

      // Quick test query to verify connection
      const [rows] = await testPool.query('SELECT 1 AS connected');
      if (rows && rows[0] && rows[0].connected === 1) {
        pool = testPool;
        activeEngine = 'mysql';
        console.log(`[DB] Successfully connected to MySQL at ${config.db.host}:${config.db.port}/${config.db.database}`);
        return { engine: 'mysql' };
      }
    } catch (err) {
      if (dbType === 'mysql') {
        console.error('[DB] Fatal: Strict MySQL mode requested, but connection failed:', err.message);
        throw err;
      }
      console.warn(`[DB] MySQL connection unavailable (${err.message}). Activating local SQLite adaptive fallback.`);
    }
  }

  // Adaptive Fallback: SQLite
  try {
    const dbDir = path.resolve(__dirname, '../../storage');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    const sqlitePath = path.join(dbDir, 'nlams_local.sqlite');
    sqliteDb = new Database(sqlitePath);
    sqliteDb.pragma('journal_mode = WAL');
    sqliteDb.pragma('foreign_keys = ON');
    activeEngine = 'sqlite';
    console.log(`[DB] Adaptive SQLite engine active at ${sqlitePath}`);
    return { engine: 'sqlite' };
  } catch (err) {
    console.error('[DB] Failed to initialize SQLite fallback:', err);
    throw err;
  }
}

// Convert MySQL SQL to SQLite syntax if running under SQLite fallback
function adaptSqlForSqlite(sql) {
  if (activeEngine !== 'sqlite') return sql;
  return sql
    .replace(/TIMESTAMP DEFAULT CURRENT_TIMESTAMP/gi, 'DATETIME DEFAULT CURRENT_TIMESTAMP')
    .replace(/INT AUTO_INCREMENT PRIMARY KEY/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT')
    .replace(/TINYINT\(1\)/gi, 'INTEGER')
    .replace(/VARCHAR\(\d+\)/gi, 'TEXT')
    .replace(/DECIMAL\(\d+,\s*\d+\)/gi, 'REAL');
}

async function query(sql, params = []) {
  if (!activeEngine || activeEngine === 'none') {
    await initDatabase();
  }

  if (activeEngine === 'mysql') {
    const [rows, fields] = await pool.query(sql, params);
    return rows;
  }

  if (activeEngine === 'sqlite') {
    const adapted = adaptSqlForSqlite(sql);
    const trimmed = adapted.trim();
    if (trimmed.toUpperCase().startsWith('SELECT') || trimmed.toUpperCase().startsWith('PRAGMA')) {
      const stmt = sqliteDb.prepare(adapted);
      return stmt.all(...params);
    } else {
      const stmt = sqliteDb.prepare(adapted);
      const info = stmt.run(...params);
      return {
        affectedRows: info.changes,
        insertId: info.lastInsertRowid
      };
    }
  }

  throw new Error('No active database engine');
}

async function execute(sql, params = []) {
  return query(sql, params);
}

async function transaction(callback) {
  if (!activeEngine || activeEngine === 'none') {
    await initDatabase();
  }

  if (activeEngine === 'mysql') {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      const txExecutor = {
        query: async (sql, params) => {
          const [rows] = await conn.query(sql, params);
          return rows;
        }
      };
      const result = await callback(txExecutor);
      await conn.commit();
      return result;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  if (activeEngine === 'sqlite') {
    sqliteDb.exec('BEGIN IMMEDIATE');
    try {
      const txExecutor = {
        query: async (sql, params) => {
          const adapted = adaptSqlForSqlite(sql);
          const trimmed = adapted.trim();
          if (trimmed.toUpperCase().startsWith('SELECT')) {
            return sqliteDb.prepare(adapted).all(...params);
          } else {
            const info = sqliteDb.prepare(adapted).run(...params);
            return { affectedRows: info.changes, insertId: info.lastInsertRowid };
          }
        }
      };
      const result = await callback(txExecutor);
      sqliteDb.exec('COMMIT');
      return result;
    } catch (err) {
      try {
        sqliteDb.exec('ROLLBACK');
      } catch (rollbackErr) {
        // Rollback error can occur if no transaction is active
      }
      throw err;
    }
  }
}

function getActiveEngine() {
  return activeEngine;
}

module.exports = {
  initDatabase,
  query,
  execute,
  transaction,
  getActiveEngine
};
