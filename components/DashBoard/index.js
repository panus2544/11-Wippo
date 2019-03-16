import React from 'react'
import { Card } from 'antd'
import { Stats } from '../../service/RegistanceService'
import GraphBox from './GraphBox';
import { DatePicker } from 'antd';
import { async } from 'rxjs/internal/scheduler/async';
const { RangePicker } = DatePicker;

export default class DashBoard extends React.Component {
  state = {
    stats: [
      {
        total_applicant: '',
        total_success: '',
        total_unsuccess: ''
      }
    ],
    startdate: '',
    enddate: ''
  };
  async componentDidMount() {
    this.getCountRegistrants()
  }

  getCountRegistrants = async () => {
    const count = await Stats.getRegistrantStats();
    this.setState({
      stats: count.data
    })
    console.log(this.state.stats);
  }

  handleDatePickerChange = async (date, dateString) => {
    this.startdate = dateString[0],
    this.enddate = dateString[1]
  }
  render() {
    return (
      <div className="row p-4">
        <div className="col col-md-6">
          <h2>ข้อมูลสรุป</h2>
          <h6>จำนวนคนที่ลงทะเบียน (แบ่งตามเวลา)</h6>
          <RangePicker
            onChange={(date, dateString) => this.handleDatePickerChange(date, dateString)} />
          <div className="col col-md mt-2">
            <GraphBox startdate={this.state.startdate} enddate={this.state.enddate} />
          </div>
          <h6>จำนวนคนที่ลงทะเบียน (แบ่งตามวัน)</h6>
      
          <div className="col col-md mt-2">
            <GraphBox startdate={this.state.startdate} enddate={this.state.enddate} />
          </div>
        </div>

        <div className="col col-md-6">
          <div className="col col-md mt-2">
            <Card title="จำนวนคนที่ลงทะเบียนทั้งหมด (คน)">
              {this.state.stats.total_applicant}
            </Card>
          </div>
          <div className="col col-md mt-2">
            <Card title="จำนวนคนที่กรอกใบสมัครเรียบร้อย (คน)">
              {this.state.stats.total_success}
            </Card>
          </div>
          <div className="col col-md mt-2">
            <Card title="จำนวนคนที่กรอกใบสมัครเรียบร้อย (คน)">
              {this.state.stats.total_unsuccess}
            </Card>
          </div>
        </div>

      </div >

    )
  }
}
