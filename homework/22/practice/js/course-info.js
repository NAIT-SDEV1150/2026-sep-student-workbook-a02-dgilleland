const template = document.createElement('template');

template.innerHTML = `
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :host {
      /* TODO: Define --card-* variables that read from --course-info-* page values. */
      display: block;
      height: 100%;
    }

    /* TODO: Use :host([variant="featured"]) to style featured cards. */

    .card {
      display: grid;
      gap: 0.7rem;
      align-content: start;
      height: 100%;
      min-height: 100%;
      padding: 1rem;
      border: 1px solid #a7b2a2;
      border-radius: 8px;
      background: #ffffff;
      color: #1f2933;
    }

    .meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      color: #1b6b63;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .credits {
      flex: 0 0 auto;
      padding: 0.22rem 0.55rem;
      border-radius: 999px;
      background: #dcebe7;
      color: #123f3a;
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
      color: #5b6675;
      font-size: 0.88rem;
    }

    details {
      overflow: hidden;
      border: 1px solid #c5d2bf;
      border-radius: 8px;
      background: #eef4ec;
    }

    summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.55rem 0.7rem;
      background: #d7e4d3;
      color: #314136;
      cursor: pointer;
      font-size: 0.88rem;
      font-weight: 700;
      line-height: 1.2;
      list-style: none;
    }

    summary::marker {
      content: "";
    }

    summary::-webkit-details-marker {
      display: none;
    }

    summary span:last-child {
      color: #536356;
      font-size: 0.78rem;
      font-weight: 600;
      text-transform: none;
    }

    details p {
      padding: 0 0.7rem;
      font-size: 0.92rem;
    }

    details p:first-of-type {
      padding-top: 0.75rem;
    }

    details p:last-child {
      padding-bottom: 0.8rem;
    }

    /* TODO: Use ::slotted(...) to style assigned course-code, course-name, requisites, and description content. */
  </style>

  <article class="card">
    <div class="meta">
      <slot name="course-code">COURSE0000</slot>
      <h3><slot name="course-name">Unknown course</slot></h3>
    </div>
    <details>
      <summary>
        <span class="credits"><span data-credits>0</span> credits</span>
        <span>(click for details)</span>
      </summary>
      <p class="requisites"><slot name="requisites">No requisites listed.</slot></p>
      <p><slot name="description">No description provided.</slot></p>
    </details>
  </article>
`;

class CourseInfo extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);
    this.creditsElement = content.querySelector('[data-credits]');
    this.updateCredits(this.getAttribute('credits'));

    shadow.append(content);
  }

  static get observedAttributes() {
    return ['credits'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'credits' && oldValue !== newValue) {
      this.updateCredits(newValue);
    }
  }

  updateCredits(value) {
    if (this.creditsElement) {
      this.creditsElement.textContent = value || '0';
    }
  }
}

if (!customElements.get('course-info')) {
  customElements.define('course-info', CourseInfo);
}
