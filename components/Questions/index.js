import React from "react";
import Questions from "./QuestionBox";
import RegistanceService from "../../service/RegistanceService";
import env from '../../config/envConfig'
import Nav from '../Core/Navbar'
import Menu from '../Core/Menu'
import styled from 'styled-components'
import CheckPeimission from '../Core/CheckPermission'

const ZIndex = styled.div`
  z-index: 10;
`

export default class Quesions extends React.Component {
  state = {
    questions: [
      {
        id: ""
      }
    ]
  }

  handleClick  = (e) => {
    window.location.href = `${env.PATH_QUESTIONS}/checkanswer?questionid=${e.target.id}`
  }

  async componentDidMount() {
    if(await CheckPeimission.getPermission()){
      const reqQuestions = await RegistanceService.getAllQuestions();
      this.setState({
        questions: reqQuestions.data
      })
    }
  }
  

  render() {
    return (
      <div className="container-fulid overflow-hidden">
        <div className="row">
          <div className="col-12 col-md-12 ">
            <Nav visible={this.state.menu} setPage={this.setPage} current={this.state.current} />
          </div>
          <ZIndex className="col-3 col-md-2">
            <Menu/>
          </ZIndex>
          <div className="col-9 col-md-10 p-5" >
            <div className="container">
              <h1>ตรวจคำถาม</h1>
              <div className="row mt-5">
                <Questions questions={this.state.questions} handleClick={this.handleClick} />
              </div>
            </div>
          </div>
        </div>
      </div >

      
    );
  }
}
