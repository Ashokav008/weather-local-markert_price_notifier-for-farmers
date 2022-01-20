const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose')
const request = require("request");
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
// const { time } = require("console");
// const { time } = require("console");
require('./server/model/connection');
const User = mongoose.model('User');
// require('./server/model/connection');
// var favicon = require('serve-favicon');
// const userController = require('./server/controllers/userController');
// PORT=
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
var client = require('twilio')(
    "ACaaf8b7badeb626a4223214120b9aab88",
    "255e7ef243dfb378c12807e338a276b1"
);

// client.messages.create({
//     from: "+14159805375",
//     to: "+91919518313537",
//     body: "You just sent an SMS from Node.js using Twilio!"
// }).then((message) => console.log(message.sid));
// console.log("Below")


// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
myTime = new Date().toISOString();
theDate = new Date(Date.parse(myTime));
time = theDate.toLocaleTimeString()
    // if (time === "11:59:50 am")
console.log(time) //this is thw final time we gott;



function outerWeatherTime() {
    // console.log("inisde")
    myTime = new Date().toISOString();
    theDate = new Date(Date.parse(myTime));
    time = theDate.toLocaleTimeString()
        // refTime = "10:00:00 pm";
    refTime = time
    console.log(time, refTime)
    if (refTime == time) {
        console.log("The time is now onnn!!!")
        sendWeatherData()


    }
}
setInterval(outerWeatherTime, 5000)

function outerCommodityTime() {
    // console.log("inisde")
    myTime = new Date().toISOString();
    theDate = new Date(Date.parse(myTime));
    time = theDate.toLocaleTimeString()
    refTime = "22:44:00 pm";
    refTime = time
    console.log(time, refTime)
    if (refTime == time) {
        console.log("The time is now onnn!!!")
        sendCommodityData()


    }
}
// setInterval(outerCommodityTime, 1000)

// -------------------------------Weather Start--------------------------------------------------------------------------------------
function sendWeatherData() {

    User.find()
        .then(data => {
            if (!data) {
                console.log('Failed to retrieve the Medicine List: ' + err);
            } else {
                // let city = req.body.city;
                data.forEach(element => {


                    city = element.address;
                    apiKey = '65f8844e0ebf8e8be085378c5a0421f7';
                    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
                    // Request for data using the URL
                    request(url, function(err, response, body) {

                        // console.log(response)
                        // On return, check the json data fetched
                        if (err) {
                            res.render('index');
                        } else {
                            let weather1 = JSON.parse(body);
                            // console.log(weather1);
                            // console.log(data)
                            console.log(element.address)
                            console.log(element.mono)
                            mobile = element.mono;

                            // console.log(`city name : ${weather1.name},  minimum temp : ${weather1.main.temp_min}, maximum temp : ${weather1.main.temp_max}, type ${weather1.weather[0].description}, current humidity : ${weather1.main.humidity}`);
                            myMessage = `city name : ${weather1.name},  minimum temp : ${weather1.main.temp_min}, maximum temp : ${weather1.main.temp_max}, type ${weather1.weather[0].description}, current humidity : ${weather1.main.humidity}`;
                            // --------------------------------------
                            // --------------------------------------
                            client.messages.create({
                                from: "+16075368785",
                                to: mobile,
                                body: myMessage
                            }).then((message) => console.log(message.sid));
                            console.log("Below")

                            // --------------------------------------
                            // --------------------------------------
                            // res.send("Data recieved successfully");
                        }
                    });
                });

            }
        })
}

// -------------------------------Weather End--------------------------------------------------------------------------------------


// -------------------------------commmodity start--------------------------------------------------------------------------------------

function sendCommodityData() {


    // let city = req.body.city;
    city = "pune"
        // Use that city name to fetch data
    let url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000010c5dcb5cb1154eef632790edda1dcb9d&format=json&offset=0&limit=1000`;
    // Request for data using the URL
    request(url, function(err, response, body) {

        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather1 = JSON.parse(body);
            // console.log(weather1.records[0]);
            // console.log(`city name : ${weather1.name},  minimum temp : ${weather1.main.temp_min}, maximum temp : ${weather1.main.temp_max}, type ${weather1.weather[0].description}, current humidity : ${weather1.main.humidity}`);
            // myMessage = `city name : ${weather1.name},  minimum temp : ${weather1.main.temp_min}, maximum temp : ${weather1.main.temp_max}, type ${weather1.weather[0].description}, current humidity : ${weather1.main.humidity}`;

            // --------------------------------------
            // --------------------------------------
            // client.messages.create({
            //     from: "+14159805375",
            //     to: "+91919518313537",
            //     body: myMessage
            // }).then((message) => console.log(message.sid));
            // console.log("Below")
            // 
            // --------------------------------------
            // --------------------------------------
            // res.send("Data recieved successfully");
        }
    })
}
// -------------------------------commmodity Endd--------------------------------------------------------------------------------------



app.use('/static', express.static(path.join(__dirname, 'assets')))
app.get("/", (req, res) => {
    res.render('index')
})


app.post('/login', async(req, res) => {


    var user = new User();
    user.name = req.body.name;
    user.mono = req.body.mono;
    user.address = req.body.address;
    user.pincode = req.body.pinocde;
    user.commodity = req.body.commodity;
    user.weather = req.body.weather;
    // generate salt to hash password

    // console.log(req.body.pincode)
    user.save()
        .then(data => {
            console.log(data);
            res.end();
            // res.render('index')
        })
        .catch(err => { console.log(err); })
})

app.listen(port, () => {
    console.log(`Server is running on port ${3000}`);
})