import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Layout,
} from 'react-mdl';

import store from './Redux/store.js';

import AppHeader from './Component/AppHeader';
import HomeContent from './Component/HomeContent';
import HandlerDataTable from './Component/HandlerDataTable';
import ReceiverDataTable from './Component/ReceiverDataTable';
import SenderDataTable from './Component/SenderDataTable';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeDevMode = this.onChangeDevMode.bind(this);
    this.onTabChange = this.onTabChange.bind(this);

    this.state = {
      devMode: false,
      tabId: 0,
    };
  }

  onTabChange(newTabId) {
    this.setState({ tabId: newTabId });
  }

  onChangeDevMode() {
    this.setState({ devMode: !this.state.devMode });
  }

  _contentForTabIndex() {
    switch (this.state.tabId) {
      case 1:
        return (<ReceiverDataTable />);

      case 2:
        return (<HandlerDataTable />);

      case 3:
        return (<SenderDataTable />);

      default:
        return (<HomeContent />);
    }
  }

  render() {
    return (
      <div>
        <Layout fixedHeader fixedTabs>
          <AppHeader
            devMode={this.state.devMode}
            onChangeDevMode={this.onChangeDevMode}
            onTabChange={this.onTabChange}
          />
          {this._contentForTabIndex()}
        </Layout>
      </div>
    );
  }
}

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Application />
    </Provider>,
    document.getElementById('root'),
  );
};
