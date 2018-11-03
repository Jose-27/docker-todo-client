
'use strict';

function View() {
    this.$form      = qs('.form');
    this.$todoList  = qs('.todo-list');
    this.$filters   = qs('#filters');
    this.$arr       = new Array();
    this.ENTER_KEY  = 13;
    this.ESCAPE_KEY = 27;

    this.defaultTemplate
    =	'<li data-id="{{id}}" class="flex {{completed}}">'
    +	    '<input class="toggle" type="checkbox" {{checked}}>'
    +           '<p>{{title}}</p>'
    +           '<p>{{description}}</p>'
    +           '<p>{{date}}</p>'
    +		'<button id="removed" class="fa fa-trash"></button>'
    +	'</li>';
}

View.prototype.show = function (data) {
    var view = '';
    
    for (var i=0; i < data.length; i++) {
        
        var template  = this.defaultTemplate;
        var completed = '';
        var checked   = '';

        if (data[i].completed) {
            completed = 'completed';
            checked = 'checked';
        }

        template = template.replace('{{id}}', data[i]._id);
        template = template.replace('{{title}}', data[i].title);
        template = template.replace('{{description}}', data[i].description);
        template = template.replace('{{date}}', $dateWizard(data[i].due_date));
        template = template.replace('{{completed}}', completed);
        template = template.replace('{{checked}}', checked);

        view = view + template;
        
    }

    return view;
};


View.prototype.render = function (parameter) {
    this.$todoList.innerHTML = this.show(parameter);
}

View.prototype.formReset = function (parameter) {
    qs('.task-title').value = '';
    qs('.task-description').value = '';
    qs('.task-date').value = '';
}

View.prototype.bind = function(e, handler) {
    var self = this;
    if (e === 'create') {
        $on(self.$form, 'keypress', function(event){
            if (event.keyCode === self.ENTER_KEY) {
                
                var obj = new Object(),
                    elements = document.querySelector('.form').elements;

                for (var i = 0 ; i < elements.length ; i++) {
                    var item = elements.item(i);
                    obj[item.name] = item.value.trim();
                }

                handler(obj);
                self.formReset()
            } 
        });
    }
}
// Export to window
window.app = window.app || {};
window.app.View = View;