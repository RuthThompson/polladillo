PollApp.Views.Home = Backbone.View.extend({
  
  template: JST['layout/landing'], 
  
  render: function () {
    this.$el.html(this.template())
    return this
  }

});
