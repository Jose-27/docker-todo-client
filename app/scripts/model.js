(function (window) {
    'use strict';
    
    function Model() {
        this.$arr = new Array();
        this.url = 'http://localhost:3003/task/';
    }

    Model.prototype.getAll = function (data) {
        return $request('get', this.url, data);
    }

    Model.prototype.create = function (data) {
        return $request('post', this.url, data);
    }

    Model.prototype.deleted = function (id) {
        return $request('delete', this.url + id);
    }

	// Export to window
	window.app = window.app || {};
    window.app.Model = Model;
    
})(window);