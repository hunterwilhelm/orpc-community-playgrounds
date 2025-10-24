import type { RouterClient } from '@orpc/server'
import type { AppRouter } from '../../../back/src/router'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createRouterUtils } from '@orpc/tanstack-query'

const base = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:2999'

const link = new RPCLink({
  url: `${base}/api/rpc`,
  headers: () => {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  },
})

export const client: RouterClient<AppRouter> = createORPCClient(link)
export const orpc = createRouterUtils(client)
