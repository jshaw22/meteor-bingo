import { Meteor } from 'meteor/meteor';
import { AccountsServer } from 'meteor/accounts-base';
Meteor.startup(() => {
  // code to run on server at startup
  // Accounts.onCreateUser((options, user)=> {
  //   //seed user with some default fields
  //   let customizedUser = {...user, 
  //     profile:
  //     {
  //       aboutMe: '',
  //       whatILike: '',
  //       favStuff: '',
  //       cfBecause: '',
  //       messageMeIf: '',
  //       relationshipStatus: '',
  //       bodyType: '',
  //       height: '',
  //       diet: '',
  //       astrology: '',
  //       education: '',
  //       drugs: '',
  //       drink: '' 
  //     }
  //   }

  //   //merge filled out fields with blank custom fields 
  //   if(options.profile) {
  //     customizedUser.profile = {
  //       ...options.profile, 
  //       ...customizedUser.profile
  //     }
  //   }
  //   return customizedUser;
  // })

  Meteor.methods({
  	changeAvatar: function (user, fileId){
      console.log("Change avatar called");
  		//temporary placeholder
  		var file = "http://placehold.it/300x300";
  		if (fileId){
  			file = Images.findOne({_id: fileId});
  		}
  		var data = file._id;
      console.log("Change avatar", this.userId, data);
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
