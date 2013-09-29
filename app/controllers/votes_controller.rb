class VotesController < ApplicationController
  
  def create
    unless params[:votes].nil?
      answer_ids = params[:votes].map{ |vote| vote[:answer_id] }
      
      #TODO: make this an option for poll makers -- guard against double voting by cookie or by ip
      # (ip is probematic for lectures as all users will be on the same ip, but cookies are easier to get around)
      # if ip_already_voted?(params[:votes].map{ |vote| vote[:answer_id] }, request.remote_ip)
      #   errors = { errors => "sorry, you can only vote once on each question" }
      #   render :json => errors, :status => 422
      # # else

      
      if cookie_already_voted?(answer_ids)
        errors = { errors => "sorry, you can only vote once on each question" }
        render :json => errors, :status => 422
      else
        @votes = Vote.create(params[:votes])
        push_notification_to_poll(@votes.first.poll)
        ip_addresses = []
        @votes.each do |vote|
          ip_addresses << {:question_id => vote.question.id, :ip_address => request.remote_ip}
        end
        set_voted_on_cookies(answer_ids)
        IpAddress.create(ip_addresses)
        render :json => @votes
      end
    else
      errors = {errors => ["You must vote on at least one question"]}
      render :json => errors, :status => 422
    end
  end
  
  def from_text
    if(phone_already_voted?(params[:Body].to_i, params[:From]))
       twiml = Twilio::TwiML::Response.new do |r|
            r.Sms "Sorry, You can only vote once on each question. -- Polladillo"
        end
        text = twiml.text
        render :text => text
    else
      answer = Answer.find(params[:Body].to_i)
      if answer
        Vote.create({:answer_id => answer.id}) 
        push_notification_to_poll(answer.poll)
        PhoneNumber.create({ :phone_number => params[:From], :question_id => answer.question.id })
        twiml = Twilio::TwiML::Response.new do |r|
            r.Sms "Thanks for voting! -- Polladillo"
        end
        text = twiml.text
        render :text => text
      else
        render :nothing => true
      end
    end
  end
  
  private
  
  def ip_already_voted?(answer_ids, ip_address)
   answers = Answer.includes(:ip_addresses).find(answer_ids)
   answers.each do |answer| 
     answer.ip_addresses.each { |ip_a| return true if ip_a.ip_address == ip_address }
   end
   return false
  end
  
  def phone_already_voted?(answer_id, phone_number)
    answer = Answer.includes(:phone_numbers).find(answer_id)
    answer.phone_numbers.each { |p| return true if p.phone_number == phone_number }
    return false
  end
  
  def set_voted_on_cookies(answer_ids)
    answers = Answer.includes(:question).find(answer_ids)
    answers.each do |answer|
      cookies["voted_on_#{answer.question_id}".to_sym] = 'true'
    end
  end
  
  def cookie_already_voted?(answer_ids)
     answers = Answer.includes(:question).find(answer_ids)
     answers.each do |answer| 
        return true if cookies["voted_on_#{answer.question_id}".to_sym] == 'true'
     end
     false
  end
  
  def push_notification_to_poll(poll)
    @poll = poll
    poll_id = @poll.id
    poll_data = Rabl.render(@poll, "show", :view_path => 'app/views/polls', :format => :json)
    Pusher.url = "http://#{ENV['PUSHER_KEY']}:#{ENV['PUSHER_SECRET']}@api.pusherapp.com/apps/#{ENV['PUSHER_APP_ID']}"
    Pusher["poll_#{poll_id}"].trigger('updated', { :poll => poll_data })
  end
  
end
