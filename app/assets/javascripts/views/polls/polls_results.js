PollApp.Views.PollsResults = Backbone.View.extend({
  template: JST['polls/results'], 
  initialize: function (){
    var that = this; 
    this.listenTo(that.model, 'change', that.drawGraphs);
    this.model.listenForUpdates();
  },
  render: function () {
    this.$el.html(this.template({poll: this.model}))
    this.drawGraphs();
    return this
  },
  
  drawGraphs: function(){
    var that = this;
    this.model.get("questions").each(function(question){
      var width = 400
      var $canvas = $('<canvas id="barGraph' + question.id + '" width="400" height="200"></canvas>');
      var ctx = $canvas.get(0).getContext('2d');
      that.$("#question_" + question.id + "_bar_graph").html($canvas);
      var labels = [];
      var data = [];
      
      question.get("answers").each(function(answer){
        labels.push(answer.escape("value"));
        data.push(answer.get("votes"))
      })
      
      var datamax = data.slice(0).sort()[data.length-1];
      var scaleSteps = datamax < 10 ? 10 : Math.ceil(datamax/10);
      var scaleStepWidth = datamax < 10 ? 1: Math.ceil(datamax/scaleSteps);
      
      var data = {
        labels : labels,  
        datasets : [{
          fillColor : '#777777', 
          strokeColor : '#000000', 
          data : data
        }]
      }

      var options = {
             scaleShowGridLines: false,
             scaleOverride: true,
             scaleSteps: scaleSteps,
             scaleStepWidth: scaleStepWidth,
             scaleStartValue: 0,
             animation: false, 
      }
      new Chart(ctx).Bar(data, options)
    });
  }
  
});
