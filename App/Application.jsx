import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserWindow } from 'electron';
import {
  Layout,
  Header,
  Content,
  Menu,
  MenuItem,
  IconButton,
  HeaderRow,
  HeaderTabs,
  Tab,
  Switch,
} from 'react-mdl';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devMode: false,
    };
  }

  render() {
    return (
      <div>
        <Layout fixedHeader fixedTabs>
          <Header>
            <HeaderRow title="Brain Middleware">
              <div style={{ position: 'relative' }}>
                <IconButton name="more_vert" id="mainMenu" ripple />
                <Menu target="mainMenu" align="right" ripple>
                  <MenuItem>Import plugin</MenuItem>
                  <MenuItem
                    onClick={() => {
                      this.setState({ devMode: !this.state.devMode });
                    }}
                  >
                    Dev Mode
                    <Switch
                      id="switch2"
                      checked={this.state.devMode}
                      onChange={(event) => {
                        this.setState({ devMode: !event.target.checked });
                      }}
                    />
                  </MenuItem>
                  <MenuItem>Dev Tools</MenuItem>
                  <MenuItem>About</MenuItem>
                </Menu>
              </div>
            </HeaderRow>
            <HeaderTabs ripple onChange={(tabId) => {}}>
              <Tab>Home</Tab>
              <Tab>Receivers</Tab>
              <Tab>Handlers</Tab>
              <Tab>Senders</Tab>
            </HeaderTabs>
          </Header>
          <Content />
        </Layout>
      </div>
    );
  }
}

window.onload = () => {
  ReactDOM.render(<Application />, document.getElementById('root'));
};
