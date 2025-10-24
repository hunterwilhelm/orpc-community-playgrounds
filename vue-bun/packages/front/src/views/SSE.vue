<script setup lang="ts">
import { orpc } from '@/lib/orpc'
import { useQuery } from '@tanstack/vue-query'

const { data, isError, isPending } = useQuery(orpc.sse.experimental_streamedOptions())
</script>

<template>
  <main style="padding: 1rem;">
    <h2>SSE</h2>
    <div v-if="isPending">
      Connecting...
    </div>
    <div v-else-if="isError">
      Something went wrong
    </div>
    <ul v-else>
      <li v-for="(event, idx) in data" :key="idx">
        {{ event.time.toString() }}
      </li>
    </ul>
  </main>
</template>
