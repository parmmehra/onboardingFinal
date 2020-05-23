import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Header} from './Header'
import Products from './Products/Product'
import Customers from './Customers/Customers'
import Sales from './Sales/Sales'
import Store from './Store/Store'
import {Container} from 'semantic-ui-react'

export default function App() {
  return (
    <Router>
      <div>
      	<Header/>
        <Container>
        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/store">
            <Store />
          </Route>
           <Route path="/sales">
              <Sales />
            </Route>
          <Route path="/">
            <Customers />
          </Route>
        </Switch>
        </Container>
      </div>
    </Router>
  );
}