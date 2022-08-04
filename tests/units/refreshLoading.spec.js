import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import refreshLoading from '../../src/refreshLoading';

describe('spinner.ts', () => {

  window.customElements.define('refresh-loading', refreshLoading);

  test('render loading element in JSDOM', () => {
    document.body.innerHTML = `
      <refresh-loading id="loading"></refresh-loading>
    `;
    const customElement = document.getElementById('loading');
    expect(customElement === null).toBeFalsy();
  })

  test('set text with attribute', () => {
    const magicString = "Some text string...(1)";
    document.body.innerHTML = `
      <refresh-loading id="loading" text="${magicString}"></refresh-loading>
    `;
    const customElement = document.getElementById('loading');
    expect(customElement === null).toBeFalsy();
    expect(customElement.shadowRoot.getElementById("hint-text").textContent).toBe(magicString)
  })

  test('set text of loading element', () => {
    document.body.innerHTML = `
      <refresh-loading id="loading"></refresh-loading>
    `;
    const customElement = document.getElementById('loading');
    expect(customElement === null).toBeFalsy();
    const magicString = "Some text string...(2)";
    customElement.text = magicString;
    expect(customElement.shadowRoot.getElementById("hint-text").textContent).toBe(magicString)
  })

  test('hide element animation', async () => {
    document.body.innerHTML = `
      <refresh-loading id="loading"></refresh-loading>
    `;
    const customElement = document.getElementById('loading');
    expect(customElement === null).toBeFalsy();
    await fireEvent.transitionEnd(customElement.shadowRoot.querySelector('.container'))
    expect(customElement.style.display).toBe('none')
  })

})