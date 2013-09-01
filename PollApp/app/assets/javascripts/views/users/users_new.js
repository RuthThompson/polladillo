PollApp.Views.NewUser = Backbone.View.extend({
  events: {
    "submit #editUser": "newUser"
  }, 

  template: JST['users/new'], 
  
  render: function () {
    this.$el.html(this.template({user: this.model}))
    return this
    
  },
  
  newUser: function (event) {
    event.preventDefault();
    data = $(event.currentTarget).serializeJSON()
    this.model.save(data.user, {
       success: Backbone.history.navigate("#/users/:user_id"), 
       failure: console.log("failure -- ruth make an errors view")
    });

  }

});
