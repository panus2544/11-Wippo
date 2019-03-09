import React from 'react'
import { Menu, Tooltip, Row, Col } from 'antd'
import styled from 'styled-components'
import colors from '../../config/colors'
import Cookie from '../../service/CookieService'

const StyleMenu = styled.div`
  display: ${props => props.visible};
  background-color : ${colors.navbar};
  height : 10vh;
`
const Nav = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`
const Li = styled.li`
  float: left;
  padding : 3vh;
  color: #fff;
  a {
    color: #fff;
    direction : none;
  }
`

const MenuItem = Menu.Item;
class MenuBar extends React.Component {
  state = {
    current: '1',
    nameFb: '',
    wipId: 0,
  }

  componentDidMount = async () => {
    this.getWipId()
    this.getName()
  }

  handleClick = async (e) => {
    this.setState({
      current: e.key
    })
    let changePage = await this.state.current
    this.props.setPage(changePage)
  }

  getName = async () => {
    let name = await Cookie.getName()
    this.setState({
      nameFb: name,
    })
  }

  getWipId = async () => {
    let wipId = await Cookie.getWipId()
    this.setState({
      wipId: wipId
    })
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  render() {
    return (
      <Row >
        <Col >
          <StyleMenu>
            <Nav>
              <Li>
                <a href='/dashboard'>
                  Dash Board
                </a>
              </Li>
              <Li className="float-right">
                สวัสดี {this.state.nameFb} ( WIP ID : {this.state.wipId} )
              </Li>
            </Nav>
          </StyleMenu>
        </Col>
      </Row>
    )
  }
}

export default MenuBar
