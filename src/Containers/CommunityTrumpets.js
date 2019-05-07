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
          <h2>Trumpets from the Community</h2>
          <Trumpets noEdit="noEdit" trumpets={this.props.trumpets} onReactionClick={this.props.onReactionClick}></Trumpets>
        </Grid.Column>
        <Grid.Column width={8}>
        <Grid.Row>
        <h2>Cumulative Trumpets by Type</h2>
        <TrumpetDoughnut trumpets={this.props.trumpets}/>
        </Grid.Row>
        <Grid.Row>
        <h2>By Website</h2>
        <TrumpetLineChart trumpets={this.props.trumpets} />
        </Grid.Row>
        </Grid.Column>
        </Grid>
      )}
}
