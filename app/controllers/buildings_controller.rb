class BuildingsController < ApplicationController
  def index
    @buildings = Building.all
  end

  def new
    @building = Building.new
  end

  def show
    @building = Building.find(params[:id])
  end

  def create
    @building = Building.new(building_params)
    if @building.save
      redirect_to building_path(@building)
    else
      render 'new'
    end
  end

  private

  def building_params
    params.require(:building).permit(:floors)
  end
end