var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3030;
// Start the Server
app.listen(port,()=>{
   console.log("App listening to: http://localhost:"+port)
 })
// Express Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
// Render Main HTML file
app.get('/', function (req, res) {
    res.sendFile('public/index.html', {
        root: __dirname
    });
});

var redis = require('redis');
var redisSubscriber = redis.createClient();
var redisPublisher = redis.createClient();redisSubscriber.on('subscribe', function (channel, count) {
        console.log('client subscribed to ' + channel + ', ' + count + ' total subscriptions');
});
redisSubscriber.on('message', function (channel, message) {
    console.log('client channel ' + channel + ': ' + message);
    io.emit('locationUpdate', message);
});