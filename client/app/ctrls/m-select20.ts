/// <reference path='../../_all.ts' />

interface ISelect2Data {
    width: string;
    data: string[];
    selectedId: string;
    owner: string[];
    onchange(arg: any): void;
}


class SelectedResult {
    constructor(
    public selected: string,
    public owner: string[]) {}
}

class Select2Data implements ISelect2Data {
    public constructor(
        public width: string,
        public data: string[],
        public selectedId: string,
        public owner: string[],
        public onchange: (arg: SelectedResult) => void
    ) { }
}

/* tslint:disable no-var-requires  */
var Select20 = {
    //    Returns a select box
    // Usage: see http://mithril.js.org/integration.html but in general
    // insert as m.component(Select2 { data: listOfSelections[], value: currentlySelected, onchange: chageCallBack(id)})
    // Be sure to scroll down to the bottom of the page to see the acual coding example including the use if id and name
    // This is modifed so that the data source uses the mithril getter and setter factories and not
    // plain Json structure.
    controller: function () {
        let ctrl = this;
    },
    view: function (ctrl, attrs: ISelect2Data) {
        // Create a Select2 progrssively enhanced SELECT element
        return m("select", { config: Select20.config(attrs), style: "font-size: 10px; width:" + (attrs.width || "180px") }, [

            attrs.data.map(function (item, index) {
                let args = { value: item, selected: "" };
                //    Set selected option
                if (index.toString() === attrs.selectedId) {
                    args.selected = "selected";
                }
                return m("option", args, item);
            })
        ]);
    },
    /**
    Select2 config factory. The params in this doc refer to properties of the `ctrl` argument
    @param {Object} data - the data with which to populate the <option> list
    @param {prop} value - the prop of the item in `data` that we want to select
    @param {function(Object id)} onchange - the event handler to call when the selection changes.
        `id` is the the same as `value`
    */
    //    Note: The config is never run server side.
    config: function (ctrl): Mithril.ElementConfig {
        return function (element, isInitialized) {
            if (typeof jQuery !== "undefined" && typeof jQuery.fn.select2 !== "undefined") {
                let el = $(element);
                if (!isInitialized) {
                    el.select2()
                        .on("change", function () {
                            let id = el.select2("val");
                            // Set the value to the selected option
                            ctrl.data.map(function (d, index) {
                                if (index === id) {
                                    ctrl.value(id);
                                    ctrl.selectedId = index.toString();
                                }
                            });

                            if (typeof ctrl.onchange == "function") {
                                ctrl.onchange(new SelectedResult(el.select2("val"),ctrl.owner));
                            }
                        });
                }
                el.val(ctrl.value).trigger("change");
            } else {
                console.warn("ERROR: Missing jquery and Select2 JS");
            }
        };
    }
}; // end Select2

interface ISelect2MultiData {
    value: Mithril.Property<string[]>;
    data: Mithril.Property<string[]>;
    width: string;
}

var Select20Multi = {
    //  Returns a multi-select select2 box
    //  selection.
    view: function (ctrl, attrs: ISelect2MultiData) {
        let selectedIds = attrs.value();
        // Create a Select2 progrssively enhanced SELECT element
        return m("select", { config: Select20Multi.config(attrs), style: "font-size: 10px; width:60x", multiple: "multiple" }, [
            attrs.data().map(function (item) {
                let args = { value: item, selected: "selected" };
                //    Set selected option
                if (_.contains(selectedIds, item)) {
                    args.selected = "selected";
                }
                else {
                    args.selected = "";
                }
                return m("option", args, item);
            })
        ]);
    },

    /**
    Select2 config factory. The params in this doc refer to properties of the `ctrl` argument
    @param {Object} data - the data with which to populate the <option> list
    @param {prop} value - the prop of the items in `data` that we want to select, type number[]
    @param {function(Object id)} onchange - the event handler to call when the selection changes.
        `id` is the the same as `value`
    */
    //    Note: The config is never run server side.
    config: function (ctrl): Mithril.ElementConfig {
        return function (element, isInitialized) {
            if (typeof jQuery !== "undefined" && typeof jQuery.fn.select2 !== "undefined") {
                let el = $(element);
                if (!isInitialized) {
                    el.select2()
                        .on("change", function () {
                            let id = el.select2("val");
                            // m.startComputation();
                            // Set the value to the selected option
                            let selected = [];
                            ctrl.data().map(function (d) {
                                if (d === id) {
                                    selected.push(id);
                                }
                            });
                            ctrl.value(selected);
                            if (typeof ctrl.onchange == "function") {
                                let arg = { id: ctrl.id, selected: el.select2("val") };
                                ctrl.onchange(arg);
                            }
                            // m.endComputation();
                        });
                }
                el.val(ctrl.value()).trigger("change");
            } else {
                console.warn("ERROR: You need jquery and Select2 in the page");
            }
        };
    }
}; // end Select2

