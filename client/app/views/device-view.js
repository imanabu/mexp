'use strict';
var app = app || {};

app.view = function (ctrl) {
    return m("header#header", [
        m("h1", "Devices")
    ],
        m("p", " "),
        m("table", { class: "table table-striped" }, [
            m("thead", { class: "thead-inverse" }, [
                m("tr", [
                    m("th", "#"),
                    m("th", "Device"),
                    m("th", "Legions"),
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
                        m("td", "L"),
                        m("td", "1.0"),
                        m("td", "1.5")
                    ])
                })
            ]),
            m("button#add", { onclick: ctrl.addNew.bind(ctrl) }, "+"),
            m("p", "Total devices: ", ctrl.listCount())
        ])
    ); // top
}