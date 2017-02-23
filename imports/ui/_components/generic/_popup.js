import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

export class Popup extends Component {
  render () {
    const { closePortal, activeElement, goBack, head, warning, children } = this.props
    return (
      <div className='popup opened'>
        <div className='popup-content'>
          <a className='popup-cancel' onClick={closePortal }>
            <i className='icon-cross'/>
          </a>
          {activeElement &&
          <a className='popup-back' onClick={ goBack }>
            <i className='icon-chevron-left'/>
          </a> }
          {head &&
          <div className='popup-head content'>
            <h2 className={classNames({ 'font-red': warning })}>{ head }</h2>
          </div> }
          <div className='popup-body'>
            {children }
          </div>
        </div>
      </div>
    )
  }
}

Popup.propTypes = {
  head: PropTypes.string,
  children: PropTypes.any.isRequired,
  closePortal: PropTypes.func,
  warning: PropTypes.bool
}

export default Popup
