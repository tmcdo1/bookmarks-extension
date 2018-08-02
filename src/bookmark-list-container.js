import React, { Component } from 'react';
import BookmarkListItem from './bookmark-list-item';

class BookmarkListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            selectedFolder: "",
            rootId: ""
        };
    }

    componentDidMount() {
        if(!this.props.match.params.folder){
            browser.bookmarks.getTree()
                .then(treeList => this.setState({
                    children: treeList[0].children,
                    selectedFolder: treeList[0].id,
                    rootId: treeList[0].id
                }))
                .catch(error => console.log(`Error: ${error}`));
        } else {
            browser.bookmarks.getChildren(this.props.match.params.folder)
                .then(children => {
                    this.setState({
                        children,
                        selectedFolder: this.props.match.params.folder
                    })
                });
            
        }
    }

    renderBookmarks() {
        return this.state.children.map(child => {
            return <BookmarkListItem type={child.type} item={child}/>
        })
    }
    
    render() {
        return (
            <div>
                <h2>{this.state.selectedFolder}</h2>
                {this.renderBookmarks()}
            </div>
        );
    }
}

export default BookmarkListContainer;