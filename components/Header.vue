<template>
  <header class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- ฝั่งซ้าย -->
        <div class="text-2xl font-bold bg-white text-indigo-600 px-3 py-1 rounded-lg">
          12Trading
        </div>

        <!-- ฝั่งขวา -->
        <div class="flex items-center space-x-4">
          <!-- ปุ่มไอคอน -->
          <button @click="isSearchOpen = !isSearchOpen" class="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <IconSearch class="w-5 h-5" />
          </button>
          <div>
            {{ userProfile.username}}
          </div>



          <!-- ✅ ปุ่ม logout อยู่ขวาสุด -->
          <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            ออกจากระบบ
          </button>
        </div>
      </div>

      <div v-if="isSearchOpen" class="mt-4">
        <input v-model="searchQuery" type="text" placeholder="ค้นหา..."
          class="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isSearchOpen = ref(false)
const searchQuery = ref('')


import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const userProfile = ref<{
  username: string | null
  fullName: string | null
}>({
  username: null,
  fullName: null
})


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

  const username = localStorage.getItem('username')
  const fullName = localStorage.getItem('fullName')
  userProfile.value.username = username
  userProfile.value.fullName = fullName
})

const logout = () => {
  store.logout()
  router.push('/login')
}

</script>

<style></style>