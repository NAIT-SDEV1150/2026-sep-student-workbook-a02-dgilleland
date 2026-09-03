# Fetch API Calls
> The material here will be covered in-class. These notes and code-snippets are supporting materials. Note that your instructor is likely to include additional material during class.
>
> The starter kit code for this is part of your **student workbook**.
>
> Topic:  Instructor guide for asynchronous browser requests with fetch, JSON Server, and DOM rendering

----

## Concepts

The previous lesson gave you a local REST-style API that we tested by making requests from a `*.http` file. This lesson moves the request into the browser so JavaScript can ask for server-side data and update the page when a response arrives.

### Asynchronous Requests

HTTP requests take time. The browser sends a request, the server works on it, and the response arrives later. JavaScript cannot treat that response as an immediate value.

This is why `fetch()` returns a promise. A promise represents work that may finish later:

- `.then()` runs when the promise resolves.
- `.catch()` runs when the promise rejects.
- `async` functions let code use `await` to pause inside the function until a promise settles.

### Fetch and JSON

The Fetch API returns a `Response` object first. That response object contains status information and methods for reading the body.

For JSON APIs, the usual flow is:

1. `fetch(endpoint)`
1. Check `response.ok`
1. Call `response.json()`
1. Render the parsed JavaScript data into the DOM

> ***Note:** Lesson Boundary*
> 
> Keep this lesson focused on GET and POST with `fetch()`. Broader CRUD interactions can wait until the next REST API lesson.


## Advanced DevTools Features

- Network Panel for checking API calls
- Application Panel for local storage, session storage, and cookies
- Lighthouse Panel for performance
- Memory Panel

----

## Demo Walkthrough

This demo runs two local processes at the same time: JSON Server for the backend API and Vite for the frontend page. The `concurrently` package lets you run both with one command.

> ***Tip:** Frequent, small commits*
> 
> Make a commit after each meaningful checkpoint so setup, fetch utilities, and app behavior remain easy to review.
>
> ```ps title="Commit Example"
> git add .
> git commit -m "Set up fetch demo"
> ```

### Starter Files

```
- demo
  - .vscode
    - extensions.json
  - css
    - styles.css
  - js
    - main.js
    - utils.js
  - public
    - earth.jpg
    - sun.jpg
    - ...
  - api-smoke-test.http
  - db.json
  - index.html
  - package.json
  - ReadMe.md
```

### Install and Run Both Servers


