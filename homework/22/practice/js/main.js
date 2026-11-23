import './course-info.js';
import { courses } from './data.js';

const themeToggle = document.querySelector('#theme-toggle');
const creditsToggle = document.querySelector('#credits-toggle');
const creditsDemo = document.querySelector('#credits-demo');
const programmaticCourses = document.querySelector('#programmatic-courses');
let darkMode = false;
let alternateCredits = false;

function createSlottedText(slotName, text) {
  const span = document.createElement('span');
  span.slot = slotName;
  span.textContent = text;
  return span;
}

function createCourseInfo(course, index) {
  const card = document.createElement('course-info');
  card.setAttribute('credits', course.credits);

  if (index === 0) {
    card.setAttribute('variant', 'featured');
  }

  card.append(
    createSlottedText('course-code', course.courseCode),
    createSlottedText('course-name', course.courseName),
    createSlottedText('requisites', course.requisites),
    createSlottedText('description', course.description),
  );

  programmaticCourses.append(card);
}

themeToggle.addEventListener('click', () => {
  // TODO: Toggle darkMode, update document.documentElement.dataset.theme, and update the button text.
});

creditsToggle.addEventListener('click', () => {
  // TODO: Toggle alternateCredits and update creditsDemo's credits attribute.
});

courses.slice(2).forEach(createCourseInfo);
