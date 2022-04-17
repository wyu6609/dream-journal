class DreamsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    render json: @current_user.dreams.all
  end

  def create
    new_dream = @current_user.dreams.create!(dream_params)
    render json: new_dream, status: :created
  end

  def update
    selected_dream = @current_user.dreams.find(params[:id])
    selected_dream.update!(dream_params)
    render json: selected_dream, status: :accepted
  end

  def destroy
    selected_dream = @current_user.dreams.find(params[:id])
    selected_dream.destroy
    head :no_content
  end

  private

  def render_not_found_response
    render json: { error: 'Dream not found' }, status: :not_found
  end

  def dream_params
    params.permit(:title, :description, :date)
  end
end
