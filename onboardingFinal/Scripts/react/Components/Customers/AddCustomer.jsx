import React , {Component} from 'react'
import { Button, Modal, Form, Message} from 'semantic-ui-react'
import axios from 'axios'
const style = {
  h1: {
    marginTop: '2em',
  },
}

class AddCustomer extends Component {
  state = { 
  	open: false,
  	Name:'',
      Address: '',
      Validation: true,
      errMs: []
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

close = () => this.setState({ open: false })

    submitHandle = () => {
        if (this.state.Name != '' && this.state.Address != '') {
        axios
      .post("http://localhost:55706/api/Customers", {
      name: this.state.Name,
      address: this.state.Address
    })
    .then(response => {
      this.props.FetchData('go')
    })
    .catch(function(error) {
      console.log(error);
    });
            this.setState({
                Validation: true
            })
	this.close();
        }
     
    else {
    let x = [];
    if (this.state.Name == '') {
        let y = 'Name is Require'
        x.push(y);
    }
    if (this.state.Address == '') {
        let y = 'Address is Require'
        x.push(y);
    }
    this.setState({
        Validation: false,
        errMs: x
    })
}
}
  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state
    return (
      <div style={style.h1}>
		<Button primary  onClick={this.closeConfigShow(true, false)}>New Customer</Button>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          size='tiny'
        >
          <Modal.Header>Create Customer</Modal.Header>
          <Modal.Content>
		  <Form>
		    <Form.Field>
		      <label>Name</label>
		      <input placeholder='Name' onChange={e => this.setState({Name:e.target.value})} />
		    </Form.Field>
		    <Form.Field>
		      <label>Address</label>
		      <input placeholder='Address' onChange={e => this.setState({Address:e.target.value})} />
		    </Form.Field>
                    </Form>
                    <Message
                        hidden={this.state.Validation}
                        error
                        header='There was some errors with your submission'
                        list={this.state.errMs}
                    />
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
export default AddCustomer