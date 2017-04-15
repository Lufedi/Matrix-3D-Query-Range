/**
 * Created by USER on 13/04/2017.
 */
/**
 * Model used to map the objects saved in our database
 * @type {*}
 */


var db = require('../persistence/config/db');

var MatrixSchema = db.Schema({
    user : String,
    matrix : [{}],
    x:String,
    y:String,
    z: String
});

var Matrix = db.model('Matrix', MatrixSchema );

module.exports =  Matrix;

