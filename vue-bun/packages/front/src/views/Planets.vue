<script setup lang="ts">
import { orpc } from '@/lib/orpc'
import { useQuery } from '@tanstack/vue-query'

const { data, isError, isPending } = useQuery(orpc.planet.list.queryOptions())
</script>

<template>
  <main style="padding: 1rem;">
    <h2>Planets</h2>
    <div v-if="isPending">
      Loading...
    </div>
    <div v-else-if="isError">
      Something went wrong
    </div>
    <ul v-else>
      <li v-for="planet in data" :key="planet.id">
        <router-link :to="`/planets/${planet.id}`">
          {{ planet.name }}
        </router-link>
      </li>
    </ul>
  </main>
</template>
