import React from 'react'
import App from '../components/ViewRegistrants'
import Cookie from '../service/CookieService'
import Route from 'next/router'
class index extends React.Component {
  componentDidMount = () => {
    this.handleLogin()
  }

  handleLogin = () =>{
    if(!Cookie.gettokenJWTCookie()){
      Route.push({
        pathname : '/index'
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
