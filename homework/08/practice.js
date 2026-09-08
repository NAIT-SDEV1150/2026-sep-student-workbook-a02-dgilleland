displayHeading('Logical If-Else Functions - Homework');
// DO NOT MODIFY THE CODE ABOVE THIS LINE

const isValidPercent = function(percent) {
  // TODO: Percents are between 0 and 100 inclusive
  return false;
}

const isValidLetterGrade = function(letter) {
  // TODO: Solve using an array and `.includes()`
  return true;
}

/**
 * Calculates the equivalent letter grade for a given percentage grade.
 * @param {number} percent A number between zero and one hundred
 * @returns {string} The equivalent letter grade
 * @throws Will throw an error if the supplied percent is not between 0 and 100 inclusive.
 * 
 * Note that this cannot calculate a `'WF'` letter grade.
 * 
 * Based on the {@link https://www.nait.ca/nait/admissions/office-of-the-registrar/grading-system|NAIT Grading System}
 */
const calculateLetterGrade = function(percent) {
  if(!isValidPercent(percent))
    throw new Error('Invalid percentage');
  
  let letter;
  // TODO: Use if-else-if to complete.

  return letter;
}

/**
 * Calculates the equivalent point grade for a given percentage grade.
 * @param {string} letterGrade A letter grade value
 * @returns {number} The equivalent point grade
 * @throws Will throw an error if the supplied letter grade is not a valid letter grade.
 * 
 * Based on the {@link https://www.nait.ca/nait/admissions/office-of-the-registrar/grading-system|NAIT Grading System}
 */
const calculateGradePoint = function(letterGrade) {
  if(!isValidLetterGrade(letterGrade))
    throw new Error('Invalid letter grade');
  let gradePoint;

  // TODO: Convert to a switch statement
  if(letterGrade === 'A' || letterGrade === 'A+') {
    gradePoint = 4.0;
  } else if(letterGrade === 'A-') { //case
    gradePoint = 3.7;
  } else if(letterGrade === 'B+') { //case
    gradePoint = 3.3;
  } else if(letterGrade === 'B') {  //case
    gradePoint = 3.0;
  } else if(letterGrade === 'B-') { //case
    gradePoint = 2.7;
  } else if(letterGrade === 'C+') { //case
    gradePoint = 2.3;
  } else if(letterGrade === 'C') {  //case
    gradePoint = 2.0;
  } else if(letterGrade === 'C-') { //case
    gradePoint = 1.7;
  } else if(letterGrade === 'D+') { //case
    gradePoint = 1.3;
  } else if(letterGrade === 'D') {  //case
    gradePoint = 1.0;
  } else if(letterGrade === 'F' || letterGrade === 'WF') {  //default:
    gradePoint = 0;
  }

  return gradePoint;
}

// DO NOT MODIFY CONTENT BELOW THIS LINE
function displayHeading(text, marker = "-") {
  console.log(); // Blank line before the heading
  console.log(text);
  console.log(marker.repeat(text.length));
}

export { calculateLetterGrade, calculateGradePoint, isValidLetterGrade, isValidPercent }
