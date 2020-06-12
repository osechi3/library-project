
let myLibrary = [{title: 'the Hobbit', author: 'J.J.R. Tolkien', pages: '255', isRead: 'No'},
        {title: 'the Hobbit2', author: 'J.J.R. Tolkien', pages: '555', isRead: 'Yes'}];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    let userBook = new Book (title, author, pages, isRead);
    myLibrary.push(userBook);
    renderNew(userBook);
}

function renderNew(element) {
    const table = document.querySelector('table');
    const newRow = document.createElement('tr');
    let itemIndex = myLibrary.indexOf(element)
    newRow.setAttribute('data-index', `${itemIndex}`);
    table.appendChild(newRow);

    for (key in element) {
        const newDataCell = document.createElement('td')
        newDataCell.textContent = element[key];
        newRow.appendChild(newDataCell);
    }
    // Create an isRead button
    const isReadButton = document.createElement('button');
    isReadButton.setAttribute('type', 'button')
    isReadButton.classList.add('is-read-button');
    newRow.appendChild(isReadButton);
    isReadButton.addEventListener('click', () => {
        isReadButton.previousElementSibling.setAttribute('id', 'is-read-cell');
        // const isReadCell = document.querySelector('#is-read-cell');
        const isReadCell = isReadButton.previousElementSibling;
        if (myLibrary[itemIndex].isRead == 'No') {
            myLibrary[itemIndex].isRead = 'Yes';
            isReadCell.textContent = myLibrary[itemIndex].isRead;
        } else if (myLibrary[itemIndex].isRead == 'Yes') {
            myLibrary[itemIndex].isRead = 'No';
            isReadCell.textContent = 'No';
        }
        // try to refactor addEventListener
    })
    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button')
    deleteButton.classList.add('delete-button');
    newRow.appendChild(deleteButton);
    deleteButton.addEventListener('click', () => {
        const rowIndex = document.querySelector(`[data-index="${itemIndex}"]`);
        table.removeChild(rowIndex);
        delete myLibrary[itemIndex]; // instead of splice()
        // Otherwise the items' indexes shift causing an error
    })
        // try to refactor -- function name(newRow)
}

function render() {
    myLibrary.map((obj) => {
        renderNew(obj);
    })
}
render();

const submitButton = document.querySelector('#submit')
submitButton.addEventListener('click', () => {
    const titleValue = document.querySelector('#title').value;
    const authorValue = document.querySelector('#author').value;
    const pagesValue = document.querySelector('#pages').value;
    const isReadBox = document.querySelector('#read');
    (isReadBox.checked == true) ? isReadValue = 'Yes' : isReadValue = 'No';
    addBookToLibrary(titleValue, authorValue, pagesValue, isReadValue);
    newEntryContainer.classList.remove('show');
    newEntryContainer.classList.add('hide');
})

const newBookButton = document.querySelector('#new-book-button');
const newEntryContainer = document.querySelector('#new-entry-container');
newBookButton.addEventListener('click', (e) => {
    newEntryContainer.classList.remove('hide');
    newEntryContainer.classList.add('show');
})

const closeButton = document.querySelector('#close');
closeButton.addEventListener('click', () => {
    newEntryContainer.classList.remove('show');
    newEntryContainer.classList.add('hide');
})
