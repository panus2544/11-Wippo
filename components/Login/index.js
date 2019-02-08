import React from 'react'
import LoginFaceBook from './LoginFaceBook'

class Login extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col- col-md-6">
            
          </div>
        <div className="col- col-md-6 mt-5">
            <p>เข้าสู้ระบบ wippo</p>
            <LoginFaceBook setPage={this.props.setPage} userAuth={this.props.userAuth}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
