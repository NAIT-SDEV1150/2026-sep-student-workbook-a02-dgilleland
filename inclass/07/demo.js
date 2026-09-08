displayHeading('Lesson 07 demo.js has loaded', "=");
console.log();

/**
 * Display a heading in the console with a leading blank line.
 * @param {string} text The heading text
 * @param {string?} marker The underline character (defaults to `-`)
 */
function displayHeading(text, marker = "-") {
  console.log(); // Blank line before the heading
  console.log(text);
  console.log(marker.repeat(text.length));
}

// Begin Lesson 08
