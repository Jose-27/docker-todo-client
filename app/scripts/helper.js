(function(window){
    // Get element(s) by CSS selector:
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};
	window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

	// addEventListener wrapper:
	window.$on = function (target, type, callback, useCapture) {
        if(target === null){
            return undefined;
        }
		target.addEventListener(type, callback, !!useCapture);
    };

    window.$dateWizard = function (date) {
        var today     = moment().startOf('day');
        var yesterday = moment().subtract(1, 'days').startOf('day');
        var tomorrow  = moment().add(1, 'days').startOf('day');

        if (date === null) {return};

        if (moment(date).isSame(today, 'd'))
            return 'today';// today
        else if (moment(date).isSame(yesterday, 'd'))
            return 'yesterday';// yesterday
        else if (moment(date).isSame(tomorrow, 'd'))
            return 'tomorrow';// tomorrow
        else
            return date;
    }

	window.$request = function (type, url, data) {

        if(url === ''){
            return;
        }

        var options = {
            url: url,
            type: type,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }

        return new Promise(function (resolve, reject) {
            $.ajax(options).done(resolve).fail(reject);
        });
        
    };
})(window);