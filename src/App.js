import React, { Component } from 'react';
import Nav from './Components/Nav'
import MyTrumpets from './Containers/MyTrumpets'
import CommunityTrumpets from './Containers/CommunityTrumpets'
import TrumpetAnalytics from './Containers/TrumpetAnalytics'
import AccountSettings from './Containers/AccountSettings'
import logo from './logo.svg';
import './App.css';
import adapter from './Adapter.js';
import Login from './Containers/Login'
import SignUp from './Containers/SignUp'

const userEndpoint = "http://localhost:3000/api/v1/users"
const trumpetEndpoint = "http://localhost:3000/api/v1/trumpets"
const userAdapter = adapter(userEndpoint)
const trumpetAdapter = adapter(trumpetEndpoint)

export default class App extends Component {

  state = {
    page: "Login",
  }

  componentDidMount() {
    // Fetch all trumpets
    (async () => {
      const trumpetsFromApi = await trumpetAdapter.getAll();
      this.setState({trumpets: trumpetsFromApi}, () => console.table(this.state))
      this.setState({userId: 1})
    })();

    // Fetch user specific trumpets code here
  }

  createNewUser = (userInfo) => {
    const newUser = { userInfo }
    userAdapter.create(newUser.userInfo, this.handleNewUser)
    this.changePage("MyTrumpets")
  }

  handleNewUser = (newUser) => {
    this.setState({userId: newUser.id}, () => console.log("created user:", newUser))
  }


  // User submits login form
  handleLoginSubmit = () => {
    this.changePage("MyTrumpets")
  }

  // User submits signup form
  handleSignUpFormSubmit = () => {
    // TODO: Post new user to backend
    // const newUser = {}
    // userAdapter.create(newUser)
    this.changePage("MyTrumpets")
  }

  // User clicks sign up button from login page ("New to us? - Sign up")
  // User clicks log in button from sign up page ("Already have an account? - Log in")
  handleLoginOrSignUpButtonClick = () => {
    this.state.page === "Login" ? this.changePage("SignUp") : this.changePage("Login")
  }

  getUserTrumpets() {
    return this.state.trumpets === [] ? this.state.trumpets : this.state.trumpets.filter(trumpet => trumpet.user.id === this.state.userId)

  }

  changePage = (newPage) => {
    this.setState({
      page: newPage
    })
  }

  // TODO: Add in sign in and sign out page here
  renderPage = () => {
    switch(this.state.page){
      case "Login":
        return <Login handleFormChange={this.handleFormChange} handleLoginSubmit={this.handleLoginSubmit} handleLoginOrSignUpButtonClick={this.handleLoginOrSignUpButtonClick} />
      case "SignUp":
        return <SignUp handleFormChange={this.handleFormChange} handleLoginOrSignUpButtonClick={this.handleLoginOrSignUpButtonClick} createNewUser={this.createNewUser} />
      case "MyTrumpets":
        return <MyTrumpets trumpets={this.getUserTrumpets()} trumpetAdapter={trumpetAdapter} trumpetEndpoint={trumpetEndpoint}/>
      case "CommunityTrumpets":
        return <CommunityTrumpets trumpets={this.state.trumpets}/>
      case "TrumpetAnalytics":
        return <TrumpetAnalytics trumpets={this.state.trumpets}/>
      case "AccountSettings":
        return <AccountSettings />
      default:
        return null
    }
  }

  // render(){
  //   return (
  //     <div className="App">
  //       <Nav changePage={this.changePage} />
  //       {this.renderPage()}
  //     </div>
  //   );
  // }


  render() {

  return (
    <div className="App">
          <header>
          <Nav changePage={this.changePage} />
          </header>
          {this.renderPage()}

    </div>
  );
}
}
