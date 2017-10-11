import _ from 'lodash';

import createReducer from './createReducer';
import * as Types from './Types';

const mocked_data = require('../../mocked_data/data.json');

const initialState = {
  value: 0,
  app: {
    running: false,
    dev: false,
  },
  handlers: {
    activePlugins: [], // Strings
    plugins: mocked_data.handlers, // Objects
  },
  receivers: {
    activePlugin: '', // String
    plugins: mocked_data.receivers,
  },
  senders: {},
};

export default createReducer(initialState, {
  [Types.HANDLER_ACTIVATE](state, action) {
    const newState = _.cloneDeep(state);

    // Adiciona no array
    newState.handlers.activePlugins.push(action.payload);
    // e remove se há duplicados
    _.uniq(newState.handlers.activePlugins);

    return newState;
  },
  [Types.HANDLER_DEACTIVATE](state, action) {
    const newState = _.cloneDeep(state);

    // Remove o item selecionado
    _.remove(newState.handlers.activePlugins, item => item === action.payload);

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
