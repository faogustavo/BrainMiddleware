import p from './plugin';

export const info = {
  name: 'Mindwave diy',
  package: 'com.gustavofao.mindwave.diy',
  type: 2,
};

export const extraFields = [
  {
    text: 'Porta Serial',
    name: 'com_port',
    value: 'COM5',
  },
];

export const Plugin = p;
