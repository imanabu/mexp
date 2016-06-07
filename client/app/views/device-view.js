'use strict';
/*global m, Select2, Select2Multi*/
/*global approvedDevices*/
/*global $, jQuery, _, localStorage*/

var app = app || {};

var myToDo = [
    "Most of the features should be complete. Please check every function."
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
        m("button", {
            onclick: ctrl.addNew.bind(ctrl),
            class:"button btn-warning",
        }, "+ Add Device"
        ),
        m("p"),
        m("h3", { style: "color:orange"}, "Unassigned Lesions: " + ctrl.findUnassigned()), 
        m("hr"),
        m("h2", "Lesions Add/Remove Testing"),
        m("p", "Example: To simulate a deletion of lesion 2, type in 1,3,4 and press Execute."),
        m("input", { class: "text", onchange: m.withAttr("value", ctrl.lesionsField), value: ctrl.lesionsField()}),
               m("button", {
            onclick: ctrl.lesionUpdate.bind(ctrl, ctrl.lesionsField),
            class: "button btn-warning"
        }, " Execute"),
        m("span", m.trust("&nbsp;"),  m.trust("&nbsp;"), ctrl.lesionStatus()),
        m("hr"),
        m(".well", { class: "col-md-8" }, [
            m("h2", "Internal Data Dump"),
            m("p", "Total devices: ", ctrl.listCount()),
            m("ul", [ctrl.list.map(app.dump)]
            )]) // end ul
    ); // topinter
}
