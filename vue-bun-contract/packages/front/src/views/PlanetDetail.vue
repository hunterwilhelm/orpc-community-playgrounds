<script setup lang="ts">
import { orpc } from '@/lib/orpc'
import { useMutation } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = computed(() => Number(route.params.id))

const { data, mutate, isPending, isError } = useMutation(orpc.planet.find.mutationOptions({
  onSuccess: (result) => {
    data.value = result
  },
}))

// Trigger the mutation on mount
mutate({ id: id.value })
</script>

<template>
  <main style="padding: 1rem;">
    <h2>Planet Detail</h2>
    <div v-if="isPending">
      Loading...
    </div>
    <div v-else-if="isError">
      Not found
    </div>
    <div v-else-if="data">
      <h3>{{ data.name }}</h3>
      <p v-if="data.description">
        {{ data.description }}
      </p>
      <p><em>ID: {{ data.id }}</em></p>
      <p><em>Creator: {{ data.creator.name }} ({{ data.creator.email }})</em></p>
    </div>
  </main>
</template>

