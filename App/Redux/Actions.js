import * as Types from './Types';

export const add = () => ({
  type: Types.ADD,
});

export const subtract = () => ({
  type: Types.SUBTRACT,
});

export const start = () => ({
  type: Types.START_APP,
});

export const stop = () => ({
  type: Types.STOP_APP,
});

export const devMode = () => ({
  type: Types.DEV_MODE,
});

export const errorShown = () => ({
  type: Types.START_ERROR_SHOWN,
});

export const setPluginValue = (pkg, name, value, sender) => ({
  type: Types.SET_PLUGIN_VALUE,
  payload: {
    pkg, name, value, sender,
  },
});

export const receivers = {
  activate: pkg => ({
    type: Types.RECEIVER_ACTIVATE,
    payload: pkg,
  }),
  deactivate: () => ({
    type: Types.RECEIVER_DEACTIVATE,
  }),
};

export const senders = {
  activate: pkg => ({
    type: Types.SENDER_ACTIVATE,
    payload: pkg,
  }),
  deactivate: pkg => ({
    type: Types.SENDER_DEACTIVATE,
    payload: pkg,
  }),
};
