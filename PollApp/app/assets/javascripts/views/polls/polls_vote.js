PollApp.Views.PollsVote = Backbone.View.extend({

  template: JST['polls/vote'], 
  
  render: function () {
    this.$el.html(this.template({poll: this.model}));
    return this
  },

});
