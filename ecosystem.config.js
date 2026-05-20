module.exports = {
  apps: [
    {
      name: 'prajavarta',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/prajavarta',

      // Run 2 instances (adjust to number of CPU cores - 1)
      instances: 2,
      exec_mode: 'cluster',

      // Auto-restart if app crashes
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',

      // Environment — production values come from the actual .env file on server
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      // Log files
      error_file: '/var/log/prajavarta/error.log',
      out_file:   '/var/log/prajavarta/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',

      // Graceful reload — wait for existing requests to finish
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
    },
  ],
}
