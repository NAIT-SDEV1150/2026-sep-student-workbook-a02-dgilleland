const template = document.createElement('template');

template.innerHTML = `
  <style>
    /* TODO: Add :host defaults for display and CSS custom properties. */
    /* TODO: Use :host([variant="featured"]) for a featured card style. */
    /* TODO: Use ::slotted([slot="name"]) to style assigned light-DOM content. */

    .card {
      display: grid;
      grid-template-columns: 72px 1fr;
      gap: 0.85rem;
      align-items: center;
      min-height: 124px;
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
  </style>

  <article class="card" part="card">
    <img src="" alt="">
    <div>
      <slot name="name">Unknown user</slot>
      <slot name="description">No description provided.</slot>
    </div>
  </article>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);
    this.image = content.querySelector('img');
    this.image.src = 'assets/avatars/avatar.png';
    this.image.alt = `Profile photo for user`;

    shadow.append(content);
  }

  static get observedAttributes() {
    return ['avatar'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name === 'avatar' && oldValue !== newValue) {
      this.image.src = newValue || 'assets/avatars/avatar.png';
      let name = this.querySelector('[slot="name"]')?.textContent ?? 'user';
      this.image.alt = `Profile photo for ${name}`;
    }
  }
}

customElements.define('user-card', UserCard);
