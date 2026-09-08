export function fillCredits(year, author) {
    // TODO: Fill the credit info part of the page
}

export function displayHeading(text, marker = "-") {
    let heading = document.querySelector('h1');
    heading.textContent = text;
    // TODO: Modify the CSS class names based on the marker
}

export function print(id, text){
    // TODO: Find the element by id and replace it's text (if found)
}

export function table(marks) {
    let table = document.querySelector('table');
    table.innerHTML = `<tr><th>Bucket</th><th>Earned</th><th>Possible</th><th>Percent</th></tr>`;

    // We haven't taught looping yet, but you can see your first example right here.
    for(let index = 0; index < marks.length; index++) {
        table.innerHTML += buildRow(index + 1, marks[index]);
    }
}

function buildRow(number, data) {
    return `
    <tr>
        <td>${number}</td>
        <td>${data.earned}</td>
        <td>${data.possible}</td>
        <td>${data.percent} %</td>
    </tr>`
}
