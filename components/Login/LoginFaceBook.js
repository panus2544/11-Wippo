import React from 'react'
import Router from 'next/router'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Cookies from '../../service/CookieService'

import AuthService from '../../service/AuthService'



class LoginFaceBook extends React.Component {
  componentDidMount () {
    this.changetoRegisterPage()
  }
  responseFacebook = async (response) => {
    await AuthService.login(response)
    let token = Cookies.gettokenJWTCookie()
    console.log(token)
    if (token) {
      this.changetoRegisterPage()
    } else {
    }
  }

  changetoRegisterPage = async() => {
    if (Cookies.gettokenJWTCookie()) {
     console.log('havecookie')
    this.props.userAuth()
     this.props.setPage('1')
    }
  }
  render () {
    return (
      <FacebookLogin
        scope="email"
        autoLoad={false}
        fields="name,email,picture,id"
        appId="293604811359850"
        callback={this.responseFacebook}
        render={renderProps => (
          <button size="large " block type="primary" onClick={renderProps.onClick}>Login!</button>
        )}
      />
    )
  }
}

export default LoginFaceBook
