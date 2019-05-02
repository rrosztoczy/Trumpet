
import React from 'react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'



const TrumpetCard = (props) => {
    const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    // console.log("object", trumpet)
    // console.log("content", trumpet.content)


    return(
    <Item>
        <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        <Item.Content>
          <Item.Header as='a'>Place Holder for Trump Summary</Item.Header>
          <Item.Meta>
            <span className='cinema'>Place holder for name</span>
          </Item.Meta>
          <Item.Description>Place holder for content</Item.Description>
          <Item.Extra>
            <Button primary floated='right' onClick={props.onClickCreate}>
              Create
              <Icon name='right add' />
            </Button>
            {/* <Icon color='green' name='check' /> 121 Votes */}
          </Item.Extra>
        </Item.Content>
      </Item>
      )
}

export default TrumpetCard




// Post Body
    //  {
    //     "summary": null,
    //     "trumpet_type": "Missing source",
    //     "content": "Liar, liar, pants on fire.",
    //     "user_id": {populate from current user state, hard code at first},
    //      "url": "http://cnn.com/politics",
    //      "root_url": "http://cnn.com"
    //     }
    // }