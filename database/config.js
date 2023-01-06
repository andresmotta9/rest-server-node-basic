const mongoose = require('mongoose');


const dbConenction = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('Data base online');
  } catch (error) {
    throw new Error('There was an error with the database');
  }
}

module.exports = {
  dbConenction
}