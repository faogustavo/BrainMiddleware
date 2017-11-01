import dgram from 'dgram';

export default class UdpSender {
  constructor() {
    this.connector = dgram.createSocket('udp4');
  }

  start({ receiver, port }) {
    return new Promise((resolve, reject) => {
      this.flushMessage = true;
      this.receiver = receiver;
      this.port = port;
      resolve();
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      this.flushMessage = false;
      this.connector.close();
      resolve();
    });
  }

  send(message) {
    console.log('UDP', 'Send', 'Invoked');
    return new Promise((resolve, reject) => {
      if (this.flushMessage) {
        const buffer = Buffer.from(JSON.stringify(message.format()));
        this.connector.send(buffer, this.port, this.receiver, (error) => {
          console.log('Flushed', message.format());
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } else {
        console.log('Did not flushed', 'No connection', message.format());
        resolve();
      }
    });
  }
}
