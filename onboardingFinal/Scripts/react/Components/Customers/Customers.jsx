import React , {Component} from 'react'
import AddCustomer from './AddCustomer'
import CustomerTable from './Table'

class Customers extends Component {
  state = {
    FetchData:null
  }
  render() {
    return (
      <div>
       	<AddCustomer FetchData={(x) => this.setState({FetchData:x})} />
	      <CustomerTable FetchData={this.state.FetchData}  />
      </div>
    )
  }
}
export default Customers