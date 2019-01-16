import React from "react";
import QuestionBox from "./QuestionBox";

export default class Questions extends React.Component {
  state = {};
  render() {
    return (
      <div className="container mt-5">
        Hello Questions
        <div className="mt-5">
          <div class="row">

            <div class="col-4">
              <QuestionBox />
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
