import { afterEach, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { fetchUserProfiles, mapRandomUser } from '../src/profile-service.js';
import { randomUserApiUrl, randomUserResponse, testUsers } from './mocks/random-user-fixtures.js';
import { server } from './mocks/server.js';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('profile service', () => {
  it('maps Random User API data into the user-card data shape', () => {
    // Arrange
    const randomUser = randomUserResponse.results[0];

    // Act
    const user = mapRandomUser(randomUser);

    // Assert
    expect(user).toEqual(testUsers[0]);
  });

  // Fill these in during class. Start with the smallest direct fetch stub,
  // then move to MSW so the service can call the real Random User URL while
  // the test still receives deterministic data.
  it.todo('can replace fetch with a stub during a test');

  it.todo('returns mapped profile data from a mocked Random User API response');

  it.todo('throws when the mocked Random User API response is not ok');
});
