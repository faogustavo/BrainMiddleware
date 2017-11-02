import _ from 'lodash';

export default class EEGData {
  constructor() {
    this.customAttributes = {};
  }

  newCycle(clearAttributes = null) {
    if (clearAttributes) {
      if (typeof clearAttributes === typeof []) {
        clearAttributes.forEach((key) => {
          delete this.customAttributes[key];
        });
      } else if (typeof clearAttributes === typeof {}) {
        Object.keys(clearAttributes).forEach((key) => {
          this.customAttributes[key] = clearAttributes[key];
        });
      }
    } else {
      this.customAttributes = {};
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

  format() {
    const initialState = {
      eeg: {},
      events: {},
    };

    const obj = _.cloneDeep(initialState);

    if (this._fp1) {
      obj.eeg.fp1 = this._fp1;
    }

    if (this._fp2) {
      obj.eeg.fp2 = this._fp2;
    }

    if (this._f3) {
      obj.eeg.f3 = this._f3;
    }

    if (this._f4) {
      obj.eeg.f4 = this._f4;
    }

    if (this._f7) {
      obj.eeg.f7 = this._f7;
    }

    if (this._f8) {
      obj.eeg.f8 = this._f8;
    }

    if (this._fz) {
      obj.eeg.fz = this._fz;
    }

    if (this._t3) {
      obj.eeg.t3 = this._t3;
    }

    if (this._t4) {
      obj.eeg.t4 = this._t4;
    }

    if (this._t5) {
      obj.eeg.t5 = this._t5;
    }

    if (this._t6) {
      obj.eeg.t6 = this._t6;
    }

    if (this._c3) {
      obj.eeg.c3 = this._c3;
    }

    if (this._c4) {
      obj.eeg.c4 = this._c4;
    }

    if (this._cz) {
      obj.eeg.cz = this._cz;
    }

    if (this._p3) {
      obj.eeg.p3 = this._p3;
    }

    if (this._p4) {
      obj.eeg.p4 = this._p4;
    }

    if (this._pz) {
      obj.eeg.pz = this._pz;
    }

    if (this._o1) {
      obj.eeg.o1 = this._o1;
    }

    if (this._o2) {
      obj.eeg.o2 = this._o2;
    }

    if (JSON.stringify(this.customAttributes) !== JSON.stringify({})) {
      obj.events = this.customAttributes;
    } else if (Object.keys(obj.eeg).length > 0) {
      delete obj.events;
    }

    if (JSON.stringify(obj) === JSON.stringify(initialState)) {
      return {
        status: 204,
        message: 'No data received',
      };
    }

    return obj;
  }

  filter({ delta, theta, lowAlpha, alpha, highAlpha, lowBeta, mediumBeta, highBeta, lowGamma, gamma, highGamma }) {
    if (
      delta ||
      theta ||
      lowAlpha ||
      alpha ||
      highAlpha ||
      lowBeta ||
      mediumBeta ||
      highBeta ||
      lowGamma ||
      gamma ||
      highGamma
    ) {
      const obj = {};

      if (delta) {
        obj.delta = delta;
      }

      if (theta) {
        obj.theta = theta;
      }

      if (lowAlpha) {
        obj.lowAlpha = lowAlpha;
      }

      if (alpha) {
        obj.alpha = alpha;
      }

      if (highAlpha) {
        obj.highAlpha = highAlpha;
      }

      if (lowBeta) {
        obj.lowBeta = lowBeta;
      }

      if (mediumBeta) {
        obj.mediumBeta = mediumBeta;
      }

      if (highBeta) {
        obj.highBeta = highBeta;
      }

      if (lowGamma) {
        obj.lowGamma = lowGamma;
      }

      if (gamma) {
        obj.gamma = gamma;
      }

      if (highGamma) {
        obj.highGamma = highGamma;
      }

      return obj;
    }

    return null;
  }

  set signalStrength(strength) {
    this._signalStrength = strength;
  }

  set fp1(data) {
    this._fp1 = this.filter(data);
  }

  set fp2(data) {
    this._fp2 = this.filter(data);
  }

  set f3(data) {
    this._f3 = this.filter(data);
  }

  set f4(data) {
    this._f4 = this.filter(data);
  }

  set f7(data) {
    this._f7 = this.filter(data);
  }

  set f8(data) {
    this._f8 = this.filter(data);
  }

  set fz(data) {
    this._fz = this.filter(data);
  }

  set c3(data) {
    this._c3 = this.filter(data);
  }

  set c4(data) {
    this._c4 = this.filter(data);
  }

  set cz(data) {
    this._cz = this.filter(data);
  }

  set p3(data) {
    this._p3 = this.filter(data);
  }

  set p4(data) {
    this._p4 = this.filter(data);
  }

  set pz(data) {
    this._pz = this.filter(data);
  }

  set t3(data) {
    this._t3 = this.filter(data);
  }

  set t4(data) {
    this._t4 = this.filter(data);
  }

  set t5(data) {
    this._t5 = this.filter(data);
  }

  set t6(data) {
    this._t6 = this.filter(data);
  }

  set o1(data) {
    this._o1 = this.filter(data);
  }

  set o2(data) {
    this._o2 = this.filter(data);
  }
}
