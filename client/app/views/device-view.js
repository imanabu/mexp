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
    m("table", {class: "table"},  [
        m("thead", [
        m("tr", [
            m("td", "Index"),
            m("td", "Device"),
            m("td", "Legion"),
            m("td", "Diameter"),
            m("td", "Length")
        ])]),
       m("tr", [
            m("td", "1"),
            m("td", "Stent")
        ]),  
    ])
    ); // top
}