import React, { Component } from 'react';
import Nav from './Components/Nav'
import MyTrumpets from './Containers/MyTrumpets'
import CommunityTrumpets from './Containers/CommunityTrumpets'
import TrumpetAnalytics from './Containers/TrumpetAnalytics'
import AccountSettings from './Containers/AccountSettings'
import logo from './logo.svg';
import './App.css';

export default class App extends Component {

  state = {
    page: "MyTrumpets"
  }

  changePage = (newPage) => {
    this.setState({
      page: newPage
    })
  }


  renderPage = () => {
    switch(this.state.page){
      case "MyTrumpets":
        return <MyTrumpets trumpets={null}/>
      case "CommunityTrumpets":
        return <CommunityTrumpets trumpets={null}/>
      case "TrumpetAnalytics":
        return <TrumpetAnalytics />
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
