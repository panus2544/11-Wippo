import React from "react";
import RegistanceService from "../../service/RegistanceService";
import { async } from "rxjs/internal/scheduler/async";
import { InputNumber } from "antd";
import { Button, Icon } from "antd";

export default class CheckAnswer extends React.Component {
  state = {
    startIndex: 0,
    number: 1,
    button: "ถัดไป",
    scorebox1: "",
    scorebox2: "",
    scorebox3: "",
    answers: [
      {
        question_id: "",
        ans_id: "",
        ans_content: "",
        wip_id: ""
      }
    ],
    answersEva: [
      {
        ans_id: "",
        checker_wip_id: "",
        question_id: "",
        score_category: "",
        score: ""
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
    if (this.state.answers.length === this.state.number) {
      this.setState({
        button: "กลับ"
      });
    }
  }

  onChangebox1 = e => {
    this.setState({
      scorebox1: e
    });
  };
  onChangebox2 = e => {
    this.setState({
      scorebox2: e
    });
  };
  onChangebox3 = e => {
    this.setState({
      scorebox3: e
    });
  };

  handleNext = async (e) => {
    e.preventDefault()
    if (this.state.button === "กลับ") {
      window.location.href = "http://localhost:3000/questions";
    }
    if (this.state.answers.length - 1 === this.state.number) {
      this.setState({
        button: "กลับ"
      });
    }
    await this.setState({
      scorebox1:'',
      scorebox2:'',
      scorebox3:'',
      startIndex: (this.state.startIndex += 1),
      number: (this.state.number += 1)
    });
  };
  render() {
    return (
      <div className="container mt-5">
        <h1>ตรวจคำตอบ</h1>
        <hr />
        <div className="row">
          <div className="col-8">ข้อที่ : {this.state.question_id}</div>
          <div className="col-2">
            wip_id : {this.state.answers[this.state.startIndex].wip_id}
          </div>
          <div className="col-2">
            คนที่ {this.state.number} / {this.state.answers.length}
          </div>
          <div className="mt-5 col-12">
            {this.state.answers.map((answer, key) => {
              if (key >= this.state.startIndex && key <= this.state.startIndex)
                return <div>{answer.ans_content}</div>;
            })}
          </div>
          <div className="col-12 mt-5">
            <p>ให้คะแนน</p>
            <form onSubmit={this.handleNext}>
              <label></label>
              <InputNumber
                value={this.state.scorebox1}
                onChange={this.onChangebox1}
                className="mr-2"
                min={0}
                max={10}
                required
              />
              <InputNumber
              value={this.state.scorebox2}
                onChange={this.onChangebox2}
                className="mr-2"
                min={0}
                max={10}
                required
              />
              <InputNumber
              value={this.state.scorebox3}
                onChange={this.onChangebox3}
                className="mr-2"
                min={0}
                max={10}
                required
              />
              <input value={this.state.button} type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
