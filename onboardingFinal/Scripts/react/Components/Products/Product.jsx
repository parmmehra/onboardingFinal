import React , {Component} from 'react'
import AddProduct from './AddProduct'
import ProductTable from './Table'

class Product extends Component {
  state = {
    FetchData:null
  }
  render() {
    return (
      <div>
        <AddProduct FetchData={(x) => this.setState({FetchData:x})} />
        <ProductTable FetchData={this.state.FetchData}  />
      </div>
    )
  }
}
export default Product