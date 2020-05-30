import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfChange from './ShelfChange';
import StarRatingComponent from 'react-star-rating-component';

class Book extends Component{

    state = {
        rating: this.props.book.averageRating,
    }

    handleRatingComponentClick = (nextValue, prevValue, name) => {
        this.props.handleRatingChange(this.props.book, nextValue);
    };

    render()
    {
        const {book, 
            handleShelfChange,
            bookShelfTypes, 
            getCurrentBookShelf,
            isRatingEditable,} = this.props;

        const {rating} = this.state;

        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" 
                style={{ width: 128, 
                            height: 193, 
                            backgroundImage: `url(${book.imageLinks?book.imageLinks.smallThumbnail:null})` }}></div>
                <ShelfChange
                getCurrentBookShelf={getCurrentBookShelf}
                handleShelfChange={handleShelfChange}
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
                <StarRatingComponent 
                    name="starRate" 
                    starCount={5}
                    value={rating}
                    starColor={'#60ac5d'}
                    editing={isRatingEditable}
                    onStarClick={this.handleRatingComponentClick}
                />
            </div>
        );
    }
}

Book.propTypes = {
    handleShelfChange: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    bookShelfTypes: PropTypes.object.isRequired,
    getCurrentBookShelf: PropTypes.func
  }

export default Book;