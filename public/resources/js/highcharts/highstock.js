/*
 Highstock JS v10.3.3 (2023-01-20)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (X, J) {
  "object" === typeof module && module.exports
    ? ((J["default"] = J), (module.exports = X.document ? J(X) : J))
    : "function" === typeof define && define.amd
    ? define("highcharts/highstock", function () {
        return J(X);
      })
    : (X.Highcharts && X.Highcharts.error(16, !0), (X.Highcharts = J(X)));
})("undefined" !== typeof window ? window : this, function (X) {
  function J(a, q, A, E) {
    a.hasOwnProperty(q) ||
      ((a[q] = E.apply(null, A)),
      "function" === typeof CustomEvent &&
        X.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: q, module: a[q] },
          })
        ));
  }
  var a = {};
  J(a, "Core/Globals.js", [], function () {
    var a;
    (function (a) {
      a.SVG_NS = "http://www.w3.org/2000/svg";
      a.product = "Highcharts";
      a.version = "10.3.3";
      a.win = "undefined" !== typeof X ? X : {};
      a.doc = a.win.document;
      a.svg =
        a.doc &&
        a.doc.createElementNS &&
        !!a.doc.createElementNS(a.SVG_NS, "svg").createSVGRect;
      a.userAgent = (a.win.navigator && a.win.navigator.userAgent) || "";
      a.isChrome = -1 !== a.userAgent.indexOf("Chrome");
      a.isFirefox = -1 !== a.userAgent.indexOf("Firefox");
      a.isMS = /(edge|msie|trident)/i.test(a.userAgent) && !a.win.opera;
      a.isSafari = !a.isChrome && -1 !== a.userAgent.indexOf("Safari");
      a.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(a.userAgent);
      a.isWebKit = -1 !== a.userAgent.indexOf("AppleWebKit");
      a.deg2rad = (2 * Math.PI) / 360;
      a.hasBidiBug =
        a.isFirefox && 4 > parseInt(a.userAgent.split("Firefox/")[1], 10);
      a.hasTouch = !!a.win.TouchEvent;
      a.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
      a.noop = function () {};
      a.supportsPassiveEvents = (function () {
        var v = !1;
        if (!a.isMS) {
          var q = Object.defineProperty({}, "passive", {
            get: function () {
              v = !0;
            },
          });
          a.win.addEventListener &&
            a.win.removeEventListener &&
            (a.win.addEventListener("testPassive", a.noop, q),
            a.win.removeEventListener("testPassive", a.noop, q));
        }
        return v;
      })();
      a.charts = [];
      a.dateFormats = {};
      a.seriesTypes = {};
      a.symbolSizes = {};
      a.chartCount = 0;
    })(a || (a = {}));
    ("");
    return a;
  });
  J(a, "Core/Utilities.js", [a["Core/Globals.js"]], function (a) {
    function v(d, b, e, g) {
      var r = b ? "Highcharts error" : "Highcharts warning";
      32 === d && (d = "" + r + ": Deprecated member");
      var I = n(d),
        z = I
          ? "" + r + " #" + d + ": www.highcharts.com/errors/" + d + "/"
          : d.toString();
      if ("undefined" !== typeof g) {
        var t = "";
        I && (z += "?");
        H(g, function (d, b) {
          t += "\n - ".concat(b, ": ").concat(d);
          I && (z += encodeURI(b) + "=" + encodeURI(d));
        });
        z += t;
      }
      y(
        a,
        "displayError",
        { chart: e, code: d, message: z, params: g },
        function () {
          if (b) throw Error(z);
          k.console && -1 === v.messages.indexOf(z) && console.warn(z);
        }
      );
      v.messages.push(z);
    }
    function A(d, b) {
      var r = {};
      H(d, function (e, g) {
        if (F(d[g], !0) && !d.nodeType && b[g])
          (e = A(d[g], b[g])), Object.keys(e).length && (r[g] = e);
        else if (F(d[g]) || d[g] !== b[g] || (g in d && !(g in b))) r[g] = d[g];
      });
      return r;
    }
    function E(d, b) {
      return parseInt(d, b || 10);
    }
    function B(d) {
      return "string" === typeof d;
    }
    function C(d) {
      d = Object.prototype.toString.call(d);
      return "[object Array]" === d || "[object Array Iterator]" === d;
    }
    function F(d, b) {
      return !!d && "object" === typeof d && (!b || !C(d));
    }
    function x(d) {
      return F(d) && "number" === typeof d.nodeType;
    }
    function u(d) {
      var b = d && d.constructor;
      return !(!F(d, !0) || x(d) || !b || !b.name || "Object" === b.name);
    }
    function n(d) {
      return (
        "number" === typeof d && !isNaN(d) && Infinity > d && -Infinity < d
      );
    }
    function c(d) {
      return "undefined" !== typeof d && null !== d;
    }
    function h(d, b, e) {
      var r = B(b) && !c(e),
        g,
        k = function (b, e) {
          c(b)
            ? d.setAttribute(e, b)
            : r
            ? (g = d.getAttribute(e)) ||
              "class" !== e ||
              (g = d.getAttribute(e + "Name"))
            : d.removeAttribute(e);
        };
      B(b) ? k(e, b) : H(b, k);
      return g;
    }
    function m(d, b) {
      var r;
      d || (d = {});
      for (r in b) d[r] = b[r];
      return d;
    }
    function l() {
      for (var d = arguments, b = d.length, e = 0; e < b; e++) {
        var g = d[e];
        if ("undefined" !== typeof g && null !== g) return g;
      }
    }
    function p(d, b) {
      a.isMS &&
        !a.svg &&
        b &&
        c(b.opacity) &&
        (b.filter = "alpha(opacity=".concat(100 * b.opacity, ")"));
      m(d.style, b);
    }
    function f(d) {
      return Math.pow(10, Math.floor(Math.log(d) / Math.LN10));
    }
    function D(d, b) {
      return 1e14 < d ? d : parseFloat(d.toPrecision(b || 14));
    }
    function G(d, b, e) {
      var r = a.getStyle || G;
      if ("width" === b)
        return (
          (b = Math.min(d.offsetWidth, d.scrollWidth)),
          (e = d.getBoundingClientRect && d.getBoundingClientRect().width),
          e < b && e >= b - 1 && (b = Math.floor(e)),
          Math.max(
            0,
            b -
              (r(d, "padding-left", !0) || 0) -
              (r(d, "padding-right", !0) || 0)
          )
        );
      if ("height" === b)
        return Math.max(
          0,
          Math.min(d.offsetHeight, d.scrollHeight) -
            (r(d, "padding-top", !0) || 0) -
            (r(d, "padding-bottom", !0) || 0)
        );
      k.getComputedStyle || v(27, !0);
      if ((d = k.getComputedStyle(d, void 0))) {
        var g = d.getPropertyValue(b);
        l(e, "opacity" !== b) && (g = E(g));
      }
      return g;
    }
    function H(d, b, e) {
      for (var r in d)
        Object.hasOwnProperty.call(d, r) && b.call(e || d[r], d[r], r, d);
    }
    function K(d, b, e) {
      function r(b, e) {
        var r = d.removeEventListener || a.removeEventListenerPolyfill;
        r && r.call(d, b, e, !1);
      }
      function g(e) {
        var g;
        if (d.nodeName) {
          if (b) {
            var I = {};
            I[b] = !0;
          } else I = e;
          H(I, function (d, b) {
            if (e[b]) for (g = e[b].length; g--; ) r(b, e[b][g].fn);
          });
        }
      }
      var k = ("function" === typeof d && d.prototype) || d;
      if (Object.hasOwnProperty.call(k, "hcEvents")) {
        var z = k.hcEvents;
        b
          ? ((k = z[b] || []),
            e
              ? ((z[b] = k.filter(function (d) {
                  return e !== d.fn;
                })),
                r(b, e))
              : (g(z), (z[b] = [])))
          : (g(z), delete k.hcEvents);
      }
    }
    function y(d, b, e, g) {
      e = e || {};
      if (w.createEvent && (d.dispatchEvent || (d.fireEvent && d !== a))) {
        var r = w.createEvent("Events");
        r.initEvent(b, !0, !0);
        e = m(r, e);
        d.dispatchEvent ? d.dispatchEvent(e) : d.fireEvent(b, e);
      } else if (d.hcEvents) {
        e.target ||
          m(e, {
            preventDefault: function () {
              e.defaultPrevented = !0;
            },
            target: d,
            type: b,
          });
        r = [];
        for (var I = d, k = !1; I.hcEvents; )
          Object.hasOwnProperty.call(I, "hcEvents") &&
            I.hcEvents[b] &&
            (r.length && (k = !0), r.unshift.apply(r, I.hcEvents[b])),
            (I = Object.getPrototypeOf(I));
        k &&
          r.sort(function (d, b) {
            return d.order - b.order;
          });
        r.forEach(function (b) {
          !1 === b.fn.call(d, e) && e.preventDefault();
        });
      }
      g && !e.defaultPrevented && g.call(d, e);
    }
    var t = a.charts,
      w = a.doc,
      k = a.win;
    (v || (v = {})).messages = [];
    Math.easeInOutSine = function (d) {
      return -0.5 * (Math.cos(Math.PI * d) - 1);
    };
    var g = Array.prototype.find
      ? function (d, b) {
          return d.find(b);
        }
      : function (d, b) {
          var e,
            r = d.length;
          for (e = 0; e < r; e++) if (b(d[e], e)) return d[e];
        };
    H(
      {
        map: "map",
        each: "forEach",
        grep: "filter",
        reduce: "reduce",
        some: "some",
      },
      function (d, b) {
        a[b] = function (e) {
          var r;
          v(
            32,
            !1,
            void 0,
            ((r = {}), (r["Highcharts.".concat(b)] = "use Array.".concat(d)), r)
          );
          return Array.prototype[d].apply(e, [].slice.call(arguments, 1));
        };
      }
    );
    var e,
      b = (function () {
        var d = Math.random().toString(36).substring(2, 9) + "-",
          b = 0;
        return function () {
          return "highcharts-" + (e ? "" : d) + b++;
        };
      })();
    k.jQuery &&
      (k.jQuery.fn.highcharts = function () {
        var d = [].slice.call(arguments);
        if (this[0])
          return d[0]
            ? (new a[B(d[0]) ? d.shift() : "Chart"](this[0], d[0], d[1]), this)
            : t[h(this[0], "data-highcharts-chart")];
      });
    g = {
      addEvent: function (d, b, e, g) {
        void 0 === g && (g = {});
        var r = ("function" === typeof d && d.prototype) || d;
        Object.hasOwnProperty.call(r, "hcEvents") || (r.hcEvents = {});
        r = r.hcEvents;
        a.Point &&
          d instanceof a.Point &&
          d.series &&
          d.series.chart &&
          (d.series.chart.runTrackerClick = !0);
        var k = d.addEventListener || a.addEventListenerPolyfill;
        k &&
          k.call(
            d,
            b,
            e,
            a.supportsPassiveEvents
              ? {
                  passive:
                    void 0 === g.passive
                      ? -1 !== b.indexOf("touch")
                      : g.passive,
                  capture: !1,
                }
              : !1
          );
        r[b] || (r[b] = []);
        r[b].push({
          fn: e,
          order: "number" === typeof g.order ? g.order : Infinity,
        });
        r[b].sort(function (d, b) {
          return d.order - b.order;
        });
        return function () {
          K(d, b, e);
        };
      },
      arrayMax: function (d) {
        for (var b = d.length, e = d[0]; b--; ) d[b] > e && (e = d[b]);
        return e;
      },
      arrayMin: function (d) {
        for (var b = d.length, e = d[0]; b--; ) d[b] < e && (e = d[b]);
        return e;
      },
      attr: h,
      clamp: function (d, b, e) {
        return d > b ? (d < e ? d : e) : b;
      },
      cleanRecursively: A,
      clearTimeout: function (d) {
        c(d) && clearTimeout(d);
      },
      correctFloat: D,
      createElement: function (d, b, e, g, k) {
        d = w.createElement(d);
        b && m(d, b);
        k && p(d, { padding: "0", border: "none", margin: "0" });
        e && p(d, e);
        g && g.appendChild(d);
        return d;
      },
      css: p,
      defined: c,
      destroyObjectProperties: function (d, b) {
        H(d, function (e, r) {
          e && e !== b && e.destroy && e.destroy();
          delete d[r];
        });
      },
      discardElement: function (d) {
        d && d.parentElement && d.parentElement.removeChild(d);
      },
      erase: function (d, b) {
        for (var e = d.length; e--; )
          if (d[e] === b) {
            d.splice(e, 1);
            break;
          }
      },
      error: v,
      extend: m,
      extendClass: function (d, b) {
        var e = function () {};
        e.prototype = new d();
        m(e.prototype, b);
        return e;
      },
      find: g,
      fireEvent: y,
      getMagnitude: f,
      getNestedProperty: function (d, b) {
        for (d = d.split("."); d.length && c(b); ) {
          var e = d.shift();
          if ("undefined" === typeof e || "__proto__" === e) return;
          b = b[e];
          if (
            !c(b) ||
            "function" === typeof b ||
            "number" === typeof b.nodeType ||
            b === k
          )
            return;
        }
        return b;
      },
      getStyle: G,
      inArray: function (d, b, e) {
        v(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" });
        return b.indexOf(d, e);
      },
      isArray: C,
      isClass: u,
      isDOMElement: x,
      isFunction: function (d) {
        return "function" === typeof d;
      },
      isNumber: n,
      isObject: F,
      isString: B,
      keys: function (d) {
        v(32, !1, void 0, { "Highcharts.keys": "use Object.keys" });
        return Object.keys(d);
      },
      merge: function () {
        var d,
          b = arguments,
          e = {},
          g = function (d, b) {
            "object" !== typeof d && (d = {});
            H(b, function (e, r) {
              "__proto__" !== r &&
                "constructor" !== r &&
                (!F(e, !0) || u(e) || x(e)
                  ? (d[r] = b[r])
                  : (d[r] = g(d[r] || {}, e)));
            });
            return d;
          };
        !0 === b[0] && ((e = b[1]), (b = Array.prototype.slice.call(b, 2)));
        var k = b.length;
        for (d = 0; d < k; d++) e = g(e, b[d]);
        return e;
      },
      normalizeTickInterval: function (d, b, e, g, k) {
        var r = d;
        e = l(e, f(d));
        var I = d / e;
        b ||
          ((b = k
            ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
            : [1, 2, 2.5, 5, 10]),
          !1 === g &&
            (1 === e
              ? (b = b.filter(function (b) {
                  return 0 === b % 1;
                }))
              : 0.1 >= e && (b = [1 / e])));
        for (
          g = 0;
          g < b.length &&
          !((r = b[g]),
          (k && r * e >= d) || (!k && I <= (b[g] + (b[g + 1] || b[g])) / 2));
          g++
        );
        return (r = D(r * e, -Math.round(Math.log(0.001) / Math.LN10)));
      },
      objectEach: H,
      offset: function (b) {
        var d = w.documentElement;
        b =
          b.parentElement || b.parentNode
            ? b.getBoundingClientRect()
            : { top: 0, left: 0, width: 0, height: 0 };
        return {
          top: b.top + (k.pageYOffset || d.scrollTop) - (d.clientTop || 0),
          left: b.left + (k.pageXOffset || d.scrollLeft) - (d.clientLeft || 0),
          width: b.width,
          height: b.height,
        };
      },
      pad: function (b, e, g) {
        return (
          Array((e || 2) + 1 - String(b).replace("-", "").length).join(
            g || "0"
          ) + b
        );
      },
      pick: l,
      pInt: E,
      relativeLength: function (b, e, g) {
        return /%$/.test(b)
          ? (e * parseFloat(b)) / 100 + (g || 0)
          : parseFloat(b);
      },
      removeEvent: K,
      splat: function (b) {
        return C(b) ? b : [b];
      },
      stableSort: function (b, e) {
        var d = b.length,
          g,
          r;
        for (r = 0; r < d; r++) b[r].safeI = r;
        b.sort(function (b, d) {
          g = e(b, d);
          return 0 === g ? b.safeI - d.safeI : g;
        });
        for (r = 0; r < d; r++) delete b[r].safeI;
      },
      syncTimeout: function (b, e, g) {
        if (0 < e) return setTimeout(b, e, g);
        b.call(0, g);
        return -1;
      },
      timeUnits: {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 24192e5,
        year: 314496e5,
      },
      uniqueKey: b,
      useSerialIds: function (b) {
        return (e = l(b, e));
      },
      wrap: function (b, e, g) {
        var d = b[e];
        b[e] = function () {
          var b = arguments,
            e = this;
          return g.apply(
            this,
            [
              function () {
                return d.apply(e, arguments.length ? arguments : b);
              },
            ].concat([].slice.call(arguments))
          );
        };
      },
    };
    ("");
    return g;
  });
  J(a, "Core/Chart/ChartDefaults.js", [], function () {
    return {
      alignThresholds: !1,
      panning: { enabled: !1, type: "x" },
      styledMode: !1,
      borderRadius: 0,
      colorCount: 10,
      allowMutatingData: !0,
      defaultSeriesType: "line",
      ignoreHiddenSeries: !0,
      spacing: [10, 10, 15, 10],
      resetZoomButton: {
        theme: { zIndex: 6 },
        position: { align: "right", x: -10, y: 10 },
      },
      zoomBySingleTouch: !1,
      zooming: {
        singleTouch: !1,
        resetButton: {
          theme: { zIndex: 6 },
          position: { align: "right", x: -10, y: 10 },
        },
      },
      width: null,
      height: null,
      borderColor: "#335cad",
      backgroundColor: "#ffffff",
      plotBorderColor: "#cccccc",
    };
  });
  J(
    a,
    "Core/Color/Color.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, q) {
      var v = q.isNumber,
        E = q.merge,
        B = q.pInt;
      q = (function () {
        function q(v) {
          this.rgba = [NaN, NaN, NaN, NaN];
          this.input = v;
          var x = a.Color;
          if (x && x !== q) return new x(v);
          if (!(this instanceof q)) return new q(v);
          this.init(v);
        }
        q.parse = function (a) {
          return a ? new q(a) : q.None;
        };
        q.prototype.init = function (a) {
          var x;
          if ("object" === typeof a && "undefined" !== typeof a.stops)
            this.stops = a.stops.map(function (c) {
              return new q(c[1]);
            });
          else if ("string" === typeof a) {
            this.input = a = q.names[a.toLowerCase()] || a;
            if ("#" === a.charAt(0)) {
              var u = a.length;
              var n = parseInt(a.substr(1), 16);
              7 === u
                ? (x = [(n & 16711680) >> 16, (n & 65280) >> 8, n & 255, 1])
                : 4 === u &&
                  (x = [
                    ((n & 3840) >> 4) | ((n & 3840) >> 8),
                    ((n & 240) >> 4) | (n & 240),
                    ((n & 15) << 4) | (n & 15),
                    1,
                  ]);
            }
            if (!x)
              for (n = q.parsers.length; n-- && !x; ) {
                var c = q.parsers[n];
                (u = c.regex.exec(a)) && (x = c.parse(u));
              }
          }
          x && (this.rgba = x);
        };
        q.prototype.get = function (a) {
          var x = this.input,
            u = this.rgba;
          if ("object" === typeof x && "undefined" !== typeof this.stops) {
            var n = E(x);
            n.stops = [].slice.call(n.stops);
            this.stops.forEach(function (c, h) {
              n.stops[h] = [n.stops[h][0], c.get(a)];
            });
            return n;
          }
          return u && v(u[0])
            ? "rgb" === a || (!a && 1 === u[3])
              ? "rgb(" + u[0] + "," + u[1] + "," + u[2] + ")"
              : "a" === a
              ? "".concat(u[3])
              : "rgba(" + u.join(",") + ")"
            : x;
        };
        q.prototype.brighten = function (a) {
          var x = this.rgba;
          if (this.stops)
            this.stops.forEach(function (n) {
              n.brighten(a);
            });
          else if (v(a) && 0 !== a)
            for (var u = 0; 3 > u; u++)
              (x[u] += B(255 * a)),
                0 > x[u] && (x[u] = 0),
                255 < x[u] && (x[u] = 255);
          return this;
        };
        q.prototype.setOpacity = function (a) {
          this.rgba[3] = a;
          return this;
        };
        q.prototype.tweenTo = function (a, x) {
          var u = this.rgba,
            n = a.rgba;
          if (!v(u[0]) || !v(n[0])) return a.input || "none";
          a = 1 !== n[3] || 1 !== u[3];
          return (
            (a ? "rgba(" : "rgb(") +
            Math.round(n[0] + (u[0] - n[0]) * (1 - x)) +
            "," +
            Math.round(n[1] + (u[1] - n[1]) * (1 - x)) +
            "," +
            Math.round(n[2] + (u[2] - n[2]) * (1 - x)) +
            (a ? "," + (n[3] + (u[3] - n[3]) * (1 - x)) : "") +
            ")"
          );
        };
        q.names = { white: "#ffffff", black: "#000000" };
        q.parsers = [
          {
            regex:
              /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
            parse: function (a) {
              return [B(a[1]), B(a[2]), B(a[3]), parseFloat(a[4], 10)];
            },
          },
          {
            regex:
              /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
            parse: function (a) {
              return [B(a[1]), B(a[2]), B(a[3]), 1];
            },
          },
        ];
        q.None = new q("");
        return q;
      })();
      ("");
      return q;
    }
  );
  J(a, "Core/Color/Palettes.js", [], function () {
    return {
      colors:
        "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(
          " "
        ),
    };
  });
  J(
    a,
    "Core/Time.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, q) {
      var v = a.win,
        E = q.defined,
        B = q.error,
        C = q.extend,
        F = q.isObject,
        x = q.merge,
        u = q.objectEach,
        n = q.pad,
        c = q.pick,
        h = q.splat,
        m = q.timeUnits,
        l = a.isSafari && v.Intl && v.Intl.DateTimeFormat.prototype.formatRange,
        p =
          a.isSafari && v.Intl && !v.Intl.DateTimeFormat.prototype.formatRange;
      q = (function () {
        function f(f) {
          this.options = {};
          this.variableTimezone = this.useUTC = !1;
          this.Date = v.Date;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.update(f);
        }
        f.prototype.get = function (f, c) {
          if (this.variableTimezone || this.timezoneOffset) {
            var l = c.getTime(),
              m = l - this.getTimezoneOffset(c);
            c.setTime(m);
            f = c["getUTC" + f]();
            c.setTime(l);
            return f;
          }
          return this.useUTC ? c["getUTC" + f]() : c["get" + f]();
        };
        f.prototype.set = function (f, c, m) {
          if (this.variableTimezone || this.timezoneOffset) {
            if (
              "Milliseconds" === f ||
              "Seconds" === f ||
              ("Minutes" === f && 0 === this.getTimezoneOffset(c) % 36e5)
            )
              return c["setUTC" + f](m);
            var h = this.getTimezoneOffset(c);
            h = c.getTime() - h;
            c.setTime(h);
            c["setUTC" + f](m);
            f = this.getTimezoneOffset(c);
            h = c.getTime() + f;
            return c.setTime(h);
          }
          return this.useUTC || (l && "FullYear" === f)
            ? c["setUTC" + f](m)
            : c["set" + f](m);
        };
        f.prototype.update = function (f) {
          void 0 === f && (f = {});
          var l = c(f.useUTC, !0);
          this.options = f = x(!0, this.options, f);
          this.Date = f.Date || v.Date || Date;
          this.timezoneOffset =
            ((this.useUTC = l) && f.timezoneOffset) || void 0;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.variableTimezone = l && !(!f.getTimezoneOffset && !f.timezone);
        };
        f.prototype.makeTime = function (f, l, m, h, y, t) {
          if (this.useUTC) {
            var w = this.Date.UTC.apply(0, arguments);
            var k = this.getTimezoneOffset(w);
            w += k;
            var g = this.getTimezoneOffset(w);
            k !== g
              ? (w += g - k)
              : k - 36e5 !== this.getTimezoneOffset(w - 36e5) ||
                p ||
                (w -= 36e5);
          } else
            w = new this.Date(
              f,
              l,
              c(m, 1),
              c(h, 0),
              c(y, 0),
              c(t, 0)
            ).getTime();
          return w;
        };
        f.prototype.timezoneOffsetFunction = function () {
          var f = this,
            c = this.options,
            l = c.getTimezoneOffset,
            m = c.moment || v.moment;
          if (!this.useUTC)
            return function (f) {
              return 6e4 * new Date(f.toString()).getTimezoneOffset();
            };
          if (c.timezone) {
            if (m)
              return function (f) {
                return 6e4 * -m.tz(f, c.timezone).utcOffset();
              };
            B(25);
          }
          return this.useUTC && l
            ? function (f) {
                return 6e4 * l(f.valueOf());
              }
            : function () {
                return 6e4 * (f.timezoneOffset || 0);
              };
        };
        f.prototype.dateFormat = function (f, l, m) {
          if (!E(l) || isNaN(l))
            return (
              (a.defaultOptions.lang && a.defaultOptions.lang.invalidDate) || ""
            );
          f = c(f, "%Y-%m-%d %H:%M:%S");
          var h = this,
            y = new this.Date(l),
            t = this.get("Hours", y),
            w = this.get("Day", y),
            k = this.get("Date", y),
            g = this.get("Month", y),
            e = this.get("FullYear", y),
            b = a.defaultOptions.lang,
            d = b && b.weekdays,
            r = b && b.shortWeekdays;
          y = C(
            {
              a: r ? r[w] : d[w].substr(0, 3),
              A: d[w],
              d: n(k),
              e: n(k, 2, " "),
              w: w,
              b: b.shortMonths[g],
              B: b.months[g],
              m: n(g + 1),
              o: g + 1,
              y: e.toString().substr(2, 2),
              Y: e,
              H: n(t),
              k: t,
              I: n(t % 12 || 12),
              l: t % 12 || 12,
              M: n(this.get("Minutes", y)),
              p: 12 > t ? "AM" : "PM",
              P: 12 > t ? "am" : "pm",
              S: n(y.getSeconds()),
              L: n(Math.floor(l % 1e3), 3),
            },
            a.dateFormats
          );
          u(y, function (b, d) {
            for (; -1 !== f.indexOf("%" + d); )
              f = f.replace(
                "%" + d,
                "function" === typeof b ? b.call(h, l) : b
              );
          });
          return m ? f.substr(0, 1).toUpperCase() + f.substr(1) : f;
        };
        f.prototype.resolveDTLFormat = function (f) {
          return F(f, !0)
            ? f
            : ((f = h(f)), { main: f[0], from: f[1], to: f[2] });
        };
        f.prototype.getTimeTicks = function (f, l, h, p) {
          var y = this,
            t = [],
            w = {},
            k = new y.Date(l),
            g = f.unitRange,
            e = f.count || 1,
            b;
          p = c(p, 1);
          if (E(l)) {
            y.set(
              "Milliseconds",
              k,
              g >= m.second ? 0 : e * Math.floor(y.get("Milliseconds", k) / e)
            );
            g >= m.second &&
              y.set(
                "Seconds",
                k,
                g >= m.minute ? 0 : e * Math.floor(y.get("Seconds", k) / e)
              );
            g >= m.minute &&
              y.set(
                "Minutes",
                k,
                g >= m.hour ? 0 : e * Math.floor(y.get("Minutes", k) / e)
              );
            g >= m.hour &&
              y.set(
                "Hours",
                k,
                g >= m.day ? 0 : e * Math.floor(y.get("Hours", k) / e)
              );
            g >= m.day &&
              y.set(
                "Date",
                k,
                g >= m.month
                  ? 1
                  : Math.max(1, e * Math.floor(y.get("Date", k) / e))
              );
            if (g >= m.month) {
              y.set(
                "Month",
                k,
                g >= m.year ? 0 : e * Math.floor(y.get("Month", k) / e)
              );
              var d = y.get("FullYear", k);
            }
            g >= m.year && y.set("FullYear", k, d - (d % e));
            g === m.week &&
              ((d = y.get("Day", k)),
              y.set("Date", k, y.get("Date", k) - d + p + (d < p ? -7 : 0)));
            d = y.get("FullYear", k);
            p = y.get("Month", k);
            var r = y.get("Date", k),
              z = y.get("Hours", k);
            l = k.getTime();
            (!y.variableTimezone && y.useUTC) ||
              !E(h) ||
              (b =
                h - l > 4 * m.month ||
                y.getTimezoneOffset(l) !== y.getTimezoneOffset(h));
            l = k.getTime();
            for (k = 1; l < h; )
              t.push(l),
                (l =
                  g === m.year
                    ? y.makeTime(d + k * e, 0)
                    : g === m.month
                    ? y.makeTime(d, p + k * e)
                    : !b || (g !== m.day && g !== m.week)
                    ? b && g === m.hour && 1 < e
                      ? y.makeTime(d, p, r, z + k * e)
                      : l + g * e
                    : y.makeTime(d, p, r + k * e * (g === m.day ? 1 : 7))),
                k++;
            t.push(l);
            g <= m.hour &&
              1e4 > t.length &&
              t.forEach(function (b) {
                0 === b % 18e5 &&
                  "000000000" === y.dateFormat("%H%M%S%L", b) &&
                  (w[b] = "day");
              });
          }
          t.info = C(f, { higherRanks: w, totalRange: g * e });
          return t;
        };
        f.prototype.getDateFormat = function (f, c, l, h) {
          var y = this.dateFormat("%m-%d %H:%M:%S.%L", c),
            t = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
            w = "millisecond";
          for (k in m) {
            if (
              f === m.week &&
              +this.dateFormat("%w", c) === l &&
              "00:00:00.000" === y.substr(6)
            ) {
              var k = "week";
              break;
            }
            if (m[k] > f) {
              k = w;
              break;
            }
            if (t[k] && y.substr(t[k]) !== "01-01 00:00:00.000".substr(t[k]))
              break;
            "week" !== k && (w = k);
          }
          return this.resolveDTLFormat(h[k]).main;
        };
        return f;
      })();
      ("");
      return q;
    }
  );
  J(
    a,
    "Core/Defaults.js",
    [
      a["Core/Chart/ChartDefaults.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Color/Palettes.js"],
      a["Core/Time.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C) {
      q = q.parse;
      var v = C.merge,
        x = {
          colors: E.colors,
          symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
          lang: {
            loading: "Loading...",
            months:
              "January February March April May June July August September October November December".split(
                " "
              ),
            shortMonths:
              "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays:
              "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                " "
              ),
            decimalPoint: ".",
            numericSymbols: "kMGTPE".split(""),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: " ",
          },
          global: {},
          time: {
            Date: void 0,
            getTimezoneOffset: void 0,
            timezone: void 0,
            timezoneOffset: 0,
            useUTC: !0,
          },
          chart: a,
          title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            widthAdjust: -44,
          },
          subtitle: { text: "", align: "center", widthAdjust: -44 },
          caption: {
            margin: 15,
            text: "",
            align: "left",
            verticalAlign: "bottom",
          },
          plotOptions: {},
          labels: { style: { position: "absolute", color: "#333333" } },
          legend: {
            enabled: !0,
            align: "center",
            alignColumns: !0,
            className: "highcharts-no-tooltip",
            layout: "horizontal",
            labelFormatter: function () {
              return this.name;
            },
            borderColor: "#999999",
            borderRadius: 0,
            navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
            itemStyle: {
              color: "#333333",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              textOverflow: "ellipsis",
            },
            itemHoverStyle: { color: "#000000" },
            itemHiddenStyle: { color: "#cccccc" },
            shadow: !1,
            itemCheckboxStyle: {
              position: "absolute",
              width: "13px",
              height: "13px",
            },
            squareSymbol: !0,
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: { style: { fontWeight: "bold" } },
          },
          loading: {
            labelStyle: {
              fontWeight: "bold",
              position: "relative",
              top: "45%",
            },
            style: {
              position: "absolute",
              backgroundColor: "#ffffff",
              opacity: 0.5,
              textAlign: "center",
            },
          },
          tooltip: {
            enabled: !0,
            animation: A.svg,
            borderRadius: 3,
            dateTimeLabelFormats: {
              millisecond: "%A, %b %e, %H:%M:%S.%L",
              second: "%A, %b %e, %H:%M:%S",
              minute: "%A, %b %e, %H:%M",
              hour: "%A, %b %e, %H:%M",
              day: "%A, %b %e, %Y",
              week: "Week from %A, %b %e, %Y",
              month: "%B %Y",
              year: "%Y",
            },
            footerFormat: "",
            headerShape: "callout",
            hideDelay: 500,
            padding: 8,
            shape: "callout",
            shared: !1,
            snap: A.isTouchDevice ? 25 : 10,
            headerFormat:
              '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat:
              '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
            backgroundColor: q("#f7f7f7").setOpacity(0.85).get(),
            borderWidth: 1,
            shadow: !0,
            stickOnContact: !1,
            style: {
              color: "#333333",
              cursor: "default",
              fontSize: "12px",
              whiteSpace: "nowrap",
            },
            useHTML: !1,
          },
          credits: {
            enabled: !0,
            href: "https://www.highcharts.com?credits",
            position: {
              align: "right",
              x: -10,
              verticalAlign: "bottom",
              y: -5,
            },
            style: { cursor: "pointer", color: "#999999", fontSize: "9px" },
            text: "Highcharts.com",
          },
        };
      x.chart.styledMode = !1;
      ("");
      var u = new B(v(x.global, x.time));
      a = {
        defaultOptions: x,
        defaultTime: u,
        getOptions: function () {
          return x;
        },
        setOptions: function (n) {
          v(!0, x, n);
          if (n.time || n.global)
            A.time
              ? A.time.update(v(x.global, x.time, n.global, n.time))
              : (A.time = u);
          return x;
        },
      };
      ("");
      return a;
    }
  );
  J(
    a,
    "Core/Animation/Fx.js",
    [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, q, A) {
      var v = a.parse,
        B = q.win,
        C = A.isNumber,
        F = A.objectEach;
      return (function () {
        function a(a, n, c) {
          this.pos = NaN;
          this.options = n;
          this.elem = a;
          this.prop = c;
        }
        a.prototype.dSetter = function () {
          var a = this.paths,
            n = a && a[0];
          a = a && a[1];
          var c = this.now || 0,
            h = [];
          if (1 !== c && n && a)
            if (n.length === a.length && 1 > c)
              for (var m = 0; m < a.length; m++) {
                for (var l = n[m], p = a[m], f = [], D = 0; D < p.length; D++) {
                  var G = l[D],
                    H = p[D];
                  C(G) && C(H) && ("A" !== p[0] || (4 !== D && 5 !== D))
                    ? (f[D] = G + c * (H - G))
                    : (f[D] = H);
                }
                h.push(f);
              }
            else h = a;
          else h = this.toD || [];
          this.elem.attr("d", h, void 0, !0);
        };
        a.prototype.update = function () {
          var a = this.elem,
            n = this.prop,
            c = this.now,
            h = this.options.step;
          if (this[n + "Setter"]) this[n + "Setter"]();
          else
            a.attr
              ? a.element && a.attr(n, c, null, !0)
              : (a.style[n] = c + this.unit);
          h && h.call(a, c, this);
        };
        a.prototype.run = function (u, n, c) {
          var h = this,
            m = h.options,
            l = function (f) {
              return l.stopped ? !1 : h.step(f);
            },
            p =
              B.requestAnimationFrame ||
              function (f) {
                setTimeout(f, 13);
              },
            f = function () {
              for (var c = 0; c < a.timers.length; c++)
                a.timers[c]() || a.timers.splice(c--, 1);
              a.timers.length && p(f);
            };
          u !== n || this.elem["forceAnimate:" + this.prop]
            ? ((this.startTime = +new Date()),
              (this.start = u),
              (this.end = n),
              (this.unit = c),
              (this.now = this.start),
              (this.pos = 0),
              (l.elem = this.elem),
              (l.prop = this.prop),
              l() && 1 === a.timers.push(l) && p(f))
            : (delete m.curAnim[this.prop],
              m.complete &&
                0 === Object.keys(m.curAnim).length &&
                m.complete.call(this.elem));
        };
        a.prototype.step = function (a) {
          var n = +new Date(),
            c = this.options,
            h = this.elem,
            m = c.complete,
            l = c.duration,
            p = c.curAnim;
          if (h.attr && !h.element) a = !1;
          else if (a || n >= l + this.startTime) {
            this.now = this.end;
            this.pos = 1;
            this.update();
            var f = (p[this.prop] = !0);
            F(p, function (c) {
              !0 !== c && (f = !1);
            });
            f && m && m.call(h);
            a = !1;
          } else
            (this.pos = c.easing((n - this.startTime) / l)),
              (this.now = this.start + (this.end - this.start) * this.pos),
              this.update(),
              (a = !0);
          return a;
        };
        a.prototype.initPath = function (a, n, c) {
          function h(c, t) {
            for (; c.length < K; ) {
              var w = c[0],
                k = t[K - c.length];
              k &&
                "M" === w[0] &&
                (c[0] =
                  "C" === k[0]
                    ? ["C", w[1], w[2], w[1], w[2], w[1], w[2]]
                    : ["L", w[1], w[2]]);
              c.unshift(w);
              f && ((w = c.pop()), c.push(c[c.length - 1], w));
            }
          }
          function m(c, t) {
            for (; c.length < K; )
              if (
                ((t = c[Math.floor(c.length / D) - 1].slice()),
                "C" === t[0] && ((t[1] = t[5]), (t[2] = t[6])),
                f)
              ) {
                var w = c[Math.floor(c.length / D)].slice();
                c.splice(c.length / 2, 0, t, w);
              } else c.push(t);
          }
          var l = a.startX,
            p = a.endX;
          c = c.slice();
          var f = a.isArea,
            D = f ? 2 : 1;
          n = n && n.slice();
          if (!n) return [c, c];
          if (l && p && p.length) {
            for (a = 0; a < l.length; a++)
              if (l[a] === p[0]) {
                var G = a;
                break;
              } else if (l[0] === p[p.length - l.length + a]) {
                G = a;
                var u = !0;
                break;
              } else if (l[l.length - 1] === p[p.length - l.length + a]) {
                G = l.length - a;
                break;
              }
            "undefined" === typeof G && (n = []);
          }
          if (n.length && C(G)) {
            var K = c.length + G * D;
            u ? (h(n, c), m(c, n)) : (h(c, n), m(n, c));
          }
          return [n, c];
        };
        a.prototype.fillSetter = function () {
          a.prototype.strokeSetter.apply(this, arguments);
        };
        a.prototype.strokeSetter = function () {
          this.elem.attr(
            this.prop,
            v(this.start).tweenTo(v(this.end), this.pos),
            void 0,
            !0
          );
        };
        a.timers = [];
        return a;
      })();
    }
  );
  J(
    a,
    "Core/Animation/AnimationUtilities.js",
    [a["Core/Animation/Fx.js"], a["Core/Utilities.js"]],
    function (a, q) {
      function v(c) {
        return u(c)
          ? n({ duration: 500, defer: 0 }, c)
          : { duration: c ? 500 : 0, defer: 0 };
      }
      function E(c, l) {
        for (var h = a.timers.length; h--; )
          a.timers[h].elem !== c ||
            (l && l !== a.timers[h].prop) ||
            (a.timers[h].stopped = !0);
      }
      var B = q.defined,
        C = q.getStyle,
        F = q.isArray,
        x = q.isNumber,
        u = q.isObject,
        n = q.merge,
        c = q.objectEach,
        h = q.pick;
      return {
        animate: function (h, l, p) {
          var f,
            m = "",
            G,
            H;
          if (!u(p)) {
            var K = arguments;
            p = { duration: K[2], easing: K[3], complete: K[4] };
          }
          x(p.duration) || (p.duration = 400);
          p.easing =
            "function" === typeof p.easing
              ? p.easing
              : Math[p.easing] || Math.easeInOutSine;
          p.curAnim = n(l);
          c(l, function (c, t) {
            E(h, t);
            H = new a(h, p, t);
            G = void 0;
            "d" === t && F(l.d)
              ? ((H.paths = H.initPath(h, h.pathArray, l.d)),
                (H.toD = l.d),
                (f = 0),
                (G = 1))
              : h.attr
              ? (f = h.attr(t))
              : ((f = parseFloat(C(h, t)) || 0), "opacity" !== t && (m = "px"));
            G || (G = c);
            "string" === typeof G &&
              G.match("px") &&
              (G = G.replace(/px/g, ""));
            H.run(f, G, m);
          });
        },
        animObject: v,
        getDeferredAnimation: function (c, l, h) {
          var f = v(l),
            m = 0,
            p = 0;
          (h ? [h] : c.series).forEach(function (c) {
            c = v(c.options.animation);
            m = l && B(l.defer) ? f.defer : Math.max(m, c.duration + c.defer);
            p = Math.min(f.duration, c.duration);
          });
          c.renderer.forExport && (m = 0);
          return { defer: Math.max(0, m - p), duration: Math.min(m, p) };
        },
        setAnimation: function (c, l) {
          l.renderer.globalAnimation = h(c, l.options.chart.animation, !0);
        },
        stop: E,
      };
    }
  );
  J(
    a,
    "Core/Renderer/HTML/AST.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, q) {
      var v = a.SVG_NS,
        E = q.attr,
        B = q.createElement,
        C = q.css,
        F = q.error,
        x = q.isFunction,
        u = q.isString,
        n = q.objectEach,
        c = q.splat,
        h =
          (q = a.win.trustedTypes) &&
          x(q.createPolicy) &&
          q.createPolicy("highcharts", {
            createHTML: function (c) {
              return c;
            },
          }),
        m = h ? h.createHTML("") : "";
      try {
        var l = !!new DOMParser().parseFromString(m, "text/html");
      } catch (p) {
        l = !1;
      }
      x = (function () {
        function p(f) {
          this.nodes = "string" === typeof f ? this.parseMarkup(f) : f;
        }
        p.filterUserAttributes = function (f) {
          n(f, function (c, l) {
            var h = !0;
            -1 === p.allowedAttributes.indexOf(l) && (h = !1);
            -1 !==
              ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(l) &&
              (h =
                u(c) &&
                p.allowedReferences.some(function (f) {
                  return 0 === c.indexOf(f);
                }));
            h ||
              (F(33, !1, void 0, {
                "Invalid attribute in config": "".concat(l),
              }),
              delete f[l]);
            u(c) && f[l] && (f[l] = c.replace(/</g, "&lt;"));
          });
          return f;
        };
        p.parseStyle = function (f) {
          return f.split(";").reduce(function (f, c) {
            c = c.split(":").map(function (f) {
              return f.trim();
            });
            var l = c.shift();
            l &&
              c.length &&
              (f[
                l.replace(/-([a-z])/g, function (f) {
                  return f[1].toUpperCase();
                })
              ] = c.join(":"));
            return f;
          }, {});
        };
        p.setElementHTML = function (f, c) {
          f.innerHTML = p.emptyHTML;
          c && new p(c).addToDOM(f);
        };
        p.prototype.addToDOM = function (f) {
          function l(f, h) {
            var m;
            c(f).forEach(function (f) {
              var t = f.tagName,
                c = f.textContent
                  ? a.doc.createTextNode(f.textContent)
                  : void 0,
                k = p.bypassHTMLFiltering;
              if (t)
                if ("#text" === t) var g = c;
                else if (-1 !== p.allowedTags.indexOf(t) || k) {
                  t = a.doc.createElementNS(
                    "svg" === t ? v : h.namespaceURI || v,
                    t
                  );
                  var e = f.attributes || {};
                  n(f, function (b, d) {
                    "tagName" !== d &&
                      "attributes" !== d &&
                      "children" !== d &&
                      "style" !== d &&
                      "textContent" !== d &&
                      (e[d] = b);
                  });
                  E(t, k ? e : p.filterUserAttributes(e));
                  f.style && C(t, f.style);
                  c && t.appendChild(c);
                  l(f.children || [], t);
                  g = t;
                } else F(33, !1, void 0, { "Invalid tagName in config": t });
              g && h.appendChild(g);
              m = g;
            });
            return m;
          }
          return l(this.nodes, f);
        };
        p.prototype.parseMarkup = function (f) {
          var c = [];
          f = f.trim().replace(/ style=(["'])/g, " data-style=$1");
          if (l)
            f = new DOMParser().parseFromString(
              h ? h.createHTML(f) : f,
              "text/html"
            );
          else {
            var m = B("div");
            m.innerHTML = f;
            f = { body: m };
          }
          var a = function (f, c) {
            var t = f.nodeName.toLowerCase(),
              w = { tagName: t };
            "#text" === t && (w.textContent = f.textContent || "");
            if ((t = f.attributes)) {
              var k = {};
              [].forEach.call(t, function (e) {
                "data-style" === e.name
                  ? (w.style = p.parseStyle(e.value))
                  : (k[e.name] = e.value);
              });
              w.attributes = k;
            }
            if (f.childNodes.length) {
              var g = [];
              [].forEach.call(f.childNodes, function (e) {
                a(e, g);
              });
              g.length && (w.children = g);
            }
            c.push(w);
          };
          [].forEach.call(f.body.childNodes, function (f) {
            return a(f, c);
          });
          return c;
        };
        p.allowedAttributes =
          "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align text-anchor textAnchor textLength title type valign width x x1 x2 xlink:href y y1 y2 zIndex".split(
            " "
          );
        p.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
        p.allowedTags =
          "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text textPath thead title tbody tspan td th tr u ul #text".split(
            " "
          );
        p.emptyHTML = m;
        p.bypassHTMLFiltering = !1;
        return p;
      })();
      ("");
      return x;
    }
  );
  J(
    a,
    "Core/FormatUtilities.js",
    [a["Core/Defaults.js"], a["Core/Utilities.js"]],
    function (a, q) {
      function v(a, c, h, m) {
        a = +a || 0;
        c = +c;
        var l = E.lang,
          p = (a.toString().split(".")[1] || "").split("e")[0].length,
          f = a.toString().split("e"),
          n = c;
        if (-1 === c) c = Math.min(p, 20);
        else if (!F(c)) c = 2;
        else if (c && f[1] && 0 > f[1]) {
          var G = c + +f[1];
          0 <= G
            ? ((f[0] = (+f[0]).toExponential(G).split("e")[0]), (c = G))
            : ((f[0] = f[0].split(".")[0] || 0),
              (a = 20 > c ? (f[0] * Math.pow(10, f[1])).toFixed(c) : 0),
              (f[1] = 0));
        }
        G = (
          Math.abs(f[1] ? f[0] : a) + Math.pow(10, -Math.max(c, p) - 1)
        ).toFixed(c);
        p = String(u(G));
        var H = 3 < p.length ? p.length % 3 : 0;
        h = x(h, l.decimalPoint);
        m = x(m, l.thousandsSep);
        a = (0 > a ? "-" : "") + (H ? p.substr(0, H) + m : "");
        a =
          0 > +f[1] && !n
            ? "0"
            : a + p.substr(H).replace(/(\d{3})(?=\d)/g, "$1" + m);
        c && (a += h + G.slice(-c));
        f[1] && 0 !== +a && (a += "e" + f[1]);
        return a;
      }
      var E = a.defaultOptions,
        B = a.defaultTime,
        C = q.getNestedProperty,
        F = q.isNumber,
        x = q.pick,
        u = q.pInt;
      return {
        dateFormat: function (a, c, h) {
          return B.dateFormat(a, c, h);
        },
        format: function (a, c, h) {
          var m = "{",
            l = !1,
            p = /f$/,
            f = /\.([0-9])/,
            n = E.lang,
            G = (h && h.time) || B;
          h = (h && h.numberFormatter) || v;
          for (var u = []; a; ) {
            var x = a.indexOf(m);
            if (-1 === x) break;
            var y = a.slice(0, x);
            if (l) {
              y = y.split(":");
              m = C(y.shift() || "", c);
              if (y.length && "number" === typeof m)
                if (((y = y.join(":")), p.test(y))) {
                  var t = parseInt((y.match(f) || ["", "-1"])[1], 10);
                  null !== m &&
                    (m = h(
                      m,
                      t,
                      n.decimalPoint,
                      -1 < y.indexOf(",") ? n.thousandsSep : ""
                    ));
                } else m = G.dateFormat(y, m);
              u.push(m);
            } else u.push(y);
            a = a.slice(x + 1);
            m = (l = !l) ? "}" : "{";
          }
          u.push(a);
          return u.join("");
        },
        numberFormat: v,
      };
    }
  );
  J(
    a,
    "Core/Renderer/RendererUtilities.js",
    [a["Core/Utilities.js"]],
    function (a) {
      var v = a.clamp,
        A = a.pick,
        E = a.stableSort,
        B;
      (function (a) {
        function q(a, u, n) {
          var c = a,
            h = c.reducedLen || u,
            m = function (f, c) {
              return (c.rank || 0) - (f.rank || 0);
            },
            l = function (f, c) {
              return f.target - c.target;
            },
            p,
            f = !0,
            D = [],
            G = 0;
          for (p = a.length; p--; ) G += a[p].size;
          if (G > h) {
            E(a, m);
            for (G = p = 0; G <= h; ) (G += a[p].size), p++;
            D = a.splice(p - 1, a.length);
          }
          E(a, l);
          for (
            a = a.map(function (f) {
              return {
                size: f.size,
                targets: [f.target],
                align: A(f.align, 0.5),
              };
            });
            f;

          ) {
            for (p = a.length; p--; )
              (h = a[p]),
                (m =
                  (Math.min.apply(0, h.targets) +
                    Math.max.apply(0, h.targets)) /
                  2),
                (h.pos = v(m - h.size * h.align, 0, u - h.size));
            p = a.length;
            for (f = !1; p--; )
              0 < p &&
                a[p - 1].pos + a[p - 1].size > a[p].pos &&
                ((a[p - 1].size += a[p].size),
                (a[p - 1].targets = a[p - 1].targets.concat(a[p].targets)),
                (a[p - 1].align = 0.5),
                a[p - 1].pos + a[p - 1].size > u &&
                  (a[p - 1].pos = u - a[p - 1].size),
                a.splice(p, 1),
                (f = !0));
          }
          c.push.apply(c, D);
          p = 0;
          a.some(function (f) {
            var l = 0;
            return (f.targets || []).some(function () {
              c[p].pos = f.pos + l;
              if (
                "undefined" !== typeof n &&
                Math.abs(c[p].pos - c[p].target) > n
              )
                return (
                  c.slice(0, p + 1).forEach(function (f) {
                    return delete f.pos;
                  }),
                  (c.reducedLen = (c.reducedLen || u) - 0.1 * u),
                  c.reducedLen > 0.1 * u && q(c, u, n),
                  !0
                );
              l += c[p].size;
              p++;
              return !1;
            });
          });
          E(c, l);
          return c;
        }
        a.distribute = q;
      })(B || (B = {}));
      return B;
    }
  );
  J(
    a,
    "Core/Renderer/SVG/SVGElement.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E) {
      var v = a.animate,
        C = a.animObject,
        F = a.stop,
        x = A.deg2rad,
        u = A.doc,
        n = A.svg,
        c = A.SVG_NS,
        h = A.win,
        m = E.addEvent,
        l = E.attr,
        p = E.createElement,
        f = E.css,
        D = E.defined,
        G = E.erase,
        H = E.extend,
        K = E.fireEvent,
        y = E.isArray,
        t = E.isFunction,
        w = E.isString,
        k = E.merge,
        g = E.objectEach,
        e = E.pick,
        b = E.pInt,
        d = E.syncTimeout,
        r = E.uniqueKey;
      a = (function () {
        function z() {
          this.element = void 0;
          this.onEvents = {};
          this.opacity = 1;
          this.renderer = void 0;
          this.SVG_NS = c;
          this.symbolCustomAttribs =
            "x y width height r start end innerR anchorX anchorY rounded".split(
              " "
            );
        }
        z.prototype._defaultGetter = function (b) {
          b = e(
            this[b + "Value"],
            this[b],
            this.element ? this.element.getAttribute(b) : null,
            0
          );
          /^[\-0-9\.]+$/.test(b) && (b = parseFloat(b));
          return b;
        };
        z.prototype._defaultSetter = function (b, d, e) {
          e.setAttribute(d, b);
        };
        z.prototype.add = function (b) {
          var d = this.renderer,
            e = this.element;
          b && (this.parentGroup = b);
          "undefined" !== typeof this.textStr &&
            "text" === this.element.nodeName &&
            d.buildText(this);
          this.added = !0;
          if (!b || b.handleZ || this.zIndex) var g = this.zIndexSetter();
          g || (b ? b.element : d.box).appendChild(e);
          if (this.onAdd) this.onAdd();
          return this;
        };
        z.prototype.addClass = function (b, d) {
          var e = d ? "" : this.attr("class") || "";
          b = (b || "")
            .split(/ /g)
            .reduce(
              function (b, d) {
                -1 === e.indexOf(d) && b.push(d);
                return b;
              },
              e ? [e] : []
            )
            .join(" ");
          b !== e && this.attr("class", b);
          return this;
        };
        z.prototype.afterSetters = function () {
          this.doTransform && (this.updateTransform(), (this.doTransform = !1));
        };
        z.prototype.align = function (b, d, g) {
          var r = {},
            k = this.renderer,
            I = k.alignedObjects,
            t,
            f,
            z;
          if (b) {
            if (
              ((this.alignOptions = b), (this.alignByTranslate = d), !g || w(g))
            )
              (this.alignTo = t = g || "renderer"),
                G(I, this),
                I.push(this),
                (g = void 0);
          } else
            (b = this.alignOptions),
              (d = this.alignByTranslate),
              (t = this.alignTo);
          g = e(g, k[t], "scrollablePlotBox" === t ? k.plotBox : void 0, k);
          t = b.align;
          var c = b.verticalAlign;
          k = (g.x || 0) + (b.x || 0);
          I = (g.y || 0) + (b.y || 0);
          "right" === t ? (f = 1) : "center" === t && (f = 2);
          f && (k += (g.width - (b.width || 0)) / f);
          r[d ? "translateX" : "x"] = Math.round(k);
          "bottom" === c ? (z = 1) : "middle" === c && (z = 2);
          z && (I += (g.height - (b.height || 0)) / z);
          r[d ? "translateY" : "y"] = Math.round(I);
          this[this.placed ? "animate" : "attr"](r);
          this.placed = !0;
          this.alignAttr = r;
          return this;
        };
        z.prototype.alignSetter = function (b) {
          var d = { left: "start", center: "middle", right: "end" };
          d[b] &&
            ((this.alignValue = b),
            this.element.setAttribute("text-anchor", d[b]));
        };
        z.prototype.animate = function (b, r, k) {
          var I = this,
            t = C(e(r, this.renderer.globalAnimation, !0));
          r = t.defer;
          e(u.hidden, u.msHidden, u.webkitHidden, !1) && (t.duration = 0);
          0 !== t.duration
            ? (k && (t.complete = k),
              d(function () {
                I.element && v(I, b, t);
              }, r))
            : (this.attr(b, void 0, k || t.complete),
              g(
                b,
                function (b, d) {
                  t.step &&
                    t.step.call(this, b, { prop: d, pos: 1, elem: this });
                },
                this
              ));
          return this;
        };
        z.prototype.applyTextOutline = function (b) {
          var d = this.element;
          -1 !== b.indexOf("contrast") &&
            (b = b.replace(
              /contrast/g,
              this.renderer.getContrast(d.style.fill)
            ));
          var e = b.split(" ");
          b = e[e.length - 1];
          if ((e = e[0]) && "none" !== e && A.svg) {
            this.fakeTS = !0;
            e = e.replace(/(^[\d\.]+)(.*?)$/g, function (b, d, e) {
              return 2 * Number(d) + e;
            });
            this.removeTextOutline();
            var g = u.createElementNS(c, "tspan");
            l(g, {
              class: "highcharts-text-outline",
              fill: b,
              stroke: b,
              "stroke-width": e,
              "stroke-linejoin": "round",
            });
            b = d.querySelector("textPath") || d;
            [].forEach.call(b.childNodes, function (b) {
              var d = b.cloneNode(!0);
              d.removeAttribute &&
                ["fill", "stroke", "stroke-width", "stroke"].forEach(function (
                  b
                ) {
                  return d.removeAttribute(b);
                });
              g.appendChild(d);
            });
            var r = 0;
            [].forEach.call(b.querySelectorAll("text tspan"), function (b) {
              r += Number(b.getAttribute("dy"));
            });
            e = u.createElementNS(c, "tspan");
            e.textContent = "\u200b";
            l(e, { x: Number(d.getAttribute("x")), dy: -r });
            g.appendChild(e);
            b.insertBefore(g, b.firstChild);
          }
        };
        z.prototype.attr = function (b, d, e, r) {
          var k = this.element,
            L = this.symbolCustomAttribs,
            t,
            I = this,
            f,
            z;
          if ("string" === typeof b && "undefined" !== typeof d) {
            var c = b;
            b = {};
            b[c] = d;
          }
          "string" === typeof b
            ? (I = (this[b + "Getter"] || this._defaultGetter).call(this, b, k))
            : (g(
                b,
                function (d, e) {
                  f = !1;
                  r || F(this, e);
                  this.symbolName &&
                    -1 !== L.indexOf(e) &&
                    (t || (this.symbolAttr(b), (t = !0)), (f = !0));
                  !this.rotation ||
                    ("x" !== e && "y" !== e) ||
                    (this.doTransform = !0);
                  f ||
                    ((z = this[e + "Setter"] || this._defaultSetter),
                    z.call(this, d, e, k),
                    !this.styledMode &&
                      this.shadows &&
                      /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(
                        e
                      ) &&
                      this.updateShadows(e, d, z));
                },
                this
              ),
              this.afterSetters());
          e && e.call(this);
          return I;
        };
        z.prototype.clip = function (b) {
          return this.attr(
            "clip-path",
            b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none"
          );
        };
        z.prototype.crisp = function (b, d) {
          d = d || b.strokeWidth || 0;
          var e = (Math.round(d) % 2) / 2;
          b.x = Math.floor(b.x || this.x || 0) + e;
          b.y = Math.floor(b.y || this.y || 0) + e;
          b.width = Math.floor((b.width || this.width || 0) - 2 * e);
          b.height = Math.floor((b.height || this.height || 0) - 2 * e);
          D(b.strokeWidth) && (b.strokeWidth = d);
          return b;
        };
        z.prototype.complexColor = function (b, d, e) {
          var t = this.renderer,
            I,
            L,
            f,
            z,
            c,
            w,
            M,
            l,
            h,
            a,
            m = [],
            p;
          K(this.renderer, "complexColor", { args: arguments }, function () {
            b.radialGradient
              ? (L = "radialGradient")
              : b.linearGradient && (L = "linearGradient");
            if (L) {
              f = b[L];
              c = t.gradients;
              w = b.stops;
              h = e.radialReference;
              y(f) &&
                (b[L] = f =
                  {
                    x1: f[0],
                    y1: f[1],
                    x2: f[2],
                    y2: f[3],
                    gradientUnits: "userSpaceOnUse",
                  });
              "radialGradient" === L &&
                h &&
                !D(f.gradientUnits) &&
                ((z = f),
                (f = k(f, t.getRadialAttr(h, z), {
                  gradientUnits: "userSpaceOnUse",
                })));
              g(f, function (b, d) {
                "id" !== d && m.push(d, b);
              });
              g(w, function (b) {
                m.push(b);
              });
              m = m.join(",");
              if (c[m]) a = c[m].attr("id");
              else {
                f.id = a = r();
                var S = (c[m] = t.createElement(L).attr(f).add(t.defs));
                S.radAttr = z;
                S.stops = [];
                w.forEach(function (b) {
                  0 === b[1].indexOf("rgba")
                    ? ((I = q.parse(b[1])),
                      (M = I.get("rgb")),
                      (l = I.get("a")))
                    : ((M = b[1]), (l = 1));
                  b = t
                    .createElement("stop")
                    .attr({ offset: b[0], "stop-color": M, "stop-opacity": l })
                    .add(S);
                  S.stops.push(b);
                });
              }
              p = "url(" + t.url + "#" + a + ")";
              e.setAttribute(d, p);
              e.gradient = m;
              b.toString = function () {
                return p;
              };
            }
          });
        };
        z.prototype.css = function (d) {
          var e = this.styles,
            r = {},
            t = this.element,
            z = !e;
          d.color && (d.fill = d.color);
          e &&
            g(d, function (b, d) {
              e && e[d] !== b && ((r[d] = b), (z = !0));
            });
          if (z) {
            e && (d = H(e, r));
            if (null === d.width || "auto" === d.width) delete this.textWidth;
            else if ("text" === t.nodeName.toLowerCase() && d.width)
              var L = (this.textWidth = b(d.width));
            this.styles = d;
            L && !n && this.renderer.forExport && delete d.width;
            var I = k(d);
            t.namespaceURI === this.SVG_NS &&
              ["textOutline", "textOverflow", "width"].forEach(function (b) {
                return I && delete I[b];
              });
            f(t, I);
            this.added &&
              ("text" === this.element.nodeName &&
                this.renderer.buildText(this),
              d.textOutline && this.applyTextOutline(d.textOutline));
          }
          return this;
        };
        z.prototype.dashstyleSetter = function (d) {
          var g = this["stroke-width"];
          "inherit" === g && (g = 1);
          if ((d = d && d.toLowerCase())) {
            var r = d
              .replace("shortdashdotdot", "3,1,1,1,1,1,")
              .replace("shortdashdot", "3,1,1,1")
              .replace("shortdot", "1,1,")
              .replace("shortdash", "3,1,")
              .replace("longdash", "8,3,")
              .replace(/dot/g, "1,3,")
              .replace("dash", "4,3,")
              .replace(/,$/, "")
              .split(",");
            for (d = r.length; d--; ) r[d] = "" + b(r[d]) * e(g, NaN);
            d = r.join(",").replace(/NaN/g, "none");
            this.element.setAttribute("stroke-dasharray", d);
          }
        };
        z.prototype.destroy = function () {
          var b = this,
            d = b.element || {},
            e = b.renderer,
            r = d.ownerSVGElement,
            k = (e.isSVG && "SPAN" === d.nodeName && b.parentGroup) || void 0;
          d.onclick =
            d.onmouseout =
            d.onmouseover =
            d.onmousemove =
            d.point =
              null;
          F(b);
          if (b.clipPath && r) {
            var t = b.clipPath;
            [].forEach.call(
              r.querySelectorAll("[clip-path],[CLIP-PATH]"),
              function (b) {
                -1 < b.getAttribute("clip-path").indexOf(t.element.id) &&
                  b.removeAttribute("clip-path");
              }
            );
            b.clipPath = t.destroy();
          }
          if (b.stops) {
            for (r = 0; r < b.stops.length; r++) b.stops[r].destroy();
            b.stops.length = 0;
            b.stops = void 0;
          }
          b.safeRemoveChild(d);
          for (
            e.styledMode || b.destroyShadows();
            k && k.div && 0 === k.div.childNodes.length;

          )
            (d = k.parentGroup),
              b.safeRemoveChild(k.div),
              delete k.div,
              (k = d);
          b.alignTo && G(e.alignedObjects, b);
          g(b, function (d, e) {
            b[e] && b[e].parentGroup === b && b[e].destroy && b[e].destroy();
            delete b[e];
          });
        };
        z.prototype.destroyShadows = function () {
          (this.shadows || []).forEach(function (b) {
            this.safeRemoveChild(b);
          }, this);
          this.shadows = void 0;
        };
        z.prototype.dSetter = function (b, d, e) {
          y(b) &&
            ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)),
            (this.pathArray = b),
            (b = b.reduce(function (b, d, e) {
              return d && d.join
                ? (e ? b + " " : "") + d.join(" ")
                : (d || "").toString();
            }, "")));
          /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
          this[d] !== b && (e.setAttribute(d, b), (this[d] = b));
        };
        z.prototype.fadeOut = function (b) {
          var d = this;
          d.animate(
            { opacity: 0 },
            {
              duration: e(b, 150),
              complete: function () {
                d.hide();
              },
            }
          );
        };
        z.prototype.fillSetter = function (b, d, e) {
          "string" === typeof b
            ? e.setAttribute(d, b)
            : b && this.complexColor(b, d, e);
        };
        z.prototype.getBBox = function (b, d) {
          var r = this.alignValue,
            g = this.element,
            k = this.renderer,
            L = this.styles,
            c = this.textStr,
            I = k.cache,
            w = k.cacheKeys,
            l = g.namespaceURI === this.SVG_NS;
          d = e(d, this.rotation, 0);
          var M = k.styledMode
              ? g && z.prototype.getStyle.call(g, "font-size")
              : L && L.fontSize,
            h;
          if (D(c)) {
            var a = c.toString();
            -1 === a.indexOf("<") && (a = a.replace(/[0-9]/g, "0"));
            a += [
              "",
              d,
              M,
              this.textWidth,
              r,
              L && L.textOverflow,
              L && L.fontWeight,
            ].join();
          }
          a && !b && (h = I[a]);
          if (!h) {
            if (l || k.forExport) {
              try {
                var m =
                  this.fakeTS &&
                  function (b) {
                    var d = g.querySelector(".highcharts-text-outline");
                    d && f(d, { display: b });
                  };
                t(m) && m("none");
                h = g.getBBox
                  ? H({}, g.getBBox())
                  : {
                      width: g.offsetWidth,
                      height: g.offsetHeight,
                      x: 0,
                      y: 0,
                    };
                t(m) && m("");
              } catch (W) {
                ("");
              }
              if (!h || 0 > h.width) h = { x: 0, y: 0, width: 0, height: 0 };
            } else h = this.htmlGetBBox();
            if (
              k.isSVG &&
              ((k = h.width),
              (b = h.height),
              l &&
                (h.height = b =
                  { "11px,17": 14, "13px,20": 16 }[
                    "" + (M || "") + ",".concat(Math.round(b))
                  ] || b),
              d)
            ) {
              l = Number(g.getAttribute("y") || 0) - h.y;
              r = { right: 1, center: 0.5 }[r || 0] || 0;
              L = d * x;
              M = (d - 90) * x;
              var p = k * Math.cos(L);
              d = k * Math.sin(L);
              m = Math.cos(M);
              L = Math.sin(M);
              k = h.x + r * (k - p) + l * m;
              M = k + p;
              m = M - b * m;
              p = m - p;
              l = h.y + l - r * d + l * L;
              r = l + d;
              b = r - b * L;
              d = b - d;
              h.x = Math.min(k, M, m, p);
              h.y = Math.min(l, r, b, d);
              h.width = Math.max(k, M, m, p) - h.x;
              h.height = Math.max(l, r, b, d) - h.y;
            }
            if (a && ("" === c || 0 < h.height)) {
              for (; 250 < w.length; ) delete I[w.shift()];
              I[a] || w.push(a);
              I[a] = h;
            }
          }
          return h;
        };
        z.prototype.getStyle = function (b) {
          return h
            .getComputedStyle(this.element || this, "")
            .getPropertyValue(b);
        };
        z.prototype.hasClass = function (b) {
          return -1 !== ("" + this.attr("class")).split(" ").indexOf(b);
        };
        z.prototype.hide = function () {
          return this.attr({ visibility: "hidden" });
        };
        z.prototype.htmlGetBBox = function () {
          return { height: 0, width: 0, x: 0, y: 0 };
        };
        z.prototype.init = function (b, d) {
          this.element =
            "span" === d ? p(d) : u.createElementNS(this.SVG_NS, d);
          this.renderer = b;
          K(this, "afterInit");
        };
        z.prototype.on = function (b, d) {
          var e = this.onEvents;
          if (e[b]) e[b]();
          e[b] = m(this.element, b, d);
          return this;
        };
        z.prototype.opacitySetter = function (b, d, e) {
          this.opacity = b = Number(Number(b).toFixed(3));
          e.setAttribute(d, b);
        };
        z.prototype.removeClass = function (b) {
          return this.attr(
            "class",
            ("" + this.attr("class"))
              .replace(w(b) ? new RegExp("(^| )".concat(b, "( |$)")) : b, " ")
              .replace(/ +/g, " ")
              .trim()
          );
        };
        z.prototype.removeTextOutline = function () {
          var b = this.element.querySelector("tspan.highcharts-text-outline");
          b && this.safeRemoveChild(b);
        };
        z.prototype.safeRemoveChild = function (b) {
          var d = b.parentNode;
          d && d.removeChild(b);
        };
        z.prototype.setRadialReference = function (b) {
          var d =
            this.element.gradient &&
            this.renderer.gradients[this.element.gradient];
          this.element.radialReference = b;
          d &&
            d.radAttr &&
            d.animate(this.renderer.getRadialAttr(b, d.radAttr));
          return this;
        };
        z.prototype.setTextPath = function (b, d) {
          var e = this;
          d = k(
            !0,
            {
              enabled: !0,
              attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" },
            },
            d
          );
          var g = this.renderer.url,
            t = this.text || this,
            L = t.textPath,
            f = d.attributes,
            z = d.enabled;
          b = b || (L && L.path);
          L && L.undo();
          b && z
            ? ((d = m(t, "afterModifyTree", function (d) {
                if (b && z) {
                  var k = b.attr("id");
                  k || b.attr("id", (k = r()));
                  var L = { x: 0, y: 0 };
                  D(f.dx) && ((L.dx = f.dx), delete f.dx);
                  D(f.dy) && ((L.dy = f.dy), delete f.dy);
                  t.attr(L);
                  e.attr({ transform: "" });
                  e.box && (e.box = e.box.destroy());
                  L = d.nodes.slice(0);
                  d.nodes.length = 0;
                  d.nodes[0] = {
                    tagName: "textPath",
                    attributes: H(f, {
                      "text-anchor": f.textAnchor,
                      href: "" + g + "#".concat(k),
                    }),
                    children: L,
                  };
                }
              })),
              (t.textPath = { path: b, undo: d }))
            : (t.attr({ dx: 0, dy: 0 }), delete t.textPath);
          this.added && ((t.textCache = ""), this.renderer.buildText(t));
          return this;
        };
        z.prototype.shadow = function (b, d, e) {
          var r = [],
            k = this.element,
            t = this.oldShadowOptions,
            f = this.parentGroup,
            z = f && 90 === f.rotation;
          f = {
            color: "#000000",
            offsetX: z ? -1 : 1,
            offsetY: z ? -1 : 1,
            opacity: 0.15,
            width: 3,
          };
          var c = !1,
            w;
          !0 === b ? (w = f) : "object" === typeof b && (w = H(f, b));
          w &&
            (w &&
              t &&
              g(w, function (b, d) {
                b !== t[d] && (c = !0);
              }),
            c && this.destroyShadows(),
            (this.oldShadowOptions = w));
          if (!w) this.destroyShadows();
          else if (!this.shadows) {
            f = w.opacity / w.width;
            var M = z
              ? "translate(".concat(w.offsetY, ", ").concat(w.offsetX, ")")
              : "translate(".concat(w.offsetX, ", ").concat(w.offsetY, ")");
            for (z = 1; z <= w.width; z++) {
              var h = k.cloneNode(!1);
              var I = 2 * w.width + 1 - 2 * z;
              l(h, {
                stroke: b.color || "#000000",
                "stroke-opacity": f * z,
                "stroke-width": I,
                transform: M,
                fill: "none",
              });
              h.setAttribute(
                "class",
                (h.getAttribute("class") || "") + " highcharts-shadow"
              );
              e &&
                (l(h, "height", Math.max(l(h, "height") - I, 0)),
                (h.cutHeight = I));
              d
                ? d.element.appendChild(h)
                : k.parentNode && k.parentNode.insertBefore(h, k);
              r.push(h);
            }
            this.shadows = r;
          }
          return this;
        };
        z.prototype.show = function (b) {
          void 0 === b && (b = !0);
          return this.attr({ visibility: b ? "inherit" : "visible" });
        };
        z.prototype["stroke-widthSetter"] = function (b, d, e) {
          this[d] = b;
          e.setAttribute(d, b);
        };
        z.prototype.strokeWidth = function () {
          if (!this.renderer.styledMode) return this["stroke-width"] || 0;
          var d = this.getStyle("stroke-width"),
            e = 0;
          if (d.indexOf("px") === d.length - 2) e = b(d);
          else if ("" !== d) {
            var r = u.createElementNS(c, "rect");
            l(r, { width: d, "stroke-width": 0 });
            this.element.parentNode.appendChild(r);
            e = r.getBBox().width;
            r.parentNode.removeChild(r);
          }
          return e;
        };
        z.prototype.symbolAttr = function (b) {
          var d = this;
          "x y r start end width height innerR anchorX anchorY clockwise"
            .split(" ")
            .forEach(function (r) {
              d[r] = e(b[r], d[r]);
            });
          d.attr({
            d: d.renderer.symbols[d.symbolName](d.x, d.y, d.width, d.height, d),
          });
        };
        z.prototype.textSetter = function (b) {
          b !== this.textStr &&
            (delete this.textPxLength,
            (this.textStr = b),
            this.added && this.renderer.buildText(this));
        };
        z.prototype.titleSetter = function (b) {
          var d = this.element,
            r =
              d.getElementsByTagName("title")[0] ||
              u.createElementNS(this.SVG_NS, "title");
          d.insertBefore ? d.insertBefore(r, d.firstChild) : d.appendChild(r);
          r.textContent = String(e(b, ""))
            .replace(/<[^>]*>/g, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
        };
        z.prototype.toFront = function () {
          var b = this.element;
          b.parentNode.appendChild(b);
          return this;
        };
        z.prototype.translate = function (b, d) {
          return this.attr({ translateX: b, translateY: d });
        };
        z.prototype.updateShadows = function (b, d, e) {
          var r = this.shadows;
          if (r)
            for (var g = r.length; g--; )
              e.call(
                r[g],
                "height" === b
                  ? Math.max(d - (r[g].cutHeight || 0), 0)
                  : "d" === b
                  ? this.d
                  : d,
                b,
                r[g]
              );
        };
        z.prototype.updateTransform = function () {
          var b = this.element,
            d = this.matrix,
            r = this.rotation;
          r = void 0 === r ? 0 : r;
          var g = this.scaleX,
            k = this.scaleY,
            t = this.translateX,
            f = this.translateY;
          t = [
            "translate(" +
              (void 0 === t ? 0 : t) +
              "," +
              (void 0 === f ? 0 : f) +
              ")",
          ];
          D(d) && t.push("matrix(" + d.join(",") + ")");
          r &&
            t.push(
              "rotate(" +
                r +
                " " +
                e(this.rotationOriginX, b.getAttribute("x"), 0) +
                " " +
                e(this.rotationOriginY, b.getAttribute("y") || 0) +
                ")"
            );
          (D(g) || D(k)) && t.push("scale(" + e(g, 1) + " " + e(k, 1) + ")");
          t.length &&
            !(this.text || this).textPath &&
            b.setAttribute("transform", t.join(" "));
        };
        z.prototype.visibilitySetter = function (b, d, e) {
          "inherit" === b
            ? e.removeAttribute(d)
            : this[d] !== b && e.setAttribute(d, b);
          this[d] = b;
        };
        z.prototype.xGetter = function (b) {
          "circle" === this.element.nodeName &&
            ("x" === b ? (b = "cx") : "y" === b && (b = "cy"));
          return this._defaultGetter(b);
        };
        z.prototype.zIndexSetter = function (d, e) {
          var r = this.renderer,
            g = this.parentGroup,
            k = (g || r).element || r.box,
            t = this.element;
          r = k === r.box;
          var f = !1;
          var z = this.added;
          var c;
          D(d)
            ? (t.setAttribute("data-z-index", d),
              (d = +d),
              this[e] === d && (z = !1))
            : D(this[e]) && t.removeAttribute("data-z-index");
          this[e] = d;
          if (z) {
            (d = this.zIndex) && g && (g.handleZ = !0);
            e = k.childNodes;
            for (c = e.length - 1; 0 <= c && !f; c--) {
              g = e[c];
              z = g.getAttribute("data-z-index");
              var w = !D(z);
              if (g !== t)
                if (0 > d && w && !r && !c) k.insertBefore(t, e[c]), (f = !0);
                else if (b(z) <= d || (w && (!D(d) || 0 <= d)))
                  k.insertBefore(t, e[c + 1] || null), (f = !0);
            }
            f || (k.insertBefore(t, e[r ? 3 : 0] || null), (f = !0));
          }
          return f;
        };
        return z;
      })();
      a.prototype.strokeSetter = a.prototype.fillSetter;
      a.prototype.yGetter = a.prototype.xGetter;
      a.prototype.matrixSetter =
        a.prototype.rotationOriginXSetter =
        a.prototype.rotationOriginYSetter =
        a.prototype.rotationSetter =
        a.prototype.scaleXSetter =
        a.prototype.scaleYSetter =
        a.prototype.translateXSetter =
        a.prototype.translateYSetter =
        a.prototype.verticalAlignSetter =
          function (b, d) {
            this[d] = b;
            this.doTransform = !0;
          };
      ("");
      return a;
    }
  );
  J(
    a,
    "Core/Renderer/RendererRegistry.js",
    [a["Core/Globals.js"]],
    function (a) {
      var v;
      (function (v) {
        v.rendererTypes = {};
        var q;
        v.getRendererType = function (a) {
          void 0 === a && (a = q);
          return v.rendererTypes[a] || v.rendererTypes[q];
        };
        v.registerRendererType = function (A, E, F) {
          v.rendererTypes[A] = E;
          if (!q || F) (q = A), (a.Renderer = E);
        };
      })(v || (v = {}));
      return v;
    }
  );
  J(
    a,
    "Core/Renderer/SVG/SVGLabel.js",
    [a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]],
    function (a, q) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (c, h) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (c, h) {
                    c.__proto__ = h;
                  }) ||
                function (c, h) {
                  for (var l in h) h.hasOwnProperty(l) && (c[l] = h[l]);
                };
              return a(c, h);
            };
            return function (c, h) {
              function m() {
                this.constructor = c;
              }
              a(c, h);
              c.prototype =
                null === h
                  ? Object.create(h)
                  : ((m.prototype = h.prototype), new m());
            };
          })(),
        E = q.defined,
        B = q.extend,
        C = q.isNumber,
        F = q.merge,
        x = q.pick,
        u = q.removeEvent;
      return (function (n) {
        function c(h, a, l, p, f, D, G, u, K, y) {
          var t = n.call(this) || this;
          t.paddingLeftSetter = t.paddingSetter;
          t.paddingRightSetter = t.paddingSetter;
          t.init(h, "g");
          t.textStr = a;
          t.x = l;
          t.y = p;
          t.anchorX = D;
          t.anchorY = G;
          t.baseline = K;
          t.className = y;
          t.addClass(
            "button" === y ? "highcharts-no-tooltip" : "highcharts-label"
          );
          y && t.addClass("highcharts-" + y);
          t.text = h.text(void 0, 0, 0, u).attr({ zIndex: 1 });
          var w;
          "string" === typeof f &&
            ((w = /^url\((.*?)\)$/.test(f)) || t.renderer.symbols[f]) &&
            (t.symbolKey = f);
          t.bBox = c.emptyBBox;
          t.padding = 3;
          t.baselineOffset = 0;
          t.needsBox = h.styledMode || w;
          t.deferredAttr = {};
          t.alignFactor = 0;
          return t;
        }
        v(c, n);
        c.prototype.alignSetter = function (c) {
          c = { left: 0, center: 0.5, right: 1 }[c];
          c !== this.alignFactor &&
            ((this.alignFactor = c),
            this.bBox && C(this.xSetting) && this.attr({ x: this.xSetting }));
        };
        c.prototype.anchorXSetter = function (c, a) {
          this.anchorX = c;
          this.boxAttr(
            a,
            Math.round(c) - this.getCrispAdjust() - this.xSetting
          );
        };
        c.prototype.anchorYSetter = function (c, a) {
          this.anchorY = c;
          this.boxAttr(a, c - this.ySetting);
        };
        c.prototype.boxAttr = function (c, a) {
          this.box ? this.box.attr(c, a) : (this.deferredAttr[c] = a);
        };
        c.prototype.css = function (h) {
          if (h) {
            var m = {};
            h = F(h);
            c.textProps.forEach(function (c) {
              "undefined" !== typeof h[c] && ((m[c] = h[c]), delete h[c]);
            });
            this.text.css(m);
            "fontSize" in m || "fontWeight" in m
              ? this.updateTextPadding()
              : ("width" in m || "textOverflow" in m) && this.updateBoxSize();
          }
          return a.prototype.css.call(this, h);
        };
        c.prototype.destroy = function () {
          u(this.element, "mouseenter");
          u(this.element, "mouseleave");
          this.text && this.text.destroy();
          this.box && (this.box = this.box.destroy());
          a.prototype.destroy.call(this);
        };
        c.prototype.fillSetter = function (c, a) {
          c && (this.needsBox = !0);
          this.fill = c;
          this.boxAttr(a, c);
        };
        c.prototype.getBBox = function () {
          this.textStr &&
            0 === this.bBox.width &&
            0 === this.bBox.height &&
            this.updateBoxSize();
          var c = this.padding,
            a = x(this.paddingLeft, c);
          return {
            width: this.width,
            height: this.height,
            x: this.bBox.x - a,
            y: this.bBox.y - c,
          };
        };
        c.prototype.getCrispAdjust = function () {
          return this.renderer.styledMode && this.box
            ? (this.box.strokeWidth() % 2) / 2
            : ((this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) %
                2) /
                2;
        };
        c.prototype.heightSetter = function (c) {
          this.heightSetting = c;
        };
        c.prototype.onAdd = function () {
          this.text.add(this);
          this.attr({
            text: x(this.textStr, ""),
            x: this.x || 0,
            y: this.y || 0,
          });
          this.box &&
            E(this.anchorX) &&
            this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        };
        c.prototype.paddingSetter = function (c, a) {
          C(c)
            ? c !== this[a] && ((this[a] = c), this.updateTextPadding())
            : (this[a] = void 0);
        };
        c.prototype.rSetter = function (c, a) {
          this.boxAttr(a, c);
        };
        c.prototype.shadow = function (c) {
          c &&
            !this.renderer.styledMode &&
            (this.updateBoxSize(), this.box && this.box.shadow(c));
          return this;
        };
        c.prototype.strokeSetter = function (c, a) {
          this.stroke = c;
          this.boxAttr(a, c);
        };
        c.prototype["stroke-widthSetter"] = function (c, a) {
          c && (this.needsBox = !0);
          this["stroke-width"] = c;
          this.boxAttr(a, c);
        };
        c.prototype["text-alignSetter"] = function (c) {
          this.textAlign = c;
        };
        c.prototype.textSetter = function (c) {
          "undefined" !== typeof c && this.text.attr({ text: c });
          this.updateTextPadding();
        };
        c.prototype.updateBoxSize = function () {
          var a = this.text,
            m = a.element.style,
            l = {},
            p = this.padding,
            f = (this.bBox =
              (C(this.widthSetting) &&
                C(this.heightSetting) &&
                !this.textAlign) ||
              !E(a.textStr)
                ? c.emptyBBox
                : a.getBBox());
          this.width = this.getPaddedWidth();
          this.height = (this.heightSetting || f.height || 0) + 2 * p;
          m = this.renderer.fontMetrics(m && m.fontSize, a);
          this.baselineOffset =
            p +
            Math.min((this.text.firstLineMetrics || m).b, f.height || Infinity);
          this.heightSetting &&
            (this.baselineOffset += (this.heightSetting - m.h) / 2);
          this.needsBox &&
            !a.textPath &&
            (this.box ||
              ((a = this.box =
                this.symbolKey
                  ? this.renderer.symbol(this.symbolKey)
                  : this.renderer.rect()),
              a.addClass(
                ("button" === this.className ? "" : "highcharts-label-box") +
                  (this.className
                    ? " highcharts-" + this.className + "-box"
                    : "")
              ),
              a.add(this)),
            (a = this.getCrispAdjust()),
            (l.x = a),
            (l.y = (this.baseline ? -this.baselineOffset : 0) + a),
            (l.width = Math.round(this.width)),
            (l.height = Math.round(this.height)),
            this.box.attr(B(l, this.deferredAttr)),
            (this.deferredAttr = {}));
        };
        c.prototype.updateTextPadding = function () {
          var c = this.text;
          if (!c.textPath) {
            this.updateBoxSize();
            var a = this.baseline ? 0 : this.baselineOffset,
              l = x(this.paddingLeft, this.padding);
            E(this.widthSetting) &&
              this.bBox &&
              ("center" === this.textAlign || "right" === this.textAlign) &&
              (l +=
                { center: 0.5, right: 1 }[this.textAlign] *
                (this.widthSetting - this.bBox.width));
            if (l !== c.x || a !== c.y)
              c.attr("x", l),
                c.hasBoxWidthChanged && (this.bBox = c.getBBox(!0)),
                "undefined" !== typeof a && c.attr("y", a);
            c.x = l;
            c.y = a;
          }
        };
        c.prototype.widthSetter = function (c) {
          this.widthSetting = C(c) ? c : void 0;
        };
        c.prototype.getPaddedWidth = function () {
          var c = this.padding,
            a = x(this.paddingLeft, c);
          c = x(this.paddingRight, c);
          return (this.widthSetting || this.bBox.width || 0) + a + c;
        };
        c.prototype.xSetter = function (c) {
          this.x = c;
          this.alignFactor &&
            ((c -= this.alignFactor * this.getPaddedWidth()),
            (this["forceAnimate:x"] = !0));
          this.xSetting = Math.round(c);
          this.attr("translateX", this.xSetting);
        };
        c.prototype.ySetter = function (c) {
          this.ySetting = this.y = Math.round(c);
          this.attr("translateY", this.ySetting);
        };
        c.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
        c.textProps =
          "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(
            " "
          );
        return c;
      })(a);
    }
  );
  J(a, "Core/Renderer/SVG/Symbols.js", [a["Core/Utilities.js"]], function (a) {
    function v(a, u, n, c, h) {
      var m = [];
      if (h) {
        var l = h.start || 0,
          p = F(h.r, n);
        n = F(h.r, c || n);
        var f = (h.end || 0) - 0.001;
        c = h.innerR;
        var D = F(h.open, 0.001 > Math.abs((h.end || 0) - l - 2 * Math.PI)),
          G = Math.cos(l),
          H = Math.sin(l),
          K = Math.cos(f),
          y = Math.sin(f);
        l = F(h.longArc, 0.001 > f - l - Math.PI ? 0 : 1);
        m.push(
          ["M", a + p * G, u + n * H],
          ["A", p, n, 0, l, F(h.clockwise, 1), a + p * K, u + n * y]
        );
        B(c) &&
          m.push(
            D ? ["M", a + c * K, u + c * y] : ["L", a + c * K, u + c * y],
            [
              "A",
              c,
              c,
              0,
              l,
              B(h.clockwise) ? 1 - h.clockwise : 0,
              a + c * G,
              u + c * H,
            ]
          );
        D || m.push(["Z"]);
      }
      return m;
    }
    function A(a, u, n, c, h) {
      return h && h.r
        ? E(a, u, n, c, h)
        : [
            ["M", a, u],
            ["L", a + n, u],
            ["L", a + n, u + c],
            ["L", a, u + c],
            ["Z"],
          ];
    }
    function E(a, u, n, c, h) {
      h = (h && h.r) || 0;
      return [
        ["M", a + h, u],
        ["L", a + n - h, u],
        ["C", a + n, u, a + n, u, a + n, u + h],
        ["L", a + n, u + c - h],
        ["C", a + n, u + c, a + n, u + c, a + n - h, u + c],
        ["L", a + h, u + c],
        ["C", a, u + c, a, u + c, a, u + c - h],
        ["L", a, u + h],
        ["C", a, u, a, u, a + h, u],
      ];
    }
    var B = a.defined,
      C = a.isNumber,
      F = a.pick;
    return {
      arc: v,
      callout: function (a, u, n, c, h) {
        var m = Math.min((h && h.r) || 0, n, c),
          l = m + 6,
          p = h && h.anchorX;
        h = (h && h.anchorY) || 0;
        var f = E(a, u, n, c, { r: m });
        if (!C(p)) return f;
        a + p >= n
          ? h > u + l && h < u + c - l
            ? f.splice(
                3,
                1,
                ["L", a + n, h - 6],
                ["L", a + n + 6, h],
                ["L", a + n, h + 6],
                ["L", a + n, u + c - m]
              )
            : f.splice(
                3,
                1,
                ["L", a + n, c / 2],
                ["L", p, h],
                ["L", a + n, c / 2],
                ["L", a + n, u + c - m]
              )
          : 0 >= a + p
          ? h > u + l && h < u + c - l
            ? f.splice(
                7,
                1,
                ["L", a, h + 6],
                ["L", a - 6, h],
                ["L", a, h - 6],
                ["L", a, u + m]
              )
            : f.splice(
                7,
                1,
                ["L", a, c / 2],
                ["L", p, h],
                ["L", a, c / 2],
                ["L", a, u + m]
              )
          : h && h > c && p > a + l && p < a + n - l
          ? f.splice(
              5,
              1,
              ["L", p + 6, u + c],
              ["L", p, u + c + 6],
              ["L", p - 6, u + c],
              ["L", a + m, u + c]
            )
          : h &&
            0 > h &&
            p > a + l &&
            p < a + n - l &&
            f.splice(
              1,
              1,
              ["L", p - 6, u],
              ["L", p, u - 6],
              ["L", p + 6, u],
              ["L", n - m, u]
            );
        return f;
      },
      circle: function (a, u, n, c) {
        return v(a + n / 2, u + c / 2, n / 2, c / 2, {
          start: 0.5 * Math.PI,
          end: 2.5 * Math.PI,
          open: !1,
        });
      },
      diamond: function (a, u, n, c) {
        return [
          ["M", a + n / 2, u],
          ["L", a + n, u + c / 2],
          ["L", a + n / 2, u + c],
          ["L", a, u + c / 2],
          ["Z"],
        ];
      },
      rect: A,
      roundedRect: E,
      square: A,
      triangle: function (a, u, n, c) {
        return [
          ["M", a + n / 2, u],
          ["L", a + n, u + c],
          ["L", a, u + c],
          ["Z"],
        ];
      },
      "triangle-down": function (a, u, n, c) {
        return [["M", a, u], ["L", a + n, u], ["L", a + n / 2, u + c], ["Z"]];
      },
    };
  });
  J(
    a,
    "Core/Renderer/SVG/TextBuilder.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      var v = q.doc,
        B = q.SVG_NS,
        C = q.win,
        F = A.attr,
        x = A.extend,
        u = A.fireEvent,
        n = A.isString,
        c = A.objectEach,
        h = A.pick;
      return (function () {
        function m(c) {
          var a = c.styles;
          this.renderer = c.renderer;
          this.svgElement = c;
          this.width = c.textWidth;
          this.textLineHeight = a && a.lineHeight;
          this.textOutline = a && a.textOutline;
          this.ellipsis = !(!a || "ellipsis" !== a.textOverflow);
          this.noWrap = !(!a || "nowrap" !== a.whiteSpace);
          this.fontSize = a && a.fontSize;
        }
        m.prototype.buildSVG = function () {
          var c = this.svgElement,
            m = c.element,
            f = c.renderer,
            D = h(c.textStr, "").toString(),
            G = -1 !== D.indexOf("<"),
            u = m.childNodes;
          f = this.width && !c.added && f.box;
          var K = /<br.*?>/g,
            y = [
              D,
              this.ellipsis,
              this.noWrap,
              this.textLineHeight,
              this.textOutline,
              this.fontSize,
              this.width,
            ].join();
          if (y !== c.textCache) {
            c.textCache = y;
            delete c.actualWidth;
            for (y = u.length; y--; ) m.removeChild(u[y]);
            G ||
            this.ellipsis ||
            this.width ||
            c.textPath ||
            (-1 !== D.indexOf(" ") && (!this.noWrap || K.test(D)))
              ? "" !== D &&
                (f && f.appendChild(m),
                (D = new a(D)),
                this.modifyTree(D.nodes),
                D.addToDOM(m),
                this.modifyDOM(),
                this.ellipsis &&
                  -1 !== (m.textContent || "").indexOf("\u2026") &&
                  c.attr(
                    "title",
                    this.unescapeEntities(c.textStr || "", ["&lt;", "&gt;"])
                  ),
                f && f.removeChild(m))
              : m.appendChild(v.createTextNode(this.unescapeEntities(D)));
            n(this.textOutline) &&
              c.applyTextOutline &&
              c.applyTextOutline(this.textOutline);
          }
        };
        m.prototype.modifyDOM = function () {
          var c = this,
            a = this.svgElement,
            f = F(a.element, "x");
          a.firstLineMetrics = void 0;
          for (var m; (m = a.element.firstChild); )
            if (/^[\s\u200B]*$/.test(m.textContent || " "))
              a.element.removeChild(m);
            else break;
          [].forEach.call(
            a.element.querySelectorAll("tspan.highcharts-br"),
            function (l, t) {
              l.nextSibling &&
                l.previousSibling &&
                (0 === t &&
                  1 === l.previousSibling.nodeType &&
                  (a.firstLineMetrics = a.renderer.fontMetrics(
                    void 0,
                    l.previousSibling
                  )),
                F(l, { dy: c.getLineHeight(l.nextSibling), x: f }));
            }
          );
          var h = this.width || 0;
          if (h) {
            var n = function (l, t) {
                var w = l.textContent || "",
                  k = w.replace(/([^\^])-/g, "$1- ").split(" "),
                  g =
                    !c.noWrap &&
                    (1 < k.length || 1 < a.element.childNodes.length),
                  e = c.getLineHeight(t),
                  b = 0,
                  d = a.actualWidth;
                if (c.ellipsis)
                  w &&
                    c.truncate(
                      l,
                      w,
                      void 0,
                      0,
                      Math.max(0, h - parseInt(c.fontSize || 12, 10)),
                      function (b, d) {
                        return b.substring(0, d) + "\u2026";
                      }
                    );
                else if (g) {
                  w = [];
                  for (g = []; t.firstChild && t.firstChild !== l; )
                    g.push(t.firstChild), t.removeChild(t.firstChild);
                  for (; k.length; )
                    k.length &&
                      !c.noWrap &&
                      0 < b &&
                      (w.push(l.textContent || ""),
                      (l.textContent = k.join(" ").replace(/- /g, "-"))),
                      c.truncate(
                        l,
                        void 0,
                        k,
                        0 === b ? d || 0 : 0,
                        h,
                        function (b, d) {
                          return k.slice(0, d).join(" ").replace(/- /g, "-");
                        }
                      ),
                      (d = a.actualWidth),
                      b++;
                  g.forEach(function (b) {
                    t.insertBefore(b, l);
                  });
                  w.forEach(function (b) {
                    t.insertBefore(v.createTextNode(b), l);
                    b = v.createElementNS(B, "tspan");
                    b.textContent = "\u200b";
                    F(b, { dy: e, x: f });
                    t.insertBefore(b, l);
                  });
                }
              },
              u = function (c) {
                [].slice.call(c.childNodes).forEach(function (t) {
                  t.nodeType === C.Node.TEXT_NODE
                    ? n(t, c)
                    : (-1 !== t.className.baseVal.indexOf("highcharts-br") &&
                        (a.actualWidth = 0),
                      u(t));
                });
              };
            u(a.element);
          }
        };
        m.prototype.getLineHeight = function (c) {
          var a;
          c = c.nodeType === C.Node.TEXT_NODE ? c.parentElement : c;
          this.renderer.styledMode ||
            (a =
              c && /(px|em)$/.test(c.style.fontSize)
                ? c.style.fontSize
                : this.fontSize || this.renderer.style.fontSize || 12);
          return this.textLineHeight
            ? parseInt(this.textLineHeight.toString(), 10)
            : this.renderer.fontMetrics(a, c || this.svgElement.element).h;
        };
        m.prototype.modifyTree = function (c) {
          var a = this,
            f = function (l, m) {
              var h = l.attributes;
              h = void 0 === h ? {} : h;
              var p = l.children,
                y = l.style;
              y = void 0 === y ? {} : y;
              var t = l.tagName,
                w = a.renderer.styledMode;
              if ("b" === t || "strong" === t)
                w
                  ? (h["class"] = "highcharts-strong")
                  : (y.fontWeight = "bold");
              else if ("i" === t || "em" === t)
                w
                  ? (h["class"] = "highcharts-emphasized")
                  : (y.fontStyle = "italic");
              y && y.color && (y.fill = y.color);
              "br" === t
                ? ((h["class"] = "highcharts-br"),
                  (l.textContent = "\u200b"),
                  (m = c[m + 1]) &&
                    m.textContent &&
                    (m.textContent = m.textContent.replace(/^ +/gm, "")))
                : "a" === t &&
                  p &&
                  p.some(function (k) {
                    return "#text" === k.tagName;
                  }) &&
                  (l.children = [{ children: p, tagName: "tspan" }]);
              "#text" !== t && "a" !== t && (l.tagName = "tspan");
              x(l, { attributes: h, style: y });
              p &&
                p
                  .filter(function (k) {
                    return "#text" !== k.tagName;
                  })
                  .forEach(f);
            };
          c.forEach(f);
          u(this.svgElement, "afterModifyTree", { nodes: c });
        };
        m.prototype.truncate = function (c, a, f, m, h, n) {
          var l = this.svgElement,
            p = l.renderer,
            t = l.rotation,
            w = [],
            k = f ? 1 : 0,
            g = (a || f || "").length,
            e = g,
            b,
            d = function (b, d) {
              d = d || b;
              var e = c.parentNode;
              if (e && "undefined" === typeof w[d])
                if (e.getSubStringLength)
                  try {
                    w[d] = m + e.getSubStringLength(0, f ? d + 1 : d);
                  } catch (P) {
                    ("");
                  }
                else
                  p.getSpanWidth &&
                    ((c.textContent = n(a || f, b)),
                    (w[d] = m + p.getSpanWidth(l, c)));
              return w[d];
            };
          l.rotation = 0;
          var r = d(c.textContent.length);
          if (m + r > h) {
            for (; k <= g; )
              (e = Math.ceil((k + g) / 2)),
                f && (b = n(f, e)),
                (r = d(e, b && b.length - 1)),
                k === g ? (k = g + 1) : r > h ? (g = e - 1) : (k = e);
            0 === g
              ? (c.textContent = "")
              : (a && g === a.length - 1) ||
                (c.textContent = b || n(a || f, e));
          }
          f && f.splice(0, e);
          l.actualWidth = r;
          l.rotation = t;
        };
        m.prototype.unescapeEntities = function (a, m) {
          c(this.renderer.escapes, function (c, l) {
            (m && -1 !== m.indexOf(c)) ||
              (a = a.toString().replace(new RegExp(c, "g"), l));
          });
          return a;
        };
        return m;
      })();
    }
  );
  J(
    a,
    "Core/Renderer/SVG/SVGRenderer.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGLabel.js"],
      a["Core/Renderer/SVG/Symbols.js"],
      a["Core/Renderer/SVG/TextBuilder.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C, F, x, u) {
      var n = A.charts,
        c = A.deg2rad,
        h = A.doc,
        m = A.isFirefox,
        l = A.isMS,
        p = A.isWebKit,
        f = A.noop,
        D = A.SVG_NS,
        G = A.symbolSizes,
        H = A.win,
        K = u.addEvent,
        y = u.attr,
        t = u.createElement,
        w = u.css,
        k = u.defined,
        g = u.destroyObjectProperties,
        e = u.extend,
        b = u.isArray,
        d = u.isNumber,
        r = u.isObject,
        z = u.isString,
        I = u.merge,
        N = u.pick,
        P = u.pInt,
        O = u.uniqueKey,
        U;
      A = (function () {
        function f(b, d, e, r, g, k, c) {
          this.width =
            this.url =
            this.style =
            this.isSVG =
            this.imgCount =
            this.height =
            this.gradients =
            this.globalAnimation =
            this.defs =
            this.chartIndex =
            this.cacheKeys =
            this.cache =
            this.boxWrapper =
            this.box =
            this.alignedObjects =
              void 0;
          this.init(b, d, e, r, g, k, c);
        }
        f.prototype.init = function (b, d, e, r, g, k, c) {
          var t = this.createElement("svg").attr({
              version: "1.1",
              class: "highcharts-root",
            }),
            f = t.element;
          c || t.css(this.getStyle(r));
          b.appendChild(f);
          y(b, "dir", "ltr");
          -1 === b.innerHTML.indexOf("xmlns") && y(f, "xmlns", this.SVG_NS);
          this.isSVG = !0;
          this.box = f;
          this.boxWrapper = t;
          this.alignedObjects = [];
          this.url = this.getReferenceURL();
          this.createElement("desc")
            .add()
            .element.appendChild(
              h.createTextNode("Created with Highcharts 10.3.3")
            );
          this.defs = this.createElement("defs").add();
          this.allowHTML = k;
          this.forExport = g;
          this.styledMode = c;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.setSize(d, e, !1);
          var a;
          m &&
            b.getBoundingClientRect &&
            ((d = function () {
              w(b, { left: 0, top: 0 });
              a = b.getBoundingClientRect();
              w(b, {
                left: Math.ceil(a.left) - a.left + "px",
                top: Math.ceil(a.top) - a.top + "px",
              });
            }),
            d(),
            (this.unSubPixelFix = K(H, "resize", d)));
        };
        f.prototype.definition = function (b) {
          return new a([b]).addToDOM(this.defs.element);
        };
        f.prototype.getReferenceURL = function () {
          if ((m || p) && h.getElementsByTagName("base").length) {
            if (!k(U)) {
              var b = O();
              b = new a([
                {
                  tagName: "svg",
                  attributes: { width: 8, height: 8 },
                  children: [
                    {
                      tagName: "defs",
                      children: [
                        {
                          tagName: "clipPath",
                          attributes: { id: b },
                          children: [
                            {
                              tagName: "rect",
                              attributes: { width: 4, height: 4 },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tagName: "rect",
                      attributes: {
                        id: "hitme",
                        width: 8,
                        height: 8,
                        "clip-path": "url(#".concat(b, ")"),
                        fill: "rgba(0,0,0,0.001)",
                      },
                    },
                  ],
                },
              ]).addToDOM(h.body);
              w(b, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
              var d = h.elementFromPoint(6, 6);
              U = "hitme" === (d && d.id);
              h.body.removeChild(b);
            }
            if (U)
              return H.location.href
                .split("#")[0]
                .replace(/<[^>]*>/g, "")
                .replace(/([\('\)])/g, "\\$1")
                .replace(/ /g, "%20");
          }
          return "";
        };
        f.prototype.getStyle = function (b) {
          return (this.style = e(
            {
              fontFamily:
                '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
              fontSize: "12px",
            },
            b
          ));
        };
        f.prototype.setStyle = function (b) {
          this.boxWrapper.css(this.getStyle(b));
        };
        f.prototype.isHidden = function () {
          return !this.boxWrapper.getBBox().width;
        };
        f.prototype.destroy = function () {
          var b = this.defs;
          this.box = null;
          this.boxWrapper = this.boxWrapper.destroy();
          g(this.gradients || {});
          this.gradients = null;
          b && (this.defs = b.destroy());
          this.unSubPixelFix && this.unSubPixelFix();
          return (this.alignedObjects = null);
        };
        f.prototype.createElement = function (b) {
          var d = new this.Element();
          d.init(this, b);
          return d;
        };
        f.prototype.getRadialAttr = function (b, d) {
          return {
            cx: b[0] - b[2] / 2 + (d.cx || 0) * b[2],
            cy: b[1] - b[2] / 2 + (d.cy || 0) * b[2],
            r: (d.r || 0) * b[2],
          };
        };
        f.prototype.buildText = function (b) {
          new x(b).buildSVG();
        };
        f.prototype.getContrast = function (b) {
          b = q.parse(b).rgba.map(function (b) {
            b /= 255;
            return 0.03928 >= b
              ? b / 12.92
              : Math.pow((b + 0.055) / 1.055, 2.4);
          });
          b = 0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2];
          return 1.05 / (b + 0.05) > (b + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
        };
        f.prototype.button = function (b, d, g, k, c, t, f, z, L, w) {
          void 0 === c && (c = {});
          var M = this.label(b, d, g, L, void 0, void 0, w, void 0, "button"),
            m = this.styledMode;
          b = c.states || {};
          var h = 0;
          c = I(c);
          delete c.states;
          var S = I(
            { color: "#333333", cursor: "pointer", fontWeight: "normal" },
            c.style
          );
          delete c.style;
          var p = a.filterUserAttributes(c);
          M.attr(I({ padding: 8, r: 2 }, p));
          if (!m) {
            p = I({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1 }, p);
            t = I(
              p,
              { fill: "#e6e6e6" },
              a.filterUserAttributes(t || b.hover || {})
            );
            var y = t.style;
            delete t.style;
            f = I(
              p,
              {
                fill: "#e6ebf5",
                style: { color: "#000000", fontWeight: "bold" },
              },
              a.filterUserAttributes(f || b.select || {})
            );
            var Q = f.style;
            delete f.style;
            z = I(
              p,
              { style: { color: "#cccccc" } },
              a.filterUserAttributes(z || b.disabled || {})
            );
            var n = z.style;
            delete z.style;
          }
          K(M.element, l ? "mouseover" : "mouseenter", function () {
            3 !== h && M.setState(1);
          });
          K(M.element, l ? "mouseout" : "mouseleave", function () {
            3 !== h && M.setState(h);
          });
          M.setState = function (b) {
            1 !== b && (M.state = h = b);
            M.removeClass(
              /highcharts-button-(normal|hover|pressed|disabled)/
            ).addClass(
              "highcharts-button-" +
                ["normal", "hover", "pressed", "disabled"][b || 0]
            );
            m ||
              (M.attr([p, t, f, z][b || 0]),
              (b = [S, y, Q, n][b || 0]),
              r(b) && M.css(b));
          };
          m ||
            (M.attr(p).css(e({ cursor: "default" }, S)),
            w && M.text.css({ pointerEvents: "none" }));
          return M.on("touchstart", function (b) {
            return b.stopPropagation();
          }).on("click", function (b) {
            3 !== h && k.call(M, b);
          });
        };
        f.prototype.crispLine = function (b, d, e) {
          void 0 === e && (e = "round");
          var r = b[0],
            g = b[1];
          k(r[1]) &&
            r[1] === g[1] &&
            (r[1] = g[1] = Math[e](r[1]) - (d % 2) / 2);
          k(r[2]) &&
            r[2] === g[2] &&
            (r[2] = g[2] = Math[e](r[2]) + (d % 2) / 2);
          return b;
        };
        f.prototype.path = function (d) {
          var g = this.styledMode ? {} : { fill: "none" };
          b(d) ? (g.d = d) : r(d) && e(g, d);
          return this.createElement("path").attr(g);
        };
        f.prototype.circle = function (b, d, e) {
          b = r(b) ? b : "undefined" === typeof b ? {} : { x: b, y: d, r: e };
          d = this.createElement("circle");
          d.xSetter = d.ySetter = function (b, d, e) {
            e.setAttribute("c" + d, b);
          };
          return d.attr(b);
        };
        f.prototype.arc = function (b, d, e, g, k, c) {
          r(b)
            ? ((g = b), (d = g.y), (e = g.r), (b = g.x))
            : (g = { innerR: g, start: k, end: c });
          b = this.symbol("arc", b, d, e, e, g);
          b.r = e;
          return b;
        };
        f.prototype.rect = function (b, d, e, g, k, c) {
          k = r(b) ? b.r : k;
          var t = this.createElement("rect");
          b = r(b)
            ? b
            : "undefined" === typeof b
            ? {}
            : { x: b, y: d, width: Math.max(e, 0), height: Math.max(g, 0) };
          this.styledMode ||
            ("undefined" !== typeof c &&
              ((b["stroke-width"] = c), (b = t.crisp(b))),
            (b.fill = "none"));
          k && (b.r = k);
          t.rSetter = function (b, d, e) {
            t.r = b;
            y(e, { rx: b, ry: b });
          };
          t.rGetter = function () {
            return t.r || 0;
          };
          return t.attr(b);
        };
        f.prototype.setSize = function (b, d, e) {
          this.width = b;
          this.height = d;
          this.boxWrapper.animate(
            { width: b, height: d },
            {
              step: function () {
                this.attr({
                  viewBox:
                    "0 0 " + this.attr("width") + " " + this.attr("height"),
                });
              },
              duration: N(e, !0) ? void 0 : 0,
            }
          );
          this.alignElements();
        };
        f.prototype.g = function (b) {
          var d = this.createElement("g");
          return b ? d.attr({ class: "highcharts-" + b }) : d;
        };
        f.prototype.image = function (b, e, g, r, k, c) {
          var t = { preserveAspectRatio: "none" },
            f = function (b, d) {
              b.setAttributeNS
                ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", d)
                : b.setAttribute("hc-svg-href", d);
            };
          d(e) && (t.x = e);
          d(g) && (t.y = g);
          d(r) && (t.width = r);
          d(k) && (t.height = k);
          var a = this.createElement("image").attr(t);
          e = function (d) {
            f(a.element, b);
            c.call(a, d);
          };
          c
            ? (f(
                a.element,
                "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              ),
              (g = new H.Image()),
              K(g, "load", e),
              (g.src = b),
              g.complete && e({}))
            : f(a.element, b);
          return a;
        };
        f.prototype.symbol = function (b, d, g, r, c, f) {
          var a = this,
            z = /^url\((.*?)\)$/,
            L = z.test(b),
            M = !L && (this.symbols[b] ? b : "circle"),
            l = M && this.symbols[M],
            m;
          if (l) {
            "number" === typeof d &&
              (m = l.call(
                this.symbols,
                Math.round(d || 0),
                Math.round(g || 0),
                r || 0,
                c || 0,
                f
              ));
            var I = this.path(m);
            a.styledMode || I.attr("fill", "none");
            e(I, { symbolName: M || void 0, x: d, y: g, width: r, height: c });
            f && e(I, f);
          } else if (L) {
            var p = b.match(z)[1];
            var S = (I = this.image(p));
            S.imgwidth = N(G[p] && G[p].width, f && f.width);
            S.imgheight = N(G[p] && G[p].height, f && f.height);
            var D = function (b) {
              return b.attr({ width: b.width, height: b.height });
            };
            ["width", "height"].forEach(function (b) {
              S[b + "Setter"] = function (b, d) {
                this[d] = b;
                b = this.alignByTranslate;
                var e = this.element,
                  g = this.width,
                  r = this.height,
                  c = this.imgwidth,
                  t = this.imgheight,
                  a = this["img" + d];
                if (k(a)) {
                  var z = 1;
                  f && "within" === f.backgroundSize && g && r
                    ? ((z = Math.min(g / c, r / t)),
                      (a = Math.round(a * z)),
                      y(e, {
                        width: Math.round(c * z),
                        height: Math.round(t * z),
                      }))
                    : e && e.setAttribute(d, a);
                  b ||
                    this.translate(
                      ((g || 0) - a * z) / 2,
                      ((r || 0) - a * z) / 2
                    );
                }
              };
            });
            k(d) && S.attr({ x: d, y: g });
            S.isImg = !0;
            k(S.imgwidth) && k(S.imgheight)
              ? D(S)
              : (S.attr({ width: 0, height: 0 }),
                t("img", {
                  onload: function () {
                    var b = n[a.chartIndex];
                    0 === this.width &&
                      (w(this, { position: "absolute", top: "-999em" }),
                      h.body.appendChild(this));
                    G[p] = { width: this.width, height: this.height };
                    S.imgwidth = this.width;
                    S.imgheight = this.height;
                    S.element && D(S);
                    this.parentNode && this.parentNode.removeChild(this);
                    a.imgCount--;
                    if (!a.imgCount && b && !b.hasLoaded) b.onload();
                  },
                  src: p,
                }),
                this.imgCount++);
          }
          return I;
        };
        f.prototype.clipRect = function (b, d, e, g) {
          var r = O() + "-",
            k = this.createElement("clipPath").attr({ id: r }).add(this.defs);
          b = this.rect(b, d, e, g, 0).add(k);
          b.id = r;
          b.clipPath = k;
          b.count = 0;
          return b;
        };
        f.prototype.text = function (b, d, e, g) {
          var r = {};
          if (g && (this.allowHTML || !this.forExport))
            return this.html(b, d, e);
          r.x = Math.round(d || 0);
          e && (r.y = Math.round(e));
          k(b) && (r.text = b);
          b = this.createElement("text").attr(r);
          if (!g || (this.forExport && !this.allowHTML))
            b.xSetter = function (b, d, e) {
              for (
                var g = e.getElementsByTagName("tspan"),
                  r = e.getAttribute(d),
                  k = 0,
                  c;
                k < g.length;
                k++
              )
                (c = g[k]), c.getAttribute(d) === r && c.setAttribute(d, b);
              e.setAttribute(d, b);
            };
          return b;
        };
        f.prototype.fontMetrics = function (b, d) {
          b =
            (!this.styledMode && /px/.test(b)) || !H.getComputedStyle
              ? b ||
                (d && d.style && d.style.fontSize) ||
                (this.style && this.style.fontSize)
              : d && B.prototype.getStyle.call(d, "font-size");
          b = /px/.test(b) ? P(b) : 12;
          d = 24 > b ? b + 3 : Math.round(1.2 * b);
          return { h: d, b: Math.round(0.8 * d), f: b };
        };
        f.prototype.rotCorr = function (b, d, e) {
          var g = b;
          d && e && (g = Math.max(g * Math.cos(d * c), 4));
          return { x: (-b / 3) * Math.sin(d * c), y: g };
        };
        f.prototype.pathToSegments = function (b) {
          for (
            var e = [],
              g = [],
              r = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 },
              k = 0;
            k < b.length;
            k++
          )
            z(g[0]) &&
              d(b[k]) &&
              g.length === r[g[0].toUpperCase()] &&
              b.splice(k, 0, g[0].replace("M", "L").replace("m", "l")),
              "string" === typeof b[k] &&
                (g.length && e.push(g.slice(0)), (g.length = 0)),
              g.push(b[k]);
          e.push(g.slice(0));
          return e;
        };
        f.prototype.label = function (b, d, e, g, r, k, c, t, f) {
          return new C(this, b, d, e, g, r, k, c, t, f);
        };
        f.prototype.alignElements = function () {
          this.alignedObjects.forEach(function (b) {
            return b.align();
          });
        };
        return f;
      })();
      e(A.prototype, {
        Element: B,
        SVG_NS: D,
        escapes: {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        },
        symbols: F,
        draw: f,
      });
      E.registerRendererType("svg", A, !0);
      ("");
      return A;
    }
  );
  J(
    a,
    "Core/Renderer/HTML/HTMLElement.js",
    [
      a["Core/Globals.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      var v =
          (this && this.__extends) ||
          (function () {
            var c = function (a, f) {
              c =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (c, f) {
                    c.__proto__ = f;
                  }) ||
                function (c, f) {
                  for (var a in f) f.hasOwnProperty(a) && (c[a] = f[a]);
                };
              return c(a, f);
            };
            return function (a, f) {
              function l() {
                this.constructor = a;
              }
              c(a, f);
              a.prototype =
                null === f
                  ? Object.create(f)
                  : ((l.prototype = f.prototype), new l());
            };
          })(),
        B = a.isFirefox,
        C = a.isMS,
        F = a.isWebKit,
        x = a.win,
        u = A.css,
        n = A.defined,
        c = A.extend,
        h = A.pick,
        m = A.pInt;
      return (function (a) {
        function l() {
          return (null !== a && a.apply(this, arguments)) || this;
        }
        v(l, a);
        l.compose = function (c) {
          if (-1 === l.composedClasses.indexOf(c)) {
            l.composedClasses.push(c);
            var a = l.prototype,
              f = c.prototype;
            f.getSpanCorrection = a.getSpanCorrection;
            f.htmlCss = a.htmlCss;
            f.htmlGetBBox = a.htmlGetBBox;
            f.htmlUpdateTransform = a.htmlUpdateTransform;
            f.setSpanRotation = a.setSpanRotation;
          }
          return c;
        };
        l.prototype.getSpanCorrection = function (c, a, l) {
          this.xCorr = -c * l;
          this.yCorr = -a;
        };
        l.prototype.htmlCss = function (a) {
          var f = "SPAN" === this.element.tagName && a && "width" in a,
            l = h(f && a.width, void 0);
          if (f) {
            delete a.width;
            this.textWidth = l;
            var m = !0;
          }
          a &&
            "ellipsis" === a.textOverflow &&
            ((a.whiteSpace = "nowrap"), (a.overflow = "hidden"));
          this.styles = c(this.styles, a);
          u(this.element, a);
          m && this.htmlUpdateTransform();
          return this;
        };
        l.prototype.htmlGetBBox = function () {
          var c = this.element;
          return {
            x: c.offsetLeft,
            y: c.offsetTop,
            width: c.offsetWidth,
            height: c.offsetHeight,
          };
        };
        l.prototype.htmlUpdateTransform = function () {
          if (this.added) {
            var c = this.renderer,
              a = this.element,
              l = this.translateX || 0,
              h = this.translateY || 0,
              p = this.x || 0,
              y = this.y || 0,
              t = this.textAlign || "left",
              w = { left: 0, center: 0.5, right: 1 }[t],
              k = this.styles;
            k = k && k.whiteSpace;
            u(a, { marginLeft: l, marginTop: h });
            !c.styledMode &&
              this.shadows &&
              this.shadows.forEach(function (b) {
                u(b, { marginLeft: l + 1, marginTop: h + 1 });
              });
            this.inverted &&
              [].forEach.call(a.childNodes, function (b) {
                c.invertChild(b, a);
              });
            if ("SPAN" === a.tagName) {
              var g = this.rotation,
                e = this.textWidth && m(this.textWidth),
                b = [g, t, a.innerHTML, this.textWidth, this.textAlign].join(),
                d = void 0;
              d = !1;
              if (e !== this.oldTextWidth) {
                if (this.textPxLength) var r = this.textPxLength;
                else
                  u(a, { width: "", whiteSpace: k || "nowrap" }),
                    (r = a.offsetWidth);
                (e > this.oldTextWidth || r > e) &&
                  (/[ \-]/.test(a.textContent || a.innerText) ||
                    "ellipsis" === a.style.textOverflow) &&
                  (u(a, {
                    width: r > e || g ? e + "px" : "auto",
                    display: "block",
                    whiteSpace: k || "normal",
                  }),
                  (this.oldTextWidth = e),
                  (d = !0));
              }
              this.hasBoxWidthChanged = d;
              b !== this.cTT &&
                ((d = c.fontMetrics(a.style.fontSize, a).b),
                !n(g) ||
                  (g === (this.oldRotation || 0) && t === this.oldAlign) ||
                  this.setSpanRotation(g, w, d),
                this.getSpanCorrection(
                  (!n(g) && this.textPxLength) || a.offsetWidth,
                  d,
                  w,
                  g,
                  t
                ));
              u(a, {
                left: p + (this.xCorr || 0) + "px",
                top: y + (this.yCorr || 0) + "px",
              });
              this.cTT = b;
              this.oldRotation = g;
              this.oldAlign = t;
            }
          } else this.alignOnAdd = !0;
        };
        l.prototype.setSpanRotation = function (c, a, l) {
          var f = {},
            m =
              C && !/Edge/.test(x.navigator.userAgent)
                ? "-ms-transform"
                : F
                ? "-webkit-transform"
                : B
                ? "MozTransform"
                : x.opera
                ? "-o-transform"
                : void 0;
          m &&
            ((f[m] = f.transform = "rotate(" + c + "deg)"),
            (f[m + (B ? "Origin" : "-origin")] = f.transformOrigin =
              100 * a + "% " + l + "px"),
            u(this.element, f));
        };
        l.composedClasses = [];
        return l;
      })(q);
    }
  );
  J(
    a,
    "Core/Renderer/HTML/HTMLRenderer.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (c, h) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (c, a) {
                    c.__proto__ = a;
                  }) ||
                function (c, a) {
                  for (var l in a) a.hasOwnProperty(l) && (c[l] = a[l]);
                };
              return a(c, h);
            };
            return function (c, h) {
              function m() {
                this.constructor = c;
              }
              a(c, h);
              c.prototype =
                null === h
                  ? Object.create(h)
                  : ((m.prototype = h.prototype), new m());
            };
          })(),
        C = E.attr,
        F = E.createElement,
        x = E.extend,
        u = E.pick;
      return (function (n) {
        function c() {
          return (null !== n && n.apply(this, arguments)) || this;
        }
        v(c, n);
        c.compose = function (a) {
          -1 === c.composedClasses.indexOf(a) &&
            (c.composedClasses.push(a), (a.prototype.html = c.prototype.html));
          return a;
        };
        c.prototype.html = function (c, m, l) {
          var h = this.createElement("span"),
            f = h.element,
            n = h.renderer,
            G = n.isSVG,
            v = function (c, a) {
              ["opacity", "visibility"].forEach(function (t) {
                c[t + "Setter"] = function (f, k, g) {
                  var e = c.div ? c.div.style : a;
                  q.prototype[t + "Setter"].call(this, f, k, g);
                  e && (e[k] = f);
                };
              });
              c.addedSetters = !0;
            };
          h.textSetter = function (c) {
            c !== this.textStr &&
              (delete this.bBox,
              delete this.oldTextWidth,
              a.setElementHTML(this.element, u(c, "")),
              (this.textStr = c),
              (h.doTransform = !0));
          };
          G && v(h, h.element.style);
          h.xSetter =
            h.ySetter =
            h.alignSetter =
            h.rotationSetter =
              function (c, a) {
                "align" === a ? (h.alignValue = h.textAlign = c) : (h[a] = c);
                h.doTransform = !0;
              };
          h.afterSetters = function () {
            this.doTransform &&
              (this.htmlUpdateTransform(), (this.doTransform = !1));
          };
          h.attr({ text: c, x: Math.round(m), y: Math.round(l) }).css({
            position: "absolute",
          });
          n.styledMode ||
            h.css({
              fontFamily: this.style.fontFamily,
              fontSize: this.style.fontSize,
            });
          f.style.whiteSpace = "nowrap";
          h.css = h.htmlCss;
          G &&
            (h.add = function (c) {
              var a = n.box.parentNode,
                t = [];
              if ((this.parentGroup = c)) {
                var w = c.div;
                if (!w) {
                  for (; c; ) t.push(c), (c = c.parentGroup);
                  t.reverse().forEach(function (k) {
                    function g(b, e) {
                      k[e] = b;
                      "translateX" === e
                        ? (d.left = b + "px")
                        : (d.top = b + "px");
                      k.doTransform = !0;
                    }
                    var e = C(k.element, "class"),
                      b = k.styles || {};
                    w = k.div =
                      k.div ||
                      F(
                        "div",
                        e ? { className: e } : void 0,
                        {
                          position: "absolute",
                          left: (k.translateX || 0) + "px",
                          top: (k.translateY || 0) + "px",
                          display: k.display,
                          opacity: k.opacity,
                          cursor: b.cursor,
                          pointerEvents: b.pointerEvents,
                          visibility: k.visibility,
                        },
                        w || a
                      );
                    var d = w.style;
                    x(k, {
                      classSetter: (function (b) {
                        return function (d) {
                          this.element.setAttribute("class", d);
                          b.className = d;
                        };
                      })(w),
                      on: function () {
                        t[0].div &&
                          h.on.apply(
                            { element: t[0].div, onEvents: k.onEvents },
                            arguments
                          );
                        return k;
                      },
                      translateXSetter: g,
                      translateYSetter: g,
                    });
                    k.addedSetters || v(k);
                  });
                }
              } else w = a;
              w.appendChild(f);
              h.added = !0;
              h.alignOnAdd && h.htmlUpdateTransform();
              return h;
            });
          return h;
        };
        c.composedClasses = [];
        return c;
      })(A);
    }
  );
  J(a, "Core/Axis/AxisDefaults.js", [], function () {
    var a;
    (function (a) {
      a.defaultXAxisOptions = {
        alignTicks: !0,
        allowDecimals: void 0,
        panningEnabled: !0,
        zIndex: 2,
        zoomEnabled: !0,
        dateTimeLabelFormats: {
          millisecond: { main: "%H:%M:%S.%L", range: !1 },
          second: { main: "%H:%M:%S", range: !1 },
          minute: { main: "%H:%M", range: !1 },
          hour: { main: "%H:%M", range: !1 },
          day: { main: "%e. %b" },
          week: { main: "%e. %b" },
          month: { main: "%b '%y" },
          year: { main: "%Y" },
        },
        endOnTick: !1,
        gridLineDashStyle: "Solid",
        gridZIndex: 1,
        labels: {
          autoRotation: void 0,
          autoRotationLimit: 80,
          distance: void 0,
          enabled: !0,
          indentation: 10,
          overflow: "justify",
          padding: 5,
          reserveSpace: void 0,
          rotation: void 0,
          staggerLines: 0,
          step: 0,
          useHTML: !1,
          x: 0,
          zIndex: 7,
          style: { color: "#666666", cursor: "default", fontSize: "11px" },
        },
        maxPadding: 0.01,
        minorGridLineDashStyle: "Solid",
        minorTickLength: 2,
        minorTickPosition: "outside",
        minPadding: 0.01,
        offset: void 0,
        opposite: !1,
        reversed: void 0,
        reversedStacks: !1,
        showEmpty: !0,
        showFirstLabel: !0,
        showLastLabel: !0,
        startOfWeek: 1,
        startOnTick: !1,
        tickLength: 10,
        tickPixelInterval: 100,
        tickmarkPlacement: "between",
        tickPosition: "outside",
        title: {
          align: "middle",
          rotation: 0,
          useHTML: !1,
          x: 0,
          y: 0,
          style: { color: "#666666" },
        },
        type: "linear",
        uniqueNames: !0,
        visible: !0,
        minorGridLineColor: "#f2f2f2",
        minorGridLineWidth: 1,
        minorTickColor: "#999999",
        lineColor: "#ccd6eb",
        lineWidth: 1,
        gridLineColor: "#e6e6e6",
        gridLineWidth: void 0,
        tickColor: "#ccd6eb",
      };
      a.defaultYAxisOptions = {
        reversedStacks: !0,
        endOnTick: !0,
        maxPadding: 0.05,
        minPadding: 0.05,
        tickPixelInterval: 72,
        showLastLabel: !0,
        labels: { x: -8 },
        startOnTick: !0,
        title: { rotation: 270, text: "Values" },
        stackLabels: {
          animation: {},
          allowOverlap: !1,
          enabled: !1,
          crop: !0,
          overflow: "justify",
          formatter: function () {
            var a = this.axis.chart.numberFormatter;
            return a(this.total || 0, -1);
          },
          style: {
            color: "#000000",
            fontSize: "11px",
            fontWeight: "bold",
            textOutline: "1px contrast",
          },
        },
        gridLineWidth: 1,
        lineWidth: 0,
      };
      a.defaultLeftAxisOptions = {
        labels: { x: -15 },
        title: { rotation: 270 },
      };
      a.defaultRightAxisOptions = {
        labels: { x: 15 },
        title: { rotation: 90 },
      };
      a.defaultBottomAxisOptions = {
        labels: { autoRotation: [-45], x: 0 },
        margin: 15,
        title: { rotation: 0 },
      };
      a.defaultTopAxisOptions = {
        labels: { autoRotation: [-45], x: 0 },
        margin: 15,
        title: { rotation: 0 },
      };
    })(a || (a = {}));
    return a;
  });
  J(a, "Core/Foundation.js", [a["Core/Utilities.js"]], function (a) {
    var v = a.addEvent,
      A = a.isFunction,
      E = a.objectEach,
      B = a.removeEvent,
      C;
    (function (a) {
      a.registerEventOptions = function (a, u) {
        a.eventOptions = a.eventOptions || {};
        E(u.events, function (n, c) {
          a.eventOptions[c] !== n &&
            (a.eventOptions[c] &&
              (B(a, c, a.eventOptions[c]), delete a.eventOptions[c]),
            A(n) && ((a.eventOptions[c] = n), v(a, c, n)));
        });
      };
    })(C || (C = {}));
    return C;
  });
  J(
    a,
    "Core/Axis/Tick.js",
    [
      a["Core/FormatUtilities.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      var v = q.deg2rad,
        B = A.clamp,
        C = A.correctFloat,
        F = A.defined,
        x = A.destroyObjectProperties,
        u = A.extend,
        n = A.fireEvent,
        c = A.isNumber,
        h = A.merge,
        m = A.objectEach,
        l = A.pick;
      q = (function () {
        function p(a, c, l, h, m) {
          this.isNewLabel = this.isNew = !0;
          this.axis = a;
          this.pos = c;
          this.type = l || "";
          this.parameters = m || {};
          this.tickmarkOffset = this.parameters.tickmarkOffset;
          this.options = this.parameters.options;
          n(this, "init");
          l || h || this.addLabel();
        }
        p.prototype.addLabel = function () {
          var f = this,
            h = f.axis,
            m = h.options,
            p = h.chart,
            v = h.categories,
            y = h.logarithmic,
            t = h.names,
            w = f.pos,
            k = l(f.options && f.options.labels, m.labels),
            g = h.tickPositions,
            e = w === g[0],
            b = w === g[g.length - 1],
            d = (!k.step || 1 === k.step) && 1 === h.tickInterval;
          g = g.info;
          var r = f.label,
            z;
          v = this.parameters.category || (v ? l(v[w], t[w], w) : w);
          y && c(v) && (v = C(y.lin2log(v)));
          if (h.dateTime)
            if (g) {
              var I = p.time.resolveDTLFormat(
                m.dateTimeLabelFormats[
                  (!m.grid && g.higherRanks[w]) || g.unitName
                ]
              );
              var N = I.main;
            } else
              c(v) &&
                (N = h.dateTime.getXDateFormat(
                  v,
                  m.dateTimeLabelFormats || {}
                ));
          f.isFirst = e;
          f.isLast = b;
          var P = {
            axis: h,
            chart: p,
            dateTimeLabelFormat: N,
            isFirst: e,
            isLast: b,
            pos: w,
            tick: f,
            tickPositionInfo: g,
            value: v,
          };
          n(this, "labelFormat", P);
          var O = function (b) {
            return k.formatter
              ? k.formatter.call(b, b)
              : k.format
              ? ((b.text = h.defaultLabelFormatter.call(b, b)),
                a.format(k.format, b, p))
              : h.defaultLabelFormatter.call(b, b);
          };
          m = O.call(P, P);
          var U = I && I.list;
          f.shortenLabel = U
            ? function () {
                for (z = 0; z < U.length; z++)
                  if (
                    (u(P, { dateTimeLabelFormat: U[z] }),
                    r.attr({ text: O.call(P, P) }),
                    r.getBBox().width < h.getSlotWidth(f) - 2 * k.padding)
                  )
                    return;
                r.attr({ text: "" });
              }
            : void 0;
          d && h._addedPlotLB && f.moveLabel(m, k);
          F(r) || f.movedLabel
            ? r &&
              r.textStr !== m &&
              !d &&
              (!r.textWidth ||
                k.style.width ||
                r.styles.width ||
                r.css({ width: null }),
              r.attr({ text: m }),
              (r.textPxLength = r.getBBox().width))
            : ((f.label = r = f.createLabel({ x: 0, y: 0 }, m, k)),
              (f.rotation = 0));
        };
        p.prototype.createLabel = function (a, c, l) {
          var f = this.axis,
            m = f.chart;
          if (
            (a =
              F(c) && l.enabled
                ? m.renderer.text(c, a.x, a.y, l.useHTML).add(f.labelGroup)
                : null)
          )
            m.styledMode || a.css(h(l.style)),
              (a.textPxLength = a.getBBox().width);
          return a;
        };
        p.prototype.destroy = function () {
          x(this, this.axis);
        };
        p.prototype.getPosition = function (a, c, l, h) {
          var f = this.axis,
            m = f.chart,
            t = (h && m.oldChartHeight) || m.chartHeight;
          a = {
            x: a
              ? C(f.translate(c + l, void 0, void 0, h) + f.transB)
              : f.left +
                f.offset +
                (f.opposite
                  ? ((h && m.oldChartWidth) || m.chartWidth) - f.right - f.left
                  : 0),
            y: a
              ? t - f.bottom + f.offset - (f.opposite ? f.height : 0)
              : C(t - f.translate(c + l, void 0, void 0, h) - f.transB),
          };
          a.y = B(a.y, -1e5, 1e5);
          n(this, "afterGetPosition", { pos: a });
          return a;
        };
        p.prototype.getLabelPosition = function (a, c, l, h, m, p, t, w) {
          var k = this.axis,
            g = k.transA,
            e =
              k.isLinked && k.linkedParent
                ? k.linkedParent.reversed
                : k.reversed,
            b = k.staggerLines,
            d = k.tickRotCorr || { x: 0, y: 0 },
            r =
              h || k.reserveSpaceDefault
                ? 0
                : -k.labelOffset * ("center" === k.labelAlign ? 0.5 : 1),
            f = {};
          l =
            0 === k.side
              ? l.rotation
                ? -8
                : -l.getBBox().height
              : 2 === k.side
              ? d.y + 8
              : Math.cos(l.rotation * v) * (d.y - l.getBBox(!1, 0).height / 2);
          F(m.y) && (l = 0 === k.side && k.horiz ? m.y + l : m.y);
          a = a + m.x + r + d.x - (p && h ? p * g * (e ? -1 : 1) : 0);
          c = c + l - (p && !h ? p * g * (e ? 1 : -1) : 0);
          b &&
            ((h = (t / (w || 1)) % b),
            k.opposite && (h = b - h - 1),
            (c += (k.labelOffset / b) * h));
          f.x = a;
          f.y = Math.round(c);
          n(this, "afterGetLabelPosition", {
            pos: f,
            tickmarkOffset: p,
            index: t,
          });
          return f;
        };
        p.prototype.getLabelSize = function () {
          return this.label
            ? this.label.getBBox()[this.axis.horiz ? "height" : "width"]
            : 0;
        };
        p.prototype.getMarkPath = function (a, c, l, h, m, p) {
          return p.crispLine(
            [
              ["M", a, c],
              ["L", a + (m ? 0 : -l), c + (m ? l : 0)],
            ],
            h
          );
        };
        p.prototype.handleOverflow = function (a) {
          var c = this.axis,
            f = c.options.labels,
            h = a.x,
            m = c.chart.chartWidth,
            p = c.chart.spacing,
            t = l(c.labelLeft, Math.min(c.pos, p[3]));
          p = l(
            c.labelRight,
            Math.max(c.isRadial ? 0 : c.pos + c.len, m - p[1])
          );
          var w = this.label,
            k = this.rotation,
            g = { left: 0, center: 0.5, right: 1 }[
              c.labelAlign || w.attr("align")
            ],
            e = w.getBBox().width,
            b = c.getSlotWidth(this),
            d = {},
            r = b,
            z = 1,
            I;
          if (k || "justify" !== f.overflow)
            0 > k && h - g * e < t
              ? (I = Math.round(h / Math.cos(k * v) - t))
              : 0 < k &&
                h + g * e > p &&
                (I = Math.round((m - h) / Math.cos(k * v)));
          else if (
            ((m = h + (1 - g) * e),
            h - g * e < t
              ? (r = a.x + r * (1 - g) - t)
              : m > p && ((r = p - a.x + r * g), (z = -1)),
            (r = Math.min(b, r)),
            r < b &&
              "center" === c.labelAlign &&
              (a.x += z * (b - r - g * (b - Math.min(e, r)))),
            e > r || (c.autoRotation && (w.styles || {}).width))
          )
            I = r;
          I &&
            (this.shortenLabel
              ? this.shortenLabel()
              : ((d.width = Math.floor(I) + "px"),
                (f.style || {}).textOverflow || (d.textOverflow = "ellipsis"),
                w.css(d)));
        };
        p.prototype.moveLabel = function (a, c) {
          var f = this,
            l = f.label,
            h = f.axis,
            p = h.reversed,
            t = !1;
          l && l.textStr === a
            ? ((f.movedLabel = l), (t = !0), delete f.label)
            : m(h.ticks, function (c) {
                t ||
                  c.isNew ||
                  c === f ||
                  !c.label ||
                  c.label.textStr !== a ||
                  ((f.movedLabel = c.label),
                  (t = !0),
                  (c.labelPos = f.movedLabel.xy),
                  delete c.label);
              });
          if (!t && (f.labelPos || l)) {
            var w = f.labelPos || l.xy;
            l = h.horiz ? (p ? 0 : h.width + h.left) : w.x;
            h = h.horiz ? w.y : p ? h.width + h.left : 0;
            f.movedLabel = f.createLabel({ x: l, y: h }, a, c);
            f.movedLabel && f.movedLabel.attr({ opacity: 0 });
          }
        };
        p.prototype.render = function (c, a, h) {
          var f = this.axis,
            m = f.horiz,
            p = this.pos,
            t = l(this.tickmarkOffset, f.tickmarkOffset);
          p = this.getPosition(m, p, t, a);
          t = p.x;
          var w = p.y;
          f = (m && t === f.pos + f.len) || (!m && w === f.pos) ? -1 : 1;
          m = l(h, this.label && this.label.newOpacity, 1);
          h = l(h, 1);
          this.isActive = !0;
          this.renderGridLine(a, h, f);
          this.renderMark(p, h, f);
          this.renderLabel(p, a, m, c);
          this.isNew = !1;
          n(this, "afterRender");
        };
        p.prototype.renderGridLine = function (c, a, h) {
          var f = this.axis,
            m = f.options,
            p = {},
            t = this.pos,
            w = this.type,
            k = l(this.tickmarkOffset, f.tickmarkOffset),
            g = f.chart.renderer,
            e = this.gridLine,
            b = m.gridLineWidth,
            d = m.gridLineColor,
            r = m.gridLineDashStyle;
          "minor" === this.type &&
            ((b = m.minorGridLineWidth),
            (d = m.minorGridLineColor),
            (r = m.minorGridLineDashStyle));
          e ||
            (f.chart.styledMode ||
              ((p.stroke = d), (p["stroke-width"] = b || 0), (p.dashstyle = r)),
            w || (p.zIndex = 1),
            c && (a = 0),
            (this.gridLine = e =
              g
                .path()
                .attr(p)
                .addClass("highcharts-" + (w ? w + "-" : "") + "grid-line")
                .add(f.gridGroup)));
          if (
            e &&
            (h = f.getPlotLinePath({
              value: t + k,
              lineWidth: e.strokeWidth() * h,
              force: "pass",
              old: c,
              acrossPanes: !1,
            }))
          )
            e[c || this.isNew ? "attr" : "animate"]({ d: h, opacity: a });
        };
        p.prototype.renderMark = function (c, a, h) {
          var f = this.axis,
            m = f.options,
            p = f.chart.renderer,
            t = this.type,
            w = f.tickSize(t ? t + "Tick" : "tick"),
            k = c.x;
          c = c.y;
          var g = l(
            m["minor" !== t ? "tickWidth" : "minorTickWidth"],
            !t && f.isXAxis ? 1 : 0
          );
          m = m["minor" !== t ? "tickColor" : "minorTickColor"];
          var e = this.mark,
            b = !e;
          w &&
            (f.opposite && (w[0] = -w[0]),
            e ||
              ((this.mark = e =
                p
                  .path()
                  .addClass("highcharts-" + (t ? t + "-" : "") + "tick")
                  .add(f.axisGroup)),
              f.chart.styledMode || e.attr({ stroke: m, "stroke-width": g })),
            e[b ? "attr" : "animate"]({
              d: this.getMarkPath(k, c, w[0], e.strokeWidth() * h, f.horiz, p),
              opacity: a,
            }));
        };
        p.prototype.renderLabel = function (a, h, m, p) {
          var f = this.axis,
            y = f.horiz,
            t = f.options,
            w = this.label,
            k = t.labels,
            g = k.step;
          f = l(this.tickmarkOffset, f.tickmarkOffset);
          var e = a.x;
          a = a.y;
          var b = !0;
          w &&
            c(e) &&
            ((w.xy = a = this.getLabelPosition(e, a, w, y, k, f, p, g)),
            (this.isFirst && !this.isLast && !t.showFirstLabel) ||
            (this.isLast && !this.isFirst && !t.showLastLabel)
              ? (b = !1)
              : !y ||
                k.step ||
                k.rotation ||
                h ||
                0 === m ||
                this.handleOverflow(a),
            g && p % g && (b = !1),
            b && c(a.y)
              ? ((a.opacity = m),
                w[this.isNewLabel ? "attr" : "animate"](a).show(!0),
                (this.isNewLabel = !1))
              : (w.hide(), (this.isNewLabel = !0)));
        };
        p.prototype.replaceMovedLabel = function () {
          var a = this.label,
            c = this.axis,
            h = c.reversed;
          if (a && !this.isNew) {
            var l = c.horiz ? (h ? c.left : c.width + c.left) : a.xy.x;
            h = c.horiz ? a.xy.y : h ? c.width + c.top : c.top;
            a.animate({ x: l, y: h, opacity: 0 }, void 0, a.destroy);
            delete this.label;
          }
          c.isDirty = !0;
          this.label = this.movedLabel;
          delete this.movedLabel;
        };
        return p;
      })();
      ("");
      return q;
    }
  );
  J(
    a,
    "Core/Axis/Axis.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/AxisDefaults.js"],
      a["Core/Color/Color.js"],
      a["Core/Defaults.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Axis/Tick.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C, F, x) {
      var u = a.animObject,
        n = E.defaultOptions,
        c = B.registerEventOptions,
        h = C.deg2rad,
        m = x.arrayMax,
        l = x.arrayMin,
        p = x.clamp,
        f = x.correctFloat,
        D = x.defined,
        v = x.destroyObjectProperties,
        H = x.erase,
        K = x.error,
        y = x.extend,
        t = x.fireEvent,
        w = x.isArray,
        k = x.isNumber,
        g = x.isString,
        e = x.merge,
        b = x.normalizeTickInterval,
        d = x.objectEach,
        r = x.pick,
        z = x.relativeLength,
        I = x.removeEvent,
        N = x.splat,
        P = x.syncTimeout,
        O = function (d, e) {
          return b(
            e,
            void 0,
            void 0,
            r(d.options.allowDecimals, 0.5 > e || void 0 !== d.tickAmount),
            !!d.tickAmount
          );
        };
      a = (function () {
        function b(b, d) {
          this.zoomEnabled =
            this.width =
            this.visible =
            this.userOptions =
            this.translationSlope =
            this.transB =
            this.transA =
            this.top =
            this.ticks =
            this.tickRotCorr =
            this.tickPositions =
            this.tickmarkOffset =
            this.tickInterval =
            this.tickAmount =
            this.side =
            this.series =
            this.right =
            this.positiveValuesOnly =
            this.pos =
            this.pointRangePadding =
            this.pointRange =
            this.plotLinesAndBandsGroups =
            this.plotLinesAndBands =
            this.paddedTicks =
            this.overlap =
            this.options =
            this.offset =
            this.names =
            this.minPixelPadding =
            this.minorTicks =
            this.minorTickInterval =
            this.min =
            this.maxLabelLength =
            this.max =
            this.len =
            this.left =
            this.labelFormatter =
            this.labelEdge =
            this.isLinked =
            this.height =
            this.hasVisibleSeries =
            this.hasNames =
            this.eventOptions =
            this.coll =
            this.closestPointRange =
            this.chart =
            this.bottom =
            this.alternateBands =
              void 0;
          this.init(b, d);
        }
        b.prototype.init = function (b, d) {
          var e = d.isX;
          this.chart = b;
          this.horiz = b.inverted && !this.isZAxis ? !e : e;
          this.isXAxis = e;
          this.coll = this.coll || (e ? "xAxis" : "yAxis");
          t(this, "init", { userOptions: d });
          this.opposite = r(d.opposite, this.opposite);
          this.side = r(
            d.side,
            this.side,
            this.horiz ? (this.opposite ? 0 : 2) : this.opposite ? 1 : 3
          );
          this.setOptions(d);
          var g = this.options,
            a = g.labels,
            f = g.type;
          this.userOptions = d;
          this.minPixelPadding = 0;
          this.reversed = r(g.reversed, this.reversed);
          this.visible = g.visible;
          this.zoomEnabled = g.zoomEnabled;
          this.hasNames = "category" === f || !0 === g.categories;
          this.categories = g.categories || (this.hasNames ? [] : void 0);
          this.names || ((this.names = []), (this.names.keys = {}));
          this.plotLinesAndBandsGroups = {};
          this.positiveValuesOnly = !!this.logarithmic;
          this.isLinked = D(g.linkedTo);
          this.ticks = {};
          this.labelEdge = [];
          this.minorTicks = {};
          this.plotLinesAndBands = [];
          this.alternateBands = {};
          this.len = 0;
          this.minRange = this.userMinRange = g.minRange || g.maxZoom;
          this.range = g.range;
          this.offset = g.offset || 0;
          this.min = this.max = null;
          d = r(g.crosshair, N(b.options.tooltip.crosshairs)[e ? 0 : 1]);
          this.crosshair = !0 === d ? {} : d;
          -1 === b.axes.indexOf(this) &&
            (e ? b.axes.splice(b.xAxis.length, 0, this) : b.axes.push(this),
            b[this.coll].push(this));
          this.series = this.series || [];
          b.inverted &&
            !this.isZAxis &&
            e &&
            "undefined" === typeof this.reversed &&
            (this.reversed = !0);
          this.labelRotation = k(a.rotation) ? a.rotation : void 0;
          c(this, g);
          t(this, "afterInit");
        };
        b.prototype.setOptions = function (b) {
          this.options = e(
            q.defaultXAxisOptions,
            "yAxis" === this.coll && q.defaultYAxisOptions,
            [
              q.defaultTopAxisOptions,
              q.defaultRightAxisOptions,
              q.defaultBottomAxisOptions,
              q.defaultLeftAxisOptions,
            ][this.side],
            e(n[this.coll], b)
          );
          t(this, "afterSetOptions", { userOptions: b });
        };
        b.prototype.defaultLabelFormatter = function (b) {
          var d = this.axis;
          b = this.chart.numberFormatter;
          var e = k(this.value) ? this.value : NaN,
            g = d.chart.time,
            r = this.dateTimeLabelFormat,
            a = n.lang,
            c = a.numericSymbols;
          a = a.numericSymbolMagnitude || 1e3;
          var f = d.logarithmic ? Math.abs(e) : d.tickInterval,
            t = c && c.length;
          if (d.categories) var z = "".concat(this.value);
          else if (r) z = g.dateFormat(r, e);
          else if (t && 1e3 <= f)
            for (; t-- && "undefined" === typeof z; )
              (d = Math.pow(a, t + 1)),
                f >= d &&
                  0 === (10 * e) % d &&
                  null !== c[t] &&
                  0 !== e &&
                  (z = b(e / d, -1) + c[t]);
          "undefined" === typeof z &&
            (z = 1e4 <= Math.abs(e) ? b(e, -1) : b(e, -1, void 0, ""));
          return z;
        };
        b.prototype.getSeriesExtremes = function () {
          var b = this,
            d = b.chart,
            e;
          t(this, "getSeriesExtremes", null, function () {
            b.hasVisibleSeries = !1;
            b.dataMin = b.dataMax = b.threshold = null;
            b.softThreshold = !b.isXAxis;
            b.series.forEach(function (g) {
              if (g.visible || !d.options.chart.ignoreHiddenSeries) {
                var a = g.options,
                  c = a.threshold;
                b.hasVisibleSeries = !0;
                b.positiveValuesOnly && 0 >= c && (c = null);
                if (b.isXAxis) {
                  if (((a = g.xData), a.length)) {
                    a = b.logarithmic ? a.filter(b.validatePositiveValue) : a;
                    e = g.getXExtremes(a);
                    var f = e.min;
                    var t = e.max;
                    k(f) ||
                      f instanceof Date ||
                      ((a = a.filter(k)),
                      (e = g.getXExtremes(a)),
                      (f = e.min),
                      (t = e.max));
                    a.length &&
                      ((b.dataMin = Math.min(r(b.dataMin, f), f)),
                      (b.dataMax = Math.max(r(b.dataMax, t), t)));
                  }
                } else if (
                  ((g = g.applyExtremes()),
                  k(g.dataMin) &&
                    ((f = g.dataMin),
                    (b.dataMin = Math.min(r(b.dataMin, f), f))),
                  k(g.dataMax) &&
                    ((t = g.dataMax),
                    (b.dataMax = Math.max(r(b.dataMax, t), t))),
                  D(c) && (b.threshold = c),
                  !a.softThreshold || b.positiveValuesOnly)
                )
                  b.softThreshold = !1;
              }
            });
          });
          t(this, "afterGetSeriesExtremes");
        };
        b.prototype.translate = function (b, d, e, g, r, a) {
          var c = this.linkedParent || this,
            t = g && c.old ? c.old.min : c.min;
          if (!k(t)) return NaN;
          var z = c.minPixelPadding;
          r =
            (c.isOrdinal ||
              (c.brokenAxis && c.brokenAxis.hasBreaks) ||
              (c.logarithmic && r)) &&
            c.lin2val;
          var h = 1,
            l = 0;
          g = g && c.old ? c.old.transA : c.transA;
          g || (g = c.transA);
          e && ((h *= -1), (l = c.len));
          c.reversed && ((h *= -1), (l -= h * (c.sector || c.len)));
          d
            ? ((a = (b * h + l - z) / g + t), r && (a = c.lin2val(a)))
            : (r && (b = c.val2lin(b)),
              (b = h * (b - t) * g),
              (a = (c.isRadial ? b : f(b)) + l + h * z + (k(a) ? g * a : 0)));
          return a;
        };
        b.prototype.toPixels = function (b, d) {
          return (
            this.translate(b, !1, !this.horiz, void 0, !0) + (d ? 0 : this.pos)
          );
        };
        b.prototype.toValue = function (b, d) {
          return this.translate(
            b - (d ? 0 : this.pos),
            !0,
            !this.horiz,
            void 0,
            !0
          );
        };
        b.prototype.getPlotLinePath = function (b) {
          function d(b, d, e) {
            "pass" !== I &&
              (b < d || b > e) &&
              (I ? (b = p(b, d, e)) : (P = !0));
            return b;
          }
          var e = this,
            g = e.chart,
            a = e.left,
            c = e.top,
            f = b.old,
            z = b.value,
            h = b.lineWidth,
            l = (f && g.oldChartHeight) || g.chartHeight,
            w = (f && g.oldChartWidth) || g.chartWidth,
            m = e.transB,
            L = b.translatedValue,
            I = b.force,
            y,
            n,
            N,
            u,
            P;
          b = {
            value: z,
            lineWidth: h,
            old: f,
            force: I,
            acrossPanes: b.acrossPanes,
            translatedValue: L,
          };
          t(this, "getPlotLinePath", b, function (b) {
            L = r(L, e.translate(z, void 0, void 0, f));
            L = p(L, -1e5, 1e5);
            y = N = Math.round(L + m);
            n = u = Math.round(l - L - m);
            k(L)
              ? e.horiz
                ? ((n = c), (u = l - e.bottom), (y = N = d(y, a, a + e.width)))
                : ((y = a), (N = w - e.right), (n = u = d(n, c, c + e.height)))
              : ((P = !0), (I = !1));
            b.path =
              P && !I
                ? null
                : g.renderer.crispLine(
                    [
                      ["M", y, n],
                      ["L", N, u],
                    ],
                    h || 1
                  );
          });
          return b.path;
        };
        b.prototype.getLinearTickPositions = function (b, d, e) {
          var g = f(Math.floor(d / b) * b);
          e = f(Math.ceil(e / b) * b);
          var r = [],
            a;
          f(g + b) === g && (a = 20);
          if (this.single) return [d];
          for (d = g; d <= e; ) {
            r.push(d);
            d = f(d + b, a);
            if (d === c) break;
            var c = d;
          }
          return r;
        };
        b.prototype.getMinorTickInterval = function () {
          var b = this.options;
          return !0 === b.minorTicks
            ? r(b.minorTickInterval, "auto")
            : !1 === b.minorTicks
            ? null
            : b.minorTickInterval;
        };
        b.prototype.getMinorTickPositions = function () {
          var b = this.options,
            d = this.tickPositions,
            e = this.minorTickInterval,
            g = this.pointRangePadding || 0,
            r = this.min - g;
          g = this.max + g;
          var a = g - r,
            c = [];
          if (a && a / e < this.len / 3) {
            var k = this.logarithmic;
            if (k)
              this.paddedTicks.forEach(function (b, d, g) {
                d &&
                  c.push.apply(c, k.getLogTickPositions(e, g[d - 1], g[d], !0));
              });
            else if (this.dateTime && "auto" === this.getMinorTickInterval())
              c = c.concat(
                this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(e),
                  r,
                  g,
                  b.startOfWeek
                )
              );
            else
              for (b = r + ((d[0] - r) % e); b <= g && b !== c[0]; b += e)
                c.push(b);
          }
          0 !== c.length && this.trimTicks(c);
          return c;
        };
        b.prototype.adjustForMinRange = function () {
          var b = this.options,
            d = this.logarithmic,
            e = this.min,
            g = this.max,
            c = 0,
            a,
            k,
            f,
            t;
          this.isXAxis &&
            "undefined" === typeof this.minRange &&
            !d &&
            (D(b.min) || D(b.max) || D(b.floor) || D(b.ceiling)
              ? (this.minRange = null)
              : (this.series.forEach(function (b) {
                  f = b.xData;
                  t = b.xIncrement ? 1 : f.length - 1;
                  if (1 < f.length)
                    for (a = t; 0 < a; a--)
                      if (((k = f[a] - f[a - 1]), !c || k < c)) c = k;
                }),
                (this.minRange = Math.min(
                  5 * c,
                  this.dataMax - this.dataMin
                ))));
          if (g - e < this.minRange) {
            var z = this.dataMax - this.dataMin >= this.minRange;
            var h = this.minRange;
            var w = (h - g + e) / 2;
            w = [e - w, r(b.min, e - w)];
            z &&
              (w[2] = this.logarithmic
                ? this.logarithmic.log2lin(this.dataMin)
                : this.dataMin);
            e = m(w);
            g = [e + h, r(b.max, e + h)];
            z && (g[2] = d ? d.log2lin(this.dataMax) : this.dataMax);
            g = l(g);
            g - e < h && ((w[0] = g - h), (w[1] = r(b.min, g - h)), (e = m(w)));
          }
          this.min = e;
          this.max = g;
        };
        b.prototype.getClosest = function () {
          var b;
          this.categories
            ? (b = 1)
            : this.series.forEach(function (d) {
                var e = d.closestPointRange,
                  g = d.visible || !d.chart.options.chart.ignoreHiddenSeries;
                !d.noSharedTooltip &&
                  D(e) &&
                  g &&
                  (b = D(b) ? Math.min(b, e) : e);
              });
          return b;
        };
        b.prototype.nameToX = function (b) {
          var d = w(this.options.categories),
            e = d ? this.categories : this.names,
            g = b.options.x;
          b.series.requireSorting = !1;
          D(g) ||
            (g =
              this.options.uniqueNames && e
                ? d
                  ? e.indexOf(b.name)
                  : r(e.keys[b.name], -1)
                : b.series.autoIncrement());
          if (-1 === g) {
            if (!d && e) var c = e.length;
          } else c = g;
          "undefined" !== typeof c
            ? ((this.names[c] = b.name), (this.names.keys[b.name] = c))
            : b.x && (c = b.x);
          return c;
        };
        b.prototype.updateNames = function () {
          var b = this,
            d = this.names;
          0 < d.length &&
            (Object.keys(d.keys).forEach(function (b) {
              delete d.keys[b];
            }),
            (d.length = 0),
            (this.minRange = this.userMinRange),
            (this.series || []).forEach(function (d) {
              d.xIncrement = null;
              if (!d.points || d.isDirtyData)
                (b.max = Math.max(b.max, d.xData.length - 1)),
                  d.processData(),
                  d.generatePoints();
              d.data.forEach(function (e, g) {
                if (e && e.options && "undefined" !== typeof e.name) {
                  var r = b.nameToX(e);
                  "undefined" !== typeof r &&
                    r !== e.x &&
                    ((e.x = r), (d.xData[g] = r));
                }
              });
            }));
        };
        b.prototype.setAxisTranslation = function () {
          var b = this,
            d = b.max - b.min,
            e = b.linkedParent,
            c = !!b.categories,
            a = b.isXAxis,
            k = b.axisPointRange || 0,
            f = 0,
            z = 0,
            h = b.transA;
          if (a || c || k) {
            var l = b.getClosest();
            e
              ? ((f = e.minPointOffset), (z = e.pointRangePadding))
              : b.series.forEach(function (d) {
                  var e = c
                      ? 1
                      : a
                      ? r(d.options.pointRange, l, 0)
                      : b.axisPointRange || 0,
                    t = d.options.pointPlacement;
                  k = Math.max(k, e);
                  if (!b.single || c)
                    (d = d.is("xrange") ? !a : a),
                      (f = Math.max(f, d && g(t) ? 0 : e / 2)),
                      (z = Math.max(z, d && "on" === t ? 0 : e));
                });
            e = b.ordinal && b.ordinal.slope && l ? b.ordinal.slope / l : 1;
            b.minPointOffset = f *= e;
            b.pointRangePadding = z *= e;
            b.pointRange = Math.min(k, b.single && c ? 1 : d);
            a && (b.closestPointRange = l);
          }
          b.translationSlope =
            b.transA =
            h =
              b.staticScale || b.len / (d + z || 1);
          b.transB = b.horiz ? b.left : b.bottom;
          b.minPixelPadding = h * f;
          t(this, "afterSetAxisTranslation");
        };
        b.prototype.minFromRange = function () {
          return this.max - this.range;
        };
        b.prototype.setTickInterval = function (b) {
          var d = this.chart,
            e = this.logarithmic,
            g = this.options,
            c = this.isXAxis,
            a = this.isLinked,
            z = g.tickPixelInterval,
            h = this.categories,
            l = this.softThreshold,
            w = g.maxPadding,
            m = g.minPadding,
            I =
              k(g.tickInterval) && 0 <= g.tickInterval
                ? g.tickInterval
                : void 0,
            L = k(this.threshold) ? this.threshold : null;
          this.dateTime || h || a || this.getTickAmount();
          var p = r(this.userMin, g.min);
          var y = r(this.userMax, g.max);
          if (a) {
            this.linkedParent = d[this.coll][g.linkedTo];
            var n = this.linkedParent.getExtremes();
            this.min = r(n.min, n.dataMin);
            this.max = r(n.max, n.dataMax);
            g.type !== this.linkedParent.options.type && K(11, 1, d);
          } else {
            if (l && D(L))
              if (this.dataMin >= L) (n = L), (m = 0);
              else if (this.dataMax <= L) {
                var N = L;
                w = 0;
              }
            this.min = r(p, n, this.dataMin);
            this.max = r(y, N, this.dataMax);
          }
          e &&
            (this.positiveValuesOnly &&
              !b &&
              0 >= Math.min(this.min, r(this.dataMin, this.min)) &&
              K(10, 1, d),
            (this.min = f(e.log2lin(this.min), 16)),
            (this.max = f(e.log2lin(this.max), 16)));
          this.range &&
            D(this.max) &&
            ((this.userMin =
              this.min =
              p =
                Math.max(this.dataMin, this.minFromRange())),
            (this.userMax = y = this.max),
            (this.range = null));
          t(this, "foundExtremes");
          this.beforePadding && this.beforePadding();
          this.adjustForMinRange();
          !(
            h ||
            this.axisPointRange ||
            (this.stacking && this.stacking.usePercentage) ||
            a
          ) &&
            D(this.min) &&
            D(this.max) &&
            (d = this.max - this.min) &&
            (!D(p) && m && (this.min -= d * m),
            !D(y) && w && (this.max += d * w));
          k(this.userMin) ||
            (k(g.softMin) && g.softMin < this.min && (this.min = p = g.softMin),
            k(g.floor) && (this.min = Math.max(this.min, g.floor)));
          k(this.userMax) ||
            (k(g.softMax) && g.softMax > this.max && (this.max = y = g.softMax),
            k(g.ceiling) && (this.max = Math.min(this.max, g.ceiling)));
          l &&
            D(this.dataMin) &&
            ((L = L || 0),
            !D(p) && this.min < L && this.dataMin >= L
              ? (this.min = this.options.minRange
                  ? Math.min(L, this.max - this.minRange)
                  : L)
              : !D(y) &&
                this.max > L &&
                this.dataMax <= L &&
                (this.max = this.options.minRange
                  ? Math.max(L, this.min + this.minRange)
                  : L));
          k(this.min) &&
            k(this.max) &&
            !this.chart.polar &&
            this.min > this.max &&
            (D(this.options.min)
              ? (this.max = this.min)
              : D(this.options.max) && (this.min = this.max));
          this.tickInterval =
            this.min === this.max ||
            "undefined" === typeof this.min ||
            "undefined" === typeof this.max
              ? 1
              : a &&
                this.linkedParent &&
                !I &&
                z === this.linkedParent.options.tickPixelInterval
              ? (I = this.linkedParent.tickInterval)
              : r(
                  I,
                  this.tickAmount
                    ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1)
                    : void 0,
                  h ? 1 : ((this.max - this.min) * z) / Math.max(this.len, z)
                );
          if (c && !b) {
            var u =
              this.min !== (this.old && this.old.min) ||
              this.max !== (this.old && this.old.max);
            this.series.forEach(function (b) {
              b.forceCrop = b.forceCropping && b.forceCropping();
              b.processData(u);
            });
            t(this, "postProcessData", { hasExtremesChanged: u });
          }
          this.setAxisTranslation();
          t(this, "initialAxisTranslation");
          this.pointRange &&
            !I &&
            (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
          b = r(
            g.minTickInterval,
            this.dateTime &&
              !this.series.some(function (b) {
                return b.noSharedTooltip;
              })
              ? this.closestPointRange
              : 0
          );
          !I && this.tickInterval < b && (this.tickInterval = b);
          this.dateTime ||
            this.logarithmic ||
            I ||
            (this.tickInterval = O(this, this.tickInterval));
          this.tickAmount || (this.tickInterval = this.unsquish());
          this.setTickPositions();
        };
        b.prototype.setTickPositions = function () {
          var b = this.options,
            d = b.tickPositions,
            e = b.tickPositioner,
            g = this.getMinorTickInterval(),
            r = this.hasVerticalPanning(),
            c = "colorAxis" === this.coll,
            a = (c || !r) && b.startOnTick;
          r = (c || !r) && b.endOnTick;
          c = [];
          var f;
          this.tickmarkOffset =
            this.categories &&
            "between" === b.tickmarkPlacement &&
            1 === this.tickInterval
              ? 0.5
              : 0;
          this.minorTickInterval =
            "auto" === g && this.tickInterval ? this.tickInterval / 5 : g;
          this.single =
            this.min === this.max &&
            D(this.min) &&
            !this.tickAmount &&
            (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
          if (d) c = d.slice();
          else if (k(this.min) && k(this.max)) {
            if (
              (this.ordinal && this.ordinal.positions) ||
              !(
                (this.max - this.min) / this.tickInterval >
                Math.max(2 * this.len, 200)
              )
            )
              if (this.dateTime)
                c = this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(
                    this.tickInterval,
                    b.units
                  ),
                  this.min,
                  this.max,
                  b.startOfWeek,
                  this.ordinal && this.ordinal.positions,
                  this.closestPointRange,
                  !0
                );
              else if (this.logarithmic)
                c = this.logarithmic.getLogTickPositions(
                  this.tickInterval,
                  this.min,
                  this.max
                );
              else
                for (g = b = this.tickInterval; g <= 2 * b; )
                  if (
                    ((c = this.getLinearTickPositions(
                      this.tickInterval,
                      this.min,
                      this.max
                    )),
                    this.tickAmount && c.length > this.tickAmount)
                  )
                    this.tickInterval = O(this, (g *= 1.1));
                  else break;
            else (c = [this.min, this.max]), K(19, !1, this.chart);
            c.length > this.len &&
              ((c = [c[0], c[c.length - 1]]), c[0] === c[1] && (c.length = 1));
            e &&
              ((this.tickPositions = c),
              (f = e.apply(this, [this.min, this.max])) && (c = f));
          }
          this.tickPositions = c;
          this.paddedTicks = c.slice(0);
          this.trimTicks(c, a, r);
          !this.isLinked &&
            k(this.min) &&
            k(this.max) &&
            (this.single &&
              2 > c.length &&
              !this.categories &&
              !this.series.some(function (b) {
                return (
                  b.is("heatmap") && "between" === b.options.pointPlacement
                );
              }) &&
              ((this.min -= 0.5), (this.max += 0.5)),
            d || f || this.adjustTickAmount());
          t(this, "afterSetTickPositions");
        };
        b.prototype.trimTicks = function (b, d, e) {
          var g = b[0],
            r = b[b.length - 1],
            c = (!this.isOrdinal && this.minPointOffset) || 0;
          t(this, "trimTicks");
          if (!this.isLinked) {
            if (d && -Infinity !== g) this.min = g;
            else for (; this.min - c > b[0]; ) b.shift();
            if (e) this.max = r;
            else for (; this.max + c < b[b.length - 1]; ) b.pop();
            0 === b.length &&
              D(g) &&
              !this.options.tickPositions &&
              b.push((r + g) / 2);
          }
        };
        b.prototype.alignToOthers = function () {
          var b = this,
            d = [this],
            e = b.options,
            g =
              "yAxis" === this.coll && this.chart.options.chart.alignThresholds,
            r = [],
            c;
          b.thresholdAlignment = void 0;
          if (
            ((!1 !== this.chart.options.chart.alignTicks && e.alignTicks) ||
              g) &&
            !1 !== e.startOnTick &&
            !1 !== e.endOnTick &&
            !b.logarithmic
          ) {
            var a = function (b) {
                var d = b.options;
                return [
                  b.horiz ? d.left : d.top,
                  d.width,
                  d.height,
                  d.pane,
                ].join();
              },
              f = a(this);
            this.chart[this.coll].forEach(function (e) {
              var g = e.series;
              g.length &&
                g.some(function (b) {
                  return b.visible;
                }) &&
                e !== b &&
                a(e) === f &&
                ((c = !0), d.push(e));
            });
          }
          if (c && g) {
            d.forEach(function (d) {
              d = d.getThresholdAlignment(b);
              k(d) && r.push(d);
            });
            var t =
              1 < r.length
                ? r.reduce(function (b, d) {
                    return b + d;
                  }, 0) / r.length
                : void 0;
            d.forEach(function (b) {
              b.thresholdAlignment = t;
            });
          }
          return c;
        };
        b.prototype.getThresholdAlignment = function (b) {
          (!k(this.dataMin) ||
            (this !== b &&
              this.series.some(function (b) {
                return b.isDirty || b.isDirtyData;
              }))) &&
            this.getSeriesExtremes();
          if (k(this.threshold))
            return (
              (b = p(
                (this.threshold - (this.dataMin || 0)) /
                  ((this.dataMax || 0) - (this.dataMin || 0)),
                0,
                1
              )),
              this.options.reversed && (b = 1 - b),
              b
            );
        };
        b.prototype.getTickAmount = function () {
          var b = this.options,
            d = b.tickPixelInterval,
            e = b.tickAmount;
          !D(b.tickInterval) &&
            !e &&
            this.len < d &&
            !this.isRadial &&
            !this.logarithmic &&
            b.startOnTick &&
            b.endOnTick &&
            (e = 2);
          !e && this.alignToOthers() && (e = Math.ceil(this.len / d) + 1);
          4 > e && ((this.finalTickAmt = e), (e = 5));
          this.tickAmount = e;
        };
        b.prototype.adjustTickAmount = function () {
          var b = this,
            d = b.finalTickAmt,
            e = b.max,
            g = b.min,
            c = b.options,
            a = b.tickPositions,
            t = b.tickAmount,
            z = b.thresholdAlignment,
            h = a && a.length,
            l = r(b.threshold, b.softThreshold ? 0 : null);
          var w = b.tickInterval;
          if (k(z)) {
            var m = 0.5 > z ? Math.ceil(z * (t - 1)) : Math.floor(z * (t - 1));
            c.reversed && (m = t - 1 - m);
          }
          if (b.hasData() && k(g) && k(e)) {
            z = function () {
              b.transA *= (h - 1) / (t - 1);
              b.min = c.startOnTick ? a[0] : Math.min(g, a[0]);
              b.max = c.endOnTick
                ? a[a.length - 1]
                : Math.max(e, a[a.length - 1]);
            };
            if (k(m) && k(b.threshold)) {
              for (
                ;
                a[m] !== l || a.length !== t || a[0] > g || a[a.length - 1] < e;

              ) {
                a.length = 0;
                for (a.push(b.threshold); a.length < t; )
                  void 0 === a[m] || a[m] > b.threshold
                    ? a.unshift(f(a[0] - w))
                    : a.push(f(a[a.length - 1] + w));
                if (w > 8 * b.tickInterval) break;
                w *= 2;
              }
              z();
            } else if (h < t) {
              for (; a.length < t; )
                a.length % 2 || g === l
                  ? a.push(f(a[a.length - 1] + w))
                  : a.unshift(f(a[0] - w));
              z();
            }
            if (D(d)) {
              for (w = l = a.length; w--; )
                ((3 === d && 1 === w % 2) || (2 >= d && 0 < w && w < l - 1)) &&
                  a.splice(w, 1);
              b.finalTickAmt = void 0;
            }
          }
        };
        b.prototype.setScale = function () {
          var b = !1,
            d = !1;
          this.series.forEach(function (e) {
            b = b || e.isDirtyData || e.isDirty;
            d = d || (e.xAxis && e.xAxis.isDirty) || !1;
          });
          this.setAxisSize();
          var e = this.len !== (this.old && this.old.len);
          e ||
          b ||
          d ||
          this.isLinked ||
          this.forceRedraw ||
          this.userMin !== (this.old && this.old.userMin) ||
          this.userMax !== (this.old && this.old.userMax) ||
          this.alignToOthers()
            ? (this.stacking &&
                (this.stacking.resetStacks(), this.stacking.buildStacks()),
              (this.forceRedraw = !1),
              this.getSeriesExtremes(),
              this.setTickInterval(),
              this.isDirty ||
                (this.isDirty =
                  e ||
                  this.min !== (this.old && this.old.min) ||
                  this.max !== (this.old && this.old.max)))
            : this.stacking && this.stacking.cleanStacks();
          b && this.panningState && (this.panningState.isDirty = !0);
          t(this, "afterSetScale");
        };
        b.prototype.setExtremes = function (b, d, e, g, c) {
          var a = this,
            k = a.chart;
          e = r(e, !0);
          a.series.forEach(function (b) {
            delete b.kdTree;
          });
          c = y(c, { min: b, max: d });
          t(a, "setExtremes", c, function () {
            a.userMin = b;
            a.userMax = d;
            a.eventArgs = c;
            e && k.redraw(g);
          });
        };
        b.prototype.zoom = function (b, d) {
          var e = this,
            g = this.dataMin,
            c = this.dataMax,
            a = this.options,
            k = Math.min(g, r(a.min, g)),
            f = Math.max(c, r(a.max, c));
          b = { newMin: b, newMax: d };
          t(this, "zoom", b, function (b) {
            var d = b.newMin,
              r = b.newMax;
            if (d !== e.min || r !== e.max)
              e.allowZoomOutside ||
                (D(g) && (d < k && (d = k), d > f && (d = f)),
                D(c) && (r < k && (r = k), r > f && (r = f))),
                (e.displayBtn =
                  "undefined" !== typeof d || "undefined" !== typeof r),
                e.setExtremes(d, r, !1, void 0, { trigger: "zoom" });
            b.zoomed = !0;
          });
          return b.zoomed;
        };
        b.prototype.setAxisSize = function () {
          var b = this.chart,
            d = this.options,
            e = d.offsets || [0, 0, 0, 0],
            g = this.horiz,
            c = (this.width = Math.round(
              z(r(d.width, b.plotWidth - e[3] + e[1]), b.plotWidth)
            )),
            a = (this.height = Math.round(
              z(r(d.height, b.plotHeight - e[0] + e[2]), b.plotHeight)
            )),
            k = (this.top = Math.round(
              z(r(d.top, b.plotTop + e[0]), b.plotHeight, b.plotTop)
            ));
          d = this.left = Math.round(
            z(r(d.left, b.plotLeft + e[3]), b.plotWidth, b.plotLeft)
          );
          this.bottom = b.chartHeight - a - k;
          this.right = b.chartWidth - c - d;
          this.len = Math.max(g ? c : a, 0);
          this.pos = g ? d : k;
        };
        b.prototype.getExtremes = function () {
          var b = this.logarithmic;
          return {
            min: b ? f(b.lin2log(this.min)) : this.min,
            max: b ? f(b.lin2log(this.max)) : this.max,
            dataMin: this.dataMin,
            dataMax: this.dataMax,
            userMin: this.userMin,
            userMax: this.userMax,
          };
        };
        b.prototype.getThreshold = function (b) {
          var d = this.logarithmic,
            e = d ? d.lin2log(this.min) : this.min;
          d = d ? d.lin2log(this.max) : this.max;
          null === b || -Infinity === b
            ? (b = e)
            : Infinity === b
            ? (b = d)
            : e > b
            ? (b = e)
            : d < b && (b = d);
          return this.translate(b, 0, 1, 0, 1);
        };
        b.prototype.autoLabelAlign = function (b) {
          var d = (r(b, 0) - 90 * this.side + 720) % 360;
          b = { align: "center" };
          t(this, "autoLabelAlign", b, function (b) {
            15 < d && 165 > d
              ? (b.align = "right")
              : 195 < d && 345 > d && (b.align = "left");
          });
          return b.align;
        };
        b.prototype.tickSize = function (b) {
          var d = this.options,
            e = r(
              d["tick" === b ? "tickWidth" : "minorTickWidth"],
              "tick" === b && this.isXAxis && !this.categories ? 1 : 0
            ),
            g = d["tick" === b ? "tickLength" : "minorTickLength"];
          if (e && g) {
            "inside" === d[b + "Position"] && (g = -g);
            var c = [g, e];
          }
          b = { tickSize: c };
          t(this, "afterTickSize", b);
          return b.tickSize;
        };
        b.prototype.labelMetrics = function () {
          var b = (this.tickPositions && this.tickPositions[0]) || 0;
          return this.chart.renderer.fontMetrics(
            this.options.labels.style.fontSize,
            this.ticks[b] && this.ticks[b].label
          );
        };
        b.prototype.unsquish = function () {
          var b = this.options.labels,
            d = this.horiz,
            e = this.tickInterval,
            g =
              this.len /
              (((this.categories ? 1 : 0) + this.max - this.min) / e),
            c = b.rotation,
            a = this.labelMetrics(),
            t = Math.max(this.max - this.min, 0),
            z = function (b) {
              var d = b / (g || 1);
              d = 1 < d ? Math.ceil(d) : 1;
              d * e > t &&
                Infinity !== b &&
                Infinity !== g &&
                t &&
                (d = Math.ceil(t / e));
              return f(d * e);
            },
            w = e,
            l = Number.MAX_VALUE;
          if (d) {
            if (!b.staggerLines)
              if (k(c)) var m = [c];
              else g < b.autoRotationLimit && (m = b.autoRotation);
            if (m)
              for (var I = (d = void 0), p = 0, y = m; p < y.length; p++) {
                var n = y[p];
                if (n === c || (n && -90 <= n && 90 >= n))
                  if (
                    ((d = z(Math.abs(a.h / Math.sin(h * n)))),
                    (I = d + Math.abs(n / 360)),
                    I < l)
                  ) {
                    l = I;
                    var N = n;
                    w = d;
                  }
              }
          } else w = z(a.h);
          this.autoRotation = m;
          this.labelRotation = r(N, k(c) ? c : 0);
          return b.step ? e : w;
        };
        b.prototype.getSlotWidth = function (b) {
          var d = this.chart,
            e = this.horiz,
            g = this.options.labels,
            r = Math.max(
              this.tickPositions.length - (this.categories ? 0 : 1),
              1
            ),
            c = d.margin[3];
          if (b && k(b.slotWidth)) return b.slotWidth;
          if (e && 2 > g.step)
            return g.rotation ? 0 : ((this.staggerLines || 1) * this.len) / r;
          if (!e) {
            b = g.style.width;
            if (void 0 !== b) return parseInt(String(b), 10);
            if (c) return c - d.spacing[3];
          }
          return 0.33 * d.chartWidth;
        };
        b.prototype.renderUnsquish = function () {
          var b = this.chart,
            d = b.renderer,
            e = this.tickPositions,
            r = this.ticks,
            c = this.options.labels,
            a = c.style,
            k = this.horiz,
            f = this.getSlotWidth(),
            t = Math.max(1, Math.round(f - 2 * c.padding)),
            z = {},
            h = this.labelMetrics(),
            w = a.textOverflow,
            l = 0;
          g(c.rotation) || (z.rotation = c.rotation || 0);
          e.forEach(function (b) {
            b = r[b];
            b.movedLabel && b.replaceMovedLabel();
            b &&
              b.label &&
              b.label.textPxLength > l &&
              (l = b.label.textPxLength);
          });
          this.maxLabelLength = l;
          if (this.autoRotation)
            l > t && l > h.h
              ? (z.rotation = this.labelRotation)
              : (this.labelRotation = 0);
          else if (f) {
            var m = t;
            if (!w) {
              var I = "clip";
              for (t = e.length; !k && t--; ) {
                var p = e[t];
                if ((p = r[p].label))
                  p.styles && "ellipsis" === p.styles.textOverflow
                    ? p.css({ textOverflow: "clip" })
                    : p.textPxLength > f && p.css({ width: f + "px" }),
                    p.getBBox().height > this.len / e.length - (h.h - h.f) &&
                      (p.specificTextOverflow = "ellipsis");
              }
            }
          }
          z.rotation &&
            ((m = l > 0.5 * b.chartHeight ? 0.33 * b.chartHeight : l),
            w || (I = "ellipsis"));
          if (
            (this.labelAlign =
              c.align || this.autoLabelAlign(this.labelRotation))
          )
            z.align = this.labelAlign;
          e.forEach(function (b) {
            var d = (b = r[b]) && b.label,
              e = a.width,
              g = {};
            d &&
              (d.attr(z),
              b.shortenLabel
                ? b.shortenLabel()
                : m &&
                  !e &&
                  "nowrap" !== a.whiteSpace &&
                  (m < d.textPxLength || "SPAN" === d.element.tagName)
                ? ((g.width = m + "px"),
                  w || (g.textOverflow = d.specificTextOverflow || I),
                  d.css(g))
                : d.styles &&
                  d.styles.width &&
                  !g.width &&
                  !e &&
                  d.css({ width: null }),
              delete d.specificTextOverflow,
              (b.rotation = z.rotation));
          }, this);
          this.tickRotCorr = d.rotCorr(
            h.b,
            this.labelRotation || 0,
            0 !== this.side
          );
        };
        b.prototype.hasData = function () {
          return (
            this.series.some(function (b) {
              return b.hasData();
            }) ||
            (this.options.showEmpty && D(this.min) && D(this.max))
          );
        };
        b.prototype.addTitle = function (b) {
          var d = this.chart.renderer,
            g = this.horiz,
            r = this.opposite,
            c = this.options.title,
            a = this.chart.styledMode,
            k;
          this.axisTitle ||
            ((k = c.textAlign) ||
              (k = (
                g
                  ? { low: "left", middle: "center", high: "right" }
                  : {
                      low: r ? "right" : "left",
                      middle: "center",
                      high: r ? "left" : "right",
                    }
              )[c.align]),
            (this.axisTitle = d
              .text(c.text || "", 0, 0, c.useHTML)
              .attr({ zIndex: 7, rotation: c.rotation, align: k })
              .addClass("highcharts-axis-title")),
            a || this.axisTitle.css(e(c.style)),
            this.axisTitle.add(this.axisGroup),
            (this.axisTitle.isNew = !0));
          a ||
            c.style.width ||
            this.isRadial ||
            this.axisTitle.css({ width: this.len + "px" });
          this.axisTitle[b ? "show" : "hide"](b);
        };
        b.prototype.generateTick = function (b) {
          var d = this.ticks;
          d[b] ? d[b].addLabel() : (d[b] = new F(this, b));
        };
        b.prototype.getOffset = function () {
          var b = this,
            e = this,
            g = e.chart,
            c = e.horiz,
            a = e.options,
            k = e.side,
            f = e.ticks,
            z = e.tickPositions,
            h = e.coll,
            w = e.axisParent,
            l = g.renderer,
            m = g.inverted && !e.isZAxis ? [1, 0, 3, 2][k] : k,
            I = e.hasData(),
            p = a.title,
            n = a.labels,
            y = g.axisOffset;
          g = g.clipOffset;
          var N = [-1, 1, 1, -1][k],
            u = a.className,
            P,
            O = 0,
            v = 0,
            G = 0;
          e.showAxis = P = I || a.showEmpty;
          e.staggerLines = (e.horiz && n.staggerLines) || void 0;
          if (!e.axisGroup) {
            var q = function (d, e, g) {
              return l
                .g(d)
                .attr({ zIndex: g })
                .addClass(
                  "highcharts-".concat(h.toLowerCase()).concat(e, " ") +
                    (b.isRadial
                      ? "highcharts-radial-axis".concat(e, " ")
                      : "") +
                    (u || "")
                )
                .add(w);
            };
            e.gridGroup = q("grid", "-grid", a.gridZIndex);
            e.axisGroup = q("axis", "", a.zIndex);
            e.labelGroup = q("axis-labels", "-labels", n.zIndex);
          }
          I || e.isLinked
            ? (z.forEach(function (b) {
                e.generateTick(b);
              }),
              e.renderUnsquish(),
              (e.reserveSpaceDefault =
                0 === k ||
                2 === k ||
                { 1: "left", 3: "right" }[k] === e.labelAlign),
              r(
                n.reserveSpace,
                "center" === e.labelAlign ? !0 : null,
                e.reserveSpaceDefault
              ) &&
                z.forEach(function (b) {
                  G = Math.max(f[b].getLabelSize(), G);
                }),
              e.staggerLines && (G *= e.staggerLines),
              (e.labelOffset = G * (e.opposite ? -1 : 1)))
            : d(f, function (b, d) {
                b.destroy();
                delete f[d];
              });
          if (
            p &&
            p.text &&
            !1 !== p.enabled &&
            (e.addTitle(P), P && !1 !== p.reserveSpace)
          ) {
            e.titleOffset = O = e.axisTitle.getBBox()[c ? "height" : "width"];
            var U = p.offset;
            v = D(U) ? 0 : r(p.margin, c ? 5 : 10);
          }
          e.renderLine();
          e.offset = N * r(a.offset, y[k] ? y[k] + (a.margin || 0) : 0);
          e.tickRotCorr = e.tickRotCorr || { x: 0, y: 0 };
          p = 0 === k ? -e.labelMetrics().h : 2 === k ? e.tickRotCorr.y : 0;
          I = Math.abs(G) + v;
          G && (I = I - p + N * (c ? r(n.y, e.tickRotCorr.y + 8 * N) : n.x));
          e.axisTitleMargin = r(U, I);
          e.getMaxLabelDimensions &&
            (e.maxLabelDimensions = e.getMaxLabelDimensions(f, z));
          "colorAxis" !== h &&
            ((c = this.tickSize("tick")),
            (y[k] = Math.max(
              y[k],
              (e.axisTitleMargin || 0) + O + N * e.offset,
              I,
              z && z.length && c ? c[0] + N * e.offset : 0
            )),
            (a =
              !e.axisLine || a.offset
                ? 0
                : 2 * Math.floor(e.axisLine.strokeWidth() / 2)),
            (g[m] = Math.max(g[m], a)));
          t(this, "afterGetOffset");
        };
        b.prototype.getLinePath = function (b) {
          var d = this.chart,
            e = this.opposite,
            g = this.offset,
            c = this.horiz,
            r = this.left + (e ? this.width : 0) + g;
          g = d.chartHeight - this.bottom - (e ? this.height : 0) + g;
          e && (b *= -1);
          return d.renderer.crispLine(
            [
              ["M", c ? this.left : r, c ? g : this.top],
              [
                "L",
                c ? d.chartWidth - this.right : r,
                c ? g : d.chartHeight - this.bottom,
              ],
            ],
            b
          );
        };
        b.prototype.renderLine = function () {
          this.axisLine ||
            ((this.axisLine = this.chart.renderer
              .path()
              .addClass("highcharts-axis-line")
              .add(this.axisGroup)),
            this.chart.styledMode ||
              this.axisLine.attr({
                stroke: this.options.lineColor,
                "stroke-width": this.options.lineWidth,
                zIndex: 7,
              }));
        };
        b.prototype.getTitlePosition = function () {
          var b = this.horiz,
            d = this.left,
            e = this.top,
            g = this.len,
            c = this.options.title,
            r = b ? d : e,
            a = this.opposite,
            k = this.offset,
            f = c.x,
            z = c.y,
            h = this.axisTitle,
            w = this.chart.renderer.fontMetrics(c.style.fontSize, h);
          h = h ? Math.max(h.getBBox(!1, 0).height - w.h - 1, 0) : 0;
          g = {
            low: r + (b ? 0 : g),
            middle: r + g / 2,
            high: r + (b ? g : 0),
          }[c.align];
          d =
            (b ? e + this.height : d) +
            (b ? 1 : -1) * (a ? -1 : 1) * (this.axisTitleMargin || 0) +
            [-h, h, w.f, -h][this.side];
          b = {
            x: b ? g + f : d + (a ? this.width : 0) + k + f,
            y: b ? d + z - (a ? this.height : 0) + k : g + z,
          };
          t(this, "afterGetTitlePosition", { titlePosition: b });
          return b;
        };
        b.prototype.renderMinorTick = function (b, d) {
          var e = this.minorTicks;
          e[b] || (e[b] = new F(this, b, "minor"));
          d && e[b].isNew && e[b].render(null, !0);
          e[b].render(null, !1, 1);
        };
        b.prototype.renderTick = function (b, d, e) {
          var g = this.ticks;
          if (
            !this.isLinked ||
            (b >= this.min && b <= this.max) ||
            (this.grid && this.grid.isColumn)
          )
            g[b] || (g[b] = new F(this, b)),
              e && g[b].isNew && g[b].render(d, !0, -1),
              g[b].render(d);
        };
        b.prototype.render = function () {
          var b = this,
            e = b.chart,
            g = b.logarithmic,
            c = b.options,
            r = b.isLinked,
            a = b.tickPositions,
            f = b.axisTitle,
            z = b.ticks,
            h = b.minorTicks,
            w = b.alternateBands,
            l = c.stackLabels,
            m = c.alternateGridColor,
            I = b.tickmarkOffset,
            p = b.axisLine,
            n = b.showAxis,
            y = u(e.renderer.globalAnimation),
            N,
            O;
          b.labelEdge.length = 0;
          b.overlap = !1;
          [z, h, w].forEach(function (b) {
            d(b, function (b) {
              b.isActive = !1;
            });
          });
          if (b.hasData() || r) {
            var D = b.chart.hasRendered && b.old && k(b.old.min);
            b.minorTickInterval &&
              !b.categories &&
              b.getMinorTickPositions().forEach(function (d) {
                b.renderMinorTick(d, D);
              });
            a.length &&
              (a.forEach(function (d, e) {
                b.renderTick(d, e, D);
              }),
              I &&
                (0 === b.min || b.single) &&
                (z[-1] || (z[-1] = new F(b, -1, null, !0)), z[-1].render(-1)));
            m &&
              a.forEach(function (d, c) {
                O = "undefined" !== typeof a[c + 1] ? a[c + 1] + I : b.max - I;
                0 === c % 2 &&
                  d < b.max &&
                  O <= b.max + (e.polar ? -I : I) &&
                  (w[d] || (w[d] = new C.PlotLineOrBand(b)),
                  (N = d + I),
                  (w[d].options = {
                    from: g ? g.lin2log(N) : N,
                    to: g ? g.lin2log(O) : O,
                    color: m,
                    className: "highcharts-alternate-grid",
                  }),
                  w[d].render(),
                  (w[d].isActive = !0));
              });
            b._addedPlotLB ||
              ((b._addedPlotLB = !0),
              (c.plotLines || [])
                .concat(c.plotBands || [])
                .forEach(function (d) {
                  b.addPlotBandOrLine(d);
                }));
          }
          [z, h, w].forEach(function (b) {
            var g = [],
              c = y.duration;
            d(b, function (b, d) {
              b.isActive || (b.render(d, !1, 0), (b.isActive = !1), g.push(d));
            });
            P(
              function () {
                for (var d = g.length; d--; )
                  b[g[d]] &&
                    !b[g[d]].isActive &&
                    (b[g[d]].destroy(), delete b[g[d]]);
              },
              b !== w && e.hasRendered && c ? c : 0
            );
          });
          p &&
            (p[p.isPlaced ? "animate" : "attr"]({
              d: this.getLinePath(p.strokeWidth()),
            }),
            (p.isPlaced = !0),
            p[n ? "show" : "hide"](n));
          f &&
            n &&
            ((c = b.getTitlePosition()),
            f[f.isNew ? "attr" : "animate"](c),
            (f.isNew = !1));
          l && l.enabled && b.stacking && b.stacking.renderStackTotals();
          b.old = {
            len: b.len,
            max: b.max,
            min: b.min,
            transA: b.transA,
            userMax: b.userMax,
            userMin: b.userMin,
          };
          b.isDirty = !1;
          t(this, "afterRender");
        };
        b.prototype.redraw = function () {
          this.visible &&
            (this.render(),
            this.plotLinesAndBands.forEach(function (b) {
              b.render();
            }));
          this.series.forEach(function (b) {
            b.isDirty = !0;
          });
        };
        b.prototype.getKeepProps = function () {
          return this.keepProps || b.keepProps;
        };
        b.prototype.destroy = function (b) {
          var e = this,
            g = e.plotLinesAndBands,
            c = this.eventOptions;
          t(this, "destroy", { keepEvents: b });
          b || I(e);
          [e.ticks, e.minorTicks, e.alternateBands].forEach(function (b) {
            v(b);
          });
          if (g) for (b = g.length; b--; ) g[b].destroy();
          "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar"
            .split(" ")
            .forEach(function (b) {
              e[b] && (e[b] = e[b].destroy());
            });
          for (var r in e.plotLinesAndBandsGroups)
            e.plotLinesAndBandsGroups[r] =
              e.plotLinesAndBandsGroups[r].destroy();
          d(e, function (b, d) {
            -1 === e.getKeepProps().indexOf(d) && delete e[d];
          });
          this.eventOptions = c;
        };
        b.prototype.drawCrosshair = function (b, d) {
          var e = this.crosshair,
            g = r(e && e.snap, !0),
            c = this.chart,
            a,
            k = this.cross;
          t(this, "drawCrosshair", { e: b, point: d });
          b || (b = this.cross && this.cross.e);
          if (e && !1 !== (D(d) || !g)) {
            g
              ? D(d) &&
                (a = r(
                  "colorAxis" !== this.coll ? d.crosshairPos : null,
                  this.isXAxis ? d.plotX : this.len - d.plotY
                ))
              : (a =
                  b &&
                  (this.horiz
                    ? b.chartX - this.pos
                    : this.len - b.chartY + this.pos));
            if (D(a)) {
              var f = {
                value: d && (this.isXAxis ? d.x : r(d.stackY, d.y)),
                translatedValue: a,
              };
              c.polar &&
                y(f, {
                  isCrosshair: !0,
                  chartX: b && b.chartX,
                  chartY: b && b.chartY,
                  point: d,
                });
              f = this.getPlotLinePath(f) || null;
            }
            if (!D(f)) {
              this.hideCrosshair();
              return;
            }
            g = this.categories && !this.isRadial;
            k ||
              ((this.cross = k =
                c.renderer
                  .path()
                  .addClass(
                    "highcharts-crosshair highcharts-crosshair-" +
                      (g ? "category " : "thin ") +
                      (e.className || "")
                  )
                  .attr({ zIndex: r(e.zIndex, 2) })
                  .add()),
              c.styledMode ||
                (k
                  .attr({
                    stroke:
                      e.color ||
                      (g
                        ? A.parse("#ccd6eb").setOpacity(0.25).get()
                        : "#cccccc"),
                    "stroke-width": r(e.width, 1),
                  })
                  .css({ "pointer-events": "none" }),
                e.dashStyle && k.attr({ dashstyle: e.dashStyle })));
            k.show().attr({ d: f });
            g && !e.width && k.attr({ "stroke-width": this.transA });
            this.cross.e = b;
          } else this.hideCrosshair();
          t(this, "afterDrawCrosshair", { e: b, point: d });
        };
        b.prototype.hideCrosshair = function () {
          this.cross && this.cross.hide();
          t(this, "afterHideCrosshair");
        };
        b.prototype.hasVerticalPanning = function () {
          var b = this.chart.options.chart.panning;
          return !!(b && b.enabled && /y/.test(b.type));
        };
        b.prototype.validatePositiveValue = function (b) {
          return k(b) && 0 < b;
        };
        b.prototype.update = function (b, d) {
          var g = this.chart;
          b = e(this.userOptions, b);
          this.destroy(!0);
          this.init(g, b);
          g.isDirtyBox = !0;
          r(d, !0) && g.redraw();
        };
        b.prototype.remove = function (b) {
          for (
            var d = this.chart, e = this.coll, g = this.series, c = g.length;
            c--;

          )
            g[c] && g[c].remove(!1);
          H(d.axes, this);
          H(d[e], this);
          d[e].forEach(function (b, d) {
            b.options.index = b.userOptions.index = d;
          });
          this.destroy();
          d.isDirtyBox = !0;
          r(b, !0) && d.redraw();
        };
        b.prototype.setTitle = function (b, d) {
          this.update({ title: b }, d);
        };
        b.prototype.setCategories = function (b, d) {
          this.update({ categories: b }, d);
        };
        b.defaultOptions = q.defaultXAxisOptions;
        b.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
        return b;
      })();
      ("");
      return a;
    }
  );
  J(a, "Core/Axis/DateTimeAxis.js", [a["Core/Utilities.js"]], function (a) {
    var v = a.addEvent,
      A = a.getMagnitude,
      E = a.normalizeTickInterval,
      B = a.timeUnits,
      C;
    (function (a) {
      function q() {
        return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
      }
      function u(a) {
        "datetime" !== a.userOptions.type
          ? (this.dateTime = void 0)
          : this.dateTime || (this.dateTime = new c(this));
      }
      var n = [];
      a.compose = function (c) {
        -1 === n.indexOf(c) &&
          (n.push(c),
          c.keepProps.push("dateTime"),
          (c.prototype.getTimeTicks = q),
          v(c, "init", u));
        return c;
      };
      var c = (function () {
        function c(c) {
          this.axis = c;
        }
        c.prototype.normalizeTimeTickInterval = function (c, a) {
          var h = a || [
            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ["second", [1, 2, 5, 10, 15, 30]],
            ["minute", [1, 2, 5, 10, 15, 30]],
            ["hour", [1, 2, 3, 4, 6, 8, 12]],
            ["day", [1, 2]],
            ["week", [1, 2]],
            ["month", [1, 2, 3, 4, 6]],
            ["year", null],
          ];
          a = h[h.length - 1];
          var f = B[a[0]],
            l = a[1],
            m;
          for (
            m = 0;
            m < h.length &&
            !((a = h[m]),
            (f = B[a[0]]),
            (l = a[1]),
            h[m + 1] && c <= (f * l[l.length - 1] + B[h[m + 1][0]]) / 2);
            m++
          );
          f === B.year && c < 5 * f && (l = [1, 2, 5]);
          c = E(c / f, l, "year" === a[0] ? Math.max(A(c / f), 1) : 1);
          return { unitRange: f, count: c, unitName: a[0] };
        };
        c.prototype.getXDateFormat = function (c, a) {
          var h = this.axis,
            f = h.chart.time;
          return h.closestPointRange
            ? f.getDateFormat(
                h.closestPointRange,
                c,
                h.options.startOfWeek,
                a
              ) || f.resolveDTLFormat(a.year).main
            : f.resolveDTLFormat(a.day).main;
        };
        return c;
      })();
      a.Additions = c;
    })(C || (C = {}));
    return C;
  });
  J(a, "Core/Axis/LogarithmicAxis.js", [a["Core/Utilities.js"]], function (a) {
    var v = a.addEvent,
      A = a.normalizeTickInterval,
      E = a.pick,
      B;
    (function (a) {
      function q(c) {
        var a = this.logarithmic;
        "logarithmic" !== c.userOptions.type
          ? (this.logarithmic = void 0)
          : a || (this.logarithmic = new n(this));
      }
      function x() {
        var c = this.logarithmic;
        c &&
          ((this.lin2val = function (a) {
            return c.lin2log(a);
          }),
          (this.val2lin = function (a) {
            return c.log2lin(a);
          }));
      }
      var u = [];
      a.compose = function (c) {
        -1 === u.indexOf(c) &&
          (u.push(c),
          c.keepProps.push("logarithmic"),
          v(c, "init", q),
          v(c, "afterInit", x));
        return c;
      };
      var n = (function () {
        function c(c) {
          this.axis = c;
        }
        c.prototype.getLogTickPositions = function (c, a, l, p) {
          var f = this.axis,
            h = f.len,
            m = f.options,
            n = [];
          p || (this.minorAutoInterval = void 0);
          if (0.5 <= c)
            (c = Math.round(c)), (n = f.getLinearTickPositions(c, a, l));
          else if (0.08 <= c) {
            var u = Math.floor(a),
              y,
              t = (m = void 0);
            for (
              h =
                0.3 < c
                  ? [1, 2, 4]
                  : 0.15 < c
                  ? [1, 2, 4, 6, 8]
                  : [1, 2, 3, 4, 5, 6, 7, 8, 9];
              u < l + 1 && !t;
              u++
            ) {
              var w = h.length;
              for (y = 0; y < w && !t; y++) {
                var k = this.log2lin(this.lin2log(u) * h[y]);
                k > a &&
                  (!p || m <= l) &&
                  "undefined" !== typeof m &&
                  n.push(m);
                m > l && (t = !0);
                m = k;
              }
            }
          } else
            (a = this.lin2log(a)),
              (l = this.lin2log(l)),
              (c = p ? f.getMinorTickInterval() : m.tickInterval),
              (c = E(
                "auto" === c ? null : c,
                this.minorAutoInterval,
                ((m.tickPixelInterval / (p ? 5 : 1)) * (l - a)) /
                  ((p ? h / f.tickPositions.length : h) || 1)
              )),
              (c = A(c)),
              (n = f.getLinearTickPositions(c, a, l).map(this.log2lin)),
              p || (this.minorAutoInterval = c / 5);
          p || (f.tickInterval = c);
          return n;
        };
        c.prototype.lin2log = function (c) {
          return Math.pow(10, c);
        };
        c.prototype.log2lin = function (c) {
          return Math.log(c) / Math.LN10;
        };
        return c;
      })();
      a.Additions = n;
    })(B || (B = {}));
    return B;
  });
  J(
    a,
    "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js",
    [a["Core/Utilities.js"]],
    function (a) {
      var v = a.erase,
        A = a.extend,
        E = a.isNumber,
        B;
      (function (a) {
        var q = [],
          x;
        a.compose = function (a, c) {
          x || (x = a);
          -1 === q.indexOf(c) && (q.push(c), A(c.prototype, u.prototype));
          return c;
        };
        var u = (function () {
          function a() {}
          a.prototype.getPlotBandPath = function (c, a, m) {
            void 0 === m && (m = this.options);
            var l = this.getPlotLinePath({
                value: a,
                force: !0,
                acrossPanes: m.acrossPanes,
              }),
              h = [],
              f = this.horiz;
            a =
              !E(this.min) ||
              !E(this.max) ||
              (c < this.min && a < this.min) ||
              (c > this.max && a > this.max);
            c = this.getPlotLinePath({
              value: c,
              force: !0,
              acrossPanes: m.acrossPanes,
            });
            m = 1;
            if (c && l) {
              if (a) {
                var n = c.toString() === l.toString();
                m = 0;
              }
              for (a = 0; a < c.length; a += 2) {
                var u = c[a],
                  v = c[a + 1],
                  q = l[a],
                  y = l[a + 1];
                ("M" !== u[0] && "L" !== u[0]) ||
                  ("M" !== v[0] && "L" !== v[0]) ||
                  ("M" !== q[0] && "L" !== q[0]) ||
                  ("M" !== y[0] && "L" !== y[0]) ||
                  (f && q[1] === u[1]
                    ? ((q[1] += m), (y[1] += m))
                    : f || q[2] !== u[2] || ((q[2] += m), (y[2] += m)),
                  h.push(
                    ["M", u[1], u[2]],
                    ["L", v[1], v[2]],
                    ["L", y[1], y[2]],
                    ["L", q[1], q[2]],
                    ["Z"]
                  ));
                h.isFlat = n;
              }
            }
            return h;
          };
          a.prototype.addPlotBand = function (c) {
            return this.addPlotBandOrLine(c, "plotBands");
          };
          a.prototype.addPlotLine = function (c) {
            return this.addPlotBandOrLine(c, "plotLines");
          };
          a.prototype.addPlotBandOrLine = function (c, a) {
            var h = this,
              l = this.userOptions,
              p = new x(this, c);
            this.visible && (p = p.render());
            if (p) {
              this._addedPlotLB ||
                ((this._addedPlotLB = !0),
                (l.plotLines || [])
                  .concat(l.plotBands || [])
                  .forEach(function (a) {
                    h.addPlotBandOrLine(a);
                  }));
              if (a) {
                var f = l[a] || [];
                f.push(c);
                l[a] = f;
              }
              this.plotLinesAndBands.push(p);
            }
            return p;
          };
          a.prototype.removePlotBandOrLine = function (a) {
            var c = this.plotLinesAndBands,
              m = this.options,
              l = this.userOptions;
            if (c) {
              for (var p = c.length; p--; ) c[p].id === a && c[p].destroy();
              [
                m.plotLines || [],
                l.plotLines || [],
                m.plotBands || [],
                l.plotBands || [],
              ].forEach(function (c) {
                for (p = c.length; p--; ) (c[p] || {}).id === a && v(c, c[p]);
              });
            }
          };
          a.prototype.removePlotBand = function (c) {
            this.removePlotBandOrLine(c);
          };
          a.prototype.removePlotLine = function (c) {
            this.removePlotBandOrLine(c);
          };
          return a;
        })();
      })(B || (B = {}));
      return B;
    }
  );
  J(
    a,
    "Core/Axis/PlotLineOrBand/PlotLineOrBand.js",
    [
      a["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q) {
      var v = q.arrayMax,
        E = q.arrayMin,
        B = q.defined,
        C = q.destroyObjectProperties,
        F = q.erase,
        x = q.fireEvent,
        u = q.merge,
        n = q.objectEach,
        c = q.pick;
      q = (function () {
        function h(a, c) {
          this.axis = a;
          c && ((this.options = c), (this.id = c.id));
        }
        h.compose = function (c) {
          return a.compose(h, c);
        };
        h.prototype.render = function () {
          x(this, "render");
          var a = this,
            l = a.axis,
            h = l.horiz,
            f = l.logarithmic,
            D = a.options,
            v = D.color,
            q = c(D.zIndex, 0),
            K = D.events,
            y = {},
            t = l.chart.renderer,
            w = D.label,
            k = a.label,
            g = D.to,
            e = D.from,
            b = D.value,
            d = a.svgElem,
            r = [],
            z = B(e) && B(g);
          r = B(b);
          var I = !d,
            N = {
              class:
                "highcharts-plot-" +
                (z ? "band " : "line ") +
                (D.className || ""),
            },
            P = z ? "bands" : "lines";
          f && ((e = f.log2lin(e)), (g = f.log2lin(g)), (b = f.log2lin(b)));
          l.chart.styledMode ||
            (r
              ? ((N.stroke = v || "#999999"),
                (N["stroke-width"] = c(D.width, 1)),
                D.dashStyle && (N.dashstyle = D.dashStyle))
              : z &&
                ((N.fill = v || "#e6ebf5"),
                D.borderWidth &&
                  ((N.stroke = D.borderColor),
                  (N["stroke-width"] = D.borderWidth))));
          y.zIndex = q;
          P += "-" + q;
          (f = l.plotLinesAndBandsGroups[P]) ||
            (l.plotLinesAndBandsGroups[P] = f =
              t
                .g("plot-" + P)
                .attr(y)
                .add());
          I && (a.svgElem = d = t.path().attr(N).add(f));
          if (r)
            r = l.getPlotLinePath({
              value: b,
              lineWidth: d.strokeWidth(),
              acrossPanes: D.acrossPanes,
            });
          else if (z) r = l.getPlotBandPath(e, g, D);
          else return;
          !a.eventsAdded &&
            K &&
            (n(K, function (b, e) {
              d.on(e, function (b) {
                K[e].apply(a, [b]);
              });
            }),
            (a.eventsAdded = !0));
          (I || !d.d) && r && r.length
            ? d.attr({ d: r })
            : d &&
              (r
                ? (d.show(), d.animate({ d: r }))
                : d.d && (d.hide(), k && (a.label = k = k.destroy())));
          w &&
          (B(w.text) || B(w.formatter)) &&
          r &&
          r.length &&
          0 < l.width &&
          0 < l.height &&
          !r.isFlat
            ? ((w = u(
                {
                  align: h && z && "center",
                  x: h ? !z && 4 : 10,
                  verticalAlign: !h && z && "middle",
                  y: h ? (z ? 16 : 10) : z ? 6 : -4,
                  rotation: h && !z && 90,
                },
                w
              )),
              this.renderLabel(w, r, z, q))
            : k && k.hide();
          return a;
        };
        h.prototype.renderLabel = function (a, c, h, f) {
          var l = this.axis,
            m = l.chart.renderer,
            p = this.label;
          p ||
            ((this.label = p =
              m
                .text(this.getLabelText(a), 0, 0, a.useHTML)
                .attr({
                  align: a.textAlign || a.align,
                  rotation: a.rotation,
                  class:
                    "highcharts-plot-" +
                    (h ? "band" : "line") +
                    "-label " +
                    (a.className || ""),
                  zIndex: f,
                })
                .add()),
            l.chart.styledMode ||
              p.css(u({ textOverflow: "ellipsis" }, a.style)));
          f = c.xBounds || [c[0][1], c[1][1], h ? c[2][1] : c[0][1]];
          c = c.yBounds || [c[0][2], c[1][2], h ? c[2][2] : c[0][2]];
          h = E(f);
          m = E(c);
          p.align(a, !1, { x: h, y: m, width: v(f) - h, height: v(c) - m });
          (p.alignValue && "left" !== p.alignValue) ||
            ((a = a.clip ? l.width : l.chart.chartWidth),
            p.css({
              width:
                (90 === p.rotation
                  ? l.height - (p.alignAttr.y - l.top)
                  : a - (p.alignAttr.x - l.left)) + "px",
            }));
          p.show(!0);
        };
        h.prototype.getLabelText = function (a) {
          return B(a.formatter) ? a.formatter.call(this) : a.text;
        };
        h.prototype.destroy = function () {
          F(this.axis.plotLinesAndBands, this);
          delete this.axis;
          C(this);
        };
        return h;
      })();
      ("");
      ("");
      return q;
    }
  );
  J(
    a,
    "Core/Tooltip.js",
    [
      a["Core/FormatUtilities.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B) {
      var v = a.format,
        F = q.doc,
        x = A.distribute,
        u = B.clamp,
        n = B.css,
        c = B.discardElement,
        h = B.extend,
        m = B.fireEvent,
        l = B.isArray,
        p = B.isNumber,
        f = B.isString,
        D = B.merge,
        G = B.pick,
        H = B.splat,
        K = B.syncTimeout;
      a = (function () {
        function a(a, c) {
          this.allowShared = !0;
          this.container = void 0;
          this.crosshairs = [];
          this.distance = 0;
          this.isHidden = !0;
          this.isSticky = !1;
          this.now = {};
          this.options = {};
          this.outside = !1;
          this.chart = a;
          this.init(a, c);
        }
        a.prototype.applyFilter = function () {
          var a = this.chart;
          a.renderer.definition({
            tagName: "filter",
            attributes: { id: "drop-shadow-" + a.index, opacity: 0.5 },
            children: [
              {
                tagName: "feGaussianBlur",
                attributes: { in: "SourceAlpha", stdDeviation: 1 },
              },
              { tagName: "feOffset", attributes: { dx: 1, dy: 1 } },
              {
                tagName: "feComponentTransfer",
                children: [
                  {
                    tagName: "feFuncA",
                    attributes: { type: "linear", slope: 0.3 },
                  },
                ],
              },
              {
                tagName: "feMerge",
                children: [
                  { tagName: "feMergeNode" },
                  {
                    tagName: "feMergeNode",
                    attributes: { in: "SourceGraphic" },
                  },
                ],
              },
            ],
          });
        };
        a.prototype.bodyFormatter = function (a) {
          return a.map(function (a) {
            var c = a.series.tooltipOptions;
            return (
              c[(a.point.formatPrefix || "point") + "Formatter"] ||
              a.point.tooltipFormatter
            ).call(
              a.point,
              c[(a.point.formatPrefix || "point") + "Format"] || ""
            );
          });
        };
        a.prototype.cleanSplit = function (a) {
          this.chart.series.forEach(function (c) {
            var k = c && c.tt;
            k && (!k.isActive || a ? (c.tt = k.destroy()) : (k.isActive = !1));
          });
        };
        a.prototype.defaultFormatter = function (a) {
          var c = this.points || H(this);
          var k = [a.tooltipFooterHeaderFormatter(c[0])];
          k = k.concat(a.bodyFormatter(c));
          k.push(a.tooltipFooterHeaderFormatter(c[0], !0));
          return k;
        };
        a.prototype.destroy = function () {
          this.label && (this.label = this.label.destroy());
          this.split &&
            this.tt &&
            (this.cleanSplit(!0), (this.tt = this.tt.destroy()));
          this.renderer &&
            ((this.renderer = this.renderer.destroy()), c(this.container));
          B.clearTimeout(this.hideTimer);
          B.clearTimeout(this.tooltipTimeout);
        };
        a.prototype.getAnchor = function (a, c) {
          var k = this.chart,
            g = k.pointer,
            e = k.inverted,
            b = k.plotTop;
          k = k.plotLeft;
          a = H(a);
          a[0].series &&
            a[0].series.yAxis &&
            !a[0].series.yAxis.options.reversedStacks &&
            (a = a.slice().reverse());
          if (this.followPointer && c)
            "undefined" === typeof c.chartX && (c = g.normalize(c)),
              (a = [c.chartX - k, c.chartY - b]);
          else if (a[0].tooltipPos) a = a[0].tooltipPos;
          else {
            var d = 0,
              r = 0;
            a.forEach(function (b) {
              if ((b = b.pos(!0))) (d += b[0]), (r += b[1]);
            });
            d /= a.length;
            r /= a.length;
            this.shared &&
              1 < a.length &&
              c &&
              (e ? (d = c.chartX) : (r = c.chartY));
            a = [d - k, r - b];
          }
          return a.map(Math.round);
        };
        a.prototype.getClassName = function (a, c, k) {
          var g = a.series,
            e = g.options;
          return [
            this.options.className,
            "highcharts-label",
            k && "highcharts-tooltip-header",
            c ? "highcharts-tooltip-box" : "highcharts-tooltip",
            !k && "highcharts-color-" + G(a.colorIndex, g.colorIndex),
            e && e.className,
          ]
            .filter(f)
            .join(" ");
        };
        a.prototype.getLabel = function () {
          var a = this,
            c = this.chart.styledMode,
            k = this.options,
            g = this.split && this.allowShared,
            e =
              k.style.pointerEvents ||
              (this.shouldStickOnContact() ? "auto" : "none"),
            b,
            d = this.chart.renderer;
          if (a.label) {
            var r = !a.label.hasClass("highcharts-label");
            ((g && !r) || (!g && r)) && a.destroy();
          }
          if (!this.label) {
            if (this.outside) {
              r = this.chart.options.chart.style;
              var f = E.getRendererType();
              this.container = b = q.doc.createElement("div");
              b.className = "highcharts-tooltip-container";
              n(b, {
                position: "absolute",
                top: "1px",
                pointerEvents: e,
                zIndex: Math.max(
                  this.options.style.zIndex || 0,
                  ((r && r.zIndex) || 0) + 3
                ),
              });
              q.doc.body.appendChild(b);
              this.renderer = d = new f(
                b,
                0,
                0,
                r,
                void 0,
                void 0,
                d.styledMode
              );
            }
            g
              ? (this.label = d.g("tooltip"))
              : ((this.label = d
                  .label(
                    "",
                    0,
                    0,
                    k.shape,
                    void 0,
                    void 0,
                    k.useHTML,
                    void 0,
                    "tooltip"
                  )
                  .attr({ padding: k.padding, r: k.borderRadius })),
                c ||
                  this.label
                    .attr({
                      fill: k.backgroundColor,
                      "stroke-width": k.borderWidth,
                    })
                    .css(k.style)
                    .css({ pointerEvents: e })
                    .shadow(k.shadow));
            c &&
              k.shadow &&
              (this.applyFilter(),
              this.label.attr({
                filter: "url(#drop-shadow-" + this.chart.index + ")",
              }));
            if (a.outside && !a.split) {
              var h = this.label,
                l = h.xSetter,
                m = h.ySetter;
              h.xSetter = function (d) {
                l.call(h, a.distance);
                b.style.left = d + "px";
              };
              h.ySetter = function (d) {
                m.call(h, a.distance);
                b.style.top = d + "px";
              };
            }
            this.label.attr({ zIndex: 8 }).add();
          }
          return this.label;
        };
        a.prototype.getPosition = function (a, c, k) {
          var g = this.chart,
            e = this.distance,
            b = {},
            d = (g.inverted && k.h) || 0,
            r = this.outside,
            f = r ? F.documentElement.clientWidth - 2 * e : g.chartWidth,
            t = r
              ? Math.max(
                  F.body.scrollHeight,
                  F.documentElement.scrollHeight,
                  F.body.offsetHeight,
                  F.documentElement.offsetHeight,
                  F.documentElement.clientHeight
                )
              : g.chartHeight,
            h = g.pointer.getChartPosition(),
            l = function (b) {
              var d = "x" === b;
              return [b, d ? f : t, d ? a : c].concat(
                r
                  ? [
                      d ? a * h.scaleX : c * h.scaleY,
                      d
                        ? h.left - e + (k.plotX + g.plotLeft) * h.scaleX
                        : h.top - e + (k.plotY + g.plotTop) * h.scaleY,
                      0,
                      d ? f : t,
                    ]
                  : [
                      d ? a : c,
                      d ? k.plotX + g.plotLeft : k.plotY + g.plotTop,
                      d ? g.plotLeft : g.plotTop,
                      d ? g.plotLeft + g.plotWidth : g.plotTop + g.plotHeight,
                    ]
              );
            },
            w = l("y"),
            m = l("x"),
            p;
          l = !!k.negative;
          !g.polar &&
            g.hoverSeries &&
            g.hoverSeries.yAxis &&
            g.hoverSeries.yAxis.reversed &&
            (l = !l);
          var n = !this.followPointer && G(k.ttBelow, !g.inverted === l),
            y = function (a, g, c, k, f, t, z) {
              var l = r ? ("y" === a ? e * h.scaleY : e * h.scaleX) : e,
                w = (c - k) / 2,
                m = k < f - e,
                I = f + e + k < g,
                p = f - l - c + w;
              f = f + l - w;
              if (n && I) b[a] = f;
              else if (!n && m) b[a] = p;
              else if (m) b[a] = Math.min(z - k, 0 > p - d ? p : p - d);
              else if (I) b[a] = Math.max(t, f + d + c > g ? f : f + d);
              else return !1;
            },
            u = function (d, a, g, c, r) {
              var k;
              r < e || r > a - e
                ? (k = !1)
                : (b[d] =
                    r < g / 2 ? 1 : r > a - c / 2 ? a - c - 2 : r - g / 2);
              return k;
            },
            D = function (b) {
              var d = w;
              w = m;
              m = d;
              p = b;
            },
            M = function () {
              !1 !== y.apply(0, w)
                ? !1 !== u.apply(0, m) || p || (D(!0), M())
                : p
                ? (b.x = b.y = 0)
                : (D(!0), M());
            };
          (g.inverted || 1 < this.len) && D();
          M();
          return b;
        };
        a.prototype.hide = function (a) {
          var c = this;
          B.clearTimeout(this.hideTimer);
          a = G(a, this.options.hideDelay);
          this.isHidden ||
            (this.hideTimer = K(function () {
              c.getLabel().fadeOut(a ? void 0 : a);
              c.isHidden = !0;
            }, a));
        };
        a.prototype.init = function (a, c) {
          this.chart = a;
          this.options = c;
          this.crosshairs = [];
          this.now = { x: 0, y: 0 };
          this.isHidden = !0;
          this.split = c.split && !a.inverted && !a.polar;
          this.shared = c.shared || this.split;
          this.outside = G(
            c.outside,
            !(!a.scrollablePixelsX && !a.scrollablePixelsY)
          );
        };
        a.prototype.shouldStickOnContact = function (a) {
          return !(
            this.followPointer ||
            !this.options.stickOnContact ||
            (a && !this.chart.pointer.inClass(a.target, "highcharts-tooltip"))
          );
        };
        a.prototype.move = function (a, c, k, g) {
          var e = this,
            b = e.now,
            d =
              !1 !== e.options.animation &&
              !e.isHidden &&
              (1 < Math.abs(a - b.x) || 1 < Math.abs(c - b.y)),
            r = e.followPointer || 1 < e.len;
          h(b, {
            x: d ? (2 * b.x + a) / 3 : a,
            y: d ? (b.y + c) / 2 : c,
            anchorX: r ? void 0 : d ? (2 * b.anchorX + k) / 3 : k,
            anchorY: r ? void 0 : d ? (b.anchorY + g) / 2 : g,
          });
          e.getLabel().attr(b);
          e.drawTracker();
          d &&
            (B.clearTimeout(this.tooltipTimeout),
            (this.tooltipTimeout = setTimeout(function () {
              e && e.move(a, c, k, g);
            }, 32)));
        };
        a.prototype.refresh = function (a, c) {
          var k = this.chart,
            g = this.options,
            e = k.pointer,
            b = H(a),
            d = b[0],
            r = [],
            f = g.formatter || this.defaultFormatter,
            t = this.shared,
            h = k.styledMode,
            w = {};
          if (g.enabled && d.series) {
            B.clearTimeout(this.hideTimer);
            this.allowShared = !(!l(a) && a.series && a.series.noSharedTooltip);
            this.followPointer =
              !this.split && d.series.tooltipOptions.followPointer;
            a = this.getAnchor(a, c);
            var p = a[0],
              n = a[1];
            t && this.allowShared
              ? (e.applyInactiveState(b),
                b.forEach(function (b) {
                  b.setState("hover");
                  r.push(b.getLabelConfig());
                }),
                (w = { x: d.category, y: d.y }),
                (w.points = r))
              : (w = d.getLabelConfig());
            this.len = r.length;
            f = f.call(w, this);
            t = d.series;
            this.distance = G(t.tooltipOptions.distance, 16);
            if (!1 === f) this.hide();
            else {
              if (this.split && this.allowShared) this.renderSplit(f, b);
              else {
                var y = p,
                  u = n;
                c &&
                  e.isDirectTouch &&
                  ((y = c.chartX - k.plotLeft), (u = c.chartY - k.plotTop));
                if (
                  k.polar ||
                  !1 === t.options.clip ||
                  b.some(function (b) {
                    return e.isDirectTouch || b.series.shouldShowTooltip(y, u);
                  })
                )
                  (c = this.getLabel()),
                    (g.style.width && !h) ||
                      c.css({ width: k.spacingBox.width + "px" }),
                    c.attr({ text: f && f.join ? f.join("") : f }),
                    c.addClass(this.getClassName(d), !0),
                    h ||
                      c.attr({
                        stroke:
                          g.borderColor || d.color || t.color || "#666666",
                      }),
                    this.updatePosition({
                      plotX: p,
                      plotY: n,
                      negative: d.negative,
                      ttBelow: d.ttBelow,
                      h: a[2] || 0,
                    });
                else {
                  this.hide();
                  return;
                }
              }
              this.isHidden &&
                this.label &&
                this.label.attr({ opacity: 1 }).show();
              this.isHidden = !1;
            }
            m(this, "refresh");
          }
        };
        a.prototype.renderSplit = function (a, c) {
          function k(b, d, e, a, c) {
            void 0 === c && (c = !0);
            e
              ? ((d = V ? 0 : E),
                (b = u(b - a / 2, Y.left, Y.right - a - (g.outside ? H : 0))))
              : ((d -= A),
                (b = c ? b - a - q : b + q),
                (b = u(b, c ? b : Y.left, Y.right)));
            return { x: b, y: d };
          }
          var g = this,
            e = g.chart,
            b = g.chart,
            d = b.chartWidth,
            r = b.chartHeight,
            t = b.plotHeight,
            l = b.plotLeft,
            w = b.plotTop,
            m = b.pointer,
            p = b.scrollablePixelsY;
          p = void 0 === p ? 0 : p;
          var n = b.scrollablePixelsX,
            y = b.scrollingContainer;
          y = void 0 === y ? { scrollLeft: 0, scrollTop: 0 } : y;
          var D = y.scrollLeft;
          y = y.scrollTop;
          var v = b.styledMode,
            q = g.distance,
            K = g.options,
            M = g.options.positioner,
            Y =
              g.outside && "number" !== typeof n
                ? F.documentElement.getBoundingClientRect()
                : { left: D, right: D + d, top: y, bottom: y + r },
            Q = g.getLabel(),
            ca = this.renderer || e.renderer,
            V = !(!e.xAxis[0] || !e.xAxis[0].opposite);
          e = m.getChartPosition();
          var H = e.left;
          e = e.top;
          var A = w + y,
            B = 0,
            E = t - p;
          f(a) && (a = [!1, a]);
          a = a.slice(0, c.length + 1).reduce(function (b, d, e) {
            if (!1 !== d && "" !== d) {
              e = c[e - 1] || {
                isHeader: !0,
                plotX: c[0].plotX,
                plotY: t,
                series: {},
              };
              var a = e.isHeader,
                r = a ? g : e.series;
              d = d.toString();
              var f = r.tt,
                z = e.isHeader;
              var h = e.series;
              f ||
                ((f = { padding: K.padding, r: K.borderRadius }),
                v ||
                  ((f.fill = K.backgroundColor),
                  (f["stroke-width"] = K.borderWidth)),
                (f = ca
                  .label(
                    "",
                    0,
                    0,
                    K[z ? "headerShape" : "shape"],
                    void 0,
                    void 0,
                    K.useHTML
                  )
                  .addClass(g.getClassName(e, !0, z))
                  .attr(f)
                  .add(Q)));
              f.isActive = !0;
              f.attr({ text: d });
              v ||
                f
                  .css(K.style)
                  .shadow(K.shadow)
                  .attr({
                    stroke: K.borderColor || e.color || h.color || "#333333",
                  });
              r = r.tt = f;
              z = r.getBBox();
              d = z.width + r.strokeWidth();
              a && ((B = z.height), (E += B), V && (A -= B));
              h = e.plotX;
              h = void 0 === h ? 0 : h;
              f = e.plotY;
              f = void 0 === f ? 0 : f;
              var m = e.series;
              if (e.isHeader) {
                h = l + h;
                var I = w + t / 2;
              } else {
                var p = m.xAxis,
                  n = m.yAxis;
                h = p.pos + u(h, -q, p.len + q);
                m.shouldShowTooltip(0, n.pos - w + f, { ignoreX: !0 }) &&
                  (I = n.pos + f);
              }
              h = u(h, Y.left - q, Y.right + q);
              "number" === typeof I
                ? ((z = z.height + 1),
                  (f = M ? M.call(g, d, z, e) : k(h, I, a, d)),
                  b.push({
                    align: M ? 0 : void 0,
                    anchorX: h,
                    anchorY: I,
                    boxWidth: d,
                    point: e,
                    rank: G(f.rank, a ? 1 : 0),
                    size: z,
                    target: f.y,
                    tt: r,
                    x: f.x,
                  }))
                : (r.isActive = !1);
            }
            return b;
          }, []);
          !M &&
            a.some(function (b) {
              var d = (g.outside ? H : 0) + b.anchorX;
              return d < Y.left && d + b.boxWidth < Y.right
                ? !0
                : d < H - Y.left + b.boxWidth && Y.right - d > d;
            }) &&
            (a = a.map(function (b) {
              var d = k(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1);
              return h(b, { target: d.y, x: d.x });
            }));
          g.cleanSplit();
          x(a, E);
          var C = H,
            J = H;
          a.forEach(function (b) {
            var d = b.x,
              e = b.boxWidth;
            b = b.isHeader;
            b ||
              (g.outside && H + d < C && (C = H + d),
              !b && g.outside && C + e > J && (J = H + d));
          });
          a.forEach(function (b) {
            var d = b.x,
              e = b.anchorX,
              a = b.pos,
              c = b.point.isHeader;
            a = {
              visibility: "undefined" === typeof a ? "hidden" : "inherit",
              x: d,
              y: (a || 0) + A,
              anchorX: e,
              anchorY: b.anchorY,
            };
            if (g.outside && d < e) {
              var r = H - C;
              0 < r &&
                (c || ((a.x = d + r), (a.anchorX = e + r)),
                c && ((a.x = (J - C) / 2), (a.anchorX = e + r)));
            }
            b.tt.attr(a);
          });
          a = g.container;
          p = g.renderer;
          g.outside &&
            a &&
            p &&
            ((b = Q.getBBox()),
            p.setSize(b.width + b.x, b.height + b.y, !1),
            (a.style.left = C + "px"),
            (a.style.top = e + "px"));
        };
        a.prototype.drawTracker = function () {
          if (this.shouldStickOnContact()) {
            var a = this.chart,
              c = this.label,
              k = this.shared ? a.hoverPoints : a.hoverPoint;
            if (c && k) {
              var g = { x: 0, y: 0, width: 0, height: 0 };
              k = this.getAnchor(k);
              var e = c.getBBox();
              k[0] += a.plotLeft - c.translateX;
              k[1] += a.plotTop - c.translateY;
              g.x = Math.min(0, k[0]);
              g.y = Math.min(0, k[1]);
              g.width =
                0 > k[0]
                  ? Math.max(Math.abs(k[0]), e.width - k[0])
                  : Math.max(Math.abs(k[0]), e.width);
              g.height =
                0 > k[1]
                  ? Math.max(Math.abs(k[1]), e.height - Math.abs(k[1]))
                  : Math.max(Math.abs(k[1]), e.height);
              this.tracker
                ? this.tracker.attr(g)
                : ((this.tracker = c.renderer
                    .rect(g)
                    .addClass("highcharts-tracker")
                    .add(c)),
                  a.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
            }
          } else this.tracker && this.tracker.destroy();
        };
        a.prototype.styledModeFormat = function (a) {
          return a
            .replace('style="font-size: 10px"', 'class="highcharts-header"')
            .replace(
              /style="color:{(point|series)\.color}"/g,
              'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"'
            );
        };
        a.prototype.tooltipFooterHeaderFormatter = function (a, c) {
          var k = a.series,
            g = k.tooltipOptions,
            e = k.xAxis,
            b = e && e.dateTime;
          e = { isFooter: c, labelConfig: a };
          var d = g.xDateFormat,
            r = g[c ? "footerFormat" : "headerFormat"];
          m(this, "headerFormatter", e, function (e) {
            b &&
              !d &&
              p(a.key) &&
              (d = b.getXDateFormat(a.key, g.dateTimeLabelFormats));
            b &&
              d &&
              ((a.point && a.point.tooltipDateKeys) || ["key"]).forEach(
                function (b) {
                  r = r.replace(
                    "{point." + b + "}",
                    "{point." + b + ":" + d + "}"
                  );
                }
              );
            k.chart.styledMode && (r = this.styledModeFormat(r));
            e.text = v(r, { point: a, series: k }, this.chart);
          });
          return e.text;
        };
        a.prototype.update = function (a) {
          this.destroy();
          D(!0, this.chart.options.tooltip.userOptions, a);
          this.init(this.chart, D(!0, this.options, a));
        };
        a.prototype.updatePosition = function (a) {
          var c = this.chart,
            k = this.distance,
            g = this.options,
            e = c.pointer,
            b = this.getLabel(),
            d = e.getChartPosition();
          e = d.left;
          var r = d.top,
            f = d.scaleX;
          d = d.scaleY;
          var t = (g.positioner || this.getPosition).call(
              this,
              b.width,
              b.height,
              a
            ),
            h = (a.plotX || 0) + c.plotLeft;
          a = (a.plotY || 0) + c.plotTop;
          if (this.outside) {
            g.positioner && ((t.x += e - k), (t.y += r - k));
            k = g.borderWidth + 2 * k;
            this.renderer.setSize(b.width + k, b.height + k, !1);
            if (1 !== f || 1 !== d)
              n(this.container, {
                transform: "scale(".concat(f, ", ").concat(d, ")"),
              }),
                (h *= f),
                (a *= d);
            h += e - t.x;
            a += r - t.y;
          }
          this.move(Math.round(t.x), Math.round(t.y || 0), h, a);
        };
        return a;
      })();
      ("");
      return a;
    }
  );
  J(
    a,
    "Core/Series/Point.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Defaults.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B) {
      var v = q.animObject,
        F = A.defaultOptions,
        x = E.format,
        u = B.addEvent,
        n = B.defined,
        c = B.erase,
        h = B.extend,
        m = B.fireEvent,
        l = B.getNestedProperty,
        p = B.isArray,
        f = B.isFunction,
        D = B.isNumber,
        G = B.isObject,
        H = B.merge,
        K = B.objectEach,
        y = B.pick,
        t = B.syncTimeout,
        w = B.removeEvent,
        k = B.uniqueKey;
      q = (function () {
        function g() {
          this.category = void 0;
          this.formatPrefix = "point";
          this.id = void 0;
          this.isNull = !1;
          this.percentage = this.options = this.name = void 0;
          this.selected = !1;
          this.total = this.shapeArgs = this.series = void 0;
          this.visible = !0;
          this.x = void 0;
        }
        g.prototype.animateBeforeDestroy = function () {
          var e = this,
            b = { x: e.startXPos, opacity: 0 },
            d = e.getGraphicalProps();
          d.singular.forEach(function (d) {
            e[d] = e[d].animate(
              "dataLabel" === d
                ? { x: e[d].startXPos, y: e[d].startYPos, opacity: 0 }
                : b
            );
          });
          d.plural.forEach(function (b) {
            e[b].forEach(function (b) {
              b.element &&
                b.animate(
                  h(
                    { x: e.startXPos },
                    b.startYPos ? { x: b.startXPos, y: b.startYPos } : {}
                  )
                );
            });
          });
        };
        g.prototype.applyOptions = function (e, b) {
          var d = this.series,
            a = d.options.pointValKey || d.pointValKey;
          e = g.prototype.optionsToObject.call(this, e);
          h(this, e);
          this.options = this.options ? h(this.options, e) : e;
          e.group && delete this.group;
          e.dataLabels && delete this.dataLabels;
          a && (this.y = g.prototype.getNestedProperty.call(this, a));
          this.formatPrefix = (this.isNull = this.isValid && !this.isValid())
            ? "null"
            : "point";
          this.selected && (this.state = "select");
          "name" in this &&
            "undefined" === typeof b &&
            d.xAxis &&
            d.xAxis.hasNames &&
            (this.x = d.xAxis.nameToX(this));
          "undefined" === typeof this.x && d
            ? (this.x = "undefined" === typeof b ? d.autoIncrement() : b)
            : D(e.x) &&
              d.options.relativeXValue &&
              (this.x = d.autoIncrement(e.x));
          return this;
        };
        g.prototype.destroy = function () {
          function e() {
            if (b.graphic || b.graphics || b.dataLabel || b.dataLabels)
              w(b), b.destroyElements();
            for (f in b) b[f] = null;
          }
          var b = this,
            d = b.series,
            a = d.chart;
          d = d.options.dataSorting;
          var g = a.hoverPoints,
            k = v(b.series.chart.renderer.globalAnimation),
            f;
          b.legendItem && a.legend.destroyItem(b);
          g && (b.setState(), c(g, b), g.length || (a.hoverPoints = null));
          if (b === a.hoverPoint) b.onMouseOut();
          d && d.enabled
            ? (this.animateBeforeDestroy(), t(e, k.duration))
            : e();
          a.pointCount--;
        };
        g.prototype.destroyElements = function (e) {
          var b = this;
          e = b.getGraphicalProps(e);
          e.singular.forEach(function (d) {
            b[d] = b[d].destroy();
          });
          e.plural.forEach(function (d) {
            b[d].forEach(function (b) {
              b && b.element && b.destroy();
            });
            delete b[d];
          });
        };
        g.prototype.firePointEvent = function (e, b, d) {
          var a = this,
            c = this.series.options;
          (c.point.events[e] ||
            (a.options && a.options.events && a.options.events[e])) &&
            a.importEvents();
          "click" === e &&
            c.allowPointSelect &&
            (d = function (b) {
              a.select && a.select(null, b.ctrlKey || b.metaKey || b.shiftKey);
            });
          m(a, e, b, d);
        };
        g.prototype.getClassName = function () {
          return (
            "highcharts-point" +
            (this.selected ? " highcharts-point-select" : "") +
            (this.negative ? " highcharts-negative" : "") +
            (this.isNull ? " highcharts-null-point" : "") +
            ("undefined" !== typeof this.colorIndex
              ? " highcharts-color-" + this.colorIndex
              : "") +
            (this.options.className ? " " + this.options.className : "") +
            (this.zone && this.zone.className
              ? " " + this.zone.className.replace("highcharts-negative", "")
              : "")
          );
        };
        g.prototype.getGraphicalProps = function (e) {
          var b = this,
            d = [],
            a = { singular: [], plural: [] },
            c;
          e = e || { graphic: 1, dataLabel: 1 };
          e.graphic && d.push("graphic", "shadowGroup");
          e.dataLabel &&
            d.push("dataLabel", "dataLabelPath", "dataLabelUpper", "connector");
          for (c = d.length; c--; ) {
            var g = d[c];
            b[g] && a.singular.push(g);
          }
          ["graphic", "dataLabel", "connector"].forEach(function (d) {
            var c = d + "s";
            e[d] && b[c] && a.plural.push(c);
          });
          return a;
        };
        g.prototype.getLabelConfig = function () {
          return {
            x: this.category,
            y: this.y,
            color: this.color,
            colorIndex: this.colorIndex,
            key: this.name || this.category,
            series: this.series,
            point: this,
            percentage: this.percentage,
            total: this.total || this.stackTotal,
          };
        };
        g.prototype.getNestedProperty = function (e) {
          if (e)
            return 0 === e.indexOf("custom.") ? l(e, this.options) : this[e];
        };
        g.prototype.getZone = function () {
          var e = this.series,
            b = e.zones;
          e = e.zoneAxis || "y";
          var d,
            a = 0;
          for (d = b[a]; this[e] >= d.value; ) d = b[++a];
          this.nonZonedColor || (this.nonZonedColor = this.color);
          this.color =
            d && d.color && !this.options.color ? d.color : this.nonZonedColor;
          return d;
        };
        g.prototype.hasNewShapeType = function () {
          return (
            (this.graphic &&
              (this.graphic.symbolName || this.graphic.element.nodeName)) !==
            this.shapeType
          );
        };
        g.prototype.init = function (e, b, d) {
          this.series = e;
          this.applyOptions(b, d);
          this.id = n(this.id) ? this.id : k();
          this.resolveColor();
          e.chart.pointCount++;
          m(this, "afterInit");
          return this;
        };
        g.prototype.isValid = function () {
          return null !== this.x && D(this.y);
        };
        g.prototype.optionsToObject = function (e) {
          var b = this.series,
            d = b.options.keys,
            a = d || b.pointArrayMap || ["y"],
            c = a.length,
            k = {},
            f = 0,
            t = 0;
          if (D(e) || null === e) k[a[0]] = e;
          else if (p(e))
            for (
              !d &&
              e.length > c &&
              ((b = typeof e[0]),
              "string" === b ? (k.name = e[0]) : "number" === b && (k.x = e[0]),
              f++);
              t < c;

            )
              (d && "undefined" === typeof e[f]) ||
                (0 < a[t].indexOf(".")
                  ? g.prototype.setNestedProperty(k, e[f], a[t])
                  : (k[a[t]] = e[f])),
                f++,
                t++;
          else
            "object" === typeof e &&
              ((k = e),
              e.dataLabels && (b._hasPointLabels = !0),
              e.marker && (b._hasPointMarkers = !0));
          return k;
        };
        g.prototype.pos = function (e, b) {
          void 0 === b && (b = this.plotY);
          var d = this.plotX,
            a = this.series,
            c = a.chart,
            g = a.xAxis;
          a = a.yAxis;
          var k = 0,
            f = 0;
          if (D(d) && D(b))
            return (
              e && ((k = g ? g.pos : c.plotLeft), (f = a ? a.pos : c.plotTop)),
              c.inverted && g && a
                ? [a.len - b + f, g.len - d + k]
                : [d + k, b + f]
            );
        };
        g.prototype.resolveColor = function () {
          var e = this.series,
            b = e.chart.styledMode;
          var d = e.chart.options.chart.colorCount;
          delete this.nonZonedColor;
          if (e.options.colorByPoint) {
            if (!b) {
              d = e.options.colors || e.chart.options.colors;
              var a = d[e.colorCounter];
              d = d.length;
            }
            b = e.colorCounter;
            e.colorCounter++;
            e.colorCounter === d && (e.colorCounter = 0);
          } else b || (a = e.color), (b = e.colorIndex);
          this.colorIndex = y(this.options.colorIndex, b);
          this.color = y(this.options.color, a);
        };
        g.prototype.setNestedProperty = function (e, b, d) {
          d.split(".").reduce(function (d, e, a, c) {
            d[e] = c.length - 1 === a ? b : G(d[e], !0) ? d[e] : {};
            return d[e];
          }, e);
          return e;
        };
        g.prototype.shouldDraw = function () {
          return !this.isNull;
        };
        g.prototype.tooltipFormatter = function (e) {
          var b = this.series,
            d = b.tooltipOptions,
            a = y(d.valueDecimals, ""),
            c = d.valuePrefix || "",
            g = d.valueSuffix || "";
          b.chart.styledMode && (e = b.chart.tooltip.styledModeFormat(e));
          (b.pointArrayMap || ["y"]).forEach(function (b) {
            b = "{point." + b;
            if (c || g) e = e.replace(RegExp(b + "}", "g"), c + b + "}" + g);
            e = e.replace(RegExp(b + "}", "g"), b + ":,." + a + "f}");
          });
          return x(e, { point: this, series: this.series }, b.chart);
        };
        g.prototype.update = function (e, b, d, a) {
          function c() {
            g.applyOptions(e);
            var a = k && g.hasMockGraphic;
            a = null === g.y ? !a : a;
            k && a && ((g.graphic = k.destroy()), delete g.hasMockGraphic);
            G(e, !0) &&
              (k &&
                k.element &&
                e &&
                e.marker &&
                "undefined" !== typeof e.marker.symbol &&
                (g.graphic = k.destroy()),
              e &&
                e.dataLabels &&
                g.dataLabel &&
                (g.dataLabel = g.dataLabel.destroy()),
              g.connector && (g.connector = g.connector.destroy()));
            h = g.index;
            r.updateParallelArrays(g, h);
            t.data[h] =
              G(t.data[h], !0) || G(e, !0) ? g.options : y(e, t.data[h]);
            r.isDirty = r.isDirtyData = !0;
            !r.fixedBox && r.hasCartesianSeries && (f.isDirtyBox = !0);
            "point" === t.legendType && (f.isDirtyLegend = !0);
            b && f.redraw(d);
          }
          var g = this,
            r = g.series,
            k = g.graphic,
            f = r.chart,
            t = r.options,
            h;
          b = y(b, !0);
          !1 === a ? c() : g.firePointEvent("update", { options: e }, c);
        };
        g.prototype.remove = function (e, b) {
          this.series.removePoint(this.series.data.indexOf(this), e, b);
        };
        g.prototype.select = function (e, b) {
          var d = this,
            a = d.series,
            g = a.chart;
          this.selectedStaging = e = y(e, !d.selected);
          d.firePointEvent(
            e ? "select" : "unselect",
            { accumulate: b },
            function () {
              d.selected = d.options.selected = e;
              a.options.data[a.data.indexOf(d)] = d.options;
              d.setState(e && "select");
              b ||
                g.getSelectedPoints().forEach(function (b) {
                  var e = b.series;
                  b.selected &&
                    b !== d &&
                    ((b.selected = b.options.selected = !1),
                    (e.options.data[e.data.indexOf(b)] = b.options),
                    b.setState(
                      g.hoverPoints && e.options.inactiveOtherPoints
                        ? "inactive"
                        : ""
                    ),
                    b.firePointEvent("unselect"));
                });
            }
          );
          delete this.selectedStaging;
        };
        g.prototype.onMouseOver = function (e) {
          var b = this.series.chart,
            d = b.pointer;
          e = e
            ? d.normalize(e)
            : d.getChartCoordinatesFromPoint(this, b.inverted);
          d.runPointActions(e, this);
        };
        g.prototype.onMouseOut = function () {
          var e = this.series.chart;
          this.firePointEvent("mouseOut");
          this.series.options.inactiveOtherPoints ||
            (e.hoverPoints || []).forEach(function (b) {
              b.setState();
            });
          e.hoverPoints = e.hoverPoint = null;
        };
        g.prototype.importEvents = function () {
          if (!this.hasImportedEvents) {
            var e = this,
              b = H(e.series.options.point, e.options).events;
            e.events = b;
            K(b, function (b, a) {
              f(b) && u(e, a, b);
            });
            this.hasImportedEvents = !0;
          }
        };
        g.prototype.setState = function (e, b) {
          var d = this.series,
            g = this.state,
            c = d.options.states[e || "normal"] || {},
            k = F.plotOptions[d.type].marker && d.options.marker,
            f = k && !1 === k.enabled,
            t = (k && k.states && k.states[e || "normal"]) || {},
            l = !1 === t.enabled,
            w = this.marker || {},
            p = d.chart,
            n = k && d.markerAttribs,
            u = d.halo,
            v,
            q = d.stateMarkerGraphic;
          e = e || "";
          if (
            !(
              (e === this.state && !b) ||
              (this.selected && "select" !== e) ||
              !1 === c.enabled ||
              (e && (l || (f && !1 === t.enabled))) ||
              (e && w.states && w.states[e] && !1 === w.states[e].enabled)
            )
          ) {
            this.state = e;
            n && (v = d.markerAttribs(this, e));
            if (this.graphic && !this.hasMockGraphic) {
              g && this.graphic.removeClass("highcharts-point-" + g);
              e && this.graphic.addClass("highcharts-point-" + e);
              if (!p.styledMode) {
                g = d.pointAttribs(this, e);
                var M = y(p.options.chart.animation, c.animation);
                var G = g.opacity;
                d.options.inactiveOtherPoints &&
                  D(G) &&
                  ((this.dataLabels || []).forEach(function (b) {
                    b &&
                      !b.hasClass("highcharts-data-label-hidden") &&
                      b.animate({ opacity: G }, M);
                  }),
                  this.connector && this.connector.animate({ opacity: G }, M));
                this.graphic.animate(g, M);
              }
              v &&
                this.graphic.animate(
                  v,
                  y(p.options.chart.animation, t.animation, k.animation)
                );
              q && q.hide();
            } else {
              if (e && t) {
                k = w.symbol || d.symbol;
                q && q.currentSymbol !== k && (q = q.destroy());
                if (v)
                  if (q) q[b ? "animate" : "attr"]({ x: v.x, y: v.y });
                  else
                    k &&
                      ((d.stateMarkerGraphic = q =
                        p.renderer
                          .symbol(k, v.x, v.y, v.width, v.height)
                          .add(d.markerGroup)),
                      (q.currentSymbol = k));
                !p.styledMode &&
                  q &&
                  "inactive" !== this.state &&
                  q.attr(d.pointAttribs(this, e));
              }
              q &&
                (q[e && this.isInside ? "show" : "hide"](),
                (q.element.point = this),
                q.addClass(this.getClassName(), !0));
            }
            c = c.halo;
            v = ((q = this.graphic || q) && q.visibility) || "inherit";
            c && c.size && q && "hidden" !== v && !this.isCluster
              ? (u || (d.halo = u = p.renderer.path().add(q.parentGroup)),
                u.show()[b ? "animate" : "attr"]({ d: this.haloPath(c.size) }),
                u.attr({
                  class:
                    "highcharts-halo highcharts-color-" +
                    y(this.colorIndex, d.colorIndex) +
                    (this.className ? " " + this.className : ""),
                  visibility: v,
                  zIndex: -1,
                }),
                (u.point = this),
                p.styledMode ||
                  u.attr(
                    h(
                      {
                        fill: this.color || d.color,
                        "fill-opacity": c.opacity,
                      },
                      a.filterUserAttributes(c.attributes || {})
                    )
                  ))
              : u &&
                u.point &&
                u.point.haloPath &&
                u.animate({ d: u.point.haloPath(0) }, null, u.hide);
            m(this, "afterSetState", { state: e });
          }
        };
        g.prototype.haloPath = function (e) {
          var b = this.pos();
          return b
            ? this.series.chart.renderer.symbols.circle(
                Math.floor(b[0]) - e,
                b[1] - e,
                2 * e,
                2 * e
              )
            : [];
        };
        return g;
      })();
      ("");
      return q;
    }
  );
  J(
    a,
    "Core/Pointer.js",
    [
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Tooltip.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E) {
      var v = a.parse,
        C = q.charts,
        F = q.noop,
        x = E.addEvent,
        u = E.attr,
        n = E.css,
        c = E.defined,
        h = E.extend,
        m = E.find,
        l = E.fireEvent,
        p = E.isNumber,
        f = E.isObject,
        D = E.objectEach,
        G = E.offset,
        H = E.pick,
        K = E.splat;
      a = (function () {
        function a(a, c) {
          this.lastValidTouch = {};
          this.pinchDown = [];
          this.runChartClick = !1;
          this.eventsToUnbind = [];
          this.chart = a;
          this.hasDragged = !1;
          this.options = c;
          this.init(a, c);
        }
        a.prototype.applyInactiveState = function (a) {
          var c = [],
            k;
          (a || []).forEach(function (a) {
            k = a.series;
            c.push(k);
            k.linkedParent && c.push(k.linkedParent);
            k.linkedSeries && (c = c.concat(k.linkedSeries));
            k.navigatorSeries && c.push(k.navigatorSeries);
          });
          this.chart.series.forEach(function (a) {
            -1 === c.indexOf(a)
              ? a.setState("inactive", !0)
              : a.options.inactiveOtherPoints &&
                a.setAllPointsToState("inactive");
          });
        };
        a.prototype.destroy = function () {
          var c = this;
          this.eventsToUnbind.forEach(function (a) {
            return a();
          });
          this.eventsToUnbind = [];
          q.chartCount ||
            (a.unbindDocumentMouseUp &&
              (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()),
            a.unbindDocumentTouchEnd &&
              (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
          clearInterval(c.tooltipTimeout);
          D(c, function (a, k) {
            c[k] = void 0;
          });
        };
        a.prototype.getSelectionMarkerAttrs = function (a, c) {
          var k = this,
            g = {
              args: { chartX: a, chartY: c },
              attrs: {},
              shapeType: "rect",
            };
          l(this, "getSelectionMarkerAttrs", g, function (e) {
            var b = k.chart,
              d = k.mouseDownX;
            d = void 0 === d ? 0 : d;
            var g = k.mouseDownY;
            g = void 0 === g ? 0 : g;
            var f = k.zoomHor,
              t = k.zoomVert;
            e = e.attrs;
            e.x = b.plotLeft;
            e.y = b.plotTop;
            e.width = f ? 1 : b.plotWidth;
            e.height = t ? 1 : b.plotHeight;
            f &&
              ((b = a - d),
              (e.width = Math.abs(b)),
              (e.x = (0 < b ? 0 : b) + d));
            t &&
              ((b = c - g),
              (e.height = Math.abs(b)),
              (e.y = (0 < b ? 0 : b) + g));
          });
          return g;
        };
        a.prototype.drag = function (a) {
          var c = this.chart,
            k = c.options.chart,
            g = c.plotLeft,
            e = c.plotTop,
            b = c.plotWidth,
            d = c.plotHeight,
            r = this.mouseDownX || 0,
            t = this.mouseDownY || 0,
            h = f(k.panning) ? k.panning && k.panning.enabled : k.panning,
            l = k.panKey && a[k.panKey + "Key"],
            m = a.chartX,
            p = a.chartY,
            n = this.selectionMarker;
          (n && n.touch) ||
            (m < g ? (m = g) : m > g + b && (m = g + b),
            p < e ? (p = e) : p > e + d && (p = e + d),
            (this.hasDragged = Math.sqrt(
              Math.pow(r - m, 2) + Math.pow(t - p, 2)
            )),
            10 < this.hasDragged &&
              ((g = c.isInsidePlot(r - g, t - e, { visiblePlotOnly: !0 })),
              (p = this.getSelectionMarkerAttrs(m, p)),
              (m = p.shapeType),
              (p = p.attrs),
              (!c.hasCartesianSeries && !c.mapView) ||
                (!this.zoomX && !this.zoomY) ||
                !g ||
                l ||
                n ||
                ((this.selectionMarker = n = c.renderer[m]()),
                n
                  .attr({ class: "highcharts-selection-marker", zIndex: 7 })
                  .add(),
                c.styledMode ||
                  n.attr({
                    fill:
                      k.selectionMarkerFill ||
                      v("#335cad").setOpacity(0.25).get(),
                  })),
              n && n.attr(p),
              g && !n && h && c.pan(a, k.panning)));
        };
        a.prototype.dragStart = function (a) {
          var c = this.chart;
          c.mouseIsDown = a.type;
          c.cancelClick = !1;
          c.mouseDownX = this.mouseDownX = a.chartX;
          c.mouseDownY = this.mouseDownY = a.chartY;
        };
        a.prototype.getSelectionBox = function (a) {
          var c = { args: { marker: a }, result: {} };
          l(this, "getSelectionBox", c, function (c) {
            c.result = {
              x: a.attr ? +a.attr("x") : a.x,
              y: a.attr ? +a.attr("y") : a.y,
              width: a.attr ? a.attr("width") : a.width,
              height: a.attr ? a.attr("height") : a.height,
            };
          });
          return c.result;
        };
        a.prototype.drop = function (a) {
          var f = this,
            k = this.chart,
            g = this.hasPinched;
          if (this.selectionMarker) {
            var e = this.getSelectionBox(this.selectionMarker),
              b = e.x,
              d = e.y,
              r = e.width,
              t = e.height,
              m = {
                originalEvent: a,
                xAxis: [],
                yAxis: [],
                x: b,
                y: d,
                width: r,
                height: t,
              },
              u = !!k.mapView;
            if (this.hasDragged || g)
              k.axes.forEach(function (e) {
                if (
                  e.zoomEnabled &&
                  c(e.min) &&
                  (g || f[{ xAxis: "zoomX", yAxis: "zoomY" }[e.coll]]) &&
                  p(b) &&
                  p(d) &&
                  p(r) &&
                  p(t)
                ) {
                  var k = e.horiz,
                    h = "touchend" === a.type ? e.minPixelPadding : 0,
                    z = e.toValue((k ? b : d) + h);
                  k = e.toValue((k ? b + r : d + t) - h);
                  m[e.coll].push({
                    axis: e,
                    min: Math.min(z, k),
                    max: Math.max(z, k),
                  });
                  u = !0;
                }
              }),
                u &&
                  l(k, "selection", m, function (b) {
                    k.zoom(h(b, g ? { animation: !1 } : null));
                  });
            p(k.index) &&
              (this.selectionMarker = this.selectionMarker.destroy());
            g && this.scaleGroups();
          }
          k &&
            p(k.index) &&
            (n(k.container, { cursor: k._cursor }),
            (k.cancelClick = 10 < this.hasDragged),
            (k.mouseIsDown = this.hasDragged = this.hasPinched = !1),
            (this.pinchDown = []));
        };
        a.prototype.findNearestKDPoint = function (a, c, k) {
          var g;
          a.forEach(function (e) {
            var b =
              !(e.noSharedTooltip && c) &&
              0 > e.options.findNearestPointBy.indexOf("y");
            e = e.searchPoint(k, b);
            if ((b = f(e, !0) && e.series) && !(b = !f(g, !0))) {
              b = g.distX - e.distX;
              var d = g.dist - e.dist,
                a =
                  (e.series.group && e.series.group.zIndex) -
                  (g.series.group && g.series.group.zIndex);
              b =
                0 <
                (0 !== b && c
                  ? b
                  : 0 !== d
                  ? d
                  : 0 !== a
                  ? a
                  : g.series.index > e.series.index
                  ? -1
                  : 1);
            }
            b && (g = e);
          });
          return g;
        };
        a.prototype.getChartCoordinatesFromPoint = function (a, c) {
          var k = a.series,
            g = k.xAxis;
          k = k.yAxis;
          var e = a.shapeArgs;
          if (g && k) {
            var b = H(a.clientX, a.plotX),
              d = a.plotY || 0;
            a.isNode && e && p(e.x) && p(e.y) && ((b = e.x), (d = e.y));
            return c
              ? { chartX: k.len + k.pos - d, chartY: g.len + g.pos - b }
              : { chartX: b + g.pos, chartY: d + k.pos };
          }
          if (e && e.x && e.y) return { chartX: e.x, chartY: e.y };
        };
        a.prototype.getChartPosition = function () {
          if (this.chartPosition) return this.chartPosition;
          var a = this.chart.container,
            c = G(a);
          this.chartPosition = {
            left: c.left,
            top: c.top,
            scaleX: 1,
            scaleY: 1,
          };
          var k = a.offsetWidth;
          a = a.offsetHeight;
          2 < k &&
            2 < a &&
            ((this.chartPosition.scaleX = c.width / k),
            (this.chartPosition.scaleY = c.height / a));
          return this.chartPosition;
        };
        a.prototype.getCoordinates = function (a) {
          var c = { xAxis: [], yAxis: [] };
          this.chart.axes.forEach(function (k) {
            c[k.isXAxis ? "xAxis" : "yAxis"].push({
              axis: k,
              value: k.toValue(a[k.horiz ? "chartX" : "chartY"]),
            });
          });
          return c;
        };
        a.prototype.getHoverData = function (a, c, k, g, e, b) {
          var d = [];
          g = !(!g || !a);
          var r = function (b) {
              return (
                b.visible &&
                !(!e && b.directTouch) &&
                H(b.options.enableMouseTracking, !0)
              );
            },
            h = {
              chartX: b ? b.chartX : void 0,
              chartY: b ? b.chartY : void 0,
              shared: e,
            };
          l(this, "beforeGetHoverData", h);
          var t =
            c && !c.stickyTracking
              ? [c]
              : k.filter(function (b) {
                  return b.stickyTracking && (h.filter || r)(b);
                });
          var w = g || !b ? a : this.findNearestKDPoint(t, e, b);
          c = w && w.series;
          w &&
            (e && !c.noSharedTooltip
              ? ((t = k.filter(function (b) {
                  return h.filter ? h.filter(b) : r(b) && !b.noSharedTooltip;
                })),
                t.forEach(function (b) {
                  var a = m(b.points, function (b) {
                    return b.x === w.x && !b.isNull;
                  });
                  f(a) &&
                    (b.boosted && b.boost && (a = b.boost.getPoint(a)),
                    d.push(a));
                }))
              : d.push(w));
          h = { hoverPoint: w };
          l(this, "afterGetHoverData", h);
          return { hoverPoint: h.hoverPoint, hoverSeries: c, hoverPoints: d };
        };
        a.prototype.getPointFromEvent = function (a) {
          a = a.target;
          for (var c; a && !c; ) (c = a.point), (a = a.parentNode);
          return c;
        };
        a.prototype.onTrackerMouseOut = function (a) {
          a = a.relatedTarget || a.toElement;
          var c = this.chart.hoverSeries;
          this.isDirectTouch = !1;
          if (
            !(
              !c ||
              !a ||
              c.stickyTracking ||
              this.inClass(a, "highcharts-tooltip") ||
              (this.inClass(a, "highcharts-series-" + c.index) &&
                this.inClass(a, "highcharts-tracker"))
            )
          )
            c.onMouseOut();
        };
        a.prototype.inClass = function (a, c) {
          for (var k; a; ) {
            if ((k = u(a, "class"))) {
              if (-1 !== k.indexOf(c)) return !0;
              if (-1 !== k.indexOf("highcharts-container")) return !1;
            }
            a = a.parentElement;
          }
        };
        a.prototype.init = function (a, c) {
          this.options = c;
          this.chart = a;
          this.runChartClick = !(!c.chart.events || !c.chart.events.click);
          this.pinchDown = [];
          this.lastValidTouch = {};
          A && (a.tooltip = new A(a, c.tooltip));
          this.setDOMEvents();
        };
        a.prototype.normalize = function (a, c) {
          var k = a.touches,
            g = k
              ? k.length
                ? k.item(0)
                : H(k.changedTouches, a.changedTouches)[0]
              : a;
          c || (c = this.getChartPosition());
          k = g.pageX - c.left;
          g = g.pageY - c.top;
          k /= c.scaleX;
          g /= c.scaleY;
          return h(a, { chartX: Math.round(k), chartY: Math.round(g) });
        };
        a.prototype.onContainerClick = function (a) {
          var c = this.chart,
            k = c.hoverPoint;
          a = this.normalize(a);
          var g = c.plotLeft,
            e = c.plotTop;
          c.cancelClick ||
            (k && this.inClass(a.target, "highcharts-tracker")
              ? (l(k.series, "click", h(a, { point: k })),
                c.hoverPoint && k.firePointEvent("click", a))
              : (h(a, this.getCoordinates(a)),
                c.isInsidePlot(a.chartX - g, a.chartY - e, {
                  visiblePlotOnly: !0,
                }) && l(c, "click", a)));
        };
        a.prototype.onContainerMouseDown = function (a) {
          var c = 1 === ((a.buttons || a.button) & 1);
          a = this.normalize(a);
          if (q.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
          if ("undefined" === typeof a.button || c)
            this.zoomOption(a),
              c && a.preventDefault && a.preventDefault(),
              this.dragStart(a);
        };
        a.prototype.onContainerMouseLeave = function (c) {
          var f = C[H(a.hoverChartIndex, -1)],
            k = this.chart.tooltip;
          c = this.normalize(c);
          f &&
            (c.relatedTarget || c.toElement) &&
            (f.pointer.reset(), (f.pointer.chartPosition = void 0));
          k && !k.isHidden && this.reset();
        };
        a.prototype.onContainerMouseEnter = function (a) {
          delete this.chartPosition;
        };
        a.prototype.onContainerMouseMove = function (a) {
          var c = this.chart,
            k = c.tooltip;
          a = this.normalize(a);
          this.setHoverChartIndex();
          a.preventDefault || (a.returnValue = !1);
          ("mousedown" === c.mouseIsDown || this.touchSelect(a)) &&
            this.drag(a);
          c.openMenu ||
            (!this.inClass(a.target, "highcharts-tracker") &&
              !c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
                visiblePlotOnly: !0,
              })) ||
            (k && k.shouldStickOnContact(a)) ||
            (this.inClass(a.target, "highcharts-no-tooltip")
              ? this.reset(!1, 0)
              : this.runPointActions(a));
        };
        a.prototype.onDocumentTouchEnd = function (c) {
          var f = C[H(a.hoverChartIndex, -1)];
          f && f.pointer.drop(c);
        };
        a.prototype.onContainerTouchMove = function (a) {
          if (this.touchSelect(a)) this.onContainerMouseMove(a);
          else this.touch(a);
        };
        a.prototype.onContainerTouchStart = function (a) {
          if (this.touchSelect(a)) this.onContainerMouseDown(a);
          else this.zoomOption(a), this.touch(a, !0);
        };
        a.prototype.onDocumentMouseMove = function (a) {
          var c = this.chart,
            k = c.tooltip,
            g = this.chartPosition;
          a = this.normalize(a, g);
          !g ||
            c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
              visiblePlotOnly: !0,
            }) ||
            (k && k.shouldStickOnContact(a)) ||
            this.inClass(a.target, "highcharts-tracker") ||
            this.reset();
        };
        a.prototype.onDocumentMouseUp = function (c) {
          var f = C[H(a.hoverChartIndex, -1)];
          f && f.pointer.drop(c);
        };
        a.prototype.pinch = function (a) {
          var c = this,
            k = c.chart,
            g = c.pinchDown,
            e = a.touches || [],
            b = e.length,
            d = c.lastValidTouch,
            r = c.hasZoom,
            f = {},
            m =
              1 === b &&
              ((c.inClass(a.target, "highcharts-tracker") &&
                k.runTrackerClick) ||
                c.runChartClick),
            t = {},
            p = c.chart.tooltip;
          p = 1 === b && H(p && p.options.followTouchMove, !0);
          var n = c.selectionMarker;
          1 < b ? (c.initiated = !0) : p && (c.initiated = !1);
          r && c.initiated && !m && !1 !== a.cancelable && a.preventDefault();
          [].map.call(e, function (b) {
            return c.normalize(b);
          });
          "touchstart" === a.type
            ? ([].forEach.call(e, function (b, d) {
                g[d] = { chartX: b.chartX, chartY: b.chartY };
              }),
              (d.x = [g[0].chartX, g[1] && g[1].chartX]),
              (d.y = [g[0].chartY, g[1] && g[1].chartY]),
              k.axes.forEach(function (b) {
                if (b.zoomEnabled) {
                  var d = k.bounds[b.horiz ? "h" : "v"],
                    a = b.minPixelPadding,
                    e = b.toPixels(
                      Math.min(H(b.options.min, b.dataMin), b.dataMin)
                    ),
                    c = b.toPixels(
                      Math.max(H(b.options.max, b.dataMax), b.dataMax)
                    ),
                    g = Math.max(e, c);
                  d.min = Math.min(b.pos, Math.min(e, c) - a);
                  d.max = Math.max(b.pos + b.len, g + a);
                }
              }),
              (c.res = !0))
            : p
            ? this.runPointActions(c.normalize(a))
            : g.length &&
              (l(k, "touchpan", { originalEvent: a }, function () {
                n ||
                  (c.selectionMarker = n =
                    h({ destroy: F, touch: !0 }, k.plotBox));
                c.pinchTranslate(g, e, f, n, t, d);
                c.hasPinched = r;
                c.scaleGroups(f, t);
              }),
              c.res && ((c.res = !1), this.reset(!1, 0)));
        };
        a.prototype.pinchTranslate = function (a, c, k, g, e, b) {
          this.zoomHor && this.pinchTranslateDirection(!0, a, c, k, g, e, b);
          this.zoomVert && this.pinchTranslateDirection(!1, a, c, k, g, e, b);
        };
        a.prototype.pinchTranslateDirection = function (
          a,
          c,
          k,
          g,
          e,
          b,
          d,
          r
        ) {
          var f = this.chart,
            h = a ? "x" : "y",
            l = a ? "X" : "Y",
            m = "chart" + l,
            t = a ? "width" : "height",
            p = f["plot" + (a ? "Left" : "Top")],
            w = f.inverted,
            n = f.bounds[a ? "h" : "v"],
            u = 1 === c.length,
            y = c[0][m],
            v = !u && c[1][m];
          c = function () {
            "number" === typeof G &&
              20 < Math.abs(y - v) &&
              (Q = r || Math.abs(q - G) / Math.abs(y - v));
            D = (p - q) / Q + y;
            M = f["plot" + (a ? "Width" : "Height")] / Q;
          };
          var M,
            D,
            Q = r || 1,
            q = k[0][m],
            G = !u && k[1][m];
          c();
          k = D;
          if (k < n.min) {
            k = n.min;
            var x = !0;
          } else k + M > n.max && ((k = n.max - M), (x = !0));
          x
            ? ((q -= 0.8 * (q - d[h][0])),
              "number" === typeof G && (G -= 0.8 * (G - d[h][1])),
              c())
            : (d[h] = [q, G]);
          w || ((b[h] = D - p), (b[t] = M));
          b = w ? 1 / Q : Q;
          e[t] = M;
          e[h] = k;
          g[w ? (a ? "scaleY" : "scaleX") : "scale" + l] = Q;
          g["translate" + l] = b * p + (q - b * y);
        };
        a.prototype.reset = function (a, c) {
          var k = this.chart,
            g = k.hoverSeries,
            e = k.hoverPoint,
            b = k.hoverPoints,
            d = k.tooltip,
            r = d && d.shared ? b : e;
          a &&
            r &&
            K(r).forEach(function (b) {
              b.series.isCartesian &&
                "undefined" === typeof b.plotX &&
                (a = !1);
            });
          if (a)
            d &&
              r &&
              K(r).length &&
              (d.refresh(r),
              d.shared && b
                ? b.forEach(function (b) {
                    b.setState(b.state, !0);
                    b.series.isCartesian &&
                      (b.series.xAxis.crosshair &&
                        b.series.xAxis.drawCrosshair(null, b),
                      b.series.yAxis.crosshair &&
                        b.series.yAxis.drawCrosshair(null, b));
                  })
                : e &&
                  (e.setState(e.state, !0),
                  k.axes.forEach(function (b) {
                    b.crosshair &&
                      e.series[b.coll] === b &&
                      b.drawCrosshair(null, e);
                  })));
          else {
            if (e) e.onMouseOut();
            b &&
              b.forEach(function (b) {
                b.setState();
              });
            if (g) g.onMouseOut();
            d && d.hide(c);
            this.unDocMouseMove &&
              (this.unDocMouseMove = this.unDocMouseMove());
            k.axes.forEach(function (b) {
              b.hideCrosshair();
            });
            this.hoverX = k.hoverPoints = k.hoverPoint = null;
          }
        };
        a.prototype.runPointActions = function (c, f, k) {
          var g = this.chart,
            e = g.tooltip && g.tooltip.options.enabled ? g.tooltip : void 0,
            b = e ? e.shared : !1,
            d = f || g.hoverPoint,
            r = (d && d.series) || g.hoverSeries;
          f = this.getHoverData(
            d,
            r,
            g.series,
            (!c || "touchmove" !== c.type) &&
              (!!f || (r && r.directTouch && this.isDirectTouch)),
            b,
            c
          );
          d = f.hoverPoint;
          r = f.hoverSeries;
          var h = f.hoverPoints;
          f = r && r.tooltipOptions.followPointer && !r.tooltipOptions.split;
          var l = b && r && !r.noSharedTooltip;
          if (d && (k || d !== g.hoverPoint || (e && e.isHidden))) {
            (g.hoverPoints || []).forEach(function (b) {
              -1 === h.indexOf(b) && b.setState();
            });
            if (g.hoverSeries !== r) r.onMouseOver();
            this.applyInactiveState(h);
            (h || []).forEach(function (b) {
              b.setState("hover");
            });
            g.hoverPoint && g.hoverPoint.firePointEvent("mouseOut");
            if (!d.series) return;
            g.hoverPoints = h;
            g.hoverPoint = d;
            d.firePointEvent("mouseOver", void 0, function () {
              e && d && e.refresh(l ? h : d, c);
            });
          } else
            f &&
              e &&
              !e.isHidden &&
              ((k = e.getAnchor([{}], c)),
              g.isInsidePlot(k[0], k[1], { visiblePlotOnly: !0 }) &&
                e.updatePosition({ plotX: k[0], plotY: k[1] }));
          this.unDocMouseMove ||
            ((this.unDocMouseMove = x(
              g.container.ownerDocument,
              "mousemove",
              function (b) {
                var d = C[a.hoverChartIndex];
                if (d) d.pointer.onDocumentMouseMove(b);
              }
            )),
            this.eventsToUnbind.push(this.unDocMouseMove));
          g.axes.forEach(function (b) {
            var d = H((b.crosshair || {}).snap, !0),
              a;
            d &&
              (((a = g.hoverPoint) && a.series[b.coll] === b) ||
                (a = m(h, function (d) {
                  return d.series && d.series[b.coll] === b;
                })));
            a || !d ? b.drawCrosshair(c, a) : b.hideCrosshair();
          });
        };
        a.prototype.scaleGroups = function (a, c) {
          var k = this.chart;
          k.series.forEach(function (g) {
            var e = a || g.getPlotBox();
            g.group &&
              ((g.xAxis && g.xAxis.zoomEnabled) || k.mapView) &&
              (g.group.attr(e),
              g.markerGroup &&
                (g.markerGroup.attr(e),
                g.markerGroup.clip(c ? k.clipRect : null)),
              g.dataLabelsGroup && g.dataLabelsGroup.attr(e));
          });
          k.clipRect.attr(c || k.clipBox);
        };
        a.prototype.setDOMEvents = function () {
          var c = this,
            f = this.chart.container,
            k = f.ownerDocument;
          f.onmousedown = this.onContainerMouseDown.bind(this);
          f.onmousemove = this.onContainerMouseMove.bind(this);
          f.onclick = this.onContainerClick.bind(this);
          this.eventsToUnbind.push(
            x(f, "mouseenter", this.onContainerMouseEnter.bind(this))
          );
          this.eventsToUnbind.push(
            x(f, "mouseleave", this.onContainerMouseLeave.bind(this))
          );
          a.unbindDocumentMouseUp ||
            (a.unbindDocumentMouseUp = x(
              k,
              "mouseup",
              this.onDocumentMouseUp.bind(this)
            ));
          for (
            var g = this.chart.renderTo.parentElement;
            g && "BODY" !== g.tagName;

          )
            this.eventsToUnbind.push(
              x(g, "scroll", function () {
                delete c.chartPosition;
              })
            ),
              (g = g.parentElement);
          q.hasTouch &&
            (this.eventsToUnbind.push(
              x(f, "touchstart", this.onContainerTouchStart.bind(this), {
                passive: !1,
              })
            ),
            this.eventsToUnbind.push(
              x(f, "touchmove", this.onContainerTouchMove.bind(this), {
                passive: !1,
              })
            ),
            a.unbindDocumentTouchEnd ||
              (a.unbindDocumentTouchEnd = x(
                k,
                "touchend",
                this.onDocumentTouchEnd.bind(this),
                { passive: !1 }
              )));
        };
        a.prototype.setHoverChartIndex = function () {
          var c = this.chart,
            f = q.charts[H(a.hoverChartIndex, -1)];
          if (f && f !== c)
            f.pointer.onContainerMouseLeave({ relatedTarget: c.container });
          (f && f.mouseIsDown) || (a.hoverChartIndex = c.index);
        };
        a.prototype.touch = function (a, c) {
          var k = this.chart,
            g;
          this.setHoverChartIndex();
          if (1 === a.touches.length)
            if (
              ((a = this.normalize(a)),
              (g = k.isInsidePlot(a.chartX - k.plotLeft, a.chartY - k.plotTop, {
                visiblePlotOnly: !0,
              })) && !k.openMenu)
            ) {
              c && this.runPointActions(a);
              if ("touchmove" === a.type) {
                c = this.pinchDown;
                var e = c[0]
                  ? 4 <=
                    Math.sqrt(
                      Math.pow(c[0].chartX - a.chartX, 2) +
                        Math.pow(c[0].chartY - a.chartY, 2)
                    )
                  : !1;
              }
              H(e, !0) && this.pinch(a);
            } else c && this.reset();
          else 2 === a.touches.length && this.pinch(a);
        };
        a.prototype.touchSelect = function (a) {
          return !(
            !this.chart.options.chart.zooming.singleTouch ||
            !a.touches ||
            1 !== a.touches.length
          );
        };
        a.prototype.zoomOption = function (a) {
          var c = this.chart,
            k = c.options.chart;
          c = c.inverted;
          var g = k.zooming.type || "";
          /touch/.test(a.type) && (g = H(k.zooming.pinchType, g));
          this.zoomX = a = /x/.test(g);
          this.zoomY = k = /y/.test(g);
          this.zoomHor = (a && !c) || (k && c);
          this.zoomVert = (k && !c) || (a && c);
          this.hasZoom = a || k;
        };
        return a;
      })();
      ("");
      return a;
    }
  );
  J(
    a,
    "Core/MSPointer.js",
    [a["Core/Globals.js"], a["Core/Pointer.js"], a["Core/Utilities.js"]],
    function (a, q, A) {
      function v() {
        var a = [];
        a.item = function (a) {
          return this[a];
        };
        m(f, function (c) {
          a.push({ pageX: c.pageX, pageY: c.pageY, target: c.target });
        });
        return a;
      }
      function B(a, c, f, h) {
        var l = F[q.hoverChartIndex || NaN];
        ("touch" !== a.pointerType &&
          a.pointerType !== a.MSPOINTER_TYPE_TOUCH) ||
          !l ||
          ((l = l.pointer),
          h(a),
          l[c]({
            type: f,
            target: a.currentTarget,
            preventDefault: u,
            touches: v(),
          }));
      }
      var C =
          (this && this.__extends) ||
          (function () {
            var a = function (c, f) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f]);
                };
              return a(c, f);
            };
            return function (c, f) {
              function h() {
                this.constructor = c;
              }
              a(c, f);
              c.prototype =
                null === f
                  ? Object.create(f)
                  : ((h.prototype = f.prototype), new h());
            };
          })(),
        F = a.charts,
        x = a.doc,
        u = a.noop,
        n = a.win,
        c = A.addEvent,
        h = A.css,
        m = A.objectEach,
        l = A.pick,
        p = A.removeEvent,
        f = {},
        D = !!n.PointerEvent;
      return (function (m) {
        function u() {
          return (null !== m && m.apply(this, arguments)) || this;
        }
        C(u, m);
        u.isRequired = function () {
          return !(a.hasTouch || (!n.PointerEvent && !n.MSPointerEvent));
        };
        u.prototype.batchMSEvents = function (a) {
          a(
            this.chart.container,
            D ? "pointerdown" : "MSPointerDown",
            this.onContainerPointerDown
          );
          a(
            this.chart.container,
            D ? "pointermove" : "MSPointerMove",
            this.onContainerPointerMove
          );
          a(x, D ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
        };
        u.prototype.destroy = function () {
          this.batchMSEvents(p);
          m.prototype.destroy.call(this);
        };
        u.prototype.init = function (a, c) {
          m.prototype.init.call(this, a, c);
          this.hasZoom &&
            h(a.container, {
              "-ms-touch-action": "none",
              "touch-action": "none",
            });
        };
        u.prototype.onContainerPointerDown = function (a) {
          B(a, "onContainerTouchStart", "touchstart", function (a) {
            f[a.pointerId] = {
              pageX: a.pageX,
              pageY: a.pageY,
              target: a.currentTarget,
            };
          });
        };
        u.prototype.onContainerPointerMove = function (a) {
          B(a, "onContainerTouchMove", "touchmove", function (a) {
            f[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };
            f[a.pointerId].target || (f[a.pointerId].target = a.currentTarget);
          });
        };
        u.prototype.onDocumentPointerUp = function (a) {
          B(a, "onDocumentTouchEnd", "touchend", function (a) {
            delete f[a.pointerId];
          });
        };
        u.prototype.setDOMEvents = function () {
          var a = this.chart.tooltip;
          m.prototype.setDOMEvents.call(this);
          (this.hasZoom || l(a && a.options.followTouchMove, !0)) &&
            this.batchMSEvents(c);
        };
        return u;
      })(q);
    }
  );
  J(
    a,
    "Core/Legend/Legend.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Globals.js"],
      a["Core/Series/Point.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C) {
      var v = a.animObject,
        x = a.setAnimation,
        u = q.format,
        n = A.marginNames,
        c = B.distribute,
        h = C.addEvent,
        m = C.createElement,
        l = C.css,
        p = C.defined,
        f = C.discardElement,
        D = C.find,
        G = C.fireEvent,
        H = C.isNumber,
        K = C.merge,
        y = C.pick,
        t = C.relativeLength,
        w = C.stableSort,
        k = C.syncTimeout;
      a = (function () {
        function a(a, b) {
          this.allItems = [];
          this.contentGroup = this.box = void 0;
          this.display = !1;
          this.group = void 0;
          this.offsetWidth =
            this.maxLegendWidth =
            this.maxItemWidth =
            this.legendWidth =
            this.legendHeight =
            this.lastLineHeight =
            this.lastItemY =
            this.itemY =
            this.itemX =
            this.itemMarginTop =
            this.itemMarginBottom =
            this.itemHeight =
            this.initialItemY =
              0;
          this.options = void 0;
          this.padding = 0;
          this.pages = [];
          this.proximate = !1;
          this.scrollGroup = void 0;
          this.widthOption =
            this.totalItemWidth =
            this.titleHeight =
            this.symbolWidth =
            this.symbolHeight =
              0;
          this.chart = a;
          this.init(a, b);
        }
        a.prototype.init = function (a, b) {
          this.chart = a;
          this.setOptions(b);
          b.enabled &&
            (this.render(),
            h(this.chart, "endResize", function () {
              this.legend.positionCheckboxes();
            }),
            this.proximate
              ? (this.unchartrender = h(this.chart, "render", function () {
                  this.legend.proximatePositions();
                  this.legend.positionItems();
                }))
              : this.unchartrender && this.unchartrender());
        };
        a.prototype.setOptions = function (a) {
          var b = y(a.padding, 8);
          this.options = a;
          this.chart.styledMode ||
            ((this.itemStyle = a.itemStyle),
            (this.itemHiddenStyle = K(this.itemStyle, a.itemHiddenStyle)));
          this.itemMarginTop = a.itemMarginTop || 0;
          this.itemMarginBottom = a.itemMarginBottom || 0;
          this.padding = b;
          this.initialItemY = b - 5;
          this.symbolWidth = y(a.symbolWidth, 16);
          this.pages = [];
          this.proximate = "proximate" === a.layout && !this.chart.inverted;
          this.baseline = void 0;
        };
        a.prototype.update = function (a, b) {
          var d = this.chart;
          this.setOptions(K(!0, this.options, a));
          this.destroy();
          d.isDirtyLegend = d.isDirtyBox = !0;
          y(b, !0) && d.redraw();
          G(this, "afterUpdate");
        };
        a.prototype.colorizeItem = function (a, b) {
          var d = a.legendItem || {},
            e = d.group,
            c = d.label,
            g = d.line;
          d = d.symbol;
          if (e)
            e[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
          if (!this.chart.styledMode) {
            var k = this.options;
            e = this.itemHiddenStyle.color;
            k = b ? k.itemStyle.color : e;
            var f = b ? a.color || e : e,
              h = a.options && a.options.marker,
              l = { fill: f };
            c && c.css({ fill: k, color: k });
            g && g.attr({ stroke: f });
            d &&
              (h &&
                d.isMarker &&
                ((l = a.pointAttribs()), b || (l.stroke = l.fill = e)),
              d.attr(l));
          }
          G(this, "afterColorizeItem", { item: a, visible: b });
        };
        a.prototype.positionItems = function () {
          this.allItems.forEach(this.positionItem, this);
          this.chart.isResizing || this.positionCheckboxes();
        };
        a.prototype.positionItem = function (a) {
          var b = this,
            d = a.legendItem || {},
            e = d.group,
            c = d.x;
          c = void 0 === c ? 0 : c;
          d = d.y;
          d = void 0 === d ? 0 : d;
          var g = this.options,
            k = g.symbolPadding,
            f = !g.rtl;
          g = a.checkbox;
          e &&
            e.element &&
            ((k = {
              translateX: f ? c : this.legendWidth - c - 2 * k - 4,
              translateY: d,
            }),
            e[p(e.translateY) ? "animate" : "attr"](k, void 0, function () {
              G(b, "afterPositionItem", { item: a });
            }));
          g && ((g.x = c), (g.y = d));
        };
        a.prototype.destroyItem = function (a) {
          for (
            var b = a.checkbox,
              d = a.legendItem || {},
              e = 0,
              c = ["group", "label", "line", "symbol"];
            e < c.length;
            e++
          ) {
            var g = c[e];
            d[g] && (d[g] = d[g].destroy());
          }
          b && f(b);
          a.legendItem = void 0;
        };
        a.prototype.destroy = function () {
          for (var a = 0, b = this.getAllItems(); a < b.length; a++)
            this.destroyItem(b[a]);
          a = 0;
          for (
            b = "clipRect up down pager nav box title group".split(" ");
            a < b.length;
            a++
          ) {
            var d = b[a];
            this[d] && (this[d] = this[d].destroy());
          }
          this.display = null;
        };
        a.prototype.positionCheckboxes = function () {
          var a = this.group && this.group.alignAttr,
            b = this.clipHeight || this.legendHeight,
            d = this.titleHeight;
          if (a) {
            var c = a.translateY;
            this.allItems.forEach(function (e) {
              var g = e.checkbox;
              if (g) {
                var r = c + d + g.y + (this.scrollOffset || 0) + 3;
                l(g, {
                  left: a.translateX + e.checkboxOffset + g.x - 20 + "px",
                  top: r + "px",
                  display:
                    this.proximate || (r > c - 6 && r < c + b - 6)
                      ? ""
                      : "none",
                });
              }
            }, this);
          }
        };
        a.prototype.renderTitle = function () {
          var a = this.options,
            b = this.padding,
            d = a.title,
            c = 0;
          d.text &&
            (this.title ||
              ((this.title = this.chart.renderer
                .label(
                  d.text,
                  b - 3,
                  b - 4,
                  void 0,
                  void 0,
                  void 0,
                  a.useHTML,
                  void 0,
                  "legend-title"
                )
                .attr({ zIndex: 1 })),
              this.chart.styledMode || this.title.css(d.style),
              this.title.add(this.group)),
            d.width || this.title.css({ width: this.maxLegendWidth + "px" }),
            (a = this.title.getBBox()),
            (c = a.height),
            (this.offsetWidth = a.width),
            this.contentGroup.attr({ translateY: c }));
          this.titleHeight = c;
        };
        a.prototype.setText = function (a) {
          var b = this.options;
          a.legendItem.label.attr({
            text: b.labelFormat
              ? u(b.labelFormat, a, this.chart)
              : b.labelFormatter.call(a),
          });
        };
        a.prototype.renderItem = function (a) {
          var b = (a.legendItem = a.legendItem || {}),
            d = this.chart,
            c = d.renderer,
            e = this.options,
            g = this.symbolWidth,
            k = e.symbolPadding || 0,
            f = this.itemStyle,
            h = this.itemHiddenStyle,
            l = "horizontal" === e.layout ? y(e.itemDistance, 20) : 0,
            m = !e.rtl,
            p = !a.series,
            t = !p && a.series.drawLegendSymbol ? a.series : a,
            n = t.options,
            w = this.createCheckboxForItem && n && n.showCheckbox,
            u = e.useHTML,
            D = a.options.className,
            Q = b.label;
          n = g + k + l + (w ? 20 : 0);
          Q ||
            ((b.group = c
              .g("legend-item")
              .addClass(
                "highcharts-" +
                  t.type +
                  "-series highcharts-color-" +
                  a.colorIndex +
                  (D ? " " + D : "") +
                  (p ? " highcharts-series-" + a.index : "")
              )
              .attr({ zIndex: 1 })
              .add(this.scrollGroup)),
            (b.label = Q = c.text("", m ? g + k : -k, this.baseline || 0, u)),
            d.styledMode || Q.css(K(a.visible ? f : h)),
            Q.attr({ align: m ? "left" : "right", zIndex: 2 }).add(b.group),
            this.baseline ||
              ((this.fontMetrics = c.fontMetrics(
                d.styledMode ? 12 : f.fontSize,
                Q
              )),
              (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
              Q.attr("y", this.baseline),
              (this.symbolHeight = e.symbolHeight || this.fontMetrics.f),
              e.squareSymbol &&
                ((this.symbolWidth = y(
                  e.symbolWidth,
                  Math.max(this.symbolHeight, 16)
                )),
                (n = this.symbolWidth + k + l + (w ? 20 : 0)),
                m && Q.attr("x", this.symbolWidth + k))),
            t.drawLegendSymbol(this, a),
            this.setItemEvents && this.setItemEvents(a, Q, u));
          w &&
            !a.checkbox &&
            this.createCheckboxForItem &&
            this.createCheckboxForItem(a);
          this.colorizeItem(a, a.visible);
          (!d.styledMode && f.width) ||
            Q.css({
              width:
                (e.itemWidth || this.widthOption || d.spacingBox.width) -
                n +
                "px",
            });
          this.setText(a);
          d = Q.getBBox();
          c = (this.fontMetrics && this.fontMetrics.h) || 0;
          a.itemWidth = a.checkboxOffset =
            e.itemWidth || b.labelWidth || d.width + n;
          this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
          this.totalItemWidth += a.itemWidth;
          this.itemHeight = a.itemHeight = Math.round(
            b.labelHeight || (d.height > 1.5 * c ? d.height : c)
          );
        };
        a.prototype.layoutItem = function (a) {
          var b = this.options,
            d = this.padding,
            c = "horizontal" === b.layout,
            e = a.itemHeight,
            g = this.itemMarginBottom,
            k = this.itemMarginTop,
            f = c ? y(b.itemDistance, 20) : 0,
            h = this.maxLegendWidth;
          b =
            b.alignColumns && this.totalItemWidth > h
              ? this.maxItemWidth
              : a.itemWidth;
          var l = a.legendItem || {};
          c &&
            this.itemX - d + b > h &&
            ((this.itemX = d),
            this.lastLineHeight && (this.itemY += k + this.lastLineHeight + g),
            (this.lastLineHeight = 0));
          this.lastItemY = k + this.itemY + g;
          this.lastLineHeight = Math.max(e, this.lastLineHeight);
          l.x = this.itemX;
          l.y = this.itemY;
          c
            ? (this.itemX += b)
            : ((this.itemY += k + e + g), (this.lastLineHeight = e));
          this.offsetWidth =
            this.widthOption ||
            Math.max(
              (c ? this.itemX - d - (a.checkbox ? 0 : f) : b) + d,
              this.offsetWidth
            );
        };
        a.prototype.getAllItems = function () {
          var a = [];
          this.chart.series.forEach(function (b) {
            var d = b && b.options;
            b &&
              y(d.showInLegend, p(d.linkedTo) ? !1 : void 0, !0) &&
              (a = a.concat(
                (b.legendItem || {}).labels ||
                  ("point" === d.legendType ? b.data : b)
              ));
          });
          G(this, "afterGetAllItems", { allItems: a });
          return a;
        };
        a.prototype.getAlignment = function () {
          var a = this.options;
          return this.proximate
            ? a.align.charAt(0) + "tv"
            : a.floating
            ? ""
            : a.align.charAt(0) +
              a.verticalAlign.charAt(0) +
              a.layout.charAt(0);
        };
        a.prototype.adjustMargins = function (a, b) {
          var d = this.chart,
            c = this.options,
            e = this.getAlignment();
          e &&
            [
              /(lth|ct|rth)/,
              /(rtv|rm|rbv)/,
              /(rbh|cb|lbh)/,
              /(lbv|lm|ltv)/,
            ].forEach(function (g, r) {
              g.test(e) &&
                !p(a[r]) &&
                (d[n[r]] = Math.max(
                  d[n[r]],
                  d.legend[(r + 1) % 2 ? "legendHeight" : "legendWidth"] +
                    [1, -1, -1, 1][r] * c[r % 2 ? "x" : "y"] +
                    y(c.margin, 12) +
                    b[r] +
                    (d.titleOffset[r] || 0)
                ));
            });
        };
        a.prototype.proximatePositions = function () {
          var a = this.chart,
            b = [],
            d = "left" === this.options.align;
          this.allItems.forEach(function (c) {
            var e;
            var g = d;
            if (c.yAxis) {
              c.xAxis.options.reversed && (g = !g);
              c.points &&
                (e = D(
                  g ? c.points : c.points.slice(0).reverse(),
                  function (b) {
                    return H(b.plotY);
                  }
                ));
              g =
                this.itemMarginTop +
                c.legendItem.label.getBBox().height +
                this.itemMarginBottom;
              var r = c.yAxis.top - a.plotTop;
              c.visible
                ? ((e = e ? e.plotY : c.yAxis.height), (e += r - 0.3 * g))
                : (e = r + c.yAxis.height);
              b.push({ target: e, size: g, item: c });
            }
          }, this);
          for (var g, k = 0, f = c(b, a.plotHeight); k < f.length; k++) {
            var h = f[k];
            g = h.item.legendItem || {};
            H(h.pos) && (g.y = a.plotTop - a.spacing[0] + h.pos);
          }
        };
        a.prototype.render = function () {
          var a = this.chart,
            b = a.renderer,
            d = this.options,
            c = this.padding,
            g = this.getAllItems(),
            k = this.group,
            f = this.box;
          this.itemX = c;
          this.itemY = this.initialItemY;
          this.lastItemY = this.offsetWidth = 0;
          this.widthOption = t(d.width, a.spacingBox.width - c);
          var h = a.spacingBox.width - 2 * c - d.x;
          -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) &&
            (h /= 2);
          this.maxLegendWidth = this.widthOption || h;
          k ||
            ((this.group = k =
              b
                .g("legend")
                .addClass(d.className || "")
                .attr({ zIndex: 7 })
                .add()),
            (this.contentGroup = b.g().attr({ zIndex: 1 }).add(k)),
            (this.scrollGroup = b.g().add(this.contentGroup)));
          this.renderTitle();
          w(g, function (b, a) {
            return (
              ((b.options && b.options.legendIndex) || 0) -
              ((a.options && a.options.legendIndex) || 0)
            );
          });
          d.reversed && g.reverse();
          this.allItems = g;
          this.display = h = !!g.length;
          this.itemHeight =
            this.totalItemWidth =
            this.maxItemWidth =
            this.lastLineHeight =
              0;
          g.forEach(this.renderItem, this);
          g.forEach(this.layoutItem, this);
          g = (this.widthOption || this.offsetWidth) + c;
          var l = this.lastItemY + this.lastLineHeight + this.titleHeight;
          l = this.handleOverflow(l);
          l += c;
          f ||
            (this.box = f =
              b
                .rect()
                .addClass("highcharts-legend-box")
                .attr({ r: d.borderRadius })
                .add(k));
          a.styledMode ||
            f
              .attr({
                stroke: d.borderColor,
                "stroke-width": d.borderWidth || 0,
                fill: d.backgroundColor || "none",
              })
              .shadow(d.shadow);
          if (0 < g && 0 < l)
            f[f.placed ? "animate" : "attr"](
              f.crisp.call(
                {},
                { x: 0, y: 0, width: g, height: l },
                f.strokeWidth()
              )
            );
          k[h ? "show" : "hide"]();
          a.styledMode && "none" === k.getStyle("display") && (g = l = 0);
          this.legendWidth = g;
          this.legendHeight = l;
          h && this.align();
          this.proximate || this.positionItems();
          G(this, "afterRender");
        };
        a.prototype.align = function (a) {
          void 0 === a && (a = this.chart.spacingBox);
          var b = this.chart,
            d = this.options,
            c = a.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && 0 < b.titleOffset[0]
            ? (c += b.titleOffset[0])
            : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
              0 < b.titleOffset[2] &&
              (c -= b.titleOffset[2]);
          c !== a.y && (a = K(a, { y: c }));
          b.hasRendered || (this.group.placed = !1);
          this.group.align(
            K(d, {
              width: this.legendWidth,
              height: this.legendHeight,
              verticalAlign: this.proximate ? "top" : d.verticalAlign,
            }),
            !0,
            a
          );
        };
        a.prototype.handleOverflow = function (a) {
          var b = this,
            d = this.chart,
            c = d.renderer,
            e = this.options,
            g = e.y,
            k = "top" === e.verticalAlign,
            f = this.padding,
            h = e.maxHeight,
            l = e.navigation,
            m = y(l.animation, !0),
            p = l.arrowSize || 12,
            t = this.pages,
            n = this.allItems,
            w = function (a) {
              "number" === typeof a
                ? G.attr({ height: a })
                : G && ((b.clipRect = G.destroy()), b.contentGroup.clip());
              b.contentGroup.div &&
                (b.contentGroup.div.style.clip = a
                  ? "rect(" + f + "px,9999px," + (f + a) + "px,0)"
                  : "auto");
            },
            u = function (a) {
              b[a] = c
                .circle(0, 0, 1.3 * p)
                .translate(p / 2, p / 2)
                .add(q);
              d.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
              return b[a];
            },
            D,
            Q,
            v;
          g = d.spacingBox.height + (k ? -g : g) - f;
          var q = this.nav,
            G = this.clipRect;
          "horizontal" !== e.layout ||
            "middle" === e.verticalAlign ||
            e.floating ||
            (g /= 2);
          h && (g = Math.min(g, h));
          t.length = 0;
          a && 0 < g && a > g && !1 !== l.enabled
            ? ((this.clipHeight = D =
                Math.max(g - 20 - this.titleHeight - f, 0)),
              (this.currentPage = y(this.currentPage, 1)),
              (this.fullHeight = a),
              n.forEach(function (b, a) {
                v = b.legendItem || {};
                b = v.y || 0;
                var d = Math.round(v.label.getBBox().height),
                  c = t.length;
                if (!c || (b - t[c - 1] > D && (Q || b) !== t[c - 1]))
                  t.push(Q || b), c++;
                v.pageIx = c - 1;
                Q && ((n[a - 1].legendItem || {}).pageIx = c - 1);
                a === n.length - 1 &&
                  b + d - t[c - 1] > D &&
                  d <= D &&
                  (t.push(b), (v.pageIx = c));
                b !== Q && (Q = b);
              }),
              G ||
                ((G = b.clipRect = c.clipRect(0, f, 9999, 0)),
                b.contentGroup.clip(G)),
              w(D),
              q ||
                ((this.nav = q = c.g().attr({ zIndex: 1 }).add(this.group)),
                (this.up = c.symbol("triangle", 0, 0, p, p).add(q)),
                u("upTracker").on("click", function () {
                  b.scroll(-1, m);
                }),
                (this.pager = c
                  .text("", 15, 10)
                  .addClass("highcharts-legend-navigation")),
                !d.styledMode && l.style && this.pager.css(l.style),
                this.pager.add(q),
                (this.down = c.symbol("triangle-down", 0, 0, p, p).add(q)),
                u("downTracker").on("click", function () {
                  b.scroll(1, m);
                })),
              b.scroll(0),
              (a = g))
            : q &&
              (w(),
              (this.nav = q.destroy()),
              this.scrollGroup.attr({ translateY: 1 }),
              (this.clipHeight = 0));
          return a;
        };
        a.prototype.scroll = function (a, b) {
          var d = this,
            c = this.chart,
            e = this.pages,
            g = e.length,
            f = this.clipHeight,
            h = this.options.navigation,
            l = this.pager,
            m = this.padding,
            p = this.currentPage + a;
          p > g && (p = g);
          0 < p &&
            ("undefined" !== typeof b && x(b, c),
            this.nav.attr({
              translateX: m,
              translateY: f + this.padding + 7 + this.titleHeight,
              visibility: "inherit",
            }),
            [this.up, this.upTracker].forEach(function (b) {
              b.attr({
                class:
                  1 === p
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }),
            l.attr({ text: p + "/" + g }),
            [this.down, this.downTracker].forEach(function (b) {
              b.attr({
                x: 18 + this.pager.getBBox().width,
                class:
                  p === g
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }, this),
            c.styledMode ||
              (this.up.attr({
                fill: 1 === p ? h.inactiveColor : h.activeColor,
              }),
              this.upTracker.css({ cursor: 1 === p ? "default" : "pointer" }),
              this.down.attr({
                fill: p === g ? h.inactiveColor : h.activeColor,
              }),
              this.downTracker.css({
                cursor: p === g ? "default" : "pointer",
              })),
            (this.scrollOffset = -e[p - 1] + this.initialItemY),
            this.scrollGroup.animate({ translateY: this.scrollOffset }),
            (this.currentPage = p),
            this.positionCheckboxes(),
            (a = v(y(b, c.renderer.globalAnimation, !0))),
            k(function () {
              G(d, "afterScroll", { currentPage: p });
            }, a.duration));
        };
        a.prototype.setItemEvents = function (a, b, d) {
          var c = this,
            e = a.legendItem || {},
            g = c.chart.renderer.boxWrapper,
            k = a instanceof E,
            f = "highcharts-legend-" + (k ? "point" : "series") + "-active",
            h = c.chart.styledMode,
            l = function (b) {
              c.allItems.forEach(function (d) {
                a !== d &&
                  [d].concat(d.linkedSeries || []).forEach(function (a) {
                    a.setState(b, !k);
                  });
              });
            },
            m = 0;
          for (d = d ? [b, e.symbol] : [e.group]; m < d.length; m++)
            if ((e = d[m]))
              e.on("mouseover", function () {
                a.visible && l("inactive");
                a.setState("hover");
                a.visible && g.addClass(f);
                h || b.css(c.options.itemHoverStyle);
              })
                .on("mouseout", function () {
                  c.chart.styledMode ||
                    b.css(K(a.visible ? c.itemStyle : c.itemHiddenStyle));
                  l("");
                  g.removeClass(f);
                  a.setState();
                })
                .on("click", function (b) {
                  var d = function () {
                    a.setVisible && a.setVisible();
                    l(a.visible ? "inactive" : "");
                  };
                  g.removeClass(f);
                  b = { browserEvent: b };
                  a.firePointEvent
                    ? a.firePointEvent("legendItemClick", b, d)
                    : G(a, "legendItemClick", b, d);
                });
        };
        a.prototype.createCheckboxForItem = function (a) {
          a.checkbox = m(
            "input",
            {
              type: "checkbox",
              className: "highcharts-legend-checkbox",
              checked: a.selected,
              defaultChecked: a.selected,
            },
            this.options.itemCheckboxStyle,
            this.chart.container
          );
          h(a.checkbox, "click", function (b) {
            G(
              a.series || a,
              "checkboxClick",
              { checked: b.target.checked, item: a },
              function () {
                a.select();
              }
            );
          });
        };
        return a;
      })();
      ("");
      return a;
    }
  );
  J(
    a,
    "Core/Series/SeriesRegistry.js",
    [
      a["Core/Globals.js"],
      a["Core/Defaults.js"],
      a["Core/Series/Point.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E) {
      var v = q.defaultOptions,
        C = E.extendClass,
        F = E.merge,
        x;
      (function (u) {
        function n(a, h) {
          var c = v.plotOptions || {},
            l = h.defaultOptions,
            p = h.prototype;
          p.type = a;
          p.pointClass || (p.pointClass = A);
          l && (c[a] = l);
          u.seriesTypes[a] = h;
        }
        u.seriesTypes = a.seriesTypes;
        u.registerSeriesType = n;
        u.seriesType = function (a, h, m, l, p) {
          var c = v.plotOptions || {};
          h = h || "";
          c[a] = F(c[h], m);
          n(a, C(u.seriesTypes[h] || function () {}, l));
          u.seriesTypes[a].prototype.type = a;
          p && (u.seriesTypes[a].prototype.pointClass = C(A, p));
          return u.seriesTypes[a];
        };
      })(x || (x = {}));
      return x;
    }
  );
  J(
    a,
    "Core/Chart/Chart.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Defaults.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Legend/Legend.js"],
      a["Core/MSPointer.js"],
      a["Core/Pointer.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Time.js"],
      a["Core/Utilities.js"],
      a["Core/Renderer/HTML/AST.js"],
    ],
    function (a, q, A, E, B, C, F, x, u, n, c, h, m, l, p) {
      var f = a.animate,
        D = a.animObject,
        v = a.setAnimation,
        H = A.defaultOptions,
        K = A.defaultTime,
        y = E.numberFormat,
        t = B.registerEventOptions,
        w = C.charts,
        k = C.doc,
        g = C.marginNames,
        e = C.svg,
        b = C.win,
        d = c.seriesTypes,
        r = l.addEvent,
        z = l.attr,
        I = l.cleanRecursively,
        N = l.createElement,
        P = l.css,
        O = l.defined,
        U = l.discardElement,
        L = l.erase,
        S = l.error,
        aa = l.extend,
        ba = l.find,
        R = l.fireEvent,
        M = l.getStyle,
        Y = l.isArray,
        Q = l.isNumber,
        ca = l.isObject,
        V = l.isString,
        W = l.merge,
        Z = l.objectEach,
        T = l.pick,
        da = l.pInt,
        J = l.relativeLength,
        fa = l.removeEvent,
        ea = l.splat,
        ha = l.syncTimeout,
        ia = l.uniqueKey;
      a = (function () {
        function a(b, a, d) {
          this.series =
            this.renderTo =
            this.renderer =
            this.pointer =
            this.pointCount =
            this.plotWidth =
            this.plotTop =
            this.plotLeft =
            this.plotHeight =
            this.plotBox =
            this.options =
            this.numberFormatter =
            this.margin =
            this.legend =
            this.labelCollectors =
            this.isResizing =
            this.index =
            this.eventOptions =
            this.container =
            this.colorCounter =
            this.clipBox =
            this.chartWidth =
            this.chartHeight =
            this.bounds =
            this.axisOffset =
            this.axes =
              void 0;
          this.sharedClips = {};
          this.yAxis =
            this.xAxis =
            this.userOptions =
            this.titleOffset =
            this.time =
            this.symbolCounter =
            this.spacingBox =
            this.spacing =
              void 0;
          this.getArgs(b, a, d);
        }
        a.chart = function (b, d, c) {
          return new a(b, d, c);
        };
        a.prototype.getArgs = function (b, a, d) {
          V(b) || b.nodeName
            ? ((this.renderTo = b), this.init(a, d))
            : this.init(b, a);
        };
        a.prototype.init = function (b, a) {
          var d = b.plotOptions || {};
          R(this, "init", { args: arguments }, function () {
            var c = W(H, b),
              e = c.chart;
            Z(c.plotOptions, function (b, a) {
              ca(b) && (b.tooltip = (d[a] && W(d[a].tooltip)) || void 0);
            });
            c.tooltip.userOptions =
              (b.chart && b.chart.forExport && b.tooltip.userOptions) ||
              b.tooltip;
            this.userOptions = b;
            this.margin = [];
            this.spacing = [];
            this.bounds = { h: {}, v: {} };
            this.labelCollectors = [];
            this.callback = a;
            this.isResizing = 0;
            var g = (e.zooming = e.zooming || {});
            b.chart && !b.chart.zooming && (g.resetButton = e.resetZoomButton);
            g.key = T(g.key, e.zoomKey);
            g.pinchType = T(g.pinchType, e.pinchType);
            g.singleTouch = T(g.singleTouch, e.zoomBySingleTouch);
            g.type = T(g.type, e.zoomType);
            this.options = c;
            this.axes = [];
            this.series = [];
            this.time =
              b.time && Object.keys(b.time).length ? new m(b.time) : C.time;
            this.numberFormatter = e.numberFormatter || y;
            this.styledMode = e.styledMode;
            this.hasCartesianSeries = e.showAxes;
            this.index = w.length;
            w.push(this);
            C.chartCount++;
            t(this, e);
            this.xAxis = [];
            this.yAxis = [];
            this.pointCount = this.colorCounter = this.symbolCounter = 0;
            R(this, "afterInit");
            this.firstRender();
          });
        };
        a.prototype.initSeries = function (b) {
          var a = this.options.chart;
          a = b.type || a.type || a.defaultSeriesType;
          var c = d[a];
          c || S(17, !0, this, { missingModuleFor: a });
          a = new c();
          "function" === typeof a.init && a.init(this, b);
          return a;
        };
        a.prototype.setSeriesData = function () {
          this.getSeriesOrderByLinks().forEach(function (b) {
            b.points ||
              b.data ||
              !b.enabledDataSorting ||
              b.setData(b.options.data, !1);
          });
        };
        a.prototype.getSeriesOrderByLinks = function () {
          return this.series.concat().sort(function (b, a) {
            return b.linkedSeries.length || a.linkedSeries.length
              ? a.linkedSeries.length - b.linkedSeries.length
              : 0;
          });
        };
        a.prototype.orderSeries = function (b) {
          var a = this.series;
          b = b || 0;
          for (var d = a.length; b < d; ++b)
            a[b] && ((a[b].index = b), (a[b].name = a[b].getName()));
        };
        a.prototype.isInsidePlot = function (b, a, d) {
          void 0 === d && (d = {});
          var c = this.inverted,
            e = this.plotBox,
            g = this.plotLeft,
            k = this.plotTop,
            f = this.scrollablePlotBox,
            r = 0;
          var h = 0;
          d.visiblePlotOnly &&
            this.scrollingContainer &&
            ((h = this.scrollingContainer),
            (r = h.scrollLeft),
            (h = h.scrollTop));
          var l = d.series;
          e = (d.visiblePlotOnly && f) || e;
          f = d.inverted ? a : b;
          a = d.inverted ? b : a;
          b = { x: f, y: a, isInsidePlot: !0, options: d };
          if (!d.ignoreX) {
            var m = (l && (c && !this.polar ? l.yAxis : l.xAxis)) || {
              pos: g,
              len: Infinity,
            };
            f = d.paneCoordinates ? m.pos + f : g + f;
            (f >= Math.max(r + g, m.pos) &&
              f <= Math.min(r + g + e.width, m.pos + m.len)) ||
              (b.isInsidePlot = !1);
          }
          !d.ignoreY &&
            b.isInsidePlot &&
            ((c = (d.axis && !d.axis.isXAxis && d.axis) ||
              (l && (c ? l.xAxis : l.yAxis)) || { pos: k, len: Infinity }),
            (d = d.paneCoordinates ? c.pos + a : k + a),
            (d >= Math.max(h + k, c.pos) &&
              d <= Math.min(h + k + e.height, c.pos + c.len)) ||
              (b.isInsidePlot = !1));
          R(this, "afterIsInsidePlot", b);
          return b.isInsidePlot;
        };
        a.prototype.redraw = function (b) {
          R(this, "beforeRedraw");
          var a = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
            d = this.series,
            c = this.pointer,
            e = this.legend,
            g = this.userOptions.legend,
            k = this.renderer,
            f = k.isHidden(),
            r = [],
            h = this.isDirtyBox,
            l = this.isDirtyLegend;
          this.setResponsive && this.setResponsive(!1);
          v(this.hasRendered ? b : !1, this);
          f && this.temporaryDisplay();
          this.layOutTitles();
          for (b = d.length; b--; ) {
            var m = d[b];
            if (m.options.stacking || m.options.centerInCategory) {
              var p = !0;
              if (m.isDirty) {
                var z = !0;
                break;
              }
            }
          }
          if (z)
            for (b = d.length; b--; )
              (m = d[b]), m.options.stacking && (m.isDirty = !0);
          d.forEach(function (b) {
            b.isDirty &&
              ("point" === b.options.legendType
                ? ("function" === typeof b.updateTotals && b.updateTotals(),
                  (l = !0))
                : g && (g.labelFormatter || g.labelFormat) && (l = !0));
            b.isDirtyData && R(b, "updatedData");
          });
          l &&
            e &&
            e.options.enabled &&
            (e.render(), (this.isDirtyLegend = !1));
          p && this.getStacks();
          a.forEach(function (b) {
            b.updateNames();
            b.setScale();
          });
          this.getMargins();
          a.forEach(function (b) {
            b.isDirty && (h = !0);
          });
          a.forEach(function (b) {
            var a = b.min + "," + b.max;
            b.extKey !== a &&
              ((b.extKey = a),
              r.push(function () {
                R(b, "afterSetExtremes", aa(b.eventArgs, b.getExtremes()));
                delete b.eventArgs;
              }));
            (h || p) && b.redraw();
          });
          h && this.drawChartBox();
          R(this, "predraw");
          d.forEach(function (b) {
            (h || b.isDirty) && b.visible && b.redraw();
            b.isDirtyData = !1;
          });
          c && c.reset(!0);
          k.draw();
          R(this, "redraw");
          R(this, "render");
          f && this.temporaryDisplay(!0);
          r.forEach(function (b) {
            b.call();
          });
        };
        a.prototype.get = function (b) {
          function a(a) {
            return a.id === b || (a.options && a.options.id === b);
          }
          for (
            var d = this.series,
              c = ba(this.axes, a) || ba(this.series, a),
              e = 0;
            !c && e < d.length;
            e++
          )
            c = ba(d[e].points || [], a);
          return c;
        };
        a.prototype.getAxes = function () {
          var b = this,
            a = this.options,
            d = (a.xAxis = ea(a.xAxis || {}));
          a = a.yAxis = ea(a.yAxis || {});
          R(this, "getAxes");
          d.forEach(function (b, a) {
            b.index = a;
            b.isX = !0;
          });
          a.forEach(function (b, a) {
            b.index = a;
          });
          d.concat(a).forEach(function (a) {
            new q(b, a);
          });
          R(this, "afterGetAxes");
        };
        a.prototype.getSelectedPoints = function () {
          return this.series.reduce(function (b, a) {
            a.getPointsCollection().forEach(function (a) {
              T(a.selectedStaging, a.selected) && b.push(a);
            });
            return b;
          }, []);
        };
        a.prototype.getSelectedSeries = function () {
          return this.series.filter(function (b) {
            return b.selected;
          });
        };
        a.prototype.setTitle = function (b, a, d) {
          this.applyDescription("title", b);
          this.applyDescription("subtitle", a);
          this.applyDescription("caption", void 0);
          this.layOutTitles(d);
        };
        a.prototype.applyDescription = function (b, a) {
          var d = this,
            c =
              "title" === b
                ? {
                    color: "#333333",
                    fontSize: this.options.isStock ? "16px" : "18px",
                  }
                : { color: "#666666" };
          c = this.options[b] = W(
            !this.styledMode && { style: c },
            this.options[b],
            a
          );
          var e = this[b];
          e && a && (this[b] = e = e.destroy());
          c &&
            !e &&
            ((e = this.renderer
              .text(c.text, 0, 0, c.useHTML)
              .attr({
                align: c.align,
                class: "highcharts-" + b,
                zIndex: c.zIndex || 4,
              })
              .add()),
            (e.update = function (a) {
              d[
                {
                  title: "setTitle",
                  subtitle: "setSubtitle",
                  caption: "setCaption",
                }[b]
              ](a);
            }),
            this.styledMode || e.css(c.style),
            (this[b] = e));
        };
        a.prototype.layOutTitles = function (b) {
          var a = [0, 0, 0],
            d = this.renderer,
            c = this.spacingBox;
          ["title", "subtitle", "caption"].forEach(function (b) {
            var e = this[b],
              g = this.options[b],
              k = g.verticalAlign || "top";
            b =
              "title" === b
                ? "top" === k
                  ? -3
                  : 0
                : "top" === k
                ? a[0] + 2
                : 0;
            var f;
            if (e) {
              this.styledMode || (f = g.style && g.style.fontSize);
              f = d.fontMetrics(f, e).b;
              e.css({
                width: (g.width || c.width + (g.widthAdjust || 0)) + "px",
              });
              var r = Math.round(e.getBBox(g.useHTML).height);
              e.align(
                aa({ y: "bottom" === k ? f : b + f, height: r }, g),
                !1,
                "spacingBox"
              );
              g.floating ||
                ("top" === k
                  ? (a[0] = Math.ceil(a[0] + r))
                  : "bottom" === k && (a[2] = Math.ceil(a[2] + r)));
            }
          }, this);
          a[0] &&
            "top" === (this.options.title.verticalAlign || "top") &&
            (a[0] += this.options.title.margin);
          a[2] &&
            "bottom" === this.options.caption.verticalAlign &&
            (a[2] += this.options.caption.margin);
          var e =
            !this.titleOffset || this.titleOffset.join(",") !== a.join(",");
          this.titleOffset = a;
          R(this, "afterLayOutTitles");
          !this.isDirtyBox &&
            e &&
            ((this.isDirtyBox = this.isDirtyLegend = e),
            this.hasRendered && T(b, !0) && this.isDirtyBox && this.redraw());
        };
        a.prototype.getChartSize = function () {
          var b = this.options.chart,
            a = b.width;
          b = b.height;
          var d = this.renderTo;
          O(a) || (this.containerWidth = M(d, "width"));
          O(b) || (this.containerHeight = M(d, "height"));
          this.chartWidth = Math.max(0, a || this.containerWidth || 600);
          this.chartHeight = Math.max(
            0,
            J(b, this.chartWidth) ||
              (1 < this.containerHeight ? this.containerHeight : 400)
          );
        };
        a.prototype.temporaryDisplay = function (b) {
          var a = this.renderTo;
          if (b)
            for (; a && a.style; )
              a.hcOrigStyle && (P(a, a.hcOrigStyle), delete a.hcOrigStyle),
                a.hcOrigDetached &&
                  (k.body.removeChild(a), (a.hcOrigDetached = !1)),
                (a = a.parentNode);
          else
            for (; a && a.style; ) {
              k.body.contains(a) ||
                a.parentNode ||
                ((a.hcOrigDetached = !0), k.body.appendChild(a));
              if ("none" === M(a, "display", !1) || a.hcOricDetached)
                (a.hcOrigStyle = {
                  display: a.style.display,
                  height: a.style.height,
                  overflow: a.style.overflow,
                }),
                  (b = { display: "block", overflow: "hidden" }),
                  a !== this.renderTo && (b.height = 0),
                  P(a, b),
                  a.offsetWidth ||
                    a.style.setProperty("display", "block", "important");
              a = a.parentNode;
              if (a === k.body) break;
            }
        };
        a.prototype.setClassName = function (b) {
          this.container.className = "highcharts-container " + (b || "");
        };
        a.prototype.getContainer = function () {
          var b = this.options,
            a = b.chart,
            d = ia(),
            c,
            g = this.renderTo;
          g || (this.renderTo = g = a.renderTo);
          V(g) && (this.renderTo = g = k.getElementById(g));
          g || S(13, !0, this);
          var f = da(z(g, "data-highcharts-chart"));
          Q(f) && w[f] && w[f].hasRendered && w[f].destroy();
          z(g, "data-highcharts-chart", this.index);
          g.innerHTML = p.emptyHTML;
          a.skipClone || g.offsetWidth || this.temporaryDisplay();
          this.getChartSize();
          f = this.chartWidth;
          var r = this.chartHeight;
          P(g, { overflow: "hidden" });
          this.styledMode ||
            (c = aa(
              {
                position: "relative",
                overflow: "hidden",
                width: f + "px",
                height: r + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                userSelect: "none",
                "touch-action": "manipulation",
                outline: "none",
              },
              a.style || {}
            ));
          this.container = d = N("div", { id: d }, c, g);
          this._cursor = d.style.cursor;
          this.renderer = new (
            a.renderer || !e ? n.getRendererType(a.renderer) : h
          )(
            d,
            f,
            r,
            void 0,
            a.forExport,
            b.exporting && b.exporting.allowHTML,
            this.styledMode
          );
          v(void 0, this);
          this.setClassName(a.className);
          if (this.styledMode)
            for (var l in b.defs) this.renderer.definition(b.defs[l]);
          else this.renderer.setStyle(a.style);
          this.renderer.chartIndex = this.index;
          R(this, "afterGetContainer");
        };
        a.prototype.getMargins = function (b) {
          var a = this.spacing,
            d = this.margin,
            c = this.titleOffset;
          this.resetMargins();
          c[0] &&
            !O(d[0]) &&
            (this.plotTop = Math.max(this.plotTop, c[0] + a[0]));
          c[2] &&
            !O(d[2]) &&
            (this.marginBottom = Math.max(this.marginBottom, c[2] + a[2]));
          this.legend && this.legend.display && this.legend.adjustMargins(d, a);
          R(this, "getMargins");
          b || this.getAxisMargins();
        };
        a.prototype.getAxisMargins = function () {
          var b = this,
            a = (b.axisOffset = [0, 0, 0, 0]),
            d = b.colorAxis,
            c = b.margin,
            e = function (b) {
              b.forEach(function (b) {
                b.visible && b.getOffset();
              });
            };
          b.hasCartesianSeries ? e(b.axes) : d && d.length && e(d);
          g.forEach(function (d, e) {
            O(c[e]) || (b[d] += a[e]);
          });
          b.setChartSize();
        };
        a.prototype.reflow = function (a) {
          var d = this,
            c = d.options.chart,
            e = d.renderTo,
            g = O(c.width) && O(c.height),
            f = c.width || M(e, "width");
          c = c.height || M(e, "height");
          e = a ? a.target : b;
          delete d.pointer.chartPosition;
          if (!g && !d.isPrinting && f && c && (e === b || e === k)) {
            if (f !== d.containerWidth || c !== d.containerHeight)
              l.clearTimeout(d.reflowTimeout),
                (d.reflowTimeout = ha(
                  function () {
                    d.container && d.setSize(void 0, void 0, !1);
                  },
                  a ? 100 : 0
                ));
            d.containerWidth = f;
            d.containerHeight = c;
          }
        };
        a.prototype.setReflow = function (a) {
          var d = this;
          !1 === a || this.unbindReflow
            ? !1 === a &&
              this.unbindReflow &&
              (this.unbindReflow = this.unbindReflow())
            : ((this.unbindReflow = r(b, "resize", function (b) {
                d.options && d.reflow(b);
              })),
              r(this, "destroy", this.unbindReflow));
        };
        a.prototype.setSize = function (b, a, d) {
          var c = this,
            e = c.renderer;
          c.isResizing += 1;
          v(d, c);
          d = e.globalAnimation;
          c.oldChartHeight = c.chartHeight;
          c.oldChartWidth = c.chartWidth;
          "undefined" !== typeof b && (c.options.chart.width = b);
          "undefined" !== typeof a && (c.options.chart.height = a);
          c.getChartSize();
          c.styledMode ||
            (d ? f : P)(
              c.container,
              { width: c.chartWidth + "px", height: c.chartHeight + "px" },
              d
            );
          c.setChartSize(!0);
          e.setSize(c.chartWidth, c.chartHeight, d);
          c.axes.forEach(function (b) {
            b.isDirty = !0;
            b.setScale();
          });
          c.isDirtyLegend = !0;
          c.isDirtyBox = !0;
          c.layOutTitles();
          c.getMargins();
          c.redraw(d);
          c.oldChartHeight = null;
          R(c, "resize");
          ha(function () {
            c &&
              R(c, "endResize", null, function () {
                --c.isResizing;
              });
          }, D(d).duration);
        };
        a.prototype.setChartSize = function (b) {
          var a = this.inverted,
            d = this.renderer,
            c = this.chartWidth,
            e = this.chartHeight,
            g = this.options.chart,
            f = this.spacing,
            k = this.clipOffset,
            r,
            h,
            l,
            m;
          this.plotLeft = r = Math.round(this.plotLeft);
          this.plotTop = h = Math.round(this.plotTop);
          this.plotWidth = l = Math.max(
            0,
            Math.round(c - r - this.marginRight)
          );
          this.plotHeight = m = Math.max(
            0,
            Math.round(e - h - this.marginBottom)
          );
          this.plotSizeX = a ? m : l;
          this.plotSizeY = a ? l : m;
          this.plotBorderWidth = g.plotBorderWidth || 0;
          this.spacingBox = d.spacingBox = {
            x: f[3],
            y: f[0],
            width: c - f[3] - f[1],
            height: e - f[0] - f[2],
          };
          this.plotBox = d.plotBox = { x: r, y: h, width: l, height: m };
          a = 2 * Math.floor(this.plotBorderWidth / 2);
          c = Math.ceil(Math.max(a, k[3]) / 2);
          e = Math.ceil(Math.max(a, k[0]) / 2);
          this.clipBox = {
            x: c,
            y: e,
            width: Math.floor(this.plotSizeX - Math.max(a, k[1]) / 2 - c),
            height: Math.max(
              0,
              Math.floor(this.plotSizeY - Math.max(a, k[2]) / 2 - e)
            ),
          };
          b ||
            (this.axes.forEach(function (b) {
              b.setAxisSize();
              b.setAxisTranslation();
            }),
            d.alignElements());
          R(this, "afterSetChartSize", { skipAxes: b });
        };
        a.prototype.resetMargins = function () {
          R(this, "resetMargins");
          var b = this,
            a = b.options.chart;
          ["margin", "spacing"].forEach(function (d) {
            var c = a[d],
              e = ca(c) ? c : [c, c, c, c];
            ["Top", "Right", "Bottom", "Left"].forEach(function (c, g) {
              b[d][g] = T(a[d + c], e[g]);
            });
          });
          g.forEach(function (a, d) {
            b[a] = T(b.margin[d], b.spacing[d]);
          });
          b.axisOffset = [0, 0, 0, 0];
          b.clipOffset = [0, 0, 0, 0];
        };
        a.prototype.drawChartBox = function () {
          var b = this.options.chart,
            a = this.renderer,
            d = this.chartWidth,
            c = this.chartHeight,
            e = this.styledMode,
            g = this.plotBGImage,
            f = b.backgroundColor,
            k = b.plotBackgroundColor,
            r = b.plotBackgroundImage,
            h = this.plotLeft,
            l = this.plotTop,
            m = this.plotWidth,
            p = this.plotHeight,
            z = this.plotBox,
            t = this.clipRect,
            n = this.clipBox,
            w = this.chartBackground,
            u = this.plotBackground,
            I = this.plotBorder,
            M,
            y = "animate";
          w ||
            ((this.chartBackground = w =
              a.rect().addClass("highcharts-background").add()),
            (y = "attr"));
          if (e) var Q = (M = w.strokeWidth());
          else {
            Q = b.borderWidth || 0;
            M = Q + (b.shadow ? 8 : 0);
            f = { fill: f || "none" };
            if (Q || w["stroke-width"])
              (f.stroke = b.borderColor), (f["stroke-width"] = Q);
            w.attr(f).shadow(b.shadow);
          }
          w[y]({
            x: M / 2,
            y: M / 2,
            width: d - M - (Q % 2),
            height: c - M - (Q % 2),
            r: b.borderRadius,
          });
          y = "animate";
          u ||
            ((y = "attr"),
            (this.plotBackground = u =
              a.rect().addClass("highcharts-plot-background").add()));
          u[y](z);
          e ||
            (u.attr({ fill: k || "none" }).shadow(b.plotShadow),
            r &&
              (g
                ? (r !== g.attr("href") && g.attr("href", r), g.animate(z))
                : (this.plotBGImage = a.image(r, h, l, m, p).add())));
          t
            ? t.animate({ width: n.width, height: n.height })
            : (this.clipRect = a.clipRect(n));
          y = "animate";
          I ||
            ((y = "attr"),
            (this.plotBorder = I =
              a
                .rect()
                .addClass("highcharts-plot-border")
                .attr({ zIndex: 1 })
                .add()));
          e ||
            I.attr({
              stroke: b.plotBorderColor,
              "stroke-width": b.plotBorderWidth || 0,
              fill: "none",
            });
          I[y](I.crisp({ x: h, y: l, width: m, height: p }, -I.strokeWidth()));
          this.isDirtyBox = !1;
          R(this, "afterDrawChartBox");
        };
        a.prototype.propFromSeries = function () {
          var b = this,
            a = b.options.chart,
            c = b.options.series,
            e,
            g,
            f;
          ["inverted", "angular", "polar"].forEach(function (k) {
            g = d[a.type || a.defaultSeriesType];
            f = a[k] || (g && g.prototype[k]);
            for (e = c && c.length; !f && e--; )
              (g = d[c[e].type]) && g.prototype[k] && (f = !0);
            b[k] = f;
          });
        };
        a.prototype.linkSeries = function () {
          var b = this,
            a = b.series;
          a.forEach(function (b) {
            b.linkedSeries.length = 0;
          });
          a.forEach(function (a) {
            var d = a.options.linkedTo;
            V(d) &&
              (d = ":previous" === d ? b.series[a.index - 1] : b.get(d)) &&
              d.linkedParent !== a &&
              (d.linkedSeries.push(a),
              (a.linkedParent = d),
              d.enabledDataSorting && a.setDataSortingOptions(),
              (a.visible = T(a.options.visible, d.options.visible, a.visible)));
          });
          R(this, "afterLinkSeries");
        };
        a.prototype.renderSeries = function () {
          this.series.forEach(function (b) {
            b.translate();
            b.render();
          });
        };
        a.prototype.renderLabels = function () {
          var b = this,
            a = b.options.labels;
          a.items &&
            a.items.forEach(function (d) {
              var c = aa(a.style, d.style),
                e = da(c.left) + b.plotLeft,
                g = da(c.top) + b.plotTop + 12;
              delete c.left;
              delete c.top;
              b.renderer.text(d.html, e, g).attr({ zIndex: 2 }).css(c).add();
            });
        };
        a.prototype.render = function () {
          var b = this.axes,
            a = this.colorAxis,
            d = this.renderer,
            c = this.options,
            e = function (b) {
              b.forEach(function (b) {
                b.visible && b.render();
              });
            },
            g = 0;
          this.setTitle();
          this.legend = new F(this, c.legend);
          this.getStacks && this.getStacks();
          this.getMargins(!0);
          this.setChartSize();
          c = this.plotWidth;
          b.some(function (b) {
            if (
              b.horiz &&
              b.visible &&
              b.options.labels.enabled &&
              b.series.length
            )
              return (g = 21), !0;
          });
          var f = (this.plotHeight = Math.max(this.plotHeight - g, 0));
          b.forEach(function (b) {
            b.setScale();
          });
          this.getAxisMargins();
          var k = 1.1 < c / this.plotWidth,
            r = 1.05 < f / this.plotHeight;
          if (k || r)
            b.forEach(function (b) {
              ((b.horiz && k) || (!b.horiz && r)) && b.setTickInterval(!0);
            }),
              this.getMargins();
          this.drawChartBox();
          this.hasCartesianSeries ? e(b) : a && a.length && e(a);
          this.seriesGroup ||
            (this.seriesGroup = d.g("series-group").attr({ zIndex: 3 }).add());
          this.renderSeries();
          this.renderLabels();
          this.addCredits();
          this.setResponsive && this.setResponsive();
          this.hasRendered = !0;
        };
        a.prototype.addCredits = function (a) {
          var d = this,
            c = W(!0, this.options.credits, a);
          c.enabled &&
            !this.credits &&
            ((this.credits = this.renderer
              .text(c.text + (this.mapCredits || ""), 0, 0)
              .addClass("highcharts-credits")
              .on("click", function () {
                c.href && (b.location.href = c.href);
              })
              .attr({ align: c.position.align, zIndex: 8 })),
            d.styledMode || this.credits.css(c.style),
            this.credits.add().align(c.position),
            (this.credits.update = function (b) {
              d.credits = d.credits.destroy();
              d.addCredits(b);
            }));
        };
        a.prototype.destroy = function () {
          var b = this,
            a = b.axes,
            d = b.series,
            c = b.container,
            e = c && c.parentNode,
            g;
          R(b, "destroy");
          b.renderer.forExport ? L(w, b) : (w[b.index] = void 0);
          C.chartCount--;
          b.renderTo.removeAttribute("data-highcharts-chart");
          fa(b);
          for (g = a.length; g--; ) a[g] = a[g].destroy();
          this.scroller && this.scroller.destroy && this.scroller.destroy();
          for (g = d.length; g--; ) d[g] = d[g].destroy();
          "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer"
            .split(" ")
            .forEach(function (a) {
              var d = b[a];
              d && d.destroy && (b[a] = d.destroy());
            });
          c && ((c.innerHTML = p.emptyHTML), fa(c), e && U(c));
          Z(b, function (a, d) {
            delete b[d];
          });
        };
        a.prototype.firstRender = function () {
          var b = this,
            a = b.options;
          if (!b.isReadyToRender || b.isReadyToRender()) {
            b.getContainer();
            b.resetMargins();
            b.setChartSize();
            b.propFromSeries();
            b.getAxes();
            (Y(a.series) ? a.series : []).forEach(function (a) {
              b.initSeries(a);
            });
            b.linkSeries();
            b.setSeriesData();
            R(b, "beforeRender");
            u &&
              (x.isRequired()
                ? (b.pointer = new x(b, a))
                : (b.pointer = new u(b, a)));
            b.render();
            b.pointer.getChartPosition();
            if (!b.renderer.imgCount && !b.hasLoaded) b.onload();
            b.temporaryDisplay(!0);
          }
        };
        a.prototype.onload = function () {
          this.callbacks.concat([this.callback]).forEach(function (b) {
            b && "undefined" !== typeof this.index && b.apply(this, [this]);
          }, this);
          R(this, "load");
          R(this, "render");
          O(this.index) && this.setReflow(this.options.chart.reflow);
          this.warnIfA11yModuleNotLoaded();
          this.hasLoaded = !0;
        };
        a.prototype.warnIfA11yModuleNotLoaded = function () {
          var b = this.options,
            a = this.title;
          b &&
            !this.accessibility &&
            (this.renderer.boxWrapper.attr({
              role: "img",
              "aria-label": ((a && a.element.textContent) || "").replace(
                /</g,
                "&lt;"
              ),
            }),
            (b.accessibility && !1 === b.accessibility.enabled) ||
              S(
                'Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.',
                !1,
                this
              ));
        };
        a.prototype.addSeries = function (b, a, d) {
          var c = this,
            e;
          b &&
            ((a = T(a, !0)),
            R(c, "addSeries", { options: b }, function () {
              e = c.initSeries(b);
              c.isDirtyLegend = !0;
              c.linkSeries();
              e.enabledDataSorting && e.setData(b.data, !1);
              R(c, "afterAddSeries", { series: e });
              a && c.redraw(d);
            }));
          return e;
        };
        a.prototype.addAxis = function (b, a, d, c) {
          return this.createAxis(a ? "xAxis" : "yAxis", {
            axis: b,
            redraw: d,
            animation: c,
          });
        };
        a.prototype.addColorAxis = function (b, a, d) {
          return this.createAxis("colorAxis", {
            axis: b,
            redraw: a,
            animation: d,
          });
        };
        a.prototype.createAxis = function (b, a) {
          b = new q(
            this,
            W(a.axis, { index: this[b].length, isX: "xAxis" === b })
          );
          T(a.redraw, !0) && this.redraw(a.animation);
          return b;
        };
        a.prototype.showLoading = function (b) {
          var a = this,
            d = a.options,
            c = d.loading,
            e = function () {
              g &&
                P(g, {
                  left: a.plotLeft + "px",
                  top: a.plotTop + "px",
                  width: a.plotWidth + "px",
                  height: a.plotHeight + "px",
                });
            },
            g = a.loadingDiv,
            k = a.loadingSpan;
          g ||
            (a.loadingDiv = g =
              N(
                "div",
                { className: "highcharts-loading highcharts-loading-hidden" },
                null,
                a.container
              ));
          k ||
            ((a.loadingSpan = k =
              N("span", { className: "highcharts-loading-inner" }, null, g)),
            r(a, "redraw", e));
          g.className = "highcharts-loading";
          p.setElementHTML(k, T(b, d.lang.loading, ""));
          a.styledMode ||
            (P(g, aa(c.style, { zIndex: 10 })),
            P(k, c.labelStyle),
            a.loadingShown ||
              (P(g, { opacity: 0, display: "" }),
              f(
                g,
                { opacity: c.style.opacity || 0.5 },
                { duration: c.showDuration || 0 }
              )));
          a.loadingShown = !0;
          e();
        };
        a.prototype.hideLoading = function () {
          var b = this.options,
            a = this.loadingDiv;
          a &&
            ((a.className = "highcharts-loading highcharts-loading-hidden"),
            this.styledMode ||
              f(
                a,
                { opacity: 0 },
                {
                  duration: b.loading.hideDuration || 100,
                  complete: function () {
                    P(a, { display: "none" });
                  },
                }
              ));
          this.loadingShown = !1;
        };
        a.prototype.update = function (b, a, d, c) {
          var e = this,
            g = {
              credits: "addCredits",
              title: "setTitle",
              subtitle: "setSubtitle",
              caption: "setCaption",
            },
            f = b.isResponsiveOptions,
            k = [],
            r,
            h;
          R(e, "update", { options: b });
          f || e.setResponsive(!1, !0);
          b = I(b, e.options);
          e.userOptions = W(e.userOptions, b);
          var l = b.chart;
          if (l) {
            W(!0, e.options.chart, l);
            "className" in l && e.setClassName(l.className);
            "reflow" in l && e.setReflow(l.reflow);
            if ("inverted" in l || "polar" in l || "type" in l) {
              e.propFromSeries();
              var p = !0;
            }
            "alignTicks" in l && (p = !0);
            "events" in l && t(this, l);
            Z(l, function (b, a) {
              -1 !== e.propsRequireUpdateSeries.indexOf("chart." + a) &&
                (r = !0);
              -1 !== e.propsRequireDirtyBox.indexOf(a) && (e.isDirtyBox = !0);
              -1 !== e.propsRequireReflow.indexOf(a) &&
                (f ? (e.isDirtyBox = !0) : (h = !0));
            });
            !e.styledMode &&
              l.style &&
              e.renderer.setStyle(e.options.chart.style || {});
          }
          !e.styledMode && b.colors && (this.options.colors = b.colors);
          b.time &&
            (this.time === K && (this.time = new m(b.time)),
            W(!0, e.options.time, b.time));
          Z(b, function (a, d) {
            if (e[d] && "function" === typeof e[d].update) e[d].update(a, !1);
            else if ("function" === typeof e[g[d]]) e[g[d]](a);
            else
              "colors" !== d &&
                -1 === e.collectionsWithUpdate.indexOf(d) &&
                W(!0, e.options[d], b[d]);
            "chart" !== d &&
              -1 !== e.propsRequireUpdateSeries.indexOf(d) &&
              (r = !0);
          });
          this.collectionsWithUpdate.forEach(function (a) {
            if (b[a]) {
              var c = [];
              e[a].forEach(function (b, a) {
                b.options.isInternal || c.push(T(b.options.index, a));
              });
              ea(b[a]).forEach(function (b, g) {
                var f = O(b.id),
                  k;
                f && (k = e.get(b.id));
                !k &&
                  e[a] &&
                  (k = e[a][c ? c[g] : g]) &&
                  f &&
                  O(k.options.id) &&
                  (k = void 0);
                k && k.coll === a && (k.update(b, !1), d && (k.touched = !0));
                !k &&
                  d &&
                  e.collectionsWithInit[a] &&
                  (e.collectionsWithInit[a][0].apply(
                    e,
                    [b].concat(e.collectionsWithInit[a][1] || []).concat([!1])
                  ).touched = !0);
              });
              d &&
                e[a].forEach(function (b) {
                  b.touched || b.options.isInternal
                    ? delete b.touched
                    : k.push(b);
                });
            }
          });
          k.forEach(function (b) {
            b.chart && b.remove && b.remove(!1);
          });
          p &&
            e.axes.forEach(function (b) {
              b.update({}, !1);
            });
          r &&
            e.getSeriesOrderByLinks().forEach(function (b) {
              b.chart && b.update({}, !1);
            }, this);
          p = l && l.width;
          l = l && (V(l.height) ? J(l.height, p || e.chartWidth) : l.height);
          h || (Q(p) && p !== e.chartWidth) || (Q(l) && l !== e.chartHeight)
            ? e.setSize(p, l, c)
            : T(a, !0) && e.redraw(c);
          R(e, "afterUpdate", { options: b, redraw: a, animation: c });
        };
        a.prototype.setSubtitle = function (b, a) {
          this.applyDescription("subtitle", b);
          this.layOutTitles(a);
        };
        a.prototype.setCaption = function (b, a) {
          this.applyDescription("caption", b);
          this.layOutTitles(a);
        };
        a.prototype.showResetZoom = function () {
          function b() {
            a.zoomOut();
          }
          var a = this,
            d = H.lang,
            c = a.options.chart.zooming.resetButton,
            e = c.theme,
            g =
              "chart" === c.relativeTo || "spacingBox" === c.relativeTo
                ? null
                : "scrollablePlotBox";
          R(this, "beforeShowResetZoom", null, function () {
            a.resetZoomButton = a.renderer
              .button(d.resetZoom, null, null, b, e)
              .attr({ align: c.position.align, title: d.resetZoomTitle })
              .addClass("highcharts-reset-zoom")
              .add()
              .align(c.position, !1, g);
          });
          R(this, "afterShowResetZoom");
        };
        a.prototype.zoomOut = function () {
          R(this, "selection", { resetSelection: !0 }, this.zoom);
        };
        a.prototype.zoom = function (b) {
          var a = this,
            d = a.pointer,
            c = !1,
            e;
          !b || b.resetSelection
            ? (a.axes.forEach(function (b) {
                e = b.zoom();
              }),
              (d.initiated = !1))
            : b.xAxis.concat(b.yAxis).forEach(function (b) {
                var g = b.axis;
                if (
                  (d[g.isXAxis ? "zoomX" : "zoomY"] &&
                    O(d.mouseDownX) &&
                    O(d.mouseDownY) &&
                    a.isInsidePlot(
                      d.mouseDownX - a.plotLeft,
                      d.mouseDownY - a.plotTop,
                      { axis: g }
                    )) ||
                  !O(a.inverted ? d.mouseDownX : d.mouseDownY)
                )
                  (e = g.zoom(b.min, b.max)), g.displayBtn && (c = !0);
              });
          var g = a.resetZoomButton;
          c && !g
            ? a.showResetZoom()
            : !c && ca(g) && (a.resetZoomButton = g.destroy());
          e &&
            a.redraw(
              T(a.options.chart.animation, b && b.animation, 100 > a.pointCount)
            );
        };
        a.prototype.pan = function (b, a) {
          var d = this,
            c = d.hoverPoints;
          a = "object" === typeof a ? a : { enabled: a, type: "x" };
          var e = d.options.chart;
          e && e.panning && (e.panning = a);
          var g = a.type,
            k;
          R(this, "pan", { originalEvent: b }, function () {
            c &&
              c.forEach(function (b) {
                b.setState();
              });
            var a = d.xAxis;
            "xy" === g ? (a = a.concat(d.yAxis)) : "y" === g && (a = d.yAxis);
            var e = {};
            a.forEach(function (a) {
              if (a.options.panningEnabled && !a.options.isInternal) {
                var c = a.horiz,
                  f = b[c ? "chartX" : "chartY"];
                c = c ? "mouseDownX" : "mouseDownY";
                var r = d[c],
                  h = a.minPointOffset || 0,
                  l =
                    (a.reversed && !d.inverted) || (!a.reversed && d.inverted)
                      ? -1
                      : 1,
                  m = a.getExtremes(),
                  p = a.toValue(r - f, !0) + h * l,
                  z =
                    a.toValue(r + a.len - f, !0) -
                    (h * l || (a.isXAxis && a.pointRangePadding) || 0),
                  t = z < p;
                l = a.hasVerticalPanning();
                r = t ? z : p;
                p = t ? p : z;
                var n = a.panningState;
                !l ||
                  a.isXAxis ||
                  (n && !n.isDirty) ||
                  a.series.forEach(function (b) {
                    var a = b.getProcessedData(!0);
                    a = b.getExtremes(a.yData, !0);
                    n ||
                      (n = {
                        startMin: Number.MAX_VALUE,
                        startMax: -Number.MAX_VALUE,
                      });
                    Q(a.dataMin) &&
                      Q(a.dataMax) &&
                      ((n.startMin = Math.min(
                        T(b.options.threshold, Infinity),
                        a.dataMin,
                        n.startMin
                      )),
                      (n.startMax = Math.max(
                        T(b.options.threshold, -Infinity),
                        a.dataMax,
                        n.startMax
                      )));
                  });
                l = Math.min(
                  T(n && n.startMin, m.dataMin),
                  h ? m.min : a.toValue(a.toPixels(m.min) - a.minPixelPadding)
                );
                z = Math.max(
                  T(n && n.startMax, m.dataMax),
                  h ? m.max : a.toValue(a.toPixels(m.max) + a.minPixelPadding)
                );
                a.panningState = n;
                a.isOrdinal ||
                  ((h = l - r),
                  0 < h && ((p += h), (r = l)),
                  (h = p - z),
                  0 < h && ((p = z), (r -= h)),
                  a.series.length &&
                    r !== m.min &&
                    p !== m.max &&
                    r >= l &&
                    p <= z &&
                    (a.setExtremes(r, p, !1, !1, { trigger: "pan" }),
                    !d.resetZoomButton &&
                      r !== l &&
                      p !== z &&
                      g.match("y") &&
                      (d.showResetZoom(), (a.displayBtn = !1)),
                    (k = !0)),
                  (e[c] = f));
              }
            });
            Z(e, function (b, a) {
              d[a] = b;
            });
            k && d.redraw(!1);
            P(d.container, { cursor: "move" });
          });
        };
        return a;
      })();
      aa(a.prototype, {
        callbacks: [],
        collectionsWithInit: {
          xAxis: [a.prototype.addAxis, [!0]],
          yAxis: [a.prototype.addAxis, [!1]],
          series: [a.prototype.addSeries],
        },
        collectionsWithUpdate: ["xAxis", "yAxis", "series"],
        propsRequireDirtyBox:
          "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(
            " "
          ),
        propsRequireReflow:
          "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(
            " "
          ),
        propsRequireUpdateSeries:
          "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(
            " "
          ),
      });
      ("");
      return a;
    }
  );
  J(a, "Core/Legend/LegendSymbol.js", [a["Core/Utilities.js"]], function (a) {
    var q = a.extend,
      v = a.merge,
      E = a.pick,
      B;
    (function (a) {
      a.drawLineMarker = function (a) {
        var x = (this.legendItem = this.legendItem || {}),
          u = this.options,
          n = a.symbolWidth,
          c = a.symbolHeight,
          h = c / 2,
          m = this.chart.renderer,
          l = x.group;
        a = a.baseline - Math.round(0.3 * a.fontMetrics.b);
        var p = {},
          f = u.marker,
          D = 0;
        this.chart.styledMode ||
          ((p = { "stroke-width": Math.min(u.lineWidth || 0, 24) }),
          u.dashStyle
            ? (p.dashstyle = u.dashStyle)
            : "square" !== u.linecap && (p["stroke-linecap"] = "round"));
        x.line = m.path().addClass("highcharts-graph").attr(p).add(l);
        p["stroke-linecap"] && (D = Math.min(x.line.strokeWidth(), n) / 2);
        x.line.attr({
          d: [
            ["M", D, a],
            ["L", n - D, a],
          ],
        });
        f &&
          !1 !== f.enabled &&
          n &&
          ((u = Math.min(E(f.radius, h), h)),
          0 === this.symbol.indexOf("url") &&
            ((f = v(f, { width: c, height: c })), (u = 0)),
          (x.symbol = x =
            m
              .symbol(
                this.symbol,
                n / 2 - u,
                a - u,
                2 * u,
                2 * u,
                q({ context: "legend" }, f)
              )
              .addClass("highcharts-point")
              .add(l)),
          (x.isMarker = !0));
      };
      a.drawRectangle = function (a, q) {
        q = q.legendItem || {};
        var u = a.symbolHeight,
          n = a.options.squareSymbol;
        q.symbol = this.chart.renderer
          .rect(
            n ? (a.symbolWidth - u) / 2 : 0,
            a.baseline - u + 1,
            n ? u : a.symbolWidth,
            u,
            E(a.options.symbolRadius, u / 2)
          )
          .addClass("highcharts-point")
          .attr({ zIndex: 3 })
          .add(q.group);
      };
    })(B || (B = {}));
    return B;
  });
  J(a, "Core/Series/SeriesDefaults.js", [], function () {
    return {
      lineWidth: 2,
      allowPointSelect: !1,
      crisp: !0,
      showCheckbox: !1,
      animation: { duration: 1e3 },
      events: {},
      marker: {
        enabledThreshold: 2,
        lineColor: "#ffffff",
        lineWidth: 0,
        radius: 4,
        states: {
          normal: { animation: !0 },
          hover: {
            animation: { duration: 50 },
            enabled: !0,
            radiusPlus: 2,
            lineWidthPlus: 1,
          },
          select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 },
        },
      },
      point: { events: {} },
      dataLabels: {
        animation: {},
        align: "center",
        borderWidth: 0,
        defer: !0,
        formatter: function () {
          var a = this.series.chart.numberFormatter;
          return "number" !== typeof this.y ? "" : a(this.y, -1);
        },
        padding: 5,
        style: {
          fontSize: "11px",
          fontWeight: "bold",
          color: "contrast",
          textOutline: "1px contrast",
        },
        verticalAlign: "bottom",
        x: 0,
        y: 0,
      },
      cropThreshold: 300,
      opacity: 1,
      pointRange: 0,
      softThreshold: !0,
      states: {
        normal: { animation: !0 },
        hover: {
          animation: { duration: 50 },
          lineWidthPlus: 1,
          marker: {},
          halo: { size: 10, opacity: 0.25 },
        },
        select: { animation: { duration: 0 } },
        inactive: { animation: { duration: 50 }, opacity: 0.2 },
      },
      stickyTracking: !0,
      turboThreshold: 1e3,
      findNearestPointBy: "x",
    };
  });
  J(
    a,
    "Core/Series/Series.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Defaults.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Core/Series/Point.js"],
      a["Core/Series/SeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C, F, x, u, n) {
      var c = a.animObject,
        h = a.setAnimation,
        m = q.defaultOptions,
        l = A.registerEventOptions,
        p = E.hasTouch,
        f = E.svg,
        D = E.win,
        v = x.seriesTypes,
        H = n.arrayMax,
        K = n.arrayMin,
        y = n.clamp,
        t = n.cleanRecursively,
        w = n.correctFloat,
        k = n.defined,
        g = n.erase,
        e = n.error,
        b = n.extend,
        d = n.find,
        r = n.fireEvent,
        z = n.getNestedProperty,
        I = n.isArray,
        N = n.isNumber,
        P = n.isString,
        O = n.merge,
        U = n.objectEach,
        L = n.pick,
        S = n.removeEvent,
        aa = n.splat,
        ba = n.syncTimeout;
      a = (function () {
        function a() {
          this.zones =
            this.yAxis =
            this.xAxis =
            this.userOptions =
            this.tooltipOptions =
            this.processedYData =
            this.processedXData =
            this.points =
            this.options =
            this.linkedSeries =
            this.index =
            this.eventsToUnbind =
            this.eventOptions =
            this.data =
            this.chart =
            this._i =
              void 0;
        }
        a.prototype.init = function (a, d) {
          r(this, "init", { options: d });
          var c = this,
            e = a.series;
          this.eventsToUnbind = [];
          c.chart = a;
          c.options = c.setOptions(d);
          d = c.options;
          c.linkedSeries = [];
          c.bindAxes();
          b(c, {
            name: d.name,
            state: "",
            visible: !1 !== d.visible,
            selected: !0 === d.selected,
          });
          l(this, d);
          var g = d.events;
          if (
            (g && g.click) ||
            (d.point && d.point.events && d.point.events.click) ||
            d.allowPointSelect
          )
            a.runTrackerClick = !0;
          c.getColor();
          c.getSymbol();
          c.parallelArrays.forEach(function (b) {
            c[b + "Data"] || (c[b + "Data"] = []);
          });
          c.isCartesian && (a.hasCartesianSeries = !0);
          var k;
          e.length && (k = e[e.length - 1]);
          c._i = L(k && k._i, -1) + 1;
          c.opacity = c.options.opacity;
          a.orderSeries(this.insert(e));
          d.dataSorting && d.dataSorting.enabled
            ? c.setDataSortingOptions()
            : c.points || c.data || c.setData(d.data, !1);
          r(this, "afterInit");
        };
        a.prototype.is = function (b) {
          return v[b] && this instanceof v[b];
        };
        a.prototype.insert = function (b) {
          var a = this.options.index,
            d;
          if (N(a)) {
            for (d = b.length; d--; )
              if (a >= L(b[d].options.index, b[d]._i)) {
                b.splice(d + 1, 0, this);
                break;
              }
            -1 === d && b.unshift(this);
            d += 1;
          } else b.push(this);
          return L(d, b.length - 1);
        };
        a.prototype.bindAxes = function () {
          var b = this,
            a = b.options,
            d = b.chart,
            c;
          r(this, "bindAxes", null, function () {
            (b.axisTypes || []).forEach(function (g) {
              var k = 0;
              d[g].forEach(function (d) {
                c = d.options;
                if (
                  (a[g] === k && !c.isInternal) ||
                  ("undefined" !== typeof a[g] && a[g] === c.id) ||
                  ("undefined" === typeof a[g] && 0 === c.index)
                )
                  b.insert(d.series), (b[g] = d), (d.isDirty = !0);
                c.isInternal || k++;
              });
              b[g] || b.optionalAxis === g || e(18, !0, d);
            });
          });
          r(this, "afterBindAxes");
        };
        a.prototype.updateParallelArrays = function (b, a) {
          var d = b.series,
            c = arguments,
            e = N(a)
              ? function (c) {
                  var e = "y" === c && d.toYData ? d.toYData(b) : b[c];
                  d[c + "Data"][a] = e;
                }
              : function (b) {
                  Array.prototype[a].apply(
                    d[b + "Data"],
                    Array.prototype.slice.call(c, 2)
                  );
                };
          d.parallelArrays.forEach(e);
        };
        a.prototype.hasData = function () {
          return (
            (this.visible &&
              "undefined" !== typeof this.dataMax &&
              "undefined" !== typeof this.dataMin) ||
            (this.visible && this.yData && 0 < this.yData.length)
          );
        };
        a.prototype.autoIncrement = function (b) {
          var a = this.options,
            d = a.pointIntervalUnit,
            c = a.relativeXValue,
            e = this.chart.time,
            g = this.xIncrement,
            k;
          g = L(g, a.pointStart, 0);
          this.pointInterval = k = L(this.pointInterval, a.pointInterval, 1);
          c && N(b) && (k *= b);
          d &&
            ((a = new e.Date(g)),
            "day" === d
              ? e.set("Date", a, e.get("Date", a) + k)
              : "month" === d
              ? e.set("Month", a, e.get("Month", a) + k)
              : "year" === d && e.set("FullYear", a, e.get("FullYear", a) + k),
            (k = a.getTime() - g));
          if (c && N(b)) return g + k;
          this.xIncrement = g + k;
          return g;
        };
        a.prototype.setDataSortingOptions = function () {
          var a = this.options;
          b(this, {
            requireSorting: !1,
            sorted: !1,
            enabledDataSorting: !0,
            allowDG: !1,
          });
          k(a.pointRange) || (a.pointRange = 1);
        };
        a.prototype.setOptions = function (b) {
          var a = this.chart,
            d = a.options,
            c = d.plotOptions,
            e = a.userOptions || {};
          b = O(b);
          a = a.styledMode;
          var g = { plotOptions: c, userOptions: b };
          r(this, "setOptions", g);
          var f = g.plotOptions[this.type],
            h = e.plotOptions || {};
          this.userOptions = g.userOptions;
          e = O(f, c.series, e.plotOptions && e.plotOptions[this.type], b);
          this.tooltipOptions = O(
            m.tooltip,
            m.plotOptions.series && m.plotOptions.series.tooltip,
            m.plotOptions[this.type].tooltip,
            d.tooltip.userOptions,
            c.series && c.series.tooltip,
            c[this.type].tooltip,
            b.tooltip
          );
          this.stickyTracking = L(
            b.stickyTracking,
            h[this.type] && h[this.type].stickyTracking,
            h.series && h.series.stickyTracking,
            this.tooltipOptions.shared && !this.noSharedTooltip
              ? !0
              : e.stickyTracking
          );
          null === f.marker && delete e.marker;
          this.zoneAxis = e.zoneAxis;
          c = this.zones = (e.zones || []).slice();
          (!e.negativeColor && !e.negativeFillColor) ||
            e.zones ||
            ((d = {
              value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
              className: "highcharts-negative",
            }),
            a ||
              ((d.color = e.negativeColor),
              (d.fillColor = e.negativeFillColor)),
            c.push(d));
          c.length &&
            k(c[c.length - 1].value) &&
            c.push(a ? {} : { color: this.color, fillColor: this.fillColor });
          r(this, "afterSetOptions", { options: e });
          return e;
        };
        a.prototype.getName = function () {
          return L(this.options.name, "Series " + (this.index + 1));
        };
        a.prototype.getCyclic = function (b, a, d) {
          var c = this.chart,
            e = this.userOptions,
            g = b + "Index",
            f = b + "Counter",
            r = d ? d.length : L(c.options.chart[b + "Count"], c[b + "Count"]);
          if (!a) {
            var h = L(e[g], e["_" + g]);
            k(h) ||
              (c.series.length || (c[f] = 0),
              (e["_" + g] = h = c[f] % r),
              (c[f] += 1));
            d && (a = d[h]);
          }
          "undefined" !== typeof h && (this[g] = h);
          this[b] = a;
        };
        a.prototype.getColor = function () {
          this.chart.styledMode
            ? this.getCyclic("color")
            : this.options.colorByPoint
            ? (this.color = "#cccccc")
            : this.getCyclic(
                "color",
                this.options.color || m.plotOptions[this.type].color,
                this.chart.options.colors
              );
        };
        a.prototype.getPointsCollection = function () {
          return (this.hasGroupedData ? this.points : this.data) || [];
        };
        a.prototype.getSymbol = function () {
          this.getCyclic(
            "symbol",
            this.options.marker.symbol,
            this.chart.options.symbols
          );
        };
        a.prototype.findPointIndex = function (b, a) {
          var c = b.id,
            e = b.x,
            g = this.points,
            k = this.options.dataSorting,
            f,
            r;
          if (c) (k = this.chart.get(c)), k instanceof C && (f = k);
          else if (
            this.linkedParent ||
            this.enabledDataSorting ||
            this.options.relativeXValue
          )
            if (
              ((f = function (a) {
                return !a.touched && a.index === b.index;
              }),
              k && k.matchByName
                ? (f = function (a) {
                    return !a.touched && a.name === b.name;
                  })
                : this.options.relativeXValue &&
                  (f = function (a) {
                    return !a.touched && a.options.x === b.x;
                  }),
              (f = d(g, f)),
              !f)
            )
              return;
          if (f) {
            var h = f && f.index;
            "undefined" !== typeof h && (r = !0);
          }
          "undefined" === typeof h && N(e) && (h = this.xData.indexOf(e, a));
          -1 !== h &&
            "undefined" !== typeof h &&
            this.cropped &&
            (h = h >= this.cropStart ? h - this.cropStart : h);
          !r && N(h) && g[h] && g[h].touched && (h = void 0);
          return h;
        };
        a.prototype.updateData = function (b, a) {
          var d = this.options,
            c = d.dataSorting,
            e = this.points,
            g = [],
            f = this.requireSorting,
            r = b.length === e.length,
            h,
            l,
            m,
            p = !0;
          this.xIncrement = null;
          b.forEach(function (b, a) {
            var l =
                (k(b) &&
                  this.pointClass.prototype.optionsToObject.call(
                    { series: this },
                    b
                  )) ||
                {},
              p = l.x;
            if (l.id || N(p)) {
              if (
                ((l = this.findPointIndex(l, m)),
                -1 === l || "undefined" === typeof l
                  ? g.push(b)
                  : e[l] && b !== d.data[l]
                  ? (e[l].update(b, !1, null, !1),
                    (e[l].touched = !0),
                    f && (m = l + 1))
                  : e[l] && (e[l].touched = !0),
                !r || a !== l || (c && c.enabled) || this.hasDerivedData)
              )
                h = !0;
            } else g.push(b);
          }, this);
          if (h)
            for (b = e.length; b--; )
              (l = e[b]) && !l.touched && l.remove && l.remove(!1, a);
          else
            !r || (c && c.enabled)
              ? (p = !1)
              : (b.forEach(function (b, a) {
                  b !== e[a].y && e[a].update && e[a].update(b, !1, null, !1);
                }),
                (g.length = 0));
          e.forEach(function (b) {
            b && (b.touched = !1);
          });
          if (!p) return !1;
          g.forEach(function (b) {
            this.addPoint(b, !1, null, null, !1);
          }, this);
          null === this.xIncrement &&
            this.xData &&
            this.xData.length &&
            ((this.xIncrement = H(this.xData)), this.autoIncrement());
          return !0;
        };
        a.prototype.setData = function (b, a, d, c) {
          void 0 === a && (a = !0);
          var g = this,
            k = g.points,
            f = (k && k.length) || 0,
            r = g.options,
            h = g.chart,
            l = r.dataSorting,
            m = g.xAxis,
            p = r.turboThreshold,
            z = this.xData,
            t = this.yData,
            n = g.pointArrayMap;
          n = n && n.length;
          var w = r.keys,
            u,
            y = 0,
            M = 1,
            D = null;
          if (!h.options.chart.allowMutatingData) {
            r.data && delete g.options.data;
            g.userOptions.data && delete g.userOptions.data;
            var q = O(!0, b);
          }
          b = q || b || [];
          q = b.length;
          l && l.enabled && (b = this.sortData(b));
          h.options.chart.allowMutatingData &&
            !1 !== c &&
            q &&
            f &&
            !g.cropped &&
            !g.hasGroupedData &&
            g.visible &&
            !g.boosted &&
            (u = this.updateData(b, d));
          if (!u) {
            g.xIncrement = null;
            g.colorCounter = 0;
            this.parallelArrays.forEach(function (b) {
              g[b + "Data"].length = 0;
            });
            if (p && q > p)
              if (((D = g.getFirstValidPoint(b)), N(D)))
                for (d = 0; d < q; d++)
                  (z[d] = this.autoIncrement()), (t[d] = b[d]);
              else if (I(D))
                if (n)
                  if (D.length === n)
                    for (d = 0; d < q; d++)
                      (z[d] = this.autoIncrement()), (t[d] = b[d]);
                  else
                    for (d = 0; d < q; d++)
                      (c = b[d]), (z[d] = c[0]), (t[d] = c.slice(1, n + 1));
                else if (
                  (w &&
                    ((y = w.indexOf("x")),
                    (M = w.indexOf("y")),
                    (y = 0 <= y ? y : 0),
                    (M = 0 <= M ? M : 1)),
                  1 === D.length && (M = 0),
                  y === M)
                )
                  for (d = 0; d < q; d++)
                    (z[d] = this.autoIncrement()), (t[d] = b[d][M]);
                else
                  for (d = 0; d < q; d++)
                    (c = b[d]), (z[d] = c[y]), (t[d] = c[M]);
              else e(12, !1, h);
            else
              for (d = 0; d < q; d++)
                "undefined" !== typeof b[d] &&
                  ((c = { series: g }),
                  g.pointClass.prototype.applyOptions.apply(c, [b[d]]),
                  g.updateParallelArrays(c, d));
            t && P(t[0]) && e(14, !0, h);
            g.data = [];
            g.options.data = g.userOptions.data = b;
            for (d = f; d--; ) k[d] && k[d].destroy && k[d].destroy();
            m && (m.minRange = m.userMinRange);
            g.isDirty = h.isDirtyBox = !0;
            g.isDirtyData = !!k;
            d = !1;
          }
          "point" === r.legendType &&
            (this.processData(), this.generatePoints());
          a && h.redraw(d);
        };
        a.prototype.sortData = function (b) {
          var a = this,
            d = a.options.dataSorting.sortKey || "y",
            c = function (b, a) {
              return (
                (k(a) &&
                  b.pointClass.prototype.optionsToObject.call(
                    { series: b },
                    a
                  )) ||
                {}
              );
            };
          b.forEach(function (d, e) {
            b[e] = c(a, d);
            b[e].index = e;
          }, this);
          b.concat()
            .sort(function (b, a) {
              b = z(d, b);
              a = z(d, a);
              return a < b ? -1 : a > b ? 1 : 0;
            })
            .forEach(function (b, a) {
              b.x = a;
            }, this);
          a.linkedSeries &&
            a.linkedSeries.forEach(function (a) {
              var d = a.options,
                e = d.data;
              (d.dataSorting && d.dataSorting.enabled) ||
                !e ||
                (e.forEach(function (d, g) {
                  e[g] = c(a, d);
                  b[g] && ((e[g].x = b[g].x), (e[g].index = g));
                }),
                a.setData(e, !1));
            });
          return b;
        };
        a.prototype.getProcessedData = function (b) {
          var a = this.xAxis,
            d = this.options,
            c = d.cropThreshold,
            g = b || this.getExtremesFromAll || d.getExtremesFromAll,
            k = this.isCartesian;
          b = a && a.val2lin;
          d = !(!a || !a.logarithmic);
          var f = 0,
            r = this.xData,
            h = this.yData,
            l = this.requireSorting;
          var m = !1;
          var p = r.length;
          if (a) {
            m = a.getExtremes();
            var z = m.min;
            var t = m.max;
            m = !(!a.categories || a.names.length);
          }
          if (k && this.sorted && !g && (!c || p > c || this.forceCrop))
            if (r[p - 1] < z || r[0] > t) (r = []), (h = []);
            else if (this.yData && (r[0] < z || r[p - 1] > t)) {
              var n = this.cropData(this.xData, this.yData, z, t);
              r = n.xData;
              h = n.yData;
              f = n.start;
              n = !0;
            }
          for (c = r.length || 1; --c; )
            if (
              ((a = d ? b(r[c]) - b(r[c - 1]) : r[c] - r[c - 1]),
              0 < a && ("undefined" === typeof w || a < w))
            )
              var w = a;
            else 0 > a && l && !m && (e(15, !1, this.chart), (l = !1));
          return {
            xData: r,
            yData: h,
            cropped: n,
            cropStart: f,
            closestPointRange: w,
          };
        };
        a.prototype.processData = function (b) {
          var a = this.xAxis;
          if (
            this.isCartesian &&
            !this.isDirty &&
            !a.isDirty &&
            !this.yAxis.isDirty &&
            !b
          )
            return !1;
          b = this.getProcessedData();
          this.cropped = b.cropped;
          this.cropStart = b.cropStart;
          this.processedXData = b.xData;
          this.processedYData = b.yData;
          this.closestPointRange = this.basePointRange = b.closestPointRange;
          r(this, "afterProcessData");
        };
        a.prototype.cropData = function (b, a, d, c, e) {
          var g = b.length,
            k,
            f = 0,
            r = g;
          e = L(e, this.cropShoulder);
          for (k = 0; k < g; k++)
            if (b[k] >= d) {
              f = Math.max(0, k - e);
              break;
            }
          for (d = k; d < g; d++)
            if (b[d] > c) {
              r = d + e;
              break;
            }
          return {
            xData: b.slice(f, r),
            yData: a.slice(f, r),
            start: f,
            end: r,
          };
        };
        a.prototype.generatePoints = function () {
          var a = this.options,
            d = this.processedData || a.data,
            c = this.processedXData,
            e = this.processedYData,
            g = this.pointClass,
            k = c.length,
            f = this.cropStart || 0,
            h = this.hasGroupedData,
            l = a.keys,
            m = [];
          a = a.dataGrouping && a.dataGrouping.groupAll ? f : 0;
          var p,
            z,
            t = this.data;
          if (!t && !h) {
            var n = [];
            n.length = d.length;
            t = this.data = n;
          }
          l && h && (this.options.keys = !1);
          for (z = 0; z < k; z++) {
            n = f + z;
            if (h) {
              var w = new g().init(this, [c[z]].concat(aa(e[z])));
              w.dataGroup = this.groupMap[a + z];
              w.dataGroup.options &&
                ((w.options = w.dataGroup.options),
                b(w, w.dataGroup.options),
                delete w.dataLabels);
            } else
              (w = t[n]) ||
                "undefined" === typeof d[n] ||
                (t[n] = w = new g().init(this, d[n], c[z]));
            w && ((w.index = h ? a + z : n), (m[z] = w));
          }
          this.options.keys = l;
          if (t && (k !== (p = t.length) || h))
            for (z = 0; z < p; z++)
              z !== f || h || (z += k),
                t[z] && (t[z].destroyElements(), (t[z].plotX = void 0));
          this.data = t;
          this.points = m;
          r(this, "afterGeneratePoints");
        };
        a.prototype.getXExtremes = function (b) {
          return { min: K(b), max: H(b) };
        };
        a.prototype.getExtremes = function (b, a) {
          var d = this.xAxis,
            c = this.yAxis,
            e = this.processedXData || this.xData,
            g = [],
            k = this.requireSorting ? this.cropShoulder : 0;
          c = c ? c.positiveValuesOnly : !1;
          var f,
            h = 0,
            l = 0,
            m = 0;
          b = b || this.stackedYData || this.processedYData || [];
          var p = b.length;
          if (d) {
            var z = d.getExtremes();
            h = z.min;
            l = z.max;
          }
          for (f = 0; f < p; f++) {
            var t = e[f];
            z = b[f];
            var n = (N(z) || I(z)) && (z.length || 0 < z || !c);
            t =
              a ||
              this.getExtremesFromAll ||
              this.options.getExtremesFromAll ||
              this.cropped ||
              !d ||
              ((e[f + k] || t) >= h && (e[f - k] || t) <= l);
            if (n && t)
              if ((n = z.length)) for (; n--; ) N(z[n]) && (g[m++] = z[n]);
              else g[m++] = z;
          }
          b = { activeYData: g, dataMin: K(g), dataMax: H(g) };
          r(this, "afterGetExtremes", { dataExtremes: b });
          return b;
        };
        a.prototype.applyExtremes = function () {
          var b = this.getExtremes();
          this.dataMin = b.dataMin;
          this.dataMax = b.dataMax;
          return b;
        };
        a.prototype.getFirstValidPoint = function (b) {
          for (var a = b.length, d = 0, c = null; null === c && d < a; )
            (c = b[d]), d++;
          return c;
        };
        a.prototype.translate = function () {
          this.processedXData || this.processData();
          this.generatePoints();
          var b = this.options,
            a = b.stacking,
            d = this.xAxis,
            c = d.categories,
            e = this.enabledDataSorting,
            g = this.yAxis,
            f = this.points,
            h = f.length,
            l = this.pointPlacementToXValue(),
            m = !!l,
            p = b.threshold,
            z = b.startFromThreshold ? p : 0,
            t = this.zoneAxis || "y",
            n,
            u,
            q = Number.MAX_VALUE;
          for (n = 0; n < h; n++) {
            var D = f[n],
              v = D.x,
              G = void 0,
              P = void 0,
              O = D.y,
              x = D.low,
              A =
                a &&
                g.stacking &&
                g.stacking.stacks[
                  (this.negStacks && O < (z ? 0 : p) ? "-" : "") + this.stackKey
                ];
            if (
              (g.positiveValuesOnly && !g.validatePositiveValue(O)) ||
              (d.positiveValuesOnly && !d.validatePositiveValue(v))
            )
              D.isNull = !0;
            D.plotX = u = w(
              y(d.translate(v, 0, 0, 0, 1, l, "flags" === this.type), -1e5, 1e5)
            );
            if (a && this.visible && A && A[v]) {
              var B = this.getStackIndicator(B, v, this.index);
              !D.isNull && B.key && ((G = A[v]), (P = G.points[B.key]));
              G &&
                I(P) &&
                ((x = P[0]),
                (O = P[1]),
                x === z && B.key === A[v].base && (x = L(N(p) ? p : g.min)),
                g.positiveValuesOnly && k(x) && 0 >= x && (x = void 0),
                (D.total = D.stackTotal = L(G.total)),
                (D.percentage =
                  k(D.y) && G.total ? (D.y / G.total) * 100 : void 0),
                (D.stackY = O),
                this.irregularWidths ||
                  G.setOffset(
                    this.pointXOffset || 0,
                    this.barW || 0,
                    void 0,
                    void 0,
                    void 0,
                    this.xAxis
                  ));
            }
            D.yBottom = k(x)
              ? y(g.translate(x, 0, 1, 0, 1), -1e5, 1e5)
              : void 0;
            this.dataModify && (O = this.dataModify.modifyValue(O, n));
            D.plotY = void 0;
            N(O) &&
              ((G = g.translate(O, !1, !0, !1, !0)),
              "undefined" !== typeof G && (D.plotY = y(G, -1e5, 1e5)));
            D.isInside = this.isPointInside(D);
            D.clientX = m ? w(d.translate(v, 0, 0, 0, 1, l)) : u;
            D.negative = D[t] < (b[t + "Threshold"] || p || 0);
            D.category = L(c && c[D.x], D.x);
            if (!D.isNull && !1 !== D.visible) {
              "undefined" !== typeof K && (q = Math.min(q, Math.abs(u - K)));
              var K = u;
            }
            D.zone = this.zones.length ? D.getZone() : void 0;
            !D.graphic && this.group && e && (D.isNew = !0);
          }
          this.closestPointRangePx = q;
          r(this, "afterTranslate");
        };
        a.prototype.getValidPoints = function (b, a, d) {
          var c = this.chart;
          return (b || this.points || []).filter(function (b) {
            return a &&
              !c.isInsidePlot(b.plotX, b.plotY, { inverted: c.inverted })
              ? !1
              : !1 !== b.visible && (d || !b.isNull);
          });
        };
        a.prototype.getClipBox = function () {
          var b = this.chart,
            a = this.xAxis,
            d = this.yAxis,
            c = O(b.clipBox);
          a && a.len !== b.plotSizeX && (c.width = a.len);
          d && d.len !== b.plotSizeY && (c.height = d.len);
          return c;
        };
        a.prototype.getSharedClipKey = function () {
          return (this.sharedClipKey =
            (this.options.xAxis || 0) + "," + (this.options.yAxis || 0));
        };
        a.prototype.setClip = function () {
          var b = this.chart,
            a = this.group,
            d = this.markerGroup,
            c = b.sharedClips;
          b = b.renderer;
          var e = this.getClipBox(),
            g = this.getSharedClipKey(),
            f = c[g];
          f ? f.animate(e) : (c[g] = f = b.clipRect(e));
          a && a.clip(!1 === this.options.clip ? void 0 : f);
          d && d.clip();
        };
        a.prototype.animate = function (b) {
          var a = this.chart,
            d = this.group,
            e = this.markerGroup,
            g = a.inverted,
            f = c(this.options.animation),
            k = [this.getSharedClipKey(), f.duration, f.easing, f.defer].join(),
            r = a.sharedClips[k],
            h = a.sharedClips[k + "m"];
          if (b && d)
            (f = this.getClipBox()),
              r
                ? r.attr("height", f.height)
                : ((f.width = 0),
                  g && (f.x = a.plotHeight),
                  (r = a.renderer.clipRect(f)),
                  (a.sharedClips[k] = r),
                  (h = a.renderer.clipRect({
                    x: -99,
                    y: -99,
                    width: g ? a.plotWidth + 199 : 99,
                    height: g ? 99 : a.plotHeight + 199,
                  })),
                  (a.sharedClips[k + "m"] = h)),
              d.clip(r),
              e && e.clip(h);
          else if (r && !r.hasClass("highcharts-animating")) {
            a = this.getClipBox();
            var l = f.step;
            e &&
              e.element.childNodes.length &&
              (f.step = function (b, a) {
                l && l.apply(a, arguments);
                "width" === a.prop &&
                  h &&
                  h.element &&
                  h.attr(g ? "height" : "width", b + 99);
              });
            r.addClass("highcharts-animating").animate(a, f);
          }
        };
        a.prototype.afterAnimate = function () {
          var b = this;
          this.setClip();
          U(this.chart.sharedClips, function (a, d, c) {
            a &&
              !b.chart.container.querySelector(
                '[clip-path="url(#'.concat(a.id, ')"]')
              ) &&
              (a.destroy(), delete c[d]);
          });
          this.finishedAnimating = !0;
          r(this, "afterAnimate");
        };
        a.prototype.drawPoints = function (b) {
          void 0 === b && (b = this.points);
          var a = this.chart,
            d = a.styledMode,
            c = this.colorAxis,
            e = this.options.marker,
            g = this[this.specialGroup || "markerGroup"],
            f = this.xAxis,
            k = L(
              e.enabled,
              !f || f.isRadial ? !0 : null,
              this.closestPointRangePx >= e.enabledThreshold * e.radius
            ),
            r,
            h;
          if (!1 !== e.enabled || this._hasPointMarkers)
            for (r = 0; r < b.length; r++) {
              var l = b[r];
              var m = (h = l.graphic) ? "animate" : "attr";
              var p = l.marker || {};
              var z = !!l.marker;
              if (
                ((k && "undefined" === typeof p.enabled) || p.enabled) &&
                !l.isNull &&
                !1 !== l.visible
              ) {
                var t = L(p.symbol, this.symbol, "rect");
                var n = this.markerAttribs(l, l.selected && "select");
                this.enabledDataSorting &&
                  (l.startXPos = f.reversed ? -(n.width || 0) : f.width);
                var w = !1 !== l.isInside;
                !h &&
                  w &&
                  (0 < (n.width || 0) || l.hasImage) &&
                  ((l.graphic = h =
                    a.renderer
                      .symbol(t, n.x, n.y, n.width, n.height, z ? p : e)
                      .add(g)),
                  this.enabledDataSorting &&
                    a.hasRendered &&
                    (h.attr({ x: l.startXPos }), (m = "animate")));
                h && "animate" === m && h[w ? "show" : "hide"](w).animate(n);
                if (h)
                  if (
                    ((p = this.pointAttribs(
                      l,
                      d || !l.selected ? void 0 : "select"
                    )),
                    d)
                  )
                    c && h.css({ fill: p.fill });
                  else h[m](p);
                h && h.addClass(l.getClassName(), !0);
              } else h && (l.graphic = h.destroy());
            }
        };
        a.prototype.markerAttribs = function (b, a) {
          var d = this.options,
            c = d.marker,
            e = b.marker || {},
            g = e.symbol || c.symbol,
            f = {},
            k = L(e.radius, c && c.radius);
          a &&
            ((c = c.states[a]),
            (a = e.states && e.states[a]),
            (k = L(
              a && a.radius,
              c && c.radius,
              k && k + ((c && c.radiusPlus) || 0)
            )));
          b.hasImage = g && 0 === g.indexOf("url");
          b.hasImage && (k = 0);
          b = b.pos();
          N(k) &&
            b &&
            ((f.x = b[0] - k),
            (f.y = b[1] - k),
            d.crisp && (f.x = Math.floor(f.x)));
          k && (f.width = f.height = 2 * k);
          return f;
        };
        a.prototype.pointAttribs = function (b, a) {
          var d = this.options.marker,
            c = b && b.options,
            e = (c && c.marker) || {},
            g = c && c.color,
            f = b && b.color,
            k = b && b.zone && b.zone.color,
            r = this.color;
          b = L(e.lineWidth, d.lineWidth);
          c = 1;
          r = g || k || f || r;
          g = e.fillColor || d.fillColor || r;
          f = e.lineColor || d.lineColor || r;
          a = a || "normal";
          d = d.states[a] || {};
          a = (e.states && e.states[a]) || {};
          b = L(
            a.lineWidth,
            d.lineWidth,
            b + L(a.lineWidthPlus, d.lineWidthPlus, 0)
          );
          g = a.fillColor || d.fillColor || g;
          f = a.lineColor || d.lineColor || f;
          c = L(a.opacity, d.opacity, c);
          return { stroke: f, "stroke-width": b, fill: g, opacity: c };
        };
        a.prototype.destroy = function (b) {
          var a = this,
            d = a.chart,
            c = /AppleWebKit\/533/.test(D.navigator.userAgent),
            e = a.data || [],
            f,
            k,
            h,
            l;
          r(a, "destroy", { keepEventsForUpdate: b });
          this.removeEvents(b);
          (a.axisTypes || []).forEach(function (b) {
            (l = a[b]) &&
              l.series &&
              (g(l.series, a), (l.isDirty = l.forceRedraw = !0));
          });
          a.legendItem && a.chart.legend.destroyItem(a);
          for (k = e.length; k--; ) (h = e[k]) && h.destroy && h.destroy();
          a.clips &&
            a.clips.forEach(function (b) {
              return b.destroy();
            });
          n.clearTimeout(a.animationTimeout);
          U(a, function (b, a) {
            b instanceof u &&
              !b.survive &&
              ((f = c && "group" === a ? "hide" : "destroy"), b[f]());
          });
          d.hoverSeries === a && (d.hoverSeries = void 0);
          g(d.series, a);
          d.orderSeries();
          U(a, function (d, c) {
            (b && "hcEvents" === c) || delete a[c];
          });
        };
        a.prototype.applyZones = function () {
          var b = this,
            a = this.chart,
            d = a.renderer,
            c = this.zones,
            e = this.clips || [],
            g = this.graph,
            f = this.area,
            k = Math.max(a.plotWidth, a.plotHeight),
            r = this[(this.zoneAxis || "y") + "Axis"],
            h = a.inverted,
            l,
            m,
            p,
            z,
            t,
            n,
            w,
            u,
            I = !1;
          if (c.length && (g || f) && r && "undefined" !== typeof r.min) {
            var D = r.reversed;
            var q = r.horiz;
            g && !this.showLine && g.hide();
            f && f.hide();
            var v = r.getExtremes();
            c.forEach(function (c, N) {
              l = D ? (q ? a.plotWidth : 0) : q ? 0 : r.toPixels(v.min) || 0;
              l = y(L(m, l), 0, k);
              m = y(Math.round(r.toPixels(L(c.value, v.max), !0) || 0), 0, k);
              I && (l = m = r.toPixels(v.max));
              z = Math.abs(l - m);
              t = Math.min(l, m);
              n = Math.max(l, m);
              r.isXAxis
                ? ((p = { x: h ? n : t, y: 0, width: z, height: k }),
                  q || (p.x = a.plotHeight - p.x))
                : ((p = { x: 0, y: h ? n : t, width: k, height: z }),
                  q && (p.y = a.plotWidth - p.y));
              h &&
                d.isVML &&
                (p = r.isXAxis
                  ? { x: 0, y: D ? t : n, height: p.width, width: a.chartWidth }
                  : {
                      x: p.y - a.plotLeft - a.spacingBox.x,
                      y: 0,
                      width: p.height,
                      height: a.chartHeight,
                    });
              e[N] ? e[N].animate(p) : (e[N] = d.clipRect(p));
              w = b["zone-area-" + N];
              u = b["zone-graph-" + N];
              g && u && u.clip(e[N]);
              f && w && w.clip(e[N]);
              I = c.value > v.max;
              b.resetZones && 0 === m && (m = void 0);
            });
            this.clips = e;
          } else b.visible && (g && g.show(), f && f.show());
        };
        a.prototype.plotGroup = function (b, a, d, c, e) {
          var g = this[b],
            f = !g;
          d = { visibility: d, zIndex: c || 0.1 };
          "undefined" === typeof this.opacity ||
            this.chart.styledMode ||
            "inactive" === this.state ||
            (d.opacity = this.opacity);
          f && (this[b] = g = this.chart.renderer.g().add(e));
          g.addClass(
            "highcharts-" +
              a +
              " highcharts-series-" +
              this.index +
              " highcharts-" +
              this.type +
              "-series " +
              (k(this.colorIndex)
                ? "highcharts-color-" + this.colorIndex + " "
                : "") +
              (this.options.className || "") +
              (g.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""),
            !0
          );
          g.attr(d)[f ? "attr" : "animate"](this.getPlotBox(a));
          return g;
        };
        a.prototype.getPlotBox = function (b) {
          var a = this.xAxis,
            d = this.yAxis,
            c = this.chart;
          b =
            c.inverted &&
            !c.polar &&
            a &&
            !1 !== this.invertible &&
            "series" === b;
          c.inverted && ((a = d), (d = this.xAxis));
          return {
            translateX: a ? a.left : c.plotLeft,
            translateY: d ? d.top : c.plotTop,
            rotation: b ? 90 : 0,
            rotationOriginX: b ? (a.len - d.len) / 2 : 0,
            rotationOriginY: b ? (a.len + d.len) / 2 : 0,
            scaleX: b ? -1 : 1,
            scaleY: 1,
          };
        };
        a.prototype.removeEvents = function (b) {
          b || S(this);
          this.eventsToUnbind.length &&
            (this.eventsToUnbind.forEach(function (b) {
              b();
            }),
            (this.eventsToUnbind.length = 0));
        };
        a.prototype.render = function () {
          var b = this,
            a = b.chart,
            d = b.options,
            e = c(d.animation),
            g = b.visible ? "inherit" : "hidden",
            f = d.zIndex,
            k = b.hasRendered,
            h = a.seriesGroup;
          a = !b.finishedAnimating && a.renderer.isSVG ? e.duration : 0;
          r(this, "render");
          b.plotGroup("group", "series", g, f, h);
          b.markerGroup = b.plotGroup("markerGroup", "markers", g, f, h);
          !1 !== d.clip && b.setClip();
          b.animate && a && b.animate(!0);
          b.drawGraph && (b.drawGraph(), b.applyZones());
          b.visible && b.drawPoints();
          b.drawDataLabels && b.drawDataLabels();
          b.redrawPoints && b.redrawPoints();
          b.drawTracker &&
            !1 !== b.options.enableMouseTracking &&
            b.drawTracker();
          b.animate && a && b.animate();
          k ||
            (a && e.defer && (a += e.defer),
            (b.animationTimeout = ba(function () {
              b.afterAnimate();
            }, a || 0)));
          b.isDirty = !1;
          b.hasRendered = !0;
          r(b, "afterRender");
        };
        a.prototype.redraw = function () {
          var b = this.isDirty || this.isDirtyData;
          this.translate();
          this.render();
          b && delete this.kdTree;
        };
        a.prototype.searchPoint = function (b, a) {
          var d = this.xAxis,
            c = this.yAxis,
            e = this.chart.inverted;
          return this.searchKDTree(
            {
              clientX: e ? d.len - b.chartY + d.pos : b.chartX - d.pos,
              plotY: e ? c.len - b.chartX + c.pos : b.chartY - c.pos,
            },
            a,
            b
          );
        };
        a.prototype.buildKDTree = function (b) {
          function a(b, c, e) {
            var g = b && b.length;
            if (g) {
              var f = d.kdAxisArray[c % e];
              b.sort(function (b, a) {
                return b[f] - a[f];
              });
              g = Math.floor(g / 2);
              return {
                point: b[g],
                left: a(b.slice(0, g), c + 1, e),
                right: a(b.slice(g + 1), c + 1, e),
              };
            }
          }
          this.buildingKdTree = !0;
          var d = this,
            c = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          delete d.kdTree;
          ba(
            function () {
              d.kdTree = a(d.getValidPoints(null, !d.directTouch), c, c);
              d.buildingKdTree = !1;
            },
            d.options.kdNow || (b && "touchstart" === b.type) ? 0 : 1
          );
        };
        a.prototype.searchKDTree = function (b, a, d) {
          function c(b, a, d, h) {
            var l = a.point,
              m = e.kdAxisArray[d % h],
              p = l,
              z = k(b[g]) && k(l[g]) ? Math.pow(b[g] - l[g], 2) : null;
            var t = k(b[f]) && k(l[f]) ? Math.pow(b[f] - l[f], 2) : null;
            t = (z || 0) + (t || 0);
            l.dist = k(t) ? Math.sqrt(t) : Number.MAX_VALUE;
            l.distX = k(z) ? Math.sqrt(z) : Number.MAX_VALUE;
            m = b[m] - l[m];
            t = 0 > m ? "left" : "right";
            z = 0 > m ? "right" : "left";
            a[t] && ((t = c(b, a[t], d + 1, h)), (p = t[r] < p[r] ? t : l));
            a[z] &&
              Math.sqrt(m * m) < p[r] &&
              ((b = c(b, a[z], d + 1, h)), (p = b[r] < p[r] ? b : p));
            return p;
          }
          var e = this,
            g = this.kdAxisArray[0],
            f = this.kdAxisArray[1],
            r = a ? "distX" : "dist";
          a = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          this.kdTree || this.buildingKdTree || this.buildKDTree(d);
          if (this.kdTree) return c(b, this.kdTree, a, a);
        };
        a.prototype.pointPlacementToXValue = function () {
          var b = this.options,
            a = b.pointRange,
            d = this.xAxis;
          b = b.pointPlacement;
          "between" === b && (b = d.reversed ? -0.5 : 0.5);
          return N(b) ? b * (a || d.pointRange) : 0;
        };
        a.prototype.isPointInside = function (b) {
          var a = this.chart,
            d = this.xAxis,
            c = this.yAxis;
          return (
            "undefined" !== typeof b.plotY &&
            "undefined" !== typeof b.plotX &&
            0 <= b.plotY &&
            b.plotY <= (c ? c.len : a.plotHeight) &&
            0 <= b.plotX &&
            b.plotX <= (d ? d.len : a.plotWidth)
          );
        };
        a.prototype.drawTracker = function () {
          var b = this,
            a = b.options,
            d = a.trackByArea,
            c = [].concat(d ? b.areaPath : b.graphPath),
            e = b.chart,
            g = e.pointer,
            k = e.renderer,
            h = e.options.tooltip.snap,
            l = b.tracker,
            m = function (a) {
              if (e.hoverSeries !== b) b.onMouseOver();
            },
            z = "rgba(192,192,192," + (f ? 0.0001 : 0.002) + ")";
          l
            ? l.attr({ d: c })
            : b.graph &&
              ((b.tracker = k
                .path(c)
                .attr({
                  visibility: b.visible ? "inherit" : "hidden",
                  zIndex: 2,
                })
                .addClass(
                  d ? "highcharts-tracker-area" : "highcharts-tracker-line"
                )
                .add(b.group)),
              e.styledMode ||
                b.tracker.attr({
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  stroke: z,
                  fill: d ? z : "none",
                  "stroke-width": b.graph.strokeWidth() + (d ? 0 : 2 * h),
                }),
              [b.tracker, b.markerGroup, b.dataLabelsGroup].forEach(function (
                b
              ) {
                if (
                  b &&
                  (b
                    .addClass("highcharts-tracker")
                    .on("mouseover", m)
                    .on("mouseout", function (b) {
                      g.onTrackerMouseOut(b);
                    }),
                  a.cursor && !e.styledMode && b.css({ cursor: a.cursor }),
                  p)
                )
                  b.on("touchstart", m);
              }));
          r(this, "afterDrawTracker");
        };
        a.prototype.addPoint = function (b, a, d, c, e) {
          var g = this.options,
            f = this.data,
            k = this.chart,
            h = this.xAxis;
          h = h && h.hasNames && h.names;
          var l = g.data,
            m = this.xData,
            p;
          a = L(a, !0);
          var z = { series: this };
          this.pointClass.prototype.applyOptions.apply(z, [b]);
          var t = z.x;
          var n = m.length;
          if (this.requireSorting && t < m[n - 1])
            for (p = !0; n && m[n - 1] > t; ) n--;
          this.updateParallelArrays(z, "splice", n, 0, 0);
          this.updateParallelArrays(z, n);
          h && z.name && (h[t] = z.name);
          l.splice(n, 0, b);
          if (p || this.processedData)
            this.data.splice(n, 0, null), this.processData();
          "point" === g.legendType && this.generatePoints();
          d &&
            (f[0] && f[0].remove
              ? f[0].remove(!1)
              : (f.shift(), this.updateParallelArrays(z, "shift"), l.shift()));
          !1 !== e && r(this, "addPoint", { point: z });
          this.isDirtyData = this.isDirty = !0;
          a && k.redraw(c);
        };
        a.prototype.removePoint = function (b, a, d) {
          var c = this,
            e = c.data,
            g = e[b],
            f = c.points,
            k = c.chart,
            r = function () {
              f && f.length === e.length && f.splice(b, 1);
              e.splice(b, 1);
              c.options.data.splice(b, 1);
              c.updateParallelArrays(g || { series: c }, "splice", b, 1);
              g && g.destroy();
              c.isDirty = !0;
              c.isDirtyData = !0;
              a && k.redraw();
            };
          h(d, k);
          a = L(a, !0);
          g ? g.firePointEvent("remove", null, r) : r();
        };
        a.prototype.remove = function (b, a, d, c) {
          function e() {
            g.destroy(c);
            f.isDirtyLegend = f.isDirtyBox = !0;
            f.linkSeries();
            L(b, !0) && f.redraw(a);
          }
          var g = this,
            f = g.chart;
          !1 !== d ? r(g, "remove", null, e) : e();
        };
        a.prototype.update = function (a, d) {
          a = t(a, this.userOptions);
          r(this, "update", { options: a });
          var c = this,
            g = c.chart,
            f = c.userOptions,
            k = c.initialType || c.type,
            h = g.options.plotOptions,
            l = v[k].prototype,
            m = c.finishedAnimating && { animation: !1 },
            p = {},
            z = ["eventOptions", "navigatorSeries", "baseSeries"],
            n = a.type || f.type || g.options.chart.type,
            w = !(
              this.hasDerivedData ||
              (n && n !== this.type) ||
              "undefined" !== typeof a.pointStart ||
              "undefined" !== typeof a.pointInterval ||
              "undefined" !== typeof a.relativeXValue ||
              a.joinBy ||
              a.mapData ||
              c.hasOptionChanged("dataGrouping") ||
              c.hasOptionChanged("pointStart") ||
              c.hasOptionChanged("pointInterval") ||
              c.hasOptionChanged("pointIntervalUnit") ||
              c.hasOptionChanged("keys")
            );
          n = n || k;
          w &&
            (z.push(
              "data",
              "isDirtyData",
              "points",
              "processedData",
              "processedXData",
              "processedYData",
              "xIncrement",
              "cropped",
              "_hasPointMarkers",
              "_hasPointLabels",
              "clips",
              "nodes",
              "layout",
              "level",
              "mapMap",
              "mapData",
              "minY",
              "maxY",
              "minX",
              "maxX"
            ),
            !1 !== a.visible && z.push("area", "graph"),
            c.parallelArrays.forEach(function (b) {
              z.push(b + "Data");
            }),
            a.data &&
              (a.dataSorting && b(c.options.dataSorting, a.dataSorting),
              this.setData(a.data, !1)));
          a = O(
            f,
            m,
            {
              index: "undefined" === typeof f.index ? c.index : f.index,
              pointStart: L(
                h && h.series && h.series.pointStart,
                f.pointStart,
                c.xData[0]
              ),
            },
            !w && { data: c.options.data },
            a
          );
          w && a.data && (a.data = c.options.data);
          z = [
            "group",
            "markerGroup",
            "dataLabelsGroup",
            "transformGroup",
            "shadowGroup",
          ].concat(z);
          z.forEach(function (b) {
            z[b] = c[b];
            delete c[b];
          });
          h = !1;
          if (v[n]) {
            if (((h = n !== c.type), c.remove(!1, !1, !1, !0), h))
              if (Object.setPrototypeOf)
                Object.setPrototypeOf(c, v[n].prototype);
              else {
                m = Object.hasOwnProperty.call(c, "hcEvents") && c.hcEvents;
                for (u in l) c[u] = void 0;
                b(c, v[n].prototype);
                m ? (c.hcEvents = m) : delete c.hcEvents;
              }
          } else e(17, !0, g, { missingModuleFor: n });
          z.forEach(function (b) {
            c[b] = z[b];
          });
          c.init(g, a);
          if (w && this.points) {
            a = c.options;
            if (!1 === a.visible) (p.graphic = 1), (p.dataLabel = 1);
            else if (!c._hasPointLabels) {
              l = a.marker;
              var u = a.dataLabels;
              f = f.marker || {};
              !l ||
                (!1 !== l.enabled &&
                  f.symbol === l.symbol &&
                  f.height === l.height &&
                  f.width === l.width) ||
                (p.graphic = 1);
              u && !1 === u.enabled && (p.dataLabel = 1);
            }
            f = 0;
            for (l = this.points; f < l.length; f++)
              (u = l[f]) &&
                u.series &&
                (u.resolveColor(),
                Object.keys(p).length && u.destroyElements(p),
                !1 === a.showInLegend &&
                  u.legendItem &&
                  g.legend.destroyItem(u));
          }
          c.initialType = k;
          g.linkSeries();
          h && c.linkedSeries.length && (c.isDirtyData = !0);
          r(this, "afterUpdate");
          L(d, !0) && g.redraw(w ? void 0 : !1);
        };
        a.prototype.setName = function (b) {
          this.name = this.options.name = this.userOptions.name = b;
          this.chart.isDirtyLegend = !0;
        };
        a.prototype.hasOptionChanged = function (b) {
          var a = this.options[b],
            d = this.chart.options.plotOptions,
            c = this.userOptions[b];
          return c
            ? a !== c
            : a !==
                L(
                  d && d[this.type] && d[this.type][b],
                  d && d.series && d.series[b],
                  a
                );
        };
        a.prototype.onMouseOver = function () {
          var b = this.chart,
            a = b.hoverSeries;
          b.pointer.setHoverChartIndex();
          if (a && a !== this) a.onMouseOut();
          this.options.events.mouseOver && r(this, "mouseOver");
          this.setState("hover");
          b.hoverSeries = this;
        };
        a.prototype.onMouseOut = function () {
          var b = this.options,
            a = this.chart,
            d = a.tooltip,
            c = a.hoverPoint;
          a.hoverSeries = null;
          if (c) c.onMouseOut();
          this && b.events.mouseOut && r(this, "mouseOut");
          !d ||
            this.stickyTracking ||
            (d.shared && !this.noSharedTooltip) ||
            d.hide();
          a.series.forEach(function (b) {
            b.setState("", !0);
          });
        };
        a.prototype.setState = function (b, a) {
          var d = this,
            c = d.options,
            e = d.graph,
            g = c.inactiveOtherPoints,
            f = c.states,
            k = L(
              f[b || "normal"] && f[b || "normal"].animation,
              d.chart.options.chart.animation
            ),
            r = c.lineWidth,
            h = 0,
            l = c.opacity;
          b = b || "";
          if (
            d.state !== b &&
            ([d.group, d.markerGroup, d.dataLabelsGroup].forEach(function (a) {
              a &&
                (d.state && a.removeClass("highcharts-series-" + d.state),
                b && a.addClass("highcharts-series-" + b));
            }),
            (d.state = b),
            !d.chart.styledMode)
          ) {
            if (f[b] && !1 === f[b].enabled) return;
            b &&
              ((r = f[b].lineWidth || r + (f[b].lineWidthPlus || 0)),
              (l = L(f[b].opacity, l)));
            if (e && !e.dashstyle && N(r))
              for (
                c = { "stroke-width": r }, e.animate(c, k);
                d["zone-graph-" + h];

              )
                d["zone-graph-" + h].animate(c, k), (h += 1);
            g ||
              [
                d.group,
                d.markerGroup,
                d.dataLabelsGroup,
                d.labelBySeries,
              ].forEach(function (b) {
                b && b.animate({ opacity: l }, k);
              });
          }
          a && g && d.points && d.setAllPointsToState(b || void 0);
        };
        a.prototype.setAllPointsToState = function (b) {
          this.points.forEach(function (a) {
            a.setState && a.setState(b);
          });
        };
        a.prototype.setVisible = function (b, a) {
          var d = this,
            c = d.chart,
            e = c.options.chart.ignoreHiddenSeries,
            g = d.visible,
            f = (d.visible =
              b =
              d.options.visible =
              d.userOptions.visible =
                "undefined" === typeof b ? !g : b)
              ? "show"
              : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(
            function (b) {
              if (d[b]) d[b][f]();
            }
          );
          if (
            c.hoverSeries === d ||
            (c.hoverPoint && c.hoverPoint.series) === d
          )
            d.onMouseOut();
          d.legendItem && c.legend.colorizeItem(d, b);
          d.isDirty = !0;
          d.options.stacking &&
            c.series.forEach(function (b) {
              b.options.stacking && b.visible && (b.isDirty = !0);
            });
          d.linkedSeries.forEach(function (a) {
            a.setVisible(b, !1);
          });
          e && (c.isDirtyBox = !0);
          r(d, f);
          !1 !== a && c.redraw();
        };
        a.prototype.show = function () {
          this.setVisible(!0);
        };
        a.prototype.hide = function () {
          this.setVisible(!1);
        };
        a.prototype.select = function (b) {
          this.selected =
            b =
            this.options.selected =
              "undefined" === typeof b ? !this.selected : b;
          this.checkbox && (this.checkbox.checked = b);
          r(this, b ? "select" : "unselect");
        };
        a.prototype.shouldShowTooltip = function (b, a, d) {
          void 0 === d && (d = {});
          d.series = this;
          d.visiblePlotOnly = !0;
          return this.chart.isInsidePlot(b, a, d);
        };
        a.defaultOptions = F;
        a.types = x.seriesTypes;
        a.registerType = x.registerSeriesType;
        return a;
      })();
      b(a.prototype, {
        axisTypes: ["xAxis", "yAxis"],
        coll: "series",
        colorCounter: 0,
        cropShoulder: 1,
        directTouch: !1,
        drawLegendSymbol: B.drawLineMarker,
        isCartesian: !0,
        kdAxisArray: ["clientX", "plotY"],
        parallelArrays: ["x", "y"],
        pointClass: C,
        requireSorting: !0,
        sorted: !0,
      });
      x.series = a;
      ("");
      ("");
      return a;
    }
  );
  J(
    a,
    "Extensions/ScrollablePlotArea.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Series/Series.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C) {
      var v = a.stop,
        x = C.addEvent,
        u = C.createElement,
        n = C.defined,
        c = C.merge,
        h = C.pick;
      x(A, "afterSetChartSize", function (a) {
        var h = this.options.chart.scrollablePlotArea,
          m = h && h.minWidth;
        h = h && h.minHeight;
        if (!this.renderer.forExport) {
          if (m) {
            if (
              (this.scrollablePixelsX = m = Math.max(0, m - this.chartWidth))
            ) {
              this.scrollablePlotBox = this.renderer.scrollablePlotBox = c(
                this.plotBox
              );
              this.plotBox.width = this.plotWidth += m;
              this.inverted
                ? (this.clipBox.height += m)
                : (this.clipBox.width += m);
              var f = { 1: { name: "right", value: m } };
            }
          } else
            h &&
              ((this.scrollablePixelsY = m = Math.max(0, h - this.chartHeight)),
              n(m) &&
                ((this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                  c(this.plotBox)),
                (this.plotBox.height = this.plotHeight += m),
                this.inverted
                  ? (this.clipBox.width += m)
                  : (this.clipBox.height += m),
                (f = { 2: { name: "bottom", value: m } })));
          f &&
            !a.skipAxes &&
            this.axes.forEach(function (a) {
              f[a.side]
                ? (a.getPlotLinePath = function () {
                    var c = f[a.side].name,
                      h = this[c];
                    this[c] = h - f[a.side].value;
                    var l = q.prototype.getPlotLinePath.apply(this, arguments);
                    this[c] = h;
                    return l;
                  })
                : (a.setAxisSize(), a.setAxisTranslation());
            });
        }
      });
      x(A, "render", function () {
        this.scrollablePixelsX || this.scrollablePixelsY
          ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed())
          : this.fixedDiv && this.applyFixed();
      });
      A.prototype.setUpScrolling = function () {
        var a = this,
          c = {
            WebkitOverflowScrolling: "touch",
            overflowX: "hidden",
            overflowY: "hidden",
          };
        this.scrollablePixelsX && (c.overflowX = "auto");
        this.scrollablePixelsY && (c.overflowY = "auto");
        this.scrollingParent = u(
          "div",
          { className: "highcharts-scrolling-parent" },
          { position: "relative" },
          this.renderTo
        );
        this.scrollingContainer = u(
          "div",
          { className: "highcharts-scrolling" },
          c,
          this.scrollingParent
        );
        var h;
        x(this.scrollingContainer, "scroll", function () {
          a.pointer &&
            (delete a.pointer.chartPosition,
            a.hoverPoint && (h = a.hoverPoint),
            a.pointer.runPointActions(void 0, h, !0));
        });
        this.innerContainer = u(
          "div",
          { className: "highcharts-inner-container" },
          null,
          this.scrollingContainer
        );
        this.innerContainer.appendChild(this.container);
        this.setUpScrolling = null;
      };
      A.prototype.moveFixedElements = function () {
        var a = this.container,
          c = this.fixedRenderer,
          h =
            ".highcharts-breadcrumbs-group .highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(
              " "
            ),
          f;
        this.scrollablePixelsX && !this.inverted
          ? (f = ".highcharts-yaxis")
          : this.scrollablePixelsX && this.inverted
          ? (f = ".highcharts-xaxis")
          : this.scrollablePixelsY && !this.inverted
          ? (f = ".highcharts-xaxis")
          : this.scrollablePixelsY &&
            this.inverted &&
            (f = ".highcharts-yaxis");
        f &&
          h.push(
            "" + f + ":not(.highcharts-radial-axis)",
            "" + f + "-labels:not(.highcharts-radial-axis-labels)"
          );
        h.forEach(function (f) {
          [].forEach.call(a.querySelectorAll(f), function (a) {
            (a.namespaceURI === c.SVG_NS
              ? c.box
              : c.box.parentNode
            ).appendChild(a);
            a.style.pointerEvents = "auto";
          });
        });
      };
      A.prototype.applyFixed = function () {
        var a = !this.fixedDiv,
          c = this.options.chart,
          p = c.scrollablePlotArea,
          f = B.getRendererType();
        a
          ? ((this.fixedDiv = u(
              "div",
              { className: "highcharts-fixed" },
              {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: ((c.style && c.style.zIndex) || 0) + 2,
                top: 0,
              },
              null,
              !0
            )),
            this.scrollingContainer &&
              this.scrollingContainer.parentNode.insertBefore(
                this.fixedDiv,
                this.scrollingContainer
              ),
            (this.renderTo.style.overflow = "visible"),
            (this.fixedRenderer = c =
              new f(
                this.fixedDiv,
                this.chartWidth,
                this.chartHeight,
                this.options.chart.style
              )),
            (this.scrollableMask = c
              .path()
              .attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": h(p.opacity, 0.85),
                zIndex: -1,
              })
              .addClass("highcharts-scrollable-mask")
              .add()),
            x(this, "afterShowResetZoom", this.moveFixedElements),
            x(this, "afterApplyDrilldown", this.moveFixedElements),
            x(this, "afterLayOutTitles", this.moveFixedElements))
          : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
        if (this.scrollableDirty || a)
          (this.scrollableDirty = !1), this.moveFixedElements();
        c = this.chartWidth + (this.scrollablePixelsX || 0);
        f = this.chartHeight + (this.scrollablePixelsY || 0);
        v(this.container);
        this.container.style.width = c + "px";
        this.container.style.height = f + "px";
        this.renderer.boxWrapper.attr({
          width: c,
          height: f,
          viewBox: [0, 0, c, f].join(" "),
        });
        this.chartBackground.attr({ width: c, height: f });
        this.scrollingContainer.style.height = this.chartHeight + "px";
        a &&
          (p.scrollPositionX &&
            (this.scrollingContainer.scrollLeft =
              this.scrollablePixelsX * p.scrollPositionX),
          p.scrollPositionY &&
            (this.scrollingContainer.scrollTop =
              this.scrollablePixelsY * p.scrollPositionY));
        f = this.axisOffset;
        a = this.plotTop - f[0] - 1;
        p = this.plotLeft - f[3] - 1;
        c = this.plotTop + this.plotHeight + f[2] + 1;
        f = this.plotLeft + this.plotWidth + f[1] + 1;
        var n = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
          q = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
        a = this.scrollablePixelsX
          ? [
              ["M", 0, a],
              ["L", this.plotLeft - 1, a],
              ["L", this.plotLeft - 1, c],
              ["L", 0, c],
              ["Z"],
              ["M", n, a],
              ["L", this.chartWidth, a],
              ["L", this.chartWidth, c],
              ["L", n, c],
              ["Z"],
            ]
          : this.scrollablePixelsY
          ? [
              ["M", p, 0],
              ["L", p, this.plotTop - 1],
              ["L", f, this.plotTop - 1],
              ["L", f, 0],
              ["Z"],
              ["M", p, q],
              ["L", p, this.chartHeight],
              ["L", f, this.chartHeight],
              ["L", f, q],
              ["Z"],
            ]
          : [["M", 0, 0]];
        "adjustHeight" !== this.redrawTrigger &&
          this.scrollableMask.attr({ d: a });
      };
      x(q, "afterInit", function () {
        this.chart.scrollableDirty = !0;
      });
      x(E, "show", function () {
        this.chart.scrollableDirty = !0;
      });
      ("");
    }
  );
  J(
    a,
    "Core/Axis/Stacking/StackItem.js",
    [
      a["Core/FormatUtilities.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      var v = a.format,
        B = q.series,
        C = A.destroyObjectProperties,
        F = A.pick,
        x = A.isNumber;
      a = (function () {
        function a(a, c, h, m, l) {
          var p = a.chart.inverted,
            f = a.reversed;
          this.axis = a;
          a = this.isNegative = !!h !== !!f;
          this.options = c = c || {};
          this.x = m;
          this.cumulative = this.total = null;
          this.points = {};
          this.hasValidPoints = !1;
          this.stack = l;
          this.rightCliff = this.leftCliff = 0;
          this.alignOptions = {
            align: c.align || (p ? (a ? "left" : "right") : "center"),
            verticalAlign:
              c.verticalAlign || (p ? "middle" : a ? "bottom" : "top"),
            y: c.y,
            x: c.x,
          };
          this.textAlign =
            c.textAlign || (p ? (a ? "right" : "left") : "center");
        }
        a.prototype.destroy = function () {
          C(this, this.axis);
        };
        a.prototype.render = function (a) {
          var c = this.axis.chart,
            h = this.options,
            m = h.format;
          m = m ? v(m, this, c) : h.formatter.call(this);
          this.label
            ? this.label.attr({ text: m, visibility: "hidden" })
            : ((this.label = c.renderer.label(
                m,
                null,
                void 0,
                h.shape,
                void 0,
                void 0,
                h.useHTML,
                !1,
                "stack-labels"
              )),
              (m = {
                r: h.borderRadius || 0,
                text: m,
                padding: F(h.padding, 5),
                visibility: "hidden",
              }),
              c.styledMode ||
                ((m.fill = h.backgroundColor),
                (m.stroke = h.borderColor),
                (m["stroke-width"] = h.borderWidth),
                this.label.css(h.style || {})),
              this.label.attr(m),
              this.label.added || this.label.add(a));
          this.label.labelrank = c.plotSizeY;
        };
        a.prototype.setOffset = function (a, c, h, m, l, p) {
          var f = this.alignOptions,
            n = this.axis,
            u = this.label,
            q = this.options,
            v = this.textAlign,
            y = n.chart;
          a = this.getStackBox({
            xOffset: a,
            width: c,
            boxBottom: h,
            boxTop: m,
            defaultX: l,
            xAxis: p,
          });
          l = f.verticalAlign;
          u &&
            a &&
            ((c = u.getBBox()),
            (h = u.padding),
            (m = "justify" === F(q.overflow, "justify")),
            (f.x = q.x || 0),
            (f.y = q.y || 0),
            (l = this.adjustStackPosition({
              labelBox: c,
              verticalAlign: l,
              textAlign: v,
            })),
            (v = l.x),
            (l = l.y),
            (a.x -= v),
            (a.y -= l),
            u.align(f, !1, a),
            (v = y.isInsidePlot(
              u.alignAttr.x + f.x + v,
              u.alignAttr.y + f.y + l
            )) || (m = !1),
            m && B.prototype.justifyDataLabel.call(n, u, f, u.alignAttr, c, a),
            u.attr({
              x: u.alignAttr.x,
              y: u.alignAttr.y,
              rotation: q.rotation,
              rotationOriginX: c.width / 2,
              rotationOriginY: c.height / 2,
            }),
            F(!m && q.crop, !0) &&
              (v =
                x(u.x) &&
                x(u.y) &&
                y.isInsidePlot(u.x - h + u.width, u.y) &&
                y.isInsidePlot(u.x + h, u.y)),
            u[v ? "show" : "hide"]());
        };
        a.prototype.adjustStackPosition = function (a) {
          var c = a.labelBox,
            h = { bottom: 0, middle: 1, top: 2, right: 1, center: 0, left: -1 };
          return {
            x: c.width / 2 + (c.width / 2) * h[a.textAlign],
            y: (c.height / 2) * h[a.verticalAlign],
          };
        };
        a.prototype.getStackBox = function (a) {
          var c = this.axis,
            h = c.chart,
            m = a.boxTop,
            l = a.defaultX,
            p = a.xOffset,
            f = a.width,
            n = a.boxBottom;
          m = c.stacking.usePercentage ? 100 : F(m, this.total, 0);
          m = c.toPixels(m);
          a = F(l, (a.xAxis || h.xAxis[0]).toPixels(this.x)) + p;
          c = c.toPixels(n ? n : 0);
          c = Math.abs(m - c);
          n = this.isNegative;
          return h.inverted
            ? {
                x: (n ? m : m - c) - h.plotLeft,
                y: a - h.plotTop,
                width: c,
                height: f,
              }
            : {
                x: a - h.plotLeft,
                y: (n ? m - c : m) - h.plotTop,
                width: f,
                height: c,
              };
        };
        return a;
      })();
      ("");
      return a;
    }
  );
  J(
    a,
    "Core/Axis/Stacking/StackingAxis.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Axis/Stacking/StackItem.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B) {
      function v() {
        var b = this,
          a = b.inverted;
        b.yAxis.forEach(function (b) {
          b.stacking &&
            b.stacking.stacks &&
            b.hasVisibleSeries &&
            (b.stacking.oldStacks = b.stacking.stacks);
        });
        b.series.forEach(function (d) {
          var c = (d.xAxis && d.xAxis.options) || {};
          !d.options.stacking ||
            (!0 !== d.visible && !1 !== b.options.chart.ignoreHiddenSeries) ||
            (d.stackKey = [
              d.type,
              k(d.options.stack, ""),
              a ? c.top : c.left,
              a ? c.height : c.width,
            ].join());
        });
      }
      function F() {
        var b = this.stacking;
        if (b) {
          var a = b.stacks;
          w(a, function (b, d) {
            H(b);
            a[d] = null;
          });
          b && b.stackTotalGroup && b.stackTotalGroup.destroy();
        }
      }
      function x() {
        "yAxis" !== this.coll || this.stacking || (this.stacking = new g(this));
      }
      function u(b, a, c, e) {
        !G(b) || b.x !== a || (e && b.stackKey !== e)
          ? (b = { x: a, index: 0, key: e, stackKey: e })
          : b.index++;
        b.key = [c, a, b.index].join();
        return b;
      }
      function n() {
        var b = this,
          a = b.stackKey,
          c = b.yAxis.stacking.stacks,
          e = b.processedXData,
          g = b[b.options.stacking + "Stacker"],
          f;
        g &&
          [a, "-" + a].forEach(function (a) {
            for (var d = e.length, k, r; d--; )
              (k = e[d]),
                (f = b.getStackIndicator(f, k, b.index, a)),
                (r = (k = c[a] && c[a][k]) && k.points[f.key]) &&
                  g.call(b, r, k, d);
          });
      }
      function c(b, a, c) {
        a = a.total ? 100 / a.total : 0;
        b[0] = D(b[0] * a);
        b[1] = D(b[1] * a);
        this.stackedYData[c] = b[1];
      }
      function h() {
        var b = this.yAxis.stacking;
        this.options.centerInCategory &&
        (this.is("column") || this.is("columnrange")) &&
        !this.options.stacking &&
        1 < this.chart.series.length
          ? p.setStackedPoints.call(this, "group")
          : b &&
            w(b.stacks, function (a, c) {
              "group" === c.slice(-5) &&
                (w(a, function (b) {
                  return b.destroy();
                }),
                delete b.stacks[c]);
            });
      }
      function m(b) {
        var a = this.chart,
          c = b || this.options.stacking;
        if (
          c &&
          (!0 === this.visible || !1 === a.options.chart.ignoreHiddenSeries)
        ) {
          var e = this.processedXData,
            g = this.processedYData,
            f = [],
            h = g.length,
            l = this.options,
            m = l.threshold,
            p = k(l.startFromThreshold && m, 0);
          l = l.stack;
          b = b ? "" + this.type + ",".concat(c) : this.stackKey;
          var t = "-" + b,
            n = this.negStacks;
          a = "group" === c ? a.yAxis[0] : this.yAxis;
          var w = a.stacking.stacks,
            u = a.stacking.oldStacks,
            q,
            v;
          a.stacking.stacksTouched += 1;
          for (v = 0; v < h; v++) {
            var x = e[v];
            var A = g[v];
            var B = this.getStackIndicator(B, x, this.index);
            var K = B.key;
            var H = (q = n && A < (p ? 0 : m)) ? t : b;
            w[H] || (w[H] = {});
            w[H][x] ||
              (u[H] && u[H][x]
                ? ((w[H][x] = u[H][x]), (w[H][x].total = null))
                : (w[H][x] = new E(a, a.options.stackLabels, !!q, x, l)));
            H = w[H][x];
            null !== A
              ? ((H.points[K] = H.points[this.index] = [k(H.cumulative, p)]),
                G(H.cumulative) || (H.base = K),
                (H.touched = a.stacking.stacksTouched),
                0 < B.index &&
                  !1 === this.singleStacks &&
                  (H.points[K][0] = H.points[this.index + "," + x + ",0"][0]))
              : (H.points[K] = H.points[this.index] = null);
            "percent" === c
              ? ((q = q ? b : t),
                n && w[q] && w[q][x]
                  ? ((q = w[q][x]),
                    (H.total = q.total =
                      Math.max(q.total, H.total) + Math.abs(A) || 0))
                  : (H.total = D(H.total + (Math.abs(A) || 0))))
              : "group" === c
              ? (y(A) && (A = A[0]),
                null !== A && (H.total = (H.total || 0) + 1))
              : (H.total = D(H.total + (A || 0)));
            H.cumulative =
              "group" === c
                ? (H.total || 1) - 1
                : k(H.cumulative, p) + (A || 0);
            null !== A &&
              (H.points[K].push(H.cumulative),
              (f[v] = H.cumulative),
              (H.hasValidPoints = !0));
          }
          "percent" === c && (a.stacking.usePercentage = !0);
          "group" !== c && (this.stackedYData = f);
          a.stacking.oldStacks = {};
        }
      }
      var l = a.getDeferredAnimation,
        p = A.series.prototype,
        f = B.addEvent,
        D = B.correctFloat,
        G = B.defined,
        H = B.destroyObjectProperties,
        K = B.fireEvent,
        y = B.isArray,
        t = B.isNumber,
        w = B.objectEach,
        k = B.pick,
        g = (function () {
          function b(b) {
            this.oldStacks = {};
            this.stacks = {};
            this.stacksTouched = 0;
            this.axis = b;
          }
          b.prototype.buildStacks = function () {
            var b = this.axis,
              a = b.series,
              c = b.options.reversedStacks,
              e = a.length,
              g;
            this.usePercentage = !1;
            for (g = e; g--; ) {
              var f = a[c ? g : e - g - 1];
              f.setStackedPoints();
              f.setGroupedPoints();
            }
            for (g = 0; g < e; g++) a[g].modifyStacks();
            K(b, "afterBuildStacks");
          };
          b.prototype.cleanStacks = function () {
            if (this.oldStacks) var b = (this.stacks = this.oldStacks);
            w(b, function (b) {
              w(b, function (b) {
                b.cumulative = b.total;
              });
            });
          };
          b.prototype.resetStacks = function () {
            var b = this;
            w(this.stacks, function (a) {
              w(a, function (d, c) {
                t(d.touched) && d.touched < b.stacksTouched
                  ? (d.destroy(), delete a[c])
                  : ((d.total = null), (d.cumulative = null));
              });
            });
          };
          b.prototype.renderStackTotals = function () {
            var b = this.axis,
              a = b.chart,
              c = a.renderer,
              e = this.stacks;
            b = l(
              a,
              (b.options.stackLabels && b.options.stackLabels.animation) || !1
            );
            var g = (this.stackTotalGroup =
              this.stackTotalGroup ||
              c.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add());
            g.translate(a.plotLeft, a.plotTop);
            w(e, function (b) {
              w(b, function (b) {
                b.render(g);
              });
            });
            g.animate({ opacity: 1 }, b);
          };
          return b;
        })(),
        e;
      (function (b) {
        var a = [];
        b.compose = function (b, d, e) {
          -1 === a.indexOf(b) &&
            (a.push(b), f(b, "init", x), f(b, "destroy", F));
          -1 === a.indexOf(d) && (a.push(d), (d.prototype.getStacks = v));
          -1 === a.indexOf(e) &&
            (a.push(e),
            (b = e.prototype),
            (b.getStackIndicator = u),
            (b.modifyStacks = n),
            (b.percentStacker = c),
            (b.setGroupedPoints = h),
            (b.setStackedPoints = m));
        };
      })(e || (e = {}));
      return e;
    }
  );
  J(
    a,
    "Series/Line/LineSeries.js",
    [
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (q, u) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var h in c) c.hasOwnProperty(h) && (a[h] = c[h]);
                };
              return a(q, u);
            };
            return function (q, u) {
              function n() {
                this.constructor = q;
              }
              a(q, u);
              q.prototype =
                null === u
                  ? Object.create(u)
                  : ((n.prototype = u.prototype), new n());
            };
          })(),
        B = A.defined,
        C = A.merge;
      A = (function (q) {
        function x() {
          var a = (null !== q && q.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        v(x, q);
        x.prototype.drawGraph = function () {
          var a = this,
            n = this.options,
            c = (this.gappedPath || this.getGraphPath).call(this),
            h = this.chart.styledMode,
            m = [["graph", "highcharts-graph"]];
          h || m[0].push(n.lineColor || this.color || "#cccccc", n.dashStyle);
          m = a.getZonesGraphs(m);
          m.forEach(function (l, m) {
            var f = l[0],
              p = a[f],
              u = p ? "animate" : "attr";
            p
              ? ((p.endX = a.preventGraphAnimation ? null : c.xMap),
                p.animate({ d: c }))
              : c.length &&
                (a[f] = p =
                  a.chart.renderer
                    .path(c)
                    .addClass(l[1])
                    .attr({ zIndex: 1 })
                    .add(a.group));
            p &&
              !h &&
              ((f = {
                stroke: l[2],
                "stroke-width": n.lineWidth || 0,
                fill: (a.fillGraph && a.color) || "none",
              }),
              l[3]
                ? (f.dashstyle = l[3])
                : "square" !== n.linecap &&
                  (f["stroke-linecap"] = f["stroke-linejoin"] = "round"),
              p[u](f).shadow(2 > m && n.shadow));
            p && ((p.startX = c.xMap), (p.isArea = c.isArea));
          });
        };
        x.prototype.getGraphPath = function (a, n, c) {
          var h = this,
            m = h.options,
            l = [],
            p = [],
            f,
            u = m.step;
          a = a || h.points;
          var q = a.reversed;
          q && a.reverse();
          (u = { right: 1, center: 2 }[u] || (u && 3)) && q && (u = 4 - u);
          a = this.getValidPoints(a, !1, !(m.connectNulls && !n && !c));
          a.forEach(function (q, v) {
            var y = q.plotX,
              t = q.plotY,
              w = a[v - 1];
            (q.leftCliff || (w && w.rightCliff)) && !c && (f = !0);
            q.isNull && !B(n) && 0 < v
              ? (f = !m.connectNulls)
              : q.isNull && !n
              ? (f = !0)
              : (0 === v || f
                  ? (v = [["M", q.plotX, q.plotY]])
                  : h.getPointSpline
                  ? (v = [h.getPointSpline(a, q, v)])
                  : u
                  ? ((v =
                      1 === u
                        ? [["L", w.plotX, t]]
                        : 2 === u
                        ? [
                            ["L", (w.plotX + y) / 2, w.plotY],
                            ["L", (w.plotX + y) / 2, t],
                          ]
                        : [["L", y, w.plotY]]),
                    v.push(["L", y, t]))
                  : (v = [["L", y, t]]),
                p.push(q.x),
                u && (p.push(q.x), 2 === u && p.push(q.x)),
                l.push.apply(l, v),
                (f = !1));
          });
          l.xMap = p;
          return (h.graphPath = l);
        };
        x.prototype.getZonesGraphs = function (a) {
          this.zones.forEach(function (n, c) {
            c = [
              "zone-graph-" + c,
              "highcharts-graph highcharts-zone-graph-" +
                c +
                " " +
                (n.className || ""),
            ];
            this.chart.styledMode ||
              c.push(
                n.color || this.color,
                n.dashStyle || this.options.dashStyle
              );
            a.push(c);
          }, this);
          return a;
        };
        x.defaultOptions = C(a.defaultOptions, {});
        return x;
      })(a);
      q.registerSeriesType("line", A);
      ("");
      return A;
    }
  );
  J(
    a,
    "Series/Area/AreaSeries.js",
    [
      a["Core/Color/Color.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (c, m) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f]);
                };
              return a(c, m);
            };
            return function (c, m) {
              function h() {
                this.constructor = c;
              }
              a(c, m);
              c.prototype =
                null === m
                  ? Object.create(m)
                  : ((h.prototype = m.prototype), new h());
            };
          })(),
        C = a.parse,
        F = A.seriesTypes.line;
      a = E.extend;
      var x = E.merge,
        u = E.objectEach,
        n = E.pick;
      E = (function (a) {
        function c() {
          var c = (null !== a && a.apply(this, arguments)) || this;
          c.data = void 0;
          c.options = void 0;
          c.points = void 0;
          return c;
        }
        v(c, a);
        c.prototype.drawGraph = function () {
          this.areaPath = [];
          a.prototype.drawGraph.apply(this);
          var c = this,
            h = this.areaPath,
            p = this.options,
            f = [["area", "highcharts-area", this.color, p.fillColor]];
          this.zones.forEach(function (a, h) {
            f.push([
              "zone-area-" + h,
              "highcharts-area highcharts-zone-area-" + h + " " + a.className,
              a.color || c.color,
              a.fillColor || p.fillColor,
            ]);
          });
          f.forEach(function (a) {
            var f = a[0],
              l = {},
              m = c[f],
              u = m ? "animate" : "attr";
            m
              ? ((m.endX = c.preventGraphAnimation ? null : h.xMap),
                m.animate({ d: h }))
              : ((l.zIndex = 0),
                (m = c[f] =
                  c.chart.renderer.path(h).addClass(a[1]).add(c.group)),
                (m.isArea = !0));
            c.chart.styledMode ||
              (l.fill = n(
                a[3],
                C(a[2]).setOpacity(n(p.fillOpacity, 0.75)).get()
              ));
            m[u](l);
            m.startX = h.xMap;
            m.shiftUnit = p.step ? 2 : 1;
          });
        };
        c.prototype.getGraphPath = function (a) {
          var c = F.prototype.getGraphPath,
            h = this.options,
            f = h.stacking,
            m = this.yAxis,
            u = [],
            q = [],
            v = this.index,
            y = m.stacking.stacks[this.stackKey],
            t = h.threshold,
            w = Math.round(m.getThreshold(h.threshold));
          h = n(h.connectNulls, "percent" === f);
          var k = function (b, c, e) {
            var g = a[b];
            b = f && y[g.x].points[v];
            var k = g[e + "Null"] || 0;
            e = g[e + "Cliff"] || 0;
            g = !0;
            if (e || k) {
              var r = (k ? b[0] : b[1]) + e;
              var h = b[0] + e;
              g = !!k;
            } else !f && a[c] && a[c].isNull && (r = h = t);
            "undefined" !== typeof r &&
              (q.push({
                plotX: d,
                plotY: null === r ? w : m.getThreshold(r),
                isNull: g,
                isCliff: !0,
              }),
              u.push({
                plotX: d,
                plotY: null === h ? w : m.getThreshold(h),
                doCurve: !1,
              }));
          };
          a = a || this.points;
          f && (a = this.getStackPoints(a));
          for (var g = 0, e = a.length; g < e; ++g) {
            f ||
              (a[g].leftCliff =
                a[g].rightCliff =
                a[g].leftNull =
                a[g].rightNull =
                  void 0);
            var b = a[g].isNull;
            var d = n(a[g].rectPlotX, a[g].plotX);
            var r = f ? n(a[g].yBottom, w) : w;
            if (!b || h)
              h || k(g, g - 1, "left"),
                (b && !f && h) ||
                  (q.push(a[g]), u.push({ x: g, plotX: d, plotY: r })),
                h || k(g, g + 1, "right");
          }
          k = c.call(this, q, !0, !0);
          u.reversed = !0;
          b = c.call(this, u, !0, !0);
          (r = b[0]) && "M" === r[0] && (b[0] = ["L", r[1], r[2]]);
          b = k.concat(b);
          b.length && b.push(["Z"]);
          c = c.call(this, q, !1, h);
          b.xMap = k.xMap;
          this.areaPath = b;
          return c;
        };
        c.prototype.getStackPoints = function (a) {
          var c = this,
            h = [],
            f = [],
            m = this.xAxis,
            q = this.yAxis,
            v = q.stacking.stacks[this.stackKey],
            x = {},
            y = q.series,
            t = y.length,
            w = q.options.reversedStacks ? 1 : -1,
            k = y.indexOf(c);
          a = a || this.points;
          if (this.options.stacking) {
            for (var g = 0; g < a.length; g++)
              (a[g].leftNull = a[g].rightNull = void 0), (x[a[g].x] = a[g]);
            u(v, function (b, a) {
              null !== b.total && f.push(a);
            });
            f.sort(function (b, a) {
              return b - a;
            });
            var e = y.map(function (b) {
              return b.visible;
            });
            f.forEach(function (b, a) {
              var d = 0,
                g,
                l;
              if (x[b] && !x[b].isNull)
                h.push(x[b]),
                  [-1, 1].forEach(function (d) {
                    var r = 1 === d ? "rightNull" : "leftNull",
                      h = v[f[a + d]],
                      m = 0;
                    if (h)
                      for (var p = k; 0 <= p && p < t; ) {
                        var z = y[p].index;
                        g = h.points[z];
                        g ||
                          (z === c.index
                            ? (x[b][r] = !0)
                            : e[p] &&
                              (l = v[b].points[z]) &&
                              (m -= l[1] - l[0]));
                        p += w;
                      }
                    x[b][1 === d ? "rightCliff" : "leftCliff"] = m;
                  });
              else {
                for (var p = k; 0 <= p && p < t; ) {
                  if ((g = v[b].points[y[p].index])) {
                    d = g[1];
                    break;
                  }
                  p += w;
                }
                d = n(d, 0);
                d = q.translate(d, 0, 1, 0, 1);
                h.push({
                  isNull: !0,
                  plotX: m.translate(b, 0, 0, 0, 1),
                  x: b,
                  plotY: d,
                  yBottom: d,
                });
              }
            });
          }
          return h;
        };
        c.defaultOptions = x(F.defaultOptions, { threshold: 0 });
        return c;
      })(F);
      a(E.prototype, { singleStacks: !1, drawLegendSymbol: q.drawRectangle });
      A.registerSeriesType("area", E);
      ("");
      return E;
    }
  );
  J(
    a,
    "Series/Spline/SplineSeries.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, q) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (q, u) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var h in c) c.hasOwnProperty(h) && (a[h] = c[h]);
                };
              return a(q, u);
            };
            return function (q, u) {
              function n() {
                this.constructor = q;
              }
              a(q, u);
              q.prototype =
                null === u
                  ? Object.create(u)
                  : ((n.prototype = u.prototype), new n());
            };
          })(),
        E = a.seriesTypes.line,
        B = q.merge,
        C = q.pick;
      q = (function (a) {
        function q() {
          var u = (null !== a && a.apply(this, arguments)) || this;
          u.data = void 0;
          u.options = void 0;
          u.points = void 0;
          return u;
        }
        v(q, a);
        q.prototype.getPointSpline = function (a, n, c) {
          var h = n.plotX || 0,
            m = n.plotY || 0,
            l = a[c - 1];
          c = a[c + 1];
          if (
            l &&
            !l.isNull &&
            !1 !== l.doCurve &&
            !n.isCliff &&
            c &&
            !c.isNull &&
            !1 !== c.doCurve &&
            !n.isCliff
          ) {
            a = l.plotY || 0;
            var p = c.plotX || 0;
            c = c.plotY || 0;
            var f = 0;
            var u = (1.5 * h + (l.plotX || 0)) / 2.5;
            var q = (1.5 * m + a) / 2.5;
            p = (1.5 * h + p) / 2.5;
            var v = (1.5 * m + c) / 2.5;
            p !== u && (f = ((v - q) * (p - h)) / (p - u) + m - v);
            q += f;
            v += f;
            q > a && q > m
              ? ((q = Math.max(a, m)), (v = 2 * m - q))
              : q < a && q < m && ((q = Math.min(a, m)), (v = 2 * m - q));
            v > c && v > m
              ? ((v = Math.max(c, m)), (q = 2 * m - v))
              : v < c && v < m && ((v = Math.min(c, m)), (q = 2 * m - v));
            n.rightContX = p;
            n.rightContY = v;
          }
          n = [
            "C",
            C(l.rightContX, l.plotX, 0),
            C(l.rightContY, l.plotY, 0),
            C(u, h, 0),
            C(q, m, 0),
            h,
            m,
          ];
          l.rightContX = l.rightContY = void 0;
          return n;
        };
        q.defaultOptions = B(E.defaultOptions);
        return q;
      })(E);
      a.registerSeriesType("spline", q);
      ("");
      return q;
    }
  );
  J(
    a,
    "Series/AreaSpline/AreaSplineSeries.js",
    [
      a["Series/Spline/SplineSeries.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (c, h) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var h in c) c.hasOwnProperty(h) && (a[h] = c[h]);
                };
              return a(c, h);
            };
            return function (c, h) {
              function m() {
                this.constructor = c;
              }
              a(c, h);
              c.prototype =
                null === h
                  ? Object.create(h)
                  : ((m.prototype = h.prototype), new m());
            };
          })(),
        C = A.seriesTypes,
        F = C.area;
      C = C.area.prototype;
      var x = E.extend,
        u = E.merge;
      E = (function (n) {
        function c() {
          var a = (null !== n && n.apply(this, arguments)) || this;
          a.data = void 0;
          a.points = void 0;
          a.options = void 0;
          return a;
        }
        v(c, n);
        c.defaultOptions = u(a.defaultOptions, F.defaultOptions);
        return c;
      })(a);
      x(E.prototype, {
        getGraphPath: C.getGraphPath,
        getStackPoints: C.getStackPoints,
        drawGraph: C.drawGraph,
        drawLegendSymbol: q.drawRectangle,
      });
      A.registerSeriesType("areaspline", E);
      ("");
      return E;
    }
  );
  J(a, "Series/Column/ColumnSeriesDefaults.js", [], function () {
    "";
    return {
      borderRadius: 0,
      centerInCategory: !1,
      groupPadding: 0.2,
      marker: null,
      pointPadding: 0.1,
      minPointLength: 0,
      cropThreshold: 50,
      pointRange: null,
      states: {
        hover: { halo: !1, brightness: 0.1 },
        select: { color: "#cccccc", borderColor: "#000000" },
      },
      dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
      startFromThreshold: !0,
      stickyTracking: !1,
      tooltip: { distance: 6 },
      threshold: 0,
      borderColor: "#ffffff",
    };
  });
  J(
    a,
    "Series/Column/ColumnSeries.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Color/Color.js"],
      a["Series/Column/ColumnSeriesDefaults.js"],
      a["Core/Globals.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C, F, x) {
      var u =
          (this && this.__extends) ||
          (function () {
            var a = function (c, f) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
                };
              return a(c, f);
            };
            return function (c, f) {
              function g() {
                this.constructor = c;
              }
              a(c, f);
              c.prototype =
                null === f
                  ? Object.create(f)
                  : ((g.prototype = f.prototype), new g());
            };
          })(),
        n = a.animObject,
        c = q.parse,
        h = E.hasTouch;
      a = E.noop;
      var m = x.clamp,
        l = x.defined,
        p = x.extend,
        f = x.fireEvent,
        v = x.isArray,
        G = x.isNumber,
        H = x.merge,
        K = x.pick,
        y = x.objectEach;
      x = (function (a) {
        function t() {
          var c = (null !== a && a.apply(this, arguments)) || this;
          c.borderWidth = void 0;
          c.data = void 0;
          c.group = void 0;
          c.options = void 0;
          c.points = void 0;
          return c;
        }
        u(t, a);
        t.prototype.animate = function (a) {
          var c = this,
            e = this.yAxis,
            b = c.options,
            d = this.chart.inverted,
            f = {},
            k = d ? "translateX" : "translateY";
          if (a)
            (f.scaleY = 0.001),
              (a = m(e.toPixels(b.threshold), e.pos, e.pos + e.len)),
              d ? (f.translateX = a - e.len) : (f.translateY = a),
              c.clipBox && c.setClip(),
              c.group.attr(f);
          else {
            var h = Number(c.group.attr(k));
            c.group.animate(
              { scaleY: 1 },
              p(n(c.options.animation), {
                step: function (b, a) {
                  c.group &&
                    ((f[k] = h + a.pos * (e.pos - h)), c.group.attr(f));
                },
              })
            );
          }
        };
        t.prototype.init = function (c, g) {
          a.prototype.init.apply(this, arguments);
          var e = this;
          c = e.chart;
          c.hasRendered &&
            c.series.forEach(function (b) {
              b.type === e.type && (b.isDirty = !0);
            });
        };
        t.prototype.getColumnMetrics = function () {
          var a = this,
            c = a.options,
            e = a.xAxis,
            b = a.yAxis,
            d = e.options.reversedStacks;
          d = (e.reversed && !d) || (!e.reversed && d);
          var f = {},
            h,
            l = 0;
          !1 === c.grouping
            ? (l = 1)
            : a.chart.series.forEach(function (d) {
                var c = d.yAxis,
                  e = d.options;
                if (
                  d.type === a.type &&
                  (d.visible || !a.chart.options.chart.ignoreHiddenSeries) &&
                  b.len === c.len &&
                  b.pos === c.pos
                ) {
                  if (e.stacking && "group" !== e.stacking) {
                    h = d.stackKey;
                    "undefined" === typeof f[h] && (f[h] = l++);
                    var g = f[h];
                  } else !1 !== e.grouping && (g = l++);
                  d.columnIndex = g;
                }
              });
          var m = Math.min(
              Math.abs(e.transA) *
                ((e.ordinal && e.ordinal.slope) ||
                  c.pointRange ||
                  e.closestPointRange ||
                  e.tickInterval ||
                  1),
              e.len
            ),
            p = m * c.groupPadding,
            t = (m - 2 * p) / (l || 1);
          c = Math.min(
            c.maxPointWidth || e.len,
            K(c.pointWidth, t * (1 - 2 * c.pointPadding))
          );
          a.columnMetrics = {
            width: c,
            offset:
              (t - c) / 2 +
              (p + ((a.columnIndex || 0) + (d ? 1 : 0)) * t - m / 2) *
                (d ? -1 : 1),
            paddedWidth: t,
            columnCount: l,
          };
          return a.columnMetrics;
        };
        t.prototype.crispCol = function (a, c, e, b) {
          var d = this.chart,
            g = this.borderWidth,
            f = -(g % 2 ? 0.5 : 0);
          g = g % 2 ? 0.5 : 1;
          d.inverted && d.renderer.isVML && (g += 1);
          this.options.crisp &&
            ((e = Math.round(a + e) + f), (a = Math.round(a) + f), (e -= a));
          b = Math.round(c + b) + g;
          f = 0.5 >= Math.abs(c) && 0.5 < b;
          c = Math.round(c) + g;
          b -= c;
          f && b && (--c, (b += 1));
          return { x: a, y: c, width: e, height: b };
        };
        t.prototype.adjustForMissingColumns = function (a, c, e, b) {
          var d = this,
            g = this.options.stacking;
          if (!e.isNull && 1 < b.columnCount) {
            var f = this.yAxis.options.reversedStacks,
              k = 0,
              h = f ? 0 : -b.columnCount;
            y(this.yAxis.stacking && this.yAxis.stacking.stacks, function (b) {
              if ("number" === typeof e.x) {
                var a = b[e.x.toString()];
                a &&
                  ((b = a.points[d.index]),
                  g
                    ? (b && (k = h), a.hasValidPoints && (f ? h++ : h--))
                    : v(b) &&
                      ((b = Object.keys(a.points)
                        .filter(function (b) {
                          return (
                            !b.match(",") &&
                            a.points[b] &&
                            1 < a.points[b].length
                          );
                        })
                        .map(parseFloat)
                        .sort(function (b, a) {
                          return a - b;
                        })),
                      (k = b.indexOf(d.index)),
                      (h = b.length)));
              }
            });
            a =
              (e.plotX || 0) +
              ((h - 1) * b.paddedWidth + c) / 2 -
              c -
              k * b.paddedWidth;
          }
          return a;
        };
        t.prototype.translate = function () {
          var a = this,
            c = a.chart,
            e = a.options,
            b = (a.dense = 2 > a.closestPointRange * a.xAxis.transA);
          b = a.borderWidth = K(e.borderWidth, b ? 0 : 1);
          var d = a.xAxis,
            f = a.yAxis,
            h = e.threshold,
            p = (a.translatedThreshold = f.getThreshold(h)),
            t = K(e.minPointLength, 5),
            n = a.getColumnMetrics(),
            w = n.width,
            u = (a.pointXOffset = n.offset),
            q = a.dataMin,
            y = a.dataMax,
            v = (a.barW = Math.max(w, 1 + 2 * b));
          c.inverted && (p -= 0.5);
          e.pointPadding && (v = Math.ceil(v));
          C.prototype.translate.apply(a);
          a.points.forEach(function (b) {
            var g = K(b.yBottom, p),
              k = 999 + Math.abs(g),
              r = b.plotX || 0;
            k = m(b.plotY, -k, f.len + k);
            var z = Math.min(k, g),
              I = Math.max(k, g) - z,
              D = w,
              N = r + u,
              x = v;
            t &&
              Math.abs(I) < t &&
              ((I = t),
              (r = (!f.reversed && !b.negative) || (f.reversed && b.negative)),
              G(h) &&
                G(y) &&
                b.y === h &&
                y <= h &&
                (f.min || 0) < h &&
                (q !== y || (f.max || 0) <= h) &&
                (r = !r),
              (z = Math.abs(z - p) > t ? g - t : p - (r ? t : 0)));
            l(b.options.pointWidth) &&
              ((D = x = Math.ceil(b.options.pointWidth)),
              (N -= Math.round((D - w) / 2)));
            e.centerInCategory && (N = a.adjustForMissingColumns(N, D, b, n));
            b.barX = N;
            b.pointWidth = D;
            b.tooltipPos = c.inverted
              ? [
                  m(
                    f.len + f.pos - c.plotLeft - k,
                    f.pos - c.plotLeft,
                    f.len + f.pos - c.plotLeft
                  ),
                  d.len + d.pos - c.plotTop - N - x / 2,
                  I,
                ]
              : [
                  d.left - c.plotLeft + N + x / 2,
                  m(
                    k + f.pos - c.plotTop,
                    f.pos - c.plotTop,
                    f.len + f.pos - c.plotTop
                  ),
                  I,
                ];
            b.shapeType = a.pointClass.prototype.shapeType || "rect";
            b.shapeArgs = a.crispCol.apply(
              a,
              b.isNull ? [N, p, x, 0] : [N, z, x, I]
            );
          });
        };
        t.prototype.drawGraph = function () {
          this.group[this.dense ? "addClass" : "removeClass"](
            "highcharts-dense-data"
          );
        };
        t.prototype.pointAttribs = function (a, g) {
          var e = this.options,
            b = this.pointAttrToOptions || {},
            d = b.stroke || "borderColor",
            f = b["stroke-width"] || "borderWidth",
            k = (a && a.color) || this.color,
            h = (a && a[d]) || e[d] || k;
          b = (a && a.options.dashStyle) || e.dashStyle;
          var l = (a && a[f]) || e[f] || this[f] || 0,
            m = K(a && a.opacity, e.opacity, 1);
          if (a && this.zones.length) {
            var p = a.getZone();
            k =
              a.options.color ||
              (p && (p.color || a.nonZonedColor)) ||
              this.color;
            p &&
              ((h = p.borderColor || h),
              (b = p.dashStyle || b),
              (l = p.borderWidth || l));
          }
          g &&
            a &&
            ((a = H(
              e.states[g],
              (a.options.states && a.options.states[g]) || {}
            )),
            (g = a.brightness),
            (k =
              a.color ||
              ("undefined" !== typeof g && c(k).brighten(a.brightness).get()) ||
              k),
            (h = a[d] || h),
            (l = a[f] || l),
            (b = a.dashStyle || b),
            (m = K(a.opacity, m)));
          d = { fill: k, stroke: h, "stroke-width": l, opacity: m };
          b && (d.dashstyle = b);
          return d;
        };
        t.prototype.drawPoints = function (a) {
          void 0 === a && (a = this.points);
          var c = this,
            e = this.chart,
            b = c.options,
            d = e.renderer,
            f = b.animationLimit || 250,
            k;
          a.forEach(function (a) {
            var g = a.graphic,
              r = !!g,
              h = g && e.pointCount < f ? "animate" : "attr";
            if (G(a.plotY) && null !== a.y) {
              k = a.shapeArgs;
              g && a.hasNewShapeType() && (g = g.destroy());
              c.enabledDataSorting &&
                (a.startXPos = c.xAxis.reversed
                  ? -(k ? k.width || 0 : 0)
                  : c.xAxis.width);
              g ||
                ((a.graphic = g = d[a.shapeType](k).add(a.group || c.group)) &&
                  c.enabledDataSorting &&
                  e.hasRendered &&
                  e.pointCount < f &&
                  (g.attr({ x: a.startXPos }), (r = !0), (h = "animate")));
              if (g && r) g[h](H(k));
              if (b.borderRadius) g[h]({ r: b.borderRadius });
              e.styledMode ||
                g[h](c.pointAttribs(a, a.selected && "select")).shadow(
                  !1 !== a.allowShadow && b.shadow,
                  null,
                  b.stacking && !b.borderRadius
                );
              g &&
                (g.addClass(a.getClassName(), !0),
                g.attr({ visibility: a.visible ? "inherit" : "hidden" }));
            } else g && (a.graphic = g.destroy());
          });
        };
        t.prototype.drawTracker = function (a) {
          void 0 === a && (a = this.points);
          var c = this,
            e = c.chart,
            b = e.pointer,
            d = function (a) {
              var d = b.getPointFromEvent(a);
              "undefined" !== typeof d &&
                ((b.isDirectTouch = !0), d.onMouseOver(a));
            },
            k;
          a.forEach(function (b) {
            k = v(b.dataLabels)
              ? b.dataLabels
              : b.dataLabel
              ? [b.dataLabel]
              : [];
            b.graphic && (b.graphic.element.point = b);
            k.forEach(function (a) {
              a.div ? (a.div.point = b) : (a.element.point = b);
            });
          });
          c._hasTracking ||
            (c.trackerGroups.forEach(function (a) {
              if (c[a]) {
                c[a]
                  .addClass("highcharts-tracker")
                  .on("mouseover", d)
                  .on("mouseout", function (a) {
                    b.onTrackerMouseOut(a);
                  });
                if (h) c[a].on("touchstart", d);
                !e.styledMode &&
                  c.options.cursor &&
                  c[a].css({ cursor: c.options.cursor });
              }
            }),
            (c._hasTracking = !0));
          f(this, "afterDrawTracker");
        };
        t.prototype.remove = function () {
          var a = this,
            c = a.chart;
          c.hasRendered &&
            c.series.forEach(function (c) {
              c.type === a.type && (c.isDirty = !0);
            });
          C.prototype.remove.apply(a, arguments);
        };
        t.defaultOptions = H(C.defaultOptions, A);
        return t;
      })(C);
      p(x.prototype, {
        cropShoulder: 0,
        directTouch: !0,
        drawLegendSymbol: B.drawRectangle,
        getSymbol: a,
        negStacks: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      F.registerSeriesType("column", x);
      ("");
      return x;
    }
  );
  J(
    a,
    "Core/Series/DataLabel.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      var v = a.getDeferredAnimation,
        B = q.format,
        C = A.defined,
        F = A.extend,
        x = A.fireEvent,
        u = A.isArray,
        n = A.isString,
        c = A.merge,
        h = A.objectEach,
        m = A.pick,
        l = A.splat,
        p;
      (function (a) {
        function f(a, c, e, b, d) {
          var g = this,
            f = this.chart,
            k = this.isCartesian && f.inverted,
            h = this.enabledDataSorting,
            l = a.plotX,
            p = a.plotY,
            t = e.rotation,
            n = e.align,
            w =
              C(l) &&
              C(p) &&
              f.isInsidePlot(l, Math.round(p), {
                inverted: k,
                paneCoordinates: !0,
                series: g,
              });
          p = function (b) {
            h && g.xAxis && !u && g.setDataLabelStartPos(a, c, d, w, b);
          };
          var u = "justify" === m(e.overflow, h ? "none" : "justify");
          l =
            this.visible &&
            !1 !== a.visible &&
            C(l) &&
            (a.series.forceDL ||
              (h && !u) ||
              w ||
              (m(e.inside, !!this.options.stacking) &&
                b &&
                f.isInsidePlot(l, k ? b.x + 1 : b.y + b.height - 1, {
                  inverted: k,
                  paneCoordinates: !0,
                  series: g,
                })));
          k = a.pos();
          if (l && k) {
            t && c.attr({ align: n });
            n = c.getBBox(!0);
            var q = [0, 0];
            var y = f.renderer.fontMetrics(
              f.styledMode ? void 0 : e.style.fontSize,
              c
            ).b;
            b = F({ x: k[0], y: Math.round(k[1]), width: 0, height: 0 }, b);
            F(e, { width: n.width, height: n.height });
            t
              ? ((u = !1),
                (q = f.renderer.rotCorr(y, t)),
                (y = {
                  x: b.x + (e.x || 0) + b.width / 2 + q.x,
                  y:
                    b.y +
                    (e.y || 0) +
                    { top: 0, middle: 0.5, bottom: 1 }[e.verticalAlign] *
                      b.height,
                }),
                (q = [n.x - Number(c.attr("x")), n.y - Number(c.attr("y"))]),
                p(y),
                c[d ? "attr" : "animate"](y))
              : (p(b), c.align(e, void 0, b), (y = c.alignAttr));
            u && 0 <= b.height
              ? this.justifyDataLabel(c, e, y, n, b, d)
              : m(e.crop, !0) &&
                ((b = y.x),
                (p = y.y),
                (b += q[0]),
                (p += q[1]),
                (l =
                  f.isInsidePlot(b, p, { paneCoordinates: !0, series: g }) &&
                  f.isInsidePlot(b + n.width, p + n.height, {
                    paneCoordinates: !0,
                    series: g,
                  })));
            if (e.shape && !t)
              c[d ? "attr" : "animate"]({ anchorX: k[0], anchorY: k[1] });
          }
          d && h && (c.placed = !1);
          l || (h && !u) ? c.show() : (c.hide(), (c.placed = !1));
        }
        function p(a, c) {
          var e = c.filter;
          return e
            ? ((c = e.operator),
              (a = a[e.property]),
              (e = e.value),
              (">" === c && a > e) ||
              ("<" === c && a < e) ||
              (">=" === c && a >= e) ||
              ("<=" === c && a <= e) ||
              ("==" === c && a == e) ||
              ("===" === c && a === e)
                ? !0
                : !1)
            : !0;
        }
        function q(a) {
          void 0 === a && (a = this.points);
          var c = this,
            e = c.chart,
            b = c.options,
            d = c.hasRendered || 0,
            f = e.renderer,
            k = e.options.chart,
            t = k.backgroundColor;
          k = k.plotBackgroundColor;
          var w = f.getContrast((n(k) && k) || (n(t) && t) || "#000000"),
            q = b.dataLabels,
            D;
          t = q.animation;
          t = q.defer ? v(e, t, c) : { defer: 0, duration: 0 };
          q = y(
            y(
              e.options.plotOptions &&
                e.options.plotOptions.series &&
                e.options.plotOptions.series.dataLabels,
              e.options.plotOptions &&
                e.options.plotOptions[c.type] &&
                e.options.plotOptions[c.type].dataLabels
            ),
            q
          );
          x(this, "drawDataLabels");
          if (u(q) || q.enabled || c._hasPointLabels) {
            var A = c.plotGroup(
              "dataLabelsGroup",
              "data-labels",
              d ? "inherit" : "hidden",
              q.zIndex || 6
            );
            A.attr({ opacity: +d });
            !d &&
              (d = c.dataLabelsGroup) &&
              (c.visible && A.show(),
              d[b.animation ? "animate" : "attr"]({ opacity: 1 }, t));
            a.forEach(function (a) {
              D = l(y(q, a.dlOptions || (a.options && a.options.dataLabels)));
              D.forEach(function (d, g) {
                var k =
                    d.enabled && (!a.isNull || a.dataLabelOnNull) && p(a, d),
                  r = a.connectors ? a.connectors[g] : a.connector,
                  l = a.dataLabels ? a.dataLabels[g] : a.dataLabel,
                  t = !l,
                  z = m(d.distance, a.labelDistance);
                if (k) {
                  var n = a.getLabelConfig();
                  var u = m(d[a.formatPrefix + "Format"], d.format);
                  n = C(u)
                    ? B(u, n, e)
                    : (d[a.formatPrefix + "Formatter"] || d.formatter).call(
                        n,
                        d
                      );
                  u = d.style;
                  var q = d.rotation;
                  e.styledMode ||
                    ((u.color = m(d.color, u.color, c.color, "#000000")),
                    "contrast" === u.color
                      ? ((a.contrastColor = f.getContrast(a.color || c.color)),
                        (u.color =
                          (!C(z) && d.inside) || 0 > z || b.stacking
                            ? a.contrastColor
                            : w))
                      : delete a.contrastColor,
                    b.cursor && (u.cursor = b.cursor));
                  var y = {
                    r: d.borderRadius || 0,
                    rotation: q,
                    padding: d.padding,
                    zIndex: 1,
                  };
                  if (!e.styledMode) {
                    z = d.backgroundColor;
                    var v = d.borderColor;
                    y.fill = "auto" === z ? a.color : z;
                    y.stroke = "auto" === v ? a.color : v;
                    y["stroke-width"] = d.borderWidth;
                  }
                  h(y, function (b, a) {
                    "undefined" === typeof b && delete y[a];
                  });
                }
                !l ||
                  (k &&
                    C(n) &&
                    !!l.div === !!d.useHTML &&
                    ((l.rotation && d.rotation) ||
                      l.rotation === d.rotation)) ||
                  ((t = !0),
                  (a.dataLabel = l = a.dataLabel && a.dataLabel.destroy()),
                  a.dataLabels &&
                    (1 === a.dataLabels.length
                      ? delete a.dataLabels
                      : delete a.dataLabels[g]),
                  g || delete a.dataLabel,
                  r &&
                    ((a.connector = a.connector.destroy()),
                    a.connectors &&
                      (1 === a.connectors.length
                        ? delete a.connectors
                        : delete a.connectors[g])));
                k && C(n)
                  ? (l
                      ? (y.text = n)
                      : ((a.dataLabels = a.dataLabels || []),
                        (l = a.dataLabels[g] =
                          q
                            ? f
                                .text(n, 0, 0, d.useHTML)
                                .addClass("highcharts-data-label")
                            : f.label(
                                n,
                                0,
                                0,
                                d.shape,
                                null,
                                null,
                                d.useHTML,
                                null,
                                "data-label"
                              )),
                        g || (a.dataLabel = l),
                        l.addClass(
                          " highcharts-data-label-color-" +
                            a.colorIndex +
                            " " +
                            (d.className || "") +
                            (d.useHTML ? " highcharts-tracker" : "")
                        )),
                    (l.options = d),
                    l.attr(y),
                    e.styledMode || l.css(u).shadow(d.shadow),
                    (g = d[a.formatPrefix + "TextPath"] || d.textPath) &&
                      !d.useHTML &&
                      (l.setTextPath(
                        (a.getDataLabelPath && a.getDataLabelPath(l)) ||
                          a.graphic,
                        g
                      ),
                      a.dataLabelPath &&
                        !g.enabled &&
                        (a.dataLabelPath = a.dataLabelPath.destroy())),
                    l.added || l.add(A),
                    c.alignDataLabel(a, l, d, null, t))
                  : l && l.hide();
              });
            });
          }
          x(this, "afterDrawDataLabels");
        }
        function A(a, c, e, b, d, f) {
          var g = this.chart,
            k = c.align,
            r = c.verticalAlign,
            h = a.box ? 0 : a.padding || 0,
            l = c.x;
          l = void 0 === l ? 0 : l;
          var m = c.y;
          m = void 0 === m ? 0 : m;
          var p = (e.x || 0) + h;
          if (0 > p) {
            "right" === k && 0 <= l
              ? ((c.align = "left"), (c.inside = !0))
              : (l -= p);
            var t = !0;
          }
          p = (e.x || 0) + b.width - h;
          p > g.plotWidth &&
            ("left" === k && 0 >= l
              ? ((c.align = "right"), (c.inside = !0))
              : (l += g.plotWidth - p),
            (t = !0));
          p = e.y + h;
          0 > p &&
            ("bottom" === r && 0 <= m
              ? ((c.verticalAlign = "top"), (c.inside = !0))
              : (m -= p),
            (t = !0));
          p = (e.y || 0) + b.height - h;
          p > g.plotHeight &&
            ("top" === r && 0 >= m
              ? ((c.verticalAlign = "bottom"), (c.inside = !0))
              : (m += g.plotHeight - p),
            (t = !0));
          t && ((c.x = l), (c.y = m), (a.placed = !f), a.align(c, void 0, d));
          return t;
        }
        function y(a, g) {
          var e = [],
            b;
          if (u(a) && !u(g))
            e = a.map(function (b) {
              return c(b, g);
            });
          else if (u(g) && !u(a))
            e = g.map(function (b) {
              return c(a, b);
            });
          else if (u(a) || u(g))
            for (b = Math.max(a.length, g.length); b--; ) e[b] = c(a[b], g[b]);
          else e = c(a, g);
          return e;
        }
        function t(a, c, e, b, d) {
          var g = this.chart,
            f = g.inverted,
            k = this.xAxis,
            h = k.reversed,
            l = f ? c.height / 2 : c.width / 2;
          a = (a = a.pointWidth) ? a / 2 : 0;
          c.startXPos = f ? d.x : h ? -l - a : k.width - l + a;
          c.startYPos = f ? (h ? this.yAxis.height - l + a : -l - a) : d.y;
          b
            ? "hidden" === c.visibility &&
              (c.show(), c.attr({ opacity: 0 }).animate({ opacity: 1 }))
            : c.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, c.hide);
          g.hasRendered &&
            (e && c.attr({ x: c.startXPos, y: c.startYPos }), (c.placed = !0));
        }
        var w = [];
        a.compose = function (a) {
          if (-1 === w.indexOf(a)) {
            var c = a.prototype;
            w.push(a);
            c.alignDataLabel = f;
            c.drawDataLabels = q;
            c.justifyDataLabel = A;
            c.setDataLabelStartPos = t;
          }
        };
      })(p || (p = {}));
      ("");
      return p;
    }
  );
  J(
    a,
    "Series/Column/ColumnDataLabel.js",
    [
      a["Core/Series/DataLabel.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      var v = q.series,
        B = A.merge,
        C = A.pick,
        F;
      (function (q) {
        function u(a, h, m, l, p) {
          var c = this.chart.inverted,
            n = a.series,
            u = (n.xAxis ? n.xAxis.len : this.chart.plotSizeX) || 0;
          n = (n.yAxis ? n.yAxis.len : this.chart.plotSizeY) || 0;
          var q = a.dlBox || a.shapeArgs,
            x = C(a.below, a.plotY > C(this.translatedThreshold, n)),
            y = C(m.inside, !!this.options.stacking);
          q &&
            ((l = B(q)),
            0 > l.y && ((l.height += l.y), (l.y = 0)),
            (q = l.y + l.height - n),
            0 < q && q < l.height && (l.height -= q),
            c &&
              (l = {
                x: n - l.y - l.height,
                y: u - l.x - l.width,
                width: l.height,
                height: l.width,
              }),
            y ||
              (c
                ? ((l.x += x ? 0 : l.width), (l.width = 0))
                : ((l.y += x ? l.height : 0), (l.height = 0))));
          m.align = C(m.align, !c || y ? "center" : x ? "right" : "left");
          m.verticalAlign = C(
            m.verticalAlign,
            c || y ? "middle" : x ? "top" : "bottom"
          );
          v.prototype.alignDataLabel.call(this, a, h, m, l, p);
          m.inside && a.contrastColor && h.css({ color: a.contrastColor });
        }
        var n = [];
        q.compose = function (c) {
          a.compose(v);
          -1 === n.indexOf(c) && (n.push(c), (c.prototype.alignDataLabel = u));
        };
      })(F || (F = {}));
      return F;
    }
  );
  J(
    a,
    "Series/Bar/BarSeries.js",
    [
      a["Series/Column/ColumnSeries.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (q, u) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var h in c) c.hasOwnProperty(h) && (a[h] = c[h]);
                };
              return a(q, u);
            };
            return function (q, u) {
              function n() {
                this.constructor = q;
              }
              a(q, u);
              q.prototype =
                null === u
                  ? Object.create(u)
                  : ((n.prototype = u.prototype), new n());
            };
          })(),
        B = A.extend,
        C = A.merge;
      A = (function (q) {
        function x() {
          var a = (null !== q && q.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        v(x, q);
        x.defaultOptions = C(a.defaultOptions, {});
        return x;
      })(a);
      B(A.prototype, { inverted: !0 });
      q.registerSeriesType("bar", A);
      ("");
      return A;
    }
  );
  J(a, "Series/Scatter/ScatterSeriesDefaults.js", [], function () {
    "";
    return {
      lineWidth: 0,
      findNearestPointBy: "xy",
      jitter: { x: 0, y: 0 },
      marker: { enabled: !0 },
      tooltip: {
        headerFormat:
          '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
        pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
      },
    };
  });
  J(
    a,
    "Series/Scatter/ScatterSeries.js",
    [
      a["Series/Scatter/ScatterSeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (c, h) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var h in c) c.hasOwnProperty(h) && (a[h] = c[h]);
                };
              return a(c, h);
            };
            return function (c, h) {
              function m() {
                this.constructor = c;
              }
              a(c, h);
              c.prototype =
                null === h
                  ? Object.create(h)
                  : ((m.prototype = h.prototype), new m());
            };
          })(),
        B = q.seriesTypes,
        C = B.column,
        F = B.line;
      B = A.addEvent;
      var x = A.extend,
        u = A.merge;
      A = (function (n) {
        function c() {
          var a = (null !== n && n.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        v(c, n);
        c.prototype.applyJitter = function () {
          var a = this,
            c = this.options.jitter,
            l = this.points.length;
          c &&
            this.points.forEach(function (h, f) {
              ["x", "y"].forEach(function (m, p) {
                var n = "plot" + m.toUpperCase();
                if (c[m] && !h.isNull) {
                  var u = a[m + "Axis"];
                  var q = c[m] * u.transA;
                  if (u && !u.isLog) {
                    var t = Math.max(0, h[n] - q);
                    u = Math.min(u.len, h[n] + q);
                    p = 1e4 * Math.sin(f + p * l);
                    h[n] = t + (u - t) * (p - Math.floor(p));
                    "x" === m && (h.clientX = h.plotX);
                  }
                }
              });
            });
        };
        c.prototype.drawGraph = function () {
          this.options.lineWidth
            ? n.prototype.drawGraph.call(this)
            : this.graph && (this.graph = this.graph.destroy());
        };
        c.defaultOptions = u(F.defaultOptions, a);
        return c;
      })(F);
      x(A.prototype, {
        drawTracker: C.prototype.drawTracker,
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
      });
      B(A, "afterTranslate", function () {
        this.applyJitter();
      });
      q.registerSeriesType("scatter", A);
      return A;
    }
  );
  J(
    a,
    "Series/CenteredUtilities.js",
    [a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]],
    function (a, q, A) {
      var v = a.deg2rad,
        B = A.fireEvent,
        C = A.isNumber,
        F = A.pick,
        x = A.relativeLength,
        u;
      (function (a) {
        a.getCenter = function () {
          var a = this.options,
            h = this.chart,
            m = 2 * (a.slicedOffset || 0),
            l = h.plotWidth - 2 * m,
            p = h.plotHeight - 2 * m,
            f = a.center,
            n = Math.min(l, p),
            u = a.thickness,
            v = a.size,
            A = a.innerSize || 0;
          "string" === typeof v && (v = parseFloat(v));
          "string" === typeof A && (A = parseFloat(A));
          a = [
            F(f[0], "50%"),
            F(f[1], "50%"),
            F(v && 0 > v ? void 0 : a.size, "100%"),
            F(A && 0 > A ? void 0 : a.innerSize || 0, "0%"),
          ];
          !h.angular || this instanceof q || (a[3] = 0);
          for (f = 0; 4 > f; ++f)
            (v = a[f]),
              (h = 2 > f || (2 === f && /%$/.test(v))),
              (a[f] = x(v, [l, p, n, a[2]][f]) + (h ? m : 0));
          a[3] > a[2] && (a[3] = a[2]);
          C(u) && 2 * u < a[2] && 0 < u && (a[3] = a[2] - 2 * u);
          B(this, "afterGetCenter", { positions: a });
          return a;
        };
        a.getStartAndEndRadians = function (a, h) {
          a = C(a) ? a : 0;
          h = C(h) && h > a && 360 > h - a ? h : a + 360;
          return { start: v * (a + -90), end: v * (h + -90) };
        };
      })(u || (u = {}));
      ("");
      return u;
    }
  );
  J(
    a,
    "Series/Pie/PiePoint.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Series/Point.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (c, m) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f]);
                };
              return a(c, m);
            };
            return function (c, m) {
              function h() {
                this.constructor = c;
              }
              a(c, m);
              c.prototype =
                null === m
                  ? Object.create(m)
                  : ((h.prototype = m.prototype), new h());
            };
          })(),
        B = a.setAnimation,
        C = A.addEvent,
        F = A.defined;
      a = A.extend;
      var x = A.isNumber,
        u = A.pick,
        n = A.relativeLength;
      q = (function (a) {
        function c() {
          var c = (null !== a && a.apply(this, arguments)) || this;
          c.labelDistance = void 0;
          c.options = void 0;
          c.series = void 0;
          return c;
        }
        v(c, a);
        c.prototype.getConnectorPath = function () {
          var a = this.labelPosition,
            c = this.series.options.dataLabels,
            h = this.connectorShapes,
            f = c.connectorShape;
          h[f] && (f = h[f]);
          return f.call(
            this,
            { x: a.final.x, y: a.final.y, alignment: a.alignment },
            a.connectorPosition,
            c
          );
        };
        c.prototype.getTranslate = function () {
          return this.sliced
            ? this.slicedTranslation
            : { translateX: 0, translateY: 0 };
        };
        c.prototype.haloPath = function (a) {
          var c = this.shapeArgs;
          return this.sliced || !this.visible
            ? []
            : this.series.chart.renderer.symbols.arc(
                c.x,
                c.y,
                c.r + a,
                c.r + a,
                { innerR: c.r - 1, start: c.start, end: c.end }
              );
        };
        c.prototype.init = function () {
          var c = this;
          a.prototype.init.apply(this, arguments);
          this.name = u(this.name, "Slice");
          var h = function (a) {
            c.slice("select" === a.type);
          };
          C(this, "select", h);
          C(this, "unselect", h);
          return this;
        };
        c.prototype.isValid = function () {
          return x(this.y) && 0 <= this.y;
        };
        c.prototype.setVisible = function (a, c) {
          var h = this,
            f = this.series,
            l = f.chart,
            m = f.options.ignoreHiddenPoint;
          c = u(c, m);
          a !== this.visible &&
            ((this.visible =
              this.options.visible =
              a =
                "undefined" === typeof a ? !this.visible : a),
            (f.options.data[f.data.indexOf(this)] = this.options),
            ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(
              function (c) {
                if (h[c]) h[c][a ? "show" : "hide"](a);
              }
            ),
            this.legendItem && l.legend.colorizeItem(this, a),
            a || "hover" !== this.state || this.setState(""),
            m && (f.isDirty = !0),
            c && l.redraw());
        };
        c.prototype.slice = function (a, c, h) {
          var f = this.series;
          B(h, f.chart);
          u(c, !0);
          this.sliced = this.options.sliced = F(a) ? a : !this.sliced;
          f.options.data[f.data.indexOf(this)] = this.options;
          this.graphic && this.graphic.animate(this.getTranslate());
          this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
        };
        return c;
      })(q);
      a(q.prototype, {
        connectorShapes: {
          fixedOffset: function (a, h, m) {
            var c = h.breakAt;
            h = h.touchingSliceAt;
            return [
              ["M", a.x, a.y],
              m.softConnector
                ? [
                    "C",
                    a.x + ("left" === a.alignment ? -5 : 5),
                    a.y,
                    2 * c.x - h.x,
                    2 * c.y - h.y,
                    c.x,
                    c.y,
                  ]
                : ["L", c.x, c.y],
              ["L", h.x, h.y],
            ];
          },
          straight: function (a, h) {
            h = h.touchingSliceAt;
            return [
              ["M", a.x, a.y],
              ["L", h.x, h.y],
            ];
          },
          crookedLine: function (a, h, m) {
            h = h.touchingSliceAt;
            var c = this.series,
              p = c.center[0],
              f = c.chart.plotWidth,
              u = c.chart.plotLeft;
            c = a.alignment;
            var q = this.shapeArgs.r;
            m = n(m.crookDistance, 1);
            f =
              "left" === c
                ? p + q + (f + u - p - q) * (1 - m)
                : u + (p - q) * m;
            m = ["L", f, a.y];
            p = !0;
            if ("left" === c ? f > a.x || f < h.x : f < a.x || f > h.x) p = !1;
            a = [["M", a.x, a.y]];
            p && a.push(m);
            a.push(["L", h.x, h.y]);
            return a;
          },
        },
      });
      return q;
    }
  );
  J(a, "Series/Pie/PieSeriesDefaults.js", [], function () {
    "";
    return {
      center: [null, null],
      clip: !1,
      colorByPoint: !0,
      dataLabels: {
        allowOverlap: !0,
        connectorPadding: 5,
        connectorShape: "fixedOffset",
        crookDistance: "70%",
        distance: 30,
        enabled: !0,
        formatter: function () {
          return this.point.isNull ? void 0 : this.point.name;
        },
        softConnector: !0,
        x: 0,
      },
      fillColor: void 0,
      ignoreHiddenPoint: !0,
      inactiveOtherPoints: !0,
      legendType: "point",
      marker: null,
      size: null,
      showInLegend: !1,
      slicedOffset: 10,
      stickyTracking: !1,
      tooltip: { followPointer: !0 },
      borderColor: "#ffffff",
      borderWidth: 1,
      lineWidth: void 0,
      states: { hover: { brightness: 0.1 } },
    };
  });
  J(
    a,
    "Series/Pie/PieSeries.js",
    [
      a["Series/CenteredUtilities.js"],
      a["Series/Column/ColumnSeries.js"],
      a["Core/Globals.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Series/Pie/PiePoint.js"],
      a["Series/Pie/PieSeriesDefaults.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/Symbols.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C, F, x, u, n) {
      var c =
          (this && this.__extends) ||
          (function () {
            var a = function (c, f) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f]);
                };
              return a(c, f);
            };
            return function (c, f) {
              function h() {
                this.constructor = c;
              }
              a(c, f);
              c.prototype =
                null === f
                  ? Object.create(f)
                  : ((h.prototype = f.prototype), new h());
            };
          })(),
        h = a.getStartAndEndRadians;
      A = A.noop;
      var m = n.clamp,
        l = n.extend,
        p = n.fireEvent,
        f = n.merge,
        v = n.pick,
        G = n.relativeLength;
      n = (function (a) {
        function l() {
          var c = (null !== a && a.apply(this, arguments)) || this;
          c.center = void 0;
          c.data = void 0;
          c.maxLabelDistance = void 0;
          c.options = void 0;
          c.points = void 0;
          return c;
        }
        c(l, a);
        l.prototype.animate = function (a) {
          var c = this,
            f = c.points,
            k = c.startAngleRad;
          a ||
            f.forEach(function (a) {
              var e = a.graphic,
                b = a.shapeArgs;
              e &&
                b &&
                (e.attr({
                  r: v(a.startR, c.center && c.center[3] / 2),
                  start: k,
                  end: k,
                }),
                e.animate(
                  { r: b.r, start: b.start, end: b.end },
                  c.options.animation
                ));
            });
        };
        l.prototype.drawEmpty = function () {
          var a = this.startAngleRad,
            c = this.endAngleRad,
            f = this.options;
          if (0 === this.total && this.center) {
            var k = this.center[0];
            var g = this.center[1];
            this.graph ||
              (this.graph = this.chart.renderer
                .arc(k, g, this.center[1] / 2, 0, a, c)
                .addClass("highcharts-empty-series")
                .add(this.group));
            this.graph.attr({
              d: u.arc(k, g, this.center[2] / 2, 0, {
                start: a,
                end: c,
                innerR: this.center[3] / 2,
              }),
            });
            this.chart.styledMode ||
              this.graph.attr({
                "stroke-width": f.borderWidth,
                fill: f.fillColor || "none",
                stroke: f.color || "#cccccc",
              });
          } else this.graph && (this.graph = this.graph.destroy());
        };
        l.prototype.drawPoints = function () {
          var a = this.chart.renderer;
          this.points.forEach(function (c) {
            c.graphic &&
              c.hasNewShapeType() &&
              (c.graphic = c.graphic.destroy());
            c.graphic ||
              ((c.graphic = a[c.shapeType](c.shapeArgs).add(c.series.group)),
              (c.delayedRendering = !0));
          });
        };
        l.prototype.generatePoints = function () {
          a.prototype.generatePoints.call(this);
          this.updateTotals();
        };
        l.prototype.getX = function (a, c, f) {
          var k = this.center,
            g = this.radii ? this.radii[f.index] || 0 : k[2] / 2;
          a = Math.asin(m((a - k[1]) / (g + f.labelDistance), -1, 1));
          return (
            k[0] +
            (c ? -1 : 1) * Math.cos(a) * (g + f.labelDistance) +
            (0 < f.labelDistance
              ? (c ? -1 : 1) * this.options.dataLabels.padding
              : 0)
          );
        };
        l.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        l.prototype.redrawPoints = function () {
          var a = this,
            c = a.chart,
            h = c.renderer,
            k = a.options.shadow,
            g,
            e,
            b,
            d;
          this.drawEmpty();
          !k ||
            a.shadowGroup ||
            c.styledMode ||
            (a.shadowGroup = h.g("shadow").attr({ zIndex: -1 }).add(a.group));
          a.points.forEach(function (r) {
            var l = {};
            e = r.graphic;
            if (!r.isNull && e) {
              var m = void 0;
              d = r.shapeArgs;
              g = r.getTranslate();
              c.styledMode ||
                ((m = r.shadowGroup),
                k &&
                  !m &&
                  (m = r.shadowGroup = h.g("shadow").add(a.shadowGroup)),
                m && m.attr(g),
                (b = a.pointAttribs(r, r.selected && "select")));
              r.delayedRendering
                ? (e.setRadialReference(a.center).attr(d).attr(g),
                  c.styledMode ||
                    e.attr(b).attr({ "stroke-linejoin": "round" }).shadow(k, m),
                  (r.delayedRendering = !1))
                : (e.setRadialReference(a.center),
                  c.styledMode || f(!0, l, b),
                  f(!0, l, d, g),
                  e.animate(l));
              e.attr({ visibility: r.visible ? "inherit" : "hidden" });
              e.addClass(r.getClassName(), !0);
            } else e && (r.graphic = e.destroy());
          });
        };
        l.prototype.sortByAngle = function (a, c) {
          a.sort(function (a, f) {
            return "undefined" !== typeof a.angle && (f.angle - a.angle) * c;
          });
        };
        l.prototype.translate = function (a) {
          p(this, "translate");
          this.generatePoints();
          var c = this.options,
            f = c.slicedOffset,
            k = f + (c.borderWidth || 0),
            g = h(c.startAngle, c.endAngle),
            e = (this.startAngleRad = g.start);
          g = (this.endAngleRad = g.end) - e;
          var b = this.points,
            d = c.dataLabels.distance;
          c = c.ignoreHiddenPoint;
          var r = b.length,
            l,
            m = 0;
          a || (this.center = a = this.getCenter());
          for (l = 0; l < r; l++) {
            var n = b[l];
            var u = e + m * g;
            !n.isValid() || (c && !n.visible) || (m += n.percentage / 100);
            var q = e + m * g;
            var y = {
              x: a[0],
              y: a[1],
              r: a[2] / 2,
              innerR: a[3] / 2,
              start: Math.round(1e3 * u) / 1e3,
              end: Math.round(1e3 * q) / 1e3,
            };
            n.shapeType = "arc";
            n.shapeArgs = y;
            n.labelDistance = v(
              n.options.dataLabels && n.options.dataLabels.distance,
              d
            );
            n.labelDistance = G(n.labelDistance, y.r);
            this.maxLabelDistance = Math.max(
              this.maxLabelDistance || 0,
              n.labelDistance
            );
            q = (q + u) / 2;
            q > 1.5 * Math.PI
              ? (q -= 2 * Math.PI)
              : q < -Math.PI / 2 && (q += 2 * Math.PI);
            n.slicedTranslation = {
              translateX: Math.round(Math.cos(q) * f),
              translateY: Math.round(Math.sin(q) * f),
            };
            y = (Math.cos(q) * a[2]) / 2;
            var D = (Math.sin(q) * a[2]) / 2;
            n.tooltipPos = [a[0] + 0.7 * y, a[1] + 0.7 * D];
            n.half = q < -Math.PI / 2 || q > Math.PI / 2 ? 1 : 0;
            n.angle = q;
            u = Math.min(k, n.labelDistance / 5);
            n.labelPosition = {
              natural: {
                x: a[0] + y + Math.cos(q) * n.labelDistance,
                y: a[1] + D + Math.sin(q) * n.labelDistance,
              },
              final: {},
              alignment:
                0 > n.labelDistance ? "center" : n.half ? "right" : "left",
              connectorPosition: {
                breakAt: {
                  x: a[0] + y + Math.cos(q) * u,
                  y: a[1] + D + Math.sin(q) * u,
                },
                touchingSliceAt: { x: a[0] + y, y: a[1] + D },
              },
            };
          }
          p(this, "afterTranslate");
        };
        l.prototype.updateTotals = function () {
          var a = this.points,
            c = a.length,
            f = this.options.ignoreHiddenPoint,
            k,
            g = 0;
          for (k = 0; k < c; k++) {
            var e = a[k];
            !e.isValid() || (f && !e.visible) || (g += e.y);
          }
          this.total = g;
          for (k = 0; k < c; k++)
            (e = a[k]),
              (e.percentage = 0 < g && (e.visible || !f) ? (e.y / g) * 100 : 0),
              (e.total = g);
        };
        l.defaultOptions = f(F.defaultOptions, C);
        return l;
      })(F);
      l(n.prototype, {
        axisTypes: [],
        directTouch: !0,
        drawGraph: void 0,
        drawLegendSymbol: E.drawRectangle,
        drawTracker: q.prototype.drawTracker,
        getCenter: a.getCenter,
        getSymbol: A,
        isCartesian: !1,
        noSharedTooltip: !0,
        pointAttribs: q.prototype.pointAttribs,
        pointClass: B,
        requireSorting: !1,
        searchPoint: A,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      x.registerSeriesType("pie", n);
      return n;
    }
  );
  J(
    a,
    "Series/Pie/PieDataLabel.js",
    [
      a["Core/Series/DataLabel.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B) {
      var v = q.noop,
        F = A.distribute,
        x = E.series,
        u = B.arrayMax,
        n = B.clamp,
        c = B.defined,
        h = B.merge,
        m = B.pick,
        l = B.relativeLength,
        p;
      (function (f) {
        function p() {
          var a = this,
            f = a.data,
            k = a.chart,
            g = a.options.dataLabels || {},
            e = g.connectorPadding,
            b = k.plotWidth,
            d = k.plotHeight,
            r = k.plotLeft,
            l = Math.round(k.chartWidth / 3),
            p = a.center,
            n = p[2] / 2,
            q = p[1],
            y = [[], []],
            v = [0, 0, 0, 0],
            D = a.dataLabelPositioners,
            A,
            B,
            G,
            C,
            E,
            H,
            K,
            J,
            V,
            W,
            Z,
            T;
          a.visible &&
            (g.enabled || a._hasPointLabels) &&
            (f.forEach(function (a) {
              a.dataLabel &&
                a.visible &&
                a.dataLabel.shortened &&
                (a.dataLabel
                  .attr({ width: "auto" })
                  .css({ width: "auto", textOverflow: "clip" }),
                (a.dataLabel.shortened = !1));
            }),
            x.prototype.drawDataLabels.apply(a),
            f.forEach(function (a) {
              a.dataLabel &&
                (a.visible
                  ? (y[a.half].push(a),
                    (a.dataLabel._pos = null),
                    !c(g.style.width) &&
                      !c(
                        a.options.dataLabels &&
                          a.options.dataLabels.style &&
                          a.options.dataLabels.style.width
                      ) &&
                      a.dataLabel.getBBox().width > l &&
                      (a.dataLabel.css({ width: Math.round(0.7 * l) + "px" }),
                      (a.dataLabel.shortened = !0)))
                  : ((a.dataLabel = a.dataLabel.destroy()),
                    a.dataLabels &&
                      1 === a.dataLabels.length &&
                      delete a.dataLabels));
            }),
            y.forEach(function (f, h) {
              var l = f.length,
                t = [],
                z;
              if (l) {
                a.sortByAngle(f, h - 0.5);
                if (0 < a.maxLabelDistance) {
                  var u = Math.max(0, q - n - a.maxLabelDistance);
                  var w = Math.min(q + n + a.maxLabelDistance, k.plotHeight);
                  f.forEach(function (a) {
                    0 < a.labelDistance &&
                      a.dataLabel &&
                      ((a.top = Math.max(0, q - n - a.labelDistance)),
                      (a.bottom = Math.min(
                        q + n + a.labelDistance,
                        k.plotHeight
                      )),
                      (z = a.dataLabel.getBBox().height || 21),
                      (a.distributeBox = {
                        target: a.labelPosition.natural.y - a.top + z / 2,
                        size: z,
                        rank: a.y,
                      }),
                      t.push(a.distributeBox));
                  });
                  u = w + z - u;
                  F(t, u, u / 5);
                }
                for (Z = 0; Z < l; Z++) {
                  A = f[Z];
                  H = A.labelPosition;
                  C = A.dataLabel;
                  W = !1 === A.visible ? "hidden" : "inherit";
                  V = u = H.natural.y;
                  t &&
                    c(A.distributeBox) &&
                    ("undefined" === typeof A.distributeBox.pos
                      ? (W = "hidden")
                      : ((K = A.distributeBox.size),
                        (V = D.radialDistributionY(A))));
                  delete A.positionIndex;
                  if (g.justify) J = D.justify(A, n, p);
                  else
                    switch (g.alignTo) {
                      case "connectors":
                        J = D.alignToConnectors(f, h, b, r);
                        break;
                      case "plotEdges":
                        J = D.alignToPlotEdges(C, h, b, r);
                        break;
                      default:
                        J = D.radialDistributionX(a, A, V, u);
                    }
                  C._attr = { visibility: W, align: H.alignment };
                  T = A.options.dataLabels || {};
                  C._pos = {
                    x:
                      J +
                      m(T.x, g.x) +
                      ({ left: e, right: -e }[H.alignment] || 0),
                    y: V + m(T.y, g.y) - 10,
                  };
                  H.final.x = J;
                  H.final.y = V;
                  m(g.crop, !0) &&
                    ((E = C.getBBox().width),
                    (u = null),
                    J - E < e && 1 === h
                      ? ((u = Math.round(E - J + e)),
                        (v[3] = Math.max(u, v[3])))
                      : J + E > b - e &&
                        0 === h &&
                        ((u = Math.round(J + E - b + e)),
                        (v[1] = Math.max(u, v[1]))),
                    0 > V - K / 2
                      ? (v[0] = Math.max(Math.round(-V + K / 2), v[0]))
                      : V + K / 2 > d &&
                        (v[2] = Math.max(Math.round(V + K / 2 - d), v[2])),
                    (C.sideOverflow = u));
                }
              }
            }),
            0 === u(v) || this.verifyDataLabelOverflow(v)) &&
            (this.placeDataLabels(),
            this.points.forEach(function (b) {
              T = h(g, b.options.dataLabels);
              if ((B = m(T.connectorWidth, 1))) {
                var c;
                G = b.connector;
                if (
                  (C = b.dataLabel) &&
                  C._pos &&
                  b.visible &&
                  0 < b.labelDistance
                ) {
                  W = C._attr.visibility;
                  if ((c = !G))
                    (b.connector = G =
                      k.renderer
                        .path()
                        .addClass(
                          "highcharts-data-label-connector  highcharts-color-" +
                            b.colorIndex +
                            (b.className ? " " + b.className : "")
                        )
                        .add(a.dataLabelsGroup)),
                      k.styledMode ||
                        G.attr({
                          "stroke-width": B,
                          stroke: T.connectorColor || b.color || "#666666",
                        });
                  G[c ? "attr" : "animate"]({ d: b.getConnectorPath() });
                  G.attr("visibility", W);
                } else G && (b.connector = G.destroy());
              }
            }));
        }
        function q() {
          this.points.forEach(function (a) {
            var c = a.dataLabel,
              f;
            c &&
              a.visible &&
              ((f = c._pos)
                ? (c.sideOverflow &&
                    ((c._attr.width = Math.max(
                      c.getBBox().width - c.sideOverflow,
                      0
                    )),
                    c.css({
                      width: c._attr.width + "px",
                      textOverflow:
                        (this.options.dataLabels.style || {}).textOverflow ||
                        "ellipsis",
                    }),
                    (c.shortened = !0)),
                  c.attr(c._attr),
                  c[c.moved ? "animate" : "attr"](f),
                  (c.moved = !0))
                : c && c.attr({ y: -9999 }));
            delete a.distributeBox;
          }, this);
        }
        function A(a) {
          var c = this.center,
            f = this.options,
            g = f.center,
            e = f.minSize || 80,
            b = null !== f.size;
          if (!b) {
            if (null !== g[0]) var d = Math.max(c[2] - Math.max(a[1], a[3]), e);
            else
              (d = Math.max(c[2] - a[1] - a[3], e)),
                (c[0] += (a[3] - a[1]) / 2);
            null !== g[1]
              ? (d = n(d, e, c[2] - Math.max(a[0], a[2])))
              : ((d = n(d, e, c[2] - a[0] - a[2])),
                (c[1] += (a[0] - a[2]) / 2));
            d < c[2]
              ? ((c[2] = d),
                (c[3] = Math.min(
                  f.thickness
                    ? Math.max(0, d - 2 * f.thickness)
                    : Math.max(0, l(f.innerSize || 0, d)),
                  d
                )),
                this.translate(c),
                this.drawDataLabels && this.drawDataLabels())
              : (b = !0);
          }
          return b;
        }
        var B = [],
          y = {
            radialDistributionY: function (a) {
              return a.top + a.distributeBox.pos;
            },
            radialDistributionX: function (a, c, f, g) {
              return a.getX(
                f < c.top + 2 || f > c.bottom - 2 ? g : f,
                c.half,
                c
              );
            },
            justify: function (a, c, f) {
              return f[0] + (a.half ? -1 : 1) * (c + a.labelDistance);
            },
            alignToPlotEdges: function (a, c, f, g) {
              a = a.getBBox().width;
              return c ? a + g : f - a - g;
            },
            alignToConnectors: function (a, c, f, g) {
              var e = 0,
                b;
              a.forEach(function (a) {
                b = a.dataLabel.getBBox().width;
                b > e && (e = b);
              });
              return c ? e + g : f - e - g;
            },
          };
        f.compose = function (c) {
          a.compose(x);
          -1 === B.indexOf(c) &&
            (B.push(c),
            (c = c.prototype),
            (c.dataLabelPositioners = y),
            (c.alignDataLabel = v),
            (c.drawDataLabels = p),
            (c.placeDataLabels = q),
            (c.verifyDataLabelOverflow = A));
        };
      })(p || (p = {}));
      return p;
    }
  );
  J(
    a,
    "Extensions/OverlappingDataLabels.js",
    [a["Core/Chart/Chart.js"], a["Core/Utilities.js"]],
    function (a, q) {
      function v(a, c) {
        var h = !1;
        if (a) {
          var m = a.newOpacity;
          a.oldOpacity !== m &&
            (a.alignAttr && a.placed
              ? (a[m ? "removeClass" : "addClass"](
                  "highcharts-data-label-hidden"
                ),
                (h = !0),
                (a.alignAttr.opacity = m),
                a[a.isOld ? "animate" : "attr"](a.alignAttr, null, function () {
                  c.styledMode || a.css({ pointerEvents: m ? "auto" : "none" });
                }),
                B(c, "afterHideOverlappingLabel"))
              : a.attr({ opacity: m }));
          a.isOld = !0;
        }
        return h;
      }
      var E = q.addEvent,
        B = q.fireEvent,
        C = q.isArray,
        F = q.isNumber,
        x = q.objectEach,
        u = q.pick;
      E(a, "render", function () {
        var a = this,
          c = [];
        (this.labelCollectors || []).forEach(function (a) {
          c = c.concat(a());
        });
        (this.yAxis || []).forEach(function (a) {
          a.stacking &&
            a.options.stackLabels &&
            !a.options.stackLabels.allowOverlap &&
            x(a.stacking.stacks, function (a) {
              x(a, function (a) {
                a.label && c.push(a.label);
              });
            });
        });
        (this.series || []).forEach(function (h) {
          var m = h.options.dataLabels;
          h.visible &&
            (!1 !== m.enabled || h._hasPointLabels) &&
            ((m = function (h) {
              return h.forEach(function (h) {
                h.visible &&
                  (C(h.dataLabels)
                    ? h.dataLabels
                    : h.dataLabel
                    ? [h.dataLabel]
                    : []
                  ).forEach(function (f) {
                    var l = f.options;
                    f.labelrank = u(
                      l.labelrank,
                      h.labelrank,
                      h.shapeArgs && h.shapeArgs.height
                    );
                    l.allowOverlap
                      ? ((f.oldOpacity = f.opacity),
                        (f.newOpacity = 1),
                        v(f, a))
                      : c.push(f);
                  });
              });
            }),
            m(h.nodes || []),
            m(h.points));
        });
        this.hideOverlappingLabels(c);
      });
      a.prototype.hideOverlappingLabels = function (a) {
        var c = this,
          h = a.length,
          m = c.renderer,
          l,
          p,
          f,
          n = !1;
        var u = function (a) {
          var c,
            f = a.box ? 0 : a.padding || 0,
            k = (c = 0),
            g;
          if (a && (!a.alignAttr || a.placed)) {
            var e = a.alignAttr || { x: a.attr("x"), y: a.attr("y") };
            var b = a.parentGroup;
            a.width ||
              ((c = a.getBBox()),
              (a.width = c.width),
              (a.height = c.height),
              (c = m.fontMetrics(null, a.element).h));
            var d = a.width - 2 * f;
            (g = { left: "0", center: "0.5", right: "1" }[a.alignValue])
              ? (k = +g * d)
              : F(a.x) &&
                Math.round(a.x) !== a.translateX &&
                (k = a.x - a.translateX);
            return {
              x: e.x + (b.translateX || 0) + f - (k || 0),
              y: e.y + (b.translateY || 0) + f - c,
              width: a.width - 2 * f,
              height: a.height - 2 * f,
            };
          }
        };
        for (p = 0; p < h; p++)
          if ((l = a[p]))
            (l.oldOpacity = l.opacity),
              (l.newOpacity = 1),
              (l.absoluteBox = u(l));
        a.sort(function (a, c) {
          return (c.labelrank || 0) - (a.labelrank || 0);
        });
        for (p = 0; p < h; p++) {
          var q = (u = a[p]) && u.absoluteBox;
          for (l = p + 1; l < h; ++l) {
            var x = (f = a[l]) && f.absoluteBox;
            !q ||
              !x ||
              u === f ||
              0 === u.newOpacity ||
              0 === f.newOpacity ||
              "hidden" === u.visibility ||
              "hidden" === f.visibility ||
              x.x >= q.x + q.width ||
              x.x + x.width <= q.x ||
              x.y >= q.y + q.height ||
              x.y + x.height <= q.y ||
              ((u.labelrank < f.labelrank ? u : f).newOpacity = 0);
          }
        }
        a.forEach(function (a) {
          v(a, c) && (n = !0);
        });
        n && B(c, "afterHideAllOverlappingLabels");
      };
    }
  );
  J(a, "Core/Responsive.js", [a["Core/Utilities.js"]], function (a) {
    var q = a.extend,
      v = a.find,
      E = a.isArray,
      B = a.isObject,
      C = a.merge,
      F = a.objectEach,
      x = a.pick,
      u = a.splat,
      n = a.uniqueKey,
      c;
    (function (a) {
      var c = [];
      a.compose = function (a) {
        -1 === c.indexOf(a) && (c.push(a), q(a.prototype, h.prototype));
        return a;
      };
      var h = (function () {
        function a() {}
        a.prototype.currentOptions = function (a) {
          function c(a, h, l, m) {
            var k;
            F(a, function (a, e) {
              if (!m && -1 < f.collectionsWithUpdate.indexOf(e) && h[e])
                for (
                  a = u(a), l[e] = [], k = 0;
                  k < Math.max(a.length, h[e].length);
                  k++
                )
                  h[e][k] &&
                    (void 0 === a[k]
                      ? (l[e][k] = h[e][k])
                      : ((l[e][k] = {}), c(a[k], h[e][k], l[e][k], m + 1)));
              else
                B(a)
                  ? ((l[e] = E(a) ? [] : {}), c(a, h[e] || {}, l[e], m + 1))
                  : (l[e] = "undefined" === typeof h[e] ? null : h[e]);
            });
          }
          var f = this,
            h = {};
          c(a, this.options, h, 0);
          return h;
        };
        a.prototype.matchResponsiveRule = function (a, c) {
          var f = a.condition;
          (
            f.callback ||
            function () {
              return (
                this.chartWidth <= x(f.maxWidth, Number.MAX_VALUE) &&
                this.chartHeight <= x(f.maxHeight, Number.MAX_VALUE) &&
                this.chartWidth >= x(f.minWidth, 0) &&
                this.chartHeight >= x(f.minHeight, 0)
              );
            }
          ).call(this) && c.push(a._id);
        };
        a.prototype.setResponsive = function (a, c) {
          var f = this,
            h = this.options.responsive,
            l = this.currentResponsive,
            m = [];
          !c &&
            h &&
            h.rules &&
            h.rules.forEach(function (a) {
              "undefined" === typeof a._id && (a._id = n());
              f.matchResponsiveRule(a, m);
            }, this);
          c = C.apply(
            void 0,
            m
              .map(function (a) {
                return v((h || {}).rules || [], function (c) {
                  return c._id === a;
                });
              })
              .map(function (a) {
                return a && a.chartOptions;
              })
          );
          c.isResponsiveOptions = !0;
          m = m.toString() || void 0;
          m !== (l && l.ruleIds) &&
            (l && this.update(l.undoOptions, a, !0),
            m
              ? ((l = this.currentOptions(c)),
                (l.isResponsiveOptions = !0),
                (this.currentResponsive = {
                  ruleIds: m,
                  mergedOptions: c,
                  undoOptions: l,
                }),
                this.update(c, a, !0))
              : (this.currentResponsive = void 0));
        };
        return a;
      })();
    })(c || (c = {}));
    ("");
    ("");
    return c;
  });
  J(
    a,
    "masters/highcharts.src.js",
    [
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
      a["Core/Defaults.js"],
      a["Core/Animation/Fx.js"],
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Renderer/HTML/AST.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Renderer/HTML/HTMLElement.js"],
      a["Core/Renderer/HTML/HTMLRenderer.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Axis/DateTimeAxis.js"],
      a["Core/Axis/LogarithmicAxis.js"],
      a["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],
      a["Core/Axis/Tick.js"],
      a["Core/Tooltip.js"],
      a["Core/Series/Point.js"],
      a["Core/Pointer.js"],
      a["Core/MSPointer.js"],
      a["Core/Legend/Legend.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Axis/Stacking/StackingAxis.js"],
      a["Core/Axis/Stacking/StackItem.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Series/Column/ColumnSeries.js"],
      a["Series/Column/ColumnDataLabel.js"],
      a["Series/Pie/PieSeries.js"],
      a["Series/Pie/PieDataLabel.js"],
      a["Core/Series/DataLabel.js"],
      a["Core/Responsive.js"],
      a["Core/Color/Color.js"],
      a["Core/Time.js"],
    ],
    function (
      a,
      q,
      A,
      E,
      B,
      C,
      F,
      x,
      u,
      n,
      c,
      h,
      m,
      l,
      p,
      f,
      D,
      G,
      H,
      K,
      y,
      t,
      w,
      k,
      g,
      e,
      b,
      d,
      r,
      z,
      I,
      N,
      P,
      O,
      U
    ) {
      a.animate = B.animate;
      a.animObject = B.animObject;
      a.getDeferredAnimation = B.getDeferredAnimation;
      a.setAnimation = B.setAnimation;
      a.stop = B.stop;
      a.timers = E.timers;
      a.AST = C;
      a.Axis = m;
      a.Chart = w;
      a.chart = w.chart;
      a.Fx = E;
      a.Legend = t;
      a.PlotLineOrBand = f;
      a.Point = H;
      a.Pointer = y.isRequired() ? y : K;
      a.Series = e;
      a.StackItem = g;
      a.SVGElement = u;
      a.SVGRenderer = n;
      a.Tick = D;
      a.Time = U;
      a.Tooltip = G;
      a.Color = O;
      a.color = O.parse;
      h.compose(n);
      c.compose(u);
      a.defaultOptions = A.defaultOptions;
      a.getOptions = A.getOptions;
      a.time = A.defaultTime;
      a.setOptions = A.setOptions;
      a.dateFormat = F.dateFormat;
      a.format = F.format;
      a.numberFormat = F.numberFormat;
      a.addEvent = q.addEvent;
      a.arrayMax = q.arrayMax;
      a.arrayMin = q.arrayMin;
      a.attr = q.attr;
      a.clearTimeout = q.clearTimeout;
      a.correctFloat = q.correctFloat;
      a.createElement = q.createElement;
      a.css = q.css;
      a.defined = q.defined;
      a.destroyObjectProperties = q.destroyObjectProperties;
      a.discardElement = q.discardElement;
      a.distribute = x.distribute;
      a.erase = q.erase;
      a.error = q.error;
      a.extend = q.extend;
      a.extendClass = q.extendClass;
      a.find = q.find;
      a.fireEvent = q.fireEvent;
      a.getMagnitude = q.getMagnitude;
      a.getStyle = q.getStyle;
      a.inArray = q.inArray;
      a.isArray = q.isArray;
      a.isClass = q.isClass;
      a.isDOMElement = q.isDOMElement;
      a.isFunction = q.isFunction;
      a.isNumber = q.isNumber;
      a.isObject = q.isObject;
      a.isString = q.isString;
      a.keys = q.keys;
      a.merge = q.merge;
      a.normalizeTickInterval = q.normalizeTickInterval;
      a.objectEach = q.objectEach;
      a.offset = q.offset;
      a.pad = q.pad;
      a.pick = q.pick;
      a.pInt = q.pInt;
      a.relativeLength = q.relativeLength;
      a.removeEvent = q.removeEvent;
      a.seriesType = b.seriesType;
      a.splat = q.splat;
      a.stableSort = q.stableSort;
      a.syncTimeout = q.syncTimeout;
      a.timeUnits = q.timeUnits;
      a.uniqueKey = q.uniqueKey;
      a.useSerialIds = q.useSerialIds;
      a.wrap = q.wrap;
      r.compose(d);
      N.compose(e);
      l.compose(m);
      p.compose(m);
      I.compose(z);
      f.compose(m);
      P.compose(w);
      k.compose(m, w, e);
      return a;
    }
  );
  J(
    a,
    "Core/Axis/BrokenAxis.js",
    [a["Core/Axis/Stacking/StackItem.js"], a["Core/Utilities.js"]],
    function (a, q) {
      var v = q.addEvent,
        E = q.find,
        B = q.fireEvent,
        C = q.isArray,
        F = q.isNumber,
        x = q.pick,
        u;
      (function (n) {
        function c() {
          "undefined" !== typeof this.brokenAxis &&
            this.brokenAxis.setBreaks(this.options.breaks, !1);
        }
        function h() {
          this.brokenAxis &&
            this.brokenAxis.hasBreaks &&
            (this.options.ordinal = !1);
        }
        function m() {
          var a = this.brokenAxis;
          if (a && a.hasBreaks) {
            for (
              var c = this.tickPositions,
                f = this.tickPositions.info,
                k = [],
                g = 0;
              g < c.length;
              g++
            )
              a.isInAnyBreak(c[g]) || k.push(c[g]);
            this.tickPositions = k;
            this.tickPositions.info = f;
          }
        }
        function l() {
          this.brokenAxis || (this.brokenAxis = new K(this));
        }
        function p() {
          var a = this.options.connectNulls,
            c = this.points,
            f = this.xAxis,
            k = this.yAxis;
          if (this.isDirty)
            for (var g = c.length; g--; ) {
              var e = c[g],
                b =
                  !(null === e.y && !1 === a) &&
                  ((f && f.brokenAxis && f.brokenAxis.isInAnyBreak(e.x, !0)) ||
                    (k && k.brokenAxis && k.brokenAxis.isInAnyBreak(e.y, !0)));
              e.visible = b ? !1 : !1 !== e.options.visible;
            }
        }
        function f() {
          this.drawBreaks(this.xAxis, ["x"]);
          this.drawBreaks(this.yAxis, x(this.pointArrayMap, ["y"]));
        }
        function u(a, c) {
          var f = this,
            k = f.points,
            g,
            e,
            b,
            d;
          if (a && a.brokenAxis && a.brokenAxis.hasBreaks) {
            var h = a.brokenAxis;
            c.forEach(function (c) {
              g = (h && h.breakArray) || [];
              e = a.isXAxis ? a.min : x(f.options.threshold, a.min);
              k.forEach(function (f) {
                d = x(f["stack" + c.toUpperCase()], f[c]);
                g.forEach(function (c) {
                  if (F(e) && F(d)) {
                    b = !1;
                    if ((e < c.from && d > c.to) || (e > c.from && d < c.from))
                      b = "pointBreak";
                    else if (
                      (e < c.from && d > c.from && d < c.to) ||
                      (e > c.from && d > c.to && d < c.from)
                    )
                      b = "pointInBreak";
                    b && B(a, b, { point: f, brk: c });
                  }
                });
              });
            });
          }
        }
        function q() {
          var c = this.currentDataGrouping,
            f = c && c.gapSize;
          c = this.points.slice();
          var h = this.yAxis,
            k = this.options.gapSize,
            g = c.length - 1,
            e;
          if (k && 0 < g)
            for (
              "value" !== this.options.gapUnit && (k *= this.basePointRange),
                f && f > k && f >= this.basePointRange && (k = f),
                e = void 0;
              g--;

            )
              (e && !1 !== e.visible) || (e = c[g + 1]),
                (f = c[g]),
                !1 !== e.visible &&
                  !1 !== f.visible &&
                  (e.x - f.x > k &&
                    ((e = (f.x + e.x) / 2),
                    c.splice(g + 1, 0, { isNull: !0, x: e }),
                    h.stacking &&
                      this.options.stacking &&
                      ((e = h.stacking.stacks[this.stackKey][e] =
                        new a(h, h.options.stackLabels, !1, e, this.stack)),
                      (e.total = 0))),
                  (e = f));
          return this.getGraphPath(c);
        }
        var A = [];
        n.compose = function (a, n) {
          -1 === A.indexOf(a) &&
            (A.push(a),
            a.keepProps.push("brokenAxis"),
            v(a, "init", l),
            v(a, "afterInit", c),
            v(a, "afterSetTickPositions", m),
            v(a, "afterSetOptions", h));
          if (-1 === A.indexOf(n)) {
            A.push(n);
            var t = n.prototype;
            t.drawBreaks = u;
            t.gappedPath = q;
            v(n, "afterGeneratePoints", p);
            v(n, "afterRender", f);
          }
          return a;
        };
        var K = (function () {
          function a(a) {
            this.hasBreaks = !1;
            this.axis = a;
          }
          a.isInBreak = function (a, c) {
            var f = a.repeat || Infinity,
              g = a.from,
              e = a.to - a.from;
            c = c >= g ? (c - g) % f : f - ((g - c) % f);
            return a.inclusive ? c <= e : c < e && 0 !== c;
          };
          a.lin2Val = function (c) {
            var f = this.brokenAxis;
            f = f && f.breakArray;
            if (!f || !F(c)) return c;
            var k;
            for (k = 0; k < f.length; k++) {
              var g = f[k];
              if (g.from >= c) break;
              else g.to < c ? (c += g.len) : a.isInBreak(g, c) && (c += g.len);
            }
            return c;
          };
          a.val2Lin = function (c) {
            var f = this.brokenAxis;
            f = f && f.breakArray;
            if (!f || !F(c)) return c;
            var k = c,
              g;
            for (g = 0; g < f.length; g++) {
              var e = f[g];
              if (e.to <= c) k -= e.len;
              else if (e.from >= c) break;
              else if (a.isInBreak(e, c)) {
                k -= c - e.from;
                break;
              }
            }
            return k;
          };
          a.prototype.findBreakAt = function (a, c) {
            return E(c, function (c) {
              return c.from < a && a < c.to;
            });
          };
          a.prototype.isInAnyBreak = function (c, f) {
            var k = this.axis,
              g = k.options.breaks || [],
              e = g.length,
              b;
            if (e && F(c)) {
              for (; e--; )
                if (a.isInBreak(g[e], c)) {
                  var d = !0;
                  b || (b = x(g[e].showPoints, !k.isXAxis));
                }
              var h = d && f ? d && !b : d;
            }
            return h;
          };
          a.prototype.setBreaks = function (c, f) {
            var k = this,
              g = k.axis,
              e = C(c) && !!c.length;
            g.isDirty = k.hasBreaks !== e;
            k.hasBreaks = e;
            g.options.breaks = g.userOptions.breaks = c;
            g.forceRedraw = !0;
            g.series.forEach(function (a) {
              a.isDirty = !0;
            });
            e ||
              g.val2lin !== a.val2Lin ||
              (delete g.val2lin, delete g.lin2val);
            e &&
              ((g.userOptions.ordinal = !1),
              (g.lin2val = a.lin2Val),
              (g.val2lin = a.val2Lin),
              (g.setExtremes = function (a, c, e, f, h) {
                if (k.hasBreaks) {
                  for (
                    var b = this.options.breaks || [], d;
                    (d = k.findBreakAt(a, b));

                  )
                    a = d.to;
                  for (; (d = k.findBreakAt(c, b)); ) c = d.from;
                  c < a && (c = a);
                }
                g.constructor.prototype.setExtremes.call(this, a, c, e, f, h);
              }),
              (g.setAxisTranslation = function () {
                g.constructor.prototype.setAxisTranslation.call(this);
                k.unitLength = void 0;
                if (k.hasBreaks) {
                  var b = g.options.breaks || [],
                    c = [],
                    e = [],
                    f = x(g.pointRangePadding, 0),
                    h = 0,
                    l,
                    m = g.userMin || g.min,
                    p = g.userMax || g.max,
                    n;
                  b.forEach(function (b) {
                    l = b.repeat || Infinity;
                    F(m) &&
                      F(p) &&
                      (a.isInBreak(b, m) && (m += (b.to % l) - (m % l)),
                      a.isInBreak(b, p) && (p -= (p % l) - (b.from % l)));
                  });
                  b.forEach(function (a) {
                    t = a.from;
                    l = a.repeat || Infinity;
                    if (F(m) && F(p)) {
                      for (; t - l > m; ) t -= l;
                      for (; t < m; ) t += l;
                      for (n = t; n < p; n += l)
                        c.push({ value: n, move: "in" }),
                          c.push({
                            value: n + a.to - a.from,
                            move: "out",
                            size: a.breakSize,
                          });
                    }
                  });
                  c.sort(function (a, b) {
                    return a.value === b.value
                      ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1)
                      : a.value - b.value;
                  });
                  var u = 0;
                  var t = m;
                  c.forEach(function (a) {
                    u += "in" === a.move ? 1 : -1;
                    1 === u && "in" === a.move && (t = a.value);
                    0 === u &&
                      F(t) &&
                      (e.push({
                        from: t,
                        to: a.value,
                        len: a.value - t - (a.size || 0),
                      }),
                      (h += a.value - t - (a.size || 0)));
                  });
                  k.breakArray = e;
                  F(m) &&
                    F(p) &&
                    F(g.min) &&
                    ((k.unitLength = p - m - h + f),
                    B(g, "afterBreaks"),
                    g.staticScale
                      ? (g.transA = g.staticScale)
                      : k.unitLength &&
                        (g.transA *= (p - g.min + f) / k.unitLength),
                    f &&
                      (g.minPixelPadding = g.transA * (g.minPointOffset || 0)),
                    (g.min = m),
                    (g.max = p));
                }
              }));
            x(f, !0) && g.chart.redraw();
          };
          return a;
        })();
        n.Additions = K;
      })(u || (u = {}));
      return u;
    }
  );
  J(
    a,
    "masters/modules/broken-axis.src.js",
    [a["Core/Globals.js"], a["Core/Axis/BrokenAxis.js"]],
    function (a, q) {
      q.compose(a.Axis, a.Series);
    }
  );
  J(a, "Extensions/DataGrouping/ApproximationRegistry.js", [], function () {
    return {};
  });
  J(
    a,
    "Extensions/DataGrouping/ApproximationDefaults.js",
    [
      a["Extensions/DataGrouping/ApproximationRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q) {
      function v(a) {
        var c = a.length;
        a = E(a);
        u(a) && c && (a = F(a / c));
        return a;
      }
      function E(a) {
        var c = a.length;
        if (!c && a.hasNulls) var h = null;
        else if (c) for (h = 0; c--; ) h += a[c];
        return h;
      }
      var B = q.arrayMax,
        C = q.arrayMin,
        F = q.correctFloat,
        x = q.extend,
        u = q.isNumber;
      q = {
        average: v,
        averages: function () {
          var a = [];
          [].forEach.call(arguments, function (c) {
            a.push(v(c));
          });
          return "undefined" === typeof a[0] ? void 0 : a;
        },
        close: function (a) {
          return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0;
        },
        high: function (a) {
          return a.length ? B(a) : a.hasNulls ? null : void 0;
        },
        hlc: function (n, c, h) {
          n = a.high(n);
          c = a.low(c);
          h = a.close(h);
          if (u(n) || u(c) || u(h)) return [n, c, h];
        },
        low: function (a) {
          return a.length ? C(a) : a.hasNulls ? null : void 0;
        },
        ohlc: function (n, c, h, m) {
          n = a.open(n);
          c = a.high(c);
          h = a.low(h);
          m = a.close(m);
          if (u(n) || u(c) || u(h) || u(m)) return [n, c, h, m];
        },
        open: function (a) {
          return a.length ? a[0] : a.hasNulls ? null : void 0;
        },
        range: function (n, c) {
          n = a.low(n);
          c = a.high(c);
          if (u(n) || u(c)) return [n, c];
          if (null === n && null === c) return null;
        },
        sum: E,
      };
      x(a, q);
      return q;
    }
  );
  J(a, "Extensions/DataGrouping/DataGroupingDefaults.js", [], function () {
    return {
      common: {
        groupPixelWidth: 2,
        dateTimeLabelFormats: {
          millisecond: [
            "%A, %b %e, %H:%M:%S.%L",
            "%A, %b %e, %H:%M:%S.%L",
            "-%H:%M:%S.%L",
          ],
          second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
          minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
          hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
          day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
          week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
          month: ["%B %Y", "%B", "-%B %Y"],
          year: ["%Y", "%Y", "-%Y"],
        },
      },
      seriesSpecific: {
        line: {},
        spline: {},
        area: {},
        areaspline: {},
        arearange: {},
        column: { groupPixelWidth: 10 },
        columnrange: { groupPixelWidth: 10 },
        candlestick: { groupPixelWidth: 10 },
        ohlc: { groupPixelWidth: 5 },
        hlc: { groupPixelWidth: 5 },
        heikinashi: { groupPixelWidth: 10 },
      },
      units: [
        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
        ["second", [1, 2, 5, 10, 15, 30]],
        ["minute", [1, 2, 5, 10, 15, 30]],
        ["hour", [1, 2, 3, 4, 6, 8, 12]],
        ["day", [1]],
        ["week", [1]],
        ["month", [1, 3, 6]],
        ["year", null],
      ],
    };
  });
  J(
    a,
    "Extensions/DataGrouping/DataGroupingAxisComposition.js",
    [
      a["Extensions/DataGrouping/DataGroupingDefaults.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q) {
      function v(a) {
        var c = this,
          h = c.series;
        h.forEach(function (a) {
          a.groupPixelWidth = void 0;
        });
        h.forEach(function (f) {
          f.groupPixelWidth = c.getGroupPixelWidth && c.getGroupPixelWidth();
          f.groupPixelWidth && (f.hasProcessed = !0);
          f.applyGrouping(!!a.hasExtremesChanged);
        });
      }
      function E() {
        for (var c = this.series, h = c.length, p = 0, f = !1, u, q; h--; )
          if ((q = c[h].options.dataGrouping))
            if (
              ((p = Math.max(
                p,
                n(q.groupPixelWidth, a.common.groupPixelWidth)
              )),
              (u = (c[h].processedXData || c[h].data).length),
              c[h].groupPixelWidth ||
                u > this.chart.plotSizeX / p ||
                (u && q.forced))
            )
              f = !0;
        return f ? p : 0;
      }
      function B() {
        this.series.forEach(function (a) {
          a.hasProcessed = !1;
        });
      }
      function C(a, c) {
        var l;
        c = n(c, !0);
        a || (a = { forced: !1, units: null });
        if (this instanceof h)
          for (l = this.series.length; l--; )
            this.series[l].update({ dataGrouping: a }, !1);
        else
          this.chart.options.series.forEach(function (c) {
            c.dataGrouping = "boolean" === typeof a ? a : u(a, c.dataGrouping);
          });
        this.ordinal && (this.ordinal.slope = void 0);
        c && this.chart.redraw();
      }
      var F = q.addEvent,
        x = q.extend,
        u = q.merge,
        n = q.pick,
        c = [],
        h;
      return {
        compose: function (a) {
          h = a;
          -1 === c.indexOf(a) &&
            (c.push(a),
            F(a, "afterSetScale", B),
            F(a, "postProcessData", v),
            x(a.prototype, {
              applyGrouping: v,
              getGroupPixelWidth: E,
              setDataGrouping: C,
            }));
        },
      };
    }
  );
  J(
    a,
    "Extensions/DataGrouping/DataGroupingSeriesComposition.js",
    [
      a["Extensions/DataGrouping/ApproximationRegistry.js"],
      a["Extensions/DataGrouping/DataGroupingDefaults.js"],
      a["Core/Axis/DateTimeAxis.js"],
      a["Core/Defaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C) {
      function v(a) {
        var c = this.chart,
          g = this.options.dataGrouping,
          e = !1 !== this.allowDG && g && K(g.enabled, c.options.isStock),
          b = this.visible || !c.options.chart.ignoreHiddenSeries,
          d = this.currentDataGrouping,
          h = !1;
        e && !this.requireSorting && (this.requireSorting = h = !0);
        a =
          !1 ===
            !(
              this.isCartesian &&
              !this.isDirty &&
              !this.xAxis.isDirty &&
              !this.yAxis.isDirty &&
              !a
            ) || !e;
        h && (this.requireSorting = !1);
        if (!a) {
          this.destroyGroupedData();
          var l = g.groupAll ? this.xData : this.processedXData,
            n = g.groupAll ? this.yData : this.processedYData;
          e = c.plotSizeX;
          a = this.xAxis;
          var u = a.options.ordinal,
            t = this.groupPixelWidth;
          h = void 0;
          if (t && l && l.length && e) {
            this.isDirty = h = !0;
            this.points = null;
            var w = a.getExtremes();
            var y = w.min;
            w = w.max;
            u =
              (u &&
                a.ordinal &&
                a.ordinal.getGroupIntervalFactor(y, w, this)) ||
              1;
            e = a.getTimeTicks(
              A.Additions.prototype.normalizeTimeTickInterval(
                ((t * (w - y)) / e) * u,
                g.units || q.units
              ),
              Math.min(y, l[0]),
              Math.max(w, l[l.length - 1]),
              a.options.startOfWeek,
              l,
              this.closestPointRange
            );
            t = m.groupData.apply(this, [l, n, e, g.approximation]);
            l = t.groupedXData;
            n = t.groupedYData;
            u = 0;
            g &&
              g.smoothed &&
              l.length &&
              ((g.firstAnchor = "firstPoint"),
              (g.anchor = "middle"),
              (g.lastAnchor = "lastPoint"),
              f(32, !1, c, {
                "dataGrouping.smoothed": "use dataGrouping.anchor",
              }));
            c = l;
            var v = this.options.dataGrouping;
            y = this.currentDataGrouping && this.currentDataGrouping.gapSize;
            if (v && this.xData && y && this.groupMap) {
              var D = c.length - 1;
              var x = v.anchor;
              var B = K(v.firstAnchor, x);
              v = K(v.lastAnchor, x);
              if (x && "start" !== x) {
                var C = y * { middle: 0.5, end: 1 }[x];
                for (x = c.length - 1; x-- && 0 < x; ) c[x] += C;
              }
              if (B && "start" !== B && this.xData[0] >= c[0]) {
                x = this.groupMap[0].start;
                C = this.groupMap[0].length;
                var E = void 0;
                G(x) && G(C) && (E = x + (C - 1));
                c[0] = {
                  middle: c[0] + 0.5 * y,
                  end: c[0] + y,
                  firstPoint: this.xData[0],
                  lastPoint: E && this.xData[E],
                }[B];
              }
              v &&
                "start" !== v &&
                y &&
                c[D] >= w - y &&
                ((w = this.groupMap[this.groupMap.length - 1].start),
                (c[D] = {
                  middle: c[D] + 0.5 * y,
                  end: c[D] + y,
                  firstPoint: w && this.xData[w],
                  lastPoint: this.xData[this.xData.length - 1],
                }[v]));
            }
            for (w = 1; w < e.length; w++)
              (e.info.segmentStarts &&
                -1 !== e.info.segmentStarts.indexOf(w)) ||
                (u = Math.max(e[w] - e[w - 1], u));
            w = e.info;
            w.gapSize = u;
            this.closestPointRange = e.info.totalRange;
            this.groupMap = t.groupMap;
            if (b) {
              b = l;
              if (p(b[0]) && G(a.min) && G(a.dataMin) && b[0] < a.min) {
                if (
                  (!p(a.options.min) && a.min <= a.dataMin) ||
                  a.min === a.dataMin
                )
                  a.min = Math.min(b[0], a.min);
                a.dataMin = Math.min(b[0], a.dataMin);
              }
              if (
                p(b[b.length - 1]) &&
                G(a.max) &&
                G(a.dataMax) &&
                b[b.length - 1] > a.max
              ) {
                if (
                  (!p(a.options.max) && G(a.dataMax) && a.max >= a.dataMax) ||
                  a.max === a.dataMax
                )
                  a.max = Math.max(b[b.length - 1], a.max);
                a.dataMax = Math.max(b[b.length - 1], a.dataMax);
              }
            }
            g.groupAll &&
              ((this.allGroupedData = n),
              (g = this.cropData(l, n, a.min, a.max, 1)),
              (l = g.xData),
              (n = g.yData),
              (this.cropStart = g.start));
            this.processedXData = l;
            this.processedYData = n;
          } else this.groupMap = null;
          this.hasGroupedData = h;
          this.currentDataGrouping = w;
          this.preventGraphAnimation =
            (d && d.totalRange) !== (w && w.totalRange);
        }
      }
      function x() {
        this.groupedData &&
          (this.groupedData.forEach(function (a, c) {
            a && (this.groupedData[c] = a.destroy ? a.destroy() : null);
          }, this),
          (this.groupedData.length = 0));
      }
      function u() {
        y.apply(this);
        this.destroyGroupedData();
        this.groupedData = this.hasGroupedData ? this.points : null;
      }
      function n() {
        return this.is("arearange")
          ? "range"
          : this.is("ohlc")
          ? "ohlc"
          : this.is("hlc")
          ? "hlc"
          : this.is("column")
          ? "sum"
          : "average";
      }
      function c(c, f, g, e) {
        var b = this,
          d = b.data,
          h = b.options && b.options.data,
          k = [],
          l = [],
          m = [],
          n = c.length,
          u = !!f,
          t = [],
          q = b.pointArrayMap,
          w = q && q.length,
          y = ["x"].concat(q || ["y"]),
          v = this.options.dataGrouping && this.options.dataGrouping.groupAll,
          x = 0,
          D = 0;
        e =
          "function" === typeof e
            ? e
            : e && a[e]
            ? a[e]
            : a[(b.getDGApproximation && b.getDGApproximation()) || "average"];
        if (w) for (var A = q.length; A--; ) t.push([]);
        else t.push([]);
        A = w || 1;
        for (var B = 0; B <= n; B++)
          if (!(c[B] < g[0])) {
            for (
              ;
              ("undefined" !== typeof g[x + 1] && c[B] >= g[x + 1]) || B === n;

            ) {
              var C = g[x];
              b.dataGroupInfo = {
                start: v ? D : b.cropStart + D,
                length: t[0].length,
              };
              var E = e.apply(b, t);
              b.pointClass &&
                !p(b.dataGroupInfo.options) &&
                ((b.dataGroupInfo.options = H(
                  b.pointClass.prototype.optionsToObject.call(
                    { series: b },
                    b.options.data[b.cropStart + D]
                  )
                )),
                y.forEach(function (a) {
                  delete b.dataGroupInfo.options[a];
                }));
              "undefined" !== typeof E &&
                (k.push(C), l.push(E), m.push(b.dataGroupInfo));
              D = B;
              for (C = 0; C < A; C++) (t[C].length = 0), (t[C].hasNulls = !1);
              x += 1;
              if (B === n) break;
            }
            if (B === n) break;
            if (q) {
              C =
                b.options.dataGrouping && b.options.dataGrouping.groupAll
                  ? B
                  : b.cropStart + B;
              E =
                (d && d[C]) ||
                b.pointClass.prototype.applyOptions.apply({ series: b }, [
                  h[C],
                ]);
              var F = void 0;
              for (C = 0; C < w; C++)
                (F = E[q[C]]),
                  G(F) ? t[C].push(F) : null === F && (t[C].hasNulls = !0);
            } else
              (C = u ? f[B] : null),
                G(C) ? t[0].push(C) : null === C && (t[0].hasNulls = !0);
          }
        return { groupedXData: k, groupedYData: l, groupMap: m };
      }
      function h(a) {
        a = a.options;
        var c = this.type,
          g = this.chart.options.plotOptions,
          e = this.useCommonDataGrouping && q.common,
          b = q.seriesSpecific,
          d = E.defaultOptions.plotOptions[c].dataGrouping;
        if (g && (b[c] || e)) {
          var f = this.chart.rangeSelector;
          d || (d = H(q.common, b[c]));
          a.dataGrouping = H(
            e,
            d,
            g.series && g.series.dataGrouping,
            g[c].dataGrouping,
            this.userOptions.dataGrouping,
            !a.isInternal &&
              f &&
              G(f.selected) &&
              f.buttonOptions[f.selected].dataGrouping
          );
        }
      }
      var m = B.series.prototype,
        l = C.addEvent,
        p = C.defined,
        f = C.error,
        D = C.extend,
        G = C.isNumber,
        H = C.merge,
        K = C.pick,
        y = m.generatePoints,
        t = [];
      return {
        compose: function (a) {
          var k = a.prototype.pointClass;
          -1 === t.indexOf(k) &&
            (t.push(k),
            l(k, "update", function () {
              if (this.dataGroup) return f(24, !1, this.series.chart), !1;
            }));
          -1 === t.indexOf(a) &&
            (t.push(a),
            l(a, "afterSetOptions", h),
            l(a, "destroy", x),
            D(a.prototype, {
              applyGrouping: v,
              destroyGroupedData: x,
              generatePoints: u,
              getDGApproximation: n,
              groupData: c,
            }));
        },
        groupData: c,
      };
    }
  );
  J(
    a,
    "Extensions/DataGrouping/DataGrouping.js",
    [
      a["Extensions/DataGrouping/DataGroupingAxisComposition.js"],
      a["Extensions/DataGrouping/DataGroupingDefaults.js"],
      a["Extensions/DataGrouping/DataGroupingSeriesComposition.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B) {
      function v(a) {
        var c = this.chart,
          h = c.time,
          p = a.labelConfig,
          f = p.series,
          v = f.tooltipOptions,
          x = f.options.dataGrouping,
          A = f.xAxis,
          B = v.xDateFormat,
          y = v[a.isFooter ? "footerFormat" : "headerFormat"];
        if (A && "datetime" === A.options.type && x && n(p.key)) {
          var t = f.currentDataGrouping;
          x = x.dateTimeLabelFormats || q.common.dateTimeLabelFormats;
          if (t)
            if (((v = x[t.unitName]), 1 === t.count)) B = v[0];
            else {
              B = v[1];
              var w = v[2];
            }
          else
            !B &&
              x &&
              A.dateTime &&
              (B = A.dateTime.getXDateFormat(p.x, v.dateTimeLabelFormats));
          B = h.dateFormat(B, p.key);
          w && (B += h.dateFormat(w, p.key + t.totalRange - 1));
          f.chart.styledMode && (y = this.styledModeFormat(y));
          a.text = F(y, { point: u(p.point, { key: B }), series: f }, c);
          a.preventDefault();
        }
      }
      var F = E.format,
        x = B.addEvent,
        u = B.extend,
        n = B.isNumber,
        c = [];
      E = {
        compose: function (h, m, l) {
          a.compose(h);
          A.compose(m);
          -1 === c.indexOf(l) && (c.push(l), x(l, "headerFormatter", v));
        },
        groupData: A.groupData,
      };
      ("");
      ("");
      return E;
    }
  );
  J(
    a,
    "masters/modules/datagrouping.src.js",
    [
      a["Core/Globals.js"],
      a["Extensions/DataGrouping/ApproximationDefaults.js"],
      a["Extensions/DataGrouping/ApproximationRegistry.js"],
      a["Extensions/DataGrouping/DataGrouping.js"],
    ],
    function (a, q, A, E) {
      a.dataGrouping = { approximationDefaults: q, approximations: A };
      E.compose(a.Axis, a.Series, a.Tooltip);
    }
  );
  J(
    a,
    "Series/DataModifyComposition.js",
    [
      a["Core/Axis/Axis.js"],
      a["Core/Series/Point.js"],
      a["Core/Series/Series.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E) {
      var v = q.prototype.tooltipFormatter,
        C = E.addEvent,
        F = E.arrayMax,
        x = E.arrayMin,
        u = E.correctFloat,
        n = E.defined,
        c = E.isArray,
        h = E.isNumber,
        m = E.isString,
        l = E.pick,
        p;
      (function (a) {
        function f(a, b, c) {
          this.isXAxis ||
            (this.series.forEach(function (c) {
              "compare" === a && "boolean" !== typeof b
                ? c.setCompare(b, !1)
                : "cumulative" !== a || m(b) || c.setCumulative(b, !1);
            }),
            l(c, !0) && this.chart.redraw());
        }
        function p(a) {
          var b = this,
            c = b.series.chart.numberFormatter,
            d = function (d) {
              a = a.replace(
                "{point." + d + "}",
                (0 < b[d] && "change" === d ? "+" : "") +
                  c(b[d], l(b.series.tooltipOptions.changeDecimals, 2))
              );
            };
          n(b.change) && d("change");
          n(b.cumulativeSum) && d("cumulativeSum");
          return v.apply(this, [a]);
        }
        function q() {
          var a = this.options.compare;
          if ("percent" === a || "value" === a || this.options.cumulative) {
            var c = new b(this);
            "percent" === a || "value" === a
              ? c.initCompare(a)
              : c.initCumulative();
          }
          this.dataModify = c;
        }
        function A(a) {
          a = a.dataExtremes;
          var d = a.activeYData;
          if (this.dataModify && a) {
            var e = void 0;
            this.options.compare
              ? (e = [
                  this.dataModify.modifyValue(a.dataMin),
                  this.dataModify.modifyValue(a.dataMax),
                ])
              : this.options.cumulative &&
                c(d) &&
                2 <= d.length &&
                (e = b.getCumulativeExtremes(d));
            e && ((a.dataMin = x(e)), (a.dataMax = F(e)));
          }
        }
        function y(a, b) {
          this.options.compare = this.userOptions.compare = a;
          this.update({}, l(b, !0));
          !this.dataModify || ("value" !== a && "percent" !== a)
            ? this.points.forEach(function (a) {
                delete a.change;
              })
            : this.dataModify.initCompare(a);
        }
        function t() {
          if (this.xAxis && this.processedYData && this.dataModify) {
            var a = this.processedXData,
              b = this.processedYData,
              c = b.length,
              e = !0 === this.options.compareStart ? 0 : 1,
              g = -1,
              f;
            this.pointArrayMap &&
              (g = this.pointArrayMap.indexOf(
                this.options.pointValKey || this.pointValKey || "y"
              ));
            for (f = 0; f < c - e; f++) {
              var k = b[f] && -1 < g ? b[f][g] : b[f];
              if (h(k) && 0 !== k && a[f + e] >= (this.xAxis.min || 0)) {
                this.dataModify.compareValue = k;
                break;
              }
            }
          }
        }
        function w(a, b) {
          this.setModifier("compare", a, b);
        }
        function k(a, b) {
          a = l(a, !1);
          this.options.cumulative = this.userOptions.cumulative = a;
          this.update({}, l(b, !0));
          this.dataModify
            ? this.dataModify.initCumulative()
            : this.points.forEach(function (a) {
                delete a.cumulativeSum;
              });
        }
        function g(a, b) {
          this.setModifier("cumulative", a, b);
        }
        var e = [];
        a.compose = function (a, b, c) {
          if (-1 === e.indexOf(a)) {
            e.push(a);
            var d = a.prototype;
            d.setCompare = y;
            d.setCumulative = k;
            C(a, "afterInit", q);
            C(a, "afterGetExtremes", A);
            C(a, "afterProcessData", t);
          }
          -1 === e.indexOf(b) &&
            (e.push(b),
            (b = b.prototype),
            (b.setCompare = w),
            (b.setModifier = f),
            (b.setCumulative = g));
          -1 === e.indexOf(c) &&
            (e.push(c), (c.prototype.tooltipFormatter = p));
          return a;
        };
        var b = (function () {
          function a(a) {
            this.series = a;
          }
          a.prototype.modifyValue = function () {
            return 0;
          };
          a.getCumulativeExtremes = function (a) {
            var b = Infinity,
              c = -Infinity;
            a.reduce(function (a, d) {
              d = a + d;
              b = Math.min(b, d, a);
              c = Math.max(c, d, a);
              return d;
            });
            return [b, c];
          };
          a.prototype.initCompare = function (a) {
            this.modifyValue = function (b, c) {
              null === b && (b = 0);
              var d = this.compareValue;
              return "undefined" !== typeof b && "undefined" !== typeof d
                ? ((b =
                    "value" === a
                      ? b - d
                      : (b / d) * 100 -
                        (100 === this.series.options.compareBase ? 0 : 100)),
                  "undefined" !== typeof c &&
                    (c = this.series.points[c]) &&
                    (c.change = b),
                  b)
                : 0;
            };
          };
          a.prototype.initCumulative = function () {
            this.modifyValue = function (a, b) {
              null === a && (a = 0);
              if (void 0 !== a && void 0 !== b) {
                var c = 0 < b ? this.series.points[b - 1] : null;
                c && c.cumulativeSum && (a = u(c.cumulativeSum + a));
                if ((b = this.series.points[b])) b.cumulativeSum = a;
                return a;
              }
              return 0;
            };
          };
          return a;
        })();
        a.Additions = b;
      })(p || (p = {}));
      ("");
      return p;
    }
  );
  J(
    a,
    "Core/Axis/NavigatorAxisComposition.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, q) {
      function v() {
        this.navigatorAxis || (this.navigatorAxis = new h(this));
      }
      function E(a) {
        var c = this.chart.options,
          h = c.navigator,
          f = this.navigatorAxis,
          m = c.chart.zooming.pinchType,
          n = c.rangeSelector;
        c = c.chart.zooming.type;
        this.isXAxis &&
          ((h && h.enabled) || (n && n.enabled)) &&
          ("y" === c
            ? (a.zoomed = !1)
            : ((!B && "xy" === c) || (B && "xy" === m)) &&
              this.options.range &&
              ((h = f.previousZoom),
              x(a.newMin)
                ? (f.previousZoom = [this.min, this.max])
                : h &&
                  ((a.newMin = h[0]),
                  (a.newMax = h[1]),
                  (f.previousZoom = void 0))));
        "undefined" !== typeof a.zoomed && a.preventDefault();
      }
      var B = a.isTouchDevice,
        C = q.addEvent,
        F = q.correctFloat,
        x = q.defined,
        u = q.isNumber,
        n = q.pick,
        c = [],
        h = (function () {
          function a(a) {
            this.axis = a;
          }
          a.compose = function (a) {
            -1 === c.indexOf(a) &&
              (c.push(a),
              a.keepProps.push("navigatorAxis"),
              C(a, "init", v),
              C(a, "zoom", E));
          };
          a.prototype.destroy = function () {
            this.axis = void 0;
          };
          a.prototype.toFixedRange = function (a, c, f, h) {
            var l = this.axis,
              m = l.chart;
            a = n(f, l.translate(a, !0, !l.horiz));
            c = n(h, l.translate(c, !0, !l.horiz));
            m = m && m.fixedRange;
            l = (l.pointRange || 0) / 2;
            var p = m && (c - a) / m;
            x(f) || (a = F(a + l));
            x(h) || (c = F(c - l));
            0.7 < p && 1.3 > p && (h ? (a = c - m) : (c = a + m));
            (u(a) && u(c)) || (a = c = void 0);
            return { min: a, max: c };
          };
          return a;
        })();
      return h;
    }
  );
  J(
    a,
    "Stock/Navigator/NavigatorDefaults.js",
    [a["Core/Color/Color.js"], a["Core/Series/SeriesRegistry.js"]],
    function (a, q) {
      a = a.parse;
      q = q.seriesTypes;
      q = {
        height: 40,
        margin: 25,
        maskInside: !0,
        handles: {
          width: 7,
          height: 15,
          symbols: ["navigator-handle", "navigator-handle"],
          enabled: !0,
          lineWidth: 1,
          backgroundColor: "#f2f2f2",
          borderColor: "#999999",
        },
        maskFill: a("#6685c2").setOpacity(0.3).get(),
        outlineColor: "#cccccc",
        outlineWidth: 1,
        series: {
          type: "undefined" === typeof q.areaspline ? "line" : "areaspline",
          fillOpacity: 0.05,
          lineWidth: 1,
          compare: null,
          dataGrouping: {
            approximation: "average",
            enabled: !0,
            groupPixelWidth: 2,
            firstAnchor: "firstPoint",
            anchor: "middle",
            lastAnchor: "lastPoint",
            units: [
              ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
              ["second", [1, 2, 5, 10, 15, 30]],
              ["minute", [1, 2, 5, 10, 15, 30]],
              ["hour", [1, 2, 3, 4, 6, 8, 12]],
              ["day", [1, 2, 3, 4]],
              ["week", [1, 2, 3]],
              ["month", [1, 3, 6]],
              ["year", null],
            ],
          },
          dataLabels: { enabled: !1, zIndex: 2 },
          id: "highcharts-navigator-series",
          className: "highcharts-navigator-series",
          lineColor: null,
          marker: { enabled: !1 },
          threshold: null,
        },
        xAxis: {
          overscroll: 0,
          className: "highcharts-navigator-xaxis",
          tickLength: 0,
          lineWidth: 0,
          gridLineColor: "#e6e6e6",
          gridLineWidth: 1,
          tickPixelInterval: 200,
          labels: { align: "left", style: { color: "#999999" }, x: 3, y: -4 },
          crosshair: !1,
        },
        yAxis: {
          className: "highcharts-navigator-yaxis",
          gridLineWidth: 0,
          startOnTick: !1,
          endOnTick: !1,
          minPadding: 0.1,
          maxPadding: 0.1,
          labels: { enabled: !1 },
          crosshair: !1,
          title: { text: null },
          tickLength: 0,
          tickWidth: 0,
        },
      };
      ("");
      return q;
    }
  );
  J(a, "Stock/Navigator/NavigatorSymbols.js", [], function () {
    return {
      "navigator-handle": function (a, q, A, E, B) {
        void 0 === B && (B = {});
        a = B.width ? B.width / 2 : A;
        q = Math.round(a / 3) + 0.5;
        E = B.height || E;
        return [
          ["M", -a - 1, 0.5],
          ["L", a, 0.5],
          ["L", a, E + 0.5],
          ["L", -a - 1, E + 0.5],
          ["L", -a - 1, 0.5],
          ["M", -q, 4],
          ["L", -q, E - 3],
          ["M", q - 1, 4],
          ["L", q - 1, E - 3],
        ];
      },
    };
  });
  J(
    a,
    "Stock/Navigator/NavigatorComposition.js",
    [
      a["Core/Defaults.js"],
      a["Core/Globals.js"],
      a["Core/Axis/NavigatorAxisComposition.js"],
      a["Stock/Navigator/NavigatorDefaults.js"],
      a["Stock/Navigator/NavigatorSymbols.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C, F) {
      function v() {
        this.navigator && this.navigator.setBaseSeries(null, !1);
      }
      function u() {
        var a = this.legend,
          b = this.navigator;
        if (b) {
          var c = a && a.options;
          var g = b.xAxis;
          var f = b.yAxis;
          var h = b.scrollbarHeight;
          this.inverted
            ? ((b.left = b.opposite
                ? this.chartWidth - h - b.height
                : this.spacing[3] + h),
              (b.top = this.plotTop + h))
            : ((b.left = w(g.left, this.plotLeft + h)),
              (b.top =
                b.navigatorOptions.top ||
                this.chartHeight -
                  b.height -
                  h -
                  this.spacing[2] -
                  (this.rangeSelector && this.extraBottomMargin
                    ? this.rangeSelector.getHeight()
                    : 0) -
                  (c &&
                  "bottom" === c.verticalAlign &&
                  "proximate" !== c.layout &&
                  c.enabled &&
                  !c.floating
                    ? a.legendHeight + w(c.margin, 10)
                    : 0) -
                  (this.titleOffset ? this.titleOffset[2] : 0)));
          g &&
            f &&
            (this.inverted
              ? (g.options.left = f.options.left = b.left)
              : (g.options.top = f.options.top = b.top),
            g.setAxisSize(),
            f.setAxisSize());
        }
      }
      function n(a) {
        this.navigator ||
          this.scroller ||
          (!this.options.navigator.enabled &&
            !this.options.scrollbar.enabled) ||
          ((this.scroller = this.navigator = new g(this)),
          w(a.redraw, !0) && this.redraw(a.animation));
      }
      function c() {
        var a = this.options;
        if (a.navigator.enabled || a.scrollbar.enabled)
          this.scroller = this.navigator = new g(this);
      }
      function h() {
        var a = this.options,
          b = a.navigator,
          c = a.rangeSelector;
        if (
          ((b && b.enabled) || (c && c.enabled)) &&
          ((!G && "x" === a.chart.zooming.type) ||
            (G && "x" === a.chart.zooming.pinchType))
        )
          return !1;
      }
      function m(a) {
        var b = a.navigator;
        b &&
          a.xAxis[0] &&
          ((a = a.xAxis[0].getExtremes()), b.render(a.min, a.max));
      }
      function l(a) {
        var b = a.options.navigator || {},
          c = a.options.scrollbar || {};
        this.navigator ||
          this.scroller ||
          (!b.enabled && !c.enabled) ||
          (t(!0, this.options.navigator, b),
          t(!0, this.options.scrollbar, c),
          delete a.options.navigator,
          delete a.options.scrollbar);
      }
      function p() {
        this.chart.navigator &&
          !this.options.isInternal &&
          this.chart.navigator.setBaseSeries(null, !1);
      }
      var f = a.defaultOptions,
        D = a.setOptions,
        G = q.isTouchDevice,
        H = C.getRendererType,
        K = F.addEvent,
        y = F.extend,
        t = F.merge,
        w = F.pick,
        k = [],
        g;
      return {
        compose: function (a, b, d, r) {
          A.compose(a);
          g = d;
          -1 === k.indexOf(b) &&
            (k.push(b),
            b.prototype.callbacks.push(m),
            K(b, "afterAddSeries", v),
            K(b, "afterSetChartSize", u),
            K(b, "afterUpdate", n),
            K(b, "beforeRender", c),
            K(b, "beforeShowResetZoom", h),
            K(b, "update", l));
          -1 === k.indexOf(r) && (k.push(r), K(r, "afterUpdate", p));
          -1 === k.indexOf(H) && (k.push(H), y(H().prototype.symbols, B));
          -1 === k.indexOf(D) && (k.push(D), y(f, { navigator: E }));
        },
      };
    }
  );
  J(a, "Core/Axis/ScrollbarAxis.js", [a["Core/Utilities.js"]], function (a) {
    var q = a.addEvent,
      v = a.defined,
      E = a.pick;
    return (function () {
      function a() {}
      a.compose = function (A, B) {
        if (-1 === a.composed.indexOf(A)) a.composed.push(A);
        else return A;
        var x = function (a) {
          var n = E(a.options && a.options.min, a.min),
            c = E(a.options && a.options.max, a.max);
          return {
            axisMin: n,
            axisMax: c,
            scrollMin: v(a.dataMin)
              ? Math.min(n, a.min, a.dataMin, E(a.threshold, Infinity))
              : n,
            scrollMax: v(a.dataMax)
              ? Math.max(c, a.max, a.dataMax, E(a.threshold, -Infinity))
              : c,
          };
        };
        q(A, "afterInit", function () {
          var a = this;
          a.options &&
            a.options.scrollbar &&
            a.options.scrollbar.enabled &&
            ((a.options.scrollbar.vertical = !a.horiz),
            (a.options.startOnTick = a.options.endOnTick = !1),
            (a.scrollbar = new B(
              a.chart.renderer,
              a.options.scrollbar,
              a.chart
            )),
            q(a.scrollbar, "changed", function (n) {
              var c = x(a),
                h = c.axisMax,
                m = c.scrollMin,
                l = c.scrollMax - m;
              v(c.axisMin) &&
                v(h) &&
                ((a.horiz && !a.reversed) || (!a.horiz && a.reversed)
                  ? ((c = m + l * this.to), (m += l * this.from))
                  : ((c = m + l * (1 - this.from)), (m += l * (1 - this.to))),
                this.shouldUpdateExtremes(n.DOMType)
                  ? a.setExtremes(
                      m,
                      c,
                      !0,
                      "mousemove" !== n.DOMType && "touchmove" !== n.DOMType,
                      n
                    )
                  : this.setRange(this.from, this.to));
            }));
        });
        q(A, "afterRender", function () {
          var a = x(this),
            n = a.scrollMin,
            c = a.scrollMax;
          a = this.scrollbar;
          var h = this.axisTitleMargin + (this.titleOffset || 0),
            m = this.chart.scrollbarsOffsets,
            l = this.options.margin || 0;
          a &&
            (this.horiz
              ? (this.opposite || (m[1] += h),
                a.position(
                  this.left,
                  this.top + this.height + 2 + m[1] - (this.opposite ? l : 0),
                  this.width,
                  this.height
                ),
                this.opposite || (m[1] += l),
                (h = 1))
              : (this.opposite && (m[0] += h),
                a.position(
                  a.options.opposite
                    ? this.left +
                        this.width +
                        2 +
                        m[0] -
                        (this.opposite ? 0 : l)
                    : this.opposite
                    ? 0
                    : l,
                  this.top,
                  this.width,
                  this.height
                ),
                this.opposite && (m[0] += l),
                (h = 0)),
            (m[h] += a.size + a.options.margin),
            isNaN(n) ||
            isNaN(c) ||
            !v(this.min) ||
            !v(this.max) ||
            this.min === this.max
              ? a.setRange(0, 1)
              : ((m = (this.min - n) / (c - n)),
                (n = (this.max - n) / (c - n)),
                (this.horiz && !this.reversed) || (!this.horiz && this.reversed)
                  ? a.setRange(m, n)
                  : a.setRange(1 - n, 1 - m)));
        });
        q(A, "afterGetOffset", function () {
          var a = this.scrollbar && !this.scrollbar.options.opposite;
          a = this.horiz ? 2 : a ? 3 : 1;
          var n = this.scrollbar;
          n &&
            ((this.chart.scrollbarsOffsets = [0, 0]),
            (this.chart.axisOffset[a] += n.size + n.options.margin));
        });
        return A;
      };
      a.composed = [];
      return a;
    })();
  });
  J(
    a,
    "Stock/Scrollbar/ScrollbarDefaults.js",
    [a["Core/Globals.js"]],
    function (a) {
      return {
        height: a.isTouchDevice ? 20 : 14,
        barBorderRadius: 0,
        buttonBorderRadius: 0,
        liveRedraw: void 0,
        margin: 10,
        minWidth: 6,
        opposite: !0,
        step: 0.2,
        zIndex: 3,
        barBackgroundColor: "#cccccc",
        barBorderWidth: 1,
        barBorderColor: "#cccccc",
        buttonArrowColor: "#333333",
        buttonBackgroundColor: "#e6e6e6",
        buttonBorderColor: "#cccccc",
        buttonBorderWidth: 1,
        rifleColor: "#333333",
        trackBackgroundColor: "#f2f2f2",
        trackBorderColor: "#f2f2f2",
        trackBorderWidth: 1,
      };
    }
  );
  J(
    a,
    "Stock/Scrollbar/Scrollbar.js",
    [
      a["Core/Defaults.js"],
      a["Core/Globals.js"],
      a["Core/Axis/ScrollbarAxis.js"],
      a["Stock/Scrollbar/ScrollbarDefaults.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B) {
      var v = a.defaultOptions,
        F = B.addEvent,
        x = B.correctFloat,
        u = B.defined,
        n = B.destroyObjectProperties,
        c = B.fireEvent,
        h = B.merge,
        m = B.pick,
        l = B.removeEvent;
      a = (function () {
        function a(a, c, h) {
          this._events = [];
          this.chart = void 0;
          this.from = this.chartY = this.chartX = 0;
          this.scrollbar = this.renderer = this.options = this.group = void 0;
          this.scrollbarButtons = [];
          this.scrollbarGroup = void 0;
          this.scrollbarLeft = 0;
          this.scrollbarRifles = void 0;
          this.scrollbarStrokeWidth = 1;
          this.to = this.size = this.scrollbarTop = 0;
          this.track = void 0;
          this.trackBorderWidth = 1;
          this.userOptions = void 0;
          this.y = this.x = 0;
          this.init(a, c, h);
        }
        a.compose = function (c) {
          A.compose(c, a);
        };
        a.swapXY = function (a, c) {
          c &&
            a.forEach(function (a) {
              for (var c = a.length, f, h = 0; h < c; h += 2)
                (f = a[h + 1]),
                  "number" === typeof f &&
                    ((a[h + 1] = a[h + 2]), (a[h + 2] = f));
            });
          return a;
        };
        a.prototype.addEvents = function () {
          var a = this.options.inverted ? [1, 0] : [0, 1],
            c = this.scrollbarButtons,
            h = this.scrollbarGroup.element,
            l = this.track.element,
            m = this.mouseDownHandler.bind(this),
            p = this.mouseMoveHandler.bind(this),
            n = this.mouseUpHandler.bind(this);
          a = [
            [c[a[0]].element, "click", this.buttonToMinClick.bind(this)],
            [c[a[1]].element, "click", this.buttonToMaxClick.bind(this)],
            [l, "click", this.trackClick.bind(this)],
            [h, "mousedown", m],
            [h.ownerDocument, "mousemove", p],
            [h.ownerDocument, "mouseup", n],
          ];
          q.hasTouch &&
            a.push(
              [h, "touchstart", m],
              [h.ownerDocument, "touchmove", p],
              [h.ownerDocument, "touchend", n]
            );
          a.forEach(function (a) {
            F.apply(null, a);
          });
          this._events = a;
        };
        a.prototype.buttonToMaxClick = function (a) {
          var f = (this.to - this.from) * m(this.options.step, 0.2);
          this.updatePosition(this.from + f, this.to + f);
          c(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: a,
          });
        };
        a.prototype.buttonToMinClick = function (a) {
          var f = x(this.to - this.from) * m(this.options.step, 0.2);
          this.updatePosition(x(this.from - f), x(this.to - f));
          c(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: a,
          });
        };
        a.prototype.cursorToScrollbarPosition = function (a) {
          var c = this.options;
          c = c.minWidth > this.calculatedWidth ? c.minWidth : 0;
          return {
            chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - c),
            chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - c),
          };
        };
        a.prototype.destroy = function () {
          var a = this,
            c = a.chart.scroller;
          a.removeEvents();
          [
            "track",
            "scrollbarRifles",
            "scrollbar",
            "scrollbarGroup",
            "group",
          ].forEach(function (c) {
            a[c] && a[c].destroy && (a[c] = a[c].destroy());
          });
          c &&
            a === c.scrollbar &&
            ((c.scrollbar = null), n(c.scrollbarButtons));
        };
        a.prototype.drawScrollbarButton = function (c) {
          var f = this.renderer,
            h = this.scrollbarButtons,
            l = this.options,
            m = this.size,
            p = f.g().add(this.group);
          h.push(p);
          p = f.rect().addClass("highcharts-scrollbar-button").add(p);
          this.chart.styledMode ||
            p.attr({
              stroke: l.buttonBorderColor,
              "stroke-width": l.buttonBorderWidth,
              fill: l.buttonBackgroundColor,
            });
          p.attr(
            p.crisp(
              {
                x: -0.5,
                y: -0.5,
                width: m + 1,
                height: m + 1,
                r: l.buttonBorderRadius,
              },
              p.strokeWidth()
            )
          );
          p = f
            .path(
              a.swapXY(
                [
                  ["M", m / 2 + (c ? -1 : 1), m / 2 - 3],
                  ["L", m / 2 + (c ? -1 : 1), m / 2 + 3],
                  ["L", m / 2 + (c ? 2 : -2), m / 2],
                ],
                l.vertical
              )
            )
            .addClass("highcharts-scrollbar-arrow")
            .add(h[c]);
          this.chart.styledMode || p.attr({ fill: l.buttonArrowColor });
        };
        a.prototype.init = function (a, c, l) {
          this.scrollbarButtons = [];
          this.renderer = a;
          this.userOptions = c;
          this.options = h(E, v.scrollbar, c);
          this.chart = l;
          this.size = m(this.options.size, this.options.height);
          c.enabled && (this.render(), this.addEvents());
        };
        a.prototype.mouseDownHandler = function (a) {
          a = this.chart.pointer.normalize(a);
          a = this.cursorToScrollbarPosition(a);
          this.chartX = a.chartX;
          this.chartY = a.chartY;
          this.initPositions = [this.from, this.to];
          this.grabbedCenter = !0;
        };
        a.prototype.mouseMoveHandler = function (a) {
          var f = this.chart.pointer.normalize(a),
            h = this.options.vertical ? "chartY" : "chartX",
            l = this.initPositions || [];
          !this.grabbedCenter ||
            (a.touches && 0 === a.touches[0][h]) ||
            ((f = this.cursorToScrollbarPosition(f)[h]),
            (h = this[h]),
            (h = f - h),
            (this.hasDragged = !0),
            this.updatePosition(l[0] + h, l[1] + h),
            this.hasDragged &&
              c(this, "changed", {
                from: this.from,
                to: this.to,
                trigger: "scrollbar",
                DOMType: a.type,
                DOMEvent: a,
              }));
        };
        a.prototype.mouseUpHandler = function (a) {
          this.hasDragged &&
            c(this, "changed", {
              from: this.from,
              to: this.to,
              trigger: "scrollbar",
              DOMType: a.type,
              DOMEvent: a,
            });
          this.grabbedCenter =
            this.hasDragged =
            this.chartX =
            this.chartY =
              null;
        };
        a.prototype.position = function (a, c, h, l) {
          var f = this.options.vertical,
            m = this.rendered ? "animate" : "attr",
            p = l,
            n = 0;
          this.group.show();
          this.x = a;
          this.y = c + this.trackBorderWidth;
          this.width = h;
          this.height = l;
          this.xOffset = p;
          this.yOffset = n;
          f
            ? ((this.width = this.yOffset = h = n = this.size),
              (this.xOffset = p = 0),
              (this.barWidth = l - 2 * h),
              (this.x = a += this.options.margin))
            : ((this.height = this.xOffset = l = p = this.size),
              (this.barWidth = h - 2 * l),
              (this.y += this.options.margin));
          this.group[m]({ translateX: a, translateY: this.y });
          this.track[m]({ width: h, height: l });
          this.scrollbarButtons[1][m]({
            translateX: f ? 0 : h - p,
            translateY: f ? l - n : 0,
          });
        };
        a.prototype.removeEvents = function () {
          this._events.forEach(function (a) {
            l.apply(null, a);
          });
          this._events.length = 0;
        };
        a.prototype.render = function () {
          var c = this.renderer,
            h = this.options,
            l = this.size,
            m = this.chart.styledMode,
            p = c.g("scrollbar").attr({ zIndex: h.zIndex }).hide().add();
          this.group = p;
          this.track = c
            .rect()
            .addClass("highcharts-scrollbar-track")
            .attr({ x: 0, r: h.trackBorderRadius || 0, height: l, width: l })
            .add(p);
          m ||
            this.track.attr({
              fill: h.trackBackgroundColor,
              stroke: h.trackBorderColor,
              "stroke-width": h.trackBorderWidth,
            });
          this.trackBorderWidth = this.track.strokeWidth();
          this.track.attr({ y: (-this.trackBorderWidth % 2) / 2 });
          this.scrollbarGroup = c.g().add(p);
          this.scrollbar = c
            .rect()
            .addClass("highcharts-scrollbar-thumb")
            .attr({ height: l, width: l, r: h.barBorderRadius || 0 })
            .add(this.scrollbarGroup);
          this.scrollbarRifles = c
            .path(
              a.swapXY(
                [
                  ["M", -3, l / 4],
                  ["L", -3, (2 * l) / 3],
                  ["M", 0, l / 4],
                  ["L", 0, (2 * l) / 3],
                  ["M", 3, l / 4],
                  ["L", 3, (2 * l) / 3],
                ],
                h.vertical
              )
            )
            .addClass("highcharts-scrollbar-rifles")
            .add(this.scrollbarGroup);
          m ||
            (this.scrollbar.attr({
              fill: h.barBackgroundColor,
              stroke: h.barBorderColor,
              "stroke-width": h.barBorderWidth,
            }),
            this.scrollbarRifles.attr({
              stroke: h.rifleColor,
              "stroke-width": 1,
            }));
          this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
          this.scrollbarGroup.translate(
            (-this.scrollbarStrokeWidth % 2) / 2,
            (-this.scrollbarStrokeWidth % 2) / 2
          );
          this.drawScrollbarButton(0);
          this.drawScrollbarButton(1);
        };
        a.prototype.setRange = function (a, c) {
          var f = this.options,
            h = f.vertical,
            l = f.minWidth,
            m = this.barWidth,
            p =
              !this.rendered ||
              this.hasDragged ||
              (this.chart.navigator && this.chart.navigator.hasDragged)
                ? "attr"
                : "animate";
          if (u(m)) {
            var n = m * Math.min(c, 1);
            a = Math.max(a, 0);
            var k = Math.ceil(m * a);
            this.calculatedWidth = n = x(n - k);
            n < l && ((k = (m - l + n) * a), (n = l));
            l = Math.floor(k + this.xOffset + this.yOffset);
            m = n / 2 - 0.5;
            this.from = a;
            this.to = c;
            h
              ? (this.scrollbarGroup[p]({ translateY: l }),
                this.scrollbar[p]({ height: n }),
                this.scrollbarRifles[p]({ translateY: m }),
                (this.scrollbarTop = l),
                (this.scrollbarLeft = 0))
              : (this.scrollbarGroup[p]({ translateX: l }),
                this.scrollbar[p]({ width: n }),
                this.scrollbarRifles[p]({ translateX: m }),
                (this.scrollbarLeft = l),
                (this.scrollbarTop = 0));
            12 >= n ? this.scrollbarRifles.hide() : this.scrollbarRifles.show();
            !1 === f.showFull &&
              (0 >= a && 1 <= c ? this.group.hide() : this.group.show());
            this.rendered = !0;
          }
        };
        a.prototype.shouldUpdateExtremes = function (a) {
          return (
            m(
              this.options.liveRedraw,
              q.svg && !q.isTouchDevice && !this.chart.boosted
            ) ||
            "mouseup" === a ||
            "touchend" === a ||
            !u(a)
          );
        };
        a.prototype.trackClick = function (a) {
          var f = this.chart.pointer.normalize(a),
            h = this.to - this.from,
            l = this.y + this.scrollbarTop,
            m = this.x + this.scrollbarLeft;
          (this.options.vertical && f.chartY > l) ||
          (!this.options.vertical && f.chartX > m)
            ? this.updatePosition(this.from + h, this.to + h)
            : this.updatePosition(this.from - h, this.to - h);
          c(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: a,
          });
        };
        a.prototype.update = function (a) {
          this.destroy();
          this.init(this.chart.renderer, h(!0, this.options, a), this.chart);
        };
        a.prototype.updatePosition = function (a, c) {
          1 < c && ((a = x(1 - x(c - a))), (c = 1));
          0 > a && ((c = x(c - a)), (a = 0));
          this.from = a;
          this.to = c;
        };
        a.defaultOptions = E;
        return a;
      })();
      v.scrollbar = h(!0, a.defaultOptions, v.scrollbar);
      return a;
    }
  );
  J(
    a,
    "Stock/Navigator/Navigator.js",
    [
      a["Core/Axis/Axis.js"],
      a["Core/Defaults.js"],
      a["Core/Globals.js"],
      a["Core/Axis/NavigatorAxisComposition.js"],
      a["Stock/Navigator/NavigatorComposition.js"],
      a["Stock/Scrollbar/Scrollbar.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C, F) {
      function v(a) {
        for (var b = [], c = 1; c < arguments.length; c++)
          b[c - 1] = arguments[c];
        b = [].filter.call(b, y);
        if (b.length) return Math[a].apply(0, b);
      }
      var u = q.defaultOptions,
        n = A.hasTouch,
        c = A.isTouchDevice,
        h = F.addEvent,
        m = F.clamp,
        l = F.correctFloat,
        p = F.defined,
        f = F.destroyObjectProperties,
        D = F.erase,
        G = F.extend,
        H = F.find,
        K = F.isArray,
        y = F.isNumber,
        t = F.merge,
        w = F.pick,
        k = F.removeEvent,
        g = F.splat;
      return (function () {
        function e(a) {
          this.zoomedMin =
            this.zoomedMax =
            this.yAxis =
            this.xAxis =
            this.top =
            this.size =
            this.shades =
            this.rendered =
            this.range =
            this.outlineHeight =
            this.outline =
            this.opposite =
            this.navigatorSize =
            this.navigatorSeries =
            this.navigatorOptions =
            this.navigatorGroup =
            this.navigatorEnabled =
            this.left =
            this.height =
            this.handles =
            this.chart =
            this.baseSeries =
              void 0;
          this.init(a);
        }
        e.compose = function (a, c, g) {
          B.compose(a, c, e, g);
        };
        e.prototype.drawHandle = function (a, c, e, g) {
          var b = this.navigatorOptions.handles.height;
          this.handles[c][g](
            e
              ? {
                  translateX: Math.round(this.left + this.height / 2),
                  translateY: Math.round(this.top + parseInt(a, 10) + 0.5 - b),
                }
              : {
                  translateX: Math.round(this.left + parseInt(a, 10)),
                  translateY: Math.round(
                    this.top + this.height / 2 - b / 2 - 1
                  ),
                }
          );
        };
        e.prototype.drawOutline = function (a, c, e, g) {
          var b = this.navigatorOptions.maskInside,
            d = this.outline.strokeWidth(),
            f = d / 2,
            h = (d % 2) / 2;
          d = this.outlineHeight;
          var k = this.scrollbarHeight || 0,
            l = this.size,
            r = this.left - k,
            m = this.top;
          e
            ? ((r -= f),
              (e = m + c + h),
              (c = m + a + h),
              (h = [
                ["M", r + d, m - k - h],
                ["L", r + d, e],
                ["L", r, e],
                ["L", r, c],
                ["L", r + d, c],
                ["L", r + d, m + l + k],
              ]),
              b && h.push(["M", r + d, e - f], ["L", r + d, c + f]))
            : ((a += r + k - h),
              (c += r + k - h),
              (m += f),
              (h = [
                ["M", r, m],
                ["L", a, m],
                ["L", a, m + d],
                ["L", c, m + d],
                ["L", c, m],
                ["L", r + l + 2 * k, m],
              ]),
              b && h.push(["M", a - f, m], ["L", c + f, m]));
          this.outline[g]({ d: h });
        };
        e.prototype.drawMasks = function (a, c, e, g) {
          var b = this.left,
            d = this.top,
            f = this.height;
          if (e) {
            var h = [b, b, b];
            var k = [d, d + a, d + c];
            var r = [f, f, f];
            var l = [a, c - a, this.size - c];
          } else
            (h = [b, b + a, b + c]),
              (k = [d, d, d]),
              (r = [a, c - a, this.size - c]),
              (l = [f, f, f]);
          this.shades.forEach(function (a, b) {
            a[g]({ x: h[b], y: k[b], width: r[b], height: l[b] });
          });
        };
        e.prototype.renderElements = function () {
          var a = this,
            c = a.navigatorOptions,
            e = c.maskInside,
            g = a.chart,
            f = g.renderer,
            h = { cursor: g.inverted ? "ns-resize" : "ew-resize" },
            k = (a.navigatorGroup = f
              .g("navigator")
              .attr({ zIndex: 8, visibility: "hidden" })
              .add());
          [!e, e, !e].forEach(function (b, d) {
            var e = f
              .rect()
              .addClass(
                "highcharts-navigator-mask" + (1 === d ? "-inside" : "-outside")
              )
              .add(k);
            g.styledMode ||
              (e.attr({ fill: b ? c.maskFill : "rgba(0,0,0,0)" }),
              1 === d && e.css(h));
            a.shades[d] = e;
          });
          a.outline = f.path().addClass("highcharts-navigator-outline").add(k);
          g.styledMode ||
            a.outline.attr({
              "stroke-width": c.outlineWidth,
              stroke: c.outlineColor,
            });
          if (c.handles && c.handles.enabled) {
            var l = c.handles,
              m = l.height,
              p = l.width;
            [0, 1].forEach(function (b) {
              a.handles[b] = f.symbol(l.symbols[b], -p / 2 - 1, 0, p, m, l);
              g.inverted &&
                a.handles[b].attr({
                  rotation: 90,
                  rotationOriginX: Math.floor(-p / 2),
                  rotationOriginY: (m + p) / 2,
                });
              a.handles[b]
                .attr({ zIndex: 7 - b })
                .addClass(
                  "highcharts-navigator-handle highcharts-navigator-handle-" +
                    ["left", "right"][b]
                )
                .add(k);
              g.styledMode ||
                a.handles[b]
                  .attr({
                    fill: l.backgroundColor,
                    stroke: l.borderColor,
                    "stroke-width": l.lineWidth,
                  })
                  .css(h);
            });
          }
        };
        e.prototype.update = function (a) {
          (this.series || []).forEach(function (a) {
            a.baseSeries && delete a.baseSeries.navigatorSeries;
          });
          this.destroy();
          t(!0, this.chart.options.navigator, a);
          this.init(this.chart);
        };
        e.prototype.render = function (a, c, e, g) {
          var b = this.chart,
            d = this.xAxis,
            f = d.pointRange || 0,
            h = d.navigatorAxis.fake ? b.xAxis[0] : d,
            k = this.navigatorEnabled,
            r = this.rendered,
            n = b.inverted,
            t = b.xAxis[0].minRange,
            q = b.xAxis[0].options.maxRange,
            u = this.scrollbarHeight,
            z;
          if (!this.hasDragged || p(e)) {
            a = l(a - f / 2);
            c = l(c + f / 2);
            if (!y(a) || !y(c))
              if (r) (e = 0), (g = w(d.width, h.width));
              else return;
            this.left = w(d.left, b.plotLeft + u + (n ? b.plotWidth : 0));
            var v =
              (this.size =
              z =
                w(d.len, (n ? b.plotHeight : b.plotWidth) - 2 * u));
            b = n ? u : z + 2 * u;
            e = w(e, d.toPixels(a, !0));
            g = w(g, d.toPixels(c, !0));
            (y(e) && Infinity !== Math.abs(e)) || ((e = 0), (g = b));
            a = d.toValue(e, !0);
            c = d.toValue(g, !0);
            var x = Math.abs(l(c - a));
            x < t
              ? this.grabbedLeft
                ? (e = d.toPixels(c - t - f, !0))
                : this.grabbedRight && (g = d.toPixels(a + t + f, !0))
              : p(q) &&
                l(x - f) > q &&
                (this.grabbedLeft
                  ? (e = d.toPixels(c - q - f, !0))
                  : this.grabbedRight && (g = d.toPixels(a + q + f, !0)));
            this.zoomedMax = m(Math.max(e, g), 0, v);
            this.zoomedMin = m(
              this.fixedWidth
                ? this.zoomedMax - this.fixedWidth
                : Math.min(e, g),
              0,
              v
            );
            this.range = this.zoomedMax - this.zoomedMin;
            v = Math.round(this.zoomedMax);
            e = Math.round(this.zoomedMin);
            k &&
              (this.navigatorGroup.attr({ visibility: "inherit" }),
              (r = r && !this.hasDragged ? "animate" : "attr"),
              this.drawMasks(e, v, n, r),
              this.drawOutline(e, v, n, r),
              this.navigatorOptions.handles.enabled &&
                (this.drawHandle(e, 0, n, r), this.drawHandle(v, 1, n, r)));
            this.scrollbar &&
              (n
                ? ((n = this.top - u),
                  (h =
                    this.left -
                    u +
                    (k || !h.opposite
                      ? 0
                      : (h.titleOffset || 0) + h.axisTitleMargin)),
                  (u = z + 2 * u))
                : ((n = this.top + (k ? this.height : -u)),
                  (h = this.left - u)),
              this.scrollbar.position(h, n, b, u),
              this.scrollbar.setRange(
                this.zoomedMin / (z || 1),
                this.zoomedMax / (z || 1)
              ));
            this.rendered = !0;
          }
        };
        e.prototype.addMouseEvents = function () {
          var a = this,
            c = a.chart,
            e = c.container,
            g = [],
            f,
            k;
          a.mouseMoveHandler = f = function (b) {
            a.onMouseMove(b);
          };
          a.mouseUpHandler = k = function (b) {
            a.onMouseUp(b);
          };
          g = a.getPartsEvents("mousedown");
          g.push(
            h(c.renderTo, "mousemove", f),
            h(e.ownerDocument, "mouseup", k)
          );
          n &&
            (g.push(
              h(c.renderTo, "touchmove", f),
              h(e.ownerDocument, "touchend", k)
            ),
            g.concat(a.getPartsEvents("touchstart")));
          a.eventsToUnbind = g;
          a.series &&
            a.series[0] &&
            g.push(
              h(a.series[0].xAxis, "foundExtremes", function () {
                c.navigator.modifyNavigatorAxisExtremes();
              })
            );
        };
        e.prototype.getPartsEvents = function (a) {
          var b = this,
            c = [];
          ["shades", "handles"].forEach(function (d) {
            b[d].forEach(function (e, g) {
              c.push(
                h(e.element, a, function (a) {
                  b[d + "Mousedown"](a, g);
                })
              );
            });
          });
          return c;
        };
        e.prototype.shadesMousedown = function (a, c) {
          a = this.chart.pointer.normalize(a);
          var b = this.chart,
            d = this.xAxis,
            e = this.zoomedMin,
            g = this.size,
            f = this.range,
            h = this.left,
            k = a.chartX;
          b.inverted && ((k = a.chartY), (h = this.top));
          if (1 === c)
            (this.grabbedCenter = k),
              (this.fixedWidth = f),
              (this.dragOffset = k - e);
          else {
            a = k - h - f / 2;
            if (0 === c) a = Math.max(0, a);
            else if (2 === c && a + f >= g)
              if (((a = g - f), this.reversedExtremes)) {
                a -= f;
                var l = this.getUnionExtremes().dataMin;
              } else var m = this.getUnionExtremes().dataMax;
            a !== e &&
              ((this.fixedWidth = f),
              (c = d.navigatorAxis.toFixedRange(a, a + f, l, m)),
              p(c.min) &&
                b.xAxis[0].setExtremes(
                  Math.min(c.min, c.max),
                  Math.max(c.min, c.max),
                  !0,
                  null,
                  { trigger: "navigator" }
                ));
          }
        };
        e.prototype.handlesMousedown = function (a, c) {
          this.chart.pointer.normalize(a);
          a = this.chart;
          var b = a.xAxis[0],
            d = this.reversedExtremes;
          0 === c
            ? ((this.grabbedLeft = !0),
              (this.otherHandlePos = this.zoomedMax),
              (this.fixedExtreme = d ? b.min : b.max))
            : ((this.grabbedRight = !0),
              (this.otherHandlePos = this.zoomedMin),
              (this.fixedExtreme = d ? b.max : b.min));
          a.fixedRange = null;
        };
        e.prototype.onMouseMove = function (a) {
          var b = this,
            e = b.chart,
            g = b.navigatorSize,
            f = b.range,
            h = b.dragOffset,
            k = e.inverted,
            l = b.left;
          (a.touches && 0 === a.touches[0].pageX) ||
            ((a = e.pointer.normalize(a)),
            (e = a.chartX),
            k && ((l = b.top), (e = a.chartY)),
            b.grabbedLeft
              ? ((b.hasDragged = !0), b.render(0, 0, e - l, b.otherHandlePos))
              : b.grabbedRight
              ? ((b.hasDragged = !0), b.render(0, 0, b.otherHandlePos, e - l))
              : b.grabbedCenter &&
                ((b.hasDragged = !0),
                e < h ? (e = h) : e > g + h - f && (e = g + h - f),
                b.render(0, 0, e - h, e - h + f)),
            b.hasDragged &&
              b.scrollbar &&
              w(
                b.scrollbar.options.liveRedraw,
                A.svg && !c && !this.chart.boosted
              ) &&
              ((a.DOMType = a.type),
              setTimeout(function () {
                b.onMouseUp(a);
              }, 0)));
        };
        e.prototype.onMouseUp = function (a) {
          var b = this.chart,
            c = this.xAxis,
            e = this.scrollbar,
            g = a.DOMEvent || a,
            f = b.inverted,
            h = this.rendered && !this.hasDragged ? "animate" : "attr";
          if (
            (this.hasDragged && (!e || !e.hasDragged)) ||
            "scrollbar" === a.trigger
          ) {
            e = this.getUnionExtremes();
            if (this.zoomedMin === this.otherHandlePos)
              var k = this.fixedExtreme;
            else if (this.zoomedMax === this.otherHandlePos)
              var l = this.fixedExtreme;
            this.zoomedMax === this.size &&
              (l = this.reversedExtremes ? e.dataMin : e.dataMax);
            0 === this.zoomedMin &&
              (k = this.reversedExtremes ? e.dataMax : e.dataMin);
            c = c.navigatorAxis.toFixedRange(
              this.zoomedMin,
              this.zoomedMax,
              k,
              l
            );
            p(c.min) &&
              b.xAxis[0].setExtremes(
                Math.min(c.min, c.max),
                Math.max(c.min, c.max),
                !0,
                this.hasDragged ? !1 : null,
                {
                  trigger: "navigator",
                  triggerOp: "navigator-drag",
                  DOMEvent: g,
                }
              );
          }
          "mousemove" !== a.DOMType &&
            "touchmove" !== a.DOMType &&
            (this.grabbedLeft =
              this.grabbedRight =
              this.grabbedCenter =
              this.fixedWidth =
              this.fixedExtreme =
              this.otherHandlePos =
              this.hasDragged =
              this.dragOffset =
                null);
          this.navigatorEnabled &&
            y(this.zoomedMin) &&
            y(this.zoomedMax) &&
            ((b = Math.round(this.zoomedMin)),
            (a = Math.round(this.zoomedMax)),
            this.shades && this.drawMasks(b, a, f, h),
            this.outline && this.drawOutline(b, a, f, h),
            this.navigatorOptions.handles.enabled &&
              Object.keys(this.handles).length === this.handles.length &&
              (this.drawHandle(b, 0, f, h), this.drawHandle(a, 1, f, h)));
        };
        e.prototype.removeEvents = function () {
          this.eventsToUnbind &&
            (this.eventsToUnbind.forEach(function (a) {
              a();
            }),
            (this.eventsToUnbind = void 0));
          this.removeBaseSeriesEvents();
        };
        e.prototype.removeBaseSeriesEvents = function () {
          var a = this.baseSeries || [];
          this.navigatorEnabled &&
            a[0] &&
            (!1 !== this.navigatorOptions.adaptToUpdatedData &&
              a.forEach(function (a) {
                k(a, "updatedData", this.updatedDataHandler);
              }, this),
            a[0].xAxis &&
              k(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
        };
        e.prototype.init = function (b) {
          var c = b.options,
            e = c.navigator || {},
            g = e.enabled,
            f = c.scrollbar || {},
            k = f.enabled;
          c = (g && e.height) || 0;
          var l = (k && f.height) || 0;
          this.handles = [];
          this.shades = [];
          this.chart = b;
          this.setBaseSeries();
          this.height = c;
          this.scrollbarHeight = l;
          this.scrollbarEnabled = k;
          this.navigatorEnabled = g;
          this.navigatorOptions = e;
          this.scrollbarOptions = f;
          this.outlineHeight = c + l;
          this.opposite = w(e.opposite, !(g || !b.inverted));
          var m = this;
          g = m.baseSeries;
          f = b.xAxis.length;
          k = b.yAxis.length;
          var p = (g && g[0] && g[0].xAxis) || b.xAxis[0] || { options: {} };
          b.isDirtyBox = !0;
          m.navigatorEnabled
            ? ((m.xAxis = new a(
                b,
                t(
                  { breaks: p.options.breaks, ordinal: p.options.ordinal },
                  e.xAxis,
                  {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    isX: !0,
                    type: "datetime",
                    index: f,
                    isInternal: !0,
                    offset: 0,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1,
                  },
                  b.inverted
                    ? { offsets: [l, 0, -l, 0], width: c }
                    : { offsets: [0, -l, 0, l], height: c }
                )
              )),
              (m.yAxis = new a(
                b,
                t(
                  e.yAxis,
                  {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    offset: 0,
                    index: k,
                    isInternal: !0,
                    reversed: w(
                      e.yAxis && e.yAxis.reversed,
                      b.yAxis[0] && b.yAxis[0].reversed,
                      !1
                    ),
                    zoomEnabled: !1,
                  },
                  b.inverted ? { width: c } : { height: c }
                )
              )),
              g || e.series.data
                ? m.updateNavigatorSeries(!1)
                : 0 === b.series.length &&
                  (m.unbindRedraw = h(b, "beforeRedraw", function () {
                    0 < b.series.length &&
                      !m.series &&
                      (m.setBaseSeries(), m.unbindRedraw());
                  })),
              (m.reversedExtremes =
                (b.inverted && !m.xAxis.reversed) ||
                (!b.inverted && m.xAxis.reversed)),
              m.renderElements(),
              m.addMouseEvents())
            : ((m.xAxis = {
                chart: b,
                navigatorAxis: { fake: !0 },
                translate: function (a, c) {
                  var d = b.xAxis[0],
                    e = d.getExtremes(),
                    g = d.len - 2 * l,
                    f = v("min", d.options.min, e.dataMin);
                  d = v("max", d.options.max, e.dataMax) - f;
                  return c ? (a * d) / g + f : (g * (a - f)) / d;
                },
                toPixels: function (a) {
                  return this.translate(a);
                },
                toValue: function (a) {
                  return this.translate(a, !0);
                },
              }),
              (m.xAxis.navigatorAxis.axis = m.xAxis),
              (m.xAxis.navigatorAxis.toFixedRange =
                E.prototype.toFixedRange.bind(m.xAxis.navigatorAxis)));
          b.options.scrollbar.enabled &&
            ((b.scrollbar = m.scrollbar =
              new C(
                b.renderer,
                t(b.options.scrollbar, {
                  margin: m.navigatorEnabled ? 0 : 10,
                  vertical: b.inverted,
                }),
                b
              )),
            h(m.scrollbar, "changed", function (a) {
              var b = m.size,
                c = b * this.to;
              b *= this.from;
              m.hasDragged = m.scrollbar.hasDragged;
              m.render(0, 0, b, c);
              this.shouldUpdateExtremes(a.DOMType) &&
                setTimeout(function () {
                  m.onMouseUp(a);
                });
            }));
          m.addBaseSeriesEvents();
          m.addChartEvents();
        };
        e.prototype.getUnionExtremes = function (a) {
          var b = this.chart.xAxis[0],
            c = this.xAxis,
            e = c.options,
            g = b.options,
            f;
          (a && null === b.dataMin) ||
            (f = {
              dataMin: w(
                e && e.min,
                v("min", g.min, b.dataMin, c.dataMin, c.min)
              ),
              dataMax: w(
                e && e.max,
                v("max", g.max, b.dataMax, c.dataMax, c.max)
              ),
            });
          return f;
        };
        e.prototype.setBaseSeries = function (a, c) {
          var b = this.chart,
            d = (this.baseSeries = []);
          a =
            a ||
            (b.options && b.options.navigator.baseSeries) ||
            (b.series.length
              ? H(b.series, function (a) {
                  return !a.options.isInternal;
                }).index
              : 0);
          (b.series || []).forEach(function (b, c) {
            b.options.isInternal ||
              (!b.options.showInNavigator &&
                ((c !== a && b.options.id !== a) ||
                  !1 === b.options.showInNavigator)) ||
              d.push(b);
          });
          this.xAxis &&
            !this.xAxis.navigatorAxis.fake &&
            this.updateNavigatorSeries(!0, c);
        };
        e.prototype.updateNavigatorSeries = function (a, c) {
          var b = this,
            d = b.chart,
            e = b.baseSeries,
            f = {
              enableMouseTracking: !1,
              index: null,
              linkedTo: null,
              group: "nav",
              padXAxis: !1,
              xAxis: "navigator-x-axis",
              yAxis: "navigator-y-axis",
              showInLegend: !1,
              stacking: void 0,
              isInternal: !0,
              states: { inactive: { opacity: 1 } },
            },
            h = (b.series = (b.series || []).filter(function (a) {
              var c = a.baseSeries;
              return 0 > e.indexOf(c)
                ? (c &&
                    (k(c, "updatedData", b.updatedDataHandler),
                    delete c.navigatorSeries),
                  a.chart && a.destroy(),
                  !1)
                : !0;
            })),
            l,
            m,
            p = b.navigatorOptions.series,
            n;
          e &&
            e.length &&
            e.forEach(function (a) {
              var k = a.navigatorSeries,
                r = G(
                  { color: a.color, visible: a.visible },
                  K(p) ? u.navigator.series : p
                );
              (k && !1 === b.navigatorOptions.adaptToUpdatedData) ||
                ((f.name = "Navigator " + e.length),
                (l = a.options || {}),
                (n = l.navigatorOptions || {}),
                (r.dataLabels = g(r.dataLabels)),
                (m = t(l, f, r, n)),
                (m.pointRange = w(
                  r.pointRange,
                  n.pointRange,
                  u.plotOptions[m.type || "line"].pointRange
                )),
                (r = n.data || r.data),
                (b.hasNavigatorData = b.hasNavigatorData || !!r),
                (m.data = r || (l.data && l.data.slice(0))),
                k && k.options
                  ? k.update(m, c)
                  : ((a.navigatorSeries = d.initSeries(m)),
                    (a.navigatorSeries.baseSeries = a),
                    h.push(a.navigatorSeries)));
            });
          if ((p.data && (!e || !e.length)) || K(p))
            (b.hasNavigatorData = !1),
              (p = g(p)),
              p.forEach(function (a, c) {
                f.name = "Navigator " + (h.length + 1);
                m = t(
                  u.navigator.series,
                  {
                    color:
                      (d.series[c] &&
                        !d.series[c].options.isInternal &&
                        d.series[c].color) ||
                      d.options.colors[c] ||
                      d.options.colors[0],
                  },
                  f,
                  a
                );
                m.data = a.data;
                m.data && ((b.hasNavigatorData = !0), h.push(d.initSeries(m)));
              });
          a && this.addBaseSeriesEvents();
        };
        e.prototype.addBaseSeriesEvents = function () {
          var a = this,
            c = this,
            e = c.baseSeries || [];
          e[0] &&
            e[0].xAxis &&
            e[0].eventsToUnbind.push(
              h(e[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes)
            );
          e.forEach(function (b) {
            b.eventsToUnbind.push(
              h(b, "show", function () {
                this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1);
              })
            );
            b.eventsToUnbind.push(
              h(b, "hide", function () {
                this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1);
              })
            );
            !1 !== a.navigatorOptions.adaptToUpdatedData &&
              b.xAxis &&
              b.eventsToUnbind.push(h(b, "updatedData", a.updatedDataHandler));
            b.eventsToUnbind.push(
              h(b, "remove", function () {
                this.navigatorSeries &&
                  (D(c.series, this.navigatorSeries),
                  p(this.navigatorSeries.options) &&
                    this.navigatorSeries.remove(!1),
                  delete this.navigatorSeries);
              })
            );
          });
        };
        e.prototype.getBaseSeriesMin = function (a) {
          return this.baseSeries.reduce(function (a, b) {
            return Math.min(a, b.xData && b.xData.length ? b.xData[0] : a);
          }, a);
        };
        e.prototype.modifyNavigatorAxisExtremes = function () {
          var a = this.xAxis;
          if ("undefined" !== typeof a.getExtremes) {
            var c = this.getUnionExtremes(!0);
            !c ||
              (c.dataMin === a.min && c.dataMax === a.max) ||
              ((a.min = c.dataMin), (a.max = c.dataMax));
          }
        };
        e.prototype.modifyBaseAxisExtremes = function () {
          var a = this.chart.navigator,
            c = this.getExtremes(),
            e = c.dataMin,
            g = c.dataMax;
          c = c.max - c.min;
          var f = a.stickToMin,
            h = a.stickToMax,
            k = w(this.options.overscroll, 0),
            l = a.series && a.series[0],
            m = !!this.setExtremes;
          if (
            !this.eventArgs ||
            "rangeSelectorButton" !== this.eventArgs.trigger
          ) {
            if (f) {
              var p = e;
              var n = p + c;
            }
            h &&
              ((n = g + k),
              f ||
                (p = Math.max(
                  e,
                  n - c,
                  a.getBaseSeriesMin(
                    l && l.xData ? l.xData[0] : -Number.MAX_VALUE
                  )
                )));
            m &&
              (f || h) &&
              y(p) &&
              ((this.min = this.userMin = p), (this.max = this.userMax = n));
          }
          a.stickToMin = a.stickToMax = null;
        };
        e.prototype.updatedDataHandler = function () {
          var a = this.chart.navigator,
            c = this.navigatorSeries;
          a.stickToMax = w(
            this.chart.options.navigator &&
              this.chart.options.navigator.stickToMax,
            a.reversedExtremes
              ? 0 === Math.round(a.zoomedMin)
              : Math.round(a.zoomedMax) >= Math.round(a.size)
          );
          a.stickToMin = a.shouldStickToMin(this, a);
          c &&
            !a.hasNavigatorData &&
            ((c.options.pointStart = this.xData[0]),
            c.setData(this.options.data, !1, null, !1));
        };
        e.prototype.shouldStickToMin = function (a, c) {
          c = c.getBaseSeriesMin(a.xData[0]);
          var b = a.xAxis;
          a = b.max;
          var d = b.min;
          b = b.options.range;
          return y(a) && y(d) ? (b && 0 < a - c ? a - c < b : d <= c) : !1;
        };
        e.prototype.addChartEvents = function () {
          this.eventsToUnbind || (this.eventsToUnbind = []);
          this.eventsToUnbind.push(
            h(this.chart, "redraw", function () {
              var a = this.navigator,
                c =
                  a &&
                  ((a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis) ||
                    this.xAxis[0]);
              c && a.render(c.min, c.max);
            }),
            h(this.chart, "getMargins", function () {
              var a = this.navigator,
                c = a.opposite ? "plotTop" : "marginBottom";
              this.inverted && (c = a.opposite ? "marginRight" : "plotLeft");
              this[c] =
                (this[c] || 0) +
                (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) +
                a.navigatorOptions.margin;
            })
          );
        };
        e.prototype.destroy = function () {
          var a = this;
          this.removeEvents();
          this.xAxis &&
            (D(this.chart.xAxis, this.xAxis), D(this.chart.axes, this.xAxis));
          this.yAxis &&
            (D(this.chart.yAxis, this.yAxis), D(this.chart.axes, this.yAxis));
          (this.series || []).forEach(function (a) {
            a.destroy && a.destroy();
          });
          "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered"
            .split(" ")
            .forEach(function (b) {
              a[b] && a[b].destroy && a[b].destroy();
              a[b] = null;
            });
          [this.handles].forEach(function (a) {
            f(a);
          });
        };
        return e;
      })();
    }
  );
  J(a, "Stock/RangeSelector/RangeSelectorDefaults.js", [], function () {
    return {
      lang: {
        rangeSelectorZoom: "Zoom",
        rangeSelectorFrom: "",
        rangeSelectorTo: "\u2192",
      },
      rangeSelector: {
        allButtonsEnabled: !1,
        buttons: void 0,
        buttonSpacing: 5,
        dropdown: "responsive",
        enabled: void 0,
        verticalAlign: "top",
        buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 },
        floating: !1,
        x: 0,
        y: 0,
        height: void 0,
        inputBoxBorderColor: "none",
        inputBoxHeight: 17,
        inputBoxWidth: void 0,
        inputDateFormat: "%b %e, %Y",
        inputDateParser: void 0,
        inputEditDateFormat: "%Y-%m-%d",
        inputEnabled: !0,
        inputPosition: { align: "right", x: 0, y: 0 },
        inputSpacing: 5,
        selected: void 0,
        buttonPosition: { align: "left", x: 0, y: 0 },
        inputStyle: { color: "#335cad", cursor: "pointer" },
        labelStyle: { color: "#666666" },
      },
    };
  });
  J(
    a,
    "Stock/RangeSelector/RangeSelectorComposition.js",
    [
      a["Core/Defaults.js"],
      a["Stock/RangeSelector/RangeSelectorDefaults.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      function v() {
        var a = this.range,
          c = a.type,
          e = this.max,
          b = this.chart.time,
          d = function (a, d) {
            var e = "year" === c ? "FullYear" : "Month",
              g = new b.Date(a),
              f = b.get(e, g);
            b.set(e, g, f + d);
            f === b.get(e, g) && b.set("Date", g, 0);
            return g.getTime() - a;
          };
        if (G(a)) {
          var f = e - a;
          var h = a;
        } else
          a &&
            ((f = e + d(e, -(a.count || 1))),
            this.chart && (this.chart.fixedRange = e - f));
        var l = K(this.dataMin, Number.MIN_VALUE);
        G(f) || (f = l);
        f <= l &&
          ((f = l),
          "undefined" === typeof h && (h = d(f, a.count)),
          (this.newMax = Math.min(f + h, K(this.dataMax, Number.MAX_VALUE))));
        G(e) ? !G(a) && a && a._offsetMin && (f += a._offsetMin) : (f = void 0);
        return f;
      }
      function B() {
        this.options.rangeSelector &&
          this.options.rangeSelector.enabled &&
          (this.rangeSelector = new w(this));
      }
      function C() {
        var a = this.axes,
          c = this.rangeSelector;
        c &&
          (G(c.deferredYTDClick) &&
            (c.clickButton(c.deferredYTDClick), delete c.deferredYTDClick),
          a.forEach(function (a) {
            a.updateNames();
            a.setScale();
          }),
          this.getAxisMargins(),
          c.render(),
          (a = c.options.verticalAlign),
          c.options.floating ||
            ("bottom" === a
              ? (this.extraBottomMargin = !0)
              : "middle" !== a && (this.extraTopMargin = !0)));
      }
      function F(a) {
        var c,
          e,
          b,
          d,
          f = a.rangeSelector,
          h = function () {
            f &&
              ((c = a.xAxis[0].getExtremes()),
              (e = a.legend),
              (d = f && f.options.verticalAlign),
              G(c.min) && f.render(c.min, c.max),
              e.display &&
                "top" === d &&
                d === e.options.verticalAlign &&
                ((b = H(a.spacingBox)),
                (b.y =
                  "vertical" === e.options.layout
                    ? a.plotTop
                    : b.y + f.getHeight()),
                (e.group.placed = !1),
                e.align(b)));
          };
        f &&
          (D(y, function (b) {
            return b[0] === a;
          }) ||
            y.push([
              a,
              [
                l(a.xAxis[0], "afterSetExtremes", function (a) {
                  f && f.render(a.min, a.max);
                }),
                l(a, "redraw", h),
              ],
            ]),
          h());
      }
      function x() {
        for (var a = 0, c = y.length; a < c; ++a) {
          var e = y[a];
          if (e[0] === this) {
            e[1].forEach(function (a) {
              return a();
            });
            y.splice(a, 1);
            break;
          }
        }
      }
      function u() {
        var a = this.rangeSelector;
        a &&
          ((a = a.getHeight()),
          this.extraTopMargin && (this.plotTop += a),
          this.extraBottomMargin && (this.marginBottom += a));
      }
      function n() {
        var a = this.rangeSelector;
        a &&
          !a.options.floating &&
          (a.render(),
          (a = a.options.verticalAlign),
          "bottom" === a
            ? (this.extraBottomMargin = !0)
            : "middle" !== a && (this.extraTopMargin = !0));
      }
      function c(a) {
        var c = a.options.rangeSelector;
        a = this.extraBottomMargin;
        var e = this.extraTopMargin,
          b = this.rangeSelector;
        c &&
          c.enabled &&
          !p(b) &&
          this.options.rangeSelector &&
          ((this.options.rangeSelector.enabled = !0),
          (this.rangeSelector = b = new w(this)));
        this.extraTopMargin = this.extraBottomMargin = !1;
        b &&
          (F(this),
          (c =
            (c && c.verticalAlign) || (b.options && b.options.verticalAlign)),
          b.options.floating ||
            ("bottom" === c
              ? (this.extraBottomMargin = !0)
              : "middle" !== c && (this.extraTopMargin = !0)),
          this.extraBottomMargin !== a || this.extraTopMargin !== e) &&
          (this.isDirtyBox = !0);
      }
      var h = a.defaultOptions,
        m = a.setOptions,
        l = A.addEvent,
        p = A.defined,
        f = A.extend,
        D = A.find,
        G = A.isNumber,
        H = A.merge,
        K = A.pick,
        y = [],
        t = [],
        w;
      return {
        compose: function (a, g, e) {
          w = e;
          -1 === t.indexOf(a) && (t.push(a), (a.prototype.minFromRange = v));
          -1 === t.indexOf(g) &&
            (t.push(g),
            l(g, "afterGetContainer", B),
            l(g, "beforeRender", C),
            l(g, "destroy", x),
            l(g, "getMargins", u),
            l(g, "render", n),
            l(g, "update", c),
            g.prototype.callbacks.push(F));
          -1 === t.indexOf(m) &&
            (f(h, { rangeSelector: q.rangeSelector }), f(h.lang, q.lang));
        },
      };
    }
  );
  J(
    a,
    "Stock/RangeSelector/RangeSelector.js",
    [
      a["Core/Axis/Axis.js"],
      a["Core/Defaults.js"],
      a["Core/Globals.js"],
      a["Stock/RangeSelector/RangeSelectorComposition.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C) {
      function v(a) {
        if (-1 !== a.indexOf("%L")) return "text";
        var c = "aAdewbBmoyY".split("").some(function (b) {
            return -1 !== a.indexOf("%" + b);
          }),
          e = "HkIlMS".split("").some(function (b) {
            return -1 !== a.indexOf("%" + b);
          });
        return c && e ? "datetime-local" : c ? "date" : e ? "time" : "text";
      }
      var x = q.defaultOptions,
        u = C.addEvent,
        n = C.createElement,
        c = C.css,
        h = C.defined,
        m = C.destroyObjectProperties,
        l = C.discardElement,
        p = C.extend,
        f = C.fireEvent,
        D = C.isNumber,
        G = C.merge,
        H = C.objectEach,
        K = C.pad,
        y = C.pick,
        t = C.pInt,
        w = C.splat;
      q = (function () {
        function k(a) {
          this.buttons = void 0;
          this.buttonOptions = k.prototype.defaultButtons;
          this.initialButtonGroupWidth = 0;
          this.options = void 0;
          this.chart = a;
          this.init(a);
        }
        k.compose = function (a, c) {
          E.compose(a, c, k);
        };
        k.prototype.clickButton = function (c, e) {
          var b = this.chart,
            d = this.buttonOptions[c],
            g = b.xAxis[0],
            k = (b.scroller && b.scroller.getUnionExtremes()) || g || {},
            l = d.type,
            m = d.dataGrouping,
            p = k.dataMin,
            n = k.dataMax,
            t = g && Math.round(Math.min(g.max, y(n, g.max)));
          k = d._range;
          var q,
            v = !0;
          if (null !== p && null !== n) {
            b.fixedRange = k;
            this.setSelected(c);
            m &&
              ((this.forcedDataGrouping = !0),
              a.prototype.setDataGrouping.call(
                g || { chart: this.chart },
                m,
                !1
              ),
              (this.frozenStates = d.preserveDataGrouping));
            if ("month" === l || "year" === l)
              if (g) {
                l = { range: d, max: t, chart: b, dataMin: p, dataMax: n };
                var x = g.minFromRange.call(l);
                D(l.newMax) && (t = l.newMax);
                v = !1;
              } else k = d;
            else if (k)
              (x = Math.max(t - k, p)), (t = Math.min(x + k, n)), (v = !1);
            else if ("ytd" === l)
              if (g) {
                if ("undefined" === typeof n || "undefined" === typeof p)
                  (p = Number.MAX_VALUE),
                    (n = Number.MIN_VALUE),
                    b.series.forEach(function (a) {
                      if ((a = a.xData))
                        (p = Math.min(a[0], p)),
                          (n = Math.max(a[a.length - 1], n));
                    }),
                    (e = !1);
                l = this.getYTDExtremes(n, p, b.time.useUTC);
                x = q = l.min;
                t = l.max;
              } else {
                this.deferredYTDClick = c;
                return;
              }
            else
              "all" === l &&
                g &&
                (b.navigator &&
                  b.navigator.baseSeries[0] &&
                  (b.navigator.baseSeries[0].xAxis.options.range = void 0),
                (x = p),
                (t = n));
            v && d._offsetMin && h(x) && (x += d._offsetMin);
            d._offsetMax && h(t) && (t += d._offsetMax);
            this.dropdown && (this.dropdown.selectedIndex = c + 1);
            if (g)
              g.setExtremes(x, t, y(e, !0), void 0, {
                trigger: "rangeSelectorButton",
                rangeSelectorButton: d,
              });
            else {
              var A = w(b.options.xAxis)[0];
              var B = A.range;
              A.range = k;
              var C = A.min;
              A.min = q;
              u(b, "load", function () {
                A.range = B;
                A.min = C;
              });
            }
            f(this, "afterBtnClick");
          }
        };
        k.prototype.setSelected = function (a) {
          this.selected = this.options.selected = a;
        };
        k.prototype.init = function (a) {
          var c = this,
            b = a.options.rangeSelector,
            d = b.buttons || c.defaultButtons.slice(),
            g = b.selected,
            h = function () {
              var a = c.minInput,
                b = c.maxInput;
              a && a.blur && f(a, "blur");
              b && b.blur && f(b, "blur");
            };
          c.chart = a;
          c.options = b;
          c.buttons = [];
          c.buttonOptions = d;
          this.eventsToUnbind = [];
          this.eventsToUnbind.push(u(a.container, "mousedown", h));
          this.eventsToUnbind.push(u(a, "resize", h));
          d.forEach(c.computeButtonRange);
          "undefined" !== typeof g && d[g] && this.clickButton(g, !1);
          this.eventsToUnbind.push(
            u(a, "load", function () {
              a.xAxis &&
                a.xAxis[0] &&
                u(a.xAxis[0], "setExtremes", function (b) {
                  this.max - this.min !== a.fixedRange &&
                    "rangeSelectorButton" !== b.trigger &&
                    "updatedData" !== b.trigger &&
                    c.forcedDataGrouping &&
                    !c.frozenStates &&
                    this.setDataGrouping(!1, !1);
                });
            })
          );
        };
        k.prototype.updateButtonStates = function () {
          var a = this,
            c = this.chart,
            b = this.dropdown,
            d = c.xAxis[0],
            f = Math.round(d.max - d.min),
            h = !d.hasVisibleSeries,
            k = (c.scroller && c.scroller.getUnionExtremes()) || d,
            l = k.dataMin,
            m = k.dataMax;
          c = a.getYTDExtremes(m, l, c.time.useUTC);
          var p = c.min,
            n = c.max,
            t = a.selected,
            u = a.options.allButtonsEnabled,
            q = a.buttons,
            w = D(t);
          a.buttonOptions.forEach(function (c, e) {
            var g = c._range,
              k = c.type,
              r = c.count || 1,
              z = q[e],
              v = c._offsetMax - c._offsetMin,
              x = e === t,
              y = g > m - l,
              A = g < d.minRange;
            c = 0;
            var B = !1,
              D = !1;
            g = g === f;
            ("month" === k || "year" === k) &&
            f + 36e5 >= 864e5 * { month: 28, year: 365 }[k] * r - v &&
            f - 36e5 <= 864e5 * { month: 31, year: 366 }[k] * r + v
              ? (g = !0)
              : "ytd" === k
              ? ((g = n - p + v === f), (B = !x))
              : "all" === k &&
                ((g = d.max - d.min >= m - l), (D = !x && w && g));
            k = !u && (y || A || D || h);
            r = (x && g) || (g && !w && !B) || (x && a.frozenStates);
            k ? (c = 3) : r && ((w = !0), (c = 2));
            z.state !== c &&
              (z.setState(c),
              b &&
                ((b.options[e + 1].disabled = k),
                2 === c && (b.selectedIndex = e + 1)),
              0 === c && t === e && a.setSelected());
          });
        };
        k.prototype.computeButtonRange = function (a) {
          var c = a.type,
            b = a.count || 1,
            d = {
              millisecond: 1,
              second: 1e3,
              minute: 6e4,
              hour: 36e5,
              day: 864e5,
              week: 6048e5,
            };
          if (d[c]) a._range = d[c] * b;
          else if ("month" === c || "year" === c)
            a._range = 864e5 * { month: 30, year: 365 }[c] * b;
          a._offsetMin = y(a.offsetMin, 0);
          a._offsetMax = y(a.offsetMax, 0);
          a._range += a._offsetMax - a._offsetMin;
        };
        k.prototype.getInputValue = function (a) {
          a = "min" === a ? this.minInput : this.maxInput;
          var c = this.chart.options.rangeSelector,
            b = this.chart.time;
          return a
            ? (
                ("text" === a.type && c.inputDateParser) ||
                this.defaultInputDateParser
              )(a.value, b.useUTC, b)
            : 0;
        };
        k.prototype.setInputValue = function (a, c) {
          var b = this.options,
            d = this.chart.time,
            e = "min" === a ? this.minInput : this.maxInput;
          a = "min" === a ? this.minDateBox : this.maxDateBox;
          if (e) {
            var g = e.getAttribute("data-hc-time");
            g = h(g) ? Number(g) : void 0;
            h(c) &&
              (h(g) && e.setAttribute("data-hc-time-previous", g),
              e.setAttribute("data-hc-time", c),
              (g = c));
            e.value = d.dateFormat(
              this.inputTypeFormats[e.type] || b.inputEditDateFormat,
              g
            );
            a && a.attr({ text: d.dateFormat(b.inputDateFormat, g) });
          }
        };
        k.prototype.setInputExtremes = function (a, c, b) {
          if ((a = "min" === a ? this.minInput : this.maxInput)) {
            var d = this.inputTypeFormats[a.type],
              e = this.chart.time;
            d &&
              ((c = e.dateFormat(d, c)),
              a.min !== c && (a.min = c),
              (b = e.dateFormat(d, b)),
              a.max !== b && (a.max = b));
          }
        };
        k.prototype.showInput = function (a) {
          var e = "min" === a ? this.minDateBox : this.maxDateBox;
          if (
            (a = "min" === a ? this.minInput : this.maxInput) &&
            e &&
            this.inputGroup
          ) {
            var b = "text" === a.type,
              d = this.inputGroup,
              g = d.translateX;
            d = d.translateY;
            var f = this.options.inputBoxWidth;
            c(a, {
              width: b ? e.width + (f ? -2 : 20) + "px" : "auto",
              height: b ? e.height - 2 + "px" : "auto",
              border: "2px solid silver",
            });
            b && f
              ? c(a, { left: g + e.x + "px", top: d + "px" })
              : c(a, {
                  left:
                    Math.min(
                      Math.round(e.x + g - (a.offsetWidth - e.width) / 2),
                      this.chart.chartWidth - a.offsetWidth
                    ) + "px",
                  top: d - (a.offsetHeight - e.height) / 2 + "px",
                });
          }
        };
        k.prototype.hideInput = function (a) {
          (a = "min" === a ? this.minInput : this.maxInput) &&
            c(a, { top: "-9999em", border: 0, width: "1px", height: "1px" });
        };
        k.prototype.defaultInputDateParser = function (a, c, b) {
          var d = a.split("/").join("-").split(" ").join("T");
          -1 === d.indexOf("T") && (d += "T00:00");
          if (c) d += "Z";
          else {
            var e;
            if ((e = A.isSafari))
              (e = d),
                (e = !(
                  6 < e.length &&
                  (e.lastIndexOf("-") === e.length - 6 ||
                    e.lastIndexOf("+") === e.length - 6)
                ));
            e &&
              ((e = new Date(d).getTimezoneOffset() / 60),
              (d +=
                0 >= e ? "+".concat(K(-e), ":00") : "-".concat(K(e), ":00")));
          }
          d = Date.parse(d);
          D(d) ||
            ((a = a.split("-")), (d = Date.UTC(t(a[0]), t(a[1]) - 1, t(a[2]))));
          b && c && D(d) && (d += b.getTimezoneOffset(d));
          return d;
        };
        k.prototype.drawInput = function (a) {
          function e() {
            var c = f.maxInput,
              d = f.minInput,
              e = b.xAxis[0],
              g = b.scroller && b.scroller.xAxis ? b.scroller.xAxis : e,
              h = g.dataMin;
            g = g.dataMax;
            var k = f.getInputValue(a);
            k !== Number(u.getAttribute("data-hc-time-previous")) &&
              D(k) &&
              (u.setAttribute("data-hc-time-previous", k),
              m && c && D(h)
                ? k > Number(c.getAttribute("data-hc-time"))
                  ? (k = void 0)
                  : k < h && (k = h)
                : d &&
                  D(g) &&
                  (k < Number(d.getAttribute("data-hc-time"))
                    ? (k = void 0)
                    : k > g && (k = g)),
              "undefined" !== typeof k &&
                e.setExtremes(m ? k : e.min, m ? e.max : k, void 0, void 0, {
                  trigger: "rangeSelectorInput",
                }));
          }
          var b = this.chart,
            d = this.div,
            g = this.inputGroup,
            f = this,
            h = b.renderer.style || {},
            k = b.renderer,
            l = b.options.rangeSelector,
            m = "min" === a,
            t = x.lang[m ? "rangeSelectorFrom" : "rangeSelectorTo"] || "";
          t = k
            .label(t, 0)
            .addClass("highcharts-range-label")
            .attr({ padding: t ? 2 : 0, height: t ? l.inputBoxHeight : 0 })
            .add(g);
          k = k
            .label("", 0)
            .addClass("highcharts-range-input")
            .attr({
              padding: 2,
              width: l.inputBoxWidth,
              height: l.inputBoxHeight,
              "text-align": "center",
            })
            .on("click", function () {
              f.showInput(a);
              f[a + "Input"].focus();
            });
          b.styledMode ||
            k.attr({ stroke: l.inputBoxBorderColor, "stroke-width": 1 });
          k.add(g);
          var u = n(
            "input",
            { name: a, className: "highcharts-range-selector" },
            void 0,
            d
          );
          u.setAttribute("type", v(l.inputDateFormat || "%b %e, %Y"));
          b.styledMode ||
            (t.css(G(h, l.labelStyle)),
            k.css(G({ color: "#333333" }, h, l.inputStyle)),
            c(
              u,
              p(
                {
                  position: "absolute",
                  border: 0,
                  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  textAlign: "center",
                  fontSize: h.fontSize,
                  fontFamily: h.fontFamily,
                  top: "-9999em",
                },
                l.inputStyle
              )
            ));
          u.onfocus = function () {
            f.showInput(a);
          };
          u.onblur = function () {
            u === A.doc.activeElement && e();
            f.hideInput(a);
            f.setInputValue(a);
            u.blur();
          };
          var q = !1;
          u.onchange = function () {
            q || (e(), f.hideInput(a), u.blur());
          };
          u.onkeypress = function (a) {
            13 === a.keyCode && e();
          };
          u.onkeydown = function (a) {
            q = !0;
            (38 !== a.keyCode && 40 !== a.keyCode) || e();
          };
          u.onkeyup = function () {
            q = !1;
          };
          return { dateBox: k, input: u, label: t };
        };
        k.prototype.getPosition = function () {
          var a = this.chart,
            c = a.options.rangeSelector;
          a = "top" === c.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
          return {
            buttonTop: a + c.buttonPosition.y,
            inputTop: a + c.inputPosition.y - 10,
          };
        };
        k.prototype.getYTDExtremes = function (a, c, b) {
          var d = this.chart.time,
            e = new d.Date(a),
            g = d.get("FullYear", e);
          b = b ? d.Date.UTC(g, 0, 1) : +new d.Date(g, 0, 1);
          c = Math.max(c, b);
          e = e.getTime();
          return { max: Math.min(a || e, e), min: c };
        };
        k.prototype.render = function (a, c) {
          var b = this.chart,
            d = b.renderer,
            e = b.container,
            g = b.options,
            f = g.rangeSelector,
            k = y(g.chart.style && g.chart.style.zIndex, 0) + 1;
          g = f.inputEnabled;
          if (!1 !== f.enabled) {
            this.rendered ||
              ((this.group = d
                .g("range-selector-group")
                .attr({ zIndex: 7 })
                .add()),
              (this.div = n("div", void 0, {
                position: "relative",
                height: 0,
                zIndex: k,
              })),
              this.buttonOptions.length && this.renderButtons(),
              e.parentNode && e.parentNode.insertBefore(this.div, e),
              g &&
                ((this.inputGroup = d.g("input-group").add(this.group)),
                (d = this.drawInput("min")),
                (this.minDateBox = d.dateBox),
                (this.minLabel = d.label),
                (this.minInput = d.input),
                (d = this.drawInput("max")),
                (this.maxDateBox = d.dateBox),
                (this.maxLabel = d.label),
                (this.maxInput = d.input)));
            if (
              g &&
              (this.setInputValue("min", a),
              this.setInputValue("max", c),
              (a =
                (b.scroller && b.scroller.getUnionExtremes()) ||
                b.xAxis[0] ||
                {}),
              h(a.dataMin) &&
                h(a.dataMax) &&
                ((b = b.xAxis[0].minRange || 0),
                this.setInputExtremes(
                  "min",
                  a.dataMin,
                  Math.min(a.dataMax, this.getInputValue("max")) - b
                ),
                this.setInputExtremes(
                  "max",
                  Math.max(a.dataMin, this.getInputValue("min")) + b,
                  a.dataMax
                )),
              this.inputGroup)
            ) {
              var l = 0;
              [
                this.minLabel,
                this.minDateBox,
                this.maxLabel,
                this.maxDateBox,
              ].forEach(function (a) {
                if (a) {
                  var b = a.getBBox().width;
                  b && (a.attr({ x: l }), (l += b + f.inputSpacing));
                }
              });
            }
            this.alignElements();
            this.rendered = !0;
          }
        };
        k.prototype.renderButtons = function () {
          var a = this,
            c = this.buttons,
            b = this.options,
            d = x.lang,
            h = this.chart.renderer,
            k = G(b.buttonTheme),
            l = k && k.states,
            m = k.width || 28;
          delete k.width;
          delete k.states;
          this.buttonGroup = h.g("range-selector-buttons").add(this.group);
          var p = (this.dropdown = n(
            "select",
            void 0,
            {
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              border: 0,
              top: "-9999em",
              cursor: "pointer",
              opacity: 0.0001,
            },
            this.div
          ));
          u(p, "touchstart", function () {
            p.style.fontSize = "16px";
          });
          [
            [A.isMS ? "mouseover" : "mouseenter"],
            [A.isMS ? "mouseout" : "mouseleave"],
            ["change", "click"],
          ].forEach(function (b) {
            var d = b[0],
              e = b[1];
            u(p, d, function () {
              var b = c[a.currentButtonIndex()];
              b && f(b.element, e || d);
            });
          });
          this.zoomText = h
            .label((d && d.rangeSelectorZoom) || "", 0)
            .attr({
              padding: b.buttonTheme.padding,
              height: b.buttonTheme.height,
              paddingLeft: 0,
              paddingRight: 0,
            })
            .add(this.buttonGroup);
          this.chart.styledMode ||
            (this.zoomText.css(b.labelStyle),
            (k["stroke-width"] = y(k["stroke-width"], 0)));
          n(
            "option",
            { textContent: this.zoomText.textStr, disabled: !0 },
            void 0,
            p
          );
          this.buttonOptions.forEach(function (b, d) {
            n("option", { textContent: b.title || b.text }, void 0, p);
            c[d] = h
              .button(
                b.text,
                0,
                0,
                function (c) {
                  var e = b.events && b.events.click,
                    g;
                  e && (g = e.call(b, c));
                  !1 !== g && a.clickButton(d);
                  a.isActive = !0;
                },
                k,
                l && l.hover,
                l && l.select,
                l && l.disabled
              )
              .attr({ "text-align": "center", width: m })
              .add(a.buttonGroup);
            b.title && c[d].attr("title", b.title);
          });
        };
        k.prototype.alignElements = function () {
          var a = this,
            c = this.buttonGroup,
            b = this.buttons,
            d = this.chart,
            f = this.group,
            h = this.inputGroup,
            k = this.options,
            l = this.zoomText,
            m = d.options,
            p =
              m.exporting &&
              !1 !== m.exporting.enabled &&
              m.navigation &&
              m.navigation.buttonOptions;
          m = k.buttonPosition;
          var n = k.inputPosition,
            t = k.verticalAlign,
            u = function (b, c) {
              return p &&
                a.titleCollision(d) &&
                "top" === t &&
                "right" === c.align &&
                c.y - b.getBBox().height - 12 <
                  (p.y || 0) + (p.height || 0) + d.spacing[0]
                ? -40
                : 0;
            },
            q = d.plotLeft;
          if (f && m && n) {
            var w = m.x - d.spacing[3];
            if (c) {
              this.positionButtons();
              if (!this.initialButtonGroupWidth) {
                var v = 0;
                l && (v += l.getBBox().width + 5);
                b.forEach(function (a, c) {
                  v += a.width;
                  c !== b.length - 1 && (v += k.buttonSpacing);
                });
                this.initialButtonGroupWidth = v;
              }
              q -= d.spacing[3];
              this.updateButtonStates();
              l = u(c, m);
              this.alignButtonGroup(l);
              f.placed = c.placed = d.hasLoaded;
            }
            c = 0;
            h &&
              ((c = u(h, n)),
              "left" === n.align
                ? (w = q)
                : "right" === n.align && (w = -Math.max(d.axisOffset[1], -c)),
              h.align(
                {
                  y: n.y,
                  width: h.getBBox().width,
                  align: n.align,
                  x: n.x + w - 2,
                },
                !0,
                d.spacingBox
              ),
              (h.placed = d.hasLoaded));
            this.handleCollision(c);
            f.align({ verticalAlign: t }, !0, d.spacingBox);
            h = f.alignAttr.translateY;
            c = f.getBBox().height + 20;
            u = 0;
            "bottom" === t &&
              ((u =
                (u = d.legend && d.legend.options) &&
                "bottom" === u.verticalAlign &&
                u.enabled &&
                !u.floating
                  ? d.legend.legendHeight + y(u.margin, 10)
                  : 0),
              (c = c + u - 20),
              (u =
                h -
                c -
                (k.floating ? 0 : k.y) -
                (d.titleOffset ? d.titleOffset[2] : 0) -
                10));
            if ("top" === t)
              k.floating && (u = 0),
                d.titleOffset && d.titleOffset[0] && (u = d.titleOffset[0]),
                (u += d.margin[0] - d.spacing[0] || 0);
            else if ("middle" === t)
              if (n.y === m.y) u = h;
              else if (n.y || m.y)
                u = 0 > n.y || 0 > m.y ? u - Math.min(n.y, m.y) : h - c;
            f.translate(k.x, k.y + Math.floor(u));
            m = this.minInput;
            n = this.maxInput;
            h = this.dropdown;
            k.inputEnabled &&
              m &&
              n &&
              ((m.style.marginTop = f.translateY + "px"),
              (n.style.marginTop = f.translateY + "px"));
            h && (h.style.marginTop = f.translateY + "px");
          }
        };
        k.prototype.alignButtonGroup = function (a, c) {
          var b = this.chart,
            d = this.buttonGroup,
            e = this.options.buttonPosition,
            g = b.plotLeft - b.spacing[3],
            f = e.x - b.spacing[3];
          "right" === e.align
            ? (f += a - g)
            : "center" === e.align && (f -= g / 2);
          d &&
            d.align(
              {
                y: e.y,
                width: y(c, this.initialButtonGroupWidth),
                align: e.align,
                x: f,
              },
              !0,
              b.spacingBox
            );
        };
        k.prototype.positionButtons = function () {
          var a = this.buttons,
            c = this.chart,
            b = this.options,
            d = this.zoomText,
            f = c.hasLoaded ? "animate" : "attr",
            h = b.buttonPosition,
            k = (c = c.plotLeft);
          d &&
            "hidden" !== d.visibility &&
            (d[f]({ x: y(c + h.x, c) }), (k += h.x + d.getBBox().width + 5));
          d = 0;
          for (h = this.buttonOptions.length; d < h; ++d)
            if ("hidden" !== a[d].visibility)
              a[d][f]({ x: k }), (k += a[d].width + b.buttonSpacing);
            else a[d][f]({ x: c });
        };
        k.prototype.handleCollision = function (a) {
          var c = this,
            b = this.chart,
            d = this.buttonGroup,
            g = this.inputGroup,
            f = this.options,
            h = f.buttonPosition,
            k = f.dropdown,
            l = f.inputPosition;
          f = function () {
            var a = 0;
            c.buttons.forEach(function (b) {
              b = b.getBBox();
              b.width > a && (a = b.width);
            });
            return a;
          };
          var m = function (b) {
              if (g && d) {
                var c =
                    g.alignAttr.translateX +
                    g.alignOptions.x -
                    a +
                    g.getBBox().x +
                    2,
                  e = g.alignOptions.width,
                  f = d.alignAttr.translateX + d.getBBox().x;
                return f + b > c && c + e > f && h.y < l.y + g.getBBox().height;
              }
              return !1;
            },
            p = function () {
              g &&
                d &&
                g.attr({
                  translateX:
                    g.alignAttr.translateX + (b.axisOffset[1] >= -a ? 0 : -a),
                  translateY: g.alignAttr.translateY + d.getBBox().height + 10,
                });
            };
          if (d) {
            if ("always" === k) {
              this.collapseButtons(a);
              m(f()) && p();
              return;
            }
            "never" === k && this.expandButtons();
          }
          g && d
            ? l.align === h.align || m(this.initialButtonGroupWidth + 20)
              ? "responsive" === k
                ? (this.collapseButtons(a), m(f()) && p())
                : p()
              : "responsive" === k && this.expandButtons()
            : d &&
              "responsive" === k &&
              (this.initialButtonGroupWidth > b.plotWidth
                ? this.collapseButtons(a)
                : this.expandButtons());
        };
        k.prototype.collapseButtons = function (a) {
          var c = this.buttons,
            b = this.buttonOptions,
            d = this.chart,
            g = this.dropdown,
            f = this.options,
            h = this.zoomText,
            k =
              (d.userOptions.rangeSelector &&
                d.userOptions.rangeSelector.buttonTheme) ||
              {},
            l = function (a) {
              return {
                text: a ? "" + a + " \u25be" : "\u25be",
                width: "auto",
                paddingLeft: y(f.buttonTheme.paddingLeft, k.padding, 8),
                paddingRight: y(f.buttonTheme.paddingRight, k.padding, 8),
              };
            };
          h && h.hide();
          var m = !1;
          b.forEach(function (a, b) {
            b = c[b];
            2 !== b.state ? b.hide() : (b.show(), b.attr(l(a.text)), (m = !0));
          });
          m ||
            (g && (g.selectedIndex = 0),
            c[0].show(),
            c[0].attr(l(this.zoomText && this.zoomText.textStr)));
          b = f.buttonPosition.align;
          this.positionButtons();
          ("right" !== b && "center" !== b) ||
            this.alignButtonGroup(
              a,
              c[this.currentButtonIndex()].getBBox().width
            );
          this.showDropdown();
        };
        k.prototype.expandButtons = function () {
          var a = this.buttons,
            c = this.buttonOptions,
            b = this.options,
            d = this.zoomText;
          this.hideDropdown();
          d && d.show();
          c.forEach(function (c, d) {
            d = a[d];
            d.show();
            d.attr({
              text: c.text,
              width: b.buttonTheme.width || 28,
              paddingLeft: y(b.buttonTheme.paddingLeft, "unset"),
              paddingRight: y(b.buttonTheme.paddingRight, "unset"),
            });
            2 > d.state && d.setState(0);
          });
          this.positionButtons();
        };
        k.prototype.currentButtonIndex = function () {
          var a = this.dropdown;
          return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0;
        };
        k.prototype.showDropdown = function () {
          var a = this.buttonGroup,
            e = this.buttons,
            b = this.chart,
            d = this.dropdown;
          if (a && d) {
            var f = a.translateX;
            a = a.translateY;
            e = e[this.currentButtonIndex()].getBBox();
            c(d, {
              left: b.plotLeft + f + "px",
              top: a + 0.5 + "px",
              width: e.width + "px",
              height: e.height + "px",
            });
            this.hasVisibleDropdown = !0;
          }
        };
        k.prototype.hideDropdown = function () {
          var a = this.dropdown;
          a &&
            (c(a, { top: "-9999em", width: "1px", height: "1px" }),
            (this.hasVisibleDropdown = !1));
        };
        k.prototype.getHeight = function () {
          var a = this.options,
            c = this.group,
            b = a.y,
            d = a.buttonPosition.y,
            f = a.inputPosition.y;
          if (a.height) return a.height;
          this.alignElements();
          a = c ? c.getBBox(!0).height + 13 + b : 0;
          c = Math.min(f, d);
          if ((0 > f && 0 > d) || (0 < f && 0 < d)) a += Math.abs(c);
          return a;
        };
        k.prototype.titleCollision = function (a) {
          return !(a.options.title.text || a.options.subtitle.text);
        };
        k.prototype.update = function (a) {
          var c = this.chart;
          G(!0, c.options.rangeSelector, a);
          this.destroy();
          this.init(c);
          this.render();
        };
        k.prototype.destroy = function () {
          var a = this,
            c = a.minInput,
            b = a.maxInput;
          a.eventsToUnbind &&
            (a.eventsToUnbind.forEach(function (a) {
              return a();
            }),
            (a.eventsToUnbind = void 0));
          m(a.buttons);
          c && (c.onfocus = c.onblur = c.onchange = null);
          b && (b.onfocus = b.onblur = b.onchange = null);
          H(
            a,
            function (b, c) {
              b &&
                "chart" !== c &&
                (b instanceof B
                  ? b.destroy()
                  : b instanceof X.HTMLElement && l(b));
              b !== k.prototype[c] && (a[c] = null);
            },
            this
          );
        };
        return k;
      })();
      p(q.prototype, {
        defaultButtons: [
          { type: "month", count: 1, text: "1m", title: "View 1 month" },
          { type: "month", count: 3, text: "3m", title: "View 3 months" },
          { type: "month", count: 6, text: "6m", title: "View 6 months" },
          { type: "ytd", text: "YTD", title: "View year to date" },
          { type: "year", count: 1, text: "1y", title: "View 1 year" },
          { type: "all", text: "All", title: "View all" },
        ],
        inputTypeFormats: {
          "datetime-local": "%Y-%m-%dT%H:%M:%S",
          date: "%Y-%m-%d",
          time: "%H:%M:%S",
        },
      });
      ("");
      return q;
    }
  );
  J(
    a,
    "Core/Axis/OrdinalAxis.js",
    [
      a["Core/Axis/Axis.js"],
      a["Core/Globals.js"],
      a["Core/Series/Series.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E) {
      var v = E.addEvent,
        C = E.correctFloat,
        F = E.css,
        x = E.defined,
        u = E.error,
        n = E.pick,
        c = E.timeUnits,
        h = [],
        m;
      (function (a) {
        function l(a, d, e, g, f, h, k) {
          void 0 === f && (f = []);
          void 0 === h && (h = 0);
          var b = {},
            l = this.options.tickPixelInterval,
            m = this.chart.time,
            p = [],
            r,
            n,
            t = 0,
            q = [],
            w = -Number.MAX_VALUE;
          if (
            (!this.options.ordinal && !this.options.breaks) ||
            !f ||
            3 > f.length ||
            "undefined" === typeof d
          )
            return m.getTimeTicks.apply(m, arguments);
          var z = f.length;
          for (r = 0; r < z; r++) {
            var v = r && f[r - 1] > e;
            f[r] < d && (t = r);
            if (r === z - 1 || f[r + 1] - f[r] > 5 * h || v) {
              if (f[r] > w) {
                for (
                  n = m.getTimeTicks(a, f[t], f[r], g);
                  n.length && n[0] <= w;

                )
                  n.shift();
                n.length && (w = n[n.length - 1]);
                p.push(q.length);
                q = q.concat(n);
              }
              t = r + 1;
            }
            if (v) break;
          }
          if (n) {
            n = n.info;
            if (k && n.unitRange <= c.hour) {
              r = q.length - 1;
              for (t = 1; t < r; t++)
                if (m.dateFormat("%d", q[t]) !== m.dateFormat("%d", q[t - 1])) {
                  b[q[t]] = "day";
                  var y = !0;
                }
              y && (b[q[0]] = "day");
              n.higherRanks = b;
            }
            n.segmentStarts = p;
            q.info = n;
          } else u(12, !1, this.chart);
          if (k && x(l)) {
            n = q.length;
            m = [];
            t = [];
            r = void 0;
            for (y = n; y--; )
              (p = this.translate(q[y])), r && (t[y] = r - p), (m[y] = r = p);
            t.sort();
            t = t[Math.floor(t.length / 2)];
            t < 0.6 * l && (t = null);
            y = q[n - 1] > e ? n - 1 : n;
            for (r = void 0; y--; )
              (p = m[y]),
                (n = Math.abs(r - p)),
                r && n < 0.8 * l && (null === t || n < 0.8 * t)
                  ? (b[q[y]] && !b[q[y + 1]] ? ((n = y + 1), (r = p)) : (n = y),
                    q.splice(n, 1))
                  : (r = p);
          }
          return q;
        }
        function f(a) {
          var b = this.ordinal.positions;
          if (!b) return a;
          var c = b.length - 1;
          if (0 > a) a = b[0];
          else if (a > c) a = b[c];
          else {
            c = Math.floor(a);
            var e = a - c;
          }
          return "undefined" !== typeof e && "undefined" !== typeof b[c]
            ? b[c] + (e ? e * (b[c + 1] - b[c]) : 0)
            : a;
        }
        function m(a) {
          var b = this.ordinal,
            c = b.positions;
          if (!c) return a;
          var e =
            (a - (this.old ? this.old.min : this.min)) *
              (this.old ? this.old.transA : this.transA) +
            this.minPixelPadding;
          (0 < e && e < this.left + this.len) ||
            (b.extendedOrdinalPositions ||
              (b.extendedOrdinalPositions = b.getExtendedPositions()),
            (c = b.extendedOrdinalPositions));
          if (c && c.length) {
            a = b.getIndexOfPoint(e, c);
            b = C(a % 1);
            if (0 <= a && a < c.length - 1)
              return (
                c[Math.floor(a)] + b * (c[Math.ceil(a)] - c[Math.floor(a)])
              );
            b = c.length;
            e = c[0];
            c = c[b - 1];
            var g = (c - e) / (b - 1);
            return 0 > a ? e + g * a : c + g * (a - b);
          }
          return a;
        }
        function B(b, c) {
          var d = a.Additions.findIndexOf(b, c, !0);
          return b[d] === c ? d : d + (c - b[d]) / (b[d + 1] - b[d]);
        }
        function E() {
          this.ordinal || (this.ordinal = new a.Additions(this));
        }
        function K() {
          this.isXAxis &&
            x(this.options.overscroll) &&
            this.max === this.dataMax &&
            (!this.chart.mouseIsDown || this.isInternal) &&
            (!this.eventArgs ||
              (this.eventArgs && "navigator" !== this.eventArgs.trigger)) &&
            ((this.max += this.options.overscroll),
            !this.isInternal &&
              x(this.userMin) &&
              (this.min += this.options.overscroll));
        }
        function y() {
          this.horiz &&
            !this.isDirty &&
            (this.isDirty =
              this.isOrdinal &&
              this.chart.navigator &&
              !this.chart.navigator.adaptToUpdatedData);
        }
        function t() {
          this.ordinal &&
            (this.ordinal.beforeSetTickPositions(),
            (this.tickInterval = this.ordinal.postProcessTickInterval(
              this.tickInterval
            )));
        }
        function w(a) {
          var b = this.xAxis[0],
            c = b.options.overscroll,
            e = a.originalEvent.chartX,
            g = this.options.chart.panning,
            f = !1;
          if (g && "y" !== g.type && b.options.ordinal && b.series.length) {
            var h = this.mouseDownX,
              k = b.getExtremes(),
              l = k.dataMax,
              m = k.min,
              p = k.max,
              n = this.hoverPoints,
              t =
                b.closestPointRange ||
                (b.ordinal && b.ordinal.overscrollPointsRange);
            h = (h - e) / (b.translationSlope * (b.ordinal.slope || t));
            t = b.ordinal.getExtendedPositions();
            t = { ordinal: { positions: t, extendedOrdinalPositions: t } };
            var u = b.index2val,
              q = b.val2lin,
              w = void 0,
              v = (w = void 0),
              y = void 0;
            t.ordinal.positions
              ? 1 < Math.abs(h) &&
                (n &&
                  n.forEach(function (a) {
                    a.setState();
                  }),
                0 > h
                  ? ((v = t), (y = b.ordinal.positions ? b : t))
                  : ((v = b.ordinal.positions ? b : t), (y = t)),
                (w = y.ordinal.positions),
                l > w[w.length - 1] && w.push(l),
                (this.fixedRange = p - m),
                (w = b.navigatorAxis.toFixedRange(
                  void 0,
                  void 0,
                  u.apply(v, [q.apply(v, [m, !0]) + h]),
                  u.apply(y, [q.apply(y, [p, !0]) + h])
                )),
                w.min >= Math.min(k.dataMin, m) &&
                  w.max <= Math.max(l, p) + c &&
                  b.setExtremes(w.min, w.max, !0, !1, { trigger: "pan" }),
                (this.mouseDownX = e),
                F(this.container, { cursor: "move" }))
              : (f = !0);
          } else f = !0;
          f || (g && /y/.test(g.type))
            ? c && (b.max = b.dataMax + c)
            : a.preventDefault();
        }
        function k() {
          var a = this.xAxis;
          a &&
            a.options.ordinal &&
            (delete a.ordinal.index, delete a.ordinal.extendedOrdinalPositions);
        }
        function g(a, c) {
          var b = this.ordinal,
            d = b.positions,
            e = b.slope,
            g = b.extendedOrdinalPositions;
          if (!d) return a;
          var f = d.length;
          if (d[0] <= a && d[f - 1] >= a) a = B(d, a);
          else {
            g ||
              ((g = b.getExtendedPositions && b.getExtendedPositions()),
              (b.extendedOrdinalPositions = g));
            if (!g || !g.length) return a;
            f = g.length;
            e || (e = (g[f - 1] - g[0]) / f);
            d = B(g, d[0]);
            a >= g[0] && a <= g[f - 1]
              ? (a = B(g, a) - d)
              : a < g[0]
              ? ((a = g[0] - a), (a = -d - a / e))
              : ((a -= g[f - 1]), (a = a / e + f - d));
          }
          return c ? a : e * (a || 0) + b.offset;
        }
        a.compose = function (a, c, e) {
          if (-1 === h.indexOf(a)) {
            h.push(a);
            var b = a.prototype;
            b.getTimeTicks = l;
            b.index2val = f;
            b.lin2val = m;
            b.val2lin = g;
            b.ordinal2lin = b.val2lin;
            v(a, "afterInit", E);
            v(a, "foundExtremes", K);
            v(a, "afterSetScale", y);
            v(a, "initialAxisTranslation", t);
          }
          -1 === h.indexOf(e) && (h.push(e), v(e, "pan", w));
          -1 === h.indexOf(c) && (h.push(c), v(c, "updatedData", k));
          return a;
        };
        var e = (function () {
          function a(a) {
            this.index = {};
            this.axis = a;
          }
          a.prototype.beforeSetTickPositions = function () {
            var a = this.axis,
              b = a.ordinal,
              c = a.getExtremes(),
              e = c.min,
              g = c.max,
              f = a.isXAxis && !!a.options.breaks;
            c = a.options.ordinal;
            var h = a.chart.options.chart.ignoreHiddenSeries,
              k,
              l,
              m = [],
              p = Number.MAX_VALUE,
              t = !1,
              u = !1,
              q = !1;
            if (c || f) {
              var w = 0;
              a.series.forEach(function (a, b) {
                k = [];
                0 < b &&
                  "highcharts-navigator-series" !== a.options.id &&
                  1 < a.processedXData.length &&
                  (u = w !== a.processedXData[1] - a.processedXData[0]);
                w = a.processedXData[1] - a.processedXData[0];
                a.boosted && (q = a.boosted);
                if (
                  !(
                    (h && !1 === a.visible) ||
                    (!1 === a.takeOrdinalPosition && !f)
                  ) &&
                  ((m = m.concat(a.processedXData)),
                  (v = m.length),
                  m.sort(function (a, b) {
                    return a - b;
                  }),
                  (p = Math.min(p, n(a.closestPointRange, p))),
                  v)
                ) {
                  for (b = 0; b < v - 1; )
                    m[b] !== m[b + 1] && k.push(m[b + 1]), b++;
                  k[0] !== m[0] && k.unshift(m[0]);
                  m = k;
                }
              });
              u && q && (m.pop(), m.shift());
              var v = m.length;
              if (2 < v) {
                var y = m[1] - m[0];
                for (l = v - 1; l-- && !t; ) m[l + 1] - m[l] !== y && (t = !0);
                !a.options.keepOrdinalPadding &&
                  (m[0] - e > y || g - m[m.length - 1] > y) &&
                  (t = !0);
              } else
                a.options.overscroll &&
                  (2 === v
                    ? (p = m[1] - m[0])
                    : 1 === v
                    ? ((p = a.options.overscroll), (m = [m[0], m[0] + p]))
                    : (p = b.overscrollPointsRange));
              t || a.forceOrdinal
                ? (a.options.overscroll &&
                    ((b.overscrollPointsRange = p),
                    (m = m.concat(b.getOverscrollPositions()))),
                  (b.positions = m),
                  (y = a.ordinal2lin(Math.max(e, m[0]), !0)),
                  (l = Math.max(
                    a.ordinal2lin(Math.min(g, m[m.length - 1]), !0),
                    1
                  )),
                  (b.slope = g = (g - e) / (l - y)),
                  (b.offset = e - y * g))
                : ((b.overscrollPointsRange = n(
                    a.closestPointRange,
                    b.overscrollPointsRange
                  )),
                  (b.positions = a.ordinal.slope = b.offset = void 0));
            }
            a.isOrdinal = c && t;
            b.groupIntervalFactor = null;
          };
          a.findIndexOf = function (a, b, c) {
            for (var d = 0, e = a.length - 1, g; d < e; )
              (g = Math.ceil((d + e) / 2)), a[g] <= b ? (d = g) : (e = g - 1);
            return a[d] === b ? d : c ? d : -1;
          };
          a.prototype.getExtendedPositions = function () {
            var a = this,
              b = a.axis,
              c = b.constructor.prototype,
              e = b.chart,
              g = b.series[0].currentDataGrouping,
              f = g ? g.count + g.unitName : "raw",
              h = b.options.overscroll,
              k = b.getExtremes(),
              l = void 0,
              m = a.index;
            m || (m = a.index = {});
            if (!m[f]) {
              var p = {
                series: [],
                chart: e,
                forceOrdinal: !1,
                getExtremes: function () {
                  return { min: k.dataMin, max: k.dataMax + h };
                },
                getGroupPixelWidth: c.getGroupPixelWidth,
                getTimeTicks: c.getTimeTicks,
                options: { ordinal: !0 },
                ordinal: {
                  getGroupIntervalFactor: this.getGroupIntervalFactor,
                },
                ordinal2lin: c.ordinal2lin,
                getIndexOfPoint: c.getIndexOfPoint,
                val2lin: c.val2lin,
              };
              p.ordinal.axis = p;
              b.series.forEach(function (b) {
                l = {
                  xAxis: p,
                  xData: b.xData.slice(),
                  chart: e,
                  destroyGroupedData: q.noop,
                  getProcessedData: A.prototype.getProcessedData,
                  applyGrouping: A.prototype.applyGrouping,
                };
                l.xData = l.xData.concat(a.getOverscrollPositions());
                l.options = {
                  dataGrouping: g
                    ? {
                        firstAnchor: "firstPoint",
                        anchor: "middle",
                        lastAnchor: "lastPoint",
                        enabled: !0,
                        forced: !0,
                        approximation: "open",
                        units: [[g.unitName, [g.count]]],
                      }
                    : { enabled: !1 },
                };
                p.series.push(l);
                b.processData.apply(l);
              });
              l.closestPointRange !== l.basePointRange &&
                l.currentDataGrouping &&
                (p.forceOrdinal = !0);
              b.ordinal.beforeSetTickPositions.apply({ axis: p });
              m[f] = p.ordinal.positions;
            }
            return m[f];
          };
          a.prototype.getGroupIntervalFactor = function (a, b, c) {
            c = c.processedXData;
            var d = c.length,
              e = [];
            var g = this.groupIntervalFactor;
            if (!g) {
              for (g = 0; g < d - 1; g++) e[g] = c[g + 1] - c[g];
              e.sort(function (a, b) {
                return a - b;
              });
              e = e[Math.floor(d / 2)];
              a = Math.max(a, c[0]);
              b = Math.min(b, c[d - 1]);
              this.groupIntervalFactor = g = (d * e) / (b - a);
            }
            return g;
          };
          a.prototype.getIndexOfPoint = function (b, c) {
            var d = this.axis,
              e = this.positions ? this.positions[0] : 0,
              g =
                (d.series[0].points &&
                  d.series[0].points[0] &&
                  d.series[0].points[0].plotX) ||
                d.minPixelPadding;
            1 < d.series.length &&
              d.series.forEach(function (a) {
                a.points &&
                  x(a.points[0]) &&
                  x(a.points[0].plotX) &&
                  a.points[0].plotX < g &&
                  a.points[0].plotX >= n(d.min, -Infinity) &&
                  (g = a.points[0].plotX);
              });
            b =
              (b - g) /
              (d.translationSlope *
                (this.slope ||
                  d.closestPointRange ||
                  this.overscrollPointsRange));
            return a.findIndexOf(c, e) + b;
          };
          a.prototype.getOverscrollPositions = function () {
            var a = this.axis,
              b = a.options.overscroll,
              c = this.overscrollPointsRange,
              e = [],
              g = a.dataMax;
            if (x(c)) for (; g <= a.dataMax + b; ) (g += c), e.push(g);
            return e;
          };
          a.prototype.postProcessTickInterval = function (a) {
            var b = this.axis,
              c = this.slope;
            return c
              ? b.options.breaks
                ? b.closestPointRange || a
                : a / (c / b.closestPointRange)
              : a;
          };
          return a;
        })();
        a.Additions = e;
      })(m || (m = {}));
      return m;
    }
  );
  J(
    a,
    "Series/HLC/HLCPoint.js",
    [a["Core/Series/SeriesRegistry.js"]],
    function (a) {
      var q =
        (this && this.__extends) ||
        (function () {
          var a = function (q, v) {
            a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (a, q) {
                  a.__proto__ = q;
                }) ||
              function (a, q) {
                for (var v in q) q.hasOwnProperty(v) && (a[v] = q[v]);
              };
            return a(q, v);
          };
          return function (q, v) {
            function A() {
              this.constructor = q;
            }
            a(q, v);
            q.prototype =
              null === v
                ? Object.create(v)
                : ((A.prototype = v.prototype), new A());
          };
        })();
      return (function (a) {
        function v() {
          var q = (null !== a && a.apply(this, arguments)) || this;
          q.close = void 0;
          q.high = void 0;
          q.low = void 0;
          q.options = void 0;
          q.plotClose = void 0;
          q.series = void 0;
          return q;
        }
        q(v, a);
        return v;
      })(a.seriesTypes.column.prototype.pointClass);
    }
  );
  J(a, "Series/HLC/HLCSeriesDefaults.js", [], function () {
    "";
    return {
      lineWidth: 1,
      tooltip: {
        pointFormat:
          '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>',
      },
      threshold: null,
      states: { hover: { lineWidth: 3 } },
      stickyTracking: !0,
    };
  });
  J(
    a,
    "Series/HLC/HLCSeries.js",
    [
      a["Series/HLC/HLCPoint.js"],
      a["Series/HLC/HLCSeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (n, c) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var h in c) c.hasOwnProperty(h) && (a[h] = c[h]);
                };
              return a(n, c);
            };
            return function (n, c) {
              function h() {
                this.constructor = n;
              }
              a(n, c);
              n.prototype =
                null === c
                  ? Object.create(c)
                  : ((h.prototype = c.prototype), new h());
            };
          })(),
        C = A.seriesTypes.column,
        F = E.extend,
        x = E.merge;
      E = (function (a) {
        function n() {
          var c = (null !== a && a.apply(this, arguments)) || this;
          c.data = void 0;
          c.options = void 0;
          c.points = void 0;
          c.yData = void 0;
          return c;
        }
        v(n, a);
        n.prototype.extendStem = function (a, h, m) {
          var c = a[0];
          a = a[1];
          "number" === typeof c[2] && (c[2] = Math.max(m + h, c[2]));
          "number" === typeof a[2] && (a[2] = Math.min(m - h, a[2]));
        };
        n.prototype.getPointPath = function (a, h) {
          h = h.strokeWidth();
          var c = a.series,
            l = (h % 2) / 2,
            p = Math.round(a.plotX) - l,
            f = Math.round(a.shapeArgs.width / 2),
            n = [
              ["M", p, Math.round(a.yBottom)],
              ["L", p, Math.round(a.plotHigh)],
            ];
          null !== a.close &&
            ((a = Math.round(a.plotClose) + l),
            n.push(["M", p, a], ["L", p + f, a]),
            c.extendStem(n, h / 2, a));
          return n;
        };
        n.prototype.drawSinglePoint = function (a) {
          var c = a.series,
            m = c.chart,
            l = a.graphic;
          "undefined" !== typeof a.plotY &&
            (l || (a.graphic = l = m.renderer.path().add(c.group)),
            m.styledMode || l.attr(c.pointAttribs(a, a.selected && "select")),
            (c = c.getPointPath(a, l)),
            l[l ? "animate" : "attr"]({ d: c }).addClass(a.getClassName(), !0));
        };
        n.prototype.drawPoints = function () {
          this.points.forEach(this.drawSinglePoint);
        };
        n.prototype.init = function () {
          a.prototype.init.apply(this, arguments);
          this.options.stacking = void 0;
        };
        n.prototype.pointAttribs = function (c, h) {
          c = a.prototype.pointAttribs.call(this, c, h);
          delete c.fill;
          return c;
        };
        n.prototype.toYData = function (a) {
          return [a.high, a.low, a.close];
        };
        n.prototype.translate = function () {
          var c = this,
            h = c.yAxis,
            m = (this.pointArrayMap && this.pointArrayMap.slice()) || [],
            l = m.map(function (a) {
              return "plot".concat(a.charAt(0).toUpperCase() + a.slice(1));
            });
          l.push("yBottom");
          m.push("low");
          a.prototype.translate.apply(c);
          c.points.forEach(function (a) {
            m.forEach(function (f, m) {
              f = a[f];
              null !== f &&
                (c.dataModify && (f = c.dataModify.modifyValue(f)),
                (a[l[m]] = h.toPixels(f, !0)));
            });
            a.tooltipPos[1] = a.plotHigh + h.pos - c.chart.plotTop;
          });
        };
        n.defaultOptions = x(C.defaultOptions, q);
        return n;
      })(C);
      F(E.prototype, {
        pointClass: a,
        animate: null,
        directTouch: !1,
        pointArrayMap: ["high", "low", "close"],
        pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" },
        pointValKey: "close",
      });
      A.registerSeriesType("hlc", E);
      return E;
    }
  );
  J(
    a,
    "Series/OHLC/OHLCPoint.js",
    [a["Core/Series/SeriesRegistry.js"]],
    function (a) {
      var q =
        (this && this.__extends) ||
        (function () {
          var a = function (q, v) {
            a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (a, q) {
                  a.__proto__ = q;
                }) ||
              function (a, q) {
                for (var v in q) q.hasOwnProperty(v) && (a[v] = q[v]);
              };
            return a(q, v);
          };
          return function (q, v) {
            function A() {
              this.constructor = q;
            }
            a(q, v);
            q.prototype =
              null === v
                ? Object.create(v)
                : ((A.prototype = v.prototype), new A());
          };
        })();
      return (function (a) {
        function v() {
          var q = (null !== a && a.apply(this, arguments)) || this;
          q.open = void 0;
          q.options = void 0;
          q.plotOpen = void 0;
          q.series = void 0;
          return q;
        }
        q(v, a);
        v.prototype.getClassName = function () {
          return (
            a.prototype.getClassName.call(this) +
            (this.open < this.close
              ? " highcharts-point-up"
              : " highcharts-point-down")
          );
        };
        v.prototype.resolveUpColor = function () {
          this.open < this.close &&
            !this.options.color &&
            this.series.options.upColor &&
            (this.color = this.series.options.upColor);
        };
        v.prototype.resolveColor = function () {
          a.prototype.resolveColor.call(this);
          this.resolveUpColor();
        };
        v.prototype.getZone = function () {
          var q = a.prototype.getZone.call(this);
          this.resolveUpColor();
          return q;
        };
        v.prototype.applyOptions = function () {
          a.prototype.applyOptions.apply(this, arguments);
          this.resolveColor && this.resolveColor();
          return this;
        };
        return v;
      })(a.seriesTypes.hlc.prototype.pointClass);
    }
  );
  J(a, "Series/OHLC/OHLCSeriesDefaults.js", [], function () {
    "";
    return {
      tooltip: {
        pointFormat:
          '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>',
      },
    };
  });
  J(
    a,
    "Series/OHLC/OHLCSeries.js",
    [
      a["Series/OHLC/OHLCPoint.js"],
      a["Series/OHLC/OHLCSeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E) {
      function v(a) {
        a = a.options;
        var c = a.dataGrouping;
        c &&
          a.useOhlcData &&
          "highcharts-navigator-series" !== a.id &&
          (c.approximation = "ohlc");
      }
      function C(a) {
        a = a.options;
        a.useOhlcData &&
          "highcharts-navigator-series" !== a.id &&
          n(this, {
            pointValKey: m.prototype.pointValKey,
            pointArrayMap: m.prototype.pointArrayMap,
            toYData: m.prototype.toYData,
          });
      }
      var F =
          (this && this.__extends) ||
          (function () {
            var a = function (c, f) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f]);
                };
              return a(c, f);
            };
            return function (c, f) {
              function h() {
                this.constructor = c;
              }
              a(c, f);
              c.prototype =
                null === f
                  ? Object.create(f)
                  : ((h.prototype = f.prototype), new h());
            };
          })(),
        x = A.seriesTypes.hlc,
        u = E.addEvent,
        n = E.extend,
        c = E.merge,
        h = [],
        m = (function (a) {
          function l() {
            var c = (null !== a && a.apply(this, arguments)) || this;
            c.data = void 0;
            c.options = void 0;
            c.points = void 0;
            return c;
          }
          F(l, a);
          l.compose = function (a) {
            for (var c = 1; c < arguments.length; c++);
            -1 === h.indexOf(a) &&
              (h.push(a), u(a, "afterSetOptions", v), u(a, "init", C));
          };
          l.prototype.getPointPath = function (c, h) {
            var f = a.prototype.getPointPath.call(this, c, h);
            h = h.strokeWidth();
            var l = (h % 2) / 2,
              m = Math.round(c.plotX) - l,
              p = Math.round(c.shapeArgs.width / 2);
            null !== c.open &&
              ((c = Math.round(c.plotOpen) + l),
              f.push(["M", m, c], ["L", m - p, c]),
              a.prototype.extendStem.call(this, f, h / 2, c));
            return f;
          };
          l.prototype.pointAttribs = function (c, h) {
            h = a.prototype.pointAttribs.call(this, c, h);
            var f = this.options;
            delete h.fill;
            !c.options.color &&
              f.upColor &&
              c.open < c.close &&
              (h.stroke = f.upColor);
            return h;
          };
          l.prototype.toYData = function (a) {
            return [a.open, a.high, a.low, a.close];
          };
          l.defaultOptions = c(x.defaultOptions, q);
          return l;
        })(x);
      n(m.prototype, {
        pointClass: a,
        pointArrayMap: ["open", "high", "low", "close"],
      });
      A.registerSeriesType("ohlc", m);
      return m;
    }
  );
  J(
    a,
    "Series/Candlestick/CandlestickSeriesDefaults.js",
    [a["Core/Defaults.js"], a["Core/Utilities.js"]],
    function (a, q) {
      "";
      return {
        states: { hover: { lineWidth: 2 } },
        threshold: null,
        lineColor: "#000000",
        lineWidth: 1,
        upColor: "#ffffff",
        stickyTracking: !0,
      };
    }
  );
  J(
    a,
    "Series/Candlestick/CandlestickSeries.js",
    [
      a["Series/Candlestick/CandlestickSeriesDefaults.js"],
      a["Core/Defaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (c, h) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var h in c) c.hasOwnProperty(h) && (a[h] = c[h]);
                };
              return a(c, h);
            };
            return function (c, h) {
              function m() {
                this.constructor = c;
              }
              a(c, h);
              c.prototype =
                null === h
                  ? Object.create(h)
                  : ((m.prototype = h.prototype), new m());
            };
          })(),
        C = q.defaultOptions;
      q = A.seriesTypes;
      var F = q.column,
        x = q.ohlc,
        u = E.merge;
      E = (function (n) {
        function c() {
          var a = (null !== n && n.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        v(c, n);
        c.prototype.pointAttribs = function (a, c) {
          var h = F.prototype.pointAttribs.call(this, a, c),
            m = this.options,
            f = a.open < a.close,
            n = m.lineColor || this.color,
            q = a.color || this.color;
          h["stroke-width"] = m.lineWidth;
          h.fill = a.options.color || (f ? m.upColor || q : q);
          h.stroke = a.options.lineColor || (f ? m.upLineColor || n : n);
          c &&
            ((a = m.states[c]),
            (h.fill = a.color || h.fill),
            (h.stroke = a.lineColor || h.stroke),
            (h["stroke-width"] = a.lineWidth || h["stroke-width"]));
          return h;
        };
        c.prototype.drawPoints = function () {
          for (
            var a = this.chart, c = this.yAxis.reversed, l = 0, p = this.points;
            l < p.length;
            l++
          ) {
            var f = p[l],
              n = f.graphic,
              q = !n;
            if ("undefined" !== typeof f.plotY) {
              n || (f.graphic = n = a.renderer.path().add(this.group));
              this.chart.styledMode ||
                n
                  .attr(this.pointAttribs(f, f.selected && "select"))
                  .shadow(this.options.shadow);
              var u = (n.strokeWidth() % 2) / 2;
              var v = Math.round(f.plotX) - u;
              var y = f.plotOpen;
              var t = f.plotClose;
              var w = Math.min(y, t);
              y = Math.max(y, t);
              var k = Math.round(f.shapeArgs.width / 2);
              t = c
                ? y !== f.yBottom
                : Math.round(w) !== Math.round(f.plotHigh);
              var g = c
                ? Math.round(w) !== Math.round(f.plotHigh)
                : y !== f.yBottom;
              w = Math.round(w) + u;
              y = Math.round(y) + u;
              u = [];
              u.push(
                ["M", v - k, y],
                ["L", v - k, w],
                ["L", v + k, w],
                ["L", v + k, y],
                ["Z"],
                ["M", v, w],
                ["L", v, t ? Math.round(c ? f.yBottom : f.plotHigh) : w],
                ["M", v, y],
                ["L", v, g ? Math.round(c ? f.plotHigh : f.yBottom) : y]
              );
              n[q ? "attr" : "animate"]({ d: u }).addClass(
                f.getClassName(),
                !0
              );
            }
          }
        };
        c.defaultOptions = u(
          x.defaultOptions,
          C.plotOptions,
          { tooltip: x.defaultOptions.tooltip },
          a
        );
        return c;
      })(x);
      A.registerSeriesType("candlestick", E);
      return E;
    }
  );
  J(
    a,
    "Series/Flags/FlagsPoint.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, q) {
      var v =
          (this && this.__extends) ||
          (function () {
            var a = function (q, v) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, q) {
                    a.__proto__ = q;
                  }) ||
                function (a, q) {
                  for (var n in q) q.hasOwnProperty(n) && (a[n] = q[n]);
                };
              return a(q, v);
            };
            return function (q, v) {
              function x() {
                this.constructor = q;
              }
              a(q, v);
              q.prototype =
                null === v
                  ? Object.create(v)
                  : ((x.prototype = v.prototype), new x());
            };
          })(),
        E = q.isNumber;
      return (function (a) {
        function q() {
          var q = (null !== a && a.apply(this, arguments)) || this;
          q.options = void 0;
          q.series = void 0;
          q.ttBelow = !1;
          return q;
        }
        v(q, a);
        q.prototype.isValid = function () {
          return E(this.y) || "undefined" === typeof this.y;
        };
        q.prototype.hasNewShapeType = function () {
          var a = this.options.shape || this.series.options.shape;
          return this.graphic && a && a !== this.graphic.symbolKey;
        };
        return q;
      })(a.seriesTypes.column.prototype.pointClass);
    }
  );
  J(a, "Series/Flags/FlagsSeriesDefaults.js", [], function () {
    "";
    return {
      pointRange: 0,
      allowOverlapX: !1,
      shape: "flag",
      stackDistance: 12,
      textAlign: "center",
      tooltip: { pointFormat: "{point.text}" },
      threshold: null,
      y: -30,
      fillColor: "#ffffff",
      lineWidth: 1,
      states: { hover: { lineColor: "#000000", fillColor: "#ccd6eb" } },
      style: { fontSize: "11px", fontWeight: "bold" },
    };
  });
  J(
    a,
    "Series/Flags/FlagsSymbols.js",
    [a["Core/Renderer/RendererRegistry.js"]],
    function (a) {
      var q;
      (function (q) {
        function v(a, q, u, n, c) {
          var h = (c && c.anchorX) || a;
          c = (c && c.anchorY) || q;
          var m = this.circle(h - 1, c - 1, 2, 2);
          m.push(
            ["M", h, c],
            ["L", a, q + n],
            ["L", a, q],
            ["L", a + u, q],
            ["L", a + u, q + n],
            ["L", a, q + n],
            ["Z"]
          );
          return m;
        }
        function A(a, q) {
          a[q + "pin"] = function (u, n, c, h, m) {
            var l = m && m.anchorX;
            m = m && m.anchorY;
            "circle" === q &&
              h > c &&
              ((u -= Math.round((h - c) / 2)), (c = h));
            var p = a[q](u, n, c, h);
            if (l && m) {
              var f = l;
              "circle" === q
                ? (f = u + c / 2)
                : ((u = p[0]),
                  (c = p[1]),
                  "M" === u[0] && "L" === c[0] && (f = (u[1] + c[1]) / 2));
              p.push(["M", f, n > m ? n : n + h], ["L", l, m]);
              p = p.concat(a.circle(l - 1, m - 1, 2, 2));
            }
            return p;
          };
        }
        var C = [];
        q.compose = function (q) {
          if (-1 === C.indexOf(q)) {
            C.push(q);
            var x = q.prototype.symbols;
            x.flag = v;
            A(x, "circle");
            A(x, "square");
          }
          var u = a.getRendererType();
          C.indexOf(u) &&
            (C.push(u),
            (x = q.prototype.symbols),
            (q = u.prototype.symbols),
            (q.circlepin = x.circlepin),
            (q.flag = x.flag.bind(x)),
            (q.squarepin = x.squarepin));
        };
      })(q || (q = {}));
      return q;
    }
  );
  J(
    a,
    "Series/OnSeriesComposition.js",
    [
      a["Series/Column/ColumnSeries.js"],
      a["Core/Series/Series.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A) {
      var v = a.prototype,
        B = q.prototype,
        C = A.defined,
        F = A.stableSort,
        x;
      (function (a) {
        function n(a) {
          return B.getPlotBox.call(
            (this.options.onSeries && this.chart.get(this.options.onSeries)) ||
              this,
            a
          );
        }
        function c() {
          v.translate.apply(this);
          var a = this,
            c = a.options,
            h = a.chart,
            f = a.points,
            n = c.onSeries,
            q = (n = n && h.get(n)) && n.options.step,
            u = n && n.points,
            x = h.inverted,
            y = a.xAxis,
            t = a.yAxis;
          h = f.length - 1;
          var w;
          c = c.onKey || "y";
          var k = u && u.length,
            g = 0,
            e;
          if (n && n.visible && k) {
            g = (n.pointXOffset || 0) + (n.barW || 0) / 2;
            var b = n.currentDataGrouping;
            var d = u[k - 1].x + (b ? b.totalRange : 0);
            F(f, function (a, b) {
              return a.x - b.x;
            });
            for (c = "plot" + c[0].toUpperCase() + c.substr(1); k-- && f[h]; ) {
              var r = u[k];
              b = f[h];
              b.y = r.y;
              if (r.x <= b.x && "undefined" !== typeof r[c]) {
                if (
                  b.x <= d &&
                  ((b.plotY = r[c]),
                  r.x < b.x &&
                    !q &&
                    (e = u[k + 1]) &&
                    "undefined" !== typeof e[c])
                ) {
                  var z = (b.x - r.x) / (e.x - r.x);
                  b.plotY += z * (e[c] - r[c]);
                  b.y += z * (e.y - r.y);
                }
                h--;
                k++;
                if (0 > h) break;
              }
            }
          }
          f.forEach(function (b, c) {
            b.plotX += g;
            if ("undefined" === typeof b.plotY || x)
              0 <= b.plotX && b.plotX <= y.len
                ? x
                  ? ((b.plotY = y.translate(b.x, 0, 1, 0, 1)),
                    (b.plotX = C(b.y) ? t.translate(b.y, 0, 0, 0, 1) : 0))
                  : (b.plotY = (y.opposite ? 0 : a.yAxis.len) + y.offset)
                : (b.shapeArgs = {});
            if ((w = f[c - 1]) && w.plotX === b.plotX) {
              "undefined" === typeof w.stackIndex && (w.stackIndex = 0);
              var d = w.stackIndex + 1;
            }
            b.stackIndex = d;
          });
          this.onSeries = n;
        }
        var h = [];
        a.compose = function (a) {
          if (-1 === h.indexOf(a)) {
            h.push(a);
            var l = a.prototype;
            l.getPlotBox = n;
            l.translate = c;
          }
          return a;
        };
        a.getPlotBox = n;
        a.translate = c;
      })(x || (x = {}));
      return x;
    }
  );
  J(
    a,
    "Series/Flags/FlagsSeries.js",
    [
      a["Series/Flags/FlagsPoint.js"],
      a["Series/Flags/FlagsSeriesDefaults.js"],
      a["Series/Flags/FlagsSymbols.js"],
      a["Core/Globals.js"],
      a["Series/OnSeriesComposition.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C, F, x, u) {
      var n =
        (this && this.__extends) ||
        (function () {
          var a = function (c, f) {
            a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (a, c) {
                  a.__proto__ = c;
                }) ||
              function (a, c) {
                for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f]);
              };
            return a(c, f);
          };
          return function (c, f) {
            function h() {
              this.constructor = c;
            }
            a(c, f);
            c.prototype =
              null === f
                ? Object.create(f)
                : ((h.prototype = f.prototype), new h());
          };
        })();
      E = E.noop;
      var c = C.distribute,
        h = F.series,
        m = F.seriesTypes.column,
        l = u.addEvent,
        p = u.defined;
      C = u.extend;
      var f = u.merge,
        v = u.objectEach,
        G = u.wrap;
      u = (function (a) {
        function u() {
          var c = (null !== a && a.apply(this, arguments)) || this;
          c.data = void 0;
          c.options = void 0;
          c.points = void 0;
          return c;
        }
        n(u, a);
        u.prototype.animate = function (a) {
          a && this.setClip();
        };
        u.prototype.drawPoints = function () {
          var a = this.points,
            h = this.chart,
            l = h.renderer,
            k = h.inverted,
            g = this.options,
            e = g.y,
            b = this.yAxis,
            d = {},
            m = [],
            n;
          for (n = a.length; n--; ) {
            var q = a[n];
            var u = (k ? q.plotY : q.plotX) > this.xAxis.len;
            var A = q.plotX;
            var B = q.stackIndex;
            var C = q.options.shape || g.shape;
            var D = q.plotY;
            "undefined" !== typeof D &&
              (D =
                q.plotY +
                e -
                ("undefined" !== typeof B && B * g.stackDistance));
            q.anchorX = B ? void 0 : q.plotX;
            var E = B ? void 0 : q.plotY;
            var F = "flag" !== C;
            B = q.graphic;
            "undefined" !== typeof D && 0 <= A && !u
              ? (B && q.hasNewShapeType() && (B = B.destroy()),
                B ||
                  ((B = q.graphic =
                    l
                      .label("", null, null, C, null, null, g.useHTML)
                      .addClass("highcharts-point")
                      .add(this.markerGroup)),
                  q.graphic.div && (q.graphic.div.point = q),
                  (B.isNew = !0)),
                B.attr({
                  align: F ? "center" : "left",
                  width: g.width,
                  height: g.height,
                  "text-align": g.textAlign,
                }),
                h.styledMode ||
                  B.attr(this.pointAttribs(q))
                    .css(f(g.style, q.style))
                    .shadow(g.shadow),
                0 < A && (A -= B.strokeWidth() % 2),
                (C = { y: D, anchorY: E }),
                g.allowOverlapX && ((C.x = A), (C.anchorX = q.anchorX)),
                B.attr({ text: q.options.title || g.title || "A" })[
                  B.isNew ? "attr" : "animate"
                ](C),
                g.allowOverlapX ||
                  (d[q.plotX]
                    ? (d[q.plotX].size = Math.max(d[q.plotX].size, B.width))
                    : (d[q.plotX] = {
                        align: F ? 0.5 : 0,
                        size: B.width,
                        target: A,
                        anchorX: A,
                      })),
                (q.tooltipPos = [A, D + b.pos - h.plotTop]))
              : B && (q.graphic = B.destroy());
          }
          if (!g.allowOverlapX) {
            var H = 100;
            v(d, function (a) {
              a.plotX = a.anchorX;
              m.push(a);
              H = Math.max(a.size, H);
            });
            c(m, k ? b.len : this.xAxis.len, H);
            for (h = 0; h < a.length; h++)
              (l = a[h]),
                (e = l.plotX),
                (e = (k = l.graphic) && d[e]) &&
                  k &&
                  (p(e.pos)
                    ? (k[k.isNew ? "attr" : "animate"]({
                        x: e.pos + (e.align || 0) * e.size,
                        anchorX: l.anchorX,
                      }).show().isNew = !1)
                    : (k.hide().isNew = !0));
          }
          g.useHTML &&
            this.markerGroup &&
            G(this.markerGroup, "on", function (a) {
              return x.prototype.on.apply(
                a.apply(this, [].slice.call(arguments, 1)),
                [].slice.call(arguments, 1)
              );
            });
        };
        u.prototype.drawTracker = function () {
          var c = this.points;
          a.prototype.drawTracker.call(this);
          for (
            var f = function (a) {
                var g = a.graphic;
                g &&
                  (a.unbindMouseOver && a.unbindMouseOver(),
                  (a.unbindMouseOver = l(g.element, "mouseover", function () {
                    0 < a.stackIndex &&
                      !a.raised &&
                      ((a._y = g.y), g.attr({ y: a._y - 8 }), (a.raised = !0));
                    for (var e = 0; e < c.length; e++) {
                      var b = c[e];
                      b !== a &&
                        b.raised &&
                        b.graphic &&
                        (b.graphic.attr({ y: b._y }), (b.raised = !1));
                    }
                  })));
              },
              h = 0;
            h < c.length;
            h++
          )
            f(c[h]);
        };
        u.prototype.pointAttribs = function (a, c) {
          var f = this.options,
            h = (a && a.color) || this.color,
            g = f.lineColor,
            e = a && a.lineWidth;
          a = (a && a.fillColor) || f.fillColor;
          c &&
            ((a = f.states[c].fillColor),
            (g = f.states[c].lineColor),
            (e = f.states[c].lineWidth));
          return {
            fill: a || h,
            stroke: g || h,
            "stroke-width": e || f.lineWidth || 0,
          };
        };
        u.prototype.setClip = function () {
          h.prototype.setClip.apply(this, arguments);
          !1 !== this.options.clip &&
            this.sharedClipKey &&
            this.markerGroup &&
            this.markerGroup.clip(this.chart.sharedClips[this.sharedClipKey]);
        };
        u.compose = A.compose;
        u.defaultOptions = f(m.defaultOptions, q);
        return u;
      })(m);
      B.compose(u);
      C(u.prototype, {
        allowDG: !1,
        forceCrop: !0,
        invertible: !1,
        noSharedTooltip: !0,
        pointClass: a,
        sorted: !1,
        takeOrdinalPosition: !1,
        trackerGroups: ["markerGroup"],
        buildKDTree: E,
        init: h.prototype.init,
      });
      F.registerSeriesType("flags", u);
      ("");
      return u;
    }
  );
  J(
    a,
    "Core/Chart/StockChart.js",
    [
      a["Core/Axis/Axis.js"],
      a["Core/Chart/Chart.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Defaults.js"],
      a["Stock/Navigator/NavigatorDefaults.js"],
      a["Stock/RangeSelector/RangeSelectorDefaults.js"],
      a["Stock/Scrollbar/ScrollbarDefaults.js"],
      a["Core/Series/Series.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, q, A, E, B, C, F, x, u, n) {
      function c(a, c) {
        return "xAxis" === a
          ? {
              minPadding: 0,
              maxPadding: 0,
              overscroll: 0,
              ordinal: !0,
              title: { text: null },
              labels: { overflow: "justify" },
              showLastLabel: !0,
            }
          : "yAxis" === a
          ? {
              labels: { y: -2 },
              opposite: w(c.opposite, !0),
              showLastLabel: !(!c.categories && "category" !== c.type),
              title: { text: null },
            }
          : {};
      }
      function h(a, c) {
        return "xAxis" === a
          ? ((a = { type: "datetime", categories: void 0 }),
            w(c.navigator && c.navigator.enabled, B.enabled, !0) &&
              ((a.startOnTick = !1), (a.endOnTick = !1)),
            a)
          : {};
      }
      var m =
          (this && this.__extends) ||
          (function () {
            var a = function (c, b) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                };
              return a(c, b);
            };
            return function (c, b) {
              function d() {
                this.constructor = c;
              }
              a(c, b);
              c.prototype =
                null === b
                  ? Object.create(b)
                  : ((d.prototype = b.prototype), new d());
            };
          })(),
        l = A.format,
        p = E.getOptions;
      A = n.addEvent;
      var f = n.clamp,
        v = n.defined,
        G = n.extend,
        H = n.find,
        J = n.isNumber,
        y = n.isString,
        t = n.merge,
        w = n.pick,
        k = n.splat;
      n = (function (a) {
        function e() {
          return (null !== a && a.apply(this, arguments)) || this;
        }
        m(e, a);
        e.prototype.init = function (b, d) {
          var e = p(),
            g = b.xAxis,
            f = b.yAxis,
            l = w(b.navigator && b.navigator.enabled, B.enabled, !0);
          b.xAxis = b.yAxis = void 0;
          l = t(
            {
              chart: {
                panning: { enabled: !0, type: "x" },
                zooming: { pinchType: "x" },
              },
              navigator: { enabled: l },
              scrollbar: { enabled: w(F.enabled, !0) },
              rangeSelector: { enabled: w(C.rangeSelector.enabled, !0) },
              title: { text: null },
              tooltip: { split: w(e.tooltip.split, !0), crosshairs: !0 },
              legend: { enabled: !1 },
            },
            b,
            { isStock: !0 }
          );
          b.xAxis = g;
          b.yAxis = f;
          l.xAxis = k(b.xAxis || {}).map(function (a, d) {
            return t(
              c("xAxis", a),
              e.xAxis,
              e.xAxis && e.xAxis[d],
              a,
              h("xAxis", b)
            );
          });
          l.yAxis = k(b.yAxis || {}).map(function (a, b) {
            return t(c("yAxis", a), e.yAxis, e.yAxis && e.yAxis[b], a);
          });
          a.prototype.init.call(this, l, d);
        };
        e.prototype.createAxis = function (b, d) {
          d.axis = t(c(b, d.axis), d.axis, h(b, this.userOptions));
          return a.prototype.createAxis.call(this, b, d);
        };
        return e;
      })(q);
      (function (a) {
        a.stockChart = function (c, b, d) {
          return new a(c, b, d);
        };
      })(n || (n = {}));
      A(x, "setOptions", function (a) {
        var c;
        this.chart.options.isStock &&
          (this.is("column") || this.is("columnrange")
            ? (c = { borderWidth: 0, shadow: !1 })
            : this.is("scatter") ||
              this.is("sma") ||
              (c = { marker: { enabled: !1, radius: 2 } }),
          c && (a.plotOptions[this.type] = t(a.plotOptions[this.type], c)));
      });
      A(a, "autoLabelAlign", function (a) {
        var c = this.chart,
          b = this.options;
        c = c._labelPanes = c._labelPanes || {};
        var d = this.options.labels;
        this.chart.options.isStock &&
          "yAxis" === this.coll &&
          ((b = b.top + "," + b.height),
          !c[b] &&
            d.enabled &&
            (15 === d.x && (d.x = 0),
            "undefined" === typeof d.align && (d.align = "right"),
            (c[b] = this),
            (a.align = "right"),
            a.preventDefault()));
      });
      A(a, "destroy", function () {
        var a = this.chart,
          c = this.options && this.options.top + "," + this.options.height;
        c &&
          a._labelPanes &&
          a._labelPanes[c] === this &&
          delete a._labelPanes[c];
      });
      A(a, "getPlotLinePath", function (a) {
        function c(a) {
          var c = "xAxis" === a ? "yAxis" : "xAxis";
          a = b.options[c];
          return J(a)
            ? [g[c][a]]
            : y(a)
            ? [g.get(a)]
            : d.map(function (a) {
                return a[c];
              });
        }
        var b = this,
          d =
            this.isLinked && !this.series
              ? this.linkedParent.series
              : this.series,
          g = b.chart,
          h = g.renderer,
          k = b.left,
          l = b.top,
          m,
          n,
          p,
          q,
          t = [],
          u = [],
          x = a.translatedValue,
          A = a.value,
          B = a.force;
        if (
          (g.options.isStock && !1 !== a.acrossPanes && "xAxis" === b.coll) ||
          "yAxis" === b.coll
        ) {
          a.preventDefault();
          u = c(b.coll);
          var C = b.isXAxis ? g.yAxis : g.xAxis;
          C.forEach(function (a) {
            if (
              v(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1
            ) {
              var c = a.isXAxis ? "yAxis" : "xAxis";
              c = v(a.options[c]) ? g[c][a.options[c]] : g[c][0];
              b === c && u.push(a);
            }
          });
          var D = u.length ? [] : [b.isXAxis ? g.yAxis[0] : g.xAxis[0]];
          u.forEach(function (a) {
            -1 !== D.indexOf(a) ||
              H(D, function (b) {
                return b.pos === a.pos && b.len === a.len;
              }) ||
              D.push(a);
          });
          var E = w(x, b.translate(A, void 0, void 0, a.old));
          J(E) &&
            (b.horiz
              ? D.forEach(function (a) {
                  var c;
                  n = a.pos;
                  q = n + a.len;
                  m = p = Math.round(E + b.transB);
                  "pass" !== B &&
                    (m < k || m > k + b.width) &&
                    (B ? (m = p = f(m, k, k + b.width)) : (c = !0));
                  c || t.push(["M", m, n], ["L", p, q]);
                })
              : D.forEach(function (a) {
                  var c;
                  m = a.pos;
                  p = m + a.len;
                  n = q = Math.round(l + b.height - E);
                  "pass" !== B &&
                    (n < l || n > l + b.height) &&
                    (B ? (n = q = f(n, l, l + b.height)) : (c = !0));
                  c || t.push(["M", m, n], ["L", p, q]);
                }));
          a.path = 0 < t.length ? h.crispPolyLine(t, a.lineWidth || 1) : null;
        }
      });
      u.prototype.crispPolyLine = function (a, c) {
        for (var b = 0; b < a.length; b += 2) {
          var d = a[b],
            e = a[b + 1];
          d[1] === e[1] && (d[1] = e[1] = Math.round(d[1]) - (c % 2) / 2);
          d[2] === e[2] && (d[2] = e[2] = Math.round(d[2]) + (c % 2) / 2);
        }
        return a;
      };
      A(a, "afterHideCrosshair", function () {
        this.crossLabel && (this.crossLabel = this.crossLabel.hide());
      });
      A(a, "afterDrawCrosshair", function (a) {
        var c, b;
        if (
          this.crosshair &&
          this.crosshair.label &&
          this.crosshair.label.enabled &&
          this.cross &&
          J(this.min) &&
          J(this.max)
        ) {
          var d = this.chart,
            f = this.logarithmic,
            g = this.crosshair.label,
            h = this.horiz,
            k = this.opposite,
            m = this.left,
            n = this.top,
            p = this.crossLabel,
            q = g.format,
            t = "",
            u = "inside" === this.options.tickPosition,
            v = !1 !== this.crosshair.snap,
            y = 0,
            x = a.e || (this.cross && this.cross.e);
          a = a.point;
          var A = this.min,
            B = this.max;
          f && ((A = f.lin2log(A)), (B = f.lin2log(B)));
          f = h
            ? "center"
            : k
            ? "right" === this.labelAlign
              ? "right"
              : "left"
            : "left" === this.labelAlign
            ? "left"
            : "center";
          p ||
            ((p = this.crossLabel =
              d.renderer
                .label("", 0, void 0, g.shape || "callout")
                .addClass(
                  "highcharts-crosshair-label highcharts-color-" +
                    (a && a.series
                      ? a.series.colorIndex
                      : this.series[0] && this.series[0].colorIndex)
                )
                .attr({
                  align: g.align || f,
                  padding: w(g.padding, 8),
                  r: w(g.borderRadius, 3),
                  zIndex: 2,
                })
                .add(this.labelGroup)),
            d.styledMode ||
              p
                .attr({
                  fill:
                    g.backgroundColor ||
                    (a && a.series && a.series.color) ||
                    "#666666",
                  stroke: g.borderColor || "",
                  "stroke-width": g.borderWidth || 0,
                })
                .css(
                  G(
                    {
                      color: "#ffffff",
                      fontWeight: "normal",
                      fontSize: "11px",
                      textAlign: "center",
                    },
                    g.style || {}
                  )
                ));
          h
            ? ((f = v ? (a.plotX || 0) + m : x.chartX),
              (n += k ? 0 : this.height))
            : ((f = k ? this.width + m : 0),
              (n = v ? (a.plotY || 0) + n : x.chartY));
          q ||
            g.formatter ||
            (this.dateTime && (t = "%b %d, %Y"),
            (q = "{value" + (t ? ":" + t : "") + "}"));
          t = v
            ? this.isXAxis
              ? a.x
              : a.y
            : this.toValue(h ? x.chartX : x.chartY);
          v =
            a && a.series ? a.series.isPointInside(a) : J(t) && t > A && t < B;
          x = "";
          q
            ? (x = l(q, { value: t }, d))
            : g.formatter && J(t) && (x = g.formatter.call(this, t));
          p.attr({ text: x, x: f, y: n, visibility: v ? "inherit" : "hidden" });
          g = p.getBBox();
          if (J(p.y))
            if (h) {
              if ((u && !k) || (!u && k)) n = p.y - g.height;
            } else n = p.y - g.height / 2;
          h
            ? ((c = m - g.x), (b = m + this.width - g.x))
            : ((c = "left" === this.labelAlign ? m : 0),
              (b =
                "right" === this.labelAlign ? m + this.width : d.chartWidth));
          p.translateX < c && (y = c - p.translateX);
          p.translateX + g.width >= b && (y = -(p.translateX + g.width - b));
          p.attr({
            x: f + y,
            y: n,
            anchorX: h ? f : this.opposite ? 0 : d.chartWidth,
            anchorY: h ? (this.opposite ? d.chartHeight : 0) : n + g.height / 2,
          });
        }
      });
      x.prototype.forceCropping = function () {
        var a = this.chart,
          c = this.options.dataGrouping;
        return !1 !== this.allowDG && c && w(c.enabled, a.options.isStock);
      };
      A(q, "update", function (a) {
        a = a.options;
        "scrollbar" in a &&
          this.navigator &&
          (t(!0, this.options.scrollbar, a.scrollbar),
          this.navigator.update({}),
          delete a.scrollbar);
      });
      return n;
    }
  );
  J(
    a,
    "masters/modules/stock.src.js",
    [
      a["Core/Globals.js"],
      a["Series/DataModifyComposition.js"],
      a["Stock/Navigator/Navigator.js"],
      a["Stock/RangeSelector/RangeSelector.js"],
      a["Stock/Scrollbar/Scrollbar.js"],
      a["Core/Axis/OrdinalAxis.js"],
      a["Series/OHLC/OHLCSeries.js"],
      a["Series/Flags/FlagsSeries.js"],
      a["Core/Chart/StockChart.js"],
    ],
    function (a, q, A, E, B, C, F, x, u) {
      a.Navigator = A;
      a.RangeSelector = E;
      a.Scrollbar = B;
      a.StockChart = a.stockChart = u.stockChart;
      q.compose(a.Series, a.Axis, a.Point);
      x.compose(a.Renderer);
      A.compose(a.Axis, a.Chart, a.Series);
      F.compose(a.Series);
      C.compose(a.Axis, a.Series, a.Chart);
      E.compose(a.Axis, a.Chart);
      B.compose(a.Axis);
    }
  );
  J(
    a,
    "masters/highstock.src.js",
    [a["masters/highcharts.src.js"]],
    function (a) {
      a.product = "Highstock";
      return a;
    }
  );
  a["masters/highstock.src.js"]._modules = a;
  return a["masters/highstock.src.js"];
});
//# sourceMappingURL=highstock.js.map
