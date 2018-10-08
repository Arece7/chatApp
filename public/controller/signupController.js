
chatApp.controller('signupController', function($scope, $http,$location) {
    console.log('register');
    $scope.user={
        'fname': '',
        'lname': '',
        'email': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.register = function(){
        if($scope.user.fname==''||$scope.user.lname==''||$scope.user.email==''||$scope.user.password=='')
        {
            alert("please fill the blank spaces");
          return;
        }
        else if($scope.user.password!=$scope.ConfirmPassword)
        {
            alert("password should be same");
            return;
        }
       
        console.log("register calling", $scope.user);
    $http({
        method: 'POST',
        url: '/signup',
        data: $scope.user
    }).then(function(response){
        console.log(response);
        console.log(response.data.error);
        
        if(response.data.error==false){
            console.log("successfull");
            $scope.message="Registration Successful";
            alert("Registration successfully");
    
            $location.path("/");
        }
        else if(response.status==400){
            $scope.message="Registration Unsuccessful"
        }
    })
    }
    $scope.check = function(){
   if($scope.user.password!==undefined && $scope.ConfirmPassword!==undefined)
   {
       if($scope.user.password!=$scope.ConfirmPassword)
       {
           return true;
       }
       else 
       return false;
       
   }
    
    
    }
    
});