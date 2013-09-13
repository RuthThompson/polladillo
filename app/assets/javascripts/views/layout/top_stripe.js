PollApp.Views.TopStripe = Backbone.View.extend({
  events: {
    "click #logOut": "logOut", 
    "submit #topStripeLogIn" : "logIn", 
    "click #logInWithFacebook" : "logInWithFacebook"
  }, 

  template: JST['layout/top_stripe'], 
  
  initialize: function () {
    var that = this;
    PollApp.router.on('route', that.highlightMenu.bind(that));
  },
  
  render: function () {
    this.$el.html(this.template());
    return this;
  }, 
  
  highlightMenu: function () { 
    this.$('.menu-item').each( function () {
      $(this).removeClass('current-menu-item');
      if($(this).attr('href') === window.location.hash) {
        $(this).addClass('current-menu-item');
      }
    });
    
  },
  
  logOut: function (event) {
    event.preventDefault();
    var that = this; 
    PollApp.currentUser.logOut({
      success: PollApp.router.refreshLayout.bind(PollApp.router),
      error: that.displayErrors
    });   
  },
  
  logIn: function (event) {
    event.preventDefault();
    var that = this; 
    var data = $("#topStripeLogIn").serializeJSON();
    PollApp.currentUser.logIn(data, {
      success: function () {
        PollApp.router.refreshLayout.bind(PollApp.router)()
        Backbone.history.navigate('#/users/' + PollApp.currentUser.id)
      },
      error: that.displayErrors
    });
  }, 
  
  logInWithFacebook: function (event) {
     event.preventDefault();
     PollApp.currentUser.logInWithFacebook();
  },
  
  displayErrors: function (model, xhr) {
     var $errorBox = $('#error_messages_header');
     $errorBox.html("");
     _.each(xhr.responseJSON, function (error) {
       $errorBox.append('<div class="error_message_header">' + error + '</div');
     });    
   }
   
});
