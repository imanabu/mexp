/// <reference path='../../_all.ts' />
/// This requires Typescript 1.8 or later, use "npm install typescript" and be sure that 
/// visual studio Typescript SDK install versoin of tsc does not run (which is ancient 1.0.x)
"use strict";

var MedHeadings: string[] = ["Category", "Medications", "Administered"];
var Administered: string[] = ["No", "Yes", "Contraindicated", "Blinded"];

interface iMedItem {
    sel: string;
    cat: string;
    meds: string[];
}

var Meds: iMedItem[] = [
    { sel: "", cat: "Anticoagulants", meds: ["Fondparinux", "Low Molecular Weight Heparin (any)", "Unfractionated Heparin (any)"] },
    { sel: "", cat: "Aspirin", meds: ["Aspirin (any)"] },
    { sel: "", cat: "Glycoprotein IIb/IIIa Inhibitors", meds: ["GP IIb/IIIa (any)"] },
    { sel: "", cat: "Thienopyridines", meds: ["Clopidogrel", "Ticlopidine", "Prasugrel"] }
];

class MedicationCompo implements Mithril.Component<any> {

    private meds: iMedItem[];
    private headings: string[];
    private selections: Mithril.Property<string[]>;

    public constructor(headings: string[], meds: iMedItem[]) {
        this.headings = headings;
        this.meds = meds;
    }

    public controller(): Mithril.Controller {
        return null;
    }

    public view(): Mithril.VirtualElement {
        return m("div", this.table());
    }

    private table(): Mithril.VirtualElement {
        return m("table", { "class": "", "border": "2" },
            [this.header(), this.tbody()]);
    }

    private header(): Mithril.VirtualElement[] {
        let that = this; // without 'that', the lambda will not see 'this' due to the 'closure' rule
        let hr = function (): Mithril.VirtualElement[] {
            return that.headings.map(function (h) { return m("th", h) })
        }
        return [
            m("thead", m("tr", hr()))
        ];
    }

    private tbody(): Mithril.VirtualElement[] {
        // let that = this;      
        let tr = new Array();
        let menu = new Select2Data("180px", Administered, "0");
        this.meds.forEach(function (item) {
            let size = item.meds.length;
            for (let i = 0; i < size; i++) {
                let td = new Array();
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
    }
}

m.mount($("#devapp")[0], new MedicationCompo(MedHeadings, Meds));



