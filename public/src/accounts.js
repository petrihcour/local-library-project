// GOAL: returns the account object that has the matching ID 

// PSUEDOCODE:
// loop through the accounts array
// if id matches specified id, return associated object

function findAccountById(accounts, id) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === id) return accounts[i];
  }
}

//GOAL: returns a sorted array of account objects that are sorted alphabetically by last name

//PSUEDOCODE:
// use the sorted function
// compare iteration of last names 

function sortAccountsByLastName(accounts) {
  return accounts.sort((last1, last2) => last1.name.last > last2.name.last ? 1 : -1);
}

//GOAL: return a number that represents number of times the account's id appears in a book's `borrows` array

//PSUEDOCODE:
//create an array of the books borrowed array id's 
// return number of times account id appears in any books borrows array .length
// use reduce to get total 
function getTotalNumberOfBorrows(account, books) {
  return books
  .reduce((total, book) =>
    total + book.borrows
    .filter(borrow => borrow.id === account.id).length, 0)
}

// GOAL: return array of book objects, including author information that represents all books that are currently checked out by specific account.
// author object is nested inside book object 

//PSUEDOCODE: 
// if authors id matches the books author id, push the authors id object into the associated books object matching that author
// if book is checked out by specific account

function getBooksPossessedByAccount(account, books, authors) {
  return books
  .filter(book => 
    book.borrows
    .some(borrow => borrow.id === account.id && !borrow.returned)
    ) 
    .map(book => 
      ({ ...book, author: authors.find(author => author.id === book.authorId) })
    );
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
