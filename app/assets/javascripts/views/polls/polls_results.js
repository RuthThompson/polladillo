PollApp.Views.PollsResults = Backbone.View.extend({
  template: JST['polls/results'], 
  initialize: function (){
    var that = this; 
    this.listenTo(that.model, 'change', that.drawGraphs.bind(that));
    this.model.listenForUpdates();
  },
  render: function () {
    this.$el.html(this.template({poll: this.model}))
    this.alreadyDrawn = false;
    this.drawGraphs();
   
    return this
  },
  
  refreshGraphData: function () {
     var that = this;
     if(!that.alreadyDrawn){
       that.graphData = {
         questionsData: {}, 
         questionsLabels: {}
       };
     }
     that.model.get("questions").each(function(question){
       var questionData = [];
       var $questionLabel = $('<ul class="graph_label">');
      question.get("answers").each(function(answer){
        if(!that.alreadyDrawn){
          that.graphData[answer.id] = {}
          that.graphData[answer.id].color = '#'+Math.floor(Math.random()*16777215).toString(16)
          that.graphData[answer.id].label = answer.escape("value");
        }
        that.graphData[answer.id].value = answer.get('votes');
        
        questionData.push({
          value: that.graphData[answer.id].value, color: that.graphData[answer.id].color 
        })
         $label = $('<li class="data_label">')
                   .html('<span class="data_label_label">' + that.graphData[answer.id].label + '</span>')
                   .prepend('<span class="data_label_count" >(' + that.graphData[answer.id].value + ')</span>')
                   .prepend('<div class="data_label_color" style="background:' + that.graphData[answer.id].color + '">')
                   
                   .append('<span class="text_prompt" >Text Code: ' + answer.id + '</span>')
         $questionLabel.append($label)
      })
        
     that.graphData.questionsData[question.id] = questionData
     that.graphData.questionsLabels[question.id] = $questionLabel
    });
    
    that.alreadyDrawn = true;
    return (that.graphData)
  },
  
  drawGraphs: function(){
    var that = this;
    console.log(this)
    var gData = this.refreshGraphData()
    this.model.get("questions").each(function(question){
      var width = 400
      var $canvas = $('<canvas id="pieGraph' + question.id + '" width="200" height="200"></canvas>');
      var ctx = $canvas.get(0).getContext('2d');
      var $questionBox = that.$("#question_" + question.id + "_bar_graph")
      $questionBox.html($canvas);
      
      var data = gData.questionsData[question.id];
      var options = { 
          animation: false, 
      }
      new Chart(ctx).Pie(data, options)
      console.log(gData.questionsLabels[question.id])
      $questionBox.append(gData.questionsLabels[question.id])
    });
    
  }
  
});
