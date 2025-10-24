<template>
  <nav class="bg-white shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between lg:justify-start">
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <IconMenu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <IconX v-else class="w-6 h-6" />
        </button>
        
        <div class="hidden lg:flex space-x-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.id"
            :to="item.path"
            class="flex items-center space-x-2 px-4 py-4 transition-all"
            :class="isActive(item.path) 
              ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' 
              : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </div>
      </div>
      
      <div v-if="isMobileMenuOpen" class="lg:hidden py-2 border-t">
        <NuxtLink
          v-for="item in navItems"
          :key="item.id"
          :to="item.path"
          @click="isMobileMenuOpen = false"
          class="flex items-center space-x-3 px-4 py-3 w-full transition-colors"
          :class="isActive(item.path)
            ? 'text-indigo-600 bg-indigo-50 font-semibold'
            : 'text-gray-600 hover:bg-gray-50'"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
const route = useRoute()
const isMobileMenuOpen = ref(false)

const navItems = [
  { id: 'home', label: 'หน้าแรก', path: '/', icon: 'IconHome' },
  { id: 'users', label: 'ผู้ใช้งาน', path: '/users', icon: 'IconUsers' },
  { id: 'documents', label: 'เอกสาร', path: '/documents', icon: 'IconFileText' },
  { id: 'settings', label: 'ตั้งค่า', path: '/settings', icon: 'IconSettings' },
]

const isActive = (path) => {
  return route.path === path
}
</script>