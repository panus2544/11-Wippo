import Button from 'antd'
import React from 'react'
import Router from 'next/router'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Cookies from '../../service/CookieService'

import AuthService from '../../service/AuthService'

const responseFacebook = async (response) => {
  await AuthService.login(response)
  let token = Cookies.gettokenJWTCookie()
  console.log(token)
  if (token) {
    changetoRegisterPage()
  } else {
  }
}

const changetoRegisterPage = () => {
  if (Cookies.gettokenJWTCookie()) {
   console.log('havecookie')
  }
}

class LoginFaceBook extends React.Component {
  componentDidMount () {
    changetoRegisterPage()
  }
  render () {
    return (
      <FacebookLogin
        scope="email"
        autoLoad={false}
        fields="name,email,picture,id"
        appId="293604811359850"
        callback={responseFacebook}
        render={renderProps => (
          <Button size="large " block type="primary" onClick={renderProps.onClick}>Login!</Button>
        )}
      />
    )
  }
}

export default LoginFaceBook
