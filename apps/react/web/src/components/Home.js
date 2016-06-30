import React from 'react'
import { Link } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../services/configureStore.js'

const store = configureStore();

const Home = React.createClass({
  render() {
      "use strict";
      return (
        //   <Provider store={store}>
        //       <PhotoList />
        //   </Provider>
        <div>
            <p>默认的首页，还没想好放什么</p>
            <Link to='/photos'>图片</Link><br/>
            <Link to='/albums'>相册</Link><br/>
            <Link to='/author'>用户个人</Link><br/>
        </div>
      )
  }
});
export default Home