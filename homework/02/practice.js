console.log('Homework 02 has loaded');
console.log('=====================');
console.log();

// We'll keep these functions at the end of our script file.
function roundToPlaces(value, places) {
  let scale = Math.pow(10, places);
  return Math.round(value * scale) / scale;
}
