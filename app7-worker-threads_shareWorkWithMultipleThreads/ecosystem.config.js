module.exports = {
    apps: [
      {
        name: 'My Node App',
        script: './multiThreadServer.js',
        instances: '1',
        autorestart: false,
        watch: true,
        max_memory_restart: '1G',
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };