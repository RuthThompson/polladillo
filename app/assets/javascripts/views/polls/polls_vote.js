PollApp.Views.PollsVote = Backbone.View.extend({

  template: JST['polls/vote'], 
  
  events: {
    "click #submitVote": "votePoll"
  },
  
  render: function () {
    this.$el.html(this.template({ poll: this.model }));
    this.$(".radio").prepend("<span class='icon'></span><span class='icon-to-fade'></span>");
    this.$(".radio").click( function () {
          setupLabel();
    });
    return this
  },
  
  votePoll: function () {
    var data =$('#votePoll').serializeJSON();
    var votes = new PollApp.Collections.Votes();
    var that = this;
    var opts = {
       success: function () {
         Backbone.history.navigate("#/polls/" + that.model.id + "/results", { trigger: true })
        }, 
        error: that.displayErrors
    }
    votes.create(data, opts)
  }, 
  
  displayErrors: function (model, xhr) {
     var $errorBox = $('#error_messages');
     $errorBox.html("");
     _.each(xhr.responseJSON, function (error) {
       $errorBox.append('<div class="error_message">' + error + '</div')
     });    
   }

});
