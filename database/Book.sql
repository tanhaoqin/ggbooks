INSERT into admin values (DEFAULT, 'Nikhil', 'brahmin');
INSERT into admin values (DEFAULT, 'KangSheng', 'incpio');
INSERT into user values (DEFAULT, 'ks@gmail.com', 'pw1');
insert into customer(userID,creditcard) values(LAST_INSERT_ID(),'123412');
INSERT into user values (DEFAULT, 'ns@gmail.com', 'pw2');
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
update book set image_url='https://d1m60b4xe0f3nb.cloudfront.net/ddf8e60f/m/9781118951309.jpg'
where isbn13 like '9781118951309' ; 
update book set summary='Hands-on exercises help you learn to code like a pro\nNo coding experience is required for Coding For Dummies, your one-stop guide to building a foundation of knowledge in writing computer code for web, application, and software development. It doesn?t matter if you?ve dabbled in coding or never written a line of code, this book guides you through the basics. Using foundational web development languages like HTML, CSS, and JavaScript, it explains in plain English how coding works and why it\'s needed.\nOnline exercises developed by Codecademy, a leading online code training site, help hone coding skills and demonstrate results as you practice.\nThe site provides an environment where you can try out tutorials built into the text and see the actual output from your coding. You?ll also gain access to end-of-chapter challenges to apply newly acquired skills to a less-defined assignment. So what are you waiting for?\nThe current demand for workers with coding and computer science skills far exceeds the supply\nTeaches the foundations of web development languages in an easy-to-understand format\nOffers unprecedented opportunities to practice basic coding languages\nReaders can access online hands-on exercises and end-of-chapter assessments that develop and test their new-found skills\nIf you?re a student looking for an introduction to the basic concepts of coding or a professional looking to add new skills, Coding For Dummies has you covered.' 
where isbn13 like '9781118951309';
INSERT into book values ('9781118951309','Coding For Dummies','Nikhil Abraham',DEFAULT,'P',NULL,5,35.74,'Computing & Information Technology', ' John Wiley & Sons Inc',2000,DEFAULT);

INSERT into book values ('9780007179732','The Monk Who Sold His Ferrari','Robin S. Sharma',DEFAULT,'P',NULL,5,20.61,'Health', 'HarperCollins Publishers',2004,DEFAULT);
INSERT into book values ('9780571314263','Family Life','Akhil Sharma',DEFAULT,'H',NULL,5,29.25,'Fiction', 'Faber & Faber',2014,DEFAULT);



alter table book
add column image_url varchar(255);
alter table book
add column summary text;

update book set image_url='https://dut2up1aqgazz.cloudfront.net/3a33a793/m/9780380973651.jpg'
where isbn13 like '9780380973651' ; 
update book set summary='The storm was coming....\nShadow spent three years in prison, keeping his head down, doing his time. All he wanted was to get back to the loving arms of his wife and to stay out of trouble for the rest of his life. But days before his scheduled release, he learns that his wife has been killed in an accident, and his world becomes a colder place.\nOn the plane ride home to the funeral, Shadow meets a grizzled man who calls himself Mr. Wednesday. A self-styled grifter and rogue, Wednesday offers Shadow a job. And Shadow, a man with nothing to lose, accepts.\nBut working for the enigmatic Wednesday is not without its price, and Shadow soon learns that his role in Wednesday\'s schemes will be far more dangerous than he ever could have imagined. Entangled in a world of secrets, he embarks on a wild road trip and encounters, among others, the murderous Czernobog, the impish Mr. Nancy, and the beautiful Easter -- all of whom seem to know more about Shadow than he himself does.\nShadow will learn that the past does not die, that everyone, including his late wife, had secrets, and that the stakes are higher than anyone could have imagined.\nAll around them a storm of epic proportions threatens to break. Soon Shadow and Wednesday will be swept up into a conflict as old as humanity itself. For beneath the placid surface of everyday life a war is being fought -- and the prize is the very soul of America.\nAs unsettling as it is exhilarating, American Gods is a dark and kaleidoscopic journey deep into myth and across an America at once eerily familiar and utterly alien. Magnificently told, this work of literary magic will haunt the reader far beyond the final page.' 
where isbn13 like '9780380973651';

update book set image_url='https://dut2up1aqgazz.cloudfront.net/5678ca59/m/9780380789030.jpg'
where isbn13 like '9780380789030' ; 
update book set summary='Shadow is a man with a past. But now he wants nothing more than to live a quiet life with his wife and stay out of trouble. Until he learns that she\'s been killed in a terrible accident.\nFlying home for the funeral, as a violent storm rocks the plane, a strange man in the seat next to him introduces himself. The man calls himself Mr. Wednesday, and he knows more about Shadow than is possible.\nHe warns Shadow that a far bigger storm is coming. And from that moment on, nothing will ever he the same...' 
where isbn13 like '9780380789030';

