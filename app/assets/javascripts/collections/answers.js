PollApp.Collections.Answers = Backbone.Collection.extend({
  // url: "answers",
  model: PollApp.Models.Answer, 
  
  comparator: function (answer) {
    return answer.id
  }

});
