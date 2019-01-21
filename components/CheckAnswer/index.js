import React from "react";
import RegistanceService from "../../service/RegistanceService";
import { async } from "rxjs/internal/scheduler/async";
import { InputNumber } from "antd";
import { Button, Icon } from "antd";

export default class CheckAnswer extends React.Component {
  state = {
        startIndex:0,
    answers: [
      {  
        question_id: "",
        ans_id: "",
        ans_content: "",
        wip_id: ""
      }
    ]
  };
  async componentDidMount() {
    const url = new URLSearchParams(window.location.search);
    this.setState({
      question_id: `${url.get("questionid")}`,
      index: `${url.get("index")}`
    });
    const reqanswers = await RegistanceService.getAnswersByQuestionId(
      `${url.get("questionid")}`
    );
    this.setState({
      answers: reqanswers.data
    });
    // console.log(this.state.answers,'state')
    // this.getValue(reqanswers)
  }
  // changeQuestionStartIndex = number => {
  //   this.setState({ questionStartIndex: number })
  // }
  handleNext = async () => {
    await this.setState({
      startIndex:this.state.startIndex+=1
    })
    if(this.state.startIndex == this.state.answers.length){
      
    }
  }
  render() {
    // console.log(this.state.question_id)
    // console.log(this.state.answers[this.state.index].ans_content);
    // console.log(this.state.index);
    return (
      <div className="container mt-5">
        <h1>Hello Answer by question_id</h1>
        <hr />
        <div className="row">
          <div className="col-8">ข้อที่ : {this.state.question_id}</div>
          <div className="col-4">wip_id : {this.state.answers[0].wip_id}</div>
          <div className="mt-5 col-12">
            {this.state.answers.map( (answer,key) => {
              if (
                key >= this.state.startIndex && key <= this.state.startIndex
              )
              return (
                <div>{answer.ans_content}</div>
              )
            })}   
          </div>
          <div className="col-12 mt-5">
            <InputNumber className="mr-2" min={1} max={10} defaultValue={3} />
            <InputNumber className="mr-2" min={1} max={10} defaultValue={3} />
            <InputNumber className="mr-2" min={1} max={10} defaultValue={3} />
            <Button type="primary" onClick={this.handleNext}>
              Go forward <Icon type="right" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
