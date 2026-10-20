const app = require('./app');
const config = require('./config');
const db = require('./db');
const { seedDatabase } = require('./db/seed');

async function startServer() {
  try {
    console.log('[Server] Initializing NLAMS Full-Stack System...');
    await db.initDatabase();
    
    // Automatically seed default baseline synthetic data if users table is empty
    const existingUsers = await db.query('SELECT count(*) as count FROM users');
    if (!existingUsers[0] || existingUsers[0].count === 0) {
      console.log('[Server] Database is empty. Seeding synthetic data...');
      await seedDatabase();
    }

    const server = app.listen(config.port, () => {
      console.log('================================================================');
      console.log(`🏛️  NLAMS Full-Stack Platform online at http://localhost:${config.port}`);
      console.log(`📖  Interactive OpenAPI / Swagger docs: http://localhost:${config.port}/api/docs`);
      console.log(`🌐  Master Unified Grid: http://localhost:${config.port}/unified-platform.html`);
      console.log(`📊  Command Dashboard: http://localhost:${config.port}/dashboard.html`);
      console.log(`⚙️   Database Engine: [${db.getActiveEngine().toUpperCase()}]`);
      console.log('================================================================');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('[Server] SIGTERM received. Shutting down gracefully.');
      server.close(() => process.exit(0));
    });

  } catch (err) {
    console.error('[Server] Fatal startup error:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
