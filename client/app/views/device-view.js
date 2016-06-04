'use strict';
var app = app || {};

app.view = function() {
    return m("header#header", [
        m("h1", "Devices")
    ]);
}