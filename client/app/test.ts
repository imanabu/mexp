/// <reference path='../_all.ts' />
/// <reference path='./ctrls/m-select20.ts' />

declare const testMode: string;

if (testMode === "multiTest") {
    let config: IConfigArg =
        {
            optionsList: ["ONE", "TWO", "THREE"],
            selectedValues: m.prop(new Array<string>()),
            onChange: ((selectedValues: Array<string>): void => {
                console.log("callback not initialized");
            })
        };

    class disp implements Mithril.Component<any> {

        public selected: Mithril.Property<Array<string>>;

        controller() {
            let that = this;
            that.selected = m.prop(new Array<string>());
            config.onChange = ((selectedValues: Array<string>): void => {
                console.log("Selected: " + selectedValues);
                config.selectedValues(selectedValues);
                m.redraw();
            });
            return this;
        }

        view(ctrl) {
            console.log("View refresh");
            return m("span", [
                m("h1", "pulldown"),
                m.component(new Select20Multi(), config),
                m("h3", config.selectedValues().toString());
            ]);
        }
    }

    m.mount($("#testdiv")[0], new disp());

}
