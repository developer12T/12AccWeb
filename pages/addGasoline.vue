<template>
    <section class="min-h-screen flex flex-col items-stretch justify-center bg-gray-50 px-8">
        <div class="w-full max-w-none mx-auto bg-white rounded-xl shadow p-8">

            <!-- Header -->
            <div class="flex justify-end mb-6">
                <button @click="onExcelGuideClick"
                    class="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                    <span>📤</span>
                    <span class="text-lg font-semibold">รูปแบบไฟล์ Excel</span>
                </button>
            </div>
            <div class="text-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Upload ค่าน้ำมัน</h1>
                <p class="text-gray-500 text-sm mt-1">📤 อัปโหลดไฟล์ Excel</p>
                <p class="text-gray-500 text-sm mt-1">รองรับไฟล์ .xlsx หรือ .xls เท่านั้น</p>


            </div>

            <!-- Upload Box -->
            <div v-if="formatError === true || formatError === null">
                <div @click="openFileDialog"
                    class="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 16.5V8.25a2.25 2.25 0 012.25-2.25h4.5A2.25 2.25 0 0112 8.25v8.25m0 0l3-3m-3 3l-3-3m3 3V3" />
                    </svg>

                    <p class="text-gray-600">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือก</p>
                    <input type="file" ref="fileInput" id="excelFile" class="hidden" accept=".xlsx,.xls"
                        @change="onFileSelected" />

                </div>
            </div>
            <!-- File Info -->
            <div class="mt-6 text-center text-sm text-gray-600">
                <p>
                    ชื่อไฟล์:
                    <template v-if="!fileName">
                        <span class="text-gray-400">ยังไม่ได้เลือกไฟล์</span>
                    </template>
                    <template v-else>
                        <span class="font-medium text-gray-800">{{ fileName }}</span>
                    </template>
                </p>

                <p v-if="formatError" class="text-red-500 text-sm mt-1">
                    ❌ รูปแบบไฟล์ไม่ถูกต้อง
                </p>
            </div>


            <!-- Action Buttons -->
            <div class="flex justify-center mt-6 space-x-4">
                <button @click="clearData"
                    class="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition">
                    ยกเลิก
                </button>
                <div v-if="!formatError">
                    <button @click="handleFileUpload"
                        class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition">
                        อัปโหลด
                    </button>
                </div>
            </div>

            <!-- Preview Table -->
            <div class="mt-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-3">📋 ข้อมูลตัวอย่างจาก Excel</h2>
                <div class="overflow-x-auto border rounded-lg">
                    <table class="min-w-full text-sm text-left border-collapse">
                        <thead class="bg-gray-100 border-b">
                            <tr>
                                <th class="px-3 py-2 font-semibold text-gray-700">TaxInvoiceDate</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">AccountingEntryDate</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">TaxID</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">MerchantName</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">Location</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">BranchNumber</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">InvoiceNo</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">ExcludeVATAmount</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">VATAmount</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">VoucherNumber</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">VATBranch</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="value in dataExcel" :key="value.TaxID" class="hover:bg-gray-50">
                                <td class="px-3 py-2 border-t">{{ value.TaxInvoiceDateStr }}</td>
                                <td class="px-3 py-2 border-t">{{ value.AccountingEntryDateStr }}</td>
                                <td class="px-3 py-2 border-t">{{ value.TaxID }} </td>
                                <td class="px-3 py-2 border-t">{{ value.MerchantName?.slice(0, 36) }} </td>
                                <td class="px-3 py-2 border-t">{{ value.Location?.slice(0, 40) }} </td>
                                <td class="px-3 py-2 border-t">{{ value.BranchNumber }} </td>
                                <td class="px-3 py-2 border-t">{{ value.InvoiceNo }} </td>
                                <td class="px-3 py-2 border-t">{{ value.ExcludeVATAmount }} </td>
                                <td class="px-3 py-2 border-t">{{ value.VATAmount }} </td>
                                <td class="px-3 py-2 border-t">{{ value.VoucherNumber }} </td>
                                <td class="px-3 py-2 border-t">{{ value.VATBranch }} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import type { AccountFromExcel } from "~/types/Account";
