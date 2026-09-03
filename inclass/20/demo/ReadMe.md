# Lesson 21 Demo: Consuming REST API Endpoints

This starter demo builds a book catalog from multiple local API resources.

- `books` and `authors` are read-only reference resources.
- `reviews` is the mutable user-generated resource.
- `public/summaries` and `public/jackets` are static backend assets served by JSON Server.

## Setup

Install dependencies:

```ps
pnpm install
```

Run Vite and JSON Server together:

```ps
pnpm dev
```

Use `api-smoke-test.http` with the REST Client extension to confirm the API and static files are available before writing browser code.
