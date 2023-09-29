<template>
  <router-view v-if="isAuthenticated" />
  <router-view name="unauthenticated" v-else />
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthenticationManager from '../storage/AuthenticationManager'


export default {
  setup() {
    const isAuthenticated = ref(false)
    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
      const userData = AuthenticationManager.getLoggedInUser()

      if (userData !== null) {
        isAuthenticated.value = true
      } else {
        // Redirect to login route with the original intended route
        router.push({ name: 'login', query: { redirect: route.fullPath } })
      }
    })

    return { isAuthenticated }
  }
}
</script>
