<script setup lang="ts">
</script>

<template>
  <main style="padding: 1rem;">
    <h1>oRPC + Vue 3 + Bun</h1>
    <nav style="display: flex; gap: 1rem; margin-top: .5rem;">
      <router-link to="/planets">
        Planets
      </router-link>
      <router-link to="/create">
        Create Planet
      </router-link>
      <router-link to="/signin">
        Sign In
      </router-link>
      <router-link to="/me">
        Me
      </router-link>
      <router-link to="/sse">
        SSE
      </router-link>
    </nav>
  </main>
</template>
