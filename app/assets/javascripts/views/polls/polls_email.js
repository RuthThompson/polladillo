PollApp.Views.PollsEmail = Backbone.View.extend({
  events: {
    "click #sendEmails": "sendEmails"
  }, 

  template: JST['polls/email'], 
  
  render: function () {
    this.$el.html(this.template({poll: this.model}));
    return this;
  },
  
  sendEmails: function (event) {
    event.preventDefault();
    var that = this;
    var data = $("#emailPoll").serializeJSON();
    data.emails.poll_id = this.model.id;
    this.model.sendEmails(data, {
      success: function () {
         Backbone.history.navigate("#/users/" + PollApp.currentUser.id, { trigger: true });
       },
       error: that.displayErrors
    });
  },
  
  displayErrors: function (model, xhr) {
    var $errorBox = $('#error_messages');
    $errorBox.html("");
    _.each(xhr.responseJSON, function (error) {
      $errorBox.append('<div class="error_message">' + error + '</div');
    });    
  }
  
});