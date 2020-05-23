import React, { Component } from 'react';
import { Button, Table, Modal, Form, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import { render } from 'react-dom';


const style = {
    h1: {
        marginTop: '2em',
    },
}
const style2 = {
    h1: {
        marginTop: '1em',
    },
}


class Customers extends Component {
    state = {
        Name: '',
        Address: '',
        jsonData: '',
        CurrentPage: 1,
        filterjsonData: [],
        totalPages: 1
    }

    Delete = (id) => {
        axios
            .post("http://localhost:55706/api/Customers", {
                request: 3,
                Id: id
            })
            .then((response) => {
                console.log(response.data);
                this.filterData();
                this.close();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick, id) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true, id: id })
    }
    closeConfigShow2 = (closeOnEscape, closeOnDimmerClick, id) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open2: true, id: id })
        let x = this.state.jsonData;
        x.map(y => {
            if (y.id === Id) {
                this.setState({
                    Name: y.Name,
                    Address: y.Address
                })
            }
        })
    }
    UpdateRow = () => {
        axios
            .post("http://localhost:55706/api/Customers", {
                request: 4,
                id: this.state.id,
                name: this.state.Name,
                address: this.state.Address
            })
            .then((response) => {
                this.filterData();
                this.close2();
            })
            .catch((err) => {
                console.log(err)
            })
        this.close2();
    }
    close = () => this.setState({ open: false })
    close2 = () => this.setState({ open2: false })


    componentDidMount = () => {
        localStorage.removeItem('curentPage');
        this.filterData();
    }
    componentWillReceiveProps(nextProps) {
        console.log('ok')
        this.filterData();
    }
    filterData = () => {
        axios
            .get("http://localhost:55706/api/Customers", {

            })
            .then(response => {
                this.setState({
                    jsonData: response.data
                })
                let x = this.state.jsonData;
                this.setState({
                    totalPages: this.state.jsonData.length / 3
                })
                let page = localStorage.getItem('curentPage');
                if (!page) {
                    page = 1;
                }
                page = Math.ceil(page);
                let itemsPerPage = 3;
                let start = page * itemsPerPage - itemsPerPage;
                let end = start + itemsPerPage;
                x = x.slice(start, end);
                this.setState({
                    filterjsonData: x
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    nextPage = (e, data) => {
        localStorage.setItem('curentPage', data.activePage);
        this.filterData();
    }

    render() {
        const { open, closeOnEscape, closeOnDimmerClick, open2 } = this.state
        return (
            <div style={style.h1}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.filterjsonData.map((Customer, index) => {
                            const { Name, Address, Id } = Customer;
                            return (
                                <Table.Row key={Id}>
                                    <Table.Cell>{Name}</Table.Cell>
                                    <Table.Cell>{Address}</Table.Cell>
                                    <Table.Cell><Button onClick={this.closeConfigShow2(true, false, Id)}>Edit</Button></Table.Cell>
                                    <Table.Cell><Button onClick={this.closeConfigShow(true, false, Id)} >Delete</Button></Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
                <Pagination style={style2.h1} onPageChange={this.nextPage} defaultActivePage={this.state.CurrentPage} totalPages={this.state.totalPages} />
                <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                    size='mini'
                >
                    <Modal.Header>Delete Customer</Modal.Header>
                    <Modal.Content>
                        Are you sure?
          </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative>
                            Cancle
            </Button>
                        <Button
                            onClick={() => this.Delete(this.state.Id)}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Delete'
                        />
                    </Modal.Actions>
                </Modal>
                <Modal
                    open={open2}
                    closeOnEscape={true}
                    closeOnDimmerClick={false}
                    onClose={this.close2}
                    size='tiny'
                >
                    <Modal.Header>Edit Customer</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='Name' value={this.state.Name} onChange={e => this.setState({ Name: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input placeholder='Address' value={this.state.Address} onChange={e => this.setState({ Address: e.target.value })} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close2} negative>
                            Cancle
            </Button>
                        <Button
                            onClick={() => this.UpdateRow(this.state.Id)}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Save'
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}
export default Customers




