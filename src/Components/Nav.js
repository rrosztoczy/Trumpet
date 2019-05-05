import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class Nav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
      this.props.changePage(name)
      this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='MyTrumpets' active={activeItem === 'MyTrumpets'} onClick={this.handleItemClick} />
          <Menu.Item
            name='CommunityTrumpets'
            active={activeItem === 'CommunityTrumpets'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='TrumpetAnalytics'
            active={activeItem === 'TrumpetAnalytics'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='AccountSettings'
              active={activeItem === 'AccountSettings'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
