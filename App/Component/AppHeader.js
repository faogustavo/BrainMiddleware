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

import _ from 'lodash';
import fs from 'fs';
import DecompressZip from 'decompress-zip';

import { ipcRenderer, remote } from 'electron';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { devMode } from '../Redux/Actions';

class AppHeader extends React.Component {
  onInstallPlugin() {
    remote.dialog.showOpenDialog({
      title: 'Selecione seu plugin',
      buttonLabel: 'Selecionar',
      filters: [
        { name: 'Zip', extensions: ['zip'] },
      ],
      properties: [
        'openfile',
      ],
    }, (chooseFile) => {
      if (chooseFile) {
        const unZipper = new DecompressZip(chooseFile[0]);

        unZipper.on('extract', (log) => {
          remote.app.relaunch({});
          remote.app.exit(0);
        });

        unZipper.extract({
          path: `${process.cwd()}/plugins`,
        });
      }
    });
  }

  render() {
    return (
      <Header>
        <HeaderRow title="Brain Middleware">
          <div style={{ position: 'relative' }}>
            <IconButton name="more_vert" id="mainMenu" ripple />
            <Menu target="mainMenu" align="right" ripple>
              <MenuItem onClick={() => this.onInstallPlugin()}>Import plugin</MenuItem>
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
