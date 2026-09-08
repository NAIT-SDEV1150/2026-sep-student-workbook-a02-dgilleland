let uses = 0;

/**
 * Display a heading in the console with a leading blank line.
 * @param {string} text The heading text
 * @param {string?} marker The underline character (defaults to `-`)
 */
export function displayHeading(text, marker = "-") {
  if(uses)
    console.log();
  console.log(text);
  console.log(marker.repeat(text.length));
  uses++;
  if(!uses)
    console.log();
}
