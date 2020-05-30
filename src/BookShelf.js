import React, { Component } from 'react';
import PropTypes from "prop-types";
import Book from './Book';

class BookShelf extends Component {
    render(){

        const { shelfTitle, 
            books, 
            handleShelfChange, 
            bookShelfTypes, 
            handleRatingChange} = this.props;

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
                                handleShelfChange={handleShelfChange}
                                bookShelfTypes={bookShelfTypes}
                                handleRatingChange={handleRatingChange}
                                isRatingEditable={true}/>
                            </li> 
                            ))
                        }
                    </ol>
                  </div>
            </div>
        );
    }
}

BookShelf.propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    handleShelfChange: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    bookShelfTypes: PropTypes.object.isRequired,
  }

export default BookShelf;