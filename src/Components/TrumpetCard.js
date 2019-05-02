import React from 'react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'



const TrumpetCard = ({ trumpet }) => {
    const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />


    return(
    <Item>
        <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        <Item.Content>
          <Item.Header as='a'>{trumpet.trumpet_name}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{trumpet.trumpet_type}</span>
          </Item.Meta>
          <Item.Description>{paragraph}</Item.Description>
          <Item.Extra>
            <Button primary floated='right'>
              Edit
              <Icon name='right edit outline' />
            </Button>
            <Label>Limited</Label>
          </Item.Extra>
        </Item.Content>
      </Item>
      )
}

export default TrumpetCard