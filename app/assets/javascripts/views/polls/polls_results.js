PollApp.Views.PollsResults = Backbone.View.extend({
  template: JST['polls/results'], 
  initialize: function (){
    var that = this; 
    this.listenTo(that.model, 'change', that.drawGraphs);
  },
  render: function () {
    this.$el.html(this.template({poll: this.model}))
    return this
  },
  
  drawGraphs: function(){
    console.log('drawgraphs')
  }

});
