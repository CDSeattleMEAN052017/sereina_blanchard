var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();
// REMEMBER TO CHANGE THE DATABASE NAME!!!!!
mongoose.connect('mongodb://localhost/quoting_dojo');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
mongoose.Promise = global.Promise;


var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quote: {type: String, required: true}
})

mongoose.model("Quote", QuoteSchema);
var Quote = mongoose.model("Quote");

app.get("/", function(req, res) {
    res.render("index");
}) 

app.post("/add-quote", function (req, res) {
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    console.log(quote);

    quote.save(function(err) {
        if(err){
            res.render("index", {title: "You have errors!", errors: quote.errors})
            console.log("Something went wrong");
        }
        else {
            console.log("Successfully added a new user!");
            res.redirect("quotes");
        }
    })
})

app.get("/quotes", function(req, res) {
    Quote.find({}, function(err, quotes) {
        if(err) { console.log(err); }
        res.render("quotes", { allQuotes: quotes })
    })
}) 

app.listen(8000, function() {
    console.log("listening on port 8000");
});

