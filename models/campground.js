var mongoose = require("mongoose");
var comments = require("./comments");

var campSchema = new mongoose.Schema({
	name :String,
	image:String,
	Description : String,
	comments : [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
}, {
  usePushEach: true
});

module.exports = mongoose.model("campmodel",campSchema);
