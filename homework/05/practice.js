displayHeading('Practical Functions - Homework');

// Calculating Angles
function soh(opposite, hypotenuse) {
  // TODO: Return the angle as an object with properties of
  //       radians, degrees, and gradians
}

function cah(adjacent, hypotenuse) {
  // TODO: Return the angle as an object with properties of
  //       radians, degrees, and gradians
}

function toa(opposite, adjacent) {
  // TODO: Return the angle as an object with properties of
  //       radians, degrees, and gradians
}


// Calculating Loans
function calculateLoan(principal, annualRate, years) {
  // TODO: Return an object with properties for
  //       monthlyPayment, totalPayments, totalPaid
}

function fromSeconds(totalSeconds) {
  // TODO: Return an object with properties for
  //       hours, minutes, seconds 
}

// DO NOT MODIFY CONTENT BELOW THIS LINE
function displayHeading(text, marker = "-") {
  console.log(); // Blank line before the heading
  console.log(text);
  console.log(marker.repeat(text.length));
}

export { soh, cah, toa, calculateLoan, fromSeconds }
