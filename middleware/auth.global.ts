export default defineNuxtRouteMiddleware((to, from) => {
  // 👇 กันไม่ให้รันฝั่ง server
  if (typeof window === 'undefined') return

  const token = localStorage.getItem('token')

  // ❌ ยังไม่ login → ไปหน้า login
  if (!token && to.path !== '/login') {
    return navigateTo('/login')
  }

  // ✅ login แล้วแต่เปิด /login → กลับ /
  if (token && to.path === '/login') {
    return navigateTo('/')
  }
})
