PollApp.Models.Poll = Backbone.Model.extend({
  urlRoot: "polls",
  parse: function (data) {
    _.each(data.questions, function(q){
      q.answers = new PollApp.Collections.Answers(q.answers)
    });
    data.questions = new PollApp.Collections.Questions(data.questions);
    return data
  }
});