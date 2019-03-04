import React from 'react';
import styled from 'styled-components'

const Box = styled.button`
  width: 289px;
  height: 250px;
  background: #FFFFFF;
  border: 1px solid #00B2FF;
  box-sizing: border-box;
  border-radius: 4px;
`

class QuestionBox extends React.Component {
  render() {
    return (
      <div className="row">
        {this.props.questions.map((question)=> {
          return (
            <div className="col-4 mb-5">
              <Box id={question.id} type="button" onClick={this.props.handleClick}>
              คำถามข้อที่ {question.id}
              </Box>
            </div>
          );
        })}
      </div>
    );
  }
}

export default QuestionBox;
