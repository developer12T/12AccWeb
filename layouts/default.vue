<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <navbar></navbar>
    <!-- <header class="bg-blue-600 text-white p-4 shadow"> -->
      <!-- <h1 class="text-lg font-semibold">12AccWeb</h1> -->
    <!-- </header> -->

    <!-- Content -->
    <main class="flex-1 p-6">
      <slot />
    </main>

    <!-- Footer -->
    <!-- <footer class="bg-gray-200 text-center py-3 text-sm"> -->
      <!-- © 2025 F-Plus Co., Ltd. -->
    <!-- </footer> -->
  </div>
</template>
