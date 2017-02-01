import React from 'react';

export default class SingleNote extends React.Component {
    showNote() {
        this.props.showNote(this.props.notem);
    }

    render() {
        return (
            <a onClick={this.showNote.bind(this)} href="#" className="list-group-item recent-note" refs="notem">
                {this.props.notem.title}
            </a>
        )
    }
}
