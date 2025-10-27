<template>
  <Header></Header>
  <div>
    <!-- ปุ่มเปิด sidebar สำหรับมือถือ -->
    <button
      class="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-base-200/90 backdrop-blur hover:bg-base-300 focus:outline-none focus:ring"
      @click="toggle()"
      aria-label="Open sidebar"
    >
      <Icon name="heroicons:bars-3-20-solid" class="h-5 w-5" />
    </button>

    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content: ขยับระยะซ้ายตามความกว้าง sidebar (เฉพาะ >= lg) -->
    <main
      :class="[
        'min-h-screen transition-[margin] duration-300',
        isOpen ? 'lg:ml-64' : 'lg:ml-20',
        'p-4 lg:p-6'
      ]"
    >
      <slot />

    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
import { computed } from 'vue'
import { useSidebarStore } from '~/stores/sidebar'

const sidebar = useSidebarStore()
const isOpen = computed(() => sidebar.isOpen)
const toggle = () => sidebar.toggle()
</script>
