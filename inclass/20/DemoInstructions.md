# Consuming REST API Endpoints

> The material here will be covered in-class. These notes and code-snippets are supporting materials. Note that your instructor is likely to include additional material during class.
>
> The starter kit code for this is part of your **student workbook**.
>
> Topic: Guide for guarded API calls, related REST resources, non-JSON fetches, and client-side data synthesis

----

## Concepts

The previous two lessons introduced local endpoints and basic `fetch()` calls. This lesson raises the standard for consuming an API: check that the response succeeded, check that the response body is the type the app expects, and combine data from multiple endpoints into one useful interface.

The demo is a book catalog. The backend has three REST resources:

- `books`: stable reference data for titles, years, genres, and asset paths.
- `authors`: stable reference data connected to books by `authorId`.
- `reviews`: user-generated data that you can add, edit, and delete.

The app does not mutate `books` or `authors`. Those resources behave like reference tables. The only mutable resource is `reviews`, so the UI gives you a clear boundary between reading stable data and changing user-owned data.

### Guarding Responses

The Fetch API resolves its promise when the server sends a response, even if that response is a `404` or `500`. You need to check `response.ok` before reading the body:

```js
if (!response.ok) {
  throw new Error(`${response.status} ${response.statusText}`);
}
```

You should also inspect the response header before choosing how to read the body:

```js
const contentType = response.headers.get('content-type') ?? '';
```

The body-reading method should match the response:

| Response Body | Method |
| ------------- | ------ |
| JSON API data | `response.json()` |
| Markdown or plain text | `response.text()` |
| Image or binary file | `response.blob()` |

### Static Backend Files

JSON Server can serve static files from `./public`. In this demo, the API data points to static backend assets:

- `/summaries/orbiting-javascript.md`
- `/jackets/orbiting-javascript.svg`

The frontend still uses `fetch()` for these files, but it does not call `response.json()`. Markdown is read with `response.text()` and rendered with `markdown-it`. Jacket images are read with `response.blob()`, converted with `URL.createObjectURL()`, and assigned to an image element.

### Synthesizing Endpoint Responses

Real API screens often need more than one request. A book detail screen may need the book record, the author record, the reviews for that book, a markdown summary, and an image file. `Promise.all()` lets the app start related requests together and wait until all of them finish.

Client-side joining uses ids. A book has `authorId`, so the app can find the matching author by comparing `book.authorId` to `author.id`. Reviews use `bookId`, so the app can filter reviews for the selected book.

> ***Note** Lesson Boundary*
> 
> This lesson is focused on consuming and synthesizing local endpoints. Authentication, pagination, and external API keys are outside the scope of this demo.


----

## Demo Walkthrough

This demo runs JSON Server and Vite together. JSON Server provides REST endpoints and static files. Vite serves the browser app that consumes those resources.

> ***Tip** Frequent, small commits*
> 
> Make a commit after each meaningful checkpoint so setup, guarded helpers, detail rendering, and review mutations remain easy to review.
>
> ```ps title="Commit Example"
> git add .
> git commit -m "Set up catalog API demo"
> ```


### Starter Files

<FileTree>
- demo
  - .vscode
    - extensions.json
  - css
    - styles.css
  - js
    - main.js
    - utils.js
  - public
    - jackets
      - event-loop-field-guide.svg
      - forms-fetch-futures.svg
      - orbiting-javascript.svg
    - summaries
      - event-loop-field-guide.md
      - forms-fetch-futures.md
      - orbiting-javascript.md
  - api-smoke-test.http
  - db.json
  - index.html
  - package.json
  - ReadMe.md
</FileTree>

### Install and Run the Demo


1. Open the `~/inclass/20/demo` folder in VS Code.

2. Install dependencies.

    ```ps title="Terminal"
    pnpm install
    ```

3. Start the frontend and backend together.

    ```ps title="Terminal"
    pnpm dev
    ```

4. Confirm the terminal shows both `frontend` and `api-server` output.

5. Open the Vite URL in the browser.


The important package scripts are:

```json title="package.json"
{
  "scripts": {
    "frontend": "vite",
    "api-server": "json-server --watch db.json --port 3000 --static ./public",
    "dev": "concurrently -n frontend,api-server -c blue,green \"pnpm run frontend\" \"pnpm run api-server\""
  }
}
```

