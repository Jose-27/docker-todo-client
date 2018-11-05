
'use strict';

function Controller(model, view) {

    var self   = this;
    self.model = model;
    self.view  = view;

    this.view.bind('create', function (data) {
        self.addItem(data);
    });

    this.view.bind('getAll', function () {
        self.model.getAll();
    });

    $on(this.view.$todoList, 'click', function (event) {
        if(event.target.id === 'removed'){
            self.deletedTask(event.target.parentElement.getAttribute('data-id'));
        }else if(event.target.type === 'checkbox'){
            if(event.target.checked){
                event.target.parentNode.classList.add('checked');
            }else{
                event.target.parentNode.classList.remove('checked');
            }
        }
    });

    $on(this.view.$filters, 'click', function (event) {

        var filterByDay = event.target.id === 'today'    || 
                          event.target.id === 'tomorrow' || 
                          event.target.id === 'overdue';
        
        if(filterByDay){
            self.dateFilter(event.target.id);
        }else if (event.target.id === 'allTasks'){
            self.showAllTasks();
        }
    });

}

Controller.prototype.addItem = function (data) {
    var self = this;

	if (data.title === '') {return;}

    this.model.create(data).then(function(data){
        self.view.$arr.push(data);
        self.view.render(self.view.$arr);
    });
};

Controller.prototype.getAllTasks = function () {
    this.model.getAll(data);
};

Controller.prototype.deletedTask = function (id) {
    var self = this;

    this.model.deleted(id).then(function(data){
        
        var index = self.view.$arr.map(function (x) {
            return x._id;
        }).indexOf(id);

        self.view.$arr.splice(index, 1);

        self.view.render(self.view.$arr);
    });
};

Controller.prototype.showAllTasks = function () {
    this.view.render(this.view.$arr);
};

Controller.prototype.dateFilter = function (type) {
    var showDueToday = this.view.$arr.filter(function (elm) {
        return $dateWizard(elm.due_date) === type;
    });

    if (showDueToday.length > 0){
        this.view.render(showDueToday);
    }
};

// Export to window
window.app = window.app || {};
window.app.Controller = Controller;
