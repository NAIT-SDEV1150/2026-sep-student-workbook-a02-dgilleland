import './course-info.js';
import { courses } from './data.js';

const programmaticCourses = document.querySelector('#programmatic-courses');

function createSlottedText(slotName, text) {
  const span = document.createElement('span');
  span.slot = slotName;
  span.textContent = text;
  return span;
}

function createCourseInfo(course) {
  // TODO: Create a <course-info> element with document.createElement().

  // TODO: Set the credits attribute with setAttribute().

  // TODO: Append slotted content for course-code, course-name, requisites, and description.

  // TODO: Append the completed card to the programmatic render target.
}

courses.slice(2).forEach(createCourseInfo);
