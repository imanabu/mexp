/// <reference path='../../_all.ts' />
var Select2Data = (function () {
    function Select2Data(width, data, selectedId) {
        this.width = width;
        this.data = data;
        this.selectedId = selectedId;
    }
    return Select2Data;
}());
var Select20 = {
    //    Returns a select box
    // Usage: see http://mithril.js.org/integration.html but in general
    // insert as m.component(Select2 { data: listOfSelections[], value: currentlySelected, onchange: chageCallBack(id)})
    // Be sure to scroll down to the bottom of the page to see the acual coding example including the use if id and name
    // This is modifed so that the data source uses the mithril getter and setter factories and not
    // plain Json structure.
    view: function (ctrl, attrs) {
        //Create a Select2 progrssively enhanced SELECT element
        return m("select", { config: Select20.config(attrs), style: "font-size: 10px; width:" + (attrs.width || "180px") }, [
            attrs.data.map(function (item, index) {
                var args = { value: item, selected: "" };
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
    config: function (ctrl) {
        return function (element, isInitialized) {
            if (typeof jQuery !== "undefined" && typeof jQuery.fn.select2 !== "undefined") {
                var el = $(element);
                if (!isInitialized) {
                    el.select2()
                        .on("change", function () {
                        var id = el.select2("val");
                        //Set the value to the selected option
                        ctrl.data.map(function (d, index) {
                            if (index === id) {
                                ctrl.value(id);
                            }
                        });
                        if (typeof ctrl.onchange == "function") {
                            ctrl.onchange({ id: ctrl.id, selected: el.select2("val") });
                        }
                    });
                }
                el.val(ctrl.value).trigger("change");
            }
            else {
                console.warn("ERROR: You need jquery and Select2 in the page");
            }
        };
    }
}; // end Select2
var Select20Multi = {
    //  Returns a multi-select select2 box
    //  selection.
    view: function (ctrl, attrs) {
        var selectedIds = attrs.value();
        //Create a Select2 progrssively enhanced SELECT element
        return m("select", { config: Select20Multi.config(attrs), style: "font-size: 10px; width:60x", multiple: "multiple" }, [
            attrs.data().map(function (item) {
                var args = { value: item, selected: "selected" };
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
    config: function (ctrl) {
        return function (element, isInitialized) {
            if (typeof jQuery !== "undefined" && typeof jQuery.fn.select2 !== "undefined") {
                var el = $(element);
                if (!isInitialized) {
                    el.select2()
                        .on("change", function () {
                        var id = el.select2("val");
                        //m.startComputation();
                        //Set the value to the selected option
                        var selected = [];
                        ctrl.data().map(function (d) {
                            if (d === id) {
                                selected.push(id);
                            }
                        });
                        ctrl.value(selected);
                        if (typeof ctrl.onchange == "function") {
                            var arg = { id: ctrl.id, selected: el.select2("val") };
                            ctrl.onchange(arg);
                        }
                        // m.endComputation();
                    });
                }
                el.val(ctrl.value()).trigger("change");
            }
            else {
                console.warn("ERROR: You need jquery and Select2 in the page");
            }
        };
    }
}; // end Select2
//# sourceMappingURL=m-select20.js.map