### Smoke-Test API and Static Files

Before writing browser JavaScript, prove that every backend resource is reachable.


1. Open `api-smoke-test.http`.

2. Send the request for all books.

    ```http title="api-smoke-test.http"
    ### GET all books
    GET http://localhost:3000/books
    Accept: application/json
    ```

3. Send the request for all authors.

    ```http title="api-smoke-test.http"
    ### GET all authors
    GET http://localhost:3000/authors
    Accept: application/json
    ```

4. Send the request for all reviews.

    ```http title="api-smoke-test.http"
    ### GET all reviews
    GET http://localhost:3000/reviews
    Accept: application/json
    ```

5. Send one markdown request and one jacket image request.

    ```http title="api-smoke-test.http"
    ### GET one markdown summary
    GET http://localhost:3000/summaries/orbiting-javascript.md
    Accept: text/markdown

    ### GET one jacket image
    GET http://localhost:3000/jackets/orbiting-javascript.svg
    Accept: image/svg+xml
    ```


> ***Tip** Checkpoint*
> 
> You should know the REST resources and static files are healthy before debugging frontend code.
>
> ```ps title="Commit"
> git add .
> git commit -m "Smoke test catalog endpoints"
> ```


### Add a Vite Proxy for Browser Requests

The smoke test proves that JSON Server can serve the REST resources and static files. The browser app has one extra rule to deal with: **CORS**.

Even though both servers use `localhost`, these are different origins because the ports are different:

```txt
http://localhost:5173
http://localhost:3000
```

The browser allows JavaScript from `localhost:5173` to read a response from `localhost:3000` only when the backend response includes the right CORS headers. JSON Server's API routes include those headers, but in this version static files are served before JSON Server applies its CORS middleware. That means a direct REST Client request for a jacket image can work, while a browser `fetch()` for the same SVG can still fail with a CORS error.

Use Vite as the frontend development gateway. The browser will request same-origin paths from Vite, and Vite will proxy matching requests to JSON Server.


1. Create `vite.config.js` in the demo root.

    ```js title="vite.config.js"
    import { defineConfig } from 'vite';

    export default defineConfig({
      server: {
        proxy: {
          '/books': 'http://localhost:3000',
          '/authors': 'http://localhost:3000',
          '/reviews': 'http://localhost:3000',
          '/summaries': 'http://localhost:3000',
          '/jackets': 'http://localhost:3000',
        },
      },
    });
    ```

2. Stop `pnpm dev` with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

3. Restart both servers.

    ```ps title="Terminal"
    pnpm dev
    ```

4. Keep the smoke-test URLs pointed directly at JSON Server, such as `http://localhost:3000/books`.

5. In browser JavaScript, use same-origin paths such as `/books` and `/jackets/orbiting-javascript.svg`. Vite will forward those requests to JSON Server during development.


> ***Tip** Checkpoint*
> 
> You should be able to explain that REST Client is not blocked by browser CORS, but browser JavaScript is. The Vite proxy keeps browser requests same-origin while still using JSON Server as the backend.
>
> ```ps title="Commit"
> git add .
> git commit -m "Proxy backend requests through Vite"
> ```


### Build Guarded Fetch Helpers

Create separate helpers for JSON, text, blob, and JSON-sending requests. Each helper checks status and content type before reading the response body.


1. Create a small helper for response error messages.

    ```js title="js/utils.js"
    function describeResponseProblem(response, detail) {
      const message = `${response.status} ${response.statusText} from ${response.url}`;
      return detail ? `${message}. ${detail}` : message;
    }
    ```

2. Check HTTP status with `response.ok`.

    ```js title="js/utils.js"
    function assertOk(response) {
      if (!response.ok) {
        throw new Error(describeResponseProblem(response));
      }
    }
    ```

3. Check the `content-type` header before reading the body.

    ```js title="js/utils.js"
    function assertContentType(response, expectedType) {
      const contentType = response.headers.get('content-type') ?? '';

      if (!contentType.includes(expectedType)) {
        const detail = `Expected ${expectedType}, but received ${contentType || 'no content type'}`;
        throw new Error(describeResponseProblem(response, detail));
      }
    }
    ```

4. Add a JSON helper.

    ```js title="js/utils.js"
    export async function fetchJson(endpoint) {
      const response = await fetch(endpoint);

      assertOk(response);
      assertContentType(response, 'application/json');

      return response.json();
    }
    ```

