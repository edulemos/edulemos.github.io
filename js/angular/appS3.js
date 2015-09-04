var app = angular.module('appS3', []);

app.controller('S3Controller', S3ControllerFunction);

function S3ControllerFunction($scope, $http) {

    console.log('iniciou o s3 controller');

    $scope.buckets = [];
    $scope.bucketSummaryList = [];

    var carregaBuckets = function () {
        $http.get("http://rest-ws.elasticbeanstalk.com/s3buckets")
            .success(function (data) {
                $scope.buckets = data;
            }).error(function (data) {
                console.log('erro: ' + data);
            });
    }

    $scope.bucketSummary = function (nome) {
        $http.get("http://rest-ws.elasticbeanstalk.com/bucketListFiles/" + nome)
            .success(function (data) {
                $scope.bucketSummaryList = data;
            }).error(function (data) {
                console.log('erro: ' + data);
            });
    }

    $scope.bucketSummaryLink = function (bs) {
        $http.post("http://rest-ws.elasticbeanstalk.com/linkDownload", bs)
            .success(function (data) {
                window.open(data, 'Download');
            }).error(function (data) {
                console.log('erro: ' + data);
            });

    }




    carregaBuckets();


}
