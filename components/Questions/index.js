import React from "react";
import QuestionBox from "./QuestionBox";
import RegistanceService from "../../service/RegistanceService";


export default class Questions extends React.Component {
  state = {
    questions: [
      {
        id: '',
        content: ''
      }
    ]
  };

  async componentDidMount() {
    const reqquestions = await RegistanceService.getAllQuestions();
    this.setState({
      questions: reqquestions.data
    });
    // console.log(this.state.questions[0].content);
    
  }
  render() {
    // console.log(this.state.questions)
    return (
      <div className="container mt-5">
        Hello Questions
        <div className="mt-5">
          <div className="row">
            {
              this.state.questions.map(function (question) {
                return (
                  <div className="col-4">
                    <QuestionBox questionId={question.id} content={question.content}/>
                  </div>
                )
                
                
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
