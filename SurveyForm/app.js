var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
}) 

app.post("/process", function (req, res) {
    var newUser = {
        name: req.body.name,
        language: req.body.language,
        location: req.body.location,
        comments: req.body.comments
    };
    res.render("result", {user: newUser})
})

app.listen(8000, function() {
    console.log("listening on port 8000");
});

