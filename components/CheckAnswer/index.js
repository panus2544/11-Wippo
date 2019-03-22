import React from "react";
import RegistanceService from "../../service/RegistanceService";
import env from "../../config/envConfig";
import Nav from "../Core/Navbar";
import Menu from "../Core/Menu";
import styled from "styled-components";
import CheckPeimission from "../Core/CheckPermission";
import { Button } from "antd/lib/radio";

const ZIndex = styled.div`
  z-index: 10;
`;

export default class CheckAnswer extends React.Component {
  state = {
    isLoading: false,
    startIndex: 0,
    number: 1,
    button: "ถัดไป",
    question_id: "",
    questions: [
      {
        id: "",
        content: "กำลังขอ permistion"
      }
    ],
    answers: [
      {
        ans_id: "",
        ans_content: "กำลังขอ permistion",
        wip_id: ""
      }
    ],
    answersEva: [
      {
        answer_id: "",
        question_id: "",
        score_category: "",
        score: 0
      },
      {
        answer_id: "",
        question_id: "",
        score_category: "",
        score: 0
      },
      {
        answer_id: "",
        question_id: "",
        score_category: "",
        score: 0
      }
    ]
  };

  async componentDidMount() {
    if (await CheckPeimission.getPermission()) {
      const url = new URLSearchParams(window.location.search);
      this.setState({
        question_id: `${url.get("questionid")}`,
        index: `${url.get("index")}`
      });
      const reqanswers = await RegistanceService.getAnswersByQuestionId(
        `${url.get("questionid")}`
      );
      this.setState({
        answers: reqanswers.data,
        question_id: `${url.get("questionid")}`
      });
      const reqquestion = await RegistanceService.getQuestionById(
        `${url.get("questionid")}`
      );
      this.setState({
        questions: reqquestion.data
      });

      for (let index = 0; index < this.state.answersEva.length; index++) {
        this.state.answersEva[index] = {
          ...this.state.answersEva[index],
          score: ""
        };
      }
      if (this.state.answers.length === this.state.number) {
        this.setState({
          button: "กลับ"
        });
      }
    }
  }

  onChangebox = (name, value) => {
    this.state.answersEva[name] = {
      ...this.state.answersEva[name],
      score_category: parseInt(name) + 1,
      score: value
    };
  };

  handleNext = async e => {
    e.preventDefault();
    this.setState({
      isLoading:true
    });
    for (let index = 0; index < this.state.answersEva.length; index++) {
      this.state.answersEva[index] = {
        ...this.state.answersEva[index],
        answer_id: this.state.answers[this.state.startIndex].ans_id,
        question_id: this.state.question_id
      };
    }
    await RegistanceService.postAnswerEvaluations(this.state.answersEva);
    document.getElementById("inputAns").reset();
    if (this.state.button === "กลับ") {
      window.location.href = `${env.PATH_QUESTIONS}/questions`;
    }
    if (this.state.answers.length - 1 === this.state.number) {
      this.setState({
        button: "กลับ"
      });
    }
    await this.setState({
      startIndex: (this.state.startIndex += 1),
      number: (this.state.number += 1),
      isLoading:false
    });
  };
  handlePrevious (){
    window.location.href = `${env.PATH_QUESTIONS}/questions`;
  };
  render() {
    // console.log(this.state.answers.length);

    return (
      <div className="container-fulid overflow-hidden">
        <div className="row">
          <div className="col-12 col-md-12 ">
            <Nav
              visible={this.state.menu}
              setPage={this.setPage}
              current={this.state.current}
            />
          </div>
          <ZIndex className="col-3 col-md-2">
            <Menu />
          </ZIndex>
          <div className="col-9 col-md-10 px-5 pt-3">
            <div className="container">
              <p>
                <a onClick={this.handlePrevious}>ย้อนกลับ</a> / ข้อที่ : {this.state.question_id}
              </p>
              <h1>ตรวจคำตอบ</h1>
              <div className="row">
                <div className="container card px-5">
                  <div className="row card-body">
                    {/* <div className="col-10"></div> */}
                    <div className="offset-10 col-2 text-right">
                      คนที่ {this.state.number} / {this.state.answers.length}
                    </div>
                    <div className="mt-3 col-12">
                      คำถามที่ {this.state.question_id} :{" "}
                      {this.state.questions.content}
                    </div>
                    <div className="mt-3 col-12 card">
                      <div className="card-body px-3">
                        {this.state.answers.map((answer, key) => {
                          if (
                            key >= this.state.startIndex &&
                            key <= this.state.startIndex
                          )
                            return <div>{answer.ans_content}</div>;
                        })}
                      </div>
                    </div>
                    <div className="col-12 mt-5">
                      <form
                        className="mt-4"
                        id="inputAns"
                        onSubmit={this.handleNext}
                      >
                        <div className="form-row">
                          <div className="form-group col-2 mt-3">
                            <br />
                            <h5 className="font-weight-bold">ให้คะแนน</h5>
                          </div>
                          <div className="form-group col-2">
                            <label className="mr-2">intelligent</label>
                            <input
                              type="number"
                              name={0}
                              vlaue={this.state.answersEva[0].score}
                              onChange={({ target: { name, value } }) =>
                                this.onChangebox(name, value)
                              }
                              className="mr-2 form-control"
                              min={0}
                              max={10}
                              required
                            />
                          </div>
                          <div className="form-group col-2">
                            <label className="mr-2">creative</label>
                            <input
                              type="number"
                              name={1}
                              vlaue={this.state.answersEva[1].score}
                              onChange={({ target: { name, value } }) =>
                                this.onChangebox(name, value)
                              }
                              className="mr-2 form-control"
                              min={0}
                              max={10}
                              required
                            />
                          </div>
                          <div className="form-group col-2 mr-auto">
                            <label className="mr-2">comunication</label>
                            <input
                              type="number"
                              name={2}
                              vlaue={this.state.answersEva[2].score}
                              onChange={({ target: { name, value } }) =>
                                this.onChangebox(name, value)
                              }
                              className="mr-2 form-control"
                              min={0}
                              max={10}
                              required
                            />
                          </div>
                          <div className="form-group col-2 mt-2 text-right">
                            <br />
                            {/* <Button className="btn btn-primary">{this.state.button}</Button> */}
                            <input
                              className="btn btn-primary"
                              value={this.state.button}
                              type="submit"
                              disabled={this.state.isLoading}
                              // onClick={!isLoading ? this.handleClick : null}
                            />
                          </div>
                        </div>
                      </form>
                      <div />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
