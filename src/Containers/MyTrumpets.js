import React, { Component } from 'react';
import NewTrumpetPrompt from '../Components/NewTrumpetPrompt'
import Trumpets from './Trumpets'
import NewTrumpetCard from '../Components/NewTrumpetCard'

export default class MyTrumpets extends Component {

    state = {
        new: false,
        user_id: this.props.user_id
    }

    onClickNew = () => {
        this.setState(prevState => ({new: !prevState.new}))
    }

 
    handleSubmitNew = (e, newTrumpet) => {
        //TODO: Replace hardcoded user id
        e.preventDefault();
        const userTrumpet = {...newTrumpet, user_id: this.state.user_id}
        console.log("submitted obj", userTrumpet);
        this.props.trumpetAdapter.create(userTrumpet)
        this.setState(prevState => ({new: !prevState.new}))
    }

    handleSubmitEdit = (e, editedTrumpet) => {
        //TODO: Replace hardcoded user id
        e.preventDefault();
        const userTrumpet = {...editedTrumpet, user_id: this.state.user_id}
        console.log("submitted obj", userTrumpet);
        // {probably need an id and the obj for update}
        this.props.trumpetAdapter.update(userTrumpet.id, userTrumpet)
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
        <Trumpets title="My Trumpets" trumpets={this.props.trumpets} handleSubmitEdit={this.handleSubmitEdit}  /* filtered by user*/ />
        <Trumpets title="My Reactions" trumpets={this.props.trumpets /* filtered by reactions*/} />
    </div>
    )}
}
