# Contributing

Thanks for wanting to show off oRPC! This repo is just a collection of minimal examples across different stacks.

## What to contribute

- **New playgrounds** — the main thing (React, Svelte, Next, Nuxt, Deno, whatever)
- **Fixes** — bugs, outdated deps, better docs
- **Improvements** — make existing playgrounds clearer or easier to run

## Adding a playground

**Structure:**
```
your-playground/
├── README.md          # install + dev steps, what ports to open
├── package.json       # with a "dev" script that starts everything
└── src/               # your code
```

**What to include:**
- A simple oRPC router with 2-3 procedures (query, mutation, maybe auth)
- A client that calls them and shows the results
- Clear instructions to get it running

**What to skip:**
- Extra features unrelated to oRPC
- Heavy tooling or generators
- Production polish — this is a demo

**Key rule:** `pnpm install && pnpm dev` should just work.

## Guidelines

- One playground per folder at the repo root
- Keep it minimal — we want people to understand it quickly
- Name folders descriptively: `react-node`, `svelte-bun`, etc.
- Make sure it builds without errors
- Use `pnpm` unless you really need something else

## Submitting

1. Fork and create a branch
2. Add your playground
3. Test that dev command works
4. Open a PR (one playground per PR)
5. Add a screenshot or GIF if it helps

We're looking for:
- Does it run?
- Is it clear how oRPC is being used?
- Is the code easy to follow?

## License

By contributing, you agree your code is MIT licensed.

## Questions?

Not sure about something? Open a discussion or draft PR. We're friendly.


