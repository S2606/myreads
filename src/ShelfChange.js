import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchKeyArrayfromDict, isShelfTypeIgnored } from './utils';

class ShelfChange extends Component{

    state = {
        value: this.props.bookCurrentShelf,
    };

    handleSelectChange = event => {
        this.props.handleStatusChange(event.target.value, this.props.bookTitle);
    }

    render() {

        const { bookShelfTypes } = this.props; 
        const keyArr = fetchKeyArrayfromDict(bookShelfTypes);

        return (
            <div className="book-shelf-changer">
                <select value={this.state.value} onChange={this.handleSelectChange}>
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

export default ShelfChange;