import React, { Component } from 'react';
import Trumpets from './Trumpets'

export default class CommunityTrumpets extends Component {

    render() {
      return <Trumpets noEdit="noEdit" trumpets={this.props.trumpets} onReactionClick={this.props.onReactionClick}></Trumpets>
    }
}
