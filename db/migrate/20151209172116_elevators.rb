class Elevators < ActiveRecord::Migration
  def change
    create_table :buildings do |t|
      t.integer :floors

      t.timestamps
    end

    create_table :elevators do |t|
      t.integer :building_id
      t.integer :current_floor
      t.boolean :occupied
      t.integer :floors_count
      t.integer :trips_count

      t.timestamps
    end

    add_index :elevators, :building_id
    add_index :elevators, :current_floor
    add_index :elevators, :occupied
    add_index :elevators, :floors_count
    add_index :elevators, :trips_count
  end
end
