let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  createBook();
}

function createBook() {
  let libraryContainer = document.querySelector("#library");
  libraryContainer.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookContainer = document.createElement("div");
    bookContainer.setAttribute("class", "book-card");
    bookContainer.innerHTML = `
        <div class='card-header'>
        <h3 class='title'>${book.title}</h3>
        <h5 class='author'>by ${book.author}</h3>
    </div>
    <div class='card-body' style="display: none">
        <p>${book.pages} pages</p>
        <p class 'read-status'>${book.read ? "Read" : "Not Read Yet"}</p>
        <button class='remove-btn' onclick='deleteBook(${i})'>Remove</button>
        <button class='toggle-read-btn' onclick='toggleRead(${i})'>Completed?</button>
    </div>
`;
    bookContainer.onmouseover = () => {
      bookContainer.innerHTML = `
        <div class='card-header'>
          <h3 class='title'>${book.title}</h3>
          <h5 class='author'>by ${book.author}</h3>
        </div>
        <div class='card-body' >
          <p>${book.pages} pages</p>
          <p class 'read-status'>${book.read ? "Read" : "Not Read Yet"}</p>
          <button class='remove-btn' onclick='deleteBook(${i})'>Remove</button>
          <button class='toggle-read-btn' onclick='toggleRead(${i})'>Completed?</button>
        </div>
      `;
      bookContainer.onmouseout = () => {
        bookContainer.innerHTML = `
        <div class='card-header'>
          <h3 class='title'>${book.title}</h3>
          <h5 class='author'>by ${book.author}</h3>
        </div>`;
      };

      console.log(bookContainer.innerHTML);
    };
    libraryContainer.appendChild(bookContainer);
  }
}

function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  createBook();
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  createBook();
}

let makeNewBook = document.querySelector("#new-book-btn");
makeNewBook.addEventListener("click", () => {
  let newBookForm = document.querySelector("#new-book-form");
  newBookForm.style.display = "block";
  makeNewBook.style.display = "none";
});

document.querySelector("#new-book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
});