5. Add text and blob helpers for non-JSON responses.

    ```js title="js/utils.js"
    export async function fetchText(endpoint, expectedType) {
      const response = await fetch(endpoint);

      assertOk(response);
      assertContentType(response, expectedType);

      return response.text();
    }

    export async function fetchBlob(endpoint, expectedType) {
      const response = await fetch(endpoint);

      assertOk(response);
      assertContentType(response, expectedType);

      return response.blob();
    }
    ```

6. Add a JSON-sending helper for POST, PATCH, and DELETE requests.

    ```js title="js/utils.js"
    export async function sendJson(endpoint, options) {
      const fetchOptions = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers ?? {}),
        },
      };

      if (options.body && typeof options.body !== 'string') {
        fetchOptions.body = JSON.stringify(options.body);
      }

      const response = await fetch(endpoint, fetchOptions);

      assertOk(response);
      assertContentType(response, 'application/json');

      return response.json();
    }
    ```

### Load and Join Catalog Data

The catalog list needs data from three endpoints. Use `Promise.all()` to start those requests together.


1. Import the helper functions and `markdown-it`.

    ```js title="js/main.js"
    import MarkdownIt from 'markdown-it';
    import { fetchBlob, fetchJson, fetchText, sendJson } from './utils.js';
    ```

2. Use same-origin paths so browser requests go through the Vite proxy.

    ```js title="js/main.js"
    const apiBase = '';

    function buildEndpoint(path) {
      return `${apiBase}${path}`;
    }
    ```

    > ***Note** Why `bookId` Is Numeric*
    >
    > JSON Server v1 stores resource `id` values as strings, so the book id is `"1"` in `db.json`. Query-string values that look numeric are treated as numbers during filtering, so `/reviews?bookId=1` looks for the number `1`.
    >
    > Since `bookId` is a normal data field on a review, this lesson stores it as a number. That keeps the filtered review endpoint simple while still giving you a useful type-awareness moment.

3. Fetch books, authors, and reviews together.

    ```js title="js/main.js"
    const [books, authors, reviews] = await Promise.all([
      fetchJson(buildEndpoint('/books')),
      fetchJson(buildEndpoint('/authors')),
      fetchJson(buildEndpoint('/reviews')),
    ]);
    ```

4. Join the responses by id.

    ```js title="js/main.js"
    function synthesizeCatalog(books, authors, reviews) {
      return books.map((book) => {
        const author = authors.find((item) => item.id === book.authorId);
        const reviewCount = reviews.filter((review) => review.bookId === Number(book.id)).length;

        return {
          ...book,
          authorName: author?.name ?? 'Unknown author',
          reviewCount,
        };
      });
    }
    ```

5. Render one catalog button per book.

    ```js title="js/main.js"
    button.dataset.bookId = book.id;
    button.setAttribute('aria-current', String(book.id === selectedBookId));
    ```


### Render the Detail View

Selecting a book synthesizes more resources: one book, one author, matching reviews, one markdown summary, and one jacket image.


1. Fetch the selected book first so the app can read its `authorId`, `summaryPath`, and `jacketPath`.

    ```js title="js/main.js"
    const book = await fetchJson(buildEndpoint(`/books/${bookId}`));
    ```

2. Start the related requests together.

    ```js title="js/main.js"
    const [author, reviews, summaryMarkdown, jacketBlob] = await Promise.all([
      fetchJson(buildEndpoint(`/authors/${book.authorId}`)),
      fetchJson(buildEndpoint(`/reviews?bookId=${Number(book.id)}`)),
      fetchText(buildEndpoint(book.summaryPath), 'text/'),
      fetchBlob(buildEndpoint(book.jacketPath), 'image/'),
    ]);
    ```

3. Render markdown with `markdown-it`.

    ```js title="js/main.js"
    const markdown = new MarkdownIt();
    summaryContent.innerHTML = markdown.render(summaryMarkdown);
    ```

4. Convert the jacket blob into an object URL.

    ```js title="js/main.js"
    jacketObjectUrl = URL.createObjectURL(jacketBlob);
    jacketImage.src = jacketObjectUrl;
    ```

5. Revoke the previous object URL before replacing it.

    ```js title="js/main.js"
    if (jacketObjectUrl) {
      URL.revokeObjectURL(jacketObjectUrl);
    }
    ```


