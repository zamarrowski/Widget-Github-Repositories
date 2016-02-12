var reposGithub = angular.module('reposGithub', []);

reposGithub.controller('MainCtrl', mainCtrl);
mainCtrl.$inject = ['$scope', '$http'];
function mainCtrl($scope, $http){
    var parameters = window.widgetParameters;
    $scope.user = getUser();
    $scope.fields = [
        {
            name: "Stars",
            field: "stargazers_count"
        },
        {
            name: "Forks",
            field: "forks"
        },
        {
            name: "Watchers",
            field: "watchers"
        }
    ];
    $scope.orderBySelected = $scope.fields[0];

    $http.get('https://api.github.com/users/' + $scope.user + '/repos')
    .success(function(data){
        $scope.repos = data;
    });

    function getUser() {
        for (var i = 0; i < parameters.length; i++) {
            if(parameters[i].name == "user"){
                return parameters[i].value;
            }
        }
    }
}

angular.element(document).ready(function() {
    var divWidget = document.getElementById("widget");
    angular.bootstrap(divWidget, ['reposGithub']);
});
