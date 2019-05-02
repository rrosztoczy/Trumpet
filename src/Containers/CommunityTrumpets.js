import React, { Component } from 'react';
import Trumpets from './Trumpets'

export default class CommunityTrumpets extends Component {

    render() {
    return <Trumpets trumpets={this.props.trumpets}></Trumpets>
    }
}
