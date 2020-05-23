import React, { Component } from "react";
import DatePicker from "react-datepicker";

import {
  Button,
  Modal,
  Form,
  Message,
  Select,
  Dropdown,
} from "semantic-ui-react";
import axios from "axios";
const style = {
  h1: {
    marginTop: "2em",
  },
};

class AddSales extends Component {
  state = {
    startDate: new Date(),
    open: false,
    SelectedDate: null,
    SelectedCustomer: null,
    SelectedProduct: null,
    SelectedStore: null,
    Validation: true,
    errMs: [],
    Customer: null,
    Product: null,
    Store: null,
  };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    axios
      .get(
        "http://localhost:55706/api/Customers",
        {
         
        }
      )
      .then((response) => {
        let x = response.data;
        let arr = [];
        x.map((z) => {
          let a = { key: z.Id, value: z.Id, text: z.Name };
          arr.push(a);
        });
        this.setState({
          closeOnEscape,
          closeOnDimmerClick,
          open: true,
          Customer: arr,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(
        "http://localhost:55706/api/Products",
        {
          
        }
      )
      .then((response) => {
        let x = response.data;
        let arr = [];
        x.map((z) => {
          let a = { key: z.Id, value: z.Id, text: z.Name };
          arr.push(a);
        });
        this.setState({
          closeOnEscape,
          closeOnDimmerClick,
          open: true,
          Product: arr,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(
        "http://localhost:55706/api/Stores",
        {
          
        }
      )
      .then((response) => {
        let x = response.data;
        let arr = [];
        x.map((z) => {
          let a = { key: z.Id, value: z.Id, text: z.Name };
          arr.push(a);
        });
        this.setState({
          closeOnEscape,
          closeOnDimmerClick,
          open: true,
          Store: arr,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  close = () => this.setState({ open: false });
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  submitHandle = () => {
    if (
      this.state.SelectedCustomer != null &&
      this.state.SelectedProduct != null &&
      this.state.SelectedStore != null
    ) {
      console.log(this.state.SelectedCustomer);
      axios
        .post(
          "http://localhost:55706/api/Sales",
          {
            request: 14,
            DateSold: this.state.startDate.toLocaleDateString(),
            CustomerId: this.state.SelectedCustomer,
            ProductId: this.state.SelectedProduct,
            StoreId: this.state.SelectedStore,
          }
        )
        .then((response) => {
          this.setState({
            SelectedCustomer: "",
            SelectedDate: "",
            SelectedStore: "",
            SelectedProduct: "",
          });
          this.props.FetchData("go");
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.setState({
        Validation: true,
      });
      this.close();
    } else {
      let x = [];
      if (this.state.SelectedCustomer == null) {
        let y = "Select a Customer";
        x.push(y);
      }
      if (this.state.SelectedProduct == null) {
        let y = "Select a Product";
        x.push(y);
      }
      if (this.state.SelectedStore == null) {
        let y = "Select a Store";
        x.push(y);
      }
      this.setState({
        Validation: false,
        errMs: x,
      });
    }
  };
  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
    return (
      <div style={style.h1}>
        <Button primary onClick={this.closeConfigShow(true, false)}>
          New Sales
        </Button>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          size="tiny"
        >
          <Modal.Header>Create Sales</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Date Sold</label>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Customer</label>
                <Dropdown
                  placeholder="Select Customer"
                  fluid
                  selection
                  options={this.state.Customer}
                  onChange={(e, { value }) => {
                    this.setState({
                      SelectedCustomer: value,
                    });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Product</label>
                <Dropdown
                  placeholder="Select Product"
                  fluid
                  selection
                  options={this.state.Product}
                  onChange={(e, { value }) => {
                    this.setState({
                      SelectedProduct: value,
                    });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Store</label>
                <Dropdown
                  placeholder="Select Store"
                  fluid
                  selection
                  options={this.state.Store}
                  onChange={(e, { value }) => {
                    this.setState({
                      SelectedStore: value,
                    });
                  }}
                />
              </Form.Field>
            </Form>
            <Message
              hidden={this.state.Validation}
              error
              header="There was some errors with your submission"
              list={this.state.errMs}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Cancle
            </Button>
            <Button
              onClick={this.submitHandle}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Create"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default AddSales;
