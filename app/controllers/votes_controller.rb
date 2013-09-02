class VotesController < ApplicationController
  
  def create
    @votes = Vote.create(params[:votes])
    render :json => @votes
  end
  
end
