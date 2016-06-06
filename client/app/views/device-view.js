'use strict';
/*global m, Select2, Select2Multi*/
/*global approvedDevices*/
/*global $, jQuery, _, localStorage*/

var app = app || {};

var myToDo = [
    "New: Check the new Deletion Style",
    "New: Device list updated, searchable by the ID",
    "Not Yet: Lesions deletion handling and warking",
    "Note this list itself is written in Mithril!"
];

app.dump = function (item) {
    return m("li",
        item.id() + ", " + item.name() + ", [" + item.lesions() + "], " + item.diameter() + ", " + item.length()
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
        m("table", { class: "table table-striped well" }, [
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
                        m("td", [
                            m("span", {
                                onclick: ctrl.Delete.bind(ctrl, item.id),
                                class: "glyphicon glyphicon-remove-circle", "aria-hidden": "true",
                                style: "color:red"
                            }
                            ),
                            m.trust("&nbsp;"),
                            m("span", item.id())
                        ]),
                        m("td", [
                            m.component(Select2, {
                                id: item.id(),
                                data: ctrl.approvedDevices, value: item.name(), onchange: ctrl.deviceChanged.bind(ctrl)
                            })
                        ]),
                        m("td", [
                            m.component(Select2Multi, {
                                id: item.id(), data: ctrl.lesions(), value: item.lesions, onchange: ctrl.lesionsChanged.bind(ctrl)
                            })
                        ]),
                        m("td", [m("input", { class: "text", onchange: m.withAttr("value", item.diameter), value: item.diameter() })]),
                        m("td", [m("input", { class: "text", onchange: m.withAttr("value", item.length), value: item.length() })])
                    ])
                })
            ])
        ]),
        m("span", {
            onclick: ctrl.addNew.bind(ctrl),
            class: "glyphicon glyphicon-plus", "aria-hidden": "true",
            style: "color:gray"
        }, " Add Devices"
        ),
        m("p"),
        m("hr"),
        m("h2", "Lesions Testing List"),
        m("p", "Type in Lesion IDs separated by comma, it will renumber them once you make the change."),
        m("input", { type: "text", onchange: {} }),
        m("span", " " + ctrl.lesionStatus()),
        m("hr"),
        m(".well", { class: "col-md-8" }, [
            m("h2", "Internal Data Dump"),
            m("p", "Total devices: ", ctrl.listCount()),
            m("ul", [ctrl.list.map(app.dump)]
            )]) // end ul
    ); // top
}
