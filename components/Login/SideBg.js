import React, { Component } from 'react';
import styled from 'styled-components'

const Img = styled.img`
  width:100%;
  z-index:-10;
  position: absolute;
  top: 0%;
  bottom: 0%;
`


class SideBg extends Component {
  render() {
    return (
      <Img src="/static/img/Group 6.png" />
    );
  }
}

export default SideBg;