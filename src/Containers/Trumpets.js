import React from 'react'
import { Item, Grid } from 'semantic-ui-react'
import TrumpetCard from '../Components/TrumpetCard'
import { v4 } from 'uuid'


export default class Trumpets extends React.Component {


    renderTrumpets() {
        return this.props.trumpets.map(trumpet => <Grid.Row><TrumpetCard key={ v4() } noEdit={this.props.noEdit} trumpet={trumpet} handleSubmitEdit={this.props.handleSubmitEdit} onReactionClick={this.props.onReactionClick}/></Grid.Row>)
    }

    render() {
        return (
            <Item.Group divided>
                {this.renderTrumpets()}
            </Item.Group>
        )

    }


}
