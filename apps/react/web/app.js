/**
 * Created by genffy on 16/6/4.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
// router
import { Router, Route, IndexRoute, hashHistory} from 'react-router'
// child page
import Layout from './src/components/Layout.js'
import Home from './src/components/Home.js'
import Detail from './src/components/Detail.js'
import Albums from './src/components/Albums.js'
/*import Search from './src/components/Search.js'
import Personal from './src/components/Personal.js'
import Upload from './src/components/Upload.js'*/

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Home}/>
            <Route path="/list/hot" component={Home}/>
            <Route path="/list/recent" component={Albums}/>

            <Route path="/detail/:id" component={Detail}/>
        </Route>
    </Router>
), document.getElementById('app'));

// <Route path="/search" component={Search}/>
// <Route path="/personal" component={Personal}/>
// <Route path="/upload" component={Upload}/>