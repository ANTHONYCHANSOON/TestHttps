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

app.post("/", function(req, res) {
    console.log(req.body);
    var fn = req.body.FN;
    var ln = req.body.LN;
    var eMail = req.body.EMAIL
})

app.listen(3000, () => {
    console.log("localhost connected port 3000");
})