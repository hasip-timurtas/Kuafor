import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { MainMenu } from '/imports/ui/_components/navigation'
import { browserHistory } from 'react-router'

const UserNotLoggedIn = () => (
    <div>
      <h2>Login with google account, keep your clientServices and share..</h2>
      <h4>For using the application please log in.</h4>
      <img src="/screen.jpg" width="60%"/>
      <img src="/phone.jpg" width="25%"/>
    </div>
  )

export class MainLayout extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    children: PropTypes.any
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { children, currentUser: { user } } = this.props
    return (
      <div className="main-layout">
          <MainMenu />
          <div className="container">
            {children}
          </div>
          <div className="footer"> <strong> MHT </strong> and <strong>Studio D&D </strong></div>
      </div>
    )
  }
}

export default connect(
  ({ globalData: {
    currentUser
  }
}) => ({
  currentUser
}))(MainLayout)
