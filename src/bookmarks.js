import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router';

import BookmarkListContainer from './bookmark-list-container';

class BookmarkPopup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('Tree',this.state.bookmarkTree);
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/:folder" component={BookmarkListContainer} />
                        <Route component={BookmarkListContainer} />
                    </Switch>       
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<BookmarkPopup />, document.getElementById('app'));