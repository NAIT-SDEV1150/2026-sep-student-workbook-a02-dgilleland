# Lesson 19 Demo: HTTP and Server-Side Endpoints

This starter demo uses JSON Server to simulate REST API endpoints from `db.json`.

## Setup

1. Install the VS Code REST Client extension:
   <https://marketplace.visualstudio.com/items?itemName=humao.rest-client>
1. Install dependencies with `pnpm install`.
1. Add JSON Server with `pnpm add -D json-server@1.0.0-beta.15`.
1. Update `package.json` so `api-server` runs `json-server --watch db.json --port 3000`.
1. Start the server with `pnpm run api-server`.
1. Add Earth's JSON data to `db.json`.
1. Test endpoints in the browser and in `requests.http`.

The starter data uses static NASA/JPL-style facts and thumbnail images from NASA/JPL and NASA mission image sources.
