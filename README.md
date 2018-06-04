# Car rental application

### Database tables are defined as models in sequelize:
##Sequelize
To create basic configuration(only when building brand new project):

```
sequelize init
```

To create new model(terminal command):

```
./node_modules/.bin/sequelize model:create --name nameOfTableInDatabase --attributes attr1:type, attr2:type
```

Cars:

```
./node_modules/.bin/sequelize model:create --name cars --attributes car_type:string,cost_class:string,car_name:string,price_per_day:integer,air_conditioning:boolean,number_of_seats:integer,engine_type:string,transmission:string,bluetooth:boolean

```

User
```
./node_modules/.bin/sequelize model:create --name user --attributes firstName:string, lastName:string, age:integer, idCardNumber:string, email:string,phone:integer
```

### Issues
Sequelize
Unable to resolve sequelize package in [path]
https://github.com/sequelize/cli/issues/104

Solved by:

npm install sequelize


### Tutorials
**Sequelize**:

https://arjunphp.com/build-restful-api-using-node-express-sequelize/