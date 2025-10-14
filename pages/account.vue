<template>
    <section class="min-h-screen flex flex-col items-stretch justify-center bg-gray-50 px-8">
        <div class="w-full max-w-6xl mx-auto bg-white rounded-xl shadow p-8">
            <!-- Header -->
            <div class="text-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">📤 อัปโหลดไฟล์ Excel</h1>
                <p class="text-gray-500 text-sm mt-1">รองรับไฟล์ .xlsx หรือ .xls เท่านั้น</p>
            </div>

            <!-- Upload Box -->
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
                <button @click="getDataExcel"
                    class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition">
                    อัปโหลด
                </button>
            </div>

            <!-- Preview Table -->
            <div class="mt-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-3">📋 ข้อมูลตัวอย่างจาก Excel</h2>
                <div class="overflow-x-auto border rounded-lg">
                    <table class="min-w-full text-sm text-left border-collapse">
                        <thead class="bg-gray-100 border-b">
                            <tr>
                                <th class="px-3 py-2 font-semibold text-gray-700">saleCode</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">username</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">firstName</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">surName</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">password</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">tel</th>
                                <th class="px-3 py-2 font-semibold text-gray-700">area</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="value in dataExcel" :key="value.saleCode" class="hover:bg-gray-50">
                                <td class="px-3 py-2 border-t">{{ value.saleCode }}</td>
                                <td class="px-3 py-2 border-t">{{ value.username }}</td>
                                <td class="px-3 py-2 border-t">{{ value.firstName }} </td>
                                <td class="px-3 py-2 border-t">{{ value.surName }} </td>
                                <td class="px-3 py-2 border-t">{{ value.password }} </td>
                                <td class="px-3 py-2 border-t">{{ value.tel }} </td>
                                <td class="px-3 py-2 border-t">{{ value.area }} </td>
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
import type { ExcelAccount } from "~/types/Account";
const { default: XLSX } = await import("xlsx-js-style");
const store = useAuthStore();


const formatError = ref<boolean>()
const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref<string>('')
const dataExcel = ref<ExcelAccount[] | null>(null)
const router = useRouter();


const onFileSelected = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
        fileName.value = file.name

        // ✅ อ่านไฟล์แบบ binary
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data, { type: 'array' })


        if (!workbook.SheetNames[0]) {
            throw new Error('❌ ไม่พบชีตในไฟล์ Excel')
        }

        const sheet = workbook.Sheets[workbook.SheetNames[0]]

        if (!sheet) {
            throw new Error('❌ ไม่พบชีตในไฟล์ Excel')
        }

        const jsonData = XLSX.utils.sheet_to_json<ExcelAccount>(sheet)


        const requiredKeys = [
            'saleCode',
            'username',
            'firstName',
            'surName',
            'password',
            'tel',
            'area'
        ] as const satisfies (keyof ExcelAccount)[]
        const firstRow = jsonData[0]
        if (!firstRow) {
            alert('❌ ไม่พบข้อมูลแถวแรกในไฟล์ Excel')
            return
        }
        const firstRowKeys = Object.keys(firstRow)
        const missing = requiredKeys.filter(k => !firstRowKeys.includes(k))

        formatError.value = false
        if (missing.length > 0) {
            // alert(`❌ คอลัมน์ในไฟล์ไม่ครบ: ${missing.join(', ')}`)
            formatError.value = true
            dataExcel.value = []
            return
        }

        dataExcel.value = jsonData
        console.log('📑 ข้อมูลจาก Excel:', jsonData)
    }

}

const clearData = () => {
    fileName.value = ''
    dataExcel.value = []
    const input = document.getElementById('excelFile') as HTMLInputElement
    if (input) input.value = '' // ✅ ล้างค่าของ input file
    console.log('🧹 เคลียร์ข้อมูลเรียบร้อย')
}

const openFileDialog = () => {
    fileInput.value?.click()
}

const getDataExcel = async () => {
    const { data, error } = await useFetch<ExcelAccount[]>('/api/account/getGasolinecost')
    if (!error.value) {
        dataExcel.value = data.value || []
    }
}
</script>
