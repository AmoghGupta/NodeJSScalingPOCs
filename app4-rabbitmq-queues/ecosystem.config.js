module.exports = {
  apps: [
    {
      name: 'Express App',
      script: 'server.js',
      instances: '2',
      log_file: 'combined.log',
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    }
  ],
};