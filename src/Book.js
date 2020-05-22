import React from 'react';
import PropTypes from 'prop-types';
import ShelfChange from './ShelfChange';

const Book = props => {
    const {book, handleStatusChange, bookShelfTypes, getCurrentBookStatus } = props;

    return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" 
            style={{ width: 128, 
                        height: 193, 
                        backgroundImage: `url(${book.imageLinks?book.imageLinks.smallThumbnail:null})` }}></div>
            <ShelfChange
            getCurrentBookStatus={getCurrentBookStatus}
            handleStatusChange={handleStatusChange}
            currentBook={book}
            bookShelfTypes={bookShelfTypes}/>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
                {book.authors?
                book.authors.reduce((acc, cur) => acc+","+cur):
                null
                }
            </div>
        </div>
    );
}

Book.propTypes = {
    handleStatusChange: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    bookShelfTypes: PropTypes.object.isRequired,
    getCurrentBookStatus: PropTypes.func
  }

export default Book;