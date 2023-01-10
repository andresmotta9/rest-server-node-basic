const express = require('express');
const cors = require('cors');
const { dbConenction } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';

    //Connect to DB
    this.connectDB();

    //Middlewares
    this.middlewares();

    //Application's routes
    this.routes();
  }

  async connectDB() {
    await dbConenction();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Body read and parse
    this.app.use(express.json());

    //Public folder
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usersPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running in port ', this.port);
    });
  }
}

module.exports = Server;