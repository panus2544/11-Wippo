import React from 'react'
import Wait from '../components/Wait'
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
        <Wait />
      </div>
    )
  }
}
