import React from 'react'

export default class SingleNote extends React.Component {
  showNote () {
    this.props.showNote(this.props.notem)
  }

  render () {
    return (
            <a onClick={this.showNote.bind(this)} href="#" className="list-group-item recent-note">
                {this.props.notem.title}
            </a>
        )
  }
}
