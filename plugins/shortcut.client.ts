import { useSidebarStore } from '~/stores/sidebar'

export default defineNuxtPlugin(() => {
  if (process.client) {
    window.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + B
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        const s = useSidebarStore()
        s.toggle()
      }
    })
  }
})