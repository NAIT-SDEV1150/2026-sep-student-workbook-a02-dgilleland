import { afterEach, describe, expect, it, vi } from 'vitest';
import '../js/user-card.js';

const testUser = {
  id: '42578935-565a-4863-aa17-0ebfa107b78c',
  name: 'Sarah Armstrong',
  avatar: 'assets/avatars/sarah-armstrong.jpg',
  location: 'Lichfield, United Kingdom',
  about: 'Keeps projects organized and enjoys making technical details easier to understand.',
};

function createUserCard(user = testUser) {
  const card = document.createElement('user-card');

  document.body.append(card);
  card.user = user;

  return card;
}

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('user-card', () => {
  it('registers the custom element', () => {
    expect(customElements.get('user-card')).toBeDefined();
  });

  it('renders the card structure in an open shadow root', () => {
    const card = createUserCard();

    expect(card.shadowRoot).not.toBeNull();
    expect(card.shadowRoot.querySelector('article.card')).not.toBeNull();
    expect(card.shadowRoot.querySelector('img')).not.toBeNull();
    expect(card.shadowRoot.querySelector('h2')).not.toBeNull();
    expect(card.shadowRoot.querySelector('.location')).not.toBeNull();
    expect(card.shadowRoot.querySelector('.about')).not.toBeNull();
    expect(card.shadowRoot.querySelector('button[type="button"]')).not.toBeNull();
  });

  it('renders user data from the user property', () => {
    const card = createUserCard();
    const image = card.shadowRoot.querySelector('img');

    expect(card.user).toBe(testUser);
    expect(card.getAttribute('user-id')).toBe(testUser.id);
    expect(image.getAttribute('src')).toBe(testUser.avatar);
    expect(image.alt).toBe(`Profile photo for ${testUser.name}`);
    expect(card.shadowRoot.querySelector('h2').textContent).toBe(testUser.name);
    expect(card.shadowRoot.querySelector('.location').textContent).toBe(testUser.location);
    expect(card.shadowRoot.querySelector('.about').textContent).toBe(testUser.about);
  });

  it('updates the image source when the avatar attribute changes', () => {
    const card = createUserCard();
    const image = card.shadowRoot.querySelector('img');

    card.setAttribute('avatar', 'assets/avatars/clayton-oliver.jpg');

    expect(image.getAttribute('src')).toBe('assets/avatars/clayton-oliver.jpg');
  });

  it('uses the fallback image when the avatar attribute is empty', () => {
    const card = createUserCard();
    const image = card.shadowRoot.querySelector('img');

    card.setAttribute('avatar', '');

    expect(image.getAttribute('src')).toBe('assets/avatars/avatar.png');
  });

  it('follows a user with the public follow method', () => {
    const card = createUserCard();
    const listener = vi.fn();

    card.addEventListener('follow-change', listener);
    card.follow();

    expect(card.followed).toBe(true);
    expect(card.hasAttribute('followed')).toBe(true);
    expect(card.shadowRoot.querySelector('button').textContent).toBe('Following');
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual({
      id: testUser.id,
      followed: true,
    });
  });

  it('unfollows a user with the public unfollow method', () => {
    const card = createUserCard();
    const listener = vi.fn();

    card.follow();
    card.addEventListener('follow-change', listener);
    card.unfollow();

    expect(card.followed).toBe(false);
    expect(card.hasAttribute('followed')).toBe(false);
    expect(card.shadowRoot.querySelector('button').textContent).toBe('Follow');
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual({
      id: testUser.id,
      followed: false,
    });
  });

  it('toggles followed state when the shadow button is clicked', () => {
    const card = createUserCard();
    const listener = vi.fn();
    const button = card.shadowRoot.querySelector('button');

    card.addEventListener('follow-change', listener);
    button.click();

    expect(card.followed).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1);

    const event = listener.mock.calls[0][0];
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
    expect(event.detail).toEqual({
      id: testUser.id,
      followed: true,
    });
  });

  it('syncs the followed attribute without emitting a follow-change event', () => {
    const card = createUserCard();
    const listener = vi.fn();
    const button = card.shadowRoot.querySelector('button');

    card.addEventListener('follow-change', listener);
    card.setAttribute('followed', '');

    expect(card.followed).toBe(true);
    expect(button.textContent).toBe('Following');
    expect(listener).not.toHaveBeenCalled();

    card.removeAttribute('followed');

    expect(card.followed).toBe(false);
    expect(button.textContent).toBe('Follow');
    expect(listener).not.toHaveBeenCalled();
  });

  it('removes the button listener when disconnected', () => {
    const card = createUserCard();
    const listener = vi.fn();
    const button = card.shadowRoot.querySelector('button');

    card.addEventListener('follow-change', listener);
    card.remove();
    button.click();

    expect(listener).not.toHaveBeenCalled();
  });
});
