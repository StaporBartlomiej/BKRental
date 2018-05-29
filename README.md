#Car rental application

###Query to create database below:

```create database pai_group_project;
use pai_group_project;
```

```
create table user(
	id int not null auto_increment,
    firstName varchar(200) not null,
    lastName varchar(200) not null,
   ``` age int,
   ``` idCardNumber VARCHAR(9) NOT NULL UNIQUE CHECK (IDNumber LIKE '^[A-Z]{3}[0-9]{6}$'),
   ``` email varchar(200) not null,
   ``` phone int(9) not null,
   ``` primary key(id)
);```
```

```
create table reservations(
	id int not null auto_increment,
    userId int not null references user(id),
    userFirstName varchar(200) not null references user(firstName),
    userLastName varchar(200) not null references user(lastName),
    age int not null references user(age),
    dCardNumber VARCHAR(9) NOT NULL references user(idCardNumber),
    email varchar(200) not null references user(email),
    phone int(9) not null,
    bookInDate Date not null,
    bookOutDate Date not null,
    totalPrice int not null,
    isApprovedByAdmin tinyint default 0,
    bookInPlace varchar(200) not null,
    bookOutPlace varchar(200) not null,
    primary key(id),
    foreign key (userId) references user(id) on delete cascade on update cascade
);
```

```
create table cars(
	id int not null auto_increment,
    carType varchar(50) not null,
    costClass varchar(5) not null,
    carName varchar(100) not null,
    pricePerDay int not null,
    airConditioning tinyint not null default 0,
    numberOfSeats tinyint not null default 4,
    engineType varchar(20) not null default "Benzyna",
    transmission varchar(20) not null default "Manualna",
    bluetooth tinyint not null default 0,
    imageLink varchar(200) not null,
    primary key(id),
    foreign key (userId) references user(id) on delete cascade on update cascade
);
```

```
create table cars(
	id int not null auto_increment,
    carType varchar(50) not null,
    costClass varchar(5) not null,
    carName varchar(100) not null,
    pricePerDay int not null,
    airConditioning tinyint not null default 0,
    numberOfSeats tinyint not null default 4,
    engineType varchar(20) not null default "Benzyna",
    transmission varchar(20) not null default "Manualna",
    bluetooth tinyint not null default 0,
    imageLink varchar(200) not null,
	ownerId int default NULL references user(id),
    primary key(id)
);
```