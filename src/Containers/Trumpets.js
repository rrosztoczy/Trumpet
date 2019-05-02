import React from 'react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import TrumpetCard from '../Components/TrumpetCard'



export default class Trumpets extends React.Component {


    renderTrumpets() {
        const testTrumpets = [{trumpet_name: "Bad Article", trumpet_type: "Bias"}, {trumpet_name: "Bad Article", trumpet_type: "Bias"}]
        return testTrumpets.map(trumpet => <TrumpetCard trumpet={trumpet}/>)
    }

    render() {
        return (
        <div>
            <Item.Group divided>
                {this.renderTrumpets()}
            </Item.Group>
        </div>
        )

    }


}

