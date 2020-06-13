let myLibrary = [{title: 'The Hobbit', author: 'J.J.R. Tolkien', pages: '304', isRead: 'No'},
        {title: 'To Kill a Mockingbird', author: 'Harper Lee', pages: '281', isRead: 'Yes'},
        {title: 'Invisible Man', author: 'Ralph Ellison', pages: '516', isRead: 'No'},
        {title: 'The Forsyte Saga', author: 'John Galsworthy', pages: '912', isRead: 'Yes'}];

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

// Create a book entry in the table
function renderNew(element) {
    const table = document.querySelector('table');
    const newRow = document.createElement('tr');
    let itemIndex = myLibrary.indexOf(element);
    newRow.setAttribute('data-index', `${itemIndex}`);
    table.appendChild(newRow);

    for (key in element) {
        const newDataCell = document.createElement('td');
        newDataCell.textContent = element[key];
        newRow.appendChild(newDataCell);
    }
    // Create an isRead button
    const isReadButton = document.createElement('button');
    let objIsReadValue = myLibrary[itemIndex].isRead;
    isReadButton.setAttribute('type', 'button');
    isReadButton.classList.add('is-read-button');
    isReadButton.textContent = 'Read';
    (objIsReadValue == 'No') ? isReadButton.classList.add('read-status-no') :
            isReadButton.classList.add('read-status-yes'); // color change
    newRow.appendChild(isReadButton);

    isReadButton.addEventListener('click', () => {
        const isReadCell = isReadButton.previousElementSibling;
        if (objIsReadValue == 'No') {
            objIsReadValue = 'Yes';
            isReadButton.classList.remove('read-status-no');
            isReadButton.classList.add('read-status-yes');
            isReadCell.textContent = objIsReadValue;
        } else if (objIsReadValue == 'Yes') {
            objIsReadValue = 'No';
            isReadButton.classList.remove('read-status-yes');
            isReadButton.classList.add('read-status-no');
            isReadCell.textContent = objIsReadValue;
        }
    })
    // Create a Delete button
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button')
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = `<i class="fa fa-times fa-2x" aria-hidden="true"></i>`
    newRow.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        const rowIndex = document.querySelector(`[data-index="${itemIndex}"]`);
        table.removeChild(rowIndex);
        delete myLibrary[itemIndex]; // instead of splice()
        // Otherwise the items' indexes shift causing an error
    })
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
    defaultBrightness();
})

const closeButton = document.querySelector('#close');
closeButton.addEventListener('click', () => {
    newEntryContainer.classList.remove('show');
    newEntryContainer.classList.add('hide');
    defaultBrightness();
})

const newBookButton = document.querySelector('#new-book-button');
const newEntryContainer = document.querySelector('#new-entry-container');
newBookButton.addEventListener('click', (e) => {
    newEntryContainer.classList.remove('hide');
    newEntryContainer.classList.add('show');
    lowerBrightness();
})

const table = document.querySelector('table');
const body = document.querySelector('body');
const pageTitle = document.querySelector('#page-title');
const libraryHeader = document.querySelector('#library-header');

function lowerBrightness() {
    table.style.cssText = 'filter: brightness(0.4);'
    pageTitle.style.cssText = 'filter: brightness(0.4);'
    libraryHeader.style.cssText = 'filter: brightness(0.4);'
    body.style.cssText = 'background-color: #2E4460;'
    newBookButton.style.cssText= 'filter: brightness(0.4);'
}
function defaultBrightness() {
    table.removeAttribute('style');
    pageTitle.removeAttribute('style');
    libraryHeader.removeAttribute('style');
    body.removeAttribute('style');
    newBookButton.removeAttribute('style')
}

// Close the new book window when clicked outside of it
body.addEventListener('click', () => {
    if(isHidden(newEntryContainer) == false) {
        if (!newEntryContainer.contains(event.target) && 
                event.target !== newBookButton) {
            newEntryContainer.classList.remove('show');
            newEntryContainer.classList.add('hide');
            defaultBrightness();
        }
    }
})

function isHidden(e) {
    return e.offsetParent == null;
}