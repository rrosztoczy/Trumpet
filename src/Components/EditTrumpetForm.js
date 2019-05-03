import React from 'react'
import { Button, Icon, Image, Form, Item, Label } from 'semantic-ui-react'
const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png'/>
const options = [
    { key: 'b', text: 'Bias', name: "trumpet_type", value: 'Bias' },
    { key: 'l', text: 'Lie', name: "trumpet_type", value: 'Lie' },
    { key: 'n', text: 'No Sources', name: "trumpet_type", value: 'No Sources' }
  ]

  
export default class EditTrumpetForm extends React.Component {

    // console.log("object", trumpet)
    // console.log("content", trumpet.content)
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


    state = {
      summary: this.props.trumpet.summary,
      url: this.props.trumpet.url,
      root_url: this.props.trumpet.root_url,
      trumpet_type: this.props.trumpet.trumpet_type,
      content: this.props.trumpet.content
    }

    handleChange = (event) => this.setState({[event.target.name]: event.target.value}, () => console.log("State", this.state))
    handleSelect = (event) => {
        event.persist()
    this.setState({trumpet_type: event.target.innerText}, () => console.log("Event", event, "State", this.state))
}
    // handleChange = (e, { value }) => this.setState({ value }, () => console.log('state', this.state))
    // Fully control form with state
  
    render() {
      const { state } = this.state
      console.log("edit state", this.state)
      return (
        <Form >
         {/* <Form onSubmit={(event, newTrumpet) => this.props.handleSubmit(event, this.state)}> */}
          <Form.Group widths='equal'>
            <Form.Input onChange={this.handleChange} fluid label='Summary' placeholder='Summary' name="summary" value={this.state.summary} />
            {/* Figure out selection value */}
            <Form.Select onChange={this.handleSelect} fluid label='Type' options={options} placeholder='Type' name="trumpet_type" value={this.state.trumpet_type} />
          </Form.Group>
          <Form.Group widths='equal'>
          <Form.Input onChange={this.handleChange} fluid label='Website URL' placeholder='Website URL' name="url" value={this.state.url} />
            <Form.Input onChange={this.handleChange} fluid label='Root Url' placeholder='Root Url' name="root_url" value={this.state.root_url} />
          </Form.Group>
          <Form.TextArea onChange={this.handleChange} label='Content' placeholder='Tell us more about you...' name="content" value={this.state.content} />
          {/* <Form.Checkbox label='I agree to the Terms and Conditions' /> */}
          <Form.Button primary>Submit Changes</Form.Button>
          <Form.Button primary floated='right' >Cancel</Form.Button>
        </Form>
      )
    }
  }