'use strict';
/*global m*/
/*global approvedDevices*/
/*global $, jQuery, _*/
var app = app || {};

app.controller = function () {
    // Device collection
    var ctrl = this;
    ctrl.list = app.storage.get();
    ctrl.listCount = m.prop(0);
    ctrl.approvedDevices = approvedDevices;

    // Update with props
    ctrl.list = ctrl.list.map(function (item) {
        item.id = ctrl.list.length() + 1;
        return new app.Device(item);
    });
    ctrl.selectedDev = m.prop(0);

    ctrl.addNew = function addNew() {
        var that = this;
        var nd = app.NewDevice(that.list.length + 1);
        that.list.push(nd);
        var len = that.list.length;
        that.listCount(len);
    };

    ctrl.deviceIds = function () {
        var m = ctrl.list.map(
            function (item) {
                return item.id;
            }
        );

        return m;
    }

    // TODO: This comes from the actual lesions list. And if this changes we must reflect those
    ctrl.priorLesions = m.prop([1, 2, 3, 4, 5]);
    ctrl.lesions = m.prop([1, 2, 3, 4, 5]);
    ctrl.lesionStatus = m.prop("");
    ctrl.lesionsField = m.prop("1,2,3,4,5");
    // == Update Lesions ===
    
    ctrl.lesionUpdate = function (x) {
        
        var split = ctrl.lesionsField().split(",");
        var newLesions = [];
        
        split.forEach(function (x) {
            newLesions.push(x);
        });
        
        var fix = false;
        
        ctrl.list.forEach(function (y) {
            var yl = y.lesions();
            var isc = _.intersection(yl, newLesions);
            
            if (isc.length != yl.length) {
                var iex = _.difference(yl, newLesions);
                alert("Lesion " + iex + " is assigned to device (" + y.id() + ") " +
                y.name() + ". has been removed and numbers are rearranged.");
                fix = true;
            }
        });
        
        if (fix) {
            // make the map
            var a = Array();
            var i = 1;
            
            // for example a["2"] = 1;
            newLesions.forEach(function(x2) {
                a[x2] = i++;
            });
            
           ctrl.list.forEach(function(x3) {
               var les1 = new Array();
                x3.lesions().forEach( function(x4) {
                    if (a[x4]) {
                        les1.push(a[x4]);
                    }
                });
                x3.lesions(les1);
            });
        }

        ctrl.priorLesions(newLesions);
        ctrl.lesions(newLesions);
    }
    
    // == MAP: given [1,2,3,4] and if 3 is removed, it will be mapped
    // from 1->1, 2->2, 4->3
    
    ctrl.remapLesions = function() {
        
    }

    ctrl.unassignedList = m.prop([]);

    ctrl.findUnassigned = function () {
        var split = ctrl.lesionsField().split(",");
        var l2 = [];
        split.forEach(function (x) {
            l2.push(x);
        });
        var assigned = [];
        ctrl.list.forEach(function (y) {
            var yleg = y.lesions();
            assigned = _.union(assigned, yleg);
        })

        var isc = _.difference(l2, assigned);
        ctrl.unassignedList(isc);
        return isc;
    }

    

    ctrl.deviceChanged = function (arg) {
        var id = arg.id;
        var sel = arg.selected;
        if (sel) {
            ctrl.list.map(
                function (item) {
                    if (item.id() === id) {
                        item.name(sel);
                    }
                }
            );
        }
    }

    ctrl.lesionsChanged = function (arg) {
        var sel = arg.selected;
        if (sel) {
            ctrl.list.map(
                function (item) {
                    if (item.id() === arg.id) {
                        item.lesions(sel);
                    }
                }
            );
        }
    }

    ctrl.Delete = function (arg) {
        var id = arg();
        var newId = 0;
        var list2 = [];

        ctrl.list.forEach(function (x) {
            if (x.id() !== id) {
                x.id(++newId);
                list2.push(x)
            }
        });

        ctrl.list = list2;
        ctrl.listCount(ctrl.list.length);
    }
};

var Select2 = {
    //    Returns a select box
    // Usage: see http://mithril.js.org/integration.html but in general
    // insert as m.component(Select2 { data: listOfSelections[], value: currentlySelected, onchange: chageCallBack(id)})
    // Be sure to scroll down to the bottom of the page to see the acual coding example including the use if id and name
    // This is modifed so that the data source uses the mithril getter and setter factories and not
    // plain Json structure.
    view: function (ctrl, attrs) {
        var selectedId = attrs.value;
        //Create a Select2 progrssively enhanced SELECT element
        return m("select", { config: Select2.config(attrs), style: "width:320px" }, [

            attrs.data.map(function (item) {
                var args = { value: item };
                //    Set selected option
                if (item.id == selectedId) {
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
            if (typeof jQuery !== 'undefined' && typeof jQuery.fn.select2 !== 'undefined') {
                var el = $(element);
                if (!isInitialized) {
                    el.select2()
                        .on("change", function (e) {
                            var id = el.select2("val");
                            m.startComputation();
                            //Set the value to the selected option
                            ctrl.data.map(function (d, index) {
                                if (index == id) {
                                    ctrl.value(id);
                                }
                            });

                            if (typeof ctrl.onchange == "function") {
                                ctrl.onchange({ id: ctrl.id, selected: el.select2("val") });
                            }
                            m.endComputation();
                        });
                }
                el.val(ctrl.value).trigger("change");
            } else {
                console.warn('ERROR: You need jquery and Select2 in the page');
            }
        };
    }
}; // end Select2

var Select2Multi = {
    //  Returns a multi-select select2 box
    //  attrs.value must be passed as number[] (should really be int[]) containing the
    //  selection.
    view: function (ctrl, attrs) {
        var selectedIds = attrs.value();
        //Create a Select2 progrssively enhanced SELECT element
        return m("select", { config: Select2Multi.config(attrs), style: "width:200px", multiple: "multiple" }, [
            attrs.data().map(function (item, index) {
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
            if (typeof jQuery !== 'undefined' && typeof jQuery.fn.select2 !== 'undefined') {
                var el = $(element);
                if (!isInitialized) {
                    el.select2()
                        .on("change", function (e) {
                            var id = el.select2("val");
                            m.startComputation();
                            //Set the value to the selected option
                            var selected = [];
                            ctrl.data().map(function (d) {
                                if (d == id) {
                                    selected.push(id);
                                }
                            });
                            ctrl.value(selected);
                            if (typeof ctrl.onchange == "function") {
                                var arg = { id: ctrl.id, selected: el.select2("val") };
                                ctrl.onchange(arg);
                            }
                            m.endComputation();
                        });
                }
                el.val(ctrl.value()).trigger("change");
            } else {
                console.warn('ERROR: You need jquery and Select2 in the page');
            }
        };
    }
}; // end Select2