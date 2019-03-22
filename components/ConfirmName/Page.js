import React, { Component } from 'react';
import { Card as DefaultCard, Checkbox } from 'antd';
import styled from 'styled-components'
import { Radar } from 'react-chartjs-2';

const mockUpData = [
  { wip_id: 110001, firtname: "วิปโป้1 ใจดี", disease: "-", medic: "-", intelligent: 7, communication: 9, creative: 6 },
  { wip_id: 110002, firtname: "วิปโป้2 ใจดี", disease: "-", medic: "-", intelligent: 5, communication: 8, creative: 7 },
  { wip_id: 110003, firtname: "วิปโป้3 ใจดี", disease: "-", medic: "-", intelligent: 7, communication: 9, creative: 8 },
  { wip_id: 110001, firtname: "วิปโป้1 ใจดี", disease: "-", medic: "-", intelligent: 7, communication: 9, creative: 6 },
  { wip_id: 110002, firtname: "วิปโป้2 ใจดี", disease: "-", medic: "-", intelligent: 5, communication: 8, creative: 7 },
  { wip_id: 110003, firtname: "วิปโป้3 ใจดี", disease: "-", medic: "-", intelligent: 7, communication: 9, creative: 8 }
]

const dataChart = {
  labels: ['intel.', 'commu.', 'creative'],
  datasets: [
    {
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      data: [7, 8, 9],
      display: false
    }
  ]
};

const options = {
  legend: {
    position: 'top',
    display: false,
    fullWidth: true
  },
  scale: {
    reverse: false,
    ticks: {
      beginAtZero: true
    }
  },
}


const Card = styled(DefaultCard)`
  background-color : ${props => props.card};
  margin : 2%;
  .ant-card-body {
    padding : 3%;
  }
`
class Page extends Component {
  state = {
    change: false,
    bgCard: ''
  }
  componentDidMount() {

  }

  checkbox = (e, wip_id) => {
    console.log(`checked = ${e.target.checked} + ${wip_id}`);
    this.changeCard(e.target.checked)
  }

  changeCard = (bool) => {
    return bool
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {mockUpData.map((data, i) => {
            return (
              <div className="col-6">
                <Card key={i} card=''>
                  <div className="row" >
                    <div className="col d-flex justify-content-end">
                      <Checkbox onChange={(e) => this.checkbox(e, data.wip_id)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      ชื่อ-สกุล : {data.firtname}<br />
                      โรคประจำตัว :{data.disease}<br />
                      ยาที่แพ้ : {data.medic}<br />
                    </div>
                    <div className="col-6">
                      <Radar type='radar' width='100vh' height='100%' data={dataChart} options={options} />
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
        <div className="row d-flex justify-content-end mt-5">
          <button>บันทึก</button>
        </div>
      </div>
    );
  }
}

export default Page;