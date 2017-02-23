import React, { PropTypes, Component } from 'react'
import { Popup } from './'


export class DeleteRecord extends Component {
  render () {
    const { closePortal, handleDelete, description, strongArea } = this.props
    return (
      <Popup head='WARNING' warning closePortal={closePortal}>
        <div className='popup-body-block content'>
          <p>
            {description}
            <strong>{strongArea}?</strong>
          </p>
          <br/>
          <div className='button-group full-width-button-group button-group-equal-width'>
            <a
              className='button button-green-hover'
              onClick={closePortal}
            >
              No, close window
            </a>
            <a
              className='button button-faint button-red-hover'
              onClick={event => handleDelete(event)}
            >
              Yes, delete
            </a>
          </div>
        </div>
      </Popup>
    )
  }
}

DeleteRecord.propTypes = {
  closePortal: PropTypes.func,
  handleDelete: PropTypes.func,
  description: PropTypes.string,
  strongArea: PropTypes.string
}

export default DeleteRecord
