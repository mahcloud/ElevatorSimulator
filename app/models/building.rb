class Building < ActiveRecord::Base
  BASE_FLOOR = 1

  after_create :update_firebase

  validates :floors, presence: true, numericality: { greater_than: 0 }

  has_many :elevators

  def update_firebase
    firebase = Firebase::Client.new('https://elevator-simulator.firebaseio.com/')
    json = {
      id => {
        floors: floors,
        elevators: []
      }
    }

    elevators.each do |elevator|
      json[id][:elevators] << {
        elevator_id: elevator.id,
        current_floor: elevator.current_floor,
        occupied: elevator.occupied,
        floors_count: elevator.floors_count,
        trips_count: elevator.trips_count
      }
    end

    firebase.update('buildings', json)
  end
end
