import React from 'react'
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBook from './ListBook';
import SearchBook from './SearchBook';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    bookShelfTypes: {
      "move": "Move to..",
      "currentlyReading": "Currently Reading",
      "wantToRead": "Want to Read",
      "read": "Read",
      "none": "None"
    },
    books: [],
  }

  /**
   * Function for add new book to the shelf(component state)
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   */
  handleNewBookEntry = (book, shelf) => {
    book['shelf'] = shelf;
    this.setState(prevState => ({
      books: [...prevState.books, book],
    }));
  };

  /**
   * Function to get current Book Status
   * @param {bookId} Book ID for which status is to be known
   */
  getCurrentBookShelf = (bookId) => {
    let requiredBook = this.state.books.filter(book => book.id===bookId);
    return requiredBook.length>0?requiredBook[0].shelf:"none";
  };

  /**
   * Function for handling book shelf change at both the server as well as the state
   * @param {string} book - The book whose shelf is to be changed.
   * @param {string} author - The author of the book.
   */
  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(
      bookShelfType => {
          let currentlyReadingBookShelfType = [];
          let wantToReadBookShelfType = [];
          let readBookShelfType = [];
          let isBookPresent = this.state.books.filter(currbook => currbook.id === book.id);
          // Checking if this book is book picked from search or the one already 
          // mentioned in search list 
          if(isBookPresent[0]===undefined){
            this.handleNewBookEntry(book, shelf);
          } else {
            // Since on update, the API responds with book ID's, need to update
            // them with current shelf types
            for (let bookId of bookShelfType['currentlyReading']){
              let currentBook = this.state.books.filter(book => book.id === bookId);
              currentBook[0]['shelf'] = 'currentlyReading';
              currentlyReadingBookShelfType.push(currentBook[0]);
            }
            for (let bookId of bookShelfType['wantToRead']){
              let currentBook = this.state.books.filter(book => book.id === bookId);
              currentBook[0]['shelf'] = 'wantToRead';
              wantToReadBookShelfType.push(currentBook[0]);
            }
            for (let bookId of bookShelfType['read']){
              let currentBook = this.state.books.filter(book => book.id === bookId);
              currentBook[0]['shelf'] = 'read';
              readBookShelfType.push(currentBook[0]);
            }
            this.setState({
              books: [...new Set([ 
                ...currentlyReadingBookShelfType, 
                ...wantToReadBookShelfType,
                ...readBookShelfType])],
            });
          }
      });
  }

  /**
   * Function for handling book rating change at the state level
   * @param {string} currentBook - The book whose rating is to be changed.
   * @param {string} rating - The rating of the book.
   */
  handleRatingChange = (currentBook, rating) => {
    // Since (total/count) = average so finding total rating count
    let newRatingCount=0, newAverageRating=0;
    if(!isNaN(currentBook.averageRating) && !isNaN(currentBook.ratingsCount)){
        let totalBookRating = currentBook.averageRating * currentBook.ratingsCount;
        newRatingCount  = currentBook.ratingsCount + 1;
        // Calculating new average from updated count and total rating
        newAverageRating = (totalBookRating+rating)/newRatingCount;
    } else {
      newRatingCount  = 1;
      newAverageRating = rating;
    }
    
    this.setState(prevState => {
      const books = prevState.books.map((book) => {
        if (book.id === currentBook.id) {
          const updatedBook = {
            ...book,
            averageRating: newAverageRating,
            ratingsCount: newRatingCount,
          };
   
          return updatedBook;
        }
   
        return book;
      });

      return {
        books,
      };
    });
    
  }

  componentDidMount() {
      BooksAPI.getAll().then(
        (books) => this.setState({
            books,
        })
      );
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <ListBook
            bookShelfTypes={this.state.bookShelfTypes}
            books={this.state.books}
            handleShelfChange={this.handleShelfChange}
            handleRatingChange={this.handleRatingChange}
            />
        )}/>
        <Route path='/search' render={() => (
            <SearchBook
            getCurrentBookShelf={this.getCurrentBookShelf}
            handleShelfChange={this.handleShelfChange}
            bookShelfTypes={this.state.bookShelfTypes}
            handleRatingChange={this.handleRatingChange}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
