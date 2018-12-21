import React from 'react'
import DashBoard from '../DashBoard'
import QuestionService from '../../service/QuestionService';

export default class App extends React.Component {
  state = {
    allUser:[]
  }
  componentDidMount =()=>{
    
  }
  getAlluserDB=async()=>{
    this.state.allUser=await QuestionService.getAllRegistance()
  }
  render() {
    return (
      <div className="container-fluid">
        <DashBoard allUser={this.state.allUser}/>
      </div>
    )
  }
}
