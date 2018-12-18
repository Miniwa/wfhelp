import { getStats } from './market/wfmarket';
import React, { Component } from 'react';
import {Grid, Row, Col, FormGroup, FormControl, Navbar} from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  async componentDidMount() {
    const stats = await getStats("mag_prime_set");
    const last = stats[stats.length - 1];
    console.log(last);
    console.log("Buy Margin:", last.getBuyMargin());
    console.log("Sell Margin:", last.getSellMargin());
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={6}>
            <ResponsiveContainer
              width="100%"
              aspect={1}>
              <LineChart
                data={[
                  {usd: 1},
                  {usd: 6},
                  {usd: 12},
                  {usd: 29},
                  {usd: 38},
                ]}>
                <Line type="monotone" dataKey="usd" stroke="#8884d8" />
                <XAxis />
                <YAxis unit="$"  />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
