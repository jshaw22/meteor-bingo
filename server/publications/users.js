Meteor.publish("userList", () => {
	return Meteor.users.find({})
});