import { createVNode, openBlock, createBlock, withModifiers, createCommentVNode, renderSlot, resolveComponent, createSlots, withCtx, Fragment, renderList, resolveDynamicComponent, createTextVNode, toDisplayString, useSSRContext, defineComponent, unref, mergeProps, createApp } from "vue";
import { ssrRenderComponent, ssrRenderAttrs } from "vue/server-renderer";
import algoliasearch from "algoliasearch/lite.js";
import InstantSearch from "vue-instantsearch/vue3/es/src/components/InstantSearch.js";
function s$2(r2, e2, o2) {
  if (!r2)
    throw new Error("You need to provide `widgetName` in your data");
  var t2 = ["ais-" + r2];
  return e2 && t2.push("-" + e2), o2 && t2.push("--" + o2), t2.join("");
}
var t$3 = function(t2) {
  var a2 = t2.name;
  return { props: { classNames: { type: Object, default: void 0 } }, methods: { suit: function(t3, e2) {
    var r2 = s$2(a2, t3, e2), i = this.classNames && this.classNames[r2];
    return i ? [r2, i].join(" ") : r2;
  } } };
};
var e$c = false, o$1 = true;
function e$b(e2) {
  for (var r2 = arguments, n2 = 1; n2 < arguments.length; n2++) {
    var o2 = null != r2[n2] ? r2[n2] : {}, c2 = Object.keys(o2);
    "function" == typeof Object.getOwnPropertySymbols && (c2 = c2.concat(Object.getOwnPropertySymbols(o2).filter(function(e3) {
      return Object.getOwnPropertyDescriptor(o2, e3).enumerable;
    }))), c2.forEach(function(r3) {
      t$2(e2, r3, o2[r3]);
    });
  }
  return e2;
}
function t$2(e2, t2, r2) {
  return t2 in e2 ? Object.defineProperty(e2, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e2[t2] = r2, e2;
}
var n$3 = /* @__PURE__ */ new Set();
function a$6(a2) {
  n$3.has(a2) || (n$3.add(a2), console.warn(a2));
}
var n$2 = function(n2, i) {
  var s2;
  void 0 === n2 && (n2 = {});
  var a2 = n2.connector;
  return void 0 === i && (i = {}), (s2 = { inject: { instantSearchInstance: { from: "$_ais_instantSearchInstance", default: function() {
    var t2 = this.$options._componentTag;
    throw new TypeError('It looks like you forgot to wrap your Algolia search component "<' + t2 + '>" inside of an "<ais-instant-search>" component.');
  } }, getParentIndex: { from: "$_ais_getParentIndex", default: function() {
    var t2 = this;
    return function() {
      return t2.instantSearchInstance.mainIndex;
    };
  } } }, data: function() {
    return { state: null };
  }, created: function() {
    if ("function" == typeof a2) {
      if (this.factory = a2(this.updateState, function() {
      }), this.widget = e$b(this.factory(this.widgetParams), i), this.getParentIndex().addWidgets([this.widget]), this.instantSearchInstance._initialResults && !this.instantSearchInstance.started) {
        if ("function" != typeof this.instantSearchInstance.__forceRender)
          throw new Error("You are using server side rendering with <ais-instant-search> instead of <ais-instant-search-ssr>.");
        this.instantSearchInstance.__forceRender(this.widget, this.getParentIndex());
      }
    } else
      true !== a2 && a$6("You are using the InstantSearch widget mixin, but didn't provide a connector.\nWhile this is technically possible, and will give you access to the Helper,\nit's not the recommended way of making custom components.\n\nIf you want to disable this message, pass { connector: true } to the mixin.\n\nRead more on using connectors: https://alg.li/vue-custom");
  } }).beforeUnmount = function() {
    this.widget && this.getParentIndex().removeWidgets([this.widget]);
  }, s2.watch = { widgetParams: { handler: function(e2) {
    this.state = null, this.getParentIndex().removeWidgets([this.widget]), this.widget = e$b(this.factory(e2), i), this.getParentIndex().addWidgets([this.widget]);
  }, deep: true } }, s2.methods = { updateState: function(t2, e2) {
    void 0 === t2 && (t2 = {}), e2 || (this.state = t2);
  } }, s2;
};
function noop() {
}
function getObjectType(object) {
  return Object.prototype.toString.call(object).slice(8, -1);
}
function checkRendering(rendering, usage) {
  if (rendering === void 0 || typeof rendering !== "function") {
    throw new Error("The render function is not valid (received type ".concat(getObjectType(rendering), ").\n\n").concat(usage));
  }
}
var htmlEntities = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var regexUnescapedHtml = /[&<>"']/g;
var regexHasUnescapedHtml = RegExp(regexUnescapedHtml.source);
function escape(value) {
  return value && regexHasUnescapedHtml.test(value) ? value.replace(regexUnescapedHtml, function(character) {
    return htmlEntities[character];
  }) : value;
}
function _typeof$2(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$2 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$2 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$2(obj);
}
function getTag(value) {
  if (value === null) {
    return value === void 0 ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}
function isObjectLike(value) {
  return _typeof$2(value) === "object" && value !== null;
}
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys$7(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$7(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$7(Object(source), true).forEach(function(key) {
        _defineProperty$8(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$7(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$8(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var TAG_PLACEHOLDER = {
  highlightPreTag: "__ais-highlight__",
  highlightPostTag: "__/ais-highlight__"
};
var TAG_REPLACEMENT = {
  highlightPreTag: "<mark>",
  highlightPostTag: "</mark>"
};
function replaceTagsAndEscape(value) {
  return escape(value).replace(new RegExp(TAG_PLACEHOLDER.highlightPreTag, "g"), TAG_REPLACEMENT.highlightPreTag).replace(new RegExp(TAG_PLACEHOLDER.highlightPostTag, "g"), TAG_REPLACEMENT.highlightPostTag);
}
function recursiveEscape(input) {
  if (isPlainObject(input) && typeof input.value !== "string") {
    return Object.keys(input).reduce(function(acc, key) {
      return _objectSpread$7(_objectSpread$7({}, acc), {}, _defineProperty$8({}, key, recursiveEscape(input[key])));
    }, {});
  }
  if (Array.isArray(input)) {
    return input.map(recursiveEscape);
  }
  return _objectSpread$7(_objectSpread$7({}, input), {}, {
    value: replaceTagsAndEscape(input.value)
  });
}
function escapeHits(hits) {
  if (hits.__escaped === void 0) {
    hits = hits.map(function(_ref) {
      var hit = _extends({}, _ref);
      if (hit._highlightResult) {
        hit._highlightResult = recursiveEscape(hit._highlightResult);
      }
      if (hit._snippetResult) {
        hit._snippetResult = recursiveEscape(hit._snippetResult);
      }
      return hit;
    });
    hits.__escaped = true;
  }
  return hits;
}
function escapeFacets(facetHits) {
  return facetHits.map(function(h) {
    return _objectSpread$7(_objectSpread$7({}, h), {}, {
      highlighted: replaceTagsAndEscape(h.highlighted)
    });
  });
}
function isFacetRefined(helper, facet, value) {
  if (helper.state.isHierarchicalFacet(facet)) {
    return helper.state.isHierarchicalFacetRefined(facet, value);
  } else if (helper.state.isConjunctiveFacet(facet)) {
    return helper.state.isFacetRefined(facet, value);
  } else {
    return helper.state.isDisjunctiveFacetRefined(facet, value);
  }
}
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
function createSendEventForFacet(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance, helper = _ref.helper, attr = _ref.attribute, widgetType = _ref.widgetType;
  var sendEventForFacet = function sendEventForFacet2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var eventType = args[0], facetValue = args[1], _args$ = args[2], eventName = _args$ === void 0 ? "Filter Applied" : _args$;
    var attribute = typeof attr === "string" ? attr : attr(facetValue);
    if (args.length === 1 && _typeof$1(args[0]) === "object") {
      instantSearchInstance.sendEventToInsights(args[0]);
    } else if (eventType === "click" && (args.length === 2 || args.length === 3)) {
      if (!isFacetRefined(helper, attribute, facetValue)) {
        instantSearchInstance.sendEventToInsights({
          insightsMethod: "clickedFilters",
          widgetType,
          eventType,
          payload: {
            eventName,
            index: helper.getIndex(),
            filters: ["".concat(attribute, ":").concat(facetValue)]
          },
          attribute
        });
      }
    } else
      ;
  };
  return sendEventForFacet;
}
function serializePayload(payload) {
  return btoa(encodeURIComponent(JSON.stringify(payload)));
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function chunk(arr) {
  var chunkSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 20;
  var chunks = [];
  for (var i = 0; i < Math.ceil(arr.length / chunkSize); i++) {
    chunks.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
  }
  return chunks;
}
var buildPayloads = function buildPayloads2(_ref) {
  var index = _ref.index, widgetType = _ref.widgetType;
  _ref.methodName;
  var args = _ref.args, isSearchStalled = _ref.isSearchStalled;
  if (args.length === 1 && _typeof(args[0]) === "object") {
    return [args[0]];
  }
  var eventType = args[0];
  var hits = args[1];
  var eventName = args[2];
  if (!hits) {
    {
      return [];
    }
  }
  if ((eventType === "click" || eventType === "conversion") && !eventName) {
    {
      return [];
    }
  }
  var hitsArray = Array.isArray(hits) ? removeEscapedFromHits(hits) : [hits];
  if (hitsArray.length === 0) {
    return [];
  }
  var queryID = hitsArray[0].__queryID;
  var hitsChunks = chunk(hitsArray);
  var objectIDsByChunk = hitsChunks.map(function(batch) {
    return batch.map(function(hit) {
      return hit.objectID;
    });
  });
  var positionsByChunk = hitsChunks.map(function(batch) {
    return batch.map(function(hit) {
      return hit.__position;
    });
  });
  if (eventType === "view") {
    if (isSearchStalled) {
      return [];
    }
    return hitsChunks.map(function(batch, i) {
      return {
        insightsMethod: "viewedObjectIDs",
        widgetType,
        eventType,
        payload: {
          eventName: eventName || "Hits Viewed",
          index,
          objectIDs: objectIDsByChunk[i]
        },
        hits: batch
      };
    });
  } else if (eventType === "click") {
    return hitsChunks.map(function(batch, i) {
      return {
        insightsMethod: "clickedObjectIDsAfterSearch",
        widgetType,
        eventType,
        payload: {
          eventName,
          index,
          queryID,
          objectIDs: objectIDsByChunk[i],
          positions: positionsByChunk[i]
        },
        hits: batch
      };
    });
  } else if (eventType === "conversion") {
    return hitsChunks.map(function(batch, i) {
      return {
        insightsMethod: "convertedObjectIDsAfterSearch",
        widgetType,
        eventType,
        payload: {
          eventName,
          index,
          queryID,
          objectIDs: objectIDsByChunk[i]
        },
        hits: batch
      };
    });
  } else {
    return [];
  }
};
function removeEscapedFromHits(hits) {
  return hits.slice();
}
function createSendEventForHits(_ref2) {
  var instantSearchInstance = _ref2.instantSearchInstance, index = _ref2.index, widgetType = _ref2.widgetType;
  var sendEventForHits = function sendEventForHits2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var payloads = buildPayloads({
      widgetType,
      index,
      methodName: "sendEvent",
      args,
      isSearchStalled: instantSearchInstance.status === "stalled"
    });
    payloads.forEach(function(payload) {
      return instantSearchInstance.sendEventToInsights(payload);
    });
  };
  return sendEventForHits;
}
function createBindEventForHits(_ref3) {
  var index = _ref3.index, widgetType = _ref3.widgetType;
  var bindEventForHits = function bindEventForHits2() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var payloads = buildPayloads({
      widgetType,
      index,
      methodName: "bindEvent",
      args,
      isSearchStalled: false
    });
    return payloads.length ? "data-insights-event=".concat(serializePayload(payloads)) : "";
  };
  return bindEventForHits;
}
function createDocumentationLink(_ref) {
  var name = _ref.name, _ref$connector = _ref.connector, connector = _ref$connector === void 0 ? false : _ref$connector;
  return ["https://www.algolia.com/doc/api-reference/widgets/", name, "/js/", connector ? "#connector" : ""].join("");
}
function createDocumentationMessageGenerator() {
  for (var _len = arguments.length, widgets = new Array(_len), _key = 0; _key < _len; _key++) {
    widgets[_key] = arguments[_key];
  }
  var links = widgets.map(function(widget) {
    return createDocumentationLink(widget);
  }).join(", ");
  return function(message) {
    return [message, "See documentation: ".concat(links)].filter(Boolean).join("\n\n");
  };
}
function find(items, predicate) {
  var value;
  for (var i = 0; i < items.length; i++) {
    value = items[i];
    if (predicate(value, i, items)) {
      return value;
    }
  }
  return void 0;
}
function getPropertyByPath(object, path) {
  var parts = Array.isArray(path) ? path : path.split(".");
  return parts.reduce(function(current, key) {
    return current && current[key];
  }, object);
}
function ownKeys$6(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$6(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$6(Object(source), true).forEach(function(key) {
        _defineProperty$7(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$6(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$7(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function addAbsolutePosition(hits, page, hitsPerPage) {
  return hits.map(function(hit, idx) {
    return _objectSpread$6(_objectSpread$6({}, hit), {}, {
      __position: hitsPerPage * page + idx + 1
    });
  });
}
function ownKeys$5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$5(Object(source), true).forEach(function(key) {
        _defineProperty$6(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$5(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$6(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function addQueryID(hits, queryID) {
  if (!queryID) {
    return hits;
  }
  return hits.map(function(hit) {
    return _objectSpread$5(_objectSpread$5({}, hit), {}, {
      __queryID: queryID
    });
  });
}
function uniq(array) {
  return array.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o2, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function range(_ref) {
  var _ref$start = _ref.start, start = _ref$start === void 0 ? 0 : _ref$start, end = _ref.end, _ref$step = _ref.step, step = _ref$step === void 0 ? 1 : _ref$step;
  var limitStep = step === 0 ? 1 : step;
  var arrayLength = Math.round((end - start) / limitStep);
  return _toConsumableArray(Array(arrayLength)).map(function(_, current) {
    return start + current * limitStep;
  });
}
function ownKeys$4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$4(Object(source), true).forEach(function(key) {
        _defineProperty$5(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$4(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$5(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var withUsage$3 = createDocumentationMessageGenerator({
  name: "hits",
  connector: true
});
var connectHits = function connectHits2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage$3());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$escapeHTML = _ref.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    var sendEvent;
    var bindEvent;
    return {
      $$type: "ais.hits",
      init: function init(initOptions) {
        renderFn(_objectSpread$4(_objectSpread$4({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var renderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread$4(_objectSpread$4({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
        renderState.sendEvent("view", renderState.hits);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread$4(_objectSpread$4({}, renderState), {}, {
          hits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var results = _ref2.results, helper = _ref2.helper, instantSearchInstance = _ref2.instantSearchInstance;
        if (!sendEvent) {
          sendEvent = createSendEventForHits({
            instantSearchInstance,
            index: helper.getIndex(),
            widgetType: this.$$type
          });
        }
        if (!bindEvent) {
          bindEvent = createBindEventForHits({
            index: helper.getIndex(),
            widgetType: this.$$type
          });
        }
        if (!results) {
          return {
            hits: [],
            results: void 0,
            sendEvent,
            bindEvent,
            widgetParams
          };
        }
        if (escapeHTML && results.hits.length > 0) {
          results.hits = escapeHits(results.hits);
        }
        var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
        var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
        var transformedHits = transformItems(hitsWithAbsolutePositionAndQueryID, {
          results
        });
        return {
          hits: transformedHits,
          results,
          sendEvent,
          bindEvent,
          widgetParams
        };
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        if (!escapeHTML) {
          return state;
        }
        return state.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function(acc, key) {
          return _objectSpread$4(_objectSpread$4({}, acc), {}, _defineProperty$5({}, key, void 0));
        }, {}));
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        if (!escapeHTML) {
          return state;
        }
        return state.setQueryParameters(TAG_PLACEHOLDER);
      }
    };
  };
};
var connectHits$1 = connectHits;
function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$3(Object(source), true).forEach(function(key) {
        _defineProperty$4(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$3(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var getSelectedHits = function getSelectedHits2(hits, selectedObjectIDs) {
  return selectedObjectIDs.map(function(objectID) {
    var hit = find(hits, function(h) {
      return h.objectID === objectID;
    });
    if (typeof hit === "undefined") {
      throw new Error('Could not find objectID "'.concat(objectID, '" passed to `clickedObjectIDsAfterSearch` in the returned hits. This is necessary to infer the absolute position and the query ID.'));
    }
    return hit;
  });
};
var getQueryID = function getQueryID2(selectedHits) {
  var queryIDs = uniq(selectedHits.map(function(hit) {
    return hit.__queryID;
  }));
  if (queryIDs.length > 1) {
    throw new Error("Insights currently allows a single `queryID`. The `objectIDs` provided map to multiple `queryID`s.");
  }
  var queryID = queryIDs[0];
  if (typeof queryID !== "string") {
    throw new Error("Could not infer `queryID`. Ensure InstantSearch `clickAnalytics: true` was added with the Configure widget.\n\nSee: https://alg.li/lNiZZ7");
  }
  return queryID;
};
var getPositions = function getPositions2(selectedHits) {
  return selectedHits.map(function(hit) {
    return hit.__position;
  });
};
var inferPayload = function inferPayload2(_ref) {
  var method = _ref.method, results = _ref.results, hits = _ref.hits, objectIDs = _ref.objectIDs;
  var index = results.index;
  var selectedHits = getSelectedHits(hits, objectIDs);
  var queryID = getQueryID(selectedHits);
  switch (method) {
    case "clickedObjectIDsAfterSearch": {
      var positions = getPositions(selectedHits);
      return {
        index,
        queryID,
        objectIDs,
        positions
      };
    }
    case "convertedObjectIDsAfterSearch":
      return {
        index,
        queryID,
        objectIDs
      };
    default:
      throw new Error('Unsupported method passed to insights: "'.concat(method, '".'));
  }
};
var wrapInsightsClient = function wrapInsightsClient2(aa, results, hits) {
  return function(method) {
    for (var _len = arguments.length, payloads = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      payloads[_key - 1] = arguments[_key];
    }
    var payload = payloads[0];
    if (!aa) {
      var withInstantSearchUsage = createDocumentationMessageGenerator({
        name: "instantsearch"
      });
      throw new Error(withInstantSearchUsage("The `insightsClient` option has not been provided to `instantsearch`."));
    }
    if (!Array.isArray(payload.objectIDs)) {
      throw new TypeError("Expected `objectIDs` to be an array.");
    }
    var inferredPayload = inferPayload({
      method,
      results,
      hits,
      objectIDs: payload.objectIDs
    });
    aa(method, _objectSpread$3(_objectSpread$3({}, inferredPayload), payload));
  };
};
function withInsights(connector) {
  return function(renderFn, unmountFn) {
    return connector(function(renderOptions, isFirstRender) {
      var results = renderOptions.results, hits = renderOptions.hits, instantSearchInstance = renderOptions.instantSearchInstance;
      if (results && hits && instantSearchInstance) {
        var insights = wrapInsightsClient(instantSearchInstance.insightsClient, results, hits);
        return renderFn(_objectSpread$3(_objectSpread$3({}, renderOptions), {}, {
          insights
        }), isFirstRender);
      }
      return renderFn(renderOptions, isFirstRender);
    }, unmountFn);
  };
}
var connectHitsWithInsights = withInsights(connectHits$1);
var e$a = connectHitsWithInsights;
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Paginator = /* @__PURE__ */ function() {
  function Paginator2(params) {
    _classCallCheck(this, Paginator2);
    _defineProperty$3(this, "currentPage", void 0);
    _defineProperty$3(this, "total", void 0);
    _defineProperty$3(this, "padding", void 0);
    this.currentPage = params.currentPage;
    this.total = params.total;
    this.padding = params.padding;
  }
  _createClass(Paginator2, [{
    key: "pages",
    value: function pages() {
      var total = this.total, currentPage = this.currentPage, padding = this.padding;
      if (total === 0)
        return [0];
      var totalDisplayedPages = this.nbPagesDisplayed(padding, total);
      if (totalDisplayedPages === total) {
        return range({
          end: total
        });
      }
      var paddingLeft = this.calculatePaddingLeft(currentPage, padding, total, totalDisplayedPages);
      var paddingRight = totalDisplayedPages - paddingLeft;
      var first = currentPage - paddingLeft;
      var last = currentPage + paddingRight;
      return range({
        start: first,
        end: last
      });
    }
  }, {
    key: "nbPagesDisplayed",
    value: function nbPagesDisplayed(padding, total) {
      return Math.min(2 * padding + 1, total);
    }
  }, {
    key: "calculatePaddingLeft",
    value: function calculatePaddingLeft(current, padding, total, totalDisplayedPages) {
      if (current <= padding) {
        return current;
      }
      if (current >= total - padding) {
        return totalDisplayedPages - (total - current);
      }
      return padding;
    }
  }, {
    key: "isLastPage",
    value: function isLastPage() {
      return this.currentPage === this.total - 1 || this.total === 0;
    }
  }, {
    key: "isFirstPage",
    value: function isFirstPage() {
      return this.currentPage === 0;
    }
  }]);
  return Paginator2;
}();
var Paginator$1 = Paginator;
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$2(Object(source), true).forEach(function(key) {
        _defineProperty$2(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var withUsage$2 = createDocumentationMessageGenerator({
  name: "pagination",
  connector: true
});
var connectPagination = function connectPagination2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage$2());
  return function(widgetParams) {
    var _ref = widgetParams || {}, totalPages = _ref.totalPages, _ref$padding = _ref.padding, padding = _ref$padding === void 0 ? 3 : _ref$padding;
    var pager = new Paginator$1({
      currentPage: 0,
      total: 0,
      padding
    });
    var connectorState = {};
    function getMaxPage(_ref2) {
      var nbPages = _ref2.nbPages;
      return totalPages !== void 0 ? Math.min(totalPages, nbPages) : nbPages;
    }
    return {
      $$type: "ais.pagination",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread$2(_objectSpread$2({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread$2(_objectSpread$2({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        return state.setQueryParameter("page", void 0);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var page = searchParameters.page || 0;
        if (!page) {
          return uiState;
        }
        return _objectSpread$2(_objectSpread$2({}, uiState), {}, {
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var page = uiState.page ? uiState.page - 1 : 0;
        return searchParameters.setQueryParameter("page", page);
      },
      getWidgetRenderState: function getWidgetRenderState(_ref6) {
        var results = _ref6.results, helper = _ref6.helper, state = _ref6.state, createURL = _ref6.createURL;
        if (!connectorState.refine) {
          connectorState.refine = function(page2) {
            helper.setPage(page2);
            helper.search();
          };
        }
        if (!connectorState.createURL) {
          connectorState.createURL = function(helperState) {
            return function(page2) {
              return createURL(helperState.setPage(page2));
            };
          };
        }
        var page = state.page || 0;
        var nbPages = getMaxPage(results || {
          nbPages: 0
        });
        pager.currentPage = page;
        pager.total = nbPages;
        return {
          createURL: connectorState.createURL(state),
          refine: connectorState.refine,
          canRefine: nbPages > 1,
          currentRefinement: page,
          nbHits: (results === null || results === void 0 ? void 0 : results.nbHits) || 0,
          nbPages,
          pages: results ? pager.pages() : [],
          isFirstPage: pager.isFirstPage(),
          isLastPage: pager.isLastPage(),
          widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread$2(_objectSpread$2({}, renderState), {}, {
          pagination: this.getWidgetRenderState(renderOptions)
        });
      }
    };
  };
};
var a$5 = connectPagination;
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function(key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var withUsage$1 = createDocumentationMessageGenerator({
  name: "refinement-list",
  connector: true
});
var DEFAULT_SORT = ["isRefined", "count:desc", "name:asc"];
var connectRefinementList = function connectRefinementList2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage$1());
  return function(widgetParams) {
    var _ref = widgetParams || {}, attribute = _ref.attribute, _ref$operator = _ref.operator, operator = _ref$operator === void 0 ? "or" : _ref$operator, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$showMore = _ref.showMore, showMore = _ref$showMore === void 0 ? false : _ref$showMore, _ref$showMoreLimit = _ref.showMoreLimit, showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit, _ref$sortBy = _ref.sortBy, sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT : _ref$sortBy, _ref$escapeFacetValue = _ref.escapeFacetValues, escapeFacetValues = _ref$escapeFacetValue === void 0 ? true : _ref$escapeFacetValue, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attribute) {
      throw new Error(withUsage$1("The `attribute` option is required."));
    }
    if (!/^(and|or)$/.test(operator)) {
      throw new Error(withUsage$1('The `operator` must one of: `"and"`, `"or"` (got "'.concat(operator, '").')));
    }
    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage$1("`showMoreLimit` should be greater than `limit`."));
    }
    var formatItems = function formatItems2(_ref2) {
      var label = _ref2.name, value = _ref2.escapedValue, item = _objectWithoutProperties(_ref2, ["name", "escapedValue"]);
      return _objectSpread$1(_objectSpread$1({}, item), {}, {
        value,
        label,
        highlighted: label
      });
    };
    var lastResultsFromMainSearch;
    var lastItemsFromMainSearch = [];
    var hasExhaustiveItems = true;
    var triggerRefine;
    var sendEvent;
    var isShowingMore = false;
    var toggleShowMore = function toggleShowMore2() {
    };
    function cachedToggleShowMore() {
      toggleShowMore();
    }
    function createToggleShowMore(renderOptions, widget) {
      return function() {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }
    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }
    var searchForFacetValues = function searchForFacetValues2() {
      return function() {
      };
    };
    var createSearchForFacetValues = function createSearchForFacetValues2(helper, widget) {
      return function(renderOptions) {
        return function(query) {
          var instantSearchInstance = renderOptions.instantSearchInstance, searchResults = renderOptions.results;
          if (query === "" && lastItemsFromMainSearch) {
            renderFn(_objectSpread$1(_objectSpread$1({}, widget.getWidgetRenderState(_objectSpread$1(_objectSpread$1({}, renderOptions), {}, {
              results: lastResultsFromMainSearch
            }))), {}, {
              instantSearchInstance
            }), false);
          } else {
            var tags = {
              highlightPreTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPreTag : TAG_REPLACEMENT.highlightPreTag,
              highlightPostTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPostTag : TAG_REPLACEMENT.highlightPostTag
            };
            helper.searchForFacetValues(
              attribute,
              query,
              Math.min(getLimit(), 100),
              tags
            ).then(function(results) {
              var facetValues = escapeFacetValues ? escapeFacets(results.facetHits) : results.facetHits;
              var normalizedFacetValues = transformItems(facetValues.map(function(_ref3) {
                var escapedValue = _ref3.escapedValue, value = _ref3.value, item = _objectWithoutProperties(_ref3, ["escapedValue", "value"]);
                return _objectSpread$1(_objectSpread$1({}, item), {}, {
                  value: escapedValue,
                  label: value
                });
              }), {
                results: searchResults
              });
              renderFn(_objectSpread$1(_objectSpread$1({}, widget.getWidgetRenderState(_objectSpread$1(_objectSpread$1({}, renderOptions), {}, {
                results: lastResultsFromMainSearch
              }))), {}, {
                items: normalizedFacetValues,
                canToggleShowMore: false,
                canRefine: true,
                isFromSearch: true,
                instantSearchInstance
              }), false);
            });
          }
        };
      };
    };
    return {
      $$type: "ais.refinementList",
      init: function init(initOptions) {
        renderFn(_objectSpread$1(_objectSpread$1({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread$1(_objectSpread$1({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread$1(_objectSpread$1({}, renderState), {}, {
          refinementList: _objectSpread$1(_objectSpread$1({}, renderState.refinementList), {}, _defineProperty$1({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var results = renderOptions.results, state = renderOptions.state, _createURL = renderOptions.createURL, instantSearchInstance = renderOptions.instantSearchInstance, helper = renderOptions.helper;
        var items = [];
        var facetValues = [];
        if (!sendEvent || !triggerRefine || !searchForFacetValues) {
          sendEvent = createSendEventForFacet({
            instantSearchInstance,
            helper,
            attribute,
            widgetType: this.$$type
          });
          triggerRefine = function triggerRefine2(facetValue) {
            sendEvent("click", facetValue);
            helper.toggleFacetRefinement(attribute, facetValue).search();
          };
          searchForFacetValues = createSearchForFacetValues(helper, this);
        }
        if (results) {
          var values = results.getFacetValues(attribute, {
            sortBy,
            facetOrdering: sortBy === DEFAULT_SORT
          });
          facetValues = values && Array.isArray(values) ? values : [];
          items = transformItems(facetValues.slice(0, getLimit()).map(formatItems), {
            results
          });
          var maxValuesPerFacetConfig = state.maxValuesPerFacet;
          var currentLimit = getLimit();
          hasExhaustiveItems = maxValuesPerFacetConfig > currentLimit ? facetValues.length <= currentLimit : facetValues.length < currentLimit;
          lastResultsFromMainSearch = results;
          lastItemsFromMainSearch = items;
          if (renderOptions.results) {
            toggleShowMore = createToggleShowMore(renderOptions, this);
          }
        }
        var searchFacetValues = searchForFacetValues && searchForFacetValues(renderOptions);
        var canShowLess = isShowingMore && lastItemsFromMainSearch.length > limit;
        var canShowMore = showMore && !hasExhaustiveItems;
        var canToggleShowMore = canShowLess || canShowMore;
        return {
          createURL: function createURL(facetValue) {
            return _createURL(state.resetPage().toggleFacetRefinement(attribute, facetValue));
          },
          items,
          refine: triggerRefine,
          searchForItems: searchFacetValues,
          isFromSearch: false,
          canRefine: items.length > 0,
          widgetParams,
          isShowingMore,
          canToggleShowMore,
          toggleShowMore: cachedToggleShowMore,
          sendEvent,
          hasExhaustiveItems
        };
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        var withoutMaxValuesPerFacet = state.setQueryParameter("maxValuesPerFacet", void 0);
        if (operator === "and") {
          return withoutMaxValuesPerFacet.removeFacet(attribute);
        }
        return withoutMaxValuesPerFacet.removeDisjunctiveFacet(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var values = operator === "or" ? searchParameters.getDisjunctiveRefinements(attribute) : searchParameters.getConjunctiveRefinements(attribute);
        if (!values.length) {
          return uiState;
        }
        return _objectSpread$1(_objectSpread$1({}, uiState), {}, {
          refinementList: _objectSpread$1(_objectSpread$1({}, uiState.refinementList), {}, _defineProperty$1({}, attribute, values))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var isDisjunctive = operator === "or";
        var values = uiState.refinementList && uiState.refinementList[attribute];
        var withoutRefinements = searchParameters.clearRefinements(attribute);
        var withFacetConfiguration = isDisjunctive ? withoutRefinements.addDisjunctiveFacet(attribute) : withoutRefinements.addFacet(attribute);
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter("maxValuesPerFacet", nextMaxValuesPerFacet);
        if (!values) {
          var key = isDisjunctive ? "disjunctiveFacetsRefinements" : "facetsRefinements";
          return withMaxValuesPerFacet.setQueryParameters(_defineProperty$1({}, key, _objectSpread$1(_objectSpread$1({}, withMaxValuesPerFacet[key]), {}, _defineProperty$1({}, attribute, []))));
        }
        return values.reduce(function(parameters, value) {
          return isDisjunctive ? parameters.addDisjunctiveFacetRefinement(attribute, value) : parameters.addFacetRefinement(attribute, value);
        }, withMaxValuesPerFacet);
      }
    };
  };
};
var r$4 = connectRefinementList;
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var withUsage = createDocumentationMessageGenerator({
  name: "search-box",
  connector: true
});
var defaultQueryHook = function defaultQueryHook2(query, hook) {
  return hook(query);
};
var connectSearchBox = function connectSearchBox2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$queryHook = _ref.queryHook, queryHook = _ref$queryHook === void 0 ? defaultQueryHook : _ref$queryHook;
    var _refine;
    var _clear;
    return {
      $$type: "ais.searchBox",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return state.setQueryParameter("query", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          searchBox: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var helper = _ref3.helper, searchMetadata = _ref3.searchMetadata, state = _ref3.state;
        if (!_refine) {
          _refine = function _refine2(query) {
            queryHook(query, function(q) {
              return helper.setQuery(q).search();
            });
          };
          _clear = function _clear2() {
            helper.setQuery("").search();
          };
        }
        return {
          query: state.query || "",
          refine: _refine,
          clear: _clear,
          widgetParams,
          isSearchStalled: searchMetadata.isSearchStalled
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var query = searchParameters.query || "";
        if (query === "" || uiState && uiState.query === query) {
          return uiState;
        }
        return _objectSpread(_objectSpread({}, uiState), {}, {
          query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        return searchParameters.setQueryParameter("query", uiState.query || "");
      }
    };
  };
};
var s$1 = connectSearchBox;
var e$9 = { name: "SearchInput", mixins: [t$3({ name: "SearchBox" })], props: { placeholder: { type: String, default: "Search here\u2026" }, autofocus: { type: Boolean, default: false }, showLoadingIndicator: { type: Boolean, default: false }, shouldShowLoadingIndicator: { type: Boolean, default: false }, submitTitle: { type: String, default: "Search" }, resetTitle: { type: String, default: "Clear" }, value: { type: String, required: false, default: void 0 }, modelValue: { type: String, required: false, default: void 0 } }, emits: ["input", "update:modelValue", "blur", "focus", "reset"], data: function() {
  return { query: "" };
}, methods: { isFocused: function() {
  return document.activeElement === this.$refs.input;
}, onFormSubmit: function() {
  this.$refs.input.blur();
}, onFormReset: function() {
  this.$emit("input", ""), this.$emit("update:modelValue", ""), this.$emit("reset");
} } };
var a$4 = createVNode("path", { d: "M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z", fillRule: "evenodd" }, null, -1), r$3 = createVNode("path", { d: "M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z", fillRule: "evenodd" }, null, -1), s = createVNode("g", { fill: "none", "fill-rule": "evenodd" }, [createVNode("g", { transform: "translate(1 1)", "stroke-width": "2" }, [createVNode("circle", { "stroke-opacity": ".5", cx: "18", cy: "18", r: "18" }), createVNode("path", { d: "M36 18c0-9.94-8.06-18-18-18" }, [createVNode("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "1s", repeatCount: "indefinite" })])])], -1);
function u$3(u2, d, c2, m, h, p) {
  return openBlock(), createBlock("form", { action: "", role: "search", novalidate: "", class: u2.suit("form"), onSubmit: d[4] || (d[4] = withModifiers(function() {
    for (var t2 = [], e2 = arguments.length; e2--; )
      t2[e2] = arguments[e2];
    return p.onFormSubmit && p.onFormSubmit.apply(p, t2);
  }, ["prevent"])), onReset: d[5] || (d[5] = withModifiers(function() {
    for (var t2 = [], e2 = arguments.length; e2--; )
      t2[e2] = arguments[e2];
    return p.onFormReset && p.onFormReset.apply(p, t2);
  }, ["prevent"])) }, [createCommentVNode(" :value/@input allows us to pass v-model to the component in v2 "), createCommentVNode(" :modelValue/@update:modelValue allows us to pass v-model to the component in v3 "), createVNode("input", { type: "search", autocorrect: "off", autocapitalize: "off", autocomplete: "off", spellcheck: "false", required: "", maxlength: "512", "aria-label": "Search", placeholder: c2.placeholder, autofocus: c2.autofocus, class: u2.suit("input"), value: c2.value || c2.modelValue, onFocus: d[1] || (d[1] = function(t2) {
    return u2.$emit("focus", t2);
  }), onBlur: d[2] || (d[2] = function(t2) {
    return u2.$emit("blur", t2);
  }), onInput: d[3] || (d[3] = function(t2) {
    u2.$emit("input", t2.target.value), u2.$emit("update:modelValue", t2.target.value);
  }), ref: "input" }, null, 42, ["placeholder", "autofocus", "value"]), createVNode("button", { type: "submit", title: c2.submitTitle, class: u2.suit("submit"), hidden: c2.showLoadingIndicator && c2.shouldShowLoadingIndicator }, [renderSlot(u2.$slots, "submit-icon", {}, function() {
    return [(openBlock(), createBlock("svg", { role: "img", xmlns: "http://www.w3.org/2000/svg", width: "10", height: "10", viewBox: "0 0 40 40", class: u2.suit("submitIcon") }, [a$4], 2))];
  })], 10, ["title", "hidden"]), createVNode("button", { type: "reset", title: c2.resetTitle, class: u2.suit("reset"), hidden: !c2.value && !c2.modelValue || c2.showLoadingIndicator && c2.shouldShowLoadingIndicator }, [renderSlot(u2.$slots, "reset-icon", {}, function() {
    return [(openBlock(), createBlock("svg", { role: "img", xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 20 20", class: u2.suit("resetIcon") }, [r$3], 2))];
  })], 10, ["title", "hidden"]), c2.showLoadingIndicator ? (openBlock(), createBlock("span", { key: 0, hidden: !c2.shouldShowLoadingIndicator, class: u2.suit("loadingIndicator") }, [renderSlot(u2.$slots, "loading-indicator", {}, function() {
    return [(openBlock(), createBlock("svg", { role: "img", "aria-label": "Results are loading", width: "16", height: "16", xmlns: "http://www.w3.org/2000/svg", stroke: "#444", viewBox: "0 0 38 38", class: u2.suit("loadingIcon") }, [s], 2))];
  })], 10, ["hidden"])) : createCommentVNode("v-if", true)], 34);
}
e$9.render = u$3, e$9.__file = "src/components/SearchInput.vue";
var e$8 = { name: "AisSearchBox", mixins: [n$2({ connector: s$1 }, { $$widgetType: "ais.searchBox" }), t$3({ name: "SearchBox" })], components: { SearchInput: e$9 }, props: { placeholder: { type: String, default: "Search here\u2026" }, autofocus: { type: Boolean, default: false }, showLoadingIndicator: { type: Boolean, default: false }, submitTitle: { type: String, default: "Search" }, resetTitle: { type: String, default: "Clear" }, value: { type: String, default: void 0 }, modelValue: { type: String, default: void 0 }, queryHook: { type: Function, default: void 0 } }, data: function() {
  return { localValue: "", isVue2: e$c, isVue3: o$1 };
}, computed: { widgetParams: function() {
  return { queryHook: this.queryHook };
}, isControlled: function() {
  return void 0 !== this.value || void 0 !== this.modelValue;
}, model: function() {
  return this.value || this.modelValue;
}, currentRefinement: { get: function() {
  this.isControlled && this.model !== this.localValue && (this.localValue = this.model, this.$emit("input", this.model), this.$emit("update:modelValue", this.model), this.state.refine(this.model));
  var e2 = this.$refs.searchInput;
  return e2 && e2.isFocused() ? this.localValue : this.model || this.state.query || "";
}, set: function(e2) {
  this.localValue = e2, this.state.refine(e2), this.isControlled && (this.$emit("input", e2), this.$emit("update:modelValue", e2));
} } } };
function a$3(a2, l, c2, d, f2, m) {
  var h = resolveComponent("search-input");
  return a2.state ? (openBlock(), createBlock("div", { key: 0, class: a2.suit() }, [renderSlot(a2.$slots, "default", { currentRefinement: m.currentRefinement, isSearchStalled: a2.state.isSearchStalled, refine: a2.state.refine }, function() {
    return [createVNode(h, { onFocus: l[1] || (l[1] = function(e2) {
      return a2.$emit("focus", e2);
    }), onBlur: l[2] || (l[2] = function(e2) {
      return a2.$emit("blur", e2);
    }), onReset: l[3] || (l[3] = function(e2) {
      return a2.$emit("reset");
    }), placeholder: c2.placeholder, autofocus: c2.autofocus, "show-loading-indicator": c2.showLoadingIndicator, "should-show-loading-indicator": a2.state.isSearchStalled, "submit-title": c2.submitTitle, "reset-title": c2.resetTitle, "class-names": a2.classNames, modelValue: m.currentRefinement, "onUpdate:modelValue": l[4] || (l[4] = function(e2) {
      return m.currentRefinement = e2;
    }), ref: "searchInput" }, createSlots({ default: withCtx(function() {
      return [f2.isVue2 ? renderSlot(a2.$slots, "loading-indicator", { key: 0, slot: "loading-indicator" }) : createCommentVNode("v-if", true), f2.isVue2 ? renderSlot(a2.$slots, "submit-icon", { key: 1, slot: "submit-icon" }) : createCommentVNode("v-if", true), f2.isVue2 ? renderSlot(a2.$slots, "reset-icon", { key: 2, slot: "reset-icon" }) : createCommentVNode("v-if", true)];
    }), _: 2 }, [f2.isVue3 ? { name: "loading-indicator", fn: withCtx(function() {
      return [renderSlot(a2.$slots, "loading-indicator")];
    }) } : void 0, f2.isVue3 ? { name: "submit-icon", fn: withCtx(function() {
      return [renderSlot(a2.$slots, "submit-icon")];
    }) } : void 0, f2.isVue3 ? { name: "reset-icon", fn: withCtx(function() {
      return [renderSlot(a2.$slots, "reset-icon")];
    }) } : void 0]), 1032, ["placeholder", "autofocus", "show-loading-indicator", "should-show-loading-indicator", "submit-title", "reset-title", "class-names", "modelValue"])];
  })], 2)) : createCommentVNode("v-if", true);
}
e$8.render = a$3, e$8.__file = "src/components/SearchBox.vue";
var r$2 = function(t2) {
  void 0 === t2 && (t2 = {});
  var e2 = t2.mapStateToCanRefine;
  return void 0 === e2 && (e2 = function(t3) {
    return Boolean(t3.canRefine);
  }), { inject: { emitter: { from: "instantSearchPanelEmitter", default: function() {
    return { emit: function() {
    } };
  } } }, data: function() {
    return { state: null, hasAlreadyEmitted: false };
  }, watch: { state: { immediate: true, handler: function(t3, n2) {
    if (t3) {
      var i = e2(n2 || {}), r2 = e2(t3);
      this.hasAlreadyEmitted && i === r2 || (this.emitter.emit("PANEL_CHANGE_EVENT", r2), this.hasAlreadyEmitted = true);
    }
  } } } };
};
var t$1 = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, e$7 = /&(?:amp|lt|gt|quot|#39);/g, r$1 = RegExp(e$7.source);
function u$2(u2) {
  return u2 && r$1.test(u2) ? u2.replace(e$7, function(e2) {
    return t$1[e2];
  }) : u2;
}
var t = { highlightPreTag: "__ais-highlight__", highlightPostTag: "__/ais-highlight__" };
function r(i) {
  var h = i.preTag, t2 = i.postTag, r2 = i.highlightedValue;
  void 0 === r2 && (r2 = "");
  var a2 = r2.split(h), g2 = a2.shift(), e2 = "" === g2 ? [] : [{ value: g2, isHighlighted: false }];
  if (t2 === h) {
    var s2 = true;
    a2.forEach(function(i2) {
      e2.push({ value: i2, isHighlighted: s2 }), s2 = !s2;
    });
  } else
    a2.forEach(function(i2) {
      var h2 = i2.split(t2);
      e2.push({ value: h2[0], isHighlighted: true }), "" !== h2[1] && e2.push({ value: " " === h2[1] ? "  " : h2[1], isHighlighted: false });
    });
  return e2;
}
function a$2(a2) {
  var g2 = a2.preTag;
  void 0 === g2 && (g2 = t.highlightPreTag);
  var e2 = a2.postTag;
  void 0 === e2 && (e2 = t.highlightPostTag);
  var s2 = a2.highlightProperty, l = a2.attribute, o2 = a2.hit;
  if (!o2)
    throw new Error("`hit`, the matching record, must be provided");
  var u2 = getPropertyByPath(o2[s2], l) || {};
  return Array.isArray(u2) ? u2.map(function(i) {
    return r({ preTag: g2, postTag: e2, highlightedValue: u$2(i.value) });
  }) : r({ preTag: g2, postTag: e2, highlightedValue: u$2(u2.value) });
}
var e$5 = function(t2, e2) {
  return e2.slots.default();
};
var e$6 = { name: "AisHighlighter", props: { hit: { type: Object, required: true }, attribute: { type: String, required: true }, highlightedTagName: { type: String, default: "mark" }, suit: { type: Function, required: true }, highlightProperty: { type: String, required: true }, preTag: { type: String, required: true }, postTag: { type: String, required: true } }, data: function() {
  return { TextNode: e$5 };
}, computed: { parsedHighlights: function() {
  return a$2({ attribute: this.attribute, hit: this.hit, highlightProperty: this.highlightProperty, preTag: this.preTag, postTag: this.postTag });
} } };
function a$1(a2, h, g2, o2, c2, d) {
  return openBlock(), createBlock("span", { class: g2.suit() }, [(openBlock(true), createBlock(Fragment, null, renderList(d.parsedHighlights, function(i, s2) {
    var a3 = i.value, h2 = i.isHighlighted;
    return openBlock(), createBlock(resolveDynamicComponent(h2 ? g2.highlightedTagName : c2.TextNode), { class: [h2 && g2.suit("highlighted")], key: s2 }, { default: withCtx(function() {
      return [createTextVNode(toDisplayString(a3), 1)];
    }), _: 2 }, 1032, ["class"]);
  }), 128))], 2);
}
e$6.render = a$1, e$6.__file = "src/components/Highlighter.vue";
var e$4 = { name: "AisHighlight", mixins: [t$3({ name: "Highlight" })], components: { AisHighlighter: e$6 }, props: { hit: { type: Object, required: true }, attribute: { type: String, required: true }, highlightedTagName: { type: String, default: "mark" } } };
function g(g2, e2, a2, r2, u2, l) {
  var m = resolveComponent("ais-highlighter");
  return openBlock(), createBlock(m, { hit: a2.hit, attribute: a2.attribute, "highlighted-tag-name": a2.highlightedTagName, suit: g2.suit, "highlight-property": "_highlightResult", "pre-tag": "<mark>", "post-tag": "</mark>" }, null, 8, ["hit", "attribute", "highlighted-tag-name", "suit"]);
}
e$4.render = g, e$4.__file = "src/components/Highlight.vue";
var a = function() {
};
var e$3 = { name: "AisRefinementList", components: { SearchInput: e$9, AisHighlight: e$4 }, mixins: [t$3({ name: "RefinementList" }), n$2({ connector: r$4 }, { $$widgetType: "ais.refinementList" }), r$2()], props: { attribute: { type: String, required: true }, searchable: { type: Boolean, default: void 0 }, searchablePlaceholder: { type: String, required: false, default: "Search here\u2026" }, operator: { default: "or", validator: function(e2) {
  return "and" === e2 || "or" === e2;
}, required: false }, limit: { type: Number, required: false, default: void 0 }, showMoreLimit: { type: Number, required: false, default: void 0 }, showMore: { type: Boolean, required: false, default: false }, sortBy: { type: [Array, Function], required: false, default: void 0 }, transformItems: { type: Function, required: false, default: void 0 } }, data: function() {
  return { searchForFacetValuesQuery: "" };
}, computed: { searchForFacetValues: { get: function() {
  return this.searchForFacetValuesQuery;
}, set: function(e2) {
  this.state.searchForItems(e2), this.searchForFacetValuesQuery = e2;
} }, toggleShowMore: function() {
  return this.state.toggleShowMore || a;
}, items: function() {
  return this.state.items.map(function(e2) {
    return Object.assign({}, e2, { _highlightResult: { item: { value: e2.highlighted } } });
  });
}, widgetParams: function() {
  return { attribute: this.attribute, operator: this.operator, limit: this.limit, showMore: this.showMore, showMoreLimit: this.showMoreLimit, sortBy: this.sortBy, escapeFacetValues: true, transformItems: this.transformItems };
} }, methods: { refine: function(e2) {
  this.state.refine(e2), this.searchForFacetValuesQuery = "";
} } };
function u$1(u2, h, f2, g2, m, d) {
  var v = resolveComponent("search-input"), w = resolveComponent("ais-highlight");
  return u2.state ? (openBlock(), createBlock("div", { key: 0, class: [u2.suit(), !u2.state.canRefine && u2.suit("", "noRefinement")] }, [renderSlot(u2.$slots, "default", { items: d.items, refine: d.refine, searchForItems: u2.state.searchForItems, searchForItemsQuery: m.searchForFacetValuesQuery, toggleShowMore: d.toggleShowMore, canToggleShowMore: u2.state.canToggleShowMore, isShowingMore: u2.state.isShowingMore, createURL: u2.state.createURL, isFromSearch: u2.state.isFromSearch, canRefine: u2.state.canRefine, sendEvent: u2.state.sendEvent }, function() {
    var e2;
    return [f2.searchable ? (openBlock(), createBlock("div", { key: 0, class: u2.suit("searchBox") }, [createVNode(v, { modelValue: d.searchForFacetValues, "onUpdate:modelValue": h[1] || (h[1] = function(e3) {
      return d.searchForFacetValues = e3;
    }), placeholder: f2.searchablePlaceholder, "class-names": u2.classNames }, null, 8, ["modelValue", "placeholder", "class-names"])], 2)) : createCommentVNode("v-if", true), u2.state.isFromSearch && 0 === d.items.length ? renderSlot(u2.$slots, "noResults", { key: 1, query: d.searchForFacetValues }, function() {
      return [createVNode("div", { class: u2.suit("noResults") }, "No results.", 2)];
    }) : createCommentVNode("v-if", true), createVNode("ul", { class: u2.suit("list") }, [(openBlock(true), createBlock(Fragment, null, renderList(d.items, function(e3) {
      return openBlock(), createBlock("li", { class: [u2.suit("item"), e3.isRefined && u2.suit("item", "selected")], key: e3.value }, [renderSlot(u2.$slots, "item", { item: e3, refine: d.refine, createURL: u2.state.createURL }, function() {
        return [createVNode("label", { class: u2.suit("label") }, [createVNode("input", { class: u2.suit("checkbox"), type: "checkbox", value: e3.value, checked: e3.isRefined, onChange: function(s2) {
          return d.refine(e3.value);
        } }, null, 42, ["value", "checked", "onChange"]), f2.searchable ? (openBlock(), createBlock("span", { key: 0, class: u2.suit("labelText") }, [createVNode(w, { attribute: "item", hit: e3 }, null, 8, ["hit"])], 2)) : (openBlock(), createBlock("span", { key: 1, class: u2.suit("labelText") }, toDisplayString(e3.label), 3)), createVNode("span", { class: u2.suit("count") }, toDisplayString(e3.count), 3)], 2)];
      })], 2);
    }), 128))], 2), f2.showMore ? (openBlock(), createBlock("button", { key: 2, class: [u2.suit("showMore"), (e2 = {}, e2[u2.suit("showMore", "disabled")] = !u2.state.canToggleShowMore, e2)], onClick: h[2] || (h[2] = function() {
      for (var e3 = [], s2 = arguments.length; s2--; )
        e3[s2] = arguments[s2];
      return d.toggleShowMore && d.toggleShowMore.apply(d, e3);
    }), disabled: !u2.state.canToggleShowMore }, [renderSlot(u2.$slots, "showMoreLabel", { isShowingMore: u2.state.isShowingMore }, function() {
      return [createTextVNode("Show " + toDisplayString(u2.state.isShowingMore ? "less" : "more"), 1)];
    })], 10, ["disabled"])) : createCommentVNode("v-if", true)];
  })], 2)) : createCommentVNode("v-if", true);
}
e$3.render = u$1, e$3.__file = "src/components/RefinementList.vue";
var n$1;
var e$2 = ((n$1 = { name: "AisStateResults", mixins: [n$2({ connector: true }), t$3({ name: "StateResults" })], props: { catchError: { type: Boolean, default: false } }, data: function() {
  var t2 = this;
  return { renderFn: function() {
    var e2 = t2.instantSearchInstance, r2 = e2.status, n2 = e2.error, s2 = t2.getParentIndex().getResults(), i = t2.getParentIndex().getHelper(), a2 = i ? i.state : null;
    t2.state = { results: s2, state: a2, status: r2, error: n2 };
  } };
}, created: function() {
  this.instantSearchInstance.addListener("render", this.renderFn);
} }).beforeUnmount = function() {
  this.widget && (this.instantSearchInstance.removeListener("render", this.renderFn), this.errorFn && this.instantSearchInstance.removeListener("error", this.errorFn));
}, n$1.watch = { catchError: { immediate: true, handler: function(t2) {
  t2 ? (this.errorFn = function() {
  }, this.instantSearchInstance.addListener("error", this.errorFn)) : this.errorFn && (this.instantSearchInstance.removeListener("error", this.errorFn), this.errorFn = void 0);
} } }, n$1.computed = { stateResults: function() {
  var t2 = this.state, r2 = t2.results, n2 = t2.state, s2 = t2.status, i = t2.error;
  return e$b({}, r2, { results: r2, state: n2, status: s2, error: i });
} }, n$1);
var n = createVNode("p", null, " Use this component to have a different layout based on a certain state. ", -1), u = createVNode("p", null, " Fill in the slot, and get access to the following things: ", -1);
function o(o2, i, c2, p, f2, d) {
  return o2.state && o2.state.state && o2.state.results ? (openBlock(), createBlock("div", { key: 0, class: o2.suit() }, [renderSlot(o2.$slots, "default", d.stateResults, function() {
    return [n, u, createVNode("pre", null, "results: " + toDisplayString(Object.keys(o2.state.results)), 1), createVNode("pre", null, "state: " + toDisplayString(Object.keys(o2.state.state)), 1), createVNode("pre", null, "status: " + toDisplayString(o2.state.status), 1), createVNode("pre", null, "error: " + toDisplayString(o2.state.error), 1)];
  })], 2)) : createCommentVNode("v-if", true);
}
e$2.render = o, e$2.__file = "src/components/StateResults.vue";
var e$1 = { name: "AisHits", mixins: [n$2({ connector: e$a }, { $$widgetType: "ais.hits" }), t$3({ name: "Hits" })], props: { escapeHTML: { type: Boolean, default: true }, transformItems: { type: Function, default: void 0 } }, computed: { items: function() {
  return this.state.hits;
}, widgetParams: function() {
  return { escapeHTML: this.escapeHTML, transformItems: this.transformItems };
} } };
function c(c2, a2, m, f2, d, v) {
  return c2.state ? (openBlock(), createBlock("div", { key: 0, class: c2.suit() }, [renderSlot(c2.$slots, "default", { items: v.items, insights: c2.state.insights, sendEvent: c2.state.sendEvent }, function() {
    return [createVNode("ol", { class: c2.suit("list") }, [(openBlock(true), createBlock(Fragment, null, renderList(v.items, function(i, n2) {
      return openBlock(), createBlock("li", { key: i.objectID, class: c2.suit("item") }, [renderSlot(c2.$slots, "item", { item: i, index: n2, insights: c2.state.insights }, function() {
        return [createTextVNode("objectID: " + toDisplayString(i.objectID) + ", index: " + toDisplayString(n2), 1)];
      })], 2);
    }), 128))], 2)];
  })], 2)) : createCommentVNode("v-if", true);
}
e$1.render = c, e$1.__file = "src/components/Hits.vue";
var e = { name: "AisPagination", mixins: [t$3({ name: "Pagination" }), n$2({ connector: a$5 }, { $$widgetType: "ais.pagination" }), r$2()], props: { padding: { type: Number, default: void 0, validator: function(t2) {
  return t2 > 0;
} }, totalPages: { type: Number, default: void 0, validator: function(t2) {
  return t2 > 0;
} }, showFirst: { type: Boolean, default: true }, showLast: { type: Boolean, default: true }, showNext: { type: Boolean, default: true }, showPrevious: { type: Boolean, default: true } }, computed: { widgetParams: function() {
  return { padding: this.padding, totalPages: this.totalPages };
} }, emits: ["page-change"], methods: { refine: function(t2) {
  var e2 = Math.min(Math.max(t2, 0), this.state.nbPages - 1);
  this.state.refine(e2), this.$emit("page-change", e2);
} } };
function f(f2, l, o2, g2, P, L) {
  return f2.state ? (openBlock(), createBlock("div", { key: 0, class: f2.suit() }, [renderSlot(f2.$slots, "default", { refine: L.refine, createURL: f2.state.createURL, currentRefinement: f2.state.currentRefinement, nbHits: f2.state.nbHits, nbPages: f2.state.nbPages, pages: f2.state.pages, isFirstPage: f2.state.isFirstPage, isLastPage: f2.state.isLastPage }, function() {
    var g3, P2, k, m;
    return [createVNode("ul", { class: f2.suit("list") }, [o2.showFirst ? (openBlock(), createBlock("li", { key: 0, class: (g3 = {}, g3[f2.suit("item")] = true, g3[f2.suit("item", "firstPage")] = true, g3[f2.suit("item", "disabled")] = f2.state.isFirstPage, g3) }, [renderSlot(f2.$slots, "first", { createURL: function() {
      return f2.state.createURL(0);
    }, isFirstPage: f2.state.isFirstPage, refine: function() {
      return L.refine(0);
    } }, function() {
      return [f2.state.isFirstPage ? (openBlock(), createBlock("span", { key: 1, class: f2.suit("link"), "aria-label": "First" }, "\u2039\u2039", 2)) : (openBlock(), createBlock("a", { key: 0, class: f2.suit("link"), "aria-label": "First", href: f2.state.createURL(0), onClick: l[1] || (l[1] = withModifiers(function(e2) {
        return L.refine(0);
      }, ["prevent"])) }, "\u2039\u2039", 10, ["href"]))];
    })], 2)) : createCommentVNode("v-if", true), o2.showPrevious ? (openBlock(), createBlock("li", { key: 1, class: (P2 = {}, P2[f2.suit("item")] = true, P2[f2.suit("item", "previousPage")] = true, P2[f2.suit("item", "disabled")] = f2.state.isFirstPage, P2) }, [renderSlot(f2.$slots, "previous", { createURL: function() {
      return f2.state.createURL(f2.state.currentRefinement - 1);
    }, isFirstPage: f2.state.isFirstPage, refine: function() {
      return L.refine(f2.state.currentRefinement - 1);
    } }, function() {
      return [f2.state.isFirstPage ? (openBlock(), createBlock("span", { key: 1, class: f2.suit("link"), "aria-label": "Previous" }, "\u2039", 2)) : (openBlock(), createBlock("a", { key: 0, class: f2.suit("link"), "aria-label": "Previous", href: f2.state.createURL(f2.state.currentRefinement - 1), onClick: l[2] || (l[2] = withModifiers(function(e2) {
        return L.refine(f2.state.currentRefinement - 1);
      }, ["prevent"])) }, "\u2039", 10, ["href"]))];
    })], 2)) : createCommentVNode("v-if", true), (openBlock(true), createBlock(Fragment, null, renderList(f2.state.pages, function(n2) {
      var r2;
      return openBlock(), createBlock("li", { class: (r2 = {}, r2[f2.suit("item")] = true, r2[f2.suit("item", "page")] = true, r2[f2.suit("item", "selected")] = f2.state.currentRefinement === n2, r2), key: n2 }, [renderSlot(f2.$slots, "item", { page: n2, createURL: function() {
        return f2.state.createURL(n2);
      }, isFirstPage: f2.state.isFirstPage, isLastPage: f2.state.isLastPage, refine: function() {
        return L.refine(n2);
      } }, function() {
        return [createVNode("a", { class: f2.suit("link"), href: f2.state.createURL(n2), onClick: withModifiers(function(e2) {
          return L.refine(n2);
        }, ["prevent"]) }, toDisplayString(n2 + 1), 11, ["href", "onClick"])];
      })], 2);
    }), 128)), o2.showNext ? (openBlock(), createBlock("li", { key: 2, class: (k = {}, k[f2.suit("item")] = true, k[f2.suit("item", "nextPage")] = true, k[f2.suit("item", "disabled")] = f2.state.isLastPage, k) }, [renderSlot(f2.$slots, "next", { createURL: function() {
      return f2.state.createURL(f2.state.currentRefinement + 1);
    }, isLastPage: f2.state.isLastPage, refine: function() {
      return L.refine(f2.state.currentRefinement + 1);
    } }, function() {
      return [f2.state.isLastPage ? (openBlock(), createBlock("span", { key: 1, class: f2.suit("link"), "aria-label": "Next" }, "\u203A", 2)) : (openBlock(), createBlock("a", { key: 0, class: f2.suit("link"), "aria-label": "Next", href: f2.state.createURL(f2.state.currentRefinement + 1), onClick: l[3] || (l[3] = withModifiers(function(e2) {
        return L.refine(f2.state.currentRefinement + 1);
      }, ["prevent"])) }, "\u203A", 10, ["href"]))];
    })], 2)) : createCommentVNode("v-if", true), o2.showLast ? (openBlock(), createBlock("li", { key: 3, class: (m = {}, m[f2.suit("item")] = true, m[f2.suit("item", "lastPage")] = true, m[f2.suit("item", "disabled")] = f2.state.isLastPage, m) }, [renderSlot(f2.$slots, "last", { createURL: function() {
      return f2.state.createURL(f2.state.nbPages - 1);
    }, isLastPage: f2.state.isLastPage, refine: function() {
      return L.refine(f2.state.nbPages - 1);
    } }, function() {
      return [f2.state.isLastPage ? (openBlock(), createBlock("span", { key: 1, class: f2.suit("link"), "aria-label": "Last" }, "\u203A\u203A", 2)) : (openBlock(), createBlock("a", { key: 0, class: f2.suit("link"), "aria-label": "Last", href: f2.state.createURL(f2.state.nbPages - 1), onClick: l[4] || (l[4] = withModifiers(function(e2) {
        return L.refine(f2.state.nbPages - 1);
      }, ["prevent"])) }, "\u203A\u203A", 10, ["href"]))];
    })], 2)) : createCommentVNode("v-if", true)], 2)];
  })], 2)) : createCommentVNode("v-if", true);
}
e.render = f, e.__file = "src/components/Pagination.vue";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const searchClient = algoliasearch(
      "latency",
      "6be0576ff61c053d5f9a3225e2a90f76"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(InstantSearch), mergeProps({
        "search-client": unref(searchClient),
        "index-name": "instant_search"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="search-panel"${_scopeId}><div class="search-panel__filters"${_scopeId}>`);
            _push2(ssrRenderComponent(e$3, { attribute: "brand" }, null, _parent2, _scopeId));
            _push2(`</div><div class="search-panel__results"${_scopeId}><div class="searchbox"${_scopeId}>`);
            _push2(ssrRenderComponent(e$8, { placeholder: "" }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(e$2, null, {
              default: withCtx(({ results: { hits } }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(e$1, null, {
                    item: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h1${_scopeId3}>`);
                        _push4(ssrRenderComponent(e$4, {
                          hit: item,
                          attribute: "name"
                        }, null, _parent4, _scopeId3));
                        _push4(`</h1><p${_scopeId3}>`);
                        _push4(ssrRenderComponent(e$4, {
                          hit: item,
                          attribute: "description"
                        }, null, _parent4, _scopeId3));
                        _push4(`</p>`);
                      } else {
                        return [
                          createVNode("h1", null, [
                            createVNode(e$4, {
                              hit: item,
                              attribute: "name"
                            }, null, 8, ["hit"])
                          ]),
                          createVNode("p", null, [
                            createVNode(e$4, {
                              hit: item,
                              attribute: "description"
                            }, null, 8, ["hit"])
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><p${_scopeId2}>Aucun r\xE9sultat</p></div>`);
                } else {
                  return [
                    createVNode(e$1, null, {
                      item: withCtx(({ item }) => [
                        createVNode("h1", null, [
                          createVNode(e$4, {
                            hit: item,
                            attribute: "name"
                          }, null, 8, ["hit"])
                        ]),
                        createVNode("p", null, [
                          createVNode(e$4, {
                            hit: item,
                            attribute: "description"
                          }, null, 8, ["hit"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode("p", null, "Aucun r\xE9sultat")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="pagination"${_scopeId}>`);
            _push2(ssrRenderComponent(e, {
              "show-first": false,
              "show-last": false,
              padding: 1
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "search-panel" }, [
                createVNode("div", { class: "search-panel__filters" }, [
                  createVNode(e$3, { attribute: "brand" })
                ]),
                createVNode("div", { class: "search-panel__results" }, [
                  createVNode("div", { class: "searchbox" }, [
                    createVNode(e$8, { placeholder: "" })
                  ]),
                  createVNode(e$2, null, {
                    default: withCtx(({ results: { hits } }) => [
                      createVNode(e$1, null, {
                        item: withCtx(({ item }) => [
                          createVNode("h1", null, [
                            createVNode(e$4, {
                              hit: item,
                              attribute: "name"
                            }, null, 8, ["hit"])
                          ]),
                          createVNode("p", null, [
                            createVNode(e$4, {
                              hit: item,
                              attribute: "description"
                            }, null, 8, ["hit"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("div", null, [
                        createVNode("p", null, "Aucun r\xE9sultat")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "pagination" }, [
                    createVNode(e, {
                      "show-first": false,
                      "show-last": false,
                      padding: 1
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/SearchPage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var App_vue_vue_type_style_index_0_lang = "";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><header class="header"><h1 class="header-title"><a href="/">vue-instantsearch-app</a></h1><p class="header-subtitle"> using <a href="https://github.com/algolia/vue-instantsearch"> Vue InstantSearch </a></p></header><div class="container">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const app = createApp(_sfc_main);
app.mount("#app");
