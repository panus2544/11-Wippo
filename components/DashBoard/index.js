import React, { Component } from 'react'
import { Card } from 'antd'

export default class DashBoard extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-4">
            <Card title="จำนวนคนที่สมัคร">
              <h1>2</h1>
            </Card>
          </div>
          <div className="col-4">
            <Card title="จำนวนคนที่ตอบคำถามเสร็จแล้ว">
              <h1>2</h1>
            </Card>
          </div>
          <div className="col-4">
            <Card title="จำนวนคนที่ยังตอบคำถามไม่เสร็จ">
              <h1>2</h1>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}
