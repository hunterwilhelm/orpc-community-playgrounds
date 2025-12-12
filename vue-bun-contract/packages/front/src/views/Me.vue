<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { orpc } from '@/lib/orpc'

const { data, isError, isPending } = useQuery(orpc.auth.me.queryOptions())

function signout() {
  localStorage.removeItem('token')
  location.reload()
}
</script>

<template>
  <main style="padding: 1rem;">
    <h2>Me</h2>
    <div style="margin-bottom: .5rem;">
      <button @click="signout">
        Sign Out
      </button>
    </div>
    <div v-if="isPending">
      Loading...
    </div>
    <div v-else-if="isError">
      Unauthorized
    </div>
    <div v-else>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </main>
</template>

