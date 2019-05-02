import React from 'react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'



const TrumpetCard = ({ trumpet }) => {
    const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    console.log("object", trumpet)
    console.log("content", trumpet.content)


    return(
    <Item>
        <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        <Item.Content>
          <Item.Header as='a'>Place Holder for Trump Summary</Item.Header>
          <Item.Meta>
            <span className='cinema'>{trumpet.trumpet_type}</span>
          </Item.Meta>
          <Item.Description>{trumpet.content}</Item.Description>
          <Item.Extra>
            <Button primary floated='right'>
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

export default TrumpetCard