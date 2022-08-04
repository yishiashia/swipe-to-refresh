import Spinner from "./spinner";
import refreshLoading from './refreshLoading'
import swipeToRefresh from './swipeToRefresh'

window.customElements.define("spinner-icon", Spinner);
window.customElements.define('refresh-loading', refreshLoading)
window.customElements.define('swipe-refresh', swipeToRefresh)

export default swipeToRefresh
