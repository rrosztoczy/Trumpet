import React from 'react'
import { Button, Item} from 'semantic-ui-react'

const TrumpetItem = ({ trumpet, onClickEdit, onReactionClick, noEdit }) => {
    // const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    // console.log("object", trumpet)
    // console.log("content", trumpet.content)

    // If edit state is false, return the bottom, if true return the edit form
    return(
    <Item>
        <Item.Image src={trumpet.img_url} size="tiny" floated='left' />
        <Item.Content>
          <Item.Header><h3>{trumpet.summary}</h3></Item.Header>
          <Item.Meta>
            <span style={{color: 'grey'}}className='cinema'>{trumpet.trumpet_type}</span>
          </Item.Meta>
          <Item.Description>{trumpet.content}</Item.Description>
          <Item.Extra>
            {/*from Dave - conditionally render this edit button if trumpet belongs to current user?*/}
            {noEdit === "noEdit" ? null : <Button primary icon='edit' floated='right' onClick={onClickEdit} content='Edit' />}
            <div style={{marginLeft: '94px'}}>
              <Button
                color="blue"
                content='Cheer'
                size='mini'
                icon='thumbs up outline'
                label={{ as: 'a', basic: true, content: trumpet.cheers }}
                labelPosition='right'
                onClick={(e) => onReactionClick(trumpet.id, e)}
              />
              <Button
                color="blue"
                content='Jeer'
                size='mini'
                icon='thumbs down outline'
                label={{ as: 'a', basic: true, content: trumpet.jeers }}
                labelPosition='left'
                onClick={(e) => onReactionClick(trumpet.id, e)}
              />
          </div>
          <br/>
            {/* <Icon color='green' name='check' /> 121 Votes */}
          </Item.Extra>
        </Item.Content>
      </Item>
      )
}

export default TrumpetItem
