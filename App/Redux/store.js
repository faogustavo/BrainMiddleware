import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import reducer from './Reducers';

// const middleware = applyMiddleware(logger);
// export default createStore(reducer, middleware);
export default createStore(reducer);
