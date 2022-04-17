class User < ApplicationRecord
  has_many :dreams
  has_secure_password
  validates :username, presence: true, uniqueness: true, length: { minimum: 3 }
end
