//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _= require('lodash');


const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://admin-neeraj:Test123@cluster0.y7iw3.mongodb.net/postDB', {useNewUrlParser : true , useUnifiedTopology : true});
const postSchema = {postTitle : String , postBody : String};
const Post = new mongoose.model("post" , postSchema);



const homeStartingContent = "Post Related to Home";
const aboutContent = "About Page";
const contactContent = "Contact Page";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req , res){

  Post.find({},function(err,posts){
    if(posts.length === 0 )
    {
        res.render("home", {startingContent : homeStartingContent , posts : [] });
    }

    else {
      res.render("home", {startingContent : homeStartingContent , posts : posts});
    }



  });

});





app.get("/about" , function(req , res)
{
  res.render('about' , {startingContent : aboutContent});
});



app.get("/contact" , function(req,res)
{
  res.render('contact' , {startingContent : contactContent});
});


app.get("/compose" , function(req , res)
{
  res.render('compose');
});



app.post("/compose" , function(req,res)
{
  var post = new Post({
    postTitle : req.body.postTitle,
    postBody : req.body.postBody
  });

  post.save(function(err){

    if (!err){

      res.redirect("/");

    }

  });

});



app.get('/posts/:postId', function (req, res) {

  const requiredId= req.params.postId;
  Post.findOne({_id : requiredId} , function(err , post)
{
  if(!err)
  {
    res.render('post' , {postTitle : post.postTitle , postContent :  post.postBody});
  }
});

})  ;




app.listen(process.env.PORT || 3000 , function(req,res)
{
  console.log("server started");
});
