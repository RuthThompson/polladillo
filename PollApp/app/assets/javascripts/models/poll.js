PollApp.Models.Poll = Backbone.Model.extend({
  parse: function (data) {
    data.questions = new PollApp.Collections.Questions();
    return data
  }
});
