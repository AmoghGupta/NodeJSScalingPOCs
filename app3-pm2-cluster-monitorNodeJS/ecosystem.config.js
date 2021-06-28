module.exports = {
    apps: [
      {
        name: 'My Node App',
        script: './server.js',
        instances: 'MAX',
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
  
    deploy: {
      production: {
        user: 'node',
        host: '212.83.163.1',
        ref: 'origin/master',
        repo: 'git@github.com:repo.git',
        path: '/var/www/production',
        'post-deploy':
          'npm install && pm2 reload ecosystem.config.js --env production',
      },
    },
  };