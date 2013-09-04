PollApp.Views.TopStripe = Backbone.View.extend({
  events: {
    "click #logOut": "logOut", 
    "submit #topStripeLogIn" : "logIn", 
    "click #logInWithFacebook" : "logInWithFacebook"
  }, 

  template: JST['layout/top_stripe'], 
  
  initialize: function () {

  },
  
  render: function () {
    this.$el.html(this.template())
    return this
  }, 
  
  logOut: function (event) {
    var that = this; 
    PollApp.currentUser.logOut({
      success: that.render.bind(that), 
      error: that.writeErrors
    })
    
  },
  
  logIn: function (event) {
    event.preventDefault();
    var that = this; 
    var data = $("#topStripeLogIn").serializeJSON();
    PollApp.currentUser.logIn(data, {
      success: that.render.bind(that), 
      error: that.writeErrors
    });
  }, 
  
  logInWithFacebook: function (event) {
     event.preventDefault();
     var that = this; 
     PollApp.currentIser.logInWithFacebook({
       success: that.render.bind(that), 
       error: that.writeErrors
     });
  },
  
  writeErrors: function () {
    console.log("ruth make errors")
  }
  
  

});
