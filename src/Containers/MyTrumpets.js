import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import NewTrumpetPrompt from '../Components/NewTrumpetPrompt'
import Trumpets from './Trumpets'
import NewTrumpetCard from '../Components/NewTrumpetCard'

export default class MyTrumpets extends Component {

    state = {
        new: false,
        user_id: parseInt(localStorage.getItem("user_id"))
    }

    onClickNew = () => {
        this.setState(prevState => ({new: !prevState.new}))
    }

    handleSubmitNew = (e, newTrumpet) => {
        e.preventDefault();
        const userTrumpet = {...newTrumpet, user_id: parseInt(localStorage.getItem("user_id"))};
        (async () => {
        const newTrumpet = await this.props.trumpetAdapter.create(userTrumpet)
        const trumpets = await this.props.getTrumpets()
        this.setState(prevState => ({new: !prevState.new}))
    })();
    };

    handleSubmitEdit = (e, editedTrumpet) => {
        e.preventDefault();
        const trumpetForUpdate = {...editedTrumpet, user_id: parseInt(localStorage.getItem("user_id"))};
        (async () => {
            const editTrumpet = await this.props.trumpetAdapter.update(trumpetForUpdate.id, trumpetForUpdate)
            const trumpets = await this.props.getTrumpets()
            this.setState(prevState => ({edit: !prevState.edit}))
        })();
    };

    renderNewTrumpetForm() {
        return <NewTrumpetCard handleSubmitNew={this.handleSubmitNew} />
    }

    render() {
    return(
    <div>
        <div>My Trumpets!</div>
        <NewTrumpetPrompt onClickNew={this.onClickNew} />
        <div>{this.state.new ? this.renderNewTrumpetForm() : null}</div>
        <Grid celled>
          <Grid.Column width={8}>
          <header>Trumpets Your Have Created</header>
            <Trumpets title="My Trumpets" noEdit="Edit"  trumpets={this.props.myTrumpets /* filtered by user*/} handleSubmitEdit={this.handleSubmitEdit} onReactionClick={this.props.onReactionClick} />
          </Grid.Column>
          <Grid.Column width={8}>
          <header>Trumpets You Have Reacted To</header>
            <Trumpets title="My Reactions" noEdit="noEdit" trumpets={this.props.myReactedTrumpets /* filtered by reactions*/} onReactionClick={this.props.onReactionClick} />
          </Grid.Column>
        </Grid>
    </div>
    )}
}
