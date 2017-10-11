import React from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Menu,
  MenuItem,
  IconButton,
  HeaderRow,
  HeaderTabs,
  Tab,
  Switch,
} from 'react-mdl';

class AppHeader extends React.Component {
  render() {
    return (
      <Header>
        <HeaderRow title="Brain Middleware">
          <div style={{ position: 'relative' }}>
            <IconButton name="more_vert" id="mainMenu" ripple />
            <Menu target="mainMenu" align="right" ripple>
              <MenuItem>Import plugin</MenuItem>
              <MenuItem
                onClick={this.props.onChangeDevMode}
              >
      Dev Mode
                <Switch
                  id="switch2"
                  checked={this.props.devMode}
                  onChange={this.props.onChangeDevMode}
                />
              </MenuItem>
              <MenuItem>Dev Tools</MenuItem>
              <MenuItem>About</MenuItem>
            </Menu>
          </div>
        </HeaderRow>
        <HeaderTabs ripple onChange={this.props.onTabChange}>
          <Tab>Home</Tab>
          <Tab>Receivers</Tab>
          <Tab>Handlers</Tab>
          <Tab>Senders</Tab>
        </HeaderTabs>
      </Header>
    );
  }
}

export default AppHeader;
