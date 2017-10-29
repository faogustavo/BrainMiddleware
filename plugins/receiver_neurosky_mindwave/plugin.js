import net from 'net';

export default class TcpSender {
  constructor(eegController) {
    this.eegController = eegController;
    this.connector = new net.Socket();

    this._onDataReceived = this._onDataReceived.bind(this);
  }

  start({ host, port }) {
    return new Promise((resolve, reject) => {
      this.connector.connect(port, host, (err) => {
        if (err) {
          reject(err);
        } else {
          this._configure(resolve, reject);
        }
      });
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      this.connector.destroy();
      this.connector.removeAllListeners();
      resolve();
    });
  }

  _configure(resolve, reject) {
    this.connector.write(JSON.stringify({
      enableRawOutput: false,
      format: 'Json',
    }), () => {
      this._setListeners();
      resolve();
    });
  }

  _setListeners() {
    this.connector.on('data', this._onDataReceived);
  }

  _onDataReceived(data) {
    try {
      const json = JSON.parse(String(data));

      const fp1 = json.eegPower;
      const extraParams = {
        meditation: json.eSense.meditation,
        attention: json.eSense.attention,
      };

      this.eegController.reset()
        .on('fp1', fp1)
        .with(extraParams)
        .flush();
    } catch (exception) {
      console.log(exception.message);
    }
  }
}
