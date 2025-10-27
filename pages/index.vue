<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />

    <!-- Main Content -->
    <main
      class="transition-all duration-300 w-full"
      :class="isSidebarCollapsed ? 'ml-20' : 'ml-64'"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>
