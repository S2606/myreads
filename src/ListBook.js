import React, { Component } from 'react';
import PropTypes from "prop-types";
import BookShelf from './BookShelf';
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
                    {/*
                    <div className="open-search">
                        <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                    </div>
                    */}
                </div>
            </div>
          );
    }
}

export default ListBook;