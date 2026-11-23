import { afterEach, describe, expect, it } from 'vitest';
import '../js/user-card.js';

function createUserCard({ name, description, avatar } = {}) {
  const card = document.createElement('div');
  const avatarAttribute = avatar ? ` avatar="${avatar}"` : '';
  const nameSlot = name ? `<span slot="name">${name}</span>` : '';
  const descriptionSlot = description
    ? `<span slot="description">${description}</span>`
    : '';

  card.innerHTML = `
    <user-card${avatarAttribute}>
      ${nameSlot}
      ${descriptionSlot}
    </user-card>
  `;

  document.body.append(card);
  return card.querySelector('user-card');
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

  it('uses the avatar attribute for the image source', () => {
    const card = createUserCard({
      name: 'Elizabeth Claire',
      avatar: 'assets/avatars/elizabeth-claire.jpg',
    });

    const image = card.shadowRoot.querySelector('img');

    expect(image.getAttribute('src')).toBe('assets/avatars/elizabeth-claire.jpg');
  });

  it('sets accessible image text from the slotted name', () => {
    const card = createUserCard({
      name: 'Clayton Oliver',
      avatar: 'assets/avatars/clayton-oliver.jpg',
    });

    const image = card.shadowRoot.querySelector('img');

    expect(image.alt).toBe('Profile photo for Clayton Oliver');
  });

  it('uses fallback image details when no attributes or slots are provided', () => {
    const card = createUserCard();
    const image = card.shadowRoot.querySelector('img');

    expect(image.getAttribute('src')).toBe('assets/avatars/avatar.png');
    expect(image.alt).toBe('Profile photo for user');
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
});
