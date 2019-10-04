const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const Twitter = require('node-tweet-stream')
const socket = require("socket.io");
const http = require("http");

const app = express();
dotenv.config();
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
const port = process.env.PORT || 4000;
const httpServer = http.createServer(app);

var server = httpServer.listen(port, () =>
    console.log(`Express Running ${port}!`)
);



var io = socket(server);
io.on("connection", socket => {
    twitter = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        token: process.env.ACCESS_TOKEN,
        token_secret: process.env.ACCESS_TOKEN_SECRET
    })

    twitter.on('error', function (err) {
        console.log('Oh no' + err)
    })

    twitter.track(['donald trump', "python"])
    console.log(socket.id);
    twitter.on('tweet', function (tweet) {
        io.sockets.emit("tweet", tweet);
    })
});