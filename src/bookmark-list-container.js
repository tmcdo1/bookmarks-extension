import React, { Component } from 'react';

class BookmarkListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarkTree: null,
            selectedFolder: "",
            rootId: ""
        };
    }

    componentDidMount() {
        if(!this.props.match.params.folder){
            browser.bookmarks.getTree()
                .then(treeList => this.setState({
                    bookmarkTree: treeList[0],
                    selectedFolder: treeList[0].id,
                    rootId: treeList[0].id
                }))
                .catch(error => console.log(`Error: ${error}`));
        } else {
            this.setState({
                selectedFolder: this.props.match.params.folder
            })
        }
    }

    renderBookmarks() {

    }
    
    render() {
        return (
            <div>
                <h2>{this.state.selectedFolder.title}</h2>
                {this.renderBookmarks()}
            </div>
        );
    }
}

export default BookmarkListContainer;