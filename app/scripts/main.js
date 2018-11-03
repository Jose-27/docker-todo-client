(function () {
    'use strict';

	function Todo() {
		this.model = new app.Model();
        this.view  = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view);
	}
	new Todo();
})();
