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
      error: opts.error
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
      error: opts.error
    })
  }, 
  
  logInWithFacebook: function (opts) {
     event.preventDefault();
     var return_hash = window.location.hash.replace('#', '');
     window.location = "/auth/facebook?return_hash="+ return_hash;    
  },
});
