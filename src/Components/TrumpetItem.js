import React from 'react'
import { Button, Item} from 'semantic-ui-react'

const TrumpetItem = ({ trumpet, onClickEdit, onReactionClick }) => {
    // const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    // console.log("object", trumpet)
    // console.log("content", trumpet.content)

    // If edit state is false, return the bottom, if true return the edit form
    return(
    <Item>
        <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        <Item.Content>
          <Item.Header as='a'>{trumpet.summary}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{trumpet.trumpet_type}</span>
          </Item.Meta>
          <Item.Description>{trumpet.content}</Item.Description>
          <Item.Extra>
            {/*from Dave - conditionally render this edit button if trumpet belongs to current user?*/}
            <Button primary icon='edit' floated='right' onClick={onClickEdit} content='Edit' />
            <div>
              <Button
                data-id="cheer-button"
                content='Cheer'
                compact
                size='mini'
                icon='thumbs up outline'
                label={{ as: 'a', basic: true, content: trumpet.cheers }}
                labelPosition='right'
                onClick={(e) => onReactionClick(trumpet.id, e)}
              />
              <Button
                content='Jeer'
                compact
                size='mini'
                icon='thumbs down outline'
                label={{ as: 'a', basic: true, content: trumpet.jeers }}
                labelPosition='left'
                onClick={(e) => onReactionClick(trumpet.id, e)}
              />
            </div>

            {/* <Icon color='green' name='check' /> 121 Votes */}
          </Item.Extra>
        </Item.Content>
      </Item>
      )
}

export default TrumpetItem
