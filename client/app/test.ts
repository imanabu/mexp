/// <reference path='../_all.ts' />
/// <reference path='./ctrls/mselect2.ts' />

declare const testMode: string;

if (testMode === "multiTest") {

    let menuConfig = new ConfigArg(
            true,
            ["ONE", "TWO", "THREE", "FOUR"],
            ((selectedValues: Array<string>): void => {
                alert("callback not initialized");
            }),
            m.prop(new Array<string>()),
            "width:25%"
    );

    /* 
    * Sample Controller, including the pulldown mode change.
    */
    class select20MultiSampleCtrl implements Mithril.Component<any> {

        public menuData: IConfigArg;

        // TIP: Do not declare function body. Do this in controller
        public onModeChange: (buttonMode: string) => void;

        // Using the Constructor Method of making the controller.
        // This will supply "this" as the ctrl to the view(ctrl) call

        controller(configArg: IConfigArg): Mithril.Controller {
            let ctrl = this;
            ctrl.menuData = configArg;

            // * IMPORTANT TIP * This is where the menu selection callbacks are hooked up.


            ctrl.onModeChange = (buttonMode: string): void => {
                if (buttonMode === "S") ctrl.menuData.multiple = false;
                else ctrl.menuData.multiple = true;
            }
            return;
        }

        view(ctrl: select20MultiSampleCtrl) {
            console.log("View refresh");
            let list2 = (x: string[]): string => {
                if (x === undefined || x === null || x.length === 0) return " Nothing";
                let s = "", t = _.initial(x).map((y) => { s += y + ", " });
                s += _.last(x);
                return s;
            }
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
                m("div", "selected: " + ctrl.menuData.multiple ? list2(ctrl.menuData.selectedValuesProp()) : ctrl.menuData.selectedValuesProp()
                )
            ]);
        }
    }

    // * IMPORTANT TIP * use m.component to pass on the menu data
    m.mount($("#testdiv")[0], m.component<Mithril.Controller>(new select20MultiSampleCtrl, menuConfig));
}