const { default: XLSX } = await import("xlsx-js-style");
import {
    excelDateToJSDate,
    formatDateToYYYYMMDD,
    getThaiRegisterTime,
} from "~/middleware/excelDateToJSDate";
import Swal from 'sweetalert2'

const store = useAuthStore();

const selectedFile = ref<File | null>(null)
const formatError = ref<boolean | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref<string>('')
const dataExcel = ref<AccountFromExcel[] | null>(null)
const router = useRouter();


const onFileSelected = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    fileName.value = file.name

    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })

    if (!workbook.SheetNames[0]) throw new Error('❌ ไม่พบชีตในไฟล์ Excel')

    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    if (!sheet) throw new Error('❌ ไม่พบชีตในไฟล์ Excel')

    // ✅ อ่านเฉพาะ header ก่อน
    const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 })
    const headerRow = rows[0] || []

    const requiredKeys = [
        'TaxInvoiceDate',
        'AccountingEntryDate',
        'TaxID',
        'MerchantName',
        'Location',
        'BranchNumber',
        'InvoiceNo',
        'ExcludeVATAmount',
        'VATAmount',
        'VoucherNumber',
        'VATBranch'
    ] as const satisfies (keyof AccountFromExcel)[]

    const columns = headerRow.map(String)
    // console.log("columns", columns)

    if (columns.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'คอลัมน์ในไฟล์ไม่ครบ',
            text: `❌ ไม่พบคอลัมน์ในไฟล์ Excel`
        })
        clearData()
    }

    // ✅ ตรวจสอบคอลัมน์ครบไหม
    const missing = requiredKeys.filter(k => !columns.includes(k))
    if (missing.length > 0) {
        // alert(`❌ คอลัมน์ในไฟล์ไม่ครบ: ${missing.join(', ')}`)

        Swal.fire({
            icon: 'error',
            title: 'คอลัมน์ในไฟล์ไม่ครบ',
            text: `❌ คอลัมน์ในไฟล์ไม่ครบ: ${missing.join(', ')}`
        })
        clearData()
        return
    }

    formatError.value = false

    const jsonData = XLSX.utils.sheet_to_json<AccountFromExcel>(sheet)
    let typeErrors: string[] = []

    dataExcel.value = jsonData.map((item, index) => {
        if (typeof item.TaxInvoiceDate !== 'number') {
            typeErrors.push(`แถวที่ ${index + 2}: TaxInvoiceDate ไม่ถูกต้อง`)
        }
        if (typeof item.AccountingEntryDate !== 'number') {
            typeErrors.push(`แถวที่ ${index + 2}: AccountingEntryDate ไม่ถูกต้อง`)
        }

        if (typeof item.TaxID !== 'string') {
            typeErrors.push(`แถวที่ ${index + 2}: TaxID ต้องเป็นข้อความ`)
        } else if (item.TaxID.trim().length >= 16) {
            typeErrors.push(`แถวที่ ${index + 2}: TaxID ต้องมีไม่เกิน 16 ตัวอักษร`)
        }

        if (typeof item.MerchantName !== 'string') {
            typeErrors.push(`แถวที่ ${index + 2}: MerchantName ต้องเป็นข้อความ`)
        } else if (item.MerchantName.trim().length > 36) {
            typeErrors.push(`แถวที่ ${index + 2}: MerchantName ยาวเกินไป (เกิน 36 ตัวอักษร)`)
        }

        if (typeof item.Location !== 'string') {
            typeErrors.push(`แถวที่ ${index + 2}: Location ต้องเป็นข้อความ`)
        }
        // else if (item.Location.trim().length > 40) {
        //   typeErrors.push(`แถวที่ ${index + 2}: Location ยาวเกินไป (เกิน 40 ตัวอักษร)`)
        // }

        if (typeof item.BranchNumber !== 'string') {
            typeErrors.push(`แถวที่ ${index + 2}: BranchNumber ต้องเป็นข้อความ`)
        } else if (item.BranchNumber.trim().length > 5) {
            typeErrors.push(`แถวที่ ${index + 2}: BranchNumber ยาวเกินไป (เกิน 5 ตัวอักษร)`)
        }

        if (typeof item.InvoiceNo !== 'string') {
            typeErrors.push(`แถวที่ ${index + 2}: InvoiceNo ต้องเป็นข้อความ`)
        } else if (item.InvoiceNo.trim().length > 24) {
            typeErrors.push(`แถวที่ ${index + 2}: InvoiceNo ยาวเกินไป (เกิน 24 ตัวอักษร)`)
        }

        if (typeof item.ExcludeVATAmount !== 'number') {
            typeErrors.push(`แถวที่ ${index + 2}: ExcludeVATAmount ต้องเป็นตัวเลข`)
        }

        if (typeof item.VATAmount !== 'number') {
            typeErrors.push(`แถวที่ ${index + 2}: VATAmount ต้องเป็นตัวเลข`)
        }

        if (typeof item.VoucherNumber !== 'string') {
            typeErrors.push(`แถวที่ ${index + 2}: VoucherNumber ต้องเป็นข้อความ`)
        } else if (item.VoucherNumber.trim().length > 8) {
            typeErrors.push(`แถวที่ ${index + 2}: VoucherNumber ยาวเกินไป (เกิน 8 ตัวอักษร)`)
        }

        if (typeof item.VATBranch !== 'string') {
            typeErrors.push(`แถวที่ ${index + 2}: VATBranch ต้องเป็นข้อความ`)
        } else if (item.VATBranch.trim().length > 8) {
            typeErrors.push(`แถวที่ ${index + 2}: VATBranch ยาวเกินไป (เกิน 8 ตัวอักษร)`)
        }

        console.log("typeof", typeof item.TaxInvoiceDate)

        const TaxInvoiceDate = excelDateToJSDate(item.TaxInvoiceDate)
        const AccountingEntryDate = excelDateToJSDate(item.AccountingEntryDate)
        const TaxInvoiceDateStr = Number(formatDateToYYYYMMDD(TaxInvoiceDate))
        const AccountingEntryDateStr = Number(formatDateToYYYYMMDD(AccountingEntryDate))

        return {
            ...item,
            TaxInvoiceDateStr,
            AccountingEntryDateStr,
            InvoiceNo:
                item.InvoiceNo && item.InvoiceNo.toString().trim() !== ''
                    ? item.InvoiceNo.toString().trim()
                    : 'ไม่มี'
        }
    })

    // ✅ ตรวจว่ามีแถวไหน "คอลัมน์ไม่ครบ" หรือมีช่องว่าง
    const incompleteRows = dataExcel.value.filter(row => {
        return requiredKeys.some(key => {
            const value = row[key]
            return value === undefined || value === null || value.toString().trim() === ''
        })
    })

    // ✅ แจ้งเตือนถ้าพบข้อมูลไม่ครบ
    if (incompleteRows.length > 0) {

        Swal.fire({
            icon: 'error',
            title: 'ข้อมูลผิดพลาด',
            text: `⚠️ พบข้อมูลไม่ครบจำนวน ${incompleteRows.length} แถว`
        })

        clearData()
        return // ✅ หยุดการทำงานฟังก์ชันทันที
    }

    const invoices = jsonData.map(item => item.InvoiceNo).filter(Boolean) // ตัด undefined/null ออก

    // ✅ เอาเฉพาะตัวที่ซ้ำกัน
    const dupInvoice = invoices.filter((inv, i, arr) => arr.indexOf(inv) !== i)

    // ✅ เอาให้เหลือไม่ซ้ำซ้อน (เช่นถ้าซ้ำ 3 ครั้ง เอามาแค่ครั้งเดียว)
    const uniqueDupInvoice = [...new Set(dupInvoice)]

    if (uniqueDupInvoice.length > 0) {

        Swal.fire({
            icon: 'error',
            title: 'มี Invoice ซ้ำ',
            text: `⚠️ มี Invoice ซ้ำกันในไฟล์ ${uniqueDupInvoice}`
        })

        clearData()
        return // ✅ หยุดการทำงานฟังก์ชันทันที
    }

    if (typeErrors.length > 0) {
        Swal.fire({
            icon: 'error',
            title: `⚠️ พบข้อมูลที่ type ไม่ถูกต้อง (${typeErrors.length} รายการ)`,
            html: `
                    <ul style="text-align: left; max-height: 300px; overflow-y: auto; padding-left: 1.2em;">
                    ${typeErrors.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                `,
            confirmButtonText: 'ปิด',
            width: '40em',
        })
        clearData()
        return
    }

    selectedFile.value = file
    target.value = ''
    // console.log('📑 ข้อมูลจาก Excel:', jsonData)
}



