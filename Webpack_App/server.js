const express = require("express");
const router = express.Router();
const request = require('request'); // npm install request --save
const app = express();
const https = require("https");

app.get("/", function(req, res) {
    const url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=airsigmets&requestType=retrieve&format=xml&hoursBeforeNow=5&mostRecent=true"
    var data = "";
    const options = {
        url: "https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=airsigmets&requestType=retrieve&format=xml&hoursBeforeNow=5&mostRecent=true",
        headers: {
            'user-agent': 'node.js'
        }
    };
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(chunk) {
            //const weatherdata = JSON.parse(data)
            data += chunk;
            console.log(data); //could stringify
        })
        response.on("end", function() {
            console.log(data);
        })
    })
})

app.listen(3000, function() {
    console.log("server is running on port 3000"); // callback funtion 
})