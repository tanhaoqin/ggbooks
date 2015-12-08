create database NikhilReads;
use NikhilReads;

CREATE TABLE book(
	isbn13 char(13) PRIMARY KEY,
    title varchar(255) NOT NULL,
    author varchar(100),
    dateArrival DATETIME DEFAULT CURRENT_TIMESTAMP,
    format char(1),
    keywords varchar(20),
    copies int UNSIGNED NOT NULL DEFAULT 0,
    price decimal(7,2) UNSIGNED NOT NULL DEFAULT 0.00,
    subject varchar(255),
    publisher varchar(100),
    year int,
    image_url varchar(255),
    summary text,
    avgScore decimal(2,1) UNSIGNED NOT NULL DEFAULT 0
);

CREATE TABLE admin(
	id int auto_increment PRIMARY KEY,
    username varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);

CREATE TABLE user(
	userID int auto_increment PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    fullname varchar(255),
    creditcard varchar(16),
    addressid varchar(255),
    phone varchar(50)
);

CREATE TABLE orders(
	orderid int auto_increment PRIMARY KEY,
    status tinyint NOT NULL DEFAULT 0,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    userID int NOT NULL,
    totalcost decimal(7,2) NOT NULL DEFAULT 0.00,
    creditcard varchar(16) NOT NULL,
    FOREIGN KEY (userID) REFERENCES user(id)
);

CREATE TABLE orderItem(
	orderId int NOT NULL,
	book char(13) NOT NULL,
    quantity int NOT NULL,
    PRIMARY KEY (orderId, book),
    FOREIGN KEY (orderid) REFERENCES orders(orderid),
    FOREIGN KEY (book) REFERENCES book(isbn13)
);

CREATE TABLE feedback(
	fbID int auto_increment PRIMARY KEY,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    score tinyint NOT NULL,
    comment text,
    userID int NOT NULL,
    book char(13) NOT NULL,
    avgUseful decimal(2,1) UNSIGNED NOT NULL DEFAULT 0,
    UNIQUE (userID, book),
    FOREIGN KEY (userID) REFERENCES user(id),
    FOREIGN KEY (book) REFERENCES book(isbn13)
);

CREATE TABLE rating(
	usefulness tinyint NOT NULL,
    fbID int,
    userID int,
    PRIMARY KEY (userID, fbID),
    FOREIGN KEY (userID) REFERENCES user(id),
    FOREIGN KEY (fbID) REFERENCES feedback(fbID)
);

CREATE TABLE cart(
    book char(13),
    userID int,
    quantity int not null default 1,
    PRIMARY KEY (userID, book),
    FOREIGN KEY (userID) REFERENCES user(id),
    FOREIGN KEY (book) REFERENCES book(isbn13)
);

DELIMITER $$
CREATE TRIGGER avg_score 
AFTER INSERT ON feedback
FOR EACH ROW
BEGIN 
	UPDATE book
	SET avgScore = (SELECT AVG(score) from feedback where feedback.book=book.isbn13)
    WHERE isbn13=NEW.book;
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER avg_useful 
AFTER INSERT ON rating
FOR EACH ROW
BEGIN 
	UPDATE feedback
	SET avgUseful = (SELECT AVG(usefulness) from rating where rating.fbID=feedback.fbID)
    WHERE fbID=NEW.fbID;
END $$
DELIMITER ;
   
DELIMITER $$
CREATE TRIGGER rating_own 
BEFORE INSERT ON rating
FOR EACH ROW
BEGIN
    IF NEW.userID = (select userID from feedback where fbID=NEW.fbID) THEN
		signal sqlstate '45000'
        SET MESSAGE_TEXT = 'Cannot rate your own feedback';
    END IF;
END $$
DELIMITER ;