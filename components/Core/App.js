import React from 'react'
import DashBoard from '../DashBoard'
import Menu from './Menu'
import Body from './Body'
import Registant from '../Registants'
import RegistanceService from '../../service/RegistanceService'
import Login from '../Login'

export default class App extends React.Component {
  state = {
    allUser: [],
    current: '0',
    dashboardVisible: 'none',
    registantVisible: 'none',
    loginVisible: 'block',
    menu: 'none'
  }
  componentDidMount = () => {
    this.getAlluserDB()
    this.handlePage()
  }
  getAlluserDB = async () => {
    const profiles = await RegistanceService.getAllRegistrant()
    this.setState({
      allUser: profiles
    })
  }

  setPage = props => {
    this.setState({
      current: props
    })
    this.handlePage()
  }

  handlePage = async () => {
    let { current } = this.state
    if (current === '1') {
      this.setState({
        dashboardVisible: 'block',
        registantVisible: 'none',
        loginVisible: 'none',
        menu: 'block'
      })
    } else if (current === '2') {
      this.setState({
        dashboardVisible: 'none',
        registantVisible: 'block',
        loginVisible: 'none',
        menu: 'block'
      })
    } else {
      this.setState({
        dashboardVisible: 'none',
        registantVisible: 'none',
        loginVisible: 'block',
        menu: 'none'
      })
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Menu visible={this.state.menu} setPage={this.setPage} current={this.state.current} />
        <Body showComponents={this.state.loginVisible}>
          <Login setPage={this.setPage}/>
        </Body>
        <Body showComponents={this.state.dashboardVisible}>
          <DashBoard allUser={this.state.allUser} />
        </Body>
        <Body showComponents={this.state.registantVisible}>
          <Registant />
        </Body>
      </div>
    )
  }
}
