# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130831212227) do

  create_table "answers", :force => true do |t|
    t.integer  "question_id", :null => false
    t.string   "value",       :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "answers", ["question_id"], :name => "index_answers_on_question_id"

  create_table "polls", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.string   "title",      :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "polls", ["user_id"], :name => "index_polls_on_user_id"

  create_table "questions", :force => true do |t|
    t.integer  "poll_id",    :null => false
    t.text     "value",      :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "questions", ["poll_id"], :name => "index_questions_on_poll_id"

  create_table "users", :force => true do |t|
    t.string   "email",         :null => false
    t.string   "username",      :null => false
    t.string   "password_hash", :null => false
    t.string   "session_token", :null => false
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "users", ["email", "password_hash"], :name => "index_users_on_email_and_password_hash"
  add_index "users", ["session_token"], :name => "index_users_on_session_token"

  create_table "votes", :force => true do |t|
    t.integer  "answer_id",  :null => false
    t.integer  "voter_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "votes", ["answer_id"], :name => "index_votes_on_answer_id"

end