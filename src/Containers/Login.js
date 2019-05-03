import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const Login = (props) => (
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
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Log in to your Trumpet account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid name="username" icon='user' iconPosition='left' placeholder='username' onChange={(e) => props.handleFormChange(e)} />
            <Form.Input fluid name="password" icon='lock' iconPosition='left' placeholder='password' type='password' onChange={(e) => props.handleFormChange(e)} />

            <Button color='teal' fluid size='large' onClick={() => props.handleLoginSubmit()}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <button onClick={() => props.handleLoginOrSignUpButtonClick()}>Sign Up</button>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default Login
