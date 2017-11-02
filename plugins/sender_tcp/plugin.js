import net from 'net';

export default class TcpSender {
  constructor() {
    this.connector = net.createServer((socket) => {
      if (this.socket) {
        this.socket.destroy();
      }

      this.socket = socket;
      this.socket.on('close', () => {
        this.socket = null;
      });
    });
  }

  start({ port }) {
    return new Promise((resolve, reject) => {
      this.connector.listen({ port }, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      this.connector.close();
      this.connector.removeAllListeners();
      resolve();
    });
  }

  send(message) {
    return new Promise((resolve, reject) => {
      if (this.socket && !this.socket.destroyed) {
        this.socket.write(JSON.stringify(message), (error) => {
          console.log('Flushed', message);
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } else {
        console.log('Did not flushed', 'No connection', message);
        resolve();
      }
    });
  }
}
