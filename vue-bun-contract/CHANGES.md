# Changes from Original Implementation

This document explains what was changed to convert from the **shared contract package** approach to the **JSON contract** approach.

## Summary of Changes

### Removed
- ❌ `packages/contract/` - Entire package removed
- ❌ Contract package dependency from both backend and frontend
- ❌ Manual contract definitions with `oc` (ContractBuilder)

### Added
- ✅ `packages/back/src/schemas.ts` - Schemas moved to backend
- ✅ `packages/back/src/generate-contract.ts` - Contract generator
- ✅ `packages/front/src/api/contract.json` - Auto-generated (gitignored)
- ✅ Auto-generation on backend startup

### Modified
- 🔄 `packages/back/src/router.ts` - Now exports `appRouter()` function and `AppRouter` type
- 🔄 `packages/front/src/lib/orpc.ts` - Now imports type from backend + JSON contract
- 🔄 All package.json files - Updated dependencies

## Detailed Changes

### 1. Backend Router Pattern

**Before (with contract package):**
```typescript
import { implement } from '@orpc/server'
import { contract } from 'vue-bun-contract'

const pub = implement(contract)

export const router = {
  auth: { ... },
  planet: { ... }
}
```

**After (JSON contract):**
```typescript
// Define routes directly
export const listPlanets = pub
  .route({ method: 'GET', path: '/planets' })
  .input(...)
  .output(...)
  .handler(...)

// Export as function for contract generation
export function appRouter() {
  return {
    auth: { signup, signin, me },
    planet: { list: listPlanets, ... }
  }
}

// CRITICAL: Export the type
export type AppRouter = ReturnType<typeof appRouter>

// Export instance for server
export const router = appRouter()
```

### 2. Contract Generation

**Before:** Manual contract definitions
```typescript
// packages/contract/src/contracts.ts
export const listPlanetsContract = oc
  .route({ method: 'GET', path: '/planets' })
  .input(...)
  .output(...)
```

**After:** Auto-generated from router
```typescript
// packages/back/src/generate-contract.ts
import { minifyContractRouter } from '@orpc/contract'

export function generateContract() {
  const router = appRouter()
  const contract = minifyContractRouter(router)
  writeFileSync('../front/src/api/contract.json', JSON.stringify(contract))
}
```

### 3. Frontend Client

**Before (with contract package):**
```typescript
import { contract } from 'vue-bun-contract'
import { OpenAPILink } from '@orpc/client/fetch'

const link = new OpenAPILink({
  url: `${base}/api`,
  contract,
})

export const client: RouterClient<typeof router> = createORPCClient(link)
```

**After (JSON contract):**
```typescript
import type { AppRouter } from '../../../back/src/router' // TYPE
import type { ContractRouterClient } from '@orpc/contract'
import type { JsonifiedClient } from '@orpc/openapi-client'
import contract from '../api/contract.json' // JSON

const link = new OpenAPILink(contract, {
  url: `${base}/api`,
  fetch: (request, init) => { ... }
})

const client: JsonifiedClient<ContractRouterClient<AppRouter>> = createORPCClient(link)
```

### 4. Package Structure

**Before:**
```
packages/
  ├── contract/   # Shared schemas and contracts
  ├── back/       # Backend implementation
  └── front/      # Frontend
```

**After:**
```
packages/
  ├── back/       # Backend with schemas and routes
  └── front/      # Frontend with auto-generated contract
```

### 5. Dependencies

**Backend package.json before:**
```json
{
  "dependencies": {
    "@orpc/server": "next",
    "@orpc/openapi": "next",
    "vue-bun-contract": "workspace:*",
    "zod": "^4.1.12"
  }
}
```

**Backend package.json after:**
```json
{
  "dependencies": {
    "@orpc/server": "next",
    "@orpc/openapi": "next",
    "@orpc/contract": "next",
    "zod": "^4.1.12"
  }
}
```

**Frontend package.json before:**
```json
{
  "dependencies": {
    "@orpc/client": "next",
    "@orpc/tanstack-query": "next",
    "vue-bun-contract": "workspace:*"
  }
}
```

**Frontend package.json after:**
```json
{
  "dependencies": {
    "@orpc/client": "next",
    "@orpc/contract": "next",
    "@orpc/openapi-client": "next",
    "@orpc/tanstack-query": "next"
  }
}
```

## Benefits of New Approach

### Simpler Structure
- Fewer packages (2 instead of 3)
- Less configuration
- Easier to understand

### Auto-Generation
- Contract regenerates on server start
- Always up-to-date
- No manual sync needed

### Type Safety Maintained
- Still full end-to-end type safety
- TypeScript type imported from backend
- JSON provides runtime validation

### Better Developer Experience
- Change backend → restart → frontend gets updates
- No intermediate build steps
- TypeScript immediately shows errors

## Migration Guide

If you have an existing project using shared contracts, here's how to migrate:

### Step 1: Move Schemas to Backend
```bash
mv packages/contract/src/schemas.ts packages/back/src/
```

### Step 2: Update Router
```typescript
// Add function export and type export
export function appRouter() { return { ... } }
export type AppRouter = ReturnType<typeof appRouter>
```

### Step 3: Add Contract Generator
Create `packages/back/src/generate-contract.ts` with `minifyContractRouter`

### Step 4: Update Frontend Client
- Remove contract package import
- Add type import from backend
- Add JSON contract import
- Update client type signature

### Step 5: Update package.json Files
- Remove contract package from workspaces
- Remove contract dependency from backend/frontend
- Add `@orpc/contract` to backend
- Add `@orpc/openapi-client` to frontend

### Step 6: Reinstall Dependencies
```bash
pnpm install --no-frozen-lockfile
```

### Step 7: Delete Contract Package
```bash
rm -rf packages/contract
```

## When to Use Each Approach

### Use Shared Contract Package When:
- You want explicit contract definitions
- You need to version contracts separately
- Multiple teams work on different packages
- You want to publish contracts as a library

### Use JSON Contract When:
- You want simpler project structure
- Backend and frontend are in same repo
- You want auto-generation
- You prefer convention over configuration

## Learn More

- [README.md](./README.md) - Full documentation
- [TUTORIAL.md](./TUTORIAL.md) - In-depth explanation
- [QUICKSTART.md](./QUICKSTART.md) - Getting started

