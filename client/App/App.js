import React from 'react';
import RecentlyAdded from './Components/RecentlyAdded';
import SearchNote from './Components/SearchNote';
import ShowNote from './Components/ShowNote';

Notes = new Meteor.Collection("notes");
Meteor.subscribe("getNotes");

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedNote: [],
            selectedNote1: {noteId: '', title: '', content: ''}
        }
    }

    showNote(note) {
        this.setState({selectedNote: note});
        this.setState({
            selectedNote1: {
                noteId: note._id,
                title: note.title,
                content: note.content
            }
        });
    }

    checkForNote() {
        // if there is a selected note then showNote will appear.
        if (this.state.selectedNote._id) {
            return <ShowNote selectedNotem={this.state.selectedNote}
                             selectedNote1={this.state.selectedNote1}
                             titleChange={this.titleChange.bind(this)}
                             contentChange={this.contentChange.bind(this)}/>;
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <SearchNote selectedNotem={this.state.selectedNote}/>
                    <hr/>
                    {this.checkForNote()}
                </div>
                <div className="col-md-4">
                    <RecentlyAdded selectedNotem={this.state.selectedNote}
                                   showNote={this.showNote.bind(this) }
                    />
                </div>

                <div>
                    {Meteor.userId() ? "Login Oldu" : "Olmadıı"}
                </div>


            </div>

        )
    }


    titleChange(event) {
        this.setState({
            selectedNote1: {
                noteId: this.state.selectedNote1.noteId,
                title: event.target.value,
                content: this.state.selectedNote1.content
            }
        });

        console.log(this.state);
    }

    contentChange(event) {
        this.setState({
            selectedNote1: {
                noteId: this.state.selectedNote1.noteId,
                title: this.state.selectedNote1.title,
                content: event.target.value
            }
        });
    }
}
