import React from "react";
import RegistanceService from "../../service/RegistanceService";

class QuestionBox extends React.Component {
  state = {
    questions: [
        {id:'',
    content:''}
    ]
  };

  async componentDidMount() {
    const reqquestions = await RegistanceService.getAllQuestions();
    this.setState({
      questions: reqquestions.data
    });
    console.log(this.state.questions[0].content);
  }

  render() {
    return (
      <div>
        <div class="card bg-light mb-3" style={{ width: "15vw" }}>
          <div class="card-header">{this.state.questions[0].id}</div>
          <div class="card-body">
            <p class="card-text">{this.state.questions[0].content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionBox;
