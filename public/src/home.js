//GOAL: returns a number to represent the number of book obkects inside the array
//PSUEDOCODE:
// get total amount of books using reduce

function getTotalBooksCount(books) {
  return books.reduce((total, book) => {
    total++
    return total;
  }, 0);
}

//GOAL: return a number representing number of account objects inside array
// PSUEDOCODE:
// same as previous function. use reduce. to get total amt of accounts

function getTotalAccountsCount(accounts) {
  return accounts.reduce((total, account) => {
    total++
    return total;
  }, 0)
}

//GOAL: return a number representing number of books that are checked out of the library. first transaction object in borrows array
//PSUEDOCODE
// use reduce to get total amt 
// filter through returned books 

function getBooksBorrowedCount(books) {
  return books.reduce((total, book) => {
     return total + book.borrows
     .filter(({ returned }) => !returned).length;
  }, 0);
}

//==============================================================

//GOAL: return array containing five objects or fewer that represents most common occurring genres, ordered from most common to least 
// returned array should have two keys, 1. name key representing name of genre 2. count key which represents number of times genre occurs 

//count genres

// HELPER FUNCTION
// use reduce to get the total genre count 
// return counts for each genre
function calculateGenreCount(books) {
  return books.reduce((counts, book) => { 
    const genre = book.genre;
    counts[genre] = (counts[genre] || 0) + 1;
    return counts;
  }, {})
}

//new object gets turned into array
// sort and descend amt of genres 
// limit object to 5 
// map to transform object to have name of genre and the count with keys
function getSortedGenres(genreCounts) {
  const sorted = Object.keys(genreCounts).sort((a, b) => 
  genreCounts[b] - genreCounts[a]);
  return sorted.filter((genre, index) => index < 5)
  .map(name => ({ name, count: genreCounts[name] }));
}


// uses helper functions to calculate genre count 
// return list of genres and count in sorted format
function getMostCommonGenres(books) {
  const genreCounts = calculateGenreCount(books);
  return getSortedGenres(genreCounts);
}

//==================================================

//GOAL: return array containing five objects or less representing most popular books in library. popularity is number of time book has been borrowed 
// each object in returned array has 'name' key representing title of book and 'count' key representing number of times book has been borrowed 

//  get borrowed books object 
//HELPER FUNCTION
function getBorrowedBooks(books) {
  return books.reduce((total, book) => {
    const borrowCount = book.borrows.length;
    total[book.title] = borrowCount;
    return total;
  }, {});
}

//sort by popularity
// get array and sort descending
// limit index to 5 w/ filter 
// create object 
//HELPER FUNCTION
function sortByPopularity(totalBorrowed) {
  const popular = Object.keys(totalBorrowed).sort((a, b) => totalBorrowed[b] - totalBorrowed[a]);
  return popular.filter((borrowed, index) => index < 5)
  .map(name => ({ name, count: totalBorrowed[name] }));
}


//combine two previous functions 
// get total borrowed books object 
// sorts by most popular
function getMostPopularBooks(books) {
  const totalBorrowed = getBorrowedBooks(books);
  return sortByPopularity(totalBorrowed);
}

//=================================================

//GOAL: returns array containing five objects or less representing most popular authors whose books have been checked out the most
// popularity is finding all books written by author and adding up the number of times those books have been borrowed 
// each object has two keys, 'name' representing first and last name, and 'count' representing number of times author's books have been borrowed 

//get author count whose books have been checked out 
// find the authors whose ids are in book object
// author name is first and last name

function calculateAuthorPopularity(books, authors) {
  return books.reduce((total, book) => {
    const author = authors.find(author => author.id === book.authorId);
    if (author) {
      const authorName = `${author.name.first} ${author.name.last}`;
      total[authorName] = (total[authorName] || 0) + book.borrows.length;
    }
    return total;
  }, {});
}

//author object sorted by turning into array to have index less than 5
// object with name and count goes into array 
function sortByPopularity(popular) {
  return Object.keys(popular)
  .sort((a, b) => popular[b] - popular[a])
  .filter((author, index) => index < 5)
  .map(name => ({ name, count: popular[name] }));
}

// combintes two functions above 
// prints out array of most popular authors 
function getMostPopularAuthors(books, authors) {
  const popularAuthors = calculateAuthorPopularity(books, authors);
  return sortByPopularity(popularAuthors);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
