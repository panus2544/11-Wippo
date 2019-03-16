import React, { Component } from 'react'
import { Stats } from '../../service/RegistanceService'
import { async } from 'rxjs/internal/scheduler/async';
export default class GraphBox extends Component {

    state = {
        statsByDate: [
            {
                dates: [],
                counts: [],
            }
        ]
    }
    async componentDidMount() {
        this.getCountRegistrantsByDate()
    }
    getCountRegistrantsByDate = async () => {
        console.log("hello");
        const countAndDate = Stats.getRegistrantStatsByDate(this.props.startdate, this.props.enddate);
        this.setState({
            statsByDate: countAndDate.data
        })
  
    }

    render() {
        return (
            <div >
            </div>
        )
    }
}
