import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './Redux/store';
import { ADD_PLUGIN } from './Redux/Types';
import ApplicationContainer from './Container/ApplicationContainer';
import LoadPlugins from './Controller/LoadController';
import ApplicationController from './Controller/ApplicationController';

LoadPlugins().forEach((item) => {
  store.dispatch({
    type: ADD_PLUGIN,
    payload: item,
  });
});

window.onload = () => {
  const appController = new ApplicationController(store);
  ReactDOM.render(
    <Provider store={store}>
      <ApplicationContainer appController={appController} />
    </Provider>,
    document.getElementById('root'),
  );
};
