// 📁 server/database/connectDB.ts

import { Sequelize, DataTypes, QueryTypes } from 'sequelize'
import mssql from 'mssql'

let sequelize: Sequelize | null = null

export const connectDBM3 = async () => {
  const config = useRuntimeConfig()

  console.log("test",config.M3_DATABASE)


  if (!sequelize) {
    sequelize = new Sequelize(
      config.M3_DATABASE,
      config.M3_USER,
      config.M3_PASSWORD,
      {
        host: config.M3_HOST,
        dialect: 'mssql',
        dialectModule: mssql,
        logging: false,
        dialectOptions: {
          options: {
            encrypt: false,
            enableArithAbort: true
          }
        }
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
