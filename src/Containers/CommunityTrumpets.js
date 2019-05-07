import React, { Component } from 'react';
import Trumpets from './Trumpets'
import { Grid } from 'semantic-ui-react'
import TrumpetLineChart from '../Components/TrumpetLineChart'
import TrumpetDoughnut from '../Components/TrumpetDoughnut'

export default class CommunityTrumpets extends Component {

    render() {
      return (
        <Grid celled>
        <Grid.Column width={8}>
          <header>Trumpets Your Have Created</header>
          <Trumpets noEdit="noEdit" trumpets={this.props.trumpets} onReactionClick={this.props.onReactionClick}></Trumpets>
        </Grid.Column>
        <Grid.Column width={8}>
        <Grid.Row>
        <header>Holder for overall breakdown</header>
        <TrumpetDoughnut />
        </Grid.Row>
        <Grid.Row>
        <header>Holder for trending chart</header>
        <TrumpetLineChart />
        </Grid.Row>
        </Grid.Column>
        </Grid>
      )}
}
