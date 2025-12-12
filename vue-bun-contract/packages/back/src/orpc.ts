import type { User } from './schemas'
import { ORPCError, os } from '@orpc/server'
import { dbProviderMiddleware } from './middlewares/db'

export interface ORPCContext {
  user?: User
}

// Create base orpc instance
export const pub = os
  .$context<ORPCContext>()
  .use(dbProviderMiddleware)

// Create an authenticated middleware
export const authed = pub.use(({ context, next }) => {
  if (!context.user)
    throw new ORPCError('UNAUTHORIZED')
  return next({ context: { user: context.user } })
})

