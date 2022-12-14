if (! function() {
        var d;
        if (!window.jQuery) throw new Error("UIkit 2.x requires jQuery");
        d = function(l) {
            "use strict";
            if (window.UIkit2) {
                return window.UIkit2
            }
            var d = {},
                t = window.UIkit || undefined;
            if (d.version = "2.27.5", d.noConflict = function() {
                    if (t) {
                        window.UIkit = t;
                        l.UIkit = t;
                        l.fn.uk = t.fn
                    }
                    return d
                }, window.UIkit2 = d, !t) {
                window.UIkit = d
            }
            if (d.$ = l, d.$doc = d.$(document), d.$win = d.$(window), d.$html = d.$("html"), d.support = {}, d.support.transition = function() {
                    var t = function() {
                        var t = document.body || document.documentElement,
                            e = {
                                WebkitTransition: "webkitTransitionEnd",
                                MozTransition: "transitionend",
                                OTransition: "oTransitionEnd otransitionend",
                                transition: "transitionend"
                            },
                            i;
                        for (i in e) {
                            if (t.style[i] !== undefined) return e[i]
                        }
                    }();
                    return t && {
                        end: t
                    }
                }(), d.support.animation = function() {
                    var t = function() {
                        var t = document.body || document.documentElement,
                            e = {
                                WebkitAnimation: "webkitAnimationEnd",
                                MozAnimation: "animationend",
                                OAnimation: "oAnimationEnd oanimationend",
                                animation: "animationend"
                            },
                            i;
                        for (i in e) {
                            if (t.style[i] !== undefined) return e[i]
                        }
                    }();
                    return t && {
                        end: t
                    }
                }(), function() {
                    Date.now = Date.now || function() {
                        return (new Date).getTime()
                    };
                    var t = ["webkit", "moz"];
                    for (var e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
                        var i = t[e];
                        window.requestAnimationFrame = window[i + "RequestAnimationFrame"];
                        window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
                    }
                    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
                        var o = 0;
                        window.requestAnimationFrame = function(t) {
                            var e = Date.now();
                            var i = Math.max(o + 16, e);
                            return setTimeout(function() {
                                t(o = i)
                            }, i - e)
                        };
                        window.cancelAnimationFrame = clearTimeout
                    }
                }(), d.support.touch = "ontouchstart" in document || window.DocumentTouch && document instanceof window.DocumentTouch || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0 || false, d.support.mutationobserver = window.MutationObserver || window.WebKitMutationObserver || null, d.Utils = {}, d.Utils.isFullscreen = function() {
                    return document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.fullscreenElement || false
                }, d.Utils.str2json = function(t, e) {
                    try {
                        if (e) {
                            return JSON.parse(t.replace(/([\$\w]+)\s*:/g, function(t, e) {
                                return '"' + e + '":'
                            }).replace(/'([^']+)'/g, function(t, e) {
                                return '"' + e + '"'
                            }))
                        } else {
                            return new Function("", "var json = " + t + "; return JSON.parse(JSON.stringify(json));")()
                        }
                    } catch (t) {
                        return false
                    }
                }, d.Utils.debounce = function(n, s, a) {
                    var r;
                    return function() {
                        var t = this,
                            e = arguments;
                        var i = function() {
                            r = null;
                            if (!a) n.apply(t, e)
                        };
                        var o = a && !r;
                        clearTimeout(r);
                        r = setTimeout(i, s);
                        if (o) n.apply(t, e)
                    }
                }, d.Utils.throttle = function(t, e) {
                    var i = false;
                    return function() {
                        if (!i) {
                            t.call();
                            i = true;
                            setTimeout(function() {
                                i = false
                            }, e)
                        }
                    }
                }, d.Utils.removeCssRules = function(t) {
                    var e, i, o, n, s, a, r, l, d, h;
                    if (!t) return;
                    setTimeout(function() {
                        try {
                            h = document.styleSheets;
                            for (n = 0, r = h.length; n < r; n++) {
                                o = h[n];
                                i = [];
                                o.cssRules = o.cssRules;
                                for (e = s = 0, l = o.cssRules.length; s < l; e = ++s) {
                                    if (o.cssRules[e].type === CSSRule.STYLE_RULE && t.test(o.cssRules[e].selectorText)) {
                                        i.unshift(e)
                                    }
                                }
                                for (a = 0, d = i.length; a < d; a++) {
                                    o.deleteRule(i[a])
                                }
                            }
                        } catch (t) {}
                    }, 0)
                }, d.Utils.isInView = function(t, e) {
                    var i = l(t);
                    if (!i.is(":visible")) {
                        return false
                    }
                    var o = d.$win.scrollLeft(),
                        n = d.$win.scrollTop(),
                        s = i.offset(),
                        a = s.left,
                        r = s.top;
                    e = l.extend({
                        topoffset: 0,
                        leftoffset: 0
                    }, e);
                    if (r + i.height() >= n && r - e.topoffset <= n + d.$win.height() && a + i.width() >= o && a - e.leftoffset <= o + d.$win.width()) {
                        return true
                    } else {
                        return false
                    }
                }, d.Utils.checkDisplay = function(t, e) {
                    var i = d.$("[data-uk-margin], [data-uk-grid-match], [data-uk-grid-margin], [data-uk-check-display]", t || document),
                        o;
                    if (t && !i.length) {
                        i = l(t)
                    }
                    i.trigger("display.uk.check");
                    if (e) {
                        if (typeof e != "string") {
                            e = '[class*="uk-animation-"]'
                        }
                        i.find(e).each(function() {
                            var t = d.$(this),
                                e = t.attr("class"),
                                i = e.match(/uk-animation-(.+)/);
                            t.removeClass(i[0]).width();
                            t.addClass(i[0])
                        })
                    }
                    return i
                }, d.Utils.options = function(t) {
                    if (l.type(t) != "string") return t;
                    if (t.indexOf(":") != -1 && t.trim().substr(-1) != "}") {
                        t = "{" + t + "}"
                    }
                    var e = t ? t.indexOf("{") : -1,
                        i = {};
                    if (e != -1) {
                        try {
                            i = d.Utils.str2json(t.substr(e))
                        } catch (t) {}
                    }
                    return i
                }, d.Utils.animate = function(t, e) {
                    var i = l.Deferred();
                    t = d.$(t);
                    t.css("display", "none").addClass(e).one(d.support.animation.end, function() {
                        t.removeClass(e);
                        i.resolve()
                    });
                    t.css("display", "");
                    return i.promise()
                }, d.Utils.uid = function(t) {
                    return (t || "id") + (new Date).getTime() + "RAND" + Math.ceil(Math.random() * 1e5)
                }, d.Utils.template = function(t, e) {
                    var i = t.replace(/\n/g, "\\n").replace(/\{\{\{\s*(.+?)\s*\}\}\}/g, "{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g),
                        o = 0,
                        n, s, a, r, l, d = [],
                        h = 0;
                    while (o < i.length) {
                        n = i[o];
                        if (n.match(/\{\{\s*(.+?)\s*\}\}/)) {
                            o = o + 1;
                            n = i[o];
                            s = n[0];
                            a = n.substring(n.match(/^(\^|\#|\!|\~|\:)/) ? 1 : 0);
                            switch (s) {
                                case "~":
                                    d.push("for(var $i=0;$i<" + a + ".length;$i++) { var $item = " + a + "[$i];");
                                    h++;
                                    break;
                                case ":":
                                    d.push("for(var $key in " + a + ") { var $val = " + a + "[$key];");
                                    h++;
                                    break;
                                case "#":
                                    d.push("if(" + a + ") {");
                                    h++;
                                    break;
                                case "^":
                                    d.push("if(!" + a + ") {");
                                    h++;
                                    break;
                                case "/":
                                    d.push("}");
                                    h--;
                                    break;
                                case "!":
                                    d.push("__ret.push(" + a + ");");
                                    break;
                                default:
                                    d.push("__ret.push(escape(" + a + "));");
                                    break
                            }
                        } else {
                            d.push("__ret.push('" + n.replace(/\'/g, "\\'") + "');")
                        }
                        o = o + 1
                    }
                    l = new Function("$data", ["var __ret = [];", "try {", "with($data){", !h ? d.join("") : '__ret = ["Not all blocks are closed correctly."]', "};", "}catch(e){__ret = [e.message];}", 'return __ret.join("").replace(/\\n\\n/g, "\\n");', "function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"].join("\n"));
                    return e ? l(e) : l
                }, d.Utils.focus = function(t, e) {
                    t = l(t);
                    if (!t.length) {
                        return t
                    }
                    var i = t.find("[autofocus]:first"),
                        o;
                    if (i.length) {
                        return i.focus()
                    }
                    i = t.find(":input" + (e && "," + e || "")).first();
                    if (i.length) {
                        return i.focus()
                    }
                    if (!t.attr("tabindex")) {
                        o = 1e3;
                        t.attr("tabindex", o)
                    }
                    t[0].focus();
                    if (o) {
                        t.attr("tabindex", "")
                    }
                    return t
                }, d.Utils.events = {}, d.Utils.events.click = d.support.touch ? "tap" : "click", d.fn = function(t, i) {
                    var o = arguments,
                        e = t.match(/^([a-z\-]+)(?:\.([a-z]+))?/i),
                        n = e[1],
                        s = e[2];
                    if (!d[n]) {
                        l.error("UIkit component [" + n + "] does not exist.");
                        return this
                    }
                    return this.each(function() {
                        var t = l(this),
                            e = t.data(n);
                        if (!e) t.data(n, e = d[n](this, s ? undefined : i));
                        if (s) e[s].apply(e, Array.prototype.slice.call(o, 1))
                    })
                }, l.UIkit = d, l.fn.uk = d.fn, d.langdirection = d.$html.attr("dir") == "rtl" ? "right" : "left", d.components = {}, d.component = function(o, t, e) {
                    if (d.components[o] && !e) {
                        return d.components[o]
                    }
                    var n = function(t, e) {
                        var i = this;
                        this.UIkit = d;
                        this.element = t ? d.$(t) : null;
                        this.options = l.extend(true, {}, this.defaults, e);
                        this.plugins = {};
                        if (this.element) {
                            this.element.data(o, this)
                        }
                        this.init();
                        (this.options.plugins.length ? this.options.plugins : Object.keys(n.plugins)).forEach(function(t) {
                            if (n.plugins[t].init) {
                                n.plugins[t].init(i);
                                i.plugins[t] = true
                            }
                        });
                        this.trigger("init.uk.component", [o, this]);
                        return this
                    };
                    n.plugins = {};
                    l.extend(true, n.prototype, {
                        defaults: {
                            plugins: []
                        },
                        boot: function() {},
                        init: function() {},
                        on: function(t, e, i) {
                            return d.$(this.element || this).on(t, e, i)
                        },
                        one: function(t, e, i) {
                            return d.$(this.element || this).one(t, e, i)
                        },
                        off: function(t) {
                            return d.$(this.element || this).off(t)
                        },
                        trigger: function(t, e) {
                            return d.$(this.element || this).trigger(t, e)
                        },
                        find: function(t) {
                            return d.$(this.element ? this.element : []).find(t)
                        },
                        proxy: function(e, t) {
                            var i = this;
                            t.split(" ").forEach(function(t) {
                                if (!i[t]) i[t] = function() {
                                    return e[t].apply(e, arguments)
                                }
                            })
                        },
                        mixin: function(e, t) {
                            var i = this;
                            t.split(" ").forEach(function(t) {
                                if (!i[t]) i[t] = e[t].bind(i)
                            })
                        },
                        option: function() {
                            if (arguments.length == 1) {
                                return this.options[arguments[0]] || undefined
                            } else if (arguments.length == 2) {
                                this.options[arguments[0]] = arguments[1]
                            }
                        }
                    }, t);
                    this.components[o] = n;
                    this[o] = function() {
                        var t, e;
                        if (arguments.length) {
                            switch (arguments.length) {
                                case 1:
                                    if (typeof arguments[0] === "string" || arguments[0].nodeType || arguments[0] instanceof jQuery) {
                                        t = l(arguments[0])
                                    } else {
                                        e = arguments[0]
                                    }
                                    break;
                                case 2:
                                    t = l(arguments[0]);
                                    e = arguments[1];
                                    break
                            }
                        }
                        if (t && t.data(o)) {
                            return t.data(o)
                        }
                        return new d.components[o](t, e)
                    };
                    if (d.domready) {
                        d.component.boot(o)
                    }
                    return n
                }, d.plugin = function(t, e, i) {
                    this.components[t].plugins[e] = i
                }, d.component.boot = function(t) {
                    if (d.components[t].prototype && d.components[t].prototype.boot && !d.components[t].booted) {
                        d.components[t].prototype.boot.apply(d, []);
                        d.components[t].booted = true
                    }
                }, d.component.bootComponents = function() {
                    for (var t in d.components) {
                        d.component.boot(t)
                    }
                }, d.domObservers = [], d.domready = false, d.ready = function(t) {
                    d.domObservers.push(t);
                    if (d.domready) {
                        t(document)
                    }
                }, d.on = function(t, e, i) {
                    if (t && t.indexOf("ready.uk.dom") > -1 && d.domready) {
                        e.apply(d.$doc)
                    }
                    return d.$doc.on(t, e, i)
                }, d.one = function(t, e, i) {
                    if (t && t.indexOf("ready.uk.dom") > -1 && d.domready) {
                        e.apply(d.$doc);
                        return d.$doc
                    }
                    return d.$doc.one(t, e, i)
                }, d.trigger = function(t, e) {
                    return d.$doc.trigger(t, e)
                }, d.domObserve = function(t, o) {
                    if (!d.support.mutationobserver) return;
                    o = o || function() {};
                    d.$(t).each(function() {
                        var e = this,
                            i = d.$(e);
                        if (i.data("observer")) {
                            return
                        }
                        try {
                            var t = new d.support.mutationobserver(d.Utils.debounce(function(t) {
                                o.apply(e, [i]);
                                i.trigger("changed.uk.dom")
                            }, 50), {
                                childList: true,
                                subtree: true
                            });
                            t.observe(e, {
                                childList: true,
                                subtree: true
                            });
                            i.data("observer", t)
                        } catch (t) {}
                    })
                }, d.init = function(e) {
                    e = e || document;
                    d.domObservers.forEach(function(t) {
                        t(e)
                    })
                }, d.on("domready.uk.dom", function() {
                    d.init();
                    if (d.domready) d.Utils.checkDisplay()
                }), document.addEventListener("DOMContentLoaded", function() {
                    var t = function() {
                        d.$body = d.$("body");
                        d.trigger("beforeready.uk.dom");
                        d.component.bootComponents();
                        var n = requestAnimationFrame(function() {
                            var i = {
                                dir: {
                                    x: 0,
                                    y: 0
                                },
                                x: window.pageXOffset,
                                y: window.pageYOffset
                            };
                            var o = function() {
                                var t = window.pageXOffset;
                                var e = window.pageYOffset;
                                if (i.x != t || i.y != e) {
                                    if (t != i.x) {
                                        i.dir.x = t > i.x ? 1 : -1
                                    } else {
                                        i.dir.x = 0
                                    }
                                    if (e != i.y) {
                                        i.dir.y = e > i.y ? 1 : -1
                                    } else {
                                        i.dir.y = 0
                                    }
                                    i.x = t;
                                    i.y = e;
                                    d.$doc.trigger("scrolling.uk.document", [{
                                        dir: {
                                            x: i.dir.x,
                                            y: i.dir.y
                                        },
                                        x: t,
                                        y: e
                                    }])
                                }
                                cancelAnimationFrame(n);
                                n = requestAnimationFrame(o)
                            };
                            if (d.support.touch) {
                                d.$html.on("touchmove touchend MSPointerMove MSPointerUp pointermove pointerup", o)
                            }
                            if (i.x || i.y) o();
                            return o
                        }());
                        d.trigger("domready.uk.dom");
                        if (d.support.touch) {
                            if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
                                d.$win.on("load orientationchange resize", d.Utils.debounce(function() {
                                    var t = function() {
                                        l(".uk-height-viewport").css("height", window.innerHeight);
                                        return t
                                    };
                                    return t()
                                }(), 100))
                            }
                        }
                        d.trigger("afterready.uk.dom");
                        d.domready = true;
                        if (d.support.mutationobserver) {
                            var e = d.Utils.debounce(function() {
                                requestAnimationFrame(function() {
                                    d.init(document.body)
                                })
                            }, 10);
                            new d.support.mutationobserver(function(t) {
                                var o = false;
                                t.every(function(t) {
                                    if (t.type != "childList") return true;
                                    for (var e = 0, i; e < t.addedNodes.length; ++e) {
                                        i = t.addedNodes[e];
                                        if (i.outerHTML && i.outerHTML.indexOf("data-uk-") !== -1) {
                                            return (o = true) && false
                                        }
                                    }
                                    return true
                                });
                                if (o) e()
                            }).observe(document.body, {
                                childList: true,
                                subtree: true
                            })
                        }
                    };
                    if (document.readyState == "complete" || document.readyState == "interactive") {
                        setTimeout(t)
                    }
                    return t
                }()), d.$html.addClass(d.support.touch ? "uk-touch" : "uk-notouch"), d.support.touch) {
                var e = false,
                    i, o = "uk-hover",
                    n = ".uk-overlay, .uk-overlay-hover, .uk-overlay-toggle, .uk-animation-hover, .uk-has-hover";
                d.$html.on("mouseenter touchstart MSPointerDown pointerdown", n, function() {
                    if (e) l("." + o).removeClass(o);
                    e = l(this).addClass(o)
                }).on("mouseleave touchend MSPointerUp pointerup", function(t) {
                    i = l(t.target).parents(n);
                    if (e) {
                        e.not(i).removeClass(o)
                    }
                })
            }
            return d
        }(window.jQuery), "function" == typeof define && define.amd && define("uikit", function() {
            return d.load = function(t, e, i, o) {
                var n, s = t.split(","),
                    a = [],
                    r = (o.config && o.config.uikit && o.config.uikit.base ? o.config.uikit.base : "").replace(/\/+$/g, "");
                if (!r) throw new Error("Please define base path to UIkit in the requirejs config.");
                for (n = 0; n < s.length; n += 1) {
                    var l = s[n].replace(/\./g, "/");
                    a.push(r + "/components/" + l)
                }
                e(a, function() {
                    i(d)
                })
            }, d
        })
    }(), function(a) {
        if (!a.fn.swipeLeft) {
            var r, l, d, h, u, c = {},
                p = "ontouchstart" in window,
                f = window.PointerEvent,
                m = p || window.DocumentTouch && document instanceof DocumentTouch || navigator.msPointerEnabled && 0 < navigator.msMaxTouchPoints || navigator.pointerEnabled && 0 < navigator.maxTouchPoints;
            a(function() {
                var e, i, o, n = 0,
                    s = 0;
                "MSGesture" in window && ((u = new MSGesture).target = document.body), a(document).on("MSGestureEnd gestureend", function(t) {
                    var e = 1 < t.originalEvent.velocityX ? "Right" : t.originalEvent.velocityX < -1 ? "Left" : 1 < t.originalEvent.velocityY ? "Down" : t.originalEvent.velocityY < -1 ? "Up" : null;
                    e && void 0 !== c.el && (c.el.trigger("swipe"), c.el.trigger("swipe" + e))
                }).on("touchstart MSPointerDown pointerdown", function(t) {
                    "MSPointerDown" == t.type && !w(t.originalEvent) || (o = "MSPointerDown" == t.type || "pointerdown" == t.type ? t : t.originalEvent.touches[0], e = Date.now(), i = e - (c.last || e), c.el = a("tagName" in o.target ? o.target : o.target.parentNode), r && clearTimeout(r), c.x1 = o.pageX, c.y1 = o.pageY, 0 < i && i <= 250 && (c.isDoubleTap = !0), c.last = e, h = setTimeout(g, 750), t.originalEvent && t.originalEvent.pointerId && u && ("MSPointerDown" == t.type || "pointerdown" == t.type || "touchstart" == t.type) && u.addPointer(t.originalEvent.pointerId))
                }).on("touchmove MSPointerMove pointermove", function(t) {
                    "MSPointerMove" == t.type && !w(t.originalEvent) || (o = "MSPointerMove" == t.type || "pointermove" == t.type ? t : t.originalEvent.touches[0], v(), c.x2 = o.pageX, c.y2 = o.pageY, n += Math.abs(c.x1 - c.x2), s += Math.abs(c.y1 - c.y2))
                }).on("touchend MSPointerUp pointerup", function(t) {
                    "MSPointerUp" == t.type && !w(t.originalEvent) || (v(), c.x2 && 30 < Math.abs(c.x1 - c.x2) || c.y2 && 30 < Math.abs(c.y1 - c.y2) ? d = setTimeout(function() {
                        var t, e, i, o;
                        void 0 !== c.el && (c.el.trigger("swipe"), c.el.trigger("swipe" + (t = c.x1, e = c.x2, i = c.y1, o = c.y2, Math.abs(t - e) >= Math.abs(i - o) ? 0 < t - e ? "Left" : "Right" : 0 < i - o ? "Up" : "Down"))), c = {}
                    }, 0) : "last" in c && (isNaN(n) || n < 30 && s < 30 ? l = setTimeout(function() {
                        var t = a.Event("tap");
                        t.cancelTouch = k, void 0 !== c.el && c.el.trigger(t), c.isDoubleTap ? (void 0 !== c.el && c.el.trigger("doubleTap"), c = {}) : r = setTimeout(function() {
                            r = null, void 0 !== c.el && c.el.trigger("singleTap"), c = {}
                        }, 250)
                    }, 0) : c = {}, n = s = 0))
                }).on("touchcancel MSPointerCancel pointercancel", function(t) {
                    ("touchcancel" == t.type && p && m || !p && "pointercancel" == t.type && f) && k()
                }), a(window).on("scroll", k)
            }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
                a.fn[e] = function(t) {
                    return a(this).on(e, t)
                }
            })
        }

        function g() {
            h = null, c.last && (void 0 !== c.el && c.el.trigger("longTap"), c = {})
        }

        function v() {
            h && clearTimeout(h), h = null
        }

        function k() {
            r && clearTimeout(r), l && clearTimeout(l), d && clearTimeout(d), h && clearTimeout(h), r = l = d = h = null, c = {}
        }

        function w(t) {
            return t.pointerType == t.MSPOINTER_TYPE_TOUCH && t.isPrimary
        }
    }(jQuery), function(s) {
        "use strict";
        var e, o, i = [];

        function n(t) {
            if (t.is(":visible")) {
                var e = t.parent().width(),
                    i = t.data("width"),
                    o = e / i,
                    n = Math.floor(o * t.data("height"));
                t.css({
                    height: e < i ? n : t.data("height")
                })
            }
        }
        s.component("stackMargin", {
            defaults: {
                cls: "uk-margin-small-top",
                rowfirst: !1,
                observe: !1
            },
            boot: function() {
                s.ready(function(t) {
                    s.$("[data-uk-margin]", t).each(function() {
                        var t = s.$(this);
                        t.data("stackMargin") || s.stackMargin(t, s.Utils.options(t.attr("data-uk-margin")))
                    })
                })
            },
            init: function() {
                var e = this;

                function t() {
                    e.process()
                }
                s.$win.on("resize orientationchange", (s.$(function() {
                    t(), s.$win.on("load", t)
                }), s.Utils.debounce(t, 20))), this.on("display.uk.check", function(t) {
                    this.element.is(":visible") && this.process()
                }.bind(this)), this.options.observe && s.domObserve(this.element, function(t) {
                    e.element.is(":visible") && e.process()
                }), i.push(this)
            },
            process: function() {
                var t = this.element.children();
                if (s.Utils.stackMargin(t, this.options), !this.options.rowfirst || !t.length) return this;
                var i = {},
                    o = !1;
                return t.removeClass(this.options.rowfirst).each(function(t, e) {
                    e = s.$(this), "none" != this.style.display && (t = e.offset().left, ((i[t] = i[t] || []) && i[t]).push(this), o = !1 === o ? t : Math.min(o, t))
                }), s.$(i[o]).addClass(this.options.rowfirst), this
            }
        }), e = [], s.component("responsiveElement", {
            defaults: {},
            boot: function() {
                s.ready(function(t) {
                    s.$("iframe.uk-responsive-width, [data-uk-responsive]", t).each(function() {
                        var t = s.$(this);
                        t.data("responsiveElement") || s.responsiveElement(t, {})
                    })
                })
            },
            init: function() {
                var t = this.element;
                t.attr("width") && t.attr("height") && (t.data({
                    width: t.attr("width"),
                    height: t.attr("height")
                }).on("display.uk.check", function() {
                    n(t)
                }), n(t), e.push(t))
            }
        }), s.$win.on("resize load", s.Utils.debounce(function() {
            e.forEach(function(t) {
                n(t)
            })
        }, 15)), s.Utils.stackMargin = function(t, e) {
            e = s.$.extend({
                cls: "uk-margin-small-top"
            }, e), t = s.$(t).removeClass(e.cls);
            var n = !1;
            t.each(function(t, e, i, o) {
                "none" != (o = s.$(this)).css("display") && (t = o.offset(), e = o.outerHeight(), i = t.top + e, o.data({
                    ukMarginPos: i,
                    ukMarginTop: t.top
                }), (!1 === n || t.top < n.top) && (n = {
                    top: t.top,
                    left: t.left,
                    pos: i
                }))
            }).each(function(t) {
                "none" != (t = s.$(this)).css("display") && t.data("ukMarginTop") > n.top && t.data("ukMarginPos") > n.pos && t.addClass(e.cls)
            })
        }, s.Utils.matchHeights = function(t, e) {
            t = s.$(t).css("min-height", ""), e = s.$.extend({
                row: !0
            }, e);

            function n(t) {
                if (!(t.length < 2)) {
                    var i = 0;
                    t.each(function() {
                        i = Math.max(i, s.$(this).outerHeight())
                    }).each(function() {
                        var t = s.$(this),
                            e = i - ("border-box" == t.css("box-sizing") ? 0 : t.outerHeight() - t.height());
                        t.css("min-height", e + "px")
                    })
                }
            }
            e.row ? (t.first().width(), setTimeout(function() {
                var i = !1,
                    o = [];
                t.each(function() {
                    var t = s.$(this),
                        e = t.offset().top;
                    e != i && o.length && (n(s.$(o)), o = [], e = t.offset().top), o.push(t), i = e
                }), o.length && n(s.$(o))
            }, 0)) : n(t)
        }, o = {}, s.Utils.inlineSvg = function(t, e) {
            s.$(t || 'img[src$=".svg"]', e || document).each(function() {
                var i = s.$(this),
                    t = i.attr("src");
                if (!o[t]) {
                    var e = s.$.Deferred();
                    s.$.get(t, {
                        nc: Math.random()
                    }, function(t) {
                        e.resolve(s.$(t).find("svg"))
                    }), o[t] = e.promise()
                }
                o[t].then(function(t) {
                    var e = s.$(t).clone();
                    i.attr("id") && e.attr("id", i.attr("id")), i.attr("class") && e.attr("class", i.attr("class")), i.attr("style") && e.attr("style", i.attr("style")), i.attr("width") && (e.attr("width", i.attr("width")), i.attr("height") || e.removeAttr("height")), i.attr("height") && (e.attr("height", i.attr("height")), i.attr("width") || e.removeAttr("width")), i.replaceWith(e)
                })
            })
        }, s.ready(function(t) {
            s.Utils.inlineSvg("[data-uk-svg]", t)
        }), s.Utils.getCssVar = function(t) {
            var e, i = document.documentElement,
                o = i.appendChild(document.createElement("div"));
            o.classList.add("var-" + t);
            try {
                e = JSON.parse(e = getComputedStyle(o, ":before").content.replace(/^["'](.*)["']$/, "$1"))
            } catch (t) {
                e = void 0
            }
            return i.removeChild(o), e
        }
    }(UIkit2), function(s) {
        "use strict";

        function i(t, e) {
            e = s.$.extend({
                duration: 1e3,
                transition: "easeOutExpo",
                offset: 0,
                complete: function() {}
            }, e);
            var i = t.offset().top - e.offset,
                o = s.$doc.height(),
                n = window.innerHeight;
            o < i + n && (i = o - n), s.$("html,body").stop().animate({
                scrollTop: i
            }, e.duration, e.transition).promise().done(e.complete)
        }
        s.component("smoothScroll", {
            boot: function() {
                s.$html.on("click.smooth-scroll.uikit", "[data-uk-smooth-scroll]", function(t) {
                    var e = s.$(this);
                    if (!e.data("smoothScroll")) {
                        s.smoothScroll(e, s.Utils.options(e.attr("data-uk-smooth-scroll")));
                        e.trigger("click")
                    }
                    return !1
                })
            },
            init: function() {
                var e = this;
                this.on("click", function(t) {
                    t.preventDefault(), i(s.$(this.hash).length ? s.$(this.hash) : s.$("body"), e.options)
                })
            }
        }), s.Utils.scrollToElement = i, s.$.easing.easeOutExpo || (s.$.easing.easeOutExpo = function(t, e, i, o, n) {
            return e == n ? i + o : o * (1 - Math.pow(2, -10 * e / n)) + i
        })
    }(UIkit2), function(h) {
        "use strict";

        function t() {
            for (var t = 0; t < i.length; t++) window.requestAnimationFrame.apply(window, [i[t].check])
        }
        var u = h.$win,
            e = h.$doc,
            i = [];
        h.component("scrollspy", {
            defaults: {
                target: !1,
                cls: "uk-scrollspy-inview",
                initcls: "uk-scrollspy-init-inview",
                topoffset: 0,
                leftoffset: 0,
                repeat: !1,
                delay: 0
            },
            boot: function() {
                e.on("scrolling.uk.document", t), u.on("load resize orientationchange", h.Utils.debounce(t, 50)), h.ready(function(t) {
                    h.$("[data-uk-scrollspy]", t).each(function() {
                        var t = h.$(this);
                        if (!t.data("scrollspy")) h.scrollspy(t, h.Utils.options(t.attr("data-uk-scrollspy")))
                    })
                })
            },
            init: function() {
                function t() {
                    var t = l.options.target ? l.element.find(l.options.target) : l.element,
                        s = 1 === t.length ? 1 : 0,
                        a = 0;
                    t.each(function(t) {
                        var e = h.$(this),
                            i = e.data("inviewstate"),
                            o = h.Utils.isInView(e, l.options),
                            n = e.attr("data-uk-scrollspy-cls") || d[a].trim();
                        !o || i || e.data("scrollspy-idle") || (r || (e.addClass(l.options.initcls), l.offset = e.offset(), r = !0, e.trigger("init.uk.scrollspy")), e.data("scrollspy-idle", setTimeout(function() {
                            e.addClass("uk-scrollspy-inview").toggleClass(n).width(), e.trigger("inview.uk.scrollspy"), e.data("scrollspy-idle", !1), e.data("inviewstate", !0)
                        }, l.options.delay * s)), s++), !o && i && l.options.repeat && (e.data("scrollspy-idle") && (clearTimeout(e.data("scrollspy-idle")), e.data("scrollspy-idle", !1)), e.removeClass("uk-scrollspy-inview").toggleClass(n), e.data("inviewstate", !1), e.trigger("outview.uk.scrollspy")), a = d[a + 1] ? a + 1 : 0
                    })
                }
                var r, l = this,
                    d = this.options.cls.split(/,/);
                t(), this.check = t, i.push(this)
            }
        });

        function o() {
            for (var t = 0; t < c.length; t++) window.requestAnimationFrame.apply(window, [c[t].check])
        }
        var c = [];
        h.component("scrollspynav", {
            defaults: {
                cls: "uk-active",
                closest: !1,
                topoffset: 0,
                leftoffset: 0,
                smoothscroll: !1
            },
            boot: function() {
                e.on("scrolling.uk.document", o), u.on("resize orientationchange", h.Utils.debounce(o, 50)), h.ready(function(t) {
                    h.$("[data-uk-scrollspy-nav]", t).each(function() {
                        var t = h.$(this);
                        if (!t.data("scrollspynav")) h.scrollspynav(t, h.Utils.options(t.attr("data-uk-scrollspy-nav")))
                    })
                })
            },
            init: function() {
                function t() {
                    n = [];
                    for (var t = 0; t < a.length; t++) h.Utils.isInView(a.eq(t), d.options) && n.push(a.eq(t));
                    if (n.length) {
                        var e, i = u.scrollTop(),
                            o = function() {
                                for (var t = 0; t < n.length; t++)
                                    if (n[t].offset().top - d.options.topoffset >= i) return n[t]
                            }();
                        if (!o) return;
                        e = d.options.closest ? (s.blur().closest(l).removeClass(r), s.filter("a[href='#" + o.attr("id") + "']").closest(l).addClass(r)) : s.removeClass(r).filter("a[href='#" + o.attr("id") + "']").addClass(r), d.element.trigger("inview.uk.scrollspynav", [o, e])
                    }
                }
                var n, e = [],
                    s = this.find("a[href^='#']").each(function() {
                        "#" !== this.getAttribute("href").trim() && e.push(this.getAttribute("href"))
                    }),
                    a = h.$(e.join(",")),
                    r = this.options.cls,
                    l = this.options.closest || this.options.closest,
                    d = this;
                this.options.smoothscroll && h.smoothScroll && s.each(function() {
                    h.smoothScroll(this, d.options.smoothscroll)
                }), t(), this.element.data("scrollspynav", this), this.check = t, c.push(this)
            }
        })
    }(UIkit2), function(o) {
        "use strict";
        var i = [];
        o.component("toggle", {
            defaults: {
                target: !1,
                cls: "uk-hidden",
                animation: !1,
                duration: 200
            },
            boot: function() {
                o.ready(function(t) {
                    o.$("[data-uk-toggle]", t).each(function() {
                        var t = o.$(this);
                        if (!t.data("toggle")) o.toggle(t, o.Utils.options(t.attr("data-uk-toggle")))
                    }), setTimeout(function() {
                        i.forEach(function(t) {
                            t.getToggles()
                        })
                    }, 0)
                })
            },
            init: function() {
                var e = this;
                this.aria = -1 !== this.options.cls.indexOf("uk-hidden"), this.on("click", function(t) {
                    e.element.is('a[href="#"]') && t.preventDefault(), e.toggle()
                }), i.push(this)
            },
            toggle: function() {
                if (this.getToggles(), this.totoggle.length) {
                    if (this.options.animation && o.support.animation) {
                        var e = this,
                            i = this.options.animation.split(",");
                        1 == i.length && (i[1] = i[0]), i[0] = i[0].trim(), i[1] = i[1].trim(), this.totoggle.css("animation-duration", this.options.duration + "ms"), this.totoggle.each(function() {
                            var t = o.$(this);
                            t.hasClass(e.options.cls) ? (t.toggleClass(e.options.cls), o.Utils.animate(t, i[0]).then(function() {
                                t.css("animation-duration", ""), o.Utils.checkDisplay(t)
                            })) : o.Utils.animate(this, i[1] + " uk-animation-reverse").then(function() {
                                t.toggleClass(e.options.cls).css("animation-duration", ""), o.Utils.checkDisplay(t)
                            })
                        })
                    } else this.totoggle.toggleClass(this.options.cls), o.Utils.checkDisplay(this.totoggle);
                    this.updateAria()
                }
            },
            getToggles: function() {
                this.totoggle = this.options.target ? o.$(this.options.target) : [], this.updateAria()
            },
            updateAria: function() {
                this.aria && this.totoggle.length && this.totoggle.not("[aria-hidden]").each(function() {
                    o.$(this).attr("aria-hidden", o.$(this).hasClass("uk-hidden"))
                })
            }
        })
    }(UIkit2), function(o) {
        "use strict";
        o.component("alert", {
            defaults: {
                fade: !0,
                duration: 200,
                trigger: ".uk-alert-close"
            },
            boot: function() {
                o.$html.on("click.alert.uikit", "[data-uk-alert]", function(t) {
                    var e = o.$(this);
                    if (!e.data("alert")) {
                        var i = o.alert(e, o.Utils.options(e.attr("data-uk-alert")));
                        o.$(t.target).is(i.options.trigger) && (t.preventDefault(), i.close())
                    }
                })
            },
            init: function() {
                var e = this;
                this.on("click", this.options.trigger, function(t) {
                    t.preventDefault(), e.close()
                })
            },
            close: function() {
                var t = this.trigger("close.uk.alert"),
                    e = function() {
                        this.trigger("closed.uk.alert").remove()
                    }.bind(this);
                this.options.fade ? t.css("overflow", "hidden").css("max-height", t.height()).animate({
                    height: 0,
                    opacity: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginTop: 0,
                    marginBottom: 0
                }, this.options.duration, e) : e()
            }
        })
    }(UIkit2), function(n) {
        "use strict";
        n.component("buttonRadio", {
            defaults: {
                activeClass: "uk-active",
                target: ".uk-button"
            },
            boot: function() {
                n.$html.on("click.buttonradio.uikit", "[data-uk-button-radio]", function(t) {
                    var e = n.$(this);
                    if (!e.data("buttonRadio")) {
                        var i = n.buttonRadio(e, n.Utils.options(e.attr("data-uk-button-radio"))),
                            o = n.$(t.target);
                        o.is(i.options.target) && o.trigger("click")
                    }
                })
            },
            init: function() {
                var i = this;
                this.find(i.options.target).attr("aria-checked", "false").filter("." + i.options.activeClass).attr("aria-checked", "true"), this.on("click", this.options.target, function(t) {
                    var e = n.$(this);
                    e.is('a[href="#"]') && t.preventDefault(), i.find(i.options.target).not(e).removeClass(i.options.activeClass).blur(), e.addClass(i.options.activeClass), i.find(i.options.target).not(e).attr("aria-checked", "false"), e.attr("aria-checked", "true"), i.trigger("change.uk.button", [e])
                })
            },
            getSelected: function() {
                return this.find("." + this.options.activeClass)
            }
        }), n.component("buttonCheckbox", {
            defaults: {
                activeClass: "uk-active",
                target: ".uk-button"
            },
            boot: function() {
                n.$html.on("click.buttoncheckbox.uikit", "[data-uk-button-checkbox]", function(t) {
                    var e = n.$(this);
                    if (!e.data("buttonCheckbox")) {
                        var i = n.buttonCheckbox(e, n.Utils.options(e.attr("data-uk-button-checkbox"))),
                            o = n.$(t.target);
                        o.is(i.options.target) && o.trigger("click")
                    }
                })
            },
            init: function() {
                var i = this;
                this.find(i.options.target).attr("aria-checked", "false").filter("." + i.options.activeClass).attr("aria-checked", "true"), this.on("click", this.options.target, function(t) {
                    var e = n.$(this);
                    e.is('a[href="#"]') && t.preventDefault(), e.toggleClass(i.options.activeClass).blur(), e.attr("aria-checked", e.hasClass(i.options.activeClass)), i.trigger("change.uk.button", [e])
                })
            },
            getSelected: function() {
                return this.find("." + this.options.activeClass)
            }
        }), n.component("button", {
            defaults: {},
            boot: function() {
                n.$html.on("click.button.uikit", "[data-uk-button]", function(t) {
                    var e = n.$(this);
                    if (!e.data("button")) {
                        n.button(e, n.Utils.options(e.attr("data-uk-button")));
                        e.trigger("click")
                    }
                })
            },
            init: function() {
                var e = this;
                this.element.attr("aria-pressed", this.element.hasClass("uk-active")), this.on("click", function(t) {
                    e.element.is('a[href="#"]') && t.preventDefault(), e.toggle(), e.trigger("change.uk.button", [e.element.blur().hasClass("uk-active")])
                })
            },
            toggle: function() {
                this.element.toggleClass("uk-active"), this.element.attr("aria-pressed", this.element.hasClass("uk-active"))
            }
        })
    }(UIkit2), function(u) {
        "use strict";
        var o, n = !1,
            c = {
                x: {
                    "bottom-left": "bottom-right",
                    "bottom-right": "bottom-left",
                    "bottom-center": "bottom-center",
                    "top-left": "top-right",
                    "top-right": "top-left",
                    "top-center": "top-center",
                    "left-top": "right-top",
                    "left-bottom": "right-bottom",
                    "left-center": "right-center",
                    "right-top": "left-top",
                    "right-bottom": "left-bottom",
                    "right-center": "left-center"
                },
                y: {
                    "bottom-left": "top-left",
                    "bottom-right": "top-right",
                    "bottom-center": "top-center",
                    "top-left": "bottom-left",
                    "top-right": "bottom-right",
                    "top-center": "bottom-center",
                    "left-top": "left-bottom",
                    "left-bottom": "left-top",
                    "left-center": "left-center",
                    "right-top": "right-bottom",
                    "right-bottom": "right-top",
                    "right-center": "right-center"
                },
                xy: {
                    "bottom-left": "top-right",
                    "bottom-right": "top-left",
                    "bottom-center": "top-center",
                    "top-left": "bottom-right",
                    "top-right": "bottom-left",
                    "top-center": "bottom-center",
                    "left-top": "right-bottom",
                    "left-bottom": "right-top",
                    "left-center": "right-center",
                    "right-top": "left-bottom",
                    "right-bottom": "left-top",
                    "right-center": "left-center"
                }
            };

        function p(t, e, i, o) {
            if (t = u.$(t), e = u.$(e), i = i || window.innerWidth, o = o || t.offset(), e.length) {
                var n = e.outerWidth();
                if (t.css("min-width", n), "right" == u.langdirection) {
                    var s = i - (e.offset().left + n),
                        a = i - (t.offset().left + t.outerWidth());
                    t.css("margin-right", s - a)
                } else t.css("margin-left", e.offset().left - o.left)
            }
        }
        u.component("dropdown", {
            defaults: {
                mode: "hover",
                pos: "bottom-left",
                offset: 0,
                remaintime: 800,
                justify: !1,
                boundary: u.$win,
                delay: 0,
                dropdownSelector: ".uk-dropdown,.uk-dropdown-blank",
                hoverDelayIdle: 250,
                preventflip: !1
            },
            remainIdle: !1,
            boot: function() {
                var o = u.support.touch ? "click" : "mouseenter";
                u.$html.on(o + ".dropdown.uikit focus pointerdown", "[data-uk-dropdown]", function(t) {
                    var e = u.$(this);
                    if (!e.data("dropdown")) {
                        var i = u.dropdown(e, u.Utils.options(e.attr("data-uk-dropdown")));
                        ("click" == t.type || "mouseenter" == t.type && "hover" == i.options.mode) && i.element.trigger(o), i.dropdown.length && t.preventDefault()
                    }
                })
            },
            init: function() {
                var i = this;
                this.dropdown = this.find(this.options.dropdownSelector), this.offsetParent = this.dropdown.parents().filter(function() {
                    return -1 !== u.$.inArray(u.$(this).css("position"), ["relative", "fixed", "absolute"])
                }).slice(0, 1), this.offsetParent.length || (this.offsetParent = this.element), this.centered = this.dropdown.hasClass("uk-dropdown-center"), this.justified = !!this.options.justify && u.$(this.options.justify), this.boundary = u.$(this.options.boundary), this.boundary.length || (this.boundary = u.$win), this.dropdown.hasClass("uk-dropdown-up") && (this.options.pos = "top-left"), this.dropdown.hasClass("uk-dropdown-flip") && (this.options.pos = this.options.pos.replace("left", "right")), this.dropdown.hasClass("uk-dropdown-center") && (this.options.pos = this.options.pos.replace(/(left|right)/, "center")), this.element.attr("aria-haspopup", "true"), this.element.attr("aria-expanded", this.element.hasClass("uk-open")), this.dropdown.attr("aria-hidden", "true"), "click" == this.options.mode || u.support.touch ? this.on("click.uk.dropdown", function(t) {
                    var e = u.$(t.target);
                    e.parents(i.options.dropdownSelector).length || ((e.is("a[href='#']") || e.parent().is("a[href='#']") || i.dropdown.length && !i.dropdown.is(":visible")) && t.preventDefault(), e.blur()), i.element.hasClass("uk-open") ? i.dropdown.find(t.target).length && !e.is(".uk-dropdown-close") && !e.parents(".uk-dropdown-close").length || i.hide() : i.show()
                }) : this.on("mouseenter", function(t) {
                    i.trigger("pointerenter.uk.dropdown", [i]), i.remainIdle && clearTimeout(i.remainIdle), o && clearTimeout(o), n && n == i || (o = n && n != i ? setTimeout(function() {
                        o = setTimeout(i.show.bind(i), i.options.delay)
                    }, i.options.hoverDelayIdle) : setTimeout(i.show.bind(i), i.options.delay))
                }).on("mouseleave", function() {
                    o && clearTimeout(o), i.remainIdle = setTimeout(function() {
                        n && n == i && i.hide()
                    }, i.options.remaintime), i.trigger("pointerleave.uk.dropdown", [i])
                }).on("click", function(t) {
                    var e = u.$(t.target);
                    i.remainIdle && clearTimeout(i.remainIdle), n && n == i ? i.dropdown.find(t.target).length && !e.is(".uk-dropdown-close") && !e.parents(".uk-dropdown-close").length || i.hide() : ((e.is("a[href='#']") || e.parent().is("a[href='#']")) && t.preventDefault(), i.show())
                })
            },
            show: function() {
                u.$html.off("click.outer.dropdown"), n && n != this && n.hide(!0), o && clearTimeout(o), this.trigger("beforeshow.uk.dropdown", [this]), this.checkDimensions(), this.element.addClass("uk-open"), this.element.attr("aria-expanded", "true"), this.dropdown.attr("aria-hidden", "false"), this.trigger("show.uk.dropdown", [this]), u.Utils.checkDisplay(this.dropdown, !0), u.Utils.focus(this.dropdown), (n = this).registerOuterClick()
            },
            hide: function(t) {
                this.trigger("beforehide.uk.dropdown", [this, t]), this.element.removeClass("uk-open"), this.remainIdle && clearTimeout(this.remainIdle), this.remainIdle = !1, this.element.attr("aria-expanded", "false"), this.dropdown.attr("aria-hidden", "true"), this.trigger("hide.uk.dropdown", [this, t]), n == this && (n = !1)
            },
            registerOuterClick: function() {
                var e = this;
                u.$html.off("click.outer.dropdown"), setTimeout(function() {
                    u.$html.on("click.outer.dropdown", function(t) {
                        o && clearTimeout(o);
                        u.$(t.target);
                        n != e || e.element.find(t.target).length || (e.hide(!0), u.$html.off("click.outer.dropdown"))
                    })
                }, 10)
            },
            checkDimensions: function() {
                if (this.dropdown.length) {
                    this.dropdown.removeClass("uk-dropdown-top uk-dropdown-bottom uk-dropdown-left uk-dropdown-right uk-dropdown-stack uk-dropdown-autoflip").css({
                        topLeft: "",
                        left: "",
                        marginLeft: "",
                        marginRight: ""
                    }), this.justified && this.justified.length && this.dropdown.css("min-width", "");
                    var t, e = u.$.extend({}, this.offsetParent.offset(), {
                            width: this.offsetParent[0].offsetWidth,
                            height: this.offsetParent[0].offsetHeight
                        }),
                        i = this.options.offset,
                        o = this.dropdown,
                        n = (o.show().offset(), o.outerWidth()),
                        s = o.outerHeight(),
                        a = this.boundary.width(),
                        r = (this.boundary[0] !== window && this.boundary.offset() && this.boundary.offset(), this.options.pos),
                        l = {
                            "bottom-left": {
                                top: 0 + e.height + i,
                                left: 0
                            },
                            "bottom-right": {
                                top: 0 + e.height + i,
                                left: 0 + e.width - n
                            },
                            "bottom-center": {
                                top: 0 + e.height + i,
                                left: 0 + e.width / 2 - n / 2
                            },
                            "top-left": {
                                top: 0 - s - i,
                                left: 0
                            },
                            "top-right": {
                                top: 0 - s - i,
                                left: 0 + e.width - n
                            },
                            "top-center": {
                                top: 0 - s - i,
                                left: 0 + e.width / 2 - n / 2
                            },
                            "left-top": {
                                top: 0,
                                left: 0 - n - i
                            },
                            "left-bottom": {
                                top: 0 + e.height - s,
                                left: 0 - n - i
                            },
                            "left-center": {
                                top: 0 + e.height / 2 - s / 2,
                                left: 0 - n - i
                            },
                            "right-top": {
                                top: 0,
                                left: 0 + e.width + i
                            },
                            "right-bottom": {
                                top: 0 + e.height - s,
                                left: 0 + e.width + i
                            },
                            "right-center": {
                                top: 0 + e.height / 2 - s / 2,
                                left: 0 + e.width + i
                            }
                        },
                        d = {};
                    if (t = r.split("-"), d = l[r] ? l[r] : l["bottom-left"], this.justified && this.justified.length) p(o.css({
                        left: 0
                    }), this.justified, a);
                    else if (!0 !== this.options.preventflip) {
                        var h;
                        switch (this.checkBoundary(e.left + d.left, e.top + d.top, n, s, a)) {
                            case "x":
                                "x" !== this.options.preventflip && (h = c.x[r] || "right-top");
                                break;
                            case "y":
                                "y" !== this.options.preventflip && (h = c.y[r] || "top-left");
                                break;
                            case "xy":
                                this.options.preventflip || (h = c.xy[r] || "right-bottom")
                        }
                        h && (t = h.split("-"), d = l[h] ? l[h] : l["bottom-left"], o.addClass("uk-dropdown-autoflip"), this.checkBoundary(e.left + d.left, e.top + d.top, n, s, a) && (t = r.split("-"), d = l[r] ? l[r] : l["bottom-left"]))
                    }
                    a < n && (o.addClass("uk-dropdown-stack"), this.trigger("stack.uk.dropdown", [this])), o.css(d).css("display", "").addClass("uk-dropdown-" + t[0])
                }
            },
            checkBoundary: function(t, e, i, o, n) {
                var s = "";
                return (t < 0 || t - u.$win.scrollLeft() + i > n) && (s += "x"), (e - u.$win.scrollTop() < 0 || e - u.$win.scrollTop() + o > window.innerHeight) && (s += "y"), s
            }
        }), u.component("dropdownOverlay", {
            defaults: {
                justify: !1,
                cls: "",
                duration: 200
            },
            boot: function() {
                u.ready(function(t) {
                    u.$("[data-uk-dropdown-overlay]", t).each(function() {
                        var t = u.$(this);
                        t.data("dropdownOverlay") || u.dropdownOverlay(t, u.Utils.options(t.attr("data-uk-dropdown-overlay")))
                    })
                })
            },
            init: function() {
                var o = this;
                this.justified = !!this.options.justify && u.$(this.options.justify), this.overlay = this.element.find("uk-dropdown-overlay"), this.overlay.length || (this.overlay = u.$('<div class="uk-dropdown-overlay"></div>').appendTo(this.element)), this.overlay.addClass(this.options.cls), this.on({
                    "beforeshow.uk.dropdown": function(t, e) {
                        o.dropdown = e, o.justified && o.justified.length && p(o.overlay.css({
                            display: "block",
                            marginLeft: "",
                            marginRight: ""
                        }), o.justified, o.justified.outerWidth())
                    },
                    "show.uk.dropdown": function(t, e) {
                        var i = o.dropdown.dropdown.outerHeight(!0);
                        o.dropdown.element.removeClass("uk-open"), o.overlay.stop().css("display", "block").animate({
                            height: i
                        }, o.options.duration, function() {
                            o.dropdown.dropdown.css("visibility", ""), o.dropdown.element.addClass("uk-open"), u.Utils.checkDisplay(o.dropdown.dropdown, !0)
                        }), o.pointerleave = !1
                    },
                    "hide.uk.dropdown": function() {
                        o.overlay.stop().animate({
                            height: 0
                        }, o.options.duration)
                    },
                    "pointerenter.uk.dropdown": function(t, e) {
                        clearTimeout(o.remainIdle)
                    },
                    "pointerleave.uk.dropdown": function(t, e) {
                        o.pointerleave = !0
                    }
                }), this.overlay.on({
                    mouseenter: function() {
                        o.remainIdle && (clearTimeout(o.dropdown.remainIdle), clearTimeout(o.remainIdle))
                    },
                    mouseleave: function() {
                        o.pointerleave && n && (o.remainIdle = setTimeout(function() {
                            n && n.hide()
                        }, n.options.remaintime))
                    }
                })
            }
        })
    }(UIkit2), function(i) {
        "use strict";
        var o = [];
        i.component("gridMatchHeight", {
            defaults: {
                target: !1,
                row: !0,
                ignorestacked: !1,
                observe: !1
            },
            boot: function() {
                i.ready(function(t) {
                    i.$("[data-uk-grid-match]", t).each(function() {
                        var t = i.$(this);
                        t.data("gridMatchHeight") || i.gridMatchHeight(t, i.Utils.options(t.attr("data-uk-grid-match")))
                    })
                })
            },
            init: function() {
                var e = this;

                function t() {
                    e.element.is(":visible") && e.match()
                }
                this.columns = this.element.children(), this.elements = this.options.target ? this.find(this.options.target) : this.columns, this.columns.length && (i.$win.on("load resize orientationchange", (i.$(function() {
                    t()
                }), i.Utils.debounce(t, 50))), this.options.observe && i.domObserve(this.element, function(t) {
                    e.element.is(":visible") && e.match()
                }), this.on("display.uk.check", function(t) {
                    this.element.is(":visible") && this.match()
                }.bind(this)), o.push(this))
            },
            match: function() {
                var t = this.columns.filter(":visible:first");
                if (t.length) return 100 <= Math.ceil(100 * parseFloat(t.css("width")) / parseFloat(t.parent().css("width"))) && !this.options.ignorestacked ? this.revert() : i.Utils.matchHeights(this.elements, this.options), this
            },
            revert: function() {
                return this.elements.css("min-height", ""), this
            }
        }), i.component("gridMargin", {
            defaults: {
                cls: "uk-grid-margin",
                rowfirst: "uk-row-first"
            },
            boot: function() {
                i.ready(function(t) {
                    i.$("[data-uk-grid-margin]", t).each(function() {
                        var t = i.$(this);
                        t.data("gridMargin") || i.gridMargin(t, i.Utils.options(t.attr("data-uk-grid-margin")))
                    })
                })
            },
            init: function() {
                i.stackMargin(this.element, this.options)
            }
        })
    }(UIkit2), function(a) {
        "use strict";
        var n, e = !1,
            i = 0,
            o = a.$html;
        a.$win.on("resize orientationchange", a.Utils.debounce(function() {
            a.$(".uk-modal.uk-open").each(function() {
                return a.$(this).data("modal") && a.$(this).data("modal").resize()
            })
        }, 150)), a.component("modal", {
            defaults: {
                keyboard: !0,
                bgclose: !0,
                minScrollHeight: 150,
                center: !1,
                modal: !0
            },
            scrollable: !1,
            transition: !1,
            hasTransitioned: !0,
            init: function() {
                if (n = n || a.$("body"), this.element.length) {
                    var e = this;
                    this.paddingdir = "padding-" + ("left" == a.langdirection ? "right" : "left"), this.dialog = this.find(".uk-modal-dialog"), this.active = !1, this.element.attr("aria-hidden", this.element.hasClass("uk-open")), this.on("click", ".uk-modal-close", function(t) {
                        t.preventDefault(), a.$(t.target).closest(".uk-modal")[0] === e.element[0] && e.hide()
                    }).on("click", function(t) {
                        a.$(t.target)[0] == e.element[0] && e.options.bgclose && e.hide()
                    }), a.domObserve(this.element, function(t) {
                        e.resize()
                    })
                }
            },
            toggle: function() {
                return this[this.isActive() ? "hide" : "show"]()
            },
            show: function() {
                if (this.element.length) {
                    var t = this;
                    if (!this.isActive()) return this.options.modal && e && e.hide(!0), this.element.removeClass("uk-open").show(), this.resize(!0), this.options.modal && (e = this), this.active = !0, i++, a.support.transition ? (this.hasTransitioned = !1, this.element.one(a.support.transition.end, function() {
                        t.hasTransitioned = !0, a.Utils.focus(t.dialog, "a[href]")
                    }).addClass("uk-open")) : (this.element.addClass("uk-open"), a.Utils.focus(this.dialog, "a[href]")), o.addClass("uk-modal-page").height(), this.element.attr("aria-hidden", "false"), this.element.trigger("show.uk.modal"), a.Utils.checkDisplay(this.dialog, !0), this
                }
            },
            hide: function(t) {
                if (!t && a.support.transition && this.hasTransitioned) {
                    var e = this;
                    this.one(a.support.transition.end, function() {
                        e._hide()
                    }).removeClass("uk-open")
                } else this._hide();
                return this
            },
            resize: function(t) {
                if (this.isActive() || t) {
                    var e = n.width();
                    if (this.scrollbarwidth = window.innerWidth - e, n.css(this.paddingdir, this.scrollbarwidth), this.element.css("overflow-y", this.scrollbarwidth ? "scroll" : "auto"), !this.updateScrollable() && this.options.center) {
                        var i = this.dialog.outerHeight(),
                            o = parseInt(this.dialog.css("margin-top"), 10) + parseInt(this.dialog.css("margin-bottom"), 10);
                        i + o < window.innerHeight ? this.dialog.css({
                            top: window.innerHeight / 2 - i / 2 - o
                        }) : this.dialog.css({
                            top: ""
                        })
                    }
                }
            },
            updateScrollable: function() {
                var t = this.dialog.find(".uk-overflow-container:visible:first");
                if (t.length) {
                    t.css("height", 0);
                    var e = Math.abs(parseInt(this.dialog.css("margin-top"), 10)),
                        i = this.dialog.outerHeight(),
                        o = window.innerHeight - 2 * (e < 20 ? 20 : e) - i;
                    return t.css({
                        maxHeight: o < this.options.minScrollHeight ? "" : o,
                        height: ""
                    }), !0
                }
                return !1
            },
            _hide: function() {
                this.active = !1, 0 < i ? i-- : i = 0, this.element.hide().removeClass("uk-open"), this.element.attr("aria-hidden", "true"), i || (o.removeClass("uk-modal-page"), n.css(this.paddingdir, "")), e === this && (e = !1), this.trigger("hide.uk.modal")
            },
            isActive: function() {
                return this.element.hasClass("uk-open")
            }
        }), a.component("modalTrigger", {
            boot: function() {
                a.$html.on("click.modal.uikit", "[data-uk-modal]", function(t) {
                    var e = a.$(this);
                    e.is("a") && t.preventDefault(), e.data("modalTrigger") || a.modalTrigger(e, a.Utils.options(e.attr("data-uk-modal"))).show()
                }), a.$html.on("keydown.modal.uikit", function(t) {
                    e && 27 === t.keyCode && e.options.keyboard && (t.preventDefault(), e.hide())
                })
            },
            init: function() {
                var e = this;
                this.options = a.$.extend({
                    target: !!e.element.is("a") && e.element.attr("href")
                }, this.options), this.modal = a.modal(this.options.target, this.options), this.on("click", function(t) {
                    t.preventDefault(), e.show()
                }), this.proxy(this.modal, "show hide isActive")
            }
        }), a.modal.dialog = function(t, e) {
            var i = a.modal(a.$(a.modal.dialog.template).appendTo("body"), e);
            return i.on("hide.uk.modal", function() {
                    i.persist && (i.persist.appendTo(i.persist.data("modalPersistParent")), i.persist = !1), i.element.remove()
                }),
                function(t, e) {
                    if (!e) return;
                    "object" == typeof t ? (t = t instanceof jQuery ? t : a.$(t)).parent().length && (e.persist = t, e.persist.data("modalPersistParent", t.parent())) : t = "string" == typeof t || "number" == typeof t ? a.$("<div></div>").html(t) : a.$("<div></div>").html("UIkit2.modal Error: Unsupported data type: " + typeof t);
                    t.appendTo(e.element.find(".uk-modal-dialog"))
                }(t, i), i
        }, a.modal.dialog.template = '<div class="uk-modal"><div class="uk-modal-dialog" style="min-height:0;"></div></div>', a.modal.alert = function(t, e) {
            e = a.$.extend(!0, {
                bgclose: !1,
                keyboard: !1,
                modal: !1,
                labels: a.modal.labels
            }, e);
            var i = a.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(t) + "</div>", '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary uk-modal-close">' + e.labels.Ok + "</button></div>"].join(""), e);
            return i.on("show.uk.modal", function() {
                setTimeout(function() {
                    i.element.find("button:first").focus()
                }, 50)
            }), i.show()
        }, a.modal.confirm = function(t, e, i) {
            var o = 1 < arguments.length && arguments[arguments.length - 1] ? arguments[arguments.length - 1] : {};
            e = a.$.isFunction(e) ? e : function() {}, i = a.$.isFunction(i) ? i : function() {}, o = a.$.extend(!0, {
                bgclose: !1,
                keyboard: !1,
                modal: !1,
                labels: a.modal.labels
            }, a.$.isFunction(o) ? {} : o);
            var n = a.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(t) + "</div>", '<div class="uk-modal-footer uk-text-right"><button class="uk-button js-modal-confirm-cancel">' + o.labels.Cancel + '</button> <button class="uk-button uk-button-primary js-modal-confirm">' + o.labels.Ok + "</button></div>"].join(""), o);
            return n.element.find(".js-modal-confirm, .js-modal-confirm-cancel").on("click", function() {
                (a.$(this).is(".js-modal-confirm") ? e : i)(), n.hide()
            }), n.on("show.uk.modal", function() {
                setTimeout(function() {
                    n.element.find(".js-modal-confirm").focus()
                }, 50)
            }), n.show()
        }, a.modal.prompt = function(t, e, i, o) {
            i = a.$.isFunction(i) ? i : function(t) {}, o = a.$.extend(!0, {
                bgclose: !1,
                keyboard: !1,
                modal: !1,
                labels: a.modal.labels
            }, o);
            var n = a.modal.dialog([t ? '<div class="uk-modal-content uk-form">' + String(t) + "</div>" : "", '<div class="uk-margin-small-top uk-modal-content uk-form"><p><input type="text" class="uk-width-1-1"></p></div>', '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-modal-close">' + o.labels.Cancel + '</button> <button class="uk-button uk-button-primary js-modal-ok">' + o.labels.Ok + "</button></div>"].join(""), o),
                s = n.element.find("input[type='text']").val(e || "").on("keyup", function(t) {
                    13 == t.keyCode && n.element.find(".js-modal-ok").trigger("click")
                });
            return n.element.find(".js-modal-ok").on("click", function() {
                !1 !== i(s.val()) && n.hide()
            }), n.show()
        }, a.modal.blockUI = function(t, e) {
            var i = a.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(t || '<div class="uk-text-center">...</div>') + "</div>"].join(""), a.$.extend({
                bgclose: !1,
                keyboard: !1,
                modal: !1
            }, e));
            return i.content = i.element.find(".uk-modal-content:first"), i.show()
        }, a.modal.labels = {
            Ok: "Ok",
            Cancel: "Cancel"
        }
    }(UIkit2), function(a) {
        "use strict";
        a.component("nav", {
            defaults: {
                toggle: '>li.uk-parent > a[href="#"]',
                lists: ">li.uk-parent > ul",
                multiple: !1
            },
            boot: function() {
                a.ready(function(t) {
                    a.$("[data-uk-nav]", t).each(function() {
                        var t = a.$(this);
                        if (!t.data("nav")) a.nav(t, a.Utils.options(t.attr("data-uk-nav")))
                    })
                })
            },
            init: function() {
                var i = this;
                this.on("click.uk.nav", this.options.toggle, function(t) {
                    t.preventDefault();
                    var e = a.$(this);
                    i.open(e.parent()[0] == i.element[0] ? e : e.parent("li"))
                }), this.update(), a.domObserve(this.element, function(t) {
                    i.element.find(i.options.lists).not("[role]").length && i.update()
                })
            },
            update: function() {
                var o = this;
                this.find(this.options.lists).each(function() {
                    var t = a.$(this).attr("role", "menu"),
                        e = t.closest("li"),
                        i = e.hasClass("uk-active");
                    e.data("list-container") || (t.wrap('<div style="overflow:hidden;height:0;position:relative;"></div>'), e.data("list-container", t.parent()[i ? "removeClass" : "addClass"]("uk-hidden"))), e.attr("aria-expanded", e.hasClass("uk-open")), i && o.open(e, !0)
                })
            },
            open: function(t, e) {
                var i = this,
                    o = this.element,
                    n = a.$(t),
                    s = n.data("list-container");
                this.options.multiple || o.children(".uk-open").not(t).each(function() {
                    var t = a.$(this);
                    t.data("list-container") && t.data("list-container").stop().animate({
                        height: 0
                    }, function() {
                        a.$(this).parent().removeClass("uk-open").end().addClass("uk-hidden")
                    })
                }), n.toggleClass("uk-open"), n.attr("aria-expanded", n.hasClass("uk-open")), s && (n.hasClass("uk-open") && s.removeClass("uk-hidden"), e ? (s.stop().height(n.hasClass("uk-open") ? "auto" : 0), n.hasClass("uk-open") || s.addClass("uk-hidden"), this.trigger("display.uk.check")) : s.stop().animate({
                    height: n.hasClass("uk-open") ? function(t) {
                        var e = a.$(t),
                            i = "auto";
                        if (e.is(":visible")) i = e.outerHeight();
                        else {
                            var o = {
                                position: e.css("position"),
                                visibility: e.css("visibility"),
                                display: e.css("display")
                            };
                            i = e.css({
                                position: "absolute",
                                visibility: "hidden",
                                display: "block"
                            }).outerHeight(), e.css(o)
                        }
                        return i
                    }(s.find("ul:first")) : 0
                }, function() {
                    n.hasClass("uk-open") ? s.css("height", "") : s.addClass("uk-hidden"), i.trigger("display.uk.check")
                }))
            }
        })
    }(UIkit2), function(r) {
        "use strict";
        var l = {
                x: window.scrollX,
                y: window.scrollY
            },
            d = (r.$win, r.$doc, r.$html),
            n = {
                show: function(t, e) {
                    if ((t = r.$(t)).length) {
                        e = r.$.extend({
                            mode: "push"
                        }, e);
                        var i = r.$("body"),
                            o = t.find(".uk-offcanvas-bar:first"),
                            n = "right" == r.langdirection,
                            s = (o.hasClass("uk-offcanvas-bar-flip") ? -1 : 1) * (n ? -1 : 1),
                            a = window.innerWidth - i.width();
                        l = {
                            x: window.pageXOffset,
                            y: window.pageYOffset
                        }, o.attr("mode", e.mode), t.addClass("uk-active"), i.css({
                            width: window.innerWidth - a,
                            height: window.innerHeight
                        }).addClass("uk-offcanvas-page"), "push" != e.mode && "reveal" != e.mode || i.css(n ? "margin-right" : "margin-left", (n ? -1 : 1) * (o.outerWidth() * s)), "reveal" == e.mode && o.css("clip", "rect(0, " + o.outerWidth() + "px, 100vh, 0)"), d.css("margin-top", -1 * l.y).width(), o.addClass("uk-offcanvas-bar-show"), this._initElement(t), o.trigger("show.uk.offcanvas", [t, o]), t.attr("aria-hidden", "false")
                    }
                },
                hide: function(t) {
                    function e() {
                        i.removeClass("uk-offcanvas-page").css({
                            width: "",
                            height: "",
                            marginLeft: "",
                            marginRight: ""
                        }), o.removeClass("uk-active"), s.removeClass("uk-offcanvas-bar-show"), d.css("margin-top", ""), window.scrollTo(l.x, l.y), s.trigger("hide.uk.offcanvas", [o, s]), o.attr("aria-hidden", "true")
                    }
                    var i = r.$("body"),
                        o = r.$(".uk-offcanvas.uk-active"),
                        n = "right" == r.langdirection,
                        s = o.find(".uk-offcanvas-bar:first");
                    o.length && ("none" == s.attr("mode") && (t = !0), r.support.transition && !t ? (i.one(r.support.transition.end, function() {
                        e()
                    }).css(n ? "margin-right" : "margin-left", ""), "reveal" == s.attr("mode") && s.css("clip", ""), setTimeout(function() {
                        s.removeClass("uk-offcanvas-bar-show")
                    }, 0)) : e())
                },
                _initElement: function(t) {
                    t.data("OffcanvasInit") || (t.on("click.uk.offcanvas swipeRight.uk.offcanvas swipeLeft.uk.offcanvas", function(t) {
                        var e = r.$(t.target);
                        if (t.type.match(/swipe/)) {
                            if (e.parents(".uk-offcanvas-bar:first").length) return
                        } else if (!e.hasClass("uk-offcanvas-close")) {
                            if (e.hasClass("uk-offcanvas-bar")) return;
                            if (e.parents(".uk-offcanvas-bar:first").length) return
                        }
                        t.stopImmediatePropagation(), n.hide()
                    }), t.on("click", 'a[href*="#"]', function(t) {
                        var i = r.$(this),
                            o = i.attr("href");
                        "#" != o && (r.$doc.one("hide.uk.offcanvas", function() {
                            var e;
                            try {
                                e = r.$(i[0].hash)
                            } catch (t) {
                                e = ""
                            }
                            e.length || (e = r.$('[name="' + i[0].hash.replace("#", "") + '"]')), e.length && r.Utils.scrollToElement ? r.Utils.scrollToElement(e, r.Utils.options(i.attr("data-uk-smooth-scroll") || "{}")) : window.location.href = o
                        }), n.hide())
                    }), t.data("OffcanvasInit", !0))
                }
            };
        r.component("offcanvasTrigger", {
            boot: function() {
                d.on("click.offcanvas.uikit", "[data-uk-offcanvas]", function(t) {
                    t.preventDefault();
                    var e = r.$(this);
                    if (!e.data("offcanvasTrigger")) {
                        r.offcanvasTrigger(e, r.Utils.options(e.attr("data-uk-offcanvas")));
                        e.trigger("click")
                    }
                }), d.on("keydown.uk.offcanvas", function(t) {
                    27 === t.keyCode && n.hide()
                })
            },
            init: function() {
                var e = this;
                this.options = r.$.extend({
                    target: !!e.element.is("a") && e.element.attr("href"),
                    mode: "push"
                }, this.options), this.on("click", function(t) {
                    t.preventDefault(), n.show(e.options.target, e.options)
                })
            }
        }), r.offcanvas = n
    }(UIkit2), function(r) {
        "use strict";
        var a;

        function l(t, e, i) {
            var o, n = r.$.Deferred(),
                s = t,
                a = t;
            return i[0] === e[0] ? n.resolve() : ("object" == typeof t && (s = t[0], a = t[1] || t[0]), r.$body.css("overflow-x", "hidden"), o = function() {
                e && e.hide().removeClass("uk-active " + a + " uk-animation-reverse"), i.addClass(s).one(r.support.animation.end, function() {
                    setTimeout(function() {
                        i.removeClass("" + s).css({
                            opacity: "",
                            display: ""
                        })
                    }, 0), n.resolve(), r.$body.css("overflow-x", ""), e && e.css({
                        opacity: "",
                        display: ""
                    })
                }.bind(this)).show()
            }, i.css("animation-duration", this.options.duration + "ms"), e && e.length ? (e.css("animation-duration", this.options.duration + "ms"), e.css("display", "none").addClass(a + " uk-animation-reverse").one(r.support.animation.end, function() {
                o()
            }.bind(this)).css("display", "")) : (i.addClass("uk-active"), o())), n.promise()
        }
        r.component("switcher", {
            defaults: {
                connect: !1,
                toggle: ">*",
                active: 0,
                animation: !1,
                duration: 200,
                swiping: !0
            },
            animating: !1,
            boot: function() {
                r.ready(function(t) {
                    r.$("[data-uk-switcher]", t).each(function() {
                        var t = r.$(this);
                        if (!t.data("switcher")) r.switcher(t, r.Utils.options(t.attr("data-uk-switcher")))
                    })
                })
            },
            init: function() {
                var i = this;
                this.on("click.uk.switcher", this.options.toggle, function(t) {
                    t.preventDefault(), i.show(this)
                }), this.options.connect && (this.connect = r.$(this.options.connect), this.connect.length && (this.connect.on("click.uk.switcher", "[data-uk-switcher-item]", function(t) {
                    t.preventDefault();
                    var e = r.$(this).attr("data-uk-switcher-item");
                    if (i.index != e) switch (e) {
                        case "next":
                        case "previous":
                            i.show(i.index + ("next" == e ? 1 : -1));
                            break;
                        default:
                            i.show(parseInt(e, 10))
                    }
                }), this.options.swiping && this.connect.on("swipeRight swipeLeft", function(t) {
                    t.preventDefault(), window.getSelection().toString() || i.show(i.index + ("swipeLeft" == t.type ? 1 : -1))
                }), this.update()))
            },
            update: function() {
                this.connect.children().removeClass("uk-active").attr("aria-hidden", "true");
                var t = this.find(this.options.toggle),
                    e = t.filter(".uk-active");
                if (e.length) this.show(e, !1);
                else {
                    if (!1 === this.options.active) return;
                    e = t.eq(this.options.active), this.show(e.length ? e : t.eq(0), !1)
                }
                t.not(e).attr("aria-expanded", "false"), e.attr("aria-expanded", "true")
            },
            show: function(t, e) {
                if (!this.animating) {
                    var i = this.find(this.options.toggle);
                    t = isNaN(t) ? r.$(t) : (t = t < 0 ? i.length - 1 : t, i.eq(i[t] ? t : 0));
                    var n = this,
                        o = r.$(t),
                        s = a[this.options.animation] || function(t, e) {
                            if (!n.options.animation) return a.none.apply(n);
                            var i = n.options.animation.split(",");
                            return 1 == i.length && (i[1] = i[0]), i[0] = i[0].trim(), i[1] = i[1].trim(), l.apply(n, [i, t, e])
                        };
                    !1 !== e && r.support.animation || (s = a.none), o.hasClass("uk-disabled") || (i.attr("aria-expanded", "false"), o.attr("aria-expanded", "true"), i.filter(".uk-active").removeClass("uk-active"), o.addClass("uk-active"), this.options.connect && this.connect.length && (this.index = this.find(this.options.toggle).index(o), -1 == this.index && (this.index = 0), this.connect.each(function() {
                        var t = r.$(this),
                            e = r.$(t.children()),
                            i = r.$(e.filter(".uk-active")),
                            o = r.$(e.eq(n.index));
                        n.animating = !0, s.apply(n, [i, o]).then(function() {
                            i.removeClass("uk-active"), o.addClass("uk-active"), i.attr("aria-hidden", "true"), o.attr("aria-hidden", "false"), r.Utils.checkDisplay(o, !0), n.animating = !1
                        })
                    })), this.trigger("show.uk.switcher", [o]))
                }
            }
        }), a = {
            none: function() {
                var t = r.$.Deferred();
                return t.resolve(), t.promise()
            },
            fade: function(t, e) {
                return l.apply(this, ["uk-animation-fade", t, e])
            },
            "slide-bottom": function(t, e) {
                return l.apply(this, ["uk-animation-slide-bottom", t, e])
            },
            "slide-top": function(t, e) {
                return l.apply(this, ["uk-animation-slide-top", t, e])
            },
            "slide-vertical": function(t, e, i) {
                var o = ["uk-animation-slide-top", "uk-animation-slide-bottom"];
                return t && t.index() > e.index() && o.reverse(), l.apply(this, [o, t, e])
            },
            "slide-left": function(t, e) {
                return l.apply(this, ["uk-animation-slide-left", t, e])
            },
            "slide-right": function(t, e) {
                return l.apply(this, ["uk-animation-slide-right", t, e])
            },
            "slide-horizontal": function(t, e, i) {
                var o = ["uk-animation-slide-right", "uk-animation-slide-left"];
                return t && t.index() > e.index() && o.reverse(), l.apply(this, [o, t, e])
            },
            scale: function(t, e) {
                return l.apply(this, ["uk-animation-scale-up", t, e])
            }
        }, r.switcher.animations = a
    }(UIkit2), function(a) {
        "use strict";
        a.component("tab", {
            defaults: {
                target: ">li:not(.uk-tab-responsive, .uk-disabled)",
                connect: !1,
                active: 0,
                animation: !1,
                duration: 200,
                swiping: !0
            },
            boot: function() {
                a.ready(function(t) {
                    a.$("[data-uk-tab]", t).each(function() {
                        var t = a.$(this);
                        if (!t.data("tab")) a.tab(t, a.Utils.options(t.attr("data-uk-tab")))
                    })
                })
            },
            init: function() {
                var i = this;
                this.current = !1, this.on("click.uk.tab", this.options.target, function(t) {
                    if (t.preventDefault(), !i.switcher || !i.switcher.animating) {
                        var e = i.find(i.options.target).not(this);
                        e.removeClass("uk-active").blur(), i.trigger("change.uk.tab", [a.$(this).addClass("uk-active"), i.current]), i.current = a.$(this), i.options.connect || (e.attr("aria-expanded", "false"), a.$(this).attr("aria-expanded", "true"))
                    }
                }), this.options.connect && (this.connect = a.$(this.options.connect)), this.responsivetab = a.$('<li class="uk-tab-responsive uk-active"><a></a></li>').append('<div class="uk-dropdown uk-dropdown-small"><ul class="uk-nav uk-nav-dropdown"></ul><div>'), this.responsivetab.dropdown = this.responsivetab.find(".uk-dropdown"), this.responsivetab.lst = this.responsivetab.dropdown.find("ul"), this.responsivetab.caption = this.responsivetab.find("a:first"), this.element.hasClass("uk-tab-bottom") && this.responsivetab.dropdown.addClass("uk-dropdown-up"), this.responsivetab.lst.on("click.uk.tab", "a", function(t) {
                    t.preventDefault(), t.stopPropagation();
                    var e = a.$(this);
                    i.element.children("li:not(.uk-tab-responsive)").eq(e.data("index")).trigger("click")
                }), this.on("show.uk.switcher change.uk.tab", function(t, e) {
                    i.responsivetab.caption.html(e.text())
                }), this.element.append(this.responsivetab), this.options.connect && (this.switcher = a.switcher(this.element, {
                    toggle: ">li:not(.uk-tab-responsive)",
                    connect: this.options.connect,
                    active: this.options.active,
                    animation: this.options.animation,
                    duration: this.options.duration,
                    swiping: this.options.swiping
                })), a.dropdown(this.responsivetab, {
                    mode: "click",
                    preventflip: "y"
                }), i.trigger("change.uk.tab", [this.element.find(this.options.target).not(".uk-tab-responsive").filter(".uk-active")]), this.check(), a.$win.on("resize orientationchange", a.Utils.debounce(function() {
                    i.element.is(":visible") && i.check()
                }, 100)), this.on("display.uk.check", function() {
                    i.element.is(":visible") && i.check()
                })
            },
            check: function() {
                var t = this.element.children("li:not(.uk-tab-responsive)").removeClass("uk-hidden");
                if (t.length) {
                    var e, i, o = t.eq(0).offset().top + Math.ceil(t.eq(0).height() / 2),
                        n = !1;
                    if (this.responsivetab.lst.empty(), t.each(function() {
                            a.$(this).offset().top > o && (n = !0)
                        }), n)
                        for (var s = 0; s < t.length; s++)(e = a.$(t.eq(s))).find("a"), "none" == e.css("float") || e.attr("uk-dropdown") || (e.hasClass("uk-disabled") || ((i = a.$(e[0].outerHTML)).find("a").data("index", s), this.responsivetab.lst.append(i)), e.addClass("uk-hidden"));
                    this.responsivetab[this.responsivetab.lst.children("li").length ? "removeClass" : "addClass"]("uk-hidden")
                } else this.responsivetab.addClass("uk-hidden")
            }
        })
    }(UIkit2), function(e) {
        "use strict";
        e.component("cover", {
            defaults: {
                automute: !0
            },
            boot: function() {
                e.ready(function(t) {
                    e.$("[data-uk-cover]", t).each(function() {
                        var t = e.$(this);
                        if (!t.data("cover")) e.cover(t, e.Utils.options(t.attr("data-uk-cover")))
                    })
                })
            },
            init: function() {
                if (this.parent = this.element.parent(), e.$win.on("load resize orientationchange", e.Utils.debounce(function() {
                        this.check()
                    }.bind(this), 100)), this.on("display.uk.check", function(t) {
                        this.element.is(":visible") && this.check()
                    }.bind(this)), this.check(), this.element.is("iframe") && this.options.automute) {
                    var t = this.element.attr("src");
                    this.element.attr("src", "").on("load", function() {
                        this.contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}', "*")
                    }).attr("src", [t, -1 < t.indexOf("?") ? "&" : "?", "enablejsapi=1&api=1"].join(""))
                }
            },
            check: function() {
                this.element.css({
                    width: "",
                    height: ""
                }), this.dimension = {
                    w: this.element.width(),
                    h: this.element.height()
                }, this.element.attr("width") && !isNaN(this.element.attr("width")) && (this.dimension.w = this.element.attr("width")), this.element.attr("height") && !isNaN(this.element.attr("height")) && (this.dimension.h = this.element.attr("height")), this.ratio = this.dimension.w / this.dimension.h;
                var t, e, i = this.parent.width(),
                    o = this.parent.height();
                e = i / this.ratio < o ? (t = Math.ceil(o * this.ratio), o) : (t = i, Math.ceil(i / this.ratio)), this.element.css({
                    width: t,
                    height: e
                })
            }
        })
    }(UIkit2), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-accordion", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(s) {
        "use strict";
        return s.component("accordion", {
            defaults: {
                showfirst: !0,
                collapse: !0,
                animate: !0,
                easing: "swing",
                duration: 300,
                toggle: ".uk-accordion-title",
                containers: ".uk-accordion-content",
                clsactive: "uk-active"
            },
            boot: function() {
                s.ready(function(t) {
                    setTimeout(function() {
                        s.$("[data-uk-accordion]", t).each(function() {
                            var t = s.$(this);
                            t.data("accordion") || s.accordion(t, s.Utils.options(t.attr("data-uk-accordion")))
                        })
                    }, 0)
                })
            },
            init: function() {
                var e = this;
                this.element.on("click.uk.accordion", this.options.toggle, function(t) {
                    t.preventDefault(), e.toggleItem(s.$(this).data("wrapper"), e.options.animate, e.options.collapse)
                }), this.update(!0), s.domObserve(this.element, function(t) {
                    e.element.children(e.options.containers).length && e.update()
                })
            },
            toggleItem: function(t, e, i) {
                var o = this;
                t.data("toggle").toggleClass(this.options.clsactive), t.data("content").toggleClass(this.options.clsactive);
                var n = t.data("toggle").hasClass(this.options.clsactive);
                i && (this.toggle.not(t.data("toggle")).removeClass(this.options.clsactive), this.content.not(t.data("content")).removeClass(this.options.clsactive).parent().stop().css("overflow", "hidden").animate({
                    height: 0
                }, {
                    easing: this.options.easing,
                    duration: e ? this.options.duration : 0
                }).attr("aria-expanded", "false")), t.stop().css("overflow", "hidden"), e ? t.animate({
                    height: n ? function(t) {
                        var e = s.$(t),
                            i = "auto";
                        if (e.is(":visible")) i = e.outerHeight();
                        else {
                            var o = {
                                position: e.css("position"),
                                visibility: e.css("visibility"),
                                display: e.css("display")
                            };
                            i = e.css({
                                position: "absolute",
                                visibility: "hidden",
                                display: "block"
                            }).outerHeight(), e.css(o)
                        }
                        return i
                    }(t.data("content")) : 0
                }, {
                    easing: this.options.easing,
                    duration: this.options.duration,
                    complete: function() {
                        n && (t.css({
                            overflow: "",
                            height: "auto"
                        }), s.Utils.checkDisplay(t.data("content"))), o.trigger("display.uk.check")
                    }
                }) : (t.height(n ? "auto" : 0), n && (t.css({
                    overflow: ""
                }), s.Utils.checkDisplay(t.data("content"))), this.trigger("display.uk.check")), t.attr("aria-expanded", n), this.element.trigger("toggle.uk.accordion", [n, t.data("toggle"), t.data("content")])
            },
            update: function(t) {
                var e, i, o, n = this;
                this.toggle = this.find(this.options.toggle), this.content = this.find(this.options.containers), this.content.each(function(t) {
                    (e = s.$(this)).parent().data("wrapper") ? i = e.parent() : (i = s.$(this).wrap('<div data-wrapper="true" style="overflow:hidden;height:0;position:relative;"></div>').parent()).attr("aria-expanded", "false"), o = n.toggle.eq(t), i.data("toggle", o), i.data("content", e), o.data("wrapper", i), e.data("wrapper", i)
                }), this.element.trigger("update.uk.accordion", [this]), t && this.options.showfirst && this.toggleItem(this.toggle.eq(0).data("wrapper"), !1, !1)
            }
        }), s.accordion
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-autocomplete", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(r) {
        "use strict";
        var e;
        return r.component("autocomplete", {
            defaults: {
                minLength: 3,
                param: "search",
                method: "post",
                delay: 300,
                loadingClass: "uk-loading",
                flipDropdown: !1,
                skipClass: "uk-skip",
                hoverClass: "uk-active",
                source: null,
                renderer: null,
                template: '<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">{{~items}}<li data-value="{{$item.value}}"><a>{{$item.value}}</a></li>{{/items}}</ul>'
            },
            visible: !1,
            value: null,
            selected: null,
            boot: function() {
                r.$html.on("focus.autocomplete.uikit", "[data-uk-autocomplete]", function(t) {
                    var e = r.$(this);
                    e.data("autocomplete") || r.autocomplete(e, r.Utils.options(e.attr("data-uk-autocomplete")))
                }), r.$html.on("click.autocomplete.uikit", function(t) {
                    e && t.target != e.input[0] && e.hide()
                })
            },
            init: function() {
                var e = this,
                    i = !1,
                    t = r.Utils.debounce(function(t) {
                        if (i) return i = !1;
                        e.handle()
                    }, this.options.delay);
                this.dropdown = this.find(".uk-dropdown"), this.template = this.find('script[type="text/autocomplete"]').html(), this.template = r.Utils.template(this.template || this.options.template), this.input = this.find("input:first").attr("autocomplete", "off"), this.dropdown.length || (this.dropdown = r.$('<div class="uk-dropdown"></div>').appendTo(this.element)), this.options.flipDropdown && this.dropdown.addClass("uk-dropdown-flip"), this.dropdown.attr("aria-expanded", "false"), this.input.on({
                    keydown: function(t) {
                        if (t && t.which && !t.shiftKey && e.visible) switch (t.which) {
                            case 13:
                                i = !0, e.selected && (t.preventDefault(), e.select());
                                break;
                            case 38:
                                t.preventDefault(), e.pick("prev", !0);
                                break;
                            case 40:
                                t.preventDefault(), e.pick("next", !0);
                                break;
                            case 27:
                            case 9:
                                e.hide()
                        }
                    },
                    keyup: t
                }), this.dropdown.on("click", ".uk-autocomplete-results > *", function() {
                    e.select()
                }), this.dropdown.on("mouseover", ".uk-autocomplete-results > *", function() {
                    e.pick(r.$(this))
                }), this.triggercomplete = t
            },
            handle: function() {
                var t = this.value;
                return this.value = this.input.val(), this.value.length < this.options.minLength ? this.hide() : (this.value != t && this.request(), this)
            },
            pick: function(t, e) {
                var i = r.$(this.dropdown.find(".uk-autocomplete-results").children(":not(." + this.options.skipClass + ")")),
                    o = !1;
                if ("string" == typeof t || t.hasClass(this.options.skipClass)) {
                    if ("next" == t || "prev" == t) {
                        if (this.selected) {
                            var n = i.index(this.selected);
                            o = "next" == t ? i.eq(n + 1 < i.length ? n + 1 : 0) : i.eq(n - 1 < 0 ? i.length - 1 : n - 1)
                        } else o = i["next" == t ? "first" : "last"]();
                        o = r.$(o)
                    }
                } else o = t;
                if (o && o.length && (this.selected = o, i.removeClass(this.options.hoverClass), this.selected.addClass(this.options.hoverClass), e)) {
                    var s = o.position().top,
                        a = this.dropdown.scrollTop();
                    (this.dropdown.height() < s || s < 0) && this.dropdown.scrollTop(a + s)
                }
            },
            select: function() {
                if (this.selected) {
                    var t = this.selected.data();
                    this.trigger("selectitem.uk.autocomplete", [t, this]), t.value && this.input.val(t.value).trigger("change"), this.hide()
                }
            },
            show: function() {
                if (!this.visible) return this.visible = !0, this.element.addClass("uk-open"), e && e !== this && e.hide(), (e = this).dropdown.attr("aria-expanded", "true"), this
            },
            hide: function() {
                if (this.visible) return this.visible = !1, this.element.removeClass("uk-open"), e === this && (e = !1), this.dropdown.attr("aria-expanded", "false"), this
            },
            request: function() {
                function e(t) {
                    t && i.render(t), i.element.removeClass(i.options.loadingClass)
                }
                var i = this;
                if (this.element.addClass(this.options.loadingClass), this.options.source) {
                    var t = this.options.source;
                    switch (typeof this.options.source) {
                        case "function":
                            this.options.source.apply(this, [e]);
                            break;
                        case "object":
                            if (t.length) {
                                var o = [];
                                t.forEach(function(t) {
                                    t.value && -1 != t.value.toLowerCase().indexOf(i.value.toLowerCase()) && o.push(t)
                                }), e(o)
                            }
                            break;
                        case "string":
                            var n = {};
                            n[this.options.param] = this.value, r.$.ajax({
                                url: this.options.source,
                                data: n,
                                type: this.options.method,
                                dataType: "json"
                            }).done(function(t) {
                                e(t || [])
                            });
                            break;
                        default:
                            e(null)
                    }
                } else this.element.removeClass(i.options.loadingClass)
            },
            render: function(t) {
                return this.dropdown.empty(), this.selected = !1, this.options.renderer ? this.options.renderer.apply(this, [t]) : t && t.length && (this.dropdown.append(this.template({
                    items: t
                })), this.show(), this.trigger("show.uk.autocomplete")), this
            }
        }), r.autocomplete
    }), function(t) {
        var e;
        window.UIkit && (e = t(UIkit)), "function" == typeof define && define.amd && define("uikit-datepicker", ["uikit"], function() {
            return e || t(UIkit)
        })
    }(function(c) {
        "use strict";
        var r, l = !1;
        return c.component("datepicker", {
            defaults: {
                mobile: !1,
                weekstart: 1,
                i18n: {
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                },
                format: "DD.MM.YYYY",
                offsettop: 5,
                maxDate: !1,
                minDate: !1,
                pos: "auto",
                addClass: "",
                template: function(t, e) {
                    var i, o = "";
                    if (o += '<div class="uk-datepicker-nav uk-clearfix">', o += '<a href="" class="uk-datepicker-previous"></a>', o += '<a href="" class="uk-datepicker-next"></a>', c.formSelect) {
                        var n, s, a, r = (new Date).getFullYear(),
                            l = [];
                        for (i = 0; i < e.i18n.months.length; i++) i == t.month ? l.push('<option value="' + i + '" selected>' + e.i18n.months[i] + "</option>") : l.push('<option value="' + i + '">' + e.i18n.months[i] + "</option>");
                        for (n = '<span class="uk-form-select">' + e.i18n.months[t.month] + '<select class="update-picker-month">' + l.join("") + "</select></span>", l = [], s = t.minDate ? t.minDate.year() : r - 50, a = t.maxDate ? t.maxDate.year() : r + 20, i = s; i <= a; i++) i == t.year ? l.push('<option value="' + i + '" selected>' + i + "</option>") : l.push('<option value="' + i + '">' + i + "</option>");
                        o += '<div class="uk-datepicker-heading">' + n + " " + ('<span class="uk-form-select">' + t.year + '<select class="update-picker-year">' + l.join("") + "</select></span>") + "</div>"
                    } else o += '<div class="uk-datepicker-heading">' + e.i18n.months[t.month] + " " + t.year + "</div>";
                    for (o += "</div>", o += '<table class="uk-datepicker-table">', o += "<thead>", i = 0; i < t.weekdays.length; i++) t.weekdays[i] && (o += "<th>" + t.weekdays[i] + "</th>");
                    for (o += "</thead>", o += "<tbody>", i = 0; i < t.days.length; i++)
                        if (t.days[i] && t.days[i].length) {
                            o += "<tr>";
                            for (var d = 0; d < t.days[i].length; d++)
                                if (t.days[i][d]) {
                                    var h = t.days[i][d],
                                        u = [];
                                    h.inmonth || u.push("uk-datepicker-table-muted"), h.selected && u.push("uk-active"), h.disabled && u.push("uk-datepicker-date-disabled uk-datepicker-table-muted"), o += '<td><a href="" class="' + u.join(" ") + '" data-date="' + h.day.format() + '">' + h.day.format("D") + "</a></td>"
                                } o += "</tr>"
                        } return o += "</tbody>", o += "</table>"
                }
            },
            boot: function() {
                c.$win.on("resize orientationchange", function() {
                    l && l.hide()
                }), c.$html.on("focus.datepicker.uikit", "[data-uk-datepicker]", function(t) {
                    var e = c.$(this);
                    e.data("datepicker") || (t.preventDefault(), c.datepicker(e, c.Utils.options(e.attr("data-uk-datepicker"))), e.trigger("focus"))
                }), c.$html.on("click focus", "*", function(t) {
                    var e = c.$(t.target);
                    !l || e[0] == r[0] || e.data("datepicker") || e.parents(".uk-datepicker:first").length || l.hide()
                })
            },
            init: function() {
                if (!c.support.touch || "date" != this.element.attr("type") || this.options.mobile) {
                    var t = this;
                    this.current = this.element.val() ? moment(this.element.val(), this.options.format) : moment(), this.on("click focus", function() {
                        l !== t && t.pick(this.value ? this.value : t.options.minDate ? t.options.minDate : "")
                    }).on("change", function() {
                        t.element.val() && !moment(t.element.val(), t.options.format).isValid() && t.element.val(moment().format(t.options.format))
                    }), r || ((r = c.$('<div class="uk-dropdown uk-datepicker ' + t.options.addClass + '"></div>')).on("click", ".uk-datepicker-next, .uk-datepicker-previous, [data-date]", function(t) {
                        t.stopPropagation(), t.preventDefault();
                        var e = c.$(this);
                        if (e.hasClass("uk-datepicker-date-disabled")) return !1;
                        e.is("[data-date]") ? (l.current = moment(e.data("date")), l.element.val(l.current.isValid() ? l.current.format(l.options.format) : null).trigger("change"), r.removeClass("uk-dropdown-shown"), setTimeout(function() {
                            r.removeClass("uk-dropdown-active")
                        }, 280), l.hide()) : l.add(e.hasClass("uk-datepicker-next") ? 1 : -1, "months")
                    }), r.on("change", ".update-picker-month, .update-picker-year", function() {
                        var t = c.$(this);
                        l[t.is(".update-picker-year") ? "setYear" : "setMonth"](Number(t.val()))
                    }), r.appendTo("body"))
                }
            },
            pick: function(t) {
                var e = this.element.offset(),
                    i = parseInt(e.left),
                    o = parseInt(e.top),
                    n = {
                        left: i,
                        right: ""
                    };
                this.current = isNaN(t) ? moment(t, this.options.format) : moment(), this.initdate = this.current.format("YYYY-MM-DD"), this.update(), !$(this.element[0]).closest(".ui-dialog").length && !$(this.element[0]).closest(".uk-modal").length || r.hasClass("dropdown-modal") || r.addClass("dropdown-modal"), ("right" == c.langdirection || window.innerWidth - i - r.outerWidth() < 0) && (n.right = window.innerWidth - (window.innerWidth - $("body").width()) - (n.left + this.element.outerWidth()), n.left = "");
                var s = o - this.element.outerHeight() + this.element.height() - this.options.offsettop - r.outerHeight(),
                    a = o + this.element.outerHeight() + this.options.offsettop;
                n.top = a, ("top" == this.options.pos || "auto" == this.options.pos && window.innerHeight - a - r.outerHeight() + c.$win.scrollTop() < 0 && 0 <= s) && (n.top = s, r.addClass("dp-top")), n.minWidth = r.actual("outerWidth"), r.css(n).addClass("uk-dropdown-active uk-dropdown-shown"), this.trigger("show.uk.datepicker"), l = this
            },
            add: function(t, e) {
                this.current.add(t, e), this.update()
            },
            setMonth: function(t) {
                this.current.month(t), this.update()
            },
            setYear: function(t) {
                this.current.year(t), this.update()
            },
            update: function() {
                var t = this.getRows(this.current.year(), this.current.month()),
                    e = this.options.template(t, this.options);
                r.html(e), this.trigger("update.uk.datepicker")
            },
            getRows: function(t, e) {
                var o = this.options,
                    i = moment().format("YYYY-MM-DD"),
                    n = [31, t % 4 == 0 && t % 100 != 0 || t % 400 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e],
                    s = new Date(t, e, 1, 12).getDay(),
                    a = {
                        month: e,
                        year: t,
                        weekdays: [],
                        days: [],
                        maxDate: !1,
                        minDate: !1
                    },
                    r = [];
                !1 !== o.maxDate && (a.maxDate = isNaN(o.maxDate) ? moment(o.maxDate, o.format).startOf("day").hours(12) : moment().add(o.maxDate, "days").startOf("day").hours(12)), !1 !== o.minDate && (a.minDate = isNaN(o.minDate) ? moment(o.minDate, o.format).startOf("day").hours(12) : moment().add(o.minDate - 1, "days").startOf("day").hours(12)), a.weekdays = function() {
                    for (var t = 0, e = []; t < 7; t++) {
                        for (var i = t + (o.weekstart || 0); 7 <= i;) i -= 7;
                        e.push(o.i18n.weekdays[i])
                    }
                    return e
                }(), o.weekstart && 0 < o.weekstart && (s -= o.weekstart) < 0 && (s += 7);
                for (var l, d, h, u, c, p = n + s, f = p; 7 < f;) f -= 7;
                p += 7 - f;
                for (var m = 0, g = 0; m < p; m++) l = new Date(t, e, m - s + 1, 12), d = a.minDate && a.minDate > l || a.maxDate && l > a.maxDate, c = !(m < s || n + s <= m), l = moment(l), h = this.initdate == l.format("YYYY-MM-DD"), u = i == l.format("YYYY-MM-DD"), r.push({
                    selected: h,
                    today: u,
                    disabled: d,
                    day: l,
                    inmonth: c
                }), 7 == ++g && (a.days.push(r), r = [], g = 0);
                return a
            },
            hide: function() {
                l && l === this && (r.removeClass("uk-dropdown-shown"), setTimeout(function() {
                    r.removeClass("uk-dropdown-active dp-top")
                }, 280), l = !1, this.trigger("hide.uk.datepicker"))
            }
        }), c.Utils.moment = moment(), c.datepicker
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-form-password", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(i) {
        "use strict";
        return i.component("formPassword", {
            defaults: {
                lblShow: "<i class='material-icons'>visibility</i>",
                lblHide: "<i class='material-icons'>visibility_off</i>"
            },
            boot: function() {
                i.$html.on("click.formpassword.uikit", "[data-uk-form-password]", function(t) {
                    var e = i.$(this);
                    e.data("formPassword") || (t.preventDefault(), i.formPassword(e, i.Utils.options(e.attr("data-uk-form-password"))), e.trigger("click"))
                })
            },
            init: function() {
                var i = this;
                this.on("click", function(t) {
                    if (t.preventDefault(), i.input.length) {
                        var e = i.input.attr("type");
                        i.input.attr("type", "text" == e ? "password" : "text"), i.element.html(i.options["text" == e ? "lblShow" : "lblHide"])
                    }
                }), this.input = this.element.next("input").length ? this.element.next("input") : this.element.prev("input"), this.element.html(this.options[this.input.is('[type="password"]') ? "lblShow" : "lblHide"]), this.element.data("formPassword", this)
            }
        }), i.formPassword
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-form-select", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(e) {
        "use strict";
        return e.component("formSelect", {
            defaults: {
                target: ">span:first",
                activeClass: "uk-active"
            },
            boot: function() {
                e.ready(function(t) {
                    e.$("[data-uk-form-select]", t).each(function() {
                        var t = e.$(this);
                        t.data("formSelect") || e.formSelect(t, e.Utils.options(t.attr("data-uk-form-select")))
                    })
                })
            },
            init: function() {
                var t, e, i = this;
                this.target = this.find(this.options.target), this.select = this.find("select"), this.select.on({
                    change: (t = i.select[0], (e = function() {
                        try {
                            "input" === i.options.target ? i.target.val(t.options[t.selectedIndex].text) : i.target.text(t.options[t.selectedIndex].text)
                        } catch (t) {}
                        return i.element[i.select.val() ? "addClass" : "removeClass"](i.options.activeClass), e
                    })()),
                    focus: function() {
                        i.target.addClass("uk-focus")
                    },
                    blur: function() {
                        i.target.removeClass("uk-focus")
                    },
                    mouseenter: function() {
                        i.target.addClass("uk-hover")
                    },
                    mouseleave: function() {
                        i.target.removeClass("uk-hover")
                    }
                }), this.element.data("formSelect", this)
            }
        }), e.formSelect
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-grid", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(w) {
        "use strict";
        w.component("grid", {
            defaults: {
                colwidth: "auto",
                animation: !0,
                duration: 300,
                gutter: 0,
                controls: !1,
                filter: !1,
                origin: w.langdirection
            },
            boot: function() {
                w.ready(function(t) {
                    w.$("[data-uk-grid]", t).each(function() {
                        var t = w.$(this);
                        t.data("grid") || w.grid(t, w.Utils.options(t.attr("data-uk-grid")))
                    })
                })
            },
            init: function() {
                var i = this,
                    t = String(this.options.gutter).trim().split(" ");
                this.gutterv = parseInt(t[0], 10), this.gutterh = parseInt(t[1] || t[0], 10), this.element.css({
                    position: "relative"
                }), this.controls = null, this.origin = this.options.origin, this.options.controls && (this.controls = w.$(this.options.controls), this.controls.on("click", "[data-uk-filter]", function(t) {
                    t.preventDefault(), i.filter(w.$(this).attr("data-uk-filter"))
                }), this.controls.on("click", "[data-uk-sort]", function(t) {
                    t.preventDefault();
                    var e = w.$(this).attr("data-uk-sort").split(":");
                    i.sort(e[0], e[1])
                })), w.$win.on("load resize orientationchange", w.Utils.debounce(function() {
                    i.currentfilter ? i.filter(i.currentfilter) : this.update()
                }.bind(this), 100)), this.on("display.uk.check", function() {
                    i.element.is(":visible") && i.update()
                }), w.domObserve(this.element, function(t) {
                    i.update()
                }), !1 !== this.options.filter ? this.filter(this.options.filter) : this.update()
            },
            _prepareElements: function() {
                var t, e = this.element.children().not("[data-grid-prepared]");
                e.length && (t = {
                    position: "absolute",
                    boxSizing: "border-box",
                    width: "auto" == this.options.colwidth ? "" : this.options.colwidth
                }, this.options.gutter && (t["padding-" + this.origin] = this.gutterh, t["padding-bottom"] = this.gutterv, this.element.css("margin-" + this.origin, -1 * this.gutterh)), e.attr("data-grid-prepared", "true").css(t))
            },
            update: function(t) {
                var e = this;
                this._prepareElements();
                var i, o, n, s, a, r, l, d, h, u = t = t || this.element.children(":visible"),
                    c = this.element.width() + 2 * this.gutterh + 2,
                    p = 0,
                    f = 0,
                    m = [];
                this.trigger("beforeupdate.uk.grid", [u]), u.each(function(t) {
                    for (i = w.$(this), h = this.getBoundingClientRect(), o = h.width, n = h.height, r = f = p = 0, d = m.length; r < d; r++) s = m[r], p <= s.aX && (p = s.aX), c < p + o && (p = 0), f <= s.aY && (f = s.aY);
                    (a = {
                        ele: i,
                        top: f,
                        width: o,
                        height: n,
                        aY: f + n,
                        aX: p + o
                    })[e.origin] = p, m.push(a)
                });
                var g, v, k = 0;
                for (r = 0, d = m.length; r < d; r++) {
                    for (s = m[r], l = f = 0; l < r; l++) g = m[l], s[this.origin] < g.aX && g[this.origin] + 1 < s.aX && (f = g.aY);
                    s.top = f, s.aY = f + s.height, k = Math.max(k, s.aY)
                }
                k -= this.gutterv, this.options.animation ? (this.element.stop().animate({
                    height: k
                }, 100), m.forEach(function(t) {
                    (v = {
                        top: t.top,
                        opacity: 1
                    })[e.origin] = t[e.origin], t.ele.stop().animate(v, this.options.duration)
                }.bind(this))) : (this.element.css("height", k), m.forEach(function(t) {
                    (v = {
                        top: t.top,
                        opacity: 1
                    })[e.origin] = t[e.origin], t.ele.css(v)
                }.bind(this))), setTimeout(function() {
                    w.$doc.trigger("scrolling.uk.document")
                }, 2 * this.options.duration * (this.options.animation ? 1 : 0)), this.trigger("afterupdate.uk.grid", [u])
            },
            filter: function(n) {
                "number" == typeof(n = (this.currentfilter = n) || []) && (n = n.toString()), "string" == typeof n && (n = n.split(/,/).map(function(t) {
                    return t.trim()
                }));
                var t = this.element.children(),
                    s = {
                        visible: [],
                        hidden: []
                    };
                t.each(function(t) {
                    var e = w.$(this),
                        i = e.attr("data-uk-filter"),
                        o = !n.length;
                    i && (i = i.split(/,/).map(function(t) {
                        return t.trim()
                    }), n.forEach(function(t) {
                        -1 < i.indexOf(t) && (o = !0)
                    })), s[o ? "visible" : "hidden"].push(e)
                }), s.hidden = w.$(s.hidden).map(function() {
                    return this[0]
                }), s.visible = w.$(s.visible).map(function() {
                    return this[0]
                }), s.hidden.attr("aria-hidden", "true").filter(":visible").fadeOut(this.options.duration), s.visible.attr("aria-hidden", "false").filter(":hidden").css("opacity", 0).show(), this.update(s.visible), this.controls && this.controls.length && this.controls.find("[data-uk-filter]").removeClass("uk-active").filter('[data-uk-filter="' + n + '"]').addClass("uk-active")
            },
            sort: function(i, o) {
                "string" == typeof(o = o || 1) && (o = "desc" == o.toLowerCase() ? -1 : 1);
                var t = this.element.children();
                t.sort(function(t, e) {
                    return t = w.$(t), ((e = w.$(e)).data(i) || "") < (t.data(i) || "") ? o : -1 * o
                }).appendTo(this.element), this.update(t.filter(":visible")), this.controls && this.controls.length && this.controls.find("[data-uk-sort]").removeClass("uk-active").filter('[data-uk-sort="' + i + ":" + (-1 == o ? "desc" : "asc") + '"]').addClass("uk-active")
            }
        })
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-lightbox", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(p) {
        "use strict";
        var d, h = {};
        return p.component("lightbox", {
            defaults: {
                allowfullscreen: !0,
                duration: 400,
                group: !1,
                keyboard: !0
            },
            index: 0,
            items: !1,
            boot: function() {
                p.$html.on("click", "[data-uk-lightbox]", function(t) {
                    t.preventDefault();
                    var e = p.$(this);
                    e.data("lightbox") || p.lightbox(e, p.Utils.options(e.attr("data-uk-lightbox"))), e.data("lightbox").show(e)
                }), p.$doc.on("keyup", function(t) {
                    if (d && d.is(":visible") && d.lightbox.options.keyboard) switch (t.preventDefault(), t.keyCode) {
                        case 37:
                            d.lightbox.previous();
                            break;
                        case 39:
                            d.lightbox.next()
                    }
                })
            },
            init: function() {
                var e = [];
                if (this.index = 0, this.siblings = [], this.element && this.element.length) {
                    var t = this.options.group ? p.$('[data-uk-lightbox*="' + this.options.group + '"]') : this.element;
                    t.each(function() {
                        var t = p.$(this);
                        e.push({
                            source: t.attr("href"),
                            title: t.attr("data-title") || t.attr("title"),
                            type: t.attr("data-lightbox-type") || "auto",
                            link: t
                        })
                    }), this.index = t.index(this.element), this.siblings = e
                } else this.options.group && this.options.group.length && (this.siblings = this.options.group);
                this.trigger("lightbox-init", [this])
            },
            show: function(i) {
                this.modal = function(t) {
                    if (d) return d.lightbox = t, d;
                    (d = p.$(['<div class="uk-modal">', '<div class="uk-modal-dialog uk-modal-dialog-lightbox uk-slidenav-position" style="margin-left:auto;margin-right:auto;width:200px;height:200px;top:' + Math.abs(window.innerHeight / 2 - 200) + 'px;">', '<a href="#" class="uk-modal-close uk-close uk-close-alt"></a>', '<div class="uk-lightbox-content"></div>', '<div class="uk-modal-spinner uk-hidden"></div>', "</div>", "</div>"].join("")).appendTo("body")).dialog = d.find(".uk-modal-dialog:first"), d.content = d.find(".uk-lightbox-content:first"), d.loader = d.find(".uk-modal-spinner:first"), d.closer = d.find(".uk-close.uk-close-alt"), d.modal = p.modal(d, {
                        modal: !1
                    }), d.on("swipeRight swipeLeft", function(t) {
                        d.lightbox["swipeLeft" == t.type ? "next" : "previous"]()
                    }).on("click", "[data-lightbox-previous], [data-lightbox-next]", function(t) {
                        t.preventDefault(), d.lightbox[p.$(this).is("[data-lightbox-next]") ? "next" : "previous"]()
                    }), d.on("hide.uk.modal", function(t) {
                        d.content.html("")
                    });
                    var e = {
                        w: window.innerWidth,
                        h: window.innerHeight
                    };
                    return p.$win.on("load resize orientationchange", p.Utils.debounce(function(t) {
                        e.w !== window.innerWidth && d.is(":visible") && !p.Utils.isFullscreen() && d.lightbox.fitSize(), e = {
                            w: window.innerWidth,
                            h: window.innerHeight
                        }
                    }, 100)), d.lightbox = t, d
                }(this), this.modal.dialog.stop(), this.modal.content.stop();
                var t, e, o = this,
                    n = p.$.Deferred();
                "object" == typeof(i = i || 0) && this.siblings.forEach(function(t, e) {
                    i[0] === t.link[0] && (i = e)
                }), i < 0 ? i = this.siblings.length - i : this.siblings[i] || (i = 0), e = this.siblings[i], t = {
                    lightbox: o,
                    source: e.source,
                    type: e.type,
                    index: i,
                    promise: n,
                    title: e.title,
                    item: e,
                    meta: {
                        content: "",
                        width: null,
                        height: null
                    }
                }, this.index = i, this.modal.content.empty(), this.modal.is(":visible") || (this.modal.content.css({
                    width: "",
                    height: ""
                }).empty(), this.modal.modal.show()), this.modal.loader.removeClass("uk-hidden"), n.promise().done(function() {
                    o.data = t, o.fitSize(t)
                }).fail(function() {
                    t.meta.content = '<div class="uk-position-cover uk-flex uk-flex-middle uk-flex-center"><strong>Loading resource failed!</strong></div>', t.meta.width = 400, t.meta.height = 300, o.data = t, o.fitSize(t)
                }), o.trigger("showitem.uk.lightbox", [t])
            },
            fitSize: function() {
                var t = this,
                    e = this.data,
                    i = this.modal.dialog.outerWidth() - this.modal.dialog.width(),
                    o = parseInt(this.modal.dialog.css("margin-top"), 10) + parseInt(this.modal.dialog.css("margin-bottom"), 10),
                    n = e.meta.content,
                    s = t.options.duration;
                1 < this.siblings.length && (n = [n, '<a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-previous uk-hidden-touch" data-lightbox-previous></a>', '<a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-next uk-hidden-touch" data-lightbox-next></a>'].join(""));
                var a, r, l = p.$("<div>&nbsp;</div>").css({
                        opacity: 0,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        maxWidth: t.modal.dialog.css("max-width"),
                        padding: t.modal.dialog.css("padding"),
                        margin: t.modal.dialog.css("margin")
                    }),
                    d = e.meta.width,
                    h = e.meta.height;
                l.appendTo("body").width(), a = l.width(), r = window.innerHeight - o, l.remove(), this.modal.dialog.find(".uk-modal-caption").remove(), e.title && (this.modal.dialog.append('<div class="uk-modal-caption">' + e.title + "</div>"), r -= this.modal.dialog.find(".uk-modal-caption").outerHeight()), a < e.meta.width && (h = Math.floor(h * (a / d)), d = a), r < h && (h = Math.floor(r), d = Math.ceil(e.meta.width * (r / e.meta.height))), this.modal.content.css("opacity", 0).width(d).html(n), "iframe" == e.type && this.modal.content.find("iframe:first").height(h);
                var u = h + i,
                    c = Math.floor(window.innerHeight / 2 - u / 2) - o;
                c < 0 && (c = 0), this.modal.closer.addClass("uk-hidden"), t.modal.data("mwidth") == d && t.modal.data("mheight") == h && (s = 0), this.modal.dialog.animate({
                    width: d + i,
                    height: h + i,
                    top: c
                }, s, "swing", function() {
                    t.modal.loader.addClass("uk-hidden"), t.modal.content.css({
                        width: ""
                    }).animate({
                        opacity: 1
                    }, function() {
                        t.modal.closer.removeClass("uk-hidden")
                    }), t.modal.data({
                        mwidth: d,
                        mheight: h
                    })
                })
            },
            next: function() {
                this.show(this.siblings[this.index + 1] ? this.index + 1 : 0)
            },
            previous: function() {
                this.show(this.siblings[this.index - 1] ? this.index - 1 : this.siblings.length - 1)
            }
        }), p.plugin("lightbox", "image", {
            init: function(t) {
                t.on("showitem.uk.lightbox", function(t, o) {
                    if ("image" == o.type || o.source && o.source.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
                        var e = function(t, e, i) {
                            o.meta = {
                                content: '<img class="uk-responsive-width" width="' + e + '" height="' + i + '" src ="' + t + '">',
                                width: e,
                                height: i
                            }, o.type = "image", o.promise.resolve()
                        };
                        if (h[o.source]) e(o.source, h[o.source].width, h[o.source].height);
                        else {
                            var i = new Image;
                            i.onerror = function() {
                                o.promise.reject("Loading image failed")
                            }, i.onload = function() {
                                h[o.source] = {
                                    width: i.width,
                                    height: i.height
                                }, e(o.source, h[o.source].width, h[o.source].height)
                            }, i.src = o.source
                        }
                    }
                })
            }
        }), p.plugin("lightbox", "youtube", {
            init: function(t) {
                var r = /(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)&?(.*)/,
                    l = /youtu\.be\/(.*)/;
                t.on("showitem.uk.lightbox", function(t, o) {
                    function e(t, e, i) {
                        o.meta = {
                            content: '<iframe src="//www.youtube.com/embed/' + t + '" width="' + e + '" height="' + i + '" style="max-width:100%;"' + (d.lightbox.options.allowfullscreen ? " allowfullscreen" : "") + "></iframe>",
                            width: e,
                            height: i
                        }, o.type = "iframe", o.promise.resolve()
                    }
                    var i, n;
                    if ((n = o.source.match(r)) && (i = n[2]), (n = o.source.match(l)) && (i = n[1]), i) {
                        if (h[i]) e(i, h[i].width, h[i].height);
                        else {
                            var s = new Image,
                                a = !1;
                            s.onerror = function() {
                                h[i] = {
                                    width: 640,
                                    height: 320
                                }, e(i, h[i].width, h[i].height)
                            }, s.onload = function() {
                                120 == s.width && 90 == s.height ? a ? (h[i] = {
                                    width: 640,
                                    height: 320
                                }, e(i, h[i].width, h[i].height)) : (a = !0, s.src = "//img.youtube.com/vi/" + i + "/0.jpg") : (h[i] = {
                                    width: s.width,
                                    height: s.height
                                }, e(i, s.width, s.height))
                            }, s.src = "//img.youtube.com/vi/" + i + "/maxresdefault.jpg"
                        }
                        t.stopImmediatePropagation()
                    }
                })
            }
        }), p.plugin("lightbox", "vimeo", {
            init: function(t) {
                var n, s = /(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/;
                t.on("showitem.uk.lightbox", function(t, o) {
                    function e(t, e, i) {
                        o.meta = {
                            content: '<iframe src="//player.vimeo.com/video/' + t + '" width="' + e + '" height="' + i + '" style="width:100%;box-sizing:border-box;"' + (d.lightbox.options.allowfullscreen ? " allowfullscreen" : "") + "></iframe>",
                            width: e,
                            height: i
                        }, o.type = "iframe", o.promise.resolve()
                    }
                    var i;
                    (n = o.source.match(s)) && (i = n[2], h[i] ? e(i, h[i].width, h[i].height) : p.$.ajax({
                        type: "GET",
                        url: "//vimeo.com/api/oembed.json?url=" + encodeURI(o.source),
                        jsonp: "callback",
                        dataType: "jsonp",
                        success: function(t) {
                            h[i] = {
                                width: t.width,
                                height: t.height
                            }, e(i, h[i].width, h[i].height)
                        }
                    }), t.stopImmediatePropagation())
                })
            }
        }), p.plugin("lightbox", "video", {
            init: function(t) {
                t.on("showitem.uk.lightbox", function(t, o) {
                    function e(t, e, i) {
                        o.meta = {
                            content: '<video class="uk-responsive-width" src="' + t + '" width="' + e + '" height="' + i + '" controls></video>',
                            width: e,
                            height: i
                        }, o.type = "video", o.promise.resolve()
                    }
                    if ("video" == o.type || o.source.match(/\.(mp4|webm|ogv)$/i))
                        if (h[o.source]) e(o.source, h[o.source].width, h[o.source].height);
                        else var i = p.$('<video style="position:fixed;visibility:hidden;top:-10000px;"></video>').attr("src", o.source).appendTo("body"),
                            n = setInterval(function() {
                                i[0].videoWidth && (clearInterval(n), h[o.source] = {
                                    width: i[0].videoWidth,
                                    height: i[0].videoHeight
                                }, e(o.source, h[o.source].width, h[o.source].height), i.remove())
                            }, 20)
                })
            }
        }), p.plugin("lightbox", "iframe", {
            init: function(s) {
                s.on("showitem.uk.lightbox", function(t, e) {
                    var i, o, n;
                    "iframe" !== e.type && !e.source.match(/\.(html|php)$/) || (i = e.source, o = s.options.width || 800, n = s.options.height || 600, e.meta = {
                        content: '<iframe class="uk-responsive-width" src="' + i + '" width="' + o + '" height="' + n + '"' + (d.lightbox.options.allowfullscreen ? " allowfullscreen" : "") + "></iframe>",
                        width: o,
                        height: n
                    }, e.type = "iframe", e.promise.resolve())
                })
            }
        }), p.lightbox.create = function(t, e) {
            if (t) {
                var i = [];
                return t.forEach(function(t) {
                    i.push(p.$.extend({
                        source: "",
                        title: "",
                        type: "auto",
                        link: !1
                    }, "string" == typeof t ? {
                        source: t
                    } : t))
                }), p.lightbox(p.$.extend({}, e, {
                    group: i
                }))
            }
        }, p.lightbox
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-nestable", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(k) {
        "use strict";
        var r, s = "ontouchstart" in window || "MSGesture" in window || window.PointerEvent,
            l = k.$html,
            w = [],
            o = k.$win,
            a = s ? "MSGesture" in window || window.PointerEvent ? "pointerdown" : "touchstart" : "mousedown",
            d = s ? "MSGesture" in window || window.PointerEvent ? "pointermove" : "touchmove" : "mousemove",
            h = s ? "MSGesture" in window || window.PointerEvent ? "pointerup" : "touchend" : "mouseup",
            u = s ? "MSGesture" in window || window.PointerEvent ? "pointercancel" : "touchcancel" : "mouseup";
        return k.component("nestable", {
            defaults: {
                listBaseClass: "uk-nestable",
                listClass: "uk-nestable-list",
                listItemClass: "uk-nestable-item",
                dragClass: "uk-nestable-dragged",
                movingClass: "uk-nestable-moving",
                noChildrenClass: "uk-nestable-nochildren",
                emptyClass: "uk-nestable-empty",
                handleClass: "",
                collapsedClass: "uk-collapsed",
                placeholderClass: "uk-nestable-placeholder",
                noDragClass: "uk-nestable-nodrag",
                group: !1,
                maxDepth: 10,
                threshold: 20,
                idlethreshold: 10
            },
            boot: function() {
                k.$html.on("mousemove touchmove", function(t) {
                    if (r) {
                        var e = r.offset().top;
                        e < k.$win.scrollTop() ? k.$win.scrollTop(k.$win.scrollTop() - Math.ceil(r.height() / 2)) : e + r.height() > window.innerHeight + k.$win.scrollTop() && k.$win.scrollTop(k.$win.scrollTop() + Math.ceil(r.height() / 2))
                    }
                }), k.ready(function(t) {
                    k.$("[data-uk-nestable]", t).each(function() {
                        var t = k.$(this);
                        t.data("nestable") || k.nestable(t, k.Utils.options(t.attr("data-uk-nestable")))
                    })
                })
            },
            init: function() {
                var n = this;
                Object.keys(this.options).forEach(function(t) {
                    -1 != String(t).indexOf("Class") && (n.options["_" + t] = "." + n.options[t])
                }), this.find(this.options._listItemClass).find(">ul").addClass(this.options.listClass), this.checkEmptyList(), this.reset(), this.element.data("nestable-group", this.options.group || k.Utils.uid("nestable-group")), this.find(this.options._listItemClass).each(function() {
                    n.setParent(k.$(this))
                }), this.on("click", "[data-nestable-action]", function(t) {
                    if (!n.dragEl && (s || 0 === t.button)) {
                        t.preventDefault();
                        var e = k.$(t.currentTarget),
                            i = e.data("nestableAction"),
                            o = e.closest(n.options._listItemClass);
                        "collapse" === i && n.collapseItem(o), "expand" === i && n.expandItem(o), "toggle" === i && n.toggleItem(o)
                    }
                });

                function t(e) {
                    var t = k.$(e.target),
                        i = t.is("a[href]") ? t : t.parents("a[href]");
                    e.target !== n.element[0] && (t.is(n.options._noDragClass) || t.closest(n.options._noDragClass).length || t.is("[data-nestable-action]") || t.closest("[data-nestable-action]").length || (n.options.handleClass && !t.hasClass(n.options.handleClass) && n.options.handleClass && (t = t.closest(n.options._handleClass)), !t.length || n.dragEl || !s && 0 !== e.button || s && e.touches && 1 !== e.touches.length || (e.originalEvent && e.originalEvent.touches && (e = evt.originalEvent.touches[0]), n.delayMove = function(t) {
                        i = !1, t.preventDefault(), n.dragStart(e), n.trigger("start.uk.nestable", [n]), n.delayMove = !1
                    }, n.delayMove.x = parseInt(e.pageX, 10), n.delayMove.y = parseInt(e.pageY, 10), n.delayMove.threshold = n.options.idlethreshold, i.length && "touchend" == h && n.one(h, function() {
                        i && i.attr("href").trim() && (location.href = i.attr("href"))
                    }), e.preventDefault())))
                }

                function e(t) {
                    t.originalEvent && t.originalEvent.touches && (t = t.originalEvent.touches[0]), n.delayMove && (Math.abs(t.pageX - n.delayMove.x) > n.delayMove.threshold || Math.abs(t.pageY - n.delayMove.y) > n.delayMove.threshold) && (window.getSelection().toString() ? n.delayMove = !1 : n.delayMove(t)), n.dragEl && (t.preventDefault(), n.dragMove(t), n.trigger("move.uk.nestable", [n]))
                }

                function i(t) {
                    n.dragEl && (t.preventDefault(), n.dragStop(s && t.touches ? t.touches[0] : t)), r = !1, n.delayMove = !1
                }
                s ? (this.element[0].addEventListener(a, t, !1), window.addEventListener(d, e, !1), window.addEventListener(h, i, !1), window.addEventListener(u, i, !1)) : (this.on(a, t), o.on(d, e), o.on(h, i))
            },
            serialize: function() {
                var d = this,
                    h = function(t, r) {
                        var l = [];
                        return t.children(d.options._listItemClass).each(function() {
                            for (var t, e, i, o = k.$(this), n = {}, s = o.children(d.options._listClass), a = 0; a < o[0].attributes.length; a++) 0 === (t = o[0].attributes[a]).name.indexOf("data-") && (e = t.name.substr(5), i = k.Utils.str2json(t.value), n[e] = i || "false" == t.value || "0" == t.value ? i : t.value);
                            s.length && (n.children = h(s, r + 1)), l.push(n)
                        }), l
                    };
                return h(d.element, 0)
            },
            list: function(a) {
                var r = [],
                    l = function(t, n, s) {
                        t.children(a._listItemClass).each(function(t) {
                            var e = k.$(this),
                                i = k.$.extend({
                                    parent_id: s || null,
                                    depth: n,
                                    order: t
                                }, e.data()),
                                o = e.children(a._listClass);
                            r.push(i), o.length && l(o, n + 1, e.data(a.idProperty || "id"))
                        })
                    };
                return a = k.$.extend({}, this.options, a), l(this.element, 0), r
            },
            reset: function() {
                this.mouse = {
                    offsetX: 0,
                    offsetY: 0,
                    startX: 0,
                    startY: 0,
                    lastX: 0,
                    lastY: 0,
                    nowX: 0,
                    nowY: 0,
                    distX: 0,
                    distY: 0,
                    dirAx: 0,
                    dirX: 0,
                    dirY: 0,
                    lastDirX: 0,
                    lastDirY: 0,
                    distAxX: 0,
                    distAxY: 0
                }, this.moving = !1, this.dragEl = null, this.dragRootEl = null, this.dragDepth = 0, this.hasNewRoot = !1, this.pointEl = null;
                for (var t = 0; t < w.length; t++) this.checkEmptyList(w[t]);
                w = []
            },
            toggleItem: function(t) {
                this[t.hasClass(this.options.collapsedClass) ? "expandItem" : "collapseItem"](t)
            },
            expandItem: function(t) {
                t.removeClass(this.options.collapsedClass)
            },
            collapseItem: function(t) {
                t.children(this.options._listClass).length && t.addClass(this.options.collapsedClass)
            },
            expandAll: function() {
                var t = this;
                this.find(t.options._listItemClass).each(function() {
                    t.expandItem(k.$(this))
                })
            },
            collapseAll: function() {
                var t = this;
                this.find(t.options._listItemClass).each(function() {
                    t.collapseItem(k.$(this))
                })
            },
            setParent: function(t) {
                t.children(this.options._listClass).length && t.addClass("uk-parent")
            },
            unsetParent: function(t) {
                t.removeClass("uk-parent " + this.options.collapsedClass), t.children(this.options._listClass).remove()
            },
            dragStart: function(t) {
                var e = this.mouse,
                    i = k.$(t.target).closest(this.options._listItemClass),
                    o = i.offset();
                this.placeEl = i, e.offsetX = t.pageX - o.left, e.offsetY = t.pageY - o.top, e.startX = e.lastX = o.left, e.startY = e.lastY = o.top, this.dragRootEl = this.element, this.dragEl = k.$("<ul></ul>").addClass(this.options.listClass + " " + this.options.dragClass).append(i.clone()), this.dragEl.css("width", i.width()), this.placeEl.addClass(this.options.placeholderClass), r = this.dragEl, this.tmpDragOnSiblings = [i[0].previousSibling, i[0].nextSibling], k.$body.append(this.dragEl), this.dragEl.css({
                    left: o.left,
                    top: o.top
                });
                var n, s, a = this.dragEl.find(this.options._listItemClass);
                for (n = 0; n < a.length; n++)(s = k.$(a[n]).parents(this.options._listClass + "," + this.options._listBaseClass).length) > this.dragDepth && (this.dragDepth = s);
                l.addClass(this.options.movingClass)
            },
            dragStop: function(t) {
                var e = k.$(this.placeEl),
                    i = this.placeEl.parents(this.options._listBaseClass + ":first");
                this.placeEl.removeClass(this.options.placeholderClass), this.dragEl.remove(), this.element[0] !== i[0] ? (i.trigger("change.uk.nestable", [i.data("nestable"), e, "added"]), this.element.trigger("change.uk.nestable", [this, e, "removed"])) : this.element.trigger("change.uk.nestable", [this, e, "moved"]), this.trigger("stop.uk.nestable", [this, e]), this.reset(), l.removeClass(this.options.movingClass)
            },
            dragMove: function(t) {
                var e, i, o, n = this.options,
                    s = this.mouse,
                    a = this.dragRootEl ? this.dragRootEl.data("nestable").options.maxDepth : n.maxDepth;
                this.dragEl.css({
                    left: t.pageX - s.offsetX,
                    top: t.pageY - s.offsetY
                }), s.lastX = s.nowX, s.lastY = s.nowY, s.nowX = t.pageX, s.nowY = t.pageY, s.distX = s.nowX - s.lastX, s.distY = s.nowY - s.lastY, s.lastDirX = s.dirX, s.lastDirY = s.dirY, s.dirX = 0 === s.distX ? 0 : 0 < s.distX ? 1 : -1, s.dirY = 0 === s.distY ? 0 : 0 < s.distY ? 1 : -1;
                var r = Math.abs(s.distX) > Math.abs(s.distY) ? 1 : 0;
                if (!s.moving) return s.dirAx = r, void(s.moving = !0);
                if (s.dirAx !== r ? (s.distAxX = 0, s.distAxY = 0) : (s.distAxX += Math.abs(s.distX), 0 !== s.dirX && s.dirX !== s.lastDirX && (s.distAxX = 0), s.distAxY += Math.abs(s.distY), 0 !== s.dirY && s.dirY !== s.lastDirY && (s.distAxY = 0)), s.dirAx = r, s.dirAx && s.distAxX >= n.threshold && (s.distAxX = 0, o = this.placeEl.prev("li"), 0 < s.distX && o.length && !o.hasClass(n.collapsedClass) && !o.hasClass(n.noChildrenClass) && (e = o.find(n._listClass).last(), this.placeEl.parents(n._listClass + "," + n._listBaseClass).length + this.dragDepth <= a && (e.length ? (e = o.children(n._listClass).last()).append(this.placeEl) : ((e = k.$("<ul/>").addClass(n.listClass)).append(this.placeEl), o.append(e), this.setParent(o)))), s.distX < 0 && !this.placeEl.next(n._listItemClass).length)) {
                    var l = this.placeEl.closest([n._listBaseClass, n._listClass].join(",")),
                        d = l.closest(n._listItemClass);
                    d.length && (d.after(this.placeEl), l.children().length || this.unsetParent(d))
                }
                var h = !1,
                    u = t.pageX - (window.pageXOffset || document.scrollLeft || 0),
                    c = t.pageY - (window.pageYOffset || document.documentElement.scrollTop);
                if (this.pointEl = k.$(document.elementFromPoint(u, c)), n.handleClass && this.pointEl.hasClass(n.handleClass)) this.pointEl = this.pointEl.closest(n._listItemClass);
                else {
                    var p = this.pointEl.closest(n._listItemClass);
                    p.length && (this.pointEl = p)
                }
                if (!this.placeEl.find(this.pointEl).length) {
                    if (this.pointEl.data("nestable") && !this.pointEl.children().length) h = !0, this.checkEmptyList(this.pointEl);
                    else if (!this.pointEl.length || !this.pointEl.hasClass(n.listItemClass)) return;
                    var f = this.element,
                        m = this.pointEl.closest(this.options._listBaseClass),
                        g = f[0] != m[0];
                    if (!s.dirAx || g || h) {
                        if (g && n.group !== m.data("nestable-group")) return;
                        if (w.push(f), a < this.dragDepth - 1 + this.pointEl.parents(n._listClass + "," + n._listBaseClass).length) return;
                        var v = t.pageY < this.pointEl.offset().top + this.pointEl.height() / 2;
                        i = this.placeEl.parent(), h ? this.pointEl.append(this.placeEl) : v ? this.pointEl.before(this.placeEl) : this.pointEl.after(this.placeEl), i.children().length || i.data("nestable") || this.unsetParent(i.parent()), this.checkEmptyList(this.dragRootEl), this.checkEmptyList(f), g && (this.dragRootEl = m, this.hasNewRoot = this.element[0] !== this.dragRootEl[0])
                    }
                }
            },
            checkEmptyList: function(t) {
                t = t ? k.$(t) : this.element, this.options.emptyClass && t[t.children().length ? "removeClass" : "addClass"](this.options.emptyClass)
            }
        }), k.nestable
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-notify", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(e) {
        "use strict";

        function t(t) {
            return "string" == e.$.type(t) && (t = {
                message: t
            }), arguments[1] && (t = e.$.extend(t, "string" == e.$.type(arguments[1]) ? {
                status: arguments[1]
            } : arguments[1])), new i(t).show()
        }
        var o = {},
            n = {},
            i = function(t) {
                this.options = e.$.extend({}, i.defaults, t), this.uuid = e.Utils.uid("notifymsg"), this.element = e.$(['<div class="uk-notify-message">', '<a class="uk-close"></a>', "<div></div>", "</div>"].join("")).data("notifyMessage", this), this.content(this.options.message), this.options.status && (this.element.addClass("uk-notify-message-" + this.options.status), this.currentstatus = this.options.status), this.group = this.options.group, n[this.uuid] = this, o[this.options.pos] || (o[this.options.pos] = e.$('<div class="uk-notify uk-notify-' + this.options.pos + '"></div>').appendTo("body").on("click", ".uk-notify-message", function() {
                    var t = e.$(this).data("notifyMessage");
                    t.element.trigger("manualclose.uk.notify", [t]), t.close()
                }))
            };
        return e.$.extend(i.prototype, {
            uuid: !1,
            element: !1,
            timout: !1,
            currentstatus: "",
            group: !1,
            show: function() {
                if (!this.element.is(":visible")) {
                    var e = this;
                    o[this.options.pos].show().prepend(this.element);
                    var t = parseInt(this.element.css("margin-bottom"), 10);
                    return this.element.css({
                        opacity: 0,
                        marginTop: -1 * this.element.outerHeight(),
                        marginBottom: 0
                    }).animate({
                        opacity: 1,
                        marginTop: 0,
                        marginBottom: t
                    }, function() {
                        if (e.options.timeout) {
                            var t = function() {
                                e.close()
                            };
                            e.timeout = setTimeout(t, e.options.timeout), e.element.hover(function() {
                                clearTimeout(e.timeout)
                            }, function() {
                                e.timeout = setTimeout(t, e.options.timeout)
                            })
                        }
                    }), this
                }
            },
            close: function(t) {
                function e() {
                    i.element.remove(), o[i.options.pos].children().length || o[i.options.pos].hide(), i.options.onClose.apply(i, []), i.element.trigger("close.uk.notify", [i]), delete n[i.uuid]
                }
                var i = this;
                this.timeout && clearTimeout(this.timeout), t ? e() : this.element.animate({
                    opacity: 0,
                    marginTop: -1 * this.element.outerHeight(),
                    marginBottom: 0
                }, function() {
                    e()
                })
            },
            content: function(t) {
                var e = this.element.find(">div");
                return t ? (e.html(t), this) : e.html()
            },
            status: function(t) {
                return t ? (this.element.removeClass("uk-notify-message-" + this.currentstatus).addClass("uk-notify-message-" + t), this.currentstatus = t, this) : this.currentstatus
            }
        }), i.defaults = {
            message: "",
            status: "",
            timeout: 5e3,
            group: null,
            pos: "top-center",
            onClose: function() {}
        }, e.notify = t, e.notify.message = i, e.notify.closeAll = function(t, e) {
            var i;
            if (t)
                for (i in n) t === n[i].group && n[i].close(e);
            else
                for (i in n) n[i].close(e)
        }, t
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-slideshow", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(c) {
        "use strict";
        var d, p = 0;
        c.component("slideshow", {
            defaults: {
                animation: "fade",
                duration: 500,
                height: "auto",
                start: 0,
                autoplay: !1,
                autoplayInterval: 7e3,
                videoautoplay: !0,
                videomute: !0,
                slices: 15,
                pauseOnHover: !0,
                kenburns: !1,
                kenburnsanimations: ["uk-animation-middle-left", "uk-animation-top-right", "uk-animation-bottom-left", "uk-animation-top-center", "", "uk-animation-bottom-right"]
            },
            current: !1,
            interval: null,
            hovering: !1,
            boot: function() {
                c.ready(function(t) {
                    c.$("[data-uk-slideshow]", t).each(function() {
                        var t = c.$(this);
                        t.data("slideshow") || c.slideshow(t, c.Utils.options(t.attr("data-uk-slideshow")))
                    })
                })
            },
            init: function() {
                var i = this;
                this.container = this.element.hasClass("uk-slideshow") ? this.element : c.$(this.find(".uk-slideshow:first")), this.current = this.options.start, this.animating = !1, this.fixFullscreen = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && this.container.hasClass("uk-slideshow-fullscreen"), this.options.kenburns && (this.kbanimduration = !0 === this.options.kenburns ? "15s" : this.options.kenburns, String(this.kbanimduration).match(/(ms|s)$/) || (this.kbanimduration += "ms"), "string" == typeof this.options.kenburnsanimations && (this.options.kenburnsanimations = this.options.kenburnsanimations.split(","))), this.update(), this.on("click.uk.slideshow", "[data-uk-slideshow-item]", function(t) {
                    t.preventDefault();
                    var e = c.$(this).attr("data-uk-slideshow-item");
                    if (i.current != e) {
                        switch (e) {
                            case "next":
                            case "previous":
                                i["next" == e ? "next" : "previous"]();
                                break;
                            default:
                                i.show(parseInt(e, 10))
                        }
                        i.stop()
                    }
                }), c.$win.on("resize load", c.Utils.debounce(function() {
                    i.resize(), i.fixFullscreen && (i.container.css("height", window.innerHeight), i.slides.css("height", window.innerHeight))
                }, 100)), setTimeout(function() {
                    i.resize()
                }, 80), this.options.autoplay && this.start(), this.options.videoautoplay && this.slides.eq(this.current).data("media") && this.playmedia(this.slides.eq(this.current).data("media")), this.options.kenburns && this.applyKenBurns(this.slides.eq(this.current)), this.container.on({
                    mouseenter: function() {
                        i.options.pauseOnHover && (i.hovering = !0)
                    },
                    mouseleave: function() {
                        i.hovering = !1
                    }
                }), this.on("swipeRight swipeLeft", function(t) {
                    i["swipeLeft" == t.type ? "next" : "previous"]()
                }), this.on("display.uk.check", function() {
                    i.element.is(":visible") && (i.resize(), i.fixFullscreen && (i.container.css("height", window.innerHeight), i.slides.css("height", window.innerHeight)))
                }), c.domObserve(this.element, function(t) {
                    i.container.children(":not([data-slideshow-slide])").not(".uk-slideshow-ghost").length && i.update(!0)
                })
            },
            update: function(t) {
                var d, h = this,
                    u = 0;
                this.slides = this.container.children(), this.slidesCount = this.slides.length, this.slides.eq(this.current).length || (this.current = 0), this.slides.each(function(i) {
                    var t = c.$(this);
                    if (!t.data("processed")) {
                        var o = t.children("img,video,iframe").eq(0),
                            e = "html";
                        if (t.data("media", o), t.data("sizer", o), o.length) {
                            var n;
                            switch (e = o[0].nodeName.toLowerCase(), o[0].nodeName) {
                                case "IMG":
                                    var s = c.$('<div class="uk-cover-background uk-position-cover"></div>').css({
                                        "background-image": "url(" + o.attr("src") + ")"
                                    });
                                    o.attr("width") && o.attr("height") && (n = c.$("<canvas></canvas>").attr({
                                        width: o.attr("width"),
                                        height: o.attr("height")
                                    }), o.replaceWith(n), o = n, n = void 0), o.css({
                                        width: "100%",
                                        height: "auto",
                                        opacity: 0
                                    }), t.prepend(s).data("cover", s);
                                    break;
                                case "IFRAME":
                                    var a = o[0].src,
                                        r = "sw-" + ++p;
                                    o.attr("src", "").on("load", function() {
                                        if (i === h.current && (i != h.current || h.options.videoautoplay) || h.pausemedia(o), h.options.videomute) {
                                            h.mutemedia(o);
                                            var t = setInterval((e = 0, function() {
                                                h.mutemedia(o), 4 <= ++e && clearInterval(t)
                                            }), 250)
                                        }
                                        var e
                                    }).data("slideshow", h).attr("data-player-id", r).attr("src", [a, -1 < a.indexOf("?") ? "&" : "?", "enablejsapi=1&api=1&player_id=" + r].join("")).addClass("uk-position-absolute"), c.support.touch || o.css("pointer-events", "none"), n = !0, c.cover && (c.cover(o), o.attr("data-uk-cover", "{}"));
                                    break;
                                case "VIDEO":
                                    o.addClass("uk-cover-object uk-position-absolute"), n = !0, h.options.videomute && h.mutemedia(o)
                            }
                            if (n) {
                                d = c.$("<canvas></canvas>").attr({
                                    width: o[0].width,
                                    height: o[0].height
                                });
                                var l = c.$('<img style="width:100%;height:auto;">').attr("src", d[0].toDataURL());
                                t.prepend(l), t.data("sizer", l)
                            }
                        } else t.data("sizer", t);
                        h.hasKenBurns(t) && t.data("cover").css({
                            "-webkit-animation-duration": h.kbanimduration,
                            "animation-duration": h.kbanimduration
                        }), t.data("processed", ++u), t.attr("data-slideshow-slide", e)
                    }
                }), u && (this.triggers = this.find("[data-uk-slideshow-item]"), this.slides.attr("aria-hidden", "true").removeClass("uk-active").eq(this.current).addClass("uk-active").attr("aria-hidden", "false"), this.triggers.filter('[data-uk-slideshow-item="' + this.current + '"]').addClass("uk-active")), t && u && this.resize()
            },
            resize: function() {
                if (!this.container.hasClass("uk-slideshow-fullscreen")) {
                    var t = this.options.height;
                    "auto" === this.options.height && (t = 0, this.slides.css("height", "").each(function() {
                        t = Math.max(t, c.$(this).height())
                    })), this.container.css("height", t), this.slides.css("height", t)
                }
            },
            show: function(t, e) {
                if (!this.animating && this.current != t) {
                    this.animating = !0;
                    var i = this,
                        o = this.slides.eq(this.current),
                        n = this.slides.eq(t),
                        s = e || (this.current < t ? 1 : -1),
                        a = o.data("media"),
                        r = d[this.options.animation] ? this.options.animation : "fade",
                        l = n.data("media");
                    i.applyKenBurns(n), c.support.animation || (r = "none"), o = c.$(o), n = c.$(n), i.trigger("beforeshow.uk.slideshow", [n, o, i]), d[r].apply(this, [o, n, s]).then(function() {
                        i.animating && (a && a.is("video,iframe") && i.pausemedia(a), l && l.is("video,iframe") && i.playmedia(l), n.addClass("uk-active").attr("aria-hidden", "false"), o.removeClass("uk-active").attr("aria-hidden", "true"), i.animating = !1, i.current = t, c.Utils.checkDisplay(n, '[class*="uk-animation-"]:not(.uk-cover-background.uk-position-cover)'), i.trigger("show.uk.slideshow", [n, o, i]))
                    }), i.triggers.removeClass("uk-active"), i.triggers.filter('[data-uk-slideshow-item="' + t + '"]').addClass("uk-active")
                }
            },
            applyKenBurns: function(t) {
                if (this.hasKenBurns(t)) {
                    var e = this.options.kenburnsanimations,
                        i = this.kbindex || 0;
                    t.data("cover").attr("class", "uk-cover-background uk-position-cover").width(), t.data("cover").addClass(["uk-animation-scale", "uk-animation-reverse", e[i].trim()].join(" ")), this.kbindex = e[i + 1] ? i + 1 : 0
                }
            },
            hasKenBurns: function(t) {
                return this.options.kenburns && t.data("cover")
            },
            next: function() {
                this.show(this.slides[this.current + 1] ? this.current + 1 : 0, 1)
            },
            previous: function() {
                this.show(this.slides[this.current - 1] ? this.current - 1 : this.slides.length - 1, -1)
            },
            start: function() {
                this.stop();
                var t = this;
                this.interval = setInterval(function() {
                    t.hovering || t.next()
                }, this.options.autoplayInterval)
            },
            stop: function() {
                this.interval && clearInterval(this.interval)
            },
            playmedia: function(t) {
                if (t && t[0]) switch (t[0].nodeName) {
                    case "VIDEO":
                        this.options.videomute || (t[0].muted = !1), t[0].play();
                        break;
                    case "IFRAME":
                        this.options.videomute || t[0].contentWindow.postMessage('{ "event": "command", "func": "unmute", "method":"setVolume", "value":1}', "*"), t[0].contentWindow.postMessage('{ "event": "command", "func": "playVideo", "method":"play"}', "*")
                }
            },
            pausemedia: function(t) {
                switch (t[0].nodeName) {
                    case "VIDEO":
                        t[0].pause();
                        break;
                    case "IFRAME":
                        t[0].contentWindow.postMessage('{ "event": "command", "func": "pauseVideo", "method":"pause"}', "*")
                }
            },
            mutemedia: function(t) {
                switch (t[0].nodeName) {
                    case "VIDEO":
                        t[0].muted = !0;
                        break;
                    case "IFRAME":
                        t[0].contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}', "*")
                }
            }
        }), d = {
            none: function() {
                var t = c.$.Deferred();
                return t.resolve(), t.promise()
            },
            scroll: function(t, e, i) {
                var o = c.$.Deferred();
                return t.css("animation-duration", this.options.duration + "ms"), e.css("animation-duration", this.options.duration + "ms"), e.css("opacity", 1).one(c.support.animation.end, function() {
                    t.css("opacity", 0).removeClass(-1 == i ? "uk-slideshow-scroll-backward-out" : "uk-slideshow-scroll-forward-out"), e.removeClass(-1 == i ? "uk-slideshow-scroll-backward-in" : "uk-slideshow-scroll-forward-in"), o.resolve()
                }.bind(this)), t.addClass(-1 == i ? "uk-slideshow-scroll-backward-out" : "uk-slideshow-scroll-forward-out"), e.addClass(-1 == i ? "uk-slideshow-scroll-backward-in" : "uk-slideshow-scroll-forward-in"), e.width(), o.promise()
            },
            swipe: function(t, e, i) {
                var o = c.$.Deferred();
                return t.css("animation-duration", this.options.duration + "ms"), e.css("animation-duration", this.options.duration + "ms"), e.css("opacity", 1).one(c.support.animation.end, function() {
                    t.css("opacity", 0).removeClass(-1 === i ? "uk-slideshow-swipe-backward-out" : "uk-slideshow-swipe-forward-out"), e.removeClass(-1 === i ? "uk-slideshow-swipe-backward-in" : "uk-slideshow-swipe-forward-in"), o.resolve()
                }.bind(this)), t.addClass(-1 == i ? "uk-slideshow-swipe-backward-out" : "uk-slideshow-swipe-forward-out"), e.addClass(-1 == i ? "uk-slideshow-swipe-backward-in" : "uk-slideshow-swipe-forward-in"), e.width(), o.promise()
            },
            scale: function(t, e, i) {
                var o = c.$.Deferred();
                return t.css("animation-duration", this.options.duration + "ms"), e.css("animation-duration", this.options.duration + "ms"), e.css("opacity", 1), t.one(c.support.animation.end, function() {
                    t.css("opacity", 0).removeClass("uk-slideshow-scale-out"), o.resolve()
                }.bind(this)), t.addClass("uk-slideshow-scale-out"), t.width(), o.promise()
            },
            fade: function(t, e, i) {
                var o = c.$.Deferred();
                return t.css("animation-duration", this.options.duration + "ms"), e.css("animation-duration", this.options.duration + "ms"), e.css("opacity", 1), e.data("cover") || e.data("placeholder") || e.css("opacity", 1).one(c.support.animation.end, function() {
                    e.removeClass("uk-slideshow-fade-in")
                }).addClass("uk-slideshow-fade-in"), t.one(c.support.animation.end, function() {
                    t.css("opacity", 0).removeClass("uk-slideshow-fade-out"), o.resolve()
                }.bind(this)), t.addClass("uk-slideshow-fade-out"), t.width(), o.promise()
            }
        }, c.slideshow.animations = d, window.addEventListener("message", function(t) {
            var e, i = t.data;
            if ("string" == typeof i) try {
                i = JSON.parse(i)
            } catch (t) {
                i = {}
            }
            t.origin && -1 < t.origin.indexOf("vimeo") && "ready" == i.event && i.player_id && (e = c.$('[data-player-id="' + i.player_id + '"]')).length && e.data("slideshow").mutemedia(e)
        }, !1)
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-slider", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(l) {
        "use strict";
        var u, c, e, o, p = {};
        return l.component("slider", {
            defaults: {
                center: !1,
                threshold: 10,
                infinite: !0,
                autoplay: !1,
                autoplayInterval: 7e3,
                pauseOnHover: !0,
                activecls: "uk-active"
            },
            boot: function() {
                l.ready(function(t) {
                    setTimeout(function() {
                        l.$("[data-uk-slider]", t).each(function() {
                            var t = l.$(this);
                            t.data("slider") || l.slider(t, l.Utils.options(t.attr("data-uk-slider")))
                        })
                    }, 0)
                })
            },
            init: function() {
                var i = this;
                this.container = this.element.find(".uk-slider"), this.focus = 0, l.$win.on("resize load", l.Utils.debounce(function() {
                    i.update(!0)
                }, 100)), this.on("click.uk.slider", "[data-uk-slider-item]", function(t) {
                    t.preventDefault();
                    var e = l.$(this).attr("data-uk-slider-item");
                    if (i.focus != e) switch (i.stop(), e) {
                        case "next":
                        case "previous":
                            i["next" == e ? "next" : "previous"]();
                            break;
                        default:
                            i.updateFocus(parseInt(e, 10))
                    }
                }), this.container.on({
                    "touchstart mousedown": function(t) {
                        t.originalEvent && t.originalEvent.touches && (t = t.originalEvent.touches[0]), t.button && 2 == t.button || !i.active || (i.stop(), e = l.$(t.target).is("a") ? l.$(t.target) : l.$(t.target).parents("a:first"), o = !1, e.length && e.one("click", function(t) {
                            o && t.preventDefault()
                        }), (c = function(t) {
                            o = !0, u = i, p = {
                                touchx: parseInt(t.pageX, 10),
                                dir: 1,
                                focus: i.focus,
                                base: i.options.center ? "center" : "area"
                            }, t.originalEvent && t.originalEvent.touches && (t = t.originalEvent.touches[0]), u.element.data({
                                "pointer-start": {
                                    x: parseInt(t.pageX, 10),
                                    y: parseInt(t.pageY, 10)
                                },
                                "pointer-pos-start": i.pos
                            }), i.container.addClass("uk-drag"), c = !1
                        }).x = parseInt(t.pageX, 10), c.threshold = i.options.threshold)
                    },
                    mouseenter: function() {
                        i.options.pauseOnHover && (i.hovering = !0)
                    },
                    mouseleave: function() {
                        i.hovering = !1
                    }
                }), this.update(!0), this.on("display.uk.check", function() {
                    i.element.is(":visible") && i.update(!0)
                }), this.element.find("a,img").attr("draggable", "false"), this.options.autoplay && this.start(), l.domObserve(this.element, function(t) {
                    i.element.children(":not([data-slider-slide])").length && i.update(!0)
                })
            },
            update: function(t) {
                var e, i, o, n, s = this,
                    a = 0,
                    r = 0;
                if (this.items = this.container.children().filter(":visible"), this.vp = this.element[0].getBoundingClientRect().width, this.container.css({
                        "min-width": "",
                        "min-height": ""
                    }), this.items.each(function(t) {
                        e = l.$(this).attr("data-slider-slide", t), n = e.css({
                            left: "",
                            width: ""
                        })[0].getBoundingClientRect(), i = n.width, o = e.width(), r = Math.max(r, n.height), e.css({
                            left: a,
                            width: i
                        }).data({
                            idx: t,
                            left: a,
                            width: i,
                            cwidth: o,
                            area: a + i,
                            center: a - (s.vp / 2 - o / 2)
                        }), a += i
                    }), this.container.css({
                        "min-width": a,
                        "min-height": r
                    }), this.options.infinite && (a <= 2 * this.vp || this.items.length < 5) && !this.itemsResized) return this.container.children().each(function(t) {
                    s.container.append(s.items.eq(t).clone(!0).attr("id", ""))
                }).each(function(t) {
                    s.container.append(s.items.eq(t).clone(!0).attr("id", ""))
                }), this.itemsResized = !0, this.update();
                this.cw = a, this.pos = 0, this.active = a >= this.vp, this.container.css({
                    "-ms-transform": "",
                    "-webkit-transform": "",
                    transform: ""
                }), t && this.updateFocus(this.focus)
            },
            updatePos: function(t) {
                this.pos = t, this.container.css({
                    "-ms-transform": "translateX(" + t + "px)",
                    "-webkit-transform": "translateX(" + t + "px)",
                    transform: "translateX(" + t + "px)"
                })
            },
            updateFocus: function(e, t) {
                if (this.active) {
                    t = t || (e > this.focus ? 1 : -1);
                    var i, o, n = this.items.eq(e);
                    if (this.options.infinite && this.infinite(e, t), this.options.center) this.updatePos(-1 * n.data("center")), this.items.filter("." + this.options.activecls).removeClass(this.options.activecls), n.addClass(this.options.activecls);
                    else if (this.options.infinite) this.updatePos(-1 * n.data("left"));
                    else {
                        for (i = 0, o = e; o < this.items.length; o++) i += this.items.eq(o).data("width");
                        if (i > this.vp) this.updatePos(-1 * n.data("left"));
                        else if (1 == t) {
                            for (i = 0, o = this.items.length - 1; 0 <= o; o--) {
                                if ((i += this.items.eq(o).data("width")) == this.vp) {
                                    e = o;
                                    break
                                }
                                if (i > this.vp) {
                                    e = o < this.items.length - 1 ? o + 1 : o;
                                    break
                                }
                            }
                            i > this.vp ? this.updatePos(-1 * (this.container.width() - this.vp)) : this.updatePos(-1 * this.items.eq(e).data("left"))
                        }
                    }
                    var s = this.items.eq(e).data("left");
                    this.items.removeClass("uk-slide-before uk-slide-after").each(function(t) {
                        t !== e && l.$(this).addClass(l.$(this).data("left") < s ? "uk-slide-before" : "uk-slide-after")
                    }), this.focus = e, this.trigger("focusitem.uk.slider", [e, this.items.eq(e), this])
                }
            },
            next: function() {
                var t = this.items[this.focus + 1] ? this.focus + 1 : this.options.infinite ? 0 : this.focus;
                this.updateFocus(t, 1)
            },
            previous: function() {
                var t = this.items[this.focus - 1] ? this.focus - 1 : this.options.infinite ? this.items[this.focus - 1] ? this.items - 1 : this.items.length - 1 : this.focus;
                this.updateFocus(t, -1)
            },
            start: function() {
                this.stop();
                var t = this;
                this.interval = setInterval(function() {
                    t.hovering || t.next()
                }, this.options.autoplayInterval)
            },
            stop: function() {
                this.interval && clearInterval(this.interval)
            },
            infinite: function(t, e) {
                var i, o = this,
                    n = this.items.eq(t),
                    s = t,
                    a = [],
                    r = 0;
                if (1 == e) {
                    for (i = 0; i < this.items.length && (s != t && (r += this.items.eq(s).data("width"), a.push(this.items.eq(s))), !(r > this.vp)); i++) s = s + 1 == this.items.length ? 0 : s + 1;
                    a.length && a.forEach(function(t) {
                        var e = n.data("area");
                        t.css({
                            left: e
                        }).data({
                            left: e,
                            area: e + t.data("width"),
                            center: e - (o.vp / 2 - t.data("cwidth") / 2)
                        }), n = t
                    })
                } else {
                    for (i = this.items.length - 1; - 1 < i && (r += this.items.eq(s).data("width"), s != t && a.push(this.items.eq(s)), !(r > this.vp)); i--) s = s - 1 == -1 ? this.items.length - 1 : s - 1;
                    a.length && a.forEach(function(t) {
                        var e = n.data("left") - t.data("width");
                        t.css({
                            left: e
                        }).data({
                            left: e,
                            area: e + t.data("width"),
                            center: e - (o.vp / 2 - t.data("cwidth") / 2)
                        }), n = t
                    })
                }
            }
        }), l.$doc.on("mousemove.uk.slider touchmove.uk.slider", function(t) {
            if (t.originalEvent && t.originalEvent.touches && (t = t.originalEvent.touches[0]), c && Math.abs(t.pageX - c.x) > c.threshold && (window.getSelection().toString() ? u = c = !1 : c(t)), u) {
                var e, i, o, n, s, a, r, l, d, h;
                if (t.clientX || t.clientY ? e = t.clientX : (t.pageX || t.pageY) && (e = t.pageX - document.body.scrollLeft - document.documentElement.scrollLeft), s = p.focus, i = e - u.element.data("pointer-start").x, o = u.element.data("pointer-pos-start") + i, n = e > u.element.data("pointer-start").x ? -1 : 1, a = u.items.eq(p.focus), 1 == n)
                    for (r = a.data("left") + Math.abs(i), l = 0, d = p.focus; l < u.items.length; l++) {
                        if (h = u.items.eq(d), d != p.focus && h.data("left") < r && h.data("area") > r) {
                            s = d;
                            break
                        }
                        d = d + 1 == u.items.length ? 0 : d + 1
                    } else
                        for (r = a.data("left") - Math.abs(i), l = 0, d = p.focus; l < u.items.length; l++) {
                            if (h = u.items.eq(d), d != p.focus && h.data("area") <= a.data("left") && h.data("center") < r) {
                                s = d;
                                break
                            }
                            d = d - 1 == -1 ? u.items.length - 1 : d - 1
                        }
                u.options.infinite && s != p._focus && u.infinite(s, n), u.updatePos(o), p.dir = n, p._focus = s, p.touchx = parseInt(t.pageX, 10), p.diff = r
            }
        }), l.$doc.on("mouseup.uk.slider touchend.uk.slider", function(t) {
            if (u) {
                u.container.removeClass("uk-drag"), u.items.eq(p.focus);
                var e, i, o, n = !1;
                if (1 == p.dir) {
                    for (i = 0, o = p.focus; i < u.items.length; i++) {
                        if (e = u.items.eq(o), o != p.focus && e.data("left") > p.diff) {
                            n = o;
                            break
                        }
                        o = o + 1 == u.items.length ? 0 : o + 1
                    }
                    u.options.infinite || n || (n = u.items.length)
                } else {
                    for (i = 0, o = p.focus; i < u.items.length; i++) {
                        if (e = u.items.eq(o), o != p.focus && e.data("left") < p.diff) {
                            n = o;
                            break
                        }
                        o = o - 1 == -1 ? u.items.length - 1 : o - 1
                    }
                    u.options.infinite || n || (n = 0)
                }
                u.updateFocus(!1 !== n ? n : p._focus)
            }
            u = c = !1
        }), l.slider
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-sortable", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(l) {
        "use strict";
        var d, h, s, u, c, p, f, m, g, v = "ontouchstart" in window || "MSGesture" in window || window.DocumentTouch && document instanceof DocumentTouch,
            k = v ? "MSGesture" in window || window.PointerEvent ? "pointerdown" : "touchstart" : "mousedown",
            w = v ? "MSGesture" in window || window.PointerEvent ? "pointermove" : "touchmove" : "mousemove",
            b = v ? "MSGesture" in window || window.PointerEvent ? "pointerup" : "touchend" : "mouseup";
        return l.component("sortable", {
            defaults: {
                animation: 150,
                threshold: 10,
                childClass: "uk-sortable-item",
                placeholderClass: "uk-sortable-placeholder",
                overClass: "uk-sortable-over",
                draggingClass: "uk-sortable-dragged",
                dragMovingClass: "uk-sortable-moving",
                baseClass: "uk-sortable",
                noDragClass: "uk-sortable-nodrag",
                emptyClass: "uk-sortable-empty",
                dragCustomClass: "",
                handleClass: !1,
                group: !1,
                stop: function() {},
                start: function() {},
                change: function() {}
            },
            boot: function() {
                l.ready(function(t) {
                    l.$("[data-uk-sortable]", t).each(function() {
                        var t = l.$(this);
                        t.data("sortable") || l.sortable(t, l.Utils.options(t.attr("data-uk-sortable")))
                    })
                }), l.$html.on(w, function(t) {
                    if (c) {
                        var e = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0] : t;
                        (Math.abs(e.pageX - c.pos.x) > c.threshold || Math.abs(e.pageY - c.pos.y) > c.threshold) && c.apply(e)
                    }
                    if (d) {
                        u || (u = !0, d.show(), d.$current.addClass(d.$sortable.options.placeholderClass), d.$sortable.element.children().addClass(d.$sortable.options.childClass), l.$html.addClass(d.$sortable.options.dragMovingClass));
                        var i = d.data("mouse-offset"),
                            o = t.originalEvent.touches && t.originalEvent.touches[0] || t.originalEvent,
                            n = parseInt(o.pageX, 10) + i.left,
                            s = parseInt(o.pageY, 10) + i.top;
                        if (d.css({
                                left: n,
                                top: s
                            }), s + d.height() / 3 > document.body.offsetHeight) return;
                        s < l.$win.scrollTop() ? l.$win.scrollTop(l.$win.scrollTop() - Math.ceil(d.height() / 3)) : s + d.height() / 3 > window.innerHeight + l.$win.scrollTop() && l.$win.scrollTop(l.$win.scrollTop() + Math.ceil(d.height() / 3))
                    }
                }), l.$html.on(b, function(t) {
                    if (c = !1, h && d) {
                        var e = function(t) {
                                t = l.$(t);
                                do {
                                    if (t.data("sortable")) return t;
                                    t = l.$(t).parent()
                                } while (t.length);
                                return t
                            }(h),
                            i = d.$sortable,
                            o = {
                                type: t.type
                            };
                        e[0] && i.dragDrop(o, i.element), i.dragEnd(o, i.element)
                    } else h = d = null
                })
            },
            init: function() {
                var a = this,
                    r = this.element[0];
                p = [], this.checkEmptyList(), this.element.data("sortable-group", this.options.group ? this.options.group : l.Utils.uid("sortable-group"));
                var t = n(function(t) {
                        if (!t.data || !t.data.sortable) {
                            var e = l.$(t.target),
                                i = e.is("a[href]") ? e : e.parents("a[href]");
                            if (!e.is(":input")) {
                                if (a.options.handleClass)
                                    if (!(e.hasClass(a.options.handleClass) ? e : e.closest("." + a.options.handleClass, a.element)).length) return;
                                return t.preventDefault(), i.length && i.one("click", function(t) {
                                    t.preventDefault()
                                }).one(b, function() {
                                    f || (i.trigger("click"), v && i.attr("href").trim() && (location.href = i.attr("href")))
                                }), t.data = t.data || {}, t.data.sortable = r, a.dragStart(t, this)
                            }
                        }
                    }),
                    e = n(l.Utils.debounce(function(t) {
                        return a.dragEnter(t, this)
                    })),
                    i = n(function(t) {
                        var e = a.dragenterData(this);
                        a.dragenterData(this, e - 1), a.dragenterData(this) || (l.$(this).removeClass(a.options.overClass), a.dragenterData(this, !1))
                    }),
                    o = n(function(t) {
                        return !h || h === this || s === this || (a.element.children().removeClass(a.options.overClass), s = this, a.moveElementNextTo(h, this), function(t) {
                            t.stopPropagation && t.stopPropagation();
                            t.preventDefault && t.preventDefault();
                            t.returnValue = !1
                        }(t))
                    });

                function n(s) {
                    return function(t) {
                        var e, i, o;
                        if (g = t) {
                            if (i = (e = t.touches && t.touches[0] || t).target || t.target, v && document.elementFromPoint) {
                                var n = document.elementFromPoint(e.pageX - document.body.scrollLeft, e.pageY - document.body.scrollTop);
                                n && (i = n)
                            }
                            m = l.$(i)
                        }
                        l.$(i).hasClass("." + a.options.childClass) ? s.apply(i, [t]) : i !== r && (o = function(t, e) {
                            var i = e;
                            if (i == t) return null;
                            for (; i;) {
                                if (i.parentNode === t) return i;
                                if (!(i = i.parentNode) || !i.ownerDocument || 11 === i.nodeType) break
                            }
                            return null
                        }(r, i)) && s.apply(o, [t])
                    }
                }
                this.addDragHandlers = function() {
                    v && g.touches && g.touches.length ? r.addEventListener(w, o, !1) : (r.addEventListener("mouseover", e, !1), r.addEventListener("mouseout", i, !1))
                }, this.removeDragHandlers = function() {
                    v && g.touches && g.touches.length ? r.removeEventListener(w, o, !1) : (r.removeEventListener("mouseover", e, !1), r.removeEventListener("mouseout", i, !1))
                }, window.addEventListener(w, function(t) {
                    h && a.dragMove(t, a)
                }, !1), r.addEventListener(k, t, !1)
            },
            dragStart: function(t, e) {
                u = f = !1;
                var i = this,
                    o = l.$(t.target);
                if ((v || 2 != t.button) && !o.is("." + i.options.noDragClass)) {
                    var n = o.closest("." + i.options.noDragClass);
                    if (!(n.length && this.element.find(n[0]).length || o.is(":input"))) {
                        h = e, d && d.remove();
                        var s = l.$(h),
                            a = s.offset(),
                            r = t.touches && t.touches[0] || t;
                        c = {
                            pos: {
                                x: r.pageX,
                                y: r.pageY
                            },
                            threshold: i.options.handleClass ? 1 : i.options.threshold,
                            apply: function(t) {
                                (d = l.$('<div class="' + [i.options.draggingClass, i.options.dragCustomClass].join(" ") + '"></div>').css({
                                    display: "none",
                                    top: a.top,
                                    left: a.left,
                                    width: s.width(),
                                    height: s.height(),
                                    padding: s.css("padding")
                                }).data({
                                    "mouse-offset": {
                                        left: a.left - parseInt(r.pageX, 10),
                                        top: a.top - parseInt(r.pageY, 10)
                                    },
                                    origin: i.element,
                                    index: s.index()
                                }).append(s.html()).appendTo("body")).$current = s, d.$sortable = i, s.data({
                                    "start-list": s.parent(),
                                    "start-index": s.index(),
                                    "sortable-group": i.options.group
                                }), i.addDragHandlers(), i.options.start(this, h), i.trigger("start.uk.sortable", [i, h, d]), c = !(f = !0)
                            }
                        }
                    }
                }
            },
            dragMove: function(t, e) {
                var i, o = (m = l.$(document.elementFromPoint(t.pageX - (document.body.scrollLeft || document.scrollLeft || 0), t.pageY - (document.body.scrollTop || document.documentElement.scrollTop || 0)))).closest("." + this.options.baseClass),
                    n = o.data("sortable-group"),
                    s = l.$(h),
                    a = s.parent(),
                    r = s.data("sortable-group");
                o[0] !== a[0] && void 0 !== r && n === r && (o.data("sortable").addDragHandlers(), p.push(o), o.children().addClass(this.options.childClass), 0 < o.children().length ? (i = m.closest("." + this.options.childClass)).length ? i.before(s) : o.append(s) : m.append(s), l.$doc.trigger("mouseover")), this.checkEmptyList(), this.checkEmptyList(a)
            },
            dragEnter: function(t, e) {
                if (!h || h === e) return !0;
                var i = this.dragenterData(e);
                if (this.dragenterData(e, i + 1), 0 === i) {
                    var o = l.$(e).parent(),
                        n = l.$(h).data("start-list");
                    if (o[0] !== n[0]) {
                        var s = o.data("sortable-group"),
                            a = l.$(h).data("sortable-group");
                        if ((s || a) && s != a) return !1
                    }
                    l.$(e).addClass(this.options.overClass), this.moveElementNextTo(h, e)
                }
                return !1
            },
            dragEnd: function(t, e) {
                var i = this;
                h && (this.options.stop(e), this.trigger("stop.uk.sortable", [this])), s = h = null, p.push(this.element), p.forEach(function(t, e) {
                    l.$(t).children().each(function() {
                        1 === this.nodeType && (l.$(this).removeClass(i.options.overClass).removeClass(i.options.placeholderClass).removeClass(i.options.childClass), i.dragenterData(this, !1))
                    })
                }), p = [], l.$html.removeClass(this.options.dragMovingClass), this.removeDragHandlers(), d && (d.remove(), d = null)
            },
            dragDrop: function(t, e) {
                "drop" === t.type && (t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault()), this.triggerChangeEvents()
            },
            triggerChangeEvents: function() {
                if (h) {
                    var t = l.$(h),
                        e = d.data("origin"),
                        i = t.closest("." + this.options.baseClass),
                        o = [],
                        n = l.$(h);
                    e[0] === i[0] && d.data("index") != t.index() ? o.push({
                        sortable: this,
                        mode: "moved"
                    }) : e[0] != i[0] && o.push({
                        sortable: l.$(i).data("sortable"),
                        mode: "added"
                    }, {
                        sortable: l.$(e).data("sortable"),
                        mode: "removed"
                    }), o.forEach(function(t, e) {
                        t.sortable && t.sortable.element.trigger("change.uk.sortable", [t.sortable, n, t.mode])
                    })
                }
            },
            dragenterData: function(t, e) {
                if (t = l.$(t), 1 == arguments.length) return parseInt(t.data("child-dragenter"), 10) || 0;
                e ? t.data("child-dragenter", Math.max(0, e)) : t.removeData("child-dragenter")
            },
            moveElementNextTo: function(t, e) {
                0;
                var i = this,
                    o = l.$(t).parent().css("min-height", ""),
                    n = function(t, e) {
                        var i = t.parentNode;
                        if (e.parentNode != i) return;
                        var o = t.previousSibling;
                        for (; o && 9 !== o.nodeType;) {
                            if (o === e) return 1;
                            o = o.previousSibling
                        }
                        return
                    }(t, e) ? e : e.nextSibling,
                    s = o.children(),
                    a = s.length;
                if (!i.options.animation) return e.parentNode.insertBefore(t, n), void l.Utils.checkDisplay(i.element.parent());
                o.css("min-height", o.height()), s.stop().each(function() {
                    var t = l.$(this),
                        e = t.position();
                    e.width = t.width(), t.data("offset-before", e)
                }), e.parentNode.insertBefore(t, n), l.Utils.checkDisplay(i.element.parent()), (s = o.children().each(function() {
                    var t = l.$(this);
                    t.data("offset-after", t.position())
                }).each(function() {
                    var t = l.$(this),
                        e = t.data("offset-before");
                    t.css({
                        position: "absolute",
                        top: e.top,
                        left: e.left,
                        minWidth: e.width
                    })
                })).each(function() {
                    var t = l.$(this),
                        e = (t.data("offset-before"), t.data("offset-after"));
                    t.css("pointer-events", "none").width(), setTimeout(function() {
                        t.animate({
                            top: e.top,
                            left: e.left
                        }, i.options.animation, function() {
                            t.css({
                                position: "",
                                top: "",
                                left: "",
                                minWidth: "",
                                "pointer-events": ""
                            }).removeClass(i.options.overClass).removeData("child-dragenter"), --a || (o.css("min-height", ""), l.Utils.checkDisplay(i.element.parent()))
                        })
                    }, 0)
                })
            },
            serialize: function() {
                var s, a, r = [];
                return this.element.children().each(function(t, e) {
                    s = {};
                    for (var i, o, n = 0; n < e.attributes.length; n++) 0 === (a = e.attributes[n]).name.indexOf("data-") && (i = a.name.substr(5), o = l.Utils.str2json(a.value), s[i] = o || "false" == a.value || "0" == a.value ? o : a.value);
                    r.push(s)
                }), r
            },
            checkEmptyList: function(t) {
                t = t ? l.$(t) : this.element, this.options.emptyClass && t[t.children().length ? "removeClass" : "addClass"](this.options.emptyClass)
            }
        }), l.sortable
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-sticky", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(c) {
        "use strict";
        var p = c.$win,
            f = c.$doc,
            m = [],
            n = 1;

        function i() {
            var t = arguments.length ? arguments : m;
            if (t.length && !(p.scrollTop() < 0))
                for (var e, i, o, n, r = p.scrollTop(), s = f.height(), a = s - p.height(), l = a < r ? a - r : 0, d = 0; d < t.length; d++)
                    if ((n = t[d]).element.is(":visible") && !n.animate) {
                        if (n.check()) {
                            if (e = n.top < 0 ? 0 : (e = s - (o = n.element.outerHeight()) - n.top - n.options.bottom - r - l) < 0 ? e + n.top : n.top, n.boundary && n.boundary.length) {
                                var h = n.boundary.offset().top;
                                i = n.boundtoparent ? s - (h + n.boundary.outerHeight()) + parseInt(n.boundary.css("padding-bottom")) : s - h, e = r + o > s - i - (n.top < 0 ? 0 : n.top) ? s - i - (r + o) : e
                            }
                            if (n.currentTop != e) {
                                if (n.element.css({
                                        position: "fixed",
                                        top: e,
                                        width: n.getWidthFrom.length ? n.getWidthFrom.width() : n.element.width()
                                    }), !n.init && (n.element.addClass(n.options.clsinit), location.hash && 0 < r && n.options.target)) {
                                    var u = c.$(location.hash);
                                    u.length && setTimeout(function(s, a) {
                                        return function() {
                                            a.element.width();
                                            var t = s.offset(),
                                                e = t.top + s.outerHeight(),
                                                i = a.element.offset(),
                                                o = a.element.outerHeight(),
                                                n = i.top + o;
                                            i.top < e && t.top < n && (r = t.top - o - a.options.target, window.scrollTo(0, r))
                                        }
                                    }(u, n), 0)
                                }
                                n.element.addClass(n.options.clsactive).removeClass(n.options.clsinactive), n.element.trigger("active.uk.sticky"), n.element.css("margin", ""), n.options.animation && n.init && !c.Utils.isInView(n.wrapper) && n.element.addClass(n.options.animation), n.currentTop = e
                            }
                        } else null !== n.currentTop && n.reset();
                        n.init = !0
                    }
        }
        return c.component("sticky", {
            defaults: {
                top: 0,
                bottom: 0,
                animation: "",
                clsinit: "uk-sticky-init",
                clsactive: "uk-active",
                clsinactive: "",
                getWidthFrom: "",
                showup: !1,
                boundary: !1,
                media: !1,
                target: !1,
                disabled: !1
            },
            boot: function() {
                c.$doc.on("scrolling.uk.document", function(t, e) {
                    e && e.dir && (n = e.dir.y, i())
                }), c.$win.on("resize orientationchange", c.Utils.debounce(function() {
                    if (m.length) {
                        for (var t = 0; t < m.length; t++) m[t].reset(!0), m[t].self.computeWrapper();
                        i()
                    }
                }, 100)), c.ready(function(t) {
                    setTimeout(function() {
                        c.$("[data-uk-sticky]", t).each(function() {
                            var t = c.$(this);
                            t.data("sticky") || c.sticky(t, c.Utils.options(t.attr("data-uk-sticky")))
                        }), i()
                    }, 0)
                })
            },
            init: function() {
                var t, e = this.options.boundary;
                this.wrapper = this.element.wrap('<div class="uk-sticky-placeholder"></div>').parent(), this.computeWrapper(), this.wrapper.css({
                    "margin-top": this.element.css("margin-top"),
                    "margin-bottom": this.element.css("margin-bottom"),
                    "margin-left": this.element.css("margin-left"),
                    "margin-right": this.element.css("margin-right")
                }), this.element.css("margin", 0), e && (!0 === e || "!" === e[0] ? (e = !0 === e ? this.wrapper.parent() : this.wrapper.closest(e.substr(1)), t = !0) : "string" == typeof e && (e = c.$(e))), this.sticky = {
                    self: this,
                    options: this.options,
                    element: this.element,
                    currentTop: null,
                    wrapper: this.wrapper,
                    init: !1,
                    getWidthFrom: c.$(this.options.getWidthFrom || this.wrapper),
                    boundary: e,
                    boundtoparent: t,
                    top: 0,
                    calcTop: function() {
                        var t = this.options.top;
                        if (this.options.top && "string" == typeof this.options.top)
                            if (this.options.top.match(/^(-|)(\d+)vh$/)) t = window.innerHeight * parseInt(this.options.top, 10) / 100;
                            else {
                                var e = c.$(this.options.top).first();
                                e.length && e.is(":visible") && (t = -1 * (e.offset().top + e.outerHeight() - this.wrapper.offset().top))
                            } this.top = t
                    },
                    reset: function(t) {
                        this.calcTop();
                        var e = function() {
                            this.element.css({
                                position: "",
                                top: "",
                                width: "",
                                left: "",
                                margin: "0"
                            }), this.element.removeClass([this.options.animation, "uk-animation-reverse", this.options.clsactive].join(" ")), this.element.addClass(this.options.clsinactive), this.element.trigger("inactive.uk.sticky"), this.currentTop = null, this.animate = !1
                        }.bind(this);
                        !t && this.options.animation && c.support.animation && !c.Utils.isInView(this.wrapper) ? (this.animate = !0, this.element.removeClass(this.options.animation).one(c.support.animation.end, function() {
                            e()
                        }).width(), this.element.addClass(this.options.animation + " uk-animation-reverse")) : e()
                    },
                    check: function() {
                        if (this.options.disabled) return !1;
                        if (this.options.media) switch (typeof this.options.media) {
                            case "number":
                                if (window.innerWidth < this.options.media) return !1;
                                break;
                            case "string":
                                if (window.matchMedia && !window.matchMedia(this.options.media).matches) return !1
                        }
                        var t = p.scrollTop(),
                            e = f.height() - window.innerHeight,
                            i = e < t ? e - t : 0,
                            o = this.wrapper.offset().top - this.top - i <= t;
                        return o && this.options.showup && (1 == n && (o = !1), -1 == n && !this.element.hasClass(this.options.clsactive) && c.Utils.isInView(this.wrapper) && (o = !1)), o
                    }
                }, this.sticky.calcTop(), m.push(this.sticky)
            },
            update: function() {
                i(this.sticky)
            },
            enable: function() {
                this.options.disabled = !1, this.update()
            },
            disable: function(t) {
                this.options.disabled = !0, this.sticky.reset(t)
            },
            computeWrapper: function() {
                this.wrapper.css({
                    height: -1 == ["absolute", "fixed"].indexOf(this.element.css("position")) ? this.element.outerHeight() : "",
                    float: "none" != this.element.css("float") ? this.element.css("float") : ""
                }), "fixed" == this.element.css("position") && this.element.css({
                    width: this.sticky.getWidthFrom.length ? this.sticky.getWidthFrom.width() : this.element.width()
                })
            }
        }), c.sticky
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-tooltip", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(f) {
        "use strict";
        var m, g, v;
        return f.component("tooltip", {
            defaults: {
                offset: 5,
                pos: "top",
                animation: !1,
                delay: 0,
                cls: "",
                activeClass: "uk-active",
                src: function(t) {
                    var e = t.attr("title");
                    return void 0 !== e && t.data("cached-title", e).removeAttr("title"), t.data("cached-title")
                }
            },
            tip: "",
            boot: function() {
                f.$html.on("mouseenter.tooltip.uikit focus.tooltip.uikit", "[data-uk-tooltip]", function(t) {
                    var e = f.$(this);
                    e.data("tooltip") || (f.tooltip(e, f.Utils.options(e.attr("data-uk-tooltip"))), e.trigger("mouseenter"))
                })
            },
            init: function() {
                var e = this;
                m = m || f.$('<div class="uk-tooltip"></div>').appendTo("body"), this.on({
                    focus: function(t) {
                        e.show()
                    },
                    blur: function(t) {
                        e.hide()
                    },
                    mouseenter: function(t) {
                        e.show()
                    },
                    mouseleave: function(t) {
                        e.hide()
                    }
                })
            },
            show: function() {
                if (this.tip = "function" == typeof this.options.src ? this.options.src(this.element) : this.options.src, g && clearTimeout(g), v && clearInterval(v), "string" == typeof this.tip && this.tip.length) {
                    m.stop().css({
                        top: -2e3,
                        visibility: "hidden"
                    }).removeClass(this.options.activeClass).show(), m.html('<div class="uk-tooltip-inner">' + this.tip + "</div>");
                    var t = this,
                        e = f.$.extend({}, this.element.offset(), {
                            width: this.element[0].offsetWidth,
                            height: this.element[0].offsetHeight
                        }),
                        i = m[0].offsetWidth,
                        o = m[0].offsetHeight,
                        n = "function" == typeof this.options.offset ? this.options.offset.call(this.element) : this.options.offset,
                        s = "function" == typeof this.options.pos ? this.options.pos.call(this.element) : this.options.pos,
                        a = s.split("-"),
                        r = {
                            display: "none",
                            visibility: "visible",
                            top: e.top + e.height + o,
                            left: e.left
                        };
                    if ("fixed" == f.$html.css("position") || "fixed" == f.$body.css("position")) {
                        var l = f.$("body").offset(),
                            d = f.$("html").offset(),
                            h = d.top + l.top,
                            u = d.left + l.left;
                        e.left -= u, e.top -= h
                    }
                    "left" != a[0] && "right" != a[0] || "right" != f.langdirection || (a[0] = "left" == a[0] ? "right" : "left");
                    var c = {
                        bottom: {
                            top: e.top + e.height + n,
                            left: e.left + e.width / 2 - i / 2
                        },
                        top: {
                            top: e.top - o - n,
                            left: e.left + e.width / 2 - i / 2
                        },
                        left: {
                            top: e.top + e.height / 2 - o / 2,
                            left: e.left - i - n
                        },
                        right: {
                            top: e.top + e.height / 2 - o / 2,
                            left: e.left + e.width + n
                        }
                    };
                    f.$.extend(r, c[a[0]]), 2 == a.length && (r.left = "left" == a[1] ? e.left : e.left + e.width - i);
                    var p = this.checkBoundary(r.left, r.top, i, o);
                    if (p) {
                        switch (p) {
                            case "x":
                                s = 2 == a.length ? a[0] + "-" + (r.left < 0 ? "left" : "right") : r.left < 0 ? "right" : "left";
                                break;
                            case "y":
                                s = 2 == a.length ? (r.top < 0 ? "bottom" : "top") + "-" + a[1] : r.top < 0 ? "bottom" : "top";
                                break;
                            case "xy":
                                s = 2 == a.length ? (r.top < 0 ? "bottom" : "top") + "-" + (r.left < 0 ? "left" : "right") : r.left < 0 ? "right" : "left"
                        }
                        a = s.split("-"), f.$.extend(r, c[a[0]]), 2 == a.length && (r.left = "left" == a[1] ? e.left : e.left + e.width - i)
                    }
                    r.left -= f.$body.position().left, g = setTimeout(function() {
                        m.css(r).attr("class", ["uk-tooltip", "uk-tooltip-" + s, t.options.cls].join(" ")), t.options.animation ? m.css({
                            opacity: 0,
                            display: "block"
                        }).addClass(t.options.activeClass).animate({
                            opacity: 1
                        }, parseInt(t.options.animation, 10) || 400) : m.show().addClass(t.options.activeClass), g = !1, v = setInterval(function() {
                            t.element.is(":visible") || t.hide()
                        }, 150)
                    }, parseInt(this.options.delay, 10) || 0)
                }
            },
            hide: function() {
                if (!this.element.is("input") || this.element[0] !== document.activeElement)
                    if (g && clearTimeout(g), v && clearInterval(v), m.stop(), this.options.animation) {
                        var t = this;
                        m.fadeOut(parseInt(this.options.animation, 10) || 400, function() {
                            m.removeClass(t.options.activeClass)
                        })
                    } else m.hide().removeClass(this.options.activeClass)
            },
            content: function() {
                return this.tip
            },
            checkBoundary: function(t, e, i, o) {
                var n = "";
                return (t < 0 || t - f.$win.scrollLeft() + i > window.innerWidth) && (n += "x"), (e < 0 || e - f.$win.scrollTop() + o > window.innerHeight) && (n += "y"), n
            }
        }), f.tooltip
    }), function(t) {
        var e;
        window.UIkit && (e = t(UIkit)), "function" == typeof define && define.amd && define("uikit-timepicker", ["uikit"], function() {
            return e || t(UIkit)
        })
    }(function(o) {
        "use strict";
        o.component("timepicker", {
            defaults: {
                format: "24h",
                delay: 0,
                start: 0,
                end: 24
            },
            boot: function() {
                o.$html.on("focus.timepicker.uikit", "[data-uk-timepicker]", function(t) {
                    var e = o.$(this);
                    if (!e.data("timepicker")) {
                        var i = o.timepicker(e, o.Utils.options(e.attr("data-uk-timepicker")));
                        setTimeout(function() {
                            i.autocomplete.input.focus()
                        }, 40)
                    }
                })
            },
            init: function() {
                var t, e = this,
                    i = function(t, e) {
                        e = e || 24;
                        var i, o, n = {
                            "12h": [],
                            "24h": []
                        };
                        for (i = t = t || 0, o = ""; i < e; i++) o = "" + i, i < 10 && (o = "0" + o), n["24h"].push({
                            value: o + ":00"
                        }), n["24h"].push({
                            value: o + ":30"
                        }), 0 === i && (o = 12, n["12h"].push({
                            value: o + ":00 AM"
                        }), n["12h"].push({
                            value: o + ":30 AM"
                        })), 0 < i && i < 13 && 12 !== i && (n["12h"].push({
                            value: o + ":00 AM"
                        }), n["12h"].push({
                            value: o + ":30 AM"
                        })), 12 <= i && (0 === (o -= 12) && (o = 12), o < 10 && (o = "0" + String(o)), n["12h"].push({
                            value: o + ":00 PM"
                        }), n["12h"].push({
                            value: o + ":30 PM"
                        }));
                        return n
                    }(this.options.start, this.options.end);
                this.options.minLength = 0, this.options.template = '<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">{{~items}}<li data-value="{{$item.value}}"><a class="needsclick">{{$item.value}}</a></li>{{/items}}</ul>', this.options.source = function(t) {
                    t(i[e.options.format] || i["12h"])
                }, t = this.element.is("input") ? (this.element.wrap('<div class="uk-autocomplete"></div>'), this.element.parent()) : this.element.addClass("uk-autocomplete"), this.autocomplete = o.autocomplete(t, this.options), this.autocomplete.dropdown.addClass("uk-dropdown-small uk-dropdown-scrollable"), this.autocomplete.on("show.uk.autocomplete", function() {
                    var t = e.autocomplete.dropdown.find('[data-value="' + e.autocomplete.input.val() + '"]');
                    setTimeout(function() {
                        e.autocomplete.pick(t, !0)
                    }, 10)
                }), this.autocomplete.input.on("focus", function() {
                    e.autocomplete.value = Math.random(), e.autocomplete.triggercomplete()
                }).on("blur", o.Utils.debounce(function() {
                    e.checkTime()
                }, 100)), this.element.data("timepicker", this)
            },
            checkTime: function() {
                var t, e, i, o, n = "AM",
                    s = this.autocomplete.input.val();
                "12h" == this.options.format ? (e = (t = s.split(" "))[0].split(":"), n = t[1]) : e = s.split(":"), i = parseInt(e[0], 10), o = parseInt(e[1], 10), isNaN(i) && (i = 0), isNaN(o) && (o = 0), "12h" == this.options.format ? ((12 < i || i < 0) && (i = 12), "am" === n || "a" === n ? n = "AM" : "pm" !== n && "p" !== n || (n = "PM"), "AM" !== n && "PM" !== n && (n = "AM")) : 24 <= i ? i = 23 : i < 0 && (i = 0), (o < 0 || 60 <= o) && (o = 0), this.autocomplete.input.val(this.formatTime(i, o, n)).trigger("change")
            },
            formatTime: function(t, e, i) {
                return (t = t < 10 ? "0" + t : t) + ":" + (e = e < 10 ? "0" + e : e) + ("12h" == this.options.format ? " " + i : "")
            }
        })
    }), function(t) {
        var e;
        window.UIkit2 && (e = t(UIkit2)), "function" == typeof define && define.amd && define("uikit-upload", ["uikit"], function() {
            return e || t(UIkit2)
        })
    }(function(d) {
        "use strict";
        var t, e;

        function h(i, o) {
            if (!d.support.ajaxupload) return this;
            if (o = d.$.extend({}, h.defaults, o), i.length) {
                if ("*.*" !== o.allow)
                    for (var t, e = 0; t = i[e]; e++)
                        if (!u(o.allow, t.name)) return void("string" == typeof o.notallowed ? alert(o.notallowed) : o.notallowed(t, o));
                var n = o.complete;
                if (o.single) {
                    var s = i.length,
                        a = 0,
                        r = !0;
                    o.beforeAll(i), o.complete = function(t, e) {
                        a += 1, n(t, e), o.filelimit && a >= o.filelimit && (r = !1), r && a < s ? l([i[a]], o) : o.allcomplete(t, e)
                    }, l([i[0]], o)
                } else o.complete = function(t, e) {
                    n(t, e), o.allcomplete(t, e)
                }, l(i, o)
            }

            function l(t, i) {
                var e = new FormData,
                    o = new XMLHttpRequest;
                if (!1 !== i.before(i, t)) {
                    for (var n, s = 0; n = t[s]; s++) e.append(i.param, n);
                    for (var a in i.params) e.append(a, i.params[a]);
                    for (var r in o.upload.addEventListener("progress", function(t) {
                            var e = t.loaded / t.total * 100;
                            i.progress(e, t)
                        }, !1), o.addEventListener("loadstart", function(t) {
                            i.loadstart(t)
                        }, !1), o.addEventListener("load", function(t) {
                            i.load(t)
                        }, !1), o.addEventListener("loadend", function(t) {
                            i.loadend(t)
                        }, !1), o.addEventListener("error", function(t) {
                            i.error(t)
                        }, !1), o.addEventListener("abort", function(t) {
                            i.abort(t)
                        }, !1), o.open(i.method, i.action, !0), "json" == i.type && o.setRequestHeader("Accept", "application/json"), i.headers) o.setRequestHeader(r, i.headers[r]);
                    o.onreadystatechange = function() {
                        if (i.readystatechange(o), 4 == o.readyState) {
                            var e = o.responseText;
                            if ("json" == i.type) try {
                                e = d.$.parseJSON(e)
                            } catch (t) {
                                e = !1
                            }
                            i.complete(e, o)
                        }
                    }, i.beforeSend(o), o.send(e)
                }
            }
        }

        function u(t, e) {
            var i = "^" + t.replace(/\//g, "\\/").replace(/\*\*/g, "(\\/[^\\/]+)*").replace(/\*/g, "[^\\/]+").replace(/((?!\\))\?/g, "$1.") + "$";
            return i = "^" + i + "$", null !== e.match(new RegExp(i, "i"))
        }
        return d.component("uploadSelect", {
            init: function() {
                var e = this;
                this.on("change", function() {
                    h(e.element[0].files, e.options);
                    var t = e.element.clone(!0).data("uploadSelect", e);
                    e.element.replaceWith(t), e.element = t
                })
            }
        }), d.component("uploadDrop", {
            defaults: {
                dragoverClass: "uk-dragover"
            },
            init: function() {
                var e = this,
                    i = !1;
                this.on("drop", function(t) {
                    t.originalEvent.dataTransfer && t.originalEvent.dataTransfer.files && (t.stopPropagation(), t.preventDefault(), e.element.removeClass(e.options.dragoverClass), e.element.trigger("dropped.uk.upload", [t.originalEvent.dataTransfer.files]), h(t.originalEvent.dataTransfer.files, e.options))
                }).on("dragenter", function(t) {
                    t.stopPropagation(), t.preventDefault()
                }).on("dragover", function(t) {
                    t.stopPropagation(), t.preventDefault(), i || (e.element.addClass(e.options.dragoverClass), i = !0)
                }).on("dragleave", function(t) {
                    t.stopPropagation(), t.preventDefault(), e.element.removeClass(e.options.dragoverClass), i = !1
                })
            }
        }), d.support.ajaxupload = ((e = document.createElement("INPUT")).type = "file", "files" in e && !!((t = new XMLHttpRequest) && "upload" in t && "onprogress" in t.upload) && !!window.FormData), h.defaults = {
            action: "",
            single: !0,
            method: "POST",
            param: "files[]",
            params: {},
            allow: "*.*",
            type: "text",
            filelimit: !1,
            headers: {},
            before: function(t) {},
            beforeSend: function(t) {},
            beforeAll: function() {},
            loadstart: function() {},
            load: function() {},
            loadend: function() {},
            error: function() {},
            abort: function() {},
            progress: function() {},
            complete: function() {},
            allcomplete: function() {},
            readystatechange: function() {},
            notallowed: function(t, e) {
                alert("Only the following file types are allowed: " + e.allow)
            }
        }, d.Utils.xhrupload = h
    }), "undefined" != typeof UIkit) {
    var $body = $("body");
    UIkit.on("beforeready.uk.dom", function() {
        var e, t;
        void 0 !== UIkit.components.accordion && $.extend(UIkit.components.accordion.prototype.defaults, {
            easing: $.bez([.35, 0, .25, 1]),
            duration: 200
        }), void 0 !== UIkit.components.dropdown.prototype && ($.extend(UIkit.components.dropdown.prototype.defaults, {
            remaintime: 150,
            delay: 50
        }), t = UIkit.components.dropdown.prototype.show, UIkit.components.dropdown.prototype.show = function() {
            return this.dropdown.css({
                "min-width": this.dropdown.outerWidth()
            }).addClass("uk-dropdown-active uk-dropdown-shown"), t.apply(this, arguments)
        }, e = UIkit.components.dropdown.prototype.hide, UIkit.components.dropdown.prototype.hide = function() {
            var t = this.dropdown;
            t.removeClass("uk-dropdown-shown");
            setTimeout(function() {
                t.removeClass("uk-dropdown-active")
            }, 280);
            return e.apply(this, arguments)
        }), void 0 !== UIkit.components.modal && ($.extend(UIkit.components.modal.prototype.defaults, {
            center: !0
        }), UIkit.modal.dialog.template = '<div class="uk-modal uk-modal-dialog-replace"><div class="uk-modal-dialog" style="min-height:0;"></div></div>', $body.on("show.uk.modal", ".uk-modal-dialog-replace", function() {
            setTimeout(function() {
                var t = $(".uk-modal-dialog-replace");
                if (t.find(".uk-button-primary").length) {
                    var e = t.find(".uk-button-primary").toggleClass("uk-button-primary md-btn-flat-primary");
                    e.next("button") && e.next("button").after(e)
                }
                t.find(".uk-button").length && t.find(".uk-button").toggleClass("uk-button md-btn md-btn-flat"), t.find(".uk-margin-small-top").length && t.find(".uk-margin-small-top").toggleClass("uk-margin-small-top uk-margin-top"), t.find("input.uk-width-1-1").length && (t.find("input.uk-width-1-1").toggleClass("uk-width-1-1 md-input"), altair_md.inputs()), t.find(".uk-form").length && t.find(".uk-form").removeClass("uk-form")
            }, 50)
        })), void 0 !== UIkit.components.tab && $.extend(UIkit.components.tab.prototype.defaults, {
            swiping: !1
        }), void 0 !== UIkit.components.tooltip && $.extend(UIkit.components.tooltip.prototype.defaults, {
            animation: !UIkit.support.touch && 280,
            offset: 8
        }), void 0 !== UIkit.components.sortable && Modernizr.touch && $("[data-uk-sortable]").children().addClass("needsclick")
    })
}