export function fillCredits(year, author) {
    const yearSpan = document.querySelector('#copyright-year');
    const authorSpan = document.querySelector('#copyright-author');

    yearSpan.textContent = year;
    authorSpan.innerText = author;
}

