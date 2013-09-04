PollApp.Views.PollsEmail = Backbone.View.extend({
  events: {
    "click #sendEmails": "sendEmails"
  }, 

  template: JST['polls/email'], 
  
  render: function () {
    this.$el.html(this.template({poll: this.model}));
    return this
  },
  
  sendEmails: function (event) {
    event.preventDefault();
    console.log("here")
    var that = this;
    data = $("#emailPoll").serializeJSON();
    console.log(data)
    data.emails.poll_id = this.model.id
    $.ajax({
     method: "POST", 
     data: data,
     url: "polls/" + that.model.id + "/email",
     success: function (data) {
       console.log("success")
     },
     error: console.log("ruth make an error message")
   })
  }
});