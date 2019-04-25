import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { Progress, Button } from 'antd';
import 'antd/dist/antd.css';

import { getDatabaseStatus } from './util/util';

import PurchaseForm from './Component/PurchaseForm';
import StockGrid from './Component/StockGrid';

class App extends Component {
  state = { loading: true, formName: 'edit' }

  componentWillMount() {
    getDatabaseStatus().then(data => {
      this.setState({ loading: false });
    })
  }

  render() {
    if(this.state.loading) return (
      <div className="centerAlign coverFullHeight row">
        <Progress type="circle" percent={75} />
      </div>
    );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 style={{ color: "white" }}>Welcome to RP Katta</h2>
          <div class="stickRight">
            <Button
              icon="edit"
              size="large"
              style={{ backgroundColor: "transparent", color: 'white' }}
              onClick={() => this.setState({ formName: 'edit' }) }
            />
            <Button
              icon="table"
              size="large"
              style={{ backgroundColor: "transparent", color: 'white' }}
              onClick={() => this.setState({ formName: 'table' }) }
            />
          </div>
        </header>
        { this.state.formName === 'table' ? <StockGrid /> : <PurchaseForm /> }
      </div>
    );
  }
}

export default App;