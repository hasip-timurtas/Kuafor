import  React, {Component} from 'react';

export  default class NewNote extends Component {
    addNote(event) {
        event.preventDefault();
        var title = this.refs.title.value.trim();
        var content = this.refs.content.value.trim();

        Meteor.call("newNote", title, content);

        this.refs.title.value = "";
        this.refs.content.value = "";
    }

    render() {
        return (
            <form className="new-note" onSubmit={this.addNote.bind(this)}>
                <div className="row">
                    <div className="=form-group">
                        <div className="col-md-6">
                            <input type="text" className="form-control" name="title" placeholder="title" ref="title"/>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="=form-group">
                        <div className="col-md-6">
                            <textarea className="form-control" name="content" placeholder="Content" rows="5"
                                      ref="content"></textarea>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="=form-group">
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-default add-post">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        )

    }
}
