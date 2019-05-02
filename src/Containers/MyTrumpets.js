import React, { Component } from 'react';
import NewTrumpetPrompt from '../Components/NewTrumpetPrompt'
import Trumpets from './Trumpets'
import NewTrumpetCard from '../Components/NewTrumpetCard'

export default class MyTrumpets extends Component {

    render() {
    return(
    <div>
        <div>My Trumpets!</div>
        <NewTrumpetPrompt />
        <Trumpets title="My Trumpets" trumpets={this.props.trumpets} /* filtered by user*/ />
        <Trumpets title="My Reactions" trumpets={this.props.trumpets /* filtered by reactions*/} />
    </div>
    )}
}
