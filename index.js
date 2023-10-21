"use strict";

const { debuglog } = require("util");
const { parse } = require("parse5");
const { traverse, normalizeOptions } = require("./utils");

const debug = debuglog("detective-html");

/**
 * Extract the names of the used files from a given html file's content
 *
 * @param  {String} fileContent
 * @param  {Object} rawOptions: optional argument. When provided, this object contains
 *                  attributes to track the way webpack does it
 *                  (cf. https://webpack.js.org/loaders/html-loader/#object)
 *                  An example of rawOptions is in test/test-data.js
 * @return {String[]}
 */
module.exports = function detective(fileContent, rawOptions={}) {
  if (typeof fileContent === "undefined") throw new Error("content not given");
  if (typeof fileContent !== "string")
    throw new Error("content is not a string");

  let dependencies = [];
  let ast = {};

  // get sourcesOptions, the way webpack does it - cf. https://webpack.js.org/loaders/html-loader/#object
  let norm = normalizeOptions(rawOptions, {})
  let sourcesOption = norm.sources.list

  try {
    debug("content: %s", fileContent);
    ast = parse(fileContent);
  } catch (error) {
    debug("parse error: %s", error.message);
  }

  detective.ast = ast;

  const sources = [];

  traverse(ast, (node) => {
    const { tagName, attrs: attributes } = node;

    if (!tagName) {
      return;
    }

    attributes.forEach((attribute) => {
      let { name } = attribute;

      name = attribute.prefix ? `${attribute.prefix}:${name}` : name;

      const handlers = sourcesOption.get(tagName.toLowerCase());

      if (!handlers) {
        return;
      }

      if (handlers.size === 0) {
        return;
      }

      const handler = handlers.get(name.toLowerCase());

      if (!handler) {
        return;
      }

      if (handler.filter && !handler.filter(tagName, name, attributes)) {
        return;
      }

      const optionsForTypeFn = {
        tag: tagName,
        attributes,
        attribute: name,
        attributePrefix: attribute.prefix,
        attributeNamespace: attribute.namespace,
        value: attribute.value,
      };

      let result;

      try {
        result = handler.type(optionsForTypeFn);
      } catch (error) {
        debug("handler.type error: %s", error.message);
      }

      result = Array.isArray(result) ? result : [result];

      for (const source of result) {
        if (!source) {
          continue;
        }

        sources.push({ value: source.value });
      }
    });
  });

  for (const source of sources) {
    const { value } = source;

    let request = value;

    const indexHash = request.lastIndexOf("#");

    if (indexHash >= 0) {
      request = request.substring(0, indexHash);
    }

    dependencies.push(request);
  }

  return dependencies;
};
