<template>
  <div class="d-flex align-center justify-center login-wrapper">
    <h1 class="page-title">Login</h1>
    <v-sheet class="mx-auto sheet">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field variant="underlined" v-model="userName" label="User Name"></v-text-field>
        <v-text-field
          variant="underlined"
          v-model="password"
          label="password"
          type="password"
        ></v-text-field>

        <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

        <div class="error-message" v-if="error">{{ error }}</div>
        <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">Don't have an account? <a href="/register">Sign Up</a></p>
      </div>
    </v-sheet>
  </div>
</template>

<script script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthenticationManager from '../../storage/AuthenticationManager'

const router = useRouter()

const userName = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  error.value = ''
  const { status, message } = await AuthenticationManager.login(userName.value, password.value)
  if (status === 'success') {
    if (message === 'admin') {
      router.push('/admin')
    } else {
      router.push('/user')
    }
  } else {
    error.value = message
  }
}
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  flex-direction: column;

  .page-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  .sheet {
    width: 300px;
  }
  .error-message {
    margin: 1rem;
    color: red;
    font-size: 1rem;
  }
  @media (min-width: 768px) {
    .sheet {
      width: 400px;
    }
  }
  @media (min-width: 1024px) {
    .sheet {
      width: 500px;
    }
  }
}
</style>
