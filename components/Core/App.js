import React from 'react'
import DashBoard from '../DashBoard'
import Menu from './Menu'
import Body from './Body'
import Registant from '../Registants'
import RegistanceService from '../../service/RegistanceService'

export default class App extends React.Component {
  state = {
    allUser: [],
    current: '1',
    dashboardVisible: 'none',
    registantVisible: 'none'
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

  setPage = (props) => {
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
        registantVisible: 'none'
      })
    } else if (current === '2') {
      this.setState({
        dashboardVisible: 'none',
        registantVisible: 'block'
      })
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Menu setPage={this.setPage} current={this.state.current} />
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
