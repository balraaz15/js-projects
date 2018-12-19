// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    // Create tr element
    const row = document.createElement('tr');
    // Insert columns
    row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class="delete">X</a></td>`;
    
    list.appendChild(row);
}

// Clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Show alert
UI.prototype.showAlert = function(className, message) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add Text 
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div,form);

    // Timeout
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}

// Delete book
UI.prototype.deleteBook = function(target) {
    target.parentElement.parentElement.remove();
}

// Event Listeners for adding book
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;
    
    // Instantiating book
    const book = new Book(title, author, isbn);

    // Instantiating UI objects
    const ui = new UI();

    // Validate fields
    if(title === '' || author === '' || isbn === '') {
        // Error Alert
        ui.showAlert('error', 'Please fill in all fields');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Show success alert
        ui.showAlert('success', 'Book successfully added!');

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for deleting book
document.getElementById('book-list').addEventListener('click', function(e){
    // Instantiate UI
    const ui = new UI();

    // Delete book
    if(e.target.className === 'delete') {
        ui.deleteBook(e.target);

        // Show alert
        ui.showAlert('success', 'Book removed.');
    }
    

    e.preventDefault();
});
