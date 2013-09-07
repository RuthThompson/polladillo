PollApp.Collections.Answers = Backbone.Collection.extend({

  model: PollApp.Models.Answer, 
  
  comparator: function (answer) {
    return answer.id;
  }

});
