import http from 'http';
import socket from 'socket.io';

export default class TcpSender {
  constructor() {
    this.app = http.createServer((req, res) => {
      res.end({ status: 'OK' });
    });
    this.io = socket(this.app);
  }

  start({ port }) {
    return new Promise((resolve, reject) => {
      this.app.listen(port);
      this.io.on('connection', (socket) => {
        if (this.socket) {
          this.socket.removeAllListeners();
          this.socket.disconnect();
        }

        this.socket = socket;
        this.socket.on('disconnect', () => {
          this.socket = null;
        });
      });
      resolve();
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      this.app.close();
      resolve();
    });
  }

  send(message) {
    return new Promise((resolve, reject) => {
      if (this.socket && !this.socket.disconnected) {
        console.log('Flushed', message);
        this.socket.emit('eeg', message);
      } else {
        console.log('Did not flushed', 'No connection', message);
      }
      resolve();
    });
  }
}
