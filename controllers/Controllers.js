/**
 * Created by USER on 13/04/2017.
 */
/**
 * This Controller handles all the requests made to the app and routes them to their specific service
 */


"use strict";

var matrix_controller = require('./MatrixController');

/**
 *
 * @param app
 */
function Controllers(app){

    /**
     * Update the values of a matrix
     */
    app.put('/api/matrix/', matrix_controller.update_matrix);

    /**
     *Query for the sum of a range in the matrix
     * @param user user that owns the matrix
     * @param x1 limit x1
     * @param y1 limit y1
     * @param z1 limit z1
     * @param x2 limit x1
     * @param y2 limit y1
     * @param z2 limit z1
     *
     */
    app.get('/api/matrix/query/:user/:x1/:y1/:z1/:x2/:y2/:z2', matrix_controller.query_sum );

    /**
     *Create a new matrix
     */
    app.post('/api/matrix', matrix_controller.create_matrix);

    /**
     *Retrieve all the matrixes created
     */
    app.get('/api/matrix', matrix_controller.get_all);
  }

module.exports   =  Controllers;