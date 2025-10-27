<template>
  <!-- Wrapper: fixed สำหรับ desktop, overlay บน mobile -->
  <aside
    :class="[
      // ความกว้างเปลี่ยนตามสถานะ
      isOpen ? 'w-64' : 'w-20',
      // ตำแหน่งและพื้นหลัง
      'fixed top-0 left-0 h-screen bg-base-200 dark:bg-neutral-900 border-r border-base-300/60',
      // animation ความกว้างลื่น ๆ
      'transition-[width] duration-300 ease-in-out',
      // จัดวางภายใน
      'flex flex-col z-40'
    ]"
    aria-label="Sidebar"
  >
    <!-- ส่วนหัว + ปุ่ม toggle -->
    <div class="p-3 flex items-center justify-between">
      <div class="flex items-center gap-2 overflow-hidden">
        <Icon name="heroicons:squares-2x2-20-solid" class="min-w-5 h-5" />
        <span
          class="ml-1 font-semibold truncate"
          v-show="isOpen"
        >
          12Trading Account
        </span>
      </div>

      <button
        class="p-2 rounded-lg hover:bg-base-300 focus:outline-none focus:ring"
        :aria-expanded="isOpen ? 'true' : 'false'"
        :aria-label="isOpen ? 'Collapse sidebar' : 'Expand sidebar'"
        @click="toggle()"
      >
        <!-- ตัวอย่าง: ไอคอน hamburger -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- ช่องค้นหา (ซ่อนเมื่อปิด) -->
    <!-- <div class="px-3" v-show="isOpen">
      <label class="input input-bordered flex items-center gap-2">
        <Icon name="heroicons:magnifying-glass-20-solid" class="w-4 h-4 opacity-70" />
        <input type="text" placeholder="Search..." class="grow" />
      </label>
    </div> -->

    <!-- เมนู -->
    <nav class="mt-3 flex-1 overflow-y-auto">
      <ul class="px-2 space-y-1">
        <li v-for="(item, idx) in menu" :key="idx">
          <NuxtLink
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300 transition-colors"
            :class="isActive(item.to) ? 'bg-base-300 font-medium' : ''"
          >
            <Icon :name="item.icon" class="h-5 w-5 shrink-0" />

            <!-- ข้อความจะหายเมื่อ sidebar ปิด -->
            <span class="truncate" v-show="isOpen">{{ item.label }}</span>

            <!-- Badge/Count (ตัวอย่าง) -->
            <span
              v-if="isOpen && item.badge"
              class="ml-auto text-xs rounded-full px-2 py-0.5 bg-base-300"
            >
              {{ item.badge }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- footer / เวอร์ชัน -->
    <!-- <div class="p-3 text-xs text-base-content/60" v-show="isOpen">
      v1.0.0
    </div> -->
  </aside>

  <!-- Overlay สำหรับมือถือ: โชว์เฉพาะเมื่อเปิด -->
  <div
    class="fixed inset-0 bg-black/40 z-30 lg:hidden"
    v-if="isOpen && showOverlay"
    @click="close()"
    aria-hidden="true"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSidebarStore } from '~/stores/sidebar'

// ไอคอนของ Nuxt (Nuxt Icon) หรือใช้ unplugin-icons ก็ได้
// <Icon name="bi:chevron-left" /> เป็นต้น

type MenuItem = {
  label: string
  to: string
  icon: string
  badge?: number
}

const menu: MenuItem[] = [
  { label: 'Add Gasoline', to: '/addGasoline', icon: 'heroicons:home-20-solid' },
  { label: 'Orders', to: '/', icon: 'heroicons:shopping-bag-20-solid', },
  { label: 'Products', to: '/', icon: 'heroicons:archive-box-20-solid' },
  { label: 'Reports', to: '/', icon: 'heroicons:chart-bar-20-solid' },
  { label: 'Settings', to: '/', icon: 'heroicons:cog-6-tooth-20-solid' },
]

const route = useRoute()
const sidebar = useSidebarStore()
const isOpen = computed(() => sidebar.isOpen)
const toggle = () => sidebar.toggle()
const close = () => sidebar.close()

// มือถือ: แสดง overlay เมื่อจอกว้างน้อยกว่า lg
const showOverlay = computed(() => typeof window !== 'undefined'
  ? window.matchMedia('(max-width: 1023px)').matches
  : false)

const isActive = (to: string) => route.path === to
</script>

<style scoped>
/* ปรับสไตล์สกรอลล์บาร์เบา ๆ (เลือกใช้ได้) */
nav::-webkit-scrollbar {
  width: 6px;
}
nav::-webkit-scrollbar-thumb {
  border-radius: 9999px;
}
</style>
