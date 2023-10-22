/* eslint-env mocha */

"use strict";

const path = require("path");
const fs = require("fs");
const assert = require("assert").strict;
const detective = require("../index.js");

function test(source, dependencies, options) {
  assert.deepEqual(detective(source, options), dependencies);
}

describe("detective-html", () => {
  describe("html", () => {
    it("Dependencies with data-src and data-srcset on img and source", () => {
      const htmlStr = fs
        .readFileSync(path.join(__dirname, "data.html"), "utf8")
        .toString();
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
      test(htmlStr, [
        'image1.png',
        'small2.png',
        'big3.webp',
        'small4.png',
        'big5.webp',
        'small6.png',
        'big7.webp',
        'img/big8.webp',
        'img/big9.jpg',
        'img/big10.png',
        'img/backup1.jpg',
        'video1.ogg',
      ],
        options);
    });
  });
});
