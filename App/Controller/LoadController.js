import _ from 'lodash';

const pluginsFile = require('../../plugins/info.json');

export default () => _.compact(
  pluginsFile.map((item) => {
    try {
      return require(`../../plugins/${item}`);
    } catch (e) {
      console.log('Failed to load', item);
      return null;
    }
  }));
