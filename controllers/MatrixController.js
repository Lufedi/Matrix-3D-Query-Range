/**
 * Created by USER on 14/04/2017.
 *
 * Controller for Matrix endpoints, this links the matrix services with the controller that handles the request
 */


var matrixService = require("../services/MatrixService");

/**
 * Allows to update the values of a matrix
 *
 * @param req request received by the server
 * @param res response sent to requester
 */
exports.update_matrix = function (req, res) {
     matrixService.updateMatrix(req, res);
};

/**
 * Allows to query the sum of a range of values inside a matrix
 * @param req request received by the server
 * @param res response sent to requester
 */
exports.query_sum =  function (req, res) {

     matrixService.querySum(req, res);
};

/**
 * Create a new  matrix
 * @param req request received by the server
 * @param res response sent to requester
 */
exports.create_matrix = function (req, res) {

   matrixService.createMatrix(req, res);

};

/**
 * Retreive all the matrixes created
 * @param req request received by the server
 * @param res response sent to requester
 */
exports.get_all = function(req, res){
    matrixService.get_all(req, res);
};