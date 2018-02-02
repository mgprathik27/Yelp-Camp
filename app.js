var express = require("express");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
var app = express();
var bodyParser = require("body-parser");
var campmodel = require("./models/campground");
var comments = require("./models/comments");
var seed = require("./seed");
app.use(express.static(__dirname+"/public"));
seed();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
	res.render("landingPage");
})

app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new");
})

app.get("/campgrounds/:id/comments/new",function(req,res){
	campmodel.findById(req.params.id,function(err,campground){
		res.render("comments/new",{campground, campground});
	});
	
})

app.get("/campgrounds/:id",function(req,res){

	
	campmodel.findById(req.params.id).populate("comments").exec(function(err,campground){
		if(!err){
			console.log(campground.comments[0].text);
		res.render("campgrounds/show",{campground, campground});
	}
	})
	
})

app.post("/campgrounds/:id/comments",function(req,res){
	comments.create(req.body.comment,function(err,com){
	if(err){
		console.log("Something went wrong");
	} else {
		campmodel.findById(req.params.id,function(err,camp){
			camp.comments.push(com._id);
			camp.save(function(err,resp){
			if (err){
				console.log("something went wrong");
			}
		});
		});

	}
	});	
	res.redirect("/campgrounds/"+req.params.id);
})

app.post("/campgrounds",function(req,res){

	var campground = {name : req.body.name, image : req.body.image, Description : req.body.Description};
	campmodel.create(campground,function(err,camp){
	if(err){
		console.log("Something went wrong");
	} else {
		
	}
	});	
	res.redirect("/campgrounds");
})

app.get("/campgrounds",function(req,res){
	campmodel.find({},function(err,allcampgrounds){	
	if(err){
		console.log("Something went wrong");
	} else {
			res.render("campgrounds/index",{campgrounds: allcampgrounds});
	}});

})

app.listen(8080,function(){
	console.log("Server has started");
})