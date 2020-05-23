import React , {Component} from 'react'
import {Button ,Modal , Form} from 'semantic-ui-react'
import axios from 'axios'

const style = {
  h1: {
    marginTop: '2em',
  },
}

class AddProduct extends Component {
  state = { 
    open: false,
    Name:'',
    Price:''
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

close = () => this.setState({ open: false })

submitHandle = () =>{
  axios
      .post("http://localhost:55706/api/Products", {
      name: this.state.Name,
      price: this.state.Price
    })
    .then(response => {
      this.props.FetchData('go')
    })
    .catch(function(error) {
      console.log(error);
    });
  this.close();
}
  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state
    return (
      <div style={style.h1}>
    <Button primary  onClick={this.closeConfigShow(true, false)}>New Product</Button>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          size='tiny'
        >
          <Modal.Header>Create Product</Modal.Header>
          <Modal.Content>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' onChange={e => this.setState({Name:e.target.value})} />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <input placeholder='Price' onChange={e => this.setState({Price:e.target.value})} />
        </Form.Field>
      </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Cancel
            </Button>
            <Button
              onClick={this.submitHandle}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Create'
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
export default AddProduct