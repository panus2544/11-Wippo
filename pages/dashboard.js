import React from 'react'
import App from '../components/Core/App'
import CookiesService from '../service/CookieService'
import { hidden } from 'ansi-colors';
import Router from 'next/router'

class index extends React.Component {
  componentDidMount() {
    this.handleCheckLoginState()
  }
  handleCheckLoginState = async () => {
    if (!CookiesService.gettokenJWTCookie()) {
      Router.push({
        pathname: '/index'
      })
    }
  }
  render() {
    return (
      <App />
    )
  }
}

export default index
