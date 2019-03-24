import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Cookies from '../../service/CookieService'
import { FacebookButton, ButtonTranparent } from '../Core/Button'
import AuthService from '../../service/AuthService'

const responseFacebook = async (response) => {
  await AuthService.login(response)
}
const changetoRegisterPage = async () => {
  if (Cookies.gettokenJWTCookie()) {
    Router.push({
      pathname: '/waiting'
    })
  }
}

const Img = styled.img`
  width: 50%;
  cursor : pointer;
`
class LoginFaceBook extends React.Component {
  componentDidMount() {
    changetoRegisterPage()
  }
  render() {
    return (
      <FacebookLogin
        scope="email"
        autoLoad={false}
        fields="name,email,picture,id"
        appId="2259610627641637"
        callback={responseFacebook}
        render={renderProps => (
          <React.Fragment>
            {/* <ButtonTranparent onClick={renderProps.onClick}> */}
            <Img src="/static/img/BtnFacebook.png" onClick={renderProps.onClick} />
            {/* </ButtonTranparent> */}
          </React.Fragment>
        )}
      />
    )
  }
}

export default LoginFaceBook
