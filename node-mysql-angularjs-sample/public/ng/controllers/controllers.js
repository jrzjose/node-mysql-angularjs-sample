var myControllers = angular.module('myControllers', []);

myControllers.controller('homeController', function ($scope) {
    //
});


myControllers.controller('contactsController', function ($scope, $routeParams, $timeout, $location, contactsAPI) {
    $scope.contacts;
    $scope.status;
    
    if ($routeParams.id) {
        getContact($routeParams.id);
    }
    else {
        getContacts();
    }
    
    function getContacts() {
        contactsAPI.getContacts()
            .success(function (contacts) {
            $scope.contacts = contacts;
        })
            .error(function (error) {
            showAlertInfo('Unable to load data');
        });
    }
    
    function getContact(id) {
        contactsAPI.getContact(id)
            .success(function (contact) {
            if (contact)
                $scope.contact = contact;
            else
                $scope.contact = { id: -1 };
            })
            .error(function (error) {
                showAlertInfo('Unable to load data');
            });
    }
    
    $scope.saveContact = function (contact) {
        if (contact.id == -1) {
            delete contact['id'];
            contactsAPI.createContact(contact)
            .success(function (result) {
                console.log(result);
                showAlertInfo('Data Inserted');
            }).
            error(function (error) {
                showAlertInfo('Unable to insert data ')
            });
        }
        else {
            contactsAPI.updateContact(contact)
            .success(function (result) {
                console.log(result);
                showAlertInfo('Data updated');
            }).
            error(function (error) {
                showAlertInfo('Unable to insert data ');
            });
        }
    };
    
    var showAlertInfo = function (message) {
        $scope.status = message;
        $scope.showAlertInfo = true;
        $timeout(function () {
            $scope.showAlertInfo = false;
            $scope.status = "";
            $location.path('/contacts');
        }, 1400);
    }
});
