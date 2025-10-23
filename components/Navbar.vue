<template>
  <div class="navbar bg-blue-800 text-white shadow-sm sticky top-0 z-10 px-4" id="navbar">
    <!-- ฝั่งซ้าย -->
    <div class="navbar-start">
      <router-link to="/" class="flex items-center">
        <img src="/logo-onetwo.png" class="h-10 mr-3" />
        <span class="text-white text-xl font-normal whitespace-nowrap">
          OneTwo Application Backend
        </span>
      </router-link>
    </div>

    <!-- ถ้าอยากมีตรงกลาง -->
    <!-- <div class="navbar-center">
      <a class="text-lg font-semibold">12AccWeb</a>
    </div> -->

    <!-- ฝั่งขวา -->
    <div class="navbar-end">
      <ul class="menu menu-horizontal px-1 items-center gap-2 right">
        <li>
          <a :href="`/admin/user/${userProfile.username}`" cl ass="hover:underline">
            {{ userProfile.fullName }}
          </a>
        </li>
        <li>
          <button
            @click="SignOut"
            class="btn btn-error btn-sm text-white flex items-center gap-2 whitespace-nowrap hover:opacity-90 transition"
          >
            <Icon icon="mdi:logout" class="h-5 w-5" />
            <span>ออกจากระบบ</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue'
// import { Icon } from '@iconify/vue'
import { useAuthStore } from '../stores/auth';
import { useRoute, useRouter } from 'vue-router'

const isUserMenuOpen = ref(false)
const userProfile = ref<{
  username: string | null
  fullName: string | null
}>({
  username: null,
  fullName: null
})
const router = useRouter()
const store = useAuthStore()

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value

};

const toggleSidebar = inject<() => void>('toggleSidebar')

const SignOut = async () => {
  store.logout()
  // console.log('ออกจากระบบสําเร็จ')
  router.push('/')
  window.location.reload();
}

onMounted(() => {
  const username = localStorage.getItem('username')
  const fullName = localStorage.getItem('fullName')
  userProfile.value.username = username
  userProfile.value.fullName = fullName
  console.log(username)
  if (toggleSidebar) toggleSidebar()
})
</script>

<style scoped>
#navbar {
  /* position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999; */
  background-color: #00569D;

}
</style>