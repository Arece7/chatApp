chatApp.controller('personalMessgControl', function($scope, $http, $location, SocketService){

    var token = localStorage.getItem('token');
    var currUserid = localStorage.getItem('userid');
    var currName = localStorage.getItem('uname')
    var receiverId = localStorage.getItem('receiverId');
    var receiverName = localStorage.getItem('receiverName');

    $scope.close = function(){

        $location.path("/dashboard");
        localStorage.removeItem('receiverId');
        localStorage.removeItem('receiverName');
    }

    uName = [];
    uName.push(currName +" : "+ receiverName);
    $scope.userName = uName;

    $scope.chatlist = [];

    $scope.send = function(){

        SocketService.emit('personalChatBackend', {'senderId': currUserid, 'senderName': currName, 'receiverId': receiverId, 'receiverName': receiverName, 'message': $scope.message, 'dateTime': new Date()})
        $scope.chatlist.push({'senderId': currUserid, 'senderName': currName, 'receiverId': receiverId, 'receiverName': receiverName, 'message': $scope.message, 'dateTime': new Date()})
        $scope.message = null;
    }

    $http({

       
        method: 'GET',
        url: '/auth/personalChatlist/'+receiverId+'/and/'+currUserid,
        headers: {
            'token': token
          }
          })  .then(function(response){

            
            console.log(response.data.message);

            $scope.chatlist = response.data.message;
            
    })

    SocketService.on(currUserid, function(msg) {

        console.log(msg);
        if(currUserid == receiverId){
        $scope.chatlist.push(msg)
        }
    });
    
    

    $scope.currentUserId = currUserid;
})