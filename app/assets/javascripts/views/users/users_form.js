PollApp.Views.UserForm = Backbone.View.extend({
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
    var that = this;
    data = $(event.currentTarget).serializeJSON()
    this.model.save(data.user, {
       success: function(model){
         PollApp.currentUser = that.model;
         PollApp.router.refreshLogin();
         Backbone.history.navigate("#/users/" + PollApp.currentUser.id, { trigger: true })
        }, 
        error: function(model, xhr){
          that.displayErrors(model, xhr)
        }
    });

  }, 
  
  displayErrors: function (model, xhr) {
    var $errorBox = $('#error_messages');
    $errorBox.html("");
    _.each(xhr.responseJSON, function (error) {
      $errorBox.append('<div class="error_message">' + error + '</div')
    });    
  }

});
