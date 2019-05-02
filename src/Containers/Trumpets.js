import React from 'react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import TrumpetCard from '../Components/TrumpetCard'



export default class Trumpets extends React.Component {


    renderTrumpets() {
        return this.props.trumpets.map(trumpet => <TrumpetCard trumpet={trumpet}/>)
    }

    render() {
        return (
            <Item.Group divided>
                {this.renderTrumpets()}
            </Item.Group>
        )

    }


}

