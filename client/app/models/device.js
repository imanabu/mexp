
'use strict';
var app = app || {};

(function () {
	var STORAGE_ID = 'catpci-demo';
	app.storage = {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},
		put: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
})();

var uniqueId = (function () {
	var count = 0;
	return function () {
		return ++count;
	};
}());

// Device Model
app.Device = function (data) {
	this.name = m.prop(data.name);
	this.legions = m.prop(data.legions || []);
	this.diameter = m.prop(data.diameter || 0);
    this.length = m.prop(data.length|| 0);
	this.id = uniqueId();
};

app.DevName = function(name, id) {
    this.id = m.prop(id);
    this.name = m.prop(name)
}

// Device Selections



