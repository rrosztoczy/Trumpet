import React, { Component } from 'react';
import Nav from './Components/Nav'
import MyTrumpets from './Containers/MyTrumpets'
import CommunityTrumpets from './Containers/CommunityTrumpets'
import TrumpetAnalytics from './Containers/TrumpetAnalytics'
import AccountSettings from './Containers/AccountSettings'
import logo from './logo.svg';
import './App.css';
import adapter from './Adapter.js';

const userEndpoint = ""
const trumpetEndpoint = "http://localhost:3000/api/v1/trumpets"
const userAdapter = adapter(userEndpoint)
const trumpetAdapter = adapter(trumpetEndpoint)

export default class App extends Component {

  state = {
    page: "MyTrumpets",
    // TODO: Set this based on logged in user eventually
    userId: "",
    trumpets: []
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
      case "MyTrumpets":
        return <MyTrumpets trumpets={this.getUserTrumpets()}/>
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
