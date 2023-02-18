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
  describe("error handling", () => {
    it("does not throw for empty files", () => {
      assert.doesNotThrow(() => {
        detective("");
      });
    });

    it("throws if the given content is not a string", () => {
      assert.throws(
        () => {
          detective(() => {});
        },
        Error,
        "content is not a string"
      );
    });

    it("throws if called with no arguments", () => {
      assert.throws(
        () => {
          detective();
        },
        Error,
        "src not given"
      );
    });

    it("does not throw on broken syntax", () => {
      assert.doesNotThrow(() => {
        detective("<");
      });
    });
  });

  describe("html", () => {
    it("dangles the parsed AST", () => {
      detective("<div></div>");
      assert.ok(detective.ast);
    });

    it("returns the dependencies of the given .html file content", () => {
      const htmlStr = fs
        .readFileSync(path.join(__dirname, "simple.html"), "utf8")
        .toString();
      test(htmlStr, [
        "image.png",
        "image.png",
        "image.png",
        "./image.png",
        "/image.png",
        "~aliasImg",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "./script.file.js",
        "./icons.svg",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png?foo=bar,baz",
        "image.png?bar=baz,foo",
        "image.png",
        "image.png?foo=bar,baz",
        "image.png?bar=baz,foo",
        "image.png",
        "image.png?foo=bar,baz",
        "image.png?bar=baz,foo",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "./example.ogg",
        "example.pdf",
        "image.png",
        "image.png",
        "example.ogg",
        "example.ogg",
        "example.vtt",
        "example.ogg",
        "./image.png",
        "example.ogg",
        "example.vtt",
        "example.pdf",
        "image.png",
        "image.png",
        "image.png",
        "./style.file.css",
        "./style.file.css",
        "./style.file.css",
        "./style.file.css",
        "./style.file.css",
        "./style.file.css",
        "./style.file.css",
        "./style.file.css",
        "./style.file.css",
        "./style.file.css",
        "./style.file.css",
        "./style.file.css",
        "./style.file.css",
        "./image.png",
        "./image.png",
        "./image.png",
        "./style.file.css",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image%20image.png",
        "image.png",
        "module.file.js",
        "fallback.file.js",
        "fallback.file.js",
        "fallback.file.js",
        "image.png",
        "image image.png",
        "image image.png",
        "~aliasImageWithSpace",
        "image.png",
        "image%20image.png",
        "image%20image.png",
        "~aliasImageWithSpace",
        "image.png",
        "image%20image.png",
        "~aliasImageWithSpace",
        "image.png",
        "image.png",
        "~aliasImageWithSpace",
        "~aliasImageWithSpace",
        "~aliasImageWithSpace",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "image.png",
        "~aliasImageWithSpace",
        "./webpack.svg",
        "./webpack.svg",
        "./webpack.svg",
        "./webpack.svg",
        "./pixel.png?url",
        "./pixel.png?url",
        "./im\n\n\n\n\tage.png",
        "./script.file.js",
        "./script.file.js",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./site.webmanifest",
        "./webpack.svg",
        "image.png",
        "image.png",
        "image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./browserconfig.xml",
        "./favicon.ico",
        "./image.png",
        "./image.png",
        "./image.png",
        "./sound.mp3",
        "./sound.mp3",
        "./video.mp4",
        "./video.mp4",
        "./image.png",
        "image.png",
        "image.png",
        "image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        "./image.png",
        ".\\nested\\image3.png",
        "\\nested\\image3.png",
        "/nested\\image3.png",
        "nested\\image3.png",
      ]);
    });
  });
});
