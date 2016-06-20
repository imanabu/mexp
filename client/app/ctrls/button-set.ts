/// <reference path='../../_all.ts' />

// Button Based Select Mithril Component


class ButtonSet implements Mithril.Component<any> {
    public constructor(
        public labels: string[],
        public selectedIndex: string,
        public multi: boolean,
        public selectedValues: Mithril.Property<string[]>
    ) {
    }

    public controller(): Mithril.Controller {
        let ctrl = this;

        this.onClick = function(): void {
            console.log("Clicked!");
            return;
        };

        return;
    }

    private onClick(): void {};

    public view(ctrl: Mithril.Controller): Mithril.VirtualElement {
        let that = this; // important, For proper closures for inside lambdas
        let btns: Array<Mithril.VirtualElement> = that.labels.map(
            function (item, index): Mithril.VirtualElement {
                return m("span", [
                    m("span", {
                        "class": "button",
                        "config": that.config(that),
                        onClick: function() { }
                    }, item),
                    m("span", m.trust("&nbsp;"))]);
            }
        );
        return m("span", btns);
    }

    public config(ctx: any): any {
        // Close over the context of the caller to construct the call back.
        let that = this; // should give ButtonSet 
        return function (element: any, isInitialized: boolean) {
            // let whatisthat = that; // confirmed that the BottunSet object is carrying
            if (!isInitialized) {
                element.onClick =
                       ctx.onClick();
            } else {
                element.val(ctx.value).trigger("click");
            }
        };
    }
}

m.mount($("#button-set")[0], (new ButtonSet(
    ["one", "two"], "0", false, m.prop([""]))
));

