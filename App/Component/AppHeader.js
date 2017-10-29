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

import { ipcRenderer } from 'electron';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { devMode } from '../Redux/Actions';

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
            </Menu>
          </div>
        </HeaderRow>
        <HeaderTabs ripple onChange={this.props.onTabChange}>
          <Tab>Home</Tab>
          <Tab>Receivers</Tab>
          {/* <Tab>Handlers</Tab> */}
          <Tab>Senders</Tab>
        </HeaderTabs>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  devMode: state.app.dev,
});

const mapDispatchToProps = dispatch => bindActionCreators({ onChangeDevMode: devMode }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
