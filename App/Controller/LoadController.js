import _ from 'lodash';
import fs from 'fs';

export default () => _.compact(
  fs.readdirSync(`${process.cwd()}/plugins`).map((item) => {
    try {
      return require(`../../plugins/${item}`);
    } catch (e) {
      console.log('Failed to load', item, e);
      return null;
    }
  }));
