PollApp.Views.PollsForm = Backbone.View.extend({
  events: {
    "click #savePoll": "savePoll", 
    "click #addQuestion": "addQuestion", 
    "click .addAnswer": "addAnswer", 
    "click .removeAnswer": "removeAnswer", 
    "click .removeQuestion": "removeQuestion"
  }, 

  template: JST['polls/form'], 
  
  render: function () {
    this.$el.html(this.template({poll: this.model}));
    return this
  },
  
  savePoll: function (event) {
    event.preventDefault();
    data = $("#editPoll").serializeJSON();
    var opts = {
       success: function (data) {
         Backbone.history.navigate("#/users/" + PollApp.currentUser.id)
        }, 
        error: function (responseObj) {
          console.log("failure -- ruth make an errors view");
          console.log(responseObj);
        }
    }
    PollApp.currentUserPolls.create(data.poll, opts)
  },
  
  addQuestion: function (event) {
    console.log($(event.target).data("question-num"))
    var questionNum = $(event.target).data("question-num") + 1
    $(event.target).data("question-num", questionNum)
    if(questionNum !== questionNum ){
      questionNum = 0;
    }
    var question = new PollApp.Models.Question() //just need a blank question for the form
    var $li = JST["polls/question_form_part"]({question: question, questionNum: questionNum})
    $("ul#questions").append($li)
  },
  
  addAnswer: function (event) {
    var questionNum = $(event.target).data("question-num");
    var $answerUl = $("#answers-" + questionNum);
    var answerNum = $answerUl.find("li").last().data("answer-num")
    if(answerNum == null){
       answerNum = 0;
    }else{
      answerNum ++;
    }
    var answer = new PollApp.Models.Answer() //just need a blank answer for the form
    var $li = JST["polls/question_answer_form_part"]({answer: answer, questionNum: questionNum, answerNum: answerNum})
    $answerUl.append($li)
  }, 
  
  removeQuestion: function (event) {
    var questionNum = $(event.target).data("question-num");
    var $questionLi = $("#questions li[data-question-num='" + questionNum +"']");
    $questionLi.addClass("hidden");
    var $deleteInput = $('<input type="hidden" name="poll[questions_attributes][' + questionNum + '][_destroy]" value="true" >')
    $questionLi.append($deleteInput);
  }, 
  
  removeAnswer: function (event) {
    var questionNum = $(event.target).data("question-num");
    var answerNum = $(event.target).data("answer-num");
    var $answerLi = $("#answers-" + questionNum + " li[data-answer-num='" + answerNum +"']" );
    $answerLi.addClass("hidden");
    var $deleteInput = $('<input type="hidden" name="poll[questions_attributes][' + questionNum + '][answers_attributes]['+ answerNum +'][_destroy]" value="true" >')
    $answerLi.append($deleteInput);
  },
  
  
  
  
  
  // addQuestion: function (event) {
  //    if(!this.model.get("questions")){
  //      this.model.set("questions", new PollApp.Collections.Questions());
  //    }
  //    this.model.get("questions").add({});
  //    this.render();
  //  }, 
  //  
  //  addAnswer: function (event) {
  //    var question_num = parseInt($(event.target).data("question-num"))
  //    question = this.model.get("questions").at(question_num)
  //    if(!question.get("answers")){
  //      question.set("answers", new PollApp.Collections.Answers());
  //    }
  //    question.get("answers").add({});
  //    this.render();
  //  }
 
});
