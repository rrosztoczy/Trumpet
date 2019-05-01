import React from 'react'

const Nav = (props) => (
  <div className="navbar">
    <button onClick={() => props.changePage("MyTrumpets")} >My Trumpets</button>
    <button onClick={() => props.changePage("CommunityTrumpets")}>Community Trumpets</button>
    <button onClick={() => props.changePage("TrumpetAnalytics")}>Trumpet Analytics</button>
    <button onClick={() => props.changePage("AccountSettings")}>Account Settings</button>
  </div>
)


export default Nav