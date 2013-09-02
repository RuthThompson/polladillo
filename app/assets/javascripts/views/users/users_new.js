PollApp.Views.NewUser = Backbone.View.extend({
  events: {
    "submit #editUser": "newUser"
  }, 

  template: JST['users/form'], 
  
  render: function () {
    this.$el.html(this.template({user: this.model}))
    return this
    
  },
  
  newUser: function (event) {
    event.preventDefault();
    data = $(event.currentTarget).serializeJSON()
    this.model.save(data.user, {
       success: function(data){
         PollApp.currentUser = data;
         Backbone.history.navigate("#/users/" + PollApp.currentUser.id)
        }, 
        error: function(responseObj){
          console.log("failure -- ruth make an errors view");
          console.log(responseObj);
        }
    });

  }

});
