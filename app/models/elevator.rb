class Elevator < ActiveRecord::Base
  validates :building_id, presence: true

  after_create :update_firebase

  belongs_to :building

  def update_firebase
    building.update_firebase
  end
end
