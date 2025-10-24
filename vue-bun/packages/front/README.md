# Vue + Bun + oRPC + TanStack Query Playground

This is a playground demonstrating how to build a full-stack application using Vue 3, Bun runtime, oRPC for type-safe APIs, and TanStack Query for data fetching. It showcases modern web development practices with end-to-end type safety.

## ❗️ Important Links

- 📄 [oRPC Docs](https://orpc.unnoq.com/)
- 📄 [Vue 3 Docs](https://vuejs.org/)
- 📄 [TanStack Query Docs](https://tanstack.com/query/latest)
- 📄 [Bun Docs](https://bun.sh/docs)
- 🚨 [oRPC Issues](https://github.com/unnoq/orpc/issues)
- 💬 [oRPC Discord](https://discord.gg/orpc)

## 💿 Install

This is a monorepo playground with both frontend and backend packages. Install dependencies from the root directory:

```bash
pnpm install
```

This will install dependencies for both the Vue frontend and Bun backend packages.

## ✨ Features

- 🖼️ **Modern Vue 3 Frontend**: Built with Vue 3 Composition API for reactive, component-based UI development. [Vue 3](https://vuejs.org/)
- 🚀 **Bun Runtime Backend**: Ultra-fast JavaScript runtime for the backend with built-in TypeScript support. [Bun](https://bun.sh/)
- 🔗 **End-to-End Type Safety**: oRPC provides full-stack type safety from API routes to frontend components. [oRPC](https://orpc.unnoq.com/)
- 📊 **Smart Data Fetching**: TanStack Query for powerful data synchronization, caching, and background updates. [TanStack Query](https://tanstack.com/query/latest)
- 🚦 **Client-Side Routing**: Vue Router for seamless single-page application navigation. [Vue Router](https://router.vuejs.org/)
- 💻 **TypeScript Everywhere**: Full TypeScript support across frontend and backend for type-safe development. [TypeScript](https://www.typescriptlang.org/)
- ⚡ **Fast Development**: Vite for lightning-fast development server with HMR. [Vite](https://vitejs.dev/)
- 🛠️ **Modern Tooling**: ESLint, vue-tsc, and other tools for code quality and developer experience.

This playground demonstrates how to build a modern, type-safe full-stack application with excellent developer experience.

## 💡 Usage

This section covers how to start the development servers and build your project for production.

### Starting the Development Servers

To start both the frontend and backend development servers, run from the root directory:

```bash
pnpm dev
```

This will start:

- **Frontend**: Vue development server at [http://localhost:3000](http://localhost:3000)
- **Backend**: Bun development server at [http://localhost:2999](http://localhost:2999)

The frontend will automatically connect to the backend API for data fetching.

### Building for Production

To build the frontend for production:

```bash
pnpm build
```

The backend runs directly with Bun and doesn't require a separate build step.

Once the build process is completed, your application will be ready for deployment in a production environment.

## 💪 Support oRPC Development

This playground is built with [oRPC](https://orpc.unnoq.com/), a modern RPC framework that provides end-to-end type safety. oRPC is an open source project that makes building type-safe APIs simple and enjoyable. If you're interested in supporting oRPC development, please consider:

- ⭐ [Star the oRPC repository](https://github.com/unnoq/orpc)
- 🐛 [Report issues and bugs](https://github.com/unnoq/orpc/issues)
- 💬 [Join the Discord community](https://discord.gg/orpc)
- 📖 [Contribute to documentation](https://github.com/unnoq/orpc)
- 🔧 [Submit pull requests](https://github.com/unnoq/orpc/pulls)

## 📑 License

[MIT](http://opensource.org/licenses/MIT)

This playground is part of the oRPC project.
