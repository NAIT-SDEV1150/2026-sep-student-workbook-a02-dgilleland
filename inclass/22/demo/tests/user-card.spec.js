import { afterEach, describe, expect, it } from 'vitest';
import '../js/user-card.js';

function createUserCard({ name, description, avatar, variant } = {}) {
  const wrapper = document.createElement('div');
  const avatarAttribute = avatar ? ` avatar="${avatar}"` : '';
  const variantAttribute = variant ? ` variant="${variant}"` : '';
  const nameSlot = name ? `<span slot="name">${name}</span>` : '';
  const descriptionSlot = description
    ? `<span slot="description">${description}</span>`
    : '';

  wrapper.innerHTML = `
    <user-card${avatarAttribute}${variantAttribute}>
      ${nameSlot}
      ${descriptionSlot}
    </user-card>
  `;

  document.body.append(wrapper);
  return wrapper.querySelector('user-card');
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('user-card', () => {
  it('registers the custom element', () => {
    expect(customElements.get('user-card')).toBeDefined();
  });

  it('renders the card structure in an open shadow root', () => {
    const card = createUserCard({
      name: 'Sarah Armstrong',
      description: 'Keeps projects organized.',
      avatar: 'assets/avatars/sarah-armstrong.jpg',
    });

    expect(card.shadowRoot).not.toBeNull();
    expect(card.shadowRoot.querySelector('article.card')).not.toBeNull();
    expect(card.shadowRoot.querySelector('img')).not.toBeNull();
    expect(card.shadowRoot.querySelector('slot[name="name"]')).not.toBeNull();
    expect(card.shadowRoot.querySelector('slot[name="description"]')).not.toBeNull();
  });

  it('exposes styling hooks for the host, slots, and shadow parts', () => {
    const card = createUserCard({ variant: 'featured' });
    const styles = card.shadowRoot.querySelector('style').textContent;
    const article = card.shadowRoot.querySelector('article');
    const image = card.shadowRoot.querySelector('img');

    expect(styles).toContain(':host');
    expect(styles).toContain(':host([variant="featured"])');
    expect(styles).toContain('::slotted([slot="name"])');
    expect(styles).toContain('::slotted([slot="description"])');
    expect(article.getAttribute('part')).toBe('card');
    expect(image.getAttribute('part')).toBe('avatar');
  });

  it('projects the name and description into their slots', () => {
    const card = createUserCard({
      name: 'Brayden Silva',
      description: 'Likes practical tools.',
    });

    const nameSlot = card.shadowRoot.querySelector('slot[name="name"]');
    const descriptionSlot = card.shadowRoot.querySelector('slot[name="description"]');

    expect(nameSlot.assignedElements()[0].textContent).toBe('Brayden Silva');
    expect(descriptionSlot.assignedElements()[0].textContent).toBe('Likes practical tools.');
  });

  it('uses the initial avatar attribute for the image source', () => {
    const card = createUserCard({
      avatar: 'assets/avatars/elizabeth-claire.jpg',
    });

    const image = card.shadowRoot.querySelector('img');

    expect(image.getAttribute('src')).toBe('assets/avatars/elizabeth-claire.jpg');
    expect(image.alt).toBe('User profile photo');
  });

  it('updates the image source when the avatar attribute changes', () => {
    const card = createUserCard({
      avatar: 'assets/avatars/sarah-armstrong.jpg',
    });
    const image = card.shadowRoot.querySelector('img');

    card.setAttribute('avatar', 'assets/avatars/clayton-oliver.jpg');

    expect(image.getAttribute('src')).toBe('assets/avatars/clayton-oliver.jpg');
  });

  it('uses the fallback image when the avatar attribute is empty', () => {
    const card = createUserCard({
      avatar: 'assets/avatars/brayden-silva.jpg',
    });
    const image = card.shadowRoot.querySelector('img');

    card.setAttribute('avatar', '');

    expect(image.getAttribute('src')).toBe('assets/avatars/avatar.png');
  });
});
