// import "@webcomponents/webcomponentsjs/webcomponents-bundle"
// import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"
// import "@webcomponents/custom-elements/custom-elements.min.js"
import Spinner from "./spinner";
import RefreshLoading from "./refreshLoading";
export default class swipeToRefresh extends HTMLElement {

  swipeTarget: HTMLElement | Window;

  pullHintText: string;
  dropHintText: string;
  refreshText: string;
  finishText: string;

  isPassiveSupport: boolean;
  enablePassive: boolean;

  distanceThreshold: number;
  touchStartY: number | null;
  touchMoveY: number;

  _refresh: Function;

  constructor() {
    super();
    // Shadow dom
    this.attachShadow({ mode: "open" });

    this.swipeTarget = window;

    this.pullHintText = "Swipe to refresh";
    this.dropHintText = "Release to refresh";
    this.refreshText = "Refreshing";
    this.finishText = "Updated";

    this.isPassiveSupport = false;
    this.enablePassive = false;

    this.distanceThreshold = 60;
    this.touchStartY = null;
    this.touchMoveY = 0;

    this.setupDOM = this.setupDOM.bind(this)
    this.parseAttributes = this.parseAttributes.bind(this)
    this.checkPassiveSupport = this.checkPassiveSupport.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.doRefresh = this.doRefresh.bind(this)

    this.checkPassiveSupport()

    this._refresh = () => {}
  }

  connectedCallback(): void {
    this.parseAttributes();
    this.setupDOM();

    this.swipeTarget.addEventListener("touchstart", this.onTouchStart);
    this.swipeTarget.addEventListener("touchmove", this.onTouchMove);
    this.swipeTarget.addEventListener("touchend", this.onTouchEnd);
  }

  disconnectedCallback() {
    this.swipeTarget.removeEventListener("touchstart", this.onTouchStart);
    this.swipeTarget.removeEventListener("touchmove", this.onTouchMove);
    this.swipeTarget.removeEventListener("touchend", this.onTouchEnd);
  }

  setupDOM() {
    if (this.shadowRoot !== null) {
      this.shadowRoot.innerHTML = this.template(this.pullHintText);
    }
  }

  parseAttributes() {
    if (this.hasAttribute("pull-text")) {
      this.pullHintText = String(this.getAttribute("pull-text"));
    }
    if (this.hasAttribute("drop-text")) {
      this.dropHintText = String(this.getAttribute("drop-text"));
    }
    if (this.hasAttribute("refresh-text")) {
      this.refreshText = String(this.getAttribute("refresh-text"));
    }
    if (this.hasAttribute("finish-text")) {
      this.finishText = String(this.getAttribute("finish-text"));
    }
  }

  onTouchStart(e: Event) {
    const touchEvent = e as TouchEvent
    if (this.shouldRefresh()) {
      this.touchStartY = touchEvent.touches[0].screenY
    }
  }

  onTouchMove(e: Event) {
    const touchEvent = e as TouchEvent
    const loadingElement = this.shadowRoot?.getElementById("loading") as RefreshLoading
    if (loadingElement !== null && loadingElement !== undefined) {
      const spinnerElement = loadingElement.shadowRoot?.querySelector("spinner-icon") as Spinner
      if (spinnerElement !== null && spinnerElement !== undefined) {
        if (this.shouldRefresh()) {
          if (this.touchStartY !== null) {
            this.touchMoveY = touchEvent.touches[0].screenY - this.touchStartY;
            spinnerElement.degree = -90 + this.touchMoveY;
            const loadingRootDiv = loadingElement.shadowRoot?.querySelector(".container") as HTMLElement
            if (loadingRootDiv !== null && loadingRootDiv !== undefined) {
              loadingRootDiv.style.top = `${this.touchMoveY / 5}px`;
            }
            if (this.touchMoveY > this.distanceThreshold) {
              loadingElement.style.display = "flex";
              spinnerElement.animated = false;
              loadingElement.shadowRoot?.querySelector(".container")?.classList.remove("hide");
            }
            if (this.touchMoveY > this.distanceThreshold * 2) {
              loadingElement.text = this.dropHintText;
            } else if (this.touchMoveY > this.distanceThreshold) {
              loadingElement.text = this.pullHintText;
            }
          }
        }
      }
    }
  }

  onTouchEnd() {
    const loadingElement = this.shadowRoot?.getElementById("loading") as RefreshLoading
    if (loadingElement !== null && loadingElement !== undefined) {
      const spinnerElement = loadingElement.shadowRoot?.querySelector("spinner-icon") as Spinner
      if (spinnerElement !== null && spinnerElement !== undefined) {
        const loadingRootDiv = loadingElement.shadowRoot?.querySelector(".container") as HTMLElement
        if (this.touchMoveY > this.distanceThreshold * 2) {
          spinnerElement.animated = true;
          if (loadingRootDiv !== null && loadingRootDiv !== undefined) {
            loadingRootDiv.style.top = "0.5rem";
          }
          loadingElement.text = this.refreshText;
          this.doRefresh();
        } else {
          if (loadingRootDiv !== null && loadingRootDiv !== undefined) {
            loadingRootDiv.classList.add("hide");
          }
        }
      }
    }
  }

  checkPassiveSupport() {
    const _self = this;
    try {
      window.addEventListener(
        "test",
        (): void => {
          void 0;
        },
        {
          get passive() {
            _self.isPassiveSupport = true;
            return true;
          },
        }
      );
    } catch (e) {
      // do nothing
    }
  }

  shouldRefresh() {
    return window.scrollY < 50;
  }

  doRefresh() {
    this._refresh()
    const loadingElement = this.shadowRoot?.getElementById("loading") as RefreshLoading
    if (loadingElement !== null && loadingElement !== undefined) {
      loadingElement.text = this.finishText;
      const loadingRootDiv = loadingElement.shadowRoot?.querySelector(".container") as HTMLElement
      if (loadingRootDiv !== null && loadingElement !== undefined) {
        setTimeout(() => {
          loadingRootDiv.classList.add("hide");
        }, 100);
      }
    }
  }

  set refresh(func: any) {
    if (typeof func === "function") {
      this._refresh = func
    }
  }

  template(pullText: string): string {
    return `
      <h1 id="testtest"></h1>
      <refresh-loading
        id="loading"
        text="${pullText}"
        style="display: none;"
      >
      </refresh-loading>
    `;
  }
}
