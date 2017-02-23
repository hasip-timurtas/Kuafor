import React from 'react'
import { Link } from 'react-router'


export const MainMenu = () => (
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
                          <Link className="navbar-brand" to="/">MHT Client Service</Link>
                      </div>

                  </div>
              </nav>
    )

export default MainMenu
