var express = require("express");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
var app = express();
var bodyParser = require("body-parser");

var userSchema = new mongoose.Schema({
	name :String,
	image:String
});

var campmodel = mongoose.model("campmodel",userSchema);
/*
var campgrounds = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
];
campgrounds.forEach(function(campground){
campmodel.create({name: campground.name, image: campground.image},function(err,camp){
	if(err){
		console.log("Something went wrong");
	} else {
		
	}
});	
})
*/

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
	res.render("landingPage");
})

app.get("/campgrounds/new",function(req,res){
	res.render("newCampground");
})

app.post("/campgrounds",function(req,res){

	var campground = {name : req.body.name, image : req.body.image};
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
			res.render("campground",{campgrounds: allcampgrounds});
	}});

})

app.listen(8080,function(){
	console.log("Server has started");
})