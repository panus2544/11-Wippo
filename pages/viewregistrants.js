import React from 'react'
import App from '../components/ViewRegistrants/index'
import AuthService from '../service/CheckPermissionService'
import { async } from 'rxjs/internal/scheduler/async';

class index extends React.Component {
  state = {
    permission : [],
    showComponent : ''
  }

  componentDidMount = () => {
    this.checkPermission()
  }

  checkPermission = async () => {
    // let data = await AuthService.getPermission()
    // if(data.permission[0].permission_id == 1){
    //   console.log('registrants')
    // }
  }


  render() {
    return (
      <div>
        <App />
        this is permission : {this.state.showComponent}
      </div>
    )
  }
}

export default index
