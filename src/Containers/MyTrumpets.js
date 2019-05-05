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

    handleSubmitNew = (e, newTrumpet) => {
        //TODO: Replace hardcoded user id
        e.preventDefault();
        const hardCodeUserID = {...newTrumpet, user_id: 1}
        console.log("submitted obj", hardCodeUserID);
        this.props.trumpetAdapter.create(hardCodeUserID)
        this.setState(prevState => ({new: !prevState.new}))
    }

    handleSubmitEdit = (e, editedTrumpet) => {
        //TODO: Replace hardcoded user id
        e.preventDefault();
        const hardCodeUserID = {...editedTrumpet, user_id: 1}
        console.log("submitted obj", hardCodeUserID);
        // {probably need an id and the obj for update}
        // from Dave - need to also handle response here?
        this.props.trumpetAdapter.update(hardCodeUserID.id, hardCodeUserID)
        // somehow make sure we are showing the edited form now if i need to
    }

    renderNewTrumpetForm() {
        return <NewTrumpetCard handleSubmitNew={this.handleSubmitNew} />
    }

    render() {
    return(
    <div>
        <div>My Trumpets!</div>
        <NewTrumpetPrompt onClickNew={this.onClickNew} />
        <div>{this.state.new ? this.renderNewTrumpetForm() : null}</div>
        <Trumpets title="My Trumpets" trumpets={this.props.trumpets /* filtered by user*/} handleSubmitEdit={this.handleSubmitEdit} onReactionClick={this.props.onReactionClick} />
        <Trumpets title="My Reactions" trumpets={this.props.trumpets /* filtered by reactions*/} onReactionClick={this.props.onReactionClick} />
    </div>
    )}
}
