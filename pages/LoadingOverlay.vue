<template>
    <div v-if="show" class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
        <div class="bg-white/90 rounded-xl shadow-lg px-8 py-6 flex flex-col items-center gap-3">
            <svg class="animate-spin h-10 w-10 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span class="font-bold text-lg text-blue-500">{{ text }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    text: {
        type: String,
        default: 'กำลังโหลดข้อมูล...'
    }
})
</script>
