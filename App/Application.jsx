import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './Redux/store';
import { ADD_PLUGIN } from './Redux/Types';
import ApplicationContainer from './Container/ApplicationContainer';
import LoadPlugins from './Controller/LoadController';

LoadPlugins().forEach((item) => {
  store.dispatch({
    type: ADD_PLUGIN,
    payload: item,
  });
});

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ApplicationContainer />
    </Provider>,
    document.getElementById('root'),
  );
};
