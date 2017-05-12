var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();
// REMEMBER TO CHANGE THE DATABASE NAME!!!!!
mongoose.connect('mongodb://localhost/message_board');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
mongoose.Promise = global.Promise;


var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name is required"]},
    message: {type: String, required: [true, "Message is required"]},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true });

var CommentSchema = new mongoose.Schema({
    _post: {type: Schema.Types.ObjectId, ref: "Post"},
    name: {type: String, required: true},
    comment: {type: String, required: true}
}, {timestamps: true});

mongoose.model("Post", PostSchema);
mongoose.model("Comment", CommentSchema);

var Post = mongoose.model("Post");
var Comment = mongoose.model("Comment");

// loads index with all messages and comments
app.get("/", function(req, res) {
    Post.find({}, false, true).populate("comments").exec(function(err, posts) {
        if(err) { console.log(err); }
        res.render("index", { allMessages: posts })
    })
}) 

// adds message
app.post("/create_message", function (req, res) {
    var post = new Post({name: req.body.name, message: req.body.message});
    console.log(post);

    post.save(function(err) {
        if(err){
            console.log(err);
            res.redirect("/", {errors: post.errors})
        }
        else {
            console.log("success")
            res.redirect("/")
        }
    });
});

// adds comment to post
app.post("/create_comment/:id", function (req, res){
    Post.findOne({_id: req.params.id}, function(err, post){
        var comment = new Comment({name: req.body.name, comment: req.body.comment});
        comment._post = post._id;
        Post.update({_id: req.params.id}, {$push: {comments: comment}}, function(err){
        });
        comment.save(function(err) {
            if(err){
                res.redirect("/", {title: "You have errors!", errors: comment.errors})
                console.log("Something went wrong");
            }
            else {
                console.log("Successfully added a new comment!");
                res.redirect("/")
            }
        });
    });
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});