update book set image_url='https://dut2up1aqgazz.cloudfront.net/2c78fb3b/m/9781474603041.jpg'
where isbn13 like '9781474603041' ; 
update book set summary='A young woman is making a living faking it as a cut-price psychic (with some illegal soft-core sex work on the side). She makes a decent wage mostly by telling people what they want to hear. But then she meets Susan Burke. Susan moved to the city one year ago with her husband and 15-year-old stepson Miles. They live in a Victorian house called Carterhook Manor. Susan has become convinced that some malevolent spirit is inhabiting their home. The young woman doesn\'t believe in exorcism or the supernatural. However when she enters the house for the first time, she begins to feel it too, as if the very house is watching her, waiting, biding its time ...The Grownup, which originally appeared as \'What Do You Do?\' in George R. R. Martin\'s Rogues anthology, proves once again that Gillian Flynn is one of the world\'s most original and skilled voices in fiction.' 
where isbn13 like '9781474603041';

update book set image_url='https://d1m60b4xe0f3nb.cloudfront.net/ddf8e60f/m/9781118951309.jpg'
where isbn13 like '9781118951309' ; 
update book set summary='Hands-on exercises help you learn to code like a pro\nNo coding experience is required for Coding For Dummies, your one-stop guide to building a foundation of knowledge in writing computer code for web, application, and software development. It doesn?t matter if you?ve dabbled in coding or never written a line of code, this book guides you through the basics. Using foundational web development languages like HTML, CSS, and JavaScript, it explains in plain English how coding works and why it\'s needed.\nOnline exercises developed by Codecademy, a leading online code training site, help hone coding skills and demonstrate results as you practice.\nThe site provides an environment where you can try out tutorials built into the text and see the actual output from your coding. You?ll also gain access to end-of-chapter challenges to apply newly acquired skills to a less-defined assignment. So what are you waiting for?\nThe current demand for workers with coding and computer science skills far exceeds the supply\nTeaches the foundations of web development languages in an easy-to-understand format\nOffers unprecedented opportunities to practice basic coding languages\nReaders can access online hands-on exercises and end-of-chapter assessments that develop and test their new-found skills\nIf you?re a student looking for an introduction to the basic concepts of coding or a professional looking to add new skills, Coding For Dummies has you covered.' 
where isbn13 like '9781118951309';

update book set image_url='https://dut2up1aqgazz.cloudfront.net/ee69db76/m/9781405925136.jpg'
where isbn13 like '9781405925136' ; 
update book set summary='From Lizzie Mary Cullen, the illustrator behind hit colouring book The Magical City, comes a brand new treat for the winter. Settle down by the fire and immerse yourself in this mesmerising new colouring book for adults. Join celebrations across the world and throughout the years, from skating at the Rockefeller Center to surfing in Sydney and frost fairs on the Thames to Victorian toy shops. Travel with the wise men following a star, spot Santa\'s sleigh skimming over the rooftops and discover dazzling gingerbread houses with Lizzie\'s intricate inky illustrations. Fans of mindfulness and art therapy will love this beautiful Christmas gift book. A whole world of festivity is waiting for you inside...' 
where isbn13 like '9781405925136';

update book set image_url='https://d1m60b4xe0f3nb.cloudfront.net/d4544f7d/m/9780571314263.jpg'
where isbn13 like '9780571314263' ; 
update book set summary='For eight-year-old Ajay Mishra and his older brother Birju, family life in Delhi in the late 1970s follows a comfortable, predictable routine: bathing on the roof, queuing for milk, playing day-long games of cricket in the street. Everything changes when their father finds a job in America, a land of carpets and elevators, swimsuits and hot water.' 
where isbn13 like '9780571314263';

update book set image_url='https://dut2up1aqgazz.cloudfront.net/51eac856/m/9780007179732.jpg'
where isbn13 like '9780007179732' ; 
update book set summary='An internationally bestselling fable about a spiritual journey, littered with powerful life lessons that teach us how to abandon consumerism in order to embrace destiny, live life to the full and discover joy. * This inspiring tale is based on the author\'s own search for life\'s true purpose, providing a step-by-step approach to living with greater courage, balance, abundance and joy. * It tells the story of Julian Mantle, a lawyer forced to confront the spiritual crisis of his out-of-balance life: following a heart attack, he decides to sell all his beloved possesions and trek to India. On a life-changing odyssey to an ancient culture, he meets Himalayan gurus who offer powerful, wise and practical lessons that teach us to: - Develop joyful thoughts - Follow our life\'s mission - Cultivate self-discipline and act courageously - Value time as our most important commodity - Nourish our relationships - Live fully, one day at a time' 
where isbn13 like '9780007179732';

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

select * from cart;

select book from orders o join orderItem oi where o.orderid=oi.orderid AND userId=4;

select * from orders o2 join orderItem oi2 join book b where o2.orderid=oi2.orderid AND oi2.book=b.isbn13 AND o2.orderid in
(select o1.orderid from orders o1 join orderItem oi1 where o1.orderid=oi1.orderid AND book in
(select book from orders o join orderItem oi where o.orderid=oi.orderid AND userId=4) AND o1.userID !=4) AND book not in 
(select book from orders o join orderItem oi where o.orderid=oi.orderid AND userId=4);


select * from cart;
select * from customer;
select * from rating;
select * from feedback;