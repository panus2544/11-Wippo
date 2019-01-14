import React from 'react'
import { Menu as DefaultMenu} from 'antd'
import styled from 'styled-components'

const Menu = styled(DefaultMenu)`
  display: ${props => props.visible};
`


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
      <div>
        <Menu
          visible={this.props.visible}
          onClick={this.handleClick}
          selectedKeys={[this.props.current]}
          mode="horizontal"
        >
          <Menu.Item key="1">Dash Board</Menu.Item>
          <Menu.Item key="2">Registants</Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default MenuBar
