import p from './plugin';

export const info = {
  name: 'Socket IO',
  package: 'com.gustavofao.io.socket',
  type: 1,
};

export const extraFields = [
  {
    text: 'Porta',
    name: 'port',
    pattern: '-?[0-9]*?',
    value: 7895,
    errorMessage: 'A porta deve ser do tipo numérico',
  },
  {
    text: 'Path',
    name: 'path',
    value: '/',
  },
];

export const Plugin = p;
