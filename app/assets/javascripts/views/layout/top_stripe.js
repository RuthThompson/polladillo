PollApp.Views.TopStripe = Backbone.View.extend({
  events: {
    "click #logOut": "logOut", 
    "submit #topStripeLogIn" : "logIn"
  }, 

  template: JST['layout/top_stripe'], 
  
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
        that.render();
      }, 
      error: console.log("ruth make an error message")
    })
    
  },
  
  logIn: function (event) {
    event.preventDefault();
    console.log("here")
    var that = this; 
    var data = $("#topStripeLogIn").serializeJSON();
    $.ajax({
      url: "session",
      method: "POST",
      data: data, 
      success: function (data) {
        PollApp.currentUser = new PollApp.Models.User(data)
        that.render();
      },
      error: console.log("ruth make an error message")
    })
  }

});
