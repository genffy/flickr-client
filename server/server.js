/**
 * Created by genffy on 16/6/7.
 */
const express = require('express')
const app = new (express)()
const path = require('path');
const port = 3000
const bodyParser = require('body-parser')

app.use(express.static(path.resolve(__dirname + '/../public')))
app.use(express.static(path.resolve(__dirname + '/../apps')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// app.get("/", function(req, res) {
//     res.sendFile(path.resolve(__dirname + '/../public/index.html'))
// })

// 直接代理了啊
const Flickr = require('flickrapi')
const FlickrOptions = {
    progress: false,
    api_key: '90cf3303994db18bd620941cd9d1f131',
    secret: 'f6d3a8fffb182212'
}
// 开放的API
Flickr.tokenOnly(FlickrOptions, function(error, flickr) {
    flickr.proxy(app, "/service/rest");
});

// 监听端口 
app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
