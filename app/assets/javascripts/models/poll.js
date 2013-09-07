PollApp.Models.Poll = Backbone.Model.extend({
  
  urlRoot: "polls",
  
  parse: function (data) {
    _.each(data.questions, function (q) {
      q.answers = new PollApp.Collections.Answers(q.answers);
    });
    data.questions = new PollApp.Collections.Questions(data.questions);
    return data;
  },
  
  listenForUpdates: function (on_update) {
    var pusher = new Pusher('aaf4f910f3de9b6b983f');
    this.channel = pusher.subscribe('poll_' + this.id );
    var that = this;
    this.channel.bind('updated', function(data) {
      var poll_data = that.parse(JSON.parse(data.poll));
      that.set(poll_data);
      on_update ? on_update() : null;
    });
  }, 
  
  sendEmails: function (emails, opts) {
     $.ajax({
        method: "POST", 
        data: emails,
        url: "polls/" + this.id + "/email",
        success: function () {
          opts.success(this);
        }, 
        error: function (responseObj) {
          opts.error(this, responseObj);
        }
     });
 }, 
 
 remove: function () {
   this.channel.unsubscribe('poll_' + this.id );
   this.prototype.remove.apply(this);
 }
});