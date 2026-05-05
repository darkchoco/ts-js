# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server (auto-restarts on file changes via nodemon + tsx)
pnpm dev

# Type-check without emitting
pnpm exec tsc --noEmit
```

No test suite is configured (`test` script is a placeholder).

## Architecture

Express 5 + TypeScript server with server-side rendering via Handlebars. Data is stored in MongoDB.

**Request flow:**
`app.ts` (route handlers) → `services/post-service.ts` (DB operations) → MongoDB `posts` collection

**Key design points:**
- The MongoDB `collection` variable is module-level in `app.ts`, initialized inside `app.listen()` after the connection is established, then closed over by all route handlers.
- ESM with `"module": "nodenext"` — imports must use `.js` extensions even for `.ts` source files (e.g., `import ... from './config/handlebars-helpers.js'`).
- `tsx` is used as the runtime (not compiled output); the compiled `.js`/`.d.ts` files in the repo are build artifacts that can be ignored.
- Passwords are stored in plaintext in MongoDB and matched directly — no hashing.
- `post-service.ts` strips passwords from read results via a MongoDB projection (`password: 0, 'comments.password': 0`), except in `updatePost` which receives and re-stores the full post object.

**MongoDB connection:** `mongodb://bach:bach@localhost:27017/board` (hardcoded in `config/mongodb-connection.ts`).

**Views:** Handlebars templates under `views/` with a single layout (`views/layouts/main.handlebars`). Custom helpers (`lengthOfList`, `eq`, `dateString`) are registered in `config/handlebars-helpers.ts`.

**Pagination:** `utils/paginator.ts` computes page window metadata (10 items/page, 10-page navigation window) using lodash `range`.
