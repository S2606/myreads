import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfChange from './ShelfChange';

class Book extends Component{
    render() {

        const {book, handleStatusChange, bookShelfTypes} = this.props;

        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" 
                style={{ width: 128, 
                         height: 193, 
                         backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <ShelfChange
                handleStatusChange={handleStatusChange}
                bookTitle={book.title}
                bookCurrentShelf={book.shelf}
                bookShelfTypes={bookShelfTypes}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        );
    }
}

export default Book;