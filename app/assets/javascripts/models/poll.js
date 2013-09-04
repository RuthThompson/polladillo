PollApp.Models.Poll = Backbone.Model.extend({
  urlRoot: "polls",
  parse: function (data) {
    _.each(data.questions, function (q) {
      q.answers = new PollApp.Collections.Answers(q.answers)
    });
    data.questions = new PollApp.Collections.Questions(data.questions);
    return data
  },
  
  listenForUpdates: function (on_update) {
    var pusher = new Pusher('beb17ccd0585f1c87905');
    var channel = pusher.subscribe('poll_' + this.id );
    var that = this;
    channel.bind('updated', function(data) {
      poll_data = that.parse(JSON.parse(data.poll))  
      that.set(poll_data)
      on_update ? on_update() : null
    });
  }
  
});