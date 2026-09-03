import { fetchJsonData, postData } from './utils.js';

const loadButton = document.querySelector('#load-bodies');
const addForm = document.querySelector('#add-body');
const bodyList = document.querySelector('#body-list');
const statusMessage = document.querySelector('#status-message');

const endpoint = 'http://localhost:3000/bodies';

function showStatus(message, type = 'info') {
  statusMessage.textContent = message;
  statusMessage.dataset.status = type;
}

function renderBodies(bodies) {
  // TODO: Clear the current list.
  // TODO: Create and append one <li> for each body.
  // TODO: Include the thumbnail image for each body.
}

function loadHandler() {
  // TODO: Show a loading message.
  // TODO: Call fetchJsonData(endpoint).
  // TODO: Render bodies on success.
  // TODO: Show a user-facing error on failure.
}

async function submitHandler(event) {
  event.preventDefault();

  // TODO: Collect form values with FormData.
  // TODO: POST the body, reset the form, and reload the list.
  // TODO: Show a user-facing error on failure.
}

loadButton.addEventListener('click', loadHandler);
addForm.addEventListener('submit', submitHandler);
