import 'dotenv/config';

export default {
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

        // 👇 บังคับให้ Nuxt ใช้พอร์ตนี้แน่ ๆ
        PORT: process.env.NITRO_PORT || 8009,
        NITRO_PORT: process.env.NITRO_PORT || 8009,
        NITRO_HOST: process.env.NITRO_HOST || '0.0.0.0',

        // ✅ โหลดค่าทั้งหมดจาก .env
        ...process.env
      }
    }
  ]
};
