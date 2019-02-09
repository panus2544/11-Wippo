import React from 'react'
import LoginFaceBook from './LoginFaceBook'
import colors from '../../config/colors'
import styled from 'styled-components'
import Bg from '../Login/SideBg'

const BgColor = styled.div`
  background-color: ${colors.bgLogin};
  padding:0px;
  height: 100vh;
  z-index: -2;
`

const Logo = styled.img`
  width: 100%;
  z-index: 2;
`
class Login extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row ">
          <BgColor className="col- col-md-6">
            <div className="mt-5">
              <Logo src="/static/img/logo.png" />
            </div>
            <Bg />
          </BgColor>
          <div className="col- col-md-6 d-flex align-items-center">
            <div className="row ">
              <div className="col-12 text-center">
                 <h4>เข้าสู่ระบบ Wippo</h4>
                <LoginFaceBook setPage={this.props.setPage} userAuth={this.props.userAuth} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
