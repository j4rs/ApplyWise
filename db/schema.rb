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

ActiveRecord::Schema[8.0].define(version: 2024_12_13_134600) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

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
    t.string "name"
    t.index ["partition_id", "slug"], name: "index_boards_on_partition_id_and_slug"
    t.index ["partition_id"], name: "index_boards_on_partition_id"
    t.index ["slug"], name: "index_boards_on_slug", unique: true
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
    t.jsonb "preferences"
    t.text "description"
    t.string "country"
    t.string "language"
    t.index ["slug"], name: "index_talents_on_slug", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "board_cards", "board_columns"
  add_foreign_key "board_columns", "boards"
  add_foreign_key "boards", "talents"
end
