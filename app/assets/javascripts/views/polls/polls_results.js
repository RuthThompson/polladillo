PollApp.Views.PollsResults = Backbone.View.extend({
  template: JST['polls/results'], 
  
  render: function () {
    this.$el.html(this.template({poll: this.model}))
    return this
  }

});
