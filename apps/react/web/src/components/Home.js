/**
 * Created by genffy on 16/6/5.
 */
import React from 'react'
import PhotoList from './PhotoList.js'

import { Provider } from 'react-redux'
import configureStore from '../services/configureStore.js'

const store = configureStore();

const Home = React.createClass({
  render() {
      "use strict";
      return (
          <Provider store={store}>
              <PhotoList />
          </Provider>
      )
  }
});
export default Home