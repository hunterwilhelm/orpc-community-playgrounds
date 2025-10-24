import { RPCHandler } from '@orpc/server/fetch'
import { CORSPlugin } from '@orpc/server/plugins'
import { router } from './router'

const handler = new RPCHandler(router, {
  plugins: [new CORSPlugin()],
})

Bun.serve({
  async fetch(request: Request) {
    const auth = request.headers.get('authorization')
    const token = auth?.startsWith('Bearer ') ? auth.slice('Bearer '.length) : undefined

    const user = token === 'token'
      ? { id: '1', name: 'John Doe', email: 'john@doe.com' }
      : undefined

    const { matched, response } = await handler.handle(request, {
      prefix: '/rpc',
      context: { user },
    })

    if (matched) {
      return response
    }

    return new Response('Not found', { status: 404 })
  },
  port: 3399,
  hostname: '127.0.0.1',
})

console.log('Listening on http://127.0.0.1:3399')
