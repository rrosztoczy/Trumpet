import React from 'react'
import { Button } from 'semantic-ui-react'


const NewTrumpetPrompt = (props) => {

    return (
      <div>
        <Button primary icon='add' onClick={props.onClickNew} content='New Trumpet' />
      </div>
    )
}

export default NewTrumpetPrompt
