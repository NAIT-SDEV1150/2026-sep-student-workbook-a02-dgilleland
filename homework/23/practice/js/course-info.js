const STATUSES = [null, 'Enrolled', 'Completed'];

const template = document.createElement('template');

template.innerHTML = `
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :host {
      --card-bg: var(--course-info-bg, #ffffff);
      --card-color: var(--course-info-color, #1f2933);
      --card-muted: var(--course-info-muted, #5b6675);
      --card-border: var(--course-info-border, #a7b2a2);
      --card-accent: var(--course-info-accent, #1b6b63);
      --card-accent-soft: var(--course-info-accent-soft, #dcebe7);
      display: block;
      height: 100%;
    }

    :host([status="Enrolled"]) .card {
      border-color: var(--card-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--card-accent), transparent 78%);
    }

    :host([status="Completed"]) .card {
      border-color: #6d5dfc;
      box-shadow: 0 0 0 3px rgb(109 93 252 / 18%);
    }

    .card {
      display: grid;
      gap: 0.75rem;
      align-content: start;
      height: 100%;
      min-height: 100%;
      padding: 1rem;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      background: var(--card-bg);
      color: var(--card-color);
    }

    .meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      color: var(--card-accent);
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .credits {
      flex: 0 0 auto;
      padding: 0.22rem 0.55rem;
      border-radius: 999px;
      background: var(--card-accent-soft);
      color: var(--card-accent);
      font-size: 0.82rem;
      font-weight: 700;
      line-height: 1;
      text-transform: none;
    }

    h3 {
      margin: 0;
      font-size: 1.05rem;
      line-height: 1.3;
    }

    p {
      margin: 0;
      line-height: 1.45;
    }

    .requisites {
      color: var(--card-muted);
      font-size: 0.88rem;
    }

    .status-control {
      display: grid;
      gap: 0.45rem;
    }

    .status-label {
      color: var(--card-muted);
      font-size: 0.82rem;
      font-weight: 700;
    }

    .status-switch {
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      width: 100%;
      min-height: 2.35rem;
      padding: 0.2rem;
      border: 1px solid var(--card-border);
      border-radius: 999px;
      background: color-mix(in srgb, var(--card-accent-soft), white 55%);
      color: var(--card-muted);
      cursor: pointer;
      font: inherit;
      font-size: 0.78rem;
      font-weight: 700;
      overflow: hidden;
    }

    .status-switch::before {
      content: "";
      position: absolute;
      inset-block: 0.2rem;
      left: 0.2rem;
      width: calc((100% - 0.4rem) / 3);
      border-radius: 999px;
      background: var(--card-bg);
      box-shadow: 0 2px 8px rgb(31 41 51 / 18%);
      transition: transform 160ms ease;
    }

    :host([status="Enrolled"]) .status-switch::before {
      transform: translateX(100%);
    }

    :host([status="Completed"]) .status-switch::before {
      transform: translateX(200%);
    }

    .status-option {
      position: relative;
      z-index: 1;
      display: grid;
      place-items: center;
      min-width: 0;
      padding: 0.3rem 0.4rem;
      text-align: center;
      white-space: nowrap;
    }

    :host(:not([status])) .status-option[data-status="none"],
    :host([status="Enrolled"]) .status-option[data-status="Enrolled"],
    :host([status="Completed"]) .status-option[data-status="Completed"] {
      color: var(--card-color);
    }
  </style>

  <article class="card">
    <div class="meta">
      <span class="code"></span>
      <span class="credits"><span data-credits>0</span> credits</span>
    </div>
    <h3></h3>
    <p class="requisites"></p>
    <p class="description"></p>
    <div class="status-control">
      <span class="status-label">Course status</span>
      <button class="status-switch" type="button" aria-label="Course status: Not Enrolled">
        <span class="status-option" data-status="none">Not Enrolled</span>
        <span class="status-option" data-status="Enrolled">Enrolled</span>
        <span class="status-option" data-status="Completed">Completed</span>
      </button>
    </div>
  </article>
`;

class CourseInfo extends HTMLElement {
  // TODO: Add private fields for course data and status state.

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);

    this.codeElement = content.querySelector('.code');
    this.creditsElement = content.querySelector('[data-credits]');
    this.nameElement = content.querySelector('h3');
    this.requisitesElement = content.querySelector('.requisites');
    this.descriptionElement = content.querySelector('.description');
    this.statusButton = content.querySelector('.status-switch');
    // TODO: Bind handleStatusClick to this instance.

    shadow.append(content);
  }

  connectedCallback() {
    // TODO: Add the status button event listener.
    // TODO: Render any course data set before the element connected.
  }

  disconnectedCallback() {
    // TODO: Remove the status button event listener.
  }

  static get observedAttributes() {
    // TODO: Observe credits and status.
    return ['credits'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === 'credits' && this.creditsElement) {
      this.creditsElement.textContent = newValue || '0';
    }

    // TODO: Sync status attribute changes to component state without emitting an event.
  }

  set course(value) {
    // TODO: Store the course object and render the card.
  }

  get course() {
    // TODO: Return the current course object.
    return null;
  }

  get status() {
    // TODO: Return null, 'Enrolled', or 'Completed'.
    return null;
  }

  setStatus(value, emitEvent = true) {
    // TODO: Normalize value, update internal state, sync the status attribute, update the slider label, and dispatch status-change.
  }

  handleStatusClick() {
    // TODO: Cycle null -> 'Enrolled' -> 'Completed' -> null.
  }

  updateStatusControl() {
    // TODO: Update the status button's accessible label.
  }

  render() {
    // TODO: Render the current course information.
  }
}

if (!customElements.get('course-info')) {
  customElements.define('course-info', CourseInfo);
}
