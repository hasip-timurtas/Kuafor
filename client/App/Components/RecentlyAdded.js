import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SingleNote from './SingleNote';

export default class RecentlyAdded extends TrackerReact(React.Component) {

    showNote(note) {
        this.props.showNote(note);
    }

    loadData(){
        return Notes.find({owner_id: Meteor.userId()});
    }

    render() {
        var notes = this.loadData().map(note => {
            return <SingleNote notem={note} key={note._id}
                               SelectedNotem={this.props.selectedNote}
                               showNote={this.showNote.bind(this)}
            />;
        });

        return (
            <div className="list-group">
                <a href="#" className="list-group-item disabled">
                    <strong>Lastest Notes</strong>
                </a>
                {notes}
            </div>

        )
    }
}
