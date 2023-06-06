npm init --y
npm i dotenv express nodemon sequelize
npm install --save pg pg-hstore
npm install -D sequelize-cli
npx sequelize init
npx sequelize db:create
npm install  cors
npm install date-fns express-async-errors
npm install b-crypt


#Create model, #reformat migration to include underscores and set traits of column accordingly

npx sequelize model:generate --name user --attributes username:string,password:string
npx sequelize model:generate --name task --attributes task:string,userId:integer,done:boolean,file:string
npx sequelize db:migrate:undo
npx sequelize db:migrate


#seeding data
npx sequelize seed:generate --name seed-tasks
npx sequelize db:seed --seed 20230606094728-seed-tasks.js

##ubuntu pg admin commands
sudo service postgresql start
sudo su postgres
psql boxybox
\l
\c seagroup-case


##ubuntu pg admin commands
sudo service postgresql start
sudo su postgres
psql boxybox
\l
\c rocketship


## The .sequelizerc file is a configuration file used by Sequelize, a popular Object-Relational Mapping (ORM) library for Node.js. Sequelize simplifies database interactions by providing an abstraction layer that allows developers to work with relational databases using JavaScript.


## Include how to install postgres