import React, { Component } from 'react';
import PropTypes from "prop-types";
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import { fetchKeyArrayfromDict, isShelfTypeIgnored } from './utils';

class ListBook extends Component {
    render(){
        const { bookShelfType, books, handleStatusChange} = this.props;
        const keyArr = fetchKeyArrayfromDict(bookShelfType);

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
                                shelfTitle={bookShelfType[bookShelf]}
                                books={books.filter(book => book.shelf === bookShelf)}
                                handleStatusChange={handleStatusChange}
                                bookShelfTypes={bookShelfType}
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
}

export default ListBook;