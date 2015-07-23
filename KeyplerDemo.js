Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', function () {
	this.render('hello');
});

if(Meteor.isClient){

	function hasLicense(){
		return Meteor.user() && Meteor.user().services && Meteor.user().services.keypler && Meteor.user().services.keypler.license
	}

	Template.hello.helpers({
		userLicense: function(){
			return hasLicense();
		},
		userEmail: function(){
			return Meteor.user().emails[0].address;
		}
	})

	Template.hello.events({
		'click #makeLicense': function(){
			Meteor.call('newLicense');
		}
	})
}


if(Meteor.isServer){
	var keypler = new Keypler();

	Meteor.methods({
		newLicense: function(){//generates a new license for the user who called this method. This is insecure, but meant to show how to use `keypler.generateLicense`
			keypler.generateLicense(this.userId);
		}
	})
}
