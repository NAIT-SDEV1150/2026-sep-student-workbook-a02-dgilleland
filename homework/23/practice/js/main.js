import './course-info.js';
import { courses } from './data.js';

const courseList = document.querySelector('#course-list');
const statusCount = document.querySelector('#status-count');

function updateStatusCount() {
  // TODO: Count enrolled and completed cards, then update statusCount.
}

function renderCourse(course) {
  // TODO: Create a <course-info>.
  // TODO: Set the course property with the course object.
  // TODO: Append the card to courseList.
}

courseList.addEventListener('status-change', () => {
  // TODO: Update the course status count when a card dispatches status-change.
});

courses.forEach(renderCourse);
// TODO: Optionally set initial statuses programmatically and update the count.
