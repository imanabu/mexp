/// <reference path='../../_all.ts' />
// Button Based Select Mithril Component
var ButtonSet = (function () {
    function ButtonSet(labels, selectedIndex, multi, selectedValues) {
        this.labels = labels;
        this.selectedIndex = selectedIndex;
        this.multi = multi;
        this.selectedValues = selectedValues;
    }
    ButtonSet.prototype.controller = function () {
        var ctrl = this;
        this.onClick = function () {
            console.log("Clicked!");
            return;
        };
        return;
    };
    ButtonSet.prototype.onClick = function () { };
    ;
    ButtonSet.prototype.view = function (ctrl) {
        var that = this; // important, For proper closures for inside lambdas
        var btns = that.labels.map(function (item, index) {
            return m("span", [
                m("span", {
                    "class": "button",
                    "config": that.config(that),
                    onClick: function () { }
                }, item),
                m("span", m.trust("&nbsp;"))]);
        });
        return m("span", btns);
    };
    ButtonSet.prototype.config = function (ctx) {
        // Close over the context of the caller to construct the call back.
        var that = this; // should give ButtonSet 
        return function (element, isInitialized) {
            // let whatisthat = that; // confirmed that the BottunSet object is carrying
            if (!isInitialized) {
                element.onClick =
                    ctx.onClick();
            }
            else {
                element.val(ctx.value).trigger("click");
            }
        };
    };
    return ButtonSet;
}());
m.mount($("#button-set")[0], (new ButtonSet(["one", "two"], "0", false, m.prop([""]))));
//# sourceMappingURL=button-set.js.map