<script setup lang="ts">
import { orpc } from '@/lib/orpc'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = computed(() => Number(route.params.id))

const { data, isError, isPending } = useQuery(computed(() => orpc.planet.find.queryOptions({ input: { id: id.value } })))
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
    <div v-else>
      <h3>{{ data.name }}</h3>
      <p v-if="data.description">
        {{ data.description }}
      </p>
      <p><em>ID: {{ data.id }}</em></p>
    </div>
  </main>
</template>
