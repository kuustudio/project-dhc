/*!
 * jQuery JavaScript Library v2.0.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-04-18
 */
 (function(window, undefined) {
    function isArraylike(a) {
        var b = a.length,
        c = jQuery.type(a);
        return jQuery.isWindow(a) ? !1: a.nodeType === 1 && b ? !0: c === "array" || c !== "function" && (b === 0 || typeof b == "number" && b > 0 && b - 1 in a)
    }
    function createOptions(a) {
        var b = optionsCache[a] = {};
        return jQuery.each(a.match(core_rnotwhite) || [], 
        function(a, c) {
            b[c] = !0
        }),
        b
    }
    function Data() {
        Object.defineProperty(this.cache = {},
        0, {
            get: function() {
                return {}
            }
        }),
        this.expando = jQuery.expando + Math.random()
    }
    function dataAttr(a, b, c) {
        var d;
        if (c === undefined && a.nodeType === 1) {
            d = "data-" + b.replace(rmultiDash, "-$1").toLowerCase(),
            c = a.getAttribute(d);
            if (typeof c == "string") {
                try {
                    c = c === "true" ? !0: c === "false" ? !1: c === "null" ? null: +c + "" === c ? +c: rbrace.test(c) ? JSON.parse(c) : c
                } catch(e) {}
                data_user.set(a, b, c)
            } else c = undefined
        }
        return c
    }
    function returnTrue() {
        return ! 0
    }
    function returnFalse() {
        return ! 1
    }
    function safeActiveElement() {
        try {
            return document.activeElement
        } catch(a) {}
    }
    function sibling(a, b) {
        while ((a = a[b]) && a.nodeType !== 1);
        return a
    }
    function winnow(a, b, c) {
        if (jQuery.isFunction(b)) return jQuery.grep(a, 
        function(a, d) {
            return !! b.call(a, d, a) !== c
        });
        if (b.nodeType) return jQuery.grep(a, 
        function(a) {
            return a === b !== c
        });
        if (typeof b == "string") {
            if (isSimple.test(b)) return jQuery.filter(b, a, c);
            b = jQuery.filter(b, a)
        }
        return jQuery.grep(a, 
        function(a) {
            return core_indexOf.call(b, a) >= 0 !== c
        })
    }
    function manipulationTarget(a, b) {
        return jQuery.nodeName(a, "table") && jQuery.nodeName(b.nodeType === 1 ? b: b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }
    function disableScript(a) {
        return a.type = (a.getAttribute("type") !== null) + "/" + a.type,
        a
    }
    function restoreScript(a) {
        var b = rscriptTypeMasked.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"),
        a
    }
    function setGlobalEval(a, b) {
        var c = a.length,
        d = 0;
        for (; d < c; d++) data_priv.set(a[d], "globalEval", !b || data_priv.get(b[d], "globalEval"))
    }
    function cloneCopyEvent(a, b) {
        var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j;
        if (b.nodeType !== 1) return;
        if (data_priv.hasData(a)) {
            f = data_priv.access(a),
            g = jQuery.extend({},
            f),
            j = f.events,
            data_priv.set(b, g);
            if (j) {
                delete g.handle,
                g.events = {};
                for (e in j) for (c = 0, d = j[e].length; c < d; c++) jQuery.event.add(b, e, j[e][c])
            }
        }
        data_user.hasData(a) && (h = data_user.access(a), i = jQuery.extend({},
        h), data_user.set(b, i))
    }
    function getAll(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return b === undefined || b && jQuery.nodeName(a, b) ? jQuery.merge([a], c) : c
    }
    function fixInput(a, b) {
        var c = b.nodeName.toLowerCase();
        if (c === "input" && manipulation_rcheckableType.test(a.type)) b.checked = a.checked;
        else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
    }
    function vendorPropName(a, b) {
        if (b in a) return b;
        var c = b.charAt(0).toUpperCase() + b.slice(1),
        d = b,
        e = cssPrefixes.length;
        while (e--) {
            b = cssPrefixes[e] + c;
            if (b in a) return b
        }
        return d
    }
    function isHidden(a, b) {
        return a = b || a,
        jQuery.css(a, "display") === "none" || !jQuery.contains(a.ownerDocument, a)
    }
    function getStyles(a) {
        return window.getComputedStyle(a, null)
    }
    function showHide(a, b) {
        var c,
        d,
        e,
        f = [],
        g = 0,
        h = a.length;
        for (; g < h; g++) {
            d = a[g];
            if (!d.style) continue;
            f[g] = data_priv.get(d, "olddisplay"),
            c = d.style.display,
            b ? (!f[g] && c === "none" && (d.style.display = ""), d.style.display === "" && isHidden(d) && (f[g] = data_priv.access(d, "olddisplay", css_defaultDisplay(d.nodeName)))) : f[g] || (e = isHidden(d), (c && c !== "none" || !e) && data_priv.set(d, "olddisplay", e ? c: jQuery.css(d, "display")))
        }
        for (g = 0; g < h; g++) {
            d = a[g];
            if (!d.style) continue;
            if (!b || d.style.display === "none" || d.style.display === "") d.style.display = b ? f[g] || "": "none"
        }
        return a
    }
    function setPositiveNumber(a, b, c) {
        var d = rnumsplit.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }
    function augmentWidthOrHeight(a, b, c, d, e) {
        var f = c === (d ? "border": "content") ? 4: b === "width" ? 1: 0,
        g = 0;
        for (; f < 4; f += 2) c === "margin" && (g += jQuery.css(a, c + cssExpand[f], !0, e)),
        d ? (c === "content" && (g -= jQuery.css(a, "padding" + cssExpand[f], !0, e)), c !== "margin" && (g -= jQuery.css(a, "border" + cssExpand[f] + "Width", !0, e))) : (g += jQuery.css(a, "padding" + cssExpand[f], !0, e), c !== "padding" && (g += jQuery.css(a, "border" + cssExpand[f] + "Width", !0, e)));
        return g
    }
    function getWidthOrHeight(a, b, c) {
        var d = !0,
        e = b === "width" ? a.offsetWidth: a.offsetHeight,
        f = getStyles(a),
        g = jQuery.support.boxSizing && jQuery.css(a, "boxSizing", !1, f) === "border-box";
        if (e <= 0 || e == null) {
            e = curCSS(a, b, f);
            if (e < 0 || e == null) e = a.style[b];
            if (rnumnonpx.test(e)) return e;
            d = g && (jQuery.support.boxSizingReliable || e === a.style[b]),
            e = parseFloat(e) || 0
        }
        return e + augmentWidthOrHeight(a, b, c || (g ? "border": "content"), d, f) + "px"
    }
    function css_defaultDisplay(a) {
        var b = document,
        c = elemdisplay[a];
        if (!c) {
            c = actualDisplay(a, b);
            if (c === "none" || !c) iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement),
            b = (iframe[0].contentWindow || iframe[0].contentDocument).document,
            b.write("<!doctype html><html><body>"),
            b.close(),
            c = actualDisplay(a, b),
            iframe.detach();
            elemdisplay[a] = c
        }
        return c
    }
    function actualDisplay(a, b) {
        var c = jQuery(b.createElement(a)).appendTo(b.body),
        d = jQuery.css(c[0], "display");
        return c.remove(),
        d
    }
    function buildParams(a, b, c, d) {
        var e;
        if (jQuery.isArray(b)) jQuery.each(b, 
        function(b, e) {
            c || rbracket.test(a) ? d(a, e) : buildParams(a + "[" + (typeof e == "object" ? b: "") + "]", e, c, d)
        });
        else if (!c && jQuery.type(b) === "object") for (e in b) buildParams(a + "[" + e + "]", b[e], c, d);
        else d(a, b)
    }
    function addToPrefiltersOrTransports(a) {
        return function(b, c) {
            typeof b != "string" && (c = b, b = "*");
            var d,
            e = 0,
            f = b.toLowerCase().match(core_rnotwhite) || [];
            if (jQuery.isFunction(c)) while (d = f[e++]) d[0] === "+" ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }
    function inspectPrefiltersOrTransports(a, b, c, d) {
        function g(h) {
            var i;
            return e[h] = !0,
            jQuery.each(a[h] || [], 
            function(a, h) {
                var j = h(b, c, d);
                if (typeof j == "string" && !f && !e[j]) return b.dataTypes.unshift(j),
                g(j),
                !1;
                if (f) return ! (i = j)
            }),
            i
        }
        var e = {},
        f = a === transports;
        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }
    function ajaxExtend(a, b) {
        var c,
        d,
        e = jQuery.ajaxSettings.flatOptions || {};
        for (c in b) b[c] !== undefined && ((e[c] ? a: d || (d = {}))[c] = b[c]);
        return d && jQuery.extend(!0, a, d),
        a
    }
    function ajaxHandleResponses(a, b, c) {
        var d,
        e,
        f,
        g,
        h = a.contents,
        i = a.dataTypes;
        while (i[0] === "*") i.shift(),
        d === undefined && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d) for (e in h) if (h[e] && h[e].test(d)) {
            i.unshift(e);
            break
        }
        if (i[0] in c) f = i[0];
        else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        if (f) return f !== i[0] && i.unshift(f),
        c[f]
    }
    function ajaxConvert(a, b, c, d) {
        var e,
        f,
        g,
        h,
        i,
        j = {},
        k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f) {
            a.responseFields[f] && (c[a.responseFields[f]] = b),
            !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
            i = f,
            f = k.shift();
            if (f) if (f === "*") f = i;
            else if (i !== "*" && i !== f) {
                g = j[i + " " + f] || j["* " + f];
                if (!g) for (e in j) {
                    h = e.split(" ");
                    if (h[1] === f) {
                        g = j[i + " " + h[0]] || j["* " + h[0]];
                        if (g) {
                            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                            break
                        }
                    }
                }
                if (g !== !0) if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch(l) {
                    return {
                        state: "parsererror",
                        error: g ? l: "No conversion from " + i + " to " + f
                    }
                }
            }
        }
        return {
            state: "success",
            data: b
        }
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = undefined
        }),
        fxNow = jQuery.now()
    }
    function createTweens(a, b) {
        jQuery.each(b, 
        function(b, c) {
            var d = (tweeners[b] || []).concat(tweeners["*"]),
            e = 0,
            f = d.length;
            for (; e < f; e++) if (d[e].call(a, b, c)) return
        })
    }
    function Animation(a, b, c) {
        var d,
        e,
        f = 0,
        g = animationPrefilters.length,
        h = jQuery.Deferred().always(function() {
            delete i.elem
        }),
        i = function() {
            if (e) return ! 1;
            var b = fxNow || createFxNow(),
            c = Math.max(0, j.startTime + j.duration - b),
            d = c / j.duration || 0,
            f = 1 - d,
            g = 0,
            i = j.tweens.length;
            for (; g < i; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]),
            f < 1 && i ? c: (h.resolveWith(a, [j]), !1)
        },
        j = h.promise({
            elem: a,
            props: jQuery.extend({},
            b),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            },
            c),
            originalProperties: b,
            originalOptions: c,
            startTime: fxNow || createFxNow(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = jQuery.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d),
                d
            },
            stop: function(b) {
                var c = 0,
                d = b ? j.tweens.length: 0;
                if (e) return this;
                e = !0;
                for (; c < d; c++) j.tweens[c].run(1);
                return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]),
                this
            }
        }),
        k = j.props;
        propFilter(k, j.opts.specialEasing);
        for (; f < g; f++) {
            d = animationPrefilters[f].call(j, a, k, j.opts);
            if (d) return d
        }
        return createTweens(j, k),
        jQuery.isFunction(j.opts.start) && j.opts.start.call(a, j),
        jQuery.fx.timer(jQuery.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })),
        j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    function propFilter(a, b) {
        var c,
        d,
        e,
        f,
        g;
        for (c in a) {
            d = jQuery.camelCase(c),
            e = b[d],
            f = a[c],
            jQuery.isArray(f) && (e = f[1], f = a[c] = f[0]),
            c !== d && (a[d] = f, delete a[c]),
            g = jQuery.cssHooks[d];
            if (g && "expand" in g) {
                f = g.expand(f),
                delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
        }
    }
    function defaultPrefilter(a, b, c) {
        var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m = this,
        n = a.style,
        o = {},
        p = [],
        q = a.nodeType && isHidden(a);
        c.queue || (k = jQuery._queueHooks(a, "fx"), k.unqueued == null && (k.unqueued = 0, l = k.empty.fire, k.empty.fire = function() {
            k.unqueued || l()
        }), k.unqueued++, m.always(function() {
            m.always(function() {
                k.unqueued--,
                jQuery.queue(a, "fx").length || k.empty.fire()
            })
        })),
        a.nodeType === 1 && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], jQuery.css(a, "display") === "inline" && jQuery.css(a, "float") === "none" && (n.display = "inline-block")),
        c.overflow && (n.overflow = "hidden", m.always(function() {
            n.overflow = c.overflow[0],
            n.overflowX = c.overflow[1],
            n.overflowY = c.overflow[2]
        })),
        h = data_priv.get(a, "fxshow");
        for (d in b) {
            f = b[d];
            if (rfxtypes.exec(f)) {
                delete b[d],
                i = i || f === "toggle";
                if (f === (q ? "hide": "show")) if (f === "show" && h !== undefined && h[d] !== undefined) q = !0;
                else continue;
                p.push(d)
            }
        }
        g = p.length;
        if (g) {
            h = data_priv.get(a, "fxshow") || data_priv.access(a, "fxshow", {}),
            "hidden" in h && (q = h.hidden),
            i && (h.hidden = !q),
            q ? jQuery(a).show() : m.done(function() {
                jQuery(a).hide()
            }),
            m.done(function() {
                var b;
                data_priv.remove(a, "fxshow");
                for (b in o) jQuery.style(a, b, o[b])
            });
            for (d = 0; d < g; d++) e = p[d],
            j = m.createTween(e, q ? h[e] : 0),
            o[e] = h[e] || jQuery.style(a, e),
            e in h || (h[e] = j.start, q && (j.end = j.start, j.start = e === "width" || e === "height" ? 1: 0))
        }
    }
    function Tween(a, b, c, d, e) {
        return new Tween.prototype.init(a, b, c, d, e)
    }
    function genFx(a, b) {
        var c,
        d = {
            height: a
        },
        e = 0;
        b = b ? 1: 0;
        for (; e < 4; e += 2 - b) c = cssExpand[e],
        d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a),
        d
    }
    function getWindow(a) {
        return jQuery.isWindow(a) ? a: a.nodeType === 9 && a.defaultView
    }
    var rootjQuery,
    readyList,
    core_strundefined = typeof undefined,
    location = window.location,
    document = window.document,
    docElem = document.documentElement,
    _jQuery = window.jQuery,
    _$ = window.$,
    class2type = {},
    core_deletedIds = [],
    core_version = "2.0.0",
    core_concat = core_deletedIds.concat,
    core_push = core_deletedIds.push,
    core_slice = core_deletedIds.slice,
    core_indexOf = core_deletedIds.indexOf,
    core_toString = class2type.toString,
    core_hasOwn = class2type.hasOwnProperty,
    core_trim = core_version.trim,
    jQuery = function(a, b) {
        return new jQuery.fn.init(a, b, rootjQuery)
    },
    core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    core_rnotwhite = /\S+/g,
    rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,
    fcamelCase = function(a, b) {
        return b.toUpperCase()
    },
    completed = function() {
        document.removeEventListener("DOMContentLoaded", completed, !1),
        window.removeEventListener("load", completed, !1),
        jQuery.ready()
    };
    jQuery.fn = jQuery.prototype = {
        jquery: core_version,
        constructor: jQuery,
        init: function(a, b, c) {
            var d,
            e;
            if (!a) return this;
            if (typeof a == "string") {
                a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? d = [null, a, null] : d = rquickExpr.exec(a);
                if (d && (d[1] || !b)) {
                    if (d[1]) {
                        b = b instanceof jQuery ? b[0] : b,
                        jQuery.merge(this, jQuery.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b: document, !0));
                        if (rsingleTag.test(d[1]) && jQuery.isPlainObject(b)) for (d in b) jQuery.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
                        return this
                    }
                    return e = document.getElementById(d[2]),
                    e && e.parentNode && (this.length = 1, this[0] = e),
                    this.context = document,
                    this.selector = a,
                    this
                }
                return ! b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a)
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : jQuery.isFunction(a) ? c.ready(a) : (a.selector !== undefined && (this.selector = a.selector, this.context = a.context), jQuery.makeArray(a, this))
        },
        selector: "",
        length: 0,
        toArray: function() {
            return core_slice.call(this)
        },
        get: function(a) {
            return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
        },
        pushStack: function(a) {
            var b = jQuery.merge(this.constructor(), a);
            return b.prevObject = this,
            b.context = this.context,
            b
        },
        each: function(a, b) {
            return jQuery.each(this, a, b)
        },
        ready: function(a) {
            return jQuery.ready.promise().done(a),
            this
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        },
        eq: function(a) {
            var b = this.length,
            c = +a + (a < 0 ? b: 0);
            return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
        },
        map: function(a) {
            return this.pushStack(jQuery.map(this, 
            function(b, c) {
                return a.call(b, c, b)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    },
    jQuery.fn.init.prototype = jQuery.fn,
    jQuery.extend = jQuery.fn.extend = function() {
        var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;
        typeof g == "boolean" && (j = g, g = arguments[1] || {},
        h = 2),
        typeof g != "object" && !jQuery.isFunction(g) && (g = {}),
        i === h && (g = this, --h);
        for (; h < i; h++) if ((a = arguments[h]) != null) for (b in a) {
            c = g[b],
            d = a[b];
            if (g === d) continue;
            j && d && (jQuery.isPlainObject(d) || (e = jQuery.isArray(d))) ? (e ? (e = !1, f = c && jQuery.isArray(c) ? c: []) : f = c && jQuery.isPlainObject(c) ? c: {},
            g[b] = jQuery.extend(j, f, d)) : d !== undefined && (g[b] = d)
        }
        return g
    },
    jQuery.extend({
        expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
        noConflict: function(a) {
            return window.$ === jQuery && (window.$ = _$),
            a && window.jQuery === jQuery && (window.jQuery = _jQuery),
            jQuery
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? jQuery.readyWait++:jQuery.ready(!0)
        },
        ready: function(a) {
            if (a === !0 ? --jQuery.readyWait: jQuery.isReady) return;
            jQuery.isReady = !0;
            if (a !== !0 && --jQuery.readyWait > 0) return;
            readyList.resolveWith(document, [jQuery]),
            jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready")
        },
        isFunction: function(a) {
            return jQuery.type(a) === "function"
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return a != null && a === a.window
        },
        isNumeric: function(a) {
            return ! isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return a == null ? String(a) : typeof a == "object" || typeof a == "function" ? class2type[core_toString.call(a)] || "object": typeof a
        },
        isPlainObject: function(a) {
            if (jQuery.type(a) !== "object" || a.nodeType || jQuery.isWindow(a)) return ! 1;
            try {
                if (a.constructor && !core_hasOwn.call(a.constructor.prototype, "isPrototypeOf")) return ! 1
            } catch(b) {
                return ! 1
            }
            return ! 0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return ! 1;
            return ! 0
        },
        error: function(a) {
            throw new Error(a)
        },
        parseHTML: function(a, b, c) {
            if (!a || typeof a != "string") return null;
            typeof b == "boolean" && (c = b, b = !1),
            b = b || document;
            var d = rsingleTag.exec(a),
            e = !c && [];
            return d ? [b.createElement(d[1])] : (d = jQuery.buildFragment([a], b, e), e && jQuery(e).remove(), jQuery.merge([], d.childNodes))
        },
        parseJSON: JSON.parse,
        parseXML: function(a) {
            var b,
            c;
            if (!a || typeof a != "string") return null;
            try {
                c = new DOMParser,
                b = c.parseFromString(a, "text/xml")
            } catch(d) {
                b = undefined
            }
            return (!b || b.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + a),
            b
        },
        noop: function() {},
        globalEval: function(code) {
            var script,
            indirect = eval;
            code = jQuery.trim(code),
            code && (code.indexOf("use strict") === 1 ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
        },
        camelCase: function(a) {
            return a.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, c) {
            var d,
            e = 0,
            f = a.length,
            g = isArraylike(a);
            if (c) if (g) for (; e < f; e++) {
                d = b.apply(a[e], c);
                if (d === !1) break
            } else for (e in a) {
                d = b.apply(a[e], c);
                if (d === !1) break
            } else if (g) for (; e < f; e++) {
                d = b.call(a[e], e, a[e]);
                if (d === !1) break
            } else for (e in a) {
                d = b.call(a[e], e, a[e]);
                if (d === !1) break
            }
            return a
        },
        trim: function(a) {
            return a == null ? "": core_trim.call(a)
        },
        makeArray: function(a, b) {
            var c = b || [];
            return a != null && (isArraylike(Object(a)) ? jQuery.merge(c, typeof a == "string" ? [a] : a) : core_push.call(c, a)),
            c
        },
        inArray: function(a, b, c) {
            return b == null ? -1: core_indexOf.call(b, a, c)
        },
        merge: function(a, b) {
            var c = b.length,
            d = a.length,
            e = 0;
            if (typeof c == "number") for (; e < c; e++) a[d++] = b[e];
            else while (b[e] !== undefined) a[d++] = b[e++];
            return a.length = d,
            a
        },
        grep: function(a, b, c) {
            var d,
            e = [],
            f = 0,
            g = a.length;
            c = !!c;
            for (; f < g; f++) d = !!b(a[f], f),
            c !== d && e.push(a[f]);
            return e
        },
        map: function(a, b, c) {
            var d,
            e = 0,
            f = a.length,
            g = isArraylike(a),
            h = [];
            if (g) for (; e < f; e++) d = b(a[e], e, c),
            d != null && (h[h.length] = d);
            else for (e in a) d = b(a[e], e, c),
            d != null && (h[h.length] = d);
            return core_concat.apply([], h)
        },
        guid: 1,
        proxy: function(a, b) {
            var c,
            d,
            e;
            return typeof b == "string" && (c = a[b], b = a, a = c),
            jQuery.isFunction(a) ? (d = core_slice.call(arguments, 2), e = function() {
                return a.apply(b || this, d.concat(core_slice.call(arguments)))
            },
            e.guid = a.guid = a.guid || jQuery.guid++, e) : undefined
        },
        access: function(a, b, c, d, e, f, g) {
            var h = 0,
            i = a.length,
            j = c == null;
            if (jQuery.type(c) === "object") {
                e = !0;
                for (h in c) jQuery.access(a, b, h, c[h], !0, f, g)
            } else if (d !== undefined) {
                e = !0,
                jQuery.isFunction(d) || (g = !0),
                j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                    return j.call(jQuery(a), c)
                }));
                if (b) for (; h < i; h++) b(a[h], c, g ? d: d.call(a[h], h, b(a[h], c)))
            }
            return e ? a: j ? b.call(a) : i ? b(a[0], c) : f
        },
        now: Date.now,
        swap: function(a, b, c, d) {
            var e,
            f,
            g = {};
            for (f in b) g[f] = a.style[f],
            a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e
        }
    }),
    jQuery.ready.promise = function(a) {
        return readyList || (readyList = jQuery.Deferred(), document.readyState === "complete" ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1))),
        readyList.promise(a)
    },
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), 
    function(a, b) {
        class2type["[object " + b + "]"] = b.toLowerCase()
    }),
    rootjQuery = jQuery(document),
    function(a, b) {
        function be(a) {
            return Y.test(a + "")
        }
        function bf() {
            var a,
            b = [];
            return a = function(c, d) {
                return b.push(c += " ") > e.cacheLength && delete a[b.shift()],
                a[c] = d
            }
        }
        function bg(a) {
            return a[s] = !0,
            a
        }
        function bh(a) {
            var b = l.createElement("div");
            try {
                return !! a(b)
            } catch(c) {
                return ! 1
            } finally {
                b.parentNode && b.parentNode.removeChild(b),
                b = null
            }
        }
        function bi(a, b, c, d) {
            var e,
            f,
            g,
            h,
            i,
            j,
            m,
            p,
            q,
            v; (b ? b.ownerDocument || b: t) !== l && k(b),
            b = b || l,
            c = c || [];
            if (!a || typeof a != "string") return c;
            if ((h = b.nodeType) !== 1 && h !== 9) return [];
            if (n && !d) {
                if (e = Z.exec(a)) if (g = e[1]) {
                    if (h === 9) {
                        f = b.getElementById(g);
                        if (!f || !f.parentNode) return c;
                        if (f.id === g) return c.push(f),
                        c
                    } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && r(b, f) && f.id === g) return c.push(f),
                    c
                } else {
                    if (e[2]) return H.apply(c, b.getElementsByTagName(a)),
                    c;
                    if ((g = e[3]) && u.getElementsByClassName && b.getElementsByClassName) return H.apply(c, b.getElementsByClassName(g)),
                    c
                }
                if (u.qsa && (!o || !o.test(a))) {
                    p = m = s,
                    q = b,
                    v = h === 9 && a;
                    if (h === 1 && b.nodeName.toLowerCase() !== "object") {
                        j = bp(a),
                        (m = b.getAttribute("id")) ? p = m.replace(ba, "\\$&") : b.setAttribute("id", p),
                        p = "[id='" + p + "'] ",
                        i = j.length;
                        while (i--) j[i] = p + bq(j[i]);
                        q = T.test(a) && b.parentNode || b,
                        v = j.join(",")
                    }
                    if (v) try {
                        return H.apply(c, q.querySelectorAll(v)),
                        c
                    } catch(w) {} finally {
                        m || b.removeAttribute("id")
                    }
                }
            }
            return by(a.replace(Q, "$1"), b, c, d)
        }
        function bj(a, b) {
            var c = b && a,
            d = c && (~b.sourceIndex || D) - (~a.sourceIndex || D);
            if (d) return d;
            if (c) while (c = c.nextSibling) if (c === b) return - 1;
            return a ? 1: -1
        }
        function bk(a, c, d) {
            var e;
            return d ? b: (e = a.getAttributeNode(c)) && e.specified ? e.value: a[c] === !0 ? c.toLowerCase() : null
        }
        function bl(a, c, d) {
            var e;
            return d ? b: e = a.getAttribute(c, c.toLowerCase() === "type" ? 1: 2)
        }
        function bm(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return c === "input" && b.type === a
            }
        }
        function bn(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return (c === "input" || c === "button") && b.type === a
            }
        }
        function bo(a) {
            return bg(function(b) {
                return b = +b,
                bg(function(c, d) {
                    var e,
                    f = a([], c.length, b),
                    g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }
        function bp(a, b) {
            var c,
            d,
            f,
            g,
            h,
            i,
            j,
            k = y[a + " "];
            if (k) return b ? 0: k.slice(0);
            h = a,
            i = [],
            j = e.preFilter;
            while (h) {
                if (!c || (d = R.exec(h))) d && (h = h.slice(d[0].length) || h),
                i.push(f = []);
                c = !1;
                if (d = S.exec(h)) c = d.shift(),
                f.push({
                    value: c,
                    type: d[0].replace(Q, " ")
                }),
                h = h.slice(c.length);
                for (g in e.filter)(d = X[g].exec(h)) && (!j[g] || (d = j[g](d))) && (c = d.shift(), f.push({
                    value: c,
                    type: g,
                    matches: d
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length: h ? bi.error(a) : y(a, i).slice(0)
        }
        function bq(a) {
            var b = 0,
            c = a.length,
            d = "";
            for (; b < c; b++) d += a[b].value;
            return d
        }
        function br(a, b, c) {
            var e = b.dir,
            f = c && e === "parentNode",
            g = w++;
            return b.first ? 
            function(b, c, d) {
                while (b = b[e]) if (b.nodeType === 1 || f) return a(b, c, d)
            }: function(b, c, h) {
                var i,
                j,
                k,
                l = v + " " + g;
                if (h) {
                    while (b = b[e]) if (b.nodeType === 1 || f) if (a(b, c, h)) return ! 0
                } else while (b = b[e]) if (b.nodeType === 1 || f) {
                    k = b[s] || (b[s] = {});
                    if ((j = k[e]) && j[0] === l) {
                        if ((i = j[1]) === !0 || i === d) return i === !0
                    } else {
                        j = k[e] = [l],
                        j[1] = a(b, c, h) || d;
                        if (j[1] === !0) return ! 0
                    }
                }
            }
        }
        function bs(a) {
            return a.length > 1 ? 
            function(b, c, d) {
                var e = a.length;
                while (e--) if (!a[e](b, c, d)) return ! 1;
                return ! 0
            }: a[0]
        }
        function bt(a, b, c, d, e) {
            var f,
            g = [],
            h = 0,
            i = a.length,
            j = b != null;
            for (; h < i; h++) if (f = a[h]) if (!c || c(f, d, e)) g.push(f),
            j && b.push(h);
            return g
        }
        function bu(a, b, c, d, e, f) {
            return d && !d[s] && (d = bu(d)),
            e && !e[s] && (e = bu(e, f)),
            bg(function(f, g, h, i) {
                var j,
                k,
                l,
                m = [],
                n = [],
                o = g.length,
                p = f || bx(b || "*", h.nodeType ? [h] : h, []),
                q = a && (f || !b) ? bt(p, m, a, h, i) : p,
                r = c ? e || (f ? a: o || d) ? [] : g: q;
                c && c(q, r, h, i);
                if (d) {
                    j = bt(r, n),
                    d(j, [], h, i),
                    k = j.length;
                    while (k--) if (l = j[k]) r[n[k]] = !(q[n[k]] = l)
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [],
                            k = r.length;
                            while (k--)(l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--)(l = r[k]) && (j = e ? J.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = bt(r === g ? r.splice(o, r.length) : r),
                e ? e(null, g, r, i) : H.apply(g, r)
            })
        }
        function bv(a) {
            var b,
            c,
            d,
            f = a.length,
            g = e.relative[a[0].type],
            h = g || e.relative[" "],
            j = g ? 1: 0,
            k = br(function(a) {
                return a === b
            },
            h, !0),
            l = br(function(a) {
                return J.call(b, a) > -1
            },
            h, !0),
            m = [function(a, c, d) {
                return ! g && (d || c !== i) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d))
            }];
            for (; j < f; j++) if (c = e.relative[a[j].type]) m = [br(bs(m), c)];
            else {
                c = e.filter[a[j].type].apply(null, a[j].matches);
                if (c[s]) {
                    d = ++j;
                    for (; d < f; d++) if (e.relative[a[d].type]) break;
                    return bu(j > 1 && bs(m), j > 1 && bq(a.slice(0, j - 1)).replace(Q, "$1"), c, j < d && bv(a.slice(j, d)), d < f && bv(a = a.slice(d)), d < f && bq(a))
                }
                m.push(c)
            }
            return bs(m)
        }
        function bw(a, b) {
            var c = 0,
            f = b.length > 0,
            g = a.length > 0,
            h = function(h, j, k, m, n) {
                var o,
                p,
                q,
                r = [],
                s = 0,
                t = "0",
                u = h && [],
                w = n != null,
                x = i,
                y = h || g && e.find.TAG("*", n && j.parentNode || j),
                z = v += x == null ? 1: Math.random() || .1;
                w && (i = j !== l && j, d = c);
                for (; (o = y[t]) != null; t++) {
                    if (g && o) {
                        p = 0;
                        while (q = a[p++]) if (q(o, j, k)) {
                            m.push(o);
                            break
                        }
                        w && (v = z, d = ++c)
                    }
                    f && ((o = !q && o) && s--, h && u.push(o))
                }
                s += t;
                if (f && t !== s) {
                    p = 0;
                    while (q = b[p++]) q(u, r, j, k);
                    if (h) {
                        if (s > 0) while (t--) ! u[t] && !r[t] && (r[t] = F.call(m));
                        r = bt(r)
                    }
                    H.apply(m, r),
                    w && !h && r.length > 0 && s + b.length > 1 && bi.uniqueSort(m)
                }
                return w && (v = z, i = x),
                u
            };
            return f ? bg(h) : h
        }
        function bx(a, b, c) {
            var d = 0,
            e = b.length;
            for (; d < e; d++) bi(a, b[d], c);
            return c
        }
        function by(a, b, c, d) {
            var f,
            g,
            i,
            j,
            k,
            l = bp(a);
            if (!d && l.length === 1) {
                g = l[0] = l[0].slice(0);
                if (g.length > 2 && (i = g[0]).type === "ID" && b.nodeType === 9 && n && e.relative[g[1].type]) {
                    b = (e.find.ID(i.matches[0].replace(bb, bc), b) || [])[0];
                    if (!b) return c;
                    a = a.slice(g.shift().value.length)
                }
                f = X.needsContext.test(a) ? 0: g.length;
                while (f--) {
                    i = g[f];
                    if (e.relative[j = i.type]) break;
                    if (k = e.find[j]) if (d = k(i.matches[0].replace(bb, bc), T.test(g[0].type) && b.parentNode || b)) {
                        g.splice(f, 1),
                        a = d.length && bq(g);
                        if (!a) return H.apply(c, d),
                        c;
                        break
                    }
                }
            }
            return h(a, l)(d, b, !n, c, T.test(a)),
            c
        }
        function bz() {}
        var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s = "sizzle" + -(new Date),
        t = a.document,
        u = {},
        v = 0,
        w = 0,
        x = bf(),
        y = bf(),
        z = bf(),
        A = !1,
        B = function() {
            return 0
        },
        C = typeof b,
        D = 1 << 31,
        E = [],
        F = E.pop,
        G = E.push,
        H = E.push,
        I = E.slice,
        J = E.indexOf || 
        function(a) {
            var b = 0,
            c = this.length;
            for (; b < c; b++) if (this[b] === a) return b;
            return - 1
        },
        K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        L = "[\\x20\\t\\r\\n\\f]",
        M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        N = M.replace("w", "w#"),
        O = "\\[" + L + "*(" + M + ")" + L + "*(?:([*^$|!~]?=)" + L + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + N + ")|)|)" + L + "*\\]",
        P = ":(" + M + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + O.replace(3, 8) + ")*)|.*)\\)|)",
        Q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
        R = new RegExp("^" + L + "*," + L + "*"),
        S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
        T = new RegExp(L + "*[+~]"),
        U = new RegExp("=" + L + "*([^\\]'\"]*)" + L + "*\\]", "g"),
        V = new RegExp(P),
        W = new RegExp("^" + N + "$"),
        X = {
            ID: new RegExp("^#(" + M + ")"),
            CLASS: new RegExp("^\\.(" + M + ")"),
            TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + O),
            PSEUDO: new RegExp("^" + P),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
            "boolean": new RegExp("^(?:" + K + ")$", "i"),
            needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
        },
        Y = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        $ = /^(?:input|select|textarea|button)$/i,
        _ = /^h\d$/i,
        ba = /'|\\/g,
        bb = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
        bc = function(a, b) {
            var c = "0x" + b - 65536;
            return c !== c ? b: c < 0 ? String.fromCharCode(c + 65536) : String.fromCharCode(c >> 10 | 55296, c & 1023 | 56320)
        };
        try {
            H.apply(E = I.call(t.childNodes), t.childNodes),
            E[t.childNodes.length].nodeType
        } catch(bd) {
            H = {
                apply: E.length ? 
                function(a, b) {
                    G.apply(a, I.call(b))
                }: function(a, b) {
                    var c = a.length,
                    d = 0;
                    while (a[c++] = b[d++]);
                    a.length = c - 1
                }
            }
        }
        g = bi.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? b.nodeName !== "HTML": !1
        },
        k = bi.setDocument = function(a) {
            var c = a ? a.ownerDocument || a: t;
            if (c === l || c.nodeType !== 9 || !c.documentElement) return l;
            l = c,
            m = c.documentElement,
            n = !g(c),
            u.getElementsByTagName = bh(function(a) {
                return a.appendChild(c.createComment("")),
                !a.getElementsByTagName("*").length
            }),
            u.attributes = bh(function(a) {
                return a.className = "i",
                !a.getAttribute("className")
            }),
            u.getElementsByClassName = bh(function(a) {
                return a.innerHTML = "<div class='a'></div><div class='a i'></div>",
                a.firstChild.className = "i",
                a.getElementsByClassName("i").length === 2
            }),
            u.sortDetached = bh(function(a) {
                return a.compareDocumentPosition(l.createElement("div")) & 1
            }),
            u.getById = bh(function(a) {
                return m.appendChild(a).id = s,
                !c.getElementsByName || !c.getElementsByName(s).length
            }),
            u.getById ? (e.find.ID = function(a, b) {
                if (typeof b.getElementById !== C && n) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            },
            e.filter.ID = function(a) {
                var b = a.replace(bb, bc);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (e.find.ID = function(a, c) {
                if (typeof c.getElementById !== C && n) {
                    var d = c.getElementById(a);
                    return d ? d.id === a || typeof d.getAttributeNode !== C && d.getAttributeNode("id").value === a ? [d] : b: []
                }
            },
            e.filter.ID = function(a) {
                var b = a.replace(bb, bc);
                return function(a) {
                    var c = typeof a.getAttributeNode !== C && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }),
            e.find.TAG = u.getElementsByTagName ? 
            function(a, b) {
                if (typeof b.getElementsByTagName !== C) return b.getElementsByTagName(a)
            }: function(a, b) {
                var c,
                d = [],
                e = 0,
                f = b.getElementsByTagName(a);
                if (a === "*") {
                    while (c = f[e++]) c.nodeType === 1 && d.push(c);
                    return d
                }
                return f
            },
            e.find.CLASS = u.getElementsByClassName && 
            function(a, b) {
                if (typeof b.getElementsByClassName !== C && n) return b.getElementsByClassName(a)
            },
            p = [],
            o = [];
            if (u.qsa = be(c.querySelectorAll)) bh(function(a) {
                a.innerHTML = "<select><option selected=''></option></select>",
                a.querySelectorAll("[selected]").length || o.push("\\[" + L + "*(?:value|" + K + ")"),
                a.querySelectorAll(":checked").length || o.push(":checked")
            }),
            bh(function(a) {
                var b = l.createElement("input");
                b.setAttribute("type", "hidden"),
                a.appendChild(b).setAttribute("t", ""),
                a.querySelectorAll("[t^='']").length && o.push("[*^$]=" + L + "*(?:''|\"\")"),
                a.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled"),
                a.querySelectorAll("*,:x"),
                o.push(",.*:")
            });
            return (u.matchesSelector = be(q = m.webkitMatchesSelector || m.mozMatchesSelector || m.oMatchesSelector || m.msMatchesSelector)) && bh(function(a) {
                u.disconnectedMatch = q.call(a, "div"),
                q.call(a, "[s!='']:x"),
                p.push("!=", P)
            }),
            o = o.length && new RegExp(o.join("|")),
            p = p.length && new RegExp(p.join("|")),
            r = be(m.contains) || m.compareDocumentPosition ? 
            function(a, b) {
                var c = a.nodeType === 9 ? a.documentElement: a,
                d = b && b.parentNode;
                return a === d || !!d && d.nodeType === 1 && !!(c.contains ? c.contains(d) : a.compareDocumentPosition && a.compareDocumentPosition(d) & 16)
            }: function(a, b) {
                if (b) while (b = b.parentNode) if (b === a) return ! 0;
                return ! 1
            },
            B = m.compareDocumentPosition ? 
            function(a, b) {
                if (a === b) return A = !0,
                0;
                var d = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
                if (d) return d & 1 || !u.sortDetached && b.compareDocumentPosition(a) === d ? a === c || r(t, a) ? -1: b === c || r(t, b) ? 1: j ? J.call(j, a) - J.call(j, b) : 0: d & 4 ? -1: 1;
                return a.compareDocumentPosition ? -1: 1
            }: function(a, b) {
                var d,
                e = 0,
                f = a.parentNode,
                g = b.parentNode,
                h = [a],
                i = [b];
                if (a === b) return A = !0,
                0;
                if (!f || !g) return a === c ? -1: b === c ? 1: f ? -1: g ? 1: j ? J.call(j, a) - J.call(j, b) : 0;
                if (f === g) return bj(a, b);
                d = a;
                while (d = d.parentNode) h.unshift(d);
                d = b;
                while (d = d.parentNode) i.unshift(d);
                while (h[e] === i[e]) e++;
                return e ? bj(h[e], i[e]) : h[e] === t ? -1: i[e] === t ? 1: 0
            },
            l
        },
        bi.matches = function(a, b) {
            return bi(a, null, null, b)
        },
        bi.matchesSelector = function(a, b) { (a.ownerDocument || a) !== l && k(a),
            b = b.replace(U, "='$1']");
            if (u.matchesSelector && n && (!p || !p.test(b)) && (!o || !o.test(b))) try {
                var c = q.call(a, b);
                if (c || u.disconnectedMatch || a.document && a.document.nodeType !== 11) return c
            } catch(d) {}
            return bi(b, l, null, [a]).length > 0
        },
        bi.contains = function(a, b) {
            return (a.ownerDocument || a) !== l && k(a),
            r(a, b)
        },
        bi.attr = function(a, c) { (a.ownerDocument || a) !== l && k(a);
            var d = e.attrHandle[c.toLowerCase()],
            f = d && d(a, c, !n);
            return f === b ? u.attributes || !n ? a.getAttribute(c) : (f = a.getAttributeNode(c)) && f.specified ? f.value: null: f
        },
        bi.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        },
        bi.uniqueSort = function(a) {
            var b,
            c = [],
            d = 0,
            e = 0;
            A = !u.detectDuplicates,
            j = !u.sortStable && a.slice(0),
            a.sort(B);
            if (A) {
                while (b = a[e++]) b === a[e] && (d = c.push(e));
                while (d--) a.splice(c[d], 1)
            }
            return a
        },
        f = bi.getText = function(a) {
            var b,
            c = "",
            d = 0,
            e = a.nodeType;
            if (!e) for (; b = a[d]; d++) c += f(b);
            else if (e === 1 || e === 9 || e === 11) {
                if (typeof a.textContent == "string") return a.textContent;
                for (a = a.firstChild; a; a = a.nextSibling) c += f(a)
            } else if (e === 3 || e === 4) return a.nodeValue;
            return c
        },
        e = bi.selectors = {
            cacheLength: 50,
            createPseudo: bg,
            match: X,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(bb, bc),
                    a[3] = (a[4] || a[5] || "").replace(bb, bc),
                    a[2] === "~=" && (a[3] = " " + a[3] + " "),
                    a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(),
                    a[1].slice(0, 3) === "nth" ? (a[3] || bi.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * (a[3] === "even" || a[3] === "odd")), a[5] = +(a[7] + a[8] || a[3] === "odd")) : a[3] && bi.error(a[0]),
                    a
                },
                PSEUDO: function(a) {
                    var b,
                    c = !a[5] && a[2];
                    return X.CHILD.test(a[0]) ? null: (a[4] ? a[2] = a[4] : c && V.test(c) && (b = bp(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(bb, bc).toLowerCase();
                    return a === "*" ? 
                    function() {
                        return ! 0
                    }: function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = x[a + " "];
                    return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && x(a, 
                    function(a) {
                        return b.test(typeof a.className == "string" && a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = bi.attr(d, a);
                        return e == null ? b === "!=": b ? (e += "", b === "=" ? e === c: b === "!=" ? e !== c: b === "^=" ? c && e.indexOf(c) === 0: b === "*=" ? c && e.indexOf(c) > -1: b === "$=" ? c && e.slice( - c.length) === c: b === "~=" ? (" " + e + " ").indexOf(c) > -1: b === "|=" ? e === c || e.slice(0, c.length + 1) === c + "-": !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = a.slice(0, 3) !== "nth",
                    g = a.slice( - 4) !== "last",
                    h = b === "of-type";
                    return d === 1 && e === 0 ? 
                    function(a) {
                        return !! a.parentNode
                    }: function(b, c, i) {
                        var j,
                        k,
                        l,
                        m,
                        n,
                        o,
                        p = f !== g ? "nextSibling": "previousSibling",
                        q = b.parentNode,
                        r = h && b.nodeName.toLowerCase(),
                        t = !i && !h;
                        if (q) {
                            if (f) {
                                while (p) {
                                    l = b;
                                    while (l = l[p]) if (h ? l.nodeName.toLowerCase() === r: l.nodeType === 1) return ! 1;
                                    o = p = a === "only" && !o && "nextSibling"
                                }
                                return ! 0
                            }
                            o = [g ? q.firstChild: q.lastChild];
                            if (g && t) {
                                k = q[s] || (q[s] = {}),
                                j = k[a] || [],
                                n = j[0] === v && j[1],
                                m = j[0] === v && j[2],
                                l = n && q.childNodes[n];
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if (l.nodeType === 1 && ++m && l === b) {
                                    k[a] = [v, n, m];
                                    break
                                }
                            } else if (t && (j = (b[s] || (b[s] = {}))[a]) && j[0] === v) m = j[1];
                            else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if ((h ? l.nodeName.toLowerCase() === r: l.nodeType === 1) && ++m) {
                                t && ((l[s] || (l[s] = {}))[a] = [v, m]);
                                if (l === b) break
                            }
                            return m -= e,
                            m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c,
                    d = e.pseudos[a] || e.setFilters[a.toLowerCase()] || bi.error("unsupported pseudo: " + a);
                    return d[s] ? d(b) : d.length > 1 ? (c = [a, a, ""
                    , b], e.setFilters.hasOwnProperty(a.toLowerCase()) ? bg(function(a, c) {
                        var e,
                        f = d(a, b),
                        g = f.length;
                        while (g--) e = J.call(a, f[g]),
                        a[e] = !(c[e] = f[g])
                    }) : function(a) {
                        return d(a, 0, c)
                    }) : d
                }
            },
            pseudos: {
                not: bg(function(a) {
                    var b = [],
                    c = [],
                    d = h(a.replace(Q, "$1"));
                    return d[s] ? bg(function(a, b, c, e) {
                        var f,
                        g = d(a, null, e, []),
                        h = a.length;
                        while (h--) if (f = g[h]) a[h] = !(b[h] = f)
                    }) : function(a, e, f) {
                        return b[0] = a,
                        d(b, null, f, c),
                        !c.pop()
                    }
                }),
                has: bg(function(a) {
                    return function(b) {
                        return bi(a, b).length > 0
                    }
                }),
                contains: bg(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || f(b)).indexOf(a) > -1
                    }
                }),
                lang: bg(function(a) {
                    return W.test(a || "") || bi.error("unsupported lang: " + a),
                    a = a.replace(bb, bc).toLowerCase(),
                    function(b) {
                        var c;
                        do
                        if (c = n ? b.lang: b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(),
                        c === a || c.indexOf(a + "-") === 0;
                        while ((b = b.parentNode) && b.nodeType === 1);
                        return ! 1
                    }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === m
                },
                focus: function(a) {
                    return a === l.activeElement && (!l.hasFocus || l.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && !!a.checked || b === "option" && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex,
                    a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeName > "@" || a.nodeType === 3 || a.nodeType === 4) return ! 1;
                    return ! 0
                },
                parent: function(a) {
                    return ! e.pseudos.empty(a)
                },
                header: function(a) {
                    return _.test(a.nodeName)
                },
                input: function(a) {
                    return $.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && a.type === "button" || b === "button"
                },
                text: function(a) {
                    var b;
                    return a.nodeName.toLowerCase() === "input" && a.type === "text" && ((b = a.getAttribute("type")) == null || b.toLowerCase() === a.type)
                },
                first: bo(function() {
                    return [0]
                }),
                last: bo(function(a, b) {
                    return [b - 1]
                }),
                eq: bo(function(a, b, c) {
                    return [c < 0 ? c + b: c]
                }),
                even: bo(function(a, b) {
                    var c = 0;
                    for (; c < b; c += 2) a.push(c);
                    return a
                }),
                odd: bo(function(a, b) {
                    var c = 1;
                    for (; c < b; c += 2) a.push(c);
                    return a
                }),
                lt: bo(function(a, b, c) {
                    var d = c < 0 ? c + b: c;
                    for (; --d >= 0;) a.push(d);
                    return a
                }),
                gt: bo(function(a, b, c) {
                    var d = c < 0 ? c + b: c;
                    for (; ++d < b;) a.push(d);
                    return a
                })
            }
        };
        for (c in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) e.pseudos[c] = bm(c);
        for (c in {
            submit: !0,
            reset: !0
        }) e.pseudos[c] = bn(c);
        h = bi.compile = function(a, b) {
            var c,
            d = [],
            e = [],
            f = z[a + " "];
            if (!f) {
                b || (b = bp(a)),
                c = b.length;
                while (c--) f = bv(b[c]),
                f[s] ? d.push(f) : e.push(f);
                f = z(a, bw(e, d))
            }
            return f
        },
        e.pseudos.nth = e.pseudos.eq,
        bz.prototype = e.filters = e.pseudos,
        e.setFilters = new bz,
        u.sortStable = s.split("").sort(B).join("") === s,
        k(),
        [0, 0].sort(B),
        u.detectDuplicates = A,
        bh(function(a) {
            a.innerHTML = "<a href='#'></a>";
            if (a.firstChild.getAttribute("href") !== "#") {
                var b = "type|href|height|width".split("|"),
                c = b.length;
                while (c--) e.attrHandle[b[c]] = bl
            }
        }),
        bh(function(a) {
            if (a.getAttribute("disabled") != null) {
                var b = K.split("|"),
                c = b.length;
                while (c--) e.attrHandle[b[c]] = bk
            }
        }),
        jQuery.find = bi,
        jQuery.expr = bi.selectors,
        jQuery.expr[":"] = jQuery.expr.pseudos,
        jQuery.unique = bi.uniqueSort,
        jQuery.text = bi.getText,
        jQuery.isXMLDoc = bi.isXML,
        jQuery.contains = bi.contains
    } (window);
    var optionsCache = {};
    jQuery.Callbacks = function(a) {
        a = typeof a == "string" ? optionsCache[a] || createOptions(a) : jQuery.extend({},
        a);
        var b,
        c,
        d,
        e,
        f,
        g,
        h = [],
        i = !a.once && [],
        j = function(l) {
            b = a.memory && l,
            c = !0,
            g = e || 0,
            e = 0,
            f = h.length,
            d = !0;
            for (; h && g < f; g++) if (h[g].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                b = !1;
                break
            }
            d = !1,
            h && (i ? i.length && j(i.shift()) : b ? h = [] : k.disable())
        },
        k = {
            add: function() {
                if (h) {
                    var c = h.length; (function g(b) {
                        jQuery.each(b, 
                        function(b, c) {
                            var d = jQuery.type(c);
                            d === "function" ? (!a.unique || !k.has(c)) && h.push(c) : c && c.length && d !== "string" && g(c)
                        })
                    })(arguments),
                    d ? f = h.length: b && (e = c, j(b))
                }
                return this
            },
            remove: function() {
                return h && jQuery.each(arguments, 
                function(a, b) {
                    var c;
                    while ((c = jQuery.inArray(b, h, c)) > -1) h.splice(c, 1),
                    d && (c <= f && f--, c <= g && g--)
                }),
                this
            },
            has: function(a) {
                return a ? jQuery.inArray(a, h) > -1: !!h && !!h.length
            },
            empty: function() {
                return h = [],
                f = 0,
                this
            },
            disable: function() {
                return h = i = b = undefined,
                this
            },
            disabled: function() {
                return ! h
            },
            lock: function() {
                return i = undefined,
                b || k.disable(),
                this
            },
            locked: function() {
                return ! i
            },
            fireWith: function(a, b) {
                return b = b || [],
                b = [a, b.slice ? b.slice() : b],
                h && (!c || i) && (d ? i.push(b) : j(b)),
                this
            },
            fire: function() {
                return k.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !! c
            }
        };
        return k
    },
    jQuery.extend({
        Deferred: function(a) {
            var b = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
            c = "pending",
            d = {
                state: function() {
                    return c
                },
                always: function() {
                    return e.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var a = arguments;
                    return jQuery.Deferred(function(c) {
                        jQuery.each(b, 
                        function(b, f) {
                            var g = f[0],
                            h = jQuery.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = h && h.apply(this, arguments);
                                a && jQuery.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
                            })
                        }),
                        a = null
                    }).promise()
                },
                promise: function(a) {
                    return a != null ? jQuery.extend(a, d) : d
                }
            },
            e = {};
            return d.pipe = d.then,
            jQuery.each(b, 
            function(a, f) {
                var g = f[2],
                h = f[3];
                d[f[1]] = g.add,
                h && g.add(function() {
                    c = h
                },
                b[a ^ 1][2].disable, b[2][2].lock),
                e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d: this, arguments),
                    this
                },
                e[f[0] + "With"] = g.fireWith
            }),
            d.promise(e),
            a && a.call(e, e),
            e
        },
        when: function(a) {
            var b = 0,
            c = core_slice.call(arguments),
            d = c.length,
            e = d !== 1 || a && jQuery.isFunction(a.promise) ? d: 0,
            f = e === 1 ? a: jQuery.Deferred(),
            g = function(a, b, c) {
                return function(d) {
                    b[a] = this,
                    c[a] = arguments.length > 1 ? core_slice.call(arguments) : d,
                    c === h ? f.notifyWith(b, c) : --e || f.resolveWith(b, c)
                }
            },
            h,
            i,
            j;
            if (d > 1) {
                h = new Array(d),
                i = new Array(d),
                j = new Array(d);
                for (; b < d; b++) c[b] && jQuery.isFunction(c[b].promise) ? c[b].promise().done(g(b, j, c)).fail(f.reject).progress(g(b, i, h)) : --e
            }
            return e || f.resolveWith(j, c),
            f.promise()
        }
    }),
    jQuery.support = function(a) {
        var b = document.createElement("input"),
        c = document.createDocumentFragment(),
        d = document.createElement("div"),
        e = document.createElement("select"),
        f = e.appendChild(document.createElement("option"));
        return b.type ? (b.type = "checkbox", a.checkOn = b.value !== "", a.optSelected = f.selected, a.reliableMarginRight = !0, a.boxSizingReliable = !0, a.pixelPosition = !1, b.checked = !0, a.noCloneChecked = b.cloneNode(!0).checked, e.disabled = !0, a.optDisabled = !f.disabled, b = document.createElement("input"), b.value = "t", b.type = "radio", a.radioValue = b.value === "t", b.setAttribute("checked", "t"), b.setAttribute("name", "t"), c.appendChild(b), a.checkClone = c.cloneNode(!0).cloneNode(!0).lastChild.checked, a.focusinBubbles = "onfocusin" in window, d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", a.clearCloneStyle = d.style.backgroundClip === "content-box", jQuery(function() {
            var b,
            c,
            e = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
            f = document.getElementsByTagName("body")[0];
            if (!f) return;
            b = document.createElement("div"),
            b.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",
            f.appendChild(b).appendChild(d),
            d.innerHTML = "",
            d.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",
            jQuery.swap(f, f.style.zoom != null ? {
                zoom: 1
            }: {},
            function() {
                a.boxSizing = d.offsetWidth === 4
            }),
            window.getComputedStyle && (a.pixelPosition = (window.getComputedStyle(d, null) || {}).top !== "1%", a.boxSizingReliable = (window.getComputedStyle(d, null) || {
                width: "4px"
            }).width === "4px", c = d.appendChild(document.createElement("div")), c.style.cssText = d.style.cssText = e, c.style.marginRight = c.style.width = "0", d.style.width = "1px", a.reliableMarginRight = !parseFloat((window.getComputedStyle(c, null) || {}).marginRight)),
            f.removeChild(b)
        }), a) : a
    } ({});
    var data_user,
    data_priv,
    rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    rmultiDash = /([A-Z])/g;
    Data.uid = 1,
    Data.accepts = function(a) {
        return a.nodeType ? a.nodeType === 1 || a.nodeType === 9: !0
    },
    Data.prototype = {
        key: function(a) {
            if (!Data.accepts(a)) return 0;
            var b = {},
            c = a[this.expando];
            if (!c) {
                c = Data.uid++;
                try {
                    b[this.expando] = {
                        value: c
                    },
                    Object.defineProperties(a, b)
                } catch(d) {
                    b[this.expando] = c,
                    jQuery.extend(a, b)
                }
            }
            return this.cache[c] || (this.cache[c] = {}),
            c
        },
        set: function(a, b, c) {
            var d,
            e = this.key(a),
            f = this.cache[e];
            if (typeof b == "string") f[b] = c;
            else if (jQuery.isEmptyObject(f)) this.cache[e] = b;
            else for (d in b) f[d] = b[d]
        },
        get: function(a, b) {
            var c = this.cache[this.key(a)];
            return b === undefined ? c: c[b]
        },
        access: function(a, b, c) {
            return b === undefined || b && typeof b == "string" && c === undefined ? this.get(a, b) : (this.set(a, b, c), c !== undefined ? c: b)
        },
        remove: function(a, b) {
            var c,
            d,
            e = this.key(a),
            f = this.cache[e];
            if (b === undefined) this.cache[e] = {};
            else {
                jQuery.isArray(b) ? d = b.concat(b.map(jQuery.camelCase)) : b in f ? d = [b] : (d = jQuery.camelCase(b), d = d in f ? [d] : d.match(core_rnotwhite) || []),
                c = d.length;
                while (c--) delete f[d[c]]
            }
        },
        hasData: function(a) {
            return ! jQuery.isEmptyObject(this.cache[a[this.expando]] || {})
        },
        discard: function(a) {
            delete this.cache[this.key(a)]
        }
    },
    data_user = new Data,
    data_priv = new Data,
    jQuery.extend({
        acceptData: Data.accepts,
        hasData: function(a) {
            return data_user.hasData(a) || data_priv.hasData(a)
        },
        data: function(a, b, c) {
            return data_user.access(a, b, c)
        },
        removeData: function(a, b) {
            data_user.remove(a, b)
        },
        _data: function(a, b, c) {
            return data_priv.access(a, b, c)
        },
        _removeData: function(a, b) {
            data_priv.remove(a, b)
        }
    }),
    jQuery.fn.extend({
        data: function(a, b) {
            var c,
            d,
            e = this[0],
            f = 0,
            g = null;
            if (a === undefined) {
                if (this.length) {
                    g = data_user.get(e);
                    if (e.nodeType === 1 && !data_priv.get(e, "hasDataAttrs")) {
                        c = e.attributes;
                        for (; f < c.length; f++) d = c[f].name,
                        d.indexOf("data-") === 0 && (d = jQuery.camelCase(d.substring(5)), dataAttr(e, d, g[d]));
                        data_priv.set(e, "hasDataAttrs", !0)
                    }
                }
                return g
            }
            return typeof a == "object" ? this.each(function() {
                data_user.set(this, a)
            }) : jQuery.access(this, 
            function(b) {
                var c,
                d = jQuery.camelCase(a);
                if (e && b === undefined) {
                    c = data_user.get(e, a);
                    if (c !== undefined) return c;
                    c = data_user.get(e, d);
                    if (c !== undefined) return c;
                    c = dataAttr(e, d, undefined);
                    if (c !== undefined) return c;
                    return
                }
                this.each(function() {
                    var c = data_user.get(this, d);
                    data_user.set(this, d, b),
                    a.indexOf("-") !== -1 && c !== undefined && data_user.set(this, a, b)
                })
            },
            null, b, arguments.length > 1, null, !0)
        },
        removeData: function(a) {
            return this.each(function() {
                data_user.remove(this, a)
            })
        }
    }),
    jQuery.extend({
        queue: function(a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue",
            d = data_priv.get(a, b),
            c && (!d || jQuery.isArray(c) ? d = data_priv.access(a, b, jQuery.makeArray(c)) : d.push(c)),
            d || []
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = jQuery.queue(a, b),
            d = c.length,
            e = c.shift(),
            f = jQuery._queueHooks(a, b),
            g = function() {
                jQuery.dequeue(a, b)
            };
            e === "inprogress" && (e = c.shift(), d--),
            f.cur = e,
            e && (b === "fx" && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)),
            !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return data_priv.get(a, c) || data_priv.access(a, c, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(a, [b + "queue", c])
                })
            })
        }
    }),
    jQuery.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return typeof a != "string" && (b = a, a = "fx", c--),
            arguments.length < c ? jQuery.queue(this[0], a) : b === undefined ? this: this.each(function() {
                var c = jQuery.queue(this, a, b);
                jQuery._queueHooks(this, a),
                a === "fx" && c[0] !== "inprogress" && jQuery.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                jQuery.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            return a = jQuery.fx ? jQuery.fx.speeds[a] || a: a,
            b = b || "fx",
            this.queue(b, 
            function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c,
            d = 1,
            e = jQuery.Deferred(),
            f = this,
            g = this.length,
            h = function() {--d || e.resolveWith(f, [f])
            };
            typeof a != "string" && (b = a, a = undefined),
            a = a || "fx";
            while (g--) c = data_priv.get(f[g], a + "queueHooks"),
            c && c.empty && (d++, c.empty.add(h));
            return h(),
            e.promise(b)
        }
    });
    var nodeHook,
    boolHook,
    rclass = /[\t\r\n]/g,
    rreturn = /\r/g,
    rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        attr: function(a, b) {
            return jQuery.access(this, jQuery.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                jQuery.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return jQuery.access(this, jQuery.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[jQuery.propFix[a] || a]
            })
        },
        addClass: function(a) {
            var b,
            c,
            d,
            e,
            f,
            g = 0,
            h = this.length,
            i = typeof a == "string" && a;
            if (jQuery.isFunction(a)) return this.each(function(b) {
                jQuery(this).addClass(a.call(this, b, this.className))
            });
            if (i) {
                b = (a || "").match(core_rnotwhite) || [];
                for (; g < h; g++) {
                    c = this[g],
                    d = c.nodeType === 1 && (c.className ? (" " + c.className + " ").replace(rclass, " ") : " ");
                    if (d) {
                        f = 0;
                        while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        c.className = jQuery.trim(d)
                    }
                }
            }
            return this
        },
        removeClass: function(a) {
            var b,
            c,
            d,
            e,
            f,
            g = 0,
            h = this.length,
            i = arguments.length === 0 || typeof a == "string" && a;
            if (jQuery.isFunction(a)) return this.each(function(b) {
                jQuery(this).removeClass(a.call(this, b, this.className))
            });
            if (i) {
                b = (a || "").match(core_rnotwhite) || [];
                for (; g < h; g++) {
                    c = this[g],
                    d = c.nodeType === 1 && (c.className ? (" " + c.className + " ").replace(rclass, " ") : "");
                    if (d) {
                        f = 0;
                        while (e = b[f++]) while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                        c.className = a ? jQuery.trim(d) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a,
            d = typeof b == "boolean";
            return jQuery.isFunction(a) ? this.each(function(c) {
                jQuery(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function() {
                if (c === "string") {
                    var e,
                    f = 0,
                    g = jQuery(this),
                    h = b,
                    i = a.match(core_rnotwhite) || [];
                    while (e = i[f++]) h = d ? h: !g.hasClass(e),
                    g[h ? "addClass": "removeClass"](e)
                } else if (c === core_strundefined || c === "boolean") this.className && data_priv.set(this, "__className__", this.className),
                this.className = this.className || a === !1 ? "": data_priv.get(this, "__className__") || ""
            })
        },
        hasClass: function(a) {
            var b = " " + a + " ",
            c = 0,
            d = this.length;
            for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(rclass, " ").indexOf(b) >= 0) return ! 0;
            return ! 1
        },
        val: function(a) {
            var b,
            c,
            d,
            e = this[0];
            if (!arguments.length) {
                if (e) return b = jQuery.valHooks[e.type] || jQuery.valHooks[e.nodeName.toLowerCase()],
                b && "get" in b && (c = b.get(e, "value")) !== undefined ? c: (c = e.value, typeof c == "string" ? c.replace(rreturn, "") : c == null ? "": c);
                return
            }
            return d = jQuery.isFunction(a),
            this.each(function(c) {
                var e,
                f = jQuery(this);
                if (this.nodeType !== 1) return;
                d ? e = a.call(this, c, f.val()) : e = a,
                e == null ? e = "": typeof e == "number" ? e += "": jQuery.isArray(e) && (e = jQuery.map(e, 
                function(a) {
                    return a == null ? "": a + ""
                })),
                b = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!b || !("set" in b) || b.set(this, e, "value") === undefined) this.value = e
            })
        }
    }),
    jQuery.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return ! b || b.specified ? a.value: a.text
                }
            },
            select: {
                get: function(a) {
                    var b,
                    c,
                    d = a.options,
                    e = a.selectedIndex,
                    f = a.type === "select-one" || e < 0,
                    g = f ? null: [],
                    h = f ? e + 1: d.length,
                    i = e < 0 ? h: f ? e: 0;
                    for (; i < h; i++) {
                        c = d[i];
                        if ((c.selected || i === e) && (jQuery.support.optDisabled ? !c.disabled: c.getAttribute("disabled") === null) && (!c.parentNode.disabled || !jQuery.nodeName(c.parentNode, "optgroup"))) {
                            b = jQuery(c).val();
                            if (f) return b;
                            g.push(b)
                        }
                    }
                    return g
                },
                set: function(a, b) {
                    var c,
                    d,
                    e = a.options,
                    f = jQuery.makeArray(b),
                    g = e.length;
                    while (g--) {
                        d = e[g];
                        if (d.selected = jQuery.inArray(jQuery(d).val(), f) >= 0) c = !0
                    }
                    return c || (a.selectedIndex = -1),
                    f
                }
            }
        },
        attr: function(a, b, c) {
            var d,
            e,
            f = a.nodeType;
            if (!a || f === 3 || f === 8 || f === 2) return;
            if (typeof a.getAttribute === core_strundefined) return jQuery.prop(a, b, c);
            if (f !== 1 || !jQuery.isXMLDoc(a)) b = b.toLowerCase(),
            d = jQuery.attrHooks[b] || (jQuery.expr.match.boolean.test(b) ? boolHook: nodeHook);
            if (c === undefined) return d && "get" in d && (e = d.get(a, b)) !== null ? e: (e = jQuery.find.attr(a, b), e == null ? undefined: e);
            if (c === null) jQuery.removeAttr(a, b);
            else return d && "set" in d && (e = d.set(a, c, b)) !== undefined ? e: (a.setAttribute(b, c + ""), c)
        },
        removeAttr: function(a, b) {
            var c,
            d,
            e = 0,
            f = b && b.match(core_rnotwhite);
            if (f && a.nodeType === 1) while (c = f[e++]) d = jQuery.propFix[c] || c,
            jQuery.expr.match.boolean.test(c) && (a[d] = !1),
            a.removeAttribute(c)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!jQuery.support.radioValue && b === "radio" && jQuery.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b),
                        c && (a.value = c),
                        b
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d,
            e,
            f,
            g = a.nodeType;
            if (!a || g === 3 || g === 8 || g === 2) return;
            return f = g !== 1 || !jQuery.isXMLDoc(a),
            f && (b = jQuery.propFix[b] || b, e = jQuery.propHooks[b]),
            c !== undefined ? e && "set" in e && (d = e.set(a, c, b)) !== undefined ? d: a[b] = c: e && "get" in e && (d = e.get(a, b)) !== null ? d: a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    return a.hasAttribute("tabindex") || rfocusable.test(a.nodeName) || a.href ? a.tabIndex: -1
                }
            }
        }
    }),
    boolHook = {
        set: function(a, b, c) {
            return b === !1 ? jQuery.removeAttr(a, c) : a.setAttribute(c, c),
            c
        }
    },
    jQuery.each(jQuery.expr.match.boolean.source.match(/\w+/g), 
    function(a, b) {
        var c = jQuery.expr.attrHandle[b] || jQuery.find.attr;
        jQuery.expr.attrHandle[b] = function(a, b, d) {
            var e = jQuery.expr.attrHandle[b],
            f = d ? undefined: (jQuery.expr.attrHandle[b] = undefined) != c(a, b, d) ? b.toLowerCase() : null;
            return jQuery.expr.attrHandle[b] = e,
            f
        }
    }),
    jQuery.support.optSelected || (jQuery.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex,
            null
        }
    }),
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], 
    function() {
        jQuery.propFix[this.toLowerCase()] = this
    }),
    jQuery.each(["radio", "checkbox"], 
    function() {
        jQuery.valHooks[this] = {
            set: function(a, b) {
                if (jQuery.isArray(b)) return a.checked = jQuery.inArray(jQuery(a).val(), b) >= 0
            }
        },
        jQuery.support.checkOn || (jQuery.valHooks[this].get = function(a) {
            return a.getAttribute("value") === null ? "on": a.value
        })
    });
    var rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|contextmenu)|click/,
    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q = data_priv.get(a);
            if (!q) return;
            c.handler && (f = c, c = f.handler, e = f.selector),
            c.guid || (c.guid = jQuery.guid++),
            (i = q.events) || (i = q.events = {}),
            (g = q.handle) || (g = q.handle = function(a) {
                return typeof jQuery === core_strundefined || !!a && jQuery.event.triggered === a.type ? undefined: jQuery.event.dispatch.apply(g.elem, arguments)
            },
            g.elem = a),
            b = (b || "").match(core_rnotwhite) || [""],
            j = b.length;
            while (j--) {
                h = rtypenamespace.exec(b[j]) || [],
                n = p = h[1],
                o = (h[2] || "").split(".").sort();
                if (!n) continue;
                l = jQuery.event.special[n] || {},
                n = (e ? l.delegateType: l.bindType) || n,
                l = jQuery.event.special[n] || {},
                k = jQuery.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && jQuery.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                },
                f),
                (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, (!l.setup || l.setup.call(a, d, o, g) === !1) && a.addEventListener && a.addEventListener(n, g, !1)),
                l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)),
                e ? m.splice(m.delegateCount++, 0, k) : m.push(k),
                jQuery.event.global[n] = !0
            }
            a = null
        },
        remove: function(a, b, c, d, e) {
            var f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q = data_priv.hasData(a) && data_priv.get(a);
            if (!q || !(i = q.events)) return;
            b = (b || "").match(core_rnotwhite) || [""],
            j = b.length;
            while (j--) {
                h = rtypenamespace.exec(b[j]) || [],
                n = p = h[1],
                o = (h[2] || "").split(".").sort();
                if (!n) {
                    for (n in i) jQuery.event.remove(a, n + b[j], c, d, !0);
                    continue
                }
                l = jQuery.event.special[n] || {},
                n = (d ? l.delegateType: l.bindType) || n,
                m = i[n] || [],
                h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                g = f = m.length;
                while (f--) k = m[f],
                (e || p === k.origType) && (!c || c.guid === k.guid) && (!h || h.test(k.namespace)) && (!d || d === k.selector || d === "**" && k.selector) && (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                g && !m.length && ((!l.teardown || l.teardown.call(a, o, q.handle) === !1) && jQuery.removeEvent(a, n, q.handle), delete i[n])
            }
            jQuery.isEmptyObject(i) && (delete q.handle, data_priv.remove(a, "events"))
        },
        trigger: function(a, b, c, d) {
            var e,
            f,
            g,
            h,
            i,
            j,
            k,
            l = [c || document],
            m = core_hasOwn.call(a, "type") ? a.type: a,
            n = core_hasOwn.call(a, "namespace") ? a.namespace.split(".") : [];
            f = g = c = c || document;
            if (c.nodeType === 3 || c.nodeType === 8) return;
            if (rfocusMorph.test(m + jQuery.event.triggered)) return;
            m.indexOf(".") >= 0 && (n = m.split("."), m = n.shift(), n.sort()),
            i = m.indexOf(":") < 0 && "on" + m,
            a = a[jQuery.expando] ? a: new jQuery.Event(m, typeof a == "object" && a),
            a.isTrigger = d ? 2: 3,
            a.namespace = n.join("."),
            a.namespace_re = a.namespace ? new RegExp("(^|\\.)" + n.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            a.result = undefined,
            a.target || (a.target = c),
            b = b == null ? [a] : jQuery.makeArray(b, [a]),
            k = jQuery.event.special[m] || {};
            if (!d && k.trigger && k.trigger.apply(c, b) === !1) return;
            if (!d && !k.noBubble && !jQuery.isWindow(c)) {
                h = k.delegateType || m,
                rfocusMorph.test(h + m) || (f = f.parentNode);
                for (; f; f = f.parentNode) l.push(f),
                g = f;
                g === (c.ownerDocument || document) && l.push(g.defaultView || g.parentWindow || window)
            }
            e = 0;
            while ((f = l[e++]) && !a.isPropagationStopped()) a.type = e > 1 ? h: k.bindType || m,
            j = (data_priv.get(f, "events") || {})[a.type] && data_priv.get(f, "handle"),
            j && j.apply(f, b),
            j = i && f[i],
            j && jQuery.acceptData(f) && j.apply && j.apply(f, b) === !1 && a.preventDefault();
            return a.type = m,
            !d && !a.isDefaultPrevented() && (!k._default || k._default.apply(l.pop(), b) === !1) && jQuery.acceptData(c) && i && jQuery.isFunction(c[m]) && !jQuery.isWindow(c) && (g = c[i], g && (c[i] = null), jQuery.event.triggered = m, c[m](), jQuery.event.triggered = undefined, g && (c[i] = g)),
            a.result
        },
        dispatch: function(a) {
            a = jQuery.event.fix(a);
            var b,
            c,
            d,
            e,
            f,
            g = [],
            h = core_slice.call(arguments),
            i = (data_priv.get(this, "events") || {})[a.type] || [],
            j = jQuery.event.special[a.type] || {};
            h[0] = a,
            a.delegateTarget = this;
            if (j.preDispatch && j.preDispatch.call(this, a) === !1) return;
            g = jQuery.event.handlers.call(this, a, i),
            b = 0;
            while ((e = g[b++]) && !a.isPropagationStopped()) {
                a.currentTarget = e.elem,
                c = 0;
                while ((f = e.handlers[c++]) && !a.isImmediatePropagationStopped()) if (!a.namespace_re || a.namespace_re.test(f.namespace)) a.handleObj = f,
                a.data = f.data,
                d = ((jQuery.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h),
                d !== undefined && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation())
            }
            return j.postDispatch && j.postDispatch.call(this, a),
            a.result
        },
        handlers: function(a, b) {
            var c,
            d,
            e,
            f,
            g = [],
            h = b.delegateCount,
            i = a.target;
            if (h && i.nodeType && (!a.button || a.type !== "click")) for (; i !== this; i = i.parentNode || this) if (i.disabled !== !0 || a.type !== "click") {
                d = [];
                for (c = 0; c < h; c++) f = b[c],
                e = f.selector + " ",
                d[e] === undefined && (d[e] = f.needsContext ? jQuery(e, this).index(i) >= 0: jQuery.find(e, this, null, [i]).length),
                d[e] && d.push(f);
                d.length && g.push({
                    elem: i,
                    handlers: d
                })
            }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }),
            g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return a.which == null && (a.which = b.charCode != null ? b.charCode: b.keyCode),
                a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c,
                d,
                e,
                f = b.button;
                return a.pageX == null && b.clientX != null && (c = a.target.ownerDocument || document, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)),
                !a.which && f !== undefined && (a.which = f & 1 ? 1: f & 2 ? 3: f & 4 ? 2: 0),
                a
            }
        },
        fix: function(a) {
            if (a[jQuery.expando]) return a;
            var b,
            c,
            d,
            e = a.type,
            f = a,
            g = this.fixHooks[e];
            g || (this.fixHooks[e] = g = rmouseEvent.test(e) ? this.mouseHooks: rkeyEvent.test(e) ? this.keyHooks: {}),
            d = g.props ? this.props.concat(g.props) : this.props,
            a = new jQuery.Event(f),
            b = d.length;
            while (b--) c = d[b],
            a[c] = f[c];
            return a.target.nodeType === 3 && (a.target = a.target.parentNode),
            g.filter ? g.filter(a, f) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) return this.focus(),
                    !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) return this.blur(),
                    !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) return this.click(),
                    !1
                },
                _default: function(a) {
                    return jQuery.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    a.result !== undefined && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = jQuery.extend(new jQuery.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? jQuery.event.trigger(e, null, b) : jQuery.event.dispatch.call(b, e),
            e.isDefaultPrevented() && c.preventDefault()
        }
    },
    jQuery.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    },
    jQuery.Event = function(a, b) {
        if (this instanceof jQuery.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.getPreventDefault && a.getPreventDefault() ? returnTrue: returnFalse) : this.type = a,
        b && jQuery.extend(this, b),
        this.timeStamp = a && a.timeStamp || jQuery.now(),
        this[jQuery.expando] = !0;
        else return new jQuery.Event(a, b)
    },
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = returnTrue,
            a && a.preventDefault && a.preventDefault()
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = returnTrue,
            a && a.stopPropagation && a.stopPropagation()
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue,
            this.stopPropagation()
        }
    },
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    function(a, b) {
        jQuery.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c,
                d = this,
                e = a.relatedTarget,
                f = a.handleObj;
                if (!e || e !== d && !jQuery.contains(d, e)) a.type = f.origType,
                c = f.handler.apply(this, arguments),
                a.type = b;
                return c
            }
        }
    }),
    jQuery.support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    },
    function(a, b) {
        var c = 0,
        d = function(a) {
            jQuery.event.simulate(b, a.target, jQuery.event.fix(a), !0)
        };
        jQuery.event.special[b] = {
            setup: function() {
                c++===0 && document.addEventListener(a, d, !0)
            },
            teardown: function() {--c === 0 && document.removeEventListener(a, d, !0)
            }
        }
    }),
    jQuery.fn.extend({
        on: function(a, b, c, d, e) {
            var f,
            g;
            if (typeof a == "object") {
                typeof b != "string" && (c = c || b, b = undefined);
                for (g in a) this.on(g, b, c, a[g], e);
                return this
            }
            c == null && d == null ? (d = b, c = b = undefined) : d == null && (typeof b == "string" ? (d = c, c = undefined) : (d = c, c = b, b = undefined));
            if (d === !1) d = returnFalse;
            else if (!d) return this;
            return e === 1 && (f = d, d = function(a) {
                return jQuery().off(a),
                f.apply(this, arguments)
            },
            d.guid = f.guid || (f.guid = jQuery.guid++)),
            this.each(function() {
                jQuery.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d,
            e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj,
            jQuery(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace: d.origType, d.selector, d.handler),
            this;
            if (typeof a == "object") {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            if (b === !1 || typeof b == "function") c = b,
            b = undefined;
            return c === !1 && (c = returnFalse),
            this.each(function() {
                jQuery.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                jQuery.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            if (c) return jQuery.event.trigger(a, b, c, !0)
        }
    });
    var isSimple = /^.[^:#\[\.,]*$/,
    rneedsContext = jQuery.expr.match.needsContext,
    guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.fn.extend({
        find: function(a) {
            var b,
            c,
            d,
            e = this.length;
            if (typeof a != "string") return b = this,
            this.pushStack(jQuery(a).filter(function() {
                for (d = 0; d < e; d++) if (jQuery.contains(b[d], this)) return ! 0
            }));
            c = [];
            for (d = 0; d < e; d++) jQuery.find(a, this[d], c);
            return c = this.pushStack(e > 1 ? jQuery.unique(c) : c),
            c.selector = (this.selector ? this.selector + " ": "") + a,
            c
        },
        has: function(a) {
            var b = jQuery(a, this),
            c = b.length;
            return this.filter(function() {
                var a = 0;
                for (; a < c; a++) if (jQuery.contains(this, b[a])) return ! 0
            })
        },
        not: function(a) {
            return this.pushStack(winnow(this, a || [], !0))
        },
        filter: function(a) {
            return this.pushStack(winnow(this, a || [], !1))
        },
        is: function(a) {
            return !! a && (typeof a == "string" ? rneedsContext.test(a) ? jQuery(a, this.context).index(this[0]) >= 0: jQuery.filter(a, this).length > 0: this.filter(a).length > 0)
        },
        closest: function(a, b) {
            var c,
            d = 0,
            e = this.length,
            f = [],
            g = rneedsContext.test(a) || typeof a != "string" ? jQuery(a, b || this.context) : 0;
            for (; d < e; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1: c.nodeType === 1 && jQuery.find.matchesSelector(c, a))) {
                c = f.push(c);
                break
            }
            return this.pushStack(f.length > 1 ? jQuery.unique(f) : f)
        },
        index: function(a) {
            return a ? typeof a == "string" ? core_indexOf.call(jQuery(a), this[0]) : core_indexOf.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length: -1
        },
        add: function(a, b) {
            var c = typeof a == "string" ? jQuery(a, b) : jQuery.makeArray(a && a.nodeType ? [a] : a),
            d = jQuery.merge(this.get(), c);
            return this.pushStack(jQuery.unique(d))
        },
        addBack: function(a) {
            return this.add(a == null ? this.prevObject: this.prevObject.filter(a))
        }
    }),
    jQuery.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b: null
        },
        parents: function(a) {
            return jQuery.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return jQuery.dir(a, "parentNode", c)
        },
        next: function(a) {
            return sibling(a, "nextSibling")
        },
        prev: function(a) {
            return sibling(a, "previousSibling")
        },
        nextAll: function(a) {
            return jQuery.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return jQuery.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return jQuery.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return jQuery.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return jQuery.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return jQuery.sibling(a.firstChild)
        },
        contents: function(a) {
            return jQuery.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document: jQuery.merge([], a.childNodes)
        }
    },
    function(a, b) {
        jQuery.fn[a] = function(c, d) {
            var e = jQuery.map(this, b, c);
            return a.slice( - 5) !== "Until" && (d = c),
            d && typeof d == "string" && (e = jQuery.filter(d, e)),
            this.length > 1 && (guaranteedUnique[a] || jQuery.unique(e), a[0] === "p" && e.reverse()),
            this.pushStack(e)
        }
    }),
    jQuery.extend({
        filter: function(a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"),
            b.length === 1 && d.nodeType === 1 ? jQuery.find.matchesSelector(d, a) ? [d] : [] : jQuery.find.matches(a, jQuery.grep(b, 
            function(a) {
                return a.nodeType === 1
            }))
        },
        dir: function(a, b, c) {
            var d = [],
            e = c !== undefined;
            while ((a = a[b]) && a.nodeType !== 9) if (a.nodeType === 1) {
                if (e && jQuery(a).is(c)) break;
                d.push(a)
            }
            return d
        },
        sibling: function(a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    rtagName = /<([\w:]+)/,
    rhtml = /<|&#?\w+;/,
    rnoInnerhtml = /<(?:script|style|link)/i,
    manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptType = /^$|\/(?:java|ecma)script/i,
    rscriptTypeMasked = /^true\/(.*)/,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    wrapMap.optgroup = wrapMap.option,
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.col = wrapMap.thead,
    wrapMap.th = wrapMap.td,
    jQuery.fn.extend({
        text: function(a) {
            return jQuery.access(this, 
            function(a) {
                return a === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(a))
            },
            null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, 
            function(a) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var b = manipulationTarget(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, 
            function(a) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var b = manipulationTarget(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, 
            function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, 
            function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            var c,
            d = a ? jQuery.filter(a, this) : this,
            e = 0;
            for (; (c = d[e]) != null; e++) ! b && c.nodeType === 1 && jQuery.cleanData(getAll(c)),
            c.parentNode && (b && jQuery.contains(c.ownerDocument, c) && setGlobalEval(getAll(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            var a,
            b = 0;
            for (; (a = this[b]) != null; b++) a.nodeType === 1 && (jQuery.cleanData(getAll(a, !1)), a.textContent = "");
            return this
        },
        clone: function(a, b) {
            return a = a == null ? !1: a,
            b = b == null ? a: b,
            this.map(function() {
                return jQuery.clone(this, a, b)
            })
        },
        html: function(a) {
            return jQuery.access(this, 
            function(a) {
                var b = this[0] || {},
                c = 0,
                d = this.length;
                if (a === undefined && b.nodeType === 1) return b.innerHTML;
                if (typeof a == "string" && !rnoInnerhtml.test(a) && !wrapMap[(rtagName.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; c < d; c++) b = this[c] || {},
                        b.nodeType === 1 && (jQuery.cleanData(getAll(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch(e) {}
                }
                b && this.empty().append(a)
            },
            null, a, arguments.length)
        },
        replaceWith: function() {
            var a = jQuery.map(this, 
            function(a) {
                return [a.nextSibling, a.parentNode]
            }),
            b = 0;
            return this.domManip(arguments, 
            function(c) {
                var d = a[b++]
                ,
                e = a[b++];
                e && (jQuery(this).remove(), e.insertBefore(c, d))
            },
            !0),
            b ? this: this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b, c) {
            a = core_concat.apply([], a);
            var d,
            e,
            f,
            g,
            h,
            i,
            j = 0,
            k = this.length,
            l = this,
            m = k - 1,
            n = a[0],
            o = jQuery.isFunction(n);
            if (o || !(k <= 1 || typeof n != "string" || jQuery.support.checkClone || !rchecked.test(n))) return this.each(function(d) {
                var e = l.eq(d);
                o && (a[0] = n.call(this, d, e.html())),
                e.domManip(a, b, c)
            });
            if (k) {
                d = jQuery.buildFragment(a, this[0].ownerDocument, !1, !c && this),
                e = d.firstChild,
                d.childNodes.length === 1 && (d = e);
                if (e) {
                    f = jQuery.map(getAll(d, "script"), disableScript),
                    g = f.length;
                    for (; j < k; j++) h = d,
                    j !== m && (h = jQuery.clone(h, !0, !0), g && jQuery.merge(f, getAll(h, "script"))),
                    b.call(this[j], h, j);
                    if (g) {
                        i = f[f.length - 1].ownerDocument,
                        jQuery.map(f, restoreScript);
                        for (j = 0; j < g; j++) h = f[j],
                        rscriptType.test(h.type || "") && !data_priv.access(h, "globalEval") && jQuery.contains(i, h) && (h.src ? jQuery._evalUrl(h.src) : jQuery.globalEval(h.textContent.replace(rcleanScript, "")))
                    }
                }
            }
            return this
        }
    }),
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(a, b) {
        jQuery.fn[a] = function(a) {
            var c,
            d = [],
            e = jQuery(a),
            f = e.length - 1,
            g = 0;
            for (; g <= f; g++) c = g === f ? this: this.clone(!0),
            jQuery(e[g])[b](c),
            core_push.apply(d, c.get());
            return this.pushStack(d)
        }
    }),
    jQuery.extend({
        clone: function(a, b, c) {
            var d,
            e,
            f,
            g,
            h = a.cloneNode(!0),
            i = jQuery.contains(a.ownerDocument, a);
            if (!jQuery.support.noCloneChecked && (a.nodeType === 1 || a.nodeType === 11) && !jQuery.isXMLDoc(a)) {
                g = getAll(h),
                f = getAll(a);
                for (d = 0, e = f.length; d < e; d++) fixInput(f[d], g[d])
            }
            if (b) if (c) {
                f = f || getAll(a),
                g = g || getAll(h);
                for (d = 0, e = f.length; d < e; d++) cloneCopyEvent(f[d], g[d])
            } else cloneCopyEvent(a, h);
            return g = getAll(h, "script"),
            g.length > 0 && setGlobalEval(g, !i && getAll(a, "script")),
            h
        },
        buildFragment: function(a, b, c, d) {
            var e,
            f,
            g,
            h,
            i,
            j,
            k = 0,
            l = a.length,
            m = b.createDocumentFragment(),
            n = [];
            for (; k < l; k++) {
                e = a[k];
                if (e || e === 0) if (jQuery.type(e) === "object") jQuery.merge(n, e.nodeType ? [e] : e);
                else if (!rhtml.test(e)) n.push(b.createTextNode(e));
                else {
                    f = f || m.appendChild(b.createElement("div")),
                    g = (rtagName.exec(e) || ["", ""])[1].toLowerCase(),
                    h = wrapMap[g] || wrapMap._default,
                    f.innerHTML = h[1] + e.replace(rxhtmlTag, "<$1></$2>") + h[2],
                    j = h[0];
                    while (j--) f = f.firstChild;
                    jQuery.merge(n, f.childNodes),
                    f = m.firstChild,
                    f.textContent = ""
                }
            }
            m.textContent = "",
            k = 0;
            while (e = n[k++]) {
                if (d && jQuery.inArray(e, d) !== -1) continue;
                i = jQuery.contains(e.ownerDocument, e),
                f = getAll(m.appendChild(e), "script"),
                i && setGlobalEval(f);
                if (c) {
                    j = 0;
                    while (e = f[j++]) rscriptType.test(e.type || "") && c.push(e)
                }
            }
            return m
        },
        cleanData: function(a) {
            var b,
            c,
            d,
            e = a.length,
            f = 0,
            g = jQuery.event.special;
            for (; f < e; f++) {
                c = a[f];
                if (jQuery.acceptData(c)) {
                    b = data_priv.access(c);
                    if (b) for (d in b.events) g[d] ? jQuery.event.remove(c, d) : jQuery.removeEvent(c, d, b.handle)
                }
                data_user.discard(c),
                data_priv.discard(c)
            }
        },
        _evalUrl: function(a) {
            return jQuery.ajax({
                url: a,
                type: "GET",
                dataType: "text",
                async: !1,
                global: !1,
                success: jQuery.globalEval
            })
        }
    }),
    jQuery.fn.extend({
        wrapAll: function(a) {
            var b;
            return jQuery.isFunction(a) ? this.each(function(b) {
                jQuery(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = jQuery(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                var a = this;
                while (a.firstElementChild) a = a.firstElementChild;
                return a
            }).append(this)), this)
        },
        wrapInner: function(a) {
            return jQuery.isFunction(a) ? this.each(function(b) {
                jQuery(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = jQuery(this),
                c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = jQuery.isFunction(a);
            return this.each(function(c) {
                jQuery(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var curCSS,
    iframe,
    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rmargin = /^margin/,
    rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
    rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
    rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
    elemdisplay = {
        BODY: "block"
    },
    cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
    cssNormalTransform = {
        letterSpacing: 0,
        fontWeight: 400
    },
    cssExpand = ["Top", "Right", "Bottom", "Left"],
    cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    jQuery.fn.extend({
        css: function(a, b) {
            return jQuery.access(this, 
            function(a, b, c) {
                var d,
                e,
                f = {},
                g = 0;
                if (jQuery.isArray(b)) {
                    d = getStyles(a),
                    e = b.length;
                    for (; g < e; g++) f[b[g]] = jQuery.css(a, b[g], !1, d);
                    return f
                }
                return c !== undefined ? jQuery.style(a, b, c) : jQuery.css(a, b)
            },
            a, b, arguments.length > 1)
        },
        show: function() {
            return showHide(this, !0)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(a) {
            var b = typeof a == "boolean";
            return this.each(function() { (b ? a: isHidden(this)) ? jQuery(this).show() : jQuery(this).hide()
            })
        }
    }),
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = curCSS(a, "opacity");
                        return c === "" ? "1": c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(a, b, c, d) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return;
            var e,
            f,
            g,
            h = jQuery.camelCase(b),
            i = a.style;
            b = jQuery.cssProps[h] || (jQuery.cssProps[h] = vendorPropName(i, h)),
            g = jQuery.cssHooks[b] || jQuery.cssHooks[h];
            if (c === undefined) return g && "get" in g && (e = g.get(a, !1, d)) !== undefined ? e: i[b];
            f = typeof c,
            f === "string" && (e = rrelNum.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(jQuery.css(a, b)), f = "number");
            if (c == null || f === "number" && isNaN(c)) return;
            f === "number" && !jQuery.cssNumber[h] && (c += "px"),
            !jQuery.support.clearCloneStyle && c === "" && b.indexOf("background") === 0 && (i[b] = "inherit");
            if (!g || !("set" in g) || (c = g.set(a, c, d)) !== undefined) i[b] = c
        },
        css: function(a, b, c, d) {
            var e,
            f,
            g,
            h = jQuery.camelCase(b);
            return b = jQuery.cssProps[h] || (jQuery.cssProps[h] = vendorPropName(a.style, h)),
            g = jQuery.cssHooks[b] || jQuery.cssHooks[h],
            g && "get" in g && (e = g.get(a, !0, c)),
            e === undefined && (e = curCSS(a, b, d)),
            e === "normal" && b in cssNormalTransform && (e = cssNormalTransform[b]),
            c === "" || c ? (f = parseFloat(e), c === !0 || jQuery.isNumeric(f) ? f || 0: e) : e
        }
    }),
    curCSS = function(a, b, c) {
        var d,
        e,
        f,
        g = c || getStyles(a),
        h = g ? g.getPropertyValue(b) || g[b] : undefined,
        i = a.style;
        return g && (h === "" && !jQuery.contains(a.ownerDocument, a) && (h = jQuery.style(a, b)), rnumnonpx.test(h) && rmargin.test(b) && (d = i.width, e = i.minWidth, f = i.maxWidth, i.minWidth = i.maxWidth = i.width = h, h = g.width, i.width = d, i.minWidth = e, i.maxWidth = f)),
        h
    },
    jQuery.each(["height", "width"], 
    function(a, b) {
        jQuery.cssHooks[b] = {
            get: function(a, c, d) {
                if (c) return a.offsetWidth === 0 && rdisplayswap.test(jQuery.css(a, "display")) ? jQuery.swap(a, cssShow, 
                function() {
                    return getWidthOrHeight(a, b, d)
                }) : getWidthOrHeight(a, b, d)
            },
            set: function(a, c, d) {
                var e = d && getStyles(a);
                return setPositiveNumber(a, c, d ? augmentWidthOrHeight(a, b, d, jQuery.support.boxSizing && jQuery.css(a, "boxSizing", !1, e) === "border-box", e) : 0)
            }
        }
    }),
    jQuery(function() {
        jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
            get: function(a, b) {
                if (b) return jQuery.swap(a, {
                    display: "inline-block"
                },
                curCSS, [a, "marginRight"])
            }
        }),
        !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each(["top", "left"], 
        function(a, b) {
            jQuery.cssHooks[b] = {
                get: function(a, c) {
                    if (c) return c = curCSS(a, b),
                    rnumnonpx.test(c) ? jQuery(a).position()[b] + "px": c
                }
            }
        })
    }),
    jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0
    },
    jQuery.expr.filters.visible = function(a) {
        return ! jQuery.expr.filters.hidden(a)
    }),
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    },
    function(a, b) {
        jQuery.cssHooks[a + b] = {
            expand: function(c) {
                var d = 0,
                e = {},
                f = typeof c == "string" ? c.split(" ") : [c];
                for (; d < 4; d++) e[a + cssExpand[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        },
        rmargin.test(a) || (jQuery.cssHooks[a + b].set = setPositiveNumber)
    });
    var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = jQuery.prop(this, "elements");
                return a ? jQuery.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(a) && (this.checked || !manipulation_rcheckableType.test(a))
            }).map(function(a, b) {
                var c = jQuery(this).val();
                return c == null ? null: jQuery.isArray(c) ? jQuery.map(c, 
                function(a) {
                    return {
                        name: b.name,
                        value: a.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    }),
    jQuery.param = function(a, b) {
        var c,
        d = [],
        e = function(a, b) {
            b = jQuery.isFunction(b) ? b() : b == null ? "": b,
            d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        b === undefined && (b = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional);
        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, 
        function() {
            e(this.name, this.value)
        });
        else for (c in a) buildParams(c, a[c], b, e);
        return d.join("&").replace(r20, "+")
    },
    jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), 
    function(a, b) {
        jQuery.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }),
    jQuery.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return arguments.length === 1 ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var ajaxLocParts,
    ajaxLocation,
    ajax_nonce = jQuery.now(),
    ajax_rquery = /\?/,
    rhash = /#.*$/,
    rts = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    _load = jQuery.fn.load,
    prefilters = {},
    transports = {},
    allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href
    } catch(e) {
        ajaxLocation = document.createElement("a"),
        ajaxLocation.href = "",
        ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [],
    jQuery.fn.load = function(a, b, c) {
        if (typeof a != "string" && _load) return _load.apply(this, arguments);
        var d,
        e,
        f,
        g = this,
        h = a.indexOf(" ");
        return h >= 0 && (d = a.slice(h), a = a.slice(0, h)),
        jQuery.isFunction(b) ? (c = b, b = undefined) : b && typeof b == "object" && (e = "POST"),
        g.length > 0 && jQuery.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments,
            g.html(d ? jQuery("<div>").append(jQuery.parseHTML(a)).find(d) : a)
        }).complete(c && 
        function(a, b) {
            g.each(c, f || [a.responseText, b, a])
        }),
        this
    },
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], 
    function(a, b) {
        jQuery.fn[b] = function(a) {
            return this.on(b, a)
        }
    }),
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? ajaxExtend(ajaxExtend(a, jQuery.ajaxSettings), b) : ajaxExtend(jQuery.ajaxSettings, a)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(a, b) {
            function w(a, b, f, h) {
                var j,
                q,
                r,
                t,
                v,
                w = b;
                if (s === 2) return;
                s = 2,
                g && clearTimeout(g),
                c = undefined,
                e = h || "",
                u.readyState = a > 0 ? 4: 0,
                j = a >= 200 && a < 300 || a === 304,
                f && (t = ajaxHandleResponses(k, u, f)),
                t = ajaxConvert(k, t, u, j);
                if (j) k.ifModified && (v = u.getResponseHeader("Last-Modified"), v && (jQuery.lastModified[d] = v), v = u.getResponseHeader("etag"), v && (jQuery.etag[d] = v)),
                a === 204 ? w = "nocontent": a === 304 ? w = "notmodified": (w = t.state, q = t.data, r = t.error, j = !r);
                else {
                    r = w;
                    if (a || !w) w = "error",
                    a < 0 && (a = 0)
                }
                u.status = a,
                u.statusText = (b || w) + "",
                j ? n.resolveWith(l, [q, w, u]) : n.rejectWith(l, [u, w, r]),
                u.statusCode(p),
                p = undefined,
                i && m.trigger(j ? "ajaxSuccess": "ajaxError", [u, k, j ? q: r]),
                o.fireWith(l, [u, w]),
                i && (m.trigger("ajaxComplete", [u, k]), --jQuery.active || jQuery.event.trigger("ajaxStop"))
            }
            typeof a == "object" && (b = a, a = undefined),
            b = b || {};
            var c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k = jQuery.ajaxSetup({},
            b),
            l = k.context || k,
            m = k.context && (l.nodeType || l.jquery) ? jQuery(l) : jQuery.event,
            n = jQuery.Deferred(),
            o = jQuery.Callbacks("once memory"),
            p = k.statusCode || {},
            q = {},
            r = {},
            s = 0,
            t = "canceled",
            u = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (s === 2) {
                        if (!f) {
                            f = {};
                            while (b = rheaders.exec(e)) f[b[1].toLowerCase()] = b[2]
                        }
                        b = f[a.toLowerCase()]
                    }
                    return b == null ? null: b
                },
                getAllResponseHeaders: function() {
                    return s === 2 ? e: null
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return s || (a = r[c] = r[c] || a, q[a] = b),
                    this
                },
                overrideMimeType: function(a) {
                    return s || (k.mimeType = a),
                    this
                },
                statusCode: function(a) {
                    var b;
                    if (a) if (s < 2) for (b in a) p[b] = [p[b], a[b]];
                    else u.always(a[u.status]);
                    return this
                },
                abort: function(a) {
                    var b = a || t;
                    return c && c.abort(b),
                    w(0, b),
                    this
                }
            };
            n.promise(u).complete = o.add,
            u.success = u.done,
            u.error = u.fail,
            k.url = ((a || k.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"),
            k.type = b.method || b.type || k.method || k.type,
            k.dataTypes = jQuery.trim(k.dataType || "*").toLowerCase().match(core_rnotwhite) || [""],
            k.crossDomain == null && (h = rurl.exec(k.url.toLowerCase()), k.crossDomain = !(!h || h[1] === ajaxLocParts[1] && h[2] === ajaxLocParts[2] && (h[3] || (h[1] === "http:" ? "80": "443")) === (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80": "443")))),
            k.data && k.processData && typeof k.data != "string" && (k.data = jQuery.param(k.data, k.traditional)),
            inspectPrefiltersOrTransports(prefilters, k, b, u);
            if (s === 2) return u;
            i = k.global,
            i && jQuery.active++===0 && jQuery.event.trigger("ajaxStart"),
            k.type = k.type.toUpperCase(),
            k.hasContent = !rnoContent.test(k.type),
            d = k.url,
            k.hasContent || (k.data && (d = k.url += (ajax_rquery.test(d) ? "&": "?") + k.data, delete k.data), k.cache === !1 && (k.url = rts.test(d) ? d.replace(rts, "$1_=" + ajax_nonce++) : d + (ajax_rquery.test(d) ? "&": "?") + "_=" + ajax_nonce++)),
            k.ifModified && (jQuery.lastModified[d] && u.setRequestHeader("If-Modified-Since", jQuery.lastModified[d]), jQuery.etag[d] && u.setRequestHeader("If-None-Match", jQuery.etag[d])),
            (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && u.setRequestHeader("Content-Type", k.contentType),
            u.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + (k.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01": "") : k.accepts["*"]);
            for (j in k.headers) u.setRequestHeader(j, k.headers[j]);
            if (!k.beforeSend || k.beforeSend.call(l, u, k) !== !1 && s !== 2) {
                t = "abort";
                for (j in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) u[j](k[j]);
                c = inspectPrefiltersOrTransports(transports, k, b, u);
                if (!c) w( - 1, "No Transport");
                else {
                    u.readyState = 1,
                    i && m.trigger("ajaxSend", [u, k]),
                    k.async && k.timeout > 0 && (g = setTimeout(function() {
                        u.abort("timeout")
                    },
                    k.timeout));
                    try {
                        s = 1,
                        c.send(q, w)
                    } catch(v) {
                        if (s < 2) w( - 1, v);
                        else throw v
                    }
                }
                return u
            }
            return u.abort()
        },
        getJSON: function(a, b, c) {
            return jQuery.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return jQuery.get(a, undefined, b, "script")
        }
    }),
    jQuery.each(["get", "post"], 
    function(a, b) {
        jQuery[b] = function(a, c, d, e) {
            return jQuery.isFunction(c) && (e = e || d, d = c, c = undefined),
            jQuery.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }),
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return jQuery.globalEval(a),
                a
            }
        }
    }),
    jQuery.ajaxPrefilter("script", 
    function(a) {
        a.cache === undefined && (a.cache = !1),
        a.crossDomain && (a.type = "GET")
    }),
    jQuery.ajaxTransport("script", 
    function(a) {
        if (a.crossDomain) {
            var b,
            c;
            return {
                send: function(d, e) {
                    b = jQuery("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(),
                        c = null,
                        a && e(a.type === "error" ? 404: 200, a.type)
                    }),
                    document.head.appendChild(b[0])
                },
                abort: function() {
                    c && c()
                }
            }
        }
    });
    var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = oldCallbacks.pop() || jQuery.expando + "_" + ajax_nonce++;
            return this[a] = !0,
            a
        }
    }),
    jQuery.ajaxPrefilter("json jsonp", 
    function(a, b, c) {
        var d,
        e,
        f,
        g = a.jsonp !== !1 && (rjsonp.test(a.url) ? "url": typeof a.data == "string" && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(a.data) && "data");
        if (g || a.dataTypes[0] === "jsonp") return d = a.jsonpCallback = jQuery.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback,
        g ? a[g] = a[g].replace(rjsonp, "$1" + d) : a.jsonp !== !1 && (a.url += (ajax_rquery.test(a.url) ? "&": "?") + a.jsonp + "=" + d),
        a.converters["script json"] = function() {
            return f || jQuery.error(d + " was not called"),
            f[0]
        },
        a.dataTypes[0] = "json",
        e = window[d],
        window[d] = function() {
            f = arguments
        },
        c.always(function() {
            window[d] = e,
            a[d] && (a.jsonpCallback = b.jsonpCallback, oldCallbacks.push(d)),
            f && jQuery.isFunction(e) && e(f[0]),
            f = e = undefined
        }),
        "script"
    }),
    jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch(a) {}
    };
    var xhrSupported = jQuery.ajaxSettings.xhr(),
    xhrSuccessStatus = {
        0: 200,
        1223: 204
    },
    xhrId = 0,
    xhrCallbacks = {};
    window.ActiveXObject && jQuery(window).on("unload", 
    function() {
        for (var a in xhrCallbacks) xhrCallbacks[a]();
        xhrCallbacks = undefined
    }),
    jQuery.support.cors = !!xhrSupported && "withCredentials" in xhrSupported,
    jQuery.support.ajax = xhrSupported = !!xhrSupported,
    jQuery.ajaxTransport(function(a) {
        var b;
        if (jQuery.support.cors || xhrSupported && !a.crossDomain) return {
            send: function(c, d) {
                var e,
                f,
                g = a.xhr();
                g.open(a.type, a.url, a.async, a.username, a.password);
                if (a.xhrFields) for (e in a.xhrFields) g[e] = a.xhrFields[e];
                a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType),
                !a.crossDomain && !c["X-Requested-With"] && (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c) g.setRequestHeader(e, c[e]);
                b = function(a) {
                    return function() {
                        b && (delete xhrCallbacks[f], b = g.onload = g.onerror = null, a === "abort" ? g.abort() : a === "error" ? d(g.status || 404, g.statusText) : d(xhrSuccessStatus[g.status] || g.status, g.statusText, typeof g.responseText == "string" ? {
                            text: g.responseText
                        }: undefined, g.getAllResponseHeaders()))
                    }
                },
                g.onload = b(),
                g.onerror = b("error"),
                b = xhrCallbacks[f = xhrId++] = b("abort"),
                g.send(a.hasContent && a.data || null)
            },
            abort: function() {
                b && b()
            }
        }
    });
    var fxNow,
    timerId,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
    rrun = /queueHooks$/,
    animationPrefilters = [defaultPrefilter],
    tweeners = {
        "*": [function(a, b) {
            var c,
            d,
            e = this.createTween(a, b),
            f = rfxnum.exec(b),
            g = e.cur(),
            h = +g || 0,
            i = 1,
            j = 20;
            if (f) {
                c = +f[2],
                d = f[3] || (jQuery.cssNumber[a] ? "": "px");
                if (d !== "px" && h) {
                    h = jQuery.css(e.elem, a, !0) || c || 1;
                    do i = i || ".5",
                    h /= i,
                    jQuery.style(e.elem, a, h + d);
                    while (i !== (i = e.cur() / g) && i !== 1 && --j)
                }
                e.unit = d,
                e.start = h,
                e.end = f[1] ? h + (f[1] + 1) * c: c
            }
            return e
        }]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(a, b) {
            jQuery.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            var c,
            d = 0,
            e = a.length;
            for (; d < e; d++) c = a[d],
            tweeners[c] = tweeners[c] || [],
            tweeners[c].unshift(b)
        },
        prefilter: function(a, b) {
            b ? animationPrefilters.unshift(a) : animationPrefilters.push(a)
        }
    }),
    jQuery.Tween = Tween,
    Tween.prototype = {
        constructor: Tween,
        init: function(a, b, c, d, e, f) {
            this.elem = a,
            this.prop = c,
            this.easing = e || "swing",
            this.options = b,
            this.start = this.now = this.cur(),
            this.end = d,
            this.unit = f || (jQuery.cssNumber[c] ? "": "px")
        },
        cur: function() {
            var a = Tween.propHooks[this.prop];
            return a && a.get ? a.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(a) {
            var b,
            c = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = b = jQuery.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a,
            this.now = (this.end - this.start) * b + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this) : Tween.propHooks._default.set(this),
            this
        }
    },
    Tween.prototype.init.prototype = Tween.prototype,
    Tween.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return a.elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null ? (b = jQuery.css(a.elem, a.prop, ""), !b || b === "auto" ? 0: b) : a.elem[a.prop]
            },
            set: function(a) {
                jQuery.fx.step[a.prop] ? jQuery.fx.step[a.prop](a) : a.elem.style && (a.elem.style[jQuery.cssProps[a.prop]] != null || jQuery.cssHooks[a.prop]) ? jQuery.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    },
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    },
    jQuery.each(["toggle", "show", "hide"], 
    function(a, b) {
        var c = jQuery.fn[b];
        jQuery.fn[b] = function(a, d, e) {
            return a == null || typeof a == "boolean" ? c.apply(this, arguments) : this.animate(genFx(b, !0), a, d, e)
        }
    }),
    jQuery.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: b
            },
            a, c, d)
        },
        animate: function(a, b, c, d) {
            var e = jQuery.isEmptyObject(a),
            f = jQuery.speed(b, c, d),
            g = function() {
                var b = Animation(this, jQuery.extend({},
                a), f);
                g.finish = function() {
                    b.stop(!0)
                },
                (e || data_priv.get(this, "finish")) && b.stop(!0)
            };
            return g.finish = g,
            e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop,
                b(c)
            };
            return typeof a != "string" && (c = b, b = a, a = undefined),
            b && a !== !1 && this.queue(a || "fx", []),
            this.each(function() {
                var b = !0,
                e = a != null && a + "queueHooks",
                f = jQuery.timers,
                g = data_priv.get(this);
                if (e) g[e] && g[e].stop && d(g[e]);
                else for (e in g) g[e] && g[e].stop && rrun.test(e) && d(g[e]);
                for (e = f.length; e--;) f[e].elem === this && (a == null || f[e].queue === a) && (f[e].anim.stop(c), b = !1, f.splice(e, 1)); (b || !c) && jQuery.dequeue(this, a)
            })
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"),
            this.each(function() {
                var b,
                c = data_priv.get(this),
                d = c[a + "queue"],
                e = c[a + "queueHooks"],
                f = jQuery.timers,
                g = d ? d.length: 0;
                c.finish = !0,
                jQuery.queue(this, a, []),
                e && e.cur && e.cur.finish && e.cur.finish.call(this);
                for (b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }),
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    },
    function(a, b) {
        jQuery.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }),
    jQuery.speed = function(a, b, c) {
        var d = a && typeof a == "object" ? jQuery.extend({},
        a) : {
            complete: c || !c && b || jQuery.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !jQuery.isFunction(b) && b
        };
        d.duration = jQuery.fx.off ? 0: typeof d.duration == "number" ? d.duration: d.duration in jQuery.fx.speeds ? jQuery.fx.speeds[d.duration] : jQuery.fx.speeds._default;
        if (d.queue == null || d.queue === !0) d.queue = "fx";
        return d.old = d.complete,
        d.complete = function() {
            jQuery.isFunction(d.old) && d.old.call(this),
            d.queue && jQuery.dequeue(this, d.queue)
        },
        d
    },
    jQuery.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return.5 - Math.cos(a * Math.PI) / 2
        }
    },
    jQuery.timers = [],
    jQuery.fx = Tween.prototype.init,
    jQuery.fx.tick = function() {
        var a,
        b = jQuery.timers,
        c = 0;
        fxNow = jQuery.now();
        for (; c < b.length; c++) a = b[c],
        !a() && b[c] === a && b.splice(c--, 1);
        b.length || jQuery.fx.stop(),
        fxNow = undefined
    },
    jQuery.fx.timer = function(a) {
        a() && jQuery.timers.push(a) && jQuery.fx.start()
    },
    jQuery.fx.interval = 13,
    jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
    },
    jQuery.fx.stop = function() {
        clearInterval(timerId),
        timerId = null
    },
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    jQuery.fx.step = {},
    jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function(a) {
        return jQuery.grep(jQuery.timers, 
        function(b) {
            return a === b.elem
        }).length
    }),
    jQuery.fn.offset = function(a) {
        if (arguments.length) return a === undefined ? this: this.each(function(b) {
            jQuery.offset.setOffset(this, a, b)
        });
        var b,
        c,
        d = this[0],
        e = {
            top: 0,
            left: 0
        },
        f = d && d.ownerDocument;
        if (!f) return;
        return b = f.documentElement,
        jQuery.contains(b, d) ? (typeof d.getBoundingClientRect !== core_strundefined && (e = d.getBoundingClientRect()), c = getWindow(f), {
            top: e.top + c.pageYOffset - b.clientTop,
            left: e.left + c.pageXOffset - b.clientLeft
        }) : e
    },
    jQuery.offset = {
        setOffset: function(a, b, c) {
            var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k = jQuery.css(a, "position"),
            l = jQuery(a),
            m = {};
            k === "static" && (a.style.position = "relative"),
            h = l.offset(),
            f = jQuery.css(a, "top"),
            i = jQuery.css(a, "left"),
            j = (k === "absolute" || k === "fixed") && (f + i).indexOf("auto") > -1,
            j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0),
            jQuery.isFunction(b) && (b = b.call(a, c, h)),
            b.top != null && (m.top = b.top - h.top + g),
            b.left != null && (m.left = b.left - h.left + e),
            "using" in b ? b.using.call(a, m) : l.css(m)
        }
    },
    jQuery.fn.extend({
        position: function() {
            if (!this[0]) return;
            var a,
            b,
            c = this[0],
            d = {
                top: 0,
                left: 0
            };
            return jQuery.css(c, "position") === "fixed" ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), jQuery.nodeName(a[0], "html") || (d = a.offset()), d.top += jQuery.css(a[0], "borderTopWidth", !0), d.left += jQuery.css(a[0], "borderLeftWidth", !0)),
            {
                top: b.top - d.top - jQuery.css(c, "marginTop", !0),
                left: b.left - d.left - jQuery.css(c, "marginLeft", !0)
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || docElem;
                while (a && !jQuery.nodeName(a, "html") && jQuery.css(a, "position") === "static") a = a.offsetParent;
                return a || docElem
            })
        }
    }),
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    },
    function(a, b) {
        var c = "pageYOffset" === b;
        jQuery.fn[a] = function(d) {
            return jQuery.access(this, 
            function(a, d, e) {
                var f = getWindow(a);
                if (e === undefined) return f ? f[b] : a[d];
                f ? f.scrollTo(c ? window.pageXOffset: e, c ? e: window.pageYOffset) : a[d] = e
            },
            a, d, arguments.length, null)
        }
    }),
    jQuery.each({
        Height: "height",
        Width: "width"
    },
    function(a, b) {
        jQuery.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        },
        function(c, d) {
            jQuery.fn[d] = function(d, e) {
                var f = arguments.length && (c || typeof d != "boolean"),
                g = c || (d === !0 || e === !0 ? "margin": "border");
                return jQuery.access(this, 
                function(b, c, d) {
                    var e;
                    return jQuery.isWindow(b) ? b.document.documentElement["client" + a] : b.nodeType === 9 ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : d === undefined ? jQuery.css(b, c, g) : jQuery.style(b, c, d, g)
                },
                b, f ? d: undefined, f, null)
            }
        })
    }),
    jQuery.fn.size = function() {
        return this.length
    },
    jQuery.fn.andSelf = jQuery.fn.addBack,
    typeof module == "object" && typeof module.exports == "object" ? module.exports = jQuery: typeof define == "function" && define.amd && define("jquery", [], 
    function() {
        return jQuery
    }),
    typeof window == "object" && typeof window.document == "object" && (window.jQuery = window.$ = jQuery)
})(window),
jQuery.migrateMute === void 0 && (jQuery.migrateMute = !0),
function(a, b, c) {
    function d(c) {
        f[c] || (f[c] = !0, a.migrateWarnings.push(c), b.console && console.warn && !a.migrateMute && (console.warn("JQMIGRATE: " + c), a.migrateTrace && console.trace && console.trace()))
    }
    function e(b, e, f, g) {
        if (Object.defineProperty) try {
            return Object.defineProperty(b, e, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return d(g),
                    f
                },
                set: function(a) {
                    d(g),
                    f = a
                }
            }),
            c
        } catch(h) {}
        a._definePropertyBroken = !0,
        b[e] = f
    }
    var f = {};
    a.migrateWarnings = [],
    !a.migrateMute && b.console && console.log && console.log("JQMIGRATE: Logging is active"),
    a.migrateTrace === c && (a.migrateTrace = !0),
    a.migrateReset = function() {
        f = {},
        a.migrateWarnings.length = 0
    },
    "BackCompat" === document.compatMode && d("jQuery is not compatible with Quirks Mode");
    var g = a("<input/>", {
        size: 1
    }).attr("size") && a.attrFn,
    h = a.attr,
    i = a.attrHooks.value && a.attrHooks.value.get || 
    function() {
        return null
    },
    j = a.attrHooks.value && a.attrHooks.value.set || 
    function() {
        return c
    },
    k = /^(?:input|button)$/i,
    l = /^[238]$/,
    m = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    n = /^(?:checked|selected)$/i;
    e(a, "attrFn", g || {},
    "jQuery.attrFn is deprecated"),
    a.attr = function(b, e, f, i) {
        var j = e.toLowerCase(),
        o = b && b.nodeType;
        return i && (4 > h.length && d("jQuery.fn.attr( props, pass ) is deprecated"), b && !l.test(o) && (g ? e in g: a.isFunction(a.fn[e]))) ? a(b)[e](f) : ("type" === e && f !== c && k.test(b.nodeName) && b.parentNode && d("Can't change the 'type' of an input or button in IE 6/7/8"), !a.attrHooks[j] && m.test(j) && (a.attrHooks[j] = {
            get: function(b, d) {
                var e,
                f = a.prop(b, d);
                return f === !0 || "boolean" != typeof f && (e = b.getAttributeNode(d)) && e.nodeValue !== !1 ? d.toLowerCase() : c
            },
            set: function(b, c, d) {
                var e;
                return c === !1 ? a.removeAttr(b, d) : (e = a.propFix[d] || d, e in b && (b[e] = !0), b.setAttribute(d, d.toLowerCase())),
                d
            }
        },
        n.test(j) && d("jQuery.fn.attr('" + j + "') may use property instead of attribute")), h.call(a, b, e, f))
    },
    a.attrHooks.value = {
        get: function(a, b) {
            var c = (a.nodeName || "").toLowerCase();
            return "button" === c ? i.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value') no longer gets properties"), b in a ? a.value: null)
        },
        set: function(a, b) {
            var e = (a.nodeName || "").toLowerCase();
            return "button" === e ? j.apply(this, arguments) : ("input" !== e && "option" !== e && d("jQuery.fn.attr('value', val) no longer sets properties"), a.value = b, c)
        }
    };
    var o,
    p,
    q = a.fn.init,
    r = a.parseJSON,
    s = /^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;
    a.fn.init = function(b, c, e) {
        var f;
        return b && "string" == typeof b && !a.isPlainObject(c) && (f = s.exec(b)) && f[1] && ("<" !== b.charAt(0) && d("$(html) HTML strings must start with '<' character"), c && c.context && (c = c.context), a.parseHTML) ? q.call(this, a.parseHTML(a.trim(b), c, !0), c, e) : q.apply(this, arguments)
    },
    a.fn.init.prototype = a.fn,
    a.parseJSON = function(a) {
        return a || null === a ? r.apply(this, arguments) : (d("jQuery.parseJSON requires a valid JSON string"), null)
    },
    a.uaMatch = function(a) {
        a = a.toLowerCase();
        var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
        return {
            browser: b[1] || "",
            version: b[2] || "0"
        }
    },
    a.browser || (o = a.uaMatch(navigator.userAgent), p = {},
    o.browser && (p[o.browser] = !0, p.version = o.version), p.chrome ? p.webkit = !0: p.webkit && (p.safari = !0), a.browser = p),
    e(a, "browser", a.browser, "jQuery.browser is deprecated"),
    a.sub = function() {
        function b(a, c) {
            return new b.fn.init(a, c)
        }
        a.extend(!0, b, this),
        b.superclass = this,
        b.fn = b.prototype = this(),
        b.fn.constructor = b,
        b.sub = this.sub,
        b.fn.init = function(d, e) {
            return e && e instanceof a && !(e instanceof b) && (e = b(e)),
            a.fn.init.call(this, d, e, c)
        },
        b.fn.init.prototype = b.fn;
        var c = b(document);
        return d("jQuery.sub() is deprecated"),
        b
    },
    a.ajaxSetup({
        converters: {
            "text json": a.parseJSON
        }
    });
    var t = a.fn.data;
    a.fn.data = function(b) {
        var e,
        f,
        g = this[0];
        return ! g || "events" !== b || 1 !== arguments.length || (e = a.data(g, b), f = a._data(g, b), e !== c && e !== f || f === c) ? t.apply(this, arguments) : (d("Use of jQuery.fn.data('events') is deprecated"), f)
    };
    var u = /\/(java|ecma)script/i,
    v = a.fn.andSelf || a.fn.addBack;
    a.fn.andSelf = function() {
        return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),
        v.apply(this, arguments)
    },
    a.clean || (a.clean = function(b, e, f, g) {
        e = e || document,
        e = !e.nodeType && e[0] || e,
        e = e.ownerDocument || e,
        d("jQuery.clean() is deprecated");
        var h,
        i,
        j,
        k,
        l = [];
        if (a.merge(l, a.buildFragment(b, e).childNodes), f) for (j = function(a) {
            return ! a.type || u.test(a.type) ? g ? g.push(a.parentNode ? a.parentNode.removeChild(a) : a) : f.appendChild(a) : c
        },
        h = 0; null != (i = l[h]); h++) a.nodeName(i, "script") && j(i) || (f.appendChild(i), i.getElementsByTagName !== c && (k = a.grep(a.merge([], i.getElementsByTagName("script")), j), l.splice.apply(l, [h + 1, 0].concat(k)), h += k.length));
        return l
    });
    var w = a.event.add,
    x = a.event.remove,
    y = a.event.trigger,
    z = a.fn.toggle,
    A = a.fn.live,
    B = a.fn.die,
    C = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
    D = RegExp("\\b(?:" + C + ")\\b"),
    E = /(?:^|\s)hover(\.\S+|)\b/,
    F = function(b) {
        return "string" != typeof b || a.event.special.hover ? b: (E.test(b) && d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), b && b.replace(E, "mouseenter$1 mouseleave$1"))
    };
    a.event.props && "attrChange" !== a.event.props[0] && a.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"),
    a.event.dispatch && e(a.event, "handle", a.event.dispatch, "jQuery.event.handle is undocumented and deprecated"),
    a.event.add = function(a, b, c, e, f) {
        a !== document && D.test(b) && d("AJAX events should be attached to document: " + b),
        w.call(this, a, F(b || ""), c, e, f)
    },
    a.event.remove = function(a, b, c, d, e) {
        x.call(this, a, F(b) || "", c, d, e)
    },
    a.fn.error = function() {
        var a = Array.prototype.slice.call(arguments, 0);
        return d("jQuery.fn.error() is deprecated"),
        a.splice(0, 0, "error"),
        arguments.length ? this.bind.apply(this, a) : (this.triggerHandler.apply(this, a), this)
    },
    a.fn.toggle = function(b, c) {
        if (!a.isFunction(b) || !a.isFunction(c)) return z.apply(this, arguments);
        d("jQuery.fn.toggle(handler, handler...) is deprecated");
        var e = arguments,
        f = b.guid || a.guid++,
        g = 0,
        h = function(c) {
            var d = (a._data(this, "lastToggle" + b.guid) || 0) % g;
            return a._data(this, "lastToggle" + b.guid, d + 1),
            c.preventDefault(),
            e[d].apply(this, arguments) || !1
        };
        for (h.guid = f; e.length > g;) e[g++].guid = f;
        return this.click(h)
    },
    a.fn.live = function(b, c, e) {
        return d("jQuery.fn.live() is deprecated"),
        A ? A.apply(this, arguments) : (a(this.context).on(b, this.selector, c, e), this)
    },
    a.fn.die = function(b, c) {
        return d("jQuery.fn.die() is deprecated"),
        B ? B.apply(this, arguments) : (a(this.context).off(b, this.selector || "**", c), this)
    },
    a.event.trigger = function(a, b, c, e) {
        return c || D.test(a) || d("Global events are undocumented and deprecated"),
        y.call(this, a, b, c || document, e)
    },
    a.each(C.split("|"), 
    function(b, c) {
        a.event.special[c] = {
            setup: function() {
                var b = this;
                return b !== 
                document && (a.event.add(document, c + "." + a.guid, 
                function() {
                    a.event.trigger(c, null, b, !0)
                }), a._data(this, c, a.guid++)),
                !1
            },
            teardown: function() {
                return this !== document && a.event.remove(document, c + "." + a._data(this, c)),
                !1
            }
        }
    })
} (jQuery, window),
function(a, b) {
    function e(b, c) {
        var d,
        e,
        g,
        h = b.nodeName.toLowerCase();
        return "area" === h ? (d = b.parentNode, e = d.name, !b.href || !e || d.nodeName.toLowerCase() !== "map" ? !1: (g = a("img[usemap=#" + e + "]")[0], !!g && f(g))) : (/input|select|textarea|button|object/.test(h) ? !b.disabled: "a" === h ? b.href || c: c) && f(b)
    }
    function f(b) {
        return a.expr.filters.visible(b) && !a(b).parents().andSelf().filter(function() {
            return a.css(this, "visibility") === "hidden"
        }).length
    }
    var c = 0,
    d = /^ui-id-\d+$/;
    a.ui = a.ui || {};
    if (a.ui.version) return;
    a.extend(a.ui, {
        version: "1.9.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    a.fn.extend({
        _focus: a.fn.focus,
        focus: function(b, c) {
            return typeof b == "number" ? this.each(function() {
                var d = this;
                setTimeout(function() {
                    a(d).focus(),
                    c && c.call(d)
                },
                b)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var b;
            return a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
            }).eq(0) : b = this.parents().filter(function() {
                return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
            }).eq(0),
            /fixed/.test(this.css("position")) || !b.length ? a(document) : b
        },
        zIndex: function(c) {
            if (c !== b) return this.css("zIndex", c);
            if (this.length) {
                var d = a(this[0]),
                e,
                f;
                while (d.length && d[0] !== document) {
                    e = d.css("position");
                    if (e === "absolute" || e === "relative" || e === "fixed") {
                        f = parseInt(d.css("zIndex"), 10);
                        if (!isNaN(f) && f !== 0) return f
                    }
                    d = d.parent()
                }
            }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++c)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                d.test(this.id) && a(this).removeAttr("id")
            })
        }
    }),
    a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
            return function(c) {
                return !! a.data(c, b)
            }
        }) : function(b, c, d) {
            return !! a.data(b, d[3])
        },
        focusable: function(b) {
            return e(b, !isNaN(a.attr(b, "tabindex")))
        },
        tabbable: function(b) {
            var c = a.attr(b, "tabindex"),
            d = isNaN(c);
            return (d || c >= 0) && e(b, !d)
        }
    }),
    a(function() {
        var b = document.body,
        c = b.appendChild(c = document.createElement("div"));
        c.offsetHeight,
        a.extend(c.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }),
        a.support.minHeight = c.offsetHeight === 100,
        a.support.selectstart = "onselectstart" in c,
        b.removeChild(c).style.display = "none"
    }),
    a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], 
    function(c, d) {
        function h(b, c, d, f) {
            return a.each(e, 
            function() {
                c -= parseFloat(a.css(b, "padding" + this)) || 0,
                d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0),
                f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
            }),
            c
        }
        var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
        f = d.toLowerCase(),
        g = {
            innerWidth: a.fn.innerWidth,
            innerHeight: a.fn.innerHeight,
            outerWidth: a.fn.outerWidth,
            outerHeight: a.fn.outerHeight
        };
        a.fn["inner" + d] = function(c) {
            return c === b ? g["inner" + d].call(this) : this.each(function() {
                a(this).css(f, h(this, c) + "px")
            })
        },
        a.fn["outer" + d] = function(b, c) {
            return typeof b != "number" ? g["outer" + d].call(this, b) : this.each(function() {
                a(this).css(f, h(this, b, !0, c) + "px")
            })
        }
    }),
    a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {
        return function(c) {
            return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
        }
    } (a.fn.removeData)),
    function() {
        var b = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
        a.ui.ie = b.length ? !0: !1,
        a.ui.ie6 = parseFloat(b[1], 10) === 6
    } (),
    a.fn.extend({
        disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart": "mousedown") + ".ui-disableSelection", 
            function(a) {
                a.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }),
    a.extend(a.ui, {
        plugin: {
            add: function(b, c, d) {
                var e,
                f = a.ui[b].prototype;
                for (e in d) f.plugins[e] = f.plugins[e] || [],
                f.plugins[e].push([c, d[e]])
            },
            call: function(a, b, c) {
                var d,
                e = a.plugins[b];
                if (!e || !a.element[0].parentNode || a.element[0].parentNode.nodeType === 11) return;
                for (d = 0; d < e.length; d++) a.options[e[d][0]] && e[d][1].apply(a.element, c)
            }
        },
        contains: a.contains,
        hasScroll: function(b, c) {
            if (a(b).css("overflow") === "hidden") return ! 1;
            var d = c && c === "left" ? "scrollLeft": "scrollTop",
            e = !1;
            return b[d] > 0 ? !0: (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
        },
        isOverAxis: function(a, b, c) {
            return a > b && a < b + c
        },
        isOver: function(b, c, d, e, f, g) {
            return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
        }
    })
} (jQuery),
function(a, b) {
    var c = 0,
    d = Array.prototype.slice,
    e = a.cleanData;
    a.cleanData = function(b) {
        for (var c = 0, d; (d = b[c]) != null; c++) try {
            a(d).triggerHandler("remove")
        } catch(f) {}
        e(b)
    },
    a.widget = function(b, c, d) {
        var e,
        f,
        g,
        h,
        i = b.split(".")[0];
        b = b.split(".")[1],
        e = i + "-" + b,
        d || (d = c, c = a.Widget),
        a.expr[":"][e.toLowerCase()] = function(b) {
            return !! a.data(b, e)
        },
        a[i] = a[i] || {},
        f = a[i][b],
        g = a[i][b] = function(a, b) {
            if (!this._createWidget) return new g(a, b);
            arguments.length && this._createWidget(a, b)
        },
        a.extend(g, f, {
            version: d.version,
            _proto: a.extend({},
            d),
            _childConstructors: []
        }),
        h = new c,
        h.options = a.widget.extend({},
        h.options),
        a.each(d, 
        function(b, e) {
            a.isFunction(e) && (d[b] = function() {
                var a = function() {
                    return c.prototype[b].apply(this, arguments)
                },
                d = function(a) {
                    return c.prototype[b].apply(this, a)
                };
                return function() {
                    var b = this._super,
                    c = this._superApply,
                    f;
                    return this._super = a,
                    this._superApply = d,
                    f = e.apply(this, arguments),
                    this._super = b,
                    this._superApply = c,
                    f
                }
            } ())
        }),
        g.prototype = a.widget.extend(h, {
            widgetEventPrefix: f ? h.widgetEventPrefix: b
        },
        d, {
            constructor: g,
            namespace: i,
            widgetName: b,
            widgetBaseClass: e,
            widgetFullName: e
        }),
        f ? (a.each(f._childConstructors, 
        function(b, c) {
            var d = c.prototype;
            a.widget(d.namespace + "." + d.widgetName, g, c._proto)
        }), delete f._childConstructors) : c._childConstructors.push(g),
        a.widget.bridge(b, g)
    },
    a.widget.extend = function(c) {
        var e = d.call(arguments, 1),
        f = 0,
        g = e.length,
        h,
        i;
        for (; f < g; f++) for (h in e[f]) i = e[f][h],
        e[f].hasOwnProperty(h) && i !== b && (a.isPlainObject(i) ? c[h] = a.isPlainObject(c[h]) ? a.widget.extend({},
        c[h], i) : a.widget.extend({},
        i) : c[h] = i);
        return c
    },
    a.widget.bridge = function(c, e) {
        var f = e.prototype.widgetFullName || c;
        a.fn[c] = function(g) {
            var h = typeof g == "string",
            i = d.call(arguments, 1),
            j = this;
            return g = !h && i.length ? a.widget.extend.apply(null, [g].concat(i)) : g,
            h ? this.each(function() {
                var d,
                e = a.data(this, f);
                if (!e) return a.error("cannot call methods on " + c + " prior to initialization; " + "attempted to call method '" + g + "'");
                if (!a.isFunction(e[g]) || g.charAt(0) === "_") return a.error("no such method '" + g + "' for " + c + " widget instance");
                d = e[g].apply(e, i);
                if (d !== e && d !== b) return j = d && d.jquery ? j.pushStack(d.get()) : d,
                !1
            }) : this.each(function() {
                var b = a.data(this, f);
                b ? b.option(g || {})._init() : a.data(this, f, new e(g, this))
            }),
            j
        }
    },
    a.Widget = function() {},
    a.Widget._childConstructors = [],
    a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(b, d) {
            d = a(d || this.defaultElement || this)[0],
            this.element = a(d),
            this.uuid = c++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.options = a.widget.extend({},
            this.options, this._getCreateOptions(), b),
            this.bindings = a(),
            this.hoverable = a(),
            this.focusable = a(),
            d !== this && (a.data(d, this.widgetName, this), a.data(d, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(a) {
                    a.target === d && this.destroy()
                }
            }), this.document = a(d.style ? d.ownerDocument: d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: a.noop,
        _getCreateEventData: a.noop,
        _create: a.noop,
        _init: a.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: a.noop,
        widget: function() {
            return this.element
        },
        option: function(c, d) {
            var e = c,
            f,
            g,
            h;
            if (arguments.length === 0) return a.widget.extend({},
            this.options);
            if (typeof c == "string") {
                e = {},
                f = c.split("."),
                c = f.shift();
                if (f.length) {
                    g = e[c] = a.widget.extend({},
                    this.options[c]);
                    for (h = 0; h < f.length - 1; h++) g[f[h]] = g[f[h]] || {},
                    g = g[f[h]];
                    c = f.pop();
                    if (d === b) return g[c] === b ? null: g[c];
                    g[c] = d
                } else {
                    if (d === b) return this.options[c] === b ? null: this.options[c];
                    e[c] = d
                }
            }
            return this._setOptions(e),
            this
        },
        _setOptions: function(a) {
            var b;
            for (b in a) this._setOption(b, a[b]);
            return this
        },
        _setOption: function(a, b) {
            return this.options[a] = b,
            a === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!b).attr("aria-disabled", b), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")),
            this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(b, c, d) {
            var e,
            f = this;
            typeof b != "boolean" && (d = c, c = b, b = !1),
            d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()),
            a.each(d, 
            function(d, g) {
                function h() {
                    if (!b && (f.options.disabled === !0 || a(this).hasClass("ui-state-disabled"))) return;
                    return (typeof g == "string" ? f[g] : g).apply(f, arguments)
                }
                typeof g != "string" && (h.guid = g.guid = g.guid || h.guid || a.guid++);
                var i = d.match(/^(\w+)\s*(.*)$/),
                j = i[1] + f.eventNamespace,
                k = i[2];
                k ? e.delegate(k, j, h) : c.bind(j, h)
            })
        },
        _off: function(a, b) {
            b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            a.unbind(b).undelegate(b)
        },
        _delay: function(a, b) {
            function c() {
                return (typeof a == "string" ? d[a] : a).apply(d, arguments)
            }
            var d = this;
            return setTimeout(c, b || 0)
        },
        _hoverable: function(b) {
            this.hoverable = this.hoverable.add(b),
            this._on(b, {
                mouseenter: function(b) {
                    a(b.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(b) {
                    a(b.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(b) {
            this.focusable = this.focusable.add(b),
            this._on(b, {
                focusin: function(b) {
                    a(b.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(b) {
                    a(b.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(b, c, d) {
            var e,
            f,
            g = this.options[b];
            d = d || {},
            c = a.Event(c),
            c.type = (b === this.widgetEventPrefix ? b: this.widgetEventPrefix + b).toLowerCase(),
            c.target = this.element[0],
            f = c.originalEvent;
            if (f) for (e in f) e in c || (c[e] = f[e]);
            return this.element.trigger(c, d),
            !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
        }
    },
    a.each({
        show: "fadeIn",
        hide: "fadeOut"
    },
    function(b, c) {
        a.Widget.prototype["_" + b] = function(d, e, f) {
            typeof e == "string" && (e = {
                effect: e
            });
            var g,
            h = e ? e === !0 || typeof e == "number" ? c: e.effect || c: b;
            e = e || {},
            typeof e == "number" && (e = {
                duration: e
            }),
            g = !a.isEmptyObject(e),
            e.complete = f,
            e.delay && d.delay(e.delay),
            g && a.effects && (a.effects.effect[h] || a.uiBackCompat !== !1 && a.effects[h]) ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
                a(this)[b](),
                f && f.call(d[0]),
                c()
            })
        }
    }),
    a.uiBackCompat !== !1 && (a.Widget.prototype._getCreateOptions = function() {
        return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
    })
} (jQuery),
function(a, b) {
    var c = !1;
    a(document).mouseup(function(a) {
        c = !1
    }),
    a.widget("ui.mouse", {
        version: "1.9.2",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, 
            function(a) {
                return b._mouseDown(a)
            }).bind("click." + this.widgetName, 
            function(c) {
                if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) return a.removeData(c.target, b.widgetName + ".preventClickEvent"),
                c.stopImmediatePropagation(),
                !1
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(b) {
            if (c) return;
            this._mouseStarted && this._mouseUp(b),
            this._mouseDownEvent = b;
            var d = this,
            e = b.which === 1,
            f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length: !1;
            if (!e || f || !this._mouseCapture(b)) return ! 0;
            this.mouseDelayMet = !this.options.delay,
            this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                d.mouseDelayMet = !0
            },
            this.options.delay));
            if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                this._mouseStarted = this._mouseStart(b) !== !1;
                if (!this._mouseStarted) return b.preventDefault(),
                !0
            }
            return ! 0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"),
            this._mouseMoveDelegate = function(a) {
                return d._mouseMove(a)
            },
            this._mouseUpDelegate = function(a) {
                return d._mouseUp(a)
            },
            a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
            b.preventDefault(),
            c = !0,
            !0
        },
        _mouseMove: function(b) {
            return ! a.ui.ie || document.documentMode >= 9 || !!b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b)
        },
        _mouseUp: function(b) {
            return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)),
            !1
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function(a) {
            return this.mouseDelayMet
        },
        _mouseStart: function(a) {},
        _mouseDrag: function(a) {},
        _mouseStop: function(a) {},
        _mouseCapture: function(a) {
            return ! 0
        }
    })
} (jQuery),
function(a, b) {
    a.widget("ui.draggable", a.ui.mouse, {
        version: "1.9.2",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function() {
            this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"),
            this.options.addClasses && this.element.addClass("ui-draggable"),
            this.options.disabled && this.element.addClass("ui-draggable-disabled"),
            this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
            this._mouseDestroy()
        },
        _mouseCapture: function(b) {
            var c = this.options;
            return this.helper || c.disabled || a(b.target).is(".ui-resizable-handle") ? !1: (this.handle = this._getHandle(b), this.handle ? (a(c.iframeFix === !0 ? "iframe": c.iframeFix).each(function() {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(a(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function(b) {
            var c = this.options;
            return this.helper = this._createHelper(b),
            this.helper.addClass("ui-draggable-dragging"),
            this._cacheHelperProportions(),
            a.ui.ddmanager && (a.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(),
            this.offset = this.positionAbs = this.element.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.originalPosition = this.position = this._generatePosition(b),
            this.originalPageX = b.pageX,
            this.originalPageY = b.pageY,
            c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt),
            c.containment && this._setContainment(),
            this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
        },
        _mouseDrag: function(b, c) {
            this.position = this._generatePosition(b),
            this.positionAbs = this._convertPositionTo("absolute");
            if (!c) {
                var d = this._uiHash();
                if (this._trigger("drag", b, d) === !1) return this._mouseUp({}),
                !1;
                this.position = d.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            return a.ui.ddmanager && a.ui.ddmanager.drag(this, b),
            !1
        },
        _mouseStop: function(b) {
            var c = !1;
            a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)),
            this.dropped && (c = this.dropped, this.dropped = !1);
            var d = this.element[0],
            e = !1;
            while (d && (d = d.parentNode)) d == document && (e = !0);
            if (!e && this.options.helper === "original") return ! 1;
            if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
                var f = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), 
                function() {
                    f._trigger("stop", b) !== !1 && f._clear()
                })
            } else this._trigger("stop", b) !== !1 && this._clear();
            return ! 1
        },
        _mouseUp: function(b) {
            return a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }),
            a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b),
            a.ui.mouse.prototype._mouseUp.call(this, b)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
            this
        },
        _getHandle: function(b) {
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0: !1;
            return a(this.options.handle, this.element).find("*").andSelf().each(function() {
                this == b.target && (c = !0)
            }),
            c
        },
        _createHelper: function(b) {
            var c = this.options,
            d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            return d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode: c.appendTo),
            d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute"),
            d
        },
        _adjustOffsetFromHelper: function(b) {
            typeof b == "string" && (b = b.split(" ")),
            a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            }),
            "left" in b && (this.offset.click.left = b.left + this.margins.left),
            "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left),
            "top" in b && (this.offset.click.top = b.top + this.margins.top),
            "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.ui.ie) b = {
                top: 0,
                left: 0
            };
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.element.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var b = this.options;
            b.containment == "parent" && (b.containment = this.helper[0].parentNode);
            if (b.containment == "document" || b.containment == "window") this.containment = [b.containment == "document" ? 0: a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0: a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0: a(window).scrollLeft()) + a(b.containment == "document" ? document: window).width() - this.helperProportions.width - this.margins.left, (b.containment == "document" ? 0: a(window).scrollTop()) + (a(b.containment == "document" ? document: window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
                var c = a(b.containment),
                d = c[0];
                if (!d) return;
                var e = c.offset(),
                f = a(d).css("overflow") != "hidden";
                this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
                this.relative_container = c
            } else b.containment.constructor == Array && (this.containment = b.containment)
        },
        _convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = b == "absolute" ? 1: -1,
            e = this.options,
            f = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent: this.offsetParent,
            g = /(html|body)/i.test(f[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0: f.scrollTop()) * d,
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0: f.scrollLeft()) * d
            }
        },
        _generatePosition: function(b) {
            var c = this.options,
            d = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent: this.offsetParent,
            e = /(html|body)/i.test(d[0].tagName),
            f = b.pageX,
            g = b.pageY;
            if (this.originalPosition) {
                var h;
                if (this.containment) {
                    if (this.relative_container) {
                        var i = this.relative_container.offset();
                        h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
                    } else h = this.containment;
                    b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left),
                    b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top),
                    b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left),
                    b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
                }
                if (c.grid) {
                    var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
                    g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j: j;
                    var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
                    f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k: k
                }
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0: d.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0: d.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"),
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1
        },
        _trigger: function(b, c, d) {
            return d = d || this._uiHash(),
            a.ui.plugin.call(this, b, [c, d]),
            b == "drag" && (this.positionAbs = this._convertPositionTo("absolute")),
            a.Widget.prototype._trigger.call(this, b, c, d)
        },
        plugins: {},
        _uiHash: function(a) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function(b, c) {
            var d = a(this).data("draggable"),
            e = d.options,
            f = a.extend({},
            c, {
                item: d.element
            });
            d.sortables = [],
            a(e.connectToSortable).each(function() {
                var c = a.data(this, "sortable");
                c && !c.options.disabled && (d.sortables.push({
                    instance: c,
                    shouldRevert: c.options.revert
                }), c.refreshPositions(), c._trigger("activate", b, f))
            })
        },
        stop: function(b, c) {
            var d = a(this).data("draggable"),
            e = a.extend({},
            c, {
                item: d.element
            });
            a.each(d.sortables, 
            function() {
                this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
            })
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
            e = this,
            f = function(b) {
                var c = this.offset.click.top,
                d = this.offset.click.left,
                e = this.positionAbs.top,
                f = this.positionAbs.left,
                g = b.height,
                h = b.width,
                i = b.top,
                j = b.left;
                return a.ui.isOver(e + c, f + d, i, j, g, h)
            };
            a.each(d.sortables, 
            function(f) {
                var g = !1,
                h = this;
                this.instance.positionAbs = d.positionAbs,
                this.instance.helperProportions = d.helperProportions,
                this.instance.offset.click = d.offset.click,
                this.instance._intersectsWith(this.instance.containerCache) && (g = !0, a.each(d.sortables, 
                function() {
                    return this.instance.positionAbs = d.positionAbs,
                    this.instance.helperProportions = d.helperProportions,
                    this.instance.offset.click = d.offset.click,
                    this != h && this.instance._intersectsWith(this.instance.containerCache) && a.ui.contains(h.instance.element[0], this.instance.element[0]) && (g = !1),
                    g
                })),
                g ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return c.helper[0]
                },
                b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
            })
        }
    }),
    a.ui.plugin.add("draggable", "cursor", {
        start: function(b, c) {
            var d = a("body"),
            e = a(this).data("draggable").options;
            d.css("cursor") && (e._cursor = d.css("cursor")),
            d.css("cursor", e.cursor)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._cursor && a("body").css("cursor", d._cursor)
        }
    }),
    a.ui.plugin.add("draggable", "opacity", {
        start: function(b, c) {
            var d = a(c.helper),
            e = a(this).data("draggable").options;
            d.css("opacity") && (e._opacity = d.css("opacity")),
            d.css("opacity", e.opacity)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._opacity && a(c.helper).css("opacity", d._opacity)
        }
    }),
    a.ui.plugin.add("draggable", "scroll", {
        start: function(b, c) {
            var d = a(this).data("draggable");
            d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset())
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
            e = d.options,
            f = !1;
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
                if (!e.axis || e.axis != "x") d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed: b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
                if (!e.axis || e.axis != "y") d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed: b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed)
            } else {
                if (!e.axis || e.axis != "x") b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
                if (!e.axis || e.axis != "y") b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed))
            }
            f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
        }
    }),
    a.ui.plugin.add("draggable", "snap", {
        start: function(b, c) {
            var d = a(this).data("draggable"),
            e = d.options;
            d.snapElements = [],
            a(e.snap.constructor != String ? e.snap.items || ":data(draggable)": e.snap).each(function() {
                var b = a(this),
                c = b.offset();
                this != d.element[0] && d.snapElements.push({
                    item: this,
                    width: b.outerWidth(),
                    height: b.outerHeight(),
                    top: c.top,
                    left: c.left
                })
            })
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
            e = d.options,
            f = e.snapTolerance,
            g = c.offset.left,
            h = g + d.helperProportions.width,
            i = c.offset.top,
            j = i + d.helperProportions.height;
            for (var k = d.snapElements.length - 1; k >= 0; k--) {
                var l = d.snapElements[k].left,
                m = l + d.snapElements[k].width,
                n = d.snapElements[k].top,
                o = n + d.snapElements[k].height;
                if (! (l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
                    d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
                        snapItem: d.snapElements[k].item
                    })),
                    d.snapElements[k].snapping = !1;
                    continue
                }
                if (e.snapMode != "inner") {
                    var p = Math.abs(n - j) <= f,
                    q = Math.abs(o - i) <= f,
                    r = Math.abs(l - h) <= f,
                    s = Math.abs(m - g) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {
                        top: n - d.helperProportions.height,
                        left: 0
                    }).top - d.margins.top),
                    q && (c.position.top = d._convertPositionTo("relative", {
                        top: o,
                        left: 0
                    }).top - d.margins.top),
                    r && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: l - d.helperProportions.width
                    }).left - d.margins.left),
                    s && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: m
                    }).left - d.margins.left)
                }
                var t = p || q || r || s;
                if (e.snapMode != "outer") {
                    var p = Math.abs(n - i) <= f,
                    q = Math.abs(o - j) <= f,
                    r = Math.abs(l - g) <= f,
                    s = Math.abs(m - h) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {
                        top: n,
                        left: 0
                    }).top - d.margins.top),
                    q && (c.position.top = d._convertPositionTo("relative", {
                        top: o - d.helperProportions.height,
                        left: 0
                    }).top - d.margins.top),
                    r && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: l
                    }).left - d.margins.left),
                    s && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: m - d.helperProportions.width
                    }).left - d.margins.left)
                } ! d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
                    snapItem: d.snapElements[k].item
                })),
                d.snapElements[k].snapping = p || q || r || s || t
            }
        }
    }),
    a.ui.plugin.add("draggable", "stack", {
        start: function(b, c) {
            var d = a(this).data("draggable").options,
            e = a.makeArray(a(d.stack)).sort(function(b, c) {
                return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
            });
            if (!e.length) return;
            var f = parseInt(e[0].style.zIndex) || 0;
            a(e).each(function(a) {
                this.style.zIndex = f + a
            }),
            this[0].style.zIndex = f + e.length
        }
    }),
    a.ui.plugin.add("draggable", "zIndex", {
        start: function(b, c) {
            var d = a(c.helper),
            e = a(this).data("draggable").options;
            d.css("zIndex") && (e._zIndex = d.css("zIndex")),
            d.css("zIndex", e.zIndex)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._zIndex && a(c.helper).css("zIndex", d._zIndex)
        }
    })
} (jQuery),
function(a, b) {
    a.widget("ui.droppable", {
        version: "1.9.2",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function() {
            var b = this.options,
            c = b.accept;
            this.isover = 0,
            this.isout = 1,
            this.accept = 
            a.isFunction(c) ? c: function(a) {
                return a.is(c)
            },
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            },
            a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [],
            a.ui.ddmanager.droppables[b.scope].push(this),
            b.addClasses && this.element.addClass("ui-droppable")
        },
        _destroy: function() {
            var b = a.ui.ddmanager.droppables[this.options.scope];
            for (var c = 0; c < b.length; c++) b[c] == this && b.splice(c, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(b, c) {
            b == "accept" && (this.accept = a.isFunction(c) ? c: function(a) {
                return a.is(c)
            }),
            a.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass),
            c && this._trigger("activate", b, this.ui(c))
        },
        _deactivate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass),
            c && this._trigger("deactivate", b, this.ui(c))
        },
        _over: function(b) {
            var c = a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0]) return;
            this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
        },
        _out: function(b) {
            var c = a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0]) return;
            this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
        },
        _drop: function(b, c) {
            var d = c || a.ui.ddmanager.current;
            if (!d || (d.currentItem || d.element)[0] == this.element[0]) return ! 1;
            var e = !1;
            return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var b = a.data(this, "droppable");
                if (b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {
                    offset: b.element.offset()
                }), b.options.tolerance)) return e = !0,
                !1
            }),
            e ? !1: this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1
        },
        ui: function(a) {
            return {
                draggable: a.currentItem || a.element,
                helper: a.helper,
                position: a.position,
                offset: a.positionAbs
            }
        }
    }),
    a.ui.intersect = function(b, c, d) {
        if (!c.offset) return ! 1;
        var e = (b.positionAbs || b.position.absolute).left,
        f = e + b.helperProportions.width,
        g = (b.positionAbs || b.position.absolute).top,
        h = g + b.helperProportions.height,
        i = c.offset.left,
        j = i + c.proportions.width,
        k = c.offset.top,
        l = k + c.proportions.height;
        switch (d) {
        case "fit":
            return i <= e && f <= j && k <= g && h <= l;
        case "intersect":
            return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
        case "pointer":
            var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left,
            n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top,
            o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
            return o;
        case "touch":
            return (g >= k && g <= l || h >= k && h <= l || g < k && h > l) && (e >= i && e <= j || f >= i && f <= j || e < i && f > j);
        default:
            return ! 1
        }
    },
    a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(b, c) {
            var d = a.ui.ddmanager.droppables[b.options.scope] || [],
            e = c ? c.type: null,
            f = (b.currentItem || b.element).find(":data(droppable)").andSelf();
            g: for (var h = 0; h < d.length; h++) {
                if (d[h].options.disabled || b && !d[h].accept.call(d[h].element[0], b.currentItem || b.element)) continue;
                for (var i = 0; i < f.length; i++) if (f[i] == d[h].element[0]) {
                    d[h].proportions.height = 0;
                    continue g
                }
                d[h].visible = d[h].element.css("display") != "none";
                if (!d[h].visible) continue;
                e == "mousedown" && d[h]._activate.call(d[h], c),
                d[h].offset = d[h].element.offset(),
                d[h].proportions = {
                    width: d[h].element[0].offsetWidth,
                    height: d[h].element[0].offsetHeight
                }
            }
        },
        drop: function(b, c) {
            var d = !1;
            return a.each(a.ui.ddmanager.droppables[b.options.scope] || [], 
            function() {
                if (!this.options) return; ! this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d),
                !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c))
            }),
            d
        },
        dragStart: function(b, c) {
            b.element.parentsUntil("body").bind("scroll.droppable", 
            function() {
                b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
            })
        },
        drag: function(b, c) {
            b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c),
            a.each(a.ui.ddmanager.droppables[b.options.scope] || [], 
            function() {
                if (this.options.disabled || this.greedyChild || !this.visible) return;
                var d = a.ui.intersect(b, this, this.options.tolerance),
                e = !d && this.isover == 1 ? "isout": d && this.isover == 0 ? "isover": null;
                if (!e) return;
                var f;
                if (this.options.greedy) {
                    var g = this.options.scope,
                    h = this.element.parents(":data(droppable)").filter(function() {
                        return a.data(this, "droppable").options.scope === g
                    });
                    h.length && (f = a.data(h[0], "droppable"), f.greedyChild = e == "isover" ? 1: 0)
                }
                f && e == "isover" && (f.isover = 0, f.isout = 1, f._out.call(f, c)),
                this[e] = 1,
                this[e == "isout" ? "isover": "isout"] = 0,
                this[e == "isover" ? "_over": "_out"].call(this, c),
                f && e == "isout" && (f.isout = 0, f.isover = 1, f._over.call(f, c))
            })
        },
        dragStop: function(b, c) {
            b.element.parentsUntil("body").unbind("scroll.droppable"),
            b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
        }
    }
} (jQuery),
function(a, b) {
    a.widget("ui.sortable", a.ui.mouse, {
        version: "1.9.2",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3
        },
        _create: function() {
            var a = this.options;
            this.containerCache = {},
            this.element.addClass("ui-sortable"),
            this.refresh(),
            this.floating = this.items.length ? a.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1,
            this.offset = this.element.offset(),
            this._mouseInit(),
            this.ready = !0
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"),
            this._mouseDestroy();
            for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(b, c) {
            b === "disabled" ? (this.options[b] = c, this.widget().toggleClass("ui-sortable-disabled", !!c)) : a.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(b, c) {
            var d = this;
            if (this.reverting) return ! 1;
            if (this.options.disabled || this.options.type == "static") return ! 1;
            this._refreshItems(b);
            var e = null,
            f = a(b.target).parents().each(function() {
                if (a.data(this, d.widgetName + "-item") == d) return e = a(this),
                !1
            });
            a.data(b.target, d.widgetName + "-item") == d && (e = a(b.target));
            if (!e) return ! 1;
            if (this.options.handle && !c) {
                var g = !1;
                a(this.options.handle, e).find("*").andSelf().each(function() {
                    this == b.target && (g = !0)
                });
                if (!g) return ! 1
            }
            return this.currentItem = e,
            this._removeCurrentsFromItems(),
            !0
        },
        _mouseStart: function(b, c, d) {
            var e = this.options;
            this.currentContainer = this,
            this.refreshPositions(),
            this.helper = this._createHelper(b),
            this._cacheHelperProportions(),
            this._cacheMargins(),
            this.scrollParent = this.helper.scrollParent(),
            this.offset = this.currentItem.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.helper.css("position", "absolute"),
            this.cssPosition = this.helper.css("position"),
            this.originalPosition = this._generatePosition(b),
            this.originalPageX = b.pageX,
            this.originalPageY = b.pageY,
            e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt),
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            },
            this.helper[0] != this.currentItem[0] && this.currentItem.hide(),
            this._createPlaceholder(),
            e.containment && this._setContainment(),
            e.cursor && (a("body").css("cursor") && (this._storedCursor = a("body").css("cursor")), a("body").css("cursor", e.cursor)),
            e.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", e.opacity)),
            e.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", e.zIndex)),
            this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()),
            this._trigger("start", b, this._uiHash()),
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!d) for (var f = this.containers.length - 1; f >= 0; f--) this.containers[f]._trigger("activate", b, this._uiHash(this));
            return a.ui.ddmanager && (a.ui.ddmanager.current = this),
            a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b),
            this.dragging = !0,
            this.helper.addClass("ui-sortable-helper"),
            this._mouseDrag(b),
            !0
        },
        _mouseDrag: function(b) {
            this.position = this._generatePosition(b),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
            if (this.options.scroll) {
                var c = this.options,
                d = !1;
                this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < c.scrollSensitivity ? this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + c.scrollSpeed: b.pageY - this.overflowOffset.top < c.scrollSensitivity && (this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop - c.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < c.scrollSensitivity ? this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + c.scrollSpeed: b.pageX - this.overflowOffset.left < c.scrollSensitivity && (this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - c.scrollSpeed)) : (b.pageY - a(document).scrollTop() < c.scrollSensitivity ? d = a(document).scrollTop(a(document).scrollTop() - c.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < c.scrollSensitivity && (d = a(document).scrollTop(a(document).scrollTop() + c.scrollSpeed)), b.pageX - a(document).scrollLeft() < c.scrollSensitivity ? d = a(document).scrollLeft(a(document).scrollLeft() - c.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < c.scrollSensitivity && (d = a(document).scrollLeft(a(document).scrollLeft() + c.scrollSpeed))),
                d !== !1 && a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            for (var e = this.items.length - 1; e >= 0; e--) {
                var f = this.items[e],
                g = f.item[0],
                h = this._intersectsWithPointer(f);
                if (!h) continue;
                if (f.instance !== this.currentContainer) continue;
                if (g != this.currentItem[0] && this.placeholder[h == 1 ? "next": "prev"]()[0] != g && !a.contains(this.placeholder[0], g) && (this.options.type == "semi-dynamic" ? !a.contains(this.element[0], g) : !0)) {
                    this.direction = h == 1 ? "down": "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(f)) this._rearrange(b, f);
                    else break;
                    this._trigger("change", b, this._uiHash());
                    break
                }
            }
            return this._contactContainers(b),
            a.ui.ddmanager && a.ui.ddmanager.drag(this, b),
            this._trigger("sort", b, this._uiHash()),
            this.lastPositionAbs = this.positionAbs,
            !1
        },
        _mouseStop: function(b, c) {
            if (!b) return;
            a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b);
            if (this.options.revert) {
                var d = this,
                e = this.placeholder.offset();
                this.reverting = !0,
                a(this.helper).animate({
                    left: e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] == document.body ? 0: this.offsetParent[0].scrollLeft),
                    top: e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] == document.body ? 0: this.offsetParent[0].scrollTop)
                },
                parseInt(this.options.revert, 10) || 500, 
                function() {
                    d._clear(b)
                })
            } else this._clear(b, c);
            return ! 1
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }),
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var b = this.containers.length - 1; b >= 0; b--) this.containers[b]._trigger("deactivate", null, this._uiHash(this)),
                this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)),
            this
        },
        serialize: function(b) {
            var c = this._getItemsAsjQuery(b && b.connected),
            d = [];
            return b = b || {},
            a(c).each(function() {
                var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[-=_](.+)/);
                c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
            }),
            !d.length && b.key && d.push(b.key + "="),
            d.join("&")
        },
        toArray: function(b) {
            var c = this._getItemsAsjQuery(b && b.connected),
            d = [];
            return b = b || {},
            c.each(function() {
                d.push(a(b.item || this).attr(b.attribute || "id") || "")
            }),
            d
        },
        _intersectsWith: function(a) {
            var b = this.positionAbs.left,
            c = b + this.helperProportions.width,
            d = this.positionAbs.top,
            e = d + this.helperProportions.height,
            f = a.left,
            g = f + a.width,
            h = a.top,
            i = h + a.height,
            j = this.offset.click.top,
            k = this.offset.click.left,
            l = d + j > h && d + j < i && b + k > f && b + k < g;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width": "height"] > a[this.floating ? "width": "height"] ? l: f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
        },
        _intersectsWithPointer: function(b) {
            var c = this.options.axis === "x" || a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top, b.height),
            d = this.options.axis === "y" || a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left, b.width),
            e = c && d,
            f = this._getDragVerticalDirection(),
            g = this._getDragHorizontalDirection();
            return e ? this.floating ? g && g == "right" || f == "down" ? 2: 1: f && (f == "down" ? 2: 1) : !1
        },
        _intersectsWithSides: function(b) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top + b.height / 2, b.height),
            d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left + b.width / 2, b.width),
            e = this._getDragVerticalDirection(),
            f = this._getDragHorizontalDirection();
            return this.floating && f ? f == "right" && d || f == "left" && !d: e && (e == "down" && c || e == "up" && !c)
        },
        _getDragVerticalDirection: function() {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return a != 0 && (a > 0 ? "down": "up")
        },
        _getDragHorizontalDirection: function() {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return a != 0 && (a > 0 ? "right": "left")
        },
        refresh: function(a) {
            return this._refreshItems(a),
            this.refreshPositions(),
            this
        },
        _connectWith: function() {
            var a = this.options;
            return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith
        },
        _getItemsAsjQuery: function(b) {
            var c = [],
            d = [],
            e = this._connectWith();
            if (e && b) for (var f = e.length - 1; f >= 0; f--) {
                var g = a(e[f]);
                for (var h = g.length - 1; h >= 0; h--) {
                    var i = a.data(g[h], this.widgetName);
                    i && i != this && !i.options.disabled && d.push([a.isFunction(i.options.items) ? i.options.items.call(i.element) : a(i.options.items, i.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), i])
                }
            }
            d.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var f = d.length - 1; f >= 0; f--) d[f][0].each(function() {
                c.push(this)
            });
            return a(c)
        },
        _removeCurrentsFromItems: function() {
            var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = a.grep(this.items, 
            function(a) {
                for (var c = 0; c < b.length; c++) if (b[c] == a.item[0]) return ! 1;
                return ! 0
            })
        },
        _refreshItems: function(b) {
            this.items = [],
            this.containers = [this];
            var c = this.items,
            d = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
                item: this.currentItem
            }) : a(this.options.items, this.element), this]],
            e = this._connectWith();
            if (e && this.ready) for (var f = e.length - 1; f >= 0; f--) {
                var g = a(e[f]);
                for (var h = g.length - 1; h >= 0; h--) {
                    var i = a.data(g[h], this.widgetName);
                    i && i != this && !i.options.disabled && (d.push([a.isFunction(i.options.items) ? i.options.items.call(i.element[0], b, {
                        item: this.currentItem
                    }) : a(i.options.items, i.element), i]), this.containers.push(i))
                }
            }
            for (var f = d.length - 1; f >= 0; f--) {
                var j = d[f][1],
                k = d[f][0];
                for (var h = 0, l = k.length; h < l; h++) {
                    var m = a(k[h]);
                    m.data(this.widgetName + "-item", j),
                    c.push({
                        item: m,
                        instance: j,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(b) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            for (var c = this.items.length - 1; c >= 0; c--) {
                var d = this.items[c];
                if (d.instance != this.currentContainer && this.currentContainer && d.item[0] != this.currentItem[0]) continue;
                var e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item;
                b || (d.width = e.outerWidth(), d.height = e.outerHeight());
                var f = e.offset();
                d.left = f.left,
                d.top = f.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else for (var c = this.containers.length - 1; c >= 0; c--) {
                var f = this.containers[c].element.offset();
                this.containers[c].containerCache.left = f.left,
                this.containers[c].containerCache.top = f.top,
                this.containers[c].containerCache.width = this.containers[c].element.outerWidth(),
                this.containers[c].containerCache.height = this.containers[c].element.outerHeight()
            }
            return this
        },
        _createPlaceholder: function(b) {
            b = b || this;
            var c = b.options;
            if (!c.placeholder || c.placeholder.constructor == String) {
                var d = c.placeholder;
                c.placeholder = {
                    element: function() {
                        var c = a(document.createElement(b.currentItem[0].nodeName)).addClass(d || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        return d || (c.style.visibility = "hidden"),
                        c
                    },
                    update: function(a, e) {
                        if (d && !c.forcePlaceholderSize) return;
                        e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)),
                        e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10))
                    }
                }
            }
            b.placeholder = a(c.placeholder.element.call(b.element, b.currentItem)),
            b.currentItem.after(b.placeholder),
            c.placeholder.update(b, b.placeholder)
        },
        _contactContainers: function(b) {
            var c = null,
            d = null;
            for (var e = this.containers.length - 1; e >= 0; e--) {
                if (a.contains(this.currentItem[0], this.containers[e].element[0])) continue;
                if (this._intersectsWith(this.containers[e].containerCache)) {
                    if (c && a.contains(this.containers[e].element[0], c.element[0])) continue;
                    c = this.containers[e],
                    d = e
                } else this.containers[e].containerCache.over && (this.containers[e]._trigger("out", b, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            if (!c) return;
            if (this.containers.length === 1) this.containers[d]._trigger("over", b, this._uiHash(this)),
            this.containers[d].containerCache.over = 1;
            else {
                var f = 1e4,
                g = null,
                h = this.containers[d].floating ? "left": "top",
                i = this.containers[d].floating ? "width": "height",
                j = this.positionAbs[h] + this.offset.click[h];
                for (var k = this.items.length - 1; k >= 0; k--) {
                    if (!a.contains(this.containers[d].element[0], this.items[k].item[0])) continue;
                    if (this.items[k].item[0] == this.currentItem[0]) continue;
                    var l = this.items[k].item.offset()[h],
                    m = !1;
                    Math.abs(l - j) > Math.abs(l + this.items[k][i] - j) && (m = !0, l += this.items[k][i]),
                    Math.abs(l - j) < f && (f = Math.abs(l - j), g = this.items[k], this.direction = m ? "up": "down")
                }
                if (!g && !this.options.dropOnEmpty) return;
                this.currentContainer = this.containers[d],
                g ? this._rearrange(b, g, null, !0) : this._rearrange(b, null, this.containers[d].element, !0),
                this._trigger("change", b, this._uiHash()),
                this.containers[d]._trigger("change", b, this._uiHash(this)),
                this.options.placeholder.update(this.currentContainer, this.placeholder),
                this.containers[d]._trigger("over", b, this._uiHash(this)),
                this.containers[d].containerCache.over = 1
            }
        },
        _createHelper: function(b) {
            var c = this.options,
            d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : c.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            return d.parents("body").length || a(c.appendTo != "parent" ? c.appendTo: this.currentItem[0].parentNode)[0].appendChild(d[0]),
            d[0] == this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }),
            (d[0].style.width == "" || c.forceHelperSize) && d.width(this.currentItem.width()),
            (d[0].style.height == "" || c.forceHelperSize) && d.height(this.currentItem.height()),
            d
        },
        _adjustOffsetFromHelper: function(b) {
            typeof b == "string" && (b = b.split(" ")),
            a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            }),
            "left" in b && (this.offset.click.left = b.left + this.margins.left),
            "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left),
            "top" in b && (this.offset.click.top = b.top + this.margins.top),
            "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.ui.ie) b = {
                top: 0,
                left: 0
            };
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.currentItem.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var b = this.options;
            b.containment == "parent" && (b.containment = this.helper[0].parentNode);
            if (b.containment == "document" || b.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(b.containment == "document" ? document: window).width() - this.helperProportions.width - this.margins.left, (a(b.containment == "document" ? document: window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(b.containment)) {
                var c = a(b.containment)[0],
                d = a(b.containment).offset(),
                e = a(c).css("overflow") != "hidden";
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (e ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (e ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = b == "absolute" ? 1: -1,
            e = this.options,
            f = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent: this.offsetParent,
            g = /(html|body)/i.test(f[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0: f.scrollTop()) * d,
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0: f.scrollLeft()) * d
            }
        },
        _generatePosition: function(b) {
            var c = this.options,
            d = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent: this.offsetParent,
            e = /(html|body)/i.test(d[0].tagName);
            this.cssPosition == "relative" && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
            var f = b.pageX,
            g = b.pageY;
            if (this.originalPosition) {
                this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top));
                if (c.grid) {
                    var h = this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1];
                    g = this.containment ? h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3] ? h - this.offset.click.top < this.containment[1] ? h + c.grid[1] : h - c.grid[1] : h: h;
                    var i = this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0];
                    f = this.containment ? i - this.offset.click.left < this.containment[0] || i - this.offset.click.left > this.containment[2] ? i - this.offset.click.left < this.containment[0] ? i + c.grid[0] : i - c.grid[0] : i: i
                }
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0: d.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0: d.scrollLeft())
            }
        },
        _rearrange: function(a, b, c, d) {
            c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? b.item[0] : b.item[0].nextSibling),
            this.counter = this.counter ? ++this.counter: 1;
            var e = this.counter;
            this._delay(function() {
                e == this.counter && this.refreshPositions(!d)
            })
        },
        _clear: function(b, c) {
            this.reverting = !1;
            var d = []; ! this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem),
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var e in this._storedCSS) if (this._storedCSS[e] == "auto" || this._storedCSS[e] == "static") this._storedCSS[e] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !c && d.push(function(a) {
                this._trigger("receive", a, this._uiHash(this.fromOutside))
            }),
            (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !c && d.push(function(a) {
                this._trigger("update", a, this._uiHash())
            }),
            this !== this.currentContainer && (c || (d.push(function(a) {
                this._trigger("remove", a, this._uiHash())
            }), d.push(function(a) {
                return function(b) {
                    a._trigger("receive", b, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), d.push(function(a) {
                return function(b) {
                    a._trigger("update", b, this._uiHash(this))
                }
            }.call(this, this.currentContainer))));
            for (var e = this.containers.length - 1; e >= 0; e--) c || d.push(function(a) {
                return function(b) {
                    a._trigger("deactivate", b, this._uiHash(this))
                }
            }.call(this, this.containers[e])),
            this.containers[e].containerCache.over && (d.push(function(a) {
                return function(b) {
                    a._trigger("out", b, this._uiHash(this))
                }
            }.call(this, this.containers[e])), this.containers[e].containerCache.over = 0);
            this._storedCursor && a("body").css("cursor", this._storedCursor),
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
            this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "": this._storedZIndex),
            this.dragging = !1;
            if (this.cancelHelperRemoval) {
                if (!c) {
                    this._trigger("beforeStop", b, this._uiHash());
                    for (var e = 0; e < d.length; e++) d[e].call(this, b);
                    this._trigger("stop", b, this._uiHash())
                }
                return this.fromOutside = !1,
                !1
            }
            c || this._trigger("beforeStop", b, this._uiHash()),
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.helper[0] != this.currentItem[0] && this.helper.remove(),
            this.helper = null;
            if (!c) {
                for (var e = 0; e < d.length; e++) d[e].call(this, b);
                this._trigger("stop", b, this._uiHash())
            }
            return this.fromOutside = !1,
            !0
        },
        _trigger: function() {
            a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(b) {
            var c = b || this;
            return {
                helper: c.helper,
                placeholder: c.placeholder || a([]),
                position: c.position,
                originalPosition: c.originalPosition,
                offset: c.positionAbs,
                item: c.currentItem,
                sender: b ? b.element: null
            }
        }
    })
} (jQuery),
function($) {
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
    meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    $.toJSON = typeof JSON == "object" && JSON.stringify ? JSON.stringify: function(a) {
        if (a === null) return "null";
        var b = typeof a;
        if (b === "undefined") return undefined;
        if (b === "number" || b === "boolean") return "" + a;
        if (b === "string") return $.quoteString(a);
        if (b === "object") {
            if (typeof a.toJSON == "function") return $.toJSON(a.toJSON());
            if (a.constructor === Date) {
                var c = a.getUTCMonth() + 1,
                d = a.getUTCDate(),
                e = a.getUTCFullYear(),
                f = a.getUTCHours(),
                g = a.getUTCMinutes(),
                h = a.getUTCSeconds(),
                i = a.getUTCMilliseconds();
                return c < 10 && (c = "0" + c),
                d < 10 && (d = "0" + d),
                f < 10 && (f = "0" + f),
                g < 10 && (g = "0" + g),
                h < 10 && (h = "0" + h),
                i < 100 && (i = "0" + i),
                i < 10 && (i = "0" + i),
                '"' + e + "-" + c + "-" + d + "T" + f + ":" + g + ":" + h + "." + i + 'Z"'
            }
            if (a.constructor === Array) {
                var j = [];
                for (var k = 0; k < a.length; k++) j.push($.toJSON(a[k]) || "null");
                return "[" + j.join(",") + "]"
            }
            var l,
            m,
            n = [];
            for (var o in a) {
                b = typeof o;
                if (b === "number") l = '"' + o + '"';
                else if (b === "string") l = $.quoteString(o);
                else continue;
                b = typeof a[o];
                if (b === "function" || b === "undefined") continue;
                m = $.toJSON(a[o]),
                n.push(l + ":" + m)
            }
            return "{" + n.join(",") + "}"
        }
    },
    $.evalJSON = typeof JSON == "object" && JSON.parse ? JSON.parse: function(src) {
        return eval("(" + src + ")")
    },
    $.secureEvalJSON = typeof JSON == "object" && JSON.parse ? JSON.parse: function(src) {
        var filtered = src.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        if (/^[\],:{}\s]*$/.test(filtered)) return eval("(" + src + ")");
        throw new SyntaxError("Error parsing JSON, source is not valid.")
    },
    $.quoteString = function(a) {
        return a.match(escapeable) ? '"' + a.replace(escapeable, 
        function(a) {
            var b = meta[a];
            return typeof b == "string" ? b: (b = a.charCodeAt(), "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16))
        }) + '"': '"' + a + '"'
    }
} (jQuery),
function(a, b) {
    var c = function() {
        var b = a._data(document, "events");
        return b && b.click && a.grep(b.click, 
        function(a) {
            return a.namespace === "rails"
        }).length
    };
    c() && a.error("jquery-ujs has already been loaded!");
    var d;
    a.rails = d = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
        disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input:file",
        linkDisableSelector: "a[data-disable-with]",
        CSRFProtection: function(b) {
            var c = a('meta[name="csrf-token"]').attr("content");
            c && b.setRequestHeader("X-CSRF-Token", c)
        },
        fire: function(b, c, d) {
            var e = a.Event(c);
            return b.trigger(e, d),
            e.result !== !1
        },
        confirm: function(a) {
            return confirm(a)
        },
        ajax: function(b) {
            return a.ajax(b)
        },
        href: function(a) {
            return a.attr("href")
        },
        handleRemote: function(c) {
            var e,
            f,
            g,
            h,
            i,
            j,
            k,
            l;
            if (d.fire(c, "ajax:before")) {
                h = c.data("cross-domain"),
                i = h === b ? null: h,
                j = c.data("with-credentials") || null,
                k = c.data("type") || a.ajaxSettings && a.ajaxSettings.dataType;
                if (c.is("form")) {
                    e = c.attr("method"),
                    f = c.attr("action"),
                    g = c.serializeArray(),
                    a.each(a.ajaxSettings.data, 
                    function(a, b) {
                        g.push({
                            name: a,
                            value: b
                        })
                    });
                    var m = c.data("ujs:submit-button");
                    m && (g.push(m), c.data("ujs:submit-button", null))
                } else c.is(d.inputChangeSelector) ? (e = c.data("method"), f = c.data("url"), g = c.serializeArray(), a.each(a.ajaxSettings.data, 
                function(a, b) {
                    g.push({
                        name: a,
                        value: b
                    })
                }), c.data("params") && a.each(mcw.parseParams(c.data("params")), 
                function(a, b) {
                    g.push({
                        name: a,
                        value: b
                    })
                })) : (e = c.data("method"), f = d.href(c), g = mcw.parseParams(c.data("params")) || {});
                l = {
                    type: e || "GET",
                    data: g,
                    dataType: k,
                    beforeSend: function(a, e) {
                        return e
                        .dataType === b && a.setRequestHeader("accept", "*/*;q=0.5, " + e.accepts.script),
                        d.fire(c, "ajax:beforeSend", [a, e])
                    },
                    success: function(a, b, d) {
                        c.trigger("ajax:success", [a, b, d])
                    },
                    complete: function(a, b) {
                        c.trigger("ajax:complete", [a, b])
                    },
                    error: function(a, b, d) {
                        c.trigger("ajax:error", [a, b, d])
                    },
                    xhrFields: {
                        withCredentials: j
                    },
                    crossDomain: i
                },
                f && (l.url = f);
                var n = d.ajax(l);
                return c.trigger("ajax:send", n),
                n
            }
            return ! 1
        },
        handleMethod: function(c) {
            var e = d.href(c),
            f = c.data("method"),
            g = c.attr("target"),
            h = a("meta[name=csrf-token]").attr("content"),
            i = a("meta[name=csrf-param]").attr("content"),
            j = a('<form method="post" action="' + e + '"></form>'),
            k = '<input name="_method" value="' + f + '" type="hidden" />';
            i !== b && h !== b && (k += '<input name="' + i + '" value="' + h + '" type="hidden" />'),
            g && j.attr("target", g),
            j.hide().append(k).appendTo("body"),
            j.submit()
        },
        disableFormElements: function(b) {
            b.find(d.disableSelector).each(function() {
                var b = a(this),
                c = b.is("button") ? "html": "val";
                b.data("ujs:enable-with", b[c]()),
                b[c](b.data("disable-with")),
                b.prop("disabled", !0)
            })
        },
        enableFormElements: function(b) {
            b.find(d.enableSelector).each(function() {
                var b = a(this),
                c = b.is("button") ? "html": "val";
                b.data("ujs:enable-with") && b[c](b.data("ujs:enable-with")),
                b.prop("disabled", !1)
            })
        },
        allowAction: function(a, b) {
            var c = a.data("confirm"),
            e = !1,
            b;
            return c ? (d.fire(a, "confirm", [b]) && mcw.confirm({
                msg: c.replace("\\n", "<br>"),
                callback: function(c, f) {
                    if (!c) return;
                    d.fire(a, "confirm:complete", [e]) && b()
                }
            }), !1) : !0
        },
        blankInputs: function(b, c, d) {
            var e = a(),
            f,
            g,
            h = c || "input,textarea",
            i = b.find(h);
            return i.each(function() {
                f = a(this),
                g = f.is(":checkbox,:radio") ? f.is(":checked") : f.val();
                if (!g == !d) {
                    if (f.is(":radio") && i.filter('input:radio:checked[name="' + f.attr("name") + '"]').length) return ! 0;
                    e = e.add(f)
                }
            }),
            e.length ? e: !1
        },
        nonBlankInputs: function(a, b) {
            return d.blankInputs(a, b, !0)
        },
        stopEverything: function(b) {
            return a(b.target).trigger("ujs:everythingStopped"),
            b.stopImmediatePropagation(),
            !1
        },
        callFormSubmitBindings: function(c, d) {
            var e = c.data("events"),
            f = !0;
            return e !== b && e.submit !== b && a.each(e.submit, 
            function(a, b) {
                if (typeof b.handler == "function") return f = b.handler(d)
            }),
            f
        },
        disableElement: function(a) {
            a.data("ujs:enable-with", a.html()),
            a.html(a.data("disable-with")),
            a.bind("click.railsDisable", 
            function(a) {
                return d.stopEverything(a)
            })
        },
        enableElement: function(a) {
            a.data("ujs:enable-with") !== b && (a.html(a.data("ujs:enable-with")), a.data("ujs:enable-with", !1)),
            a.unbind("click.railsDisable")
        }
    },
    d.fire(a(document), "rails:attachBindings") && (a.ajaxPrefilter(function(a, b, c) {
        a.crossDomain || d.CSRFProtection(c)
    }), a(document).delegate(d.linkDisableSelector, "ajax:complete", 
    function() {
        d.enableElement(a(this))
    }), a(document).delegate(d.linkClickSelector, "click.rails", 
    function(c) {
        function h() {
            e.is(d.linkDisableSelector) && d.disableElement(e);
            if (e.data("remote") !== b) {
                if ((c.metaKey || c.ctrlKey) && (!f || f === "GET") && !g) return ! 0;
                var a = d.handleRemote(e);
                return a === !1 ? d.enableElement(e) : a.error(function() {
                    d.enableElement(e)
                }),
                !1
            }
            if (e.data("method")) return d.handleMethod(e),
            !1
        }
        var e = a(this),
        f = e.data("method"),
        g = e.data("params");
        return d.allowAction(e, h) ? h() : d.stopEverything(c)
    }), a(document).delegate(d.inputChangeSelector, "change.rails", 
    function(b) {
        function e() {
            return d.handleRemote(c),
            !1
        }
        var c = a(this);
        return d.allowAction(c, e) ? e() : d.stopEverything(b)
    }), a(document).delegate(d.formSubmitSelector, "submit.rails", 
    function(c) {
        function i() {
            if (g && e.attr("novalidate") == b && d.fire(e, "ajax:aborted:required", [g])) return d.stopEverything(c);
            if (f) {
                if (h) {
                    setTimeout(function() {
                        d.disableFormElements(e)
                    },
                    13);
                    var i = d.fire(e, "ajax:aborted:file", [h]);
                    return i || setTimeout(function() {
                        d.enableFormElements(e)
                    },
                    13),
                    i
                }
                return ! a.support.submitBubbles && a().jquery < "1.7" && d.callFormSubmitBindings(e, c) === !1 ? d.stopEverything(c) : (d.handleRemote(e), !1)
            }
            setTimeout(function() {
                d.disableFormElements(e)
            },
            13)
        }
        var e = a(this),
        f = e.data("remote") !== b,
        g = d.blankInputs(e, d.requiredInputSelector),
        h = d.nonBlankInputs(e, d.fileInputSelector);
        return d.allowAction(e, i) ? i() : d.stopEverything(c)
    }), a(document).delegate(d.formInputClickSelector, "click.rails", 
    function(b) {
        function e() {
            var a = c.attr("name"),
            b = a ? {
                name: a,
                value: c.val()
            }: null;
            c.closest("form").data("ujs:submit-button", b)
        }
        var c = a(this);
        return d.allowAction(c, e) ? e() : d.stopEverything(b)
    }), a(document).delegate(d.formSubmitSelector, "ajax:beforeSend.rails", 
    function(b) {
        this == b.target && d.disableFormElements(a(this))
    }), a(document).delegate(d.formSubmitSelector, "ajax:complete.rails", 
    function(b) {
        this == b.target && d.enableFormElements(a(this))
    }), a(function() {
        csrf_token = a("meta[name=csrf-token]").attr("content"),
        csrf_param = a("meta[name=csrf-param]").attr("content"),
        a('form input[name="' + csrf_param + '"]').val(csrf_token)
    }))
} (jQuery),
function(a) {
    var b = {
        className: "autosizejs",
        append: "",
        callback: !1
    },
    c = "hidden",
    d = "border-box",
    e = "lineHeight",
    f,
    g = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>',
    h = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
    i = "oninput",
    j = "onpropertychange",
    k,
    l = a(g).data("autosize", !0)[0];
    l.style.lineHeight = "99px",
    a(l).css(e) === "99px" && h.push(e),
    l.style.lineHeight = "",
    a.fn.autosize = function(e) {
        return e = a.extend({},
        b, e || {}),
        l.parentNode !== document.body && (a(document.body).append(l), l.value = "\n\n\n", l.scrollTop = 9e4, f = !1),
        this.each(function() {
            function r() {
                k = b,
                l.className = e.className,
                a.each(h, 
                function(a, b) {
                    l.style[b] = g.css(b)
                })
            }
            function s() {
                var a,
                d,
                h;
                k !== b && r();
                if (!n) {
                    n = !0,
                    l.value = b.value + e.append || " ",
                    l.style.overflowY = b.style.overflowY,
                    h = parseInt(b.style.height || 0, 10),
                    l.style.width = Math.max(g.width(), 0) + "px",
                    f ? a = l.scrollHeight: (l.scrollTop = 0, l.scrollTop = 9e4, a = l.scrollTop);
                    var i = g.css("maxHeight");
                    i = parseInt((i == "none" ? 0: i) || 0, 10),
                    i = i && i > 0 ? i: 9e4,
                    a > i ? (a = i, d = "scroll") : a < m && (a = m),
                    a += p,
                    b.style.overflowY = d || c,
                    h !== a && (b.style.height = a + "px", q && e.callback.call(b)),
                    setTimeout(function() {
                        n = !1
                    },
                    1)
                }
            }
            var b = this,
            g = a(b),
            m,
            n,
            o,
            p = 0,
            q = a.isFunction(e.callback);
            if (g.data("autosize")) return;
            if (g.css("box-sizing") === d || g.css("-moz-box-sizing") === d || g.css("-webkit-box-sizing") === d) p = g.outerHeight() - g.height();
            m = Math.max(parseInt(g.css("minHeight"), 10) - p, g.height()),
            o = g.css("resize") === "none" || g.css("resize") === "vertical" ? "none": "horizontal",
            g.css({
                overflow: c,
                overflowY: c,
                wordWrap: "break-word",
                resize: o
            }).data("autosize", !0),
            j in b ? i in b ? b[i] = b.onkeyup = s: b[j] = s: b[i] = s,
            a(window).on("resize", 
            function() {
                n = !1,
                s()
            }),
            g.on("autosize", 
            function() {
                n = !1,
                s()
            }),
            s()
        })
    }
} (window.jQuery || window.Zepto),
function(a, b, c) {
    function j(a) {
        var b = {},
        d = /^jQuery\d+$/;
        return c.each(a.attributes, 
        function(a, c) {
            c.specified && !d.test(c.name) && (b[c.name] = c.value)
        }),
        b
    }
    function k(a, d) {
        var e = this,
        f = c(e);
        if (e.value == f.attr("placeholder") && f.hasClass("placeholder")) if (f.data("placeholder-password")) {
            f = f.hide().next().show().attr("id", f.removeAttr("id").data("placeholder-id"));
            if (a === !0) return f[0].value = d;
            f.focus()
        } else e.value = "",
        f.removeClass("placeholder"),
        e == b.activeElement && e.select()
    }
    function l() {
        var a,
        b = this,
        d = c(b),
        e = d,
        f = this.id;
        if (b.value == "") {
            if (b.type == "password") {
                if (!d.data("placeholder-textinput")) {
                    try {
                        a = d.clone().attr({
                            type: "text"
                        })
                    } catch(g) {
                        a = c("<input>").attr(c.extend(j(this), {
                            type: "text"
                        }))
                    }
                    a.removeAttr("name").data({
                        "placeholder-password": !0,
                        "placeholder-id": f
                    }).bind("focus.placeholder", k),
                    d.data({
                        "placeholder-textinput": a,
                        "placeholder-id": f
                    }).before(a)
                }
                d = d.removeAttr("id").hide().prev().attr("id", f).show()
            }
            d.addClass("placeholder"),
            d[0].value = d.attr("placeholder")
        } else d.removeClass("placeholder")
    }
    var d = "placeholder" in b.createElement("input"),
    e = "placeholder" in b.createElement("textarea"),
    f = c.fn,
    g = c.valHooks,
    h,
    i;
    d && e ? (i = f.placeholder = function() {
        return this
    },
    i.input = i.textarea = !0) : (i = f.placeholder = function() {
        var a = this;
        return a.filter((d ? "textarea": ":input") + "[placeholder]").not(".placeholder").bind({
            "focus.placeholder": k,
            "blur.placeholder": l
        }).data("placeholder-enabled", !0).trigger("blur.placeholder"),
        a
    },
    i.input = d, i.textarea = e, h = {
        get: function(a) {
            var b = c(a);
            return b.data("placeholder-enabled") && b.hasClass("placeholder") ? "": a.value
        },
        set: function(a, d) {
            var e = c(a);
            return e.data("placeholder-enabled") ? (d == "" ? (a.value = d, a != b.activeElement && l.call(a)) : e.hasClass("placeholder") ? k.call(a, !0, d) || (a.value = d) : a.value = d, e) : a.value = d
        }
    },
    d || (g.input = h), e || (g.textarea = h), c(function() {
        c(b).delegate("form", "submit.placeholder", 
        function() {
            var a = c(".placeholder", this).each(k);
            setTimeout(function() {
                a.each(l)
            },
            10)
        })
    }), c(a).bind("beforeunload.placeholder", 
    function() {
        c(".placeholder").each(function() {
            this.value = ""
        })
    }))
} (this, document, jQuery),
function(a, b) {
    function m(a, b, c) {
        var d = h[b.type] || {};
        return a == null ? c || !b.def ? null: b.def: (a = d.floor ? ~~a: parseFloat(a), isNaN(a) ? b.def: d.mod ? (a + d.mod) % d.mod: 0 > a ? 0: d.max < a ? d.max: a)
    }
    function n(b) {
        var c = f(),
        d = c._rgba = [];
        return b = b.toLowerCase(),
        l(e, 
        function(a, e) {
            var f,
            h = e.re.exec(b),
            i = h && e.parse(h),
            j = e.space || "rgba";
            if (i) return f = c[j](i),
            c[g[j].cache] = f[g[j].cache],
            d = c._rgba = f._rgba,
            !1
        }),
        d.length ? (d.join() === "0,0,0,0" && a.extend(d, k.transparent), c) : k[b]
    }
    function o(a, b, c) {
        return c = (c + 1) % 1,
        c * 6 < 1 ? a + (b - a) * c * 6: c * 2 < 1 ? b: c * 3 < 2 ? a + (b - a) * (2 / 3 - c) * 6: a
    }
    var c = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
    d = /^([\-+])=\s*(\d+\.?\d*)/,
    e = [{
        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function(a) {
            return [a[1], a[2], a[3], a[4]]
        }
    },
    {
        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function(a) {
            return [a[1] * 2.55, a[2] * 2.55, a[3] * 2.55, a[4]]
        }
    },
    {
        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
        parse: function(a) {
            return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
        }
    },
    {
        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
        parse: function(a) {
            return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
        }
    },
    {
        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        space: "hsla",
        parse: function(a) {
            return [a[1], a[2] / 100, a[3] / 100, a[4]]
        }
    }],
    f = a.Color = function(b, c, d, e) {
        return new a.Color.fn.parse(b, c, d, e)
    },
    g = {
        rgba: {
            props: {
                red: {
                    idx: 0,
                    type: "byte"
                },
                green: {
                    idx: 1,
                    type: "byte"
                },
                blue: {
                    idx: 2,
                    type: "byte"
                }
            }
        },
        hsla: {
            props: {
                hue: {
                    idx: 0,
                    type: "degrees"
                },
                saturation: {
                    idx: 1,
                    type: "percent"
                },
                lightness: {
                    idx: 2,
                    type: "percent"
                }
            }
        }
    },
    h = {
        "byte": {
            floor: !0,
            max: 255
        },
        percent: {
            max: 1
        },
        degrees: {
            mod: 360,
            floor: !0
        }
    },
    i = f.support = {},
    j = a("<p>")[0],
    k,
    l = a.each;
    j.style.cssText = "background-color:rgba(1,1,1,.5)",
    i.rgba = j.style.backgroundColor.indexOf("rgba") > -1,
    l(g, 
    function(a, b) {
        b.cache = "_" + a,
        b.props.alpha = {
            idx: 3,
            type: "percent",
            def: 1
        }
    }),
    f.fn = a.extend(f.prototype, {
        parse: function(c, d, e, h) {
            if (c === b) return this._rgba = [null, null, null, null],
            this;
            if (c.jquery || c.nodeType) c = a(c).css(d),
            d = b;
            var i = this,
            j = a.type(c),
            o = this._rgba = [],
            p;
            d !== b && (c = [c, d, e, h], j = "array");
            if (j === "string") return this.parse(n(c) || k._default);
            if (j === "array") return l(g.rgba.props, 
            function(a, b) {
                o[b.idx] = m(c[b.idx], b)
            }),
            this;
            if (j === "object") return c instanceof f ? l(g, 
            function(a, b) {
                c[b.cache] && (i[b.cache] = c[b.cache].slice())
            }) : l(g, 
            function(b, d) {
                var e = d.cache;
                l(d.props, 
                function(a, b) {
                    if (!i[e] && d.to) {
                        if (a === "alpha" || c[a] == null) return;
                        i[e] = d.to(i._rgba)
                    }
                    i[e][b.idx] = m(c[a], b, !0)
                }),
                i[e] && a.inArray(null, i[e].slice(0, 3)) < 0 && (i[e][3] = 1, d.from && (i._rgba = d.from(i[e])))
            }),
            this
        },
        is: function(a) {
            var b = f(a),
            c = !0,
            d = this;
            return l(g, 
            function(a, e) {
                var f,
                g = b[e.cache];
                return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], l(e.props, 
                function(a, b) {
                    if (g[b.idx] != null) return c = g[b.idx] === f[b.idx],
                    c
                })),
                c
            }),
            c
        },
        _space: function() {
            var a = [],
            b = this;
            return l(g, 
            function(c, d) {
                b[d.cache] && a.push(c)
            }),
            a.pop()
        },
        transition: function(a, b) {
            var c = f(a),
            d = c._space(),
            e = g[d],
            i = this.alpha() === 0 ? f("transparent") : this,
            j = i[e.cache] || e.to(i._rgba),
            k = j.slice();
            return c = c[e.cache],
            l(e.props, 
            function(a, d) {
                var e = d.idx,
                f = j[e],
                g = c[e],
                i = h[d.type] || {};
                if (g === null) return;
                f === null ? k[e] = g: (i.mod && (g - f > i.mod / 2 ? f += i.mod: f - g > i.mod / 2 && (f -= i.mod)), k[e] = m((g - f) * b + f, d))
            }),
            this[d](k)
        },
        blend: function(b) {
            if (this._rgba[3] === 1) return this;
            var c = this._rgba.slice(),
            d = c.pop(),
            e = f(b)._rgba;
            return f(a.map(c, 
            function(a, b) {
                return (1 - d) * e[b] + d * a
            }))
        },
        toRgbaString: function() {
            var b = "rgba(",
            c = a.map(this._rgba, 
            function(a, b) {
                return a == null ? b > 2 ? 1: 0: a
            });
            return c[3] === 1 && (c.pop(), b = "rgb("),
            b + c.join() + ")"
        },
        toHslaString: function() {
            var b = "hsla(",
            c = a.map(this.hsla(), 
            function(a, b) {
                return a == null && (a = b > 2 ? 1: 0),
                b && b < 3 && (a = Math.round(a * 100) + "%"),
                a
            });
            return c[3] === 1 && (c.pop(), b = "hsl("),
            b + c.join() + ")"
        },
        toHexString: function(b) {
            var c = this._rgba.slice(),
            d = c.pop();
            return b && c.push(~~ (d * 255)),
            "#" + a.map(c, 
            function(a, b) {
                return a = (a || 0).toString(16),
                a.length === 1 ? "0" + a: a
            }).join("")
        },
        toString: function() {
            return this._rgba[3] === 0 ? "transparent": this.toRgbaString()
        }
    }),
    f.fn.parse.prototype = f.fn,
    g.hsla.to = function(a) {
        if (a[0] == null || a[1] == null || a[2] == null) return [null, null, null, a[3]];
        var b = a[0] / 255,
        c = a[1] / 255,
        d = a[2] / 255,
        e = a[3],
        f = Math.max(b, c, d),
        g = Math.min(b, c, d),
        h = f - g,
        i = f + g,
        j = i * .5,
        k,
        l;
        return g === f ? k = 0: b === f ? k = 60 * (c - d) / h + 360: c === f ? k = 60 * (d - b) / h + 120: k = 60 * (b - c) / h + 240,
        j === 0 || j === 1 ? l = j: j <= .5 ? l = h / i: l = h / (2 - i),
        [Math.round(k) % 360, l, j, e == null ? 1: e]
    },
    g.hsla.from = function(a) {
        if (a[0] == null || a[1] == null || a[2] == null) return [null, null, null, a[3]];
        var b = a[0] / 360,
        c = a[1],
        d = a[2],
        e = a[3],
        f = d <= .5 ? d * (1 + c) : d + c - d * c,
        g = 2 * d - f,
        h,
        i,
        j;
        return [Math.round(o(g, f, b + 1 / 3) * 255), Math.round(o(g, f, b) * 255), Math.round(o(g, f, b - 1 / 3) * 255), e]
    },
    l(g, 
    function(c, e) {
        var g = e.props,
        h = e.cache,
        i = e.to,
        j = e.from;
        f.fn[c] = function(c) {
            i && !this[h] && (this[h] = i(this._rgba));
            if (c === b) return this[h].slice();
            var d,
            e = a.type(c),
            k = e === "array" || e === "object" ? c: arguments,
            n = this[h].slice();
            return l(g, 
            function(a, b) {
                var c = k[e === "object" ? a: b.idx];
                c == null && (c = n[b.idx]),
                n[b.idx] = m(c, b)
            }),
            j ? (d = f(j(n)), d[h] = n, d) : f(n)
        },
        l(g, 
        function(b, e) {
            if (f.fn[b]) return;
            f.fn[b] = function(f) {
                var g = a.type(f),
                h = b === "alpha" ? this._hsla ? "hsla": "rgba": c,
                i = this[h](),
                j = i[e.idx],
                k;
                return g === "undefined" ? j: (g === "function" && (f = f.call(this, j), g = a.type(f)), f == null && e.empty ? this: (g === "string" && (k = d.exec(f), k && (f = j + parseFloat(k[2]) * (k[1] === "+" ? 1: -1))), i[e.idx] = f, this[h](i)))
            }
        })
    }),
    f.hook = function(b) {
        var c = b.split(" ");
        l(c, 
        function(b, c) {
            a.cssHooks[c] = {
                set: function(b, d) {
                    var e,
                    g,
                    h = "";
                    if (a.type(d) !== "string" || (e = n(d))) {
                        d = f(e || d);
                        if (!i.rgba && d._rgba[3] !== 1) {
                            g = c === "backgroundColor" ? b.parentNode: b;
                            while ((h === "" || h === "transparent") && g && g.style) try {
                                h = a.css(g, "backgroundColor"),
                                g = g.parentNode
                            } catch(j) {}
                            d = d.blend(h && h !== "transparent" ? h: "_default")
                        }
                        d = d.toRgbaString()
                    }
                    try {
                        b.style[c] = d
                    } catch(d) {}
                }
            },
            a.fx.step[c] = function(b) {
                b.colorInit || (b.start = f(b.elem, c), b.end = f(b.end), b.colorInit = !0),
                a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos))
            }
        })
    },
    f.hook(c),
    a.cssHooks.borderColor = {
        expand: function(a) {
            var b = {};
            return l(["Top", "Right", "Bottom", "Left"], 
            function(c, d) {
                b["border" + d + "Color"] = a
            }),
            b
        }
    },
    k = a.Color.names = {
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",
        transparent: [null, null, null, 0],
        _default: "#ffffff"
    }
} (jQuery);
var wysihtml5ParserRules = {
    classes: {
        "wysiwyg-clear-both": 1,
        "wysiwyg-clear-left": 1,
        "wysiwyg-clear-right": 1,
        "wysiwyg-color-aqua": 1,
        "wysiwyg-color-black": 1,
        "wysiwyg-color-blue": 1,
        "wysiwyg-color-fuchsia": 1,
        "wysiwyg-color-gray": 1,
        "wysiwyg-color-green": 1,
        "wysiwyg-color-lime": 1,
        "wysiwyg-color-maroon": 1,
        "wysiwyg-color-navy": 1,
        "wysiwyg-color-olive": 1,
        "wysiwyg-color-purple": 1,
        "wysiwyg-color-red": 1,
        "wysiwyg-color-silver": 1,
        "wysiwyg-color-teal": 1,
        "wysiwyg-color-white": 1,
        "wysiwyg-color-yellow": 1,
        "wysiwyg-float-left": 1,
        "wysiwyg-float-right": 1,
        "wysiwyg-font-size-large": 1,
        "wysiwyg-font-size-larger": 1,
        "wysiwyg-font-size-medium": 1,
        "wysiwyg-font-size-small": 1,
        "wysiwyg-font-size-smaller": 1,
        "wysiwyg-font-size-x-large": 1,
        "wysiwyg-font-size-x-small": 1,
        "wysiwyg-font-size-xx-large": 1,
        "wysiwyg-font-size-xx-small": 1,
        "wysiwyg-text-align-center": 1,
        "wysiwyg-text-align-justify": 1,
        "wysiwyg-text-align-left": 1,
        "wysiwyg-text-align-right": 1
    },
    tags: {
        tr: {
            add_class: {
                align: "align_text"
            }
        },
        strike: {
            remove: 1
        },
        form: {
            rename_tag: "div"
        },
        rt: {
            rename_tag: "span"
        },
        code: {},
        acronym: {
            rename_tag: "span"
        },
        br: {
            add_class: {
                clear: "clear_br"
            }
        },
        details: {
            rename_tag: "div"
        },
        h4: {
            add_class: {
                align: "align_text"
            }
        },
        em: {},
        title: {
            remove: 1
        },
        multicol: {
            rename_tag: "div"
        },
        figure: {
            rename_tag: "div"
        },
        xmp: {
            rename_tag: "span"
        },
        small: {
            rename_tag: "span",
            set_class: "wysiwyg-font-size-smaller"
        },
        area: {
            remove: 1
        },
        time: {
            rename_tag: "span"
        },
        dir: {
            rename_tag: "ul"
        },
        bdi: {
            rename_tag: "span"
        },
        command: {
            remove: 1
        },
        ul: {},
        progress: {
            rename_tag: "span"
        },
        dfn: {
            rename_tag: "span"
        },
        iframe: {
            remove: 1
        },
        figcaption: {
            rename_tag: "div"
        },
        a: {
            check_attributes: {
                href: "href"
            },
            set_attributes: {
                rel: "nofollow",
                target: "_blank"
            }
        },
        img: {
            check_attributes: {
                width: "numbers",
                alt: "alt",
                src: "src",
                height: "numbers"
            },
            add_class: {
                align: "align_img"
            }
        },
        rb: {
            rename_tag: "span"
        },
        footer: {
            rename_tag: "div"
        },
        noframes: {
            remove: 1
        },
        abbr: {
            rename_tag: "span"
        },
        u: {},
        bgsound: {
            remove: 1
        },
        sup: {
            rename_tag: "span"
        },
        address: {
            rename_tag: "div"
        },
        basefont: {
            remove: 1
        },
        nav: {
            rename_tag: "div"
        },
        h1: {
            add_class: {
                align: "align_text"
            }
        },
        head: {
            remove: 1
        },
        tbody: {
            add_class: {
                align: "align_text"
            }
        },
        dd: {
            rename_tag: "div"
        },
        s: {
            rename_tag: "span"
        },
        li: {},
        td: {
            check_attributes: {
                rowspan: "numbers",
                colspan: "numbers"
            },
            add_class: {
                align: "align_text"
            }
        },
        object: {
            remove: 1
        },
        div: {
            add_class: {
                align: "align_text"
            }
        },
        option: {
            rename_tag: "span"
        },
        select: {
            rename_tag: "span"
        },
        i: {},
        track: {
            remove: 1
        },
        wbr: {
            remove: 1
        },
        fieldset: {
            rename_tag: "div"
        },
        big: {
            rename_tag: "span",
            set_class: "wysiwyg-font-size-larger"
        },
        button: {
            rename_tag: "span"
        },
        noscript: {
            remove: 1
        },
        svg: {
            remove: 1
        },
        input: {
            remove: 1
        },
        table: {},
        keygen: {
            remove: 1
        },
        h5: {
            add_class: {
                align: "align_text"
            }
        },
        meta: {
            remove: 1
        },
        map: {
            rename_tag: "div"
        },
        isindex: {
            remove: 1
        },
        mark: {
            rename_tag: "span"
        },
        caption: {
            add_class: {
                align: "align_text"
            }
        },
        tfoot: {
            add_class: {
                align: "align_text"
            }
        },
        base: {
            remove: 1
        },
        video: {
            remove: 1
        },
        strong: {},
        canvas: {
            remove: 1
        },
        output: {
            rename_tag: "span"
        },
        marquee: {
            rename_tag: "span"
        },
        b: {},
        q: {
            check_attributes: {
                cite: "url"
            }
        },
        applet: {
            remove: 1
        },
        span: {},
        rp: {
            rename_tag: "span"
        },
        spacer: {
            remove: 1
        },
        source: {
            remove: 1
        },
        aside: {
            rename_tag: "div"
        },
        frame: {
            remove: 1
        },
        section: {
            rename_tag: "div"
        },
        body: {
            rename_tag: "div"
        },
        ol: {},
        nobr: {
            rename_tag: "span"
        },
        html: {
            rename_tag: "div"
        },
        summary: {
            rename_tag: "span"
        },
        "var": {
            rename_tag: "span"
        },
        del: {
            remove: 1
        },
        blockquote: {
            check_attributes: {
                cite: "url"
            }
        },
        style: {
            remove: 1
        },
        device: {
            remove: 1
        },
        meter: {
            rename_tag: "span"
        },
        h3: {
            add_class: {
                align: "align_text"
            }
        },
        textarea: {
            rename_tag: "span"
        },
        embed: {
            remove: 1
        },
        hgroup: {
            rename_tag: "div"
        },
        font: {
            rename_tag: "span",
            add_class: {
                size: "size_font"
            }
        },
        tt: {
            rename_tag: "span"
        },
        noembed: {
            remove: 1
        },
        thead: {
            add_class: {
                align: "align_text"
            }
        },
        blink: {
            rename_tag: "span"
        },
        plaintext: {
            rename_tag: "span"
        },
        xml: {
            remove: 1
        },
        h6: {
            add_class: {
                align: "align_text"
            }
        },
        param: {
            remove: 1
        },
        th: {
            check_attributes: {
                rowspan: "numbers",
                colspan: "numbers"
            },
            add_class: {
                align: "align_text"
            }
        },
        legend: {
            rename_tag: "span"
        },
        hr: {},
        label: {
            rename_tag: "span"
        },
        dl: {
            rename_tag: "div"
        },
        kbd: {
            rename_tag: "span"
        },
        listing: {
            rename_tag: "div"
        },
        dt: {
            rename_tag: "span"
        },
        nextid: {
            remove: 1
        },
        pre: {},
        center: {
            rename_tag: "div",
            set_class: "wysiwyg-text-align-center"
        },
        audio: {
            remove: 1
        },
        datalist: {
            rename_tag: "span"
        },
        samp: {
            rename_tag: "span"
        },
        col: {
            remove: 1
        },
        article: {
            rename_tag: "div"
        },
        cite: {},
        link: {
            remove: 1
        },
        script: {
            remove: 1
        },
        bdo: {
            rename_tag: "span"
        },
        menu: {
            rename_tag: "ul"
        },
        colgroup: {
            remove: 1
        },
        ruby: {
            rename_tag: "span"
        },
        h2: {
            add_class: {
                align: "align_text"
            }
        },
        ins: {
            rename_tag: "span"
        },
        p: {
            add_class: {
                align: "align_text"
            }
        },
        sub: {
            rename_tag: "span"
        },
        comment: {
            remove: 1
        },
        frameset: {
            remove: 1
        },
        optgroup: {
            rename_tag: "span"
        },
        header: {
            rename_tag: "div"
        }
    }
},
wysihtml5 = {
    version: "0.3.0",
    commands: {},
    dom: {},
    quirks: {},
    toolbar: {},
    lang: {},
    selection: {},
    views: {},
    INVISIBLE_SPACE: "﻿",
    EMPTY_FUNCTION: function() {},
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    BACKSPACE_KEY: 8,
    ENTER_KEY: 13,
    ESCAPE_KEY: 27,
    SPACE_KEY: 32,
    DELETE_KEY: 46
};
window.rangy = function() {
    function h(c, d) {
        var e = typeof c[d];
        return e == b || e == a && !!c[d] || e == "unknown"
    }
    function i(b, c) {
        return typeof b[c] == a && !!b[c]
    }
    function j(a, b) {
        return typeof a[b] != c
    }
    function k(a) {
        return function(b, c) {
            var d = c.length;
            while (d--) if (!a(b, c[d])) return ! 1;
            return ! 0
        }
    }
    function o(a) {
        return a && l(a, g) && n(a, f)
    }
    function q(a) {
        window.alert("Rangy not supported in your browser. Reason: " + a),
        p.initialized = !0,
        p.supported = !1
    }
    function r(a) {
        var b = "Rangy warning: " + a;
        p.config.alertOnWarn ? window.alert(b) : typeof window.console != c && typeof window.console.log != c && window.console.log(b)
    }
    function u() {
        if (p.initialized) return;
        var a,
        b = !1,
        c = !1;
        h(document, "createRange") && (a = document.createRange(), l(a, e) && n(a, d) && (b = !0), a.detach());
        var f = i(document, "body") ? document.body: document.getElementsByTagName("body")[0];
        f && h(f, "createTextRange") && (a = f.createTextRange(), o(a) && (c = !0)),
        !b && !c && q("Neither Range nor TextRange are implemented"),
        p.initialized = !0,
        p.features = {
            implementsDomRange: b,
            implementsTextRange: c
        };
        var g = t.concat(s);
        for (var j = 0, k = g.length; j < k; ++j) try {
            g[j](p)
        } catch(m) {
            i(window, "console") && h(window.console, "log") && window.console.log("Init listener threw an exception. Continuing.", m)
        }
    }
    function w(a) {
        a = a || window,
        u();
        for (var b = 0, c = v.length; b < c; ++b) v[b](a)
    }
    function x(a) {
        this.name = a,
        this.initialized = !1,
        this.supported = !1
    }
    var a = "object",
    b = "function",
    c = "undefined",
    d = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer", "START_TO_START", "START_TO_END", "END_TO_START", "END_TO_END"],
    e = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore", "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents", "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"],
    f = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"],
    g = ["collapse", "compareEndPoints", "duplicate", "getBookmark", "moveToBookmark", "moveToElementText", "parentElement", "pasteHTML", "select", "setEndPoint", "getBoundingClientRect"],
    l = k(h),
    m = k(i),
    n = k(j),
    p = {
        version: "1.2.2",
        initialized: !1,
        supported: !0,
        util: {
            isHostMethod: h,
            isHostObject: i,
            isHostProperty: j,
            areHostMethods: l,
            areHostObjects: m,
            areHostProperties: n,
            isTextRange: o
        },
        features: {},
        modules: {},
        config: {
            alertOnWarn: !1,
            preferTextRange: !1
        }
    };
    p.fail = q,
    p.warn = r,
    {}.hasOwnProperty ? p.util.extend = function(a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }: q("hasOwnProperty not supported");
    var s = [],
    t = [];
    p.init = u,
    p.addInitListener = function(a) {
        p.initialized ? a(p) : s.push(a)
    };
    var v = [];
    p.addCreateMissingNativeApiListener = function(a) {
        v.push(a)
    },
    p.createMissingNativeApi = w,
    x.prototype.fail = function(a) {
        throw this.initialized = !0,
        this.supported = !1,
        new Error("Module '" + this.name + "' failed to load: " + a)
    },
    x.prototype.warn = function(a) {
        p.warn("Module " + this.name + ": " + a)
    },
    x.prototype.createError = function(a) {
        return new Error("Error in Rangy " + this.name + " module: " + a)
    },
    p.createModule = function(a, b) {
        var c = new x(a);
        p.modules[a] = c,
        t.push(function(a) {
            b(a, c),
            c.initialized = !0,
            c.supported = !0
        })
    },
    p.requireModules = function(a) {
        for (var b = 0, c = a.length, d, e; b < c; ++b) {
            e = a[b],
            d = p.modules[e];
            if (!d || !(d instanceof x)) throw new Error("Module '" + e + "' not found");
            if (!d.supported) throw new Error("Module '" + e + "' not supported")
        }
    };
    var y = !1,
    z = function(a) {
        y || (y = !0, p.initialized || u())
    };
    if (typeof window == c) {
        q("No window found");
        return
    }
    if (typeof document == c) {
        q("No document found");
        return
    }
    return h(document, "addEventListener") && document.addEventListener("DOMContentLoaded", z, !1),
    h(window, "addEventListener") ? window.addEventListener("load", z, !1) : h(window, "attachEvent") ? window.attachEvent("onload", z) : q("Window does not have required addEventListener or attachEvent method"),
    p
} (),
rangy.createModule("DomUtil", 
function(a, b) {
    function h(a) {
        var b;
        return typeof a.namespaceURI == c || (b = a.namespaceURI) === null || b == "http://www.w3.org/1999/xhtml"
    }
    function i(a) {
        var b = a.parentNode;
        return b.nodeType == 1 ? b: null
    }
    function j(a) {
        var b = 0;
        while (a = a.previousSibling) b++;
        return b
    }
    function k(a) {
        var b;
        return o(a) ? a.length: (b = a.childNodes) ? b.length: 0
    }
    function l(a, b) {
        var c = [],
        d;
        for (d = a; d; d = d.parentNode) c.push(d);
        for (d = b; d; d = d.parentNode) if (g(c, d)) return d;
        return null
    }
    function m(a, b, c) {
        var d = c ? b: b.parentNode;
        while (d) {
            if (d === a) return ! 0;
            d = d.parentNode
        }
        return ! 1
    }
    function n(a, b, c) {
        var d,
        e = c ? a: a.parentNode;
        while (e) {
            d = e.parentNode;
            if (d === b) return e;
            e = d
        }
        return null
    }
    function o(a) {
        var b = a.nodeType;
        return b == 3 || b == 4 || b == 8
    }
    function p(a, b) {
        var c = b.nextSibling,
        d = b.parentNode;
        return c ? d.insertBefore(a, c) : d.appendChild(a),
        a
    }
    function q(a, b) {
        var c = a.cloneNode(!1);
        return c.deleteData(0, b),
        a.deleteData(b, a.length - b),
        p(c, a),
        c
    }
    function r(a) {
        if (a.nodeType == 9) return a;
        if (typeof a.ownerDocument != c) return a.ownerDocument;
        if (typeof a.document != c) return a.document;
        if (a.parentNode) return r(a.parentNode);
        throw new Error("getDocument: no document found for node")
    }
    function s(a) {
        var b = r(a);
        if (typeof b.defaultView != c) return b.defaultView;
        if (typeof b.parentWindow != c) return b.parentWindow;
        throw new Error("Cannot get a window object for node")
    }
    function t(a) {
        if (typeof a.contentDocument != c) return a.contentDocument;
        if (typeof a.contentWindow != c) return a.contentWindow.document;
        throw new Error("getIframeWindow: No Document object found for iframe element")
    }
    function u(a) {
        if (typeof a.contentWindow != c) return a.contentWindow;
        if (typeof a.contentDocument != c) return a.contentDocument.defaultView;
        throw new Error("getIframeWindow: No Window object found for iframe element")
    }
    function v(a) {
        return d.isHostObject(a, "body") ? a.body: a.getElementsByTagName("body")[0]
    }
    function w(a) {
        var b;
        while (b = a.parentNode) a = b;
        return a
    }
    function x(a, b, c, d) {
        var e,
        f,
        g,
        h,
        i;
        if (a == c) return b === d ? 0: b < d ? -1: 1;
        if (e = n(c, a, !0)) return b <= j(e) ? -1: 1;
        if (e = n(a, c, !0)) return j(e) < d ? -1: 1;
        f = l(a, c),
        g = a === f ? f: n(a, f, !0),
        h = c === f ? f: n(c, f, !0);
        if (g === h) throw new Error("comparePoints got to case 4 and childA and childB are the same!");
        i = f.firstChild;
        while (i) {
            if (i === g) return - 1;
            if (i === h) return 1;
            i = i.nextSibling
        }
        throw new Error("Should not be here!")
    }
    function y(a) {
        var b = r(a).createDocumentFragment(),
        c;
        while (c = a.firstChild) b.appendChild(c);
        return b
    }
    function z(a) {
        if (!a) return "[No node]";
        if (o(a)) return '"' + a.data + '"';
        if (a.nodeType == 1) {
            var b = a.id ? ' id="' + a.id + '"': "";
            return "<" + a.nodeName + b + ">[" + a.childNodes.length + "]"
        }
        return a.nodeName
    }
    function A(a) {
        this.root = a,
        this._next = a
    }
    function B(a) {
        return new A(a)
    }
    function C(a, b) {
        this.node = a,
        this.offset = b
    }
    function D(a) {
        this.code = this[a],
        this.codeName = a,
        this.message = "DOMException: " + this.codeName
    }
    var c = "undefined",
    d = a.util;
    d.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"]) || b.fail("document missing a Node creation method"),
    d.isHostMethod(document, "getElementsByTagName") || b.fail("document missing getElementsByTagName method");
    var e = document.createElement("div");
    d.areHostMethods(e, ["insertBefore", "appendChild", "cloneNode"] || !d.areHostObjects(e, ["previousSibling", "nextSibling", "childNodes", "parentNode"])) || b.fail("Incomplete Element implementation"),
    d.isHostProperty(e, "innerHTML") || b.fail("Element is missing innerHTML property");
    var f = document.createTextNode("test");
    d.areHostMethods(f, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"] || !d.areHostObjects(e, ["previousSibling", "nextSibling", "childNodes", "parentNode"]) || !d.areHostProperties(f, ["data"])) || b.fail("Incomplete Text Node implementation");
    var g = function(a, b) {
        var c = a.length;
        while (c--) if (a[c] === b) return ! 0;
        return ! 1
    };
    A.prototype = {
        _current: null,
        hasNext: function() {
            return !! this._next
        },
        next: function() {
            var a = this._current = this._next,
            b,
            c;
            if (this._current) {
                b = a.firstChild;
                if (b) this._next = b;
                else {
                    c = null;
                    while (a !== this.root && !(c = a.nextSibling)) a = a.parentNode;
                    this._next = c
                }
            }
            return this._current
        },
        detach: function() {
            this._current = this._next = this.root = null
        }
    },
    C.prototype = {
        equals: function(a) {
            return this.node === a.node & this.offset == a.offset
        },
        inspect: function() {
            return "[DomPosition(" + z(this.node) + ":" + this.offset + ")]"
        }
    },
    D.prototype = {
        INDEX_SIZE_ERR: 1,
        HIERARCHY_REQUEST_ERR: 3,
        WRONG_DOCUMENT_ERR: 4,
        NO_MODIFICATION_ALLOWED_ERR: 7,
        NOT_FOUND_ERR: 8,
        NOT_SUPPORTED_ERR: 9,
        INVALID_STATE_ERR: 11
    },
    D.prototype.toString = function() {
        return this.message
    },
    a.dom = {
        arrayContains: g,
        isHtmlNamespace: h,
        parentElement: i,
        getNodeIndex: j,
        getNodeLength: k,
        getCommonAncestor: l,
        isAncestorOf: m,
        getClosestAncestorIn: n,
        isCharacterDataNode: o,
        insertAfter: p,
        splitDataNode: q,
        getDocument: r,
        getWindow: s,
        getIframeWindow: u,
        getIframeDocument: t,
        getBody: v,
        getRootContainer: w,
        comparePoints: x,
        inspectNode: z,
        fragmentFromNodeChildren: y,
        createIterator: B,
        DomPosition: C
    },
    a.DOMException = D
}),
rangy.createModule("DomRange", 
function(a, b) {
    function f(a, b) {
        return a.nodeType != 3 && (c.isAncestorOf(a, b.startContainer, !0) || c.isAncestorOf(a, b.endContainer, !0))
    }
    function g(a) {
        return c.getDocument(a.startContainer)
    }
    function h(a, b, c) {
        var d = a._listeners[b];
        if (d) for (var e = 0, f = d.length; e < f; ++e) d[e].call(a, {
            target: a,
            args: c
        })
    }
    function i(a) {
        return new d(a.parentNode, c.getNodeIndex(a))
    }
    function j(a) {
        return new d(a.parentNode, c.getNodeIndex(a) + 1)
    }
    function k(a, b, d) {
        var e = a.nodeType == 11 ? a.firstChild: a;
        return c.isCharacterDataNode(b) ? d == b.length ? c.insertAfter(a, b) : b.parentNode.insertBefore(a, d == 0 ? b: c.splitDataNode(b, d)) : d >= b.childNodes.length ? b.appendChild(a) : b.insertBefore(a, b.childNodes[d]),
        e
    }
    function l(a) {
        var b;
        for (var c, d = g(a.range).createDocumentFragment(), f; c = a.next();) {
            b = a.isPartiallySelectedSubtree(),
            c = c.cloneNode(!b),
            b && (f = a.getSubtreeIterator(), c.appendChild(l(f)), f.detach(!0));
            if (c.nodeType == 10) throw new e("HIERARCHY_REQUEST_ERR");
            d.appendChild(c)
        }
        return d
    }
    function m(a, b, d) {
        var e,
        f;
        d = d || {
            stop: !1
        };
        for (var g, h; g = a.next();) if (a.isPartiallySelectedSubtree()) {
            if (b(g) === !1) {
                d.stop = !0;
                return
            }
            h = a.getSubtreeIterator(),
            m(h, b, d),
            h.detach(!0);
            if (d.stop) return
        } else {
            e = c.createIterator(g);
            while (f = e.next()) if (b(f) === !1) {
                d.stop = !0;
                return
            }
        }
    }
    function n(a) {
        var b;
        while (a.next()) a.isPartiallySelectedSubtree() ? (b = a.getSubtreeIterator(), n(b), b.detach(!0)) : a.remove()
    }
    function o(a) {
        for (var b, c = g(a.range).createDocumentFragment(), d; b = a.next();) {
            a.isPartiallySelectedSubtree() ? (b = b.cloneNode(!1), d = a.getSubtreeIterator(), b.appendChild(o(d)), d.detach(!0)) : a.remove();
            if (b.nodeType == 10) throw new e("HIERARCHY_REQUEST_ERR");
            c.appendChild(b)
        }
        return c
    }
    function p(a, b, c) {
        var d = !!b && !!b.length,
        e,
        f = !!c;
        d && (e = new RegExp("^(" + b.join("|") + ")$"));
        var g = [];
        return m(new r(a, !1), 
        function(a) { (!d || e.test(a.nodeType)) && (!f || c(a)) && g.push(a)
        }),
        g
    }
    function q(a) {
        var b = typeof a.getName == "undefined" ? "Range": a.getName();
        return "[" + b + "(" + c.inspectNode(a.startContainer) + ":" + a.startOffset + ", " + c.inspectNode(a.endContainer) + ":" + a.endOffset + ")]"
    }
    function r(a, b) {
        this.range = a,
        this.clonePartiallySelectedTextNodes = b;
        if (!a.collapsed) {
            this.sc = a.startContainer,
            this.so = a.startOffset,
            this.ec = a.endContainer,
            this.eo = a.endOffset;
            var d = a.commonAncestorContainer;
            this.sc === this.ec && c.isCharacterDataNode(this.sc) ? (this.isSingleCharacterDataNode = !0, this._first = this._last = this._next = this.sc) : (this._first = this._next = this.sc === d && !c.isCharacterDataNode(this.sc) ? this.sc.childNodes[this.so] : c.getClosestAncestorIn(this.sc, d, !0), this._last = this.ec === d && !c.isCharacterDataNode(this.ec) ? this.ec.childNodes[this.eo - 1] : c.getClosestAncestorIn(this.ec, d, !0))
        }
    }
    function s(a) {
        this.code = this[a],
        this.codeName = a,
        this.message = "RangeException: " + this.codeName
    }
    function t(a, b, c) {
        this.nodes = p(a, b, c),
        this._next = this.nodes[0],
        this._position = 0
    }
    function z(a) {
        return function(b, d) {
            var e,
            f = d ? b: b.parentNode;
            while (f) {
                e = f.nodeType;
                if (c.arrayContains(a, e)) return f;
                f = f.parentNode
            }
            return null
        }
    }
    function E(a, b) {
        if (D(a, b)) throw new s("INVALID_NODE_TYPE_ERR")
    }
    function F(a) {
        if (!a.startContainer) throw new e("INVALID_STATE_ERR")
    }
    function G(a, b) {
        if (!c.arrayContains(b, a.nodeType)) throw new s("INVALID_NODE_TYPE_ERR")
    }
    function H(a, b) {
        if (b < 0 || b > (c.isCharacterDataNode(a) ? a.length: a.childNodes.length)) throw new e("INDEX_SIZE_ERR")
    }
    function I(a, b) {
        if (B(a, !0) !== B(b, !0)) throw new e("WRONG_DOCUMENT_ERR")
    }
    function J(a) {
        if (C(a, !0)) throw new e("NO_MODIFICATION_ALLOWED_ERR")
    }
    function K(a, b) {
        if (!a) throw new e(b)
    }
    function L(a) {
        return ! c.arrayContains(v, a.nodeType) && !B(a, !0)
    }
    function M(a, b) {
        return b <= (c.isCharacterDataNode(a) ? a.length: a.childNodes.length)
    }
    function N(a) {
        F(a);
        if (L(a.startContainer) || L(a.endContainer) || !M(a.startContainer, a.startOffset) || !M(a.endContainer, a.endOffset)) throw new Error("Range error: Range is no longer valid after DOM mutation (" + a.inspect() + ")")
    }
    function _() {}
    function ba(a) {
        a.START_TO_START = T,
        a.START_TO_END = U,
        a.END_TO_END = V,
        a.END_TO_START = W,
        a.NODE_BEFORE = X,
        a.NODE_AFTER = Y,
        a.NODE_BEFORE_AND_AFTER = Z,
        a.NODE_INSIDE = $
    }
    function bb(a) {
        ba(a),
        ba(a.prototype)
    }
    function bc(a, b) {
        return function() {
            N(this);
            var d = this.startContainer,
            e = this.startOffset,
            f = this.commonAncestorContainer,
            g = new r(this, !0),
            h,
            i;
            d !== f && (h = c.getClosestAncestorIn(d, f, !0), i = j(h), d = i.node, e = i.offset),
            m(g, J),
            g.reset();
            var k = a(g);
            return g.detach(),
            b(this, d, e, d, e),
            k
        }
    }
    function bd(b, d, e) {
        function g(a, b) {
            return function(c) {
                F(this),
                G(c, u),
                G(A(c), v);
                var d = (a ? i: j)(c); (b ? h: k)(this, d.node, d.offset)

            }
        }
        function h(a, b, e) {
            var f = a.endContainer,
            g = a.endOffset;
            if (b !== a.startContainer || e !== a.startOffset) {
                if (A(b) != A(f) || c.comparePoints(b, e, f, g) == 1) f = b,
                g = e;
                d(a, b, e, f, g)
            }
        }
        function k(a, b, e) {
            var f = a.startContainer,
            g = a.startOffset;
            if (b !== a.endContainer || e !== a.endOffset) {
                if (A(b) != A(f) || c.comparePoints(b, e, f, g) == -1) f = b,
                g = e;
                d(a, f, g, b, e)
            }
        }
        function l(a, b, c) { (b !== a.startContainer || c !== a.startOffset || b !== a.endContainer || c !== a.endOffset) && d(a, b, c, b, c)
        }
        b.prototype = new _,
        a.util.extend(b.prototype, {
            setStart: function(a, b) {
                F(this),
                E(a, !0),
                H(a, b),
                h(this, a, b)
            },
            setEnd: function(a, b) {
                F(this),
                E(a, !0),
                H(a, b),
                k(this, a, b)
            },
            setStartBefore: g(!0, !0),
            setStartAfter: g(!1, !0),
            setEndBefore: g(!0, !1),
            setEndAfter: g(!1, !1),
            collapse: function(a) {
                N(this),
                a ? d(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset) : d(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset)
            },
            selectNodeContents: function(a) {
                F(this),
                E(a, !0),
                d(this, a, 0, a, c.getNodeLength(a))
            },
            selectNode: function(a) {
                F(this),
                E(a, !1),
                G(a, u);
                var b = i(a),
                c = j(a);
                d(this, b.node, b.offset, c.node, c.offset)
            },
            extractContents: bc(o, d),
            deleteContents: bc(n, d),
            canSurroundContents: function() {
                N(this),
                J(this.startContainer),
                J(this.endContainer);
                var a = new r(this, !0),
                b = a._first && f(a._first, this) || a._last && f(a._last, this);
                return a.detach(),
                !b
            },
            detach: function() {
                e(this)
            },
            splitBoundaries: function() {
                N(this);
                var a = this.startContainer,
                b = this.startOffset,
                e = this.endContainer,
                f = this.endOffset,
                g = a === e;
                c.isCharacterDataNode(e) && f > 0 && f < e.length && c.splitDataNode(e, f),
                c.isCharacterDataNode(a) && b > 0 && b < a.length && (a = c.splitDataNode(a, b), g ? (f -= b, e = a) : e == a.parentNode && f >= c.getNodeIndex(a) && f++, b = 0),
                d(this, a, b, e, f)
            },
            normalizeBoundaries: function() {
                N(this);
                var a = this.startContainer,
                b = this.startOffset,
                e = this.endContainer,
                f = this.endOffset,
                g = function(a) {
                    var b = a.nextSibling;
                    b && b.nodeType == a.nodeType && (e = a, f = a.length, a.appendData(b.data), b.parentNode.removeChild(b))
                },
                h = function(d) {
                    var g = d.previousSibling;
                    if (g && g.nodeType == d.nodeType) {
                        a = d;
                        var h = d.length;
                        b = g.length,
                        d.insertData(0, g.data),
                        g.parentNode.removeChild(g);
                        if (a == e) f += b,
                        e = a;
                        else if (e == d.parentNode) {
                            var i = c.getNodeIndex(d);
                            f == i ? (e = d, f = h) : f > i && f--
                        }
                    }
                },
                i = !0;
                if (c.isCharacterDataNode(e)) e.length == f && g(e);
                else {
                    if (f > 0) {
                        var j = e.childNodes[f - 1];
                        j && c.isCharacterDataNode(j) && g(j)
                    }
                    i = !this.collapsed
                }
                if (i) {
                    if (c.isCharacterDataNode(a)) b == 0 && h(a);
                    else if (b < a.childNodes.length) {
                        var k = a.childNodes[b];
                        k && c.isCharacterDataNode(k) && h(k)
                    }
                } else a = e,
                b = f;
                d(this, a, b, e, f)
            },
            collapseToPoint: function(a, b) {
                F(this),
                E(a, !0),
                H(a, b),
                l(this, a, b)
            }
        }),
        bb(b)
    }
    function be(a) {
        a.collapsed = a.startContainer === a.endContainer && a.startOffset === a.endOffset,
        a.commonAncestorContainer = a.collapsed ? a.startContainer: c.getCommonAncestor(a.startContainer, a.endContainer)
    }
    function bf(a, b, c, d, e) {
        var f = a.startContainer !== b || a.startOffset !== c,
        g = a.endContainer !== d || a.endOffset !== e;
        a.startContainer = b,
        a.startOffset = c,
        a.endContainer = d,
        a.endOffset = e,
        be(a),
        h(a, "boundarychange", {
            startMoved: f,
            endMoved: g
        })
    }
    function bg(a) {
        F(a),
        a.startContainer = a.startOffset = a.endContainer = a.endOffset = null,
        a.collapsed = a.commonAncestorContainer = null,
        h(a, "detach", null),
        a._listeners = null
    }
    function bh(a) {
        this.startContainer = a,
        this.startOffset = 0,
        this.endContainer = a,
        this.endOffset = 0,
        this._listeners = {
            boundarychange: [],
            detach: []
        },
        be(this)
    }
    a.requireModules(["DomUtil"]);
    var c = a.dom,
    d = c.DomPosition,
    e = a.DOMException;
    r.prototype = {
        _current: null,
        _next: null,
        _first: null,
        _last: null,
        isSingleCharacterDataNode: !1,
        reset: function() {
            this._current = null,
            this._next = this._first
        },
        hasNext: function() {
            return !! this._next
        },
        next: function() {
            var a = this._current = this._next;
            return a && (this._next = a !== this._last ? a.nextSibling: null, c.isCharacterDataNode(a) && this.clonePartiallySelectedTextNodes && (a === this.ec && (a = a.cloneNode(!0)).deleteData(this.eo, a.length - this.eo), this._current === this.sc && (a = a.cloneNode(!0)).deleteData(0, this.so))),
            a
        },
        remove: function() {
            var a = this._current,
            b,
            d; ! c.isCharacterDataNode(a) || a !== this.sc && a !== this.ec ? a.parentNode && a.parentNode.removeChild(a) : (b = a === this.sc ? this.so: 0, d = a === this.ec ? this.eo: a.length, b != d && a.deleteData(b, d - b))
        },
        isPartiallySelectedSubtree: function() {
            var a = this._current;
            return f(a, this.range)
        },
        getSubtreeIterator: function() {
            var a;
            if (this.isSingleCharacterDataNode) a = this.range.cloneRange(),
            a.collapse();
            else {
                a = new bh(g(this.range));
                var b = this._current,
                d = b,
                e = 0,
                f = b,
                h = c.getNodeLength(b);
                c.isAncestorOf(b, this.sc, !0) && (d = this.sc, e = this.so),
                c.isAncestorOf(b, this.ec, !0) && (f = this.ec, h = this.eo),
                bf(a, d, e, f, h)
            }
            return new r(a, this.clonePartiallySelectedTextNodes)
        },
        detach: function(a) {
            a && this.range.detach(),
            this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null
        }
    },
    s.prototype = {
        BAD_BOUNDARYPOINTS_ERR: 1,
        INVALID_NODE_TYPE_ERR: 2
    },
    s.prototype.toString = function() {
        return this.message
    },
    t.prototype = {
        _current: null,
        hasNext: function() {
            return !! this._next
        },
        next: function() {
            return this._current = this._next,
            this._next = this.nodes[++this._position],
            this._current
        },
        detach: function() {
            this._current = this._next = this.nodes = null
        }
    };
    var u = [1, 3, 4, 5, 7, 8, 10],
    v = [2, 9, 11],
    w = [5, 6, 10, 12],
    x = [1, 3, 4, 5, 7, 8, 10, 11],
    y = [1, 3, 4, 5, 7, 8],
    A = c.getRootContainer,
    B = z([9, 11]),
    C = z(w),
    D = z([6, 10, 12]),
    O = document.createElement("style"),
    P = !1;
    try {
        O.innerHTML = "<b>x</b>",
        P = O.firstChild.nodeType == 3
    } catch(Q) {}
    a.features.htmlParsingConforms = P;
    var R = P ? 
    function(a) {
        var b = this.startContainer,
        d = c.getDocument(b);
        if (!b) throw new e("INVALID_STATE_ERR");
        var f = null;
        return b.nodeType == 1 ? f = b: c.isCharacterDataNode(b) && (f = c.parentElement(b)),
        f === null || f.nodeName == "HTML" && c.isHtmlNamespace(c.getDocument(f).documentElement) && c.isHtmlNamespace(f) ? f = d.createElement("body") : f = f.cloneNode(!1),
        f.innerHTML = a,
        c.fragmentFromNodeChildren(f)
    }: function(a) {
        F(this);
        var b = g(this),
        d = b.createElement("body");
        return d.innerHTML = a,
        c.fragmentFromNodeChildren(d)
    },
    S = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer"],
    T = 0,
    U = 1,
    V = 2,
    W = 3,
    X = 0,
    Y = 1,
    Z = 2,
    $ = 3;
    _.prototype = {
        attachListener: function(a, b) {
            this._listeners[a].push(b)
        },
        compareBoundaryPoints: function(a, b) {
            N(this),
            I(this.startContainer, b.startContainer);
            var d,
            e,
            f,
            g,
            h = a == W || a == T ? "start": "end",
            i = a == U || a == T ? "start": "end";
            return d = this[h + "Container"],
            e = this[h + "Offset"],
            f = b[i + "Container"],
            g = b[i + "Offset"],
            c.comparePoints(d, e, f, g)
        },
        insertNode: function(a) {
            N(this),
            G(a, x),
            J(this.startContainer);
            if (c.isAncestorOf(a, this.startContainer, !0)) throw new e("HIERARCHY_REQUEST_ERR");
            var b = k(a, this.startContainer, this.startOffset);
            this.setStartBefore(b)
        },
        cloneContents: function() {
            N(this);
            var a,
            b;
            if (this.collapsed) return g(this).createDocumentFragment();
            if (this.startContainer === this.endContainer && c.isCharacterDataNode(this.startContainer)) return a = this.startContainer.cloneNode(!0),
            a.data = a.data.slice(this.startOffset, this.endOffset),
            b = g(this).createDocumentFragment(),
            b.appendChild(a),
            b;
            var d = new r(this, !0);
            return a = l(d),
            d.detach(),
            a
        },
        canSurroundContents: function() {
            N(this),
            J(this.startContainer),
            J(this.endContainer);
            var a = new r(this, !0),
            b = a._first && f(a._first, this) || a._last && f(a._last, this);
            return a.detach(),
            !b
        },
        surroundContents: function(a) {
            G(a, y);
            if (!this.canSurroundContents()) throw new s("BAD_BOUNDARYPOINTS_ERR");
            var b = this.extractContents();
            if (a.hasChildNodes()) while (a.lastChild) a.removeChild(a.lastChild);
            k(a, this.startContainer, this.startOffset),
            a.appendChild(b),
            this.selectNode(a)
        },
        cloneRange: function() {
            N(this);
            var a = new bh(g(this)),
            b = S.length,
            c;
            while (b--) c = S[b],
            a[c] = this[c];
            return a
        },
        toString: function() {
            N(this);
            var a = this.startContainer;
            if (a === this.endContainer && c.isCharacterDataNode(a)) return a.nodeType == 3 || a.nodeType == 4 ? a.data.slice(this.startOffset, this.endOffset) : "";
            var b = [],
            d = new r(this, !0);
            return m(d, 
            function(a) { (a.nodeType == 3 || a.nodeType == 4) && b.push(a.data)
            }),
            d.detach(),
            b.join("")
        },
        compareNode: function(a) {
            N(this);
            var b = a.parentNode,
            d = c.getNodeIndex(a);
            if (!b) throw new e("NOT_FOUND_ERR");
            var f = this.comparePoint(b, d),
            g = this.comparePoint(b, d + 1);
            return f < 0 ? g > 0 ? Z: X: g > 0 ? Y: $
        },
        comparePoint: function(a, b) {
            return N(this),
            K(a, "HIERARCHY_REQUEST_ERR"),
            I(a, this.startContainer),
            c.comparePoints(a, b, this.startContainer, this.startOffset) < 0 ? -1: c.comparePoints(a, b, this.endContainer, this.endOffset) > 0 ? 1: 0
        },
        createContextualFragment: R,
        toHtml: function() {
            N(this);
            var a = g(this).createElement("div");
            return a.appendChild(this.cloneContents()),
            a.innerHTML
        },
        intersectsNode: function(a, b) {
            N(this),
            K(a, "NOT_FOUND_ERR");
            if (c.getDocument(a) !== g(this)) return ! 1;
            var d = a.parentNode,
            e = c.getNodeIndex(a);
            K(d, "NOT_FOUND_ERR");
            var f = c.comparePoints(d, e, this.endContainer, this.endOffset),
            h = c.comparePoints(d, e + 1, this.startContainer, this.startOffset);
            return b ? f <= 0 && h >= 0: f < 0 && h > 0
        },
        isPointInRange: function(a, b) {
            return N(this),
            K(a, "HIERARCHY_REQUEST_ERR"),
            I(a, this.startContainer),
            c.comparePoints(a, b, this.startContainer, this.startOffset) >= 0 && c.comparePoints(a, b, this.endContainer, this.endOffset) <= 0
        },
        intersectsRange: function(a, b) {
            N(this);
            if (g(a) != g(this)) throw new e("WRONG_DOCUMENT_ERR");
            var d = c.comparePoints(this.startContainer, this.startOffset, a.endContainer, a.endOffset),
            f = c.comparePoints(this.endContainer, this.endOffset, a.startContainer, a.startOffset);
            return b ? d <= 0 && f >= 0: d < 0 && f > 0
        },
        intersection: function(a) {
            if (this.intersectsRange(a)) {
                var b = c.comparePoints(this.startContainer, this.startOffset, a.startContainer, a.startOffset),
                d = c.comparePoints(this.endContainer, this.endOffset, a.endContainer, a.endOffset),
                e = this.cloneRange();
                return b == -1 && e.setStart(a.startContainer, a.startOffset),
                d == 1 && e.setEnd(a.endContainer, a.endOffset),
                e
            }
            return null
        },
        union: function(a) {
            if (this.intersectsRange(a, !0)) {
                var b = this.cloneRange();
                return c.comparePoints(a.startContainer, a.startOffset, this.startContainer, this.startOffset) == -1 && b.setStart(a.startContainer, a.startOffset),
                c.comparePoints(a.endContainer, a.endOffset, this.endContainer, this.endOffset) == 1 && b.setEnd(a.endContainer, a.endOffset),
                b
            }
            throw new s("Ranges do not intersect")
        },
        containsNode: function(a, b) {
            return b ? this.intersectsNode(a, !1) : this.compareNode(a) == $
        },
        containsNodeContents: function(a) {
            return this.comparePoint(a, 0) >= 0 && this.comparePoint(a, c.getNodeLength(a)) <= 0
        },
        containsRange: function(a) {
            return this.intersection(a).equals(a)
        },
        containsNodeText: function(a) {
            var b = this.cloneRange();
            b.selectNode(a);
            var c = b.getNodes([3]);
            if (c.length > 0) {
                b.setStart(c[0], 0);
                var d = c.pop();
                b.setEnd(d, d.length);
                var e = this.containsRange(b);
                return b.detach(),
                e
            }
            return this.containsNodeContents(a)
        },
        createNodeIterator: function(a, b) {
            return N(this),
            new t(this, a, b)
        },
        getNodes: function(a, b) {
            return N(this),
            p(this, a, b)
        },
        getDocument: function() {
            return g(this)
        },
        collapseBefore: function(a) {
            F(this),
            this.setEndBefore(a),
            this.collapse(!1)
        },
        collapseAfter: function(a) {
            F(this),
            this.setStartAfter(a),
            this.collapse(!0)
        },
        getName: function() {
            return "DomRange"
        },
        equals: function(a) {
            return bh.rangesEqual(this, a)
        },
        inspect: function() {
            return q(this)
        }
    },
    bd(bh, bf, bg),
    a.rangePrototype = _.prototype,
    bh.rangeProperties = S,
    bh.RangeIterator = r,
    bh.copyComparisonConstants = bb,
    bh.createPrototypeRange = bd,
    bh.inspect = q,
    bh.getRangeDocument = g,
    bh.rangesEqual = function(a, b) {
        return a.startContainer === b.startContainer && a.startOffset === b.startOffset && a.endContainer === b.endContainer && a.endOffset === b.endOffset
    },
    a.DomRange = bh,
    a.RangeException = s
}),
rangy.createModule("WrappedRange", 
function(a, b) {
    function g(a) {
        var b = a.parentElement(),
        c = a.duplicate();
        c.collapse(!0);
        var e = c.parentElement();
        c = a.duplicate(),
        c.collapse(!1);
        var f = c.parentElement(),
        g = e == f ? e: d.getCommonAncestor(e, f);
        return g == b ? g: d.getCommonAncestor(b, g)
    }
    function h(a) {
        return a.compareEndPoints("StartToEnd", a) == 0
    }
    function i(a, b, c, f) {
        var g = a.duplicate();
        g.collapse(c);
        var h = g.parentElement();
        d.isAncestorOf(b, h, !0) || (h = b);
        if (!h.canHaveHTML) return new e(h.parentNode, d.getNodeIndex(h));
        var i = d.getDocument(h).createElement("span"),
        j,
        k = c ? "StartToStart": "StartToEnd",
        l,
        m,
        n,
        o;
        do h.insertBefore(i, i.previousSibling),
        g.moveToElementText(i);
        while ((j = g.compareEndPoints(k, a)) > 0 && i.previousSibling);
        o = i.nextSibling;
        if (j == -1 && o && d.isCharacterDataNode(o)) {
            g.setEndPoint(c ? "EndToStart": "EndToEnd", a);
            var p;
            if (/[\r\n]/.test(o.data)) {
                var q = g.duplicate(),
                r = q.text.replace(/\r\n/g, "\r").length;
                p = q.moveStart("character", r);
                while ((j = q.compareEndPoints("StartToEnd", q)) == -1) p++,
                q.moveStart("character", 1)
            } else p = g.text.length;
            n = new e(o, p)
        } else l = (f || !c) && i.previousSibling,
        m = (f || c) && i.nextSibling,
        m && d.isCharacterDataNode(m) ? n = new e(m, 0) : l && d.isCharacterDataNode(l) ? n = new e(l, l.length) : n = new e(h, d.getNodeIndex(i));
        return i.parentNode.removeChild(i),
        n
    }
    function j(a, b) {
        var c,
        e,
        f = a.offset,
        g = d.getDocument(a.node),
        h,
        i,
        j = g.body.createTextRange(),
        k = d.isCharacterDataNode(a.node);
        return k ? (c = a.node, e = c.parentNode) : (i = a.node.childNodes, c = f < i.length ? i[f] : null, e = a.node),
        h = g.createElement("span"),
        h.innerHTML = "&#feff;",
        c ? e.insertBefore(h, c) : e.appendChild(h),
        j.moveToElementText(h),
        j.collapse(!b),
        e.removeChild(h),
        k && j[b ? "moveStart": "moveEnd"]("character", f),
        j
    }
    a.requireModules(["DomUtil", "DomRange"]);
    var c,
    d = a.dom,
    e = d.DomPosition,
    f = a.DomRange;
    if (a.features.implementsDomRange && (!a.features.implementsTextRange || !a.config.preferTextRange))(function() {
        function h(a) {
            var b = e.length,
            c;
            while (b--) c = e[b],
            a[c] = a.nativeRange[c]
        }
        function i(a, b, c, d, e) {
            var f = a.startContainer !== b || a.startOffset != c,
            g = a.endContainer !== d || a.endOffset != e;
            if (f || g) a.setEnd(d, e),
            a.setStart(b, c)
        }
        function j(a) {
            a.nativeRange.detach(),
            a.detached = !0;
            var b = e.length,
            c;
            while (b--) c = e[b],
            a[c] = null
        }
        var b,
        e = f.rangeProperties,
        g,
        k;
        c = function(a) {
            if (!a) throw new Error("Range must be specified");
            this.nativeRange = a,
            h(this)
        },
        f.createPrototypeRange(c, i, j),
        b = c.prototype,
        b.selectNode = function(a) {
            this.nativeRange.selectNode(a),
            h(this)
        },
        b.deleteContents = function() {
            this.nativeRange.deleteContents(),
            h(this)
        },
        b.extractContents = function() {
            var a = this.nativeRange.extractContents();
            return h(this),
            a
        },
        b.cloneContents = function() {
            return this.nativeRange.cloneContents()
        },
        b.surroundContents = function(a) {
            this.nativeRange.surroundContents(a),
            h(this)
        },
        b.collapse = function(a) {
            this.nativeRange.collapse(a),
            h(this)
        },
        b.cloneRange = function() {
            return new c(this.nativeRange.cloneRange())
        },
        b.refresh = function() {
            h(this)
        },
        b.toString = function() {
            return this.nativeRange.toString()
        };
        var l = document.createTextNode("test");
        d.getBody(document).appendChild(l);
        var m = document.createRange();
        m.setStart(l, 0),
        m.setEnd(l, 0);
        try {
            m.setStart(l, 1),
            g = !0,
            b.setStart = function(a, b) {
                this.nativeRange.setStart(a, b),
                h(this)
            },
            b.setEnd = function(a, b) {
                this.nativeRange.setEnd(a, b),
                h(this)
            },
            k = function(a) {
                return function(b) {
                    this.nativeRange[a](b),
                    h(this)
                }
            }
        } catch(n) {
            g = !1,
            b.setStart = function(a, b) {
                try {
                    this.nativeRange.setStart(a, b)
                } catch(c) {
                    this.nativeRange.setEnd(a, b),
                    this.nativeRange.setStart(a, b)
                }
                h(this)
            },
            b.setEnd = function(a, b) {
                try {
                    this.nativeRange.setEnd(a, b)
                } catch(c) {
                    this.nativeRange.setStart(a, b),
                    this.nativeRange.setEnd(a, b)
                }
                h(this)
            },
            k = function(a, b) {
                return function(c) {
                    try {
                        this.nativeRange[a](c)
                    } catch(d) {
                        this.nativeRange[b](c),
                        this.nativeRange[a](c)
                    }
                    h(this)
                }
            }
        }
        b.setStartBefore = k("setStartBefore", "setEndBefore"),
        b.setStartAfter = k("setStartAfter", "setEndAfter"),
        b.setEndBefore = k("setEndBefore", "setStartBefore"),
        b.setEndAfter = k("setEndAfter", "setStartAfter"),
        m.selectNodeContents(l),
        m.startContainer == l && m.endContainer == l && m.startOffset == 0 && m.endOffset == l.length ? b.selectNodeContents = function(a) {
            this.nativeRange.selectNodeContents(a),
            h(this)
        }: b.selectNodeContents = function(a) {
            this.setStart(a, 0),
            this.setEnd(a, f.getEndOffset(a))
        },
        m.selectNodeContents(l),
        m.setEnd(l, 3);
        var o = document.createRange();
        o.selectNodeContents(l),
        o.setEnd(l, 4),
        o.setStart(l, 2),
        m.compareBoundaryPoints(m.START_TO_END, o) == -1 & m.compareBoundaryPoints(m.END_TO_START, o) == 1 ? b.compareBoundaryPoints = function(a, b) {
            return b = b.nativeRange || b,
            a == b.START_TO_END ? a = b.END_TO_START: a == b.END_TO_START && (a = b.START_TO_END),
            this.nativeRange.compareBoundaryPoints(a, b)
        }: b.compareBoundaryPoints = function(a, b) {
            return this.nativeRange.compareBoundaryPoints(a, b.nativeRange || b)
        },
        a.util.isHostMethod(m, "createContextualFragment") && (b.createContextualFragment = function(a) {
            return this.nativeRange.createContextualFragment(a)
        }),
        d.getBody(document).removeChild(l),
        m.detach(),
        o.detach()
    })(),
    a.createNativeRange = function(a) {
        return a = a || document,
        a.createRange()
    };
    else if (a.features.implementsTextRange) {
        c = function(a) {
            this.textRange = a,
            this.refresh()
        },
        c.prototype = new f(document),
        c.prototype.refresh = function() {
            var a,
            b,
            c = g(this.textRange);
            h(this.textRange) ? b = a = i(this.textRange, c, !0, !0) : (a = i(this.textRange, c, !0, !1), b = i(this.textRange, c, !1, !1)),
            this.setStart(a.node, a.offset),
            this.setEnd(b.node, b.offset)
        },
        f.copyComparisonConstants(c);
        var k = function() {
            return this
        } ();
        typeof k.Range == "undefined" && (k.Range = c),
        a.createNativeRange = function(a) {
            return a = a || document,
            a.body.createTextRange()
        }
    }
    a.features.implementsTextRange && (c.rangeToTextRange = function(a) {
        if (a.collapsed) {
            var b = j(new e(a.startContainer, a.startOffset), !0);
            return b
        }
        var c = j(new e(a.startContainer, a.startOffset), !0),
        f = j(new e(a.endContainer, a.endOffset), !1),
        g = d.getDocument(a.startContainer).body.createTextRange();
        return g.setEndPoint("StartToStart", c),
        g.setEndPoint("EndToEnd", f),
        g
    }),
    c.prototype.getName = function() {
        return "WrappedRange"
    },
    a.WrappedRange = c,
    a.createRange = function(b) {
        return b = b || document,
        new c(a.createNativeRange(b))
    },
    a.createRangyRange = function(a) {
        return a = a || document,
        new f(a)
    },
    a.createIframeRange = function(b) {
        return a.createRange(d.getIframeDocument(b))
    },
    a.createIframeRangyRange = function(b) {
        return a.createRangyRange(d.getIframeDocument(b))
    },
    a.addCreateMissingNativeApiListener(function(b) {
        var c = b.document;
        typeof c.createRange == "undefined" && (c.createRange = function() {
            return a.createRange(this)
        }),
        c = b = null
    })
}),
rangy.createModule("WrappedSelection", 
function(a, b) {
    function n(a) {
        return (a || window).getSelection()
    }
    function o(a) {
        return (a || window).document.selection
    }
    function C(a, b, c) {
        var d = c ? "end": "start",
        e = c ? "start": "end";
        a.anchorNode = b[d + "Container"],
        a.anchorOffset = b[d + "Offset"],
        a.focusNode = b[e + "Container"],
        a.focusOffset = b[e + "Offset"]
    }
    function D(a) {
        var b = a.nativeSelection;
        a.anchorNode = b.anchorNode,
        a.anchorOffset = b.anchorOffset,
        a.focusNode = b.focusNode,
        a.focusOffset = b.focusOffset
    }
    function E(a) {
        a.anchorNode = a.focusNode = null,
        a.anchorOffset = a.focusOffset = 0,
        a.rangeCount = 0,
        a.isCollapsed = !0,
        a._ranges.length = 0
    }
    function F(b) {
        var c;
        return b instanceof g ? (c = b._selectionNativeRange, c || (c = a.createNativeRange(e.getDocument(b.startContainer)), c.setEnd(b.endContainer, b.endOffset), c.setStart(b.startContainer, b.startOffset), b._selectionNativeRange = c, b.attachListener("detach", 
        function() {
            this._selectionNativeRange = null
        }))) : b instanceof h ? c = b.nativeRange: a.features.implementsDomRange && b instanceof e.getWindow(b.startContainer).Range && (c = b),
        c
    }
    function G(a) {
        if (!a.length || a[0].nodeType != 1) return ! 1;
        for (var b = 1, c = a.length; b < c; ++b) if (!e.isAncestorOf(a[0], a[b])) return ! 1;
        return ! 0
    }
    function H(a) {
        var b = a.getNodes();
        if (!G(b)) throw new Error("getSingleElementFromRange: range " + a.inspect() + " did not consist of a single element");
        return b[0]
    }
    function I(a) {
        return !! a && typeof a.text != "undefined"
    }
    function J(a, b) {
        var c = new h(b);
        a._ranges = [c],
        C(a, c, !1),
        a.rangeCount = 1,
        a.isCollapsed = c.collapsed
    }
    function K(b) {
        b._ranges.length = 0;
        if (b.docSelection.type == "None") E(b);
        else {
            var c = b.docSelection.createRange();
            if (I(c)) J(b, c);
            else {
                b.rangeCount = c.length;
                var d,
                f = e.getDocument(c.item(0));
                for (var g = 0; g < b.rangeCount; ++g) d = a.createRange(f),
                d.selectNode(c.item(g)),
                b._ranges.push(d);
                b.isCollapsed = b.rangeCount == 1 && b._ranges[0].collapsed,
                C(b, b._ranges[b.rangeCount - 1], !1)
            }
        }
    }
    function L(a, b) {
        var c = a.docSelection.createRange(),
        d = H(b),
        f = e.getDocument(c.item(0)),
        g = e.getBody(f).createControlRange();
        for (var h = 0, i = c.length; h < i; ++h) g.add(c.item(h));
        try {
            g.add(d)
        } catch(j) {
            throw new Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)")
        }
        g.select(),
        K(a)
    }
    function N(a, b, c) {
        this.nativeSelection = a,
        this.docSelection = b,
        this._ranges = [],
        this.win = c,
        this.refresh()
    }
    function P(a, b) {
        var c = e.getDocument(b[0].startContainer),
        d = e.getBody(c).createControlRange();
        for (var f = 0, g; f < rangeCount; ++f) {
            g = H(b[f]);
            try {
                d.add(g)
            } catch(h) {
                throw new Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)")
            }
        }
        d.select(),
        K(a)
    }
    function U(a, b) {
        if (a.anchorNode && e.getDocument(a.anchorNode) !== e.getDocument(b)) throw new i("WRONG_DOCUMENT_ERR")
    }
    function V(a) {
        var b = [],
        c = new j(a.anchorNode, a.anchorOffset),
        d = new j(a.focusNode, a.focusOffset),
        e = typeof a.getName == "function" ? a.getName() : "Selection";
        if (typeof a.rangeCount != "undefined") for (var f = 0, h = a.rangeCount; f < h; ++f) b[f] = g.inspect(a.getRangeAt(f));
        return "[" + e + "(Ranges: " + b.join(", ") + ")(anchor: " + c.inspect() + ", focus: " + d.inspect() + "]"
    }
    a.requireModules(["DomUtil", "DomRange", "WrappedRange"]),
    a.config.checkSelectionRanges = !0;
    var c = "boolean",
    d = "_rangySelection",
    e = a.dom,
    f = a.util,
    g = a.DomRange,
    h = a.WrappedRange,
    i = a.DOMException,
    j = e.DomPosition,
    k,
    l,
    m = "Control",
    p = a.util.isHostMethod(window, "getSelection"),
    q = a.util.isHostObject(document, "selection"),
    r = q && (!p || a.config.preferTextRange);
    r ? (k = o, a.isSelectionValid = function(a) {
        var b = (a || window).document,
        c = b.selection;
        return c.type != "None" || e.getDocument(c.createRange().parentElement()) == b
    }) : p ? (k = n, a.isSelectionValid = function() {
        return ! 0
    }) : b.fail("Neither document.selection or window.getSelection() detected."),
    a.getNativeSelection = k;
    var s = k(),
    t = a.createNativeRange(document),
    u = e.getBody(document),
    v = f.areHostObjects(s, ["anchorNode", "focusNode"] && f.areHostProperties(s, ["anchorOffset", "focusOffset"]));
    a.features.selectionHasAnchorAndFocus = v;
    var w = f.isHostMethod(s, "extend");
    a.features.selectionHasExtend = w;
    var x = typeof s.rangeCount == "number";
    a.features.selectionHasRangeCount = x;
    var y = !1,
    z = !0;
    f.areHostMethods(s, ["addRange", "getRangeAt", "removeAllRanges"]) && typeof s.rangeCount == "number" && a.features.implementsDomRange && 
    function() {
        var a = document.createElement("iframe");
        u.appendChild(a);
        var b = e.getIframeDocument(a);
        b.open(),
        b.write("<html><head></head><body>12</body></html>"),
        b.close();
        var c = e.getIframeWindow(a).getSelection(),
        d = b.documentElement,
        f = d.lastChild,
        g = f.firstChild,
        h = b.createRange();
        h.setStart(g, 1),
        h.collapse(!0),
        c.addRange(h),
        z = c.rangeCount == 1,
        c.removeAllRanges();
        var i = h.cloneRange();
        h.setStart(g, 0),
        i.setEnd(g, 2),
        c.addRange(h),
        c.addRange(i),
        y = c.rangeCount == 2,
        h.detach(),
        i.detach(),
        u.removeChild(a)
    } (),
    a.features.selectionSupportsMultipleRanges = y,
    a.features.collapsedNonEditableSelectionsSupported = z;
    var A = !1,
    B;
    u && f.isHostMethod(u, "createControlRange") && (B = u.createControlRange(), f.areHostProperties(B, ["item", "add"]) && (A = !0)),
    a.features.implementsControlRange = A,
    v ? l = function(a) {
        return a.anchorNode === a.focusNode && a.anchorOffset === a.focusOffset
    }: l = function(a) {
        return a.rangeCount ? a.getRangeAt(a.rangeCount - 1).collapsed: !1
    };
    var M;
    f.isHostMethod(s, "getRangeAt") ? M = function(a, b) {
        try {
            return a.getRangeAt(b)
        } catch(c) {
            return null
        }
    }: v && (M = function(b) {
        var c = e.getDocument(b.anchorNode),
        d = a.createRange(c);
        return d.setStart(b.anchorNode, b.anchorOffset),
        d.setEnd(b.focusNode, b.focusOffset),
        d.collapsed !== this.isCollapsed && (d.setStart(b.focusNode, b.focusOffset), d.setEnd(b.anchorNode, b.anchorOffset)),
        d
    }),
    a.getSelection = function(a) {
        a = a || window;
        var b = a[d],
        c = k(a),
        e = q ? o(a) : null;
        return b ? (b.nativeSelection = c, b.docSelection = e, b.refresh(a)) : (b = new N(c, e, a), a[d] = b),
        b
    },
    a.getIframeSelection = function(b) {
        return a.getSelection(e.getIframeWindow(b))
    };
    var O = N.prototype;
    if (!r && v && f.areHostMethods(s, ["removeAllRanges", "addRange"])) {
        O.removeAllRanges = function() {
            this.nativeSelection.removeAllRanges(),
            E(this)
        };
        var Q = function(b, c) {
            var d = g.getRangeDocument(c),
            e = a.createRange(d);
            e.collapseToPoint(c.endContainer, c.endOffset),
            b.nativeSelection.addRange(F(e)),
            b.nativeSelection.extend(c.startContainer, c.startOffset),
            b.refresh()
        };
        x ? O.addRange = function(b, c) {
            if (A && q && this.docSelection.type == m) L(this, b);
            else if (c && w) Q(this, b);
            else {
                var d;
                y ? d = this.rangeCount: (this.removeAllRanges(), d = 0),
                this.nativeSelection.addRange(F(b)),
                this.rangeCount = this.nativeSelection.rangeCount;
                if (this.rangeCount == d + 1) {
                    if (a.config.checkSelectionRanges) {
                        var e = M(this.nativeSelection, this.rangeCount - 1);
                        e && !g.rangesEqual(e, b) && (b = new h(e))
                    }
                    this._ranges[this.rangeCount - 1] = b,
                    C(this, b, T(this.nativeSelection)),
                    this.isCollapsed = l(this)
                } else this.refresh()
            }
        }: O.addRange = function(a, b) {
            b && w ? Q(this, a) : (this.nativeSelection.addRange(F(a)), this.refresh())
        },
        O.setRanges = function(a) {
            if (A && a.length > 1) P(this, a);
            else {
                this.removeAllRanges();
                for (var b = 0, c = a.length; b < c; ++b) this.addRange(a[b])
            }
        }
    } else if (f.isHostMethod(s, "empty") && f.isHostMethod(t, "select") && A && r) O.removeAllRanges = function() {
        try {
            this.docSelection.empty();
            if (this.docSelection.type != "None") {
                var a;
                if (this.anchorNode) a = e.getDocument(this.anchorNode);
                else if (this.docSelection.type == m) {
                    var b = this.docSelection.createRange();
                    b.length && (a = e.getDocument(b.item(0)).body.createTextRange())
                }
                if (a) {
                    var c = a.body.createTextRange();
                    c.select(),
                    this.docSelection.empty()
                }
            }
        } catch(d) {}
        E(this)
    },
    O.addRange = function(a) {
        this.docSelection.type == m ? L(this, a) : (h.rangeToTextRange(a).select(), this._ranges[0] = a, this.rangeCount = 1, this.isCollapsed = this._ranges[0].collapsed, C(this, a, !1))
    },
    O.setRanges = function(a) {
        this.removeAllRanges();
        var b = a.length;
        b > 1 ? P(this, a) : b && this.addRange(a[0])
    };
    else return b.fail("No means of selecting a Range or TextRange was found"),
    !1;
    O.getRangeAt = function(a) {
        if (a < 0 || a >= this.rangeCount) throw new i("INDEX_SIZE_ERR");
        return this._ranges[a]
    };
    var R;
    if (r) R = function(b) {
        var c;
        a.isSelectionValid(b.win) ? c = b.docSelection.createRange() : (c = e.getBody(b.win.document).createTextRange(), c.collapse(!0)),
        b.docSelection.type == m ? K(b) : I(c) ? J(b, c) : E(b)
    };
    else if (f.isHostMethod(s, "getRangeAt") && typeof s.rangeCount == "number") R = function(b) {
        if (A && q && b.docSelection.type == m) K(b);
        else {
            b._ranges.length = b.rangeCount = b.nativeSelection.rangeCount;
            if (b.rangeCount) {
                for (var c = 0, d = b.rangeCount; c < d; ++c) b._ranges[c] = new a.WrappedRange(b.nativeSelection.getRangeAt(c));
                C(b, b._ranges[b.rangeCount - 1], T(b.nativeSelection)),
                b.isCollapsed = l(b)
            } else E(b)
        }
    };
    else if (v && typeof s.isCollapsed == c && typeof t.collapsed == c && a.features.implementsDomRange) R = function(a) {
        var b,
        c = a.nativeSelection;
        c.anchorNode ? (b = M(c, 0), a._ranges = [b], a.rangeCount = 1, D(a), a.isCollapsed = l(a)) : E(a)
    };
    else return b.fail("No means of obtaining a Range or TextRange from the user's selection was found"),
    !1;
    O.refresh = function(a) {
        var b = a ? this._ranges.slice(0) : null;
        R(this);
        if (a) {
            var c = b.length;
            if (c != this._ranges.length) return ! 1;
            while (c--) if (!g.rangesEqual(b[c], this._ranges[c])) return ! 1;
            return ! 0
        }
    };
    var S = function(a, b) {
        var c = a.getAllRanges(),
        d = !1;
        a.removeAllRanges();
        for (var e = 0, f = c.length; e < f; ++e) d || b !== c[e] ? a.addRange(c[e]) : d = !0;
        a.rangeCount || E(a)
    };
    A ? O.removeRange = function(a) {
        if (this.docSelection.type == m) {
            var b = this.docSelection.createRange(),
            c = H(a),
            d = e.getDocument(b.item(0)),
            f = e.getBody(d).createControlRange(),
            g,
            h = !1;
            for (var i = 0, j = b.length; i < j; ++i) g = b.item(i),
            g !== c || h ? f.add(b.item(i)) : h = !0;
            f.select(),
            K(this)
        } else S(this, a)
    }: O.removeRange = function(a) {
        S(this, a)
    };
    var T; ! r && v && a.features.implementsDomRange ? (T = function(a) {
        var b = !1;
        return a.anchorNode && (b = e.comparePoints(a.anchorNode, a.anchorOffset, a.focusNode, a.focusOffset) == 1),
        b
    },
    O.isBackwards = function() {
        return T(this)
    }) : T = O.isBackwards = function() {
        return ! 1
    },
    O.toString = function() {
        var a = [];
        for (var b = 0, c = this.rangeCount; b < c; ++b) a[b] = "" + this._ranges[b];
        return a.join("")
    },
    O.collapse = function(b, c) {
        U(this, b);
        var d = a.createRange(e.getDocument(b));
        d.collapseToPoint(b, c),
        this.removeAllRanges(),
        this.addRange(d),
        this.isCollapsed = !0
    },
    O.collapseToStart = function() {
        if (!this.rangeCount) throw new i("INVALID_STATE_ERR");
        var a = this._ranges[0];
        this.collapse(a.startContainer, a.startOffset)
    },
    O.collapseToEnd = function() {
        if (!this.rangeCount) throw new i("INVALID_STATE_ERR");
        var a = this._ranges[this.rangeCount - 1];
        this.collapse(a.endContainer, a.endOffset)
    },
    O.selectAllChildren = function(b) {
        U(this, b);
        var c = a.createRange(e.getDocument(b));
        c.selectNodeContents(b),
        this.removeAllRanges(),
        this.addRange(c)
    },
    O.deleteFromDocument = function() {
        if (A && q && this.docSelection.type == m) {
            var a = this.docSelection.createRange(),
            b;
            while (a.length) b = a.item(0),
            a.remove(b),
            b.parentNode.removeChild(b);
            this.refresh()
        } else if (this.rangeCount) {
            var c = this.getAllRanges();
            this.removeAllRanges();
            for (var d = 0, e = c.length; d < e; ++d) c[d].deleteContents();
            this.addRange(c[e - 1])
        }
    },
    O.getAllRanges = function() {
        return this._ranges.slice(0)
    },
    O.setSingleRange = function(a) {
        this.setRanges([a])
    },
    O.containsNode = function(a, b) {
        for (var c = 0, d = this._ranges.length; c < d; ++c) if (this._ranges[c].containsNode(a, b)) return ! 0;
        return ! 1
    },
    O.toHtml = function() {
        var a = "";
        if (this.rangeCount) {
            var b = g.getRangeDocument(this._ranges[0]).createElement("div");
            for (var c = 0, d = this._ranges.length; c < d; ++c) b.appendChild(this._ranges[c].cloneContents());
            a = b.innerHTML
        }
        return a
    },
    O.getName = function() {
        return "WrappedSelection"
    },
    O.inspect = function() {
        return V(this)
    },
    O.detach = function() {
        this.win[d] = null,
        this.win = this.anchorNode = this.focusNode = null
    },
    N.inspect = V,
    a.Selection = N,
    a.selectionPrototype = O,
    a.addCreateMissingNativeApiListener(function(b) {
        typeof b.getSelection == "undefined" && (b.getSelection = function() {
            return a.getSelection(this)
        }),
        b = null
    })
});
var Base = function() {};
Base.extend = function(a, b) {
    var c = Base.prototype.extend;
    Base._prototyping = !0;
    var d = new this;
    c.call(d, a),
    d.base = function() {},
    delete Base._prototyping;
    var e = d.constructor,
    f = d.constructor = function() {
        if (!Base._prototyping) if (this._constructing || this.constructor == f) this._constructing = !0,
        e.apply(this, arguments),
        delete this._constructing;
        else if (arguments[0] != null) return (arguments[0].extend || c).call(arguments[0], d)
    };
    return f.ancestor = this,
    f.extend = this.extend,
    f.forEach = this.forEach,
    f.implement = this.implement,
    f.prototype = d,
    f.toString = this.toString,
    f.valueOf = function(a) {
        return a == "object" ? f: e.valueOf()
    },
    c.call(f, b),
    typeof f.init == "function" && f.init(),
    f
},
Base.prototype = {
    extend: function(a, b) {
        if (arguments.length > 1) {
            var c = this[a];
            if (c && typeof b == "function" && (!c.valueOf || c.valueOf() != b.valueOf()) && /\bbase\b/.test(b)) {
                var d = b.valueOf();
                b = function() {
                    var a = this.base || Base.prototype.base;
                    this.base = c;
                    var b = d.apply(this, arguments);
                    return this.base = a,
                    b
                },
                b.valueOf = function(a) {
                    return a == "object" ? b: d
                },
                b.toString = Base.toString
            }
            this[a] = b
        } else if (a) {
            var e = Base.prototype.extend; ! Base._prototyping && typeof this != "function" && (e = this.extend || e);
            var f = {
                toSource: null
            },
            g = ["constructor", "toString", "valueOf"],
            h = Base._prototyping ? 0: 1;
            while (i = g[h++]) a[i] != f[i] && e.call(this, i, a[i]);
            for (var i in a) f[i] || e.call(this, i, a[i])
        }
        return this
    }
},
Base = Base.extend({
    constructor: function() {
        this.extend(arguments[0])
    }
},
{
    ancestor: Object,
    version: "1.1",
    forEach: function(a, b, c) {
        for (var d in a) this.prototype[d] === undefined && b.call(c, a[d], d, a)
    },
    implement: function() {
        for (var a = 0; a < arguments.length; a++) typeof arguments[a] == "function" ? arguments[a](this.prototype) : this.prototype.extend(arguments[a]);
        return this
    },
    toString: function() {
        return String(this.valueOf())
    }
}),
wysihtml5.browser = function() {
    function h(a) {
        return (/ipad|iphone|ipod/.test(a) && a.match(/ os (\d+).+? like mac os x/) || [, 0])[1]
    }
    var a = navigator.userAgent,
    b = document.createElement("div"),
    c = a.indexOf("MSIE") !== -1 && a.indexOf("Opera") === -1,
    d = a.indexOf("Gecko") !== -1 && a.indexOf("KHTML") === -1,
    e = a.indexOf("AppleWebKit/") !== -1,
    f = a.indexOf("Chrome/") !== -1,
    g = a.indexOf("Opera/") !== -1;
    return {
        USER_AGENT: a,
        supported: function() {
            var a = this.USER_AGENT.toLowerCase(),
            c = "contentEditable" in b,
            d = document.execCommand && document.queryCommandSupported && document.queryCommandState,
            e = document.querySelector && document.querySelectorAll,
            f = this.isIos() && h(a) < 5 || a.indexOf("opera mobi") !== -1 || a.indexOf("hpwos/") !== -1;
            return c && d && e && !f
        },
        isTouchDevice: function() {
            return this.supportsEvent("touchmove")
        },
        isIos: function() {
            var a = this.USER_AGENT.toLowerCase();
            return a.indexOf("webkit") !== -1 && a.indexOf("mobile") !== -1
        },
        supportsSandboxedIframes: function() {
            return c
        },
        throwsMixedContentWarningWhenIframeSrcIsEmpty: function() {
            return ! ("querySelector" in document)
        },
        displaysCaretInEmptyContentEditableCorrectly: function() {
            return ! d
        },
        hasCurrentStyleProperty: function() {
            return "currentStyle" in b
        },
        insertsLineBreaksOnReturn: function() {
            return d
        },
        supportsPlaceholderAttributeOn: function(a) {
            return "placeholder" in a
        },
        supportsEvent: function(a) {
            return "on" + a in b || 
            function() {
                return b.setAttribute("on" + a, "return;"),
                typeof b["on" + a] == "function"
            } ()
        },
        supportsEventsInIframeCorrectly: function() {
            return ! g
        },
        firesOnDropOnlyWhenOnDragOverIsCancelled: function() {
            return e || d
        },
        supportsDataTransfer: function() {
            try {
                return e && (window.Clipboard || window.DataTransfer).prototype.getData
            } catch(a) {
                return ! 1
            }
        },
        supportsHTML5Tags: function(a) {
            var b = a.createElement("div"),
            c = "<article>foo</article>";
            return b.innerHTML = c,
            b.innerHTML.toLowerCase() === c
        },
        supportsCommand: function() {
            var a = {
                formatBlock: c,
                insertUnorderedList: c || g || e,
                insertOrderedList: c || g || e
            },
            b = {
                insertHTML: d
            };
            return function(c, d) {
                var e = a[d];
                if (!e) {
                    try {
                        return c.queryCommandSupported(d)
                    } catch(f) {}
                    try {
                        return c.queryCommandEnabled(d)
                    } catch(g) {
                        return !! b[d]
                    }
                }
                return ! 1
            }
        } (),
        doesAutoLinkingInContentEditable: function() {
            return c
        },
        canDisableAutoLinking: function() {
            return this.supportsCommand(document, "AutoUrlDetect"
            )
        },
        clearsContentEditableCorrectly: function() {
            return d || g || e
        },
        supportsGetAttributeCorrectly: function() {
            var a = document.createElement("td");
            return a.getAttribute("rowspan") != "1"
        },
        canSelectImagesInContentEditable: function() {
            return d || c || g
        },
        clearsListsInContentEditableCorrectly: function() {
            return d || c || e
        },
        autoScrollsToCaret: function() {
            return ! e
        },
        autoClosesUnclosedTags: function() {
            var a = b.cloneNode(!1),
            c,
            d;
            return a.innerHTML = "<p><div></div>",
            d = a.innerHTML.toLowerCase(),
            c = d === "<p></p><div></div>" || d === "<p><div></div></p>",
            this.autoClosesUnclosedTags = function() {
                return c
            },
            c
        },
        supportsNativeGetElementsByClassName: function() {
            return String(document.getElementsByClassName).indexOf("[native code]") !== -1
        },
        supportsSelectionModify: function() {
            return "getSelection" in window && "modify" in window.getSelection()
        },
        supportsClassList: function() {
            return "classList" in b
        },
        needsSpaceAfterLineBreak: function() {
            return g
        },
        supportsSpeechApiOn: function(b) {
            var c = a.match(/Chrome\/(\d+)/) || [, 0];
            return c[1] >= 11 && ("onwebkitspeechchange" in b || "speech" in b)
        },
        crashesWhenDefineProperty: function(a) {
            return c && (a === "XMLHttpRequest" || a === "XDomainRequest")
        },
        doesAsyncFocus: function() {
            return c
        },
        hasProblemsSettingCaretAfterImg: function() {
            return c
        },
        hasUndoInContextMenu: function() {
            return d || f || g
        }
    }
} (),
wysihtml5.lang.array = function(a) {
    return {
        contains: function(b) {
            if (a.indexOf) return a.indexOf(b) !== -1;
            for (var c = 0, d = a.length; c < d; c++) if (a[c] === b) return ! 0;
            return ! 1
        },
        without: function(b) {
            b = wysihtml5.lang.array(b);
            var c = [],
            d = 0,
            e = a.length;
            for (; d < e; d++) b.contains(a[d]) || c.push(a[d]);
            return c
        },
        get: function() {
            var b = 0,
            c = a.length,
            d = [];
            for (; b < c; b++) d.push(a[b]);
            return d
        }
    }
},
wysihtml5.lang.Dispatcher = Base.extend({
    observe: function(a, b) {
        return this.events = this.events || {},
        this.events[a] = this.events[a] || [],
        this.events[a].push(b),
        this
    },
    on: function() {
        return this.observe.apply(this, wysihtml5.lang.array(arguments).get())
    },
    fire: function(a, b) {
        this.events = this.events || {};
        var c = this.events[a] || [],
        d = 0;
        for (; d < c.length; d++) c[d].call(this, b);
        return this
    },
    stopObserving: function(a, b) {
        this.events = this.events || {};
        var c = 0,
        d,
        e;
        if (a) {
            d = this.events[a] || [],
            e = [];
            for (; c < d.length; c++) d[c] !== b && b && e.push(d[c]);
            this.events[a] = e
        } else this.events = {};
        return this
    }
}),
wysihtml5.lang.object = function(a) {
    return {
        merge: function(b) {
            for (var c in b) a[c] = b[c];
            return this
        },
        get: function() {
            return a
        },
        clone: function() {
            var b = {},
            c;
            for (c in a) b[c] = a[c];
            return b
        },
        isArray: function() {
            return Object.prototype.toString.call(a) === "[object Array]"
        }
    }
},
function() {
    var a = /^\s+/,
    b = /\s+$/;
    wysihtml5.lang.string = function(c) {
        return c = String(c),
        {
            trim: function() {
                return c.replace(a, "").replace(b, "")
            },
            interpolate: function(a) {
                for (var b in a) c = this.replace("#{" + b + "}").by(a[b]);
                return c
            },
            replace: function(a) {
                return {
                    by: function(b) {
                        return c.split(a).join(b)
                    }
                }
            }
        }
    }
} (),
function(a) {
    function g(a) {
        return k(a) ? a: (a === a.ownerDocument.documentElement && (a = a.ownerDocument.body), l(a))
    }
    function h(a) {
        return a.replace(c, 
        function(a, b) {
            var c = (b.match(d) || [])[1] || "",
            g = f[c];
            b = b.replace(d, ""),
            b.split(g).length > b.split(c).length && (b += c, c = "");
            var h = b,
            i = b;
            return b.length > e && (i = i.substr(0, e) + "..."),
            h.substr(0, 4) === "www." && (h = "http://" + h),
            '<a href="' + h + '">' + i + "</a>" + c
        })
    }
    function i(a) {
        var b = a._wysihtml5_tempElement;
        return b || (b = a._wysihtml5_tempElement = a.createElement("div")),
        b
    }
    function j(a) {
        var b = a.parentNode,
        c = i(b.ownerDocument);
        c.innerHTML = "<span></span>" + h(a.data),
        c.removeChild(c.firstChild);
        while (c.firstChild) b.insertBefore(c.firstChild, a);
        b.removeChild(a)
    }
    function k(a) {
        var c;
        while (a.parentNode) {
            a = a.parentNode,
            c = a.nodeName;
            if (b.contains(c)) return ! 0;
            if (c === "body") return ! 1
        }
        return ! 1
    }
    function l(d) {
        if (b.contains(d.nodeName)) return;
        if (d.nodeType === a.TEXT_NODE && d.data.match(c)) {
            j(d);
            return
        }
        var e = a.lang.array(d.childNodes).get(),
        f = e.length,
        g = 0;
        for (; g < f; g++) l(e[g]);
        return d
    }
    var b = a.lang.array(["CODE", "PRE", "A", "SCRIPT", "HEAD", "TITLE", "STYLE"]),
    c = /((https?:\/\/|www\.)[^\s<]{3,})/gi,
    d = /([^\w\/\-](,?))$/i,
    e = 9999,
    f = {
        ")": "(",
        "]": "[",
        "}": "{"
    };
    a.dom.autoLink = g,
    a.dom.autoLink.URL_REG_EXP = c
} (wysihtml5),
function(a) {
    var b = a.browser.supportsClassList(),
    c = a.dom;
    c.addClass = function(a, d) {
        if (b) return a.classList.add(d);
        if (c.hasClass(a, d)) return;
        a.className += " " + d
    },
    c.removeClass = function(a, c) {
        if (b) return a.classList.remove(c);
        a.className = a.className.replace(new RegExp("(^|\\s+)" + c + "(\\s+|$)"), " ")
    },
    c.hasClass = function(a, c) {
        if (b) return a.classList.contains(c);
        var d = a.className;
        return d.length > 0 && (d == c || (new RegExp("(^|\\s)" + c + "(\\s|$)")).test(d))
    }
} (wysihtml5),
wysihtml5.dom.contains = function() {
    var a = document.documentElement;
    if (a.contains) return function(a, b) {
        return b.nodeType !== wysihtml5.ELEMENT_NODE && (b = b.parentNode),
        a !== b && a.contains(b)
    };
    if (a.compareDocumentPosition) return function(a, b) {
        return !! (a.compareDocumentPosition(b) & 16)
    }
} (),
wysihtml5.dom.convertToList = function() {
    function a(a, b) {
        var c = a.createElement("li");
        return b.appendChild(c),
        c
    }
    function b(a, b) {
        return a.createElement(b)
    }
    function c(c, d) {
        if (c.nodeName === "UL" || c.nodeName === "OL" || c.nodeName === "MENU") return c;
        var e = c.ownerDocument,
        f = b(e, d),
        g = c.querySelectorAll("br"),
        h = g.length,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q;
        for (q = 0; q < h; q++) {
            l = g[q];
            while ((m = l.parentNode) && m !== c && m.lastChild === l) {
                if (wysihtml5.dom.getStyle("display").from(m) === "block") {
                    m.removeChild(l);
                    break
                }
                wysihtml5.dom.insert(l).after(l.parentNode)
            }
        }
        i = wysihtml5.lang.array(c.childNodes).get(),
        j = i.length;
        for (q = 0; q < j; q++) {
            p = p || a(e, f),
            k = i[q],
            n = wysihtml5.dom.getStyle("display").from(k) === "block",
            o = k.nodeName === "BR";
            if (n) {
                p = p.firstChild ? a(e, f) : p,
                p.appendChild(k),
                p = null;
                continue
            }
            if (o) {
                p = p.firstChild ? null: p;
                continue
            }
            p.appendChild(k)
        }
        return c.parentNode.replaceChild(f, c),
        f
    }
    return c
} (),
wysihtml5.dom.copyAttributes = function(a) {
    return {
        from: function(b) {
            return {
                to: function(c) {
                    var d,
                    e = 0,
                    f = a.length;
                    for (; e < f; e++) d = a[e],
                    typeof b[d] != "undefined" && b[d] !== "" && (c[d] = b[d]);
                    return {
                        andTo: arguments.callee
                    }
                }
            }
        }
    }
},
function(a) {
    var b = ["-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing"],
    c = function(b) {
        return d(b) ? parseInt(a.getStyle("width").from(b), 10) < b.offsetWidth: !1
    },
    d = function(c) {
        var d = 0,
        e = b.length;
        for (; d < e; d++) if (a.getStyle(b[d]).from(c) === "border-box") return b[d]
    };
    a.copyStyles = function(d) {
        return {
            from: function(e) {
                c(e) && (d = wysihtml5.lang.array(d).without(b));
                var f = "",
                g = d.length,
                h = 0,
                i;
                for (; h < g; h++) i = d[h],
                f += i + ":" + a.getStyle(i).from(e) + ";";
                return {
                    to: function(b) {
                        return a.setStyles(f).on(b),
                        {
                            andTo: arguments.callee
                        }
                    }
                }
            }
        }
    }
} (wysihtml5.dom),
function(a) {
    a.dom.delegate = function(b, c, d, e) {
        return a.dom.observe(b, d, 
        function(d) {
            var f = d.target,
            g = a.lang.array(b.querySelectorAll(c));
            while (f && f !== b) {
                if (g.contains(f)) {
                    e.call(f, d);
                    break
                }
                f = f.parentNode
            }
        })
    }
} (wysihtml5),
wysihtml5.dom.getAsDom = function() {
    var a = function(a, b) {
        var c = b.createElement("div");
        c.style.display = "none",
        b.body.appendChild(c);
        try {
            c.innerHTML = a
        } catch(d) {}
        return b.body.removeChild(c),
        c
    },
    b = function(a) {
        if (a._wysihtml5_supportsHTML5Tags) return;
        for (var b = 0, d = c.length; b < d; b++) a.createElement(c[b]);
        a._wysihtml5_supportsHTML5Tags = !0
    },
    c = ["abbr", "article", "aside", "audio", "bdi", "canvas", "command", "datalist", "details", "figcaption", "figure", "footer", "header", "hgroup", "keygen", "mark", "meter", "nav", "output", "progress", "rp", "rt", "ruby", "svg", "section", "source", "summary", "time", "track", "video", "wbr"];
    return function(c, d) {
        d = d || document;
        var e;
        return typeof c == "object" && c.nodeType ? (e = d.createElement("div"), e.appendChild(c)) : wysihtml5.browser.supportsHTML5Tags(d) ? (e = d.createElement("div"), e.innerHTML = c) : (b(d), e = a(c, d)),
        e
    }
} (),
wysihtml5.dom.getParentElement = function() {
    function a(a, b) {
        return ! b || !b.length ? !0: typeof b == "string" ? a === b: wysihtml5.lang.array(b).contains(a)
    }
    function b(a) {
        return a.nodeType === wysihtml5.ELEMENT_NODE
    }
    function c(a, b, c) {
        var d = (a.className || "").match(c) || [];
        return b ? d[d.length - 1] === b: !!d.length
    }
    function d(b, c, d) {
        while (d--&&b && b.nodeName !== "BODY") {
            if (a(b.nodeName, c)) return b;
            b = b.parentNode
        }
        return null
    }
    function e(d, e, f, g, h) {
        while (h--&&d && d.nodeName !== "BODY") {
            if (b(d) && a(d.nodeName, e) && c(d, f, g)) return d;
            d = d.parentNode
        }
        return null
    }
    return function(a, b, c) {
        return c = c || 50,
        b.className || b.classRegExp ? e(a, b.nodeName, b.className, b.classRegExp, c) : d(a, b.nodeName, c)
    }
} (),
wysihtml5.dom.getStyle = function() {
    function c(a) {
        return a.replace(b, 
        function(a) {
            return a.charAt(1).toUpperCase()
        })
    }
    var a = {
        "float": "styleFloat" in document.createElement("div").style ? "styleFloat": "cssFloat"
    },
    b = /\-[a-z]/g;
    return function(b) {
        return {
            from: function(d) {
                if (d.nodeType !== wysihtml5.ELEMENT_NODE) return;
                var e = d.ownerDocument,
                f = a[b] || c(b),
                g = d.style,
                h = d.currentStyle,
                i = g[f];
                if (i) return i;
                if (h) try {
                    return h[f]
                } catch(j) {}
                var k = e.defaultView || e.parentWindow,
                l = (b === "height" || b === "width") && d.nodeName === "TEXTAREA",
                m,
                n;
                if (k.getComputedStyle) return l && (m = g.overflow, g.overflow = "hidden"),
                n = k.getComputedStyle(d, null).getPropertyValue(b),
                l && (g.overflow = m || ""),
                n
            }
        }
    }
} (),
wysihtml5.dom.hasElementWithTagName = function() {
    function c(a) {
        return a._wysihtml5_identifier || (a._wysihtml5_identifier = b++)
    }
    var a = {},
    b = 1;
    return function(b, d) {
        var e = c(b) + ":" + d,
        f = a[e];
        return f || (f = a[e] = b.getElementsByTagName(d)),
        f.length > 0
    }
} (),
function(a) {
    function d(a) {
        return a._wysihtml5_identifier || (a._wysihtml5_identifier = c++)
    }
    var b = {},
    c = 1;
    a.dom.hasElementWithClassName = function(c, e) {
        if (!a.browser.supportsNativeGetElementsByClassName()) return !! c.querySelector("." + e);
        var f = d(c) + ":" + e,
        g = b[f];
        return g || (g = b[f] = c.getElementsByClassName(e)),
        g.length > 0
    }
} (wysihtml5),
wysihtml5.dom.insert = function(a) {
    return {
        after: function(b) {
            b.parentNode.insertBefore(a, b.nextSibling)
        },
        before: function(b) {
            b.parentNode.insertBefore(a, b)
        },
        into: function(b) {
            b.appendChild(a)
        }
    }
},
wysihtml5.dom.insertCSS = function(a) {
    return a = a.join("\n"),
    {
        into: function(b) {
            var c = b.head || b.getElementsByTagName("head")[0],
            d = b.createElement("style");
            d.type = "text/css",
            d.styleSheet ? d.styleSheet.cssText = a: d.appendChild(b.createTextNode(a)),
            c && c.appendChild(d)
        }
    }
},
wysihtml5.dom.observe = function(a, b, c) {
    b = typeof b == "string" ? [b] : b;
    var d,
    e,
    f = 0,
    g = b.length;
    for (; f < g; f++) e = b[f],
    a.addEventListener ? a.addEventListener(e, c, !1) : (d = function(b) {
        "target" in b || (b.target = b.srcElement),
        b.preventDefault = b.preventDefault || 
        function() {
            this.returnValue = !1
        },
        b.stopPropagation = b.stopPropagation || 
        function() {
            this.cancelBubble = !0
        },
        c.call(a, b)
    },
    a.attachEvent("on" + e, d));
    return {
        stop: function() {
            var e,
            f = 0,
            g = b.length;
            for (; f < g; f++) e = b[f],
            a.removeEventListener ? a.removeEventListener(e, c, !1) : a.detachEvent("on" + e, d)
        }
    }
},
wysihtml5.dom.parse = function() {
    function f(a, b, c, f) {
        wysihtml5.lang.object(e).merge(d).merge(b).get(),
        c = c || a.ownerDocument || document;
        var h = c.createDocumentFragment(),
        i = typeof a == "string",
        j,
        k,
        l;
        i ? j = wysihtml5.dom.getAsDom(a, c) : j = a;
        while (j.firstChild) l = j.firstChild,
        j.removeChild(l),
        k = g(l, f),
        k && h.appendChild(k);
        return j.innerHTML = "",
        j.appendChild(h),
        i ? wysihtml5.quirks.getCorrectInnerHTML(j) : j
    }
    function g(c, d) {
        var e = c.nodeType,
        f = c.childNodes,
        h = f.length,
        i,
        j = a[e],
        k = 0;
        i = j && j(c);
        if (!i) return null;
        for (k = 0; k < h; k++) newChild = g(f[k], d),
        newChild && i.appendChild(newChild);
        return d && i.childNodes.length <= 1 && i.nodeName.toLowerCase() === b && !i.attributes.length ? i.firstChild: i
    }
    function h(a) {
        var c,
        d,
        f,
        g = e.tags,
        h = a.nodeName.toLowerCase(),
        j = a.scopeName;
        if (a._wysihtml5) return null;
        a._wysihtml5 = 1;
        if (a.className === "wysihtml5-temp") return null;
        j && j != "HTML" && (h = j + ":" + h),
        "outerHTML" in a && !wysihtml5.browser.autoClosesUnclosedTags() && a.nodeName === "P" && a.outerHTML.slice( - 4).toLowerCase() !== "</p>" && (h = "div");
        if (h in g) {
            c = g[h];
            if (!c || c.remove) return null;
            c = typeof c == "string" ? {
                rename_tag: c
            }: c
        } else if (a.firstChild) c = {
            rename_tag: b
        };
        else return null;
        return d = a.ownerDocument.createElement(c.rename_tag || h),
        i(a, d, c),
        a = null,
        d
    }
    function i(a, b, d) {
        var f = {},
        g = d.set_class,
        h = d.add_class,
        i = d.set_attributes,
        j = d.check_attributes,
        l = e.classes,
        m = 0,
        p = [],
        q = [],
        r = [],
        s = [],
        t,
        u,
        v,
        w,
        x,
        y,
        z;
        i && (f = wysihtml5.lang.object(i).clone());
        if (j) for (x in j) {
            z = n[j[x]];
            if (!z) continue;
            y = z(k(a, x)),
            typeof y == "string" && (f[x] = y)
        }
        g && p.push(g);
        if (h) for (x in h) {
            z = o[h[x]];
            if (!z) continue;
            w = z(k(a, x)),
            typeof w == "string" && p.push(w)
        }
        l["_wysihtml5-temp-placeholder"] = 1,
        s = a.getAttribute("class"),
        s && (p = p.concat(s.split(c))),
        t = p.length;
        for (; m < t; m++) v = p[m],
        l[v] && q.push(v);
        u = q.length;
        while (u--) v = q[u],
        wysihtml5.lang.array(r).contains(v) || r.unshift(v);
        r.length && (f["class"] = r.join(" "));
        for (x in f) try {
            b.setAttribute(x, f[x])
        } catch(A) {}
        f.src && (typeof f.width != "undefined" && b.setAttribute("width", f.width), typeof f.height != "undefined" && b.setAttribute("height", f.height))
    }
    function k(a, b) {
        b = b.toLowerCase();
        var c = a.nodeName;
        if (c == "IMG" && b == "src" && l(a) === !0) return a.src;
        if (j && "outerHTML" in a) {
            var d = a.outerHTML.toLowerCase(),
            e = d.indexOf(" " + b + "=") != -1;
            return e ? a.getAttribute(b) : null
        }
        return a.getAttribute(b)
    }
    function l(a) {
        try {
            return a.complete && !a.mozMatchesSelector(":-moz-broken")
        } catch(b) {
            if (a.complete && a.readyState === "complete") return ! 0
        }
    }
    function m(a) {
        return a.ownerDocument.createTextNode(a.data)
    }
    var a = {
        1: h,
        3: m
    },
    b = "span",
    c = /\s+/,
    d = {
        tags: {},
        classes: {}
    },
    e = {},
    j = !wysihtml5.browser.supportsGetAttributeCorrectly(),
    n = {
        url: function() {
            var a = /^https?:\/\//i;
            return function(b) {
                return ! b || !b.match(a) ? null: b.replace(a, 
                function(a) {
                    return a.toLowerCase()
                })
            }
        } (),
        alt: function() {
            var a = /[^ a-z0-9_\-]/gi;
            return function(b) {
                return b ? b.replace(a, "") : ""
            }
        } (),
        numbers: function() {
            var a = /\D/g;
            return function(b) {
                return b = (b || "").replace(a, ""),
                b || null
            }
        } (),
        href: function() {
            return function(a) {
                return a
            }
        } (),
        src: function() {
            return function(a) {
                return a
            }
        } ()
    },
    o = {
        align_img: function() {
            var a = {
                left: "wysiwyg-float-left",
                right: "wysiwyg-float-right"
            };
            return function(b) {
                return a[String(b).toLowerCase()]
            }
        } (),
        align_text: function() {
            var a = {
                left: "wysiwyg-text-align-left",
                right: "wysiwyg-text-align-right",
                center: "wysiwyg-text-align-center",
                justify: "wysiwyg-text-align-justify"
            };
            return function(b) {
                return a[String(b).toLowerCase()]
            }
        } (),
        clear_br: function() {
            var a = {
                left: "wysiwyg-clear-left",
                right: "wysiwyg-clear-right",
                both: "wysiwyg-clear-both",
                all: "wysiwyg-clear-both"
            };
            return function(b) {
                return a[String(b).toLowerCase()]
            }
        } (),
        size_font: function() {
            var a = {
                1: "wysiwyg-font-size-xx-small",
                2: "wysiwyg-font-size-small",
                3: "wysiwyg-font-size-medium",
                4: "wysiwyg-font-size-large",
                5: "wysiwyg-font-size-x-large",
                6: "wysiwyg-font-size-xx-large",
                7: "wysiwyg-font-size-xx-large",
                "-": "wysiwyg-font-size-smaller",
                "+": "wysiwyg-font-size-larger"
            };
            return function(b) {
                return a[String(b).charAt(0)]
            }
        } ()
    };
    return f
} (),
wysihtml5.dom.removeEmptyTextNodes = function(a) {
    var b,
    c = wysihtml5.lang.array(a.childNodes).get(),
    d = c.length,
    e = 0;
    for (; e < d; e++) b = c[e],
    b.nodeType === wysihtml5.TEXT_NODE && b.data === "" && b.parentNode.removeChild(b)
},
wysihtml5.dom.renameElement = function(a, b) {
    var c = a.ownerDocument.createElement(b),
    d;
    while (d = a.firstChild) c.appendChild(d);
    return wysihtml5.dom.copyAttributes(["align", "className"]).from(a).to(c),
    a.parentNode.replaceChild(c, a),
    c
},
wysihtml5.dom.replaceWithChildNodes = function(a) {
    if (!a.parentNode) return;
    if (!a.firstChild) {
        a.parentNode.removeChild(a);
        return
    }
    var b = a.ownerDocument.createDocumentFragment();
    while (a.firstChild) b.appendChild(a.firstChild);
    a.parentNode.replaceChild(b, a),
    a = b = null
},
function(a) {
    function b(b) {
        return a.getStyle("display").from(b) === "block"
    }
    function c(a) {
        return a.nodeName === "BR"
    }
    function d(a) {
        var b = a.ownerDocument.createElement("br");
        a.appendChild(b)
    }
    function e(a) {
        if (a.nodeName !== "MENU" && a.nodeName !== "UL" && a.nodeName !== "OL") return;
        var e = a.ownerDocument,
        f = e.createDocumentFragment(),
        g = a.previousElementSibling || a.previousSibling,
        h,
        i,
        j,
        k,
        l;
        g && !b(g) && d(f);
        while (l = a.firstChild) {
            i = l.lastChild;
            while (h = l.firstChild) j = h === i,
            k = j && !b(h) && !c(h),
            f.appendChild(h),
            k && d(f);
            l.parentNode.removeChild(l)
        }
        a.parentNode.replaceChild(f, a)
    }
    a.resolveList = e
} (wysihtml5.dom),
function(a) {
    var b = document,
    c = ["parent", "top", "opener", "frameElement", "frames", "localStorage", "globalStorage", "sessionStorage", "indexedDB"],
    d = ["open", "close", "openDialog", "showModalDialog", "alert", "confirm", "prompt", "openDatabase", "postMessage", "XMLHttpRequest", "XDomainRequest"],
    e = ["referrer", "write", "open", "close"];
    a.dom.Sandbox = Base.extend({
        constructor: function(b, c) {
            this.callback = b || a.EMPTY_FUNCTION,
            this.config = a.lang.object({}).merge(c).get(),
            this.iframe = this._createIframe()
        },
        insertInto: function(a) {
            typeof a == "string" && (a = b.getElementById(a)),
            a.appendChild(this.iframe)
        },
        getIframe: function() {
            return this.iframe
        },
        getWindow: function() {
            this._readyError()
        },
        getDocument: function() {
            this._readyError()
        },
        destroy: function() {
            var a = this.getIframe();
            a.parentNode.removeChild(a)
        },
        _readyError: function() {
            throw new Error("wysihtml5.Sandbox: Sandbox iframe isn't loaded yet")
        },
        _createIframe: function() {
            var c = this,
            d = b.createElement("iframe");
            return d.className = "wysihtml5-sandbox",
            a.dom.setAttributes({
                security: "restricted",
                allowtransparency: "true",
                frameborder: 0,
                width: 0,
                height: 0,
                marginwidth: 0,
                marginheight: 0
            }).on(d),
            a.browser.throwsMixedContentWarningWhenIframeSrcIsEmpty() && (d.src = "javascript:'<html></html>'"),
            d.onload = function() {
                d.onreadystatechange = d.onload = null,
                c._onLoadIframe(d)
            },
            d.onreadystatechange = function() { / loaded | complete / .test(d.readyState) && (d.onreadystatechange = d.onload = null, c._onLoadIframe(d))
            },
            d
        },
        _onLoadIframe: function(f) {
            if (!a.dom.contains(b.documentElement, f)) return;
            var g = this,
            h = f.contentWindow,
            i = f.contentWindow.document,
            j = b.characterSet || b.charset || "utf-8",
            k = this._getHtml({
                charset: j,
                stylesheets: this.config.stylesheets
            });
            i.open("text/html", "replace"),
            i.write(k),
            i.close(),
            this.getWindow = function() {
                return f.contentWindow
            },
            this.getDocument = function() {
                return f.contentWindow.document
            },
            h.onerror = function(a, b, c) {
                throw new Error("wysihtml5.Sandbox: " + a, b, c)
            };
            if (!a.browser.supportsSandboxedIframes()) {
                var l,
                m;
                for (l = 0, m = c.length; l < m; l++) this._unset(h, c[l]);
                for (l = 0, m = d.length; l < m; l++) this._unset(h, d[l], a.EMPTY_FUNCTION);
                for (l = 0, m = e.length; l < m; l++) this._unset(i, e[l]);
                this._unset(i, "cookie", "", !0)
            }
            this.loaded = !0,
            setTimeout(function() {
                g.callback(g)
            },
            0)
        },
        _getHtml: function(b) {
            var c = b.stylesheets,
            d = "",
            e = 0,
            f;
            c = typeof c == "string" ? [c] : c;
            if (c) {
                f = c.length;
                for (; e < f; e++) d += '<link rel="stylesheet" href="' + c[e] + '">'
            }
            return b.stylesheets = d,
            a.lang.string('<!DOCTYPE html><html><head><meta charset="#{charset}">#{stylesheets}</head><body style="display: none;"></body></html>').interpolate(b)
        },
        _unset: function(b, c, d, e) {
            try {
                b[c] = d
            } catch(f) {}
            try {
                b.__defineGetter__(c, 
                function() {
                    return d
                })
            } catch(f) {}
            if (e) try {
                b.__defineSetter__(c, 
                function() {})
            } catch(f) {}
            if (!a.browser.crashesWhenDefineProperty(c)) try {
                var g = {
                    get: function() {
                        return d
                    }
                };
                e && (g.set = function() {}),
                Object.defineProperty(b, c, g)
            } catch(f) {}
        }
    })
} (wysihtml5),
function() {
    var a = {
        className: "class"
    };
    wysihtml5.dom.setAttributes = function(b) {
        return {
            on: function(c) {
                for (var d in b) c.setAttribute(a[d] || d, b[d])
            }
        }
    }
} (),
wysihtml5.dom.setStyles = function(a) {
    return {
        on: function(b) {
            var c = b.style;
            if (typeof a == "string") {
                c.cssText += ";" + a;
                return
            }
            for (var d in a) d === "float" ? (c.cssFloat = a[d], c.styleFloat = a[d]) : c[d] = a[d]
        }
    }
},
function(a) {
    a.simulatePlaceholder = function(b, c, d) {
        var e = "placeholder",
        f = function() {
            c.hasPlaceholderSet() && c.clear(),
            a.removeClass(c.element, e)
        },
        g = function() {
            c.isEmpty() && (c.setValue(d), a.addClass(c.element, e))
        };
        b.observe("set_placeholder", g).observe("unset_placeholder", f).observe("focus:composer", f).observe("paste:composer", f).observe("blur:composer", g),
        g()
    }
} (wysihtml5.dom),
function(a) {
    var b = document.documentElement;
    "textContent" in b ? (a.setTextContent = function(a, b) {
        a.textContent = b
    },
    a.getTextContent = function(a) {
        return a.textContent
    }) : "innerText" in b ? (a.setTextContent = function(a, b) {
        a.innerText = b
    },
    a.getTextContent = function(a) {
        return a.innerText
    }) : (a.setTextContent = function(a, b) {
        a.nodeValue = b
    },
    a.getTextContent = function(a) {
        return a.nodeValue
    })
} (wysihtml5.dom),
wysihtml5.quirks.cleanPastedHTML = function() {
    function b(b, c, d) {
        c = c || a,
        d = d || b.ownerDocument || document;
        var e,
        f = typeof b == "string",
        g,
        h,
        i,
        j,
        k = 0;
        if (f) e = wysihtml5.dom.getAsDom(b, d);
        else {
            e = b;
            var l = [],
            m = e.childNodes,
            n = null,
            j = 0,
            o = m.length;
            for (; j < o; j++) {
                n = m[j];
                if (n.nodeType === 1 && n.nodeName === "BR") l.push(n);
                else break
            }
            for (j = o - 1; j >= 0; j--) {
                n = m[j];
                if (n.nodeType === 1 && n.nodeName === "BR") l.push(n);
                else break
            }
            for (j = 0, o = l.length; j < o; j++) e.removeChild(l[j])
        }
        for (j in c) {
            h = e.querySelectorAll(j),
            g = c[j],
            i = h.length;
            for (; k < i; k++) g(h[k])
        }
        return h = b = c = null,
        f ? e.innerHTML: e
    }
    var a = {
        "a u": wysihtml5.dom.replaceWithChildNodes
    };
    return b
} (),
function(a) {
    var b = a.dom;
    a.quirks.ensureProperClearing = function() {
        var a = function(a) {
            var b = this;
            setTimeout(function() {
                var a = b.innerHTML.toLowerCase();
                if (a == "<p>&nbsp;</p>" || a == "<p>&nbsp;</p><p>&nbsp;</p>") b.innerHTML = ""
            },
            0)
        };
        return function(c) {
            b.observe(c.element, ["cut", "keydown"], a)
        }
    } (),
    a.quirks.ensureProperClearingOfLists = function() {
        var c = ["OL", "UL", "MENU"],
        d = function(d, e) {
            if (!e.firstChild || !a.lang.array(c).contains(e.firstChild.nodeName)) return;
            var f = b.getParentElement(d, {
                nodeName: c
            });
            if (!f) return;
            var g = f == e.firstChild;
            if (!g) return;
            var h = f.childNodes.length <= 1;
            if (!h) return;
            var i = f.firstChild ? f.firstChild.innerHTML === "": !0;
            if (!i) return;
            f.parentNode.removeChild(f)
        };
        return function(c) {
            b.observe(c.element, "keydown", 
            function(b) {
                if (b.keyCode !== a.BACKSPACE_KEY) return;
                var e = c.selection.getSelectedNode();
                d(e, c.element)
            })
        }
    } ()
} (wysihtml5),
function(a) {
    var b = "%7E";
    a.quirks.getCorrectInnerHTML = function(c) {
        var d = c.innerHTML;
        if (d.indexOf(b) === -1) return d;
        var e = c.querySelectorAll("[href*='~'], [src*='~']"),
        f,
        g,
        h,
        i;
        for (i = 0, h = e.length; i < h; i++) f = e[i].href || e[i].src,
        g = a.lang.string(f).replace("~").by(b),
        d = a.lang.string(d).replace(g).by(f);
        return d
    }
} (wysihtml5),
function(a) {
    var b = a.dom,
    c = ["LI", "P", "H1", "H2", "H3", "H4", "H5", "H6"],
    d = ["UL", "OL", "MENU"];
    a.quirks.insertLineBreakOnReturn = function(e) {
        function f(c) {
            var d = b.getParentElement(c, {
                nodeName: ["P", "DIV"]
            },
            2);
            if (!d) return;
            var f = document.createTextNode(a.INVISIBLE_SPACE);
            b.insert(f).before(d),
            b.replaceWithChildNodes(d),
            e.selection.selectNode(f)
        }
        function g(g) {
            var h = g.keyCode;
            if (g.shiftKey || h !== a.ENTER_KEY && h !== a.BACKSPACE_KEY) return;
            var i = g.target,
            j = e.selection.getSelectedNode(),
            k = b.getParentElement(j, {
                nodeName: c
            },
            4);
            if ($.browser.webkit && h === a.ENTER_KEY) {
                var l = null;
                j.nodeName && j.nodeName === "LI" ? l = j: k && k.nodeName === "LI" && (l = k);
                if (l && (l.innerText === "" || l.innerText === a.INVISIBLE_SPACE)) {
                    g.preventDefault();
                    var m = b.getParentElement(l, {
                        nodeName: d
                    });
                    m.removeChild(l);
                    var n = e.doc.createTextNode(a.INVISIBLE_SPACE);
                    rangy.dom.insertAfter(n, m),
                    e.selection.selectNode(n)
                }
            }
            if (k) {
                k.nodeName !== "LI" || h !== a.ENTER_KEY && h !== a.BACKSPACE_KEY ? k.nodeName.match(/H[1-6]/) && h === a.ENTER_KEY && setTimeout(function() {
                    f(e.selection.getSelectedNode())
                },
                0) : setTimeout(function() {
                    var a = e.selection.getSelectedNode(),
                    c,
                    g;
                    if (!a) return;
                    c = b.getParentElement(a, {
                        nodeName: d
                    },
                    2);
                    if (c) return;
                    f(a)
                },
                0);
                return
            }
            h === a.ENTER_KEY && !a.browser.insertsLineBreaksOnReturn() && (e.commands.exec("insertLineBreak"), g.preventDefault())
        }
        b.observe(e.element.ownerDocument, "keydown", g)
    }
} (wysihtml5),
function(a) {
    var b = "wysihtml5-quirks-redraw";
    a.quirks.redraw = function(c) {
        a.dom.addClass(c, b),
        a.dom.removeClass(c, b);
        try {
            var d = c.ownerDocument;
            d.execCommand("italic", !1, null),
            d.execCommand("italic", !1, null)
        } catch(e) {}
    }
} (wysihtml5),
function(a) {
    function c(a) {
        var b = 0;
        if (a.parentNode) do b += a.offsetTop || 0,
        a = a.offsetParent;
        while (a);
        return b
    }
    var b = a.dom;
    a.Selection = Base.extend({
        constructor: function(a) {
            window.rangy.init(),
            this.editor = a,
            this.composer = a.composer,
            this.doc = this.composer.doc
        },
        getBookmark: function() {
            var a = this.getRange();
            return a && a.cloneRange()
        },
        setBookmark: function(a) {
            if (!a) return;
            this.setSelection(a)
        },
        setBefore: function(a) {
            var b = rangy.createRange(this.doc);
            return b.setStartBefore(a),
            b.setEndBefore(a),
            this.setSelection(b)
        },
        setAfter: function(a) {
            var b = rangy.createRange(this.doc);
            return b.setStartAfter(a),
            b.setEndAfter(a),
            this.setSelection(b)
        },
        selectNode: function(c) {
            var d = rangy.createRange(this.doc),
            e = c.nodeType === a.ELEMENT_NODE,
            f = "canHaveHTML" in c ? c.canHaveHTML: c.nodeName !== "IMG",
            g = e ? c.innerHTML: c.data,
            h = g === "" || g === a.INVISIBLE_SPACE,
            i = b.getStyle("display").from(c),
            j = i === "block" || i === "list-item";
            if (h && e && f) try {
                c.innerHTML = a.INVISIBLE_SPACE
            } catch(k) {}
            f ? d.selectNodeContents(c) : d.selectNode(c),
            f && h && e ? d.collapse(j) : f && h && (d.setStartAfter(c), d.setEndAfter(c)),
            this.setSelection(d)
        },
        getSelectedNode: function(a) {
            var b,
            c;
            if (a && this.doc.selection && this.doc.selection.type === "Control") {
                c = this.doc.selection.createRange();
                if (c && c.length) return c.item(0)
            }
            return b = this.getSelection(this.doc),
            b.focusNode === b.anchorNode ? b.focusNode: (c = this.getRange(this.doc), c ? c.commonAncestorContainer: this.doc.body)
        },
        executeAndRestore: function(b, c) {
            var d = this.doc.body,
            e = c && d.scrollTop,
            f = c && d.scrollLeft,
            g = "_wysihtml5-temp-placeholder",
            h = '<span class="' + g + '">' + a.INVISIBLE_SPACE + "</span>",
            i = this.getRange(this.doc),
            j;
            if (!i) {
                b(d, d);
                return
            }
            var k = i.createContextualFragment(h);
            i.insertNode(k);
            try {
                b(i.startContainer, i.endContainer)
            } catch(l) {
                setTimeout(function() {
                    throw l
                },
                0)
            }
            caretPlaceholder = this.doc.querySelector("." + g),
            caretPlaceholder ? (j = rangy.createRange(this.doc), j.selectNode(caretPlaceholder), j.deleteContents(), this.setSelection(j)) : d.focus(),
            c && (d.scrollTop = e, d.scrollLeft = f);
            try {
                caretPlaceholder.parentNode.removeChild(caretPlaceholder)
            } catch(m) {}
        },
        executeAndRestoreSimple: function(a) {
            var b = this.getRange(),
            c = this.doc.body,
            d,
            e,
            f,
            g,
            h;
            if (!b) {
                a(c, c);
                return
            }
            g = b.getNodes([3]),
            e = g[0] || b.startContainer,
            f = g[g.length - 1] || b.endContainer,
            h = {
                collapsed: b.collapsed,
                startContainer: e,
                startOffset: e === b.startContainer ? b.startOffset: 0,
                endContainer: f,
                endOffset: f === b.endContainer ? b.endOffset: f.length
            };
            try {
                a(b.startContainer, b.endContainer)
            } catch(i) {
                setTimeout(function() {
                    throw i
                },
                0)
            }
            d = rangy.createRange(this.doc);
            try {
                d.setStart(h.startContainer, h.startOffset)
            } catch(j) {}
            try {
                d.setEnd(h.endContainer, h.endOffset)
            } catch(k) {}
            try {
                this.setSelection(d)
            } catch(l) {}
        },
        insertHTML: function(b) {
            var c = rangy.createRange(this.doc),
            d = c.createContextualFragment(b),
            e = d.lastChild;
            this.insertNode(d),
            e && this.setAfter(e);
            var f = this.doc.createTextNode(a.INVISIBLE_SPACE);
            this.insertNode(f),
            f && this.selectNode(f)
        },
        insertNode: function(a) {
            var b = this.getRange();
            b && b.insertNode(a)
        },
        surround: function(a) {
            var b = this.getRange();
            if (!b) return;
            try {
                b.surroundContents(a),
                this.selectNode(a)
            } catch(c) {
                a.appendChild(b.extractContents()),
                b.insertNode(a)
            }
        },
        scrollIntoView: function() {
            var b = this.doc,
            d = b.documentElement.scrollHeight > b.documentElement.offsetHeight,
            e = b._wysihtml5ScrollIntoViewElement = b._wysihtml5ScrollIntoViewElement || 
            function() {
                var c = b.createElement("span");
                return c.innerHTML = a.INVISIBLE_SPACE,
                c
            } (),
            f;
            d && (this.insertNode(e), f = c(e), e.parentNode.removeChild(e), f > b.body.scrollTop && (b.body.scrollTop = f))
        },
        selectLine: function() {
            a.browser.supportsSelectionModify() ? this._selectLine_W3C() : this.doc.selection && this._selectLine_MSIE()
        },
        _selectLine_W3C: function() {
            var a = this.doc.defaultView,
            b = a.getSelection();
            b.modify("extend", "left", "lineboundary"),
            b.modify("extend", "right", "lineboundary")
        },
        _selectLine_MSIE: function() {
            var a = this.doc.selection.createRange(),
            b = a.boundingTop,
            c = a.boundingHeight,
            d = this.doc.body.scrollWidth,
            e,
            f,
            g,
            h,
            i;
            if (!a.moveToPoint) return;
            b === 0 && (g = this.doc.createElement("span"), this.insertNode(g), b = g.offsetTop, g.parentNode.removeChild(g)),
            b += 1;
            for (h = -10; h < d; h += 2) try {
                a.moveToPoint(h, b);
                break
            } catch(j) {}
            e = b,
            f = this.doc.selection.createRange();
            for (i = d; i >= 0; i--) try {
                f.moveToPoint(i, e);
                break
            } catch(k) {}
            a.setEndPoint("EndToEnd", f),
            a.select()
        },
        getText: function() {
            var a = this.getSelection();
            return a ? a.toString() : ""
        },
        getNodes: function(a, b) {
            var c = this.getRange();
            return c ? c.getNodes([a], b) : []
        },
        getRange: function() {
            var a = this.getSelection();
            return a && a.rangeCount && a.getRangeAt(0)
        },
        getSelection: function() {
            return rangy.getSelection(this.doc.defaultView || this.doc.parentWindow)
        },
        setSelection: function(a) {
            var b = this.doc.defaultView || this.doc.parentWindow,
            c = rangy.getSelection(b);
            return c.setSingleRange(a)
        }
    })
} (wysihtml5),
function(a, b) {
    function e(a, b, c) {
        if (!a.className) return ! 1;
        var d = a.className.match(c) || [];
        return d[d.length - 1] === b
    }
    function f(a, b, c) {
        a.className ? (g(a, c), a.className += " " + b) : a.className = b
    }
    function g(a, b) {
        a.className && (a.className = a.className.replace(b, ""))
    }
    function h(a, b) {
        return a.className.replace(d, " ") == b.className.replace(d, " ")
    }
    function i(a) {
        var b = a.parentNode;
        while (a.firstChild) b.insertBefore(a.firstChild, a);
        b.removeChild(a)
    }
    function j(a, b) {
        if (a.attributes.length != b.attributes.length) return ! 1;
        for (var c = 0, d = a.attributes.length, e, f, g; c < d; ++c) {
            e = a.attributes[c],
            g = e.name;
            if (g != "class") {
                f = b.attributes.getNamedItem(g);
                if (e.specified != f.specified) return ! 1;
                if (e.specified && e.nodeValue !== f.nodeValue) return ! 1
            }
        }
        return ! 0
    }
    function k(a, c) {
        return b.dom.isCharacterDataNode(a) ? c == 0 ? !!a.previousSibling: c == a.length ? !!a.nextSibling: !0: c > 0 && c < a.childNodes.length
    }
    function l(a, c, d) {
        var e;
        b.dom.isCharacterDataNode(c) && (d == 0 ? (d = b.dom.getNodeIndex(c), c = c.parentNode) : d == c.length ? (d = b.dom.getNodeIndex(c) + 1, c = c.parentNode) : e = b.dom.splitDataNode(c, d));
        if (!e) {
            e = c.cloneNode(!1),
            e.id && e.removeAttribute("id");
            var f;
            while (f = c.childNodes[d]) e.appendChild(f);
            b.dom.insertAfter(e, c)
        }
        return c == a ? e: l(a, e.parentNode, b.dom.getNodeIndex(e))
    }
    function m(b) {
        this.isElementMerge = b.nodeType == a.ELEMENT_NODE,
        this.firstTextNode = this.isElementMerge ? b.lastChild: b,
        this.textNodes = [this.firstTextNode]
    }
    function n(a, b, d, e) {
        this.tagNames = a || [c],
        this.cssClass = b || "",
        this.similarClassRegExp = d,
        this.normalize = e,
        this.applyToAnyTagName = !1
    }
    var c = "span",
    d = /\s+/g;
    m.prototype = {
        doMerge: function() {
            var a = [],
            b,
            c,
            d;
            for (var e = 0, f = this.textNodes.length; e < f; ++e) b = this.textNodes[e],
            c = b.parentNode,
            a[e] = b.data,
            e && (c.removeChild(b), c.hasChildNodes() || c.parentNode.removeChild(c));
            return this.firstTextNode.data = d = a.join(""),
            d
        },
        getLength: function() {
            var a = this.textNodes.length,
            b = 0;
            while (a--) b += this.textNodes[a].length;
            return b
        },
        toString: function() {
            var a = [];
            for (var b = 0, c = this.textNodes.length; b < c; ++b) a[b] = "'" + this.textNodes[b].data + "'";
            return "[Merge(" + a.join(",") + ")]"
        }
    },
    n.prototype = {
        getAncestorWithClass: function(c) {
            var d;
            while (c) {
                d = this.cssClass ? e(c, this.cssClass, this.similarClassRegExp) : !0;
                if (c.nodeType == a.ELEMENT_NODE && b.dom.arrayContains(this.tagNames, c.tagName.toLowerCase()) && d) return c;
                c = c.parentNode
            }
            return ! 1
        },
        postApply: function(a, b) {
            var c = a[0],
            d = a[a.length - 1],
            e = [],
            f,
            g = c,
            h = d,
            i = 0,
            j = d.length,
            k,
            l;
            for (var n = 0, o = a.length; n < o; ++n) k = a[n],
            l = this.getAdjacentMergeableTextNode(k.parentNode, !1),
            l ? (f || (f = new m(l), e.push(f)), f.textNodes.push(k), k === c && (g = f.firstTextNode, i = g.length), k === d && (h = f.firstTextNode, j = f.getLength())) : f = null;
            var p = this.getAdjacentMergeableTextNode(d.parentNode, !0);
            p && (f || (f = new m(d), e.push(f)), f.textNodes.push(p));
            if (e.length) {
                for (n = 0, o = e.length; n < o; ++n) e[n].doMerge();
                b.setStart(g, i),
                b.setEnd(h, j)
            }
        },
        getAdjacentMergeableTextNode: function(b, c) {
            var d = b.nodeType == a.TEXT_NODE,
            e = d ? b.parentNode: b,
            f,
            g = c ? "nextSibling": "previousSibling";
            if (d) {
                f = b[g];
                if (f && f.nodeType == a.TEXT_NODE) return f
            } else {
                f = e[g];
                if (f && this.areElementsMergeable(b, f)) return f[c ? "firstChild": "lastChild"]
            }
            return null
        },
        areElementsMergeable: function(a, c) {
            return b.dom.arrayContains(this.tagNames, (a.tagName || "").toLowerCase()) && b.dom.arrayContains(this.tagNames, (c.tagName || "").toLowerCase()) && h(a, c) && j(a, c)
        },
        createContainer: function(a) {
            var b = a.createElement(this.tagNames[0]);
            return this.cssClass && (b.className = this.cssClass),
            b
        },
        applyToTextNode: function(a) {
            var c = a.parentNode;
            if (c.childNodes.length == 1 && b.dom.arrayContains(this.tagNames, c.tagName.toLowerCase())) this.cssClass && f(c, this.cssClass, this.similarClassRegExp);
            else {
                var d = this.createContainer(b.dom.getDocument(a));
                a.parentNode.insertBefore(d, a),
                d.appendChild(a)
            }
        },
        isRemovable: function(c) {
            return b.dom.arrayContains(this.tagNames, c.tagName.toLowerCase()) && a.lang.string(c.className).trim() == this.cssClass
        },
        undoToTextNode: function(a, b, c) {
            if (!b.containsNode(c)) {
                var d = b.cloneRange();
                d.selectNode(c),
                d.isPointInRange(b.endContainer, b.endOffset) && k(b.endContainer, b.endOffset) && (l(c, b.endContainer, b.endOffset), b.setEndAfter(c)),
                d.isPointInRange(b.startContainer, b.startOffset) && k(b.startContainer, b.startOffset) && (c = l(c, b.startContainer, b.startOffset))
            }
            this.similarClassRegExp && g(c, this.similarClassRegExp),
            this.isRemovable(c) && i(c)
        },
        applyToRange: function(b) {
            var c = b.getNodes([a.TEXT_NODE]);
            if (!c.length) try {
                var d = this.createContainer(b.endContainer.ownerDocument);
                b.surroundContents(d),
                this.selectNode(b, d);
                return
            } catch(e) {}
            b.splitBoundaries(),
            c = b.getNodes([a.TEXT_NODE]);
            if (c.length) {
                var f;
                for (var g = 0, h = c.length; g < h; ++g) f = c[g],
                this.getAncestorWithClass(f) || this.applyToTextNode(f);
                b.setStart(c[0], 0),
                f = c[c.length - 1],
                b.setEnd(f, f.length),
                this.normalize && this.postApply(c, b)
            }
        },
        undoToRange: function(b) {
            var c = b.getNodes([a.TEXT_NODE]),
            d,
            e;
            if (c.length) b.splitBoundaries(),
            c = b.getNodes([a.TEXT_NODE]);
            else {
                var f = b.endContainer.ownerDocument,
                g = f.createTextNode(a.INVISIBLE_SPACE);
                b.insertNode(g),
                b.selectNode(g),
                c = [g]
            }
            for (var h = 0, i = c.length; h < i; ++h) d = c[h],
            e = this.getAncestorWithClass(d),
            e && this.undoToTextNode(d, b, e);
            i == 1 ? this.selectNode(b, c[0]) : (b.setStart(c[0], 0), d = c[c.length - 1], b.setEnd(d, d.length), this.normalize && this.postApply(c, b))
        },
        selectNode: function(b, c) {
            var d = c.nodeType === a.ELEMENT_NODE,
            e = "canHaveHTML" in c ? c.canHaveHTML: !0,
            f = d ? c.innerHTML: c.data,
            g = f === "" || f === a.INVISIBLE_SPACE;
            if (g && d && e) try {
                c.innerHTML = a.INVISIBLE_SPACE
            } catch(h) {}
            b.selectNodeContents(c),
            g && d ? b.collapse(!1) : g && (b.setStartAfter(c), b.setEndAfter(c))
        },
        getTextSelectedByRange: function(a, 
        b) {
            var c = b.cloneRange();
            c.selectNodeContents(a);
            var d = c.intersection(b),
            e = d ? d.toString() : "";
            return c.detach(),
            e
        },
        isAppliedToRange: function(b) {
            var c = [],
            d,
            e = b.getNodes([a.TEXT_NODE]);
            if (!e.length) return d = this.getAncestorWithClass(b.startContainer),
            d ? [d] : !1;
            for (var f = 0, g = e.length, h; f < g; ++f) {
                h = this.getTextSelectedByRange(e[f], b),
                d = this.getAncestorWithClass(e[f]);
                if (h != "" && !d) return ! 1;
                c.push(d)
            }
            return c
        },
        toggleRange: function(a) {
            this.isAppliedToRange(a) ? this.undoToRange(a) : this.applyToRange(a)
        }
    },
    a.selection.HTMLApplier = n
} (wysihtml5, rangy),
wysihtml5.Commands = Base.extend({
    constructor: function(a) {
        this.editor = a,
        this.composer = a.composer,
        this.doc = this.composer.doc
    },
    support: function(a) {
        return wysihtml5.browser.supportsCommand(this.doc, a)
    },
    exec: function(a, b) {
        var c = wysihtml5.commands[a],
        d = wysihtml5.lang.array(arguments).get(),
        e = c && c.exec,
        f = null;
        this.editor.fire("beforecommand:composer");
        if (e) d.unshift(this.composer),
        f = e.apply(c, d);
        else try {
            f = this.doc.execCommand(a, !1, b)
        } catch(g) {}
        return this.editor.fire("aftercommand:composer"),
        f
    },
    state: function(a, b) {
        var c = wysihtml5.commands[a],
        d = wysihtml5.lang.array(arguments).get(),
        e = c && c.state;
        if (e) return d.unshift(this.composer),
        e.apply(c, d);
        try {
            return this.doc.queryCommandState(a)
        } catch(f) {
            return ! 1
        }
    },
    value: function(a) {
        var b = wysihtml5.commands[a],
        c = b && b.value;
        if (c) return c.call(b, this.composer, a);
        try {
            return this.doc.queryCommandValue(a)
        } catch(d) {
            return null
        }
    }
}),
function(a) {
    var b;
    a.commands.bold = {
        exec: function(b, c) {
            return a.commands.formatInline.exec(b, c, "b")
        },
        state: function(b, c, d) {
            return a.commands.formatInline.state(b, c, "b")
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    function e(a, b) {
        var c = b.length,
        e = 0,
        f,
        g,
        h;
        for (; e < c; e++) f = b[e],
        g = d.getParentElement(f, {
            nodeName: "code"
        }),
        h = d.getTextContent(f),
        h.match(d.autoLink.URL_REG_EXP) && !g ? g = d.renameElement(f, "code") : d.replaceWithChildNodes(f)
    }
    function f(e, f) {
        var g = e.doc,
        h = "_wysihtml5-temp-" + +(new Date),
        i = /non-matching-class/g,
        j = 0,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s;
        a.commands.formatInline.exec(e, b, c, h, i),
        l = g.querySelectorAll(c + "." + h),
        k = l.length;
        for (; j < k; j++) {
            m = l[j],
            m.removeAttribute("class");
            for (s in f) m.setAttribute(s, f[s])
        }
        p = m,
        k === 1 && (q = d.getTextContent(m), n = !!m.querySelector("*"), o = q === "" || q === a.INVISIBLE_SPACE, !n && o && (d.setTextContent(m, f.text || m.href), r = g.createTextNode(" "), e.selection.setAfter(m), e.selection.insertNode(r), p = r)),
        e.selection.setAfter(p)
    }
    var b,
    c = "A",
    d = a.dom;
    a.commands.createLink = {
        exec: function(a, b, c) {
            var d = this.state(a, b);
            d ? a.selection.executeAndRestore(function() {
                e(a, d)
            }) : (c = typeof c == "object" ? c: {
                href: c
            },
            f(a, c))
        },
        state: function(b, c) {
            return a.commands.formatInline.state(b, c, "A")
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b,
    c = /wysiwyg-font-size-[a-z\-]+/g;
    a.commands.fontSize = {
        exec: function(b, d, e) {
            return a.commands.formatInline.exec(b, d, "span", "wysiwyg-font-size-" + e, c)
        },
        state: function(b, d, e) {
            return a.commands.formatInline.state(b, d, "span", "wysiwyg-font-size-" + e, c)
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b,
    c = /wysiwyg-color-[a-z]+/g;
    a.commands.foreColor = {
        exec: function(b, d, e) {
            return a.commands.formatInline.exec(b, d, "span", "wysiwyg-color-" + e, c)
        },
        state: function(b, d, e) {
            return a.commands.formatInline.state(b, d, "span", "wysiwyg-color-" + e, c)
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    function f(a, b, c) {
        a.className ? (g(a, c), a.className += " " + b) : a.className = b
    }
    function g(a, b) {
        a.className = a.className.replace(b, "")
    }
    function h(b) {
        return b.nodeType === a.TEXT_NODE && !a.lang.string(b.data).trim()
    }
    function i(a) {
        var b = a.previousSibling;
        while (b && h(b)) b = b.previousSibling;
        return b
    }
    function j(a) {
        var b = a.nextSibling;
        while (b && h(b)) b = b.nextSibling;
        return b
    }
    function k(a) {
        var b = a.ownerDocument,
        c = j(a),
        d = i(a);
        c && !o(c) && a.parentNode.insertBefore(b.createElement("br"), c),
        d && !o(d) && a.parentNode.insertBefore(b.createElement("br"), a)
    }
    function l(a) {
        var b = j(a),
        c = i(a);
        b && n(b) && b.parentNode.removeChild(b),
        c && n(c) && c.parentNode.removeChild(c)
    }
    function m(a) {
        var b = a.lastChild;
        b && n(b) && b.parentNode.removeChild(b)
    }
    function n(a) {
        return a.nodeName === "BR"
    }
    function o(a) {
        return n(a) ? !0: c.getStyle("display").from(a) === "block" ? !0: !1
    }
    function p(b, d, e, f) {
        if (f) var g = c.observe(b, "DOMNodeInserted", 
        function(b) {
            var d = b.target,
            e;
            if (d.nodeType !== a.ELEMENT_NODE) return;
            e = c.getStyle("display").from(d),
            e.substr(0, 6) !== "inline" && (d.className += " " + f)
        });
        b.execCommand(d, !1, e),
        g && g.stop()
    }
    function q(a, b) {
        a.selection.selectLine(),
        a.selection.surround(b),
        l(b),
        m(b),
        a.selection.selectNode(b)
    }
    function r(b) {
        return !! a.lang.string(b.className).trim()
    }
    var b,
    c = a.dom,
    d = "DIV",
    e = ["H1", "H2", "H3", "H4", "H5", "H6", "P", "BLOCKQUOTE", d];
    a.commands.formatBlock = {
        exec: function(b, h, i, j, l) {
            var m = b.doc,
            n = this.state(b, h, i, j, l),
            o;
            i = typeof i == "string" ? i.toUpperCase() : i;
            if (n) {
                if (n.nodeName === "BLOCKQUOTE") {
                    k(n);
                    var s = m.createTextNode(a.INVISIBLE_SPACE),
                    t = m.createRange();
                    rangy.dom.insertAfter(s, n),
                    b.selection.selectNode(s)
                } else b.selection.executeAndRestoreSimple(function() {
                    l && g(n, l);
                    var a = r(n); ! a && n.nodeName === (i || d) ? (k(n), c.replaceWithChildNodes(n)) : a && c.renameElement(n, d)
                });
                return
            }
            if (i === null || a.lang.array(e).contains(i)) {
                o = b.selection.getSelectedNode(),
                n = c.getParentElement(o, {
                    nodeName: e
                });
                if (n) {
                    b.selection.executeAndRestoreSimple(function() {
                        i && (n = c.renameElement(n, i)),
                        j && f(n, j, l)
                    });
                    return
                }
            }
            if (b.commands.support(h)) {
                p(m, h, i || d, j);
                return
            }
            n = m.createElement(i || d),
            j && (n.className = j),
            q(b, n)
        },
        state: function(a, b, d, e, f) {
            d = typeof d == "string" ? d.toUpperCase() : d;
            var g = a.selection.getSelectedNode();
            return c.getParentElement(g, {
                nodeName: d,
                className: e,
                classRegExp: f
            })
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    function e(a) {
        var b = c[a];
        return b ? [a.toLowerCase(), b.toLowerCase()] : [a.toLowerCase()]
    }
    function f(b, c, f) {
        var g = b + ":" + c;
        return d[g] || (d[g] = new a.selection.HTMLApplier(e(b), c, f, !0)),
        d[g]
    }
    var b,
    c = {
        strong: "b",
        em: "i",
        b: "strong",
        i: "em"
    },
    d = {};
    a.commands.formatInline = {
        exec: function(a, b, c, d, e) {
            var g = a.selection.getRange();
            if (!g) return ! 1;
            f(c, d, e).toggleRange(g),
            a.selection.setSelection(g)
        },
        state: function(b, d, e, g, h) {
            var i = b.doc,
            j = c[e] || e,
            k;
            return ! a.dom.hasElementWithTagName(i, e) && !a.dom.hasElementWithTagName(i, j) ? !1: g && !a.dom.hasElementWithClassName(i, g) ? !1: (k = b.selection.getRange(), k ? f(e, g, h).isAppliedToRange(k) : !1)
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b;
    a.commands.insertHTML = {
        exec: function(a, b, c) {
            a.commands.support(b) ? a.doc.execCommand(b, !1, c) : a.selection.insertHTML(c)
        },
        state: function() {
            return ! 1
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b = "IMG";
    a.commands.insertImage = {
        exec: function(c, d, e) {
            e = typeof e == "object" ? e: {
                src: e
            };
            var f = c.doc,
            g = this.state(c),
            h,
            i,
            j;
            if (g) {
                c.selection.setBefore(g),
                j = g.parentNode,
                j.removeChild(g),
                a.dom.removeEmptyTextNodes(j),
                j.nodeName === "A" && !j.firstChild && (c.selection.setAfter(j), j.parentNode.removeChild(j)),
                a.quirks.redraw(c.element);
                return
            }
            g = f.createElement(b);
            for (i in e) g[i] = e[i];
            return c.selection.insertNode(g),
            a.browser.hasProblemsSettingCaretAfterImg() ? (h = f.createTextNode(a.INVISIBLE_SPACE), c.selection.insertNode(h), c.selection.setAfter(h)) : c.selection.setAfter(g),
            g
        },
        state: function(c) {
            var d = c.doc,
            e,
            f,
            g;
            return a.dom.hasElementWithTagName(d, b) ? (e = c.selection.getSelectedNode(), e ? e.nodeName === b ? e: e.nodeType !== a.ELEMENT_NODE ? !1: (f = c.selection.getText(), f = a.lang.string(f).trim(), f ? !1: (g = c.selection.getNodes(a.ELEMENT_NODE, 
            function(a) {
                return a.nodeName === "IMG"
            }), g.length !== 1 ? !1: g[0])) : !1) : !1
        },
        value: function(a) {
            var b = this.state(a);
            return b && b.src
        }
    }
} (wysihtml5),
function(a) {
    var b,
    c = "<br>" + (a.browser.needsSpaceAfterLineBreak() ? " ": "");
    a.commands.insertLineBreak = {
        exec: function(b, d) {
            b.commands.support(d) ? (b.doc.execCommand(d, !1, null), a.browser.autoScrollsToCaret() || b.selection.scrollIntoView()) : b.commands.exec("insertHTML", c)
        },
        state: function() {
            return ! 1
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b;
    a.commands.insertOrderedList = {
        exec: function(b, c) {
            var d = b.doc,
            e = b.selection.getSelectedNode(),
            f = a.dom.getParentElement(e, {
                nodeName: "OL"
            }),
            g = a.dom.getParentElement(e, {
                nodeName: "UL"
            }),
            h = "_wysihtml5-temp-" + (new Date).getTime(),
            i,
            j;
            if (b.commands.support(c)) {
                d.execCommand(c, !1, null);
                return
            }
            f ? b.selection.executeAndRestoreSimple(function() {
                a.dom.resolveList(f)
            }) : g ? b.selection.executeAndRestoreSimple(function() {
                a.dom.renameElement(g, "ol")
            }) : (b.commands.exec("formatBlock", "div", h), j = d.querySelector("." + h), i = j.innerHTML === "" || j.innerHTML === "<br>" || j.innerHTML === a.INVISIBLE_SPACE, b.selection.executeAndRestoreSimple(function() {
                f = a.dom.convertToList(j, "ol")
            }), i && b.selection.selectNode(f.querySelector("li")))
        },
        state: function(b) {
            var c = b.selection.getSelectedNode();
            return a.dom.getParentElement(c, {
                nodeName: "OL"
            })
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b;
    a.commands.insertUnorderedList = {
        exec: function(b, c) {
            var d = b.doc,
            e = b.selection.getSelectedNode(),
            f = a.dom.getParentElement(e, {
                nodeName: "UL"
            }),
            g = a.dom.getParentElement(e, {
                nodeName: "OL"
            }),
            h = "_wysihtml5-temp-" + (new Date).getTime(),
            i,
            j;
            if (b.commands.support(c)) {
                d.execCommand(c, !1, null);
                return
            }
            f ? b.selection.executeAndRestoreSimple(function() {
                a.dom.resolveList(f)
            }) : g ? b.selection.executeAndRestoreSimple(function() {
                a.dom.renameElement(g, "ul")
            }) : (b.commands.exec("formatBlock", "div", h), j = d.querySelector("." + h), i = j.innerHTML === "" || j.innerHTML === "<br>" || j.innerHTML === a.INVISIBLE_SPACE, b.selection.executeAndRestoreSimple(function() {
                f = a.dom.convertToList(j, "ul")
            }), i && b.selection.selectNode(f.querySelector("li")))
        },
        state: function(b) {
            var c = b.selection.getSelectedNode();
            return a.dom.getParentElement(c, {
                nodeName: "UL"
            })
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b;
    a.commands.italic = {
        exec: function(b, c) {
            return a.commands.formatInline.exec(b, c, "i")
        },
        state: function(b, c, d) {
            return a.commands.formatInline.state(b, c, "i")
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b,
    c = "wysiwyg-text-align-center",
    d = /wysiwyg-text-align-[a-z]+/g;
    a.commands.justifyCenter = {
        exec: function(b, e) {
            return a.commands.formatBlock.exec(b, "formatBlock", null, c, d)
        },
        state: function(b, e) {
            return a.commands.formatBlock.state(b, "formatBlock", null, c, d)
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b,
    c = "wysiwyg-text-align-left",
    d = /wysiwyg-text-align-[a-z]+/g;
    a.commands.justifyLeft = {
        exec: function(b, e) {
            return a.commands.formatBlock.exec(b, "formatBlock", null, c, d)
        },
        state: function(b, e) {
            return a.commands.formatBlock.state(b, "formatBlock", null, c, d)
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b,
    c = "wysiwyg-text-align-right",
    d = /wysiwyg-text-align-[a-z]+/g;
    a.commands.justifyRight = {
        exec: function(b, e) {
            return a.commands.formatBlock.exec(b, "formatBlock", null, c, d)
        },
        state: function(b, e) {
            return a.commands.formatBlock.state(b, "formatBlock", null, c, d)
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b;
    a.commands.underline = {
        exec: function(b, c) {
            return a.commands.formatInline.exec(b, c, "u")
        },
        state: function(b, c) {
            return a.commands.formatInline.state(b, c, "u")
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    var b;
    a.commands.hr = {
        exec: function(b, c, d) {
            var e = document.createElement("hr");
            b.selection.insertNode(e);
            var f = document.createTextNode(a.INVISIBLE_SPACE);
            rangy.dom.insertAfter(f, e),
            b.selection.selectNode(f)
        },
        state: function(a, b) {
            return ! 1
        },
        value: function() {
            return b
        }
    }
} (wysihtml5),
function(a) {
    function j(a) {
        var b;
        while (b = a.querySelector("._wysihtml5-temp")) b.parentNode.removeChild(b)
    }
    var b = 90,
    c = 89,
    d = 8,
    e = 46,
    f = 40,
    g = '<span id="_wysihtml5-undo" class="_wysihtml5-temp">' + a.INVISIBLE_SPACE + "</span>",
    h = '<span id="_wysihtml5-redo" class="_wysihtml5-temp">' + a.INVISIBLE_SPACE + "</span>",
    i = a.dom;
    a.UndoManager = a.lang.Dispatcher.extend({
        constructor: function(a) {
            this.editor = a,
            this.composer = a.composer,
            this.element = this.composer.element,
            this.history = [this.composer.getValue()],
            this.position = 1,
            this.composer.commands.support("insertHTML") && this._observe()
        },
        _observe: function() {
            var f = this,
            k = this.composer.sandbox.getDocument(),
            l;
            i.observe(this.element, "keydown", 
            function(a) {
                var d = /Mac/.test(navigator.userAgent),
                e = d ? a.metaKey: a.ctrlKey;
                if (a.altKey || !e) return;
                var g = a.keyCode,
                h = g === b && !a.shiftKey,
                i = g === b && a.shiftKey || g === c;
                h ? (f.undo(), a.preventDefault()) : i && (f.redo(), a.preventDefault())
            }),
            i.observe(this.element, "keydown", 
            function(a) {
                var b = a.keyCode;
                if (b === l) return;
                l = b,
                (b === d || b === e) && f.transact()
            });
            if (a.browser.hasUndoInContextMenu()) {
                var m,
                n,
                o = function() {
                    j(k),
                    clearInterval(m)
                };
                i.observe(this.element, "contextmenu", 
                function() {
                    o(),
                    f.composer.selection.executeAndRestoreSimple(function() {
                        f.element.lastChild && f.composer.selection.setAfter(f.element.lastChild),
                        k.execCommand("insertHTML", !1, g),
                        k.execCommand("insertHTML", !1, h),
                        k.execCommand("undo", !1, null)
                    }),
                    m = setInterval(function() {
                        k.getElementById("_wysihtml5-redo") ? (o(), f.redo()) : k.getElementById("_wysihtml5-undo") || (o(), f.undo())
                    },
                    400),
                    n || (n = !0, i.observe(document, "mousedown", o), i.observe(k, ["mousedown", "paste", "cut", "copy"], o))
                })
            }
            this.editor.observe("newword:composer", 
            function() {
                f.transact()
            }).observe("beforecommand:composer", 
            function() {
                f.transact()
            })
        },
        transact: function() {
            var a = this.history[this.position - 1],
            b = this.composer.getValue();
            if (b == a) return;
            var c = this.history.length = this.position;
            c > f && (this.history.shift(), this.position--),
            this.position++,
            this.history.push(b)
        },
        undo: function() {
            this.transact();
            if (this.position <= 1) return;
            this.set(this.history[--this.position - 1]),
            this.editor.fire("undo:composer")
        },
        redo: function() {
            if (this.position >= this.history.length) return;
            this.set(this.history[++this.position - 1]),
            this.editor.fire("redo:composer")
        },
        set: function(a) {
            this.composer.setValue(a),
            this.editor.focus(!0)
        }
    })
} (wysihtml5),
wysihtml5.views.View = Base.extend({
    constructor: function(a, b, c) {
        this.parent = a,
        this.element = b,
        this.config = c,
        this._observeViewChange()
    },
    _observeViewChange: function() {
        var a = this;
        this.parent.observe("beforeload", 
        function() {
            a.parent.observe("change_view", 
            function(b) {
                b === a.name ? (a.parent.currentView = a, a.show(), setTimeout(function() {
                    a.focus()
                },
                0)) : a.hide()
            })
        })
    },
    focus: function() {
        if (this.element.ownerDocument.querySelector(":focus") === this.element) return;
        try {
            this.element.focus()
        } catch(a) {}
    },
    hide: function() {
        this.element.style.display = "none"
    },
    show: function() {
        this.element.style.display = ""
    },
    disable: function() {
        this.element.setAttribute("disabled", "disabled")
    },
    enable: function() {
        this.element.removeAttribute("disabled")
    }
}),
function(a) {
    var b = a.dom,
    c = a.browser;
    a.views.Composer = a.views.View.extend({
        name: "composer",
        CARET_HACK: "<br>",
        constructor: function(a, b, c) {
            this.base(a, b, c),
            this.textarea = this.parent.textarea,
            this._initSandbox()
        },
        clear: function() {
            this.element.innerHTML = c.displaysCaretInEmptyContentEditableCorrectly() ? "": this.CARET_HACK
        },
        getValue: function(b) {
            var c = this.isEmpty() ? "": a.quirks.getCorrectInnerHTML(this.element);
            return b && (c = this.parent.parse(c)),
            c = a.lang.string(c).replace(a.INVISIBLE_SPACE).by(""),
            c
        },
        setValue: function(a, b) {
            b && (a = this.parent.parse(a)),
            this.element.innerHTML = a
        },
        show: function() {
            this.iframe.style.display = this._displayStyle || "",
            this.disable(),
            this.enable()
        },
        hide: function() {
            this._displayStyle = b.getStyle("display").from(this.iframe),
            this._displayStyle === "none" && (this._displayStyle = null),
            this.iframe.style.display = "none"
        },
        disable: function() {
            this.element.removeAttribute("contentEditable"),
            this.base()
        },
        enable: function() {
            this.element.setAttribute("contentEditable", "true"),
            this.base()
        },
        focus: function(b) {
            a.browser.doesAsyncFocus() && this.hasPlaceholderSet() && this.clear(),
            this.base();
            var c = this.element.lastChild;
            b && c && (c.nodeName === "BR" ? this.selection.setBefore(this.element.lastChild) : this.selection.setAfter(this.element.lastChild))
        },
        getTextContent: function() {
            return b.getTextContent(this.element)
        },
        hasPlaceholderSet: function() {
            return this.getTextContent() == this.textarea.element.getAttribute("placeholder")
        },
        isEmpty: function() {
            var a = this.element.innerHTML,
            b = "blockquote, ul, ol, img, embed, object, table, iframe, svg, video, audio, button, input, select, textarea";
            return a === "" || a === this.CARET_HACK || this.hasPlaceholderSet() || this.getTextContent() === "" && !this.element.querySelector(b)
        },
        _initSandbox: function() {
            var a = this;
            this.sandbox = new b.Sandbox(function() {
                a._create()
            },
            {
                stylesheets: this.config.stylesheets
            }),
            this.iframe = this.sandbox.getIframe();
            var c = document.createElement("input");
            c.type = "hidden",
            c.name = "_wysihtml5_mode",
            c.value = 1;
            var d = this.textarea.element;
            b.insert(this.iframe).after(d),
            b.insert(c).after(d)
        },
        _create: function() {
            var d = this;
            this.doc = this.sandbox.getDocument(),
            this.element = this.doc.body,
            this.textarea = this.parent.textarea,
            this.element.innerHTML = this.textarea.getValue(!0),
            this.enable(),
            this.selection = new a.Selection(this.parent),
            this.commands = new a.Commands(this.parent),
            b.copyAttributes(["className", "spellcheck", "title", "lang", "dir", "accessKey"]).from(this.textarea.element).to(this.element),
            b.addClass(this.element, this.config.composerClassName),
            this.config.style && this.style(),
            this.observe();
            var e = this.config.name;
            e && (b.addClass(this.element, e), b.addClass(this.iframe, e));
            var f = typeof this.config.placeholder == "string" ? this.config.placeholder: this.textarea.element.getAttribute("placeholder");
            f && b.simulatePlaceholder(this.parent, this, f),
            this.commands.exec("styleWithCSS", !1),
            this._initAutoLinking(),
            this._initObjectResizing(),
            this._initUndoManager(),
            (this.textarea.element.hasAttribute("autofocus") || document.querySelector(":focus") == this.textarea.element) && setTimeout(function() {
                d.focus()
            },
            100),
            a.quirks.insertLineBreakOnReturn(this),
            c.clearsContentEditableCorrectly() || a.quirks.ensureProperClearing(this),
            c.clearsListsInContentEditableCorrectly() || a.quirks.ensureProperClearingOfLists(this),
            this.initSync && this.config.sync && this.initSync(),
            this.textarea.hide(),
            this.parent.fire("beforeload").fire("load")
        },
        _initAutoLinking: function() {
            var d = this,
            e = c.canDisableAutoLinking(),
            f = c.doesAutoLinkingInContentEditable();
            e && this.commands.exec("autoUrlDetect", !1);
            if (!this.config.autoLink) return; (!f || f && e) && this.parent.observe("newword:composer", 
            function() {
                d.selection.executeAndRestore(function(a, c) {
                    b.autoLink(c.parentNode)
                })
            });
            var g = this.sandbox.getDocument().getElementsByTagName("a"),
            h = b.autoLink.URL_REG_EXP,
            i = function(c) {
                var d = a.lang.string(b.getTextContent(c)).trim();
                return d.substr(0, 4) === "www." && (d = "http://" + d),
                d
            };
            b.observe(this.element, "keydown", 
            function(a) {
                if (!g.length) return;
                var c = d.selection.getSelectedNode(a.target.ownerDocument),
                e = b.getParentElement(c, {
                    nodeName: "A"
                },
                4),
                f;
                if (!e) return;
                f = i(e),
                setTimeout(function() {
                    var a = i(e);
                    if (a === f) return;
                    a.match(h) && e.setAttribute("href", a)
                },
                0)
            })
        },
        _initObjectResizing: function() {
            var d = ["width", "height"],
            e = d.length,
            f = this.element;
            this.commands.exec("enableObjectResizing", this.config.allowObjectResizing),
            this.config.allowObjectResizing ? c.supportsEvent("resizeend") && b.observe(f, "resizeend", 
            function(b) {
                var c = b.target || b.srcElement,
                g = c.style,
                h = 0,
                i;
                for (; h < e; h++) i = d[h],
                g[i] && (c.setAttribute(i, parseInt(g[i], 10)), g[i] = "");
                a.quirks.redraw(f)
            }) : c.supportsEvent("resizestart") && b.observe(f, "resizestart", 
            function(a) {
                a.preventDefault()
            })
        },
        _initUndoManager: function() {
            new a.UndoManager(this.parent)
        }
    })
} (wysihtml5),
function(a) {
    var b = a.dom,
    c = document,
    d = window,
    e = c.createElement("div"),
    f = ["background-color", "color", "cursor", "font-family", "font-size", "font-style", "font-variant", "font-weight", "line-height", "letter-spacing", "text-align", "text-decoration", "text-indent", "text-rendering", "word-break", "word-wrap", "word-spacing"],
    g = ["background-color", "border-collapse", "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-left-color", "border-left-style", "border-left-width", "border-right-color", "border-right-style", "border-right-width", "border-top-color", "border-top-style", "border-top-width", "clear", "display", "float", "margin-bottom", "margin-left", "margin-right", "margin-top", "outline-color", "outline-offset", "outline-width", "outline-style", "padding-left", "padding-right", "padding-top", "padding-bottom", "position", "top", "left", "right", "bottom", "z-index", "vertical-align", "text-align", "-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing", "-webkit-box-shadow", "-moz-box-shadow", "-ms-box-shadow", "box-shadow", "-webkit-border-top-right-radius", "-moz-border-radius-topright", "border-top-right-radius", "-webkit-border-bottom-right-radius", "-moz-border-radius-bottomright", "border-bottom-right-radius", "-webkit-border-bottom-left-radius", "-moz-border-radius-bottomleft", "border-bottom-left-radius", "-webkit-border-top-left-radius", "-moz-border-radius-topleft", "border-top-left-radius", "width", "height"],
    h = ["width", "height", "top", "left", "right", "bottom"],
    i = ["html             { height: 100%; }", "body             { min-height: 100%; padding: 0; margin: 0; margin-top: -1px; padding-top: 1px; }", "._wysihtml5-temp { display: none; }", a.browser.isGecko ? "body.placeholder { color: graytext !important; }": "body.placeholder { color: #a9a9a9 !important; }", "body[disabled]   { background-color: #eee !important; color: #999 !important; cursor: default !important; }", "img:-moz-broken  { -moz-force-broken-image-icon: 1; height: 24px; width: 24px; }"],
    j = function(a) {
        if (a.setActive) try {
            a.setActive()
        } catch(e) {} else {
            var f = a.style,
            g = c.documentElement.scrollTop || c.body.scrollTop,
            h = c.documentElement.scrollLeft || c.body.scrollLeft,
            i = {
                position: f.position,
                top: f.top,
                left: f.left,
                WebkitUserSelect: f.WebkitUserSelect
            };
            b.setStyles({
                position: "absolute",
                top: "-99999px",
                left: "-99999px",
                WebkitUserSelect: "none"
            }).on(a),
            a.focus(),
            b.setStyles(i).on(a),
            d.scrollTo && d.scrollTo(h, g)
        }
    };
    a.views.Composer.prototype.style = function() {
        var k = this,
        l = c.querySelector(":focus"),
        m = this.textarea.element,
        n = m.hasAttribute("placeholder"),
        o = n && m.getAttribute("placeholder");
        this.focusStylesHost = this.focusStylesHost || e.cloneNode(!1),
        this.blurStylesHost = this.blurStylesHost || e.cloneNode(!1),
        n && m.removeAttribute("placeholder"),
        m === l && m.blur(),
        b.copyStyles(g).from(m).to(this.iframe).andTo(this.blurStylesHost),
        b.copyStyles(f).from(m).to(this.element).andTo(this.blurStylesHost),
        b.insertCSS(i).into(this.element.ownerDocument),
        j(m),
        b.copyStyles(g).from(m).to(this.focusStylesHost),
        b.copyStyles(f).from(m).to(this.focusStylesHost);
        var p = a.lang.array(g).without(["display"]);
        l ? l.focus() : m.blur(),
        n && m.setAttribute("placeholder", o);
        if (!a.browser.hasCurrentStyleProperty()) var q = b.observe(d, "resize", 
        function() {
            if (!b.contains(document.documentElement, k.iframe)) {
                q.stop();
                return
            }
            var a = b.getStyle("display").from(m),
            c = b.getStyle("display").from(k.iframe);
            m.style.display = "",
            k.iframe.style.display = "none",
            b.copyStyles(h).from(m).to(k.iframe).andTo(k.focusStylesHost).andTo(k.blurStylesHost),
            k.iframe.style.display = c,
            m.style.display = a
        });
        return this.parent.observe("focus:composer", 
        function() {
            b.copyStyles(p).from(k.focusStylesHost).to(k.iframe),
            b.copyStyles(f).from(k.focusStylesHost).to(k.element)
        }),
        this.parent.observe("blur:composer", 
        function() {
            b.copyStyles(p).from(k.blurStylesHost).to(k.iframe),
            b.copyStyles(f).from(k.blurStylesHost).to(k.element)
        }),
        this
    }
} (wysihtml5),
function(a) {
    var b = a.dom,
    c = a.browser,
    d = {
        66: "bold",
        73: "italic",
        85: "underline"
    };
    a.views.Composer.prototype.observe = function() {
        var e = this,
        f = this.getValue(),
        g = this.sandbox.getIframe(),
        h = this.element,
        i = c.supportsEventsInIframeCorrectly() ? h: this.sandbox.getWindow(),
        j = c.supportsEvent("drop") ? ["drop", "paste"] : ["dragdrop", "paste"];
        b.observe(g, "DOMNodeRemoved", 
        function() {
            clearInterval(k),
            e.parent.fire("destroy:composer")
        });
        var k = setInterval(function() {
            b.contains(document.documentElement, g) || (clearInterval(k), e.parent.fire("destroy:composer"))
        },
        250);
        b.observe(i, "focus", 
        function() {
            e.parent.fire("focus").fire("focus:composer"),
            setTimeout(function() {
                f = e.getValue()
            },
            0)
        }),
        b.observe(i, "blur", 
        function() {
            f !== e.getValue() && e.parent.fire("change").fire("change:composer"),
            e.parent.fire("blur").fire("blur:composer")
        }),
        a.browser.isIos() && b.observe(h, "blur", 
        function() {
            var a = h.ownerDocument.createElement("input"),
            b = document.documentElement.scrollTop || document.body.scrollTop,
            c = document.documentElement.scrollLeft || document.body.scrollLeft;
            try {
                e.selection.insertNode(a)
            } catch(d) {
                h.appendChild(a)
            }
            a.focus(),
            a.parentNode.removeChild(a),
            window.scrollTo(c, b)
        }),
        b.observe(h, "dragenter", 
        function(a) {
            e.parent.fire("unset_placeholder")
        }),
        c.firesOnDropOnlyWhenOnDragOverIsCancelled() && b.observe(h, ["dragover", "dragenter"], 
        function(a) {
            a.preventDefault()
        }),
        b.observe(h, j, 
        function(a) {
            var b = a.dataTransfer || a.clipboardData;
            if (b && c.supportsDataTransfer()) {
                h.focus();
                if (b.types[0] === "Files") e.parent.fire("paste").fire("paste:composer", {
                    dataTransfer: b,
                    originalEvent: a
                });
                else {
                    var d = b.getData("text/html") || b.getData("text/plain");
                    d && (d = d.replace(/\n\r?/g, "<br/>"), e.commands.exec("insertHTML", d), e.parent.fire("paste").fire("paste:composer", {
                        dataTransfer: b,
                        originalEvent: a
                    })),
                    a.stopPropagation(),
                    a.preventDefault()
                }
            } else setTimeout(function() {
                e.parent.fire("paste").fire("paste:composer", {
                    originalEvent: a
                })
            },
            0)
        }),
        b.observe(h, "keyup", 
        function(b) {
            var c = b.keyCode; (c === a.SPACE_KEY || c === a.ENTER_KEY) && e.parent.fire("newword:composer")
        }),
        this.parent.observe("paste:composer", 
        function() {
            setTimeout(function() {
                e.parent.fire("newword:composer")
            },
            0)
        }),
        c.canSelectImagesInContentEditable() || b.observe(h, "mousedown", 
        function(a) {
            var b = a.target;
            b.nodeName === "IMG" && (e.selection.selectNode(b), a.preventDefault())
        }),
        b.observe(h, "keydown", 
        function(a) {
            var b = a.keyCode,
            c = d[b],
            f = /Mac/.test(navigator.userAgent),
            g = f ? a.metaKey: a.ctrlKey;
            g && !a.altKey && c && (e.commands.exec(c), a.preventDefault())
        }),
        b.observe(h, "keydown", 
        function(c) {
            var d = e.selection.getSelectedNode(!0),
            f = c.keyCode,
            g;
            d && d.nodeName === "IMG" && (f === a.BACKSPACE_KEY || f === a.DELETE_KEY) && (g = d.parentNode, g.removeChild(d), g.nodeName === "A" && !g.firstChild && g.parentNode.removeChild(g), setTimeout(function() {
                a.quirks.redraw(h)
            },
            0), c.preventDefault());
            if (f === a.BACKSPACE_KEY || f === a.DELETE_KEY) {
                var i = d.previousSibling;
                i && i.nodeName === "A" && d.nodeType === 3 && d.nodeValue.length === 1 && b.replaceWithChildNodes(i);
                var j = e.selection.getSelection().isCollapsed,
                k = e.selection.getRange(!0).startOffset;
                j && k === 1 && d.nodeType === 3 && i && i.nodeName && i.nodeName === "HR" && (d.nodeValue === a.INVISIBLE_SPACE && i.parentNode.removeChild(d), i.parentNode.removeChild(i), c.preventDefault());
                if (j && d.nodeName === "BODY") {
                    var i = d.childNodes[k - 2],
                    l = d.childNodes[k - 1];
                    l && l.nodeValue && l.nodeValue === a.INVISIBLE_SPACE && i && i.nodeName && i.nodeName === "HR" && (d.removeChild(l), d.removeChild(i), c.preventDefault())
                }
            }
        })
    }
} (wysihtml5),
function(a) {
    var b = 400;
    a.views.Synchronizer = Base.extend({
        constructor: function(a, b, c) {
            this.editor = a,
            this.textarea = b,
            this.composer = c,
            this._observe()
        },
        fromComposerToTextarea: function(b) {
            this.textarea.setValue(a.lang.string(this.composer.getValue()).trim(), b)
        },
        fromTextareaToComposer: function(a) {
            var b = this.textarea.getValue();
            b ? this.composer.setValue(b, a) : (this.composer.clear(), this.editor.fire("set_placeholder"))
        },
        sync: function(a) {
            this.editor.currentView.name === "textarea" ? this.fromTextareaToComposer(a) : this.fromComposerToTextarea(a)
        },
        _observe: function() {
            var c,
            d = this,
            e = this.textarea.element.form,
            f = function() {
                c = setInterval(function() {
                    d.fromComposerToTextarea()
                },
                b)
            },
            g = function() {
                clearInterval(c),
                c = null
            };
            f(),
            e && ($(e).data("submitEvent", a.dom.observe(e, "submit", 
            function() {
                d.sync(!0)
            })), $(e).data("resetEvent", a.dom.observe(e, "reset", 
            function() {
                setTimeout(function() {
                    d.fromTextareaToComposer()
                },
                0)
            }))),
            this.editor.observe("change_view", 
            function(a) {
                a === "composer" && !c ? (d.fromTextareaToComposer(!0), f()) : a === "textarea" && (d.fromComposerToTextarea(!0), g())
            }),
            this.editor.observe("destroy:composer", g)
        }
    })
} (wysihtml5),
wysihtml5.views.Textarea = wysihtml5.views.View.extend({
    name: "textarea",
    constructor: function(a, b, c) {
        this.base(a, b, c),
        this._observe()
    },
    clear: function() {
        this.element.value = ""
    },
    getValue: function(a) {
        var b = this.isEmpty() ? "": this.element.value;
        return a && (b = this.parent.parse(b)),
        b
    },
    setValue: function(a, b) {
        b && (a = this.parent.parse(a)),
        this.element.value = a
    },
    hasPlaceholderSet: function() {
        var a = wysihtml5.browser.supportsPlaceholderAttributeOn(this.element),
        b = this.element.getAttribute("placeholder") || null,
        c = this.element.value,
        d = !c;
        return a && d || c === b
    },
    isEmpty: function() {
        return ! wysihtml5.lang.string(this.element.value).trim() || this.hasPlaceholderSet()
    },
    _observe: function() {
        var a = this.element,
        b = this.parent,
        c = {
            focusin: "focus",
            focusout: "blur"
        },
        d = wysihtml5.browser.supportsEvent("focusin") ? ["focusin", "focusout", "change"] : ["focus", "blur", "change"];
        b.observe("beforeload", 
        function() {
            wysihtml5.dom.observe(a, d, 
            function(a) {
                var d = c[a.type] || a.type;
                b.fire(d).fire(d + ":textarea")
            }),
            wysihtml5.dom.observe(a, ["paste", "drop"], 
            function() {
                setTimeout(function() {
                    b.fire("paste").fire("paste:textarea")
                },
                0)
            })
        })
    }
}),
function(a) {
    var b = a.dom,
    c = "wysihtml5-command-dialog-opened",
    d = "input, select, textarea",
    e = "[data-wysihtml5-dialog-field]",
    f = "data-wysihtml5-dialog-field";
    a.toolbar.Dialog = a.lang.Dispatcher.extend({
        constructor: function(a, b) {
            this.link = a,
            this.container = b
        },
        _observe: function() {
            if (this._observed) return;
            var e = this,
            f = function(a) {
                var b = e._serialize();
                b == e.elementToChange ? e.fire("edit", b) : e.fire("save", b),
                e.hide(),
                a.preventDefault(),
                a.stopPropagation()
            };
            b.observe(e.link, "click", 
            function(a) {
                b.hasClass(e.link, c) && setTimeout(function() {
                    e.hide()
                },
                0)
            }),
            b.observe(this.container, "keydown", 
            function(b) {
                var c = b.keyCode;
                c === a.ENTER_KEY && f(b),
                c === a.ESCAPE_KEY && e.hide()
            }),
            b.delegate(this.container, "[data-wysihtml5-dialog-action=save]", "click", f),
            b.delegate(this.container, "[data-wysihtml5-dialog-action=cancel]", "click", 
            function(a) {
                e.fire("cancel"),
                e.hide(),
                a.preventDefault(),
                a.stopPropagation()
            });
            var g = this.container.querySelectorAll(d),
            h = 0,
            i = g.length,
            j = function() {
                clearInterval(e.interval)
            };
            for (; h < i; h++) b.observe(g[h], "change", j);
            this._observed = !0
        },
        _serialize: function() {
            var a = this.elementToChange || {},
            b = this.container.querySelectorAll(e),
            c = b.length,
            d = 0;
            for (; d < c; d++) a[b[d].getAttribute(f)] = b[d].value;
            return a
        },
        _interpolate: function(a) {
            var b,
            c,
            d,
            g = document.querySelector(":focus"),
            h = this.container.querySelectorAll(e),
            i = h.length,
            j = 0;
            for (; j < i; j++) {
                b = h[j];
                if (b === g) continue;
                if (a && b.type === "hidden") continue;
                c = b.getAttribute(f),
                d = this.elementToChange ? this.elementToChange[c] || "": b.defaultValue,
                b.value = d
            }
        },
        show: function(a) {
            var e = this,
            f = this.container.querySelector(d);
            this.elementToChange = a,
            this._observe(),
            this._interpolate(),
            a && (this.interval = setInterval(function() {
                e._interpolate(!0)
            },
            500)),
            b.addClass(this.link, c),
            this.container.style.display = "",
            this.fire("show");
            if (f && !a) try {
                f.focus()
            } catch(g) {}
        },
        hide: function() {
            clearInterval(this.interval),
            this.elementToChange = null,
            b.removeClass(this.link, c),
            this.container.style.display = "none",
            this.fire("hide")
        }
    })
} (wysihtml5),
function(a) {
    var b = a.dom,
    c = {
        position: "relative"
    },
    d = {
        left: 0,
        margin: 0,
        opacity: 0,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 0,
        zIndex: 1
    },
    e = {
        cursor: "inherit",
        fontSize: "50px",
        height: "50px",
        marginTop: "-25px",
        outline: 0,
        padding: 0,
        position: "absolute",
        right: "-4px",
        top: "50%"
    },
    f = {
        "x-webkit-speech": "",
        speech: ""
    };
    a.toolbar.Speech = function(g, h) {
        var i = document.createElement("input");
        if (!a.browser.supportsSpeechApiOn(i)) {
            h.style.display = "none";
            return
        }
        var j = document.createElement("div");
        a.lang.object(d).merge({
            width: h.offsetWidth + "px",
            height: h.offsetHeight + "px"
        }),
        b.insert(i).into(j),
        b.insert(j).into(h),
        b.setStyles(e).on(i),
        b.setAttributes(f).on(i),
        b.setStyles(d).on(j),
        b.setStyles(c).on(h);
        var k = "onwebkitspeechchange" in i ? "webkitspeechchange": "speechchange";
        b.observe(i, k, 
        function() {
            g.execCommand("insertText", i.value),
            i.value = ""
        }),
        b.observe(i, "click", 
        function(a) {
            b.hasClass(h, "wysihtml5-command-disabled") && a.preventDefault(),
            a.stopPropagation()
        })
    }
} (wysihtml5),
function(a) {
    var b = "wysihtml5-command-disabled",
    c = "wysihtml5-commands-disabled",
    d = "wysihtml5-command-active",
    e = "wysihtml5-action-active",
    f = a.dom;
    a.toolbar.Toolbar = Base.extend({
        constructor: function(b, c) {
            this.editor = b,
            this.container = typeof c == "string" ? document.getElementById(c) : c,
            this.composer = b.composer,
            this._getLinks("command"),
            this._getLinks("action"),
            this._observe(),
            this.show();
            var d = this.container.querySelectorAll("[data-wysihtml5-command=insertSpeech]"),
            e = d.length,
            f = 0;
            for (; f < e; f++) new a.toolbar.Speech(this, d[f])
        },
        _getLinks: function(b) {
            var c = this[b + "Links"] = a.lang.array(this.container.querySelectorAll("[data-wysihtml5-" + b + "]")).get(),
            d = c.length,
            e = 0,
            f = this[b + "Mapping"] = {},
            g,
            h,
            i,
            j,
            k;
            for (; e < d; e++) g = c[e],
            i = g.getAttribute("data-wysihtml5-" + b),
            j = g.getAttribute("data-wysihtml5-" + b + "-value"),
            h = this.container.querySelector("[data-wysihtml5-" + b + "-group='" + i + "']"),
            k = this._getDialog(g, i),
            f[i + ":" + j] = {
                link: g,
                group: h,
                name: i,
                value: j,
                dialog: k,
                state: !1
            }
        },
        _getDialog: function(b, c) {
            var d = this,
            e = this.container.querySelector("[data-wysihtml5-dialog='" + c + "']"),
            f,
            g;
            return e && (f = new a.toolbar.Dialog(b, e), f.observe("show", 
            function() {
                g = d.composer.selection.getBookmark(),
                d.editor.fire("show:dialog", {
                    command: c,
                    dialogContainer: e,
                    commandLink: b
                })
            }), f.observe("save", 
            function(a) {
                g && d.composer.selection.setBookmark(g),
                d._execCommand(c, a),
                d.editor.fire("save:dialog", {
                    command: c,
                    dialogContainer: e,
                    commandLink: b
                })
            }), f.observe("cancel", 
            function() {
                d.editor.focus(!1),
                d.editor.fire("cancel:dialog", {
                    command: c,
                    dialogContainer: e,
                    commandLink: b
                })
            })),
            f
        },
        execCommand: function(a, b) {
            if (this.commandsDisabled) return;
            var c = this.commandMapping[a + ":" + b];
            c && c.dialog && !c.state ? c.dialog.show() : 
            this._execCommand(a, b)
        },
        _execCommand: function(a, b) {
            this.editor.focus(!1),
            this.composer.commands.exec(a, b),
            this._updateLinkStates()
        },
        execAction: function(a) {
            var b = this.editor;
            switch (a) {
            case "change_view":
                b.currentView === b.textarea ? b.fire("change_view", "composer") : b.fire("change_view", "textarea")
            }
        },
        _observe: function() {
            var a = this,
            b = this.editor,
            d = this.container,
            e = this.commandLinks.concat(this.actionLinks),
            g = e.length,
            h = 0;
            for (; h < g; h++) f.setAttributes({
                href: "javascript:;",
                unselectable: "on"
            }).on(e[h]);
            f.delegate(d, "[data-wysihtml5-command]", "mousedown", 
            function(a) {
                a.preventDefault()
            }),
            f.delegate(d, "[data-wysihtml5-command]", "click", 
            function(b) {
                var c = this,
                d = c.getAttribute("data-wysihtml5-command"),
                e = c.getAttribute("data-wysihtml5-command-value");
                a.execCommand(d, e),
                b.preventDefault()
            }),
            f.delegate(d, "[data-wysihtml5-action]", "click", 
            function(b) {
                var c = this.getAttribute("data-wysihtml5-action");
                a.execAction(c),
                b.preventDefault()
            }),
            b.observe("focus:composer", 
            function() {
                a.bookmark = null,
                clearInterval(a.interval),
                a.interval = setInterval(function() {
                    a._updateLinkStates()
                },
                500)
            }),
            b.observe("blur:composer", 
            function() {
                clearInterval(a.interval)
            }),
            b.observe("destroy:composer", 
            function() {
                clearInterval(a.interval)
            }),
            b.observe("change_view", 
            function(b) {
                setTimeout(function() {
                    a.commandsDisabled = b !== "composer",
                    a._updateLinkStates(),
                    a.commandsDisabled ? f.addClass(d, c) : f.removeClass(d, c)
                },
                0)
            })
        },
        _updateLinkStates: function() {
            var c = this.composer.element,
            g = this.commandMapping,
            h = this.actionMapping,
            i,
            j,
            k,
            l;
            for (i in g) {
                l = g[i],
                this.commandsDisabled ? (j = !1, f.removeClass(l.link, d), l.group && f.removeClass(l.group, d), l.dialog && l.dialog.hide()) : (j = this.composer.commands.state(l.name, l.value), a.lang.object(j).isArray() && (j = j.length === 1 ? j[0] : !0), f.removeClass(l.link, b), l.group && f.removeClass(l.group, b));
                if (l.state === j) continue;
                l.state = j,
                j ? (f.addClass(l.link, d), l.group && f.addClass(l.group, d), l.dialog && (typeof j == "object" ? l.dialog.show(j) : l.dialog.hide())) : (f.removeClass(l.link, d), l.group && f.removeClass(l.group, d), l.dialog && l.dialog.hide())
            }
            for (i in h) k = h[i],
            k.name === "change_view" && (k.state = this.editor.currentView === this.editor.textarea, k.state ? f.addClass(k.link, e) : f.removeClass(k.link, e))
        },
        show: function() {
            this.container.style.display = ""
        },
        hide: function() {
            this.container.style.display = "none"
        }
    })
} (wysihtml5),
function(a) {
    var b,
    c = {
        name: b,
        style: !0,
        toolbar: b,
        autoLink: !0,
        parserRules: {
            tags: {
                br: {},
                span: {},
                div: {},
                p: {}
            },
            classes: {}
        },
        parser: a.dom.parse,
        composerClassName: "wysihtml5-editor",
        bodyClassName: "wysihtml5-supported",
        stylesheets: [],
        placeholderText: b,
        allowObjectResizing: !0,
        supportTouchDevices: !0
    };
    a.Editor = a.lang.Dispatcher.extend({
        constructor: function(b, d) {
            this.textareaElement = typeof b == "string" ? document.getElementById(b) : b,
            this.config = a.lang.object({}).merge(c).merge(d).get(),
            this.textarea = new a.views.Textarea(this, this.textareaElement, this.config),
            this.currentView = this.textarea,
            this._isCompatible = a.browser.supported();
            if (!this._isCompatible || !this.config.supportTouchDevices && a.browser.isTouchDevice()) {
                var e = this;
                setTimeout(function() {
                    e.fire("beforeload").fire("load")
                },
                0);
                return
            }
            a.dom.addClass(document.body, this.config.bodyClassName),
            this.composer = new a.views.Composer(this, this.textareaElement, this.config),
            this.currentView = this.composer,
            typeof this.config.parser == "function" && this._initParser(),
            this.observe("beforeload", 
            function() {
                this.synchronizer = new a.views.Synchronizer(this, this.textarea, this.composer),
                this.config.toolbar && (this.toolbar = new a.toolbar.Toolbar(this, this.config.toolbar))
            });
            try {
                console.log("Heya! This page is using wysihtml5 for rich text editing. Check out https://github.com/xing/wysihtml5")
            } catch(f) {}
        },
        isCompatible: function() {
            return this._isCompatible
        },
        clear: function() {
            return this.currentView.clear(),
            this
        },
        getValue: function(a) {
            return this.currentView.getValue(a)
        },
        setValue: function(a, b) {
            return a ? (this.currentView.setValue(a, b), this) : this.clear()
        },
        focus: function(a) {
            return this.currentView.focus(a),
            this
        },
        disable: function() {
            return this.currentView.disable(),
            this
        },
        enable: function() {
            return this.currentView.enable(),
            this
        },
        isEmpty: function() {
            return this.currentView.isEmpty()
        },
        hasPlaceholderSet: function() {
            return this.currentView.hasPlaceholderSet()
        },
        parse: function(b) {
            var c = this.config.parser(b, this.config.parserRules, this.composer.sandbox.getDocument(), !0);
            return typeof b == "object" && a.quirks.redraw(b),
            c
        },
        _initParser: function() {
            this.observe("paste:composer", 
            function() {
                var b = !0,
                c = this;
                c.composer.selection.executeAndRestore(function() {
                    a.quirks.cleanPastedHTML(c.composer.element),
                    c.parse(c.composer.element)
                },
                b)
            }),
            this.observe("paste:textarea", 
            function() {
                var a = this.textarea.getValue(),
                b;
                b = this.parse(a),
                this.textarea.setValue(b)
            })
        }
    })
} (wysihtml5),
function(a) {
    "use strict";
    var b = a.HTMLCanvasElement && a.HTMLCanvasElement.prototype,
    c = a.Blob && 
    function() {
        try {
            return Boolean(new Blob)
        } catch(a) {
            return ! 1
        }
    } (),
    d = c && a.Uint8Array && 
    function() {
        try {
            return (new Blob([new Uint8Array(100)])).size === 100
        } catch(a) {
            return ! 1
        }
    } (),
    e = a.BlobBuilder || a.WebKitBlobBuilder || a.MozBlobBuilder || a.MSBlobBuilder,
    f = (c || e) && a.atob && a.ArrayBuffer && a.Uint8Array && 
    function(a) {
        var b,
        f,
        g,
        h,
        i,
        j;
        a.split(",")[0].indexOf("base64") >= 0 ? b = atob(a.split(",")[1]) : b = decodeURIComponent(a.split(",")[1]),
        f = new ArrayBuffer(b.length),
        g = new Uint8Array(f);
        for (h = 0; h < b.length; h += 1) g[h] = b.charCodeAt(h);
        return i = a.split(",")[0].split(":")[1].split(";")[0],
        c ? new Blob([d ? g: f], {
            type: i
        }) : (j = new e, j.append(f), j.getBlob(i))
    };
    a.HTMLCanvasElement && !b.toBlob && (b.mozGetAsFile ? b.toBlob = function(a, b) {
        a(this.mozGetAsFile("blob", b))
    }: b.toDataURL && f && (b.toBlob = function(a, b) {
        a(f(this.toDataURL(b)))
    })),
    typeof define == "function" && define.amd ? define(function() {
        return f
    }) : a.dataURLtoBlob = f
} (this),
function(a) {
    function E(a, b) {
        return function(c) {
            return L(a.call(this, c), b)
        }
    }
    function F(a) {
        return function(b) {
            return this.lang().ordinal(a.call(this, b))
        }
    }
    function G() {}
    function H(a) {
        J(this, a)
    }
    function I(a) {
        var b = this._data = {},
        c = a.years || a.year || a.y || 0,
        d = a.months || a.month || a.M || 0,
        e = a.weeks || a.week || a.w || 0,
        f = a.days || a.day || a.d || 0,
        g = a.hours || a.hour || a.h || 0,
        h = a.minutes || a.minute || a.m || 0,
        i = a.seconds || a.second || a.s || 0,
        j = a.milliseconds || a.millisecond || a.ms || 0;
        this._milliseconds = j + i * 1e3 + h * 6e4 + g * 36e5,
        this._days = f + e * 7,
        this._months = d + c * 12,
        b.milliseconds = j % 1e3,
        i += K(j / 1e3),
        b.seconds = i % 60,
        h += K(i / 60),
        b.minutes = h % 60,
        g += K(h / 60),
        b.hours = g % 24,
        f += K(g / 24),
        f += e * 7,
        b.days = f % 30,
        d += K(f / 30),
        b.months = d % 12,
        c += K(d / 12),
        b.years = c
    }
    function J(a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }
    function K(a) {
        return a < 0 ? Math.ceil(a) : Math.floor(a)
    }
    function L(a, b) {
        var c = a + "";
        while (c.length < b) c = "0" + c;
        return c
    }
    function M(a, b, c) {
        var d = b._milliseconds,
        e = b._days,
        f = b._months,
        g;
        d && a._d.setTime( + a + d * c),
        e && a.date(a.date() + e * c),
        f && (g = a.date(), a.date(1).month(a.month() + f * c).date(Math.min(g, a.daysInMonth())))
    }
    function N(a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    }
    function O(a, b) {
        var c = Math.min(a.length, b.length),
        d = Math.abs(a.length - b.length),
        e = 0,
        f;
        for (f = 0; f < c; f++)~~a[f] !== ~~b[f] && e++;
        return e + d
    }
    function P(a, b) {
        return b.abbr = a,
        f[a] || (f[a] = new G),
        f[a].set(b),
        f[a]
    }
    function Q(a) {
        return a ? (!f[a] && g && require("./lang/" + a), f[a]) : b.fn._lang
    }
    function R(a) {
        return a.match(/\[.*\]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
    }
    function S(a) {
        var b = a.match(i),
        c,
        d;
        for (c = 0, d = b.length; c < d; c++) D[b[c]] ? b[c] = D[b[c]] : b[c] = R(b[c]);
        return function(e) {
            var f = "";
            for (c = 0; c < d; c++) f += typeof b[c].call == "function" ? b[c].call(e, a) : b[c];
            return f
        }
    }
    function T(a, b) {
        function d(b) {
            return a.lang().longDateFormat(b) || b
        }
        var c = 5;
        while (c--&&j.test(b)) b = b.replace(j, d);
        return A[b] || (A[b] = S(b)),
        A[b](a)
    }
    function U(a) {
        switch (a) {
        case "DDDD":
            return n;
        case "YYYY":
            return o;
        case "YYYYY":
            return p;
        case "S":
        case "SS":
        case "SSS":
        case "DDD":
            return m;
        case "MMM":
        case "MMMM":
        case "dd":
        case "ddd":
        case "dddd":
        case "a":
        case "A":
            return q;
        case "X":
            return t;
        case "Z":
        case "ZZ":
            return r;
        case "T":
            return s;
        case "MM":
        case "DD":
        case "YY":
        case "HH":
        case "hh":
        case "mm":
        case "ss":
        case "M":
        case "D":
        case "d":
        case "H":
        case "h":
        case "m":
        case "s":
            return l;
        default:
            return new RegExp(a.replace("\\", ""))
        }
    }
    function V(a, b, c) {
        var d,
        e,
        f = c._a;
        switch (a) {
        case "M":
        case "MM":
            f[1] = b == null ? 0: ~~b - 1;
            break;
        case "MMM":
        case "MMMM":
            d = Q(c._l).monthsParse(b),
            d != null ? f[1] = d: c._isValid = !1;
            break;
        case "D":
        case "DD":
        case "DDD":
        case "DDDD":
            b != null && (f[2] = ~~b);
            break;
        case "YY":
            f[0] = ~~b + (~~b > 68 ? 1900: 2e3);
            break;
        case "YYYY":
        case "YYYYY":
            f[0] = ~~b;
            break;
        case "a":
        case "A":
            c._isPm = (b + "").toLowerCase() === "pm";
            break;
        case "H":
        case "HH":
        case "h":
        case "hh":
            f[3] = ~~b;
            break;
        case "m":
        case "mm":
            f[4] = ~~b;
            break;
        case "s":
        case "ss":
            f[5] = ~~b;
            break;
        case "S":
        case "SS":
        case "SSS":
            f[6] = ~~ (("0." + b) * 1e3);
            break;
        case "X":
            c._d = new Date(parseFloat(b) * 1e3);
            break;
        case "Z":
        case "ZZ":
            c._useUTC = !0,
            d = (b + "").match(x),
            d && d[1] && (c._tzh = ~~d[1]),
            d && d[2] && (c._tzm = ~~d[2]),
            d && d[0] === "+" && (c._tzh = -c._tzh, c._tzm = -c._tzm)
        }
        b == null && (c._isValid = !1)
    }
    function W(a) {
        var b,
        c,
        d = [];
        if (a._d) return;
        for (b = 0; b < 7; b++) a._a[b] = d[b] = a._a[b] == null ? b === 2 ? 1: 0: a._a[b];
        d[3] += a._tzh || 0,
        d[4] += a._tzm || 0,
        c = new Date(0),
        a._useUTC ? (c.setUTCFullYear(d[0], d[1], d[2]), c.setUTCHours(d[3], d[4], d[5], d[6])) : (c.setFullYear(d[0], d[1], d[2]), c.setHours(d[3], d[4], d[5], d[6])),
        a._d = c
    }
    function X(a) {
        var b = a._f.match(i),
        c = a._i,
        d,
        e;
        a._a = [];
        for (d = 0; d < b.length; d++) e = (U(b[d]).exec(c) || [])[0],
        e && (c = c.slice(c.indexOf(e) + e.length)),
        D[b[d]] && V(b[d], e, a);
        a._isPm && a._a[3] < 12 && (a._a[3] += 12),
        a._isPm === !1 && a._a[3] === 12 && (a._a[3] = 0),
        W(a)
    }
    function Y(a) {
        var b,
        c,
        d,
        e = 99,
        f,
        g,
        h;
        while (a._f.length) {
            b = J({},
            a),
            b._f = a._f.pop(),
            X(b),
            c = new H(b);
            if (c.isValid()) {
                d = c;
                break
            }
            h = O(b._a, c.toArray()),
            h < e && (e = h, d = c)
        }
        J(a, d)
    }
    function Z(a) {
        var b,
        c = a._i;
        if (u.exec(c)) {
            a._f = "YYYY-MM-DDT";
            for (b = 0; b < 4; b++) if (w[b][1].exec(c)) {
                a._f += w[b][0];
                break
            }
            r.exec(c) && (a._f += " Z"),
            X(a)
        } else a._d = new Date(c)
    }
    function $(b) {
        var c = b._i,
        d = h.exec(c);
        c === a ? b._d = new Date: d ? b._d = new Date( + d[1]) : typeof c == "string" ? Z(b) : N(c) ? (b._a = c.slice(0), W(b)) : b._d = c instanceof Date ? new Date( + c) : new Date(c)
    }
    function _(a, b, c, d, e) {
        return e.relativeTime(b || 1, !!c, a, d)
    }
    function ba(a, b, c) {
        var e = d(Math.abs(a) / 1e3),
        f = d(e / 60),
        g = d(f / 60),
        h = d(g / 24),
        i = d(h / 365),
        j = e < 45 && ["s", e] || f === 1 && ["m"] || f < 45 && ["mm", f] || g === 1 && ["h"] || g < 22 && ["hh", g] || h === 1 && ["d"] || h <= 25 && ["dd", h] || h <= 45 && ["M"] || h < 345 && ["MM", d(h / 30)] || i === 1 && ["y"] || ["yy", i];
        return j[2] = b,
        j[3] = a > 0,
        j[4] = c,
        _.apply({},
        j)
    }
    function bb(a, c, d) {
        var e = d - c,
        f = d - a.day();
        return f > e && (f -= 7),
        f < e - 7 && (f += 7),
        Math.ceil(b(a).add("d", f).dayOfYear() / 7)
    }
    function bc(a) {
        var c = a._i,
        d = a._f;
        return c === null || c === "" ? null: (typeof c == "string" && (a._i = c = Q().preparse(c)), b.isMoment(c) ? (a = J({},
        c), a._d = new Date( + c._d)) : d ? N(d) ? Y(a) : X(a) : $(a), new H(a))
    }
    function bd(a, c) {
        b.fn[a] = b.fn[a + "s"] = function(a) {
            var b = this._isUTC ? "UTC": "";
            return a != null ? (this._d["set" + b + c](a), this) : this._d["get" + b + c]()
        }
    }
    function be(a) {
        b.duration.fn[a] = function() {
            return this._data[a]
        }
    }
    function bf(a, c) {
        b.duration.fn["as" + a] = function() {
            return + this / c
        }
    }
    var b,
    c = "2.0.0",
    d = Math.round,
    e,
    f = {},
    g = typeof module != "undefined" && module.exports,
    h = /^\/?Date\((\-?\d+)/i,
    i = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
    j = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,
    k = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,
    l = /\d\d?/,
    m = /\d{1,3}/,
    n = /\d{3}/,
    o = /\d{1,4}/,
    p = /[+\-]?\d{1,6}/,
    q = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i,
    r = /Z|[\+\-]\d\d:?\d\d/i,
    s = /T/i,
    t = /[\+\-]?\d+(\.\d{1,3})?/,
    u = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,
    v = "YYYY-MM-DDTHH:mm:ssZ",
    w = [["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]],
    x = /([\+\-]|\d\d)/gi,
    y = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),
    z = {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    },
    A = {},
    B = "DDD w W M D d".split(" "),
    C = "M D H h m s w W".split(" "),
    D = {
        M: function() {
            return this.month() + 1
        },
        MMM: function(a) {
            return this.lang().monthsShort(this, a)
        },
        MMMM: function(a) {
            return this.lang().months(this, a)
        },
        D: function() {
            return this.date()
        },
        DDD: function() {
            return this.dayOfYear()
        },
        d: function() {
            return this.day()
        },
        dd: function(a) {
            return this.lang().weekdaysMin(this, a)
        },
        ddd: function(a) {
            return this.lang().weekdaysShort(this, a)
        },
        dddd: function(a) {
            return this.lang().weekdays(this, a)
        },
        w: function() {
            return this.week()
        },
        W: function() {
            return this.isoWeek()
        },
        YY: function() {
            return L(this.year() % 100, 2)
        },
        YYYY: function() {
            return L(this.year(), 4)
        },
        YYYYY: function() {
            return L(this.year(), 5)
        },
        a: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !0)
        },
        A: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !1)
        },
        H: function() {
            return this.hours()
        },
        h: function() {
            return this.hours() % 12 || 12
        },
        m: function() {
            return this.minutes()
        },
        s: function() {
            return this.seconds()
        },
        S: function() {
            return~~ (this.milliseconds() / 100)
        },
        SS: function() {
            return L(~~ (this.milliseconds() / 10), 2)
        },
        SSS: function() {
            return L(this.milliseconds(), 3)
        },
        Z: function() {
            var a = -this.zone(),
            b = "+";
            return a < 0 && (a = -a, b = "-"),
            b + L(~~ (a / 60), 2) + ":" + L(~~a % 60, 2)
        },
        ZZ: function() {
            var a = -this.zone(),
            b = "+";
            return a < 0 && (a = -a, b = "-"),
            b + L(~~ (10 * a / 6), 4)
        },
        X: function() {
            return this.unix()
        }
    };
    while (B.length) e = B.pop(),
    D[e + "o"] = F(D[e]);
    while (C.length) e = C.pop(),
    D[e + e] = E(D[e], 2);
    D.DDDD = E(D.DDD, 3),
    G.prototype = {
        set: function(a) {
            var b,
            c;
            for (c in a) b = a[c],
            typeof b == "function" ? this[c] = b: this["_" + c] = b
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(a) {
            return this._months[a.month()]
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(a) {
            return this._monthsShort[a.month()]
        },
        monthsParse: function(a) {
            var c,
            d,
            e,
            f;
            this._monthsParse || (this._monthsParse = []);
            for (c = 0; c < 12; c++) {
                this._monthsParse[c] || (d = b([2e3, c]), e = "^" + this.months(d, "") + "|^" + this.monthsShort(d, ""), this._monthsParse[c] = new RegExp(e.replace(".", ""), "i"));
                if (this._monthsParse[c].test(a)) return c
            }
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(a) {
            return this._weekdays[a.day()]
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(a) {
            return this._weekdaysShort[a.day()]
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(a) {
            return this._weekdaysMin[a.day()]
        },
        _longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D YYYY",
            LLL: "MMMM D YYYY LT",
            LLLL: "dddd, MMMM D YYYY LT"
        },
        longDateFormat: function(a) {
            var b = this._longDateFormat[a];
            return ! b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, 
            function(a) {
                return a.slice(1)
            }), this._longDateFormat[a] = b),
            b
        },
        meridiem: function(a, b, c) {
            return a > 11 ? c ? "pm": "PM": c ? "am": "AM"
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(a, b) {
            var c = this._calendar[a];
            return typeof c == "function" ? c.apply(b) : c
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(a, b, c, d) {
            var e = this._relativeTime[c];
            return typeof e == "function" ? e(a, b, c, d) : e.replace(/%d/i, a)
        },
        pastFuture: function(a, b) {
            var c = this._relativeTime[a > 0 ? "future": "past"];
            return typeof c == "function" ? c(b) : c.replace(/%s/i, b)
        },
        ordinal: function(a) {
            return this._ordinal.replace("%d", a)
        },
        _ordinal: "%d",
        preparse: function(a) {
            return a
        },
        postformat: function(a) {
            return a
        },
        week: function(a) {
            return bb(a, this._week.dow, this._week.doy)
        },
        _week: {
            dow: 0,
            doy: 6
        }
    },
    b = function(a, b, c) {
        return bc({
            _i: a,
            _f: b,
            _l: c,
            _isUTC: !1
        })
    },
    b.utc = function(a, b, c) {
        return bc({
            _useUTC: !0,
            _isUTC: !0,
            _l: c,
            _i: a,
            _f: b
        })
    },
    b.unix = function(a) {
        return b(a * 1e3)
    },
    b.duration = function(a, c) {
        var d = b.isDuration(a),
        e = typeof a == "number",
        f = d ? a._data: e ? {}: a,
        g;
        return e && (c ? f[c] = a: f.milliseconds = a),
        g = new I(f),
        d && a.hasOwnProperty("_lang") && (g._lang = a._lang),
        g
    },
    b.version = c,
    b.defaultFormat = v,
    b.lang = function(a, c) {
        var d;
        if (!a) return b.fn._lang._abbr;
        c ? P(a, c) : f[a] || Q(a),
        b.duration.fn._lang = b.fn._lang = Q(a)
    },
    b.langData = function(a) {
        return a && a._lang && a._lang._abbr && (a = a._lang._abbr),
        Q(a)
    },
    b.isMoment = function(a) {
        return a instanceof H
    },
    b.isDuration = function(a) {
        return a instanceof I
    },
    b.fn = H.prototype = {
        clone: function() {
            return b(this)
        },
        valueOf: function() {
            return + this._d
        },
        unix: function() {
            return Math.floor( + this._d / 1e3)
        },
        toString: function() {
            return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },
        toDate: function() {
            return this._d
        },
        toJSON: function() {
            return b.utc(this).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        },
        toArray: function() {
            var a = this;
            return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()]
        },
        isValid: function() {
            return this._isValid == null && (this._a ? this._isValid = !O(this._a, (this._isUTC ? b.utc(this._a) : b(this._a)).toArray()) : this._isValid = !isNaN(this._d.getTime())),
            !!this._isValid
        },
        utc: function() {
            return this._isUTC = !0,
            this
        },
        local: function() {
            return this._isUTC = !1,
            this
        },
        format: function(a) {
            var c = T(this, a || b.defaultFormat);
            return this.lang().postformat(c)
        },
        add: function(a, c) {
            var d;
            return typeof a == "string" ? d = b.duration( + c, a) : d = b.duration(a, c),
            M(this, d, 1),
            this
        },
        subtract: function(a, c) {
            var d;
            return typeof a == "string" ? d = b.duration( + c, a) : d = b.duration(a, c),
            M(this, d, -1),
            this
        },
        diff: function(a, c, d) {
            var e = this._isUTC ? b(a).utc() : b(a).local(),
            f = (this.zone() - e.zone()) * 6e4,
            g,
            h;
            return c && (c = c.replace(/s$/, "")),
            c === "year" || c === "month" ? (g = (this.daysInMonth() + e.daysInMonth()) * 432e5, h = (this.year() - e.year()) * 12 + (this.month() - e.month()), h += (this - b(this).startOf("month") - (e - b(e).startOf("month"))) / g, c === "year" && (h /= 12)) : (g = this - e - f, h = c === "second" ? g / 1e3: c === "minute" ? g / 6e4: c === "hour" ? g / 36e5: c === "day" ? g / 864e5: c === "week" ? g / 6048e5: g),
            d ? h: K(h)
        },
        from: function(a, c) {
            return b.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!c)
        },
        fromNow: function(a) {
            return this.from(b(), a)
        },
        calendar: function() {
            var a = this.diff(b().startOf("day"), "days", !0),
            c = a < -6 ? "sameElse": a < -1 ? "lastWeek": a < 0 ? "lastDay": a < 1 ? "sameDay": a < 2 ? "nextDay": a < 7 ? "nextWeek": "sameElse";
            return this.format(this.lang().calendar(c, this))
        },
        isLeapYear: function() {
            var a = this.year();
            return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
        },
        isDST: function() {
            return this.zone() < b([this.year()]).zone() || this.zone() < b([this.year(), 5]).zone()
        },
        day: function(a) {
            var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return a == null ? b: this.add({
                d: a - b
            })
        },
        startOf: function(a) {
            a = a.replace(/s$/, "");
            switch (a) {
            case "year":
                this.month(0);
            case "month":
                this.date(1);
            case "week":
            case "day":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
            }
            return a === "week" && this.day(0),
            this
        },
        endOf: function(a) {
            return this.startOf(a).add(a.replace(/s?$/, "s"), 1).subtract("ms", 1)
        },
        isAfter: function(a, c) {
            return c = typeof c != "undefined" ? c: "millisecond",
            +this.clone().startOf(c) > +b(a).startOf(c)
        },
        isBefore: function(a, c) {
            return c = typeof c != "undefined" ? c: "millisecond",
            +this.clone().startOf(c) < +b(a).startOf(c)
        },
        isSame: function(a, c) {
            return c = typeof c != "undefined" ? c: "millisecond",
            +this.clone().startOf(c) === +b(a).startOf(c)
        },
        zone: function() {
            return this._isUTC ? 0: this._d.getTimezoneOffset()
        },
        daysInMonth: function() {
            return b.utc([this.year(), this.month() + 1, 0]).date()
        },
        dayOfYear: function(a) {
            var c = d((b(this).startOf("day") - b(this).startOf("year")) / 864e5) + 1;
            return a == null ? c: this.add("d", a - c)
        },
        isoWeek: function(a) {
            var b = bb(this, 1, 4);
            return a == null ? b: this.add("d", (a - b) * 7)
        },
        week: function(a) {
            var b = this.lang().week(this);
            return a == null ? b: this.add("d", (a - b) * 7)
        },
        lang: function(b) {
            return b === a ? this._lang: (this._lang = Q(b), this)
        }
    };
    for (e = 0; e < y.length; e++) bd(y[e].toLowerCase().replace(/s$/, ""), y[e]);
    bd("year", "FullYear"),
    b.fn.days = b.fn.day,
    b.fn.weeks = b.fn.week,
    b.fn.isoWeeks = b.fn.isoWeek,
    b.duration.fn = I.prototype = {
        weeks: function() {
            return K(this.days() / 7)
        },
        valueOf: function() {
            return this._milliseconds + this._days * 864e5 + this._months * 2592e6
        },
        humanize: function(a) {
            var b = +this,
            c = ba(b, !a, this.lang());
            return a && (c = this.lang().pastFuture(b, c)),
            this.lang().postformat(c)
        },
        lang: b.fn.lang
    };
    for (e in z) z.hasOwnProperty(e) && (bf(e, z[e]), be(e.toLowerCase()));
    bf("Weeks", 6048e5),
    b.lang("en", {
        ordinal: function(a) {
            var b = a % 10,
            c = ~~ (a % 100 / 10) === 1 ? "th": b === 1 ? "st": b === 2 ? "nd": b === 3 ? "rd": "th";
            return a + c
        }
    }),
    g && (module.exports = b),
    typeof ender == "undefined" && (this.moment = b),
    typeof define == "function" && define.amd && define("moment", [], 
    function() {
        return b
    })
}.call(this),
function(a) {
    a(function() {
        moment.lang("zh-cn", {
            months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
            weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat: {
                LT: "Ah点mm",
                L: "YYYY年MMMD日",
                LL: "YYYY年MMMD日",
                LLL: "YYYY年MMMD日LT",
                LLLL: "YYYY年MMMD日ddddLT",
                l: "YYYY年MMMD日",
                ll: "YYYY年MMMD日",
                lll: "YYYY年MMMD日LT",
                llll: "YYYY年MMMD日ddddLT"
            },
            meridiem: function(a, b, c) {
                return a < 9 ? "早上": a < 11 && b < 30 ? "上午": a < 13 && b < 30 ? "中午": a < 18 ? "下午": "晚上"
            },
            calendar: {
                sameDay: "[今天]LT",
                nextDay: "[明天]LT",
                nextWeek: "[下]ddddLT",
                lastDay: "[昨天]LT",
                lastWeek: "[上]ddddLT",
                sameElse: "L"
            },
            relativeTime: {
                future: "%s内",
                past: "%s前",
                s: "几秒",
                m: "1分钟",
                mm: "%d分钟",
                h: "1小时",
                hh: "%d小时",
                d: "1天",
                dd: "%d天",
                M: "1个月",
                MM: "%d个月",
                y: "1年",
                yy: "%d年"
            },
            week: {
                dow: 1
            }
        }),
        a.ajaxSetup({
            type: "POST",
            dataType: "json",
            data: {
                conn_guid: a("#conn-guid").val()
            },
            beforeSend: function(b, c) {
                if (c.type != "GET") {
                    var d = a("meta[name='csrf-token']").attr("content");
                    b.setRequestHeader("X-CSRF-Token", d)
                }
            },
            error: function(b, c, d) {
                if (c === "abort") return;
                var e = a.parseJSON(b.responseText),
                f = "";
                if (!e || !e.errors && !e.msg) return;
                e.errors ? a.each(e.errors, 
                function(a, b) {
                    f += b.msg + "<br/>"
                }) : f += e.msg,
                f && mcw.message({
                    msg: f
                });
                var g = mcw.urlParts(location.href).href;
                mcw.clearPageCache(g)
            }
        }),
        a.rails && a("body").on("keydown", "form.form[data-remote=true] textarea", 
        function(b) {
            var c = mcw.metaKey(b);
            c && b.which == 13 && (b.preventDefault(), a(this).closest("form.form").submit())
        }).on("submit", "form.form", 
        function(b) {
            var c = a(b.currentTarget),
            d = !0;
            return c.find("input[data-validate]:visible, textarea[data-validate]:visible").each(function(b, c) {
                mcw.validateField(a(c)) || (d = !1)
            }),
            d
        }).on("blur.validate", "input[data-validate]", 
        function(b) {
            var c = a(this);
            c.attr("data-blur-validate") == "true" && mcw.validateField(c, !0)
        }).on("ajax:error", "form.form[data-remote=true]", 
        function(b, c) {
            var d = a(b.currentTarget),
            e = a.parseJSON(c.responseText).errors;
            a.each(e, 
            function(b, c) {
                var e = d.find("input[name=" + c.target + "], textarea[name=" + c.target + "]"),
                f = e.nextAll(".error");
                f.length || (f = a("<p class='error'></p>").insertAfter(e), f.parent(".editor").addClass("error")),
                f.text(c.msg),
                e.addClass("error").nextAll(".desc").hide()
            })
        }).on("ajax:complete", "form.form[data-remote=true]", 
        function(b, c, d) {
            if (d == "success") {
                var e = a(this).find(a.rails.enableSelector),
                f = e.attr("data-success-text"),
                g = a.parseJSON(c.responseText),
                h = g && g.target_url || e.attr("data-goto"),
                i = e.data("refresh");
                f && e.text(f + " ✓").prop("disabled", !0).addClass("success");
                if (h) {
                    var j = mcw.urlParts(h),
                    k = mcw.urlParts(location.href);
                    j.path != k.path && (a(".workspace").length ? mcw.stack({
                        url: h,
                        replace: !0,
                        root: e.is("[data-goto-root]"),
                        restorePosition: !0
                    }) : location.href = h)
                }
                i && mcw.stack({
                    url: location.href,
                    nocache: !0
                }),
                f && !h && !i && setTimeout(function() {
                    e.text(e.data("ujs:enable-with")).prop("disabled", !1).removeClass("success")
                },
                3e3);
                if (f || h || i) return ! 1
            }
        }).on("ajax:complete", a.rails.linkClickSelector, 
        function(b, c, d) {
            var e = a(this);
            e.is("[data-global-loading]") ? mcw.globalLoading("hide") : e.is("[data-loading]") && mcw.tinyLoading(e, !1),
            e.is(".btn[data-disable-with]") && e.text(e.data("ujs:enable-with")).prop("disabled", !1);
            if (d == "success") {
                var f = a.parseJSON(c.responseText),
                g = f && f.target_url || e.attr("data-goto"),
                h = e.data("refresh");
                if (g) {
                    var i = mcw.urlParts(g),
                    j = mcw.urlParts(location.href);
                    if (i.path != j.path) if (a(".workspace").length) {
                        var k = !0;
                        e.is("[data-stack-replace]") && e.data("stack-replace") == 0 && (k = !1),
                        mcw.stack({
                            url: g,
                            replace: k,
                            root: e.is("[data-goto-root]"),
                            restorePosition: !0,
                            bare: e.is("[data-goto-bare]")
                        })
                    } else location.href = g
                }
                h && mcw.stack({
                    url: location.href,
                    nocache: !0
                })
            }
        }).on("ajax:error", a.rails.linkClickSelector, 
        function(b, c, d, e) {
            if (d === "abort") return;
            var f = a.parseJSON(c.responseText),
            g = "";
            f.errors ? a.each(f.errors, 
            function(a, b) {
                g += b.msg + "<br/>"
            }) : g += f.msg,
            mcw.message({
                msg: g
            })
        }).on("ajax:beforeSend", a.rails.linkClickSelector, 
        function(b, c, d) {
            var e = a(this);
            e.is("[data-global-loading]") ? mcw.globalLoading(e.data("global-loading")) : e.is("[data-loading]") && mcw.tinyLoading(e)
        }),
        mcw.lastUpdated = moment()
    }),
    window.mcw = {
        now: function() {
            var b = a("#server-time").val();
            if (b) b = moment(b, "YYYY-MM-DD HH:mm:ss Z");
            else return moment();
            return b.add("ms", moment().diff(mcw.lastUpdated))
        },
        loadImage: function(a, b) {
            var c = new Image;
            b && (c.onload = function() {
                b(c)
            },
            c.onerror = function() {
                b()
            });
            if (typeof a == "string") c.src = a;
            else if (a.nodeName && a.nodeName == "IMG") c.src = a.src;
            else if (window.FileReader && FileReader.prototype.readAsDataURL) {
                var d = new FileReader;
                d.onload = function(a) {
                    c.src = a.target.result
                },
                d.readAsDataURL(a)
            } else b()
        },
        preloadImages: function(b) {
            a.each(b, 
            function(a, b) {
                mcw.loadImage(b)
            })
        },
        truncate: function(a, b) {
            return a.length > b ? a.substring(0, b - 1) + "...": a
        },
        encodeHtml: function(a) {
            return (a + "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        decodeHtml: function(a) {
            return (a + "").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
        },
        template: function(b, c) {
            var d = a.trim(a("#" + b).html());
            return c && a.each(c, 
            function(a, b) {
                var c = new RegExp("\\{\\{ " + a + " \\}\\}", "g");
                d = d.replace(c, mcw.encodeHtml(b))
            }),
            a(d)
        },
        params: function(a) {
            a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var b = "[\\?&]" + a + "=([^&#]*)",
            c = new RegExp(b),
            d = c.exec(window.location.search);
            return d ? decodeURIComponent(d[1].replace(/\+/g, " ")) : ""
        },
        parseParams: function(a) {
            if (!a) return null;
            var b = /([^&=]+)=?([^&]*)/g,
            c = /\+/g,
            d = function(a) {
                return decodeURIComponent(a.replace(c, " "))
            };
            params = {},
            e;
            while (e = b.exec(a)) {
                var f = d(e[1]),
                g = d(e[2]);
                f.substring(f.length - 2) === "[]" ? (f = f.substring(0, f.length - 2), (params[f] || (params[f] = [])).push(g)) : params[f] = g
            }
            return params
        },
        urlParts: function(b) {
            if (!b) return null;
            var c = a("<a/>", {
                href: b
            }),
            d = "/" + c[0].pathname.replace(/\/$/g, "").replace(/^\//g, "") + "/",
            e = c[0].search,
            f = c[0].hash;
            return {
                href: d + e + f,
                path: d,
                search: e,
                hash: f
            }
        },
        supportTransition: function() {
            var a = document.body || document.documentElement,
            b = a.style,
            c = "transition";
            if (typeof b[c] == "string") return ! 0;
            v = ["Moz", "Webkit", "Khtml", "O", "ms"],
            c = c.charAt(0).toUpperCase() + c.substr(1);
            for (var d = 0; d < v.length; d++) if (typeof b[v[d] + c] == "string") return ! 0;
            return ! 1
        },
        transitionEnd: function(b, c) {
            if (mcw.supportTransition()) {
                var d = "transitionend";
                a.browser.webkit ? d = "webkitTransitionEnd": a.browser.msie ? d = "transitionend": a.browser.opera && (d = "oTransitionEnd"),
                b.one(d, c)
            } else setTimeout(c, 200)
        },
        dialog: function() {
            if (typeof arguments[0] == "string" && arguments[0] == "hide") return a(document).off(".dialog"),
            a("#mask").remove(),
            a(".dialog").remove();
            if (typeof arguments[0] == "object") {
                var b = a.extend({
                    el: null,
                    width: 600,
                    height: "auto",
                    modal: !1,
                    padding: !0,
                    closeButton: !0
                },
                arguments[0]);
                mcw.dialog("hide");
                var c = a("<div class='dialog'><div class='dialog-wrapper clearfix'></div><a href='javascript:;' class='link-close-dialog'>Close</a></div>").css({
                    width: b.width,
                    height: b.height
                }).appendTo(".page:last");
                b.closeButton || c.find(".link-close-dialog").remove(),
                c.find(".dialog-wrapper").append(b.el),
                c.find(".link-close-dialog").on("click", 
                function(a) {
                    a.preventDefault(),
                    mcw.dialog("hide")
                }),
                a(document).on("keydown.dialog", 
                function(a) {
                    a.which == 27 && mcw.dialog("hide")
                }),
                setTimeout(function() {
                    c.css({
                        marginLeft: -b.width / 2,
                        marginTop: -c.height() / 2
                    })
                },
                20);
                if (b.modal) {
                    var d = a("<div id='mask' class='hidden'></div>").appendTo(".page:last");
                    d.on("click", 
                    function(a) {
                        mcw.dialog("hide")
                    }),
                    setTimeout(function() {
                        d.removeClass("hidden")
                    },
                    20)
                }
                return c
            }
            return null
        },
        message: function(b) {
            var c = a("<div class='message-content'><p></p><div class='dialog-buttons clearfix'><button class='btn'></button></div></div>");
            c.find("p").html(b.msg),
            c.find(".dialog-buttons button").text(b.ok || "我知道了").on("click", 
            function(a) {
                mcw.dialog("hide")
            }),
            mcw.dialog(a.extend({
                el: c,
                width: 450
            },
            b))
        },
        confirm: function(b) {
            var c = a("<div class='message-content'><p></p><div class='dialog-buttons clearfix'><button class='btn btn-primary btn-yes'></button><a href='javascript:void(0)' class='link-no'></a></div></div>");
            c.find("p").html(b.msg),
            c.find(".dialog-buttons .btn-yes").text(b.ok || "确定").on("click", 
            function(a) {
                mcw.dialog("hide"),
                b.callback(!0, a)
            }),
            c.find(".dialog-buttons .link-no").text(b.cancel || "取消").on("click", 
            function(a) {
                a.preventDefault(),
                mcw.dialog("hide"),
                b.callback(!1, a)
            }),
            mcw.dialog(a.extend({
                el: c,
                width: 450
            },
            b))
        },
        globalLoading: function(b) {
            if (b == "hide") a("#mask, .global-loading").remove();
            else {
                var c = a("<div id='mask' class='hidden'></div>").appendTo("body"),
                d = a("<div class='global-loading'>" + b + "</div>").appendTo("body");
                setTimeout(function() {
                    c && c.css({
                        cursor: "default"
                    }).removeClass("hidden"),
                    d && d.css({
                        marginLeft: -d.outerWidth() * .5,
                        marginTop: -d.outerHeight() * .5
                    })
                },
                20)
            }
        },
        tinyLoading: function(b, c) {
            b = a(b);
            if (c !== !1) {
                var d = a("<img />", {
                    src: "/assets/blank-3dbe121a376a181f0fe840fb1daeeb51.gif"
                }).css({
                    display: b.css("display"),
                    width: b.outerWidth(),
                    height: b.outerHeight(),
                    marginLeft: b.css("marginLeft"),
                    marginTop: b.css("marginTop"),
                    marginRight: b.css("marginRight"),
                    marginBottom: b.css("marginBottom"),
                    "float": b.css("float"),
                    position: b.css("position"),
                    verticalAlign: "bottom",
                    background: "url(/assets/tiny-loading-e8bd9af828c29751e76f3d73d4f9e005.gif) no-repeat 50% 50%"
                }).addClass("tiny-loading").insertAfter(b),
                e = b.css("top"),
                f = b.css("left"),
                g = b.css("right"),
                h = b.css("bottom"); ! e || e == "auto" ? d.css("bottom", h) : d.css("top", e),
                !f || f == "auto" ? d.css("right", g) : d.css("left", f),
                b.hide()
            } else b.next(".tiny-loading").remove(),
            b.show()
        },
        selectText: function(b, c, d) {
            b = a(b);
            if (!a.isNumeric(c) || c < 0) c = b.val().length;
            d = d || c;
            if (b[0].createTextRange) {
                var e = b[0].createTextRange();
                e.collapse(!0),
                e.moveStart("character", c),
                e.moveEnd("character", d),
                e.select()
            } else b[0].setSelectionRange && b[0].setSelectionRange(c, c + d);
            b.focus()
        },
        tooltip: function(b, c) {
            if (navigator.platform.indexOf("iPhone") != -1 || navigator.platform.indexOf("iPod") != -1 || navigator.platform.indexOf("iPad") != -1) return;
            if (c == "hide") {
                var d = b.data("tooltipTimer"),
                e = b.data("tooltipEl");
                d && (clearTimeout(d), d = null),
                e && (e.remove(), e = null)
            } else {
                var d = b.data("tooltipTimer"),
                e = b.data("tooltipEl"),
                f = b.offset(),
                g = b.width(),
                h = b.height(),
                i = b.attr("tooltip");
                d && (clearTimeout(d), d = null),
                e && (e.remove(), e = null),
                e = a("<div class='tooltip'><div class='tooltip-arrow'></div><div class='tooltip-content'></div></div>").appendTo("body"),
                e.find(".tooltip-content").text(i),
                e.css({
                    opacity: 0,
                    top: f.top + h,
                    left: f.left - (e.width() - g) * .5
                }),
                d = setTimeout(function() {
                    e.addClass("transition").css({
                        opacity: 1,
                        top: f.top + h + 15
                    })
                },
                200),
                b.data("tooltipTimer", d),
                b.data("tooltipEl", e)
            }
        },
        fitSize: function(b, c, d) {
            d = a.extend({
                stretch: !1,
                minWidth: 0,
                minHeight: 0
            },
            d);
            var e = {
                width: c.width,
                height: c.height
            };
            if (d.stretch || c.width > b.width || c.height > b.height || c.width < d.minWidth || c.height < d.minHeight) c.width / c.height > b.width / b.height ? (e.width = Math.max(b.width, d.minWidth), e.height = e.width * c.height / c.width) : (e.height = Math.max(b.height, d.minHeight), e.width = e.height * c.width / c.height);
            return e.x = (b.width - e.width) / 2,
            e.y = (b.height - e.height) / 2,
            e
        },
        viewImage: function(b) {
            function r(b, c) {
                if (!l) return;
                var d = a(window),
                e = mcw.fitSize({
                    width: d.width() - 80,
                    height: d.height() - (p.length > 1 ? 160: 80)
                },
                c || {
                    width: b.width,
                    height: b.height
                });
                e.x += 40,
                e.y += 30,
                l.css({
                    width: e.width,
                    height: e.height,
                    top: e.y,
                    left: e.x
                }).find("img").attr({
                    src: b.src
                }),
                l.removeClass("loading"),
                n.show()
            }
            function s() {
                n.hide();
                var b = a(document).scrollTop(),
                d = a(document).scrollLeft(),
                e = {
                    width: c.width(),
                    height: c.height(),
                    top: c.offset().top - b,
                    left: c.offset().left - d
                };
                l.css(e),
                mcw.transitionEnd(l, 
                function(a) {
                    j.trigger("galleryhide").remove(),
                    l = null
                }),
                a(document).unbind(".originimg")
            }
            var c = b,
            d = b.data("origin-src"),
            e = b.data("origin-size"),
            f = b.data("origin-name");
            if (!d) return;
            c.is("[src]") || (c = c.find("[src]:first")),
            e ? (e = e.split(","), e = {
                width: e[0] * 1 || c.width() * 10,
                height: e[1] * 1 || c.height() * 10
            }) : e = {
                width: c.width() * 10,
                height: c.height() * 10
            };
            var g = a(document).scrollTop(),
            h = a(document).scrollLeft(),
            i = {
                width: c.width(),
                height: c.height(),
                top: c.offset().top - g,
                left: c.offset().left - h
            },
            j = a("<div />", {
                "class": "gallery-wrapper loading"
            }).click(a.proxy(s, this)).appendTo("body"),
            k = a("<div class='mask'></div>").appendTo(j),
            l = a("<div />", {
                id: "gallery-img"
            }).css({
                width: i.width,
                height: i.height,
                top: i.top,
                left: i.left
            }).appendTo(j),
            m = a("<img />", {
                src: c.attr("src")
            }).appendTo(l),
            n = a("<div />", {
                "class": "gallery-img-name hide",
                html: "<span>" + f + '</span> [ <a href="' + d + '" target="_blank">查看原图</a> ] '
            }).appendTo(l),
            o = a("<div />", {
                "class": "loading-indicator"
            }).appendTo(l),
            p = b.parent().children("*[data-origin-src]"),
            q = null;
            return p.length > 1 && (q = a("<ul/>", {
                "class": "gallery"
            }).appendTo(j), p.each(function(b, d) {
                var e = a(d),
                f;
                e.
                is("[src]") ? f = e: f = e.find("[src]:first");
                var g = a("<li/>"),
                h = a("<a/>", {
                    href: "javascript:;"
                }).appendTo(g),
                i = a("<img/>", {
                    src: f.attr("src")
                }).appendTo(h);
                h.on("click", {
                    d: e,
                    t: f
                },
                function(a) {
                    var b = a.data.d,
                    d = a.data.t;
                    return c = d,
                    n.hide(),
                    h.parent("li").addClass("selected").siblings("li").removeClass("selected"),
                    n.find("span").text(b.data("origin-name")).end().find("a").attr("href", b.data("origin-src")),
                    l.addClass("loading"),
                    mcw.loadImage(b.data("origin-src"), 
                    function(a) {
                        r(a)
                    }),
                    !1
                }),
                f[0] == c[0] && g.addClass("selected"),
                q.append(g)
            })),
            a(document).on("keydown.originimg", a.proxy(function(a) {
                return a.which == 27 ? s.call(this) : a.which == 37 || a.which == 38 ? q.find(".selected").prev("li").find("a").click() : (a.which == 39 || a.which == 40) && q.find(".selected").next("li").find("a").click(),
                !1
            },
            this)),
            a("span, a", n).on("click", 
            function(a) {
                a.stopPropagation()
            }),
            setTimeout(function() {
                mcw.loadImage(c.attr("src"), 
                function(b) {
                    if (!b) return j.remove(),
                    !1;
                    mcw.transitionEnd(l, 
                    function(b) {
                        j.trigger("galleryshow"),
                        l.addClass("loading"),
                        mcw.loadImage(d, 
                        function(a) {
                            l.removeClass("loading").find("img").attr("src", a.src)
                        }),
                        q && q.css({
                            left: (a(window).width() - q.width()) / 2
                        }),
                        n.show()
                    }),
                    r(b, e),
                    n.hide(),
                    j.removeClass("loading")
                })
            },
            20),
            j
        },
        scrollTo: function(b, c) {
            c = a.extend({
                anim: !0,
                container: null,
                callback: a.noop
            },
            c);
            var d = null,
            e = c.container ? a(c.container) : a("html, body");
            if (typeof b != "object" || typeof b.top != "number" && typeof b.left != "number") {
                var f = a(b).offset(),
                g = e.offset() || {
                    top: 0,
                    left: 0
                };
                d = {
                    top: f.top - g.top - 30,
                    left: f.left - g.left - 30
                }
            } else d = b;
            c.anim ? e.animate({
                scrollTop: d.top,
                scrollLeft: d.left
            },
            500, c.callback) : (e.scrollTop(d.top).scrollLeft(d.left), c.callback())
        },
        validateField: function(b, c) {
            var d = b.attr("data-validate"),
            e = b.attr("data-validate-msg"),
            f = b.val(),
            g = !0,
            h = "";
            if (d) d = d.split(";");
            else return g;
            e !== undefined && (e = e.split(";")),
            a.each(d, 
            function(d, i) {
                var i = a.trim(i).split(":"),
                j = i[0],
                k = i.length > 1 ? i[1] : null,
                l = null;
                if (j == "custom") {
                    var m = a.Event("validate");
                    b.trigger(m, [f, k]),
                    l = m.result || {
                        valid: !0
                    }
                } else l = mcw.validate[j](f, k);
                if (!l.valid) return g = l.valid,
                e && e.length && e[d] ? h = e[d] : l.errorMsg ? h = l.errorMsg: h = "",
                j == "required" && c && (g = !0, h = ""),
                !1
            });
            if (!g) {
                b.addClass("error").nextAll(".desc").hide();
                if (h) {
                    var i = b.nextAll(".error");
                    i.length || (i = a("<p class='error'></p>").appendTo(b.parent())),
                    i.text(h).show()
                }
            } else b.removeClass("error").nextAll(".desc").show().end().nextAll(".error").remove();
            return g
        },
        validate: {
            required: function(b, c) {
                return {
                    valid: !!a.trim(b),
                    errorMsg: "请填写这个字段"
                }
            },
            length: function(a, b) {
                b = (b || "0").split(",");
                var c = a.length,
                d = b[0] * 1,
                e = b.length > 1 ? b[1] * 1: null;
                return {
                    valid: !a || c >= d && (!e || c <= e),
                    errorMsg: "这个字段的长度不能" + (d > 0 ? "少于" + d + "位": "") + (e ? "多余" + e + "位": "")
                }
            },
            range: function(a, b) {
                b = (b || "0").split(",");
                var c = b[0] * 1,
                d = b.length > 1 ? b[1] * 1: null;
                return {
                    valid: !a || a >= c && (!d || a <= d),
                    errorMsg: "这个字段的值" + (c > 0 ? "不能小于" + c: "") + (d ? "不能大余" + d: "")
                }
            },
            email: function(a, b) {
                var c = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return {
                    valid: !a || c.test(a),
                    errorMsg: "请填写正确的邮箱地址"
                }
            },
            number: function(a, b) {
                return {
                    valid: !a || /^\d+$/.test(a),
                    errorMsg: "请填写数字"
                }
            },
            mobile: function(a, b) {
                return {
                    valid: !a || /^\d{11}$/.test(a),
                    errorMsg: "请填写一个有效的手机号码"
                }
            }
        },
        popover: function(b, c) {
            function f(b, c) {
                var d = b.offset(),
                e = b.outerWidth(),
                f = b.outerHeight(),
                g = a(window).height(),
                h = a(window).width(),
                i = c.data("opts") || {},
                j = c.outerHeight(),
                k = c.outerWidth(),
                l = a(document).scrollTop(),
                m = a(document).scrollLeft(),
                n = i.arrowWidth,
                o = i.arrowHeight,
                p = 15,
                q,
                r;
                c.removeClass("direction-left-top direction-right-top").removeClass("direction-left-bottom direction-right-bottom").removeClass("direction-top-left direction-top-right").removeClass("direction-bottom-left direction-bottom-right"),
                i.position ? c.addClass("direction-" + i.position) : g - d.top - f + l < j + 10 ? h - d.left - e + m < k + 20 ? c.addClass("direction-left-top") : c.addClass("direction-right-top") : h - d.left - e + m < k + 20 ? c.addClass("direction-left-bottom") : c.addClass("direction-right-bottom"),
                c.hasClass("direction-left-top") ? (q = d.top + f / 2 + n / 2 + p - j, r = d.left - o - k) : c.hasClass("direction-right-top") ? (q = d.top + f / 2 + n / 2 + p - j, r = d.left + e + o) : c.hasClass("direction-left-bottom") ? (q = d.top + f / 2 - n / 2 - p, r = d.left - o - k) : c.hasClass("direction-right-bottom") ? (q = d.top + f / 2 - n / 2 - p, r = d.left + e + o) : c.hasClass("direction-top-left") ? (q = d.top - o - j, r = d.left + e / 2 + n / 2 + p - k) : c.hasClass("direction-top-right") ? (q = d.top - o - j, r = d.left + e / 2 - arrow / 2 - p) : c.hasClass("direction-bottom-left") ? (q = d.top + f + o, r = d.left + e / 2 + n / 2 + p - k) : c.hasClass("direction-bottom-right") && (q = d.top + f + o, r = d.left + e / 2 - n / 2 - p),
                i.offset && (q += i.offset.top, r += i.offset.left),
                c.css({
                    top: q,
                    left: r
                })
            }
            if (c == "hide") {
                var d = a(b).data("popover");
                d && (d.remove(), a(b).removeClass("popover-target").data("popover", null), a(document).unbind(".popover").trigger("popoverhide", [b]))
            } else {
                if (c != "refresh") {
                    c = a.extend({
                        content: null,
                        position: null,
                        offset: null,
                        autohide: !0,
                        cls: null,
                        arrowWidth: 20,
                        arrowHeight: 10
                    },
                    c);
                    var e = a(".popover");
                    e.length > 0 && e.each(function(b, c) {
                        mcw.popover(a(c).data("target"), "hide")
                    }),
                    b = a(b);
                    var d = a("<div class='popover'>\t\t\t\t\t<div class='popover-content'></div>\t\t\t\t\t<div class='popover-arrow'></div>\t\t\t\t</div>");
                    return c.cls && d.addClass(c.cls),
                    d.appendTo("body").data("target", b).data("opts", c).find(".popover-content").append(c.content),
                    f(b, d),
                    d.on("click", ".link-hide-popover", 
                    function(b) {
                        b.preventDefault();
                        var c = a(this).closest(".popover");
                        mcw.popover(c.data("target"), "hide")
                    }),
                    c.autohide && a(document).bind("mousedown.popover", 
                    function(c) {
                        if (a(".dialog").length) return;
                        var e = a(c.target);
                        if (e[0] == b[0] || d.has(e).length) return;
                        mcw.popover(b, "hide")
                    }),
                    b.addClass("popover-target").data("popover", d),
                    d
                }
                b = a(b);
                var d = b.data("popover");
                if (d) return f(b, d),
                d
            }
        },
        highlight: function(a, b, c) {
            c = c || "transparent",
            a.stop(!0, !0).css({
                backgroundColor: b || "#fffed6"
            }),
            setTimeout(function() {
                a.animate({
                    backgroundColor: c
                },
                {
                    queue: !1,
                    duration: 1e3
                })
            },
            100)
        },
        scrollLoad: function(b, c) {
            function g() {
                if (f.offset().top - e.scrollTop() < d) {
                    if (f.hasClass("loading")) return;
                    f.addClass("loading").text("正在加载更多...");
                    var a = c(f);
                    a && a.done(function(a) {
                        a ? (f.removeClass("loading").text("加载更多内容"), g()) : f.removeClass("loading").addClass("over").text("没有更多内容了").unbind("click")
                    })
                }
            }
            var d,
            e = a(window);
            if (b === !1) {
                a(window).unbind(".scrollLoad"),
                e.unbind(".scrollLoad");
                return
            }
            var f = a("#btn-load-more", b);
            if (!f.length) return;
            a(window).unbind(".scrollLoad").bind("resize.scrollLoad", 
            function(b) {
                d = a(window).height()
            }).resize(),
            e.unbind(".scrollLoad").bind("scroll.scrollLoad", 
            function(a) {
                if (f.is(".loading, .over")) return;
                g()
            }).scroll()
        },
        metaKey: function(a) {
            var b = /Mac/.test(navigator.userAgent);
            return b ? a.metaKey: a.ctrlKey
        },
        playAudio: function(b, c) {
            var d = a("#audio-" + b);
            d.length || (d = a('<audio id="audio-' + b + '">\t\t\t\t\t\t<source src="' + c + '" type="audio/mpeg" />\t\t\t\t\t</audio>').appendTo("body")),
            d = d.get(0),
            a.browser.chrome && d.load(),
            d.play()
        },
        prettyDate: function(a, b) {
            var c = moment(a, b),
            d = mcw.now(),
            e = d.diff(c);
            if (e < 0) return "刚刚";
            if (c.diff(d.clone().add("d", -1).startOf("day")) < 0) return c.format("M月D日");
            if (c.diff(d.clone().startOf("day")) < 0) return "昨天";
            if (e < 6e4) return "刚刚";
            if (e >= 6e4 && e < 36e5) return Math.round(e / 6e4).toFixed(0) + "分钟前";
            if (e >= 36e5 && e < 864e5) return Math.round(e / 36e5).toFixed(0) + "小时前"
        },
        autosave: function(b) {
            b = b || document;
            var c = a("[data-autosave]", b),
            d = mcw.urlParts(location.href),
            e = [];
            c.each(function(b, c) {
                var c = a(c),
                f = c.data("autosave"),
                g = d.path + f + "/autosave/";
                if (!f) return;
                c.off("keyup.autosave").on("keyup.autosave", 
                function() {
                    var b = a(this).val();
                    localStorage[g] = b
                }),
                localStorage[g] && c.val(localStorage[g]),
                e.push(g)
            }),
            c.closest(".form").off("ajax:success.autosave").on("ajax:success.autosave", 
            function(b) {
                a.each(e, 
                function(a, b) {
                    localStorage[b] = "",
                    localStorage.removeItem(b)
                })
            })
        },
        isScreenView: function(b, c, d) {
            b = a(b),
            c = c || 0;
            var e = b.offset(),
            f = a(window),
            g = a(document),
            h = !1;
            return ! d && e.top > g.scrollTop() + c && e.top < g.scrollTop() + f.height() - b.outerHeight() - c && (h = !0),
            d && (e.top > g.scrollTop() + c && e.top < g.scrollTop() + f.height() - c || e.top + b.outerHeight() > g.scrollTop() + c && e.top + b.outerHeight() < g.scrollTop() + f.height() - c) && (h = !0),
            h
        }
    }
} (jQuery),
function(a) {
    var b = {},
    c = {},
    d = null,
    e = {},
    f = window.history && window.history.pushState && window.history.replaceState;
    a(function() {
        function k(b) {
            e && (c[e.url] = a(this).scrollTop())
        }
        function l(b, c) {
            var d = b;
            if (typeof b != "object") {
                var e = g.find(".sheet-active");
                if (e.length) {
                    var f = mcw.urlParts(e.data("url")).href;
                    e.empty().removeClass("sheet-active").attr("data-url", f).attr("data-id", e.attr("id")).removeAttr("id");
                    var h = a("<div class='sheet-header'><a class='link-parent-sheet' data-stack data-stack-replace></a></div>").appendTo(e);
                    h.find(".link-parent-sheet").attr("href", f).attr("data-restore-position", "true").text(e.data("page-name"))
                }
                d = a("<div class='page hidden empty'></div>");
                if (!c) {
                    var i = g.find(".page").length;
                    d.addClass("sheet sheet-active sheet-" + (i || "root")).attr("data-url", b)
                }
                d.appendTo(e.length ? e: g),
                d.removeClass("hidden")
            } else d.addClass("empty").children(".page").remove(),
            d.hasClass("sheet") && d.addClass("sheet-active"),
            d.data("id") && d.attr("id", d.data("id"));
            return d
        }
        function m(c, e, f, h) {
            function j(b, d) {
                var h = a(".popover-target");
                h.each(function() {
                    mcw.popover(a(this), "hide")
                }),
                a("*[tooltip]").trigger("mouseleave"),
                a(document).trigger("mousedown.notipop");
                var i = g.find(".page").index(c),
                j = a(a.trim(b)).attr("data-url", e).removeClass("sheet-root sheet-1 sheet-2 sheet-3 sheet-4").addClass("sheet-" + (i || "root")).addClass("empty");
                c.replaceWith(j);
                var k = j.attr("id");
                mcw.pages[k] && mcw.pages[k].init(j),
                a(document).trigger("afterstack", [j]),
                j.removeClass("empty");
                var l = {
                    id: k,
                    name: j.data("page-name") + " - Tower",
                    html: a("<div/>").append(j.clone()).html()
                },
                m = d ? d.getResponseHeader("X-PJAX-URL") : null;
                return m ? (m = mcw.urlParts(m).href, l[e] = null, l[m] = l) : l[e] = l,
                f && f(j, m),
                mcw.live && mcw.live(),
                j
            }
            function k() {
                e || (e = mcw.urlParts(c.data("url")).href),
                d = a.ajax({
                    url: e,
                    type: "get",
                    headers: {
                        "X-PJAX": "true"
                    },
                    data: {
                        pjax: 1
                    },
                    complete: function() {
                        d = null
                    },
                    dataType: "html",
                    error: function(a) {
                        if (!a || a.status !== 404 && a.status !== 403) a && a.status === 502 ? mcw.message({
                            msg: "抱歉，系统繁忙，请稍后刷新页面。"
                        }) : a && a.status === 500 && mcw.message({
                            msg: "抱歉，系统出错了，请稍后刷新页面。"
                        });
                        else {
                            var b = j(a.responseText, a);
                            c.hasClass("sheet-root") || b.addClass("sheet sheet-active")
                        }
                        mcw.clearPageCache(e)
                    },
                    success: function(a, b, c) {
                        j(a, c)
                    }
                })
            }
            if (!c || !c.length) return;
            var i = b[e]; ! h && i && i.html ? (c = j(i.html), c.data("pjax-refresh") === !1 ? mcw.live && mcw.liveHandler() : k()) : (e && c.addClass("loading"), k())
        }
        window.mcw || (mcw = {});
        if (!f) {
            a.extend(mcw, {
                stack: function(a) {
                    location.href = a.url
                },
                clearPageCache: function() {}
            });
            return
        }
        var g = a(".workspace"),
        h = a(document).on("scroll.stack", k);
        if (g.length) {
            var i = mcw.urlParts(location.href).href,
            j = g.find(".page:last").attr("data-url", i);
            b[i] = {
                id: j.attr("id"),
                name: document.title,
                html: a("<div/>").append(j.clone()).html()
            },
            e = {
                id: j.attr("id"),
                name: document.title,
                url: i,
                html: g.html()
            },
            history.replaceState(e, e.name, e.url)
        }
        a.extend(mcw, {
            clearPageCache: function(a) {
                a ? b[a] = undefined: b = {}
            },
            stack: function(f) {
                f = a.extend({
                    url: "",
                    root: !1,
                    replace: !1,
                    bare: !1,
                    restorePosition: !1,
                    parent: null,
                    nocache: !1
                },
                f);
                var i = a.Event("beforestack");
                a(document).trigger(i);
                if (i.result === !1) return;
                d && (d.abort(), d = null),
                h.off("scroll.stack", k),
                mcw.live && mcw.live(!1);
                var j = mcw.urlParts(f.url),
                n = mcw.urlParts(location.href),
                o = g.find(".page:last"),
                p = o.hasClass("loading"),
                q = null;
                o.length && !o.hasClass("empty") && (b[n.href] = {
                    id: o.attr("id"),
                    name: o.data("page-name") + " - Tower",
                    html: a("<div/>").append(o.clone()).html()
                },
                e.html = g.html(), history.replaceState(e, e.name, e.url)),
                j.path == n.path && j.search == n.search ? q = o: f.root ? (g.empty(), f.parent && a("<div class='page sheet sheet-root sheet-active'></div>").attr("data-page-name", f.parent.name).attr("data-url", f.parent.url).appendTo(g)) : f.replace && (g.find(".page").each(function() {
                    var b = a(this),
                    c = mcw.urlParts(b.data("url"));
                    if (c && j.path == c.path) return q = b,
                    b[0] != o[0] && l(b),
                    !1
                }), q || (q = o.empty(), l(q)));
                if (!q || q.length < 1) q = l(j.href, f.bare);
                e = {
                    url: j.href,
                    name: "正在加载...",
                    html: g.html()
                },
                history[p ? "replaceState": "pushState"](e, e.name, e.url),
                document.title = e.name,
                !j.hash && f.restorePosition && c[j.href] !== undefined ? h.scrollTop(c[j.href]) : h.scrollTop(0),
                h.on("scroll.stack", k).scroll(),
                m(q, j.href, 
                function(a, b) {
                    j.hash && (setTimeout(function() {
                        mcw.scrollTo(j.hash, {
                            anim: !1
                        })
                    },
                    0), b && (b += j.hash)),
                    e = {
                        id: a.attr("id"),
                        url: b || j.href,
                        name: a.data("page-name") + " - Tower",
                        html: g.html()
                    },
                    history.replaceState(e, e.name, e.url),
                    document.title = e.name,
                    window._gaq && _gaq.push(["_trackPageview"])
                },
                f.nocache)
            }
        }),
        a(document).on("click.stack", "a[data-stack]", 
        function(b) {
            var c = mcw.metaKey(b);
            if (c) return;
            b.preventDefault();
            var d = a(this),
            e = null;
            d.is("[data-parent-name][data-parent-url]") && (e = {
                name: d.data("parent-name"),
                url: d.data("parent-url")
            }),
            mcw.stack({
                url: d.data("url") || d.attr("href"),
                root: d.is("[data-stack-root]"),
                replace: d.is("[data-stack-replace]"),
                bare: d.is("[data-stack-bare]"),
                restorePosition: d.is("[data-restore-position]"),
                nocache: d.is("[data-nocache]"),
                parent: e
            })
        }),
        a(window).on("popstate.stack", 
        function(b) {
            var f = b.originalEvent.state;
            if (!f) return;
            d && (d.abort(), d = null),
            mcw.live && mcw.live(!1);
            var i = a.Event("beforestack");
            a(document).trigger(i);
            if (i.result === !1) return;
            h.off("scroll.stack", k),
            g.html(f.html),
            document.title = f.name,
            e = f;
            var j = g.find(".page:last"),
            l = j.attr("id");
            mcw.pages[l] && mcw.pages[l].init(j),
            j.data("pjax-refresh") === !1 ? mcw.live && mcw.liveHandler() : m(j, null, null, !0),
            c[f.url] !== undefined ? h.scrollTop(c[f.url]) : h.scrollTop(0),
            h.on("scroll.stack", k).scroll()
        })
    })
} (jQuery),
function(a) {
    function b(b, c) {
        this.opts = a.extend({},
        {
            action: "",
            params: {},
            multiple: !0,
            maxConnections: 1,
            allowedExtensions: [],
            sizeLimit: 0,
            minSizeLimit: 0,
            beforeUpload: function(a) {},
            onProgress: function(a, b, c) {},
            onSuccess: function(a, b) {},
            onComplete: function(a, b) {},
            onCancel: function(a) {},
            onValidate: function(a, b) {
                return ! 0
            },
            onError: function(a, b) {}
        },
        c),
        this._files = [],
        this._queue = [],
        this._params = [],
        this._loaded = [],
        this._xhrs = [],
        this._elem = a(b),
        this._input = null,
        this._createUploadButton(),
        this._filesInProgress = 0,
        this._preventLeaveInProgress()
    }
    a.extend(b.prototype, {
        setParams: function() {
            this.opts.params = params
        },
        getInProgress: function() {
            return this._filesInProgress
        },
        uploadFile: function(a) {
            this._supportHTML5 && this._uploadFileList([a])
        },
        cancel: function(b) {
            if (!b) return;
            var c = this._files[b];
            this.opts.onCancel(c),
            this._supportHTML5 ? (c = null, this._xhrs[b] && (this._xhrs[b].abort(), this._xhrs[b] = null)) : (delete c, a("#upload-iframe-" + b).attr("src", "javascript:false;").remove(), this._queue.splice(this._queue.indexOf(b * 1), 1), this._filesInProgress--, this.opts.onComplete())
        },
        _preventLeaveInProgress: function() {
            var b = this;
            a(window).bind("beforeunload", 
            function(a) {
                if (b._filesInProgress <= 0) return;
                return a.originalEvent.returnValue = "正在上传文件，如果离开上传会自动取消",
                "正在上传文件，如果离开上传会自动取消"
            })
        },
        _createUploadButton: function() {
            return this._elem.css({
                position: "relative",
                overflow: "hidden",
                direction: "ltr"
            }),
            this._elem.is("input[type=file]") || (this._input = a("<input />", {
                multiple: this.opts.multiple && this._supportHTML5,
                type: "file",
                title: "添加附件",
                name: "upload-file",
                tabIndex: -1,
                css: {
                    position: "absolute",
                    right: 0,
                    top: 0,
                    fontFamily: "Arial",
                    fontSize: "118px",
                    margin: 0,
                    padding: 0,
                    cursor: "pointer",
                    opacity: 0
                }
            }).on("change", a.proxy(this._onInputChange, this)), this._elem.append(this._input), window.attach && this._input.prop("tabindex", "-1")),
            this._input
        },
        _onInputChange: function() {
            this._supportHTML5 ? this._uploadFileList(this._input[0].files) : this._validateFile(this._input[0]) ? this._uploadFile(this._input[0]) : this.opts.onComplete(this._input[0]),
            this._resetUploadButton()
        },
        _resetUploadButton: function() {
            this._input[0].parentNode && this._input.remove(),
            this._input = this._createUploadButton()
        },
        _uploadFileList: function(a) {
            for (var b = 0, c = a.length; b < c; b++) if (!this._validateFile(a[b])) {
                this.opts.onComplete(a[b]);
                return
            }
            for (var b = 0, c = a.length; b < c; b++) this._uploadFile(a[b])
        },
        _uploadFile: function(a) {
            var b = this._addFile(a);
            this.opts.beforeUpload(b) !== !1 && (this._filesInProgress++, this._prepareUpload(b, this.opts.params))
        },
        _prepareUpload: function(b, c) {
            var d = this._queue.push(b.id);
            this._params[b.id] = a.extend({},
            c),
            d <= this.opts.maxConnections && this._upload(b, this._params[b.id])
        },
        _upload: function(a, b) {
            this._supportHTML5 ? this._xhrUpload(a, b) : this._formUpload(a, b)
        },
        _xhrUpload: function(b, c) {
            this._loaded[b.id] = 0;
            var d = this;
            c = c || {};
            var e = new FormData;
            e.append("authenticity_token", a('meta[name="csrf-token"]').attr("content")),
            e.append("upload_file", b.obj),
            c.original_filename = this._getFileName(b),
            c.conn_guid = a("#conn-guid").val(),
            a.each(c, 
            function(a, b) {
                e.append(a, b)
            });
            var f = this._xhrs[b.id] = a.ajax({
                url: this.opts.action,
                data: e,
                processData: !1,
                contentType: !1,
                type: "POST",
                headers: {
                    "X-File-Name": encodeURIComponent(b.name)
                },
                xhr: function() {
                    var b = a.ajaxSettings.xhr();
                    return b && (b.upload.onprogress = a.proxy(function(a) {
                        this.progress(a)
                    },
                    this)),
                    b
                },
                progress: function(a) {
                    a.lengthComputable && (d._loaded[b.id] = a.loaded, d.opts.onProgress(b, a.loaded, a.total))
                },
                error: function(a, c, e) {
                    d.opts.onError(b, a)
                },
                success: a.proxy(function(a) {
                    this.opts.onProgress(b, b.size, b.size),
                    this.opts.onSuccess(b, a)
                },
                this),
                complete: a.proxy(function(c, d) {
                    this._filesInProgress--,
                    this.opts.onComplete(b, a.parseJSON(c.responseText)),
                    this._files[b.id] = null,
                    this._xhrs[b.id] = null,
                    this._dequeue(b)
                },
                this)
            })
        },
        _dequeue: function(b) {
            var c = a.inArray(b.id, this._queue);
            this._queue.splice(c, 1);
            var d = this.opts.maxConnections;
            if (this._queue.length >= d && c < d) {
                var e = this._queue[d - 1];
                this._upload(this._files[e], this._params[e])
            }
        },
        _formUpload: function(b, c) {
            var d = b.obj;
            if (!d) throw new Error("file with does not exsit, or already uploaded or cancel");
            var e = this._createIframe("upload-iframe-" + b.id),
            f = this._createForm(e, c);
            f.appendChild(d);
            var g = this;
            return this._attachLoadEvent(e, 
            function() {
                var c = g._getIframeContentJSON(e);
                g._filesInProgress--,
                c.success && g.opts.onSuccess(b, c),
                g.opts.onComplete(b, c),
                g._files[b.id] = null,
                g._dequeue(b),
                a(e).remove()
            }),
            f.submit(),
            a(f).remove(),
            b.id
        },
        _attachLoadEvent: function(b, c) {
            a(b).on("load", 
            function() {
                if (!b.parentNode) return;
                if (b.contentDocument && b.contentDocument.body && b.contentDocument.body.innerHTML == "false") return;
                c()
            })
        },
        _getIframeContentJSON: function(b) {
            var c = b.contentDocument,
            d,
            e;
            c.getElementById("json-response") ? d = c.getElementById("json-response").innerHTML: d = c.body.innerHTML;
            try {
                e = a.parseJSON(d)
            } catch(f) {
                e = {}
            }
            return e
        },
        _createIframe: function(b) {
            var c = a("<iframe />", {
                src: "javascript:false;",
                name: b,
                id: b,
                css: {
                    display: "none"
                }
            });
            return a(document.body).append(c),
            c[0]
        },
        _createForm: function(b, c) {
            var d = a('<form method="post" enctype="multipart/form-data"></form>');
            d.attr("action", this.opts.action).attr("target", b.name).hide();
            var e = a("meta[name=csrf-token]").attr("content"),
            f = a("meta[name=csrf-param]").attr("content");
            if (f !== undefined && e !== undefined) {
                var g = a('<input name="' + f + '" value="' + e + '" type="hidden" />');
                d.append(g)
            }
            return a.each(c, 
            function(a, b) {
                d.append('<input type="hidden" name="' + a + '" value="' + b + '" />')
            }),
            a(document.body).append(d),
            d[0]
        },
        _validateFile: function(a) {
            var b = this._getFileExtension(a),
            c = this._getFileName(a);
            return c.indexOf("%") > -1 ? (mcw.message({
                msg: "抱歉，您上传文件的文件名中不能包含“%”字符。"
            }), !1) : this.opts.onValidate(a, b)
        },
        _addFile: function(b) {
            var c = {
                id: this._getUniqueId(),
                name: this._getFileName(b),
                size: this._getFileSize(b),
                extension: this._getFileExtension(b),
                obj: b
            };
            return this._files[c.id] = c,
            this._supportHTML5 || (a(b).prop("name", "upload_file"), b.parentNode && a(b).remove()),
            c
        },
        _getUniqueId: function() {
            var a = 0;
            return function() {
                return a++
            }
        } (),
        _getFileSize: function(a) {
            return this._supportHTML5 ? a.fileSize != null ? a.fileSize: a.size: null
        },
        _getFileName: function(a) {
            var b;
            return this._supportHTML5 ? b = a.fileName != null ? a.fileName: a.name: b = a.value.replace(/.*(\/|\\)/, ""),
            b
        },
        _getFileExtension: function(a) {
            var b = this._getFileName(a);
            return b.split(".").pop().toLowerCase()
        },
        _supportHTML5: !!window.File && !!window.FileList
    }),
    window.mcw || (mcw = {}),
    a.extend(mcw, {
        upload: function(a, c) {
            return new b(a, c)
        }
    })
} (jQuery),
function(a) {
    function c(b) {
        function g(e) {
            var f = /(_|\*)(\S+?)(_|\*)\s/g,
            g;
            while ((g = f.exec(e.data)) != null) {
                var h = e.data.substr(0, g.index) + g[2] + e.data.substr(g.index + g[0].length, g.input.length - 1),
                i = c.createTextNode(h);
                a(e).replaceWith(i);
                var j = rangy.createRange(c);
                j.setStart(i, g.index),
                j.setEnd(i, g.index + g[2].length),
                d.setSelection(j),
                b.composer.commands.exec("bold"),
                d.setAfter(d.getSelectedNode().parentNode),
                a(d.getSelectedNode()).closest("b").length && b.composer.commands.exec("bold")
            }
        }
        function h(e) {
            var f = /^\*\s+(\S*?)/g,
            g;
            while ((g = f.exec(e.data)) != null) {
                if (e.previousSibling && !a(e.previousSibling).is("br")) return;
                var h = e.data.substr(0, g.index) + g[1] + e.data.substr(g.index + g[0].length),
                i = rangy.createRange(c);
                i.setStartAfter(e),
                i.setEndAfter(e),
                d.setSelection(i),
                b.composer.commands.exec("insertUnorderedList");
                var j = d.getSelectedNode();
                j.textContent = h;
                var k = a(j).closest("li");
                if (k.length) {
                    var l = c.createTextNode(wysihtml5.INVISIBLE_SPACE);
                    k.append(l),
                    d.selectNode(l)
                } else d.setAfter(j)
            }
        }
        function i(e) {
            var f = /^\d[\.、]\s(\S*?)/g,
            g;
            while ((g = f.exec(e.data)) != null) {
                var h = e.data.substr(0, g.index) + g[1] + e.data.substr(g.index + g[0].length),
                i = rangy.createRange(c);
                i.setStartAfter(e),
                i.setEndAfter(e),
                d.setSelection(i),
                b.composer.commands.exec("insertOrderedList");
                var j = d.getSelectedNode();
                j.textContent = h;
                var k = a(j).closest("li");
                if (k.length) {
                    var l = c.createTextNode(wysihtml5.INVISIBLE_SPACE);
                    k.append(l),
                    d.selectNode(l)
                } else d.setAfter(j)
            }
        }
        var c = b.composer.doc,
        d = b.composer.selection,
        e = rangy.createRange(c);
        e.selectNode(c.body);
        var f = e.getNodes([3]);
        a.each(f, 
        function(a, b) {
            g(b),
            h(b),
            i(b)
        })
    }
    a(function() {
        a("body").on("validate", ".form-editor", 
        function(b, c, d) {
            var e = a(this).find(".editor:first"),
            f = e.find(".attachment:visible"),
            g = a(b.currentTarget),
            h = {
                valid: !0
            };
            return /^((&nbsp;)*\s*(<br>)*)*$/.test(c) && !a.trim(g.find("input[type=text]").val()) && !f.length ? (e.addClass("error"), h.valid = !1) : c.length > 5e3 ? (e.addClass("error"), h.valid = !1, mcw.message({
                msg: "内容最长5000个字符"
            })) : e.removeClass("error"),
            f.each(function() {
                if (a(this).hasClass("uploading")) return e.addClass("error"),
                h.valid = !1,
                !1
            }),
            h
        }).on("ajax:beforeSend", ".form-editor", 
        function(b, c, d) {
            var e = a(".member-list input:checked").map(function() {
                return a(this).val()
            }).get();
            d.data += "&cc_guids=" + e.join(",");
            var f = a(this).find(".editor:first"),
            g = f.find(".attachment[fileid]:visible").map(function() {
                return a(this).is("[attachId]") ? a(this).attr("attachId") : null
            }).get(),
            h = f.find(".attachment:hidden:not([fileid])").map(function() {
                return a(this).is("[attachId]") ? a(this).attr("attachId") : null
            }).get(),
            i = f.find(".attachment:visible").map(function() {
                return a(this).is("[attachId]") ? a(this).attr("attachId") : null
            }).get();
            d.data += "&attach_guids=" + g.join(",") + "&delete_attach_guids=" + h.join(",") + "&attach_order=" + i.join(",")
        }).on("click", ".link-select-all", 
        function(b) {
            b.preventDefault(),
            a(b.currentTarget).parents(".notify:first").find(".member-list input:checkbox").attr("checked", "checked")
        }).on("click", ".link-select-none", 
        function(b) {
            b.preventDefault(),
            a(b.currentTarget).parents(".notify:first").find(".member-list input:checkbox").removeAttr("checked")
        }).on("click", ".link-change-notify", 
        function(b) {
            b.preventDefault(),
            a(b.currentTarget).parent().hide().parents(".notify:first").find(".select-all").show().end().find(".form-field").show().end().find(".receiver").hide()
        })
    }),
    window.mcw || (mcw = {});
    var b = {
        attachment: "<div class='attachment'>\t\t\t\t<img src='/assets/file_icons/file_extension_others-794dbedf3ee0e0e7ea0a61d225ff67f4.png'/>\t\t\t\t<span class='name'></span>\t\t\t\t<span class='size'></span>\t\t\t\t<div class='progress-bar'><div><span></span></div></div>\t\t\t\t<span class='percent'>0%</span>\t\t\t\t<a href='javascript:;' class='link-cancel' title='Cancel'>Cancel</a>\t\t\t</div>",
        toolbar: '<div class="editor-toolbar">\t\t\t\t<a class="toolbar-button toolbar-button-em" data-wysihtml5-command="formatInline" data-wysihtml5-command-value="b" href="javascript:;" title="加粗文字">加粗文字</a>\t\t\t\t<a class="toolbar-button toolbar-button-ul" data-wysihtml5-command="insertUnorderedList" href="javascript:;" title="无序列表">无序列表</a>\t\t\t\t<a class="toolbar-button toolbar-button-ol" data-wysihtml5-command="insertOrderedList" href="javascript:;" title="有序列表">有序列表</a>\t\t\t</div>'
    };
    a.extend(mcw, {
        editor: function(c, d) {
            function l(a) {
                var b = f.parents("form:first").find("button[type=submit]");
                a === "normal" && b.prop("disabled") ? b.prop("disabled", !1).text(b.data("originText") || b.data("ujs:enable-with")).removeData("originText") : a === "uploading" && !b.prop("disabled") && b.prop("disabled", !0).data("originText", b.text()).text("正在上传附件...")
            }
            d = a.extend({},
            d, {
                upload: !0,
                toolbar: !0
            });
            var e = a(c),
            f,
            g;
            e.parent().is(".editor") ? f = e.parent() : f = e.wrap("<div class='editor' />").parent(),
            mcw.autosave(f.closest(".form-editor")),
            d.toolbar && (g = a(b.toolbar).insertAfter(e));
            var h = (new wysihtml5.Editor(e[0], {
                toolbar: g ? g[0] : undefined,
                style: !1,
                parserRules: wysihtml5ParserRules,
                stylesheets: ["/assets/editor-53a0eb07daa563d73e75ecabc8ee79d0.css"]
            })).on("load", 
            function() {
                if (!h || !h.composer) return;
                a(h.composer.doc).on("dragover", 
                function(b) {
                    a(document).trigger("dragover", [b, f])
                }),
                a(h.composer.doc).on("dragenter dragover dragleave", 
                function(a) {
                    return a.preventDefault(),
                    !1
                }).on("drop", 
                function(b) {
                    b.preventDefault(),
                    b.stopPropagation(),
                    a(f[0].ownerDocument).trigger("drop", [b, f])
                }),
                a(h.composer.doc.body).on("keydown", 
                function(a) {
                    var b = mcw.metaKey(a);
                    if (a.which == 13 && b) return e.closest(".form").find("button:submit").click(),
                    !1
                });
                var b = e.attr("tabindex");
                b && a(h.composer.iframe).attr("tabindex", b)
            }).on("focus:composer", 
            function() {
                h && h.composer && (a(h.composer.iframe).closest(".editor").addClass("focus"), h.heightInterval = setInterval(a.proxy(function() {
                    h && h.composer ? a(h.composer.iframe).css({
                        minHeight: Math.max(90, a(h.composer.element).outerHeight() + 10)
                    }) : h && (clearInterval(h.heightInterval), h.heightInterval = null)
                },
                this), 300), f.removeClass("error"))
            }).on("blur", 
            function() {}).on("blur:composer", 
            function() {
                h && h.composer && a(h.composer.iframe).closest(".editor").removeClass("focus"),
                h && h.heightInterval && (clearInterval(h.heightInterval), h.heightInterval = null)
            });
            a(h.textareaElement).is("[data-autosave]") && h.on("change:composer", 
            function() {
                if (h) {
                    var b = mcw.urlParts(location.href),
                    c = a(h.textareaElement).data("autosave"),
                    d = h.getValue(),
                    e = b.path + c + "/autosave/";
                    if (!c) return;
                    localStorage[e] = d
                }
            }),
            f.data("editor", h);
            if (mcw.upload && d.upload) {
                var i = f.find(".editor-attachments"),
                j = f.find(".add-attachment");
                j.length < 1 && (j = a('<div class="add-attachment">添加附件</div>')),
                f.after('<p class="upload-limit-desc">支持不超过50MB的附件</p>'),
                j.insertAfter(h.currentView.iframe),
                i.length < 1 && (i = a("<div class='editor-attachments'></div>").appendTo(f));
                var k = mcw.upload(j, {
                    action: "/upload/attachments",
                    beforeUpload: function(c) {
                        var d = a(b.attachment).attr({
                            fileid: c.id
                        }).prependTo(i);
                        mcw.loadImage(c.obj, 
                        function(a) {
                            if (!a) {
                                var b = "/assets/file_icons/",
                                e = b + "file_extension_" + c.extension + ".png";
                                mcw.loadImage(e, 
                                function(a) {
                                    a ? d.find("img").attr("src", a.src) : d.find("img").attr("src", b + "file_extension_others.png")
                                })
                            } else d.find("img").attr({
                                src: a.src,
                                "data-origin-src": a.src,
                                "data-origin-size": a.width + "," + a.height,
                                "data-origin-name": c.name
                            }).css("cursor", "pointer")
                        });
                        if (window.File && window.FileList) {
                            var e = 0;
                            c.size >= 1048576 ? e = (c.size / 1048576).toFixed(1) + "M": e = (c.size / 1024).toFixed(0) + "K"
                        } else d.find(".progress-bar").remove().end().find(".percent").text("正在上传...").addClass("ie");
                        d.addClass("uploading"),
                        d.find(".name").text(c.name),
                        d.find(".size").text(e),
                        d.find(".link-cancel").text("取消上传").attr("title", "取消上传"),
                        l("uploading"),
                        j.addClass("active")
                    },
                    onProgress: function(a, b, c) {
                        var d = i.find(".attachment[fileid=" + a.id + "]"),
                        e = b / c;
                        e > .99 ? e = "正在处理...": e = (e * 100).toFixed(0) + "%",
                        d.find(".progress-bar span").width(e),
                        d.find(".percent").text(e)
                    },
                    onValidate: function(a, b) {
                        return a.size && a.size / 1048576 > 50 ? (mcw.message({
                            msg: '附件 <em style="color: #ee6500;">' + a.name + "</em> 大小超过50MB, 无法完成上传",
                            width: 500
                        }), !1) : !0
                    },
                    onSuccess: function(a, b) {
                        var c = i.find(".attachment[fileid=" + a.id + "]");
                        c.find(".progress-bar, .percent").remove(),
                        c.removeClass("uploading").attr("attachid", b.attach).find(".link-cancel").text("移除附件").attr("title", "移除附件"),
                        mcw.loadImage(b.file_path, 
                        function(a) {
                            a && c.find("img").attr({
                                src: a.src,
                                "data-origin-src": a.src,
                                "data-origin-size": a.width + "," + a.height
                            })
                        })
                    },
                    onCancel: function(a) {},
                    onError: function(b, c) {
                        if (c.statusText === "abort") return;
                        if (c.responseText) {
                            var d = a.parseJSON(c.responseText);
                            mcw.message({
                                msg: d.msg
                            })
                        }
                        i.find(".attachment.uploading .link-cancel").click(),
                        l("normal")
                    },
                    onComplete: function(a, b) {
                        k.getInProgress() === 0 && l("normal")
                    }
                });
                h.on("paste:composer", a.proxy(function(b) {
                    if (b && b.originalEvent.type === "drop") return ! 1;
                    if (!b || !b.dataTransfer) {
                        var c = a("img", h.composer.element),
                        d = c.map(function(b, c) {
                            return a(c).attr("src")
                        }).get();
                        c.remove(),
                        a.each(d, 
                        function(a, b) {
                            blob = window.dataURLtoBlob && window.dataURLtoBlob(b),
                            blob.name = "截图 " + moment().format("YYYY-MM-DD HH:mm:ss") + ".png",
                            k.uploadFile(blob)
                        })
                    } else {
                        var e;
                        if (b.dataTransfer.files && b.dataTransfer.files.length) b.originalEvent.stopPropagation(),
                        b.originalEvent.preventDefault(),
                        e = b.dataTransfer.files[0];
                        else if (b.dataTransfer.items && b.dataTransfer.items.length && b.dataTransfer.items[0].type.indexOf("image") > -1) b.originalEvent.stopPropagation(),
                        b.originalEvent.preventDefault(),
                        e = b.dataTransfer.items[0];
                        else {
                            if (b.dataTransfer.types && (a.inArray("image/png", b.dataTransfer.types) > -1 || a.inArray("image/tiff", b.dataTransfer.types) > -1)) return b.originalEvent.preventDefault(),
                            !1;
                            return
                        }
                        e && (e.getAsFile && (e = e.getAsFile()), e.name || (e.name = "截图 " + moment().format("YYYY-MM-DD HH:mm:ss") + ".png"), k.uploadFile(e))
                    }
                },
                this)),
                a(document).on("click.editor", ".editor-attachments .link-cancel", 
                function(b) {
                    b.preventDefault();
                    var c = a(b.currentTarget).parents(".attachment:first"),
                    d = c.siblings(".attachment:visible"),
                    e = c.attr("fileid");
                    e && c.hasClass("uploading") && k.cancel(e),
                    c.hide().removeClass("uploading"),
                    d.length || j.removeClass("active")
                }),
                i.sortable({
                    axis: "y",
                    item: ".attachment",
                    cursor: "move",
                    helper: "clone",
                    tolerance: "pointer",
                    placeholder: "editor-attach-placeholder",
                    containment: "parent"
                })
            }
            return a.extend(h, {
                destroyEditor: function() {
                    var b = a(h.textarea.element).closest(".form").off(".editor");
                    b.data("submitEvent") && (b.data("submitEvent").stop(), a.removeData(b, "submitEvent")),
                    b.data("resetEvent") && (b.data("resetEvent").stop(), a.removeData(b, "resetEvent")),
                    clearInterval(h.heightInterval),
                    h = null,
                    f.find(".editor-attachments .link-cancel").click(),
                    f.next(".upload-limit-desc").remove(),
                    l("normal");
                    var c = e.nextAll("iframe.wysihtml5-sandbox").remove();
                    e.nextAll("input[name='_wysihtml5_mode'], .editor-attachments, .add-attachment, .editor-toolbar").remove(),
                    a("body").removeClass("wysihtml5-supported"),
                    a(document).off(".editor"),
                    e.unwrap().val("")
                }
            }),
            f.data({
                editor: h,
                uploader: k
            }),
            f.data("droppable", "true").attr("data-droppable", "true").on("dropCustom", 
            function(b, c, d) {
                b.preventDefault(),
                b.stopPropagation(),
                d && a.each(d, 
                function(a, b) {
                    k.uploadFile(b)
                })
            }),
            h
        }
    })
} (jQuery),
function(a) {
    var b = {
        inline: !1,
        showPrevNext: !0,
        disableToday: !1,
        allowOld: !0,
        format: "YYYY-MM-DD"
    },
    c = function(c, d) {
        this.el = a(c);
        var e = a.extend({},
        b, d);
        this.el.data("settings", e);
        var f = this.el.val();
        f && (this.selectedDate = moment(f, e.format)),
        e.inline ? this.show() : (this.el.focus(a.proxy(function(a) {
            this.show()
        },
        this)).focus(), a(document).bind("click.datepicker", a.proxy(function(a) {
            this.hide()
        },
        this)))
    };
    a.extend(c.prototype, {
        show: function() {
            this.update()
        },
        hide: function() {
            this.cal && (this.cal.remove(), this.cal = null, a(document).unbind(".datepicker"))
        },
        setStartDate: function(a) {
            this.el.data("settings").startDate = a,
            this.cal && this.update()
        },
        setEndDate: function(a) {
            this.el.data("settings").endDate = a,
            this.cal && this.update()
        },
        setSelectedDate: function(a) {
            if (!a) this.selectedDate = null,
            this.el.val("");
            else {
                this.selectedDate = moment(a);
                var b = this.el.data("settings");
                this.el.val(this.selectedDate.format(b.format))
            }
            this.cal && this.update()
        },
        update: function() {
            var b = this.el,
            c = b.data("settings"),
            d = mcw.now().startOf("day"),
            e = b.data("theDate") || this.selectedDate || d,
            f = e.clone().startOf("month"),
            g = e.clone().endOf("month"),
            h = e.clone().add("months", -1).endOf("month"),
            i = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            b.data("theDate", e);
            var j = "";
            for (var k = 0, l = 0; k < 6; k++) {
                var m = "";
                for (var n = 0; n < 7; n++, l++) {
                    var o = h.date() - h.day() + l + 1,
                    p = o - h.date(),
                    q = n == 6 ? "sun": n == 5 ? "sat": "day";
                    if (p >= 1 && p <= g.date()) {
                        var r = e.clone().date(p);
                        q += d.diff(r) == 0 ? " today": "";
                        if (!c.allowOld) q += r.diff(d) < 0 ? " disabled": "";
                        else if (typeof c.allowOld == "string") {
                            var s = moment(c.allowOld, "YYYY-MM-DD");
                            q += r.diff(s) < 0 ? " disabled": ""
                        }
                        this.selectedDate && (q += r.diff(this.selectedDate) == 0 ? " selected": "")
                    } else {
                        if (p > g.date() && n == 0) break;
                        q = "disabled",
                        p = p <= 0 ? o: o - g.date() - h.date()
                    }
                    m += "<td class='datepicker-day'><a href='javascript:;' class='" + q + "'>" + p + "</div></td>"
                }
                m && (j += "<tr class='days'>" + m + "</tr>")
            }
            var t = c.allowOld,
            u = !0;
            c.showPrevNext || (t = u = !1);
            var v = e.year() + "年" + i[e.month()],
            w = "<table><tr><td class='datepicker-prev'>" + (t ? "<a href='javascript:;'>Prev</a>": "") + "</td>" + "<td class='datepicker-title' colspan='5'>" + v + "</td>" + "<td class='datepicker-next'>" + (u ? "<a href='javascript:;'>Next</a>"
            : "") + "</td>" + "</tr>" + "<tr class='datepicker-dow'>" + "<td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td><td>日</td>" + "</tr>" + j + "</table>";
            if (!this.cal) {
                this.cal = a("<div class='datepicker'></div>").insertAfter(b);
                if (!c.inline) {
                    var x = b.offset();
                    this.cal.css({
                        position: "absolute",
                        "z-index": c.zIndex || 100,
                        left: x.left,
                        top: x.top + b.outerHeight(!0)
                    })
                }
                this.cal.on("click", 
                function(a) {
                    return ! 1
                }).on("click", ".datepicker-prev a", a.proxy(function(b) {
                    var c = a(b.currentTarget),
                    d = this.el.data("theDate"),
                    e = d.clone().add("months", -1);
                    this.el.data("theDate", e),
                    this.update()
                },
                this)).on("click", ".datepicker-next a", a.proxy(function(b) {
                    var c = a(b.currentTarget),
                    d = this.el.data("theDate"),
                    e = d.clone().add("months", 1);
                    this.el.data("theDate", e),
                    this.update()
                },
                this)).on("click", ".datepicker-day a", a.proxy(function(b) {
                    b.preventDefault();
                    var c = a(b.currentTarget);
                    if (c.hasClass("disabled")) return;
                    var d = c.text(),
                    e = this.el.data("settings"),
                    f = this.el.data("theDate"),
                    g = f.clone().date(d);
                    this.el.data("theDate", g),
                    this.el.val(g.format(e.format)),
                    this.selectedDate = g,
                    this.cal.find(".datepicker-day a.selected").removeClass("selected"),
                    c.addClass("selected"),
                    e.inline || this.hide(),
                    e.onSelect && e.onSelect(g)
                },
                this))
            }
            this.cal.html(w)
        }
    }),
    window.mcw || (mcw = {}),
    a.extend(mcw, {
        datepicker: function(b, d) {
            return new c(a(b), d)
        }
    })
} (jQuery),
function(a) {
    function b(b, c) {
        this.el = a(b).data("calendar", this),
        this.month = moment(c.month, "YYYY-MM"),
        this.events = [],
        this.todos = [],
        this.renderGrid(),
        this.el.data("start", this.el.find(".day:first").data("date")).data("end", this.el.find(".day:last").data("date")),
        c.events && this.renderEvents(c.events),
        c.todos && this.renderTodos(c.todos);
        var d = this;
        this.el.off(".calendar").on("click.calendar", ".day", 
        function(b) {
            var e = a(b.target);
            if (e.closest(".cal-event, .cal-todo").length) return;
            return c.onDayClick && c.onDayClick({
                dayEl: a(this),
                cal: d
            }),
            !1
        }).on("mousedown.calendar", ".day", 
        function(a) {
            return ! 1
        }).on("mousedown.calendar", ".cal-event", 
        function(a) {
            return ! 1
        }).on("mouseenter.calendar", ".cal-event", 
        function(b) {
            var c = a(this),
            e = c.data("guid");
            d.el.find(".cal-event[data-guid=" + e + "]").addClass("over")
        }).on("mouseleave.calendar", ".cal-event", 
        function(b) {
            var c = a(this),
            e = c.data("guid");
            d.el.find(".cal-event[data-guid=" + e + "]").removeClass("over")
        })
    }
    a(function() {}),
    a.extend(b.prototype, {
        renderGrid: function() {
            var a = this.el.find(".weeks").empty(),
            b = mcw.now().startOf("day"),
            c = this.month.clone().startOf("week").add("d", 1),
            d = c.clone().endOf("week").add("d", 1);
            while (c.month() == this.month.month() || d.month() == this.month.month()) {
                var e = mcw.template("tpl-week", {
                    week: c.format("YYYY-MM-DD")
                }).appendTo(a);
                for (var f = 0; f < 7; f += 1) {
                    var g = c.clone().add("d", f),
                    h = mcw.template("tpl-day", {
                        date: g.format("YYYY-MM-DD"),
                        num: g.date()
                    }).appendTo(e.find(".days"));
                    g.isSame(b) && h.addClass("today").find(".desc").text("今天"),
                    g.day() == 0 ? h.addClass("sun") : g.day() == 6 && h.addClass("sat"),
                    g.month() != this.month.month() && h.addClass("other-month")
                }
                c.add("w", 1),
                d.add("w", 1)
            }
        },
        renderEvents: function(b) {
            var c = this.el;
            c.height(c.height()),
            c.find(".week .events").empty(),
            c.find(".day .event-spacers").empty(),
            c.find(".day .day-events").empty().hide(),
            b || (b = this.events.slice()),
            this.events = [];
            var d = this;
            a.each(b, 
            function(a, b) {
                d.addEvent(b)
            }),
            c.height("auto")
        },
        renderTodos: function(b) {
            var c = this.el;
            c.height(c.height()),
            c.find(".day .day-todos").empty().hide(),
            b || (b = this.todos.slice()),
            this.todos = [];
            var d = this;
            a.each(b, 
            function(a, b) {
                d.addTodo(b)
            }),
            c.height("auto")
        },
        addTodo: function(a, b) {
            this.todos.push(a);
            if (b === !1) return;
            var c = mcw.template("tpl-todo", {
                guid: a.guid,
                projectGuid: a.project_guid,
                projectName: a.project_name,
                color: a.project_color,
                content: mcw.truncate(a.content, 18)
            });
            return c.data("todo", a),
            a.completed && c.addClass("completed").find("input:checkbox").prop("checked", !0),
            this.el.find(".day[data-date=" + a.due_at + "] .day-todos").append(c).show(),
            c
        },
        addEvent: function(b, c) {
            this.events.push(b);
            if (c === !1) return;
            var d = this.el,
            e = "YYYY-MM-DD HH:mm:ss Z",
            f = moment(b.starts_at, e),
            g = moment(b.ends_at, e),
            h = g.diff(f, "days");
            if (h > 0) {
                var i = {};
                for (var j = 0; j <= h; j += 1) {
                    var k = f.clone().add("days", j),
                    l = d.find(".day[data-date=" + k.format("YYYY-MM-DD") + "]"),
                    m = l.closest(".week");
                    if (!m.length) continue;
                    var n = m.data("week");
                    i[n] || (i[n] = []),
                    i[n].push(l)
                }
                var o = 0;
                for (;;) {
                    var p = !1;
                    a.each(i, 
                    function(b, c) {
                        a.each(c, 
                        function(b, c) {
                            var d = a(c).find(".event-spacer");
                            if (d.length > o && d.eq(o).is("[data-guid]")) return p = !0,
                            !1
                        });
                        if (p) return ! 1
                    });
                    if (!p) break;
                    o++
                }
                return a.each(i, 
                function(c, e) {
                    var h = d.find(".week[data-week=" + c + "]"),
                    i = mcw.template("tpl-event", {
                        start: b.starts_at,
                        end: b.ends_at,
                        guid: b.guid,
                        author: b.creator_guid,
                        content: b.content,
                        calendar: b.caleventable_guid,
                        calendarName: b.caleventable_name,
                        color: b.calendar_color
                    }).addClass("new").appendTo(h.children(".events")),
                    j = moment(e[0].data("date"), "YYYY-MM-DD"),
                    k = moment(e[e.length - 1].data("date"), "YYYY-MM-DD");
                    f.clone().startOf("day").isSame(j) && i.addClass("start"),
                    g.clone().startOf("day").isSame(k) && i.addClass("end"),
                    i.css({
                        width: e.length / 7 * 100 + "%",
                        top: 22 * o,
                        left: h.find(".day").index(e[0]) / 7 * 100 + "%"
                    }).find(".point").remove(),
                    i.data("event", b);
                    var l = i.find(".content");
                    l.find("span").css({
                        maxWidth: l.width()
                    }),
                    a.each(e, 
                    function(b, c) {
                        c = a(c);
                        var d = c.find(".event-spacers"),
                        e = d.find(".event-spacer"),
                        f = i.data("guid");
                        if (o < e.length) e.eq(o).attr("data-guid", f).data("guid", f);
                        else for (var b = 0; b < o - e.length + 1; b += 1) {
                            var g = a("<div/>", {
                                "class": "event-spacer"
                            }).appendTo(d);
                            b == o - e.length && g.attr("data-guid", f)
                        }
                    })
                }),
                this.el.find(".cal-event.new").removeClass("new")
            }
            if (h == 0) {
                var l = d.find(".day[data-date=" + f.format("YYYY-MM-DD") + "]"),
                q = l.children(".day-events").show(),
                r = mcw.template("tpl-event", {
                    start: b.starts_at,
                    end: b.ends_at,
                    guid: b.guid,
                    author: b.creator_guid,
                    content: b.content,
                    calendar: b.caleventable_guid,
                    calendarName: b.caleventable_name,
                    color: b.calendar_color
                }).appendTo(q);
                return r.data("event", b),
                r
            }
            return null
        },
        removeEvent: function(b, c) {
            b = b.guid ? b.guid: b;
            var d = -1;
            a.each(this.events, 
            function(a, c) {
                c.guid == b && (d = a)
            }),
            d > -1 && this.events.splice(d, 1);
            var e = this.el.find(".cal-event[data-guid=" + b + "]");
            if (c !== !1) {
                var f = this;
                c == "anim" ? e.fadeOut(150, 
                function() {
                    f.renderEvents()
                }) : this.renderEvents()
            }
            return e
        },
        removeTodo: function(b, c) {
            b = b.guid ? b.guid: b;
            var d = -1;
            a.each(this.todos, 
            function(a, c) {
                c.guid == b && (d = a)
            }),
            d > -1 && this.todos.splice(d, 1);
            var e = this.el.find(".cal-todo[data-guid=" + b + "]");
            return c !== !1 && e.fadeOut(150, 
            function() {
                e.siblings(".cal-todo").length || e.parent(".day-todos").hide(),
                e.remove()
            }),
            e
        },
        replaceEvent: function(b, c, d) {
            var e = b.guid ? b.guid: b,
            f = -1;
            return a.each(this.events, 
            function(a, b) {
                e == b.guid && (f = a)
            }),
            f > -1 ? this.events.splice(f, 1, c) : this.events.push(c),
            d !== !1 && this.renderEvents(),
            c ? this.el.find(".cal-event[data-guid=" + c.guid + "]") : null
        },
        replaceTodo: function(b, c, d) {
            var e = b.guid ? b.guid: b,
            f = -1;
            return a.each(this.todos, 
            function(a, b) {
                e == b.guid && (f = a)
            }),
            f > -1 ? this.todos.splice(f, 1, c) : this.todos.push(c),
            d !== !1 && this.renderTodos(),
            c ? this.el.find(".cal-todo[data-guid=" + c.guid + "]") : null
        }
    }),
    window.mcw || (mcw = {}),
    a.extend(mcw, {
        calendar: function(a, c) {
            return new b(a, c)
        }
    })
} (jQuery),
function(a) {
    function c(b, c) {
        var d = a(b).data("sort") * 1,
        e = a(c).data("sort") * 1;
        return d - e
    }
    function d(b, c) {
        var d = a(b).data("sort") * 1,
        e = a(c).data("sort") * 1;
        return e - d
    }
    a.extend(window.mcw, {
        live: function(a) {
            if (a === !1) {
                clearInterval(mcw.liveInterval),
                mcw.liveInterval = null,
                mcw.liveRequest && (mcw.liveRequest.abort(), mcw.liveRequest = null);
                return
            }
            mcw.live(!1);
            var b = mcw.urlParts(location.href).path;
            mcw.liveInterval = setInterval(mcw.liveHandler, 2e4)
        },
        liveHandler: function() {
            var c = a(".workspace .page:last");
            if (!c.length) return;
            var d = mcw.urlParts(location.href),
            e = c.data("since");
            mcw.liveRequest = a.ajax({
                url: d.path + "live/" + d.search,
                type: "get",
                data: {
                    since: e,
                    conn_guid: a("#conn-guid").val()
                },
                success: function(c) {
                    var d = a(".workspace .page:last"),
                    e = d.attr("id");
                    d.attr("data-since", c.server_time).data("since", c.server_time),
                    a("#server-time").val(c.server_time),
                    mcw.lastUpdated = moment();
                    if (e && mcw.pages[e] && mcw.pages[e].update && mcw.pages[e].update(c) === !1) return;
                    a.each(b, 
                    function(a, b) {
                        b(c)
                    })
                },
                error: function(b, c, e) {
                    if (c === "abort") return;
                    mcw.clearPageCache(d.href);
                    var f = a.parseJSON(b.responseText);
                    console && console.error && console.error(f.msg)
                }
            })
        }
    });
    var b = {
        unread: function(b) {
            b.unread !== undefined && a("#notification-count").toggleClass("unread", b.unread > 0).text(b.unread)
        },
        d18n: function(b) {
            if (b.d18n && mcw.d18n.support() && mcw.d18n.permitted() && a("#d18n-enabled").val() === "true") {
                var c = a.now(),
                d = localStorage.last_d18n_req * 1;
                if (d && c - d < 9900) return;
                localStorage.last_d18n_req = c,
                a.each(b.d18n, 
                function(a, b) {
                    mcw.d18n.show(b)
                })
            }
        },
        unread_notis: function(b) {
            var c = a(".noti-pop-list");
            if (!c.length) return;
            b.unread_notis ? (c.html(b.unread_notis).show(), a(".noti-pop-empty").hide(), mcw.adjustDate(c)) : (c.html("").hide(), a(".noti-pop-empty").show())
        },
        docs: function(b) {
            var c = a(".doc-list");
            if (!c.length || !b.docs) return;
            var d = [];
            b.docs.deleted && b.docs.deleted.length && (a.each(b.docs.deleted, 
            function(b, d) {
                c.find(".doc[data-guid=" + d + "]").fadeOut(function() {
                    a(this).remove()
                })
            }), a(".init.init-docs").hide()),
            b.docs.created && b.docs.created.length && a.each(b.docs.created, 
            function(b, e) {
                var f = a(e),
                g = f.data("guid");
                c.find("[data-guid=" + g + "]").remove(),
                c.prepend(f),
                d.push(f),
                mcw.adjustDate(f)
            }),
            b.docs.updated && b.docs.updated.length && a.each(b.docs.updated, 
            function(b, e) {
                var f = a(e),
                g = f.data("guid");
                f.find("[data-guid=" + g + "]").remove(),
                c.prepend(f),
                d.push(f),
                mcw.adjustDate(f)
            }),
            a(d).each(function() {
                mcw.highlight(a(this))
            })
        },
        topics: function(b) {
            var c = a(".messages");
            if (!c.length || !b.topics) return;
            var d = [],
            e = !1;
            b.topics.deleted && b.topics.deleted.length && (a.each(b.topics.deleted, 
            function(b, d) {
                c.find(".message[data-guid=" + d + "]").fadeOut(function() {
                    a(this).remove()
                })
            }), a(".init.init-discussion").hide()),
            b.topics.created && b.topics.created.length && (a.each(b.topics.created, 
            function(b, e) {
                var f = a(e),
                g = f.data("guid");
                c.find("[data-guid=" + g + "]").remove(),
                c.prepend(f),
                d.push(f),
                mcw.adjustDate(f)
            }), e = !0),
            b.topics.updated && b.topics.updated.length && (a.each(b.topics.updated, 
            function(b, e) {
                var f = a(e),
                g = f.data("guid");
                c.find("[data-guid=" + g + "]").remove(),
                c.prepend(f),
                d.push(f),
                mcw.adjustDate(f)
            }), e = !0);
            if (e) {
                var f = c.find(".message"),
                g = "YYYY-MM-DD HH:mm:ss Z";
                f.sort(function(b, c) {
                    var d = moment(a(b).data("last-comment-at"), g),
                    e = moment(a(c).data("last-comment-at"), g);
                    return e.diff(d)
                }),
                c.prepend(f)
            }
            var h = a(".workspace .page:last");
            h.is("#page-project") && (c.find(".message:gt(2)").hide(), c.find(".message:lt(3)").show());
            if (b.topics.count) {
                var i = a(".link-more-topics");
                i.length && i.text(i.text().replace(/\d+/, b.topics.count))
            }
            a(d).each(function() {
                mcw.highlight(a(this))
            })
        },
        todolists: function(b) {
            var c = a(".todolists");
            if (!c.length || !b.todolists) return;
            var e = [],
            f = !1;
            b.todolists.created && b.todolists.created.length && (a.each(b.todolists.created, 
            function(b, d) {
                var f = a(d.html),
                g = c.find(".todolist[data-guid=" + f.data("guid") + "]");
                g.length ? g.replaceWith(f) : c.append(f),
                e.push(f.find(".title"))
            }), a(".init-todo-empty, .init-todo-completed").remove(), f = !0),
            b.todolists.deleted && b.todolists.deleted.length && a.each(b.todolists.deleted, 
            function(b, d) {
                c.find(".todolist[data-guid=" + d + "]").fadeOut(function() {
                    a(this).remove()
                })
            }),
            b.todolists.updated && b.todolists.updated.length && a.each(b.todolists.updated, 
            function(a, b) {
                var d = c.find("[data-guid=" + b.guid + "]");
                b.name && d.find(".title h4 a").text(b.name),
                b.position && (d.data("sort", b.position), f = !0),
                e.push(d.find(".title h4 a"))
            });
            if (f) {
                var g = c.children(".todolist");
                g.sort(d),
                c.append(g)
            }
        },
        todos: function(b) {
            if (!b.todos) return;
            var d = [],
            e = [];
            b.todos.created && b.todos.created.length && (a.each(b.todos.created, 
            function(b, c) {
                if (!c.list) return;
                var f = a(c.html),
                g = f.data("guid"),
                h = a(".todolist[data-guid=" + c.list + "]"),
                i = h.find(".todo[data-guid=" + g + "]"),
                j = f.hasClass("completed");
                i.length && i.remove(),
                mcw.setTodoFilter(),
                h.find(j ? ".todos-completed": ".todos-uncompleted").append(f),
                d.push(f),
                e.push(h[0]),
                a(".workspace .page:last").trigger("todocreate", [c, h]),
                mcw.adjustTodo(f),
                mcw.adjustDate(f)
            }), a(".init-todo-empty, .init-todo-completed").remove()),
            b.todos.deleted && b.todos.deleted.length && a.each(b.todos.deleted, 
            function(b, c) {
                a(".todo[data-guid=" + c + "]").fadeOut(function() {
                    var b = a(this),
                    c = b.closest(".todolist");
                    b.remove(),
                    a(".workspace .page:last").trigger("todoremove", [b, c])
                })
            }),
            b.todos.updated && b.todos.updated.length && a.each(b.todos.updated, 
            function(b, c) {
                var f = a(c.html),
                g = f.data("guid"),
                h = a(".todo[data-guid=" + g + "]"),
                i = f.hasClass("completed"),
                j;
                c.list ? j = a(".todolist[data-guid=" + c.list + "]") : j = h.closest(".todolist"),
                i ? h.fadeOut(function() {
                    j.find(".todos-completed").prepend(f),
                    h.remove(),
                    a(".workspace .page:last").trigger("todocomplete", [f, j]),
                    mcw.adjustDate(f),
                    mcw.adjustTodo(f)
                }) : (h.remove(), j.find(".todos-uncompleted").append(f), a(".workspace .page:last").trigger("todoreopen", [f, j]), mcw.adjustDate(f), mcw.adjustTodo(f)),
                mcw.setTodoFilter();
                if (!j.length) return;
                c.position_changed || d.push(f),
                e.push(j[0])
            }),
            a.each(a.unique(e), 
            function(b, d) {
                var e = a(d).find(".todos-uncompleted"),
                f = a(d).find(".todos-completed"),
                g = e.children(".todo");
                completedEls = f.children(".todo"),
                g.sort(c),
                completedEls.sort(c),
                e.append(g),
                f.append(completedEls)
            }),
            a(d).each(function() {
                mcw.highlight(a(this))
            })
        },
        files: function(b) {
            var c = a(".file-list:first");
            if (!c.length || !b.files) return;
            var d = [];
            b.files.created && b.files.created.length && (a.each(b.files.created, 
            function(b, e) {
                var f = a(e),
                g = f.data("guid");
                a(".file[data-guid=" + g + "]").length || (c.prepend(f).closest(".day").show(), d.push(f))
            }), a(".init.init-file").remove()),
            b.files.deleted && b.files.deleted.length && a.each(b.files.deleted, 
            function(b, c) {
                a(".file[data-guid=" + c + "]").fadeOut(function() {
                    var b = a(this).closest(".file-list");
                    a(this).remove(),
                    b.find(".file").length || b.closest(".day").hide()
                })
            }),
            b.files.updated && b.files.updated.length && a.each(b.files.updated, 
            function(b, e) {
                var f = a(e),
                g = f.data("guid"),
                h = a(".file[data-guid=" + g + "]");
                h.length ? h.replaceWith(f) : c.prepend(f),
                d.push(f)
            });
            var e = a(".workspace .page:last");
            e.is("#page-project") && (c.find(".file:gt(4)").hide(), c.find(".file:lt(5)").show());
            if (b.files.count) {
                var f = a(".link-more-files");
                f.length && f.text(f.text().replace(/\d+/, b.files.count))
            }
        },
        folders: function(b) {
            var c = a(".folders");
            if (!c.length || !b.dirs) return;
            var d = [];
            b.dirs.created && b.dirs.created.length && a.each(b.dirs.created, 
            function(b, e) {
                var f = a(e);
                c.append(f),
                d.push(f)
            }),
            b.dirs.deleted && b.dirs.deleted.length && a.each(b.dirs.deleted, 
            function(b, d) {
                c.find(".link-folder[data-guid=" + d + "]").fadeOut(function() {
                    a(this).remove()
                })
            }),
            b.dirs.updated && b.dirs.updated.length && a.each(b.dirs.updated, 
            function(b, e) {
                var f = a(e),
                g = f.data("guid"),
                h = c.find(".link-folder[data-guid=" + g + "]");
                h.length ? h.replaceWith(f) : c.append(f),
                d.push(f)
            })
        },
        comments: function(b) {
            var c = a(".comments");
            if (!c.length || !b.comments) return;
            var d = [];
            b.comments.created && b.comments.created.length && a.each(b.comments.created, 
            function(b, e) {
                var f = a(e);
                c.find(".comment-form").before(f),
                d.push(f),
                mcw.adjustDate(f)
            }),
            b.comments.deleted && b.comments.deleted.length && a.each(b.comments.deleted, 
            function(b, d) {
                c.find("#" + d).fadeOut(function() {
                    a(this).remove()
                })
            }),
            b.comments.updated && b.comments.updated.length && a.each(b.comments.updated, 
            function(b, e) {
                var f = a(e),
                g = f.attr("id"),
                h = c.find("#" + g);
                h.length ? h.replaceWith(f) : c.append(f),
                d.push(f),
                mcw.adjustDate(f)
            }),
            a(d).each(function() {
                mcw.highlight(a(this))
            })
        }
    }
} (jQuery),
function(a) {
    a(function() {
        mcw.preloadImages(["/assets/blank-3dbe121a376a181f0fe840fb1daeeb51.gif", "/assets/loading-b82a3823017fd8cdd7a595e38a196189.gif", "/assets/icon-enter-key-85ea1f3d6deb90d9a48d4cdc5e34298a.png", "/assets/back-to-top-aa485503b416e67b699c82ee4f7638d0.png", "/assets/tiny-loading-e8bd9af828c29751e76f3d73d4f9e005.gif", "/assets/todo-actions-icon-03198277d00fa322f26853a9fcac697a.png", "/assets/todo-actions-icon-today-a8bd827d9d61e3a2d8d06303e631d79c.png", "/assets/popover-arrow-eb2c165f449ad2547233a5fdffc20730.png", "/assets/popover-arrow-gray-57a0cf7ea84aa3cff6ef5954f2d5145c.png"]),
        a(document).on("click", "#link-feedback", mcw.feedbackClick).on("click", "*[data-origin-src]", 
        function(b) {
            var c = a(this),
            d = mcw.metaKey(b);
            d ? window.open(c.attr("data-origin-src")) : mcw.viewImage(c)
        }).on("mouseenter", "*[tooltip]", 
        function(b) {
            var c = a(b.currentTarget),
            d = c.attr("tooltip");
            mcw.tooltip(c, d)
        }).on("mouseleave", "*[tooltip]", 
        function(b) {
            var c = a(b.currentTarget);
            mcw.tooltip(c, "hide")
        }).on("beforestack", 
        function(b) {
            a("*[tooltip]").trigger("mouseleave");
            var c = a(".popover-target");
            c.each(function() {
                mcw.popover(a(this), "hide")
            }),
            a(document).trigger("mousedown.notipop");
            var d = !0;
            a(".editor").each(function(b, c) {
                var e = a(c).closest(".form");
                if (e.find(".attachment.uploading:visible").length && !window.confirm("有文件正在上传中，离开当前页将会自动放弃上传，确定要离开？")) {
                    d = !1;
                    return
                }
                e.find(".btn-cancel-update-comment, .btn-cancel-create-comment, #link-cancel-post").click()
            });
            if (!d) return d;
            var e = a(".form-edit-doc:visible");
            if (e.length) {
                if (!e.data("saved") && !window.confirm("离开本页，还没有保存的内容可能会丢失，确定要离开？")) return ! 1;
                mcw.destroyDocEditor()
            }
            mcw.scrollLoad(!1),
            a(".header .nav li.active").removeClass("active")
        }).on("afterstack", 
        function(a, b) {
            mcw.adjustDate(b),
            mcw.adjustPermission(b)
        }).on("click", ".noti-pop .noti-pop-list .notice .link", 
        function(b) {
            var c = a(this).closest(".notice").data("notification-guid");
            mcw.readNotification(c)
        }).on("click", ".back-to-top", 
        function(a) {
            a.preventDefault(),
            mcw.scrollTo("body")
        }).on("ajax:success", ".detail-action-star", 
        function(b) {
            b.preventDefault();
            var c = a(b.target);
            c.hasClass("stared") ? c.removeClass("stared").text("加星标").attr("title", "加星标") : c.addClass("stared").text("取消星标").attr("title", "取消星标")
        }).on("ajax:success", ".star-action", 
        function(b) {
            b.preventDefault();
            var c = a(b.target).parent(".minicard");
            c.fadeOut("fast", 
            function() {
                this.remove()
            })
        }).on("click", ".detail-action-move", 
        function(b) {
            b.preventDefault();
            var c = a(b.target),
            d = c.next(".confirm"),
            e = d.find(".choose-projects"),
            f = d.find("button[type=submit]"),
            g = d.closest(".item");
            g.addClass("expanded");
            if (!e.is(".loading")) return;
            a.ajax({
                url: "/members/" + mcw.me.guid + "/projects/",
                type: "get",
                dataType: "json",
                success: function(b) {
                    var c = "",
                    d = e.data("project");
                    if (b.length === 1 && b[0].guid === d) {
                        e.find("option").text("没有可选项目...");
                        return
                    }
                    a.each(b, 
                    function(a, b) {
                        d !== b.guid && (c += '<option value="' + b.guid + '">' + mcw.encodeHtml(b.name) + "</option>")
                    }),
                    e.html(c).prop("disabled", !1).removeClass("loading"),
                    f.prop("disabled", !1)
                }
            })
        }).on("click", ".detail-actions .confirm .cancel", 
        function(b) {
            b.preventDefault();
            var c = a(b.target);
            c.closest(".item").removeClass("expanded")
        }).on("ajax:beforeSend", ".form-move", 
        function(b, c, d) {
            a(this).find(".cancel").hide()
        }).on("ajax:complete", ".form-move", 
        function() {
            a(this).find(".cancel").show()
        }).on("ajax:success", ".form-move", 
        function(b, c) {
            if (c.success) {
                var d = a(this),
                e = d.closest(".detail-actions"),
                f = e.closest(".page"),
                g = a('<div class="mask hide"></div>'),
                h = a('<div class="moved hide"><div class="inr">移动完成，这个条目已被移到 <em>' + c.proj_name + '</em> 中，<a data-nocache data-stack data-stack-root data-parent-name="' + c.proj_name + '" data-parent-url="' + c.proj_url + '" href="' + c.url + '">现在就去查看 →</a></div></div>');
                e.fadeOut("fast", 
                function() {
                    e.remove()
                }),
                g.appendTo(f).fadeIn(function() {
                    h.appendTo(f).slideDown()
                })
            }
        }).on("click", ".btn-radios .btn", 
        function(b) {
            var c = a(b.currentTarget);
            c.siblings(".btn.active").removeClass("active").end().addClass("active")
        }).on("click", ".link-member-menu", 
        function(b) {
            var c = a(b.currentTarget),
            d = mcw.template("tpl-member-menu");
            mcw.popover(c, {
                content: d,
                position: "bottom-left",
                cls: "popover-member-menu",
                offset: {
                    top: 5,
                    left: 0
                }
            })
        }),
        function() {
            var b = 0,
            c = null,
            d = a(document);
            a(window).bind("resize.backTop", 
            function(c) {
                b = a(this).height()
            }).resize(),
            d.bind("scroll.backTop", 
            function(e) {
                d.scrollTop() > b * 1.5 ? c || (c = a('<a class="back-to-top" href="#" title="返回顶部">返回顶部</a>').appendTo(".page:last")) : c && (c.remove(), c = null)
            })
        } (),
        a("#notification-count").on("mousedown", 
        function() {
            var b = a(".noti-pop");
            return b.hasClass("on") ? a(document).trigger("mousedown.notipop") : (b.addClass("on"), a(document).unbind(".notipop").bind("mousedown.notipop", 
            function(c) {
                var d = a(c.target);
                d.closest(".noti-pop").length || (b.removeClass("on"), a(document).unbind(".notipop"))
            })),
            !1
        }),
        a("#noti-mark-read").click(function(b) {
            b.preventDefault(),
            a("#notification-count").text(0).removeClass("unread"),
            a(".noti-pop-list").empty().hide(),
            a(".noti-pop-empty").show(),
            a(document).trigger("mousedown.notipop"),
            a.ajax({
                url: "/notifications/read_all/"
            })
        }),
        a(".search-wrap").on("click", 
        function(a) {
            return ! 1
        }).on("click", ".link-search", 
        function(b) {
            var c = a(b.currentTarget).closest(".search-wrap"),
            d = a(document),
            e = a("#form-search");
            if (c.hasClass("active")) return;
            return c.addClass("active").find("#txt-search").focus(),
            d.one("click.search", 
            function(a) {
                c.removeClass("active").find("#txt-search").val(""),
                d.unbind("keyup.search")
            }).bind("keyup.search", 
            function(a) {
                a.keyCode == 27 && (a.preventDefault(), d.trigger("click.search"))
            }),
            !1
        }),
        a("#txt-search").bind("keyup DOMAutoComplete", 
        function() {
            a.trim(a(this).val()).length ? a(this).addClass("enter") : a(this).removeClass("enter")
        }).on("keydown", 
        function(b) {
            var c = a(this);
            if (b.which == 13) {
                var d = a.trim(c.val());
                return d ? (a("#page-search-result").empty().addClass("loading"), mcw.stack({
                    url: a("#form-search").attr("action") + "?keyword=" + encodeURIComponent(d),
                    root: !0
                }), c.val(d).get(0).select()) : c.val(""),
                !1
            }
        }).on("focus", 
        function(b) {
            var c = a(b.currentTarget).closest(".search-wrap"),
            d = a(document),
            e = a("#form-search");
            if (c.hasClass("active")) return;
            return c.addClass("active"),
            d.one("click.search", 
            function(a) {
                c.removeClass("active").find("#txt-search").val(""),
                d.unbind("keyup.search")
            }).bind("keyup.search", 
            function(a) {
                a.keyCode == 27 && (a.preventDefault(), d.trigger("click.search"))
            }),
            !1
        }),
        a.fn.placeholder && a("input[placeholder], textarea[placeholder]").placeholder(),
        mcw.me = {
            guid: a("#member-guid").val(),
            nickname: a("#member-nickname").val(),
            avatar: a("#member-avatar").val(),
            admin: a("#member-admin").length > 0 ? !0: !1,
            owner: a("#member-owner").length > 0 ? !0: !1
        };
        var b = a(".workspace .page:last"),
        c = b.attr("id");
        c && mcw.pages[c] && mcw.pages[c].init(b),
        mcw.me.guid && mcw.live(),
        mcw.me.avatar && mcw.preloadImages([mcw.me.avatar]),
        mcw.adjustDate(b),
        mcw.adjustPermission(b)
    }),
    a.extend(window.mcw, {
        pages: {},
        members: {},
        feedbackClick: function(a) {
            a.preventDefault();
            var b = mcw.dialog({
                el: mcw.template("tpl-feedback")
            });
            b.find("#txt-feedback").focus(),
            b.find("#link-cancel-feedback").click(function(a) {
                a.preventDefault(),
                mcw.dialog("hide")
            }),
            b.find("form.form-feedback").on("ajax:success", 
            function(a) {
                mcw.message({
                    msg: "感谢您的反馈，我们会尽快处理。"
                })
            })
        },
        d18n: {
            support: function() {
                return a.browser.safari ? !!window.Notification: a.browser.chrome ? !!window.webkitNotifications: !1
            },
            permitted: function() {
                if (!mcw.d18n.support()) return ! 1;
                if (a.browser.safari) return "granted" === Notification.permission || a.isFunction(Notification.permissionLevel) && Notification.permissionLevel();
                if (a.browser.chrome) return webkitNotifications.checkPermission() == 0
            },
            requestPermission: function(b) {
                if (!mcw.d18n.support()) return;
                b = b || 
                function() {},
                a.browser.safari ? Notification.requestPermission(b) : a.browser.chrome && webkitNotifications.requestPermission(b)
            },
            show: function(b) {
                if (!mcw.d18n.support()) return;
                var c = null;
                a.browser.safari ? c = new Notification(b.title, b.content) : a.browser.chrome && (c = webkitNotifications.createNotification("/assets/icon-tower-479344ffcf99c7852fa40955302e15ac.png", b.title, b.content)),
                c.onclick = function() {
                    mcw.stack({
                        url: b.url,
                        root: !0,
                        parent: {
                            name: "全部通知",
                            url: "/teams/" + b.team + "/notifications/"
                        }
                    }),
                    mcw.readNotification(b.guid),
                    window.focus(),
                    this.cancel()
                },
                mcw.playAudio("notification", "/assets/notification-cc3cfeed3b317b42296450911fae479a.mp3"),
                c.show(),
                setTimeout(function() {
                    c && c.cancel()
                },
                1e4)
            }
        },
        metaKey: function(a) {
            var b = /Mac/.test(navigator.userAgent);
            return b ? a.metaKey: a.ctrlKey
        },
        readNotification: function(b) {
            var c = a("#notification-count"),
            d = Math.max(0, c.text() * 1 - 1);
            c.toggleClass("unread", d > 0).text(d);
            var e = a(".noti-pop-list");
            e.find(".notice[data-notification-guid=" + b + "]").remove(),
            e.find(".notice").length || (e.html("").hide(), a(".noti-pop-empty").show())
        },
        adjustDate: function(b) {
            a("[data-abstime]", b).each(function() {
                var b = a(this);
                b.text(mcw.prettyDate(b.data("abstime"), "YYYY-MM-DD HH:mm:ss Z")).removeAttr("data-abstime")
            })
        },
        adjustPermission: function(b) {
            b = a(b).is("[data-visible-to]") ? a(b) : a("[data-visible-to]", b),
            b.each(function() {
                var b = a(this).hide(),
                c = b.data("visible-to").split(",");
                mcw.me.admin && a.inArray("admin", c) > -1 && b.show();
                if (a.inArray("creator", c) > -1) {
                    var d = b.closest("[data-author-guid]");
                    d.length && mcw.me.guid == d.data("author-guid") && b.show()
                }
            })
        },
        adjustProjInfo: function() {
            var b = a(".workspace .page:last .project-info"),
            c = a(".workspace .sheet-header .link-parent-sheet");
            c.each(function() {
                var c = a(this).text(),
                d = b.find("a:contains(" + c + ")");
                d.length && d.closest("span").remove()
            }),
            b.find("span").length || b.remove()
        },
        adjustStar: function() {
            var b = a(".detail-action-star"),
            c = b.data("itemtype"),
            d = b.data("itemid");
            if (!b.length || !c || !d) return;
            a.ajax({
                url: "/members/" + mcw.me.guid + "/has_star/",
                type: "get",
                data: {
                    starable_type: c,
                    starable_id: d
                },
                success: function(a) {
                    a.has_star && b.addClass("stared").text("取消星标").attr("title", "取消星标")
                }
            })
        }
    });
    if (a.ui && a.ui.sortable) {
        var b = a.ui.sortable.prototype._mouseStart;
        a.ui.sortable.prototype._mouseStart = function(a, c, d) {
            this._trigger("beforestart", a, this._uiHash()),
            b.apply(this, [a, c, d])
        };
        var c = a.fn.scrollParent;
        a.fn.scrollParent = function() {
            var b = c.apply(this, arguments);
            return b.is("html") ? a(document) : b
        }
    }
    if (a.ui && a.ui.draggable) {
        var d = a.ui.draggable.prototype._mouseStart;
        a.ui.draggable.prototype._mouseStart = function(a, b, c) {
            this._trigger("beforestart", a, this._uiHash()),
            d.apply(this, [a, b, c])
        }
    }
} (jQuery),
function(a) {
    function b(b) {
        a(".todolist-form.new").show().find(".todolist-name").placeholder().focus(),
        a(".init-todo-empty, .init-todo-completed").hide()
    }
    function c(b) {
        a(".todolist-form.new").find(".todolist-name").val("").removeClass("error").end().hide(),
        a(".init-todo-empty, .init-todo-completed").show()
    }
    function e(b) {
        var c = a(this).data("request-members");
        mcw.members || (mcw.members = {}),
        mcw.members[c] ? mcw.updateMemberList(".todo-assignee[disabled]", mcw.members[c]) : d || (d = a.ajax({
            url: "/projects/" + c + "/mates",
            type: "get",
            success: function(a) {
                mcw.members[c] = a,
                mcw.updateMemberList(".todo-assignee[disabled]", a),
                d = null
            }
        }))
    }
    function f(b) {
        function l() {
            if (c.hasClass("link-todo-due")) {
                var b = e.find(".todo-due-date").val();
                c.find(".due").text(b || "没有截止时间").attr("data-date", b || ""),
                c.next(".todo-due-date").val(b ? moment(b).valueOf() : "")
            } else {
                var d = c.closest(".todo"),
                f = d.find(".todo-content a").text(),
                g = e.find(".todo-assignee").val(),
                b = e.find(".todo-due-date").val(),
                h = {
                    todo_content: f,
                    assignee_guid: g,
                    due_at: b ? moment(b).valueOf() : undefined
                };
                mcw.tinyLoading(c),
                a.ajax({
                    url: d.find(".todo-actions .edit").attr("href"),
                    data: h,
                    success: function(b) {
                        var c = a(b.html);
                        d.replaceWith(c),
                        mcw.adjustTodo(c),
                        mcw.setTodoFilter(),
                        a(".workspace .page:last").trigger("todoupdate", [c])
                    }
                })
            }
            mcw.popover(c, "hide")
        }
        var c = a(this);
        if (c.hasClass("disabled")) return;
        var d = c.data("popover");
        if (d) mcw.popover(c, "hide");
        else {
            var e = mcw.template("tpl-todo-popover"),
            f = c.find(".due").attr("data-date") || null,
            g = e.find(".todo-due-date").val(f);
            if (c.hasClass("link-todo-due")) e.find(".select-assignee").remove(),
            e.find("h3").remove();
            else {
                var h = c.find(".assignee").attr("data-guid") || -1,
                i = c.closest(".todo").data("project-guid"),
                j = e.find(".todo-assignee").on("change", 
                function(a) {
                    l()
                });
                j.attr("data-selected-member", h),
                mcw.members[i] && j.is("[disabled]") && mcw.updateMemberList(j, mcw.members[i])
            }
            e.find(".shortcuts a").click(function(b) {
                b.preventDefault();
                var c = a(this),
                d = mcw.now().startOf("day"),
                e = "";
                c.hasClass("today") ? e = d.format("YYYY-MM-DD") : c.hasClass("tomorrow") ? e = d.clone().add("days", 1).format("YYYY-MM-DD") : c.hasClass("this-week") ? (e = d.clone(), e.day() == 0 ? e = e: e = e.day(7), e = e.format("YYYY-MM-DD")) : c.hasClass("next-week") && (e = d.clone(), e.day() == 0 ? e = e.day(7) : e = e.day(14), e = e.format("YYYY-MM-DD")),
                k.setSelectedDate(e),
                l()
            }),
            f ? e.find(".no-due-date").click(function(a) {
                a.preventDefault(),
                k.setSelectedDate(null),
                l()
            }) : e.find(".no-due-date").remove();
            var k = mcw.datepicker(g, {
                inline: !0,
                onSelect: function(a) {
                    l()
                }
            });
            mcw.popover(c, {
                content: e
            })
        }
        return ! 1
    }
    function g(b, c) {
        var d = a(c.html);
        a(".todolists").prepend(d),
        a(b.target).find(".btn-cancel-todolist").click().end().find(".todolist-name").val(""),
        d.find(".btn-new-todo").click(),
        mcw.sortTodos(d.find(".todos-uncompleted")),
        a(".init-todo-empty, .init-todo-completed").remove(),
        a(".filters-wrap").show()
    }
    function h(b) {
        b.keyCode === 13 ? (b.preventDefault(), a(b.currentTarget).find("button[type=submit]").click()) : b.keyCode === 27 && (b.preventDefault(), a(b.currentTarget).find(".btn-cancel-todolist, .btn-cancel-update-todolist").click())
    }
    function i(b) {
        b.preventDefault();
        var c = a(b.currentTarget),
        d = c.parent(),
        e = d.next(".todo-form.new");
        if (!e.length) {
            e = mcw.template("tpl-todo-form").insertAfter(d),
            e.addClass("new").find("form").attr("action", c.data("url")).find("textarea").autosize().end().find(".edit-buttons").remove();
            var f = c.data("request-members"),
            g = e.find(".todo-assignee").attr("data-selected-member", "-1");
            mcw.members[f] && g.is("[disabled]") && mcw.updateMemberList(g, mcw.members[f])
        }
        e.show().find("textarea").placeholder().focus(),
        d.hide()
    }
    function j(b) {
        var c = a(b.currentTarget),
        d = c.parents(".todo-form.new"),
        e = d.prev();
        d.hide().find(".todo-content").val("").removeClass("error"),
        e.show()
    }
    function k(b, c) {
        var d = a(c.html),
        e = a(b.target);
        e.find("textarea.todo-content").val("").focus().trigger("autosize").end().closest(".todolist").find(".todos-uncompleted").append(d),
        a(".workspace .page:last").trigger("todocreate", [d]),
        mcw.setTodoFilter(),
        mcw.adjustTodo(d)
    }
    function l(b, c, d) {
        a(b.target).closest(".page").attr("id") == "page-todolist" && mcw.globalLoading("正在删除任务列表...")
    }
    function m(b, c) {
        var d = a(b.target).closest(".todolist");
        d.closest(".page").attr("id") == "page-todolist" ? (mcw.globalLoading("hide"), mcw.stack({
            url: "/projects/" + d.data("project-guid") + "/",
            root: !0
        })) : d.fadeOut(function() {
            a(this).remove()
        })
    }
    function n(b, c) {
        var d = a(c.html),
        e = a(b.target).closest(".title");
        e.hide().after(d),
        mcw.selectText(d.find(".todolist-name").focus())
    }
    function o(b) {
        a(b.currentTarget).parents(".todolist-form.edit").prev(".title").show().end().remove()
    }
    function p(b, c) {
        var d = a(this),
        e = d.closest(".todolist"),
        f = e.find(".todolist-auto-archive-tip"),
        g;
        d.toggleClass("work"),
        d.is(".work") ? (g = d.data("work-title"), f.hide()) : (g = d.data("title"), e.find(".todos-uncompleted .todo").length || f.show()),
        d.attr("title", g)
    }
    function q(b, c) {
        var d = a(this),
        e = d.closest(".todolist"),
        f = e.find(".todolist-auto-archive-tip"),
        g = e.find(".todolist-actions .stick");
        g.addClass("work"),
        g.attr("title", g.data("work-title")),
        f.hide()
    }
    function r(b, c, d, e) {
        var f = a(b.target),
        g = f.closest(".todolist").find(".title h4 a");
        g.text(f.find("input.todolist-name").val()).closest(".title").show(),
        f.parent(".todolist-form.edit").remove()
    }
    function s(b, c) {
        if (c.success) {
            var d = a(this),
            e = d.parents(".todolist:first"),
            f = e.closest(".page");
            f.is("#page-todolist") ? e.addClass("todolist-completed") : e.fadeOut(function() {
                if (f.is("#page-todolists")) {
                    var b = a(".todolists-completed");
                    b.find("a").length && b.append(","),
                    b.append(e.find(".title h4 a"))
                }
                a(this).remove()
            })
        }
    }
    function t(b, c) {
        if (c.success) {
            var d = a(this),
            e = d.parents(".todolist:first");
            e.removeClass("todolist-completed")
        }
    }
    function u(b, c, d) {
        a(b.target).closest(".page").attr("id") == "page-todo" && mcw.globalLoading("正在删除任务...")
    }
    function v(b, c) {
        var d = a(b.target).closest(".todo");
        d.closest(".page").is("#page-todo") ? (mcw.globalLoading("hide"), mcw.stack({
            url: "/projects/" + d.data("project-guid") + "/",
            root: !0
        })) : d.fadeOut(function() {
            var b = d.closest(".todolist");
            d.remove(),
            a(".workspace .page:last").trigger("todoremove", [d, b])
        })
    }
    function w(b) {
        b.preventDefault();
        var c = a(b.currentTarget),
        d = c.closest(".todo"),
        e = d.next(".todo-form.edit");
        if (!e.length) {
            e = mcw.template("tpl-todo-form").insertAfter(d),
            e.addClass("edit").find("form").attr("action", c.attr("href")).end().find(".create-buttons").remove();
            var f = c.data("request-members"),
            g = e.find(".todo-assignee").attr("data-selected-member", d.find(".assignee").data("guid") || -1);
            mcw.members[f] && g.is("[disabled]") && mcw.updateMemberList(g, mcw.members[f])
        }
        var h = d.find(".todo-assign-due .due").data("date") || null;
        e.find(".link-todo-due .due").text(h || "没有截止时间").attr("data-date", h),
        h && e.find("input[name=due_at]").val(moment(h).valueOf());
        var i = e.find("textarea").val(d.find(".todo-content a").text());
        mcw.selectText(i),
        e.show().find("textarea").placeholder().autosize(),
        d.hide()
    }
    function x(b) {
        var c = a(b.currentTarget).closest(".todo-form.edit"),
        d = c.find(".link-todo-due"),
        e = d.data("popover");
        e && mcw.popover(d, "hide"),
        c.prev(".todo").show().end().remove()
    }
    function y(b, c, d, e) {
        var f = a(b.target).parents(".todo-form.edit"),
        g = f.prev(".todo"),
        h = a(c.html),
        i = c.assigneeGuid,
        j = a("#page-member");
        f.remove(),
        g.replaceWith(h),
        mcw.setTodoFilter(),
        mcw.adjustTodo(h),
        mcw.adjustDate(h),
        a(".workspace .page:last").trigger("todoupdate", [h]);
        var k = h.find(".todo-content");
        mcw.highlight(k, undefined, k.css("backgroundColor"))
    }
    function A(b) {
        var c = a(b.target),
        d = c.is(":checked"),
        e = c.closest
        (".todo"),
        f = e.closest(".todolist"),
        g = e.data("guid"),
        h = e.data("project-guid"),
        i = "/projects/" + h + "/todos/" + g + (d ? "/complete/": "/reopen/");
        z && (z.abort(), z = null),
        z = a.ajax({
            url: i,
            dataType: "json",
            type: "post",
            success: function(b) {
                function i() {
                    if (a("#page-todo").length) e.replaceWith(c);
                    else {
                        var b = e.closest(".todolist");
                        d ? (e.fadeTo(200, 0), e.slideUp(200, 
                        function() {
                            e.remove(),
                            c.prependTo(g),
                            a(".workspace .page:last").trigger("todocomplete", [e, b])
                        })) : e.fadeOut(function() {
                            e.remove(),
                            c.appendTo(g),
                            mcw.setTodoFilter(),
                            a(".workspace .page:last").trigger("todoreopen", [e, b])
                        })
                    }
                    mcw.adjustDate(c),
                    mcw.adjustTodo(c)
                }
                var c = a(b.html),
                g = d ? f.find(".todos-completed") : f.find(".todos-uncompleted"),
                h = a(".runner.on", e);
                h.length ? (mcw.transitionEnd(e, 
                function() {
                    setTimeout(function() {
                        i()
                    },
                    500)
                }), h.removeClass("on")) : i()
            }
        })
    }
    function B(b) {
        b.keyCode === 13 ? (b.originalEvent.shiftKey && b.preventDefault(), !mcw.metaKey(b) && !b.originalEvent.shiftKey && !b.originalEvent.altKey && (b.preventDefault(), a(b.currentTarget).find("button[type=submit]").click())) : b.keyCode === 27 && (b.preventDefault(), a(b.currentTarget).find(".btn-cancel-todo, .btn-cancel-update-todo").click())
    }
    a(function() {
        var d = a(".wrapper");
        d.on("click", ".btn-new-todolist", b).on("click", ".btn-cancel-todolist", c).on("ajax:success", ".todolist-form.new .form", g).on("keydown", ".todolist-form", h).on("validate", ".todolist-form form", 
        function(a, b, c) {
            var d = {
                valid: !0
            };
            return b ? b.length > 255 && (d.valid = !1, d.errorMsg = "", mcw.message({
                msg: "任务列表名称最长255个字符"
            })) : (d.valid = !1, d.errorMsg = ""),
            d
        }),
        d.on("click", ".btn-new-todo", i).on("click", ".btn-cancel-todo", j).on("click", ".link-todo-due", f).on("ajax:success", ".todo-form.new .form", k).on("keydown", ".todo-form", B).on("validate", ".todo-form form", 
        function(a, b, c) {
            var d = {
                valid: !0
            };
            return b ? b.length > 1e3 && (d.valid = !1, d.errorMsg = "", mcw.message({
                msg: "任务内容最长1000个字符"
            })) : (d.valid = !1, d.errorMsg = ""),
            d
        }),
        d.on("ajax:success", ".todo .todo-actions .run", 
        function(b, c) {
            function g() {
                var b = a(".runner", d).removeClass("on");
                e.replaceWith(d),
                setTimeout(function() {
                    b.addClass("on")
                },
                10),
                mcw.adjustTodo(d),
                a(".workspace .page:last").trigger("todoupdate", [d])
            }
            var d = a(c.html),
            e = a(b.target).closest("li.todo"),
            f = a.grep(a("li.todo.running"), 
            function(b, c) {
                return a(b).find(".assignee").data("guid") === mcw.me.guid
            });
            e.hasClass("hl") && d.addClass("hl"),
            f.length ? (f = a(f[0]), mcw.transitionEnd(f, g), f.find(".pause").hide().end().find(".run").css("display", "inline").end().removeClass("running").find(".runner").removeClass("on")) : g()
        }).on("ajax:success", ".todo .todo-actions .pause", 
        function(b, c) {
            var d = a(c.html),
            e = a(b.target).closest("li.todo");
            e.hasClass("hl") && d.addClass("hl"),
            mcw.transitionEnd(e, 
            function() {
                e.replaceWith(d),
                mcw.adjustTodo(d)
            }),
            a(".runner", e).removeClass("on")
        }),
        d.on("ajax:success", ".todolist-actions .del", m).on("ajax:beforeSend", ".todolist-actions .del", l).on("ajax:success", ".todolist-actions .edit", n).on("click", ".btn-cancel-update-todolist", o).on("ajax:success", ".todolist-actions .stick", p).on("ajax:success", ".todolist-auto-archive-tip .btn-stick", q).on("ajax:success", ".todolist-form.edit .form", r).on("ajax:success", ".todolist-actions .close", s).on("ajax:success", ".todolist-actions .reopen", t),
        d.on("ajax:success", ".todo-actions .del", v).on("ajax:beforeSend", ".todo-actions .del", u).on("click", ".todo-actions .edit", w).on("click", ".btn-cancel-update-todo", x).on("ajax:success", ".todo-form.edit .form", y).on("click", ".todo .todo-assign-due", f).on("mouseenter", "[data-request-members]", e),
        d.on("click", ".todo input[type=checkbox]", A),
        d.on("change", ".filters select", 
        function(b) {
            var c = a(b.currentTarget),
            d = c.val();
            c.is("#filter-assignee") ? localStorage.todo_hl_assignee = d: c.is("#filter-due") && (localStorage.todo_hl_due = d),
            mcw.setTodoFilter()
        }),
        d.on("todoremove todoreopen todocomplete todocreate", 
        function(a, b, c) {
            var c = c || b.closest(".todolist"),
            d = c.find(".todos-uncompleted"),
            e = c.find(".todolist-auto-archive-tip"),
            f = !!c.find(".todolist-actions .stick.work").length;
            if (!c.length || f || !d.length || !e.length) return;
            var g = d.find(".todo");
            g.length ? e.hide() : e.show()
        }),
        mcw.adjustTodo()
    });
    var d = null,
    z;
    a.extend(mcw, {
        sortTodos: function(b) {
            var b = b || a(".todos-uncompleted");
            if (!b.is(".todos-uncompleted")) return;
            b.sortable({
                axis: "y",
                handle: ".todo-content",
                items: ".todo",
                cursor: "pointer",
                cursorAt: {
                    left: 30,
                    top: 20
                },
                tolerance: "pointer",
                helper: "clone",
                placeholder: "todo-placeholder",
                connectWith: ".todos-uncompleted",
                start: function(a, c) {
                    b.addClass("sorting"),
                    c.placeholder.css({
                        height: c.helper.outerHeight(!0)
                    })
                },
                stop: function(c, d) {
                    var e = d.item,
                    f = e.closest(".todos").find(".todo").map(function() {
                        return a(this).data("guid")
                    }).get(),
                    g = e.closest(".todolist").data("guid"),
                    h = e.data("guid"),
                    i = e.data("project-guid");
                    a.ajax({
                        url: "/projects/" + i + "/todos/" + h + "/reorder/",
                        data: {
                            list_guid: g,
                            guids: f.join(",")
                        }
                    }),
                    b.removeClass("sorting")
                }
            })
        },
        sortTodolists: function(b) {
            var b = b || a(".todolists");
            if (!b.is(".todolists")) return;
            b.sortable({
                axis: "y",
                handle: ".title h4 a",
                distance: 5,
                items: ".todolist",
                cursor: "pointer",
                helper: "clone",
                tolerance: "pointer",
                placeholder: "todolist-placeholder",
                beforestart: function(a, b) {
                    var c = b.item.parent(".todolists"),
                    d = c.children(".todolist"),
                    e = b.item.prevAll(".todolist"),
                    f = b.item.nextAll(".todolist"),
                    g = c.outerHeight(),
                    h = 54,
                    i = b.item.offset().top - c.offset().top,
                    j = i - e.length * h,
                    k = g - d.length * h - j;
                    d.addClass("collapse").children(":not(.title)").hide(),
                    c.css({
                        paddingTop: j,
                        paddingBottom: k
                    })
                },
                stop: function(a, b) {
                    var c = b.item;
                    c.parent().css({
                        paddingTop: 0,
                        paddingBottom: 0
                    }).find(".todolist").removeClass("collapse").children("ul").show(),
                    mcw.scrollTo(c),
                    setTimeout(function() {
                        mcw.highlight(c)
                    },
                    500)
                },
                update: function(b, c) {
                    var d = c.item,
                    e = d.parent().find(".todolist:visible").map(function() {
                        return a(this).data("guid")
                    }).get().reverse(),
                    f = d.data("guid"),
                    g = d.data("project-guid"),
                    h = {
                        guids: e.join(",")
                    };
                    a.ajax({
                        url: "/projects/" + g + "/lists/" + f + "/reorder/",
                        data: h
                    })
                }
            })
        },
        setTodoFilter: function() {
            if (!a(".filters").length) return;
            var b = a(".todos-uncompleted .todo");
            if (!b.length) return;
            var c = !0,
            d = !0,
            e = localStorage.todo_hl_assignee || a("#filters-assignee").val(),
            f;
            localStorage.todo_hl_due ? f = parseInt(localStorage.todo_hl_due) : f = parseInt(a("#filter-due").val()),
            b.filter(".hl").removeClass("hl");
            switch (e) {
            case "0":
                c = !1;
                break;
            case "-1":
                b = a.grep(b, 
                function(b, c) {
                    return ! a(".assignee", b).length
                });
                break;
            default:
                b = a.grep(b, 
                function(b, c) {
                    return a(".assignee", b).data("guid") === e
                })
            }
            var g = mcw.now().startOf("day"),
            h = g.clone(),
            i = g.clone();
            switch (f) {
            case - 1: d = !1;
                break;
            case 0:
                i = i.startOf("day"),
                b = a.grep(b, 
                function(b) {
                    var c = a(".due", b).data("date");
                    return c && moment(c).diff(i) == 0 ? !0: !1
                });
                break;
            case 1:
                i = i.add("days", 1).startOf("day"),
                b = a.grep(b, 
                function(b) {
                    var c = a(".due", b).data("date");
                    return c && moment(c).diff(i) == 0 ? !0: !1
                });
                break;
            case 2:
                h.day() == 0 ? (h = h.day( - 6).startOf("day"), i = i.startOf("day")) : (h = h.day(1).startOf("day"), i = i.day(7).startOf("day")),
                b = a.grep(b, 
                function(b) {
                    var c = a(".due", b).data("date");
                    return c && moment(c).diff(i) <= 0 && moment(c).diff(h) >= 0 ? !0: !1
                });
                break;
            case 3:
                h = h.add("weeks", 1),
                i = i.add("weeks", 1),
                h.day() == 0 ? (h = h.day( - 6).startOf("day"), i = i.startOf("day")) : (h = h.day(1).startOf("day"), i = i.day(7).startOf("day")),
                b = a.grep(b, 
                function(b) {
                    var c = a(".due", b).data("date");
                    return c && moment(c).diff(i) <= 0 && moment(c).diff(h) >= 0 ? !0: !1
                });
                break;
            case 4:
                i = i.add("days", -1).startOf("day"),
                b = a.grep(b, 
                function(b) {
                    var c = a(".due", b).data("date");
                    return c && moment(c).diff(i) <= 0 ? !0: !1
                });
                break;
            case 5:
                i = i.add("weeks", 2),
                i.day() == 0 ? i = i.day( - 6).startOf("day") : i = i.day(1).startOf("day"),
                b = a.grep(b, 
                function(b) {
                    var c = a(".due", b).data("date");
                    return ! c || moment(c).diff(i) >= 0 ? !0: !1
                });
                break;
            default:

            }
            c || d ? (a(b).addClass("hl"), a(".filter-desc").show()) : a(".filter-desc").hide(),
            localStorage.todo_hl_assignee = e,
            localStorage.todo_hl_due = f
        },
        initTodoFilter: function() {
            localStorage.todo_hl_assignee ? a("#filter-assignee").val(localStorage.todo_hl_assignee) : a("#filter-assignee").length && (localStorage.todo_hl_assignee = a("#filter-assignee").val()),
            localStorage.todo_hl_due && a.isNumeric(localStorage.todo_hl_due) ? a("#filter-due").val(localStorage.todo_hl_due) : a("#filter-due").length && (localStorage.todo_hl_due = a("#filter-due").val() * 1),
            mcw.setTodoFilter()
        },
        updateMemberList: function(b, c) {
            a(b).each(function() {
                var b = a(this);
                b.is("select") || (b = b.find("select"));
                var d = b.find("option.loading");
                if (d.length < 1) return;
                c.length && a.each(c, 
                function() {
                    a("<option />").text(this.nickname).val(this.guid).insertAfter(d)
                }),
                d.remove(),
                a("<option disabled>-----</option>").prependTo(b);
                var e = b.find("option[value=" + mcw.me.guid + "]");
                e.text(e.text() + " (我自己)").prependTo(b),
                b.val(b.data("selected-member") || -1).removeAttr("data-selected-member").removeAttr("disabled");
                var f = e.next(),
                g = f.next();
                g.is("[disabled]") && (f.remove(), g.remove())
            })
        },
        adjustTodoFilter: function() {
            var b = a("#filter-assignee"),
            c = b.find("option[value=" + mcw.me.guid + "]");
            c.text(c.text().replace(" (我自己)", "") + " (我自己)").insertAfter(b.find("[value=0]").next())
        },
        adjustTodo: function(b) {
            var c = a(b).is(".todo") ? a(b) : a(".todo", b),
            d = mcw.now().startOf("day");
            c.find(".todo-assign-due").each(function(b, c) {
                var e = a(this).find(".due").data("date");
                if (e) {
                    var f = moment(e).startOf("day");
                    f.diff(d) < 0 && a(this).addClass("delay")
                }
            }),
            c.each(function(b, c) {
                var c = a(c),
                d = a(".assignee", c),
                e = c.find(".run"),
                f = c.find(".pause");
                mcw && mcw.me && mcw.me.guid && c.is(".running") && d.data("guid") === mcw.me.guid && (e.hide(), f.css("display", "inline"))
            });
            var e = a(".workspace .page:last");
            e.is("[data-archived], [data-locked], [data-deleted]") && (c.find("input:checkbox").attr("disabled", "disabled"), c.find(".todo-assign-due").addClass("disabled"))
        }
    })
} (jQuery),
function(a) {
    function b(b, c) {
        a(b.target).parents(".comment:first").fadeOut(function() {
            a(this).remove()
        })
    }
    function c(b, c) {
        var d = a(c.html),
        e = a("textarea.comment-content", d),
        f = a(b.target).parents(".comment:first");
        f.hide(),
        d.insertAfter(f),
        mcw.editor(e)
    }
    function d(b) {
        var c = a(this).closest(".form"),
        d = c.find(".editor").data("editor");
        d.destroyEditor(),
        a(b.currentTarget).parents(".comment-form.edit").prev().show().end().remove()
    }
    function e(b, c, d, e) {
        var f = a(b.target).parents(".comment-form.edit"),
        g = f.prev(),
        h = a(c.html).hide();
        g.replaceWith(h),
        h.show(),
        f.remove(),
        mcw.adjustDate(h),
        mcw.adjustPermission(h)
    }
    function f(b) {
        var c = a(b.currentTarget).closest(".comment-form.new"),
        d = c.find(".editor").data("editor");
        d.destroyEditor(),
        a(".notify, .form-buttons, .fake-textarea", c).toggle()
    }
    a(function() {
        a(".wrapper").on("click", ".form-new-comment .fake-textarea", 
        function(b) {
            b.preventDefault();
            var c = a(this).hide().parents(".form:first");
            a(".notify, .form-buttons", c).show(),
            c.find(".member-list input:checked").length ? (c.find(".receiver, .change-notify").show(), c.find(".select-all, .notify-title + .form-field").hide()) : (c.find(".receiver, .change-notify").hide(), c.find(".select-all, .notify-title + .form-field").show());
            var d = a("textarea.comment-content", c);
            mcw.editor(d)
        }).on("dropCustom", ".form-new-comment .fake-textarea", 
        function(b, c, d) {
            var e = a(b.target);
            e.click();
            var f = a(".form-new-comment .editor"),
            g = f.data("uploader");
            mcw.isScreenView(f) || mcw.scrollTo(f),
            d && a.each(d, 
            function(a, b) {
                g.uploadFile(b)
            })
        }).on("ajax:success", ".comment-actions .del", b).on("ajax:success", ".comment-actions .edit", c).on("click", ".btn-cancel-update-comment", d).on("ajax:success", ".comment-form.edit .form", e).on("click", ".btn-cancel-create-comment", f).on("ajax:success", ".comment-form.new .form", 
        function(b, c) {
            var d = a(c.html).hide(),
            e = a(b.target).closest(".comment-form.new"),
            f = e.find(".editor").data("editor");
            d.insertBefore(e).fadeIn(),
            f.destroyEditor(),
            a(".notify, .form-buttons, .fake-textarea", e).toggle(),
            mcw.adjustCCList(),
            mcw.adjustDate(d),
            mcw.adjustPermission(d)
        })
    }),
    a.extend(mcw, {
        adjustCCList: function() {
            var b = a(".comment-form, .form-new-discussion"),
            c = b.find(".receiver"),
            d = b.find(".member-list");
            d.find("input[value=" + mcw.me.guid + "]:checkbox").closest("li").remove();
            if (!c.length) return;
            c.empty();
            var e = d.find("input:checked"),
            f = e.length;
            if (e.length) {
                var g = "";
                e.slice(0, 3).each(function(b, c) {
                    var d = a(this),
                    e = d.val(),
                    f = d.parent().text();
                    b > 0 && (g += '<span class="sp">, </span>'),
                    g += '<span data-guid="' + e + '">' + f + "</span>"
                }),
                f > 3 && (g += "等" + f + "人"),
                c.html(g)
            } else c.hide().next(".change-notify").hide().next(".select-all").show()
        },
        adjustAuthor: function() {
            var b = a(".comment-form, .form-new-discussion");
            b.find(".avatar-wrap").attr("href", "/members/" + mcw.me.guid),
            b.find("img.avatar").attr("src", mcw.me.avatar)
        }
    })
} (jQuery),
function(a) {
    function b(b, c, d) {
        a(b).each(function() {
            var b = a(this),
            e = b.find(".label-list").empty();
            a.each(c, 
            function() {
                var b = a("<a/>", {
                    href: "javascript:;",
                    "class": "folder-item",
                    text: this.name
                }).attr("data-guid", this.guid).appendTo(e);
                this.guid == d && b.addClass("current")
            }),
            b.find(".txt-new-label").removeAttr("disabled")
        })
    }
    function c(b, c) {
        var d;
        a.each(mcw.folders[c], 
        function(a) {
            this.guid == b && (d = a)
        }),
        mcw.folders[c].splice(d, 1)
    }
    a(function() {
        a(document).on("ajax:success", ".file .link-delete", 
        function(b) {
            var c = a(this).closest(".file");
            c.fadeOut(function() {
                var b = a(".workspace .page:last");
                c.trigger("filedelete", [c]),
                c.remove()
            })
        }).on("click", ".file .link-label", 
        function(c) {
            c.preventDefault();
            var d = a(this),
            e = d.data("popover");
            if (d.hasClass("loading") || d.hasClass("disabled")) return;
            if (e) mcw.popover(d, "hide");
            else {
                var f = mcw.template("tpl-label-popover"),
                g = f.find(".label-list").data("project-guid");
                mcw.folders[g] && b(f, mcw.folders[g], d.data("guid")),
                d.hasClass("no-label") ? f.find(".remove-label").hide() : f.find("h3").text("更换标签"),
                f.find("input[placeholder]").placeholder(),
                mcw.popover(d, {
                    content: f
                })
            }
            return ! 1
        }).on("mousedown", ".label-popover .link-remove-label", 
        function(b) {
            b.preventDefault();
            var d = a(this),
            e = d.closest(".popover"),
            f = e.data("target"),
            g = f.data("guid");
            mcw.popover(f, "hide"),
            f.addClass("loading"),
            a.ajax({
                url: f.data("url"),
                data: {
                    to: !1
                },
                success: function(b) {
                    f.text("标记文件").addClass("no-label").removeClass("loading").data("guid", "");
                    if (b.deleted) {
                        var d = e.find(".label-list").data("project-guid");
                        c(b.deleted, d)
                    }
                    if (g) {
                        var h = a(".file-links .link-folder[data-guid=" + g + "] span"),
                        i = h.text().match(/\d+/g);
                        i = i ? Math.max(0, i[0] * 1 - 1) : 0,
                        h.text("(" + i + ")")
                    }
                }
            })
        }).on("click", ".label-popover .folder-item", 
        function(b) {
            b.preventDefault();
            var d = a(this),
            e = d.closest(".popover"),
            f = e.data("target"),
            g = f.data("guid"),
            h = d.data("guid");
            mcw.popover(f, "hide"),
            f.addClass("loading"),
            a.ajax({
                url: f.data("url"),
                data: {
                    to: h
                },
                success: function(b) {
                    f.text(d.text()).removeClass("no-label").removeClass("loading").data("guid", d.data("guid"));
                    if (b.deleted) {
                        var i = e.find(".label-list").data("project-guid");
                        c(b.deleted, i)
                    }
                    if (g) {
                        var j = a(".file-links .link-folder[data-guid=" + g + "] span"),
                        k = j.text().match(/\d+/g);
                        k = k ? Math.max(0, k[0] * 1 - 1) : 0,
                        j.text("(" + k + ")")
                    }
                    var l = a(".file-links .link-folder[data-guid=" + h + "] span"),
                    k = l.text().match(/\d+/g);
                    k = k ? k[0] * 1 + 1: 0,
                    l.text("(" + k + ")")
                }
            })
        }).on("keydown", ".label-popover .txt-new-label", 
        function(b) {
            if (b.which != 13) return;
            var c = a(this),
            d = c.val();
            if (!d) {
                c.addClass("error");
                return
            }
            c.removeClass("error");
            var e = c.closest(".popover"),
            f = e.data("target"),
            g = f.data("guid");
            mcw.popover(f, "hide"),
            f.addClass("loading"),
            a.ajax({
                url: f.data("url"),
                data: {
                    name: d
                },
                success: function(b) {
                    f.text(d).removeClass("no-label").removeClass("loading").data("guid", b.guid);
                    var h = e.find(".label-list").data("project-guid");
                    mcw.folders[h].splice(0, 0, {
                        name: b.name,
                        guid: b.guid
                    }),
                    c.val("");
                    if (g) {
                        var i = a(".file-links .link-folder[data-guid=" + g + "] span"),
                        j = i.text().match(/\d+/g);
                        j = j ? Math.max(0, j[0] * 1 - 1) : 0,
                        i.text("(" + j + ")")
                    }
                    a("<a/>", {
                        "class": "link-folder",
                        "data-stack": "",
                        "data-guid": b.guid,
                        href: "/projects/" + h + "/dirs/" + b.guid + "/"
                    }).append(b.name + "(<span>1</span>)").insertAfter(".file-links .link-more-files")
                }
            }),
            a(document).off(".folder")
        }).on("mouseover", "[data-request-labels]", 
        function() {
            var c = a(this),
            d = c.data("request-labels");
            mcw.folders || (mcw.folders = {}),
            mcw.folders[d] ? b(".label-popover", mcw.folders[d], c.data("guid")) : a.ajax({
                url: "/projects/" + d + "/folders.json",
                type: "get",
                success: function(a) {
                    mcw.folders[d] = a,
                    b(".label-popover", a, c.data("guid"))
                }
            }),
            c.removeAttr("data-request-labels").attr("data-project-guid", d)
        })
    }),
    a.extend(window.mcw, {
        initUpload: function(b) {
            var c = b.btn ? a(b.btn) : a(".btn-upload-file"),
            d = b.container ? a(b.container) : a(".file-list"),
            e = c.data("url"),
            f;
            f = mcw.upload(c, {
                action: e,
                beforeUpload: function(c) {
                    var e = mcw.template("tpl-upload-file", {
                        id: c.id,
                        name: c.name
                    });
                    d.prepend(e),
                    mcw.loadImage(c.obj, 
                    function(a) {
                        if (!a) {
                            var b = "/assets/file_icons/",
                            d = b + "file_extension_" + c.extension + ".png";
                            mcw.loadImage(d, 
                            function(a) {
                                a ? e.find(".file-thumb img").attr("src", a.src) : e.find(".file-thumb img").attr("src", b + "file_extension_others.png")
                            })
                        } else e.find(".file-thumb").attr({
                            "data-origin-src": a.src,
                            "data-origin-name": c.name,
                            "data-origin-size": a.width + "," + a.height
                        }).find("img").attr("src", a.src)
                    });
                    if (window.File && window.FileList) {
                        var g = 0;
                        c.size >= 1048576 ? g = (c.size / 1048576).toFixed(1) + "M": g = (c.size / 1024).toFixed(0) + "K"
                    } else e.addClass("ie");
                    e.find(".size").text(g).end().find(".link-cancel").text("取消上传").attr("title", "取消上传").click(function() {
                        var a = e.attr("fileid");
                        a && e.hasClass("uploading") && f.cancel(a),
                        e.fadeOut(function() {
                            b.onCancel && b.onCancel(e)
                        })
                    }),
                    b.beforeUpload && b.beforeUpload();
                    if (b.countEl) {
                        var h = a(b.countEl),
                        i = h.text().replace(/\d+/, 
                        function(a) {
                            return a * 1 + 1
                        });
                        h.text(i).show()
                    }
                },
                onProgress: function(a, b, c) {
                    var e = d.find(".file[fileid=" + a.id + "]"),
                    f = b / c;
                    f > .99 ? f = "正在处理...": f = (f * 100).toFixed(0) + "%",
                    e.find(".progress-bar span").width(f),
                    e.find(".percent").text(f)
                },
                onSuccess: function(c, e) {
                    var f = d.find(".file#file-upload-" + c.id),
                    g = a(e.html).show();
                    f.replaceWith(g),
                    a(".init.init-file").remove(),
                    b.onSuccess && b.onSuccess(c, e)
                },
                onValidate: function(a, b) {
                    return a.size && a.size / 1048576 > 50 ? (mcw.message({
                        msg: '附件 <em style="color: #ee6500;">' + a.name + "</em> 大小超过50MB, 无法完成上传",
                        width: 500
                    }), !1) : !0
                },
                onCancel: function(a) {},
                onError: function(a, b) {},
                onComplete: function(a, b) {}
            }),
            c.data("uploader", f)
        },
        adjustFile: function(b) {
            var c = a(".workspace .page:last"),
            d = a(b).is(".file") ? a(b) : a(".file", b);
            c.is("[data-archived], [data-locked], [data-deleted]") && d.find(".link-label").addClass("disabled")
        }
    })
} (jQuery),
function(a) {
    a(function() {
        var b = a("#page-forgot-password");
        if (b.length < 1) return;
        b.on("ajax:success", "form.form", 
        function(b, c) {
            var d = a("#email").val(),
            e = a(".center-box .bd").empty();
            mcw.template("template-email-sent", {
                email: d
            }).appendTo(e)
        })
    })
} (jQuery),
function(a) {
    var b = "page-member";
    page = "#" + b,
    a(function() {
        a("body").on("ajax:beforeSend", page + " #link-cancel-invitation", 
        function(a) {
            mcw.globalLoading("正在取消邀请...")
        }).on("ajax:error", page + " #link-cancel-invitation", 
        function(a) {
            mcw.globalLoading("hide")
        })
    })
} (jQuery),
function(a) {
    var b = "page-invite",
    c = "#" + b;
    a(function() {
        a("body").on("submit", c + " .form-invite", 
        function(b) {
            var c = a(this),
            d = !0,
            e = a.grep(a("input.invite-email"), 
            function(b, c) {
                return a.trim(a(b).val()) !== ""
            });
            return a("input.invite-email:first").closest(".form-item").find("p.error").remove(),
            e.length ? (a.each(e, 
            function(c, e) {
                var e = a(e),
                f = e.val(),
                g = a.trim(f);
                if (!mcw.validate.email(g).valid) {
                    var h = f.indexOf(g),
                    i = g + " 貌似没写对";
                    return mcw.selectText(b.currentTarget, h, g.length),
                    a('<p class="error">' + i + "</p>").appendTo(e.parent()),
                    d = !1,
                    !1
                }
            }), d) : (a('<p class="error">请至少邀请一个人</p>').insertBefore(c.find(".form-field:first")), !1)
        }).on("ajax:beforeSend", c + " .form-invite", 
        function(b, c, d) {
            var e = [],
            f = [];
            a(".invite-item").each(function() {
                var b = a(this),
                c = a.trim(b.find("input.invite-email").val()),
                d = b.find("select.invite-role").val();
                c && (e.push(c), f.push(d))
            }),
            e = e.join(","),
            f = f.join(","),
            d.data += "&emails=" + encodeURIComponent(e) + "&init_roles=" + encodeURIComponent(f)
        }).on("click", c + " .select-all-proj", 
        function(b) {
            b.preventDefault(),
            a(".proj-in input[type=checkbox]").prop("checked", !0)
        }).on("click", c + " .select-none-proj", 
        function(b) {
            b.preventDefault(),
            a(".proj-in input[type=checkbox]").prop("checked", !1)
        }).on("click", c + " .select-all-cal", 
        function(b) {
            b.preventDefault(),
            a(".cal-in input[type=checkbox]").prop("checked", !0)
        }).on("click", c + " .select-none-cal", 
        function(b) {
            b.preventDefault(),
            a(".cal-in input[type=checkbox]").prop("checked", !1)
        }).on("click", c + " .link-invite-message", 
        function(b) {
            b.preventDefault();
            var c = a(b.target);
            c.next(".form-item").show().end().remove()
        }).on("ajax:error", c + " .form-invite", mcw.inviteError).on("click", c + " #add-invite-item", mcw.addInviteItem).on("click", c + " .del-invite", mcw.removeInviteItem).on("keyup", c + " #txt-welcome", 
        function(b) {
            var d = a(this).val(),
            e = a(c + " .email-preview");
            d ? (e.find(".extra-message").text(d), e.find(".with-extra-msg").show()) : e.find(".with-extra-msg").hide()
        })
    }),
    a.extend(mcw, {
        removeInviteItem: function(b) {
            b.preventDefault();
            var c = a(b.target),
            d = c.closest(".invite-item"),
            e = d.siblings();
            d.fadeTo(200, 0).slideUp(200, 
            function() {
                d.remove(),
                e.length === 1 && e.eq(0).find(".del-invite").remove()
            })
        },
        addInviteItem: function(b) {
            b.preventDefault();
            var c = a(b.target),
            d = c.closest(".form-item"),
            e = d.find(".invite-item:last"),
            f = e.clone(!0),
            g = f.find("input").val("");
            f.find(".error").remove(),
            f.insertAfter(e),
            g.focus(),
            d.find(".invite-item:not(:has(.del-invite))").find(".invite-role-field").after('<a href="javascript:;" class="del-invite">删除</a>')
        },
        inviteError: function(b, c) {
            var d = a(b.currentTarget),
            e = a.parseJSON(c.responseText).errors;
            if (e && e.length) {
                var f = e[0];
                if (f.target && f.target === "emails") {
                    var g = f.emails;
                    a.each(d.find("input.invite-email"), 
                    function(b, c) {
                        var c = a(c),
                        d = a.trim(c.val()),
                        e = g.indexOf(d);
                        e >= 0 && (a('<p class="error">' + d + f.msg + "</p>").appendTo(c.parent()), g.splice(e, 1))
                    }),
                    g.length && a("#label-email").next(".error").remove().end().after('<p class="error">' + g.join("、") + f.msg + "</p>")
                }
            }
        }
    })
} (jQuery),
function(a) {
    var b,
    c = "page-member-settings",
    d = "#" + c;
    a(function() {
        a("body").on("dropCustom", d + " .upload-avatar", 
        function(a, c, d) {
            b.uploadFile(d[0])
        })
    }),
    mcw.pages[c] = {
        init: function() {
            var c = a(".link-upload", d);
            b = mcw.upload(c, {
                action: c.data("url"),
                multiple: !1,
                beforeUpload: function(b) {
                    a(".avatar-wrapper .loading").show()
                },
                onValidate: function(b, c) {
                    return a.inArray(c, ["jpeg", "jpg", "png"]) == -1 ? (mcw.message({
                        msg: "请选择jpg或者png文件"
                    }), !1) : !0
                },
                onSuccess: function(b, c) {
                    a(".avatar-wrapper img.avatar, .link-member-menu img.avatar").attr("src", c.avatar)
                },
                onError: function(b, c) {
                    var d = "";
                    try {
                        var e = a.parseJSON(c.responseText).errors;
                        a.each(errors, 
                        function(a, b) {
                            d += b.msg + "<br/>"
                        })
                    } catch(f) {
                        d = "头像上传失败"
                    } finally {
                        mcw.message({
                            msg: d
                        })
                    }
                },
                onComplete: function(b, c) {
                    a(".avatar-wrapper .loading").hide()
                }
            })
        }
    }
} (jQuery),
function(a) {
    var b,
    c = "page-member-settings-password",
    d = "#" + c;
    a(function() {}),
    mcw.pages[c] = {
        init: function() {}
    }
} (jQuery),
function(a) {
    function d() {
        var b = a("#filter-project"),
        c = b.val(),
        d = a(".box .todo").show();
        c !== "-1" && d.filter(":not([data-project-guid=" + c + "])").hide(),
        e()
    }
    function e() {
        var b = a("#box-today"),
        c = a("#box-other"),
        d = a("h5", b),
        e = a(".todo", b),
        f = a(".todo", c); ! e.length && !f.length ? (a("#boxes").hide(), a(".init-todo-empty").show()) : (a("#boxes").show(), a(".init-todo-empty").hide(), e.length ? e.filter(":visible").length ? (d.show(), a(".init-box-empty").hide(), a("#init-filter-empty").hide()) : (d.hide(), a(".init-box-empty").hide(), a("#init-filter-empty").show()) : (d.hide(), a(".init-box-empty").show(), a("#init-filter-empty").hide()))
    }
    function f() {
        var b = a(".box .todo"),
        c = a("#filter-project"),
        e = {},
        f = c.val();
        b.each(function(b, c) {
            c = a(c),
            e[c.data("project-guid")] = c.data("project-name")
        });
        var g = a('<option value="-1">所有项目</option>');
        a.each(e, 
        function(b, c) {
            var d = a('<option value="' + b + '">' + c + "</option>");
            b === f && d.attr("selected", !0),
            g = g.add(d)
        }),
        c.html(g),
        c.val(f),
        d()
    }
    function g() {
        var b = a("#box-other"),
        c = a("#box-today"),
        d = a(".todos", b),
        f = a(".todos", c),
        g = a(".todo", d),
        h = a(".todo", f),
        i = {
            revert: "invalid",
            revertDuration: 200,
            cursor: "pointer",
            handle: ".todo-content",
            helper: function(b) {
                var c = a(b.currentTarget);
                return c.css("position", "absolute"),
                c.get(0)
            },
            axis: "y",
            stop: function(b, c) {
                a(c.helper).css({
                    position: "static"
                })
            }
        },
        j = {
            activeClass: "ui-state-highlight",
            hoverClass: "ui-state-droppable",
            drop: function(b, g) {
                var h = g.draggable,
                i = a(".todo-content a", h).text(),
                j = a(".assignee", h).data("guid"),
                k = mcw.now().startOf("day");
                h.css({
                    top: 0,
                    position: "static"
                });
                var l = {
                    todo_content: i,
                    assignee_guid: j,
                    due_at: k.valueOf()
                };
                h.parents(".todos").is(d) ? (c.find("h5").show().end().find(".init").hide(), h.appendTo(f)) : (h.appendTo(d), l.due_at = undefined),
                mcw.tinyLoading(a(".todo-assign-due", h)),
                a.ajax({
                    url: h.find(".todo-actions .edit").attr("href"),
                    data: l,
                    success: function(b) {
                        var c = a(b.html);
                        h.replaceWith(c),
                        mcw.highlight(a(".todo-content", c)),
                        mcw.adjustTodo(c),
                        e()
                    }
                })
            },
            activate: function(b, c) {
                a(b.target).is(c.draggable.parents(".todos")) && a(b.target).removeClass("ui-state-highlight")
            }
        };
        a(".box").on("mouseenter", ".todo", 
        function() {
            var b = a(this);
            b.hasClass("ui-draggable") || b.draggable(i)
        }),
        c.droppable(a.extend(j, {
            accept: "#box-other .todo"
        })),
        b.droppable(a.extend(j, {
            accept: "#box-today .todo"
        }))
    }
    function h() {
        function g(b, c) {
            var d = moment(a(b).find(".due").data("date") || "2999-01-01"),
            e = moment(a(c).find(".due").data("date") || "2999-01-01");
            return d.diff(e)
        }
        var b = mcw.now().endOf("day"),
        c = a("#box-today .todolist .todos-uncompleted"),
        d = a("#box-other .todolist .todos-uncompleted");
        c.find(".todo").add(d.find(".todo")).each(function() {
            var e = a(this),
            f = e.find(".due");
            if (!f.length || !f.data("date")) {
                e.appendTo(d);
                return
            }
            var g = moment(f.data("date"));
            g.diff(b) > 0 ? e.appendTo(d) : e.appendTo(c)
        });
        var e = c.find(".todo").sort(g),
        f = d.find(".todo").sort(g);
        c.append(e),
        d.append(f)
    }
    var b = "page-member",
    c = "#" + b;
    a(function() {
        a(document).on("change", c + " #filter-project", 
        function(a) {
            d()
        }).on("todoremove todocomplete todoreopen", c, 
        function(a, b) {
            e()
        }).on("todoupdate", c, 
        function(b, d) {
            d.find(".assignee").data("guid") !== a(c).data("guid") ? setTimeout(function() {
                d.fadeOut(function() {
                    d.remove(),
                    a(".workspace .page:last").trigger("todoremove", [d])
                })
            },
            1e3) : (h(), e())
        })
    }),
    mcw.pages[b] = {
        init: function() {
            var b = a(c);
            b.data("self") && a("#nav-me").addClass("active"),
            !b.is("[data-locked]") && b.data("self") && g(),
            f(),
            mcw.adjustTodo()
        },
        update: function(b) {
            var e = a("#box-other .todolist .todos-uncompleted"),
            f = a(c).data("guid");
            if (!b.member_todos) return;
            var g = [],
            i = !1;
            b.member_todos.created && b.member_todos.created.length && (a.each(b.member_todos.created, 
            function(b, c) {
                var d = a(c).hide(),
                f = a("#boxes").find(".todo[data-guid=" + d.data("guid") + "]");
                f.length ? f.replaceWith(d) : e.append(d),
                mcw.adjustTodo(d),
                g.push(d.find(".todo-content"))
            }), i = !0),
            b.member_todos.deleted && b.member_todos.deleted.length && a.each(b.member_todos.deleted, 
            function(b, c) {
                a("#boxes").find(".todo[data-guid=" + c + "]").remove()
            }),
            b.member_todos.updated && b.member_todos.updated.length && (a.each(b.member_todos.updated, 
            function(b, c) {
                var d = a(c).hide(),
                h = d.find(".assignee").data("guid"),
                i = a("#boxes").find(".todo[data-guid=" + d.data("guid") + "]");
                if (h != f) {
                    i.remove();
                    return
                }
                i.length ? i.before(d).remove() : e.append(d),
                mcw.adjustTodo(d),
                g.push(d.find(".todo-content"))
            }), i = !0),
            i && (h(), d()),
            a(g).each(function() {
                mcw.highlight(a(this))
            })
        }
    }
} (jQuery),
function(a) {
    function d() {
        var b = {
            revert: "invalid",
            revertDuration: 200,
            distance: 5,
            cursor: "pointer",
            handle: "img.avatar",
            helper: function(b, c) {
                var d = a(b.currentTarget),
                e = d.position();
                return d.css({
                    position: "absolute",
                    top: e.top,
                    left: e.left
                }),
                d.get(0)
            },
            stop: function(b, c) {
                a(c.helper).css({
                    position: "static"
                })
            }
        },
        c = {
            accept: ".members > .member",
            activeClass: "ui-state-highlight",
            hoverClass: "ui-state-droppable",
            drop: function(b, c) {
                function m() {
                    mcw.transitionEnd(d, 
                    function() {
                        d.removeClass("on invisible")
                    }),
                    d.addClass("on")
                }
                var d = c.draggable,
                e = d.closest(".group"),
                f = a(b.target);
                if (e.is(f)) return;
                d.css({
                    top: 0,
                    position: "static"
                });
                var g = f.find(".members"),
                h = e.find(".members"),
                i = d.data("guid"),
                j = d.data("team-guid"),
                k = f.data("guid");
                f.find(".init").remove(),
                d.addClass("invisible");
                if (d.is(".invitation")) g.append(d);
                else {
                    var l = g.find(".invitation:first");
                    l.length ? l.before(d) : g.append(d)
                }
                mcw.isScreenView(d) ? m() : mcw.scrollTo(d, {
                    callback: m
                }),
                h.find(".member").length || a("<div />", {
                    "class": "init init-empty",
                    text: "这个小组现在没有人，拖动成员过来即可加入"
                }).insertAfter(h);
                var n = "/teams/" + j + "/subgroups/" + k + "/add_member/",
                o = {
                    muid: i
                };
                a.ajax({
                    url: n,
                    data: o,
                    type: "post"
                })
            },
            over: function(b, c) {
                var d = a(b.target),
                e = c.draggable,
                f = e.closest(".group");
                d.is(f) && d.removeClass("ui-state-droppable")
            },
            activate: function(b, c) {
                var d = a(b.target),
                e = c.draggable,
                f = e.closest(".group");
                if (d.is(f)) d.removeClass("ui-state-highlight");
                else {
                    var g = d.is(".group-default"),
                    h = d.find(".members"),
                    i = h.position(),
                    j = {
                        width: h.outerWidth(),
                        height: h.outerHeight(),
                        lineHeight: h.outerHeight() + "px",
                        position: "absolute",
                        top: i.top,
                        left: i.left
                    };
                    a("<div />", {
                        "class": "droppable-mask",
                        text: g ? "把成员放到这里移出分组": "把成员放到这里加入此分组",
                        css: j
                    }).insertAfter(h)
                }
            },
            deactivate: function(b, c) {
                a(b.target).find(".droppable-mask").remove()
            }
        };
        a(".members > .member:not(.member-invite)").draggable(b),
        a(".group:not(.group-new)").droppable(c),
        a(document).on("mouseenter", ".group:not(.group-new)", 
        function() {
            var b = a(this);
            b.hasClass("ui-droppable") || b.droppable(c)
        })
    }
    var b = "page-members",
    c = "#" + b;
    a(function() {
        a(".wrapper").on("click", c + " .member.new.cannot", 
        function(a) {
            return mcw.message({
                msg: "只有管理员才能邀请新成员。<br/>去找其他管理员为你授权或者帮你邀请吧。"
            }),
            !1
        }).on("validate", ".group-form form", 
        function(a, b, c) {
            var d = {
                valid: !0
            };
            return b ? b.length > 255 && (d.valid = !1, d.errorMsg = "", mcw.message({
                msg: "小组名称最长255个字符"
            })) : (d.valid = !1, d.errorMsg = ""),
            d
        }).on("ajax:success", c + " .group .edit", 
        function(b, c) {
            if (c.success) {
                var d = a(c.html),
                e = d.find(".group-name"),
                f = a(this),
                g = f.closest("h3");
                g.hide().after(d),
                e.focus(),
                mcw.selectText(e)
            }
        }).on("click", c + " .form-edit-subgroup .cancel", 
        function(b) {
            b.preventDefault();
            var c = a(this),
            d = c.closest(".group-form"),
            e = d.prev();
            d.remove(),
            e.show()
        }).on("ajax:success", c + " .form-edit-subgroup", 
        function(b, c) {
            if (c.success) {
                var d = a(this).parent(),
                e = d.prev(),
                f = e.find(".group-name");
                d.remove(),
                f.text(c.name),
                e.show()
            }
        }).on("ajax:success", c + " .group-form .del", 
        function(b, c) {
            if (c.success) {
                var d = a(this).closest(".group"),
                e = d.find(".member"),
                f = e.length,
                g = 0;
                e.length ? (mcw.transitionEnd(e, 
                function() {
                    g++;
                    if (g < f) return;
                    d.fadeOut(function() {
                        var b = a(".group-default .members"),
                        c = e.filter(".member:not(.invitation)"),
                        f = e.filter(".invitation");
                        b.append(f);
                        var g = b.find(".invitation:first");
                        g.length ? g.before(c) : b.append(c),
                        e.removeClass("invisible"),
                        d.remove()
                    })
                }), e.addClass("invisible")) : d.fadeOut(function() {
                    d.remove()
                })
            }
        }).on("ajax:success", c + " .form-create-group", 
        function(b, c) {
            if (c.success) {
                var d = a(c.html),
                e = a(".group-new"),
                f = e.find(".group-form");
                f.hide().find(".group-name").val(""),
                e.find(".group-new-action").show(),
                d.hide().insertBefore(e).fadeIn()
            }
        }).on("click", c + " .group-new-action", 
        function(b) {
            b.preventDefault();
            var c = a(this),
            d = c.next(".group-form");
            c.hide(),
            d.show().find(".group-name").focus()
        }).on("click", c + " .form-create-group .cancel", 
        function(b) {
            b.preventDefault(),
            a(this).closest(".group-form").hide().find(".group-name").val("").end().prev().show()
        })
    }),
    mcw.pages[b] = {
        init: function() {
            a("#nav-members").addClass("active"),
            mcw.me.admin && d()
        }
    }
} (jQuery),
function(a) {
    function d(b, c) {
        var d = a(c.html),
        e = a(".topic > .message"),
        f = a(".detail-actions");
        e.hide(),
        d.insertAfter(e),
        mcw.editor(d.find("textarea")),
        f.hide()
    }
    function e(b, c) {
        var d = a(c.html),
        e = a(b.target).closest(".message-form.edit"),
        f = e.prev(),
        g = e.find(".editor").data("editor");
        g.destroyEditor(),
        f.replaceWith(d),
        e.remove(),
        mcw.adjustDate(d),
        mcw.adjustPermission(d),
        a(".detail-actions").show()
    }
    function f(b) {
        var c = a(this).closest(".form"),
        d = c.find(".editor").data("editor"),
        e = a(".detail-actions");
        d.destroyEditor(),
        a(b.currentTarget).parents(".message-form.edit").hide().prev().show().end().remove(),
        e.show()
    }
    function g() {
        mcw.globalLoading("正在删除讨论...")
    }
    function h() {
        mcw.globalLoading("hide")
    }
    var b = "page-message",
    c = "#" + b;
    a(function() {
        a("body").on("ajax:success", c + " .detail-action-edit", d).on("click", c + " #link-cancel-post", f).on("ajax:success", c + " .form-edit-message", e).on("ajax:beforeSend", c + " .detail-action-del", g).on("ajax:complete", c + " .detail-action-del", h)
    }),
    mcw.pages[b] = {
        init: function(a) {
            mcw.adjustCCList(),
            mcw.adjustAuthor(),
            mcw.adjustProjInfo(),
            mcw.adjustStar()
        },
        update: function(b) {
            if (!b.message) return;
            if (b.message.updated) {
                var c = a(".workspace .page:last");
                if (c.is("[data-deleted]")) return mcw.stack({
                    url: location.href,
                    nocache: !0
                }),
                !1;
                var d = a(b.message.updated),
                e = a(".message");
                d.toggle(e.is(":visible")),
                e.replaceWith(d),
                mcw.adjustDate(d),
                mcw.adjustPermission(d)
            }
            if (b.message.deleted) return mcw.stack({
                url: location.href,
                nocache: !0
            }),
            !1
        }
    }
} (jQuery),
function(a) {
    var b = "page-notification-settings",
    c = "#" + b;
    a(function() {
        a(".wrapper").on("click", c + " .option input:radio", 
        function(b) {
            var c = a(this).attr("checked", ""),
            d = c.closest(".option");
            if (d.hasClass("active")) return;
            d.addClass("active").siblings(".option").removeClass("active").find("input:radio").removeAttr("checked"),
            d.hasClass("option-on") ? d.find(".choose-project").removeClass("hide").end().find(".project-list input:checkbox").attr("checked", "checked") : d.siblings(".option").find(".select-shortcut, .project-list").addClass("hide").end().find(".choose-project").removeClass("hide")
        }).on("click", c + " .choose-project a", 
        function(b) {
            b.preventDefault();
            var c = a(this).closest(".choose-project").addClass("hide");
            optEl = c.closest(".option"),
            optEl.addClass("active").siblings(".option"
            ).removeClass("active"),
            optEl.find("input:radio").attr("checked", "checked").end().find(".select-shortcut, .project-list").removeClass("hide").end().find(".project-list input:checkbox").attr("checked", "checked")
        }).on("ajax:before", c + " .form", 
        function(b) {
            var c = a("#radio-d18n-on").is(":checked");
            c && !mcw.d18n.permitted() && mcw.d18n.requestPermission()
        }).on("ajax:success", c + " .form", 
        function(b) {
            var c = a("#radio-d18n-on").is(":checked");
            a("#d18n-enabled").val(c ? "true": "false")
        }).on("click", c + " .select-all", 
        function(b) {
            b.preventDefault(),
            a(this).closest(".option").find(".project-list input:checkbox").attr("checked", "checked")
        }).on("click", c + " .select-none", 
        function(b) {
            b.preventDefault(),
            a(this).closest(".option").find(".project-list input:checkbox").removeAttr("checked")
        })
    })
} (jQuery),
function(a) {
    var b = "page-notifications";
    page = "#" + b,
    a(function() {
        a(".wrapper").on("click", page + " .notice.unread .link, .notice.unread .commnets-count", 
        function(b) {
            var c = a(this).closest(".notice").removeClass("unread"),
            d = c.data("notification-guid");
            mcw.readNotification(d)
        })
    }),
    mcw.pages[b] = {
        init: function() {
            mcw.scrollLoad(page, 
            function() {
                return a.ajax({
                    url: a(page).data("url"),
                    dataType: "html",
                    type: "get",
                    data: {
                        till: a(".notice:last").data("created-at")
                    },
                    success: function(b) {
                        b && (a(".notifications").append(b), mcw.adjustDate())
                    }
                })
            })
        },
        update: function(b) {
            if (!b.notifications) return;
            var c = a(".notifications");
            b.notifications.created && b.notifications.created.length && a.each(b.notifications.created, 
            function(b, d) {
                c.find("[data-topic-guid=" + d.guid + "]").remove();
                var e = a(d.html).prependTo(c);
                mcw.adjustDate(e)
            }),
            b.notifications.updated && b.notifications.updated.length && a.each(b.notifications.updated, 
            function(a, b) {
                c.find("[data-notification-guid=" + b + "]").removeClass("unread")
            })
        }
    }
} (jQuery),
function(a) {
    var b = "page-topics",
    c = "#" + b;
    a(function() {
        a(".wrapper").on("click", c + " .editor-placeholder", 
        function(b) {
            b.preventDefault(),
            a(this).hide();
            var c = a(".form-new-discussion").show(),
            d = c.find(".editor");
            c.find("#txt-title").focus(),
            d.length || mcw.editor(a("#txt-content")),
            a(".init.init-discussion").hide()
        }).on("click", c + " #link-cancel-post", 
        function(b) {
            b.preventDefault();
            var c = a(".form-new-discussion"),
            d = c.find(".editor");
            if (d.length) {
                var e = d.data("editor");
                e.destroyEditor()
            }
            c.hide(),
            a(".init.init-discussion, .editor-placeholder").show()
        }).on("ajax:success", c + " .form-new-discussion", 
        function(b, c) {
            a(".init.init-discussion").remove(),
            a("#link-cancel-post").click(),
            a("#txt-title, txt-content").val("");
            var d = a(".messages"),
            e = a(c.html).hide().prependTo(d).fadeIn();
            d.offset().top < a(document).scrollTop() && mcw.scrollTo(".editor-wrapper"),
            mcw.adjustDate(e)
        }).on("dropCustom", c + " .fake-textarea", 
        function(b, c, d) {
            var e = a(b.target);
            e.click();
            var f = a(".form-new-discussion .editor"),
            g = f.data("uploader");
            mcw.isScreenView(f) || mcw.scrollTo(f),
            d && a.each(d, 
            function(a, b) {
                g.uploadFile(b)
            })
        })
    }),
    mcw.pages[b] = {
        init: function() {
            mcw.scrollLoad(c, 
            function() {
                return a.ajax({
                    url: location.pathname,
                    dataType: "html",
                    type: "get",
                    data: {
                        till: a(".message:last").data("last-comment-at")
                    },
                    success: function(b) {
                        b && (a(".messages").append(b), mcw.adjustDate())
                    }
                })
            })
        }
    }
} (jQuery),
function(a) {
    var b = "page-member",
    c = "#" + b;
    a(function() {
        a("body").on("ajax:success", c + " .form-change-role", 
        function(b, c) {
            c.success && a(".status[data-role]").hide().filter("[data-role=" + c.role + "]").show()
        }).on("ajax:success", c + " #link-downgrade", 
        function(b) {
            a(".status-admin").addClass("hide"),
            a(".status-normal").removeClass("hide")
        }).on("ajax:beforeSend", c + " #link-remove-member", 
        function(a) {
            mcw.globalLoading("正在移除...")
        }).on("ajax:success", c + " #link-remove-member", 
        function(a) {
            mcw.globalLoading("hide")
        }).on("ajax:error", c + " #link-remove-member", 
        function(a) {
            mcw.globalLoading("hide")
        })
    })
} (jQuery),
function(a) {
    function d() {
        var b = a(".progress-day.today"),
        c = a(".progress-day.yesterday"),
        d = mcw.now().startOf("day"),
        e = d.format("YYYY-MM-DD"),
        f = d.clone().add("d", -1).format("YYYY-MM-DD");
        if (b.length && b.data("date") != e) {
            var g = moment(b.data("date"), "YYYY-MM-DD");
            b.find("h4").empty().removeClass("today").append("<span class='date'>" + g.format("M/D") + "</span>").append("<span class='day'>" + moment.weekdaysShort[g.day()] + "</span>")
        }
        if (c.length && c.data("date") != f) {
            var g = moment(c.data("date"), "YYYY-MM-DD");
            c.find("h4").empty().removeClass("yesterday").append("<span class='date'>" + g.format("M/D") + "</span>").append("<span class='day'>" + moment.weekdaysShort[g.day()] + "</span>")
        }
        a(".progress-day[data-date=" + e + "]").addClass("today").find("h4:first").html("今"),
        a(".progress-day[data-date=" + f + "]").addClass("yesterday").find("h4:first").html("昨")
    }
    var b = "page-progress",
    c = "#" + b;
    a(function() {
        a("body").on("change", c + " #select-member", 
        function(b) {
            var c = a(this).val(),
            d;
            "0" == c ? d = location.pathname: d = location.pathname + "?by_member=" + c,
            mcw.stack({
                url: d,
                root: !0,
                bare: !0,
                nocache: !0
            })
        })
    }),
    mcw.pages[b] = {
        init: function() {
            a("#nav-progress").addClass("active"),
            d(),
            mcw.scrollLoad(c, 
            function(b) {
                return a.ajax({
                    url: location.pathname,
                    dataType: "html",
                    data: {
                        till: a(".progress-day:last").attr("data-date"),
                        by_member: a("#select-member").val()
                    },
                    success: function(a) {
                        a && (b.before(a), d())
                    }
                })
            })
        },
        update: function(b) {
            if (!b.progress) return;
            var c = [];
            b.progress.created && b.progress.created.length && (a.each(b.progress.created, 
            function(b, d) {
                var e = a(d.html),
                f = moment(e.find(".datetime").text(), "YYYY-MM-DD HH:mm: "),
                g = a(".progress-day[data-date=" + f.format("YYYY-MM-DD") + "]");
                g.length || (g = mcw.template("tpl-progress-day", {
                    date: f.format("YYYY-MM-DD"),
                    dateStr: f.format("M/D"),
                    dayStr: moment.weekdaysShort[f.day()]
                }).insertAfter("#select-member"));
                var h = g.find(".progress-project:first");
                if (!h.length || h.data("guid") != d.project.guid) h = mcw.template("tpl-progress-project", {
                    guid: d.project.guid,
                    name: d.project.name
                }).insertAfter(g.find("h4"));
                e.insertAfter(h.find("h5")),
                c.push(e)
            }), d()),
            a(c).each(function() {
                mcw.highlight(a(this))
            })
        }
    }
} (jQuery),
function(a) {
    var b = "page-new-project",
    c = "#" + b;
    a(function() {
        mcw.preloadImages(["/assets/icon-check-e5b477cb7a924487bf783a0e8a374a21.png"]),
        a("body").on("ajax:beforeSend", c + " form.form", 
        function(b, c, d) {
            membersGuid = a(".member.selected").map(function() {
                return a(this).data("guid")
            }).get(),
            invitations = a(".member.invited.selected").map(function() {
                return a(this).data("guid")
            }).get();
            var e = [],
            f = [];
            a(".invite-item").each(function() {
                var b = a(this),
                c = a.trim(b.find("input.invite-email").val()),
                d = b.find("select.invite-role").val();
                c && (e.push(c), f.push(d))
            }),
            e = e.join(","),
            f = f.join(","),
            d.data += "&members=" + membersGuid.join(",") + "&invitations=" + invitations.join(",") + "&emails=" + encodeURIComponent(e) + "&init_roles=" + encodeURIComponent(f)
        }).on("click", c + " .member", 
        function(b) {
            var c = a(b.currentTarget);
            c.toggleClass("selected")
        }).on("submit", c + " form.form", 
        function(b) {
            var c = a(this),
            d = !0,
            e = a.grep(a("input.invite-email"), 
            function(b, c) {
                return a.trim(a(b).val()) !== ""
            });
            return a("input.invite-email:first").closest(".form-item").find("p.error").remove(),
            a.each(e, 
            function(c, e) {
                var e = a(e),
                f = e.val(),
                g = a.trim(f);
                if (!mcw.validate.email(g).valid) {
                    var h = f.indexOf(g),
                    i = g + " 貌似没写对";
                    return mcw.selectText(b.currentTarget, h, g.length),
                    a('<p class="error">' + i + "</p>").appendTo(e.parent()),
                    d = !1,
                    !1
                }
            }),
            d
        }).on("click", c + " .link-show-invite", 
        function(b) {
            b.preventDefault(),
            a(b.target).hide().next().show()
        }).on("ajax:error", c + " form.form", mcw.inviteError).on("click", c + " #add-invite-item", mcw.addInviteItem).on("click", c + " .del-invite", mcw.removeInviteItem)
    })
} (jQuery),
function(a) {
    var b = "page-project-settings",
    c = "#" + b;
    a(function() {
        a(".wrapper").on("ajax:success", c + " form#form-info", 
        function(b, c) {
            a(".project-info").find(".name a").text(c.name).end().find(".desc").text(c.desc)
        }).on("ajax:beforeSend", c + " #btn-archive-project", 
        function(a) {
            mcw.globalLoading("正在归档项目..."),
            mcw.clearPageCache()
        }).on("ajax:beforeSend", c + " #btn-unarchive-project", 
        function(a) {
            mcw.globalLoading("正在激活项目..."),
            mcw.clearPageCache()
        }).on("click", c + " #btn-unarchive-denied", 
        function(b) {
            var c = a("#reach-max-msg").html();
            return mcw.message({
                msg: c,
                width: 550
            }),
            !1
        }).on("ajax:success", c + " #btn-archive-project", 
        function(a) {
            mcw.globalLoading("hide")
        }).on("ajax:success", c + " #btn-unarchive-project", 
        function(a) {
            mcw.globalLoading("hide")
        }).on("click", c + " #btn-del-project", 
        function(a) {
            a.preventDefault(),
            mcw.dialog({
                el: mcw.template("tpl-del-project"),
                modal: !0
            })
        }).on("click", c + " #btn-cancel-del", 
        function(a) {
            mcw.dialog("hide")
        }).on("click", c + " #btn-exec-del", 
        function(b) {
            var c = a(b.currentTarget),
            d = c.data("url");
            a.ajax({
                url: d,
                type: "post",
                dataType: "json",
                beforeSend: function() {
                    mcw.dialog("hide"),
                    mcw.globalLoading("正在删除项目...")
                },
                success: function(a) {
                    a.success && (mcw.globalLoading("hide"), mcw.stack({
                        url: a.target_url,
                        replace: !1,
                        root: !0,
                        restorePosition: !1
                    }))
                }
            })
        }).on("keyup", c + " #del-project-text", 
        function(b) {
            var c = a(b.currentTarget);
            c.val() === "DELETE" ? a("#btn-exec-del").prop("disabled", !1) : a("#btn-exec-del").prop("disabled", !0)
        })
    }),
    mcw.pages[b] = {
        init: function(b) {
            b.is("[data-archived], [data-locked], [data-deleted]") && a("#project-name, #project-desc, #btn-save-settings").attr("disabled", "disabled")
        }
    }
} (jQuery),
function(a) {
    var b = "page-project-members",
    c = "#" + b;
    a(function() {
        mcw.preloadImages(["/assets/icon-check-e5b477cb7a924487bf783a0e8a374a21.png"]),
        a("body").on("click", c + " .member", 
        function(b) {
            if (a("#btn-save-members").is(":disabled")) return;
            var c = a(b.currentTarget);
            c.toggleClass("selected")
        }).on("ajax:beforeSend", c + " form#form-members", 
        function(b, c, d) {
            membersGuid = a(".member.selected").map(function() {
                return a(this).data("guid")
            }).get(),
            invitations = a(".member.invited.selected").map(function() {
                return a(this).data("guid")
            }).get();
            var e = [],
            f = [];
            a(".invite-item").each(function() {
                var b = a(this),
                c = a.trim(b.find("input.invite-email").val()),
                d = b.find("select.invite-role").val();
                c && (e.push(c), f.push(d))
            }),
            e = e.join(","),
            f = f.join(","),
            d.data += "&members=" + membersGuid.join(",") + "&invitations=" + invitations.join(",") + "&emails=" + encodeURIComponent(e) + "&init_roles=" + encodeURIComponent(f)
        }).on("ajax:success", c + " form#form-members", 
        function(b, c) {
            var d = a("button[type=submit]", b.target).data("project-guid");
            d && mcw.members && delete mcw.members[d],
            a(".invite-item:first").find(".del-invite").remove().end().find("input").val("").end().siblings(".invite-item").remove();
            if (c.invitations) {
                var e = a("ul.members");
                a.each(c.invitations, 
                function(a, b) {
                    b.nickname = b.email,
                    mcw.template("tpl-invited-member", b).hide().appendTo(e).fadeIn()
                })
            }
        }).on("submit", c + " .form#form-members", 
        function(b) {
            var c = a(this),
            d = !0,
            e = a.grep(a("input.invite-email"), 
            function(b, c) {
                return a.trim(a(b).val()) !== ""
            });
            return a("input.invite-email:first").closest(".form-item").find("p.error").remove(),
            a.each(e, 
            function(c, e) {
                var e = a(e),
                f = e.val(),
                g = a.trim(f);
                if (!mcw.validate.email(g).valid) {
                    var h = f.indexOf(g),
                    i = g + " 貌似没写对";
                    return mcw.selectText(b.currentTarget, h, g.length),
                    a('<p class="error">' + i + "</p>").appendTo(e.parent()),
                    d = !1,
                    !1
                }
            }),
            d
        }).on("click", c + " .link-show-invite", 
        function(b) {
            b.preventDefault(),
            a(b.target).hide().next().show()
        }).on("ajax:error", c + " form#form-members", mcw.inviteError).on("click", c + " #add-invite-item", mcw.addInviteItem).on("click", c + " .del-invite", mcw.removeInviteItem)
    }),
    mcw.pages[b] = {
        init: function(b) {
            b.is("[data-archived], [data-locked], [data-deleted]") && a("#btn-save-members").attr("disabled", "disabled")
        }
    }
} (jQuery),
function(a) {
    var b = "page-project",
    c = "#" + b;
    a(function() {
        a(".wrapper").on("click", c + " div.todolists-completed .show-all a", 
        function(b) {
            b.preventDefault(),
            a(b.target).parent().next("span.all").show().end().remove()
        }).on("click.file", c + " .file .link-cancel", 
        function(b) {
            b.preventDefault();
            var c = a(b.currentTarget).closest(".file"),
            d = c.attr("fileid"),
            e = a(".btn-upload-file").data("uploader");
            d && c.hasClass("uploading") && e.cancel(d),
            c.removeClass("uploading").fadeOut(function() {
                c.siblings().length || a("div.init").show(),
                c.remove()
            })
        }).on("click", c + " .btn-new-discussion", 
        function(b) {
            b.preventDefault();
            var c = a(".form-new-discussion").show(),
            d = c.find(".editor");
            c.find("#txt-title").focus(),
            d.length || mcw.editor(a("#txt-content")),
            a(".init.init-discussion").hide()
        }).on("click", c + " #link-cancel-post", 
        function(b) {
            b.preventDefault();
            var c = a(".form-new-discussion"),
            d = c.find(".editor");
            if (d.length) {
                var e = d.data("editor");
                e.destroyEditor()
            }
            c.hide(),
            a(".init.init-discussion").show()
        }).on("ajax:success", c + " .form-new-discussion", 
        function(b, c) {
            a("#link-cancel-post").click(),
            a("#txt-title, txt-content").val("");
            var d = a(".messages");
            messageEl = a(c.html).hide().prependTo(d).fadeIn();
            var e = a(".link-more-topics");
            e.length && e.text(e.text().replace(/\d+/, 
            function(a) {
                return a * 1 + 1
            })),
            mcw.adjustDate(messageEl),
            a(".init.init-discussion").hide(),
            d.find(".message:gt(2)").hide(),
            d.find(".message:lt(3)").show()
        }).on("filedelete", c + " .file", 
        function(b, c) {
            var d = a(".link-more-files"),
            e = d.text().replace(/\d+/, 
            function(a) {
                return a * 1 - 1
            });
            d.text(e),
            c.siblings(".file").length || d.hide();
            var f = c.closest(".file-list");
            c.remove(),
            f.find(".file:gt(4)").hide(),
            f.find(".file:lt(5)").show()
        }).on("dropCustom", c + " .section-messages", 
        function(b, c, d) {
            var e = a(".btn-new-discussion");
            e.click();
            var f = a(".form-new-discussion .editor"),
            g = f.data("uploader");
            mcw.isScreenView(f) || mcw.scrollTo(f),
            d && a.each(d, 
            function(a, b) {
                g.uploadFile(b)
            })
        }).on("dropCustom", c + " .section-files", 
        function(b, c, d) {
            var e = a(".btn-upload-file");
            uploader = e.data("uploader"),
            mcw.isScreenView(e) || mcw.scrollTo(e),
            d && a.each(d, 
            function(a, b) {
                uploader.uploadFile(b)
            })
        })
    }),
    mcw.pages[b] = {
        init: function() {
            mcw.initTodoFilter(),
            mcw.sortTodos(),
            mcw.sortTodolists(),
            mcw.initUpload({
                countEl: a(".link-more-files"),
                beforeUpload: function() {
                    var b = a(".file-list");
                    b.find(".file:gt(4)").hide(),
                    b.find(".file:lt(5)").show()
                }
            }),
            mcw.me.admin || a(".link-admin").remove(),
            mcw.adjustCCList(),
            mcw.adjustTodo(),
            mcw.adjustTodoFilter(),
            mcw.adjustFile()
        }
    }
} (jQuery),
function(a) {
    a(function() {
        var b = a("#page-reset-password");
        if (b.length < 1) return;
        b.on("ajax:success", "form.form", 
        function(b, c) {
            var d = a(".center-box .bd").empty();
            mcw.template("template-success").appendTo(d)
        })
    })
} (jQuery),
function(a) {
    function d(b) {
        var c = a("#keyword").val(),
        d = new RegExp(c, "ig");
        b || (b = a("ul.results")),
        b.find("p,a,span").filter(':icontains("' + c + '")').each(function() {
            var b = a(this);
            if (this.childNodes.length === 1 && this.childNodes[0].nodeType === 3) {
                var c = b.html();
                b.html(c.replace(d, 
                function(a) {
                    return '<span class="match">' + a + "</span>"
                }))
            }
        })
    }
    var b = "page-search-result",
    c = "#" + b;
    a.expr[":"].icontains = function(a, b, c, d) {
        return (a.textContent || a.innerText || jQuery(a).text() || "").toLowerCase().indexOf(c[3].toLowerCase()) >= 0
    },
    a(function() {
        a(document).on("change", c + " select.category", 
        function(b) {
            var c = a(b.target),
            d = c.val(),
            e = location.search.replace(/&category=\d+/, "") + "&category=" + d;
            mcw.stack({
                url: location.pathname + e,
                nocache: !0,
                root: !0
            })
        })
    }),
    mcw.pages[b] = {
        init: function() {
            if (!a("#btn-load-more").length) return;
            mcw.scrollLoad(c, 
            function(b) {
                return a.ajax({
                    url: location.pathname + location.search,
                    dataType: "html",
                    type: "get",
                    data: {
                        page: a(".results:last").data("page") * 1 + 1
                    },
                    success: function(c) {
                        if (c) {
                            var e = a(c).find("ul.results");
                            b.before(e),
                            d(e)
                        }
                    }
                })
            }),
            d()
        }
    }
} (jQuery),
function(a) {
    var b = "page-team-settings",
    c = "#" + b;
    a(function() {
        a("body").on("click", c + " .team-name a.edit", 
        function(b) {
            b.preventDefault();
            var c = a(this).parents("h3:first").hide().find(".name").text(),
            d = a("form.form-team").show();
            d.find("input").val(c).focus()
        }).on("ajax:success", c + " .form-team", 
        function(b, c) {
            var d = a(this),
            e = c.name;
            d.find("input").val("").end().hide().siblings("h3").find(".name").text(e).end().show()
        }).on("keydown", ".form-team", 
        function(b) {
            b.keyCode === 27 && (b.preventDefault(), a(b.currentTarget).find(".btn-cancel").click())
        }).on("click", c + " .team-name .btn-cancel", 
        function(b) {
            a(this).parents("form:first").hide().find("input").val("").end().siblings("h3").show()
        }).on("click", c + " #btn-del-team", 
        function(a) {
            a.preventDefault(),
            mcw.dialog({
                el: mcw.template("tpl-del-team"),
                width: 660,
                modal: !0
            })
        }).on("click", c + " #btn-cancel-del", 
        function(a) {
            mcw.dialog("hide")
        }).on("click", c + " #btn-exec-del", 
        function(b) {
            var c = a(b.currentTarget),
            d = c.data("url");
            a.ajax({
                url: d,
                type: "post",
                dataType: "json",
                beforeSend: function() {
                    mcw.dialog("hide"),
                    mcw.globalLoading("正在删除团队...")
                },
                success: function(a) {
                    a.success && (mcw.globalLoading("hide"), location.href = a.target_url)
                }
            })
        }).on("keyup", c + " #del-team-text", 
        function(b) {
            var c = a(b.currentTarget);
            c.val() === "DELETE" ? a("#btn-exec-del").prop("disabled", !1) : a("#btn-exec-del").prop("disabled", !0)
        }).on("ajax:beforeSend", c + " .form-trans-account", 
        function(b) {
            var c = a("button[type=submit]", this);
            mcw.tinyLoading(c)
        }).on("ajax:success", c + " .form-trans-account", 
        function(a, b) {
            b.success && (location.href = b.next_url)
        }).on("ajax:complete", c + " .form-trans-account", 
        function(a, b) {
            mcw.tinyLoading(btn, !1)
        })
    })
} (jQuery),
function(a) {
    function d(b) {
        b.preventDefault(),
        b.stopPropagation();
        var d = a(b.currentTarget);
        if (d.hasClass("visible")) {
            a(document).trigger("click.badge");
            return
        }
        a(document).trigger("click.badge");
        var e = d.parent(".folder"),
        f = e.attr("class"),
        g = f.match(/c\d+/)[0],
        h = f.match(/i\d+/)[0],
        i = d.offset(),
        j = a(c).offset(),
        k = mcw.template("tpl-badge", {});
        d.addClass("visible"),
        k.find("li." + g).addClass("selected").end().find(".icons li").addClass(g).filter("." + h).addClass("selected"),
        k.appendTo(c).css({
            top: i.top - j.top + 18,
            left: i.left - j.left - k.width() / 2 - 23
        }),
        a(document).one("click.badge", 
        function(b) {
            a(".badge-edit.visible").removeClass("visible"),
            a(".badge-settings").remove(),
            a(document).unbind("keyup.badge")
        }).bind("keyup.badge", 
        function(b) {
            b.keyCode == 27 && (b.preventDefault(), a(document).trigger("click.badge"))
        })
    }
    function e(b) {
        b.preventDefault(),
        b.stopPropagation();
        var c = a(b.currentTarget);
        if (c.hasClass("selected")) return;
        var d = c.attr("class");
        c.siblings(".selected").removeClass("selected").end().addClass("selected"),
        a(".badge-settings .icons li").each(function() {
            var b = a(this).attr("class").replace(/c\d+/, d);
            a(this).attr("class", b)
        });
        var e = a(".badge-edit.visible").parent(".folder");
        e.attr("class", e.attr("class").replace(/c\d+/, d)),
        g(e)
    }
    function f(b) {
        b.preventDefault(),
        b.stopPropagation();
        var c = a(b.currentTarget);
        if (c.hasClass("selected")) return;
        var d = c.attr("class").match(/i\d+/)[0];
        c.siblings(".selected").removeClass("selected").end().addClass("selected");
        var e = a(".badge-edit.visible").parent(".folder");
        e.attr("class", e.attr("class").replace(/i\d+/, d)),
        g(e)
    }
    function g(b) {
        var c = b.attr("href") + "/badge",
        d = b.attr("class").match(/c(\d+)/)[1],
        e = b.attr("class").match(/i(\d+)/)[1];
        a.ajax({
            url: c,
            type: "post",
            dataType: "json",
            data: {
                color_id: d - 1,
                icon_id: e - 1
            },
            success: function(a) { !! a.success
            }
        })
    }
    var b = "page-team-show",
    c = "#" + b;
    a(function() {
        mcw.preloadImages(["/assets/icon-info-f6c72fc53772306ae1b88ece8f1199ad.png", "/assets/project-badge-settings-bg-abdfe0f433044519c1e382f9087485f0.png"]),
        a("body").on("click", c + " .denied", 
        function(a) {
            return mcw.message({
                msg: '只有管理员能够创建项目。<br/>去找<a href="/members/">其他管理员</a>为你授权或者帮你创建吧。'
            }),
            !1
        }).on("click", c + " .reach-max:not(.denied)", 
        function(b) {
            var c = a(b.target),
            d = a("#reach-max-msg").html();
            return mcw.message({
                msg: d,
                width: 550
            }),
            !1
        }).on("click", c + " .badge-edit", d).on("click", c + " .color-sets li", e).on("click", c + " .icons li", f).on("click", c + " .badge-settings", 
        function(a) {
            a.preventDefault(),
            a.stopPropagation()
        }).on("ajax:success", c + " .resend-email-verify", 
        function(a, b) {
            b.success ? mcw.message({
                msg: "验证邮件发送成功，请注意查收"
            }) : mcw.message({
                msg: b.msg
            })
        })
    }),
    mcw.pages[b] = {
        init: function() {
            a("#nav-project").addClass("active"),
            a(".projects").sortable({
                handle: ".folder",
                items: ".project:not(.new)",
                cursor: "pointer",
                distance: 20,
                revert: 100,
                tolerance: "pointer",
                placeholder: "proj-placeholder",
                start: function(b, c) {
                    a(document).trigger("click.badge")
                },
                update: function(b, c) {
                    var d = a("div.project"),
                    e = d.map(function() {
                        return a(this).data("access-id")
                    }).get();
                    a.ajax({
                        url: "/projects/reorder/",
                        type: "post",
                        dataType: "json",
                        data: {
                            ids: e.join(",")
                        }
                    })
                }
            })
        }
    }
} (jQuery),
function(a) {
    var b = "page-todo",
    c = "#" + b;
    a(function() {
        a(document).on("click", c + " .detail-action-del", 
        function(b) {
            b.preventDefault(),
            a(".topic .todo .del").trigger("click")
        }).on("click", c + " .detail-action-edit", 
        function(b) {
            b.preventDefault(),
            a(".topic .todo .edit").trigger("click")
        })
    }),
    mcw.pages[b] = {
        init: function() {
            mcw.adjustTodo(),
            mcw.adjustCCList(),
            mcw.adjustAuthor(),
            mcw.adjustProjInfo(),
            mcw.adjustStar()
        },
        update: function(b) {
            if (!b.todo) return;
            if (b.todo.updated) {
                var c = a(".workspace .page:last");
                if (c.is("[data-deleted]")) return mcw.stack({
                    url: location.href,
                    nocache: !0
                }),
                !1;
                var d = a(b.todo.updated),
                e = a(".todo");
                d.toggle(e.is(":visible")),
                e.replaceWith(d),
                mcw.adjustDate(d),
                mcw.adjustTodo(d)
            }
            if (b.todo.deleted) return mcw.stack({
                url: location.href,
                nocache: !0
            }),
            !1
        }
    }
} (jQuery),
function(a) {
    var b = "page-todolist",
    c = "#" + b;
    a(function() {
        a(document).on("click", c + " .detail-action-edit", 
        function(b) {
            b.preventDefault();
            var c = a(".todolist .title");
            c.is(":visible") ? (c.hide(), a(".todolist-actions .edit").trigger("click")) : a("input.todolist-name").focus()
        }).on("click", c + " .detail-action-del", 
        function(b) {
            b.preventDefault(),
            a(".todolist-actions .del").trigger("click")
        }).on("ajax:beforeSend", c + " .link-more-completed", 
        function(b, c, d) {
            var e = a(this).prev(".todos-completed").find(".todo:last").data("updated-at");
            d.data += "&till=" + e
        }).on("ajax:success", c + " .link-more-completed", 
        function(b, d) {
            d.html ? a(c + " .todolist .todos-completed").append(d.html) : (mcw.tinyLoading(this, !1), a(this).remove())
        })
    }),
    mcw.pages[b] = {
        init: function(b) {
            mcw.initTodoFilter(),
            mcw.sortTodos(),
            mcw.adjustTodo(),
            mcw.adjustTodoFilter(),
            mcw.adjustProjInfo(),
            mcw.adjustStar(),
            b.is("[data-archived], [data-locked], [data-deleted]") && a(".todolist-stick-checkbox").attr("disabled", "disabled");
            var c = a("#tpl-todos-completed");
            if (c.length) {
                var d = mcw.template("tpl-todos-completed"),
                e = d.data("length");
                a(".todolist .todos-completed").replaceWith(d),
                d.find(".todo").length < e && a("<a/>", {
                    href: d.data("url"),
                    "class": "link-more-completed",
                    text: "更多已完成任务...",
                    "data-remote": "true",
                    "data-method": "post",
                    "data-loading": ""
                }).insertAfter(d),
                c.remove()
            }
        },
        update: function(b) {
            var c = a(".todolist");
            if (!b.todolist) return;
            b.todolist.deleted && mcw.stack({
                url: location.href,
                nocache: !0,
                replace: !0
            });
            if (b.todolist.updated) {
                var d = b.todolist.updated;
                d.name && c.find(".title h4 a").text(d.name),
                d.position && (c.data("sort", d.position), needResort = !0)
            }
        }
    }
} (jQuery),
function(a) {
    var b = "page-todolists",
    c = "#" + b;
    a(function() {}),
    mcw.pages[b] = {
        init: function() {
            mcw.initTodoFilter(),
            mcw.sortTodos(),
            mcw.sortTodolists(),
            mcw.adjustTodo(),
            mcw.adjustTodoFilter()
        }
    }
} (jQuery),
function(a) {
    var b = "page-completed-todos",
    c = "#" + b;
    a(function() {
        a("body").on("change", c + " #select-member", 
        function(b) {
            location.href = location.pathname + "?by_member=" + a(this).val()
        })
    }),
    mcw.pages[b] = {
        init: function() {
            mcw.scrollLoad(c, 
            function(b) {
                return a.ajax({
                    url: location.pathname,
                    dataType: "html",
                    data: {
                        till: a(".day:last").attr("data-date"),
                        by_member: a("#select-member").val()
                    },
                    success: function(a) {
                        a && b.before(a)
                    }
                })
            })
        }
    }
} (jQuery),
function(a) {
    var b = "page-member-completed-todos",
    c = "#" + b;
    a(function() {}),
    mcw.pages[b] = {
        init: function() {
            mcw.scrollLoad(c, 
            function(b) {
                return a.ajax({
                    url: location.pathname,
                    dataType: "html",
                    data: {
                        till: a(".day:last").attr("data-date")
                    },
                    success: function(a) {
                        a && b.before(a)
                    }
                })
            })
        }
    }
} (jQuery),
function(a) {
    var b = "page-attachments",
    c = "#" + b;
    a(function() {
        a(document).on("filedelete", c + " .file", 
        function(b, c) {
            c.siblings().length || c.closest(".day").hide(),
            a(".day:visible").length || a("div.init-file").show()
        }).on("dropCustom", c + " .page-inner", 
        function(b, c, d) {
            var e = a(".btn-add-files");
            uploader = e.data("uploader"),
            mcw.isScreenView(e) || mcw.scrollTo(e),
            d && a.each(d, 
            function(a, b) {
                uploader.uploadFile(b)
            })
        })
    }),
    mcw.pages[b] = {
        init: function(b) {
            mcw.adjustFile();
            var c = a(".day:first"),
            d = mcw.now().startOf("day");
            if (!c.length) {
                var e = a("div.init-file");
                c = mcw.template("tpl-today", {
                    date: d.format("YYYY-MM-DD")
                }).insertBefore(e).hide()
            } else ! moment(c.data("date")).diff(d) || (c = mcw.template("tpl-today", {
                date: d.format("YYYY-MM-DD")
            }).insertBefore(c).hide());
            b.is("[data-archived], [data-locked], [data-deleted]") ? b.find(".btn-add-files").remove() : mcw.initUpload({
                btn: a(".btn-add-files"),
                container: c.find(".file-list"),
                beforeUpload: function() {
                    c.show()
                },
                onCancel: function(b) {
                    b.siblings().length || b.closest(".day").hide(),
                    a(".day:visible").length || a("div.init-file").show()
                }
            }),
            mcw.scrollLoad(b, 
            function(b) {
                return a.ajax({
                    url: location.pathname,
                    type: "get",
                    dataType: "html",
                    data: {
                        till: a(".day:last").attr("data-date")
                    },
                    success: function(a) {
                        a && b.before(a)
                    }
                })
            })
        }
    }
} (jQuery),
function(a) {
    function e() {
        var b = a(".detail-action-newver"),
        c = a(".cancel-update-version");
        uploadUrl = b.data("url"),
        d = mcw.upload(b, {
            action: uploadUrl,
            multiple: !1,
            beforeUpload: function(a) {
                b.hide().next(".cancel-update-version").data("fileid", a.id).show()
            },
            onProgress: function(a, e, f) {
                var g = e / f;
                g = (g * 100).toFixed(0) + "%",
                c.text(g + " ✖"),
                c.click(function() {
                    d.cancel(c.data("fileid")),
                    b.show().next(".cancel-update-version").hide()
                })
            },
            onSuccess: function(a, b) {
                c.addClass("success").text("✔ 上传成功"),
                window.location.href = b.target_url
            },
            onValidate: function(a, b) {
                return a.size && a.size / 1048576 > 50 ? (mcw.message({
                    msg: '附件 <em style="color: #ee6500;">' + a.name + "</em> 大小超过50MB, 无法完成上传",
                    width: 500
                }), !1) : !0
            },
            onCancel: function(a) {},
            onError: function(a, b) {},
            onComplete: function(a, b) {}
        }),
        b.data("uploader", d)
    }
    var b = "page-file",
    c = "#" + b,
    d;
    a(function() {
        a("body").on("ajax:beforeSend", c + " .detail-action-del", 
        function(a) {
            mcw.globalLoading("正在删除文件...")
        }).on("ajax:success", c + " .detail-action-del", 
        function(a) {
            mcw.globalLoading("hide")
        }).on("mouseenter", c + " .detail-actions", 
        function(a) {
            e()
        }).on("click", c + " .cancel-update-version", 
        function() {
            var b = a(this),
            c = b.prev();
            d.cancel(b.data("fileid")),
            b.hide(),
            c.show()
        }).on("click", c + " .detail-action-changetitle", 
        function() {
            a(c + " .file-title-change-form").show(),
            a(c + " h3.file-title-wrap").hide(),
            a(c + " .file-title-change-form input").focus()
        }).on("ajax:success", ".file-title-change-form form", 
        function(b, d) {
            a(c + " h3.file-title-wrap .file-title").html(d.title),
            a(c + " .file-title-change-form").hide(),
            a(c + " h3.file-title-wrap").show()
        }),
        a(document).on("beforestack", 
        function() {
            d = null
        })
    }),
    mcw.pages[b] = {
        init: function(a) {
            mcw.adjustCCList(),
            mcw.adjustAuthor(),
            mcw.adjustFile(),
            mcw.adjustProjInfo(),
            mcw.adjustStar()
        },
        update: function(b) {
            if (!b.upload) return;
            if (b.upload.updated) {
                var c = a(".workspace .page:last");
                if (c.is("[data-deleted]")) return mcw.stack({
                    url: location.href,
                    nocache: !0
                }),
                !1;
                var d = a(b.upload.updated),
                e = a(".upload");
                d.toggle(e.is(":visible")),
                e.replaceWith(d),
                mcw.adjustDate(d),
                mcw.adjustPermission(d)
            }
            if (b.upload.deleted) return mcw.stack({
                url: location.href,
                nocache: !0
            }),
            !1
        }
    }
} (jQuery),
function(a) {
    var b = "page-folders",
    c = "#" + b;
    a(function() {}),
    mcw.pages[b] = {
        init: function() {}
    }
} (jQuery),
function(a) {
    var b = "page-folder",
    c = "#" + b;
    a(function() {}),
    mcw.pages[b] = {
        init: function(a) {
            mcw.adjustFile()
        }
    }
} (jQuery),
function(a) {
    var b = "page-launchpad",
    c = "#" + b;
    a(function() {
        a("body").on("click", c + " #btn-new-team", 
        function(a) {
            a.preventDefault(),
            mcw.dialog({
                el: mcw.template("tpl-new-team"),
                width: 600
            }).find("#txt-team").placeholder().focus()
        }).on("click", c + " #btn-cancel-create-team", 
        function(a) {
            a.preventDefault(),
            mcw.dialog("hide")
        })
    })
} (jQuery),
function(a) {
    var b = "page-apply-free",
    c = "#" + b;
    a(function() {
        a(c + " textarea").autosize(),
        a("body").on("click", c + " .btn-add-attach", 
        function(b) {
            b.preventDefault();
            var c = a("p.attachment:last");
            c.clone().insertAfter(c)
        }).on("change", c + " #category", 
        function(b) {
            var c = a(this);
            c.val() === "1" ? a("#form-item-attach").show().find("input").data("validate", "required").attr("data-validate", "required") : a("#form-item-attach").hide().find("input").val("").removeData("validate").removeAttr("data-validate")
        })
    })
} (jQuery),
function(a) {
    function g(b) {
        b.preventDefault();
        var c = a(this),
        d = a(this).closest(".calendar-wrapper");
        d.hasClass("expand") ? (d.removeClass("expand"), c.html("&#8677;").attr("title", "隐藏侧边栏"), localStorage.removeItem("calendarExpanded")) : (d.addClass("expand"), c.html("&#8676;").attr("title", "显示侧边栏"), localStorage.calendarExpanded = !0)
    }
    function i(b) {
        function o(n) {
            e = n.calendar_events,
            f = n.todos;
            if (b) {
                var o = localStorage.calEventFilter;
                o = o ? o.split(",") : null;
                var p = a(".standard-cals .cal-list").empty();
                a.each(n.calendars, 
                function(b, c) {
                    var d = mcw.template("tpl-cal-item", {
                        guid: c.guid,
                        color: c.calendar_color,
                        name: c.name
                    });
                    p.append(d),
                    d.data("cal", c),
                    d.find(".link-cal-setting").attr("data-url", "/calendars/" + c.guid + "/update/"),
                    o && (a.inArray(c.guid, o) > -1 ? d.find(".link-show-cal").addClass("selected") : d.find(".link-show-cal").removeClass("selected"))
                }),
                mcw.calendars = n.calendars;
                var q = a(".project-cals .cal-list").empty();
                a.each(n.projects, 
                function(b, c) {
                    var d = mcw.template("tpl-cal-item", {
                        guid: c.guid,
                        color: c.calendar_color,
                        name: c.name
                    });
                    q.append(d),
                    d.attr("data-project", "true").data("cal", c),
                    d.find(".link-cal-setting").attr("data-url", "/projects/" + c.guid + "/calendar_color/"),
                    o && (a.inArray(c.guid, o) > -1 ? d.find(".link-show-cal").addClass("selected") : d.find(".link-show-cal").removeClass("selected")),
                    c.hidden && d.addClass("hide")
                }),
                mcw.projects = n.projects,
                q.find("li:not(.hide)").length ? q.closest(".project-cals").show() : q.closest(".project-cals").hide(),
                mcw.calendars.length ? a(".no-cal-tour").hide() : a(".link-create-calendar:visible").length && a(".no-cal-tour").show(),
                h = null
            } else {
                var q = a(".project-cals .cal-list");
                a.each(n.projects, 
                function(a, b) {
                    var c = q.find("[data-guid=" + b.guid + "]");
                    b.hidden ? c.addClass("hide") : c.removeClass("hide")
                }),
                mcw.projects = n.projects
            }
            var r = g.data("calendar"),
            s = j();
            filteredTodos = k(),
            r && r.month.isSame(m) ? (r.renderEvents(s), r.renderTodos(filteredTodos)) : mcw.calendar(g, {
                month: m,
                events: s,
                todos: filteredTodos,
                onDayClick: w
            }),
            d[i] = n,
            a(c + " .cal-loading").hide(),
            i != l.format("YYYY-MM") ? a(".btn-today").show() : a(".btn-today").hide()
        }
        var g = a(".calendar"),
        i = g.data("month"),
        l = mcw.now().startOf("day");
        i || (i = l.format("YYYY-MM"), g.attr("data-date", i).data("date", i));
        var m = moment(i, "YYYY-MM");
        a(c + " .calendar-topbar h3").find(".month").text(m.format("MMMM")).end().find(".year").text(m.year());
        if (!b) a(c + " .cal-loading").show();
        else {
            var n = a(".popover-target");
            n.each(function() {
                mcw.popover(a(this), "hide")
            }),
            a("*[tooltip]").trigger("mouseleave"),
            a(document).trigger("mousedown.notipop")
        }
        d[i] && o(d[i]),
        h && (h.abort(), h = null),
        h = a.ajax({
            type: "get",
            url: g.data("url"),
            data: {
                start: m.clone().startOf("week").add("d", 1).format("YYYY-MM-DD"),
                end: m.clone().endOf("month").endOf("week").add("d", 1).format("YYYY-MM-DD")
            }
        }).done(o)
    }
    function j() {
        var b = [],
        c = [];
        return a(".cal-list .link-show-cal.selected").each(function(d, f) {
            var g = a(f).closest("li"),
            h = g.data("guid");
            a.each(e, 
            function(a, b) {
                b.caleventable_guid == h && c.push(b)
            }),
            b.push(h)
        }),
        localStorage.calEventFilter = b.join(","),
        c
    }
    function k() {
        var b = [];
        return a(".cal-list .link-show-cal.selected").each(function(c, d) {
            var e = a(d).closest("li"),
            g = e.data("guid");
            a.each(f, 
            function(a, c) {
                c.project_guid == g && b.push(c)
            })
        }),
        b
    }
    function l(b) {
        b.preventDefault();
        var c = a(this).closest("li"),
        d = c.find(".link-show-cal").toggleClass("selected"),
        e = a(".calendar"),
        f = e.data("calendar");
        f && (f.renderEvents(j()), f.renderTodos(k()))
    }
    function m(b) {
        var c = a(this).siblings(".link-show-cal"),
        d = a(".cal-list"),
        e = a(".calendar").data("calendar");
        if (!e) return;
        c.hasClass("selected") && d.find("li .link-show-cal.selected").length == 1 ? d.find("li .link-show-cal").addClass("selected") : (d.find(".link-show-cal").removeClass("selected"), c.addClass("selected")),
        e.renderEvents(j()),
        e.renderTodos(k())
    }
    function n(b) {
        b.preventDefault();
        var c = a(".calendar"),
        d = c.data("calendar"),
        e = d.month.clone().add("months", -1);
        c.attr("data-month", e.format("YYYY-MM")).data("month", e.format("YYYY-MM")),
        i()
    }
    function o(b) {
        b.preventDefault();
        var c = a(".calendar"),
        d = c.data("calendar"),
        e = d.month.clone().add("months", 1);
        c.attr("data-month", e.format("YYYY-MM")).data("month", e.format("YYYY-MM")),
        i()
    }
    function p(b) {
        b.preventDefault();
        var c = mcw.now().format("YYYY-MM"),
        d = a(".calendar");
        d.attr("data-month", c).data("month", c),
        i()
    }
    function q(b) {
        b.preventDefault();
        var c = a(this),
        d = a(".calendar").data("calendar"),
        e = c.closest(".form"),
        f = e.closest(".cal-event-popover"),
        g = f.data("event"),
        h = e.find("#txt-event-content"),
        i = a.trim(h.val()),
        j = e.find("input[name=starts_at]").val(),
        k = e.find("input[name=ends_at]").val(),
        l = e.attr("action"),
        m = e.find("input[name=caleventable_type]").val(),
        n = e.find("#select-cal option:selected"),
        o = n.val(),
        p = n.data("color"),
        q = g.data("guid");
        remindGuids = "";
        if (!i) {
            h.addClass("error");
            return
        }
        h.removeClass("error"),
        e.find(".cb-notify").is(":checked") && (remindGuids = e.find("input[name='member_guids[]']").map(function() {
            return a(this).val()
        }).get().join(",")),
        mcw.popover(g.find(".content span"), "hide"),
        d.replaceEvent(q, {
            content: i,
            guid: q,
            creator_guid: mcw.me.guid,
            starts_at: j,
            ends_at: k,
            caleventable_guid: o,
            calendar_color: p,
            caleventable_name: ""
        }).addClass("loading"),
        a.ajax({
            url: l,
            data: {
                content: i,
                starts_at: j,
                ends_at: k,
                remind_guids: remindGuids,
                caleventable_type: m,
                caleventable_guid: o
            }
        }).always(function(b, c) {
            if (c == "success") {
                d.replaceEvent(q, b.calendar_event),
                s(q, b.calendar_event);
                if (m == "Project") {
                    var e = a(".project-cals").show();
                    e.find("li[data-guid=" + b.calendar_event.caleventable_guid + "]").removeClass("hide")
                }
            } else d.removeEvent(q, "anim"),
            s(q)
        })
    }
    function r(b) {
        b.preventDefault();
        var c = a(this),
        d = c.closest(".popover"),
        e = d.data("target"),
        f = e.closest(".cal-todo"),
        g = f.data("todo"),
        h = d.find("#txt-todo-content"),
        i = h.val(),
        j = d.find("input[name=due_date]").val(),
        k = d.find(".todo-assignee").val();
        if (!i) {
            h.addClass("error");
            return
        }
        h.removeClass("error"),
        mcw.popover(e, "hide"),
        f.addClass("loading").find(".todo-content span").text(mcw.truncate(i, 18)),
        a.ajax({
            url: "/projects/" + g.project_guid + "/todos/" + g.guid + "/edit/",
            data: {
                assignee_guid: k,
                todo_content: i,
                due_at: j || undefined
            }
        }).always(function(b, c) {
            var d = a(".calendar").data("calendar");
            c == "success" && b.due_at ? (d.replaceTodo(g.guid, b), t(g.guid, b)) : (d.removeTodo(g.guid), t(g.guid))
        })
    }
    function s(b, c) {
        var d = -1;
        a.each(e, 
        function(a, c) {
            c.guid == b && (d = a)
        }),
        d > -1 ? c ? e.splice(d, 1, c) : e.splice(d, 1) : e.push(c)
    }
    function t(b, c) {
        var d = -1;
        a.each(f, 
        function(a, c) {
            c.guid == b && (d = a)
        }),
        d > -1 ? c ? f.splice(d, 1, c) : f.splice(d, 1) : f.push(c)
    }
    function u(b) {
        b.preventDefault();
        var c = a(this),
        d = c.closest(".form"),
        e = c.next(".select-event-date");
        if (e.length) {
            e.remove();
            return
        }
        d.find(".select-event-date").remove();
        var e = mcw.template("tpl-date-popover"),
        f = e.find(".txt-event-date").val(c.data("date"));
        mcw.datepicker(f, {
            inline: !0,
            onSelect: function(a) {
                c.text(a.format("YYYY年MM月DD日")).attr("data-date", a.format("YYYY-MM-DD")).data("date", a.format("YYYY-MM-DD"));
                if (c.is(".link-start-time")) {
                    var b = d.find(".link-end-time"),
                    f = moment(b.data("date"), "YYYY-MM-DD");
                    a.diff(f) > 0 && (f = a.clone().endOf("day"), b.text(f.format("YYYY年MM月DD日")).attr("data-date", f.format("YYYY-MM-DD")).data("date", f.format("YYYY-MM-DD")), b.siblings("[name=ends_at]").val(f.endOf("day").format("YYYY-MM-DD HH:mm:ss Z"))),
                    c.siblings("[name=starts_at]").val(a.format("YYYY-MM-DD HH:mm:ss Z"))
                } else if (c.is(".link-end-time")) {
                    var g = d.find(".link-start-time"),
                    h = moment(g.data("date"), "YYYY-MM-DD");
                    a.diff(h) < 0 && (h = a.clone().startOf("day"), g.text(h.format("YYYY年MM月DD日")).attr("data-date", h.format("YYYY-MM-DD")).data("date", h.format("YYYY-MM-DD")), g.siblings("[name=starts_at]").val(h.format("YYYY-MM-DD HH:mm:ss Z"))),
                    c.siblings("[name=ends_at]").val(a.endOf("day").format("YYYY-MM-DD HH:mm:ss Z"))
                } else c.is(".link-due-date") && c.siblings("[name=due_date]").val(a.valueOf());
                e.remove()
            }
        }),
        c.is(".link-due-date") ? e.find(".link-no-due-date").click(function(a) {
            a.preventDefault(),
            c.text("没有截止时间").attr("data-date", "").data("date", ""),
            c.siblings("[name=due_date]").val(""),
            e.remove()
        }) : e.find(".no-due-date").remove();
        var g = c.position();
        e.css({
            top: g.top + c.outerHeight() + 5,
            left: g.left
        }).insertAfter(c),
        c.closest(".popover").one("click.eventpopover", 
        function(b) {
            var c = a(b.target);
            if (c.closest(".select-event-date").length || c.is(".link-start-time, .link-end-time, .link-due-date")) return;
            a(this).find(".select-event-date").remove().off(".eventpopover")
        })
    }
    function v(b, c) {
        var d = b.find("#select-cal").empty();
        a.each(mcw.calendars, 
        function(b, c) {
            a("<option/>", {
                value: c.guid,
                text: c.name,
                "data-color": c.calendar_color
            }).data("calendar", c).appendTo(d)
        }),
        mcw.calendars.length && mcw.projects.length && a("<option disabled>------</option>").appendTo(d),
        a.each(mcw.projects, 
        function(b, c) {
            a("<option/>", {
                value: c.guid,
                text: c.name,
                "data-project": "true",
                "data-color": c.calendar_color
            }).data("calendar", c).appendTo(d)
        }),
        c && d.val(c);
        var e = b.find(".select-members"),
        f = e.find("option[value=" + mcw.me.guid + "]");
        return f.length || a("<option/>", {
            value: mcw.me.guid,
            text: mcw.me.nickname,
            "class": "opt-member"
        }).insertBefore(e.find(".opt-member:first")),
        e.data("options", e.html()),
        d.on("change", 
        function(c) {
            var d = a(this).find("option:selected"),
            f = b.find("[name=caleventable_type]"),
            g = d.data("calendar");
            d.is("[data-project]") ? f.val("Project") : f.val("Calendar"),
            g.member_guids = g.member_guids || [],
            e.html(e.data("options")),
            e.find("option.opt-member").attr("disabled", "disabled"),
            a.each(g.member_guids, 
            function(a, b) {
                e.find("option[value=" + b + "]").removeAttr("disabled")
            }),
            e.find("option.opt-member:disabled").remove(),
            b.find(".member-list li").each(function() {
                var b = a(this),
                c = b.data("guid"),
                d = e.find(".opt-member[value=" + c + "]");
                d.length ? d.prop("disabled", !0) : b.remove()
            })
        }).change(),
        d
    }
    function w(b) {
        var d = b.cal.el.find(".popover-target");
        if (d.length) {
            mcw.popover(d, "hide");
            return
        }
        if (a(c).is("[data-locked]")) return;
        if (!mcw.calendars.length && !mcw.projects.length) return;
        var e = moment(b.dayEl.data("date"), "YYYY-MM-DD"),
        f = e.clone().endOf("day"),
        g = a(".cal-list .link-show-cal.selected:first").closest("li").data("guid"),
        h = mcw.template("tpl-event-popover"),
        i = v(h, g);
        b.cal.removeEvent("PLACEHOLDER");
        var j = b.cal.addEvent({
            content: "新的日程安排",
            guid: "PLACEHOLDER",
            creator_guid: "",
            starts_at: e.format("YYYY-MM-DD HH:mm:ss Z"),
            ends_at: f.format("YYYY-MM-DD HH:mm:ss Z"),
            caleventable_guid: i.val(),
            calendar_color: i.find("option:selected").data("color")
        }).addClass("active placeholder");
        mcw.popover(j.find(".content span"), {
            content: h
        }),
        h.find("#txt-event-content").keydown(C).autosize({
            callback: function() {
                mcw.popover(j.find(".content span"), "refresh")
            }
        }).placeholder().focus(),
        h.find(".link-start-time").text(e.format("YYYY年MM月DD日")).attr("data-date", e.format("YYYY-MM-DD")).siblings("input[name=starts_at]").val(e.format("YYYY-MM-DD HH:mm:ss Z")),
        h.find(".link-end-time").text(f.format("YYYY年MM月DD日")).attr("data-date", f.format("YYYY-MM-DD")).siblings("input[name=ends_at]").val(f.format("YYYY-MM-DD HH:mm:ss Z")),
        h.find(".notify-text").show().siblings("span").remove(),
        h.data("event", j),
        mcw.popover(j.find(".content span"), "refresh")
    }
    function x(b) {
        var c = a(this),
        d = a(this).closest(".popover");
        a(this).is(":checked") ? d.find(".cc-members").show() : d.find(".cc-members").hide(),
        mcw.popover(d.data("target"), "refresh")
    }
    function z(b) {
        var d = a(this),
        e = d.is(":checked"),
        f = d.closest(".cal-todo"),
        g = f.data("guid"),
        h = f.data("calendar-guid"),
        i = "/projects/" + h + "/todos/" + g + (e ? "/complete/": "/reopen/");
        if (f.hasClass("active") || a(c).is("[data-locked]")) return ! 1;
        y && (y.abort(), y = null),
        y = a.ajax({
            url: i,
            dataType: "json",
            type: "post",
            success: function(b) {
                var c = a(".calendar").data("calendar");
                if (c) {
                    var d = c.replaceTodo(g, b);
                    t(g, b),
                    mcw.adjustTodo(d)
                }
            }
        })
    }
    function A(b) {
        var d = a(".calendar .popover-target");
        if (d.length) {
            mcw.popover(d, "hide");
            return
        }
        var e = a(this),
        f = e.data("event"),
        g = f.content,
        h = moment(f.starts_at, "YYYY-MM-DD HH:mm:ss Z"),
        i = moment(f.ends_at, "YYYY-MM-DD HH:mm:ss Z"),
        j = f.guid,
        k = f.creator_guid,
        l = f.caleventable_guid,
        m = mcw.template("tpl-event-popover"),
        n = m.find(".form").addClass("edit"),
        o = n.attr("action");
        a(".calendar .cal-event[data-guid=" + j + "]").addClass("active"),
        v(m, l),
        mcw.popover(e.find(".content span"), {
            content: m
        }),
        m.find("h3").text("修改事件"),
        m.data("event", e),
        n.find("#txt-event-content").keydown(C).val(g).autosize({
            callback: function() {
                mcw.popover(e.find(".content span"), "refresh")
            }
        }).placeholder().focus(),
        n.find(".link-start-time").text(h.format("YYYY年MM月DD日")).attr("data-date", h.format("YYYY-MM-DD")).siblings("input[name=starts_at]").val(h.format("YYYY-MM-DD HH:mm:ss Z")),
        n.find(".link-end-time").text(i.format("YYYY年MM月DD日")).attr("data-date", i.format("YYYY-MM-DD")).siblings("input[name=ends_at]").val(i.format("YYYY-MM-DD HH:mm:ss Z")),
        n.find(".link-delete-event").attr("data-url", o + j + "/delete/"),
        n.attr("action", o + j + "/update/"),
        n.find(".btn-save-event").text("保存"),
        n.find(".event-discuss a").attr("href", e.data("url")),
        n.find(".remind-text").show().siblings("span").remove();
        var p = mcw.now().startOf("day").add("days", 1);
        if (h.diff(p) < 0) n.find(".event-cc").remove();
        else if (f.remind_guids.length > 0) {
            var q = n.find(".member-list").show(),
            r = n.find(".select-members");
            a.each(f.remind_guids, 
            function(a, b) {
                var c = r.find("option[value=" + b + "]");
                if (!c.length) return;
                mcw.template("tpl-cal-member", {
                    name: c.text(),
                    guid: c.val()
                }).appendTo(q),
                c.attr("disabled", "disabled")
            }),
            n.find(".cb-notify").click()
        }
        a(c).is("[data-locked]") && (n.find(".btn-save-event").attr("disabled", "disabled"), n.find(".link-delete-event").remove()),
        mcw.popover(e.find(".content span"), "refresh")
    }
    function B(b) {
        var d = a(".calendar .popover-target");
        if (d.length) {
            mcw.popover(d, "hide");
            return
        }
        var e = a(this),
        f = a(this).closest(".cal-todo"),
        g = f.data("todo"),
        h = mcw.template("tpl-todo-popover"),
        i = moment(g.due_at);
        if (f.hasClass("completed")) return;
        f.addClass("active"),
        mcw.popover(e, {
            content: h,
            cls: "cal-todo-popover-wrap"
        }),
        h.find(".link-project").attr("href", g.project_url).attr("title", g.project_name).text(g.project_name),
        h.find(".link-todolist").attr({
            href: g.todolist_url,
            title: g.todolist_name,
            "data-parent-name": g.project_name,
            "data-parent-url": g.project_url
        }).text(g.todolist_name),
        h.find("#txt-todo-content").val(g.content).keydown(C).autosize({
            callback: function() {
                mcw.popover(e, "refresh")
            }
        }).placeholder().focus(),
        h.find(".link-due-date").attr("data-date", i.format("YYYY-MM-DD")).text(i.format("YYYY年MM月DD日")).siblings("input[name=due_date]").val(i.valueOf()),
        h.find(".discuss-todo a").attr("href", "/projects/" + g.project_guid + "/todos/" + g.guid + "/");
        var j = h.find(".todo-assignee");
        j.attr("data-selected-member", g.assignee_guid),
        mcw.members[g.project_guid] && j.is("[disabled]") && mcw.updateMemberList(j, mcw.members[g.project_guid]),
        a(c).is("[data-locked]") && (h.find(".btn-save-todo").attr("disabled", "disabled"), h.find(".link-delete-todo").remove()),
        mcw.popover(e, "refresh")
    }
    function C(b) {
        var c = mcw.metaKey(b),
        d = a(this).closest(".popover");
        b.which == 13 ? (b.preventDefault(), d.find(".btn-save-event, .btn-save-todo").click()) : b.which == 27 && d.find(".link-hide-popover").click()
    }
    function D(b) {
        b.preventDefault();
        var c = a(this);
        mcw.confirm({
            msg: "确定要删除这个事件吗？",
            callback: function(b) {
                if (!b) return;
                var d = a(".calendar").data("calendar"),
                e = c.closest(".cal-event-popover").data("event");
                guid = e.data("guid"),
                eventEls = d.el.find(".cal-event[data-guid=" + guid + "]"),
                mcw.popover(eventEls.find(".content span"), "hide"),
                eventEls.addClass("loading"),
                a.ajax({
                    url: c.data("url"),
                    complete: function(a, b) {
                        b == "success" ? d.removeEvent(guid, "anim") : eventEls.removeClass("loading")
                    }
                })
            }
        })
    }
    function E(b) {
        b.preventDefault();
        var c = a(this);
        mcw.confirm({
            msg: "确定要删除这个任务吗？",
            callback: function(b) {
                if (!b) return;
                var d = a(".calendar").data("calendar"),
                e = c.closest(".popover").data("target"),
                f = e.closest(".cal-todo"),
                g = f.data("todo");
                mcw.popover(e, "hide"),
                f.addClass("loading"),
                a.ajax({
                    url: "/projects/" + g.project_guid + "/todos/" + g.guid + "/destroy/"
                }).always(function(a, b) {
                    b == "success" ? d.removeTodo(g.guid) : f.removeClass("loading")
                })
            }
        })
    }
    function F(b) {
        b.preventDefault();
        var c = a(this),
        d = c.closest("li"),
        e = d.data("guid"),
        f = d.find(".cal-name").text(),
        g = d.data("color"),
        h = d.data("cal"),
        i = mcw.popover(c, {
            content: mcw.template("tpl-cal-settings"),
            position: "bottom-left"
        });
        if (d.is("[data-project]")) i.find(".cal-name-field, .cal-members-field, .link-delete-calendar").remove(),
        i.find(".link-project-settings").attr({
            href: "/projects/" + h.guid + "/settings/",
            "data-parent-name": h.name,
            "data-parent-url": "/projects/" + h.guid + "/"
        }),
        i.find(".link-project-member-settings").attr({
            href: "/projects/" + h.guid + "/members/",
            "data-parent-name": h.name,
            "data-parent-url": "/projects/" + h.guid + "/"
        }),
        mcw.me.admin || i.find(".project-setting-field").remove();
        else {
            i.find(".link-delete-calendar").attr("href", "/calendars/" + h.guid + "/delete/").on("ajax:success", 
            function(b) {
                mcw.popover(c, "hide"),
                d.fadeOut(200, 
                function() {
                    var b = -1;
                    a.each(mcw.calendars, 
                    function(a, c) {
                        c.guid == h.guid && (b = a)
                    }),
                    mcw.calendars.splice(b, 1),
                    a(this).remove().remove(),
                    !mcw.calendars.length && a(".link-create-calendar:visible").length && a(".no-cal-tour").show();
                    var c = a(".calendar").data("calendar");
                    c && (c.renderEvents(j()), c.renderTodos(k()))
                })
            }),
            i.find(".project-setting-field").remove(),
            i.find("#txt-cal-name").val(f).keydown(C).placeholder().focus();
            var l = i.find(".select-members"),
            m = i.find(".member-list"),
            n = i.find(".no-members");
            h.member_guids.length > 1 ? (n.hide(), m.show(), a.each(h.member_guids, 
            function(a, b) {
                var c = l.find("option[value=" + b + "]");
                if (!c.length) return;
                mcw.template("tpl-cal-member", {
                    name: c.text(),
                    guid: c.val()
                }).appendTo(m),
                c.attr("disabled", "disabled")
            })) : (n.show(), m.hide()),
            mcw.me.admin || l.find("option[value=-2]").attr("disabled", "disabled")
        }
        i.find(".link-cal-color.cal-color-" + g).click(),
        i.find(".form").attr("action", c.data("url"))
    }
    function G(b) {
        b.preventDefault();
        var c = a(this),
        d = !0,
        e = mcw.popover(c, {
            content: mcw.template("tpl-cal-settings"),
            position: "bottom-left",
            offset: {
                top: -8,
                left: 2
            },
            autohide: d
        });
        e.find(".form").attr("action", c.data("url")),
        e.find(".project-setting-field, .link-delete-calendar").remove(),
        e.find("#txt-cal-name").keydown(C).placeholder().focus(),
        e.find(".btn-save-calendar").text("创建日历")
    }
    function H(b, c, d) {
        var g = a(this),
        h = g.closest(".popover");
        mcw.popover(h.data("target"), "hide");
        if (d == "success") {
            var i = a.parseJSON(c.responseText),
            l,
            m,
            n;
            i.project ? (l = a(".project-cals .cal-list"), m = i.project, n = mcw.projects) : i.calendar && (l = a(".standard-cals .cal-list"), m = i.calendar, n = mcw.calendars, a(".no-cal-tour").hide());
            var o = l.find("li[data-guid=" + m.guid + "]"),
            p = mcw.template("tpl-cal-item", {
                guid: m.guid,
                color: m.calendar_color,
                name: m.name
            }),
            q;
            p.data("cal", m),
            i.project ? p.attr("data-project", "true").find(".link-cal-setting").attr("data-url", "/projects/" + m.guid + "/calendar_color/") : p.find(".link-cal-setting").attr("data-url", "/calendars/" + m.guid + "/update/");
            if (!o.length) l.append(p),
            n.push(m);
            else {
                o.replaceWith(p),
                a.each(n, 
                function(a, b) {
                    if (b.guid == m.guid) return n[a] = m,
                    !1
                }),
                a.each(e, 
                function(a, b) {
                    b.caleventable_guid == m.guid && (b.caleventable_name = m.name, b.calendar_color = m.calendar_color)
                }),
                a.each(f, 
                function(a, b) {
                    b.project_guid == m.guid && (b.project_name = m.name, b.project_color = m.calendar_color)
                });
                var r = a(".calendar").data("calendar");
                r.renderEvents(j()),
                r.renderTodos(k())
            }
        }
    }
    function I(b) {
        b.preventDefault();
        var c = a(this).addClass("selected"),
        d = c.closest(".form");
        c.siblings(".link-cal-color").removeClass("selected"),
        d.find("input[name=calendar_color]").val(c.data("color"))
    }
    function J(b) {
        function h(a) {
            var b = a.val(),
            c = a.text(),
            d = mcw.template("tpl-cal-member", {
                name: c,
                guid: b
            }).hide().appendTo(e).fadeIn(200);
            a.attr("disabled", "disabled")
        }
        var c = a(this),
        d = c.find("option:selected"),
        e = c.siblings(".member-list"),
        f = c.siblings(".no-members"),
        g = d.val();
        if (g == "-1") return;
        if (g == "-2") {
            mcw.stack({
                url: "/invite/",
                root: !0
            });
            return
        }
        if (e.find("li[data-guid=" + g + "]").length) return;
        f.hide(),
        e.show(),
        g == "all" ? (c.find("option.opt-member:enabled").each(function(b, c) {
            h(a(c))
        }), c.val("-1")) : (h(d), c.val("-1"));
        var i = c.closest(".popover");
        mcw.popover(i.data("target"), "refresh")
    }
    function K(b) {
        b.preventDefault();
        var c = a(this).closest("li"),
        d = c.parent(".member-list"),
        e = d.siblings(".no-members"),
        f = d.siblings(".select-members"),
        g = c.data("guid");
        c.fadeOut(200, 
        function() {
            a(this).remove(),
            d.find("li").length || (e.show(), d.hide());
            var b = f.closest(".popover");
            mcw.popover(b.data("target"), "refresh")
        }),
        f.find("option[value=" + g + "]").removeAttr("disabled")
    }
    var b = "page-calendar",
    c = "#" + b,
    d = {},
    e = null,
    f = null;
    a(function() {
        a(document).on("click", c + " .btn-prev-month", n).on("click", c + " .btn-next-month", o).on("click", c + " .btn-today", p).on("click", c + " .cal-event", A).on("click", c + " .cal-todo .todo-content", B).on("click", c + " .cal-todo input[name=todo-done]", z).on("click", c + " .cal-list .link-show-cal", l).on("click", c + " .cal-list .cal-name", m).on("click", c + " .cal-list .link-cal-setting", F).on("click", c + " .link-create-calendar", G).on("ajax:complete", ".cal-setting-popover .form", H).on("click", ".cal-setting-popover .link-cal-color", I).on("change", ".cal-setting-popover .select-members", J).on("click", ".cal-setting-popover .link-remove-member", K).on("click", ".cal-event-popover .cb-notify", x).on("change", ".cal-event-popover .select-members", J).on("click", ".cal-event-popover .link-remove-member", K).on("click", ".cal-event-popover .link-start-time, .cal-event-popover .link-end-time", u).on("click", ".cal-event-popover .btn-save-event", q).on("click", ".cal-event-popover .link-delete-event", D).on("click", ".cal-todo-popover .link-due-date", u).on("click", ".cal-todo-popover .btn-save-todo", r).on("click", ".cal-todo-popover .link-delete-todo", E).on("click", c + " .btn-toggle-sidebar", g).on("popoverhide", 
        function(b, c) {
            var d = a(".calendar").data("calendar");
            if (!d) return;
            var e = a(c).closest(".cal-event"),
            f = a(c).closest(".cal-todo");
            if (e.length) {
                var g = e.data("guid");
                eventEls = d.el.find(".cal-event[data-guid=" + g + "]"),
                d.removeEvent("PLACEHOLDER"),
                eventEls.removeClass("active")
            }
            f.length && f.removeClass("active")
        });
        if (localStorage.calendarExpanded) var b = a(".btn-toggle-sidebar").click()
    }),
    mcw.pages[b] = {
        init: function() {
            a("#nav-calendar").addClass("active").siblings("li").removeClass("active"),
            i(!0)
        }
    };
    var h = null,
    y = null
} (jQuery),
function(a) {
    var b = "page-calendar-event",
    c = "#" + b;
    a(function() {}),
    mcw.pages[b] = {
        init: function() {
            mcw.adjustCCList(),
            mcw.adjustAuthor(),
            mcw.adjustStar()
        }
    }
} (jQuery),
function(a) {
    function e() {
        var b = a(".plan-list .selected"),
        c = b.data("type") * 1,
        e = d[c],
        f = e.price;
        a("input[name=plan]").val(c);
        var g = a("#tips").removeClass("inform inform-warn inform-info").html("");
        a("button.btn-choose").prop("disabled", !1);
        var h = a("#trial").val() === "true",
        i = a("#cur-plan-type").val() * 1,
        j = a("#left-money").val() * 1,
        k = a("#cur-team-proj-num").val() * 1,
        l = e.projNum,
        m = '<a href="' + a("#select-charge-path").val() + '">付费</a>',
        n = a("#locked").val() === "true",
        o = [],
        p = [];
        if (k > l) p.push('目前团队中共有<a href="javascript:;" class="link-show-projects">' + k + "个项目</a>，请选择支持更多项目的方案");
        else if (!h && i !== -1) {
            var q = d[i],
            r = q.price,
            s = q.projNum;
            if (n) s > l ? j >= f ? o.push("我们将立即从您的团队账户中扣除 &yen;" + f + "，您的团队将马上恢复正常") : p.push("您的团队账户余额不足，请先" + m) : s < l && p.push("您的团队账户余额不足，请先" + m);
            else {
                var t = mcw.now().startOf("day"),
                u = (moment(a("#next-charge-date").val()).startOf("day").valueOf() - t.valueOf()) / 864e5,
                v = Math.floor(Math.abs(f - r) / 30 * u);
                s > l ? o.push("您选择了费用更低的方案，我们将立即退还差价 &yen;" + v + " 到您的团队账户") : j >= v ? o.push("您选择了费用更高的方案，我们将立即从您的账户扣除升级差价 &yen;" + v) : p.push("您选择了费用更高的方案，需要支付升级差价 &yen;" + v + "，您的团队账户余额不足，请" + m + "后再试")
            }
        }
        var w = "";
        p.length ? (a.each(p, 
        function() {
            w += "<p>" + this + "</p>"
        }), g.addClass("inform inform-warn").html(w), a("button.btn-choose").prop("disabled", !0)) : o.length && (a.each(o, 
        function() {
            w += "<p>" + this + "</p>"
        }), g.addClass("inform inform-info").html(w))
    }
    var b = "page-plans",
    c = "#" + b,
    d = [{
        price: 20,
        projNum: 5
    },
    {
        price: 99,
        projNum: 10
    },
    {
        price: 199,
        projNum: 20
    },
    {
        price: 299,
        projNum: 99
    },
    {
        price: 49,
        projNum: 5
    }];
    a(function() {
        a("body").on("click", c + " .plan-list li", 
        function(b) {
            if (!a(".form-plan").length) return;
            var c = a(this); ! c.hasClass("selected"),
            c.siblings(".selected").removeClass("selected").end().addClass("selected"),
            e()
        }).on("click", c + " .link-show-projects", 
        function(a) {
            mcw.dialog({
                el: mcw.template("tpl-projects"),
                width: 800
            })
        }).on("ajax:success", c + " .form-plan", 
        function(a, b) {
            if (b.success) return location.href = b.success_url,
            !1
        })
    }),
    mcw.pages[b] = {
        init: function() {
            var b = a("#cur-plan-type").val() * 1;
            if (b === -1 || b === 0) {
                a(".btn-choose").prop("disabled", !0);
                return
            }
            a(".plan-list li[data-type=" + b + "]").addClass("selected"),
            a(".form-plan").length && e()
        }
    }
} (jQuery),
function(a) {
    var b = "page-charge",
    c = "#" + b;
    a(function() {
        a("body").on("ajax:success", c + " .form-alipay", 
        function(a, b) {
            b.success && (location.href = b.charge_url)
        }).on("click", c + " .btn-brohao", 
        function(b) {
            var c = a("#charge-amount").val();
            mcw.dialog({
                el: mcw.template("tpl-brohao-confirm", {
                    yen: c,
                    amount: c
                })
            })
        }).on("ajax:success", c + " .form-brohao", 
        function(a, b) {
            b.success && (location.href = b.charge_url)
        }).on("click", c + " .form-brohao .btn-cancel", 
        function(a) {
            mcw.dialog("hide")
        }).on("click", c + " .charge-item", 
        function(b) {
            var c = a(b.currentTarget);
            if (c.hasClass("selected")) return;
            c.siblings(".selected").removeClass("selected").end().addClass("selected"),
            a("#charge-amount").val(c.data("charge"))
        })
    }),
    mcw.pages[b] = {
        init: function() {
            var b = a(".charge-item.year");
            b.addClass("selected"),
            a("#charge-amount").val(b.data("charge"))
        }
    }
} (jQuery),
function(a) {
    var b = "page-payment-history",
    c = "#" + b;
    a(function() {
        a("body").on("click", c + " .btn-receipt", 
        function(a) {
            mcw.dialog({
                el: mcw.template("tpl-receipt", {}),
                width: 700
            })
        }).on("ajax:success", c + " .form-receipt", 
        function(a, b) {
            b.success && mcw.dialog({
                el: mcw.template("tpl-apply-success", {
                    target_url: b.target_url
                })
            })
        }).on("click", c + " .btn-apply-ok, " + c + " .btn-edit-receipt-ok", 
        function(b) {
            mcw.stack({
                url: a(b.target).data("url"),
                replace: !0,
                root: !1,
                restorePosition: !0
            })
        }).on("click", c + " .form-receipt .btn-cancel, " + c + " .form-edit-receipt .btn-cancel", 
        function(a) {
            a.preventDefault(),
            mcw.dialog("hide")
        }).on("ajax:success", c + " .edit-receipt", 
        function(a, b) {
            mcw.dialog({
                el: b.html,
                width: 700
            })
        }).on("ajax:success", c + " .form-edit-receipt", 
        function(a, b) {
            b.success && mcw.dialog({
                el: mcw.template("tpl-edit-receipt-success", {
                    target_url: b.target_url
                })
            })
        })
    })
} (jQuery),
function(a) {
    function o(a) {
        var b = a.originalEvent.dataTransfer,
        c = navigator.userAgent.indexOf("AppleWebKit") > -1;
        return b && b.effectAllowed != "none" && (b.files || !c && b.types.contains && b.types.contains("Files"))
    }
    var b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k = a(window),
    l = a(document),
    m,
    n;
    a(function() {
        c = a("#droppable-top"),
        d = a("#droppable-bottom"),
        e = a("#droppable-left"),
        f = a("#droppable-right"),
        g = c.add(d).add(e).add(f),
        h = c.width(),
        k.on("resize.dragdrop", 
        function(a) {
            i = k.width(),
            j = k.height()
        }).resize(),
        initDragDrop()
    }),
    initDragDrop = function() {
        l.on("dragstart", 
        function(a) {
            n = !0
        }).on("dragend", 
        function(a) {
            n = !1
        }).on("dragenter", 
        function(b) {
            if (n) return;
            if (!a("[data-droppable]:visible").length) return;
            if (!o(b)) return;
            a("html").addClass("droppable")
        }).on("dragover", 
        function(i, j, k) {
            if (n) return;
            j && (i = j);
            var p = a("[data-droppable]:visible");
            if (!p.length) return;
            if (!o(i)) return;
            var k = a(k || j && j.target || i.target);
            if (k.is("[data-droppable]") || k.parents("[data-droppable]:first").length) {
                k.is("[data-droppable]") || (k = k.parents("[data-droppable]:first")),
                g.addClass("active");
                var q = i.originalEvent.dataTransfer.effectAllowed;
                /^(move|linkMove)$/.test(q) ? i.originalEvent.dataTransfer.dropEffect = "move": i.originalEvent.dataTransfer.dropEffect = "copy"
            } else visibleDroppables = a.grep(p, 
            function(a) {
                return mcw.isScreenView(a, 0, !0)
            }),
            visibleDroppables.length ? k = a(visibleDroppables[0]) : k = p.eq(0),
            g.removeClass("active"),
            i.originalEvent.dataTransfer.dropEffect = "none";
            if (!k.is(m)) {
                var r = k.outerWidth() + 2 * h,
                s = k.outerHeight() + 2 * h,
                t = k.offset(),
                u = t.top - l.scrollTop() - h,
                v = t.left - l.scrollLeft() - h;
                c.css({
                    top: u,
                    left: v,
                    width: r
                }),
                d.css({
                    top: u + k.outerHeight() + h,
                    left: v,
                    width: r
                }),
                e.css({
                    left: v,
                    top: u,
                    height: s
                }),
                f.css({
                    left: v + k.outerWidth() + h,
                    top: u,
                    height: s
                }),
                m = k
            }
            clearTimeout(b),
            b = setTimeout(function() {
                a("html").removeClass("droppable"),
                m = null,
                n = !1
            },
            500),
            i.stopPropagation(),
            i.preventDefault()
        }).on("drop", 
        function(b, c, d) {
            if (n) return;
            if (c && c.helper) return;
            c && (b = c),
            b.preventDefault(),
            b.stopPropagation();
            if (!o(b)) return;
            a("html").removeClass("droppable"),
            m = null,
            n = !1;
            var e = a(b.target),
            f;
            b.originalEvent.dataTransfer.files && b.originalEvent.dataTransfer.files.length && (f = b.originalEvent.dataTransfer.files);
            if (d) {
                droppable = d.trigger("dropCustom", [b, f]);
                return
            }
            a(b.srcElement).is("[data-droppable]") ? droppable = e.trigger("dropCustom", [b, f]) : a(b.srcElement).parents("[data-droppable]").length && (droppable = a(b.srcElement).parents("[data-droppable]:first").trigger("dropCustom", [b, f]))
        })
    }
} (jQuery),
function(a) {
    function d(b) {
        var c = b.prop("action"),
        d = b.find(".doc-title"),
        e = b.find(".doc-content"),
        g = {
            _wysihtml5_mode: 1,
            doc_title: a.trim(d.val()),
            doc_content: a.trim(e.val())
        };
        a.ajax({
            url: c,
            type: "post",
            dataType: "json",
            data: g,
            success: function(a) {
                f("saved"),
                b.data("saved", !0),
                b.find(".btn-save").html("保存").prop("disabled", !1)
            }
        })
    }
    function f(b) {
        var c = a(".form-edit-doc"),
        d = c.find(".save-info");
        d.show(),
        b === "saving" ? e ? setTimeout(function() {
            d.text("正在保存...")
        },
        1e3) : d.text("正在保存...") : b === "saved" && (d.text("保存成功"), e = !0, setTimeout(function() {
            e = !1
        },
        1e3))
    }
    function g() {
        clearInterval(b),
        clearInterval(c),
        b = null,
        c = null
    }
    var b = null,
    c = null;
    a(function() {
        a(document).on("ajax:beforeSend", ".form-edit-doc", 
        function(b, c) {
            a(".save-info").hide()
        }).on("ajax:success", ".form-edit-doc", 
        function(b, c) {
            a(this).data("saved", !0),
            mcw.destroyDocEditor()
        }).on("beforestack", 
        function(a) {
            g()
        })
    }),
    window.mcw || (mcw = {}),
    a.extend(mcw, {
        initDocEditor: function(e, h) {
            h = a.extend({
                upload: !0,
                toolbar: !0
            },
            h);
            var i = e.find("textarea.doc-title"),
            j = e.find("textarea.doc-content"),
            k = j.closest(".doc-editor"),
            l = e.find(".doc-editor-toolbar");
            j.add(i).autosize(),
            mcw.autosave(e),
            h.toolbar || l.hide();
            var m = (new wysihtml5.Editor(j[0], {
                toolbar: l[0],
                autoLink: !0,
                style: !1,
                parserRules: wysihtml5ParserRules,
                stylesheets: ["/assets/doc-editor-024621eb2515a4ec12e63ffadf12ea8a.css"]
            })).on("load", 
            function() {
                a(m.composer.element).on("keyup", 
                function() {
                    n()
                }).add(i).on("keyup", 
                function(a) {
                    clearInterval(c),
                    f("saving"),
                    e.data("saved", !1),
                    c = setInterval(function() {
                        clearInterval(c),
                        c = null,
                        d(e)
                    },
                    1e3)
                }),
                i.on("keyup", 
                function(b) {
                    document.title = a.trim(a(this).val()) + " - Tower"
                }),
                a(m.composer.doc.body).on("keydown", 
                function(a) {
                    var b = mcw.metaKey(a);
                    a.which == 13 && b && (a.preventDefault(), e.find(".btn-quit-edit, .btn-create-doc").click())
                }),
                i.on("keydown", 
                function(a) {
                    var b = mcw.metaKey(a);
                    a.which == 13 && (a.preventDefault(), b && e.find(".btn-quit-edit, .btn-create-doc").click())
                }),
                l.on("click", ".command", 
                function(a) {
                    n()
                });
                var b = setInterval(function() {
                    a(".wysihtml5-sandbox:visible").length && (n(), m.composer.doc.body.focus(), clearInterval(b), b = null)
                },
                300)
            }).on("focus", 
            function() {
                b = setInterval(function() {
                    d(e)
                },
                15e3),
                n()
            }).on("blur", 
            function() {
                g(),
                d(e),
                n()
            }),
            n = function() {
                var b = a(m.composer.doc.body).css("minHeight", 400),
                c = a(m.composer.iframe),
                d = b.outerHeight();
                d > c.height() ? c.css("minHeight", Math.max(420, d)) : c.css("minHeight", d)
            };
            i.on("focus", 
            function() {
                b = setInterval(function() {
                    d(e)
                },
                15e3)
            }).on("blur", 
            function(a) {
                g(),
                d(e)
            });
            var o = a(document),
            p = a(window);
            p.on("scroll.doc", 
            function() {
                var a = k.offset().top;
                a < o.scrollTop() ? l.addClass("toolbar-fixed") : l.removeClass("toolbar-fixed")
            }),
            a(window).bind("beforeunload.doc", 
            function(b) {
                if (!a(".form-edit-doc").length || e.data("saved")) return;
                return b.originalEvent.returnValue = "离开本页，还没有保存的内容可能会丢失",
                "离开本页，还没有保存的内容可能会丢失"
            })
        },
        destroyDocEditor: function() {
            a(window).off(".doc"),
            g(),
            a(".form-edit-doc").hide()
        }
    });
    var e = !1
} (jQuery),
function(a) {
    var b = "page-doc",
    c = "#" + b;
    a(function() {
        a(document).on("ajax:beforeSend", c + " .detail-action-del", 
        function() {
            mcw.globalLoading("正在删除文档...")
        }).on("ajax:complete", c + " .detail-action-del", 
        function() {
            mcw.globalLoading("hide")
        })
    }),
    mcw.pages[b] = {
        init: function() {
            mcw.adjustCCList(),
            mcw.adjustAuthor(),
            mcw.adjustProjInfo(),
            mcw.adjustStar()
        },
        update: function(b) {
            if (!b.doc) return;
            if (b.doc.updated) {
                var c = a(".workspace .page:last");
                if (c.is("[data-deleted]")) return mcw.stack({
                    url: location.href,
                    nocache: !0
                }),
                !1;
                var d = a(b.doc.updated),
                e = a(".doc");
                d.toggle(e.is(":visible")),
                e.replaceWith(d),
                mcw.adjustDate(d),
                mcw.adjustPermission(d)
            }
            if (b.doc.deleted) return mcw.stack({
                url: location.href,
                nocache: !0
            }),
            !1
        }
    }
} (jQuery),
function(a) {
    var b = "page-new-doc",
    c = "#" + b;
    a(function() {
        a(document).on("ajax:beforeSend", c + " .btn-create-doc", 
        function(b, c, d) {
            var e = a(".form-edit-doc"),
            f = e.find(".doc-title"),
            g = e.find(".doc-content"),
            h = a.trim(f.val()),
            i = a.trim(g.val());
            d.data += "&doc_title=" + encodeURIComponent(h) + "&doc_content=" + encodeURIComponent(i) + "&_wysihtml5_mode=1"
        }).on("ajax:success", c + " .btn-cancel-draft", 
        function(b, c) {
            c.success && a(".link-parent-sheet:last").click()
        })
    }),
    mcw.pages[b] = {
        init: function() {
            var b = a(".form-edit-doc");
            mcw.initDocEditor(b, {}),
            b.data("saved", !0)
        }
    }
} (jQuery),
function(a) {
    var b = "page-edit-doc",
    c = "#" + b;
    mcw.pages[b] = {
        init: function() {
            var b = a(".form-edit-doc");
            mcw.initDocEditor(b, {}),
            b.data("saved", !0)
        }
    }
} (jQuery)