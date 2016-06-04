'use strict';
var app = app || {};

app.view = function(ctrl) {
    return m("header#header", [
        m("h1", "Devices")
    ],
    m.component(Select2, {
        data: ctrl.devNames, value: 0, onchange: function() {}
    })
    );
}