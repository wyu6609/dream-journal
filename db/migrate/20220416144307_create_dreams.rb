class CreateDreams < ActiveRecord::Migration[7.0]
  def change
    create_table :dreams do |t|
      t.references :user
      t.string :title
      t.string :description
      t.string :date
      t.timestamps
    end
  end
end
