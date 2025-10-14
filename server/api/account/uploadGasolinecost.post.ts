import { readMultipartFormData, createError } from "h3";
import type { ExcelAccount } from '~/types/Account'
// import * as XLSX from 'xlsx'

export default defineEventHandler(async (event) => {
  try {
    // const XLSX = await import('xlsx-js-style')
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

    const workbook = XLSX.read(file.data, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];



    const json = XLSX.utils.sheet_to_json<ExcelAccount>(sheet);


    for (const row of json) {
        console.log(row.surName)
    }

    return {
      message: "✅ Uploaded successfully!",
      filename: file.filename,
      rows: json.length,
      preview: json.slice(0, 3),
    };
  } catch (err: any) {
    console.error("Upload error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: err.message || "Internal server error",
    });
  }
});
