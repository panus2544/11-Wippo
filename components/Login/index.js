import React from 'react'
import LoginFaceBook from './LoginFaceBook'

class Login extends React.Component {
  render () {
    return (
      <div className="container-fluid mt-5">
        <div className="row mt-5 justify-content-center">
          <div className="col-8 col-md-4 mt-5">
            <LoginFaceBook />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
