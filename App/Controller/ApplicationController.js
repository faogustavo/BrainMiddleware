import EEGData from '../Models/EEGData';

export default class ApplicationController {
  constructor() {
    this.data = new EEGData();
  }

  reset(keepCustomFields) {
    this.data.newCycle(keepCustomFields);
    return this;
  }

  on(point, data) {
    switch (point) {
      case 'fp1':
        this.data.fp1 = data;
        break;

      case 'fp2':
        this.data.fp2 = data;
        break;

      case 'f3':
        this.data.f3 = data;
        break;

      case 'f4':
        this.data.f4 = data;
        break;

      case 'f7':
        this.data.f7 = data;
        break;

      case 'f8':
        this.data.f8 = data;
        break;

      case 'fz':
        this.data.fz = data;
        break;

      case 'c3':
        this.data.c3 = data;
        break;

      case 'c4':
        this.data.c4 = data;
        break;

      case 'cz':
        this.data.c8 = data;
        break;

      case 'p3':
        this.data.p3 = data;
        break;

      case 'p4':
        this.data.p4 = data;
        break;

      case 'pz':
        this.data.pz = data;
        break;

      case 't3':
        this.data.t3 = data;
        break;

      case 't4':
        this.data.t4 = data;
        break;

      case 't5':
        this.data.t5 = data;
        break;

      case 't6':
        this.data.t6 = data;
        break;

      case 'o1':
        this.data.o1 = data;
        break;

      case 'o2':
        this.data.o2 = data;
        break;

      default:
        break;
    }

    return this;
  }

  with(customData) {
    Object.keys(customData).forEach((key) => {
      this.data.customAttribute(key, customData[key]);
    });

    return this;
  }
}
