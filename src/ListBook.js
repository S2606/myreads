import React from 'react';
import PropTypes from "prop-types";
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import { fetchKeyArrayfromDict, isShelfTypeIgnored } from './utils';

const ListBook = props => {
    const { bookShelfTypes, books, handleStatusChange, handleRatingChange} = props;
    const keyArr = fetchKeyArrayfromDict(bookShelfTypes);
    return(
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                {
                    keyArr
                    .filter(bookShelf => !isShelfTypeIgnored(bookShelf))
                    .map((bookShelf, index) => (
                        <BookShelf
                            key={index}
                            shelfTitle={bookShelfTypes[bookShelf]}
                            books={books.filter(book => book.shelf === bookShelf)}
                            handleStatusChange={handleStatusChange}
                            bookShelfTypes={bookShelfTypes}
                            handleRatingChange={handleRatingChange}
                        />
                    ))
                }
                </div>
                <Link to='/search'>
                    <div className="open-search">
                        <button className="open-search">
                            Add a book
                        </button>
                    </div>
                </Link>
            </div>
        </div>
        );
}

ListBook.propTypes = {
    handleStatusChange: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    bookShelfTypes: PropTypes.object.isRequired,
  }

export default ListBook;