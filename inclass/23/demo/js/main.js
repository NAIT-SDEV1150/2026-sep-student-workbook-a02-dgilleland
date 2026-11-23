import './user-card.js';
import { users } from './users.js';

const userList = document.querySelector('#user-list');
const followCount = document.querySelector('#follow-count');

function updateFollowCount() {
  // TODO: Count followed cards and update followCount.
}

function renderUser(user) {
  // TODO: Create a <user-card>.
  // TODO: Set the user property with the user object.
  // TODO: Append the card to userList.
}

userList.addEventListener('follow-change', () => {
  // TODO: Update the follow count when a card dispatches follow-change.
});

users.forEach(renderUser);
