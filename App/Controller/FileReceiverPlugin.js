import fs from 'fs';

export default class FileReceiverPlugin {
  constructor(eegController) {
    this.eegController = eegController;
    this.started = false;
    this.currentIndex = 0;
  }

  start({ fileName }) {
    return new Promise((resolve, reject) => {
      if (this.started) {
        resolve();
      }

      this.started = true;

      console.log('Read', fileName);
      fs.readFile(fileName, (err, data) => {
        if (err) {
          reject(err);
        }

        this.json = JSON.parse(String(data));
        resolve();

        this._start();
      });
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      this.started = false;
      this.currentIndex = 0;
      resolve();
    });
  }

  _start() {
    return new Promise((resolve, reject) => {
      const item = this.json[this.currentIndex++ % this.json.length];
      setTimeout(() => {
        if (!this.started) {
          return reject();
        }

        this.eegController[item.method](...item.args);
        resolve();
      }, item.delay);
    })
      .then(() => {
        this._start();
      })
      .catch(() => {
        console.log('Rejected');
      });
  }
}
