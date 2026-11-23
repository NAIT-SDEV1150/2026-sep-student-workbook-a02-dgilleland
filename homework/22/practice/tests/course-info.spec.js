import { describe, expect, it } from 'vitest';
import '../js/course-info.js';

describe('course-info', () => {
  it('creates an open shadow root from the template', () => {
    const card = document.createElement('course-info');

    expect(card.shadowRoot).not.toBeNull();
    expect(card.shadowRoot.querySelector('article')).not.toBeNull();
  });

  it('updates the internal credits text when the credits attribute changes', () => {
    const card = document.createElement('course-info');

    card.setAttribute('credits', '4');

    expect(card.shadowRoot.querySelector('[data-credits]').textContent).toBe('4');
  });

  it('uses host selectors and slotted-content styling hooks', () => {
    const card = document.createElement('course-info');
    const styles = card.shadowRoot.querySelector('style').textContent;

    expect(styles).toContain(':host');
    expect(styles).toContain(':host([variant="featured"])');
    expect(styles).toContain('::slotted([slot="course-code"])');
    expect(styles).toContain('::slotted([slot="course-name"])');
    expect(styles).toContain('::slotted([slot="requisites"])');
    expect(styles).toContain('::slotted([slot="description"])');
  });

  it('exposes shadow parts for page-level styling', () => {
    const card = document.createElement('course-info');

    expect(card.shadowRoot.querySelector('article').getAttribute('part')).toBe('card');
    expect(card.shadowRoot.querySelector('details').getAttribute('part')).toBe('details');
    expect(card.shadowRoot.querySelector('summary').getAttribute('part')).toBe('summary');
    expect(card.shadowRoot.querySelector('.credits').getAttribute('part')).toBe('credits');
  });
});
