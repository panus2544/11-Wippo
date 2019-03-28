import React, { Component } from 'react';
import { Card as DefaultCard, Checkbox, Pagination } from 'antd';
import styled from 'styled-components'
import { Radar } from 'react-chartjs-2';
import Registrants from '../../service/RegistanceService'

let registrants = [];

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
  constructor (props) {
    super(props)
    this.state = {
     change: false,
     bgCard: '',
     registrants: [],
     minValue: 0,
     maxValue: 6
   }
  }

  componentDidMount = async () => {
    this.getRegistrants()
  }
  
  handleChange = value => {
    console.log(value)
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 6
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 6
      });
    }
  };

  getRegistrants = async () => {
    let nameList = await Registrants.getRegistrantsForPassing()
    this.setData(nameList.data[0])
  }

  setData = async (data) => {
    // let dataRegis = [];
    for (let index = 0; index < data.length; index++) {
      registrants.push({
        wipId: data[index].wip_id,
        firstname: data[index].firstname_th,
        lastname: data[index].lastname_th
      })
    }
    this.setState({
      registrants: registrants.length
    })
    console.log('Registrnats ; ', registrants)
  }

  checkbox = (e, wip_id) => {
    console.log(`checked = ${e.target.checked} + ${wip_id}`);
    this.changeCard(e.target.checked)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {registrants && registrants.length > 0 &&
            registrants.slice(this.state.maxValue, this.state.minValue).map((data, i) => {
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
                        ชื่อ-สกุล : {data.firstname} {data.lastname}<br />
                        {/* โรคประจำตัว :{data.disease}<br />
                      ยาที่แพ้ : {data.medic}<br /> */}
                      </div>
                      <div className="col-6">
                        <Radar type='radar' width='100vh' height='100%' data={dataChart} options={options} />
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
        <div className="row d-flex justify-content-end mt-5">
          <Pagination defaultCurrent={1}
            defaultPageSize={10}
            onChange={this.handleChange}
            total={this.state.registrants} 
          />
        </div>
        </div>
      </div>
    );
  }
}

export default Page;