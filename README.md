# swipe-to-refresh
[![ES6][es6-image]][es6-url] [![TypeScript][ts-image]][ts-url] [![License][license-image]][license-url] [![Published on webcomponents.org][wc-image]][wc-url]

[![NPM][npm-image]][npm-url]

A WebComponent to pull the window down and refresh


![Demo image](https://yishiashia.github.io/img/demo/swipe-to-refresh.png)

## Install

    $ npm install swipe-to-refresh

## Syntax

```html
<html lang="en">

<head>
  <script src="swipe-refresh.js"></script>
  <script>
    function doRefresh() {
      console.log("Refresh!!");
    }
    function init() {
      document.querySelector("swipe-refresh").refresh = doRefresh;
    }
  </script>
</head>

<body onload="init()">
  <swipe-refresh></swipe-refresh>
  <div style="width: 100%; height: 150vh;"></div>
</body>

</html>
```

## Demo page
The demo page: https://yishiashia.github.io/swipe-to-refresh.html
## Usage

If you want to customize this web component, you can import the library and
implement your new class by extend `SwipeToRefresh`.

```js
import SwipeToRefresh from "swipe-to-refresh";

class customizedSwipeToRefresh extends SwipeToRefresh {
    // override here
}

```

### Options
- [swipe-to-refresh](#swipe-to-refresh)
  - [Install](#install)
  - [Syntax](#syntax)
  - [Demo page](#demo-page)
  - [Usage](#usage)
    - [Options](#options)
      - [pull-text (optional)](#pull-text-optional)
      - [drop-text (optional)](#drop-text-optional)
      - [refresh-text (optional)](#refresh-text-optional)
      - [finish-text (optional)](#finish-text-optional)

#### pull-text (optional)

The hint message to ask user pull down the page.
Default value is "Swipe to refresh".

#### drop-text (optional)

The hint message when user pull distance is larger than threshold.
Default value is "Release to refresh".

#### refresh-text (optional)

The hint message when executing the refresh function.
Default value is "Refreshing".

#### finish-text (optional)

The hint message after finish execuing refresh function.
Default value is "Updates".


[es6-image]: https://img.shields.io/badge/ES-6%2B-ff69b4.svg?style=flat-square
[es6-url]: https://www.ecma-international.org/ecma-262/6.0/

[ts-image]: https://img.shields.io/badge/TypeScript-^4.7.4-blue?style=flat-square
[ts-url]: https://www.typescriptlang.org/

[license-image]: https://img.shields.io/badge/license-MIT-green.svg?maxAge=2592000&style=flat-square
[license-url]: https://opensource.org/licenses/MIT

[wc-image]: https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square
[wc-url]: https://www.webcomponents.org/element/swipe-to-refresh

[npm-image]: https://nodei.co/npm/swipe-to-refresh.png?mini=true
[npm-url]: https://www.npmjs.com/package/swipe-to-refresh