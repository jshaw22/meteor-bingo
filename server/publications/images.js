Meteor.publish('imageList', () => {
	return Images.find();
})