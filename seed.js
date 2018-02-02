var mongoose= require("mongoose");
var campmodel = require("./models/campground");
var Comment = require("./models/comments");

function seed(){
var data =[
{name : "Blue Haven", 
image :"http://www.campsitereports.com/photos/Approved/Processed/USA/SC/PID1568/Myrtle-Beach-State-Park-PhotoID-P003089.jpg", 
Description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna justo, gravida sit amet ipsum vestibulum, interdum volutpat velit. Nulla ullamcorper rhoncus tortor, vitae fringilla ipsum rhoncus et. Nunc auctor justo id massa vulputate sodales. Etiam diam quam, fermentum at lectus sit amet, fermentum ullamcorper lectus. Praesent vestibulum, quam in pharetra porttitor, elit mauris fringilla diam, at malesuada diam tortor nec dolor. Aliquam venenatis id lacus vel egestas. Morbi ultrices bibendum ullamcorper. Aenean sit amet hendrerit felis. Vestibulum velit leo, elementum sed sapien vel, porttitor varius risus. Curabitur consectetur sit amet est vel sodales. In mattis bibendum orci tempor vulputate. Mauris at imperdiet ligula. Nunc non diam quis dui porttitor efficitur. Donec maximus eros sed arcu viverra dapibus. Pellentesque vel purus vestibulum, tincidunt quam quis, consectetur nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
{name : "Green Haven", 
image :"http://www.campsitereports.com/photos/Approved/Processed/USA/SC/PID1568/Myrtle-Beach-State-Park-Fishing-pier-at-sunset-Myrtle-Beach-State-Park-PhotoID-P005714.jpg", 
Description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna justo, gravida sit amet ipsum vestibulum, interdum volutpat velit. Nulla ullamcorper rhoncus tortor, vitae fringilla ipsum rhoncus et. Nunc auctor justo id massa vulputate sodales. Etiam diam quam, fermentum at lectus sit amet, fermentum ullamcorper lectus. Praesent vestibulum, quam in pharetra porttitor, elit mauris fringilla diam, at malesuada diam tortor nec dolor. Aliquam venenatis id lacus vel egestas. Morbi ultrices bibendum ullamcorper. Aenean sit amet hendrerit felis. Vestibulum velit leo, elementum sed sapien vel, porttitor varius risus. Curabitur consectetur sit amet est vel sodales. In mattis bibendum orci tempor vulputate. Mauris at imperdiet ligula. Nunc non diam quis dui porttitor efficitur. Donec maximus eros sed arcu viverra dapibus. Pellentesque vel purus vestibulum, tincidunt quam quis, consectetur nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
{name : "Yellow Haven", 
image :"http://www.campsitereports.com/photos/Approved/Processed/USA/AK/PID2154/Chilkat-State-Park-PhotoID-P004258.jpg", 
Description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna justo, gravida sit amet ipsum vestibulum, interdum volutpat velit. Nulla ullamcorper rhoncus tortor, vitae fringilla ipsum rhoncus et. Nunc auctor justo id massa vulputate sodales. Etiam diam quam, fermentum at lectus sit amet, fermentum ullamcorper lectus. Praesent vestibulum, quam in pharetra porttitor, elit mauris fringilla diam, at malesuada diam tortor nec dolor. Aliquam venenatis id lacus vel egestas. Morbi ultrices bibendum ullamcorper. Aenean sit amet hendrerit felis. Vestibulum velit leo, elementum sed sapien vel, porttitor varius risus. Curabitur consectetur sit amet est vel sodales. In mattis bibendum orci tempor vulputate. Mauris at imperdiet ligula. Nunc non diam quis dui porttitor efficitur. Donec maximus eros sed arcu viverra dapibus. Pellentesque vel purus vestibulum, tincidunt quam quis, consectetur nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
{name : "Black Haven", 
image :"https://farm3.staticflickr.com/2940/14424585815_2754c30002_z.jpg", 
Description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna justo, gravida sit amet ipsum vestibulum, interdum volutpat velit. Nulla ullamcorper rhoncus tortor, vitae fringilla ipsum rhoncus et. Nunc auctor justo id massa vulputate sodales. Etiam diam quam, fermentum at lectus sit amet, fermentum ullamcorper lectus. Praesent vestibulum, quam in pharetra porttitor, elit mauris fringilla diam, at malesuada diam tortor nec dolor. Aliquam venenatis id lacus vel egestas. Morbi ultrices bibendum ullamcorper. Aenean sit amet hendrerit felis. Vestibulum velit leo, elementum sed sapien vel, porttitor varius risus. Curabitur consectetur sit amet est vel sodales. In mattis bibendum orci tempor vulputate. Mauris at imperdiet ligula. Nunc non diam quis dui porttitor efficitur. Donec maximus eros sed arcu viverra dapibus. Pellentesque vel purus vestibulum, tincidunt quam quis, consectetur nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
];

   Comment.remove({}); 
   campmodel.remove({}, function(err){
        if(err){
            console.log(err);
        }
         //add a few campgrounds
        data.forEach(function(seed){
            campmodel.create(seed, function(err, campgrounds){
                if(err){
                    console.log(err)
                } else {
                    //create a comment
                    Comment.create(
                        {

                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campgrounds.comments.push(comment._id);
                            }
                        });

                    Comment.create( 
                        {

                            text: "This place is great, but I wish there were girls",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campgrounds.comments.push(comment._id);
                                    campgrounds.save(function(err, result){
                                    if(err) {
                                      console.log("Error PUTing store!" + err); 
                                      return;
                                    }
                                  });

                            }
                        });
                }
            });
        });
    }); 
    //add a few comments

}

module.exports = seed;