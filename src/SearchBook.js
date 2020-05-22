import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

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

    render(){

        const { searchedBooks, handleStatusChange, bookShelfType } = this.props;

        return (
            <div className="search-books">
            <div className="search-books-bar">
              {/*<button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>*/}
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                type="text" 
                value={this.state.searchTerm}
                placeholder="Search by title or author"
                onChange={this.handleSearchTermChange}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ul className="books-grid-left">
                {
                    searchedBooks.map((singleBook, index) => (
                        <li key={index}>
                            <Book 
                            book={singleBook}
                            handleStatusChange={handleStatusChange}
                            bookShelfTypes={bookShelfType}/>
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