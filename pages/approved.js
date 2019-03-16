import React from 'react'
import CookiesService from '../service/CookieService'
import Approve from '../components/Approved'
import Router from 'next/router'

export default class approved extends React.Component {
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
      <div>
        <Approve />
      </div>
    )
  }
}
