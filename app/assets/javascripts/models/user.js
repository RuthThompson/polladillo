PollApp.Models.User = Backbone.Model.extend({
  
  urlRoot: "users", 
  
  logOut: function (opts) {
    $.ajax({
      url: "session",
      method: "DELETE",
      success: function (data) {
        PollApp.currentUser = new PollApp.Models.User();
        opts.success();
      }, 
      error: function (responseObj){
        opts.error(this, responseObj)
      }
    });
    
  },
  
  logIn: function (user_data, opts) {
    $.ajax({
      url: "session",
      method: "POST",
      data: user_data, 
      success: function (data) {
        PollApp.currentUser = new PollApp.Models.User(data)
        opts.success();
      },
      error: function (responseObj){
        opts.error(this, responseObj)
      }
    })
  }, 
  
  logInAsGuest: function (opts) {
    $.ajax({
      url: "session/guest", 
      method: "POST", 
      success: function (data) {
        PollApp.currentUser = new PollApp.Models.User(data)
        opts.success();
      },
      error: function (responseObj){
        opts.error(this, responseObj)
      }
    })
  },
  
  logInWithFacebook: function (opts) {
     var return_hash = window.location.hash.replace('#', '');
     window.location = "/auth/facebook?return_hash="+ return_hash;    
  },
});
