import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// router
import { Router, Route, IndexRoute, hashHistory, IndexRedirect} from 'react-router'
// child page
import Layout from './src/components/Layout.js'
import Home from './src/components/Home.js'
import PhotosWrap from './src/components/PhotosWrap.js'
import Photos from './src/components/Photos.js'
import Detail from './src/components/Detail.js'
import Albums from './src/components/Albums.js'
import Personal from './src/components/Personal.js'
import AlbumList from './src/components/AlbumList.js'
import Upload from './src/components/Upload.js'

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Home}/>
            <Route path="photos" component={PhotosWrap}>
                <IndexRedirect to="recent"/>
                <Route path="recent" component={Photos} type='recent'/>
                <Route path="tag(/:tag)" component={Photos} type='tag'/>
                <Route path="detail(/:id)" component={Detail}/>
            </Route>
            <Route path="albums(/:id)" component={Albums}/>
            <Route path="author/:userName" component={Personal}>
                <IndexRoute component={Photos} type='user'/>
                <Route path="albums" component={AlbumList}/>
                <Route path="favorites" component={Photos} type='fav'/>
            </Route>
        </Route>
    </Router>
), document.getElementById('app'));