import React, { Component } from 'react';
import { Card as DefaultCard, Checkbox, Pagination } from 'antd';
import styled from 'styled-components'
import { Radar } from 'react-chartjs-2';
import Registrants from '../../service/RegistanceService'
import AuthService from '../../service/AuthService'

let registrants = [];

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
    bgCard: '',
    registrants: [],
    minValue: 0,
    maxValue: 6,
    oldValue: 0
  }

  componentDidMount = async () => {
    this.getRegistrants()
    this.setState({
      minValue: 0,
      maxValue: 6
    });
  }


  handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 6
      });
    } else {
      this.setState({
        minValue: (value * 6) - 6,
        maxValue: value * 6
      });
    }
  };

  getRegistrants = async () => {
    let nameList = await Registrants.getRegistrantsForPassing()
    this.setData(nameList.data[0])
  }

  setData = async (data) => {
    let dataRegis = [];
    for (let index = 0; index < data.length; index++) {
      registrants.push({
        wipId: data[index].wip_id,
        firstname: data[index].firstname_th,
        lastname: data[index].lastname_th,
        gender: data[index].gender,
        disease: data[index].cangenital_disease,
        medic: data[index].allergic_drug,
        food: data[index].allergic_food,
        dataChart:
        {
          labels: ['com.', 'crt.', 'int.'],
          datasets: [
            {
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              data: [
                data[index].mean_cat_com,
                data[index].mean_cat_crt,
                data[index].mean_cat_int
              ],
              display: false
            }
          ]
        }
      })
    }
    this.setState({
      registrants: registrants
    })
  }

  checkbox = (e, wip_id, role) => {
    console.log(`checked = ${e.target.checked} + ${wip_id} + ${role}`);
    AuthService.changeRole({ wipId: wip_id, roleId: role })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {registrants && registrants.length > 0 &&
            registrants.slice(this.state.minValue, this.state.maxValue).map((data, i) => {
              return (
                <div className="col-6">
                  <Card key={i} card=''>
                    <div className="row" >
                      <div className="col d-flex justify-content-end mb-2">
                        ตัวจริง : <Checkbox onChange={(e) => this.checkbox(e, data.wipId, 2)} />&nbsp;
                        ตัวสำรอง :<Checkbox onChange={(e) => this.checkbox(e, data.wipId, 12)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        Wip ID : {data.wipId}<br />
                        ชื่อ-สกุล : {data.firstname} {data.lastname}<br />
                        เพศ : {data.gender}<br />
                        โรคประจำตัว :{data.disease}<br />
                        ยาที่แพ้ : {data.medic}<br />
                        อาหารที่แพ้ : {data.food}<br />
                      </div>
                      <div className="col-6">
                        <Radar type='radar' width='100vh' height='100%' data={registrants[i].dataChart} options={options} />
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
        </div>
        <div className="row d-flex justify-content-end mt-5">
          <Pagination defaultCurrent={1}
            defaultPageSize={6}
            onChange={this.handleChange}
            total={557}
          />
        </div>
      </div>
    );
  }
}

export default Page;