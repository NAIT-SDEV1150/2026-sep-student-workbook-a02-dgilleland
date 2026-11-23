import './user-card.js';
import { users } from './users.js';

const programmaticCards = document.querySelector('#programmatic-cards');

function createUserCard(user) {
  // TODO: Create a <user-card> element with document.createElement().
  // TODO: Create slotted spans for the name and description.
  // TODO: Set the avatar attribute before appending the element.
  // TODO: Append the finished card to programmaticCards.
}

users.slice(2).forEach(createUserCard);
