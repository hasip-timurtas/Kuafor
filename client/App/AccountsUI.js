import React, { Component } from 'react'
import ReactDom from 'react-dom'


export default class AccountsUI extends Component {

  componentDidMount () {
    this.view = Blaze.render(Template.loginButtons,
            ReactDom.findDOMNode(this.refs.container))
  }

  companentWillUnmount () {
    Blaze.remove(this.view)
  }

  render () {
    return <span ref="container" />
  }
}
