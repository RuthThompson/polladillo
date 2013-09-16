PollApp.Views.Home = Backbone.View.extend({
  events: {
    "click #loginAsGuest": "loginAsGuest"
  },
  
  template: JST['layout/landing'], 
  
  render: function () {
    this.$el.html(this.template());
    return this;
  },
  
  loginAsGuest: function (event) {
    event.preventDefault();
    var that = this; 
    PollApp.currentUser.logInAsGuest({
      success: function () {
        PollApp.router.refreshLayout.bind(PollApp.router)()
        Backbone.history.navigate('#/users/' + PollApp.currentUser.id)
      },
      error: that.displayErrors
    });
  }, 
  
});
