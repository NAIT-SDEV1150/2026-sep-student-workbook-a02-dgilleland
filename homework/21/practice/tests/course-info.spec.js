import { describe, expect, it } from 'vitest';
import '../js/course-info.js';

describe('course-info', () => {
  it('creates an open shadow root from the template', () => {
    const card = document.createElement('course-info');

    expect(card.shadowRoot).not.toBeNull();
    expect(card.shadowRoot.querySelector('article')).not.toBeNull();
  });

  it('renders fallback slot text when no light-DOM content is provided', () => {
    const card = document.createElement('course-info');

    expect(card.shadowRoot.textContent).toContain('Unknown course');
    expect(card.shadowRoot.textContent).toContain('No description provided.');
  });

  it('updates the internal credits text when the credits attribute changes', () => {
    const card = document.createElement('course-info');

    card.setAttribute('credits', '4');

    expect(card.shadowRoot.querySelector('[data-credits]').textContent).toBe('4');
  });
});
