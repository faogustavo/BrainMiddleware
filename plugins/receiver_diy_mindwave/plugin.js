import SerialPort from 'serialport';
import _ from 'lodash';

export default class TcpSender {
  constructor(eegController) {
    this.eegController = eegController;
    this.data = '';
  }

  start({ com_port }) {
    console.log('Starting at', com_port);
    return new Promise((resolve, reject) => {
      this.serial = new SerialPort(com_port, {
        baudRate: 57600,
      });
      this.serial.on('open', () => {
        console.log('Starting at', 'success');
        resolve();
        this.serial.on('data', (data) => {
          const readed = new Buffer(data).toString();
          this.data += readed;

          while (this.data.split('<br>').length > 0) {
            const split = this.data.split('<br>');
            const row = split.shift();
            this.data = split.join('<br>');
            console.log('row', row);
          }

          console.log(this.data);
        });
      });
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      this.serial.close();
      resolve();
    });
  }
}
