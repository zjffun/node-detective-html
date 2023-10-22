[![npm][npm]][npm-url]
[![cover][cover]][cover-url]
[![node][node]][node-url]
[![size][size]][size-url]

# node-detective-html

Find the dependencies of an HTML file.

```sh
npm install detective-html
```

It's the HTML counterpart to [detective](https://github.com/substack/node-detective), [detective-amd](https://github.com/dependents/node-detective-amd), [detective-es6](https://github.com/dependents/node-detective-es6), [detective-sass](https://github.com/dependents/node-detective-sass).

- The AST is generated using the [parse5](https://github.com/inikulin/parse5) parser.

### Usage

```js
const fs = require("fs");
const detective = require("detective-html");

const content = fs.readFileSync("index.html", "utf8");

// list the names of the used files (ex: 'foo.css', 'foo.png', etc)
const dependencies = detective(content);
```
### Non-standard attributes

In many cases, ```data-src,...``` are used to [lazy load images](https://stackoverflow.com/questions/12396068/speed-up-page-load-by-deferring-images)

This is possible detective outputs such non-standard attribute dependencies by adding
a list of html tags and associated specific attributes.
The way it is provided is similar to what
[webpack uses](https://webpack.js.org/loaders/html-loader/#object).

```js
const options = {
  sources: {
    list:
      [
        "...",
        { tag: "img", attribute: "data-src", type: "src", },
        { tag: "img", attribute: "data-srcset", type: "srcset", },
        { tag: "source", attribute: "data-src", type: "src", },
        { tag: "source", attribute: "data-srcset", type: "srcset", },
      ]
  }
}
const dependencies = detective(content, options);
```

### License

MIT

[npm]: https://img.shields.io/npm/v/detective-html.svg
[npm-url]: https://npmjs.com/package/detective-html
[node]: https://img.shields.io/node/v/detective-html.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/zjffun/detective-html.svg
[deps-url]: https://david-dm.org/zjffun/detective-html
[cover]: https://codecov.io/gh/zjffun/detective-html/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/zjffun/detective-html
[size]: https://packagephobia.now.sh/badge?p=detective-html
[size-url]: https://packagephobia.now.sh/result?p=detective-html
