class Building < ActiveRecord::Base
  validates :floors, numericality: { greater_than: 0 }
end
