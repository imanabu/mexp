console.log("main loaded");

var app = app || {};

app.controller = function() {
    // Device collection
    var ctrl = this;
	ctrl.list = app.storage.get();
    ctrl.listCount = m.prop(0);
    ctrl.approvedDevices = approvedDevices;
     
	// Update with props
	ctrl.list = ctrl.list.map(function (item) {
		return new app.Device(item);
	});
    
    ctrl.selectedDev = m.prop(0);
    
    ctrl.addNew = function addNew () {
        var that = this;
        var nd = app.NewDevice();
        that.list.push(nd);
        var len = that.list.length;
        that.listCount(len);
    }
}

var Select2 = {
    //    Returns a select box
    // Usage: see http://mithril.js.org/integration.html but in general
    // insert as m.component(Select2 { data: listOfSelections[], value: currentlySelected, onchange: chageCallBack(id)})
    // Be sure to scroll down to the bottom of the page to see the acual coding example including the use if id and name
    // This is modifed so that the data source uses the mithril getter and setter factories and not
    // plain Json structure.
    view: function(ctrl, attrs) {
        var selectedId = attrs.value;
        //Create a Select2 progrssively enhanced SELECT element
        return m("select", {config: Select2.config(attrs), style:"width:320px"}, [
            attrs.data.map(function(item, index) {
                var args = {value: index};
                //    Set selected option
                if(item.id == selectedId) {
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
    config: function(ctrl) {
        return function(element, isInitialized) {
            if(typeof jQuery !== 'undefined' && typeof jQuery.fn.select2 !== 'undefined') {
                var el = $(element);
                if (!isInitialized) {
                    el.select2()
                        .on("change", function(e) {
                            var id = el.select2("val");
                            m.startComputation();
                            //Set the value to the selected option
                            ctrl.data.map(function(d, index){
                                if(index == id) {
                                    ctrl.value(id);
                                }
                            });

                            if (typeof ctrl.onchange == "function"){
                                ctrl.onchange(el.select2("val"));
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
};