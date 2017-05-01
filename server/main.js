import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
  	changeAvatar: function (user, fileId){
  		//temporary placeholder
  		var file = "http://placehold.it/300x300";
  		if (fileId){
  			file = Images.findOne({_id: fileId});
  		}
  		var data = file._id;
  		Meteor.users.update(this.userId, {$set: {"profile.info.avatar": data}})
  	},
  	sendMessage: function (person, message) {
  		var to = Meteor.users.findOne({_id: person});
  		var from = Meteor.users.findOne({_id: this.userId});
  		var msg = {
  			to: to,
  			fromuser: from._id,
  			createdOn: new Date(),
        message: message
  		};
  		console.log("message", msg);
  		if(person == this.userId) {
  			throw new Meteor.Error("You can't send yourself a message");
  		}
  		DBMessage.insert(msg);
  	}
  })
});
