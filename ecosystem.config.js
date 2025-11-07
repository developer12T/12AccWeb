require('dotenv').config();

module.exports = {
  apps: [
    {
      name: '12AccWeb',
      script: '.output/server/index.mjs',
      cwd: '/var/www/12AccWeb',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        // 👇 บังคับ override ค่า PORT ให้เป็น 8009
        PORT: 8009,
        NITRO_PORT: 8009,
        NITRO_HOST: '0.0.0.0',
        ...process.env
      }
    }
  ]
};
