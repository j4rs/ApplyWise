# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_11_22_002054) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "board_cards", force: :cascade do |t|
    t.integer "partition_id", null: false
    t.string "slug", null: false
    t.integer "position", null: false
    t.bigint "board_column_id", null: false
    t.bigint "job_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_column_id"], name: "index_board_cards_on_board_column_id"
    t.index ["job_id"], name: "index_board_cards_on_job_id"
    t.index ["partition_id", "slug"], name: "index_board_cards_on_partition_id_and_slug"
    t.index ["partition_id"], name: "index_board_cards_on_partition_id"
    t.index ["slug"], name: "index_board_cards_on_slug", unique: true
  end

  create_table "board_columns", force: :cascade do |t|
    t.integer "partition_id", null: false
    t.string "slug", null: false
    t.string "name", null: false
    t.integer "position", null: false
    t.string "color"
    t.bigint "board_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "collapsed", default: false
    t.index ["board_id"], name: "index_board_columns_on_board_id"
    t.index ["partition_id", "slug"], name: "index_board_columns_on_partition_id_and_slug"
    t.index ["partition_id"], name: "index_board_columns_on_partition_id"
    t.index ["slug"], name: "index_board_columns_on_slug", unique: true
  end

  create_table "boards", force: :cascade do |t|
    t.integer "partition_id", null: false
    t.string "purpose", default: "jobs", null: false
    t.string "slug", null: false
    t.bigint "talent_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["partition_id", "slug"], name: "index_boards_on_partition_id_and_slug"
    t.index ["partition_id"], name: "index_boards_on_partition_id"
    t.index ["slug"], name: "index_boards_on_slug", unique: true
    t.index ["talent_id", "purpose"], name: "index_boards_on_talent_id_and_purpose", unique: true
    t.index ["talent_id"], name: "index_boards_on_talent_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.integer "partition_id", null: false
    t.string "slug", null: false
    t.string "role", null: false
    t.string "company_name"
    t.text "description"
    t.string "url"
    t.string "color"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["partition_id", "slug"], name: "index_jobs_on_partition_id_and_slug"
    t.index ["partition_id"], name: "index_jobs_on_partition_id"
    t.index ["slug"], name: "index_jobs_on_slug", unique: true
  end

  create_table "signed_messages", force: :cascade do |t|
    t.string "slug", null: false
    t.string "purpose", null: false
    t.string "token", null: false
    t.datetime "read_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["purpose"], name: "index_signed_messages_on_purpose"
    t.index ["slug"], name: "index_signed_messages_on_slug", unique: true
    t.index ["token"], name: "index_signed_messages_on_token", unique: true
  end

  create_table "talents", force: :cascade do |t|
    t.string "slug", null: false
    t.string "email", null: false
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_talents_on_slug", unique: true
  end

  add_foreign_key "board_cards", "board_columns"
  add_foreign_key "board_columns", "boards"
  add_foreign_key "boards", "talents"
end
