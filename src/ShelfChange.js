import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchKeyArrayfromDict, isShelfTypeIgnored } from './utils';

class ShelfChange extends Component{

    state = {
        value: this.props.currentBook.shelf!==undefined?
        this.props.currentBook.shelf:
        this.props.getCurrentBookShelf(this.props.currentBook.id),
    };

    handleSelectChange = event => {
        this.props.handleShelfChange(this.props.currentBook, event.target.value);
    };

    render() {

        const { bookShelfTypes } = this.props; 
        const keyArr = fetchKeyArrayfromDict(bookShelfTypes);

        return (
            <div 
            className={`book-shelf-changer book-shelf-changer-${this.state.value}`}>
                <select 
                value={this.state.value} 
                onChange={this.handleSelectChange}>
                {
                    keyArr.map((bookShelf, index) => (
                        (<option 
                            key={index}
                            value={bookShelf}
                            disabled={isShelfTypeIgnored(bookShelf)}>{bookShelfTypes[bookShelf]}</option>)
                    ))
                }
                </select>
            </div>
        );
    }
}

ShelfChange.propTypes = {
    handleShelfChange: PropTypes.func.isRequired,
    bookShelfTypes: PropTypes.object.isRequired,
    getCurrentBookShelf: PropTypes.func
  }

export default ShelfChange;