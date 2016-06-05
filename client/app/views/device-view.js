'use strict';
/*global m, Select2, Select2Multi*/
/*global approvedDevices*/
/*global $, jQuery, _, localStorage*/

var app = app || {};

var myToDo = [
    "Deleting each device",
    "ICD pulldown needs to be tied to each row independently",
    "Associated Lesions add/remove functionality"
];

app.view = function (ctrl) {
    return m("header#header", [
        m("h3", "List of Items Not Yet Implemented"),
        m("ul", [
            myToDo.map(function(item) {
                return m("li", item) })   
        ]),
        m("h1", "Devices")
    ],
        m("p", " "),
        m("table", { class: "table table-striped" }, [
            m("thead", { class: "thead-inverse" }, [
                m("tr", [
                    m("th", "#"),
                    m("th", "Intracoronary Device(s) Used"),
                    m("th", "Associated Lesion(s)"),
                    m("th", "Diameter"),
                    m("th", "Length")
                ])]),
            m("tbody", [
                ctrl.list.map(function (item) {
                    return m("tr", [
                        m("td", [m("button", "x " + item.id)]),
                        m("td", [
                            m.component(Select2, {
                                data: ctrl.approvedDevices, value: ctrl.selectedDev, onchange: function () { }
                            })
                        ]),
                        m("td", [
                            m.component(Select2Multi, {
                                data: [1,2,3,4], value: m.prop([2,4]), onchange: function () { }
                            })
                        ]),
                        m("td", [ m("input", {class:"text"})]),
                        m("td", [ m("input", {class:"text"})])
                    ])
                })
            ]),
            m("button#add", { onclick: ctrl.addNew.bind(ctrl) }, "+"),
            m("p", "Total devices: ", ctrl.listCount())
        ])
    ); // top
}