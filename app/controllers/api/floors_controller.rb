class Api::FloorsController < ApplicationController
  before_action :set_building, :set_floor

  def create
    @status = 'No available elevators'
    elevator = @building.elevators.where('trips_count <= 100').where(occupied: false).order("abs(#{@floor} - elevators.current_floor) ASC").first
    return if elevator.nil?
    elevator.floors_count += (elevator.current_floor - @floor).abs
    elevator.trips_count += 1
    elevator.occupied = true
    elevator.current_floor = @floor
    elevator.save
    @status = 'success'
  end

  private

  def set_building
    @building = Building.find(params[:building_id])
  end

  def set_floor
    @floor = params[:floor].to_i
    @floor = Building::BASE_FLOOR if @floor < Building::BASE_FLOOR
    @floor = @building.floors if @floor > @building.floors
  end
end
