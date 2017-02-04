import React, { Component } from 'react'
import AccountsUI from './AccountsUI'

export default class Nav extends Component {
  render () {
    return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">MHT Note</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li><a href="/new-note">New Note</a></li>
                            <li><a href="#"> <AccountsUI /> </a></li>
                        </ul>
                    </div>
                </div>
            </nav>

        )
  }
}
