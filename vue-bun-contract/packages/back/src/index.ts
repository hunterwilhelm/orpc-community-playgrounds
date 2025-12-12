import { OpenAPIHandler } from '@orpc/openapi/fetch'
import { CORSPlugin } from '@orpc/server/plugins'
import { router } from './router'
import { generateContract } from './generate-contract'
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4'
import {
  experimental_SmartCoercionPlugin as SmartCoercionPlugin
} from '@orpc/json-schema'

// Generate contract JSON in development mode
if (Bun.env.NODE_ENV !== 'production') {
  try {
    generateContract()
  } catch (error) {
    console.error('❌ Failed to generate contract:', error)
  }
}

const handler = new OpenAPIHandler(router, {
  plugins: [
    new CORSPlugin(),
    // https://orpc.dev/docs/openapi/plugins/smart-coercion#smart-coercion-plugin
    new SmartCoercionPlugin({
      schemaConverters: [
        new ZodToJsonSchemaConverter(),
      ],
    })
  ],
})

Bun.serve({
  async fetch(request: Request) {
    const auth = request.headers.get('authorization')
    const token = auth?.startsWith('Bearer ') ? auth.slice('Bearer '.length) : undefined

    const user = token === 'token'
      ? { id: '1', name: 'John Doe', email: 'john@doe.com' }
      : undefined

    const { matched, response } = await handler.handle(request, {
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

console.log('🚀 Server listening on http://127.0.0.1:3399')

