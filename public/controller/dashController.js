chatApp.controller('dashController', function($scope, $http, $location,SocketService){

    var userid = localStorage.getItem('userid');// getting the userid
    var token = localStorage.getItem('token');//getting the token
    var uname = localStorage.getItem('uname');
    
    
    $http({
                                                  //for printing userlist
        method: 'GET',
        url: '/auth/users/'+userid+'/userlist', 
        headers: {
            'token': token
          },
    }).then (function(response){
        console.log(response.status);
        if(response.status === '401'){
            $location.path("/");
        }
        var userList=[];
        console.log(response.data.data[0])
        info = response.data.data;
        // for(var i=0; i<response.data.data.length; i++){
            // userList.push(response.data.data[i].username);
        // }
        console.log(userList);
        $scope.userlist = response.data.data;
        // $scope.userlist = userList;
        console.log("Authenticated successfully")
    },function(error){
        console.log("Error in fetching data")        
    })
    $scope.person = function(userId, userName){

        localStorage.setItem('receiverId', userId)
        localStorage.setItem('receiverName', userName);
        $location.path("/dashboard/personalMessage");
    }


    $scope.chatlist = [];
    $scope.chatlistnew = [];

    
    $scope.chatlist = [];
    $scope.add = function()
    {                                   //adding the data in backend

        if($scope.message.length !== 0){
        SocketService.emit('chatRoomBackend', {'userid': userid, 'username': uname, 'message': $scope.message, 'dateTime': new Date()});
       
        }
        $scope.message=null;
    }
    $http({

        method: 'GET',
        url: '/auth/chatlist',
        headers: {
            'token': token                      //for receving messages
          }
          })  .then(function(response){

            
            console.log(response.data.message);

            
            $scope.chatlist = response.data.message;
            

    })
    
    SocketService.on('chatroomClient', function(msg) {

        $scope.chatlist.push(msg)
    });
       

    


  //log out function & emptying token 
    $scope.logout = function(){

        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        $location.path("/");
    }

    uName = [];
    uName.push(uname);
    $scope.userName = uName;
    $scope.currentUserId = userid;

   

})