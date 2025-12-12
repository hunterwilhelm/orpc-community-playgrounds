import type { AppRouter } from '../../../back/src/router' // Import the TYPE
import type { ContractRouterClient } from '@orpc/contract'
import type { JsonifiedClient } from '@orpc/openapi-client'
import { createORPCClient } from '@orpc/client'
import { OpenAPILink } from '@orpc/openapi-client/fetch'
import { createRouterUtils } from '@orpc/tanstack-query'
import contract from '../api/contract.json' // Import the JSON

const base = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:2999'

function createClient() {
  const link = new OpenAPILink(contract, {
    url: `${base}/api`,
    fetch: (request, init) => {
      const token = localStorage.getItem('token')
      return fetch(request, {
        ...init,
        headers: {
          ...init?.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
    },
  })

  // Combine: JSON contract (runtime) + TypeScript type (compile-time)
  const client: JsonifiedClient<ContractRouterClient<AppRouter>> = createORPCClient(link)
  
  return client
}

export const client = createClient()
export const orpc = createRouterUtils(client)
