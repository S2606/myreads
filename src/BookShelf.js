import React, { Component } from 'react';
import PropTypes from "prop-types";
import Book from './Book';

class BookShelf extends Component {
    render(){

        const { shelfTitle, books} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((singleBook, index) => (
                            <li key={index}>
                                <Book 
                                book_image={singleBook.imageLinks.smallThumbnail}
                                book_title={singleBook.title}
                                book_authors={singleBook.authors}/>
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