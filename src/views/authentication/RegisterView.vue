<template>
  <div class="d-flex align-center justify-center register-wrapper">
    <h1 class="page-title">Register</h1>
    <v-sheet class="mx-auto sheet">
      <v-form fast-fail @submit.prevent="register">
        <v-text-field variant="underlined" v-model="userName" label="User Name"></v-text-field>
        <v-text-field variant="underlined" v-model="firstName" label="First Name"></v-text-field>
        <v-text-field variant="underlined" v-model="lastName" label="Last Name"></v-text-field>
        <v-text-field
          variant="underlined"
          v-model="phoneNumber"
          label="Phone Number"
        ></v-text-field>
        <v-text-field variant="underlined" v-model="address" label="Address"></v-text-field>
        <v-text-field
          variant="underlined"
          v-model="password"
          label="password"
          type="password"
        ></v-text-field>
        <div class="error-message" v-if="error">{{ error }}</div>
        <v-btn type="submit" color="primary" block class="mt-2">Register</v-btn>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">If you have an account? <a href="/login">Login</a></p>
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
const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref('')
const address = ref('')
const password = ref('')
const error = ref('')

const register = async () => {
  error.value = ''

  const { status, message } = await AuthenticationManager.signup(
    userName.value,
    password.value,
    firstName.value,
    lastName.value,
    phoneNumber.value,
    address.value
  )
  if (status === 'success') {
    router.push('/user')
  } else {
    error.value = message
    // Handle login error, display error message
    console.error('Register failed:', message)
  }
}
</script>

<style scoped>
.register-wrapper {
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
