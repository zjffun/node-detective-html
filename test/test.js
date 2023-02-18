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
      test(htmlStr, []);
    });
  });
});
