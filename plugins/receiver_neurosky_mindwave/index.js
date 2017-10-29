import p from './plugin';

export const info = {
  name: 'Mindwave Listener',
  package: 'com.gustavofao.mindwave',
  type: 2,
};

export const extraFields = [
  {
    text: 'Host',
    name: 'host',
    value: '127.0.0.1',
  },
  {
    text: 'Porta',
    name: 'port',
    pattern: '-?[0-9]*?',
    value: 13854,
    errorMessage: 'A porta deve ser do tipo numérico',
  },
];

export const Plugin = p;
