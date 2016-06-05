'use strict';
var app = app || {};

app.view = function(ctrl) {
    return m("header#header", [
        m("h1", "Devices"),
        m("br"),
        m("p", "Total devices: ", ctrl.listCount())
    ],
    m("button#add", {onclick: ctrl.addNew.bind(ctrl)}, "Add"),
    m.component(Select2, {
        data: ctrl.devNames, value: ctrl.selectedDev, onchange: function() {}
    }),
    m("p", " "),
    m("table", {class: "table table-striped"},  [
        m("thead", {class: "thead-inverse"}, [
        m("tr", [
            m("th", "Index"),
            m("th", "Device"),
            m("th", "Legion"),
            m("th", "Diameter"),
            m("th", "Length")
        ])]),
        m("tbody", [
            m("tr", [
            m("td", "1"),
            m("td", "Stent")
            ])
        ])
       
    ])
    ); // top
}