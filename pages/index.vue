<template>
  <div v-if="isReady">
 <div class="bg-white rounded-xl shadow-lg p-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-4">ยินดีต้อนรับ</h2>
    <p class="text-gray-600 text-lg mb-8">นี่คือหน้าแรกของแอปพลิเคชัน</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in 6"
        :key="item"
        class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div class="w-12 h-12 bg-indigo-600 rounded-lg mb-4 flex items-center justify-center text-white font-bold">
          {{ item }}
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">การ์ดตัวอย่าง {{ item }}</h3>
        <p class="text-gray-600 text-sm">รายละเอียดเพิ่มเติมเกี่ยวกับการ์ดนี้</p>
      </div>
    </div>
  </div>

  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const store = useAuthStore()
const isReady = ref(false)

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  } else {
    isReady.value = true // ✅ แสดง Dashboard เมื่อมี token
  }
})

const logout = () => {
  store.logout()
  router.push('/login')
}
</script>
