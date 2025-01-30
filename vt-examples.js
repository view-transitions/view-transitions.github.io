const createElement = (
    /* string */ tag,
    /* Object */ {
        prepend = [], // prepend at start
        append = [], // append at end
        //classes = [], // set .classList
        style = {}, // set .style
        attrs = {}, // set attributes
        ...props // catch remaing props, like listeners onclick, className, etc
    } = {},
    /* Node   */ element = document.createElement(tag) // create or use existing element
) => {
    element.prepend(...prepend); // append children
    element.append(...append); // append children
    Object.keys(attrs).forEach((key) => element.setAttribute(key, attrs[key])); // set attributes
    //element.classList.add(...classes); // add classes
    Object.assign(element.style, style); // assign style
    return Object.assign(element, props); // assign remaing properties
};

customElements.define('vt-pages', class extends HTMLElement {
    connectedCallback() {
        this.append(
            ...[
                { title: "Tags", file: "vt-tags" },
                { title: "Tabs", file: "vt-tabs" },
                { title: "Stack", file: "vt-stack" },
            ].map(({ title, file }) => {
                // ------------------------------------------------------------
                return createElement("A", {
                    href: `./${file}.html`,
                    innerHTML: title,
                    style: {
                        background: window.location.href.includes(file) ? "lightgreen" : "none",
                        padding: "0.5em"
                    }
                });
            })
        )
    }
})
setTimeout(() => {
    document.body.prepend(
        createElement("STYLE", {
            textContent:
                `body{font:16px arial}` +
                `A { zoom:2;margin: 0.5em; }` +
                `vt-pages { background:beige;margin-bottom:2em; display: flex; flex-wrap: wrap; justify-content: center; }`
        }),
        // createElement("vt-pages")
    );
}, 10);