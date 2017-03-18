DROP TABLE if EXISTS Markers;

CREATE TABLE Markers (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL,
  address VARCHAR(80) NOT NULL,
  lat FLOAT(10, 6) NOT NULL,
  lng FLOAT(10, 6) NOT NULL,
  type VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
) ENGINE = MYISAM ;

INSERT INTO Markers(name, address, lat, lng, type)
VALUES 
	('Love.Fish', '580 Darling Street, Rozelle, NSW', '-33.861034', '151.171936', 'restaurant'),
	('Young Henrys', '76 Wilford Street, Newtown, NSW', '-33.898113', '151.174469', 'bar'),
	('Hunter Gatherer', 'Greenwood Plaza, 36 Blue St, North Sydney NSW', '-33.840282', '151.207474', 'bar'),
	('The Potting Shed', '7A, 2 Huntley Street, Alexandria, NSW', '-33.910751', '151.194168', 'bar'),
	('Nomad', '16 Foster Street, Surry Hills, NSW', '-33.879917', '151.210449', 'bar'),
	('Three Blue Ducks', '43 Macpherson Street, Bronte, NSW', '-33.906357', '151.263763', 'restaurant'),
	('Single Origin Roasters', '60-64 Reservoir Street, Surry Hills, NSW', '-33.881123', '151.209656', 'restaurant'),
	('Red Lantern', '60 Riley Street, Darlinghurst, NSW', '-33.874737', '151.215530', 'restaurant');
