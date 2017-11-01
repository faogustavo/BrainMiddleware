import p from './plugin';

export const info = {
  name: 'Socket UDP',
  package: 'com.gustavofao.udp',
  type: 1,
};

export const extraFields = [
  {
    text: 'Receptor',
    name: 'receiver',
    value: '127.0.0.1',
  },
  {
    text: 'Porta',
    name: 'port',
    pattern: '-?[0-9]*?',
    value: 41235,
    errorMessage: 'A porta deve ser do tipo numérico',
  },
];

export const Plugin = p;
