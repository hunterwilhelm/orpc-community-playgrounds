<script setup lang="ts">
import { orpc } from '@/lib/orpc'
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('john@doe.com')
const password = ref('123456')

const router = useRouter()

const { mutate, isPending, error } = useMutation(orpc.auth.signin.mutationOptions({
  onSuccess: (data) => {
    localStorage.setItem('token', data.token)
    router.push('/me')
  },
}))

function onSubmit() {
  mutate({ email: email.value, password: password.value })
}
</script>

<template>
  <main style="padding: 1rem;">
    <h2>Sign In</h2>
    <form style="display: grid; gap: .5rem; max-width: 320px;" @submit.prevent="onSubmit">
      <input v-model="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">
      <button type="submit" :disabled="isPending">
        {{ isPending ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>
    <p v-if="error" style="color: tomato">
      {{ String(error) }}
    </p>
  </main>
</template>

