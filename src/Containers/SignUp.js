import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

export default class SignUp extends React.Component {

  state =  {
    userId: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: ""
  }

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return(
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}
        </style>

            {/* // User input to login or sign up forms (reusable for more forms?)
      handleFormChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      } */}

            {/* // TODO: Set this based on logged in user eventually
        { userId: "",
        username: "",
        password: "",
        trumpets: [],
        first_name: "",
        last_name: ""
      {/* } */}
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              <Image src='/logo.png' /> Sign up with Trumpet
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid name="first_name" placeholder='First name' onChange={(e) => this.handleFormChange(e)} />
                <Form.Input fluid name="last_name" placeholder='Last name' onChange={(e) => this.handleFormChange(e)} />
                <Form.Input fluid name="username" placeholder='username' onChange={(e) => this.handleFormChange(e)} />
                <Form.Input fluid name="email" placeholder='email' onChange={(e) => this.handleFormChange(e)} />
                <Form.Input fluid name="password" icon='lock' iconPosition='left' placeholder='password' type='password' onChange={(e) => this.handleFormChange(e)} />

                <Button color='blue' fluid size='large' onClick={() => this.props.createNewUser(this.state)}>
                  Sign Up
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <Button size='mini' onClick={() => this.props.handleLoginOrSignUpButtonClick()}>Log in</Button>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
