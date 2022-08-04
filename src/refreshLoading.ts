// import "@webcomponents/webcomponentsjs/webcomponents-bundle"
// import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"
// import "@webcomponents/custom-elements/custom-elements.min.js"
import Spinner from "./spinner";
import loadingStyle from "./refreshLoading.scss";

export default class refreshLoading extends HTMLElement {
  _text: string;
  spinner: Spinner | null;
  constructor() {
    super();
    // Shadow dom
    this.attachShadow({ mode: "open" });
    this._text = "Swipe to refresh";
    this.spinner = null;
  }

  connectedCallback(): void {
    const _self = this;
    let rootElement: HTMLElement | null = null;

    // DOM
    if (this.shadowRoot !== null) {
      if (
        this.hasAttribute("text") &&
        String(this.getAttribute("text")).trim() !== ""
      ) {
        this._text = String(this.getAttribute("text")).trim();
      }
      this.shadowRoot.innerHTML = this.template({ text: this._text });
      rootElement = this.shadowRoot?.querySelector(".container");
    }
    if (
      this.hasAttribute("animated") &&
      this.getAttribute("animated") === "true"
    ) {
      if (rootElement) {
        rootElement.classList.add("animated");
      }
    }

    // Style
    if (_self !== null && _self.shadowRoot !== null) {
      const styleElement = document.createElement("style");
      styleElement.appendChild(document.createTextNode(loadingStyle));
      _self.shadowRoot.appendChild(styleElement);
    }

    if (rootElement) {
      rootElement.addEventListener("transitionend", () => {
        this.style.display = "none";
      });
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

  set text(val: string) {
    this._text = val;
    if (this.shadowRoot !== null) {
      const textElement = this.shadowRoot.getElementById("hint-text")
      if (textElement !== null) {
        textElement.textContent = val;
      }
    }
  }

  template(data: { text: string }): string {
    return `
    <div class="container">
      <spinner-icon></spinner-icon>
      <span id="hint-text">${data.text}</span>
    </div>
    `;
  }
}
