import React from 'react'
import DashBoard from '../DashBoard'
import Nav from './Navbar'
import Body from './Body'
import RegistanceService from '../../service/RegistanceService'
import Menu from './Menu'
import styled from 'styled-components';

const ZIndex = styled.div`
  z-index: 10;
`
export default class App extends React.Component {
  state = {
    allUser: [],
    current: '1',
    dashboardVisible: 'none',
    registantVisible: 'none',
    loginVisible: 'block',
    menu: 'none',
  }
  componentDidMount = () => {
    this.handlePage()
    this.getAlluserDB()
  }
  getAlluserDB = async () => {
    const profiles = await RegistanceService.getAllRegistrant()
    this.setState({
      allUser: profiles.registrants
    })
    console.log(this.state.allUser)
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
      <div className="container-fulid overflow-hidden">
        <div className="row">
          <div className="col-12 col-md-12 ">
            <Nav visible={this.state.menu} setPage={this.setPage} current={this.state.current} />
          </div>
          <ZIndex className="col-3 col-md-3">
            <Menu />
          </ZIndex>
          <div className="col-9 col-md-9" >
            <Body showComponents={this.state.dashboardVisible}>
              <DashBoard allUser={this.state.allUser} />
            </Body>
          </div>
        </div>
      </div >
    )
  }
}
