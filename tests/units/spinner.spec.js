import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import Spinner from '../../src/spinner';

describe('spinner.ts', () => {

  window.customElements.define('spinner-icon', Spinner);

  test('render spinner in JSDOM', () => {
    document.body.innerHTML = `
      <spinner-icon id="spinner"></spinner-icon>
    `;
    const customElement = document.getElementById('spinner');
    expect(customElement === null).toBeFalsy();
  })

  test('spinner with animation', () => {
    document.body.innerHTML = `
      <spinner-icon id="spinner" animated="true"></spinner-icon>
    `;
    const customElement = document.getElementById('spinner')
    expect(customElement === null).toBeFalsy()

    const rootElement = customElement.shadowRoot.querySelector("#container")
    expect(rootElement).toHaveClass("animated")
    customElement.animated = false
    expect(rootElement).not.toHaveClass("animated")
    customElement.animated = true
    expect(rootElement).toHaveClass("animated")
  })

  test('spinner set rotate degree', () => {
    document.body.innerHTML = `
      <spinner-icon id="spinner"></spinner-icon>
    `;
    const customElement = document.getElementById('spinner')
    expect(customElement === null).toBeFalsy()

    customElement.degree = -91
    const circleElement = customElement.shadowRoot.querySelector("circle");
    if (circleElement !== null && circleElement !== undefined) {
      expect(circleElement.style.transform).toBe("rotate(-91deg)");
    }
  })

});