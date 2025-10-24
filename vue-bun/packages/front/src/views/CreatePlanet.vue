<script setup lang="ts">
import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { orpc } from '@/lib/orpc'

const name = ref('')
const description = ref('')

const queryClient = useQueryClient()

const { mutate, isPending, error } = useMutation(orpc.planet.create.mutationOptions({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: orpc.planet.key() })
    name.value = ''
    description.value = ''
  },
}))

function onSubmit() {
  mutate({ name: name.value, description: description.value || undefined })
}
</script>

<template>
  <main style="padding: 1rem;">
    <h2>Create Planet</h2>
    <form style="display: grid; gap: .5rem; max-width: 320px;" @submit.prevent="onSubmit">
      <input v-model="name" placeholder="Name">
      <input v-model="description" placeholder="Description">
      <button type="submit" :disabled="isPending">
        {{ isPending ? 'Creating...' : 'Create' }}
      </button>
    </form>
    <p v-if="error" style="color: tomato">
      {{ String(error) }}
    </p>
  </main>
</template>
