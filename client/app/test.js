/// <reference path='../_all.ts' />
/// <reference path='./ctrls/mselect2.ts' />
if (testMode === "multiTest") {
    var menuConfig_1 = new ConfigArg(true, ["ONE", "TWO", "THREE", "FOUR"], (function (selectedValues) {
        alert("callback not initialized");
    }), m.prop(new Array()), "width:25%");
    /*
    * Sample Controller, including the pulldown mode change.
    */
    var select20MultiSampleCtrl = (function () {
        function select20MultiSampleCtrl() {
        }
        // Using the Constructor Method of making the controller.
        // This will supply "this" as the ctrl to the view(ctrl) call
        select20MultiSampleCtrl.prototype.controller = function (configArg) {
            var ctrl = this;
            ctrl.menuData = configArg;
            // * IMPORTANT TIP * This is where the menu selection callbacks are hooked up.
            ctrl.onModeChange = function (buttonMode) {
                if (buttonMode === "S")
                    ctrl.menuData.multiple = false;
                else
                    ctrl.menuData.multiple = true;
            };
            return;
        };
        select20MultiSampleCtrl.prototype.view = function (ctrl) {
            console.log("View refresh");
            var list2 = function (x) {
                if (x === undefined || x === null || x.length === 0)
                    return " Nothing";
                var s = "", t = _.initial(x).map(function (y) { s += y + ", "; });
                s += _.last(x);
                return s;
            };
            return m("span", [
                m("h1", "Multi Pulldown Mithrill TypeScript Component Demo"),
                m("div", [
                    // m.withAttr must be used to hookup an element event in Mithril, otherwise
                    // onclick will be called on every refresh and actually not be hooked up the
                    // element.
                    m("span", { class: "button", onclick: m.withAttr("v", ctrl.onModeChange), v: "S" }, "Single"),
                    m("span", { class: "button", onclick: m.withAttr("v", ctrl.onModeChange), v: "M" }, "Multi"),
                ]),
                // * IMPORTANT TIP * use m.component to pass on the menu data
                m.component(new Mselect2(), ctrl.menuData),
                m("div", "selected: " + ctrl.menuData.multiple ? list2(ctrl.menuData.selectedValuesProp()) : ctrl.menuData.selectedValuesProp())
            ]);
        };
        return select20MultiSampleCtrl;
    }());
    // * IMPORTANT TIP * use m.component to pass on the menu data
    m.mount($("#testdiv")[0], m.component(new select20MultiSampleCtrl, menuConfig_1));
}
//# sourceMappingURL=test.js.map