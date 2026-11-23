# Lesson 25 Demo

This starter demo tests the neutral `<user-card>` custom element with Vitest, JSDOM, deterministic Random User API mocks, and Vitest Browser Mode.

## Run the Project

```ps
pnpm install --no-lockfile
pnpm run build
pnpm test
pnpm run test:watch
pnpm run test:browser
```

Use the tests to practice rendering a custom element, reading Shadow DOM, checking attributes and methods, listening for `follow-change`, and isolating live API data with stubs and MSW.
