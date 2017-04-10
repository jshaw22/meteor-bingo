Meteor.publish('messageList', () => {
	return DBMessage.find();
});