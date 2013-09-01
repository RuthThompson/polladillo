PollApp.Models.Question = Backbone.Model.extend({
  parse: function (data) {
    data.answers = new PollApp.Collections.Answers();
    return data
  }

});
