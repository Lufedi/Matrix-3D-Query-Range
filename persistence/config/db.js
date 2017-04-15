/**
 * Created by USER on 13/04/2017.
 */
/**
 * Configure the database connection using mongodb driver and mongoose ORM
 * @type {*}
 */



var mongoose = require('mongoose');

var mongoDB = "mongodb://rappiprueba:rappiprueba@ds161400.mlab.com:61400/rappi-back";
mongoose.connect(mongoDB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;