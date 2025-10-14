import { defineStore } from 'pinia'
import type { LoginResponse } from "~/types/User";
export const useAuthStore = defineStore('auth', {
  state: () => ({
    validateLogin: null as string | null,
    statusCode: 0,
    username: '',
    fullName: '',
    role: '',
    token: ''
  }),

  getters: {
    isLoggedIn: state => !!state.token
  },

  actions: {
    async login(userLogin: string, passwordLogin: string) {
      try {
        // ✅ ใช้ $fetch แทน axios
        const response = await $fetch<LoginResponse>('/api/cash/login', {
          baseURL: import.meta.env.VITE_API_URL, // 🔸 ใช้จาก .env
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-channel': 'cash'
          },
          body: {
            username: userLogin,
            password: passwordLogin
          }
        })

        // ✅ response จะเป็น object อยู่แล้ว (ไม่ต้อง .data)
        const result = response.data?.[0]
        console.log('result', result)

        if (result) {
          this.username = result.username
          this.fullName = result.fullName
          this.role = result.role
          this.token = result.token

          localStorage.setItem('username', this.username)
          localStorage.setItem('fullName', this.fullName)
          localStorage.setItem('role', this.role)
          localStorage.setItem('token', this.token)

          this.statusCode = response.status || 200
        } else {
          this.validateLogin = 'ไม่พบข้อมูลผู้ใช้'
          this.logout()
        }

      } catch (error: any) {
        console.error('❌ login error:', error)
        this.validateLogin = error?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
      }
    },

    logout() {
      this.username = ''
      this.fullName = ''
      this.role = ''
      this.token = ''
      localStorage.clear()
    }
  }
})
