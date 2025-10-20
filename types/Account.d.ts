export type ExcelAccountAll = {
  TVCONO: number;
  TVDIVI: string;
  TVYEA4: number;
  TVSUNO: string;
  TVSINO: string;
  TVTXNO: string;
  TVACAM: number;
  TVVTAM: number;
  TVVTCD: number;
  TVVTP1: string;
  TVCUCD: string;
  TVIVDT: number;
  TVACDT: number;
  TVVONO: number;
  TVSPYN: string;
  TVSUNM: string;
  TVADR1: string;
  TVRGDT: number;
  TVRGTM: number;
  TVLMDT: number;
  TVCHNO: number;
  TVCHID: string;
  TVAIT2: string;
  TVVRNO: string;
  TVVSEQ: string;
  TVREM1: string;
  TVREM2: string;
};

export type AccountFromExcel = {
  year:string,
  supplierNumber:string,
  supplierInvoice:string,
  taxInvoice:string,
  vatBranchCode:string,
  invoiceAmount:string,
  vatAmount:string,
  vatCode:string,
  voucherNumber:string,
  taxInvoiceDate:string,
  accountingDate:string,
  vatRegistration:string,
  vatBranchName:string,
  supplierNameEN:string,
  supplierNameTH:string,
  remarkLine1:string,
  remarkLine2:string
}
