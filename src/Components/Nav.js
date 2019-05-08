import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class Nav extends Component {

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  state = { activeItem: 'login' }

  render() {
  const { activeItem } = this.state

  return (
      <div>
        <Menu pointing secondary>
          <Menu.Item as={NavLink} name='my trumpets' to='/my-trumpets' active={activeItem === 'my trumpets'} onClick={this.handleItemClick} />
          <Menu.Item as={NavLink} name='community trumpets' to='/community-trumpets' active={activeItem === 'community trumpets'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
          <Menu.Item as={NavLink} name='account settings' to='/account-settings' active={activeItem === 'account settings'} onClick={this.handleItemClick} />
          <Menu.Item            
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.props.handleLogout} 
            />
          </Menu.Menu>
        </Menu>
      </div>
)
}
}

