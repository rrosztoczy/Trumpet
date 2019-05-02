import React, { Component } from 'react';
import NewTrumpetPrompt from '../Components/NewTrumpetPrompt'
import Trumpets from './Trumpets'
import NewTrumpetCard from '../Components/NewTrumpetCard'

export default class MyTrumpets extends Component {

    state = {
        new: false
    }

    onClickNew = () => {
        this.setState({new: true})
    }

    onClickCreate = () => {
        this.setState({new: false})
    }

    renderNewTrumpetForm() {
        return <NewTrumpetCard onClickCreate={this.onClickCreate} />
    }

    render() {
    return(
    <div>
        <div>My Trumpets!</div>
        <NewTrumpetPrompt onClickNew={this.onClickNew} />
        <div>{this.state.new ? this.renderNewTrumpetForm() : null}</div>
        <Trumpets title="My Trumpets" trumpets={this.props.trumpets} /* filtered by user*/ />
        <Trumpets title="My Reactions" trumpets={this.props.trumpets /* filtered by reactions*/} />
    </div>
    )}
}
