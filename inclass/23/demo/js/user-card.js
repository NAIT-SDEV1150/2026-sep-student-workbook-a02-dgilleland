const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .card {
      display: grid;
      grid-template-columns: 72px 1fr;
      gap: 0.85rem;
      align-items: start;
      min-height: 168px;
      padding: 1rem;
      border: 1px solid #9aa8ba;
      border-radius: 8px;
      background: #ffffff;
      color: #172033;
    }

    img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
    }

    h2 {
      margin: 0;
      font-size: 1.1rem;
    }

    p {
      margin: 0.35rem 0 0;
      color: #5f6f84;
      line-height: 1.4;
    }

    button {
      margin-top: 0.75rem;
      cursor: pointer;
      padding: 0.45rem 0.75rem;
      border: 1px solid #0f766e;
      border-radius: 6px;
      background: #0f766e;
      color: #ffffff;
      font: inherit;
      font-weight: 700;
    }
  </style>

  <article class="card">
    <img src="" alt="">
    <div>
      <h2></h2>
      <p class="location"></p>
      <p class="about"></p>
      <button type="button">Follow</button>
    </div>
  </article>
`;

class UserCard extends HTMLElement {
  // TODO: Add private fields for followed state and user data.

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);

    this.image = content.querySelector('img');
    this.nameElement = content.querySelector('h2');
    this.locationElement = content.querySelector('.location');
    this.aboutElement = content.querySelector('.about');
    // TODO: Add our button and bind its handler to this instance

    shadow.append(content);
  }

  connectedCallback() {
    // TODO: Add the button event listener.
    // TODO: Render any user data that was set before the element connected.
  }

  disconnectedCallback() {
    // TODO: Remove the button event listener.
  }

  static get observedAttributes() {
    // TODO: Observe attributes that should sync to component state.
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // TODO: Sync observed attribute changes to component state.
  }

  set user(value) {
    // TODO: Store the user object and render the card.
  }

  get user() {
    // TODO: Return the current user object.
    return null;
  }

  get followed() {
    // TODO: Return the current followed state.
    return false;
  }

  follow() {
    // TODO: Set followed state to true.
  }

  unfollow() {
    // TODO: Set followed state to false.
  }

  handleButtonClick() {
    // TODO: Toggle the followed state when the button is clicked.
  }

  setFollowed(value, emitEvent = true) {
    // TODO: Set the followed state and trigger an event dispatch
  }

  render() {
    // TODO: Render the current user information
  }
}

customElements.define('user-card', UserCard);
