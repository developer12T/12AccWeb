import { Sequelize, DataTypes, QueryTypes } from 'sequelize'

let sequelize: Sequelize | null = null

export const connectDBM3 = async () => {
  const config = useRuntimeConfig()

  if (!sequelize) {
    sequelize = new Sequelize(
      config.M3_DATABASE,
      config.M3_USER,
      config.M3_PASSWORD,
      {
        host: config.M3_HOST,
        dialect: 'mssql',
        logging: false,
        dialectOptions: {
          options: {
            encrypt: false,
            enableArithAbort: true,

            // ✅ เพิ่ม timeout ให้รอนานขึ้น (หน่วยเป็นมิลลิวินาที)
            requestTimeout: 60000, // 60 วินาที
          },
        },
        pool: {
          // ✅ จัดการ connection pool ให้เหมาะกับ workload
          max: 10,          // สูงสุด 10 connection พร้อมกัน
          min: 0,           // ปล่อย connection ได้หมดถ้า idle
          acquire: 60000,   // รอ connection จาก pool สูงสุด 60 วินาที
          idle: 10000,      // ปล่อย connection ที่ไม่ใช้ภายใน 10 วินาที
        },
      }
    )

    try {
      await sequelize.authenticate()
      console.log('✅ DB connected successfully')
    } catch (error) {
      console.error('❌ DB connection failed:', error)
      throw error
    }
  }

  return sequelize
}

export { DataTypes, QueryTypes }