const clearData = () => {
    fileName.value = ''
    dataExcel.value = []
    formatError.value = null
    const input = document.getElementById('excelFile') as HTMLInputElement
    if (input) input.value = '' // ✅ ล้างค่าของ input file
    console.log('🧹 เคลียร์ข้อมูลเรียบร้อย')
}

const openFileDialog = () => {
    fileInput.value?.click()
}

const uploadExcelFile = async (file: File) => {
    // console.log("handleFileUpload")
    const formData = new FormData()
    formData.append("file", file)

    try {
        Swal.fire({
            title: 'กำลังอัปโหลด...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
        const data = await $fetch('/api/account/uploadGasolinecost', {
            method: 'POST',
            body: formData
        })
        Swal.fire({
            icon: 'success',
            title: 'อัปโหลดสำเร็จ'
        })
    } catch (error: any) {

        const status = error?.response?.status
        const message = error?.response?._data?.message || error.message || "ไม่ทราบสาเหตุ"
        const responseData = error?.response?._data
        if (status === 405) {
            const duplicates = responseData?.data || []
            // alert(`❌ ข้อมูลซ้ำ ${duplicates.length} รายการ:\n${duplicates.join('\n')}`)
            const listHTML = (duplicates as string[])
                .map((item: string) => `<li>${item}</li>`)
                .join('')

            Swal.fire({
                icon: 'error',
                title: '⚠️ พบข้อมูลซ้ำ',
                html: `
                        <p>พบข้อมูลซ้ำจำนวน ${duplicates.length} รายการ:</p>
                        <ul style="text-align: center; max-height: 200px; overflow-y: auto;">
                        ${listHTML}
                        </ul>
                      `
            })



        } else if (status === 404) {
            // alert("⚠️ ไม่พบข้อมูลในไฟล์")
            Swal.fire({
                icon: 'error',
                title: 'ไม่พบข้อมูลในไฟล์'
            })

        } else if (status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'ข้อมูลไม่ถูกต้อง',
                text: '⚠️ ข้อมูลไม่ถูกต้อง: " + message'
            })
        }
    }

}


const handleFileUpload = () => {
    if (!selectedFile.value) {
        // alert("กรุณาเลือกไฟล์ก่อนอัปโหลด");

        Swal.fire({
            icon: 'error',
            title: 'กรุณาเลือกไฟล์ก่อนอัปโหลด'
        })

        return;
    }

    uploadExcelFile(selectedFile.value);
};

const onExcelGuideClick = () => {
    window.open('/uploads/PTTgasolineFormat.xlsx', '_blank')
}


</script>
