<template>
  <div v-if="isReady">
    <div class="h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 class="text-3xl font-bold mb-4">ยินดีต้อนรับสู่ Dashboard 🎉</h1>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">ออกจากระบบ</button>
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
