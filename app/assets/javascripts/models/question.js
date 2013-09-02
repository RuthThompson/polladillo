PollApp.Models.Question = Backbone.Model.extend({
  parse: function (data) {
   // data.answers = new PollApp.Collections.Answers(data.answers);
    return data
  }

});
