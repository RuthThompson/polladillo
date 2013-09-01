PollApp.Models.User = Backbone.Model.extend({
  urlRoot: "users",

  parse: function(data){
    // this.polls = new PollApp.Collections.Polls(data.polls);
    return data
  }, 

  toJSON: function(){

  }
  
});
