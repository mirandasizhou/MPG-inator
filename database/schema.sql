DROP DATABASE mpg;
CREATE DATABASE mpg;

USE mpg;

CREATE TABLE evs (
  id INT NOT NULL AUTO_INCREMENT,
  make VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  bat_cap INT NOT NULL,
  tot_miles INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE gas (
  id INT NOT NULL AUTO_INCREMENT,
  state_abbr VARCHAR(255) NOT NULL,
  gas_price DECIMAL(4, 3) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE electric (
  id INT NOT NULL AUTO_INCREMENT,
  state_abbr VARCHAR(255) NOT NULL,
  elec_price DECIMAL(10, 3) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE states (
  id INT NOT NULL AUTO_INCREMENT,
  state_abbr VARCHAR(255) NOT NULL,
  gas_priceid INT NOT NULL,
  elec_priceid INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (gas_priceid) REFERENCES gas(id),
  FOREIGN KEY (elec_priceid) REFERENCES electric(id)
);