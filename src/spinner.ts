// import "@webcomponents/webcomponentsjs/webcomponents-bundle"
// import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"
// import "@webcomponents/custom-elements/custom-elements.min.js"
import spinnerStyle from "./spinner.scss";

export default class spinner extends HTMLElement {
  constructor() {
    super();
    // Shadow dom
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    const _self = this;

    // DOM
    if (this.shadowRoot !== null) {
      this.shadowRoot.innerHTML = this.template();
    }
    if (
      this.hasAttribute("animated") &&
      this.getAttribute("animated") === "true"
    ) {
      const rootElement = this.shadowRoot?.querySelector("#container");
      if (rootElement) {
        rootElement.classList.add("animated");
      }
    }

    // Style
    if (_self !== null && _self.shadowRoot !== null) {
      const styleElement = document.createElement("style");
      styleElement.appendChild(document.createTextNode(spinnerStyle));
      _self.shadowRoot.appendChild(styleElement);
    }
  }

  set degree(val: number) {
    const circleElement = this.shadowRoot?.querySelector("circle");
    if (circleElement !== null && circleElement !== undefined) {
      circleElement.style.transform = `rotate(${val}deg)`;
    }
  }

  set animated(enableAnimation: boolean) {
    const rootElement = this.shadowRoot?.querySelector("#container");
    if (rootElement) {
      if (enableAnimation) {
        rootElement.classList.add("animated");
      } else {
        rootElement.classList.remove("animated");
      }
    }
  }

  template(): string {
    return `
    <div id="container">
      <svg viewBox="0 0 110 110">
        <circle
          id="spinner"
          style="fill:transparent; stroke:#714C89; stroke-width:18px; stroke-linecap:round;"
          cx="55"
          cy="55"
          r="45"
        ></circle>
      </svg>
    </div>
    `;
  }
}
