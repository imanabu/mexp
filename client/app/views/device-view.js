'use strict';
/*global m, Select2, Select2Multi*/
/*global approvedDevices*/
/*global $, jQuery, _, localStorage*/

var app = app || {};

var myToDo = [
    "New: lesions is now hooked up properly in each item. Try it. You can add remove items.",
    "New: device pulldown should nor behave properly",
    "Net Yet! device deletion and reordering",
    "Note this list itself is written in Mithril!"
];

app.dump = function (item) {
    return m("li",
        item.id + ", " + item.name() + ", [" + item.lesions() + "], " + item.diameter() + ", " + item.length()
    )
        ;
}

app.view = function (ctrl) {
    return m("header#header", [
        m("h3", "List of Progress"),
        m("ul", [
            myToDo.map(function (item) {
                return m("li", item)
            })
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
                                id: item.id,
                                data: ctrl.approvedDevices, value: item.name(), onchange: ctrl.deviceChanged.bind(ctrl)
                            })
                        ]),
                        m("td", [
                            m.component(Select2Multi, {
                                id: item.id, data: ctrl.lesions(), value: item.lesions, onchange: ctrl.lesionsChanged.bind(ctrl)
                            })
                        ]),
                        m("td", [m("input", { class: "text", onchange: m.withAttr("value", item.diameter), value: item.diameter()})]),
                        m("td", [m("input", { class: "text", onchange: m.withAttr("value", item.length), value: item.length()})])
                    ])
                })
            ]),
            m("button#add", { onclick: ctrl.addNew.bind(ctrl) }, "+"),
            m(".well", [
                m("h2", "Data Dump"),
                m("p", "Total devices: ", ctrl.listCount()),
                m("ul", [ctrl.list.map(app.dump)]
                )]) // end ul
        ])
    ); // top
}
