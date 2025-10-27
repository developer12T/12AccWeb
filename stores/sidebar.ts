import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  // อ่านค่าจาก localStorage ครั้งแรก (default: true = เปิด)
  const initial = typeof window !== 'undefined'
    ? window.localStorage.getItem('sidebar:isOpen')
    : null
  const isOpen = ref(initial ? JSON.parse(initial) as boolean : true)

  const open = () => { isOpen.value = true }
  const close = () => { isOpen.value = false }
  const toggle = () => { isOpen.value = !isOpen.value }

  // บันทึกลง localStorage เมื่อเปลี่ยน
  if (typeof window !== 'undefined') {
    watch(isOpen, (v) => {
      window.localStorage.setItem('sidebar:isOpen', JSON.stringify(v))
    }, { immediate: true })
  }

  return { isOpen, open, close, toggle }
})
