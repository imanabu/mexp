console.log("main loaded");

var app = app || {};

app.controller = function() {
    // Device collection
	this.list = app.storage.get();
    this.devNames = deviceNames.map(function(item, index) { return new app.DevName(item, index)});
   
	// Update with props
	this.list = this.list.map(function (item) {
		return new app.Device(item);
	});
}


var Select2 = {
    //    Returns a select box
    // Usage: see http://mithril.js.org/integration.html but in general
    // insert as m.component(Select2 { data: listOfSelections[], value: currentlySelected, onchange: chageCallBack(id)})
    // Be sure to scroll down to the bottom of the page to see the acual coding example including the use if id and name
    // 
    view: function(ctrl, attrs) {
        var selectedId = attrs.value().id;
        //Create a Select2 progrssively enhanced SELECT element
        return m("select", {config: Select2.config(attrs)}, [
            attrs.data.map(function(item) {
                var args = {value: item.id};
                //    Set selected option
                if(item.id == selectedId) {
                    args.selected = "selected";
                }
                return m("option", args, item.name);
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
                            ctrl.data.map(function(d){
                                if(d.id == id) {
                                    ctrl.value(d);
                                }
                            });

                            if (typeof ctrl.onchange == "function"){
                                ctrl.onchange(el.select2("val"));
                            }
                            m.endComputation();
                        });
                }
                el.val(ctrl.value().id).trigger("change");
            } else {
                console.warn('ERROR: You need jquery and Select2 in the page');    
            }
        };
    }
};