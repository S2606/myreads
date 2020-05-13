import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfChange from './ShelfChange';

class Book extends Component{
    render() {

        const {book_image, book_title, book_authors} = this.props;

        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" 
                style={{ width: 128, 
                         height: 193, 
                         backgroundImage: `url(${book_image})` }}></div>
                <ShelfChange/>
                </div>
                <div className="book-title">{book_title}</div>
                <div className="book-authors">{book_authors}</div>
            </div>
        );
    }
}

export default Book;