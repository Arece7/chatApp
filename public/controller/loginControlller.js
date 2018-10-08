chatApp.controller('loginControlller', function ($scope, $http, $location) {
    if (localStorage.getItem('token') != null) {
        $location.path("/dashboard");
    }
    else {
        $scope.user = {
            'email': '',
            'password': ''
        }
        console.log($scope.user);
        $scope.login = function () {

if($scope.user.password==''||$scope.user.email=='')
{
    
    alert("please fill the blank spaces");
    return;

}

       
            $http({
                method: 'POST',
                url: '/login',
                data: $scope.user
            }).then(function (response) {
                console.log(response);
                console.log(response.data.error);

                if (response.data.error == false) {
                    console.log("successfull");
                    $scope.message = "log in Successful";
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userid', response.data.userid);
                    localStorage.setItem('uname', response.data.username);
                    $location.path("/dashboard");
                }
                else {
                    $scope.message = "login Unsuccessful"
                }
            }).catch(
                function (error) {
                    console.log(error.data.message);
                    $scope.message=error.data.message;
                 } );
        }
    }
});
