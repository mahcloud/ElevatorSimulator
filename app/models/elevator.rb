class Elevator < ActiveRecord::Base
  validates :building_id, presence: true

  after_create :update_firebase

  def update_firebase
    firebase = Firebase::Client.new("https://elevator-simulator.firebaseio.com/buildings/#{building_id}/")
    json = {
      id => {
        current_floor: current_floor,
        occupied: occupied,
        floors_count: floors_count,
        trips_count: trips_count
      }
    }
    firebase.update('elevators', json)
  end
end
