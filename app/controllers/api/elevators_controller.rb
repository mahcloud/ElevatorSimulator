class Api::ElevatorsController < ApplicationController
  def update
    @elevator = Elevator.find(params[:id])
    if @elevator.update(elevator_params)
      @status = 'success'
    else
      @status = 'failed'
    end
  end

  private

  def elevator_params
    params.require(:elevator).permit(:occupied)
  end
end
