import React from 'react';
import {
  Content,
  Button,
  Textfield,
  Snackbar,
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
} from 'react-mdl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import { setPluginValue, start } from '../Redux/Actions';

class HomeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: false,
      toastMessage: 'Selecione um receiver antes',
    };
  }

  _renderFields() {
    return (
      <div>
        {this._renderFieldsFrom(false)}
        {this._renderFieldsFrom(true)}
      </div>
    );
  }

  _renderFieldsFrom(sender) {
    const plugin = sender ? this.props.senderPlugin : this.props.receiverPlugin;
    if (!plugin) {
      return null;
    }

    if (plugin.extraFields.length === 0) {
      return null;
    }

    const pkg = plugin.info.package;

    return (
      <div>
        <h6>Parâmetros do plugin <b>{plugin.info.name}</b></h6>
        {plugin.extraFields.map(field => this._generateFieldForObject(field, pkg, sender))}
      </div>
    );
  }

  _generateFieldForObject(obj, pkg, sender) {
    return (
      <Textfield
        onChange={event => this.props.setPluginValue(pkg, obj.name, event.target.value, sender)}
        key={obj.name}
        label={obj.text}
        value={obj.value}
        pattern={obj.pattern}
        error={obj.errorMessage}
        style={{ width: '100%' }}
        floatingLabel
      />
    );
  }

  _status() {
    if (this.props.running) {
      return (
        <span style={{ color: 'green' }}>Funcionando</span>
      );
    }

    return (
      <span style={{ color: 'red' }}>Parado</span>
    );
  }

  _devMode() {
    if (this.props.devMode) {
      return (
        <div>
          <h4>Gravações</h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {this._recordButton()}
            {this._reproduceButton()}
          </div>
        </div>
      );
    }

    return null;
  }

  _recordButton() {
    if (this.props.recording) {
      return (
        <Button
          style={{ width: '33%', marginRight: 8 }}
          onClick={() => { }}
          ripple
          raised
          accent
        >
          Parar
        </Button>
      );
    }

    return (
      <Button
        style={{ width: '33%', marginRight: 8 }}
        onClick={() => { }}
        disabled={this.props.recording || this.props.reproducing || !this.props.running}
        ripple
        raised
        primary
      >
        Gravar
      </Button>
    );
  }

  _reproduceButton() {
    if (this.props.reproducing) {
      return (
        <Button
          style={{ width: '33%', marginRight: 8 }}
          onClick={() => { }}
          ripple
          raised
          accent
        >
          Parar
        </Button>
      );
    }

    return (
      <Button
        style={{ width: '33%', marginLeft: 8 }}
        onClick={() => { }}
        disabled={this.props.recording || this.props.reproducing || !this.props.running}
        ripple
        raised
        primary
      >
        Reproduzir
      </Button>
    );
  }

  _startService() {
    if (!this.props.receiverPlugin) {
      this.setState({ toast: true, toastMessage: 'Selecione um receiver' });
      return;
    }

    if (!this.props.senderPlugin) {
      this.setState({ toast: true, toastMessage: 'Selecione um sender' });
      return;
    }

    this.setState({ toast: true, toastMessage: 'Iniciando o serviço' });
    this.props.start();
  }

  render() {
    return (
      <Content style={{ margin: 'auto', height: 'auto', width: '90%' }}>
        <h4>Aplicação</h4>
        <List>
          <ListItem>
            <ListItemContent>
              Status do serviço:
            </ListItemContent>
            <ListItemAction>
              {this._status()}
            </ListItemAction>
          </ListItem>
          <ListItem>
            <ListItemContent>
              {this._renderFields()}
            </ListItemContent>
          </ListItem>
        </List>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{ width: '33%', marginRight: 8 }}
            onClick={() => this._startService()}
            disabled={this.props.running}
            ripple
            raised
            primary
          >
            Iniciar
          </Button>
          <Button
            style={{ width: '33%', marginLeft: 8 }}
            onClick={() => this.props.start()}
            disabled={!this.props.running}
            ripple
            raised
            accent
          >
            Parar
          </Button>
        </div>
        {this._devMode()}
        <br /><br />
        <Snackbar
          active={this.state.toast}
          onTimeout={() => this.setState({ toast: false })}
        >
          {this.state.toastMessage}
        </Snackbar>
      </Content >
    );
  }
}

const mapStateToProps = state => ({
  running: state.app.running,
  devMode: state.app.dev,
  recording: state.record.recording,
  reproducing: state.record.reproducing,
  senderPlugin: _.find(
    state.senders.plugins, item =>
      item.info.package === state.senders.activePlugin
  ),
  receiverPlugin: _.find(
    state.receivers.plugins, item =>
      item.info.package === state.receivers.activePlugin
  ),
});
const mapDispatchToProps = dispatch => bindActionCreators({ start, setPluginValue }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
