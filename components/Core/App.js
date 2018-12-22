import React from 'react'
import DashBoard from '../DashBoard'
import RegistanceService from '../../service/RegistanceService';

export default class App extends React.Component {
  state = {
    allUser:[]
  }
  componentDidMount =()=>{
    this.getAlluserDB()
    
  }
  getAlluserDB=async()=>{
   const profiles=await RegistanceService.getAllRegistrant() 
     this.setState({
      allUser: profiles
    })   
  
  }
  
  render() {
    return (
      <div className="container-fluid">
        <DashBoard allUser={this.state.allUser}/>
      </div>
    )
  }
}