### Optional: Toggle the CORS Fix

> ***Note** Optional Demo*
> 
> Use this section only if time allows or if you are curious about the earlier CORS warning. The main lesson works without pausing for this demonstration.


This short test shows why the Vite proxy matters for static backend files. Keep the REST resource proxies active and temporarily disable only the static-file proxies.


1. Open `vite.config.js`.

2. Temporarily comment out the `/summaries` and `/jackets` proxy entries.

    ```js title="vite.config.js"
    import { defineConfig } from 'vite';

    export default defineConfig({
      server: {
        proxy: {
          '/books': 'http://localhost:3000',
          '/authors': 'http://localhost:3000',
          '/reviews': 'http://localhost:3000',
          // '/summaries': 'http://localhost:3000',
          // '/jackets': 'http://localhost:3000',
        },
      },
    });
    ```

3. Stop `pnpm dev` with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

4. Restart both servers.

    ```ps title="Terminal"
    pnpm dev
    ```

5. Reload the app and select a book.

6. Open DevTools and check the Console or Network tab.

    JSON data may still load because `/books`, `/authors`, and `/reviews` are still proxied. The markdown summary or jacket image request can fail because those browser requests no longer have same-origin proxy coverage for the static backend files.

7. Restore the `/summaries` and `/jackets` proxy entries.

    ```js title="vite.config.js"
    import { defineConfig } from 'vite';

    export default defineConfig({
      server: {
        proxy: {
          '/books': 'http://localhost:3000',
          '/authors': 'http://localhost:3000',
          '/reviews': 'http://localhost:3000',
          '/summaries': 'http://localhost:3000',
          '/jackets': 'http://localhost:3000',
        },
      },
    });
    ```

8. Restart `pnpm dev` again.

9. Reload the app and confirm the detail view works again.


### Add, Edit, and Delete Reviews

Reviews are the only mutable resource in the app. This keeps the data model intentional: stable reference resources support a user-generated resource.


1. Convert the selected book id before adding it to the review payload.

    ```js title="js/main.js"
    review.bookId = Number(selectedBookId);
    review.rating = Number(review.rating);
    ```

2. POST a new review from the add-review form.

    ```js title="js/main.js"
    await sendJson(buildEndpoint('/reviews'), {
      method: 'POST',
      body: review,
    });
    ```

3. PATCH an existing review from an edit form.

    ```js title="js/main.js"
    await sendJson(buildEndpoint(`/reviews/${reviewId}`), {
      method: 'PATCH',
      body: reviewUpdates,
    });
    ```

4. DELETE a review from its delete button.

    ```js title="js/main.js"
    await sendJson(buildEndpoint(`/reviews/${reviewId}`), {
      method: 'DELETE',
    });
    ```

5. Reload the catalog and selected detail after each mutation so review counts and review cards stay current.


> ***Tip** Checkpoint*
> 
> You should be able to add, edit, and delete reviews without changing books or authors.
>
> ```ps title="Commit"
> git add .
> git commit -m "Manage mutable reviews"
> ```


### Common Errors and Fixes

| Issue | Likely Cause | Fix |
| ----- | ------------ | --- |
| `Failed to fetch` | JSON Server is not running | Run `pnpm dev` and check `api-server` output |
| Content-type error | The endpoint returned HTML, JSON, or a missing file instead of the expected body type | Check the URL and the static file path |
| Markdown appears as raw text | The app used `textContent` instead of `markdown.render()` output | Render markdown to HTML before assigning it |
| Jacket image does not appear | The app assigned a blob directly instead of an object URL | Use `URL.createObjectURL(jacketBlob)` |
| Review count is stale | The catalog was not reloaded after POST, PATCH, or DELETE | Reload catalog data after mutations |
| Books or authors change | The UI sent mutation requests to reference resources | Keep mutation controls limited to `reviews` |

## Conclusion

> **Assigned homework:** Complete the assigned homework to "Practice Guarded API Rendering". It reinforces today's API consumption pattern and gives fallback practice for guarded fetch helpers, joined data, detail rendering, and review request workflows.

You should finish this lesson with a stronger API consumption pattern. They should check status and content type, choose the correct body-reading method, combine endpoint responses by id, and keep mutable user data separate from stable reference data.
