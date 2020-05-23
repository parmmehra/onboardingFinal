import React , {Component}  from 'react';
import { Link } from "react-router-dom";
import { Menu , Segment} from 'semantic-ui-react'

export class Header extends Component {
  state = {
    activeItem:'Customers'
  }
componentDidMount = () =>{
  let x = window.location.href;
  var str = x;
  var n = str.indexOf("#");
  var l = str.length;
  var res = str.substring(n + 1, l + 1);
  if(res === '/store'){
    this.setState({
      activeItem:'Store'
    })
  }else if(res === '/products'){
    this.setState({
      activeItem:'Products'
    })
    }
  else if (res === '/sales') {
      this.setState({
          activeItem: 'Sales'
      })
  }
}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render(){
    const { activeItem } = this.state
    return(
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item
            name='Customers'
            active={activeItem === 'Customers'}
            onClick={this.handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            name='Products'
            active={activeItem === 'Products'}
            onClick={this.handleItemClick}
            as={Link}
            to="/products"
          />
          <Menu.Item
            name='Store'
            active={activeItem === 'Store'}
            onClick={this.handleItemClick}
            as={Link}
            to='store'
                />
            <Menu.Item
                    name='Sales'
                    active={activeItem === 'Sales'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='sales'
                />
        </Menu>
      </Segment>
    )
  }
}