import { readMultipartFormData, createError } from "h3";
import type { AccountFromExcel, ExcelAccountAll } from "~/types/Account";
import { promises as fs } from "fs";
import path from "path";
// import { sequelize } from '~/server/database/connectDBM3'
import { connectDBM3 } from "~/server/database/connectDBM3";
import { defineXTHVATModel } from "~/server/database/models/accountModel";

export default defineEventHandler(async (event) => {
  try {
    // const XLSX = await import('xlsx-js-style')
    // const db = await connectDBM3()
    // const result = await db.query("SELECT  * FROM MGHEAD")

    const { default: XLSX } = await import("xlsx-js-style");
    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
      throw createError({ status: 400, message: "No file uploaded" });
    }

    const file = formData.find((f) => f.name === "file");
    if (!file) {
      throw createError({
        status: 400,
        message: "File not found in form-data",
      });
    }

    const uploadDir = path.join(process.cwd(), "server", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const savePath = path.join(
      uploadDir,
      `${Date.now()}_${file.filename || "upload.xlsx"}`
    );

    // ✍️ เขียนไฟล์ลงใน server/uploads
    // await fs.writeFile(savePath, file.data);

    const workbook = XLSX.read(file.data, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const json = XLSX.utils.sheet_to_json<AccountFromExcel>(sheet);

    let data = [];

    for (const row of json) {
      const dataTran = {
        TVCONO: 410,
        TVDIVI: "OTT",
        TVYEA4: '2025',
        TVSUNO: 'L010001',
        TVSINO: row.InvoiceNo,
        TVTXNO: row.InvoiceNo,
        TVACAM: row.ExcludeVATAmount,
        TVVTAM: row.VATAmount,
        TVVTCD: 11,
        TVVTP1: 7,
        TVCUCD: "",
        TVIVDT: row.TaxInvoiceDate,
        TVACDT: row.AccountingEntryDate,
        TVVONO: row.voucherNumber,
        TVSPYN: "",
        TVSUNM: row.MerchantName,
        TVADR1: "",
        TVRGDT: 20251016,
        TVRGTM: 164728,
        TVLMDT: 20251016,
        TVCHNO: 25,
        TVCHID: "AC03 ",
        TVAIT2: row.VATBranch,
        TVVRNO: row.TaxID,
        TVVSEQ: row.BranchNumber,
        TVREM1: row.Location,
        TVREM2: "",
      };
      data.push(dataTran);
    }

    // const sequelize = await connectDBM3();
    // const XTHVAT = defineXTHVATModel(sequelize);
    // const dataTest = await XTHVAT.findAll()

    // await XTHVAT.bulkCreate(data, { validate: true });

    // return {
    //   message: "✅ Uploaded successfully!",
    //   filename: file.filename,
    //   rows: json.length,
    //   preview: json.slice(0, 3),
    // }

    return {
      statusCode: 200,
      message: "✅ Uploaded successfully!",
      data: data,
    };
  } catch (err: any) {
    console.error("Upload error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: err.message || "Internal server error",
    });
  }
});
