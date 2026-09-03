# HTTP and Server-Side Endpoints
> The material here will be covered in-class. These notes and code-snippets are supporting materials. Note that your instructor is likely to include additional material during class.
>
> The starter kit code for this is part of your **student workbook**.
>
> Topic:  Instructor guide for local REST endpoints, JSON Server, browser requests, and REST Client testing

----

## Lecture

This lesson gives you a local API they can control before they start writing `fetch()` calls in the next lesson. The goal is to understand what an endpoint is, how a REST-style API organizes data, and how request methods change what happens on the server.

### Useful Acronyms

- **HTTP**: HyperText Transfer Protocol
- **API**: Application Programming Interface
- **REST**: Representational State Transfer
- **JSON**: JavaScript Object Notation
- **URL**: Uniform Resource Locator
- **URI**: Uniform Resource Identifier

### JSON and JavaScript Object Literals

JSON looks a lot like JavaScript object literal syntax, but it is a data format, not JavaScript code. That matters because API responses and `db.json` files need to be valid JSON before JavaScript can work with them.

Key JSON characteristics:

- Data is stored as name/value pairs.
- Property names must use double quotes.
- String values must use double quotes.
- JSON supports objects, arrays, strings, numbers, booleans, and `null`.
- JSON does not allow comments, trailing commas, functions, variables, or expressions.

> ***Tip:** Upcoming Lesson*
> 
> JSON is compatible with JavaScript, and in an upcoming lesson we'll discover the `JSON` object in JavaScript and its `.stringify()` and `.parse()` methods. For now, we're just looking at "backend" endpoints that can server JSON data.



Compare these two examples:

```js title="JavaScript object literal"
const body = {
  name: "Earth",
  category: "planet",
  orbitalPeriod: `${365.25} Earth days`,
};
```

```json title="JSON"
{
  "name": "Earth",
  "category": "planet",
  "orbitalPeriod": "365.25 Earth days"
}
```

The JavaScript object literal belongs inside a `.js` file and can use JavaScript features. The JSON example belongs in a `.json` file or an API response and must stay plain data.

An **endpoint** is a URL that acts as an exchange point for data. A front-end application can request data from an endpoint, send new data to an endpoint, update existing data, or delete data.

### Localhost and Ports

JSON Server runs on the student's computer. The hostname `localhost` points back to that same computer, and the port identifies which local server should receive the request.

For this lesson, the API server runs at:

```txt
http://localhost:3000
```

The `bodies` resource is available at:

```txt
http://localhost:3000/bodies
```

### REST and Data Operations

REST-style APIs commonly map HTTP methods to data operations:

| Method | Common Use | Example |
| ------ | ---------- | ------- |
| GET | Read data | Get all bodies |
| POST | Add data | Create a new body |
| PUT | Replace data | Replace one body |
| PATCH | Edit data | Update one field |
| DELETE | Delete data | Remove one body |

> ***Note:** Lesson Boundary*
> 
> Keep this demo focused on endpoints and request testing. The next lesson introduces browser JavaScript with the Fetch API.



----

## Demo Walkthrough

This demo uses JSON Server to turn a local `db.json` file into REST-style endpoints. You will test the endpoints in the browser, inspect browser requests in DevTools, and send non-GET requests with the REST Client extension for VS Code.

> ***Tip:** Frequent, small commits*
> 
> Make a commit after each meaningful checkpoint so setup, endpoint inspection, and REST Client testing remain easy to review.
> 
> ```ps title="Commit Example"
> git add .
> git commit -m "Set up JSON Server"
> ```



### Starter Files

<FileTree>
- demo
  - .vscode
    - extensions.json
  - assets
    - send-request.png
  - public
    - ceres.jpg
    - earth.jpg
    - eris.jpg
    - haumea.jpg
    - jupiter.jpg
    - makemake.jpg
    - mars.jpg
    - mercury.jpg
    - neptune.jpg
    - pluto.jpg
    - saturn.jpg
    - sun.jpg
    - uranus.jpg
    - venus.jpg
  - db.json
  - package.json
  - ReadMe.md
  - requests.http
</FileTree>

### Install the REST Client Extension

You should install the VS Code REST Client extension before working with `requests.http`:

```txt
https://marketplace.visualstudio.com/items?itemName=humao.rest-client
```

VS Code will also recommend the extension from `.vscode/extensions.json` when you open the demo folder.

### Project Setup


