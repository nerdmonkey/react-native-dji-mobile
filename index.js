import {
  Platform,
  NativeModules,
} from 'react-native';

import PlatformEventEmitter from './platformEventEmitter';

import {
  Subject,
} from 'rxjs';

import {
  filter,
} from 'rxjs/operators';

const {
  DJIMobile,
} = NativeModules;

const DJIEventSubject = new Subject();

PlatformEventEmitter.addListener('DJIEvent', evt => {
  DJIEventSubject.next(evt);
});

const DJIMobileWrapper = {
  
  registerApp: () => {
    return DJIMobile.registerApp();
  },

  startProductConnectionListener: async () => {
    DJIMobile.startProductConnectionListener();
    return DJIEventSubject.pipe(filter(evt => evt.type === 'connectionStatus')).asObservable();
  },
};

export default DJIMobileWrapper;
