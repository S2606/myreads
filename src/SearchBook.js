import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { debounce } from './utils';

class SearchBook extends Component{

    state = {
        searchedBooks: [],
    }

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
    } 

    handleSearchTermChange = event => {
        debounce(
          this.handleSearchQuery(event.target.value),
          5000);
      } 

    render(){

        const { handleStatusChange, bookShelfTypes, getCurrentBookStatus } = this.props;
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
                            getCurrentBookStatus={getCurrentBookStatus} 
                            book={singleBook}
                            handleStatusChange={handleStatusChange}
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
  handleStatusChange: PropTypes.func.isRequired,
  bookShelfTypes: PropTypes.object.isRequired,
  getCurrentBookStatus: PropTypes.func.isRequired,
}

export default SearchBook;