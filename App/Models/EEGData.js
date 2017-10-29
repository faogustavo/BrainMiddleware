class EEGPointData {
  construct({ delta, theta, alfa, lowBeta, mediumBeta, highBeta }) {
    this.delta = delta;
    this.theta = theta;
    this.alfa = alfa;
    this.lowBeta = lowBeta;
    this.mediumBeta = mediumBeta;
    this.highBeta = highBeta;
  }
}

export default class EEGData {
  constructor() {
    this.customAttributes = {};
  }

  newCycle(clearAttributes = null) {
    if (clearAttributes) {
      if (typeof clearAttributes === typeof []) {
        clearAttributes.forEach((key) => {
          delete this.customAttribute[key];
        });
      } else if (typeof clearAttributes === typeof {}) {
        Object.keys(clearAttributes).forEach((key) => {
          this.customAttribute[key] = clearAttributes[key];
        });
      }
    } else {
      this.customAttribute = {};
    }

    this._fp2 = null;
    this._fp1 = null;
    this._f3 = null;
    this._f4 = null;
    this._f7 = null;
    this._f8 = null;
    this._fz = null;
    this._t3 = null;
    this._t4 = null;
    this._t5 = null;
    this._t6 = null;
    this._c3 = null;
    this._c4 = null;
    this._cz = null;
    this._p3 = null;
    this._p4 = null;
    this._pz = null;
    this._o1 = null;
    this._o2 = null;
    return this;
  }

  customAttribute(name, value = true) {
    this.customAttributes[name] = value;
  }

  set signalStrength(strength) {
    this._signalStrength = strength;
  }

  set fp1(data) {
    this._fp1 = new EEGPointData(data);
  }

  set fp2(data) {
    this._fp2 = new EEGPointData(data);
  }

  set f3(data) {
    this._f3 = new EEGPointData(data);
  }

  set f4(data) {
    this._f4 = new EEGPointData(data);
  }

  set f7(data) {
    this._f7 = new EEGPointData(data);
  }

  set f8(data) {
    this._f8 = new EEGPointData(data);
  }

  set fz(data) {
    this._fz = new EEGPointData(data);
  }

  set c3(data) {
    this._c3 = new EEGPointData(data);
  }

  set c4(data) {
    this._c4 = new EEGPointData(data);
  }

  set cz(data) {
    this._cz = new EEGPointData(data);
  }

  set p3(data) {
    this._p3 = new EEGPointData(data);
  }

  set p4(data) {
    this._p4 = new EEGPointData(data);
  }

  set pz(data) {
    this._pz = new EEGPointData(data);
  }

  set t3(data) {
    this._t3 = new EEGPointData(data);
  }

  set t4(data) {
    this._t4 = new EEGPointData(data);
  }

  set t5(data) {
    this._t5 = new EEGPointData(data);
  }

  set t6(data) {
    this._t6 = new EEGPointData(data);
  }

  set o1(data) {
    this._o1 = new EEGPointData(data);
  }

  set o2(data) {
    this._o2 = new EEGPointData(data);
  }
}
