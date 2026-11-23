import './user-card.js';
import { users } from './users.js';

const themeToggle = document.querySelector('#theme-toggle');
const avatarDemo = document.querySelector('#avatar-demo');
let darkMode = false;
let avatarIndex = 2;

themeToggle.addEventListener('click', () => {
  // TODO: Toggle a data-theme value on document.documentElement.
});

avatarDemo.addEventListener('click', () => {
  // TODO: Change the avatar attribute to another local avatar path.
  avatarIndex = (avatarIndex + 1) % users.length;
});
