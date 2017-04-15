/**
 * Created by USER
 */


(function(){

    var myApp =  angular.module("SumRangeQuery", []);

    //controllers

    myApp.controller("CtrlMatrixesList" , CtrlMatrixesList);

    CtrlMatrixesList.$inject = ['$scope' , '$http'];
    function CtrlMatrixesList($scope, $http) {
        var URL = "/api/matrix";

        $scope.message = "Nothing done yet";
        $scope.createMatrix =  function(){

            var jsondata =  {username: $scope.user, x:$scope.x , y:$scope.x, z:$scope.x};
            $http.post(URL, jsondata).
            success(function(data, status, headers, config) {
                $scope.message = " Matrix created successfully";
                console.log(data);
            }).
            error(function(data, status, headers, config) {
               console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });
            console.log($scope.user + " - " + $scope.x);

            $scope.getAllMatrixes();
        };

        $scope.matrixes = [];
        $scope.getAllMatrixes =  function(){
            $http.get(URL).
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.matrixes = data;
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
            });

        };
        $scope.selected_user = "";
        $scope.selected_x = "";
        $scope.selected_y = "";
        $scope.selected_z = "";
        $scope.q_x1 = "";
        $scope.q_y1 = "";
        $scope.q_z1 = "";
        $scope.q_x2 = "";
        $scope.q_y2 = "";
        $scope.q_z2 = "";


        $scope.selected_value = "";
        $scope.selectedMatrix = function(matrixData){
            console.log("cliecke");
            console.log(matrixData.user + " " + matrixData.x );

            $scope.selected_user = matrixData.user;
            $scope.selected_x = matrixData.x;
            $scope.selected_y = matrixData.y;
            $scope.selected_z = matrixData.z;
        };

        $scope.updateValue =  function (){
            if($scope.selected_user == ""){
                $scope.message = "Please select a matrix";
                return;
            }

            var jsondata =  {user: $scope.selected_user, x:$scope.selected_x-1, y:$scope.selected_y-1, z:$scope.selected_z-1 ,
            value:$scope.selected_value};
            $http.put(URL, jsondata).
            success(function(data, status, headers, config) {
                $scope.message =  "Value " + $scope.selected_value + " updated successfully in coords "  + $scope.selected_x + "," + $scope.selected_y + "," + $scope.selected_z;
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                $scope.message = "There was an error updating the value of the matrix";
                console.log("Error " + data + " " + status);
            });
            console.log($scope.user + " - " + $scope.x);
        };

        $scope.querySum =  function(){
            if($scope.selected_user == "" ){
                $scope.message = "Please select a matrix";
                return;
            }
            if( $scope.q_x1 == "" || $scope.q_y1 == "" || $scope.q_z1 == "" || $scope.q_x2 == "" || $scope.q_y2 == ""
                || $scope.q_z2 == ""){
                $scope.message = "Please fill the query fields";
                return;
            }

            var URI = URL  + "/query/"+ $scope.selected_user+ "/" +
                ($scope.q_x1 - 1)+ "/"+
                ($scope.q_y1- 1) + "/"+
                ($scope.q_z1- 1) + "/"+
                ($scope.q_x2- 1) + "/"+
                ($scope.q_y2- 1) + "/"+
                ($scope.q_y2- 1);
            console.log("querying " + URI);
            $http.get(URI).
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.message = "Total sum is: " + data;
            }).
            error(function(data, status, headers, config) {
                    $scope.message = "There was an error querying the sum";
                    console.log("Error " + data + " " + status);
            });
        };
       $scope.getAllMatrixes();

    }


})();