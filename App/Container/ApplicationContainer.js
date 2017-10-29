import React from 'react';
import {
  Layout,
} from 'react-mdl';

import AppHeader from '../Component/AppHeader';
import HomeContent from './HomeContent';
import ReceiverDataTable from './ReceiverDataTable';
import SenderDataTable from './SenderDataTable';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.onTabChange = this.onTabChange.bind(this);

    this.state = {
      tabId: 0,
    };
  }

  onTabChange(newTabId) {
    this.setState({ tabId: newTabId });
  }

  _contentForTabIndex() {
    switch (this.state.tabId) {
      case 1:
        return (<ReceiverDataTable />);

      case 2:
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
            onTabChange={this.onTabChange}
          />
          {this._contentForTabIndex()}
        </Layout>
      </div>
    );
  }
}
