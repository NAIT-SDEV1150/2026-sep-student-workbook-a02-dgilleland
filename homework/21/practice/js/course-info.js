const template = document.createElement('template');

template.innerHTML = `
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :host {
      display: block;
      height: 100%;
    }

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

    // TODO: Attach an open shadow root.

    // TODO: Clone the template content.

    // TODO: Store a reference to the internal credits element.

    // TODO: Set the initial credits text from the credits attribute.

    // TODO: Append the cloned content to the shadow root.
  }

  static get observedAttributes() {
  // TODO: Observe the credits attribute.
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
  // TODO: Update the internal credits text when the attribute changes.
  }
}

// TODO: Guard the custom element from being defined more than once
customElements.define('course-info', CourseInfo);
