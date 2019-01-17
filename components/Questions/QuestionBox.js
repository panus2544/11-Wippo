import React from "react";
import RegistanceService from "../../service/RegistanceService";

class QuestionBox extends React.Component {
  render() {
    
    return (
      <div>
        <div class="card bg-light mb-3" style={{ width: "15vw" }}>
          <div class="card-header">{this.props.questionId}</div>
          <div class="card-body">
            <p class="card-text">{this.props.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionBox;
