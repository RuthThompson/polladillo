PollApp.Views.Four04 = Backbone.View.extend({
  
  template: JST['layout/404'],
  
  render: function () {
    this.$el.html(this.template());
    return this;
  }

});
