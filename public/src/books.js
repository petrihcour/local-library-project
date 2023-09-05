// GOAL: returns the author object that has the matching id

//PSEUDOCODE:
// use find method
// if author id matches specified id

function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

//GOAL: return the book object that has the matching ID 
// use find method to see if book id has the specified id 

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

//GOAL: returns an array with two arrays inside of it. all inputted books are in either the first or second array. 
// the first array contains book objects that represent books currently checked out
// second array contains book objects that represent books that have been returned

//PSEUDOCODE:
// use filter to create an array with book object that have books checked out. first transaction object
// use filter to create array with book objects that show books have been returned. first transaction object

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter(book => !book.borrows[0].returned);
  
  const returnedBooks =  books.filter(book => book.borrows[0].returned);

    return [checkedOut, returnedBooks];
}

//GOAL: return array of ten or fewer account objects that represents accounts given by the IDs in the provided book's 'borrows' array
// each account object should incide the `returned` entry from transaction object in `borrows` array

//PSEUDOCODE:
// use map to get specific accounts by their ID in the borrows array
// each account object should include the returned entry from borrows array associated with that id
// 10 or fewer 


// HELPER FUNCTION FOR getBorrowersForBook. shorten the function and made less complicated than being in one function

function findBorrowerById(accounts, id) {
  const borrowerAccount = accounts.find(account => account.id === id);
    return borrowerAccount ? {...borrowerAccount, returned: true} : null;
}


function getBorrowersForBook(book, accounts) {
  return book.borrows
  .map(({ id }) => findBorrowerById(accounts, id))
  .filter((borrower, index) => borrower && index < 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
