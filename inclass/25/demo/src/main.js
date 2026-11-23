import './user-card.js';
import { fetchUserProfiles } from './profile-service.js';

const userList = document.querySelector('#user-list');
const followCount = document.querySelector('#follow-count');

function updateFollowCount() {
  const followedCards = userList.querySelectorAll('user-card[followed]');
  followCount.textContent = `Following ${followedCards.length} user${followedCards.length === 1 ? '' : 's'}.`;
}

function renderUser(user) {
  const card = document.createElement('user-card');
  card.user = user;
  userList.append(card);
}

async function loadUsers() {
  userList.textContent = 'Loading users...';

  try {
    const users = await fetchUserProfiles(2);
    userList.textContent = '';
    users.forEach(renderUser);
    updateFollowCount();
  } catch (error) {
    userList.textContent = 'Could not load users.';
    console.error(error);
  }
}

userList.addEventListener('follow-change', () => {
  updateFollowCount();
});

loadUsers();
