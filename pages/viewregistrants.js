import React from 'react'
import App from '../components/ViewRegistrants/index'
import AuthService from '../service/PermissionService'
class index extends React.Component {
  state = {
    permission : [],
    showComponent : ''
  }

  componentDidMount = () => {
    this.checkPermission()
  }

  checkPermission = async () => {
    let data = await AuthService.getPermission()
    if(data.permission[0].permission_id == 1 || data.permission[0].permission_id == 4){
      console.log('registrants')
    }
  }


  render() {
    return (
      <div>
        <App />
      </div>
    )
  }
}

export default index