1. Open the `~/inclass/18/demo` folder in VS Code.

2. Install the project dependencies.

    ```ps title="Terminal"
    pnpm install
    ```

3. Install JSON Server as a development dependency if it is not already listed.

    ```ps title="Terminal"
    pnpm add -D -E json-server@1.0.0-beta.15
    ```

4. Add the API server script to `package.json`.

    ```diff lang="json" title="package.json"
        "scripts": {
    +     "api-server": "json-server --watch db.json --port 3000",
          "test": "echo \"Error: no test specified\" && exit 1"
        },
    ```

5. Start the local API server.

    ```ps title="Terminal"
    pnpm run api-server
    ```

    The terminal should show JSON Server routes for the `bodies` resource.


    ```ps title="VS Code Terminal" "http://localhost:3000/bodies"
    JSON Server started on PORT :3000
    Press CTRL-C to stop
    Watching db.json...

    (˶ᵔ ᵕ ᵔ˶)

    Index:
    http://localhost:3000/

    Static files:
    Serving ./public directory if it exists

    Endpoints:
    http://localhost:3000/bodies
    ```


> ***Tip:** Checkpoint*
> 
> ```ps title="Commit"
> git add .
> git commit -m "Set up local API server"
> ```



### Review the Database File

The starter `db.json` uses one `bodies` collection. JSON Server turns that collection into endpoints.

The file already contains a static local snapshot based on NASA/JPL-style facts for the Sun, most planets, and the currently recognized dwarf planets. Each object also includes an image filename for a same-size thumbnail in the `public` folder.[^jpl-credit] Earth is intentionally missing so you can add one complete object without spending the lesson typing a long dataset.

```json title="db.json"
{
  "bodies": [
    {
      "id": "1",
      "name": "Sun",
      "category": "star",
      "image": "sun.jpg",
      "description": "The star at the center of our solar system.",
      "nameOrigin": "Comes from Old English words for the Sun.",
      "mass": "1.989 x 10^30 kg",
      "radius": "695,700 km",
      "orbitalPeriod": "Not applicable",
      "discoveryDate": "Known since antiquity"
    },
    {
      "id": "2",
      "name": "Mercury",
      "category": "planet",
      "image": "mercury.jpg",
      "description": "The smallest planet and the closest planet to the Sun.",
      "nameOrigin": "Named for the swift Roman messenger god.",
      "mass": "3.301 x 10^23 kg",
      "radius": "2,440 km",
      "orbitalPeriod": "88 Earth days",
      "discoveryDate": "Known since antiquity"
    },
    {
      "id": "3",
      "name": "Venus",
      "category": "planet",
      "image": "venus.jpg",
      "description": "A rocky planet with a thick atmosphere and extremely hot surface.",
      "nameOrigin": "Named for the Roman goddess of love and beauty.",
      "mass": "4.867 x 10^24 kg",
      "radius": "6,052 km",
      "orbitalPeriod": "224.7 Earth days",
      "discoveryDate": "Known since antiquity"
    }
  ]
}
```

Point out that the real starter file contains more objects than this excerpt. The important pattern is that `bodies` is an array and each body is one JSON object inside that array.

### Test GET Requests in the Browser

The browser sends a GET request when you visit a URL.


1. Open the all-bodies endpoint in the browser.

    ```txt
    http://localhost:3000/bodies
    ```

2. Open the single-body endpoint in the browser.

    ```txt
    http://localhost:3000/bodies/1
    ```

3. Open DevTools and switch to the Network tab.

4. Reload the endpoint page.

5. Inspect the request method, URL, response status, response headers, and JSON response body.


> ***Tip:** Checkpoint*
> 
> You should be able to explain that typing the endpoint URL in the browser creates a GET request.
> 
> ```ps title="Commit"
> git add .
> git commit -m "Inspect browser GET requests"
> ```



### Test Requests with REST Client

Use `requests.http` for methods the browser address bar cannot send directly.

The extension adds a **Send Request** command above each request block:

import sendRequest from './180/send-request.png';

> <Image src={sendRequest} alt="Send Request command in REST Client" />


1. Open `requests.http`.

2. Send the GET all-bodies request.

    ```http title="requests.http"
    ### GET all bodies
    GET http://localhost:3000/bodies
    Accept: application/json
    ```

3. Send a PATCH request to update part of a body.

    ```http title="requests.http"
    ### PATCH update a body
    PATCH http://localhost:3000/bodies/2
    Content-Type: application/json

    {
      "description": "The smallest planet, the closest planet to the Sun, and the fastest planet in its orbit."
    }
    ```

