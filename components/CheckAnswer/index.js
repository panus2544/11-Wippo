import React from "react";
import RegistanceService from "../../service/RegistanceService";
import env from '../../config/envConfig'
export default class CheckAnswer extends React.Component {
  state = {
    startIndex: 0,
    number: 1,
    button: "ถัดไป",
    question_id: "",
    questions: [
      {
        id: "",
        content: ""
      }
    ],
    answers: [
      {
        ans_id: "",
        ans_content: "",
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

  onChangebox = (name, value) => {
    this.state.answersEva[name] = {
      ...this.state.answersEva[name],
      score_category: parseInt(name) + 1,
      score: value
    };
  };

  handleNext = async e => {
    e.preventDefault();
    for (let index = 0; index < this.state.answersEva.length; index++) {
      this.state.answersEva[index] = {
        ...this.state.answersEva[index],
        answer_id: this.state.answers[this.state.startIndex].ans_id,
        question_id: this.state.question_id
      };
    }
    await RegistanceService.postAnswerEvaluations(this.state.answersEva);
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
      number: (this.state.number += 1)
    });
  };
  render() {
    // console.log(this.state.answers.length);
    
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
          <div className="mt-5 col-12">{this.state.questions.content}</div>
          <div className="mt-5 col-12">
            {this.state.answers.map((answer, key) => {
              if (key >= this.state.startIndex && key <= this.state.startIndex)
                return <div>{answer.ans_content}</div>;
            })}
          </div>
          <div className="col-12 mt-5">
            <p>ให้คะแนน</p>
            <form className="mt-4" onSubmit={this.handleNext}>
              <div className="form-row">
                <div className="form-group col-2 mt-3">
                  <br/><h5 className="font-weight-bold">ให้คะแนน</h5>
                </div>
                <div className="form-group col-2">
                  <label for="inputEmail4" className="mr-2">intelligent</label>
                  <input
                    type="number"
                    id="inputEmail4"
                    name={0}
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
                    onChange={({ target: { name, value } }) =>
                      this.onChangebox(name, value)
                    }
                    className="mr-2 form-control"
                    min={0}
                    max={10}
                    required
                  />
                </div>
                <div className="form-group col-2 mt-3">
                  <br/><input className="btn btn-primary" value={this.state.button} type="submit" />
                </div>
              </div>
            </form>
            <div />
          </div>
        </div>
      </div>
    );
  }
}
