import React from 'react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'


const NewTrumpetPrompt = (props) => {


    return(
    <div>
    <Button primary onClick={props.onClickNew}>
    <Icon name='right add' /> 
    </Button>
    New Trumpet
    </div>)
    // On Click, this I
}

export default NewTrumpetPrompt