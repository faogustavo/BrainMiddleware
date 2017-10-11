import * as Types from './Types';

export const add = () => ({
  type: Types.ADD,
});

export const subtract = () => ({
  type: Types.SUBTRACT,
});

export const handlers = {
  activate: pkg => ({
    type: Types.HANDLER_ACTIVATE,
    payload: pkg,
  }),
  deactivate: pkg => ({
    type: Types.HANDLER_DEACTIVATE,
    payload: pkg,
  }),
};

export const receivers = {
  activate: pkg => ({
    type: Types.RECEIVER_ACTIVATE,
    payload: pkg,
  }),
  deactivate: () => ({
    type: Types.RECEIVER_DEACTIVATE,
  }),
};
