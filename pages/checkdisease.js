import React from 'react'
import APP from '../components/CheckDisease'
import CookiesService from './../service/CookieService'
import Router from 'next/router'

export default class waiting extends React.Component {
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
        <APP />
      </div>
    )
  }
}
