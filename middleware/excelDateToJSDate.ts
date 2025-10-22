export async function loadXLSX() {
  const XLSX = await import('xlsx-js-style')
  return XLSX
}

export function excelDateToJSDate(serial: number): Date {
  const utcDays = Math.floor(serial - 25569);
  const utcSeconds = utcDays * 86400;
  const date = new Date(utcSeconds * 1000);

  const fractionalDay = serial - Math.floor(serial) + 0.0000001;
  let totalSeconds = Math.floor(86400 * fractionalDay);

  const seconds = totalSeconds % 60;
  totalSeconds -= seconds;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  date.setUTCHours(hours);
  date.setUTCMinutes(minutes);
  date.setUTCSeconds(seconds);

  // เพิ่มเวลา 7 ชั่วโมง เพื่อให้เป็นเวลาประเทศไทย (UTC+7)
  // date.setUTCHours(date.getUTCHours() + 7);

  return date;
}

export function formatDateToYYYYMMDD(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0') // เดือน 0-11 → +1
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}${mm}${dd}`
}

export function getThaiRegisterTime() {
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let date: Date;

  if (localTimezone === 'Asia/Bangkok') {
    // 👉 เครื่องใช้เวลาไทยอยู่แล้ว → ใช้ตรง ๆ
    date = new Date();
  } else {
    // 👉 เครื่องไม่ใช่เวลาไทย → ต้องบวก +7 ชั่วโมงจาก UTC
    const utcNow = new Date();
    const offsetMs = 7 * 60 * 60 * 1000;
    date = new Date(utcNow.getTime() + offsetMs);
  }

  // แปลงเวลาให้เป็น HHMMSS
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const TVRGTM = `${hours}${minutes}${seconds}`;        // เช่น "145230"
  const displayTime = `${hours}:${minutes}:${seconds}`; // เช่น "14:52:30"

  return { TVRGTM, displayTime };
}
