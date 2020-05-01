const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    //console.log(req.body);
    var fn = req.body.FN;
    var ln = req.body.LN;
    var eMail = req.body.EMAIL

    var data = {
        members: [{
            email_address: eMail,
            status: "subscribed",
            merge_fields: {
                FNAME: fn,
                LNAME: ln
            }
        }]
    }

    var jsonData = JSON.stringify(data);


    const url = "https://us8.api.mailchimp.com/3.0/lists/bb449cf895";

    const options = {
        method: "POST",
        auth: "helloworld:98e67653a037e217c3442dfcdb6634b7-us8"
    }

    const request = https.request(url, options, function (response) {
        
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})


app.post("/failure", function(req,res) {
    res.redirect("/")
})

app.listen(3000, () => {
    console.log("localhost connected port 3000");
})

//apikey for mailchimp 98e67653a037e217c3442dfcdb6634b7-us8

//listid bb449cf895