1. Open the `~/inclass/19/demo` folder in VS Code.

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
    "api-server": "json-server --watch db.json --port 3000",
    "dev": "concurrently -n frontend,api-server -c blue,green \"pnpm run frontend\" \"pnpm run api-server\""
  }
}
```

### Smoke-Test the API

Before writing browser JavaScript, prove that the backend API works.


1. Install the VS Code REST Client extension if VS Code recommends it.

2. Open `api-smoke-test.http`.

3. Send the all-bodies request.

    ```http title="api-smoke-test.http"
    ### GET all bodies
    GET http://localhost:3000/bodies
    Accept: application/json
    ```

4. Send the single-body request.

    ```http title="api-smoke-test.http"
    ### GET one body
    GET http://localhost:3000/bodies/1
    Accept: application/json
    ```

5. Confirm both responses return JSON.


> ***Tip:** Checkpoint*
> 
> You should know the API is healthy before debugging any `fetch()` code.
>
> ```ps title="Commit"
> git add .
> git commit -m "Smoke test bodies API"
> ```


### Build Utility Functions

Keep API details in `utils.js` so `main.js` can focus on the page behavior.


1. Create a helper that fetches JSON data.

    ```js title="js/utils.js"
    export function fetchJsonData(endpoint) {
      return fetch(endpoint)
        .then(handleResponse);
    }
    ```

2. Add a shared response handler.

    ```js title="js/utils.js"
    function handleResponse(response) {
      if (!response.ok) {
        const message = `Server responded with ${response.status} (${response.statusText}).`;
        throw new Error(message);
      }

      return response.json();
    }
    ```

3. Add a POST helper using `async` and `await`.

    ```js title="js/utils.js"
    export async function postData(endpoint, payload) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      return handleResponse(response);
    }
    ```


This deliberately shows both styles: promise chaining in `fetchJsonData()` and `async`/`await` in `postData()`.

### Build the App


1. Import the helper functions.

    ```js title="js/main.js"
    import { fetchJsonData, postData } from './utils.js';
    ```

2. Select the DOM elements and define the endpoint.

    ```js title="js/main.js"
    const loadButton = document.querySelector('#load-bodies');
    const addForm = document.querySelector('#add-body');
    const bodyList = document.querySelector('#body-list');
    const statusMessage = document.querySelector('#status-message');

    const endpoint = 'http://localhost:3000/bodies';
    ```

3. Create small rendering helpers for status text and the body list.

    ```js title="js/main.js"
    function showStatus(message, type = 'info') {
      statusMessage.textContent = message;
      statusMessage.dataset.status = type;
    }

    function renderBodies(bodies) {
      bodyList.replaceChildren();

      bodies.forEach((body) => {
        const item = document.createElement('li');

        const image = document.createElement('img');
        image.src = `http://localhost:3000/${body.image}`;
        image.alt = body.name;

        const text = document.createElement('span');
        text.textContent = `${body.name} - ${body.category} - ${body.orbitalPeriod}`;

        item.append(image, text);
        bodyList.append(item);
      });
    }
    ```

4. Add the load handler.

    ```js title="js/main.js"
    function loadHandler() {
      showStatus('Loading bodies...');
      bodyList.innerHTML = '<li>Loading...</li>';

      fetchJsonData(endpoint)
        .then((bodies) => {
          renderBodies(bodies);
          showStatus(`Loaded ${bodies.length} bodies.`, 'success');
        })
        .catch((error) => {
          bodyList.replaceChildren();
          showStatus(`Error: ${error.message}`, 'error');
        });
    }
    ```

5. Add the submit handler.

    ```js title="js/main.js"
    async function submitHandler(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const body = Object.fromEntries(formData.entries());

      try {
        await postData(endpoint, body);
        event.target.reset();
        showStatus('Body added.', 'success');
        loadHandler();
      } catch (error) {
        showStatus(`Error: ${error.message}`, 'error');
      }
    }
    ```

6. Attach the event listeners.

    ```js title="js/main.js"
    loadButton.addEventListener('click', loadHandler);
    addForm.addEventListener('submit', submitHandler);
    ```


> ***Tip:** Checkpoint*
> You should now be able to load the seed bodies and add a new body from the browser.
>
> ```ps title="Commit"
> git add .
> git commit -m "Fetch and render bodies"
> ```


### Optional Student Exercise

Extend the example by adding DELETE functionality. Add a delete button to each rendered body, create a `deleteData()` helper, and refresh the list after the server confirms the item was removed.

### Common Errors and Fixes

| Issue | Likely Cause | Fix |
| ----- | ------------ | --- |
| `Failed to fetch` | JSON Server is not running | Run `pnpm dev` and check the `api-server` output |
| CORS or module error | Page opened with `file://` | Use the Vite URL |
| Empty list | API returned an empty array | Check `db.json` and smoke-test the endpoint |
| POST returns an error | JSON body or headers are wrong | Check `Content-Type` and `JSON.stringify()` |
| Form reloads the page | Missing `preventDefault()` | Add `event.preventDefault()` in the submit handler |

## Conclusion

> **Assigned homework:** Complete the assigned homework for this class. It reinforces today's Fetch API workflow and gives fallback practice for helper functions, JSON parsing, rendering, loading states, and async/API errors.

By the end of this demo, you should understand the path from a browser event to an API request and back to a DOM update. `fetch()` starts the request, promises manage the waiting, JSON turns the response into JavaScript data, and DOM methods make that data visible to the user.
