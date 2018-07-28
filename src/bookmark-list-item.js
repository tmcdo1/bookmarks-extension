import React, { Component } from 'react';
import { Link } from 'react-router';

class BookmarkListItem extends Component {
    constructor(props) {
        super(props);
    }

    getItem() {

    }

    render() {
        if(this.props.type === 'folder'){
            return <Link to={`/${this.props.item.id}`}><li></li></Link>;
        } else if(this.props.type === 'separator') {

        } else if(this.props.type === 'bookmark') {

        } else 
            return;
    }
}

export default BookmarkListItem;