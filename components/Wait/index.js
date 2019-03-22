import React from 'react'
import { Card } from 'antd'
import Cookies from '../../service/CookieService'

export default class index extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <Card title="รอสิทธิ์เข้าถึงระบบ">
              <h2>Name : {Cookies.getName()}</h2>
              <h2>WIP ID: {Cookies.getWipId()}</h2>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}
