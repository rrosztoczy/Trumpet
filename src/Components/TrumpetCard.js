import React from 'react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import EditTrumpetForm from './EditTrumpetForm'
import TrumpetItem from './TrumpetItem'



export default class TrumpetCard extends React.Component {
    state = {
        edit: false
    }

    onClickEdit = () => {
        this.setState(prevState => ({edit: !prevState.edit}), () => console.log("edit state", this.state.edit))
    }

render() {
    return this.state.edit ? <EditTrumpetForm trumpet={this.props.trumpet}/> : <TrumpetItem trumpet={this.props.trumpet} onClickEdit={this.onClickEdit}/>
    }
}