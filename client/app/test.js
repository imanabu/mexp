/// <reference path='../_all.ts' />
/// <reference path='./ctrls/m-select20.ts' />
if (testMode === "multiTest") {
    var config_1 = {
        optionsList: ["ONE", "TWO", "THREE"],
        selectedValues: m.prop(new Array()),
        onChange: (function (selectedValues) {
        })
    };
    var disp = (function () {
        function disp() {
        }
        disp.prototype.controller = function () {
            var that = this;
            that.selected = m.prop(new Array());
            config_1.onChange = (function (selectedValues) {
                console.log(selectedValues);
                config_1.selectedValues(selectedValues);
            });
            return this;
        };
        disp.prototype.view = function (ctrl) {
            return m("span", [
                m("h1", "pulldown"),
                m.component(new Select20Multi(), config_1),
                m("h3", "selected " + config_1.selectedValues())
            ]);
        };
        return disp;
    }());
    m.mount($("#testdiv")[0], new disp());
}
//# sourceMappingURL=test.js.map