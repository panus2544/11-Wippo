import React from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Matt MattBlack1',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Matt MattBlack12',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '5',
    name: 'Matt MattBlack123',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '6',
    name: 'Matt MattBlack1234',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '7',
    name: 'Matt Joe',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '8',
    name: 'Matt Joe13',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '9',
    name: 'Matt wdqwd',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '10',
    name: 'Matt fffff',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '11',
    name: 'Matt sdasdasd',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '12',
    name: 'Matt MattBlack',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

export default class Registants extends React.Component {
  render() {
    return (
      <div className="container mt-5">
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}