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
        dialect: 'mssql', // Sequelize จะใช้ tedious เอง
        logging: false,
        dialectOptions: {
          options: {
            encrypt: false,
            enableArithAbort: true,
          },
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
