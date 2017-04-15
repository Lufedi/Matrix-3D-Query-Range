/**
 * Created by USER on 13/04/2017.
 */

/**
 * Process all the logic over Matrix model
 */

var Matrix = require("../models/Matrix");


/**
 *
 * query the sum of a range of values inside a matrix
 * @param req
 * @param req.body.params.x1 coord
 * @param req.body.params.y1 coord
 * @param req.body.params.z1 coord
 * @param req.body.params.x2 coord
 * @param req.body.params.y2 coord
 * @param req.body.params.z2 coord
 * @param res
 */
module.exports.querySum = function (req, res) {
    function sumData(matrix, x1, y1, z1, x2, y2, z2) {
        var totalSum = 0;
        for (var i = x1; i <= x2; i++) {
            for (var j = y1; j <= y2; j++) {
                for (var k = z1; k <= z2; k++) {
                    totalSum += parseInt(matrix[i][j][k]);
                }
            }
        }
        return totalSum;
    }

    var user = req.params.user;
    var x1 = req.params.x1;
    var y1 = req.params.y1;
    var z1 = req.params.z1;
    var x2 = req.params.x2;
    var y2 = req.params.y2;
    var z2 = req.params.z2;

    Matrix.findOne({user: user}, function (err, doc) {
        if (err) return console.log(err);
        if (doc == null){
            res.status(400).send("User not found");
            return;
        }
        var sum = sumData(doc.matrix, x1, y1, z1, x2, y2, z2);
        console.log(sum);
        res.status(200).jsonp(sum);
    });
};


/**
 *
 * @param req.body.x coord
 * @param req.body.y coord
 * @param req.body.z coord
 * @param req.body.user user that owns the matrix
 * @param req.body.value value to insert inside the matrix
 * @param res
 */
module.exports.updateMatrix = function (req, res) {
    try {
        var x = req.body.x;
        var y = req.body.y;
        var z = req.body.z;
        Matrix.findOne({user: req.body.user}, function (err, doc) {
            if (err) return console.log(err);
            if (doc == null){
                res.status(400).send("User not found");
                return;
            }
            doc.matrix[x][y][z] = req.body.value;
            Matrix.update({user: req.body.user}, {$set: {matrix: doc.matrix}}, function (err, data) {
                if (err){
                  res.status(400).send("There was an error updating" + err);
                }
                res.status(200).jsonp(data);
            });
        });
    } catch (e) {

    }
};

/**
 *
 * @param req.body.username user name that will own the new matrix
 * @param req.body.x size of x dimension
 * @param req.body.y size of y dimension
 * @param req.body.z size of z dimension
 * @param res
 */
module.exports.createMatrix = function (req, res) {

    var initialData = req.body;
    var username = initialData.username;
    var x = initialData.x;
    var y = initialData.y;
    var z = initialData.z;
    try {



        var matrixObj = [];
        for (var i = 0; i < x; i++) {
            matrixObj.push([]);
            for (var j = 0; j < y; j++) {
                matrixObj[i].push([]);
                for (var k = 0; k < z; k++) {
                    matrixObj[i][j].push(0);
                }
            }
        }

        var matrix = new Matrix({
            user: username,
            matrix: matrixObj,
            x:initialData.x,
            y:initialData.y,
            z:initialData.z
        });

        matrix.save(function (err, matrix) {
            if (err) return console.error(err);
            res.status(200).jsonp(matrix);
        });
    } catch (e) {
        console.log(e);
    }
};


/**
 * Get all the Matrixes registered
 * @param req
 * @param res
 */
module.exports.get_all = function(req, res){
    try {

        Matrix.find({}, function (err, doc) {
            if (err) return console.log(err);
            if (doc == null) console.log("Matrix not found");
            res.status(200).jsonp(doc);
        });
    } catch (e) {

    }

};