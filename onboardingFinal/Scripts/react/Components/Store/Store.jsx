import React , {Component} from 'react'
import AddStore from './AddStore'
import StoreTable from './Table'

class Store extends Component {
  state = {
    FetchData:null
  }
  render() {
    return (
      <div>
        <AddStore FetchData={(x) => this.setState({FetchData:x})} />
        <StoreTable FetchData={this.state.FetchData}  />
      </div>
    )
  }
}
export default Store