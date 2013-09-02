PollApp.Views.PollsVote = Backbone.View.extend({

  template: JST['polls/vote'], 
  
  events: {
    "click #submitVote": "votePoll"
    
  },
  
  render: function () {
    this.$el.html(this.template({poll: this.model}));
    return this
  },
  
  votePoll: function () {
    var data =$('#votePoll').serializeJSON();
    var votes = new PollApp.Collections.Votes();
    var opts = {
       success: function (data) {
         console.log(data)
       //  Backbone.history.navigate("#/users/" + PollApp.currentUser.id)
        }, 
        error: function (responseObj) {
          console.log("failure -- ruth make an errors view");
          console.log(responseObj);
        }
    }
    votes.create(data, opts)
  }

});
