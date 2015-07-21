Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('hello');
});

if(Meteor.isServer){
	var keypler = new Keypler()
}
