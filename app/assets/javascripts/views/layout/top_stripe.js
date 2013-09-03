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
    $.ajax({
      url: "session",
      method: "DELETE",
      success: function (data) {
        PollApp.currentUser = new PollApp.Models.User();
        PollApp.router.reRenderCurrentView();
        that.render(); 
      }, 
      error: console.log("ruth make an error message")
    })
    
  },
  
  logIn: function (event) {
    event.preventDefault();
    var that = this; 
    var data = $("#topStripeLogIn").serializeJSON();
    $.ajax({
      url: "session",
      method: "POST",
      data: data, 
      success: function (data) {
        PollApp.currentUser = new PollApp.Models.User(data)
        PollApp.router.reRenderCurrentView();
        that.render();
      },
      error: console.log("ruth make an error message")
    })
  }, 
  
  logInWithFacebook: function (event) {
     event.preventDefault();
     var that = this; 
           $.ajax({
           url: "/auth/facebook",
           success: function (data) {
             PollApp.currentUser = new PollApp.Models.User(data)
             PollApp.router.reRenderCurrentView();
             that.render();
           },
           error: console.log("ruth make an error message")
         })
          
  },
  
  

});
