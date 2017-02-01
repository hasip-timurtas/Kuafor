import React from 'react';

import SingleNote from './SingleNote';

export default class SearchNote extends React.Component {

    constructor() {
        super();
        this.state = {
            searchText: ''
        }
    }

    UpdateSearch(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    loadData() {
        if (this.state.searchText != '') { // if text is empty return []
            return Notes.find({
                owner_id: Meteor.userId(),
                title: {$regex: this.state.searchText, $options: "i"}
            }).fetch();
        } else {
            return [];
        }
    }

    render() {

        var notes = this.loadData().map(note => {
            return <SingleNote notem={note} key={note._id}/>;
        });

        return (
            <div>

                <input type="text"
                       className="form-control searchNote"
                       onChange={this.UpdateSearch.bind(this)}
                       placeholder="Search"
                       ref="searchText"
                       value={this.state.searchText}
                />

                {notes}
            </div>
        )
    }
}
