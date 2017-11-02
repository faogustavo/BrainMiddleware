import _ from 'lodash';

import EEGData from '../Models/EEGData';
import * as types from '../Redux/Types';

export default class ApplicationController {
  constructor(store) {
    this.data = new EEGData();

    this.getState = () => store.getState();
    this.currentState = store.getState();
    this.dispatch = store.dispatch;

    store.subscribe(this._onStoreChanged.bind(this));
  }

  reset(keepCustomFields) {
    this.data.newCycle(keepCustomFields);
    return this;
  }

  on(point, data) {
    switch (point) {
      case 'fp1':
        this.data.fp1 = data;
        break;

      case 'fp2':
        this.data.fp2 = data;
        break;

      case 'f3':
        this.data.f3 = data;
        break;

      case 'f4':
        this.data.f4 = data;
        break;

      case 'f7':
        this.data.f7 = data;
        break;

      case 'f8':
        this.data.f8 = data;
        break;

      case 'fz':
        this.data.fz = data;
        break;

      case 'c3':
        this.data.c3 = data;
        break;

      case 'c4':
        this.data.c4 = data;
        break;

      case 'cz':
        this.data.c8 = data;
        break;

      case 'p3':
        this.data.p3 = data;
        break;

      case 'p4':
        this.data.p4 = data;
        break;

      case 'pz':
        this.data.pz = data;
        break;

      case 't3':
        this.data.t3 = data;
        break;

      case 't4':
        this.data.t4 = data;
        break;

      case 't5':
        this.data.t5 = data;
        break;

      case 't6':
        this.data.t6 = data;
        break;

      case 'o1':
        this.data.o1 = data;
        break;

      case 'o2':
        this.data.o2 = data;
        break;

      default:
        break;
    }

    return this;
  }

  with(customData) {
    Object.keys(customData).forEach((key) => {
      this.data.customAttribute(key, customData[key]);
    });

    return this;
  }

  flush(autoReset = false) {
    this.senderPlugin.send(this.data.format())
      .then(() => {
        if (autoReset) {
          this.reset();
        }
      })
      .catch((error) => {
        console.log('FlushError', error);
        if (autoReset) {
          this.reset();
        }
      });
  }

  _onStoreChanged() {
    const state = this.getState();

    const startEvent = state.app.toStart && !state.app.running && !this.currentState.app.running;
    if (startEvent) {
      this._start();
    }

    const stopEvent = !state.app.running && this.currentState.app.running;
    if (stopEvent) {
      this._stop();
    }

    this.currentState = state;
  }

  _start() {
    const state = this.getState();
    const senderPluginName = state.senders.activePlugin;
    const receiverPluginName = state.receivers.activePlugin;

    const senderPluginRef = _.find(state.senders.plugins, item => item.info.package === senderPluginName);
    const receiverPluginRef = _.find(state.receivers.plugins, item => item.info.package === receiverPluginName);

    const senderParams = {};
    const receiverParams = {};

    senderPluginRef.extraFields.forEach((item) => {
      senderParams[item.name] = item.value;
    });

    receiverPluginRef.extraFields.forEach((item) => {
      receiverParams[item.name] = item.value;
    });


    const SenderPlugin = senderPluginRef.Plugin;
    const ReceiverPlugin = receiverPluginRef.Plugin;

    this.senderPlugin = new SenderPlugin();
    this.receiverPlugin = new ReceiverPlugin(this);

    this.receiverPlugin.start(receiverParams)
      .then(() => this.senderPlugin.start(senderParams))
      .then(() => {
        this.dispatch({
          type: types.STARTED_APP,
        });
      })
      .catch((error) => {
        this.receiverPlugin.stop()
          .then(() => this.senderPlugin.stop())
          .then(() => {
            console.log('Erro ao iniciar', error);
            this.dispatch({
              type: types.START_ERROR,
              payload: error.message,
            });
          })
          .catch(() => {
            console.log('Erro ao iniciar', error);
            this.dispatch({
              type: types.START_ERROR,
              payload: error.message,
            });
          });
      });
  }

  _stop() {
    this.receiverPlugin.stop()
      .then(() => this.senderPlugin.stop())
      .then(() => {
        console.log('Stopped');
      })
      .catch(console.log);
  }
}
