<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item :prepend-avatar="Avatar" :title="userName" nav class="avatar">
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav v-if="isAdmin">
          <router-link to="/admin" class="nav-link">
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          </router-link>
          <router-link to="/admin/history" class="nav-link">
            <v-list-item
              prepend-icon="mdi-history"
              title="Tax History"
              value="TaxHistory"
            ></v-list-item>
          </router-link>
          <router-link to="/profile" class="nav-link">
            <v-list-item
              prepend-icon="mdi-account"
              title="My Account"
              value="account"
            ></v-list-item>
          </router-link>
        </v-list>

        <v-list density="compact" nav v-else>
          <router-link to="/user" class="nav-link">
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          </router-link>
          <router-link to="/profile" class="nav-link">
            <v-list-item
              prepend-icon="mdi-account"
              title="My Account"
              value="account"
            ></v-list-item>
          </router-link>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="logout">
              <template v-if="rail">
                <v-icon>mdi-logout</v-icon>
              </template>
              <template v-else>
                <span class="mr-2">
                  <v-icon>mdi-logout</v-icon>
                </span>
                Logout
              </template>
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
.avatar {
  height: 4rem;
}
.nav-link {
  text-decoration: none;
  color: inherit;
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import AuthenticationManager from '../storage/AuthenticationManager'
import Avatar from '../assets/avatar-one.png'

const drawer = ref(true)
const rail = ref(true)
const router = useRouter()

const loggedInUser = ref(AuthenticationManager.getLoggedInUser())

const userName = computed(() => {
  return `${loggedInUser.value.firstName.toUpperCase()} ${loggedInUser.value.lastName.toUpperCase()}`
})

const isAdmin = computed(() => {
  return loggedInUser.value.role === 'admin'
})

const logout = () => {
  AuthenticationManager.logout()
  router.push('/login')
}
</script>
