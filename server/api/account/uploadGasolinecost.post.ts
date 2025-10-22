import { readMultipartFormData, createError } from "h3";
import type { AccountFromExcel, ExcelAccountAll } from "~/types/Account";
import { promises as fs } from "fs";
import path from "path";
// import { sequelize } from '~/server/database/connectDBM3'
import { connectDBM3 } from "~/server/database/connectDBM3";
import { defineXTHVATModel } from "~/server/database/models/accountModel";
import {
  excelDateToJSDate,
  formatDateToYYYYMMDD,
  getThaiRegisterTime,
} from "~/middleware/excelDateToJSDate";

let gasolineTimestamps: Record<string, number> = {};

export default defineEventHandler(async (event) => {
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

  // console.log("📁 Upload:", file.filename);

  // ===== Debounce logic =====
  const now = Date.now();
  const lastUpdate = gasolineTimestamps[file.filename!] || 0;
  const ONE_MINUTE = 5 * 1000;

  if (now - lastUpdate < ONE_MINUTE) {
    throw createError({
      statusCode: 429,
      message: "❌ กรุณารออย่างน้อย 5 วินาทีก่อนอัปโหลดไฟล์เดิมอีกครั้ง",
    });
  }

  gasolineTimestamps[file.filename!] = now;

  const uploadDir = path.join(process.cwd(), "server", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  // const savePath = path.join(
  //   uploadDir,
  //   `${Date.now()}_${file.filename || "upload.xlsx"}`
  // );

  // ✍️ เขียนไฟล์ลงใน server/uploads
  // await fs.writeFile(savePath, file.data);

  const workbook = XLSX.read(file.data, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const json = XLSX.utils.sheet_to_json<AccountFromExcel>(sheet);

  let data = [];

  const today = formatDateToYYYYMMDD(new Date());
  const { TVRGTM, displayTime } = getThaiRegisterTime();

  const sequelize = await connectDBM3();
  const XTHVAT = defineXTHVATModel(sequelize);

  const InvoiceM3 = await XTHVAT.findAll({
    where: {
      TVSUNO: "L060003",
    },
  });
  const dataInvoiceM3 = InvoiceM3.map((item) => item.toJSON());

  const dataInvoiceM3List = dataInvoiceM3.flatMap((item) => item.TVSINO);

  const existInvoice = [];
  for (const item of json) {
    if (dataInvoiceM3List.map(String).includes(String(item.InvoiceNo))) {
      existInvoice.push(String(item.InvoiceNo));
    }
  }
  // console.log(existInvoice.length);
  if (existInvoice.length > 0) {
    setResponseStatus(event, 405);
    return {
      statusCode: 405,
      message: "Already in db",
      data: existInvoice,
    };
  } else {
    // เริ่ม Transaction
    const t = await sequelize.transaction();
    try {
      for (const row of json) {
        const TaxInvoiceDate = excelDateToJSDate(row.TaxInvoiceDate);
        const AccountingEntryDate = excelDateToJSDate(row.AccountingEntryDate);
        const TaxInvoiceDateStr = Number(formatDateToYYYYMMDD(TaxInvoiceDate));
        const AccountingEntryDateStr = Number(
          formatDateToYYYYMMDD(AccountingEntryDate)
        );

        const dataTran = {
          TVCONO: 410,
          TVDIVI: "OTT",
          TVYEA4: 2026,
          TVSUNO: "L060003",
          TVSINO: String(row.InvoiceNo),
          TVTXNO: String(row.InvoiceNo),
          TVACAM: Number(row.ExcludeVATAmount),
          TVVTAM: Number(row.VATAmount),
          TVVTCD: 11,
          TVVTP1: 0.0,
          TVCUCD: "",
          TVIVDT: TaxInvoiceDateStr,
          TVACDT: AccountingEntryDateStr,
          TVVONO: row.voucherNumber ?? 0,
          TVSPYN: "",
          TVSUNM: row.MerchantName.slice(0, 36),
          TVADR1: "",
          TVRGDT: Number(today),
          TVRGTM: Number(TVRGTM),
          TVLMDT: Number(today),
          TVCHNO: 1,
          TVCHID: "AC03",
          TVAIT2: row.VATBranch,
          TVVRNO: row.TaxID,
          TVVSEQ: row.BranchNumber ?? "0000",
          TVREM1: row.Location?.slice(0, 40) || "",
          TVREM2: "",
        };
        data.push(dataTran);

        // Insert ทีละตัวใน transaction เดียว
        await XTHVAT.create(dataTran, { transaction: t });
      }

      // ถ้าผ่านทุกตัว → commit
      await t.commit();
      console.log("✅ Insert ทั้งหมดสำเร็จ (Transaction committed)");
    } catch (err) {
      // ถ้ามี error → rollback ทั้งหมด
      await t.rollback();
      console.error("❌ มีข้อผิดพลาด Transaction ถูก rollback:", err);
      throw err; // ส่ง error กลับไปให้ caller รู้ด้วย
    }
    setResponseStatus(event, 200);
    return {
      statusCode: 200,
      message: "✅ Uploaded successfully!",
      data: data,
    };
  }
});
