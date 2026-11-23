import { afterEach, describe, expect, it, vi } from 'vitest';
import '../js/course-info.js';

const testCourse = {
  courseCode: 'SDEV1150',
  courseName: 'Front End Development Fundamentals',
  credits: '3',
  requisites: 'This course is available to Software Development students.',
  description: 'Students learn JavaScript, the DOM, events, modules, JSON, and package managers.',
};

function createCourseInfo(course = testCourse) {
  const card = document.createElement('course-info');

  document.body.append(card);
  card.course = course;

  return card;
}

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('course-info', () => {
  it('registers the custom element', () => {
    expect(customElements.get('course-info')).toBeDefined();
  });

  it('renders the card structure in an open shadow root', () => {
    const card = createCourseInfo();

    expect(card.shadowRoot).not.toBeNull();
    expect(card.shadowRoot.querySelector('article.card')).not.toBeNull();
    expect(card.shadowRoot.querySelector('.code')).not.toBeNull();
    expect(card.shadowRoot.querySelector('h3')).not.toBeNull();
    expect(card.shadowRoot.querySelector('.requisites')).not.toBeNull();
    expect(card.shadowRoot.querySelector('.description')).not.toBeNull();
    expect(card.shadowRoot.querySelector('.status-switch')).not.toBeNull();
  });

  it('renders course data from the course property', () => {
    const card = createCourseInfo();

    expect(card.course).toBe(testCourse);
    expect(card.getAttribute('course-code')).toBe(testCourse.courseCode);
    expect(card.getAttribute('credits')).toBe(testCourse.credits);
    expect(card.shadowRoot.querySelector('.code').textContent).toBe(testCourse.courseCode);
    expect(card.shadowRoot.querySelector('h3').textContent).toBe(testCourse.courseName);
    expect(card.shadowRoot.querySelector('.requisites').textContent).toBe(testCourse.requisites);
    expect(card.shadowRoot.querySelector('.description').textContent).toBe(testCourse.description);
  });

  it('updates the internal credits text when the credits attribute changes', () => {
    const card = createCourseInfo();

    card.setAttribute('credits', '4');

    expect(card.shadowRoot.querySelector('[data-credits]').textContent).toBe('4');
  });

  it('defaults to not enrolled status', () => {
    const card = createCourseInfo();

    expect(card.status).toBeNull();
    expect(card.hasAttribute('status')).toBe(false);
    expect(card.shadowRoot.querySelector('.status-switch').getAttribute('aria-label')).toBe('Course status: Not Enrolled');
  });

  it('sets enrolled status with the public setStatus method', () => {
    const card = createCourseInfo();
    const listener = vi.fn();

    card.addEventListener('status-change', listener);
    card.setStatus('Enrolled');

    expect(card.status).toBe('Enrolled');
    expect(card.getAttribute('status')).toBe('Enrolled');
    expect(card.shadowRoot.querySelector('.status-switch').getAttribute('aria-label')).toBe('Course status: Enrolled');
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual({
      courseCode: testCourse.courseCode,
      status: 'Enrolled',
    });
  });

  it('sets completed status with the public setStatus method', () => {
    const card = createCourseInfo();
    const listener = vi.fn();

    card.addEventListener('status-change', listener);
    card.setStatus('Completed');

    expect(card.status).toBe('Completed');
    expect(card.getAttribute('status')).toBe('Completed');
    expect(card.shadowRoot.querySelector('.status-switch').getAttribute('aria-label')).toBe('Course status: Completed');
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual({
      courseCode: testCourse.courseCode,
      status: 'Completed',
    });
  });

  it('normalizes unknown status values to not enrolled', () => {
    const card = createCourseInfo();

    card.setStatus('Waiting List');

    expect(card.status).toBeNull();
    expect(card.hasAttribute('status')).toBe(false);
  });

  it('cycles status when the shadow switch is clicked', () => {
    const card = createCourseInfo();
    const listener = vi.fn();
    const button = card.shadowRoot.querySelector('.status-switch');

    card.addEventListener('status-change', listener);
    button.click();

    expect(card.status).toBe('Enrolled');
    expect(listener).toHaveBeenCalledTimes(1);

    let event = listener.mock.calls[0][0];
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
    expect(event.detail).toEqual({
      courseCode: testCourse.courseCode,
      status: 'Enrolled',
    });

    button.click();
    expect(card.status).toBe('Completed');

    button.click();
    expect(card.status).toBeNull();
    expect(card.hasAttribute('status')).toBe(false);
  });

  it('syncs the status attribute without emitting a status-change event', () => {
    const card = createCourseInfo();
    const listener = vi.fn();

    card.addEventListener('status-change', listener);
    card.setAttribute('status', 'Completed');

    expect(card.status).toBe('Completed');
    expect(card.shadowRoot.querySelector('.status-switch').getAttribute('aria-label')).toBe('Course status: Completed');
    expect(listener).not.toHaveBeenCalled();

    card.removeAttribute('status');

    expect(card.status).toBeNull();
    expect(listener).not.toHaveBeenCalled();
  });

  it('removes the status switch listener when disconnected', () => {
    const card = createCourseInfo();
    const listener = vi.fn();
    const button = card.shadowRoot.querySelector('.status-switch');

    card.addEventListener('status-change', listener);
    card.remove();
    button.click();

    expect(listener).not.toHaveBeenCalled();
  });
});
