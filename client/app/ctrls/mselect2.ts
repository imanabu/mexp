/// <reference path='../../_all.ts' />

/* Select2 Component implementation for Mithril 
*   Basic usage steps:
*   1. Create an instance of ConfigArg with optionsList filled in with the menu optionsList see the example
*   2. Implmenet appropraite onChange function to extract the selection(s)
*   3. If multiple selections needs to be enabled make multiple to true
*   4. Selected values property will also change when menu selection changes. This is a Mithril property.
*   5. Insert into virtual view, for example m.component(new Mselect2(), ctrl.menuData) where ctrl.menuData
*      contains the ConfigArg instance.
*  EXAMPLE:
   let menuConfig = new ConfigArg(
            true,
            ["ONE", "TWO", "THREE", "FOUR"],
            ((selectedValues: Array<string>): void => {
                alert("callback not initialized");
            }),
            m.prop(new Array<string>()),
            "width:25%"
    );

*/

interface IConfigArg {
    multiple: boolean;
    optionsList: Array<string>;
    onChange(selectedValues: Array<string>): void;
    selectedValuesProp: Mithril.Property<Array<string>>;
    style?: string;
}

class ConfigArg implements IConfigArg {

    constructor(
        public multiple: boolean,
        public optionsList: Array<string>,
        public onChange: (selectedValues: Array<string>) => void,
        public selectedValuesProp: Mithril.Property<Array<string>>,
        public style?: string
    ) { }

}



class Mselect2 implements Mithril.Component<Mithril.Controller> {

    controller(): Mithril.Controller {
        return null;
    }

    view(ctrl, attrs: IConfigArg): Mithril.VirtualElement {
        // Create a Select2 progrssively enhanced SELECT element
        let multiMode = attrs.multiple ? "multiple" : "";
        return m("select", { config: this.config(attrs), style: attrs.style || "font-size: 10px; width:260px", multiple: multiMode }, [
            attrs.optionsList.map((item) => {
                let args = { value: item, selected: "selected" };
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
    }

    config(configArg: IConfigArg): Mithril.ElementConfig {
        let that = this;
        return (element, isInitialized) => {
            if (typeof jQuery !== "undefined" && typeof jQuery.fn.select2 !== "undefined") {
                let el = $(element);
                if (!isInitialized) {
                    el.select2()
                        .on("change", () => {
                            let id = el.select2("val");
                            let selected = [];
                            configArg.optionsList.map((d) => {
                                if (d === id) {
                                    selected.push(id);
                                }
                            });

                            configArg.selectedValuesProp(selected);
                            if (typeof configArg.onChange === "function") {
                                console.log(configArg.selectedValuesProp());
                                configArg.multiple ? configArg.onChange(el.select2("val")) :
                                    configArg.onChange([el.select2("val")]);
                            }

                        });
                }
                el.val(configArg.selectedValuesProp()).trigger("change");
            } else {
                console.warn("ERROR: You need jquery and Select2 in the page");
            }
        };
    }
}; // end Select2




