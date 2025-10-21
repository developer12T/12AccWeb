import { DataTypes, Model, Sequelize } from "sequelize";
import { connectDBM3 } from "~/server/database/connectDBM3";

export const defineXTHVATModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "XTHVAT",

    {
      TVCONO: { type: DataTypes.INTEGER },
      TVDIVI: { type: DataTypes.STRING },
      TVYEA4: { type: DataTypes.INTEGER },
      TVSUNO: { type: DataTypes.STRING },
      TVSINO: { type: DataTypes.STRING,primaryKey: true, },
      TVTXNO: { type: DataTypes.STRING },
      TVACAM: { type: DataTypes.FLOAT },
      TVVTAM: { type: DataTypes.FLOAT },
      TVVTCD: { type: DataTypes.INTEGER },
      TVVTP1: { type: DataTypes.FLOAT },
      TVCUCD: { type: DataTypes.STRING },
      TVIVDT: { type: DataTypes.INTEGER },
      TVACDT: { type: DataTypes.INTEGER },
      TVVONO: { type: DataTypes.INTEGER },
      TVSPYN: { type: DataTypes.STRING },
      TVSUNM: { type: DataTypes.STRING },
      TVADR1: { type: DataTypes.STRING },
      TVRGDT: { type: DataTypes.INTEGER },
      TVRGTM: { type: DataTypes.INTEGER },
      TVLMDT: { type: DataTypes.INTEGER },
      TVCHNO: { type: DataTypes.INTEGER },
      TVCHID: { type: DataTypes.STRING },
      TVAIT2: { type: DataTypes.STRING },
      TVVRNO: { type: DataTypes.STRING },
      TVVSEQ: { type: DataTypes.STRING },
      TVREM1: { type: DataTypes.STRING },
      TVREM2: { type: DataTypes.STRING },
    },
    {
      tableName: "XTHVAT",
      schema: "MTHJDTA",
      timestamps: false,
      createdAt: false, // 🔒 ปิดเฉพาะ field นี้
      updatedAt: false, // 🔒 ปิดเฉพาะ field นี้
    }
  );
};
