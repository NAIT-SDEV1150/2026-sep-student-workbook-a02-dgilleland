import { http, HttpResponse } from 'msw';
import { randomUserApiUrl, randomUserResponse } from './random-user-fixtures.js';

export const handlers = [
  http.get(randomUserApiUrl, () => HttpResponse.json(randomUserResponse)),
];
