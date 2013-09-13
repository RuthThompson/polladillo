PollApp.Views.ShowUser = Backbone.View.extend({

  template: JST['users/show'], 
  
  render: function () {
    this.$el.html(this.template({user: this.model, polls: this.collection}))
    this.$("[data-toggle=tooltip]").tooltip()
    return this
  }

});
