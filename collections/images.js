Images = new FS.Collection("images", {
	stores: [ new FS.Store.FileSystem("images", {path: "~/uploads"})],
	filter: {
		maxSize: 2000000 //bytes
	}
});

Images.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	}
});