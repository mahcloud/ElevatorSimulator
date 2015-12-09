class Building < ActiveRecord::Base
  BASE_FLOOR = 1

  after_create :update_firebase

  validates :floors, presence: true, numericality: { greater_than: 0 }

  def update_firebase
    firebase = Firebase::Client.new('https://elevator-simulator.firebaseio.com/')
    json = {
      id => {
        floors: floors,
        elevators: []
      }
    }
    firebase.update('buildings', json)
  end
end
