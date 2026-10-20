const fs = require('fs');
const path = require('path');
const db = require('./index');

async function runMigrations() {
  console.log('[Migrate] Starting database schema migrations...');
  await db.initDatabase();

  const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Strip line comments
  const cleanSql = schemaSql
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('--')) return '';
      return line;
    })
    .join('\n');

  // Split SQL file into discrete statements
  const statements = cleanSql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const statement of statements) {
    try {
      await db.execute(statement);
    } catch (err) {
      console.error('[Migrate] Error executing statement:', err.message);
      console.error('[Migrate] Statement:', statement.substring(0, 100) + '...');
      throw err;
    }
  }

  console.log(`[Migrate] Successfully applied ${statements.length} schema statements.`);
}

if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[Migrate] Migration failed:', err);
      process.exit(1);
    });
}

module.exports = { runMigrations };
