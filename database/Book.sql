INSERT into user values (DEFAULT, 'Nikhil', 'brahmin','a');
INSERT into user values (DEFAULT, 'KangSheng', 'incpio','a');
INSERT into user values (DEFAULT, 'ks@gmail.com', 'pw1','u');
insert into customer(userID,creditcard) values(LAST_INSERT_ID(),'123412');
INSERT into user values (DEFAULT, 'ns@gmail.com', 'pw2','u');
insert into customer(userID,creditcard) values(LAST_INSERT_ID(),'876543');

INSERT into book values ('9780380973651','American Gods','Neil Gaiman',DEFAULT,'H',NULL,5,41.47,'Fiction', 'HarperCollins Publishers Inc',2000,DEFAULT);
INSERT into book values ('9780380789030','American Gods','Neil Gaiman',DEFAULT,'P',NULL,5,15.68,'Fiction', 'HarperCollins Publishers Inc',2002,DEFAULT);

INSERT into book values ('9781474603041','The Grownup','Gillian Flynn',DEFAULT,'P',NULL,5,9.53,'Fiction', 'Orion Publishing Co',2015,DEFAULT);
INSERT into book values ('9781405925136','The Magical Christmas','Lizzie Mary Cullen',DEFAULT,'P',NULL,5,22.69,'Craft & Hobbies', 'Penguin Books Ltd',2015,DEFAULT);
INSERT into book values ('9781760113636','Neurotribes','Steve Silberman',DEFAULT,'H',NULL,5,36.61,'Psychology', 'Allen & Unwin',2015,DEFAULT);
INSERT into book values ('9781780746357','A Brief History of Seven Killings','Marlon James',DEFAULT,'P',NULL,5,23.64,'Fiction', 'Oneworld Publications',2015,DEFAULT);

INSERT into book values ('9781782117896','A Boy Called Christmas','Matt Haig',DEFAULT,'H',NULL,5,27.36,'Children\'s Books', 'Canongate Books Ltd',2015,DEFAULT);
INSERT into book values ('9781473698888','The Bazaar of Bad Dreams','Stephen King',DEFAULT,'H',NULL,5,43.57,'Fiction', 'Hodder & Stoughton General Division',2015,DEFAULT);
INSERT into book values ('9780115533426','The Official Highway Code 2015','Driver and Vehicle Standards Agency (DVSA)',DEFAULT,'P',NULL,5,9.02,'Self-help', 'TSO',2015,DEFAULT);
INSERT into book values ('9781846683800','SPQR: A History of Ancient Rome','Mary Beard',DEFAULT,'H',NULL,5,52.08,'History', 'Profile Books Ltd',2015,DEFAULT);
INSERT into book values ('9781118951309','Coding For Dummies','Nikhil Abraham',DEFAULT,'P',NULL,5,35.74,'Computing & Information Technology', ' John Wiley & Sons Inc',2000,DEFAULT);

INSERT into book values ('9780007179732','The Monk Who Sold His Ferrari','Robin S. Sharma',DEFAULT,'P',NULL,5,20.61,'Health', 'HarperCollins Publishers',2004,DEFAULT);
INSERT into book values ('9780571314263','Family Life','Akhil Sharma',DEFAULT,'H',NULL,5,29.25,'Fiction', 'Faber & Faber',2014,DEFAULT);

INSERT into feedback values (DEFAULT,DEFAULT,7,NULL,3,'9780380973651',DEFAULT);
INSERT into feedback values (DEFAULT,DEFAULT,9,NULL,4,'9780380973651',DEFAULT);

INSERT into rating values (3,2,3);

INSERT into cart values ('9780380973651',3,DEFAULT);
INSERT into cart values ('9780380973651',4,DEFAULT);
INSERT into cart values ('9780571314263',3,DEFAULT);
INSERT into cart values ('9781118951309',3,DEFAULT);
select * from cart;

insert into orders 
values (default, default, default, 4, 
(select sum(b.price)*c.quantity from book b join cart c where b.isbn13=c.book and c.userID=4),
'876543');
insert into orderItem 
select o.orderid, c.book,c.quantity from orders o join cart c where o.userID=c.userID;
delete from cart where userID=4;

select * from book b join cart c where c.book=b.isbn13 and userID=3;

select * from book where title like '%Neil%' or author like '%Neil%';
select fbID,date,score,comment,userID from  feedback where book like '9780380973651';
select * from user u where u.email='ks@gmail.com' and u.password='pw1';

select * from feedback where book like '9780380973651' ORDER BY avgUseful DESC  LIMIT 1, 10;

select * from orders o join orderItem oi join book b where oi.book=b.isbn13 AND o.orderId=oi.orderId AND o.userID= 3;
select * from feedback f join book b where f.book=b.isbn13 AND f.userID = 3;

select * from orders o join orderItem oi join book b 
where oi.book=b.isbn13 AND o.orderId=oi.orderId AND o.userID in
(SELECT customer.userID
FROM (customer INNER JOIN (orders INNER JOIN orderItem))
WHERE orderItem.book = '9780380973651');


select book from orders o join orderItem oi where o.orderid=oi.orderid AND userId=4;

select * from orders o2 join orderItem oi2 join book b where o2.orderid=oi2.orderid AND oi2.book=b.isbn13 AND o2.orderid in
(select o1.orderid from orders o1 join orderItem oi1 where o1.orderid=oi1.orderid AND book in
(select book from orders o join orderItem oi where o.orderid=oi.orderid AND userId=4) AND o1.userID !=4);


select * from cart;
select * from customer;
select * from rating;
select * from feedback;