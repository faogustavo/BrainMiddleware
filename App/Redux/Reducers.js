import _ from 'lodash';

import createReducer from './createReducer';
import * as Types from './Types';

const initialState = {
  value: 0,
  app: {
    running: false,
    dev: false,
  },
  record: {
    recording: false,
    reproducing: false,
    reproducingSequence: null,
  },
  receivers: {
    activePlugin: '', // String
    plugins: [],
  },
  senders: {
    activePlugin: '', // String
    plugins: [],
  },
};

export default createReducer(initialState, {
  [Types.START_APP](state, action) {
    const newState = _.cloneDeep(state);
    newState.app.running = !newState.app.running;
    return newState;
  },
  [Types.DEV_MODE](state, action) {
    const newState = _.cloneDeep(state);
    newState.app.dev = !newState.app.dev;
    return newState;
  },
  [Types.SET_PLUGIN_VALUE](state, action) {
    const newState = _.cloneDeep(state);

    const { pkg, name, value, sender } = action.payload;

    const pluginList = (sender ? newState.senders : newState.receivers).plugins;
    const fieldsList = _.find(pluginList, plugin => plugin.info.package === pkg);
    if (!fieldsList) {
      return state;
    }

    const editField = _.find(fieldsList.extraFields, field => field.name === name);
    if (!editField) {
      return state;
    }

    editField.value = value;
    return newState;
  },
  [Types.ADD_PLUGIN](state, action) {
    const newState = _.cloneDeep(state);

    const payload = action.payload;
    if (payload.info && payload.Plugin) {
      if (!payload.extraFields) {
        payload.extraFields = [];
      }
      const { info } = payload;
      switch (info.type) {
        case 1: // Sender
          newState.senders.plugins.push(payload);
          break;

        case 2:
          newState.receivers.plugins.push(payload);
          break;

        default:
          break;
      }
    }

    return newState;
  },
  [Types.RECEIVER_ACTIVATE](state, action) {
    const newState = _.cloneDeep(state);
    newState.receivers.activePlugin = action.payload;
    return newState;
  },
  [Types.RECEIVER_DEACTIVATE](state, action) {
    const newState = _.cloneDeep(state);
    newState.receivers.activePlugin = '';
    return newState;
  },
  [Types.SENDER_ACTIVATE](state, action) {
    const newState = _.cloneDeep(state);
    newState.senders.activePlugin = action.payload;
    return newState;
  },
  [Types.SENDER_DEACTIVATE](state, action) {
    const newState = _.cloneDeep(state);
    newState.senders.activePlugin = '';
    return newState;
  },
  [Types.ADD](state, action) {
    const newState = Object.assign({}, state);
    newState.value += 1;
    return newState;
  },
  [Types.SUBTRACT](state, action) {
    const newState = Object.assign({}, state);
    newState.value -= 1;
    return newState;
  },
});
