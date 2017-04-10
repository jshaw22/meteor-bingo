Meteor.publish("userList", () => {
	return Meteor.users.find({}, {fields:{profile:1, _id:1}})
});