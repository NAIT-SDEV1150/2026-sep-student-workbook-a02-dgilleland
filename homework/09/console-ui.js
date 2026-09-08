export function displayHeading(text, marker = "-") {
  console.log(); // Blank line before the heading
  console.log(text);
  console.log(marker.repeat(text.length));
}

export const print = console.log;
export const table = console.table;
export const clear = console.clear;
