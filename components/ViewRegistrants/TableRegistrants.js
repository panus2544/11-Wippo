import React from 'react';
import { Table, Button } from 'antd';
import { async } from 'rxjs/internal/scheduler/async';
import Registrants from '../../service/RegistanceService'


const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Tel.',
  dataIndex: 'tel',
}, {
  title: 'หมายเหตุ',
  dataIndex: 'message',
}];

const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     tel: `09${i}0978${i + 1}0${i}`,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

class App extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    registrants : []
  };
  componentDidMount = async() => {
    let registrants = await Registrants.getAllRegistrant()
    console.log(registrants,'tesy')
    await this.getRegistrant(registrants)
  }

  getRegistrant = async registrants => {
    for (let index = 0; index < registrants.length; index++) {
      data.push({
        key : index,
        name:registrants[index].firstname_th,
        tel : registrants[index].telno,
        message : null
      })
      console.log(registrants[index].firstName_th)
    }
    
    this.setState({
      registrants : data
    })
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    console.log(columns,'col')
    return (
      <div>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default App