# Consuming REST API Endpoints

> *See the [Learning Outcome Guide](./LOGs.md) for this lesson. You are encouraged to edit [my lecture notes](./Notes.md) to capture relevant information delivered in class.*


## Demo Instructions

Build a book catalog that consumes several local REST endpoints. The catalog treats `books` and `authors` as stable, read-only reference resources, then lets users add, edit, and delete `reviews`.

The demo also fetches static backend assets from JSON Server: markdown book summaries from `public/summaries` and SVG jacket images from `public/jackets`. Students should guard each response with `response.ok` and `content-type` checks before reading JSON, text, or blob bodies.

Start from `demo/` during class. Use `finished-demo/` as the completed reference.

## Reading Links

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: Response.ok](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
- [MDN: Headers.get()](https://developer.mozilla.org/en-US/docs/Web/API/Headers/get)
- [MDN: Response.text()](https://developer.mozilla.org/en-US/docs/Web/API/Response/text)
- [MDN: Response.blob()](https://developer.mozilla.org/en-US/docs/Web/API/Response/blob)
- [MDN: Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
