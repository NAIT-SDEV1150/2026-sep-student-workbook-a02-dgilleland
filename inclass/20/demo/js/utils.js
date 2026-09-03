function describeResponseProblem(response, detail) {
  const message = `${response.status} ${response.statusText} from ${response.url}`;
  return detail ? `${message}. ${detail}` : message;
}

function getContentType(response) {
  return response.headers.get('content-type') ?? '';
}

export async function fetchJson(endpoint) {
  // TODO: fetch the endpoint.
  // TODO: check response.ok before reading the body.
  // TODO: check that the content-type includes application/json.
  // TODO: return response.json().
}

export async function fetchText(endpoint, expectedType) {
  // TODO: fetch the endpoint.
  // TODO: check response.ok before reading the body.
  // TODO: check the content-type against expectedType.
  // TODO: return response.text().
}

export async function fetchBlob(endpoint, expectedType) {
  // TODO: fetch the endpoint.
  // TODO: check response.ok before reading the body.
  // TODO: check the content-type against expectedType.
  // TODO: return response.blob().
}

export async function sendJson(endpoint, options) {
  // TODO: merge method, headers, and JSON body options into a fetch() call.
  // TODO: reuse the same response.ok and content-type checks.
  // TODO: return parsed JSON when the API sends JSON back.
}

export { describeResponseProblem, getContentType };
