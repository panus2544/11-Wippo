import React from 'react'
import { Menu } from 'antd'
import styled from 'styled-components'
import colors from '../../config/colors'

const StyleMenu = styled(Menu)`
  display: ${props => props.visible};
  background-color : ${colors.navbar};
`

const MenuItem = Menu.Item;
class MenuBar extends React.Component {
  state = {
    current: '1',
  }

  handleClick = async (e) => {
    this.setState({
      current: e.key
    })
    let changePage = await this.state.current
    this.props.setPage(changePage)
  }

  render() {
    return (
      <StyleMenu
        visible={this.props.visible}
        onClick={this.handleClick}
        selectedKeys={[this.props.current]}
        mode="horizontal"
        theme='dark'
      >

        <MenuItem key="1">
          <a href='/dashboard'>
            Dash Board
          </a>
        </MenuItem>
      </StyleMenu>
    )
  }
}

export default MenuBar