4. Send a POST request to create a new body.

    ```http title="requests.http"
    ### POST new body
    POST http://localhost:3000/bodies
    Content-Type: application/json

    {
      "name": "Proxima Centauri",
      "category": "star",
      "image": "sun.jpg",
      "description": "The closest known star to the Sun.",
      "nameOrigin": "The name means nearest star of Centaurus.",
      "mass": "About 2.43 x 10^29 kg",
      "radius": "107,000 km",
      "orbitalPeriod": "Not applicable",
      "discoveryDate": "1915"
    }
    ```

5. Send a GET request to find the newly added celestial body.

    ```http title="requests.http" "%20"
    ### GET Earth's data
    GET http://localhost:3000/bodies?name:eq=Proxima%20Centauri
    Accept: application/json
    ```

    Notice that the ID for this new star is not a simple "increment" of the last body's id. The server doesn't "assume" it can do this. Instead, it tries to make an id that should be unique.

    > Are you taking the database course this semester? If so, you should note the correlation between ids in our JSON and database primary keys.

6. Send a DELETE request to remove a body. Replace the `[id-of-proxima-centauri]` with the id of the star we added.

    ```http title="requests.http" "[id-of-proxima-centauri]"
    ### DELETE a body
    DELETE http://localhost:3000/bodies/[id-of-proxima-centauri]
    ```

7. Re-send the GET all-bodies request and compare the result with `db.json`.

The REST Client response pane shows the status code, response headers, and response body. JSON Server also updates `db.json`, which makes the file a useful way to confirm that POST, PATCH, PUT, and DELETE requests changed the server-side data.

### Add Earth to the Database File

Add Earth after the Venus object in the `bodies` array. This is the only planned manual data-entry moment for the demo.


1. Manually edit the `db.json` to include information for Earth. Place it in the "right" spot of the JSON file.

    ```json title="Earth object for db.json"
    {
      "id": "4",
      "name": "Earth",
      "category": "planet",
      "image": "earth.jpg",
      "description": "Our home planet and the only known world with life.",
      "nameOrigin": "Comes from Old English and Germanic words for ground or soil.",
      "mass": "5.972 x 10^24 kg",
      "radius": "6,371 km",
      "orbitalPeriod": "365.25 Earth days",
      "discoveryDate": "Known since antiquity"
    },
    ```

    After you save the file, remind them that commas separate objects in an array. If JSON Server reports a parse error, check the comma before or after the new Earth object first.

2. Go back to the `requests.http` file and add a query for Earth.

    ```http title="requests.http"
    ### GET Earth's data
    GET http://localhost:3000/bodies?name:eq=Earth
    Accept: application/json
    ```

3. Include a GET request for Earth's image.
    ```http title="requests.http"
    ### GET Earth's Image
    GET http://localhost:3000/earth.jpg
    Accept: application/json
    ```


### HTTP Status Codes

| Code | Meaning | Common Demo Moment |
| ---- | ------- | ------------------ |
| 200 | OK | Successful GET, PUT, PATCH, or DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Broken JSON body |
| 404 | Not Found | Resource or id does not exist |
| 500 | Server Error | JSON Server problem |

### Shutdown the Server


1. Return to the terminal running JSON Server.

2. Press <kbd>Ctrl</kbd> + <kbd>C</kbd>.

3. Confirm the terminal prompt returns.


> ***Tip:** Checkpoint*
> 
> You should leave with working endpoint tests and a clear distinction between reading data with GET and changing server data with POST, PUT/PATCH, and DELETE.
> 
> ```ps title="Commit"
> git add .
> git commit -m "Test REST API endpoints"
> ```



## Conclusion

> **Assigned homework:** Complete the homework "Practice REST Requests". It reinforces today's endpoint workflow and gives fallback practice for REST Client requests, non-GET methods, and status-code interpretation.

You should finish this lesson with a working mental model of a front end talking to a server-side API. JSON Server is only a simulation, but the request methods, URLs, status codes, JSON bodies, and response inspection habits transfer directly to real APIs.

The next step is to let JavaScript send these requests from the browser. That is where this endpoint work connects to the Fetch API.

[^jpl-credit]: Data values are adapted from JPL/NASA public sources. Thumbnail images are local 240px versions of NASA/JPL Photojournal and NASA mission image releases.
