import React, { Component } from 'react';
import NewTrumpetPrompt from '../Components/NewTrumpetPrompt'
import Trumpets from './Trumpets'
import NewTrumpetCard from '../Components/NewTrumpetCard'

export default class MyTrumpets extends Component {

    state = {
        new: false
    }

    onClickNew = () => {
        this.setState(prevState => ({new: !prevState.new}))
    }

 
    handleSubmit = (e, newTrumpet) => {
        //TODO: Replace hardcoded user id
        e.preventDefault();
        const hardCodeUserID = {...newTrumpet, user_id: 1}
        console.log("submitted obj", hardCodeUserID);
        this.props.trumpetAdapter.create(hardCodeUserID)
        this.setState(prevState => ({new: !prevState.new}))
    }

    renderNewTrumpetForm() {
        return <NewTrumpetCard handleSubmit={this.handleSubmit} />
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
