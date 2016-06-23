/// <reference path='../../_all.ts' />
var ConfigArg = (function () {
    function ConfigArg(multiple, optionsList, onChange, selectedValuesProp, style) {
        this.multiple = multiple;
        this.optionsList = optionsList;
        this.onChange = onChange;
        this.selectedValuesProp = selectedValuesProp;
        this.style = style;
    }
    return ConfigArg;
}());
var Mselect2 = (function () {
    function Mselect2() {
    }
    Mselect2.prototype.controller = function () {
        return null;
    };
    Mselect2.prototype.view = function (ctrl, attrs) {
        // Create a Select2 progrssively enhanced SELECT element
        var multiMode = attrs.multiple ? "multiple" : "";
        return m("select", { config: this.config(attrs), style: attrs.style || "font-size: 10px; width:260px", multiple: multiMode }, [
            attrs.optionsList.map(function (item) {
                var args = { value: item, selected: "selected" };
                //    Set selected option
                if (_.contains(attrs.selectedValuesProp(), item)) {
                    args.selected = "selected";
                }
                else {
                    args.selected = "";
                }
                return m("option", args, item);
            })
        ]);
    };
    Mselect2.prototype.config = function (configArg) {
        var that = this;
        return function (element, isInitialized) {
            if (typeof jQuery !== "undefined" && typeof jQuery.fn.select2 !== "undefined") {
                var el_1 = $(element);
                if (!isInitialized) {
                    el_1.select2()
                        .on("change", function () {
                        var id = el_1.select2("val");
                        var selected = [];
                        configArg.optionsList.map(function (d) {
                            if (d === id) {
                                selected.push(id);
                            }
                        });
                        configArg.selectedValuesProp(selected);
                        if (typeof configArg.onChange === "function") {
                            console.log(configArg.selectedValuesProp());
                            configArg.multiple ? configArg.onChange(el_1.select2("val")) :
                                configArg.onChange([el_1.select2("val")]);
                        }
                    });
                }
                el_1.val(configArg.selectedValuesProp()).trigger("change");
            }
            else {
                console.warn("ERROR: You need jquery and Select2 in the page");
            }
        };
    };
    return Mselect2;
}());
; // end Select2
//# sourceMappingURL=mselect2.js.map