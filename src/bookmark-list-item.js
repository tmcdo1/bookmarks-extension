import React, { Component } from 'react';
import { Link } from 'react-router';

/*
* Props:
* type
* item {id, title, url, children}
*/

class BookmarkListItem extends Component {

    constructor(props) {
        super(props);
        this.STRWIDTH = 40;

        this.state = {
            currNode: null
        }
    }

    componentDidMount() {
        this.getItem(this.props.id)
    }

    getItem(id) {
        browser.bookmarks.get(id).then(node => {
            this.setState({currNode: node});
        });
    }

    render() {
        if(this.state.currNode) {
            if(this.props.type === 'folder'){
                if (child.children.length > 0) {
                    let imgUrl = browser.extension.getURL('icons/outline_keyboard_arrow_right_black_48dp.png')
                    return <Link to={`/${this.props.item.id}`}><li id={this.props.item.id}>{this.shortenString(this.props.item.title)}<div class='spacer' /><img src='${imgUrl}' class='folder-arrow'/></li></Link>;
                } else {
                    return <li id={this.props.item.id}>{this.shortenString(this.props.item.title)}</li>;
                }
            } else if(this.props.type === 'separator') {
    
            } else if(this.props.type === 'bookmark') {
                return <a href={this.props.item.url}><li id={this.props.item.id}>{this.shortenString(this.props.item.title)}</li></a>;
            } else 
                return;
        }
    }

    shortenString(str) {
        if(str.length > this.STRWIDTH) {
            str = str.substring(0,this.STRWIDTH-3) + '...'
        }
        return str;
    }
}

export default BookmarkListItem;