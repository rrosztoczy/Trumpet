import React from 'react'
import { Item } from 'semantic-ui-react'
import TrumpetCard from '../Components/TrumpetCard'
import { v4 } from 'uuid'


export default class Trumpets extends React.Component {


    renderTrumpets() {
        return this.props.trumpets.map(trumpet => <TrumpetCard key={ v4() } trumpet={trumpet} handleSubmitEdit={this.props.handleSubmitEdit} onReactionClick={this.props.onReactionClick}/>)
    }

    render() {
        return (
            <Item.Group divided>
                {this.renderTrumpets()}
            </Item.Group>
        )

    }


}
