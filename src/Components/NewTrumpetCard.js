
import React from 'react'
import { Button, Icon, Image, Form, Item, Label } from 'semantic-ui-react'
const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png'/>
const options = [
    { key: 'b', text: 'Bias', value: 'Bias' },
    { key: 'l', text: 'Lie', value: 'Lie' },
    { key: 'n', text: 'No Sources', value: 'No Sources' }
  ]
export default class TrumpetCard extends React.Component {

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
    state = {}

    handleChange = (event) => this.setState({[event.target.name]: event.target.value}, () => console.log("State", this.state))
    // Fully control form with state
  
    render() {
      const { value } = this.state
      return (
        <Form onSubmit={this.props.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input onChange={this.handleChange} fluid label='Summary' placeholder='Summary' name="summary" value={this.state.summary ? this.state.summary : null} />
            {/* Figure out selection value */}
            <Form.Select onChange={this.handleChange} fluid label='Type' options={options} placeholder='Type' name="trumpet_type" value={this.state.trumpet_type ? this.state.trumpet_type : null} />
          </Form.Group>
          <Form.Group widths='equal'>
          <Form.Input onChange={this.handleChange} fluid label='Website URL' placeholder='Website URL' name="url" value={this.state.url ? this.state.url : null} />
            <Form.Input onChange={this.handleChange} fluid label='Root Url' placeholder='Root Url' name="root_url" value={this.state.root_url ? this.state.root_url : null} />
          </Form.Group>
          <Form.TextArea onChange={this.handleChange} label='Content' placeholder='Tell us more about you...' name="content" value={this.state.content} />
          {/* <Form.Checkbox label='I agree to the Terms and Conditions' /> */}
          <Form.Button >Create</Form.Button>
        </Form>
      )
    }
  }




