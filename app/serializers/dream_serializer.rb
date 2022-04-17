class DreamSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :date
  has_one :user
end
