import { authed, pub } from '../orpc'
import { z } from 'zod'
import { UserSchema } from '../schemas/user'

export const signup = pub
  .route({ method: 'POST', path: '/auth/signup', summary: 'Sign up a new user', tags: ['Authentication'] })
  .input(z.object({ name: z.string(), email: z.string().email(), password: z.string() }))
  .output(UserSchema)
  .handler(async ({ input }) => ({ id: crypto.randomUUID(), email: input.email, name: input.name }))

export const signin = pub
  .route({ method: 'POST', path: '/auth/signin', summary: 'Sign in a user', tags: ['Authentication'] })
  .input(z.object({ email: z.string().email(), password: z.string() }))
  .output(z.object({ token: z.string() }))
  .handler(async () => ({ token: 'token' }))

export const me = authed
  .route({ method: 'GET', path: '/auth/me', summary: 'Get the current user', tags: ['Authentication'] })
  .output(UserSchema)
  .handler(async ({ context }) => context.user!)
