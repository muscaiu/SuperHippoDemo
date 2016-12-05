angular.module('gameLinks', [])

    .controller('LinkCtrl', function ($scope, $http) {
        //Adding new Games here
        $scope.linksList = [
            {
                gameID: 'L2',
                gameName: 'Lineage 2'
            },
            {
                gameID: 'H4',
                gameName: 'Heroes of Might and Magic IV'
            },
            {
                gameID: 'LOTRBFME',
                gameName: 'Lord of The Rings Battle for Middle Earth'
            },
            {
                gameID: 'MK1',
                gameName: 'Mortal Kombat 1'
            },
            {
                gameID: 'WC3',
                gameName: 'Warcraft 3'
            },
            {
                gameID: 'SC2',
                gameName: 'StarCraft 2'
            }
        ]

        //GET Clicked Links from API
        $http.get('http://localhost:7000/api/gameLinks').then(function (response) {
            $scope.postedData = response.data
        })

        //GET User IP
        $http.get("http://ipinfo.io").then(function (response) {
            $scope.userIp = response.data
        })

        //POST
        $scope.onClickLink = function (item) {
            //Get Date
            $scope.clickDate = new Date()
            console.log(item.gameID, item.gameName, $scope.userIp.ip, $scope.userIp.country, $scope.clickDate)

            $http.post('http://localhost:7000/api/gameLinks', 
                {
                    gameID: item.gameID,
                    gameName: item.gameName,
                    userIp: $scope.userIp.ip,
                    userCountry: $scope.userIp.country,
                    clickDate: $scope.clickDate
                })
        }
    })

