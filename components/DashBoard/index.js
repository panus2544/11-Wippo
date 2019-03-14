import React from 'react'
import { Card } from 'antd'

export default class DashBoard extends React.Component {
  render() {
    return (
        <div className="row mt-5 p-2">
          <div className="col col-md-3">
            <Card title="จำนวนคนที่สมัคร">
              <h1>{this.props.allUser.length}</h1>
            </Card>
          </div>
          <div className="col col-md-3 mt-2">
            <Card title="จำนวนคนที่ตอบคำถามเสร็จแล้ว">
            <h1>{this.props.allUser.length}</h1>
            </Card>
          </div>
          <div className="col col-md-3 mt-2">
            <Card title="จำนวนคนที่ยังตอบคำถามไม่เสร็จ">
            <h1>{this.props.allUser.length}</h1>
            </Card>
          </div>
      </div>
    )
  }
}
