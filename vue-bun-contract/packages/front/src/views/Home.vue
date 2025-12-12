<script setup lang="ts">
</script>

<template>
  <main style="padding: 1rem;">
    <h1>oRPC Contract-First + Vue 3 + Bun</h1>
    <p style="margin-top: 0.5rem; max-width: 600px;">
      This playground demonstrates a contract-first approach with oRPC, using <code>@orpc/contract</code> to define type-safe API contracts with JSON schemas and OpenAPI routing.
    </p>
    <nav style="display: flex; gap: 1rem; margin-top: 1rem;">
      <router-link to="/planets">
        Planets
      </router-link>
      <router-link to="/planets/new">
        Create Planet
      </router-link>
      <router-link to="/signin">
        Sign In
      </router-link>
      <router-link to="/me">
        Me
      </router-link>
    </nav>
  </main>
</template>

