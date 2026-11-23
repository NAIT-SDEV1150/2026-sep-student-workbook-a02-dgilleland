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

    :host([followed]) .card {
      border-color: #0f766e;
      box-shadow: 0 0 0 3px #ccfbf1;
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
  #followed = false;
  #user = null;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);

    this.image = content.querySelector('img');
    this.nameElement = content.querySelector('h2');
    this.locationElement = content.querySelector('.location');
    this.aboutElement = content.querySelector('.about');
    this.button = content.querySelector('button');
    this.handleButtonClick = this.handleButtonClick.bind(this);

    shadow.append(content);
  }

  connectedCallback() {
    this.button.addEventListener('click', this.handleButtonClick);
    this.render();
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.handleButtonClick);
  }

  static get observedAttributes() {
    return ['avatar', 'followed'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === 'avatar' && this.image) {
      this.image.src = newValue || 'assets/avatars/clarence-james.jpg';
    }

    if (name === 'followed') {
      this.setFollowed(newValue !== null, false);
    }
  }

  set user(value) {
    this.#user = value;
    this.render();
  }

  get user() {
    return this.#user;
  }

  get followed() {
    return this.#followed;
  }

  follow() {
    this.setFollowed(true);
  }

  unfollow() {
    this.setFollowed(false);
  }

  handleButtonClick() {
    this.setFollowed(!this.#followed);
  }

  setFollowed(value, emitEvent = true) {
    this.#followed = Boolean(value);
    this.button.textContent = this.#followed ? 'Following' : 'Follow';
    this.toggleAttribute('followed', this.#followed);

    if (emitEvent) {
      this.dispatchEvent(new CustomEvent('follow-change', {
        detail: {
          id: this.#user?.id ?? this.getAttribute('user-id') ?? null,
          followed: this.#followed,
        },
        bubbles: true,
        composed: true,
      }));
    }
  }

  render() {
    const user = this.#user;

    if (!user || !this.shadowRoot) {
      return;
    }

    this.setAttribute('user-id', user.id);
    this.setAttribute('avatar', user.avatar);
    this.nameElement.textContent = user.name;
    this.locationElement.textContent = user.location;
    this.aboutElement.textContent = user.about;
    this.image.alt = `Profile photo for ${user.name}`;
    this.button.textContent = this.#followed ? 'Following' : 'Follow';
  }
}

if (!customElements.get('user-card')) {
  customElements.define('user-card', UserCard);
}

export { UserCard };
