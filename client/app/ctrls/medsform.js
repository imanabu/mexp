/// <reference path='../../_all.ts' />
/// This requires Typescript 1.8 or later, use "npm install typescript" and be sure that 
/// visual studio Typescript SDK install versoin of tsc does not run (which is ancient 1.0.x)
"use strict";
var MedHeadings = ["Category", "Medications", "Administered"];
var Administered = ["No", "Yes", "Contraindicated", "Blinded"];
var Meds = [
    { sel: "", cat: "Anticoagulants", meds: ["Fondparinux", "Low Molecular Weight Heparin (any)", "Unfractionated Heparin (any)"] },
    { sel: "", cat: "Aspirin", meds: ["Aspirin (any)"] },
    { sel: "", cat: "Glycoprotein IIb/IIIa Inhibitors", meds: ["GP IIb/IIIa (any)"] },
    { sel: "", cat: "Thienopyridines", meds: ["Clopidogrel", "Ticlopidine", "Prasugrel"] }
];
var MedicationCompo = (function () {
    function MedicationCompo(headings, meds) {
        this.headings = headings;
        this.meds = meds;
    }
    MedicationCompo.prototype.controller = function () {
        return null;
    };
    MedicationCompo.prototype.view = function () {
        return m("div", this.table());
    };
    MedicationCompo.prototype.table = function () {
        return m("table", { "class": "", "border": "2" }, [this.header(), this.tbody()]);
    };
    MedicationCompo.prototype.header = function () {
        var that = this; // without 'that', the lambda will not see 'this' due to the 'closure' rule
        var hr = function () {
            return that.headings.map(function (h) { return m("th", h); });
        };
        return [
            m("thead", m("tr", hr()))
        ];
    };
    MedicationCompo.prototype.tbody = function () {
        // let that = this;      
        var tr = new Array();
        var menu = new Select2Data("180px", Administered, "0");
        this.meds.forEach(function (item) {
            var size = item.meds.length;
            for (var i = 0; i < size; i++) {
                var td = new Array();
                // Row spanning logic to make the merged category cell
                if (size > 0) {
                    if (i === 0) {
                        td.push(m("td", { "rowspan": size.toString() }, item.cat));
                    }
                }
                else {
                    td.push(m("td", item.cat));
                }
                td.push(m("td", item.meds[i]));
                td.push(m("td", m.component(Select20, menu)));
                tr.push(m("tr", td));
            }
        });
        return tr;
    };
    return MedicationCompo;
}());
m.mount($("#devapp")[0], new MedicationCompo(MedHeadings, Meds));
//# sourceMappingURL=medsform.js.map