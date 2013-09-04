PollApp.Views.PollsResults = Backbone.View.extend({
  template: JST['polls/results'], 
  initialize: function (){
    var that = this; 
    this.listenTo(that.model, 'change', that.drawGraphs);
    this.listenForUpdates();
  },
  render: function () {
    this.$el.html(this.template({poll: this.model}))
    this.drawGraphs();
    return this
  },
  
  drawGraphs: function(){
    var that = this;
    this.model.get("questions").each(function(question){
      var $canvas = $('<canvas id="barGraph' + question.id + '" width="400" height="400"></canvas>');
      var ctx = $canvas.get(0).getContext('2d');
      that.$("#question_" + question.id + "_bar_graph").html($canvas);
      var labels = [];
      var data = [];
      
      question.get("answers").each(function(answer){
        labels.push(answer.escape("value"));
        data.push(answer.get("votes"))
      })
      
      var datamax = data.slice(0).sort()[data.length-1];
      var scaleSteps = Math.ceil(datamax/10);
      var scaleStepWidth = Math.ceil(datamax/scaleSteps);
      
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
             scaleShowLabels: false, 
             animation: false, 
      }
      new Chart(ctx).Bar(data, options)
    });
  }, 
  
  listenForUpdates: function () {
        var pusher = new Pusher('beb17ccd0585f1c87905');
        var channel = pusher.subscribe('poll_' + this.model.id );
        var that = this
        channel.bind('updated', function(data) {
          poll_data = that.model.parse(JSON.parse(data.poll))  
          that.model.set(poll_data)
          that.render();
        });
   }
});
