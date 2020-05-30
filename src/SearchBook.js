import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { debounce } from './utils';

class SearchBook extends Component{

    state = {
        searchedBooks: [],
    }

    /**
   * Function for handling search query
   * @param {string} query - The query to be searched.
   */
    handleSearchQuery = query => {
      if(query===""){
        this.setState({
          searchedBooks: []
        });
      } else {
        BooksAPI.search(query).then(
          books => this.setState(() => ({
              // Checking if API does not throw an error for better error handling
              searchedBooks: books !== undefined && books['error'] === undefined ? books:[],
          }))
        );
      }
    };

    handleSearchTermChange = event => {
        debounce(
          this.handleSearchQuery(event.target.value),
          5000);
    }; 

    render(){

        const { handleShelfChange, bookShelfTypes, getCurrentBookShelf } = this.props;
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <div className="search-books-input-wrapper">
                <input 
                type="text" 
                placeholder="Search by title or author"
                onChange={this.handleSearchTermChange}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ul className="books-grid-left">
                {
                    this.state.searchedBooks.map((singleBook, index) => (
                        <li key={index}>
                            <Book
                            getCurrentBookShelf={getCurrentBookShelf} 
                            book={singleBook}
                            handleShelfChange={handleShelfChange}
                            bookShelfTypes={bookShelfTypes}
                            isRatingEditable={false}/>
                        </li> 
                    ))
                }
              </ul>
            </div>
          </div>
        )
    }
}

SearchBook.propTypes = {
  handleShelfChange: PropTypes.func.isRequired,
  bookShelfTypes: PropTypes.object.isRequired,
  getCurrentBookShelf: PropTypes.func.isRequired,
}

export default SearchBook;