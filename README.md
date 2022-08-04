# swipe-to-refresh
[![NPM](https://nodei.co/npm/swipe-to-refresh.png?mini=true)](https://www.npmjs.com/package/swipe-to-refresh)

[![Javascript](https://img.shields.io/badge/ES-6%2B-ff69b4.svg?style=flat-square)](https://www.ecma-international.org/ecma-262/6.0/)
[![TypeScript](https://img.shields.io/badge/TypeScript-^4.7.4-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg?maxAge=2592000&style=flat-square)](https://opensource.org/licenses/MIT)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square)](https://www.webcomponents.org/element/swipe-to-refresh)


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
