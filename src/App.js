import React, { Component } from 'react';
import { Route, Switch } from 'react-router'
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
    trumpets: []
  };

  getTrumpets = async () => {
    const trumpetsFromApi = await trumpetAdapter.getAll()
    const sortedTrumpetsFromApi = await trumpetsFromApi.sort((a, b) => -1 * a.created_at.localeCompare(b.created_at))
    this.setState({trumpets: sortedTrumpetsFromApi}, () => console.table("state set:", this.state))
  };

  componentDidMount() {
    this.getTrumpets()
  }

  renderNewTrumpet = (trumpet) => {
    this.setState({trumpets: [...this.state.trumpets, trumpet]})
  }

  renderEditedTrumpet = () => {
    console.log('hehe')
  }


  createNewUser = (userInfo) => {
    const newUser = { userInfo }
    userAdapter.create(newUser.userInfo, this.handleUser)
  }

  handleUser = (user) => {
    localStorage.setItem("user_id", user.id)
    this.setState({userId: user.id}, () => console.log("created user:", user.id))
    this.props.history.push({pathname: '/my-trumpets'})
  }

  handleLogout = (user) => {
    localStorage.removeItem("user_id")
    this.setState({userId: null})
    this.props.history.push({pathname: '/login'})
  }


  // User submits login form
  handleLoginSubmit = (e, userInfo) => {
    userAdapter.getAll(userInfo, this.handleUser)
    this.props.history.push({pathname: '/my-trumpets'})
  }

  // User submits signup form
  handleSignUpFormSubmit = () => {
    this.props.history.push({pathname: '/my-trumpets'})
  }

  // User clicks sign up button from login page ("New to us? - Sign up")
  // User clicks log in button from sign up page ("Already have an account? - Log in")
  handleLoginOrSignUpButtonClick = () => {
    this.props.location.pathname === '/login' || this.props.location.pathname === '/' ? this.props.history.push({pathname: '/signup'}) : this.props.history.push({pathname: '/login'})
  }

  // User clicks on a cheer or jeer button
  onReactionClick = (trumpetId, e) => {
    e.persist()
    let reactionType = e.target.innerText.toLowerCase().slice(1)
    let cheerClicked = reactionType === "cheer" || e.target.className === "thumbs up outline icon" || e.target.className === "ui left pointing basic label"
    let jeerClicked = reactionType === "jeer" || e.target.className === "thumbs down outline icon" || e.target.className === "ui right pointing basic label"

    let selectedTrumpet = this.state.trumpets.find(trumpet => trumpet.id === trumpetId)
    let userId = parseInt(localStorage.getItem("user_id"))

    let existingCheer = selectedTrumpet.reactions.find(reaction => reaction.user_id === userId && reaction.reaction_type === 'cheer')
    let existingJeer = selectedTrumpet.reactions.find(reaction => reaction.user_id === userId && reaction.reaction_type === 'jeer')

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
    return this.state.trumpets === [] ? this.state.trumpets : this.state.trumpets.filter(trumpet => trumpet.user.id === parseInt(localStorage.getItem("user_id")))
  }

  getUsersReactedTrumpets() {

    // Iterate through trumpets
    // Iterate through reactions
    // Return the trumpets with a reaction with user id === local storate
    return this.state.trumpets === [] ? this.state.trumpets : this.state.trumpets.filter(trumpet => trumpet.reactions.find(reaction => reaction.user_id === parseInt(localStorage.getItem("user_id"))))
  }

  render() {

    return (
      <div className="App">
        {localStorage.user_id ? <header><Nav handleLogout={this.handleLogout} /></header> : null }
        <Switch>
          <Route path='/login' render={(routeProps) => <Login {...routeProps} handleFormChange={this.handleFormChange} handleLoginSubmit={this.handleLoginSubmit} handleLoginOrSignUpButtonClick={this.handleLoginOrSignUpButtonClick}/>}/>
          <Route path='/signup' render={(routeProps) => <SignUp  {...routeProps} handleFormChange={this.handleFormChange} handleLoginOrSignUpButtonClick={this.handleLoginOrSignUpButtonClick} createNewUser={this.createNewUser}/>}/>
          <Route path='/my-trumpets' render={(props) => <MyTrumpets {...props} getTrumpets={this.getTrumpets} myTrumpets={this.getUserTrumpets()} myReactedTrumpets={this.getUsersReactedTrumpets()} trumpetAdapter={trumpetAdapter} trumpetEndpoint={trumpetEndpoint} user_id={this.state.user_id} onReactionClick={this.onReactionClick}/>}/>
          <Route path='/community-trumpets' render={(props) => <CommunityTrumpets {...props} trumpets={this.state.trumpets} onReactionClick={this.onReactionClick}/>}/>        
          <Route path='/account-settings' render={() =>  <AccountSettings />}/>
          <Route path='/' render={(routeProps) => <Login {...routeProps} handleFormChange={this.handleFormChange} handleLoginSubmit={this.handleLoginSubmit} handleLoginOrSignUpButtonClick={this.handleLoginOrSignUpButtonClick}/>}/>
        </Switch>
      </div>
    )
  }
}
