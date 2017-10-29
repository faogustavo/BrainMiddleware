import p from './plugin';

export const info = {
  name: 'Socket TCP',
  package: 'com.gustavofao.tcp',
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
];

export const Plugin = p;
