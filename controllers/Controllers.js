/**
 * Created by USER on 13/04/2017.
 */



"use strict";

var matrixService = require("../services/MatrixService");

/**
 *
 * @param app
 */
function MatrixController(app){

    /**
     *
     */
    app.put('/api/matrix/', function (req, res) {
        var result = matrixService.updateMatrix(req.body);
        res.send(result);
    });

    /**
     *
     */
    app.get('/api/matrix/query/:user/:x1/:y1/:z1/:x2/:y2/:z2', function (req, res) {
        console.log("query");
        matrixService.querySum(req, res);

    });

    /**
     *
     */
    app.post('/api/matrix', function (req, res) {
        var result = matrixService.createMatrix(req.body);
        res.send(result);
    });

    /**
     *
     */
  }

module.exports   =  MatrixController;