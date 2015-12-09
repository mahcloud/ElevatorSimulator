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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151209172116) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "buildings", force: :cascade do |t|
    t.integer  "floors"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "elevators", force: :cascade do |t|
    t.integer  "building_id"
    t.integer  "current_floor"
    t.boolean  "occupied"
    t.integer  "floors_count"
    t.integer  "trips_count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "elevators", ["building_id"], name: "index_elevators_on_building_id", using: :btree
  add_index "elevators", ["current_floor"], name: "index_elevators_on_current_floor", using: :btree
  add_index "elevators", ["floors_count"], name: "index_elevators_on_floors_count", using: :btree
  add_index "elevators", ["occupied"], name: "index_elevators_on_occupied", using: :btree
  add_index "elevators", ["trips_count"], name: "index_elevators_on_trips_count", using: :btree

end
