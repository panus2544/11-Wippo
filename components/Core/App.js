import React from 'react'
import DashBoard from '../DashBoard'

export default class App extends React.Component {
  state = {
    allUser:[]
  }
  render() {
    return (
      <div className="container-fluid">
        <DashBoard allUser={this.state.allUser}/>
      </div>
    )
  }
}
