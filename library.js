import Book from "./book.js";

let library = [
    new Book("Eat & Run", "Scott Jurek", 236, "Unread"),
    new Book("Can't Hurt Me", "David Goggins", 364, "Read"),
    new Book("The Kanogawa Food Detectives", "Hisashi Kishiwai", 201, "Unread"),
    new Book("I Would Meet You Anywhere", "Susan Kiyo Ito", 241, "Unread")
];

const form = document.getElementsByTagName("form")[0];

displayBooks(0);

function displayBooks(startIdx) {
    const table = document.getElementsByTagName("table")[0];
    for (let i = startIdx; i < library.length; i++) {
        let book = library[i];

        let data = Object.keys(book).reduce((acc, elem) => {

            if (elem == 'read')
                return `${acc}<td>
                <button ${book['read'] == 'Read' ? "class='read'" : ""} type="button">${book[elem]}</button>
                </td>
                <td><button class='delete'>Delete</button></td>`

            return `${acc}<td>${book[elem]}</td>`
        }, "");

        let row = table.insertRow();
        row.innerHTML = data;
        addStatusEventListener(row);
        addDeleteEventListener(row, i);
    }
}

function addBookToLib(book) {
    library.push(book);
}

function addStatusEventListener(row) {
    const statusBtn = row.querySelector("td > button");
    statusBtn.addEventListener("click", e => {
        statusBtn.classList.toggle("read");
        const btnText = statusBtn.innerHTML == "Read" ? "Unread" : "Read";
        statusBtn.innerHTML = btnText;
    });
}

function addDeleteEventListener(row, idx) {
    const deleteBtn = row.querySelector('.delete');
    deleteBtn.addEventListener('click', e => {
        library.splice(idx, 1);
        row.remove();
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let status = document.getElementById('status').value;

    addBookToLib(new Book(title, author, pages, status));
    let inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    })
    displayBooks(library.length - 1);
});










