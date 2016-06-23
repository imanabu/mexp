/// <reference path='../../_all.ts' />
/// This requires Typescript 1.8 or later, use "npm install typescript" and be sure that 
/// visual studio Typescript SDK install versoin of tsc does not run (which is ancient 1.0.x)
"use strict";
var MedHeadings = ["Category", "Medications", "Administered"];
var Administered = ["No", "Yes", "Contraindicated", "Blinded"];
var ProcedureMeds = [
    { sel: "", cat: "Anticoagulants", meds: ["Fondparinux", "Low Molecular Weight Heparin (any)", "Unfractionated Heparin (any)"] },
    { sel: "", cat: "Aspirin", meds: ["Aspirin (any)"] },
    { sel: "", cat: "Glycoprotein IIb/IIIa Inhibitors", meds: ["GP IIb/IIIa (any)"] },
    { sel: "", cat: "Thienopyridines", meds: ["Clopidogrel", "Ticlopidine", "Prasugrel"] }
];
var DischargeMeds = [
    { sel: "", cat: "ACE Inhibitors", meds: ["ACE Inhibitor (any)"] },
    { sel: "", cat: "ARBs", meds: ["ARB (any)"] },
    { sel: "", cat: "Aspirin", meds: ["Aspirin (any)"] },
    { sel: "", cat: "Beta Blcokers", meds: ["Beta Blocker (any)"] },
    { sel: "", cat: "Lipid Lowering Agents", meds: ["Statin (any)", "Non-Statin (any)"] },
    { sel: "", cat: "Thienopyridines", meds: ["Clopidogrel", "Ticlopidine", "Prasugrel"] }
];
var cb = function onSelectChange(arg) {
    console.log(arg);
    return;
};
var menuConfig = new ConfigArg(false, Administered, cb, m.prop(new Array()), "width:100%");
var MedicationCompo = (function () {
    function MedicationCompo(headings, meds, changeCallBack) {
        this.headings = headings;
        this.meds = meds;
        this.changeCallBack = changeCallBack;
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
        var that = this;
        var tr = new Array();
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
                var owner = new Array();
                owner.push(item.cat);
                owner.push(item.meds[i]);
                td.push(m("td", item.meds[i]));
                td.push(m("td", m.component(new Mselect2(), menuConfig)));
                tr.push(m("tr", td));
            }
        });
        return tr;
    };
    return MedicationCompo;
}());
m.mount($("#devapp")[0], new MedicationCompo(MedHeadings, ProcedureMeds, cb));
m.mount($("#discharge")[0], new MedicationCompo(MedHeadings, DischargeMeds, cb));
//# sourceMappingURL=medsform.js.map