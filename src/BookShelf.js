import React, { Component } from 'react';
import PropTypes from "prop-types";
import Book from './Book';

class BookShelf extends Component {
    render(){

        const { shelfTitle, books, handleStatusChange, bookShelfTypes} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid-centre">
                        {
                            books.map((singleBook, index) => (
                            <li key={index}>
                                <Book 
                                book={singleBook}
                                handleStatusChange={handleStatusChange}
                                bookShelfTypes={bookShelfTypes}/>
                            </li> 
                            ))
                        }
                    </ol>
                  </div>
            </div>
        );
    }
}

export default BookShelf;