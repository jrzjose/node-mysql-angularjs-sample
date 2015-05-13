angular.module('dataFactory', [])
    .factory('contactsAPI', function ($http) {
        var api = '/contacts';

        var getContacts = function () {
            return $http.get(api);
        };

        var getContact = function (id) {
            return $http.get(api + '/' + id);
        };

        var createContact = function (entity) {
            return $http.post(api, entity);
        };

        var updateContact = function (entity) {
            return $http.put(api + '/' + entity.id, entity)
        };

        var deleteContact = function (id) {
            return $http.delete(api + '/' + id);
        };

        return {
            getContacts: getContacts,
            getContact: getContact,
            createContact: createContact,
            updateContact: updateContact,
            deleteContact: deleteContact
        }
    });