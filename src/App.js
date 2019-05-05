import React, { Component } from 'react';
import Nav from './Components/Nav'
import MyTrumpets from './Containers/MyTrumpets'
import CommunityTrumpets from './Containers/CommunityTrumpets'
import TrumpetAnalytics from './Containers/TrumpetAnalytics'
import AccountSettings from './Containers/AccountSettings'
// import logo from './logo.svg';
import './App.css';
import adapter from './Adapter.js';
import Login from './Containers/Login'
import SignUp from './Containers/SignUp'

const userEndpoint = "http://localhost:3000/api/v1/users"
const trumpetEndpoint = "http://localhost:3000/api/v1/trumpets"
const reactionEndpoint = "http://localhost:3000/api/v1/reactions"
const userAdapter = adapter(userEndpoint)
const trumpetAdapter = adapter(trumpetEndpoint)
const reactionAdapter = adapter(reactionEndpoint)

export default class App extends Component {

  state = {
    page: "Login"
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

  // User clicks on a cheer or jeer button
  onReactionClick = (trumpetId, e) => {
    e.persist()
    let reactionType = e.target.innerText.toLowerCase().slice(1)
    let cheerClicked = reactionType === "cheer" || e.target.className === "thumbs up outline icon" || e.target.className === "ui left pointing basic label"
    let jeerClicked = reactionType === "jeer" || e.target.className === "thumbs down outline icon" || e.target.className === "ui right pointing basic label"

    let selectedTrumpet = this.state.trumpets.find(trumpet => trumpet.id === trumpetId)
    let userId = this.state.userId

    // TODO: replace hardcoded username
    let username = "donny"

    let existingCheer = selectedTrumpet.reactions.find(reaction => reaction.username === username && reaction.reaction_type === 'cheer')
    let existingJeer = selectedTrumpet.reactions.find(reaction => reaction.username === username && reaction.reaction_type === 'jeer')

    if (cheerClicked) {
      if (existingCheer && !existingJeer) {
        this.destroyReaction(existingCheer.id)
      } else if (!existingCheer && existingJeer) {
        this.destroyReaction(existingJeer.id)
        this.createNewReaction(userId, selectedTrumpet.id, "cheer")
      } else if (!existingCheer) {
        this.createNewReaction(userId, selectedTrumpet.id, "cheer")
      }
    } else if (jeerClicked) {
      if (existingJeer && !existingCheer) {
        this.destroyReaction(existingJeer.id)
      } else if (!existingJeer && existingCheer) {
        this.destroyReaction(existingCheer.id)
        this.createNewReaction(userId, selectedTrumpet.id, "jeer")
      } else if (!existingJeer) {
        this.createNewReaction(userId, selectedTrumpet.id, "jeer")
      }
    }
  }

  // POST request cheer/jeer
  createNewReaction = (user_id, trumpet_id, reaction_type) => {
    const newReaction = { user_id, trumpet_id, reaction_type }
    reactionAdapter.create(newReaction, this.handleNewReaction)
  }

  // DELETE request cheer/jeer
  destroyReaction = (reactionId) => {
    reactionAdapter.destroy(reactionId, this.handleOldReaction)
  }

  // Render cheer/jeer addition
  handleNewReaction = (newReaction) => {
    let selectedTrumpet = this.state.trumpets.find(trumpet => trumpet.id === newReaction.trumpet_id)
    let updatedTrumpet = {...selectedTrumpet, reactions: [...selectedTrumpet.reactions, newReaction]}

    let updatedTrumpets = this.state.trumpets.map(trumpet => {
      if (trumpet.id !== selectedTrumpet.id) {
        return trumpet
      } else {
        if (newReaction.reaction_type === 'cheer') {
          updatedTrumpet.cheers++
          return updatedTrumpet
        } else {
          updatedTrumpet.jeers++
          return updatedTrumpet
        }
      }
    })
    this.setState({trumpets: updatedTrumpets}, () => console.log("created reaction:", newReaction))
  }

  // Render cheer/jeer removal
  handleOldReaction = (oldReaction) => {
    let selectedTrumpet = this.state.trumpets.find(trumpet => trumpet.id === oldReaction.trumpet_id)
    let updatedReactions = selectedTrumpet.reactions.filter(reaction => reaction.id !== oldReaction.id)
    selectedTrumpet.reactions = updatedReactions

    let updatedTrumpets = this.state.trumpets.map(trumpet => {
      if (trumpet.id !== selectedTrumpet.id) {
        return trumpet
      } else {
        if (oldReaction.reaction_type === 'cheer') {
          selectedTrumpet.cheers--
          return selectedTrumpet
        } else {
          selectedTrumpet.jeers--
          return selectedTrumpet
        }
      }
    })
    this.setState({trumpets: updatedTrumpets}, () => console.log("destroyed reaction:", oldReaction))
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
        return <MyTrumpets trumpets={this.getUserTrumpets()} trumpetAdapter={trumpetAdapter} trumpetEndpoint={trumpetEndpoint} onReactionClick={this.onReactionClick}/>
      case "CommunityTrumpets":
        return <CommunityTrumpets trumpets={this.state.trumpets} onReactionClick={this.onReactionClick}/>
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
    )
  }
}
