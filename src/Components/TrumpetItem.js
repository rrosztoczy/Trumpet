import React from 'react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'



const TrumpetItem = ({ trumpet, onClickEdit }) => {
    const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    console.log("object", trumpet)
    console.log("content", trumpet.content)


    return(
        // If edit state is false, return the bottom, if true return the edit form
    <Item>
        <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        <Item.Content>
          <Item.Header as='a'>{trumpet.summary}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{trumpet.trumpet_type}</span>
          </Item.Meta>
          <Item.Description>{trumpet.content}</Item.Description>
          <Item.Extra>
            <Button primary floated='right' onClick={onClickEdit}>
              Edit
              <Icon name='right edit outline' />
            </Button>
            <Label floated='left'>Cheer</Label>
            <Label floated='left'>Jeer</Label>
            {/* <Icon color='green' name='check' /> 121 Votes */}
          </Item.Extra>
        </Item.Content>
      </Item>
      )
}

export default TrumpetItem