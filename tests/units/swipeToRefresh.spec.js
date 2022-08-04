import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import refreshLoading from '../../src/refreshLoading';
import swipeToRefresh from '../../src/swipeToRefresh';

describe('swipeToRefresh.ts', () => {

  window.customElements.define('refresh-loading', refreshLoading);
  window.customElements.define('swipe-refresh', swipeToRefresh);

  test('render swipe-refresh in JSDOM', () => {
    document.body.innerHTML = `
      <swipe-refresh id="swipe"></swipe-refresh>
    `;
    const customElement = document.getElementById('swipe');
    expect(customElement === null).toBeFalsy();
  })

  test('given attributes of pull hints', () => {
    document.body.innerHTML = `
      <swipe-refresh
        id="swipe"
        pull-text="pulling"
        drop-text="release to refresh"
        refresh-text="try to refresh"
        finish-text="it is updated"
      ></swipe-refresh>
    `;
    const customElement = document.getElementById('swipe');
    expect(customElement === null).toBeFalsy();
    expect(customElement.shadowRoot.querySelector("refresh-loading").shadowRoot.getElementById("hint-text").textContent).toBe("pulling")
  })

})
