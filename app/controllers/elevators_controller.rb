class ElevatorsController < ApplicationController
  def create
    @elevator = Elevator.new(elevator_params)
    @elevator.current_floor = Building::BASE_FLOOR
    @elevator.occupied = false
    @elevator.floors_count = 0
    @elevator.trips_count = 0
    @elevator.save
  end

  private

  def elevator_params
    params.require(:elevator).permit(:building_id)
  end
end
