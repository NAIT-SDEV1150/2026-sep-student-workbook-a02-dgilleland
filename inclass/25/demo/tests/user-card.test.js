import { afterEach, describe, expect, it, vi } from 'vitest';
import '../src/user-card.js';
import { testUsers } from './mocks/random-user-fixtures.js';

const testUser = testUsers[0];

function renderCard(user = testUser) {
  const card = document.createElement('user-card');
  card.user = user;
  document.body.append(card);
  return card;
}

afterEach(() => {
  document.body.innerHTML = '';
  vi.unstubAllGlobals();
});

describe('user-card', () => {
  it('registers the custom element', () => {
    // Arrange and Act
    const definition = customElements.get('user-card');

    // Assert
    expect(definition).toBeTypeOf('function');
  });

  // Fill these in during class. The component is complete; our job is to
  // prove its public behavior through DOM, property, method, attribute, and
  // event assertions.
  it.todo('renders Shadow DOM content from the user property');

  it.todo('renders a profile image with useful alt text');

  it.todo('updates the card when the user property changes');

  it.todo('updates followed state with follow() and unfollow()');

  it.todo('syncs observed attributes into component state');

  it.todo('dispatches a bubbling and composed follow-change event');
});
