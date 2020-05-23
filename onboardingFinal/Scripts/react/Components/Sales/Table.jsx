import React, { Component } from "react";
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Table,
  Modal,
  Form,
  Pagination,
  Message,
  Dropdown,
} from "semantic-ui-react";
import axios from "axios";

const style = {
  h1: {
    marginTop: "2em",
  },
};
const style2 = {
  h1: {
    marginTop: "1em",
  },
};
class SalesTable extends Component {
  state = {
    Name: "",
    startDate: new Date(),
    SelectedDate: null,
    SelectedCustomer: null,
    SelectedProduct: null,
    SelectedStore: null,
    Address: "",
    TName: "",
    TAddress: "",
    jsonData: "",
    CurrentPage: 1,
    filterjsonData: [],
    totalPages: 1,
    Validation: true,
    errMs: [],
    CustomerId: null,
    ProductId: null,
      StoreId: null,
      isLoading: true,
      usersData: [],
      error: null
  };

  Delete = (Id) => {
      axios
          .delete(
        "http://localhost:55706/api/Sales/"+Id,
        {
         
          Id: Id,
        }
      )
      .then((response) => {
       
        this.filterData();
        this.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick, Id) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true, Id: Id });
  };
  closeConfigShow2 = (closeOnEscape, closeOnDimmerClick, Id) => {
      return () => {
          axios
              .get("http://localhost:55706/api/Customers", {})
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
                      open2: true,
                      Customer: arr,
                  });
              })
              .catch(function(error) {
                  console.log(error);
              });
          axios
              .get("http://localhost:55706/api/Products", {})
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
                      open2: true,
                      Product: arr,
                  });
              })
              .catch(function(error) {
                  console.log(error);
              });
          axios
              .get("http://localhost:55706/api/Stores", {})
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
                      open2: true,
                      Store: arr,
                  });
              })
              .catch(function(error) {
                  console.log(error);
              });
          this.setState({ closeOnEscape, closeOnDimmerClick, open2: true, Id: Id });
          let x = this.state.jsonData;
          x.map((y) => {
              if (y.Id === Id) {
                  this.setState({
                      SelectedCustomer: y.CustomerId,
                      SelectedProduct: y.ProductId,
                      SelectedStore: y.StoreId,
                  });
              }
          });
      };
    };

  UpdateRow = (Id) => {
    axios
      .put(
        "http://localhost:55706/api/Sales/"+Id,
        {
          Id: this.state.Id,
          DateSold: this.state.startDate.toLocaleDateString(),
          CustomerId: this.state.SelectedCustomer,
          ProductId: this.state.SelectedProduct,
          StoreId: this.state.SelectedStore,
        }
      )
      .then((response) => {
        this.setState({
          Validation: true,
        });
        this.filterData();
        this.close2();
      })
      .catch((err) => {
        console.log(err);
      });
    this.close2();
  };
  close = () => this.setState({ open: false });
  close2 = () => this.setState({ open2: false });

  componentDidMount = () => {
    localStorage.removeItem("curentPage");
    this.filterData();
  };
  componentWillReceiveProps(nextProps) {
    this.filterData();
  }
  filterData = () => {
    axios
      .get(
        "http://localhost:55706/api/Sales",
        {
          
        }
      )
      .then((response) => {
        this.setState({
          jsonData: response.data,
        });
        let x = this.state.jsonData;
        this.setState({
          totalPages: this.state.jsonData.length / 3,
        });
        let page = localStorage.getItem("curentPage");
        if (!page) {
          page = 1;
        }
        page = Math.ceil(page);
        let itemsPerPage = 3;
        let start = page * itemsPerPage - itemsPerPage;
        let end = start + itemsPerPage;
        x = x.slice(start, end);
        this.setState({
          filterjsonData: x,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  nextPage = (e, data) => {
    localStorage.setItem("curentPage", data.activePage);
    this.filterData();
  };
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  render() {
      const { open, closeOnEscape, closeOnDimmerClick, open2, usersData } = this.state;
    return (
      <div style={style.h1}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
                        <Table.HeaderCell>Edit Action</Table.HeaderCell>
                        <Table.HeaderCell>Delete Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.filterjsonData.map((Sales, index) => {
              const { DateSold, CustomerId, StoreId, ProductId, Id } = Sales;
              return (
                <Table.Row key={Id}>
                      <Table.Cell>{DateSold}</Table.Cell>
                      <Table.Cell>{CustomerId}</Table.Cell>
                      <Table.Cell>{ProductId}</Table.Cell>
                      <Table.Cell>{StoreId}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={this.closeConfigShow2(true, false, Id)}>
                      Edit
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={this.closeConfigShow(true, false, Id)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <Pagination
          style={style2.h1}
          onPageChange={this.nextPage}
          defaultActivePage={this.state.CurrentPage}
          totalPages={this.state.totalPages}
        />
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          size="mini"
        >
          <Modal.Header>Delete Sales</Modal.Header>
          <Modal.Content>Are you sure?</Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Cancle
            </Button>
            <Button
              onClick={() => this.Delete(this.state.Id)}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Delete"
            />
          </Modal.Actions>
        </Modal>
        <Modal
          open={open2}
          closeOnEscape={true}
          closeOnDimmerClick={false}
          onClose={this.close2}
          size="tiny"
        >
          <Modal.Header>Edit Sales</Modal.Header>
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
            <Button onClick={this.close2} negative>
              Cancel
            </Button>
            <Button
              onClick={() => this.UpdateRow(this.state.Id)}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Save"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default SalesTable;
