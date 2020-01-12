CREATE TABLE items (
  	item_id serial,
  	user_id serial,
  	item_name varchar(128) not NULL,
  	category VARCHAR(64) not NULL,
  	description TEXT not NULL,
  	images_json json not NULL,
  	FOREIGN key (user_id) REFERENCES users(id),
  	PRIMARY KEY (item_id)
)