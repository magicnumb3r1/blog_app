var express         = require('express');
var app             = express();
var request         = require('request');
var bodyParser      = require("body-parser");
var mongoose        = require('mongoose');

// Mongoose:
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
mongoose.connect('mongodb://localhost/blog_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created:
   {
    type: Date, default: Date.now
  }
})

var Blog = new mongoose.model("Blog", blogSchema)

// Blog.create


//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({extended:true}));
  app.set("view engine", "ejs");
  
// ROUTES:
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/', function(req, res){
  res.redirect('blogs');
});

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
      if(err){
        console.log("error");
      }else {
        res.render("index", {blogs: blogs})
      }
    })
});

//  POST ROUTE:
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  






  // PORT LISTENING:
app.listen(3000, () => console.log('server connected'));