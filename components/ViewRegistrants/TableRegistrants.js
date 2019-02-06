import React from 'react';
import { Input,Checkbox,Pagination  } from 'antd';
import Registrants from '../../service/RegistanceService'



class App extends React.Component {
  state = {
    selectedRowKeys: [],
    loading: false,
    registrants: [],
    checked : false
  };

  componentDidMount = async () => {
    let registrants = await Registrants.getAllRegistrant()
    this.getRegistrant(registrants.registrants)
  }

  getRegistrant = registrants => {
    this.setState({
      registrants: registrants
    })
    console.log(this.state.registrants)
  }

  handleToggleStatus = (e) =>{
    console.log(`checked = ${e.target.checked}`);
   
  }

  getNote = () => {

  }
  render() {
    
    return (
      <div>
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">โทรแล้ว</th>
              <th scope="col">ชื่อ-สกุล</th>
              <th scope="col">เบอร์โทรศัพท์</th>
              <th scope="col">หมายเหตุ</th>
            </tr>
            {
              this.state.registrants.map((data, i) => {
                return (
                  <tr  key={i}>
                    <td scope="col"><Checkbox onChange={this.handleToggleStatus} defaultChecked={data.is_call === 0} /></td>
                    <td scope="col">{data.firstname_th}  {data.lastname_th}</td>
                    <td scope="col">{data.telno}</td>
                    <td scope="col"><Input value={data.note} onChange={this.getNote} /></td>
                  </tr>
                )
              })
            }
          </thead>
        </table>
      </div>
    );
  }
}

export default App