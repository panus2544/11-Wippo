import React from 'react'
import { Card } from 'antd'
import { Stats } from '../../service/RegistanceService'

export default class DashBoard extends React.Component {
  state = {
    stats: [
      {
        total_applicant: '',
        total_success: '',
        total_unsuccess: ''
      }
    ]
  };
  async componentDidMount() {
    this.getCountRegistrants()
  }

  getCountRegistrants = async () => {
    const count = await Stats.getRegistrantStats();
    this.setState({
      stats: count.data
    })
  }

  render() {
    return (
      <div className="row md-12 p-4">
        <div className="col col-md-4 mt-2">
          <Card title="จำนวนคนที่สมัคร">
            {this.state.stats.total_applicant}
          </Card>
        </div>
        <div className="col col-md-4 mt-2">
          <Card title="จำนวนคนที่ตอบคำถามเสร็จแล้ว">
            {this.state.stats.total_success}
          </Card>
        </div>
        <div className="col col-md-4 mt-2">
          <Card title="จำนวนคนที่ยังตอบคำถามไม่เสร็จ">
            {this.state.stats.total_unsuccess}
          </Card>
        </div>
      </div>
    )
  }
}
