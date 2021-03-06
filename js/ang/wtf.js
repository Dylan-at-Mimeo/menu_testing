if(function(global, factory) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
    if(!w.document) throw new Error("jQuery requires a window with a document");
    return factory(w)
  } : factory(global)
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
  function isArraylike(obj) {
    var length = obj.length,
      type = jQuery.type(obj);
    return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj
  }

  function winnow(elements, qualifier, not) {
    if(jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
      return !!qualifier.call(elem, i, elem) !== not
    });
    if(qualifier.nodeType) return jQuery.grep(elements, function(elem) {
      return elem === qualifier !== not
    });
    if("string" == typeof qualifier) {
      if(risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
      qualifier = jQuery.filter(qualifier, elements)
    }
    return jQuery.grep(elements, function(elem) {
      return indexOf.call(qualifier, elem) >= 0 !== not
    })
  }

  function sibling(cur, dir) {
    for(;
      (cur = cur[dir]) && 1 !== cur.nodeType;);
    return cur
  }

  function createOptions(options) {
    var object = optionsCache[options] = {};
    return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
      object[flag] = !0
    }), object
  }

  function completed() {
    document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), jQuery.ready()
  }

  function Data() {
    Object.defineProperty(this.cache = {}, 0, {
      get: function() {
        return {}
      }
    }), this.expando = jQuery.expando + Math.random()
  }

  function dataAttr(elem, key, data) {
    var name;
    if(void 0 === data && 1 === elem.nodeType)
      if(name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase(), data = elem.getAttribute(name), "string" == typeof data) {
        try {
          data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
        } catch(e) {}
        data_user.set(elem, key, data)
      } else data = void 0;
    return data
  }

  function returnTrue() {
    return !0
  }

  function returnFalse() {
    return !1
  }

  function safeActiveElement() {
    try {
      return document.activeElement
    } catch(err) {}
  }

  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
  }

  function disableScript(elem) {
    return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem
  }

  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    return match ? elem.type = match[1] : elem.removeAttribute("type"), elem
  }

  function setGlobalEval(elems, refElements) {
    for(var i = 0, l = elems.length; l > i; i++) data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"))
  }

  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
    if(1 === dest.nodeType) {
      if(data_priv.hasData(src) && (pdataOld = data_priv.access(src), pdataCur = data_priv.set(dest, pdataOld), events = pdataOld.events)) {
        delete pdataCur.handle, pdataCur.events = {};
        for(type in events)
          for(i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i])
      }
      data_user.hasData(src) && (udataOld = data_user.access(src), udataCur = jQuery.extend({}, udataOld), data_user.set(dest, udataCur))
    }
  }

  function getAll(context, tag) {
    var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
    return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret
  }

  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue)
  }

  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
      display = window.getDefaultComputedStyle ? window.getDefaultComputedStyle(elem[0]).display : jQuery.css(elem[0], "display");
    return elem.detach(), display
  }

  function defaultDisplay(nodeName) {
    var doc = document,
      display = elemdisplay[nodeName];
    return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), display
  }

  function curCSS(elem, name, computed) {
    var width, minWidth, maxWidth, ret, style = elem.style;
    return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name]), computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), void 0 !== ret ? ret + "" : ret
  }

  function addGetHookIf(conditionFn, hookFn) {
    return {
      get: function() {
        return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments)
      }
    }
  }

  function vendorPropName(style, name) {
    if(name in style) return name;
    for(var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--;)
      if(name = cssPrefixes[i] + capName, name in style) return name;
    return origName
  }

  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
  }

  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    for(var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
    return val
  }

  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = !0,
      val = "width" === name ? elem.offsetWidth : elem.offsetHeight,
      styles = getStyles(elem),
      isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
    if(0 >= val || null == val) {
      if(val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) return val;
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), val = parseFloat(val) || 0
    }
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
  }

  function showHide(elements, show) {
    for(var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], elem.style && (values[index] = data_priv.get(elem, "olddisplay"), display = elem.style.display, show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : values[index] || (hidden = isHidden(elem), (display && "none" !== display || !hidden) && data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
    for(index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
    return elements
  }

  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing)
  }

  function createFxNow() {
    return setTimeout(function() {
      fxNow = void 0
    }), fxNow = jQuery.now()
  }

  function genFx(type, includeWidth) {
    var which, i = 0,
      attrs = {
        height: type
      };
    for(includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], attrs["margin" + which] = attrs["padding" + which] = type;
    return includeWidth && (attrs.opacity = attrs.width = type), attrs
  }

  function createTween(value, prop, animation) {
    for(var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++)
      if(tween = collection[index].call(animation, prop, value)) return tween
  }

  function defaultPrefilter(elem, props, opts) {
    var prop, value, toggle, tween, hooks, oldfire, display, anim = this,
      orig = {}, style = elem.style,
      hidden = elem.nodeType && isHidden(elem),
      dataShow = data_priv.get(elem, "fxshow");
    opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() {
      hooks.unqueued || oldfire()
    }), hooks.unqueued++, anim.always(function() {
      anim.always(function() {
        hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire()
      })
    })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], display = jQuery.css(elem, "display"), "none" === display && (display = defaultDisplay(elem.nodeName)), "inline" === display && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", anim.always(function() {
      style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2]
    }));
    for(prop in props)
      if(value = props[prop], rfxtypes.exec(value)) {
        if(delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
          if("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
          hidden = !0
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
      }
    if(!jQuery.isEmptyObject(orig)) {
      dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = data_priv.access(elem, "fxshow", {}), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
        jQuery(elem).hide()
      }), anim.done(function() {
        var prop;
        data_priv.remove(elem, "fxshow");
        for(prop in orig) jQuery.style(elem, prop, orig[prop])
      });
      for(prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0))
    }
  }

  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for(index in props)
      if(name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
        value = hooks.expand(value), delete props[name];
        for(index in value) index in props || (props[index] = value[index], specialEasing[index] = easing)
      } else specialEasing[name] = easing
  }

  function Animation(elem, properties, options) {
    var result, stopped, index = 0,
      length = animationPrefilters.length,
      deferred = jQuery.Deferred().always(function() {
        delete tick.elem
      }),
      tick = function() {
        if(stopped) return !1;
        for(var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
        return deferred.notifyWith(elem, [animation, percent, remaining]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]), !1)
      }, animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(!0, {
          specialEasing: {}
        }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function(prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          return animation.tweens.push(tween), tween
        },
        stop: function(gotoEnd) {
          var index = 0,
            length = gotoEnd ? animation.tweens.length : 0;
          if(stopped) return this;
          for(stopped = !0; length > index; index++) animation.tweens[index].run(1);
          return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]), this
        }
      }),
      props = animation.props;
    for(propFilter(props, animation.opts.specialEasing); length > index; index++)
      if(result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
    return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
  }

  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
      var dataType, i = 0,
        dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if(jQuery.isFunction(func))
        for(; dataType = dataTypes[i++];) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func)
    }
  }

  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    function inspect(dataType) {
      var selected;
      return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), !1)
      }), selected
    }
    var inspected = {}, seekingTransport = structure === transports;
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
  }

  function ajaxExtend(target, src) {
    var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for(key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
    return deep && jQuery.extend(!0, target, deep), target
  }

  function ajaxHandleResponses(s, jqXHR, responses) {
    for(var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
      "*" === dataTypes[0];) dataTypes.shift(), void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
    if(ct)
      for(type in contents)
        if(contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break
        }
    if(dataTypes[0] in responses) finalDataType = dataTypes[0];
    else {
      for(type in responses) {
        if(!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break
        }
        firstDataType || (firstDataType = type)
      }
      finalDataType = finalDataType || firstDataType
    }
    return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0
  }

  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
    if(dataTypes[1])
      for(conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
    for(current = dataTypes.shift(); current;)
      if(s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = dataTypes.shift())
        if("*" === current) current = prev;
        else if("*" !== prev && prev !== current) {
      if(conv = converters[prev + " " + current] || converters["* " + current], !conv)
        for(conv2 in converters)
          if(tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
            conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.unshift(tmp[1]));
            break
          }
      if(conv !== !0)
        if(conv && s["throws"]) response = conv(response);
        else try {
          response = conv(response)
        } catch(e) {
          return {
            state: "parsererror",
            error: conv ? e : "No conversion from " + prev + " to " + current
          }
        }
    }
    return {
      state: "success",
      data: response
    }
  }

  function buildParams(prefix, obj, traditional, add) {
    var name;
    if(jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
      traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add)
    });
    else if(traditional || "object" !== jQuery.type(obj)) add(prefix, obj);
    else
      for(name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
  }

  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView
  }
  var arr = [],
    slice = arr.slice,
    concat = arr.concat,
    push = arr.push,
    indexOf = arr.indexOf,
    class2type = {}, toString = class2type.toString,
    hasOwn = class2type.hasOwnProperty,
    trim = "".trim,
    support = {}, document = window.document,
    version = "2.1.0",
    jQuery = function(selector, context) {
      return new jQuery.fn.init(selector, context)
    }, rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,
    fcamelCase = function(all, letter) {
      return letter.toUpperCase()
    };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: "",
    length: 0,
    toArray: function() {
      return slice.call(this)
    },
    get: function(num) {
      return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this)
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      return ret.prevObject = this, ret.context = this.context, ret
    },
    each: function(callback, args) {
      return jQuery.each(this, callback, args)
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem)
      }))
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    eq: function(i) {
      var len = this.length,
        j = +i + (0 > i ? len : 0);
      return this.pushStack(j >= 0 && len > j ? [this[j]] : [])
    },
    end: function() {
      return this.prevObject || this.constructor(null)
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  }, jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1,
      length = arguments.length,
      deep = !1;
    for("boolean" == typeof target && (deep = target, target = arguments[i] || {}, i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, i--); length > i; i++)
      if(null != (options = arguments[i]))
        for(name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
    return target
  }, jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function(msg) {
      throw new Error(msg)
    },
    noop: function() {},
    isFunction: function(obj) {
      return "function" === jQuery.type(obj)
    },
    isArray: Array.isArray,
    isWindow: function(obj) {
      return null != obj && obj === obj.window
    },
    isNumeric: function(obj) {
      return obj - parseFloat(obj) >= 0
    },
    isPlainObject: function(obj) {
      if("object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
      try {
        if(obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1
      } catch(e) {
        return !1
      }
      return !0
    },
    isEmptyObject: function(obj) {
      var name;
      for(name in obj) return !1;
      return !0
    },
    type: function(obj) {
      return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj
    },
    globalEval: function(code) {
      var script, indirect = eval;
      code = jQuery.trim(code), code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
    },
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
    },
    each: function(obj, callback, args) {
      var value, i = 0,
        length = obj.length,
        isArray = isArraylike(obj);
      if(args) {
        if(isArray)
          for(; length > i && (value = callback.apply(obj[i], args), value !== !1); i++);
        else
          for(i in obj)
            if(value = callback.apply(obj[i], args), value === !1) break
      } else if(isArray)
        for(; length > i && (value = callback.call(obj[i], i, obj[i]), value !== !1); i++);
      else
        for(i in obj)
          if(value = callback.call(obj[i], i, obj[i]), value === !1) break; return obj
    },
    trim: function(text) {
      return null == text ? "" : trim.call(text)
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : push.call(ret, arr)), ret
    },
    inArray: function(elem, arr, i) {
      return null == arr ? -1 : indexOf.call(arr, elem, i)
    },
    merge: function(first, second) {
      for(var len = +second.length, j = 0, i = first.length; len > j; j++) first[i++] = second[j];
      return first.length = i, first
    },
    grep: function(elems, callback, invert) {
      for(var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), callbackInverse !== callbackExpect && matches.push(elems[i]);
      return matches
    },
    map: function(elems, callback, arg) {
      var value, i = 0,
        length = elems.length,
        isArray = isArraylike(elems),
        ret = [];
      if(isArray)
        for(; length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value);
      else
        for(i in elems) value = callback(elems[i], i, arg), null != value && ret.push(value);
      return concat.apply([], ret)
    },
    guid: 1,
    proxy: function(fn, context) {
      var tmp, args, proxy;
      return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)))
      }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0
    },
    now: Date.now,
    support: support
  }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase()
  });
  var Sizzle = function(window) {
    function Sizzle(selector, context, results, seed) {
      var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
      if((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, results = results || [], !selector || "string" != typeof selector) return results;
      if(1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
      if(documentIsHTML && !seed) {
        if(match = rquickExpr.exec(selector))
          if(m = match[1]) {
            if(9 === nodeType) {
              if(elem = context.getElementById(m), !elem || !elem.parentNode) return results;
              if(elem.id === m) return results.push(elem), results
            } else if(context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), results
          } else {
            if(match[2]) return push.apply(results, context.getElementsByTagName(selector)), results;
            if((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), results
          }
        if(support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          if(nid = old = expando, newContext = context, newSelector = 9 === nodeType && selector, 1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
            for(groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), nid = "[id='" + nid + "'] ", i = groups.length; i--;) groups[i] = nid + toSelector(groups[i]);
            newContext = rsibling.test(selector) && testContext(context.parentNode) || context, newSelector = groups.join(",")
          }
          if(newSelector) try {
            return push.apply(results, newContext.querySelectorAll(newSelector)), results
          } catch(qsaError) {} finally {
            old || context.removeAttribute("id")
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed)
    }

    function createCache() {
      function cache(key, value) {
        return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value
      }
      var keys = [];
      return cache
    }

    function markFunction(fn) {
      return fn[expando] = !0, fn
    }

    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div)
      } catch(e) {
        return !1
      } finally {
        div.parentNode && div.parentNode.removeChild(div), div = null
      }
    }

    function addHandle(attrs, handler) {
      for(var arr = attrs.split("|"), i = attrs.length; i--;) Expr.attrHandle[arr[i]] = handler
    }

    function siblingCheck(a, b) {
      var cur = b && a,
        diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if(diff) return diff;
      if(cur)
        for(; cur = cur.nextSibling;)
          if(cur === b) return -1;
      return a ? 1 : -1
    }

    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return "input" === name && elem.type === type
      }
    }

    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return("input" === name || "button" === name) && elem.type === type
      }
    }

    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        return argument = +argument, markFunction(function(seed, matches) {
          for(var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
        })
      })
    }

    function testContext(context) {
      return context && typeof context.getElementsByTagName !== strundefined && context
    }

    function setFilters() {}

    function tokenize(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
      if(cached) return parseOnly ? 0 : cached.slice(0);
      for(soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) {
        (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), tokens.push({
          value: matched,
          type: match[0].replace(rtrim, " ")
        }), soFar = soFar.slice(matched.length));
        for(type in Expr.filter)!(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), tokens.push({
          value: matched,
          type: type,
          matches: match
        }), soFar = soFar.slice(matched.length));
        if(!matched) break
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
    }

    function toSelector(tokens) {
      for(var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
      return selector
    }

    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
        checkNonElements = base && "parentNode" === dir,
        doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        for(; elem = elem[dir];)
          if(1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml)
      } : function(elem, context, xml) {
        var oldCache, outerCache, newCache = [dirruns, doneName];
        if(xml) {
          for(; elem = elem[dir];)
            if((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0
        } else
          for(; elem = elem[dir];)
            if(1 === elem.nodeType || checkNonElements) {
              if(outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
              if(outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0
            }
      }
    }

    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        for(var i = matchers.length; i--;)
          if(!matchers[i](elem, context, xml)) return !1;
        return !0
      } : matchers[0]
    }

    function condense(unmatched, map, filter, context, xml) {
      for(var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++)(elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), mapped && map.push(i));
      return newUnmatched
    }

    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function(seed, results, context, xml) {
        var temp, i, elem, preMap = [],
          postMap = [],
          preexisting = results.length,
          elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
          matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml),
          matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if(matcher && matcher(matcherIn, matcherOut, context, xml), postFilter)
          for(temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;)(elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
        if(seed) {
          if(postFinder || preFilter) {
            if(postFinder) {
              for(temp = [], i = matcherOut.length; i--;)(elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
              postFinder(null, matcherOut = [], temp, xml)
            }
            for(i = matcherOut.length; i--;)(elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
          }
        } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
      })
    }

    function matcherFromTokens(tokens) {
      for(var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
          return elem === checkContext
        }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
          return indexOf.call(checkContext, elem) > -1
        }, implicitRelative, !0), matchers = [
          function(elem, context, xml) {
            return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
          }
        ]; len > i; i++)
        if(matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)];
        else {
          if(matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
            for(j = ++i; len > j && !Expr.relative[tokens[j].type]; j++);
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
              value: " " === tokens[i - 2].type ? "*" : ""
            })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens))
          }
          matchers.push(matcher)
        }
      return elementMatcher(matchers)
    }

    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function(seed, context, xml, results, outermost) {
          var elem, j, matcher, matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            setMatched = [],
            contextBackup = outermostContext,
            elems = seed || byElement && Expr.find.TAG("*", outermost),
            dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1,
            len = elems.length;
          for(outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
            if(byElement && elem) {
              for(j = 0; matcher = elementMatchers[j++];)
                if(matcher(elem, context, xml)) {
                  results.push(elem);
                  break
                }
              outermost && (dirruns = dirrunsUnique)
            }
            bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem))
          }
          if(matchedCount += i, bySet && i !== matchedCount) {
            for(j = 0; matcher = setMatchers[j++];) matcher(unmatched, setMatched, context, xml);
            if(seed) {
              if(matchedCount > 0)
                for(; i--;) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
              setMatched = condense(setMatched)
            }
            push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
          }
          return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched
        };
      return bySet ? markFunction(superMatcher) : superMatcher
    }

    function multipleContexts(selector, contexts, results) {
      for(var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
      return results
    }

    function select(selector, context, results, seed) {
      var i, tokens, token, type, find, match = tokenize(selector);
      if(!seed && 1 === match.length) {
        if(tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
          if(context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], !context) return results;
          selector = selector.slice(tokens.shift().value.length)
        }
        for(i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], !Expr.relative[type = token.type]);)
          if((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
            if(tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), results;
            break
          }
      }
      return compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), results
    }
    var i, support, Expr, getText, isXML, compile, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date,
      preferredDoc = window.document,
      dirruns = 0,
      done = 0,
      classCache = createCache(),
      tokenCache = createCache(),
      compilerCache = createCache(),
      sortOrder = function(a, b) {
        return a === b && (hasDuplicate = !0), 0
      }, strundefined = "undefined",
      MAX_NEGATIVE = 1 << 31,
      hasOwn = {}.hasOwnProperty,
      arr = [],
      pop = arr.pop,
      push_native = arr.push,
      push = arr.push,
      slice = arr.slice,
      indexOf = arr.indexOf || function(elem) {
        for(var i = 0, len = this.length; len > i; i++)
          if(this[i] === elem) return i;
        return -1
      }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      whitespace = "[\\x20\\t\\r\\n\\f]",
      characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      identifier = characterEncoding.replace("w", "w#"),
      attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
      pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",
      rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
      rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
      rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
      rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
      rpseudo = new RegExp(pseudos),
      ridentifier = new RegExp("^" + identifier + "$"),
      matchExpr = {
        ID: new RegExp("^#(" + characterEncoding + ")"),
        CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
        TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + attributes),
        PSEUDO: new RegExp("^" + pseudos),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + booleans + ")$", "i"),
        needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
      }, rinputs = /^(?:input|select|textarea|button)$/i,
      rheader = /^h\d$/i,
      rnative = /^[^{]+\{\s*\[native \w/,
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      rsibling = /[+~]/,
      rescape = /'|\\/g,
      runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
      funescape = function(_, escaped, escapedWhitespace) {
        var high = "0x" + escaped - 65536;
        return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320)
      };
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), arr[preferredDoc.childNodes.length].nodeType
    } catch(e) {
      push = {
        apply: arr.length ? function(target, els) {
          push_native.apply(target, slice.call(els))
        } : function(target, els) {
          for(var j = target.length, i = 0; target[j++] = els[i++];);
          target.length = j - 1
        }
      }
    }
    support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? "HTML" !== documentElement.nodeName : !1
    }, setDocument = Sizzle.setDocument = function(node) {
      var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc,
        parent = doc.defaultView;
      return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = doc.documentElement, documentIsHTML = !isXML(doc), parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", function() {
        setDocument()
      }, !1) : parent.attachEvent && parent.attachEvent("onunload", function() {
        setDocument()
      })), support.attributes = assert(function(div) {
        return div.className = "i", !div.getAttribute("className")
      }), support.getElementsByTagName = assert(function(div) {
        return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length
      }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
        return div.innerHTML = "<div class='a'></div><div class='a i'></div>", div.firstChild.className = "i", 2 === div.getElementsByClassName("i").length
      }), support.getById = assert(function(div) {
        return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length
      }), support.getById ? (Expr.find.ID = function(id, context) {
        if(typeof context.getElementById !== strundefined && documentIsHTML) {
          var m = context.getElementById(id);
          return m && m.parentNode ? [m] : []
        }
      }, Expr.filter.ID = function(id) {
        var attrId = id.replace(runescape, funescape);
        return function(elem) {
          return elem.getAttribute("id") === attrId
        }
      }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
        var attrId = id.replace(runescape, funescape);
        return function(elem) {
          var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
          return node && node.value === attrId
        }
      }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
        return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0
      } : function(tag, context) {
        var elem, tmp = [],
          i = 0,
          results = context.getElementsByTagName(tag);
        if("*" === tag) {
          for(; elem = results[i++];) 1 === elem.nodeType && tmp.push(elem);
          return tmp
        }
        return results
      }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
        return typeof context.getElementsByClassName !== strundefined && documentIsHTML ? context.getElementsByClassName(className) : void 0
      }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
        div.innerHTML = "<select t=''><option selected=''></option></select>", div.querySelectorAll("[t^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked")
      }), assert(function(div) {
        var input = doc.createElement("input");
        input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:")
      })), (support.matchesSelector = rnative.test(matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
        support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), rbuggyMatches.push("!=", pseudos)
      }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = 9 === a.nodeType ? a.documentElement : a,
          bup = b && b.parentNode;
        return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
      } : function(a, b) {
        if(b)
          for(; b = b.parentNode;)
            if(b === a) return !0;
        return !1
      }, sortOrder = hasCompare ? function(a, b) {
        if(a === b) return hasDuplicate = !0, 0;
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0 : 4 & compare ? -1 : 1)
      } : function(a, b) {
        if(a === b) return hasDuplicate = !0, 0;
        var cur, i = 0,
          aup = a.parentNode,
          bup = b.parentNode,
          ap = [a],
          bp = [b];
        if(!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
        if(aup === bup) return siblingCheck(a, b);
        for(cur = a; cur = cur.parentNode;) ap.unshift(cur);
        for(cur = b; cur = cur.parentNode;) bp.unshift(cur);
        for(; ap[i] === bp[i];) i++;
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
      }, doc) : document
    }, Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements)
    }, Sizzle.matchesSelector = function(elem, expr) {
      if((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), !(!support.matchesSelector || !documentIsHTML || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
        var ret = matches.call(elem, expr);
        if(ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret
      } catch(e) {}
      return Sizzle(expr, document, null, [elem]).length > 0
    }, Sizzle.contains = function(context, elem) {
      return(context.ownerDocument || context) !== document && setDocument(context), contains(context, elem)
    }, Sizzle.attr = function(elem, name) {
      (elem.ownerDocument || elem) !== document && setDocument(elem);
      var fn = Expr.attrHandle[name.toLowerCase()],
        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
      return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
    }, Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg)
    }, Sizzle.uniqueSort = function(results) {
      var elem, duplicates = [],
        j = 0,
        i = 0;
      if(hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), results.sort(sortOrder), hasDuplicate) {
        for(; elem = results[i++];) elem === results[i] && (j = duplicates.push(i));
        for(; j--;) results.splice(duplicates[j], 1)
      }
      return sortInput = null, results
    }, getText = Sizzle.getText = function(elem) {
      var node, ret = "",
        i = 0,
        nodeType = elem.nodeType;
      if(nodeType) {
        if(1 === nodeType || 9 === nodeType || 11 === nodeType) {
          if("string" == typeof elem.textContent) return elem.textContent;
          for(elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem)
        } else if(3 === nodeType || 4 === nodeType) return elem.nodeValue
      } else
        for(; node = elem[i++];) ret += getText(node);
      return ret
    }, Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
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
        ATTR: function(match) {
          return match[1] = match[1].replace(runescape, funescape), match[3] = (match[4] || match[5] || "").replace(runescape, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4)
        },
        CHILD: function(match) {
          return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match
        },
        PSEUDO: function(match) {
          var excess, unquoted = !match[5] && match[2];
          return matchExpr.CHILD.test(match[0]) ? null : (match[3] && void 0 !== match[4] ? match[2] = match[4] : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3))
        }
      },
      filter: {
        TAG: function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return "*" === nodeNameSelector ? function() {
            return !0
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
          }
        },
        CLASS: function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test("string" == typeof elem.className && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
          })
        },
        ATTR: function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0
          }
        },
        CHILD: function(type, what, argument, first, last) {
          var simple = "nth" !== type.slice(0, 3),
            forward = "last" !== type.slice(-4),
            ofType = "of-type" === what;
          return 1 === first && 0 === last ? function(elem) {
            return !!elem.parentNode
          } : function(elem, context, xml) {
            var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
              parent = elem.parentNode,
              name = ofType && elem.nodeName.toLowerCase(),
              useCache = !xml && !ofType;
            if(parent) {
              if(simple) {
                for(; dir;) {
                  for(node = elem; node = node[dir];)
                    if(ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                  start = dir = "only" === type && !start && "nextSibling"
                }
                return !0
              }
              if(start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                for(outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();)
                  if(1 === node.nodeType && ++diff && node === elem) {
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break
                  }
              } else if(useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1];
              else
                for(;
                  (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]), node !== elem)););
              return diff -= last, diff === first || diff % first === 0 && diff / first >= 0
            }
          }
        },
        PSEUDO: function(pseudo, argument) {
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
            for(var idx, matched = fn(seed, argument), i = matched.length; i--;) idx = indexOf.call(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i])
          }) : function(elem) {
            return fn(elem, 0, args)
          }) : fn
        }
      },
      pseudos: {
        not: markFunction(function(selector) {
          var input = [],
            results = [],
            matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
            for(var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--;)(elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
          }) : function(elem, context, xml) {
            return input[0] = elem, matcher(input, null, xml, results), !results.pop()
          }
        }),
        has: markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0
          }
        }),
        contains: markFunction(function(text) {
          return function(elem) {
            return(elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
          }
        }),
        lang: markFunction(function(lang) {
          return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(runescape, funescape).toLowerCase(),
          function(elem) {
            var elemLang;
            do
              if(elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while((elem = elem.parentNode) && 1 === elem.nodeType);
            return !1
          }
        }),
        target: function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id
        },
        root: function(elem) {
          return elem === docElem
        },
        focus: function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !! (elem.type || elem.href || ~elem.tabIndex)
        },
        enabled: function(elem) {
          return elem.disabled === !1
        },
        disabled: function(elem) {
          return elem.disabled === !0
        },
        checked: function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return "input" === nodeName && !! elem.checked || "option" === nodeName && !! elem.selected
        },
        selected: function(elem) {
          return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0
        },
        empty: function(elem) {
          for(elem = elem.firstChild; elem; elem = elem.nextSibling)
            if(elem.nodeType < 6) return !1;
          return !0
        },
        parent: function(elem) {
          return !Expr.pseudos.empty(elem)
        },
        header: function(elem) {
          return rheader.test(elem.nodeName)
        },
        input: function(elem) {
          return rinputs.test(elem.nodeName)
        },
        button: function(elem) {
          var name = elem.nodeName.toLowerCase();
          return "input" === name && "button" === elem.type || "button" === name
        },
        text: function(elem) {
          var attr;
          return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase())
        },
        first: createPositionalPseudo(function() {
          return [0]
        }),
        last: createPositionalPseudo(function(matchIndexes, length) {
          return [length - 1]
        }),
        eq: createPositionalPseudo(function(matchIndexes, length, argument) {
          return [0 > argument ? argument + length : argument]
        }),
        even: createPositionalPseudo(function(matchIndexes, length) {
          for(var i = 0; length > i; i += 2) matchIndexes.push(i);
          return matchIndexes
        }),
        odd: createPositionalPseudo(function(matchIndexes, length) {
          for(var i = 1; length > i; i += 2) matchIndexes.push(i);
          return matchIndexes
        }),
        lt: createPositionalPseudo(function(matchIndexes, length, argument) {
          for(var i = 0 > argument ? argument + length : argument; --i >= 0;) matchIndexes.push(i);
          return matchIndexes
        }),
        gt: createPositionalPseudo(function(matchIndexes, length, argument) {
          for(var i = 0 > argument ? argument + length : argument; ++i < length;) matchIndexes.push(i);
          return matchIndexes
        })
      }
    }, Expr.pseudos.nth = Expr.pseudos.eq;
    for(i in {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) Expr.pseudos[i] = createInputPseudo(i);
    for(i in {
      submit: !0,
      reset: !0
    }) Expr.pseudos[i] = createButtonPseudo(i);
    return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters, compile = Sizzle.compile = function(selector, group) {
      var i, setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[selector + " "];
      if(!cached) {
        for(group || (group = tokenize(selector)), i = group.length; i--;) cached = matcherFromTokens(group[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
      }
      return cached
    }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, support.detectDuplicates = !! hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
      return 1 & div1.compareDocumentPosition(document.createElement("div"))
    }), assert(function(div) {
      return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href")
    }) || addHandle("type|href|height|width", function(elem, name, isXML) {
      return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2)
    }), support.attributes && assert(function(div) {
      return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value")
    }) || addHandle("value", function(elem, name, isXML) {
      return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue
    }), assert(function(div) {
      return null == div.getAttribute("disabled")
    }) || addHandle(booleans, function(elem, name, isXML) {
      var val;
      return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
    }), Sizzle
  }(window);
  jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
  var rneedsContext = jQuery.expr.match.needsContext,
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    risSimple = /^.[^:#\[\.,]*$/;
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return 1 === elem.nodeType
    }))
  }, jQuery.fn.extend({
    find: function(selector) {
      var i, len = this.length,
        ret = [],
        self = this;
      if("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
        for(i = 0; len > i; i++)
          if(jQuery.contains(self[i], this)) return !0
      }));
      for(i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
      return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, ret
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], !1))
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], !0))
    },
    is: function(selector) {
      return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length
    }
  });
  var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    init = jQuery.fn.init = function(selector, context) {
      var match, elem;
      if(!selector) return this;
      if("string" == typeof selector) {
        if(match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
        if(match[1]) {
          if(context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
            for(match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
          return this
        }
        return elem = document.getElementById(match[2]), elem && elem.parentNode && (this.length = 1, this[0] = elem), this.context = document, this.selector = selector, this
      }
      return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this))
    };
  init.prototype = jQuery.fn, rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
    guaranteedUnique = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  jQuery.extend({
    dir: function(elem, dir, until) {
      for(var matched = [], truncate = void 0 !== until;
        (elem = elem[dir]) && 9 !== elem.nodeType;)
        if(1 === elem.nodeType) {
          if(truncate && jQuery(elem).is(until)) break;
          matched.push(elem)
        }
      return matched
    },
    sibling: function(n, elem) {
      for(var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
      return matched
    }
  }), jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
        l = targets.length;
      return this.filter(function() {
        for(var i = 0; l > i; i++)
          if(jQuery.contains(this, targets[i])) return !0
      })
    },
    closest: function(selectors, context) {
      for(var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++)
        for(cur = this[i]; cur && cur !== context; cur = cur.parentNode)
          if(cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break
          }
      return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched)
    },
    index: function(elem) {
      return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))))
    },
    addBack: function(selector) {
      return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
    }
  }), jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && 11 !== parent.nodeType ? parent : null
    },
    parents: function(elem) {
      return jQuery.dir(elem, "parentNode")
    },
    parentsUntil: function(elem, i, until) {
      return jQuery.dir(elem, "parentNode", until)
    },
    next: function(elem) {
      return sibling(elem, "nextSibling")
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling")
    },
    nextAll: function(elem) {
      return jQuery.dir(elem, "nextSibling")
    },
    prevAll: function(elem) {
      return jQuery.dir(elem, "previousSibling")
    },
    nextUntil: function(elem, i, until) {
      return jQuery.dir(elem, "nextSibling", until)
    },
    prevUntil: function(elem, i, until) {
      return jQuery.dir(elem, "previousSibling", until)
    },
    siblings: function(elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
    },
    children: function(elem) {
      return jQuery.sibling(elem.firstChild)
    },
    contents: function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes)
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), this.length > 1 && (guaranteedUnique[name] || jQuery.unique(matched), rparentsprev.test(name) && matched.reverse()), this.pushStack(matched)
    }
  });
  var rnotwhite = /\S+/g,
    optionsCache = {};
  jQuery.Callbacks = function(options) {
    options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var memory, fired, firing, firingStart, firingLength, firingIndex, list = [],
      stack = !options.once && [],
      fire = function(data) {
        for(memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++)
          if(list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
            memory = !1;
            break
          }
        firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable())
      }, self = {
        add: function() {
          if(list) {
            var start = list.length;
            ! function add(args) {
              jQuery.each(args, function(_, arg) {
                var type = jQuery.type(arg);
                "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg)
              })
            }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, fire(memory))
          }
          return this
        },
        remove: function() {
          return list && jQuery.each(arguments, function(_, arg) {
            for(var index;
              (index = jQuery.inArray(arg, list, index)) > -1;) list.splice(index, 1), firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--)
          }), this
        },
        has: function(fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length)
        },
        empty: function() {
          return list = [], firingLength = 0, this
        },
        disable: function() {
          return list = stack = memory = void 0, this
        },
        disabled: function() {
          return !list
        },
        lock: function() {
          return stack = void 0, memory || self.disable(), this
        },
        locked: function() {
          return !stack
        },
        fireWith: function(context, args) {
          return !list || fired && !stack || (args = args || [], args = [context, args.slice ? args.slice() : args], firing ? stack.push(args) : fire(args)), this
        },
        fire: function() {
          return self.fireWith(this, arguments), this
        },
        fired: function() {
          return !!fired
        }
      };
    return self
  }, jQuery.extend({
    Deferred: function(func) {
      var tuples = [
        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
        ["notify", "progress", jQuery.Callbacks("memory")]
      ],
        state = "pending",
        promise = {
          state: function() {
            return state
          },
          always: function() {
            return deferred.done(arguments).fail(arguments), this
          },
          then: function() {
            var fns = arguments;
            return jQuery.Deferred(function(newDefer) {
              jQuery.each(tuples, function(i, tuple) {
                var fn = jQuery.isFunction(fns[i]) && fns[i];
                deferred[tuple[1]](function() {
                  var returned = fn && fn.apply(this, arguments);
                  returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                })
              }), fns = null
            }).promise()
          },
          promise: function(obj) {
            return null != obj ? jQuery.extend(obj, promise) : promise
          }
        }, deferred = {};
      return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
          stateString = tuple[3];
        promise[tuple[1]] = list.add, stateString && list.add(function() {
          state = stateString
        }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
          return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this
        }, deferred[tuple[0] + "With"] = list.fireWith
      }), promise.promise(deferred), func && func.call(deferred, deferred), deferred
    },
    when: function(subordinate) {
      var progressValues, progressContexts, resolveContexts, i = 0,
        resolveValues = slice.call(arguments),
        length = resolveValues.length,
        remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
        deferred = 1 === remaining ? subordinate : jQuery.Deferred(),
        updateFunc = function(i, contexts, values) {
          return function(value) {
            contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
          }
        };
      if(length > 1)
        for(progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
      return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
    }
  });
  var readyList;
  jQuery.fn.ready = function(fn) {
    return jQuery.ready.promise().done(fn), this
  }, jQuery.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function(hold) {
      hold ? jQuery.readyWait++ : jQuery.ready(!0)
    },
    ready: function(wait) {
      (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready")))
    }
  }), jQuery.ready.promise = function(obj) {
    return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1))), readyList.promise(obj)
  }, jQuery.ready.promise();
  var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
      len = elems.length,
      bulk = null == key;
    if("object" === jQuery.type(key)) {
      chainable = !0;
      for(i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw)
    } else if(void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
      return bulk.call(jQuery(elem), value)
    })), fn))
      for(; len > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet
  };
  jQuery.acceptData = function(owner) {
    return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType
  }, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
    key: function(owner) {
      if(!Data.accepts(owner)) return 0;
      var descriptor = {}, unlock = owner[this.expando];
      if(!unlock) {
        unlock = Data.uid++;
        try {
          descriptor[this.expando] = {
            value: unlock
          }, Object.defineProperties(owner, descriptor)
        } catch(e) {
          descriptor[this.expando] = unlock, jQuery.extend(owner, descriptor)
        }
      }
      return this.cache[unlock] || (this.cache[unlock] = {}), unlock
    },
    set: function(owner, data, value) {
      var prop, unlock = this.key(owner),
        cache = this.cache[unlock];
      if("string" == typeof data) cache[data] = value;
      else if(jQuery.isEmptyObject(cache)) jQuery.extend(this.cache[unlock], data);
      else
        for(prop in data) cache[prop] = data[prop];
      return cache
    },
    get: function(owner, key) {
      var cache = this.cache[this.key(owner)];
      return void 0 === key ? cache : cache[key]
    },
    access: function(owner, key, value) {
      var stored;
      return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key), void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value), void 0 !== value ? value : key)
    },
    remove: function(owner, key) {
      var i, name, camel, unlock = this.key(owner),
        cache = this.cache[unlock];
      if(void 0 === key) this.cache[unlock] = {};
      else {
        jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key), key in cache ? name = [key, camel] : (name = camel, name = name in cache ? [name] : name.match(rnotwhite) || [])), i = name.length;
        for(; i--;) delete cache[name[i]]
      }
    },
    hasData: function(owner) {
      return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {})
    },
    discard: function(owner) {
      owner[this.expando] && delete this.cache[owner[this.expando]]
    }
  };
  var data_priv = new Data,
    data_user = new Data,
    rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    rmultiDash = /([A-Z])/g;
  jQuery.extend({
    hasData: function(elem) {
      return data_user.hasData(elem) || data_priv.hasData(elem)
    },
    data: function(elem, name, data) {
      return data_user.access(elem, name, data)
    },
    removeData: function(elem, name) {
      data_user.remove(elem, name)
    },
    _data: function(elem, name, data) {
      return data_priv.access(elem, name, data)
    },
    _removeData: function(elem, name) {
      data_priv.remove(elem, name)
    }
  }), jQuery.fn.extend({
    data: function(key, value) {
      var i, name, data, elem = this[0],
        attrs = elem && elem.attributes;
      if(void 0 === key) {
        if(this.length && (data = data_user.get(elem), 1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs"))) {
          for(i = attrs.length; i--;) name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), dataAttr(elem, name, data[name]));
          data_priv.set(elem, "hasDataAttrs", !0)
        }
        return data
      }
      return "object" == typeof key ? this.each(function() {
        data_user.set(this, key)
      }) : access(this, function(value) {
        var data, camelKey = jQuery.camelCase(key);
        if(elem && void 0 === value) {
          if(data = data_user.get(elem, key), void 0 !== data) return data;
          if(data = data_user.get(elem, camelKey), void 0 !== data) return data;
          if(data = dataAttr(elem, camelKey, void 0), void 0 !== data) return data
        } else this.each(function() {
          var data = data_user.get(this, camelKey);
          data_user.set(this, camelKey, value), -1 !== key.indexOf("-") && void 0 !== data && data_user.set(this, key, value)
        })
      }, null, value, arguments.length > 1, null, !0)
    },
    removeData: function(key) {
      return this.each(function() {
        data_user.remove(this, key)
      })
    }
  }), jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      return elem ? (type = (type || "fx") + "queue", queue = data_priv.get(elem, type), data && (!queue || jQuery.isArray(data) ? queue = data_priv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []) : void 0
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
        startLength = queue.length,
        fn = queue.shift(),
        hooks = jQuery._queueHooks(elem, type),
        next = function() {
          jQuery.dequeue(elem, type)
        };
      "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire()
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return data_priv.get(elem, key) || data_priv.access(elem, key, {
        empty: jQuery.Callbacks("once memory").add(function() {
          data_priv.remove(elem, [type + "queue", key])
        })
      })
    }
  }), jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
      })
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type)
      })
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", [])
    },
    promise: function(type, obj) {
      var tmp, count = 1,
        defer = jQuery.Deferred(),
        elements = this,
        i = this.length,
        resolve = function() {
          --count || defer.resolveWith(elements, [elements])
        };
      for("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--;) tmp = data_priv.get(elements[i], type + "queueHooks"), tmp && tmp.empty && (count++, tmp.empty.add(resolve));
      return resolve(), defer.promise(obj)
    }
  });
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    cssExpand = ["Top", "Right", "Bottom", "Left"],
    isHidden = function(elem, el) {
      return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
    }, rcheckableType = /^(?:checkbox|radio)$/i;
  ! function() {
    var fragment = document.createDocumentFragment(),
      div = fragment.appendChild(document.createElement("div"));
    div.innerHTML = "<input type='radio' checked='checked' name='t'/>", support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !! div.cloneNode(!0).lastChild.defaultValue
  }();
  var strundefined = "undefined";
  support.focusinBubbles = "onfocusin" in window;
  var rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|contextmenu)|click/,
    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
      if(elemData)
        for(handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0
        }), types = (types || "").match(rnotwhite) || [""], t = types.length; t--;) tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle, !1)), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0)
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
      if(elemData && (events = elemData.events)) {
        for(types = (types || "").match(rnotwhite) || [""], t = types.length; t--;)
          if(tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
            for(special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), origCount = j = handlers.length; j--;) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
            origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type])
          } else
            for(type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
        jQuery.isEmptyObject(events) && (delete elemData.handle, data_priv.remove(elem, "events"))
      }
    },
    trigger: function(event, data, elem, onlyHandlers) {
      var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document],
        type = hasOwn.call(event, "type") ? event.type : event,
        namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      if(cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = void 0, event.target || (event.target = elem), data = null == data ? [event] : jQuery.makeArray(data, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
        if(!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
          for(bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), tmp = cur;
          tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
        }
        for(i = 0;
          (cur = eventPath[i++]) && !event.isPropagationStopped();) event.type = i > 1 ? bubbleType : special.bindType || type, handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle"), handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), event.result === !1 && event.preventDefault());
        return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !jQuery.acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp)), event.result
      }
    },
    dispatch: function(event) {
      event = jQuery.event.fix(event);
      var i, j, ret, matched, handleObj, handlerQueue = [],
        args = slice.call(arguments),
        handlers = (data_priv.get(this, "events") || {})[event.type] || [],
        special = jQuery.event.special[event.type] || {};
      if(args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
        for(handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0;
          (matched = handlerQueue[i++]) && !event.isPropagationStopped();)
          for(event.currentTarget = matched.elem, j = 0;
            (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();)(!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
        return special.postDispatch && special.postDispatch.call(this, event), event.result
      }
    },
    handlers: function(event, handlers) {
      var i, matches, sel, handleObj, handlerQueue = [],
        delegateCount = handlers.delegateCount,
        cur = event.target;
      if(delegateCount && cur.nodeType && (!event.button || "click" !== event.type))
        for(; cur !== this; cur = cur.parentNode || this)
          if(cur.disabled !== !0 || "click" !== event.type) {
            for(matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length), matches[sel] && matches.push(handleObj);
            matches.length && handlerQueue.push({
              elem: cur,
              handlers: matches
            })
          }
      return delegateCount < handlers.length && handlerQueue.push({
        elem: this,
        handlers: handlers.slice(delegateCount)
      }), handlerQueue
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(event, original) {
        return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(event, original) {
        var eventDoc, doc, body, button = original.button;
        return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event
      }
    },
    fix: function(event) {
      if(event[jQuery.expando]) return event;
      var i, prop, copy, type = event.type,
        originalEvent = event,
        fixHook = this.fixHooks[type];
      for(fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), i = copy.length; i--;) prop = copy[i], event[prop] = originalEvent[prop];
      return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), fixHook.filter ? fixHook.filter(event, originalEvent) : event
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function() {
          return this !== safeActiveElement() && this.focus ? (this.focus(), !1) : void 0
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(), !1) : void 0
        },
        _default: function(event) {
          return jQuery.nodeName(event.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function(event) {
          void 0 !== event.result && (event.originalEvent.returnValue = event.result)
        }
      }
    },
    simulate: function(type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event, event, {
        type: type,
        isSimulated: !0,
        originalEvent: {}
      });
      bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), e.isDefaultPrevented() && event.preventDefault()
    }
  }, jQuery.removeEvent = function(elem, type, handle) {
    elem.removeEventListener && elem.removeEventListener(type, handle, !1)
  }, jQuery.Event = function(src, props) {
    return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void(this[jQuery.expando] = !0)) : new jQuery.Event(src, props)
  }, jQuery.Event.prototype = {
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault()
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation()
    },
    stopImmediatePropagation: function() {
      this.isImmediatePropagationStopped = returnTrue, this.stopPropagation()
    }
  }, jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret, target = this,
          related = event.relatedTarget,
          handleObj = event.handleObj;
        return(!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret
      }
    }
  }), support.focusinBubbles || jQuery.each({
    focus: "focusin",
    blur: "focusout"
  }, function(orig, fix) {
    var handler = function(event) {
      jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
    };
    jQuery.event.special[fix] = {
      setup: function() {
        var doc = this.ownerDocument || this,
          attaches = data_priv.access(doc, fix);
        attaches || doc.addEventListener(orig, handler, !0), data_priv.access(doc, fix, (attaches || 0) + 1)
      },
      teardown: function() {
        var doc = this.ownerDocument || this,
          attaches = data_priv.access(doc, fix) - 1;
        attaches ? data_priv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), data_priv.remove(doc, fix))
      }
    }
  }), jQuery.fn.extend({
    on: function(types, selector, data, fn, one) {
      var origFn, type;
      if("object" == typeof types) {
        "string" != typeof selector && (data = data || selector, selector = void 0);
        for(type in types) this.on(type, selector, data, types[type], one);
        return this
      }
      if(null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse;
      else if(!fn) return this;
      return 1 === one && (origFn = fn, fn = function(event) {
        return jQuery().off(event), origFn.apply(this, arguments)
      }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
        jQuery.event.add(this, types, fn, data, selector)
      })
    },
    one: function(types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1)
    },
    off: function(types, selector, fn) {
      var handleObj, type;
      if(types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
      if("object" == typeof types) {
        for(type in types) this.off(type, selector, types[type]);
        return this
      }
      return(selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), fn === !1 && (fn = returnFalse), this.each(function() {
        jQuery.event.remove(this, types, fn, selector)
      })
    },
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this)
      })
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0
    }
  });
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    rtagName = /<([\w:]+)/,
    rhtml = /<|&#?\w+;/,
    rnoInnerhtml = /<(?:script|style|link)/i,
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptType = /^$|\/(?:java|ecma)script/i,
    rscriptTypeMasked = /^true\/(.*)/,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    wrapMap = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
  wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.extend({
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i, l, srcElements, destElements, clone = elem.cloneNode(!0),
        inPage = jQuery.contains(elem.ownerDocument, elem);
      if(!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
        for(destElements = getAll(clone), srcElements = getAll(elem), i = 0, l = srcElements.length; l > i; i++) fixInput(srcElements[i], destElements[i]);
      if(dataAndEvents)
        if(deepDataAndEvents)
          for(srcElements = srcElements || getAll(elem), destElements = destElements || getAll(clone), i = 0, l = srcElements.length; l > i; i++) cloneCopyEvent(srcElements[i], destElements[i]);
        else cloneCopyEvent(elem, clone);
      return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), clone
    },
    buildFragment: function(elems, context, scripts, selection) {
      for(var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; l > i; i++)
        if(elem = elems[i], elem || 0 === elem)
          if("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          else if(rhtml.test(elem)) {
        for(tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], j = wrap[0]; j--;) tmp = tmp.lastChild;
        jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = ""
      } else nodes.push(context.createTextNode(elem));
      for(fragment.textContent = "", i = 0; elem = nodes[i++];)
        if((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), scripts))
          for(j = 0; elem = tmp[j++];) rscriptType.test(elem.type || "") && scripts.push(elem);
      return fragment
    },
    cleanData: function(elems) {
      for(var data, elem, events, type, key, j, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) {
        if(jQuery.acceptData(elem) && (key = elem[data_priv.expando], key && (data = data_priv.cache[key]))) {
          if(events = Object.keys(data.events || {}), events.length)
            for(j = 0; void 0 !== (type = events[j]); j++) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
          data_priv.cache[key] && delete data_priv.cache[key]
        }
        delete data_user.cache[elem[data_user.expando]]
      }
    }
  }), jQuery.fn.extend({
    text: function(value) {
      return access(this, function(value) {
        return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
          (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = value)
        })
      }, null, value, arguments.length)
    },
    append: function() {
      return this.domManip(arguments, function(elem) {
        if(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem)
        }
      })
    },
    prepend: function() {
      return this.domManip(arguments, function(elem) {
        if(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild)
        }
      })
    },
    before: function() {
      return this.domManip(arguments, function(elem) {
        this.parentNode && this.parentNode.insertBefore(elem, this)
      })
    },
    after: function() {
      return this.domManip(arguments, function(elem) {
        this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling)
      })
    },
    remove: function(selector, keepData) {
      for(var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), elem.parentNode.removeChild(elem));
      return this
    },
    empty: function() {
      for(var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.textContent = "");
      return this
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
      })
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {}, i = 0,
          l = this.length;
        if(void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
        if("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = value.replace(rxhtmlTag, "<$1></$2>");
          try {
            for(; l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.innerHTML = value);
            elem = 0
          } catch(e) {}
        }
        elem && this.empty().append(value)
      }, null, value, arguments.length)
    },
    replaceWith: function() {
      var arg = arguments[0];
      return this.domManip(arguments, function(elem) {
        arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this)
      }), arg && (arg.length || arg.nodeType) ? this : this.remove()
    },
    detach: function(selector) {
      return this.remove(selector, !0)
    },
    domManip: function(args, callback) {
      args = concat.apply([], args);
      var fragment, first, scripts, hasScripts, node, doc, i = 0,
        l = this.length,
        set = this,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);
      if(isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
        var self = set.eq(index);
        isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback)
      });
      if(l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)) {
        for(scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), callback.call(this[i], node, i);
        if(hasScripts)
          for(doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")))
      }
      return this
    }
  }), jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      for(var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; last >= i; i++) elems = i === last ? this : this.clone(!0), jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
      return this.pushStack(ret)
    }
  });
  var iframe, elemdisplay = {}, rmargin = /^margin/,
    rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
    getStyles = function(elem) {
      return elem.ownerDocument.defaultView.getComputedStyle(elem, null)
    };
  ! function() {
    function computePixelPositionAndBoxSizingReliable() {
      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", docElem.appendChild(container);
      var divStyle = window.getComputedStyle(div, null);
      pixelPositionVal = "1%" !== divStyle.top, boxSizingReliableVal = "4px" === divStyle.width, docElem.removeChild(container)
    }
    var pixelPositionVal, boxSizingReliableVal, divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
      docElem = document.documentElement,
      container = document.createElement("div"),
      div = document.createElement("div");
    div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", container.appendChild(div), window.getComputedStyle && jQuery.extend(support, {
      pixelPosition: function() {
        return computePixelPositionAndBoxSizingReliable(), pixelPositionVal
      },
      boxSizingReliable: function() {
        return null == boxSizingReliableVal && computePixelPositionAndBoxSizingReliable(), boxSizingReliableVal
      },
      reliableMarginRight: function() {
        var ret, marginDiv = div.appendChild(document.createElement("div"));
        return marginDiv.style.cssText = div.style.cssText = divReset, marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", docElem.appendChild(container), ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight), docElem.removeChild(container), div.innerHTML = "", ret
      }
    })
  }(), jQuery.swap = function(elem, options, callback, args) {
    var ret, name, old = {};
    for(name in options) old[name] = elem.style[name], elem.style[name] = options[name];
    ret = callback.apply(elem, args || []);
    for(name in options) elem.style[name] = old[name];
    return ret
  };
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
    rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
    cssShow = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    }, cssNormalTransform = {
      letterSpacing: 0,
      fontWeight: 400
    }, cssPrefixes = ["Webkit", "O", "Moz", "ms"];
  jQuery.extend({
    cssHooks: {
      opacity: {
        get: function(elem, computed) {
          if(computed) {
            var ret = curCSS(elem, "opacity");
            return "" === ret ? "1" : ret
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
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": "cssFloat"
    },
    style: function(elem, name, value, extra) {
      if(elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
        var ret, type, hooks, origName = jQuery.camelCase(name),
          style = elem.style;
        return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = "", style[name] = value)), void 0)
      }
    },
    css: function(elem, name, extra, styles) {
      var val, num, hooks, origName = jQuery.camelCase(name);
      return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val
    }
  }), jQuery.each(["height", "width"], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        return computed ? 0 === elem.offsetWidth && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
          return getWidthOrHeight(elem, name, extra)
        }) : getWidthOrHeight(elem, name, extra) : void 0
      },
      set: function(elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0)
      }
    }
  }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
    return computed ? jQuery.swap(elem, {
      display: "inline-block"
    }, curCSS, [elem, "marginRight"]) : void 0
  }), jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function(value) {
        for(var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        return expanded
      }
    }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
  }), jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles, len, map = {}, i = 0;
        if(jQuery.isArray(name)) {
          for(styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
          return map
        }
        return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
      }, name, value, arguments.length > 1)
    },
    show: function() {
      return showHide(this, !0)
    },
    hide: function() {
      return showHide(this)
    },
    toggle: function(state) {
      return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
        isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
      })
    }
  }), jQuery.Tween = Tween, Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
    },
    run: function(percent) {
      var eased, hooks = Tween.propHooks[this.prop];
      return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this
    }
  }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
    _default: {
      get: function(tween) {
        var result;
        return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), result && "auto" !== result ? result : 0) : tween.elem[tween.prop]
      },
      set: function(tween) {
        jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now
      }
    }
  }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function(tween) {
      tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
    }
  }, jQuery.easing = {
    linear: function(p) {
      return p
    },
    swing: function(p) {
      return .5 - Math.cos(p * Math.PI) / 2
    }
  }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
  var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
    rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
    rrun = /queueHooks$/,
    animationPrefilters = [defaultPrefilter],
    tweeners = {
      "*": [
        function(prop, value) {
          var tween = this.createTween(prop, value),
            target = tween.cur(),
            parts = rfxnum.exec(value),
            unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
            start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
            scale = 1,
            maxIterations = 20;
          if(start && start[3] !== unit) {
            unit = unit || start[3], parts = parts || [], start = +target || 1;
            do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations)
          }
          return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween
        }
      ]
    };
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function(props, callback) {
      jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.split(" ");
      for(var prop, index = 0, length = props.length; length > index; index++) prop = props[index], tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback)
    },
    prefilter: function(callback, prepend) {
      prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback)
    }
  }), jQuery.speed = function(speed, easing, fn) {
    var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
      jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue)
    }, opt
  }, jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({
        opacity: to
      }, speed, easing, callback)
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
        optall = jQuery.speed(speed, easing, callback),
        doAnimation = function() {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          (empty || data_priv.get(this, "finish")) && anim.stop(!0)
        };
      return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop, stop(gotoEnd)
      };
      return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
        var dequeue = !0,
          index = null != type && type + "queueHooks",
          timers = jQuery.timers,
          data = data_priv.get(this);
        if(index) data[index] && data[index].stop && stopQueue(data[index]);
        else
          for(index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
        for(index = timers.length; index--;) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1));
        (dequeue || !gotoEnd) && jQuery.dequeue(this, type)
      })
    },
    finish: function(type) {
      return type !== !1 && (type = type || "fx"), this.each(function() {
        var index, data = data_priv.get(this),
          queue = data[type + "queue"],
          hooks = data[type + "queueHooks"],
          timers = jQuery.timers,
          length = queue ? queue.length : 0;
        for(data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), index = timers.length; index--;) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), timers.splice(index, 1));
        for(index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
        delete data.finish
      })
    }
  }), jQuery.each(["toggle", "show", "hide"], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
    }
  }), jQuery.each({
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
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback)
    }
  }), jQuery.timers = [], jQuery.fx.tick = function() {
    var timer, i = 0,
      timers = jQuery.timers;
    for(fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
    timers.length || jQuery.fx.stop(), fxNow = void 0
  }, jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop()
  }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
    timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
  }, jQuery.fx.stop = function() {
    clearInterval(timerId), timerId = null
  }, jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, jQuery.fn.delay = function(time, type) {
    return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(next, hooks) {
      var timeout = setTimeout(next, time);
      hooks.stop = function() {
        clearTimeout(timeout)
      }
    })
  },
  function() {
    var input = document.createElement("input"),
      select = document.createElement("select"),
      opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), input.value = "t", input.type = "radio", support.radioValue = "t" === input.value
  }();
  var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1)
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name)
      })
    }
  }), jQuery.extend({
    attr: function(elem, name, value) {
      var hooks, ret, nType = elem.nodeType;
      if(elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), value) : void jQuery.removeAttr(elem, name))
    },
    removeAttr: function(elem, value) {
      var name, propName, i = 0,
        attrNames = value && value.match(rnotwhite);
      if(attrNames && 1 === elem.nodeType)
        for(; name = attrNames[i++];) propName = jQuery.propFix[name] || name, jQuery.expr.match.bool.test(name) && (elem[propName] = !1), elem.removeAttribute(name)
    },
    attrHooks: {
      type: {
        set: function(elem, value) {
          if(!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            return elem.setAttribute("type", value), val && (elem.value = val), value
          }
        }
      }
    }
  }), boolHook = {
    set: function(elem, value, name) {
      return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), name
    }
  }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret, handle;
      return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, attrHandle[name] = handle), ret
    }
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1)
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name]
      })
    }
  }), jQuery.extend({
    propFix: {
      "for": "htmlFor",
      "class": "className"
    },
    prop: function(elem, name, value) {
      var ret, hooks, notxml, nType = elem.nodeType;
      if(elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name]
    },
    propHooks: {
      tabIndex: {
        get: function(elem) {
          return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1
        }
      }
    }
  }), support.optSelected || (jQuery.propHooks.selected = {
    get: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.parentNode && parent.parentNode.selectedIndex, null
    }
  }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this
  });
  var rclass = /[\t\r\n\f]/g;
  jQuery.fn.extend({
    addClass: function(value) {
      var classes, elem, cur, clazz, j, finalValue, proceed = "string" == typeof value && value,
        i = 0,
        len = this.length;
      if(jQuery.isFunction(value)) return this.each(function(j) {
        jQuery(this).addClass(value.call(this, j, this.className))
      });
      if(proceed)
        for(classes = (value || "").match(rnotwhite) || []; len > i; i++)
          if(elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
            for(j = 0; clazz = classes[j++];) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
            finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue)
          }
      return this
    },
    removeClass: function(value) {
      var classes, elem, cur, clazz, j, finalValue, proceed = 0 === arguments.length || "string" == typeof value && value,
        i = 0,
        len = this.length;
      if(jQuery.isFunction(value)) return this.each(function(j) {
        jQuery(this).removeClass(value.call(this, j, this.className))
      });
      if(proceed)
        for(classes = (value || "").match(rnotwhite) || []; len > i; i++)
          if(elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
            for(j = 0; clazz = classes[j++];)
              for(; cur.indexOf(" " + clazz + " ") >= 0;) cur = cur.replace(" " + clazz + " ", " ");
            finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue)
          }
      return this
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : this.each(jQuery.isFunction(value) ? function(i) {
        jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
      } : function() {
        if("string" === type)
          for(var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++];) self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
        else(type === strundefined || "boolean" === type) && (this.className && data_priv.set(this, "__className__", this.className), this.className = this.className || value === !1 ? "" : data_priv.get(this, "__className__") || "")
      })
    },
    hasClass: function(selector) {
      for(var className = " " + selector + " ", i = 0, l = this.length; l > i; i++)
        if(1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
      return !1
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({
    val: function(value) {
      var hooks, ret, isFunction, elem = this[0]; {
        if(arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
          var val;
          1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
            return null == value ? "" : value + ""
          })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val))
        });
        if(elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret)
      }
    }
  }), jQuery.extend({
    valHooks: {
      select: {
        get: function(elem) {
          for(var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++)
            if(option = options[i], !(!option.selected && i !== index || (support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
              if(value = jQuery(option).val(), one) return value;
              values.push(value)
            }
          return values
        },
        set: function(elem, value) {
          for(var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--;) option = options[i], (option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0) && (optionSet = !0);
          return optionSet || (elem.selectedIndex = -1), values
        }
      }
    }
  }), jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {
      set: function(elem, value) {
        return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0
      }
    }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
      return null === elem.getAttribute("value") ? "on" : elem.value
    })
  }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
    }
  }), jQuery.fn.extend({
    hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
    },
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn)
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn)
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn)
    },
    undelegate: function(selector, types, fn) {
      return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
    }
  });
  var nonce = jQuery.now(),
    rquery = /\?/;
  jQuery.parseJSON = function(data) {
    return JSON.parse(data + "")
  }, jQuery.parseXML = function(data) {
    var xml, tmp;
    if(!data || "string" != typeof data) return null;
    try {
      tmp = new DOMParser, xml = tmp.parseFromString(data, "text/xml")
    } catch(e) {
      xml = void 0
    }
    return(!xml || xml.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + data), xml
  };
  var ajaxLocParts, ajaxLocation, rhash = /#.*$/,
    rts = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    prefilters = {}, transports = {}, allTypes = "*/".concat("*");
  try {
    ajaxLocation = location.href
  } catch(e) {
    ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
  }
  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
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
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
        2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
      }
      "object" == typeof url && (options = url, url = void 0), options = options || {};
      var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options),
        callbackContext = s.context || s,
        globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),
        statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0,
        strAbort = "canceled",
        jqXHR = {
          readyState: 0,
          getResponseHeader: function(key) {
            var match;
            if(2 === state) {
              if(!responseHeaders)
                for(responseHeaders = {}; match = rheaders.exec(responseHeadersString);) responseHeaders[match[1].toLowerCase()] = match[2];
              match = responseHeaders[key.toLowerCase()]
            }
            return null == match ? null : match
          },
          getAllResponseHeaders: function() {
            return 2 === state ? responseHeadersString : null
          },
          setRequestHeader: function(name, value) {
            var lname = name.toLowerCase();
            return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value), this
          },
          overrideMimeType: function(type) {
            return state || (s.mimeType = type), this
          },
          statusCode: function(map) {
            var code;
            if(map)
              if(2 > state)
                for(code in map) statusCode[code] = [statusCode[code], map[code]];
              else jqXHR.always(map[jqXHR.status]);
            return this
          },
          abort: function(statusText) {
            var finalText = statusText || strAbort;
            return transport && transport.abort(finalText), done(0, finalText), this
          }
        };
      if(deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""], null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
      fireGlobals = s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for(i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
      if(s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
      strAbort = "abort";
      for(i in {
        success: 1,
        error: 1,
        complete: 1
      }) jqXHR[i](s[i]);
      if(transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
        jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]), s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
          jqXHR.abort("timeout")
        }, s.timeout));
        try {
          state = 1, transport.send(requestHeaders, done)
        } catch(e) {
          if(!(2 > state)) throw e;
          done(-1, e)
        }
      } else done(-1, "No Transport");
      return jqXHR
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json")
    },
    getScript: function(url, callback) {
      return jQuery.get(url, void 0, callback, "script")
    }
  }), jQuery.each(["get", "post"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      })
    }
  }), jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn)
    }
  }), jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      "throws": !0
    })
  }, jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      return jQuery.isFunction(html) ? this.each(function(i) {
        jQuery(this).wrapAll(html.call(this, i))
      }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
        for(var elem = this; elem.firstElementChild;) elem = elem.firstElementChild;
        return elem
      }).append(this)), this)
    },
    wrapInner: function(html) {
      return this.each(jQuery.isFunction(html) ? function(i) {
        jQuery(this).wrapInner(html.call(this, i))
      } : function() {
        var self = jQuery(this),
          contents = self.contents();
        contents.length ? contents.wrapAll(html) : self.append(html)
      })
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
      }).end()
    }
  }), jQuery.expr.filters.hidden = function(elem) {
    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0
  }, jQuery.expr.filters.visible = function(elem) {
    return !jQuery.expr.filters.hidden(elem)
  };
  var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;
  jQuery.param = function(a, traditional) {
    var prefix, s = [],
      add = function(key, value) {
        value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
      };
    if(void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
      add(this.name, this.value)
    });
    else
      for(prefix in a) buildParams(prefix, a[prefix], traditional, add);
    return s.join("&").replace(r20, "+")
  }, jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          }
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        }
      }).get()
    }
  }), jQuery.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest
    } catch(e) {}
  };
  var xhrId = 0,
    xhrCallbacks = {}, xhrSuccessStatus = {
      0: 200,
      1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
  window.ActiveXObject && jQuery(window).on("unload", function() {
    for(var key in xhrCallbacks) xhrCallbacks[key]()
  }), support.cors = !! xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !! xhrSupported, jQuery.ajaxTransport(function(options) {
    var callback;
    return support.cors || xhrSupported && !options.crossDomain ? {
      send: function(headers, complete) {
        var i, xhr = options.xhr(),
          id = ++xhrId;
        if(xhr.open(options.type, options.url, options.async, options.username, options.password), options.xhrFields)
          for(i in options.xhrFields) xhr[i] = options.xhrFields[i];
        options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
        for(i in headers) xhr.setRequestHeader(i, headers[i]);
        callback = function(type) {
          return function() {
            callback && (delete xhrCallbacks[id], callback = xhr.onload = xhr.onerror = null, "abort" === type ? xhr.abort() : "error" === type ? complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" == typeof xhr.responseText ? {
              text: xhr.responseText
            } : void 0, xhr.getAllResponseHeaders()))
          }
        }, xhr.onload = callback(), xhr.onerror = callback("error"), callback = xhrCallbacks[id] = callback("abort"), xhr.send(options.hasContent && options.data || null)
      },
      abort: function() {
        callback && callback()
      }
    } : void 0
  }), jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function(text) {
        return jQuery.globalEval(text), text
      }
    }
  }), jQuery.ajaxPrefilter("script", function(s) {
    void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET")
  }), jQuery.ajaxTransport("script", function(s) {
    if(s.crossDomain) {
      var script, callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").prop({
            async: !0,
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type)
          }), document.head.appendChild(script[0])
        },
        abort: function() {
          callback && callback()
        }
      }
    }
  });
  var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
      return this[callback] = !0, callback
    }
  }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
    return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
      return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0]
    }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
      responseContainer = arguments
    }, jqXHR.always(function() {
      window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = void 0
    }), "script") : void 0
  }), jQuery.parseHTML = function(data, context, keepScripts) {
    if(!data || "string" != typeof data) return null;
    "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
    var parsed = rsingleTag.exec(data),
      scripts = !keepScripts && [];
    return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts), scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes))
  };
  var _load = jQuery.fn.load;
  jQuery.fn.load = function(url, params, callback) {
    if("string" != typeof url && _load) return _load.apply(this, arguments);
    var selector, type, response, self = this,
      off = url.indexOf(" ");
    return off >= 0 && (selector = url.slice(off), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), self.length > 0 && jQuery.ajax({
      url: url,
      type: type,
      dataType: "html",
      data: params
    }).done(function(responseText) {
      response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
    }).complete(callback && function(jqXHR, status) {
      self.each(callback, response || [jqXHR.responseText, status, jqXHR])
    }), this
  }, jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem
    }).length
  };
  var docElem = window.document.documentElement;
  jQuery.offset = {
    setOffset: function(elem, options, i) {
      var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
        curElem = jQuery(elem),
        props = {};
      "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), "using" in options ? options.using.call(elem, props) : curElem.css(props)
    }
  }, jQuery.fn.extend({
    offset: function(options) {
      if(arguments.length) return void 0 === options ? this : this.each(function(i) {
        jQuery.offset.setOffset(this, options, i)
      });
      var docElem, win, elem = this[0],
        box = {
          top: 0,
          left: 0
        }, doc = elem && elem.ownerDocument;
      if(doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), win = getWindow(doc), {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      }) : box
    },
    position: function() {
      if(this[0]) {
        var offsetParent, offset, elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };
        return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), {
          top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
          left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
        }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        for(var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position");) offsetParent = offsetParent.offsetParent;
        return offsetParent || docElem
      })
    }
  }), jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        return void 0 === val ? win ? win[prop] : elem[method] : void(win ? win.scrollTo(top ? window.pageXOffset : val, top ? val : window.pageYOffset) : elem[method] = val)
      }, method, val, arguments.length, null)
    }
  }), jQuery.each(["top", "left"], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0
    })
  }), jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin),
          extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
        }, type, chainable ? margin : void 0, chainable, null)
      }
    })
  }), jQuery.fn.size = function() {
    return this.length
  }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
    return jQuery
  });
  var _jQuery = window.jQuery,
    _$ = window.$;
  return jQuery.noConflict = function(deep) {
    return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
  }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery
}), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function($) {
  "use strict";

  function transitionEnd() {
    var el = document.createElement("bootstrap"),
      transEndEventNames = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
      };
    for(var name in transEndEventNames)
      if(void 0 !== el.style[name]) return {
        end: transEndEventNames[name]
      };
    return !1
  }
  $.fn.emulateTransitionEnd = function(duration) {
    var called = !1,
      $el = this;
    $(this).one($.support.transition.end, function() {
      called = !0
    });
    var callback = function() {
      called || $($el).trigger($.support.transition.end)
    };
    return setTimeout(callback, duration), this
  }, $(function() {
    $.support.transition = transitionEnd()
  })
}(jQuery), + function($) {
  "use strict";
  var dismiss = '[data-dismiss="alert"]',
    Alert = function(el) {
      $(el).on("click", dismiss, this.close)
    };
  Alert.prototype.close = function(e) {
    function removeElement() {
      $parent.trigger("closed.bs.alert").remove()
    }
    var $this = $(this),
      selector = $this.attr("data-target");
    selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""));
    var $parent = $(selector);
    e && e.preventDefault(), $parent.length || ($parent = $this.hasClass("alert") ? $this : $this.parent()), $parent.trigger(e = $.Event("close.bs.alert")), e.isDefaultPrevented() || ($parent.removeClass("in"), $.support.transition && $parent.hasClass("fade") ? $parent.one($.support.transition.end, removeElement).emulateTransitionEnd(150) : removeElement())
  };
  var old = $.fn.alert;
  $.fn.alert = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data("bs.alert");
      data || $this.data("bs.alert", data = new Alert(this)), "string" == typeof option && data[option].call($this)
    })
  }, $.fn.alert.Constructor = Alert, $.fn.alert.noConflict = function() {
    return $.fn.alert = old, this
  }, $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close)
}(jQuery), + function($) {
  "use strict";
  var Button = function(element, options) {
    this.$element = $(element), this.options = $.extend({}, Button.DEFAULTS, options), this.isLoading = !1
  };
  Button.DEFAULTS = {
    loadingText: "loading..."
  }, Button.prototype.setState = function(state) {
    var d = "disabled",
      $el = this.$element,
      val = $el.is("input") ? "val" : "html",
      data = $el.data();
    state += "Text", data.resetText || $el.data("resetText", $el[val]()), $el[val](data[state] || this.options[state]), setTimeout($.proxy(function() {
      "loadingText" == state ? (this.isLoading = !0, $el.addClass(d).attr(d, d)) : this.isLoading && (this.isLoading = !1, $el.removeClass(d).removeAttr(d))
    }, this), 0)
  }, Button.prototype.toggle = function() {
    var changed = !0,
      $parent = this.$element.closest('[data-toggle="buttons"]');
    if($parent.length) {
      var $input = this.$element.find("input");
      "radio" == $input.prop("type") && ($input.prop("checked") && this.$element.hasClass("active") ? changed = !1 : $parent.find(".active").removeClass("active")), changed && $input.prop("checked", !this.$element.hasClass("active")).trigger("change")
    }
    changed && this.$element.toggleClass("active")
  };
  var old = $.fn.button;
  $.fn.button = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data("bs.button"),
        options = "object" == typeof option && option;
      data || $this.data("bs.button", data = new Button(this, options)), "toggle" == option ? data.toggle() : option && data.setState(option)
    })
  }, $.fn.button.Constructor = Button, $.fn.button.noConflict = function() {
    return $.fn.button = old, this
  }, $(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(e) {
    var $btn = $(e.target);
    $btn.hasClass("btn") || ($btn = $btn.closest(".btn")), $btn.button("toggle"), e.preventDefault()
  })
}(jQuery), + function($) {
  "use strict";
  var Carousel = function(element, options) {
    this.$element = $(element), this.$indicators = this.$element.find(".carousel-indicators"), this.options = options, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this))
  };
  Carousel.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0
  }, Carousel.prototype.cycle = function(e) {
    return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), this
  }, Carousel.prototype.getActiveIndex = function() {
    return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
  }, Carousel.prototype.to = function(pos) {
    var that = this,
      activeIndex = this.getActiveIndex();
    return pos > this.$items.length - 1 || 0 > pos ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
      that.to(pos)
    }) : activeIndex == pos ? this.pause().cycle() : this.slide(pos > activeIndex ? "next" : "prev", $(this.$items[pos]))
  }, Carousel.prototype.pause = function(e) {
    return e || (this.paused = !0), this.$element.find(".next, .prev").length && $.support.transition && (this.$element.trigger($.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
  }, Carousel.prototype.next = function() {
    return this.sliding ? void 0 : this.slide("next")
  }, Carousel.prototype.prev = function() {
    return this.sliding ? void 0 : this.slide("prev")
  }, Carousel.prototype.slide = function(type, next) {
    var $active = this.$element.find(".item.active"),
      $next = next || $active[type](),
      isCycling = this.interval,
      direction = "next" == type ? "left" : "right",
      fallback = "next" == type ? "first" : "last",
      that = this;
    if(!$next.length) {
      if(!this.options.wrap) return;
      $next = this.$element.find(".item")[fallback]()
    }
    if($next.hasClass("active")) return this.sliding = !1;
    var e = $.Event("slide.bs.carousel", {
      relatedTarget: $next[0],
      direction: direction
    });
    return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (this.sliding = !0, isCycling && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function() {
      var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
      $nextIndicator && $nextIndicator.addClass("active")
    })), $.support.transition && this.$element.hasClass("slide") ? ($next.addClass(type), $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), $active.one($.support.transition.end, function() {
      $next.removeClass([type, direction].join(" ")).addClass("active"), $active.removeClass(["active", direction].join(" ")), that.sliding = !1, setTimeout(function() {
        that.$element.trigger("slid.bs.carousel")
      }, 0)
    }).emulateTransitionEnd(1e3 * $active.css("transition-duration").slice(0, -1))) : ($active.removeClass("active"), $next.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), isCycling && this.cycle(), this)
  };
  var old = $.fn.carousel;
  $.fn.carousel = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data("bs.carousel"),
        options = $.extend({}, Carousel.DEFAULTS, $this.data(), "object" == typeof option && option),
        action = "string" == typeof option ? option : options.slide;
      data || $this.data("bs.carousel", data = new Carousel(this, options)), "number" == typeof option ? data.to(option) : action ? data[action]() : options.interval && data.pause().cycle()
    })
  }, $.fn.carousel.Constructor = Carousel, $.fn.carousel.noConflict = function() {
    return $.fn.carousel = old, this
  }, $(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
    var href, $this = $(this),
      $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")),
      options = $.extend({}, $target.data(), $this.data()),
      slideIndex = $this.attr("data-slide-to");
    slideIndex && (options.interval = !1), $target.carousel(options), (slideIndex = $this.attr("data-slide-to")) && $target.data("bs.carousel").to(slideIndex), e.preventDefault()
  }), $(window).on("load", function() {
    $('[data-ride="carousel"]').each(function() {
      var $carousel = $(this);
      $carousel.carousel($carousel.data())
    })
  })
}(jQuery), + function($) {
  "use strict";
  var Collapse = function(element, options) {
    this.$element = $(element), this.options = $.extend({}, Collapse.DEFAULTS, options), this.transitioning = null, this.options.parent && (this.$parent = $(this.options.parent)), this.options.toggle && this.toggle()
  };
  Collapse.DEFAULTS = {
    toggle: !0
  }, Collapse.prototype.dimension = function() {
    var hasWidth = this.$element.hasClass("width");
    return hasWidth ? "width" : "height"
  }, Collapse.prototype.show = function() {
    if(!this.transitioning && !this.$element.hasClass("in")) {
      var startEvent = $.Event("show.bs.collapse");
      if(this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
        var actives = this.$parent && this.$parent.find("> .panel > .in");
        if(actives && actives.length) {
          var hasData = actives.data("bs.collapse");
          if(hasData && hasData.transitioning) return;
          actives.collapse("hide"), hasData || actives.data("bs.collapse", null)
        }
        var dimension = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[dimension](0), this.transitioning = 1;
        var complete = function() {
          this.$element.removeClass("collapsing").addClass("collapse in")[dimension]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
        };
        if(!$.support.transition) return complete.call(this);
        var scrollSize = $.camelCase(["scroll", dimension].join("-"));
        this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
      }
    }
  }, Collapse.prototype.hide = function() {
    if(!this.transitioning && this.$element.hasClass("in")) {
      var startEvent = $.Event("hide.bs.collapse");
      if(this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
        var dimension = this.dimension();
        this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
        var complete = function() {
          this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
        };
        return $.support.transition ? void this.$element[dimension](0).one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350) : complete.call(this)
      }
    }
  }, Collapse.prototype.toggle = function() {
    this[this.$element.hasClass("in") ? "hide" : "show"]()
  };
  var old = $.fn.collapse;
  $.fn.collapse = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data("bs.collapse"),
        options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
      !data && options.toggle && "show" == option && (option = !option), data || $this.data("bs.collapse", data = new Collapse(this, options)), "string" == typeof option && data[option]()
    })
  }, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
    return $.fn.collapse = old, this
  }, $(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(e) {
    var href, $this = $(this),
      target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""),
      $target = $(target),
      data = $target.data("bs.collapse"),
      option = data ? "toggle" : $this.data(),
      parent = $this.attr("data-parent"),
      $parent = parent && $(parent);
    data && data.transitioning || ($parent && $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass("collapsed"), $this[$target.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), $target.collapse(option)
  })
}(jQuery), + function($) {
  "use strict";

  function clearMenus(e) {
    $(backdrop).remove(), $(toggle).each(function() {
      var $parent = getParent($(this)),
        relatedTarget = {
          relatedTarget: this
        };
      $parent.hasClass("open") && ($parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget)), e.isDefaultPrevented() || $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget))
    })
  }

  function getParent($this) {
    var selector = $this.attr("data-target");
    selector || (selector = $this.attr("href"), selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ""));
    var $parent = selector && $(selector);
    return $parent && $parent.length ? $parent : $this.parent()
  }
  var backdrop = ".dropdown-backdrop",
    toggle = "[data-toggle=dropdown]",
    Dropdown = function(element) {
      $(element).on("click.bs.dropdown", this.toggle)
    };
  Dropdown.prototype.toggle = function(e) {
    var $this = $(this);
    if(!$this.is(".disabled, :disabled")) {
      var $parent = getParent($this),
        isActive = $parent.hasClass("open");
      if(clearMenus(), !isActive) {
        "ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length && $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click", clearMenus);
        var relatedTarget = {
          relatedTarget: this
        };
        if($parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget)), e.isDefaultPrevented()) return;
        $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget), $this.focus()
      }
      return !1
    }
  }, Dropdown.prototype.keydown = function(e) {
    if(/(38|40|27)/.test(e.keyCode)) {
      var $this = $(this);
      if(e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
        var $parent = getParent($this),
          isActive = $parent.hasClass("open");
        if(!isActive || isActive && 27 == e.keyCode) return 27 == e.which && $parent.find(toggle).focus(), $this.click();
        var desc = " li:not(.divider):visible a",
          $items = $parent.find("[role=menu]" + desc + ", [role=listbox]" + desc);
        if($items.length) {
          var index = $items.index($items.filter(":focus"));
          38 == e.keyCode && index > 0 && index--, 40 == e.keyCode && index < $items.length - 1 && index++, ~index || (index = 0), $items.eq(index).focus()
        }
      }
    }
  };
  var old = $.fn.dropdown;
  $.fn.dropdown = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data("bs.dropdown");
      data || $this.data("bs.dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this)
    })
  }, $.fn.dropdown.Constructor = Dropdown, $.fn.dropdown.noConflict = function() {
    return $.fn.dropdown = old, this
  }, $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
    e.stopPropagation()
  }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle + ", [role=menu], [role=listbox]", Dropdown.prototype.keydown)
}(jQuery), + function($) {
  "use strict";
  var Modal = function(element, options) {
    this.options = options, this.$element = $(element), this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
      this.$element.trigger("loaded.bs.modal")
    }, this))
  };
  Modal.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, Modal.prototype.toggle = function(_relatedTarget) {
    return this[this.isShown ? "hide" : "show"](_relatedTarget)
  }, Modal.prototype.show = function(_relatedTarget) {
    var that = this,
      e = $.Event("show.bs.modal", {
        relatedTarget: _relatedTarget
      });
    this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this)), this.backdrop(function() {
      var transition = $.support.transition && that.$element.hasClass("fade");
      that.$element.parent().length || that.$element.appendTo(document.body), that.$element.show().scrollTop(0), transition && that.$element[0].offsetWidth, that.$element.addClass("in").attr("aria-hidden", !1), that.enforceFocus();
      var e = $.Event("shown.bs.modal", {
        relatedTarget: _relatedTarget
      });
      transition ? that.$element.find(".modal-dialog").one($.support.transition.end, function() {
        that.$element.focus().trigger(e)
      }).emulateTransitionEnd(300) : that.$element.focus().trigger(e)
    }))
  }, Modal.prototype.hide = function(e) {
    e && e.preventDefault(), e = $.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), $(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), $.support.transition && this.$element.hasClass("fade") ? this.$element.one($.support.transition.end, $.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
  }, Modal.prototype.enforceFocus = function() {
    $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
      this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.focus()
    }, this))
  }, Modal.prototype.escape = function() {
    this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", $.proxy(function(e) {
      27 == e.which && this.hide()
    }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
  }, Modal.prototype.hideModal = function() {
    var that = this;
    this.$element.hide(), this.backdrop(function() {
      that.removeBackdrop(), that.$element.trigger("hidden.bs.modal")
    })
  }, Modal.prototype.removeBackdrop = function() {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
  }, Modal.prototype.backdrop = function(callback) {
    var animate = this.$element.hasClass("fade") ? "fade" : "";
    if(this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;
      if(this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body), this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
        e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
      }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !callback) return;
      doAnimate ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback()
    } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback()) : callback && callback()
  };
  var old = $.fn.modal;
  $.fn.modal = function(option, _relatedTarget) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data("bs.modal"),
        options = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof option && option);
      data || $this.data("bs.modal", data = new Modal(this, options)), "string" == typeof option ? data[option](_relatedTarget) : options.show && data.show(_relatedTarget)
    })
  }, $.fn.modal.Constructor = Modal, $.fn.modal.noConflict = function() {
    return $.fn.modal = old, this
  }, $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
    var $this = $(this),
      href = $this.attr("href"),
      $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")),
      option = $target.data("bs.modal") ? "toggle" : $.extend({
        remote: !/#/.test(href) && href
      }, $target.data(), $this.data());
    $this.is("a") && e.preventDefault(), $target.modal(option, this).one("hide", function() {
      $this.is(":visible") && $this.focus()
    })
  }), $(document).on("show.bs.modal", ".modal", function() {
    $(document.body).addClass("modal-open")
  }).on("hidden.bs.modal", ".modal", function() {
    $(document.body).removeClass("modal-open")
  })
}(jQuery), + function($) {
  "use strict";
  var Tooltip = function(element, options) {
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", element, options)
  };
  Tooltip.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1
  }, Tooltip.prototype.init = function(type, element, options) {
    this.enabled = !0, this.type = type, this.$element = $(element), this.options = this.getOptions(options);
    for(var triggers = this.options.trigger.split(" "), i = triggers.length; i--;) {
      var trigger = triggers[i];
      if("click" == trigger) this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this));
      else if("manual" != trigger) {
        var eventIn = "hover" == trigger ? "mouseenter" : "focusin",
          eventOut = "hover" == trigger ? "mouseleave" : "focusout";
        this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)), this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }
    this.options.selector ? this._options = $.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle()
  }, Tooltip.prototype.getDefaults = function() {
    return Tooltip.DEFAULTS
  }, Tooltip.prototype.getOptions = function(options) {
    return options = $.extend({}, this.getDefaults(), this.$element.data(), options), options.delay && "number" == typeof options.delay && (options.delay = {
      show: options.delay,
      hide: options.delay
    }), options
  }, Tooltip.prototype.getDelegateOptions = function() {
    var options = {}, defaults = this.getDefaults();
    return this._options && $.each(this._options, function(key, value) {
      defaults[key] != value && (options[key] = value)
    }), options
  }, Tooltip.prototype.enter = function(obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
    return clearTimeout(self.timeout), self.hoverState = "in", self.options.delay && self.options.delay.show ? void(self.timeout = setTimeout(function() {
      "in" == self.hoverState && self.show()
    }, self.options.delay.show)) : self.show()
  }, Tooltip.prototype.leave = function(obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
    return clearTimeout(self.timeout), self.hoverState = "out", self.options.delay && self.options.delay.hide ? void(self.timeout = setTimeout(function() {
      "out" == self.hoverState && self.hide()
    }, self.options.delay.hide)) : self.hide()
  }, Tooltip.prototype.show = function() {
    var e = $.Event("show.bs." + this.type);
    if(this.hasContent() && this.enabled) {
      if(this.$element.trigger(e), e.isDefaultPrevented()) return;
      var that = this,
        $tip = this.tip();
      this.setContent(), this.options.animation && $tip.addClass("fade");
      var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement,
        autoToken = /\s?auto?\s?/i,
        autoPlace = autoToken.test(placement);
      autoPlace && (placement = placement.replace(autoToken, "") || "top"), $tip.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(placement), this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
      var pos = this.getPosition(),
        actualWidth = $tip[0].offsetWidth,
        actualHeight = $tip[0].offsetHeight;
      if(autoPlace) {
        var $parent = this.$element.parent(),
          orgPlacement = placement,
          docScroll = document.documentElement.scrollTop || document.body.scrollTop,
          parentWidth = "body" == this.options.container ? window.innerWidth : $parent.outerWidth(),
          parentHeight = "body" == this.options.container ? window.innerHeight : $parent.outerHeight(),
          parentLeft = "body" == this.options.container ? 0 : $parent.offset().left;
        placement = "bottom" == placement && pos.top + pos.height + actualHeight - docScroll > parentHeight ? "top" : "top" == placement && pos.top - docScroll - actualHeight < 0 ? "bottom" : "right" == placement && pos.right + actualWidth > parentWidth ? "left" : "left" == placement && pos.left - actualWidth < parentLeft ? "right" : placement, $tip.removeClass(orgPlacement).addClass(placement)
      }
      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
      this.applyPlacement(calculatedOffset, placement), this.hoverState = null;
      var complete = function() {
        that.$element.trigger("shown.bs." + that.type)
      };
      $.support.transition && this.$tip.hasClass("fade") ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150) : complete()
    }
  }, Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace, $tip = this.tip(),
      width = $tip[0].offsetWidth,
      height = $tip[0].offsetHeight,
      marginTop = parseInt($tip.css("margin-top"), 10),
      marginLeft = parseInt($tip.css("margin-left"), 10);
    isNaN(marginTop) && (marginTop = 0), isNaN(marginLeft) && (marginLeft = 0), offset.top = offset.top + marginTop, offset.left = offset.left + marginLeft, $.offset.setOffset($tip[0], $.extend({
      using: function(props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0), $tip.addClass("in");
    var actualWidth = $tip[0].offsetWidth,
      actualHeight = $tip[0].offsetHeight;
    if("top" == placement && actualHeight != height && (replace = !0, offset.top = offset.top + height - actualHeight), /bottom|top/.test(placement)) {
      var delta = 0;
      offset.left < 0 && (delta = -2 * offset.left, offset.left = 0, $tip.offset(offset), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight), this.replaceArrow(delta - width + actualWidth, actualWidth, "left")
    } else this.replaceArrow(actualHeight - height, actualHeight, "top");
    replace && $tip.offset(offset)
  }, Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? 50 * (1 - delta / dimension) + "%" : "")
  }, Tooltip.prototype.setContent = function() {
    var $tip = this.tip(),
      title = this.getTitle();
    $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title), $tip.removeClass("fade in top bottom left right")
  }, Tooltip.prototype.hide = function() {
    function complete() {
      "in" != that.hoverState && $tip.detach(), that.$element.trigger("hidden.bs." + that.type)
    }
    var that = this,
      $tip = this.tip(),
      e = $.Event("hide.bs." + this.type);
    return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : ($tip.removeClass("in"), $.support.transition && this.$tip.hasClass("fade") ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150) : complete(), this.hoverState = null, this)
  }, Tooltip.prototype.fixTitle = function() {
    var $e = this.$element;
    ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").attr("title", "")
  }, Tooltip.prototype.hasContent = function() {
    return this.getTitle()
  }, Tooltip.prototype.getPosition = function() {
    var el = this.$element[0];
    return $.extend({}, "function" == typeof el.getBoundingClientRect ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }, Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
    return "bottom" == placement ? {
      top: pos.top + pos.height,
      left: pos.left + pos.width / 2 - actualWidth / 2
    } : "top" == placement ? {
      top: pos.top - actualHeight,
      left: pos.left + pos.width / 2 - actualWidth / 2
    } : "left" == placement ? {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left - actualWidth
    } : {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left + pos.width
    }
  }, Tooltip.prototype.getTitle = function() {
    var title, $e = this.$element,
      o = this.options;
    return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title)
  }, Tooltip.prototype.tip = function() {
    return this.$tip = this.$tip || $(this.options.template)
  }, Tooltip.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
  }, Tooltip.prototype.validate = function() {
    this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
  }, Tooltip.prototype.enable = function() {
    this.enabled = !0
  }, Tooltip.prototype.disable = function() {
    this.enabled = !1
  }, Tooltip.prototype.toggleEnabled = function() {
    this.enabled = !this.enabled
  }, Tooltip.prototype.toggle = function(e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
    self.tip().hasClass("in") ? self.leave(self) : self.enter(self)
  }, Tooltip.prototype.destroy = function() {
    clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
  };
  var old = $.fn.tooltip;
  $.fn.tooltip = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data("bs.tooltip"),
        options = "object" == typeof option && option;
      (data || "destroy" != option) && (data || $this.data("bs.tooltip", data = new Tooltip(this, options)), "string" == typeof option && data[option]())
    })
  }, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.noConflict = function() {
    return $.fn.tooltip = old, this
  }
}(jQuery), + function($) {
  "use strict";
  var Popover = function(element, options) {
    this.init("popover", element, options)
  };
  if(!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype), Popover.prototype.constructor = Popover, Popover.prototype.getDefaults = function() {
    return Popover.DEFAULTS
  }, Popover.prototype.setContent = function() {
    var $tip = this.tip(),
      title = this.getTitle(),
      content = this.getContent();
    $tip.find(".popover-title")[this.options.html ? "html" : "text"](title), $tip.find(".popover-content")[this.options.html ? "string" == typeof content ? "html" : "append" : "text"](content), $tip.removeClass("fade top bottom left right in"), $tip.find(".popover-title").html() || $tip.find(".popover-title").hide()
  }, Popover.prototype.hasContent = function() {
    return this.getTitle() || this.getContent()
  }, Popover.prototype.getContent = function() {
    var $e = this.$element,
      o = this.options;
    return $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content)
  }, Popover.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".arrow")
  }, Popover.prototype.tip = function() {
    return this.$tip || (this.$tip = $(this.options.template)), this.$tip
  };
  var old = $.fn.popover;
  $.fn.popover = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data("bs.popover"),
        options = "object" == typeof option && option;
      (data || "destroy" != option) && (data || $this.data("bs.popover", data = new Popover(this, options)), "string" == typeof option && data[option]())
    })
  }, $.fn.popover.Constructor = Popover, $.fn.popover.noConflict = function() {
    return $.fn.popover = old, this
  }
}(jQuery), + function($) {
  "use strict";

  function ScrollSpy(element, options) {
    var href, process = $.proxy(this.process, this);
    this.$element = $($(element).is("body") ? window : element), this.$body = $("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", process), this.options = $.extend({}, ScrollSpy.DEFAULTS, options), this.selector = (this.options.target || (href = $(element).attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = $([]), this.targets = $([]), this.activeTarget = null, this.refresh(), this.process()
  }
  ScrollSpy.DEFAULTS = {
    offset: 10
  }, ScrollSpy.prototype.refresh = function() {
    var offsetMethod = this.$element[0] == window ? "offset" : "position";
    this.offsets = $([]), this.targets = $([]); {
      var self = this;
      this.$body.find(this.selector).map(function() {
        var $el = $(this),
          href = $el.data("target") || $el.attr("href"),
          $href = /^#./.test(href) && $(href);
        return $href && $href.length && $href.is(":visible") && [
          [$href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]
        ] || null
      }).sort(function(a, b) {
        return a[0] - b[0]
      }).each(function() {
        self.offsets.push(this[0]), self.targets.push(this[1])
      })
    }
  }, ScrollSpy.prototype.process = function() {
    var i, scrollTop = this.$scrollElement.scrollTop() + this.options.offset,
      scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
      maxScroll = scrollHeight - this.$scrollElement.height(),
      offsets = this.offsets,
      targets = this.targets,
      activeTarget = this.activeTarget;
    if(scrollTop >= maxScroll) return activeTarget != (i = targets.last()[0]) && this.activate(i);
    if(activeTarget && scrollTop <= offsets[0]) return activeTarget != (i = targets[0]) && this.activate(i);
    for(i = offsets.length; i--;) activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
  }, ScrollSpy.prototype.activate = function(target) {
    this.activeTarget = target, $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]',
      active = $(selector).parents("li").addClass("active");
    active.parent(".dropdown-menu").length && (active = active.closest("li.dropdown").addClass("active")), active.trigger("activate.bs.scrollspy")
  };
  var old = $.fn.scrollspy;
  $.fn.scrollspy = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data("bs.scrollspy"),
        options = "object" == typeof option && option;
      data || $this.data("bs.scrollspy", data = new ScrollSpy(this, options)), "string" == typeof option && data[option]()
    })
  }, $.fn.scrollspy.Constructor = ScrollSpy, $.fn.scrollspy.noConflict = function() {
    return $.fn.scrollspy = old, this
  }, $(window).on("load", function() {
    $('[data-spy="scroll"]').each(function() {
      var $spy = $(this);
      $spy.scrollspy($spy.data())
    })
  })
}(jQuery), + function($) {
  "use strict";
  var Tab = function(element) {
    this.element = $(element)
  };
  Tab.prototype.show = function() {
    var $this = this.element,
      $ul = $this.closest("ul:not(.dropdown-menu)"),
      selector = $this.data("target");
    if(selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), !$this.parent("li").hasClass("active")) {
      var previous = $ul.find(".active:last a")[0],
        e = $.Event("show.bs.tab", {
          relatedTarget: previous
        });
      if($this.trigger(e), !e.isDefaultPrevented()) {
        var $target = $(selector);
        this.activate($this.parent("li"), $ul), this.activate($target, $target.parent(), function() {
          $this.trigger({
            type: "shown.bs.tab",
            relatedTarget: previous
          })
        })
      }
    }
  }, Tab.prototype.activate = function(element, container, callback) {
    function next() {
      $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), element.addClass("active"), transition ? (element[0].offsetWidth, element.addClass("in")) : element.removeClass("fade"), element.parent(".dropdown-menu") && element.closest("li.dropdown").addClass("active"), callback && callback()
    }
    var $active = container.find("> .active"),
      transition = callback && $.support.transition && $active.hasClass("fade");
    transition ? $active.one($.support.transition.end, next).emulateTransitionEnd(150) : next(), $active.removeClass("in")
  };
  var old = $.fn.tab;
  $.fn.tab = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data("bs.tab");
      data || $this.data("bs.tab", data = new Tab(this)), "string" == typeof option && data[option]()
    })
  }, $.fn.tab.Constructor = Tab, $.fn.tab.noConflict = function() {
    return $.fn.tab = old, this
  }, $(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
    e.preventDefault(), $(this).tab("show")
  })
}(jQuery), + function($) {
  "use strict";
  var Affix = function(element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options), this.$window = $(window).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this)), this.$element = $(element), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
  };
  Affix.RESET = "affix affix-top affix-bottom", Affix.DEFAULTS = {
    offset: 0
  }, Affix.prototype.getPinnedOffset = function() {
    if(this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(Affix.RESET).addClass("affix");
    var scrollTop = this.$window.scrollTop(),
      position = this.$element.offset();
    return this.pinnedOffset = position.top - scrollTop
  }, Affix.prototype.checkPositionWithEventLoop = function() {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }, Affix.prototype.checkPosition = function() {
    if(this.$element.is(":visible")) {
      var scrollHeight = $(document).height(),
        scrollTop = this.$window.scrollTop(),
        position = this.$element.offset(),
        offset = this.options.offset,
        offsetTop = offset.top,
        offsetBottom = offset.bottom;
      "top" == this.affixed && (position.top += scrollTop), "object" != typeof offset && (offsetBottom = offsetTop = offset), "function" == typeof offsetTop && (offsetTop = offset.top(this.$element)), "function" == typeof offsetBottom && (offsetBottom = offset.bottom(this.$element));
      var affix = null != this.unpin && scrollTop + this.unpin <= position.top ? !1 : null != offsetBottom && position.top + this.$element.height() >= scrollHeight - offsetBottom ? "bottom" : null != offsetTop && offsetTop >= scrollTop ? "top" : !1;
      if(this.affixed !== affix) {
        this.unpin && this.$element.css("top", "");
        var affixType = "affix" + (affix ? "-" + affix : ""),
          e = $.Event(affixType + ".bs.affix");
        this.$element.trigger(e), e.isDefaultPrevented() || (this.affixed = affix, this.unpin = "bottom" == affix ? this.getPinnedOffset() : null, this.$element.removeClass(Affix.RESET).addClass(affixType).trigger($.Event(affixType.replace("affix", "affixed"))), "bottom" == affix && this.$element.offset({
          top: scrollHeight - offsetBottom - this.$element.height()
        }))
      }
    }
  };
  var old = $.fn.affix;
  $.fn.affix = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data("bs.affix"),
        options = "object" == typeof option && option;
      data || $this.data("bs.affix", data = new Affix(this, options)), "string" == typeof option && data[option]()
    })
  }, $.fn.affix.Constructor = Affix, $.fn.affix.noConflict = function() {
    return $.fn.affix = old, this
  }, $(window).on("load", function() {
    $('[data-spy="affix"]').each(function() {
      var $spy = $(this),
        data = $spy.data();
      data.offset = data.offset || {}, data.offsetBottom && (data.offset.bottom = data.offsetBottom), data.offsetTop && (data.offset.top = data.offsetTop), $spy.affix(data)
    })
  })
}(jQuery),
function(window, $) {
  var Superslides, plugin = "superslides";
  Superslides = function(el, options) {
    this.options = $.extend({
      play: !1,
      animation_speed: 600,
      animation_easing: "swing",
      animation: "slide",
      inherit_width_from: window,
      inherit_height_from: window,
      pagination: !0,
      hashchange: !1,
      scrollable: !0,
      elements: {
        preserve: ".preserve",
        nav: ".slides-navigation",
        container: ".slides-container",
        pagination: ".slides-pagination"
      }
    }, options);
    var that = this,
      $control = $("<div>", {
        "class": "slides-control"
      }),
      multiplier = 1;
    this.$el = $(el), this.$container = this.$el.find(this.options.elements.container);
    var initialize = function() {
      return multiplier = that._findMultiplier(), that.$el.on("click", that.options.elements.nav + " a", function(e) {
        e.preventDefault(), that.stop(), $(this).hasClass("next") ? that.animate("next", function() {
          that.start()
        }) : that.animate("prev", function() {
          that.start()
        })
      }), $(document).on("keyup", function(e) {
        37 === e.keyCode && that.animate("prev"), 39 === e.keyCode && that.animate("next")
      }), $(window).on("resize", function() {
        setTimeout(function() {
          var $children = that.$container.children();
          that.width = that._findWidth(), that.height = that._findHeight(), $children.css({
            width: that.width,
            left: that.width
          }), that.css.containers(), that.css.images()
        }, 10)
      }), $(window).on("hashchange", function() {
        var index, hash = that._parseHash();
        index = that._upcomingSlide(hash && !isNaN(hash) ? hash - 1 : hash), index >= 0 && index !== that.current && that.animate(index)
      }), that.pagination._events(), that.start(), that
    }, css = {
        containers: function() {
          that.init ? (that.$el.css({
            height: that.height
          }), that.$control.css({
            width: that.width * multiplier,
            left: -that.width
          }), that.$container.css({})) : ($("body").css({
            margin: 0
          }), that.$el.css({
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: that.height
          }), that.$control.css({
            position: "relative",
            transform: "translate3d(0)",
            height: "100%",
            width: that.width * multiplier,
            left: -that.width
          }), that.$container.css({
            display: "none",
            margin: "0",
            padding: "0",
            listStyle: "none",
            position: "relative",
            height: "100%"
          })), 1 === that.size() && that.$el.find(that.options.elements.nav).hide()
        },
        images: function() {
          var $images = that.$container.find("img").not(that.options.elements.preserve);
          $images.removeAttr("width").removeAttr("height").css({
            "-webkit-backface-visibility": "hidden",
            "-ms-interpolation-mode": "bicubic",
            position: "absolute",
            left: "0",
            top: "0",
            "z-index": "-1",
            "max-width": "none"
          }), $images.each(function() {
            var image_aspect_ratio = that.image._aspectRatio(this),
              image = this;
            if($.data(this, "processed")) that.image._scale(image, image_aspect_ratio), that.image._center(image, image_aspect_ratio);
            else {
              var img = new Image;
              img.onload = function() {
                that.image._scale(image, image_aspect_ratio), that.image._center(image, image_aspect_ratio), $.data(image, "processed", !0)
              }, img.src = this.src
            }
          })
        },
        children: function() {
          var $children = that.$container.children();
          $children.is("img") && ($children.each(function() {
            if($(this).is("img")) {
              $(this).wrap("<div>");
              var id = $(this).attr("id");
              $(this).removeAttr("id"), $(this).parent().attr("id", id)
            }
          }), $children = that.$container.children()), that.init || $children.css({
            display: "none",
            left: 2 * that.width
          }), $children.css({
            position: "absolute",
            overflow: "hidden",
            height: "100%",
            width: that.width,
            top: 0,
            zIndex: 0
          })
        }
      }, fx = {
        slide: function(orientation, complete) {
          var $children = that.$container.children(),
            $target = $children.eq(orientation.upcoming_slide);
          $target.css({
            left: orientation.upcoming_position,
            display: "block"
          }), that.$control.animate({
            left: orientation.offset
          }, that.options.animation_speed, that.options.animation_easing, function() {
            that.size() > 1 && (that.$control.css({
              left: -that.width
            }), $children.eq(orientation.upcoming_slide).css({
              left: that.width,
              zIndex: 2
            }), orientation.outgoing_slide >= 0 && $children.eq(orientation.outgoing_slide).css({
              left: that.width,
              display: "none",
              zIndex: 0
            })), complete()
          })
        },
        fade: function(orientation, complete) {
          var that = this,
            $children = that.$container.children(),
            $outgoing = $children.eq(orientation.outgoing_slide),
            $target = $children.eq(orientation.upcoming_slide);
          $target.css({
            left: this.width,
            opacity: 1,
            display: "block"
          }), orientation.outgoing_slide >= 0 ? $outgoing.animate({
            opacity: 0
          }, that.options.animation_speed, that.options.animation_easing, function() {
            that.size() > 1 && ($children.eq(orientation.upcoming_slide).css({
              zIndex: 2
            }), orientation.outgoing_slide >= 0 && $children.eq(orientation.outgoing_slide).css({
              opacity: 1,
              display: "none",
              zIndex: 0
            })), complete()
          }) : ($target.css({
            zIndex: 2
          }), complete())
        }
      };
    fx = $.extend(fx, $.fn.superslides.fx);
    var image = {
      _centerY: function(image) {
        var $img = $(image);
        $img.css({
          top: (that.height - $img.height()) / 2
        })
      },
      _centerX: function(image) {
        var $img = $(image);
        $img.css({
          left: (that.width - $img.width()) / 2
        })
      },
      _center: function(image) {
        that.image._centerX(image), that.image._centerY(image)
      },
      _aspectRatio: function(image) {
        if(!image.naturalHeight && !image.naturalWidth) {
          var img = new Image;
          img.src = image.src, image.naturalHeight = img.height, image.naturalWidth = img.width
        }
        return image.naturalHeight / image.naturalWidth
      },
      _scale: function(image, image_aspect_ratio) {
        image_aspect_ratio = image_aspect_ratio || that.image._aspectRatio(image);
        var container_aspect_ratio = that.height / that.width,
          $img = $(image);
        $img.css(container_aspect_ratio > image_aspect_ratio ? {
          height: that.height,
          width: that.height / image_aspect_ratio
        } : {
          height: that.width * image_aspect_ratio,
          width: that.width
        })
      }
    }, pagination = {
        _setCurrent: function(i) {
          if(that.$pagination) {
            var $pagination_children = that.$pagination.children();
            $pagination_children.removeClass("current"), $pagination_children.eq(i).addClass("current")
          }
        },
        _addItem: function(i) {
          var slide_number = i + 1,
            href = slide_number,
            $slide = that.$container.children().eq(i),
            slide_id = $slide.attr("id");
          slide_id && (href = slide_id);
          var $item = $("<a>", {
            href: "#" + href,
            text: href
          });
          $item.appendTo(that.$pagination)
        },
        _setup: function() {
          if(that.options.pagination && 1 !== that.size()) {
            var $pagination = $("<nav>", {
              "class": that.options.elements.pagination.replace(/^\./, "")
            });
            that.$pagination = $pagination.appendTo(that.$el);
            for(var i = 0; i < that.size(); i++) that.pagination._addItem(i)
          }
        },
        _events: function() {
          that.$el.on("click", that.options.elements.pagination + " a", function(e) {
            e.preventDefault();
            var hash = that._parseHash(this.hash),
              index = that._upcomingSlide(hash - 1);
            index !== that.current && that.animate(index, function() {
              that.start()
            })
          })
        }
      };
    return this.css = css, this.image = image, this.pagination = pagination, this.fx = fx, this.animation = this.fx[this.options.animation], this.$control = this.$container.wrap($control).parent(".slides-control"), that._findPositions(), that.width = that._findWidth(), that.height = that._findHeight(), this.css.children(), this.css.containers(), this.css.images(), this.pagination._setup(), initialize()
  }, Superslides.prototype = {
    _findWidth: function() {
      return $(this.options.inherit_width_from).width()
    },
    _findHeight: function() {
      return $(this.options.inherit_height_from).height()
    },
    _findMultiplier: function() {
      return 1 === this.size() ? 1 : 3
    },
    _upcomingSlide: function(direction) {
      if(/next/.test(direction)) return this._nextInDom();
      if(/prev/.test(direction)) return this._prevInDom();
      if(/\d/.test(direction)) return +direction;
      if(direction && /\w/.test(direction)) {
        var index = this._findSlideById(direction);
        return index >= 0 ? index : 0
      }
      return 0
    },
    _findSlideById: function(id) {
      return this.$container.find("#" + id).index()
    },
    _findPositions: function(current, thisRef) {
      thisRef = thisRef || this, void 0 === current && (current = -1), thisRef.current = current, thisRef.next = thisRef._nextInDom(), thisRef.prev = thisRef._prevInDom()
    },
    _nextInDom: function() {
      var index = this.current + 1;
      return index === this.size() && (index = 0), index
    },
    _prevInDom: function() {
      var index = this.current - 1;
      return 0 > index && (index = this.size() - 1), index
    },
    _parseHash: function(hash) {
      return hash = hash || window.location.hash, hash = hash.replace(/^#/, ""), hash && !isNaN(+hash) && (hash = +hash), hash
    },
    size: function() {
      return this.$container.children().length
    },
    destroy: function() {
      return this.$el.removeData()
    },
    update: function() {
      this.css.children(), this.css.containers(), this.css.images(), this.pagination._addItem(this.size()), this._findPositions(this.current), this.$el.trigger("updated.slides")
    },
    stop: function() {
      clearInterval(this.play_id), delete this.play_id, this.$el.trigger("stopped.slides")
    },
    start: function() {
      var that = this;
      that.options.hashchange ? $(window).trigger("hashchange") : this.animate(), this.options.play && (this.play_id && this.stop(), this.play_id = setInterval(function() {
        that.animate()
      }, this.options.play)), this.$el.trigger("started.slides")
    },
    animate: function(direction, userCallback) {
      var that = this,
        orientation = {};
      if(!(this.animating || (this.animating = !0, void 0 === direction && (direction = "next"), orientation.upcoming_slide = this._upcomingSlide(direction), orientation.upcoming_slide >= this.size()))) {
        if(orientation.outgoing_slide = this.current, orientation.upcoming_position = 2 * this.width, orientation.offset = -orientation.upcoming_position, ("prev" === direction || direction < orientation.outgoing_slide) && (orientation.upcoming_position = 0, orientation.offset = 0), that.size() > 1 && that.pagination._setCurrent(orientation.upcoming_slide), that.options.hashchange) {
          var hash = orientation.upcoming_slide + 1,
            id = that.$container.children(":eq(" + orientation.upcoming_slide + ")").attr("id");
          window.location.hash = id ? id : hash
        }
        that.$el.trigger("animating.slides", [orientation]), that.animation(orientation, function() {
          that._findPositions(orientation.upcoming_slide, that), "function" == typeof userCallback && userCallback(), that.animating = !1, that.$el.trigger("animated.slides"), that.init || (that.$el.trigger("init.slides"), that.init = !0, that.$container.fadeIn("fast"))
        })
      }
    }
  }, $.fn[plugin] = function(option, args) {
    var result = [];
    return this.each(function() {
      var $this, data, options;
      return $this = $(this), data = $this.data(plugin), options = "object" == typeof option && option, data || (result = $this.data(plugin, data = new Superslides(this, options))), "string" == typeof option && (result = data[option], "function" == typeof result) ? result = result.call(data, args) : void 0
    }), result
  }, $.fn[plugin].fx = {}
}(this, jQuery),
function($, window, document, undefined) {
  function Plugin(element, options) {
    this.element = element, this.options = $.extend({}, defaults, options), this._defaults = defaults, this._name = pluginName, this.init()
  }
  var pluginName = "stellar",
    defaults = {
      scrollProperty: "scroll",
      positionProperty: "position",
      horizontalScrolling: !0,
      verticalScrolling: !0,
      horizontalOffset: 0,
      verticalOffset: 0,
      responsive: !1,
      parallaxBackgrounds: !0,
      parallaxElements: !0,
      hideDistantElements: !0,
      hideElement: function($elem) {
        $elem.hide()
      },
      showElement: function($elem) {
        $elem.show()
      }
    }, scrollProperty = {
      scroll: {
        getLeft: function($elem) {
          return $elem.scrollLeft()
        },
        setLeft: function($elem, val) {
          $elem.scrollLeft(val)
        },
        getTop: function($elem) {
          return $elem.scrollTop()
        },
        setTop: function($elem, val) {
          $elem.scrollTop(val)
        }
      },
      position: {
        getLeft: function($elem) {
          return -1 * parseInt($elem.css("left"), 10)
        },
        getTop: function($elem) {
          return -1 * parseInt($elem.css("top"), 10)
        }
      },
      margin: {
        getLeft: function($elem) {
          return -1 * parseInt($elem.css("margin-left"), 10)
        },
        getTop: function($elem) {
          return -1 * parseInt($elem.css("margin-top"), 10)
        }
      },
      transform: {
        getLeft: function($elem) {
          var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
          return "none" !== computedTransform ? -1 * parseInt(computedTransform.match(/(-?[0-9]+)/g)[4], 10) : 0
        },
        getTop: function($elem) {
          var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
          return "none" !== computedTransform ? -1 * parseInt(computedTransform.match(/(-?[0-9]+)/g)[5], 10) : 0
        }
      }
    }, positionProperty = {
      position: {
        setLeft: function($elem, left) {
          $elem.css("left", left)
        },
        setTop: function($elem, top) {
          $elem.css("top", top)
        }
      },
      transform: {
        setPosition: function($elem, left, startingLeft, top, startingTop) {
          $elem[0].style[prefixedTransform] = "translate3d(" + (left - startingLeft) + "px, " + (top - startingTop) + "px, 0)"
        }
      }
    }, vendorPrefix = function() {
      var prop, prefixes = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
        style = $("script")[0].style,
        prefix = "";
      for(prop in style)
        if(prefixes.test(prop)) {
          prefix = prop.match(prefixes)[0];
          break
        }
      return "WebkitOpacity" in style && (prefix = "Webkit"), "KhtmlOpacity" in style && (prefix = "Khtml"),
      function(property) {
        return prefix + (prefix.length > 0 ? property.charAt(0).toUpperCase() + property.slice(1) : property)
      }
    }(),
    prefixedTransform = vendorPrefix("transform"),
    supportsBackgroundPositionXY = $("<div />", {
      style: "background:#fff"
    }).css("background-position-x") !== undefined,
    setBackgroundPosition = supportsBackgroundPositionXY ? function($elem, x, y) {
      $elem.css({
        "background-position-x": x,
        "background-position-y": y
      })
    } : function($elem, x, y) {
      $elem.css("background-position", x + " " + y)
    }, getBackgroundPosition = supportsBackgroundPositionXY ? function($elem) {
      return [$elem.css("background-position-x"), $elem.css("background-position-y")]
    } : function($elem) {
      return $elem.css("background-position").split(" ")
    }, requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      setTimeout(callback, 1e3 / 60)
    };
  Plugin.prototype = {
    init: function() {
      this.options.name = pluginName + "_" + Math.floor(1e9 * Math.random()), this._defineElements(), this._defineGetters(), this._defineSetters(), this._handleWindowLoadAndResize(), this._detectViewport(), this.refresh({
        firstLoad: !0
      }), "scroll" === this.options.scrollProperty ? this._handleScrollEvent() : this._startAnimationLoop()
    },
    _defineElements: function() {
      this.element === document.body && (this.element = window), this.$scrollElement = $(this.element), this.$element = this.element === window ? $("body") : this.$scrollElement, this.$viewportElement = this.options.viewportElement !== undefined ? $(this.options.viewportElement) : this.$scrollElement[0] === window || "scroll" === this.options.scrollProperty ? this.$scrollElement : this.$scrollElement.parent()
    },
    _defineGetters: function() {
      var self = this,
        scrollPropertyAdapter = scrollProperty[self.options.scrollProperty];
      this._getScrollLeft = function() {
        return scrollPropertyAdapter.getLeft(self.$scrollElement)
      }, this._getScrollTop = function() {
        return scrollPropertyAdapter.getTop(self.$scrollElement)
      }
    },
    _defineSetters: function() {
      var self = this,
        scrollPropertyAdapter = scrollProperty[self.options.scrollProperty],
        positionPropertyAdapter = positionProperty[self.options.positionProperty],
        setScrollLeft = scrollPropertyAdapter.setLeft,
        setScrollTop = scrollPropertyAdapter.setTop;
      this._setScrollLeft = "function" == typeof setScrollLeft ? function(val) {
        setScrollLeft(self.$scrollElement, val)
      } : $.noop, this._setScrollTop = "function" == typeof setScrollTop ? function(val) {
        setScrollTop(self.$scrollElement, val)
      } : $.noop, this._setPosition = positionPropertyAdapter.setPosition || function($elem, left, startingLeft, top, startingTop) {
        self.options.horizontalScrolling && positionPropertyAdapter.setLeft($elem, left, startingLeft), self.options.verticalScrolling && positionPropertyAdapter.setTop($elem, top, startingTop)
      }
    },
    _handleWindowLoadAndResize: function() {
      var self = this,
        $window = $(window);
      self.options.responsive && $window.bind("load." + this.name, function() {
        self.refresh()
      }), $window.bind("resize." + this.name, function() {
        self._detectViewport(), self.options.responsive && self.refresh()
      })
    },
    refresh: function(options) {
      var self = this,
        oldLeft = self._getScrollLeft(),
        oldTop = self._getScrollTop();
      options && options.firstLoad || this._reset(), this._setScrollLeft(0), this._setScrollTop(0), this._setOffsets(), this._findParticles(), this._findBackgrounds(), options && options.firstLoad && /WebKit/.test(navigator.userAgent) && $(window).load(function() {
        var oldLeft = self._getScrollLeft(),
          oldTop = self._getScrollTop();
        self._setScrollLeft(oldLeft + 1), self._setScrollTop(oldTop + 1), self._setScrollLeft(oldLeft), self._setScrollTop(oldTop)
      }), this._setScrollLeft(oldLeft), this._setScrollTop(oldTop)
    },
    _detectViewport: function() {
      var viewportOffsets = this.$viewportElement.offset(),
        hasOffsets = null !== viewportOffsets && viewportOffsets !== undefined;
      this.viewportWidth = this.$viewportElement.width(), this.viewportHeight = this.$viewportElement.height(), this.viewportOffsetTop = hasOffsets ? viewportOffsets.top : 0, this.viewportOffsetLeft = hasOffsets ? viewportOffsets.left : 0
    },
    _findParticles: function() {
      {
        var self = this;
        this._getScrollLeft(), this._getScrollTop()
      }
      if(this.particles !== undefined)
        for(var i = this.particles.length - 1; i >= 0; i--) this.particles[i].$element.data("stellar-elementIsActive", undefined);
      this.particles = [], this.options.parallaxElements && this.$element.find("[data-stellar-ratio]").each(function() {
        var horizontalOffset, verticalOffset, positionLeft, positionTop, marginLeft, marginTop, $offsetParent, offsetLeft, offsetTop, $this = $(this),
          parentOffsetLeft = 0,
          parentOffsetTop = 0,
          tempParentOffsetLeft = 0,
          tempParentOffsetTop = 0;
        if($this.data("stellar-elementIsActive")) {
          if($this.data("stellar-elementIsActive") !== this) return
        } else $this.data("stellar-elementIsActive", this);
        self.options.showElement($this), $this.data("stellar-startingLeft") ? ($this.css("left", $this.data("stellar-startingLeft")), $this.css("top", $this.data("stellar-startingTop"))) : ($this.data("stellar-startingLeft", $this.css("left")), $this.data("stellar-startingTop", $this.css("top"))), positionLeft = $this.position().left, positionTop = $this.position().top, marginLeft = "auto" === $this.css("margin-left") ? 0 : parseInt($this.css("margin-left"), 10), marginTop = "auto" === $this.css("margin-top") ? 0 : parseInt($this.css("margin-top"), 10), offsetLeft = $this.offset().left - marginLeft, offsetTop = $this.offset().top - marginTop, $this.parents().each(function() {
          var $this = $(this);
          return $this.data("stellar-offset-parent") === !0 ? (parentOffsetLeft = tempParentOffsetLeft, parentOffsetTop = tempParentOffsetTop, $offsetParent = $this, !1) : (tempParentOffsetLeft += $this.position().left, void(tempParentOffsetTop += $this.position().top))
        }), horizontalOffset = $this.data("stellar-horizontal-offset") !== undefined ? $this.data("stellar-horizontal-offset") : $offsetParent !== undefined && $offsetParent.data("stellar-horizontal-offset") !== undefined ? $offsetParent.data("stellar-horizontal-offset") : self.horizontalOffset, verticalOffset = $this.data("stellar-vertical-offset") !== undefined ? $this.data("stellar-vertical-offset") : $offsetParent !== undefined && $offsetParent.data("stellar-vertical-offset") !== undefined ? $offsetParent.data("stellar-vertical-offset") : self.verticalOffset, self.particles.push({
          $element: $this,
          $offsetParent: $offsetParent,
          isFixed: "fixed" === $this.css("position"),
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset,
          startingPositionLeft: positionLeft,
          startingPositionTop: positionTop,
          startingOffsetLeft: offsetLeft,
          startingOffsetTop: offsetTop,
          parentOffsetLeft: parentOffsetLeft,
          parentOffsetTop: parentOffsetTop,
          stellarRatio: $this.data("stellar-ratio") !== undefined ? $this.data("stellar-ratio") : 1,
          width: $this.outerWidth(!0),
          height: $this.outerHeight(!0),
          isHidden: !1
        })
      })
    },
    _findBackgrounds: function() {
      var $backgroundElements, self = this,
        scrollLeft = this._getScrollLeft(),
        scrollTop = this._getScrollTop();
      this.backgrounds = [], this.options.parallaxBackgrounds && ($backgroundElements = this.$element.find("[data-stellar-background-ratio]"), this.$element.data("stellar-background-ratio") && ($backgroundElements = $backgroundElements.add(this.$element)), $backgroundElements.each(function() {
        var horizontalOffset, verticalOffset, marginLeft, marginTop, offsetLeft, offsetTop, $offsetParent, $this = $(this),
          backgroundPosition = getBackgroundPosition($this),
          parentOffsetLeft = 0,
          parentOffsetTop = 0,
          tempParentOffsetLeft = 0,
          tempParentOffsetTop = 0;
        if($this.data("stellar-backgroundIsActive")) {
          if($this.data("stellar-backgroundIsActive") !== this) return
        } else $this.data("stellar-backgroundIsActive", this);
        $this.data("stellar-backgroundStartingLeft") ? setBackgroundPosition($this, $this.data("stellar-backgroundStartingLeft"), $this.data("stellar-backgroundStartingTop")) : ($this.data("stellar-backgroundStartingLeft", backgroundPosition[0]), $this.data("stellar-backgroundStartingTop", backgroundPosition[1])), marginLeft = "auto" === $this.css("margin-left") ? 0 : parseInt($this.css("margin-left"), 10), marginTop = "auto" === $this.css("margin-top") ? 0 : parseInt($this.css("margin-top"), 10), offsetLeft = $this.offset().left - marginLeft - scrollLeft, offsetTop = $this.offset().top - marginTop - scrollTop, $this.parents().each(function() {
          var $this = $(this);
          return $this.data("stellar-offset-parent") === !0 ? (parentOffsetLeft = tempParentOffsetLeft, parentOffsetTop = tempParentOffsetTop, $offsetParent = $this, !1) : (tempParentOffsetLeft += $this.position().left, void(tempParentOffsetTop += $this.position().top))
        }), horizontalOffset = $this.data("stellar-horizontal-offset") !== undefined ? $this.data("stellar-horizontal-offset") : $offsetParent !== undefined && $offsetParent.data("stellar-horizontal-offset") !== undefined ? $offsetParent.data("stellar-horizontal-offset") : self.horizontalOffset, verticalOffset = $this.data("stellar-vertical-offset") !== undefined ? $this.data("stellar-vertical-offset") : $offsetParent !== undefined && $offsetParent.data("stellar-vertical-offset") !== undefined ? $offsetParent.data("stellar-vertical-offset") : self.verticalOffset, self.backgrounds.push({
          $element: $this,
          $offsetParent: $offsetParent,
          isFixed: "fixed" === $this.css("background-attachment"),
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset,
          startingValueLeft: backgroundPosition[0],
          startingValueTop: backgroundPosition[1],
          startingBackgroundPositionLeft: isNaN(parseInt(backgroundPosition[0], 10)) ? 0 : parseInt(backgroundPosition[0], 10),
          startingBackgroundPositionTop: isNaN(parseInt(backgroundPosition[1], 10)) ? 0 : parseInt(backgroundPosition[1], 10),
          startingPositionLeft: $this.position().left,
          startingPositionTop: $this.position().top,
          startingOffsetLeft: offsetLeft,
          startingOffsetTop: offsetTop,
          parentOffsetLeft: parentOffsetLeft,
          parentOffsetTop: parentOffsetTop,
          stellarRatio: $this.data("stellar-background-ratio") === undefined ? 1 : $this.data("stellar-background-ratio")
        })
      }))
    },
    _reset: function() {
      var particle, startingPositionLeft, startingPositionTop, background, i;
      for(i = this.particles.length - 1; i >= 0; i--) particle = this.particles[i], startingPositionLeft = particle.$element.data("stellar-startingLeft"), startingPositionTop = particle.$element.data("stellar-startingTop"), this._setPosition(particle.$element, startingPositionLeft, startingPositionLeft, startingPositionTop, startingPositionTop), this.options.showElement(particle.$element), particle.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null);
      for(i = this.backgrounds.length - 1; i >= 0; i--) background = this.backgrounds[i], background.$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null), setBackgroundPosition(background.$element, background.startingValueLeft, background.startingValueTop)
    },
    destroy: function() {
      this._reset(), this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name), this._animationLoop = $.noop, $(window).unbind("load." + this.name).unbind("resize." + this.name)
    },
    _setOffsets: function() {
      var self = this,
        $window = $(window);
      $window.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name), "function" == typeof this.options.horizontalOffset ? (this.horizontalOffset = this.options.horizontalOffset(), $window.bind("resize.horizontal-" + this.name, function() {
        self.horizontalOffset = self.options.horizontalOffset()
      })) : this.horizontalOffset = this.options.horizontalOffset, "function" == typeof this.options.verticalOffset ? (this.verticalOffset = this.options.verticalOffset(), $window.bind("resize.vertical-" + this.name, function() {
        self.verticalOffset = self.options.verticalOffset()
      })) : this.verticalOffset = this.options.verticalOffset
    },
    _repositionElements: function() {
      var particle, fixedRatioOffset, background, bgLeft, bgTop, newPositionLeft, newPositionTop, newOffsetLeft, newOffsetTop, i, scrollLeft = this._getScrollLeft(),
        scrollTop = this._getScrollTop(),
        isVisibleVertical = !0,
        isVisibleHorizontal = !0;
      if(this.currentScrollLeft !== scrollLeft || this.currentScrollTop !== scrollTop || this.currentWidth !== this.viewportWidth || this.currentHeight !== this.viewportHeight) {
        for(this.currentScrollLeft = scrollLeft, this.currentScrollTop = scrollTop, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight, i = this.particles.length - 1; i >= 0; i--) particle = this.particles[i], fixedRatioOffset = particle.isFixed ? 1 : 0, this.options.horizontalScrolling ? (newPositionLeft = (scrollLeft + particle.horizontalOffset + this.viewportOffsetLeft + particle.startingPositionLeft - particle.startingOffsetLeft + particle.parentOffsetLeft) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionLeft, newOffsetLeft = newPositionLeft - particle.startingPositionLeft + particle.startingOffsetLeft) : (newPositionLeft = particle.startingPositionLeft, newOffsetLeft = particle.startingOffsetLeft), this.options.verticalScrolling ? (newPositionTop = (scrollTop + particle.verticalOffset + this.viewportOffsetTop + particle.startingPositionTop - particle.startingOffsetTop + particle.parentOffsetTop) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionTop, newOffsetTop = newPositionTop - particle.startingPositionTop + particle.startingOffsetTop) : (newPositionTop = particle.startingPositionTop, newOffsetTop = particle.startingOffsetTop), this.options.hideDistantElements && (isVisibleHorizontal = !this.options.horizontalScrolling || newOffsetLeft + particle.width > (particle.isFixed ? 0 : scrollLeft) && newOffsetLeft < (particle.isFixed ? 0 : scrollLeft) + this.viewportWidth + this.viewportOffsetLeft, isVisibleVertical = !this.options.verticalScrolling || newOffsetTop + particle.height > (particle.isFixed ? 0 : scrollTop) && newOffsetTop < (particle.isFixed ? 0 : scrollTop) + this.viewportHeight + this.viewportOffsetTop), isVisibleHorizontal && isVisibleVertical ? (particle.isHidden && (this.options.showElement(particle.$element), particle.isHidden = !1), this._setPosition(particle.$element, newPositionLeft, particle.startingPositionLeft, newPositionTop, particle.startingPositionTop)) : particle.isHidden || (this.options.hideElement(particle.$element), particle.isHidden = !0);
        for(i = this.backgrounds.length - 1; i >= 0; i--) background = this.backgrounds[i], fixedRatioOffset = background.isFixed ? 0 : 1, bgLeft = this.options.horizontalScrolling ? (scrollLeft + background.horizontalOffset - this.viewportOffsetLeft - background.startingOffsetLeft + background.parentOffsetLeft - background.startingBackgroundPositionLeft) * (fixedRatioOffset - background.stellarRatio) + "px" : background.startingValueLeft, bgTop = this.options.verticalScrolling ? (scrollTop + background.verticalOffset - this.viewportOffsetTop - background.startingOffsetTop + background.parentOffsetTop - background.startingBackgroundPositionTop) * (fixedRatioOffset - background.stellarRatio) + "px" : background.startingValueTop, setBackgroundPosition(background.$element, bgLeft, bgTop)
      }
    },
    _handleScrollEvent: function() {
      var self = this,
        ticking = !1,
        update = function() {
          self._repositionElements(), ticking = !1
        }, requestTick = function() {
          ticking || (requestAnimFrame(update), ticking = !0)
        };
      this.$scrollElement.bind("scroll." + this.name, requestTick), requestTick()
    },
    _startAnimationLoop: function() {
      var self = this;
      this._animationLoop = function() {
        requestAnimFrame(self._animationLoop), self._repositionElements()
      }, this._animationLoop()
    }
  }, $.fn[pluginName] = function(options) {
    var args = arguments;
    return options === undefined || "object" == typeof options ? this.each(function() {
      $.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new Plugin(this, options))
    }) : "string" == typeof options && "_" !== options[0] && "init" !== options ? this.each(function() {
      var instance = $.data(this, "plugin_" + pluginName);
      instance instanceof Plugin && "function" == typeof instance[options] && instance[options].apply(instance, Array.prototype.slice.call(args, 1)), "destroy" === options && $.data(this, "plugin_" + pluginName, null)
    }) : void 0
  }, $[pluginName] = function() {
    var $window = $(window);
    return $window.stellar.apply($window, Array.prototype.slice.call(arguments, 0))
  }, $[pluginName].scrollProperty = scrollProperty, $[pluginName].positionProperty = positionProperty, window.Stellar = Plugin
}(jQuery, this, document),
function($) {
  var defaults = {
    topSpacing: 0,
    bottomSpacing: 0,
    className: "is-sticky",
    wrapperClassName: "sticky-wrapper",
    center: !1,
    getWidthFrom: ""
  }, $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      for(var scrollTop = $window.scrollTop(), documentHeight = $document.height(), dwh = documentHeight - windowHeight, extra = scrollTop > dwh ? dwh - scrollTop : 0, i = 0; i < sticked.length; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;
        if(etse >= scrollTop) null !== s.currentTop && (s.stickyElement.css("position", "").css("top", ""), s.stickyElement.parent().removeClass(s.className), s.currentTop = null);
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight() - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          0 > newTop ? newTop += s.topSpacing : newTop = s.topSpacing, s.currentTop != newTop && (s.stickyElement.css("position", "fixed").css("top", newTop), "undefined" != typeof s.getWidthFrom && s.stickyElement.css("width", $(s.getWidthFrom).width()), s.stickyElement.parent().addClass(s.className), s.currentTop = newTop)
        }
      }
    }, resizer = function() {
      windowHeight = $window.height()
    }, methods = {
      init: function(options) {
        var o = $.extend(defaults, options);
        return this.each(function() {
          var stickyElement = $(this),
            stickyId = stickyElement.attr("id"),
            wrapper = $("<div></div>").attr("id", stickyId + "-sticky-wrapper").addClass(o.wrapperClassName);
          stickyElement.wrapAll(wrapper), o.center && stickyElement.parent().css({
            width: stickyElement.outerWidth(),
            marginLeft: "auto",
            marginRight: "auto"
          }), "right" == stickyElement.css("float") && stickyElement.css({
            "float": "none"
          }).parent().css({
            "float": "right"
          });
          var stickyWrapper = stickyElement.parent();
          stickyWrapper.css("height", stickyElement.outerHeight()), sticked.push({
            topSpacing: o.topSpacing,
            bottomSpacing: o.bottomSpacing,
            stickyElement: stickyElement,
            currentTop: null,
            stickyWrapper: stickyWrapper,
            className: o.className,
            getWidthFrom: o.getWidthFrom
          })
        })
      },
      update: scroller,
      unstick: function() {
        return this.each(function() {
          var unstickyElement = $(this);
          removeIdx = -1;
          for(var i = 0; i < sticked.length; i++) sticked[i].stickyElement.get(0) == unstickyElement.get(0) && (removeIdx = i); - 1 != removeIdx && (sticked.splice(removeIdx, 1), unstickyElement.unwrap(), unstickyElement.removeAttr("style"))
        })
      }
    };
  window.addEventListener ? (window.addEventListener("scroll", scroller, !1), window.addEventListener("resize", resizer, !1)) : window.attachEvent && (window.attachEvent("onscroll", scroller), window.attachEvent("onresize", resizer)), $.fn.sticky = function(method) {
    return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery.sticky") : methods.init.apply(this, arguments)
  }, $.fn.unstick = function(method) {
    return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery.sticky") : methods.unstick.apply(this, arguments)
  }, $(function() {
    setTimeout(scroller, 0)
  })
}(jQuery),
function(window) {
  function noop() {}

  function defineBridget($) {
    function addOptionMethod(PluginClass) {
      PluginClass.prototype.option || (PluginClass.prototype.option = function(opts) {
        $.isPlainObject(opts) && (this.options = $.extend(!0, this.options, opts))
      })
    }

    function bridge(namespace, PluginClass) {
      $.fn[namespace] = function(options) {
        if("string" == typeof options) {
          for(var args = slice.call(arguments, 1), i = 0, len = this.length; len > i; i++) {
            var elem = this[i],
              instance = $.data(elem, namespace);
            if(instance)
              if($.isFunction(instance[options]) && "_" !== options.charAt(0)) {
                var returnValue = instance[options].apply(instance, args);
                if(void 0 !== returnValue) return returnValue
              } else logError("no such method '" + options + "' for " + namespace + " instance");
              else logError("cannot call methods on " + namespace + " prior to initialization; attempted to call '" + options + "'")
          }
          return this
        }
        return this.each(function() {
          var instance = $.data(this, namespace);
          instance ? (instance.option(options), instance._init()) : (instance = new PluginClass(this, options), $.data(this, namespace, instance))
        })
      }
    }
    if($) {
      var logError = "undefined" == typeof console ? noop : function(message) {
          console.error(message)
        };
      return $.bridget = function(namespace, PluginClass) {
        addOptionMethod(PluginClass), bridge(namespace, PluginClass)
      }, $.bridget
    }
  }
  var slice = Array.prototype.slice;
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], defineBridget) : defineBridget(window.jQuery)
}(window),
function(window) {
  function getIEEvent(obj) {
    var event = window.event;
    return event.target = event.target || event.srcElement || obj, event
  }
  var docElem = document.documentElement,
    bind = function() {};
  docElem.addEventListener ? bind = function(obj, type, fn) {
    obj.addEventListener(type, fn, !1)
  } : docElem.attachEvent && (bind = function(obj, type, fn) {
    obj[type + fn] = fn.handleEvent ? function() {
      var event = getIEEvent(obj);
      fn.handleEvent.call(fn, event)
    } : function() {
      var event = getIEEvent(obj);
      fn.call(obj, event)
    }, obj.attachEvent("on" + type, obj[type + fn])
  });
  var unbind = function() {};
  docElem.removeEventListener ? unbind = function(obj, type, fn) {
    obj.removeEventListener(type, fn, !1)
  } : docElem.detachEvent && (unbind = function(obj, type, fn) {
    obj.detachEvent("on" + type, obj[type + fn]);
    try {
      delete obj[type + fn]
    } catch(err) {
      obj[type + fn] = void 0
    }
  });
  var eventie = {
    bind: bind,
    unbind: unbind
  };
  "function" == typeof define && define.amd ? define("eventie/eventie", eventie) : "object" == typeof exports ? module.exports = eventie : window.eventie = eventie
}(this),
function(window) {
  function docReady(fn) {
    "function" == typeof fn && (docReady.isReady ? fn() : queue.push(fn))
  }

  function init(event) {
    var isIE8NotReady = "readystatechange" === event.type && "complete" !== document.readyState;
    if(!docReady.isReady && !isIE8NotReady) {
      docReady.isReady = !0;
      for(var i = 0, len = queue.length; len > i; i++) {
        var fn = queue[i];
        fn()
      }
    }
  }

  function defineDocReady(eventie) {
    return eventie.bind(document, "DOMContentLoaded", init), eventie.bind(document, "readystatechange", init), eventie.bind(window, "load", init), docReady
  }
  var document = window.document,
    queue = [];
  docReady.isReady = !1, "function" == typeof define && define.amd ? (docReady.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], defineDocReady)) : window.docReady = defineDocReady(window.eventie)
}(this),
function() {
  function EventEmitter() {}

  function indexOfListener(listeners, listener) {
    for(var i = listeners.length; i--;)
      if(listeners[i].listener === listener) return i;
    return -1
  }

  function alias(name) {
    return function() {
      return this[name].apply(this, arguments)
    }
  }
  var proto = EventEmitter.prototype,
    exports = this,
    originalGlobalValue = exports.EventEmitter;
  proto.getListeners = function(evt) {
    var response, key, events = this._getEvents();
    if(evt instanceof RegExp) {
      response = {};
      for(key in events) events.hasOwnProperty(key) && evt.test(key) && (response[key] = events[key])
    } else response = events[evt] || (events[evt] = []);
    return response
  }, proto.flattenListeners = function(listeners) {
    var i, flatListeners = [];
    for(i = 0; i < listeners.length; i += 1) flatListeners.push(listeners[i].listener);
    return flatListeners
  }, proto.getListenersAsObject = function(evt) {
    var response, listeners = this.getListeners(evt);
    return listeners instanceof Array && (response = {}, response[evt] = listeners), response || listeners
  }, proto.addListener = function(evt, listener) {
    var key, listeners = this.getListenersAsObject(evt),
      listenerIsWrapped = "object" == typeof listener;
    for(key in listeners) listeners.hasOwnProperty(key) && -1 === indexOfListener(listeners[key], listener) && listeners[key].push(listenerIsWrapped ? listener : {
      listener: listener,
      once: !1
    });
    return this
  }, proto.on = alias("addListener"), proto.addOnceListener = function(evt, listener) {
    return this.addListener(evt, {
      listener: listener,
      once: !0
    })
  }, proto.once = alias("addOnceListener"), proto.defineEvent = function(evt) {
    return this.getListeners(evt), this
  }, proto.defineEvents = function(evts) {
    for(var i = 0; i < evts.length; i += 1) this.defineEvent(evts[i]);
    return this
  }, proto.removeListener = function(evt, listener) {
    var index, key, listeners = this.getListenersAsObject(evt);
    for(key in listeners) listeners.hasOwnProperty(key) && (index = indexOfListener(listeners[key], listener), -1 !== index && listeners[key].splice(index, 1));
    return this
  }, proto.off = alias("removeListener"), proto.addListeners = function(evt, listeners) {
    return this.manipulateListeners(!1, evt, listeners)
  }, proto.removeListeners = function(evt, listeners) {
    return this.manipulateListeners(!0, evt, listeners)
  }, proto.manipulateListeners = function(remove, evt, listeners) {
    var i, value, single = remove ? this.removeListener : this.addListener,
      multiple = remove ? this.removeListeners : this.addListeners;
    if("object" != typeof evt || evt instanceof RegExp)
      for(i = listeners.length; i--;) single.call(this, evt, listeners[i]);
    else
      for(i in evt) evt.hasOwnProperty(i) && (value = evt[i]) && ("function" == typeof value ? single.call(this, i, value) : multiple.call(this, i, value));
    return this
  }, proto.removeEvent = function(evt) {
    var key, type = typeof evt,
      events = this._getEvents();
    if("string" === type) delete events[evt];
    else if(evt instanceof RegExp)
      for(key in events) events.hasOwnProperty(key) && evt.test(key) && delete events[key];
    else delete this._events;
    return this
  }, proto.removeAllListeners = alias("removeEvent"), proto.emitEvent = function(evt, args) {
    var listener, i, key, response, listeners = this.getListenersAsObject(evt);
    for(key in listeners)
      if(listeners.hasOwnProperty(key))
        for(i = listeners[key].length; i--;) listener = listeners[key][i], listener.once === !0 && this.removeListener(evt, listener.listener), response = listener.listener.apply(this, args || []), response === this._getOnceReturnValue() && this.removeListener(evt, listener.listener);
    return this
  }, proto.trigger = alias("emitEvent"), proto.emit = function(evt) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(evt, args)
  }, proto.setOnceReturnValue = function(value) {
    return this._onceReturnValue = value, this
  }, proto._getOnceReturnValue = function() {
    return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
  }, proto._getEvents = function() {
    return this._events || (this._events = {})
  }, EventEmitter.noConflict = function() {
    return exports.EventEmitter = originalGlobalValue, EventEmitter
  }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
    return EventEmitter
  }) : "object" == typeof module && module.exports ? module.exports = EventEmitter : this.EventEmitter = EventEmitter
}.call(this),
function(window) {
  function getStyleProperty(propName) {
    if(propName) {
      if("string" == typeof docElemStyle[propName]) return propName;
      propName = propName.charAt(0).toUpperCase() + propName.slice(1);
      for(var prefixed, i = 0, len = prefixes.length; len > i; i++)
        if(prefixed = prefixes[i] + propName, "string" == typeof docElemStyle[prefixed]) return prefixed
    }
  }
  var prefixes = "Webkit Moz ms Ms O".split(" "),
    docElemStyle = document.documentElement.style;
  "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
    return getStyleProperty
  }) : "object" == typeof exports ? module.exports = getStyleProperty : window.getStyleProperty = getStyleProperty
}(window),
function(window) {
  function getStyleSize(value) {
    var num = parseFloat(value),
      isValid = -1 === value.indexOf("%") && !isNaN(num);
    return isValid && num
  }

  function getZeroSize() {
    for(var size = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    }, i = 0, len = measurements.length; len > i; i++) {
      var measurement = measurements[i];
      size[measurement] = 0
    }
    return size
  }

  function defineGetSize(getStyleProperty) {
    function getSize(elem) {
      if("string" == typeof elem && (elem = document.querySelector(elem)), elem && "object" == typeof elem && elem.nodeType) {
        var style = getStyle(elem);
        if("none" === style.display) return getZeroSize();
        var size = {};
        size.width = elem.offsetWidth, size.height = elem.offsetHeight;
        for(var isBorderBox = size.isBorderBox = !(!boxSizingProp || !style[boxSizingProp] || "border-box" !== style[boxSizingProp]), i = 0, len = measurements.length; len > i; i++) {
          var measurement = measurements[i],
            value = style[measurement];
          value = mungeNonPixel(elem, value);
          var num = parseFloat(value);
          size[measurement] = isNaN(num) ? 0 : num
        }
        var paddingWidth = size.paddingLeft + size.paddingRight,
          paddingHeight = size.paddingTop + size.paddingBottom,
          marginWidth = size.marginLeft + size.marginRight,
          marginHeight = size.marginTop + size.marginBottom,
          borderWidth = size.borderLeftWidth + size.borderRightWidth,
          borderHeight = size.borderTopWidth + size.borderBottomWidth,
          isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter,
          styleWidth = getStyleSize(style.width);
        styleWidth !== !1 && (size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth));
        var styleHeight = getStyleSize(style.height);
        return styleHeight !== !1 && (size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight)), size.innerWidth = size.width - (paddingWidth + borderWidth), size.innerHeight = size.height - (paddingHeight + borderHeight), size.outerWidth = size.width + marginWidth, size.outerHeight = size.height + marginHeight, size
      }
    }

    function mungeNonPixel(elem, value) {
      if(getComputedStyle || -1 === value.indexOf("%")) return value;
      var style = elem.style,
        left = style.left,
        rs = elem.runtimeStyle,
        rsLeft = rs && rs.left;
      return rsLeft && (rs.left = elem.currentStyle.left), style.left = value, value = style.pixelLeft, style.left = left, rsLeft && (rs.left = rsLeft), value
    }
    var isBoxSizeOuter, boxSizingProp = getStyleProperty("boxSizing");
    return function() {
      if(boxSizingProp) {
        var div = document.createElement("div");
        div.style.width = "200px", div.style.padding = "1px 2px 3px 4px", div.style.borderStyle = "solid", div.style.borderWidth = "1px 2px 3px 4px", div.style[boxSizingProp] = "border-box";
        var body = document.body || document.documentElement;
        body.appendChild(div);
        var style = getStyle(div);
        isBoxSizeOuter = 200 === getStyleSize(style.width), body.removeChild(div)
      }
    }(), getSize
  }
  var getComputedStyle = window.getComputedStyle,
    getStyle = getComputedStyle ? function(elem) {
      return getComputedStyle(elem, null)
    } : function(elem) {
      return elem.currentStyle
    }, measurements = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
  "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], defineGetSize) : "object" == typeof exports ? module.exports = defineGetSize(require("get-style-property")) : window.getSize = defineGetSize(window.getStyleProperty)
}(window),
function(global, ElemProto) {
  function match(elem, selector) {
    return elem[matchesMethod](selector)
  }

  function checkParent(elem) {
    if(!elem.parentNode) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(elem)
    }
  }

  function query(elem, selector) {
    checkParent(elem);
    for(var elems = elem.parentNode.querySelectorAll(selector), i = 0, len = elems.length; len > i; i++)
      if(elems[i] === elem) return !0;
    return !1
  }

  function matchChild(elem, selector) {
    return checkParent(elem), match(elem, selector)
  }
  var matchesSelector, matchesMethod = function() {
      if(ElemProto.matchesSelector) return "matchesSelector";
      for(var prefixes = ["webkit", "moz", "ms", "o"], i = 0, len = prefixes.length; len > i; i++) {
        var prefix = prefixes[i],
          method = prefix + "MatchesSelector";
        if(ElemProto[method]) return method
      }
    }();
  if(matchesMethod) {
    var div = document.createElement("div"),
      supportsOrphans = match(div, "div");
    matchesSelector = supportsOrphans ? match : matchChild
  } else matchesSelector = query;
  "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
    return matchesSelector
  }) : window.matchesSelector = matchesSelector
}(this, Element.prototype),
function(window) {
  function extend(a, b) {
    for(var prop in b) a[prop] = b[prop];
    return a
  }

  function isEmptyObj(obj) {
    for(var prop in obj) return !1;
    return prop = null, !0
  }

  function toDash(str) {
    return str.replace(/([A-Z])/g, function($1) {
      return "-" + $1.toLowerCase()
    })
  }

  function outlayerItemDefinition(EventEmitter, getSize, getStyleProperty) {
    function Item(element, layout) {
      element && (this.element = element, this.layout = layout, this.position = {
        x: 0,
        y: 0
      }, this._create())
    }
    var transitionProperty = getStyleProperty("transition"),
      transformProperty = getStyleProperty("transform"),
      supportsCSS3 = transitionProperty && transformProperty,
      is3d = !! getStyleProperty("perspective"),
      transitionEndEvent = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend"
      }[transitionProperty],
      prefixableProperties = ["transform", "transition", "transitionDuration", "transitionProperty"],
      vendorProperties = function() {
        for(var cache = {}, i = 0, len = prefixableProperties.length; len > i; i++) {
          var prop = prefixableProperties[i],
            supportedProp = getStyleProperty(prop);
          supportedProp && supportedProp !== prop && (cache[prop] = supportedProp)
        }
        return cache
      }();
    extend(Item.prototype, EventEmitter.prototype), Item.prototype._create = function() {
      this._transn = {
        ingProperties: {},
        clean: {},
        onEnd: {}
      }, this.css({
        position: "absolute"
      })
    }, Item.prototype.handleEvent = function(event) {
      var method = "on" + event.type;
      this[method] && this[method](event)
    }, Item.prototype.getSize = function() {
      this.size = getSize(this.element)
    }, Item.prototype.css = function(style) {
      var elemStyle = this.element.style;
      for(var prop in style) {
        var supportedProp = vendorProperties[prop] || prop;
        elemStyle[supportedProp] = style[prop]
      }
    }, Item.prototype.getPosition = function() {
      var style = getStyle(this.element),
        layoutOptions = this.layout.options,
        isOriginLeft = layoutOptions.isOriginLeft,
        isOriginTop = layoutOptions.isOriginTop,
        x = parseInt(style[isOriginLeft ? "left" : "right"], 10),
        y = parseInt(style[isOriginTop ? "top" : "bottom"], 10);
      x = isNaN(x) ? 0 : x, y = isNaN(y) ? 0 : y;
      var layoutSize = this.layout.size;
      x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight, y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom, this.position.x = x, this.position.y = y
    }, Item.prototype.layoutPosition = function() {
      var layoutSize = this.layout.size,
        layoutOptions = this.layout.options,
        style = {};
      layoutOptions.isOriginLeft ? (style.left = this.position.x + layoutSize.paddingLeft + "px", style.right = "") : (style.right = this.position.x + layoutSize.paddingRight + "px", style.left = ""), layoutOptions.isOriginTop ? (style.top = this.position.y + layoutSize.paddingTop + "px", style.bottom = "") : (style.bottom = this.position.y + layoutSize.paddingBottom + "px", style.top = ""), this.css(style), this.emitEvent("layout", [this])
    };
    var translate = is3d ? function(x, y) {
        return "translate3d(" + x + "px, " + y + "px, 0)"
      } : function(x, y) {
        return "translate(" + x + "px, " + y + "px)"
      };
    Item.prototype._transitionTo = function(x, y) {
      this.getPosition();
      var curX = this.position.x,
        curY = this.position.y,
        compareX = parseInt(x, 10),
        compareY = parseInt(y, 10),
        didNotMove = compareX === this.position.x && compareY === this.position.y;
      if(this.setPosition(x, y), didNotMove && !this.isTransitioning) return void this.layoutPosition();
      var transX = x - curX,
        transY = y - curY,
        transitionStyle = {}, layoutOptions = this.layout.options;
      transX = layoutOptions.isOriginLeft ? transX : -transX, transY = layoutOptions.isOriginTop ? transY : -transY, transitionStyle.transform = translate(transX, transY), this.transition({
        to: transitionStyle,
        onTransitionEnd: {
          transform: this.layoutPosition
        },
        isCleaning: !0
      })
    }, Item.prototype.goTo = function(x, y) {
      this.setPosition(x, y), this.layoutPosition()
    }, Item.prototype.moveTo = supportsCSS3 ? Item.prototype._transitionTo : Item.prototype.goTo, Item.prototype.setPosition = function(x, y) {
      this.position.x = parseInt(x, 10), this.position.y = parseInt(y, 10)
    }, Item.prototype._nonTransition = function(args) {
      this.css(args.to), args.isCleaning && this._removeStyles(args.to);
      for(var prop in args.onTransitionEnd) args.onTransitionEnd[prop].call(this)
    }, Item.prototype._transition = function(args) {
      if(!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(args);
      var _transition = this._transn;
      for(var prop in args.onTransitionEnd) _transition.onEnd[prop] = args.onTransitionEnd[prop];
      for(prop in args.to) _transition.ingProperties[prop] = !0, args.isCleaning && (_transition.clean[prop] = !0);
      if(args.from) {
        this.css(args.from);
        var h = this.element.offsetHeight;
        h = null
      }
      this.enableTransition(args.to), this.css(args.to), this.isTransitioning = !0
    };
    var itemTransitionProperties = transformProperty && toDash(transformProperty) + ",opacity";
    Item.prototype.enableTransition = function() {
      this.isTransitioning || (this.css({
        transitionProperty: itemTransitionProperties,
        transitionDuration: this.layout.options.transitionDuration
      }), this.element.addEventListener(transitionEndEvent, this, !1))
    }, Item.prototype.transition = Item.prototype[transitionProperty ? "_transition" : "_nonTransition"], Item.prototype.onwebkitTransitionEnd = function(event) {
      this.ontransitionend(event)
    }, Item.prototype.onotransitionend = function(event) {
      this.ontransitionend(event)
    };
    var dashedVendorProperties = {
      "-webkit-transform": "transform",
      "-moz-transform": "transform",
      "-o-transform": "transform"
    };
    Item.prototype.ontransitionend = function(event) {
      if(event.target === this.element) {
        var _transition = this._transn,
          propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
        if(delete _transition.ingProperties[propertyName], isEmptyObj(_transition.ingProperties) && this.disableTransition(), propertyName in _transition.clean && (this.element.style[event.propertyName] = "", delete _transition.clean[propertyName]), propertyName in _transition.onEnd) {
          var onTransitionEnd = _transition.onEnd[propertyName];
          onTransitionEnd.call(this), delete _transition.onEnd[propertyName]
        }
        this.emitEvent("transitionEnd", [this])
      }
    }, Item.prototype.disableTransition = function() {
      this.removeTransitionStyles(), this.element.removeEventListener(transitionEndEvent, this, !1), this.isTransitioning = !1
    }, Item.prototype._removeStyles = function(style) {
      var cleanStyle = {};
      for(var prop in style) cleanStyle[prop] = "";
      this.css(cleanStyle)
    };
    var cleanTransitionStyle = {
      transitionProperty: "",
      transitionDuration: ""
    };
    return Item.prototype.removeTransitionStyles = function() {
      this.css(cleanTransitionStyle)
    }, Item.prototype.removeElem = function() {
      this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
    }, Item.prototype.remove = function() {
      if(!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
      var _this = this;
      this.on("transitionEnd", function() {
        return _this.removeElem(), !0
      }), this.hide()
    }, Item.prototype.reveal = function() {
      delete this.isHidden, this.css({
        display: ""
      });
      var options = this.layout.options;
      this.transition({
        from: options.hiddenStyle,
        to: options.visibleStyle,
        isCleaning: !0
      })
    }, Item.prototype.hide = function() {
      this.isHidden = !0, this.css({
        display: ""
      });
      var options = this.layout.options;
      this.transition({
        from: options.visibleStyle,
        to: options.hiddenStyle,
        isCleaning: !0,
        onTransitionEnd: {
          opacity: function() {
            this.isHidden && this.css({
              display: "none"
            })
          }
        }
      })
    }, Item.prototype.destroy = function() {
      this.css({
        position: "",
        left: "",
        right: "",
        top: "",
        bottom: "",
        transition: "",
        transform: ""
      })
    }, Item
  }
  var getComputedStyle = window.getComputedStyle,
    getStyle = getComputedStyle ? function(elem) {
      return getComputedStyle(elem, null)
    } : function(elem) {
      return elem.currentStyle
    };
  "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], outlayerItemDefinition) : (window.Outlayer = {}, window.Outlayer.Item = outlayerItemDefinition(window.EventEmitter, window.getSize, window.getStyleProperty))
}(window),
function(window) {
  function extend(a, b) {
    for(var prop in b) a[prop] = b[prop];
    return a
  }

  function isArray(obj) {
    return "[object Array]" === objToString.call(obj)
  }

  function makeArray(obj) {
    var ary = [];
    if(isArray(obj)) ary = obj;
    else if(obj && "number" == typeof obj.length)
      for(var i = 0, len = obj.length; len > i; i++) ary.push(obj[i]);
    else ary.push(obj);
    return ary
  }

  function removeFrom(obj, ary) {
    var index = indexOf(ary, obj); - 1 !== index && ary.splice(index, 1)
  }

  function toDashed(str) {
    return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
      return $1 + "-" + $2
    }).toLowerCase()
  }

  function outlayerDefinition(eventie, docReady, EventEmitter, getSize, matchesSelector, Item) {
    function Outlayer(element, options) {
      if("string" == typeof element && (element = document.querySelector(element)), !element || !isElement(element)) return void(console && console.error("Bad " + this.constructor.namespace + " element: " + element));
      this.element = element, this.options = extend({}, this.constructor.defaults), this.option(options);
      var id = ++GUID;
      this.element.outlayerGUID = id, instances[id] = this, this._create(), this.options.isInitLayout && this.layout()
    }
    var GUID = 0,
      instances = {};
    return Outlayer.namespace = "outlayer", Outlayer.Item = Item, Outlayer.defaults = {
      containerStyle: {
        position: "relative"
      },
      isInitLayout: !0,
      isOriginLeft: !0,
      isOriginTop: !0,
      isResizeBound: !0,
      isResizingContainer: !0,
      transitionDuration: "0.4s",
      hiddenStyle: {
        opacity: 0,
        transform: "scale(0.001)"
      },
      visibleStyle: {
        opacity: 1,
        transform: "scale(1)"
      }
    }, extend(Outlayer.prototype, EventEmitter.prototype), Outlayer.prototype.option = function(opts) {
      extend(this.options, opts)
    }, Outlayer.prototype._create = function() {
      this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
    }, Outlayer.prototype.reloadItems = function() {
      this.items = this._itemize(this.element.children)
    }, Outlayer.prototype._itemize = function(elems) {
      for(var itemElems = this._filterFindItemElements(elems), Item = this.constructor.Item, items = [], i = 0, len = itemElems.length; len > i; i++) {
        var elem = itemElems[i],
          item = new Item(elem, this);
        items.push(item)
      }
      return items
    }, Outlayer.prototype._filterFindItemElements = function(elems) {
      elems = makeArray(elems);
      for(var itemSelector = this.options.itemSelector, itemElems = [], i = 0, len = elems.length; len > i; i++) {
        var elem = elems[i];
        if(isElement(elem))
          if(itemSelector) {
            matchesSelector(elem, itemSelector) && itemElems.push(elem);
            for(var childElems = elem.querySelectorAll(itemSelector), j = 0, jLen = childElems.length; jLen > j; j++) itemElems.push(childElems[j])
          } else itemElems.push(elem)
      }
      return itemElems
    }, Outlayer.prototype.getItemElements = function() {
      for(var elems = [], i = 0, len = this.items.length; len > i; i++) elems.push(this.items[i].element);
      return elems
    }, Outlayer.prototype.layout = function() {
      this._resetLayout(), this._manageStamps();
      var isInstant = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
      this.layoutItems(this.items, isInstant), this._isLayoutInited = !0
    }, Outlayer.prototype._init = Outlayer.prototype.layout, Outlayer.prototype._resetLayout = function() {
      this.getSize()
    }, Outlayer.prototype.getSize = function() {
      this.size = getSize(this.element)
    }, Outlayer.prototype._getMeasurement = function(measurement, size) {
      var elem, option = this.options[measurement];
      option ? ("string" == typeof option ? elem = this.element.querySelector(option) : isElement(option) && (elem = option), this[measurement] = elem ? getSize(elem)[size] : option) : this[measurement] = 0
    }, Outlayer.prototype.layoutItems = function(items, isInstant) {
      items = this._getItemsForLayout(items), this._layoutItems(items, isInstant), this._postLayout()
    }, Outlayer.prototype._getItemsForLayout = function(items) {
      for(var layoutItems = [], i = 0, len = items.length; len > i; i++) {
        var item = items[i];
        item.isIgnored || layoutItems.push(item)
      }
      return layoutItems
    }, Outlayer.prototype._layoutItems = function(items, isInstant) {
      function onItemsLayout() {
        _this.emitEvent("layoutComplete", [_this, items])
      }
      var _this = this;
      if(!items || !items.length) return void onItemsLayout();
      this._itemsOn(items, "layout", onItemsLayout);
      for(var queue = [], i = 0, len = items.length; len > i; i++) {
        var item = items[i],
          position = this._getItemLayoutPosition(item);
        position.item = item, position.isInstant = isInstant || item.isLayoutInstant, queue.push(position)
      }
      this._processLayoutQueue(queue)
    }, Outlayer.prototype._getItemLayoutPosition = function() {
      return {
        x: 0,
        y: 0
      }
    }, Outlayer.prototype._processLayoutQueue = function(queue) {
      for(var i = 0, len = queue.length; len > i; i++) {
        var obj = queue[i];
        this._positionItem(obj.item, obj.x, obj.y, obj.isInstant)
      }
    }, Outlayer.prototype._positionItem = function(item, x, y, isInstant) {
      isInstant ? item.goTo(x, y) : item.moveTo(x, y)
    }, Outlayer.prototype._postLayout = function() {
      this.resizeContainer()
    }, Outlayer.prototype.resizeContainer = function() {
      if(this.options.isResizingContainer) {
        var size = this._getContainerSize();
        size && (this._setContainerMeasure(size.width, !0), this._setContainerMeasure(size.height, !1))
      }
    }, Outlayer.prototype._getContainerSize = noop, Outlayer.prototype._setContainerMeasure = function(measure, isWidth) {
      if(void 0 !== measure) {
        var elemSize = this.size;
        elemSize.isBorderBox && (measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth), measure = Math.max(measure, 0), this.element.style[isWidth ? "width" : "height"] = measure + "px"
      }
    }, Outlayer.prototype._itemsOn = function(items, eventName, callback) {
      function tick() {
        return doneCount++, doneCount === count && callback.call(_this), !0
      }
      for(var doneCount = 0, count = items.length, _this = this, i = 0, len = items.length; len > i; i++) {
        var item = items[i];
        item.on(eventName, tick)
      }
    }, Outlayer.prototype.ignore = function(elem) {
      var item = this.getItem(elem);
      item && (item.isIgnored = !0)
    }, Outlayer.prototype.unignore = function(elem) {
      var item = this.getItem(elem);
      item && delete item.isIgnored
    }, Outlayer.prototype.stamp = function(elems) {
      if(elems = this._find(elems)) {
        this.stamps = this.stamps.concat(elems);
        for(var i = 0, len = elems.length; len > i; i++) {
          var elem = elems[i];
          this.ignore(elem)
        }
      }
    }, Outlayer.prototype.unstamp = function(elems) {
      if(elems = this._find(elems))
        for(var i = 0, len = elems.length; len > i; i++) {
          var elem = elems[i];
          removeFrom(elem, this.stamps), this.unignore(elem)
        }
    }, Outlayer.prototype._find = function(elems) {
      return elems ? ("string" == typeof elems && (elems = this.element.querySelectorAll(elems)), elems = makeArray(elems)) : void 0
    }, Outlayer.prototype._manageStamps = function() {
      if(this.stamps && this.stamps.length) {
        this._getBoundingRect();
        for(var i = 0, len = this.stamps.length; len > i; i++) {
          var stamp = this.stamps[i];
          this._manageStamp(stamp)
        }
      }
    }, Outlayer.prototype._getBoundingRect = function() {
      var boundingRect = this.element.getBoundingClientRect(),
        size = this.size;
      this._boundingRect = {
        left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
        top: boundingRect.top + size.paddingTop + size.borderTopWidth,
        right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
        bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
      }
    }, Outlayer.prototype._manageStamp = noop, Outlayer.prototype._getElementOffset = function(elem) {
      var boundingRect = elem.getBoundingClientRect(),
        thisRect = this._boundingRect,
        size = getSize(elem),
        offset = {
          left: boundingRect.left - thisRect.left - size.marginLeft,
          top: boundingRect.top - thisRect.top - size.marginTop,
          right: thisRect.right - boundingRect.right - size.marginRight,
          bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
        };
      return offset
    }, Outlayer.prototype.handleEvent = function(event) {
      var method = "on" + event.type;
      this[method] && this[method](event)
    }, Outlayer.prototype.bindResize = function() {
      this.isResizeBound || (eventie.bind(window, "resize", this), this.isResizeBound = !0)
    }, Outlayer.prototype.unbindResize = function() {
      this.isResizeBound && eventie.unbind(window, "resize", this), this.isResizeBound = !1
    }, Outlayer.prototype.onresize = function() {
      function delayed() {
        _this.resize(), delete _this.resizeTimeout
      }
      this.resizeTimeout && clearTimeout(this.resizeTimeout);
      var _this = this;
      this.resizeTimeout = setTimeout(delayed, 100)
    }, Outlayer.prototype.resize = function() {
      this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, Outlayer.prototype.needsResizeLayout = function() {
      var size = getSize(this.element),
        hasSizes = this.size && size;
      return hasSizes && size.innerWidth !== this.size.innerWidth
    }, Outlayer.prototype.addItems = function(elems) {
      var items = this._itemize(elems);
      return items.length && (this.items = this.items.concat(items)), items
    }, Outlayer.prototype.appended = function(elems) {
      var items = this.addItems(elems);
      items.length && (this.layoutItems(items, !0), this.reveal(items))
    }, Outlayer.prototype.prepended = function(elems) {
      var items = this._itemize(elems);
      if(items.length) {
        var previousItems = this.items.slice(0);
        this.items = items.concat(previousItems), this._resetLayout(), this._manageStamps(), this.layoutItems(items, !0), this.reveal(items), this.layoutItems(previousItems)
      }
    }, Outlayer.prototype.reveal = function(items) {
      var len = items && items.length;
      if(len)
        for(var i = 0; len > i; i++) {
          var item = items[i];
          item.reveal()
        }
    }, Outlayer.prototype.hide = function(items) {
      var len = items && items.length;
      if(len)
        for(var i = 0; len > i; i++) {
          var item = items[i];
          item.hide()
        }
    }, Outlayer.prototype.getItem = function(elem) {
      for(var i = 0, len = this.items.length; len > i; i++) {
        var item = this.items[i];
        if(item.element === elem) return item
      }
    }, Outlayer.prototype.getItems = function(elems) {
      if(elems && elems.length) {
        for(var items = [], i = 0, len = elems.length; len > i; i++) {
          var elem = elems[i],
            item = this.getItem(elem);
          item && items.push(item)
        }
        return items
      }
    }, Outlayer.prototype.remove = function(elems) {
      elems = makeArray(elems);
      var removeItems = this.getItems(elems);
      if(removeItems && removeItems.length) {
        this._itemsOn(removeItems, "remove", function() {
          this.emitEvent("removeComplete", [this, removeItems])
        });
        for(var i = 0, len = removeItems.length; len > i; i++) {
          var item = removeItems[i];
          item.remove(), removeFrom(item, this.items)
        }
      }
    }, Outlayer.prototype.destroy = function() {
      var style = this.element.style;
      style.height = "", style.position = "", style.width = "";
      for(var i = 0, len = this.items.length; len > i; i++) {
        var item = this.items[i];
        item.destroy()
      }
      this.unbindResize(), delete this.element.outlayerGUID, jQuery && jQuery.removeData(this.element, this.constructor.namespace)
    }, Outlayer.data = function(elem) {
      var id = elem && elem.outlayerGUID;
      return id && instances[id]
    }, Outlayer.create = function(namespace, options) {
      function Layout() {
        Outlayer.apply(this, arguments)
      }
      return Object.create ? Layout.prototype = Object.create(Outlayer.prototype) : extend(Layout.prototype, Outlayer.prototype), Layout.prototype.constructor = Layout, Layout.defaults = extend({}, Outlayer.defaults), extend(Layout.defaults, options), Layout.prototype.settings = {}, Layout.namespace = namespace, Layout.data = Outlayer.data, Layout.Item = function() {
        Item.apply(this, arguments)
      }, Layout.Item.prototype = new Item, docReady(function() {
        for(var dashedNamespace = toDashed(namespace), elems = document.querySelectorAll(".js-" + dashedNamespace), dataAttr = "data-" + dashedNamespace + "-options", i = 0, len = elems.length; len > i; i++) {
          var options, elem = elems[i],
            attr = elem.getAttribute(dataAttr);
          try {
            options = attr && JSON.parse(attr)
          } catch(error) {
            console && console.error("Error parsing " + dataAttr + " on " + elem.nodeName.toLowerCase() + (elem.id ? "#" + elem.id : "") + ": " + error);
            continue
          }
          var instance = new Layout(elem, options);
          jQuery && jQuery.data(elem, namespace, instance)
        }
      }), jQuery && jQuery.bridget && jQuery.bridget(namespace, Layout), Layout
    }, Outlayer.Item = Item, Outlayer
  }
  var document = window.document,
    console = window.console,
    jQuery = window.jQuery,
    noop = function() {}, objToString = Object.prototype.toString,
    isElement = "object" == typeof HTMLElement ? function(obj) {
      return obj instanceof HTMLElement
    } : function(obj) {
      return obj && "object" == typeof obj && 1 === obj.nodeType && "string" == typeof obj.nodeName
    }, indexOf = Array.prototype.indexOf ? function(ary, obj) {
      return ary.indexOf(obj)
    } : function(ary, obj) {
      for(var i = 0, len = ary.length; len > i; i++)
        if(ary[i] === obj) return i;
      return -1
    };
  "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], outlayerDefinition) : window.Outlayer = outlayerDefinition(window.eventie, window.docReady, window.EventEmitter, window.getSize, window.matchesSelector, window.Outlayer.Item)
}(window),
function(window) {
  function itemDefinition(Outlayer) {
    function Item() {
      Outlayer.Item.apply(this, arguments)
    }
    return Item.prototype = new Outlayer.Item, Item.prototype._create = function() {
      this.id = this.layout.itemGUID++, Outlayer.Item.prototype._create.call(this), this.sortData = {}
    }, Item.prototype.updateSortData = function() {
      if(!this.isIgnored) {
        this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
        var getSortData = this.layout.options.getSortData,
          sorters = this.layout._sorters;
        for(var key in getSortData) {
          var sorter = sorters[key];
          this.sortData[key] = sorter(this.element, this)
        }
      }
    }, Item
  }
  "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], itemDefinition) : (window.Isotope = window.Isotope || {}, window.Isotope.Item = itemDefinition(window.Outlayer))
}(window),
function(window) {
  function layoutModeDefinition(getSize, Outlayer) {
    function LayoutMode(isotope) {
      this.isotope = isotope, isotope && (this.options = isotope.options[this.namespace], this.element = isotope.element, this.items = isotope.filteredItems, this.size = isotope.size)
    }
    return function() {
      function getOutlayerMethod(methodName) {
        return function() {
          return Outlayer.prototype[methodName].apply(this.isotope, arguments)
        }
      }
      for(var facadeMethods = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], i = 0, len = facadeMethods.length; len > i; i++) {
        var methodName = facadeMethods[i];
        LayoutMode.prototype[methodName] = getOutlayerMethod(methodName)
      }
    }(), LayoutMode.prototype.needsVerticalResizeLayout = function() {
      var size = getSize(this.isotope.element),
        hasSizes = this.isotope.size && size;
      return hasSizes && size.innerHeight !== this.isotope.size.innerHeight
    }, LayoutMode.prototype._getMeasurement = function() {
      this.isotope._getMeasurement.apply(this, arguments)
    }, LayoutMode.prototype.getColumnWidth = function() {
      this.getSegmentSize("column", "Width")
    }, LayoutMode.prototype.getRowHeight = function() {
      this.getSegmentSize("row", "Height")
    }, LayoutMode.prototype.getSegmentSize = function(segment, size) {
      var segmentName = segment + size,
        outerSize = "outer" + size;
      if(this._getMeasurement(segmentName, outerSize), !this[segmentName]) {
        var firstItemSize = this.getFirstItemSize();
        this[segmentName] = firstItemSize && firstItemSize[outerSize] || this.isotope.size["inner" + size]
      }
    }, LayoutMode.prototype.getFirstItemSize = function() {
      var firstItem = this.isotope.filteredItems[0];
      return firstItem && firstItem.element && getSize(firstItem.element)
    }, LayoutMode.prototype.layout = function() {
      this.isotope.layout.apply(this.isotope, arguments)
    }, LayoutMode.prototype.getSize = function() {
      this.isotope.getSize(), this.size = this.isotope.size
    }, LayoutMode.modes = {}, LayoutMode.create = function(namespace, options) {
      function Mode() {
        LayoutMode.apply(this, arguments)
      }
      return Mode.prototype = new LayoutMode, options && (Mode.options = options), Mode.prototype.namespace = namespace, LayoutMode.modes[namespace] = Mode, Mode
    }, LayoutMode
  }
  "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], layoutModeDefinition) : (window.Isotope = window.Isotope || {}, window.Isotope.LayoutMode = layoutModeDefinition(window.getSize, window.Outlayer))
}(window),
function(window) {
  function masonryDefinition(Outlayer, getSize) {
    var Masonry = Outlayer.create("masonry");
    return Masonry.prototype._resetLayout = function() {
      this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
      var i = this.cols;
      for(this.colYs = []; i--;) this.colYs.push(0);
      this.maxY = 0
    }, Masonry.prototype.measureColumns = function() {
      if(this.getContainerWidth(), !this.columnWidth) {
        var firstItem = this.items[0],
          firstItemElem = firstItem && firstItem.element;
        this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || this.containerWidth
      }
      this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
    }, Masonry.prototype.getContainerWidth = function() {
      var container = this.options.isFitWidth ? this.element.parentNode : this.element,
        size = getSize(container);
      this.containerWidth = size && size.innerWidth
    }, Masonry.prototype._getItemLayoutPosition = function(item) {
      item.getSize();
      var remainder = item.size.outerWidth % this.columnWidth,
        mathMethod = remainder && 1 > remainder ? "round" : "ceil",
        colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
      colSpan = Math.min(colSpan, this.cols);
      for(var colGroup = this._getColGroup(colSpan), minimumY = Math.min.apply(Math, colGroup), shortColIndex = indexOf(colGroup, minimumY), position = {
          x: this.columnWidth * shortColIndex,
          y: minimumY
        }, setHeight = minimumY + item.size.outerHeight, setSpan = this.cols + 1 - colGroup.length, i = 0; setSpan > i; i++) this.colYs[shortColIndex + i] = setHeight;
      return position
    }, Masonry.prototype._getColGroup = function(colSpan) {
      if(2 > colSpan) return this.colYs;
      for(var colGroup = [], groupCount = this.cols + 1 - colSpan, i = 0; groupCount > i; i++) {
        var groupColYs = this.colYs.slice(i, i + colSpan);
        colGroup[i] = Math.max.apply(Math, groupColYs)
      }
      return colGroup
    }, Masonry.prototype._manageStamp = function(stamp) {
      var stampSize = getSize(stamp),
        offset = this._getElementOffset(stamp),
        firstX = this.options.isOriginLeft ? offset.left : offset.right,
        lastX = firstX + stampSize.outerWidth,
        firstCol = Math.floor(firstX / this.columnWidth);
      firstCol = Math.max(0, firstCol);
      var lastCol = Math.floor(lastX / this.columnWidth);
      lastCol -= lastX % this.columnWidth ? 0 : 1, lastCol = Math.min(this.cols - 1, lastCol);
      for(var stampMaxY = (this.options.isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight, i = firstCol; lastCol >= i; i++) this.colYs[i] = Math.max(stampMaxY, this.colYs[i])
    }, Masonry.prototype._getContainerSize = function() {
      this.maxY = Math.max.apply(Math, this.colYs);
      var size = {
        height: this.maxY
      };
      return this.options.isFitWidth && (size.width = this._getContainerFitWidth()), size
    }, Masonry.prototype._getContainerFitWidth = function() {
      for(var unusedCols = 0, i = this.cols; --i && 0 === this.colYs[i];) unusedCols++;
      return(this.cols - unusedCols) * this.columnWidth - this.gutter
    }, Masonry.prototype.needsResizeLayout = function() {
      var previousWidth = this.containerWidth;
      return this.getContainerWidth(), previousWidth !== this.containerWidth
    }, Masonry
  }
  var indexOf = Array.prototype.indexOf ? function(items, value) {
      return items.indexOf(value)
    } : function(items, value) {
      for(var i = 0, len = items.length; len > i; i++) {
        var item = items[i];
        if(item === value) return i
      }
      return -1
    };
  "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], masonryDefinition) : window.Masonry = masonryDefinition(window.Outlayer, window.getSize)
}(window),
function(window) {
  function extend(a, b) {
    for(var prop in b) a[prop] = b[prop];
    return a
  }

  function masonryDefinition(LayoutMode, Masonry) {
    var MasonryMode = LayoutMode.create("masonry"),
      _getElementOffset = MasonryMode.prototype._getElementOffset,
      layout = MasonryMode.prototype.layout,
      _getMeasurement = MasonryMode.prototype._getMeasurement;
    extend(MasonryMode.prototype, Masonry.prototype), MasonryMode.prototype._getElementOffset = _getElementOffset, MasonryMode.prototype.layout = layout, MasonryMode.prototype._getMeasurement = _getMeasurement;
    var measureColumns = MasonryMode.prototype.measureColumns;
    MasonryMode.prototype.measureColumns = function() {
      this.items = this.isotope.filteredItems, measureColumns.call(this)
    };
    var _manageStamp = MasonryMode.prototype._manageStamp;
    return MasonryMode.prototype._manageStamp = function() {
      this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, _manageStamp.apply(this, arguments)
    }, MasonryMode
  }
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], masonryDefinition) : masonryDefinition(window.Isotope.LayoutMode, window.Masonry)
}(window),
function(window) {
  function fitRowsDefinition(LayoutMode) {
    var FitRows = LayoutMode.create("fitRows");
    return FitRows.prototype._resetLayout = function() {
      this.x = 0, this.y = 0, this.maxY = 0
    }, FitRows.prototype._getItemLayoutPosition = function(item) {
      item.getSize(), 0 !== this.x && item.size.outerWidth + this.x > this.isotope.size.innerWidth && (this.x = 0, this.y = this.maxY);
      var position = {
        x: this.x,
        y: this.y
      };
      return this.maxY = Math.max(this.maxY, this.y + item.size.outerHeight), this.x += item.size.outerWidth, position
    }, FitRows.prototype._getContainerSize = function() {
      return {
        height: this.maxY
      }
    }, FitRows
  }
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], fitRowsDefinition) : fitRowsDefinition(window.Isotope.LayoutMode)
}(window),
function(window) {
  function verticalDefinition(LayoutMode) {
    var Vertical = LayoutMode.create("vertical", {
      horizontalAlignment: 0
    });
    return Vertical.prototype._resetLayout = function() {
      this.y = 0
    }, Vertical.prototype._getItemLayoutPosition = function(item) {
      item.getSize();
      var x = (this.isotope.size.innerWidth - item.size.outerWidth) * this.options.horizontalAlignment,
        y = this.y;
      return this.y += item.size.outerHeight, {
        x: x,
        y: y
      }
    }, Vertical.prototype._getContainerSize = function() {
      return {
        height: this.y
      }
    }, Vertical
  }
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], verticalDefinition) : verticalDefinition(window.Isotope.LayoutMode)
}(window),
function(window) {
  function extend(a, b) {
    for(var prop in b) a[prop] = b[prop];
    return a
  }

  function isArray(obj) {
    return "[object Array]" === objToString.call(obj)
  }

  function makeArray(obj) {
    var ary = [];
    if(isArray(obj)) ary = obj;
    else if(obj && "number" == typeof obj.length)
      for(var i = 0, len = obj.length; len > i; i++) ary.push(obj[i]);
    else ary.push(obj);
    return ary
  }

  function removeFrom(obj, ary) {
    var index = indexOf(ary, obj); - 1 !== index && ary.splice(index, 1)
  }

  function isotopeDefinition(Outlayer, getSize, matchesSelector, Item, LayoutMode) {
    function getItemSorter(sortBys, sortAsc) {
      return function(itemA, itemB) {
        for(var i = 0, len = sortBys.length; len > i; i++) {
          var sortBy = sortBys[i],
            a = itemA.sortData[sortBy],
            b = itemB.sortData[sortBy];
          if(a > b || b > a) {
            var isAscending = void 0 !== sortAsc[sortBy] ? sortAsc[sortBy] : sortAsc,
              direction = isAscending ? 1 : -1;
            return(a > b ? 1 : -1) * direction
          }
        }
        return 0
      }
    }
    var Isotope = Outlayer.create("isotope", {
      layoutMode: "masonry",
      isJQueryFiltering: !0,
      sortAscending: !0
    });
    Isotope.Item = Item, Isotope.LayoutMode = LayoutMode, Isotope.prototype._create = function() {
      this.itemGUID = 0, this._sorters = {}, this._getSorters(), Outlayer.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
      for(var name in LayoutMode.modes) this._initLayoutMode(name)
    }, Isotope.prototype.reloadItems = function() {
      this.itemGUID = 0, Outlayer.prototype.reloadItems.call(this)
    }, Isotope.prototype._itemize = function() {
      for(var items = Outlayer.prototype._itemize.apply(this, arguments), i = 0, len = items.length; len > i; i++) {
        var item = items[i];
        item.id = this.itemGUID++
      }
      return this._updateItemsSortData(items), items
    }, Isotope.prototype._initLayoutMode = function(name) {
      var Mode = LayoutMode.modes[name],
        initialOpts = this.options[name] || {};
      this.options[name] = Mode.options ? extend(Mode.options, initialOpts) : initialOpts, this.modes[name] = new Mode(this)
    }, Isotope.prototype.layout = function() {
      return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
    }, Isotope.prototype._layout = function() {
      var isInstant = this._getIsInstant();
      this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, isInstant), this._isLayoutInited = !0
    }, Isotope.prototype.arrange = function(opts) {
      this.option(opts), this._getIsInstant(), this.filteredItems = this._filter(this.items), this._sort(), this._layout()
    }, Isotope.prototype._init = Isotope.prototype.arrange, Isotope.prototype._getIsInstant = function() {
      var isInstant = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
      return this._isInstant = isInstant, isInstant
    }, Isotope.prototype._filter = function(items) {
      function hideReveal() {
        _this.reveal(hiddenMatched), _this.hide(visibleUnmatched)
      }
      var filter = this.options.filter;
      filter = filter || "*";
      for(var matches = [], hiddenMatched = [], visibleUnmatched = [], test = this._getFilterTest(filter), i = 0, len = items.length; len > i; i++) {
        var item = items[i];
        if(!item.isIgnored) {
          var isMatched = test(item);
          isMatched && matches.push(item), isMatched && item.isHidden ? hiddenMatched.push(item) : isMatched || item.isHidden || visibleUnmatched.push(item)
        }
      }
      var _this = this;
      return this._isInstant ? this._noTransition(hideReveal) : hideReveal(), matches
    }, Isotope.prototype._getFilterTest = function(filter) {
      return jQuery && this.options.isJQueryFiltering ? function(item) {
        return jQuery(item.element).is(filter)
      } : "function" == typeof filter ? function(item) {
        return filter(item.element)
      } : function(item) {
        return matchesSelector(item.element, filter)
      }
    }, Isotope.prototype.updateSortData = function(elems) {
      this._getSorters(), elems = makeArray(elems);
      var items = this.getItems(elems);
      items = items.length ? items : this.items, this._updateItemsSortData(items)
    }, Isotope.prototype._getSorters = function() {
      var getSortData = this.options.getSortData;
      for(var key in getSortData) {
        var sorter = getSortData[key];
        this._sorters[key] = mungeSorter(sorter)
      }
    }, Isotope.prototype._updateItemsSortData = function(items) {
      for(var i = 0, len = items.length; len > i; i++) {
        var item = items[i];
        item.updateSortData()
      }
    };
    var mungeSorter = function() {
      function mungeSorter(sorter) {
        if("string" != typeof sorter) return sorter;
        var args = trim(sorter).split(" "),
          query = args[0],
          attrMatch = query.match(/^\[(.+)\]$/),
          attr = attrMatch && attrMatch[1],
          getValue = getValueGetter(attr, query),
          parser = Isotope.sortDataParsers[args[1]];
        return sorter = parser ? function(elem) {
          return elem && parser(getValue(elem))
        } : function(elem) {
          return elem && getValue(elem)
        }
      }

      function getValueGetter(attr, query) {
        var getValue;
        return getValue = attr ? function(elem) {
          return elem.getAttribute(attr)
        } : function(elem) {
          var child = elem.querySelector(query);
          return child && getText(child)
        }
      }
      return mungeSorter
    }();
    Isotope.sortDataParsers = {
      parseInt: function(val) {
        return parseInt(val, 10)
      },
      parseFloat: function(val) {
        return parseFloat(val)
      }
    }, Isotope.prototype._sort = function() {
      var sortByOpt = this.options.sortBy;
      if(sortByOpt) {
        var sortBys = [].concat.apply(sortByOpt, this.sortHistory),
          itemSorter = getItemSorter(sortBys, this.options.sortAscending);
        this.filteredItems.sort(itemSorter), sortByOpt !== this.sortHistory[0] && this.sortHistory.unshift(sortByOpt)
      }
    }, Isotope.prototype._mode = function() {
      var layoutMode = this.options.layoutMode,
        mode = this.modes[layoutMode];
      if(!mode) throw new Error("No layout mode: " + layoutMode);
      return mode.options = this.options[layoutMode], mode
    }, Isotope.prototype._resetLayout = function() {
      Outlayer.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, Isotope.prototype._getItemLayoutPosition = function(item) {
      return this._mode()._getItemLayoutPosition(item)
    }, Isotope.prototype._manageStamp = function(stamp) {
      this._mode()._manageStamp(stamp)
    }, Isotope.prototype._getContainerSize = function() {
      return this._mode()._getContainerSize()
    }, Isotope.prototype.needsResizeLayout = function() {
      return this._mode().needsResizeLayout()
    }, Isotope.prototype.appended = function(elems) {
      var items = this.addItems(elems);
      if(items.length) {
        var filteredItems = this._filterRevealAdded(items);
        this.filteredItems = this.filteredItems.concat(filteredItems)
      }
    }, Isotope.prototype.prepended = function(elems) {
      var items = this._itemize(elems);
      if(items.length) {
        var previousItems = this.items.slice(0);
        this.items = items.concat(previousItems), this._resetLayout(), this._manageStamps();
        var filteredItems = this._filterRevealAdded(items);
        this.layoutItems(previousItems), this.filteredItems = filteredItems.concat(this.filteredItems)
      }
    }, Isotope.prototype._filterRevealAdded = function(items) {
      var filteredItems = this._noTransition(function() {
        return this._filter(items)
      });
      return this.layoutItems(filteredItems, !0), this.reveal(filteredItems), items
    }, Isotope.prototype.insert = function(elems) {
      var items = this.addItems(elems);
      if(items.length) {
        var i, item, len = items.length;
        for(i = 0; len > i; i++) item = items[i], this.element.appendChild(item.element);
        var filteredInsertItems = this._filter(items);
        for(this._noTransition(function() {
          this.hide(filteredInsertItems)
        }), i = 0; len > i; i++) items[i].isLayoutInstant = !0;
        for(this.arrange(), i = 0; len > i; i++) delete items[i].isLayoutInstant;
        this.reveal(filteredInsertItems)
      }
    };
    var _remove = Isotope.prototype.remove;
    return Isotope.prototype.remove = function(elems) {
      elems = makeArray(elems);
      var removeItems = this.getItems(elems);
      if(_remove.call(this, elems), removeItems && removeItems.length)
        for(var i = 0, len = removeItems.length; len > i; i++) {
          var item = removeItems[i];
          removeFrom(item, this.filteredItems)
        }
    }, Isotope.prototype._noTransition = function(fn) {
      var transitionDuration = this.options.transitionDuration;
      this.options.transitionDuration = 0;
      var returnValue = fn.call(this);
      return this.options.transitionDuration = transitionDuration, returnValue
    }, Isotope
  }
  var jQuery = window.jQuery,
    trim = String.prototype.trim ? function(str) {
      return str.trim()
    } : function(str) {
      return str.replace(/^\s+|\s+$/g, "")
    }, docElem = document.documentElement,
    getText = docElem.textContent ? function(elem) {
      return elem.textContent
    } : function(elem) {
      return elem.innerText
    }, objToString = Object.prototype.toString,
    indexOf = Array.prototype.indexOf ? function(ary, obj) {
      return ary.indexOf(obj)
    } : function(ary, obj) {
      for(var i = 0, len = ary.length; len > i; i++)
        if(ary[i] === obj) return i;
      return -1
    };
  "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], isotopeDefinition) : window.Isotope = isotopeDefinition(window.Outlayer, window.getSize, window.matchesSelector, window.Isotope.Item, window.Isotope.LayoutMode)
}(window),
function() {
  function EventEmitter() {}

  function indexOfListener(listeners, listener) {
    for(var i = listeners.length; i--;)
      if(listeners[i].listener === listener) return i;
    return -1
  }

  function alias(name) {
    return function() {
      return this[name].apply(this, arguments)
    }
  }
  var proto = EventEmitter.prototype,
    exports = this,
    originalGlobalValue = exports.EventEmitter;
  proto.getListeners = function(evt) {
    var response, key, events = this._getEvents();
    if("object" == typeof evt) {
      response = {};
      for(key in events) events.hasOwnProperty(key) && evt.test(key) && (response[key] = events[key])
    } else response = events[evt] || (events[evt] = []);
    return response
  }, proto.flattenListeners = function(listeners) {
    var i, flatListeners = [];
    for(i = 0; i < listeners.length; i += 1) flatListeners.push(listeners[i].listener);
    return flatListeners
  }, proto.getListenersAsObject = function(evt) {
    var response, listeners = this.getListeners(evt);
    return listeners instanceof Array && (response = {}, response[evt] = listeners), response || listeners
  }, proto.addListener = function(evt, listener) {
    var key, listeners = this.getListenersAsObject(evt),
      listenerIsWrapped = "object" == typeof listener;
    for(key in listeners) listeners.hasOwnProperty(key) && -1 === indexOfListener(listeners[key], listener) && listeners[key].push(listenerIsWrapped ? listener : {
      listener: listener,
      once: !1
    });
    return this
  }, proto.on = alias("addListener"), proto.addOnceListener = function(evt, listener) {
    return this.addListener(evt, {
      listener: listener,
      once: !0
    })
  }, proto.once = alias("addOnceListener"), proto.defineEvent = function(evt) {
    return this.getListeners(evt), this
  }, proto.defineEvents = function(evts) {
    for(var i = 0; i < evts.length; i += 1) this.defineEvent(evts[i]);
    return this
  }, proto.removeListener = function(evt, listener) {
    var index, key, listeners = this.getListenersAsObject(evt);
    for(key in listeners) listeners.hasOwnProperty(key) && (index = indexOfListener(listeners[key], listener), -1 !== index && listeners[key].splice(index, 1));
    return this
  }, proto.off = alias("removeListener"), proto.addListeners = function(evt, listeners) {
    return this.manipulateListeners(!1, evt, listeners)
  }, proto.removeListeners = function(evt, listeners) {
    return this.manipulateListeners(!0, evt, listeners)
  }, proto.manipulateListeners = function(remove, evt, listeners) {
    var i, value, single = remove ? this.removeListener : this.addListener,
      multiple = remove ? this.removeListeners : this.addListeners;
    if("object" != typeof evt || evt instanceof RegExp)
      for(i = listeners.length; i--;) single.call(this, evt, listeners[i]);
    else
      for(i in evt) evt.hasOwnProperty(i) && (value = evt[i]) && ("function" == typeof value ? single.call(this, i, value) : multiple.call(this, i, value));
    return this
  }, proto.removeEvent = function(evt) {
    var key, type = typeof evt,
      events = this._getEvents();
    if("string" === type) delete events[evt];
    else if("object" === type)
      for(key in events) events.hasOwnProperty(key) && evt.test(key) && delete events[key];
    else delete this._events;
    return this
  }, proto.removeAllListeners = alias("removeEvent"), proto.emitEvent = function(evt, args) {
    var listener, i, key, response, listeners = this.getListenersAsObject(evt);
    for(key in listeners)
      if(listeners.hasOwnProperty(key))
        for(i = listeners[key].length; i--;) listener = listeners[key][i], listener.once === !0 && this.removeListener(evt, listener.listener), response = listener.listener.apply(this, args || []), response === this._getOnceReturnValue() && this.removeListener(evt, listener.listener);
    return this
  }, proto.trigger = alias("emitEvent"), proto.emit = function(evt) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(evt, args)
  }, proto.setOnceReturnValue = function(value) {
    return this._onceReturnValue = value, this
  }, proto._getOnceReturnValue = function() {
    return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
  }, proto._getEvents = function() {
    return this._events || (this._events = {})
  }, EventEmitter.noConflict = function() {
    return exports.EventEmitter = originalGlobalValue, EventEmitter
  }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
    return EventEmitter
  }) : "object" == typeof module && module.exports ? module.exports = EventEmitter : this.EventEmitter = EventEmitter
}.call(this),
function(window) {
  function getIEEvent(obj) {
    var event = window.event;
    return event.target = event.target || event.srcElement || obj, event
  }
  var docElem = document.documentElement,
    bind = function() {};
  docElem.addEventListener ? bind = function(obj, type, fn) {
    obj.addEventListener(type, fn, !1)
  } : docElem.attachEvent && (bind = function(obj, type, fn) {
    obj[type + fn] = fn.handleEvent ? function() {
      var event = getIEEvent(obj);
      fn.handleEvent.call(fn, event)
    } : function() {
      var event = getIEEvent(obj);
      fn.call(obj, event)
    }, obj.attachEvent("on" + type, obj[type + fn])
  });
  var unbind = function() {};
  docElem.removeEventListener ? unbind = function(obj, type, fn) {
    obj.removeEventListener(type, fn, !1)
  } : docElem.detachEvent && (unbind = function(obj, type, fn) {
    obj.detachEvent("on" + type, obj[type + fn]);
    try {
      delete obj[type + fn]
    } catch(err) {
      obj[type + fn] = void 0
    }
  });
  var eventie = {
    bind: bind,
    unbind: unbind
  };
  "function" == typeof define && define.amd ? define("eventie/eventie", eventie) : window.eventie = eventie
}(this),
function(window, factory) {
  "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(EventEmitter, eventie) {
    return factory(window, EventEmitter, eventie)
  }) : "object" == typeof exports ? module.exports = factory(window, require("eventEmitter"), require("eventie")) : window.imagesLoaded = factory(window, window.EventEmitter, window.eventie)
}(this, function(window, EventEmitter, eventie) {
  function extend(a, b) {
    for(var prop in b) a[prop] = b[prop];
    return a
  }

  function isArray(obj) {
    return "[object Array]" === objToString.call(obj)
  }

  function makeArray(obj) {
    var ary = [];
    if(isArray(obj)) ary = obj;
    else if("number" == typeof obj.length)
      for(var i = 0, len = obj.length; len > i; i++) ary.push(obj[i]);
    else ary.push(obj);
    return ary
  }

  function ImagesLoaded(elem, options, onAlways) {
    if(!(this instanceof ImagesLoaded)) return new ImagesLoaded(elem, options);
    "string" == typeof elem && (elem = document.querySelectorAll(elem)), this.elements = makeArray(elem), this.options = extend({}, this.options), "function" == typeof options ? onAlways = options : extend(this.options, options), onAlways && this.on("always", onAlways), this.getImages(), $ && (this.jqDeferred = new $.Deferred);
    var _this = this;
    setTimeout(function() {
      _this.check()
    })
  }

  function LoadingImage(img) {
    this.img = img
  }

  function Resource(src) {
    this.src = src, cache[src] = this
  }
  var $ = window.jQuery,
    console = window.console,
    hasConsole = "undefined" != typeof console,
    objToString = Object.prototype.toString;
  ImagesLoaded.prototype = new EventEmitter, ImagesLoaded.prototype.options = {}, ImagesLoaded.prototype.getImages = function() {
    this.images = [];
    for(var i = 0, len = this.elements.length; len > i; i++) {
      var elem = this.elements[i];
      if("IMG" === elem.nodeName && this.addImage(elem), elem.nodeType && (1 === elem.nodeType || 9 === elem.nodeType))
        for(var childElems = elem.querySelectorAll("img"), j = 0, jLen = childElems.length; jLen > j; j++) {
          var img = childElems[j];
          this.addImage(img)
        }
    }
  }, ImagesLoaded.prototype.addImage = function(img) {
    var loadingImage = new LoadingImage(img);
    this.images.push(loadingImage)
  }, ImagesLoaded.prototype.check = function() {
    function onConfirm(image, message) {
      return _this.options.debug && hasConsole && console.log("confirm", image, message), _this.progress(image), checkedCount++, checkedCount === length && _this.complete(), !0
    }
    var _this = this,
      checkedCount = 0,
      length = this.images.length;
    if(this.hasAnyBroken = !1, !length) return void this.complete();
    for(var i = 0; length > i; i++) {
      var loadingImage = this.images[i];
      loadingImage.on("confirm", onConfirm), loadingImage.check()
    }
  }, ImagesLoaded.prototype.progress = function(image) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    var _this = this;
    setTimeout(function() {
      _this.emit("progress", _this, image), _this.jqDeferred && _this.jqDeferred.notify && _this.jqDeferred.notify(_this, image)
    })
  }, ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? "fail" : "done";
    this.isComplete = !0;
    var _this = this;
    setTimeout(function() {
      if(_this.emit(eventName, _this), _this.emit("always", _this), _this.jqDeferred) {
        var jqMethod = _this.hasAnyBroken ? "reject" : "resolve";
        _this.jqDeferred[jqMethod](_this)
      }
    })
  }, $ && ($.fn.imagesLoaded = function(options, callback) {
    var instance = new ImagesLoaded(this, options, callback);
    return instance.jqDeferred.promise($(this))
  }), LoadingImage.prototype = new EventEmitter, LoadingImage.prototype.check = function() {
    var resource = cache[this.img.src] || new Resource(this.img.src);
    if(resource.isConfirmed) return void this.confirm(resource.isLoaded, "cached was confirmed");
    if(this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
    var _this = this;
    resource.on("confirm", function(resrc, message) {
      return _this.confirm(resrc.isLoaded, message), !0
    }), resource.check()
  }, LoadingImage.prototype.confirm = function(isLoaded, message) {
    this.isLoaded = isLoaded, this.emit("confirm", this, message)
  };
  var cache = {};
  return Resource.prototype = new EventEmitter, Resource.prototype.check = function() {
    if(!this.isChecked) {
      var proxyImage = new Image;
      eventie.bind(proxyImage, "load", this), eventie.bind(proxyImage, "error", this), proxyImage.src = this.src, this.isChecked = !0
    }
  }, Resource.prototype.handleEvent = function(event) {
    var method = "on" + event.type;
    this[method] && this[method](event)
  }, Resource.prototype.onload = function(event) {
    this.confirm(!0, "onload"), this.unbindProxyEvents(event)
  }, Resource.prototype.onerror = function(event) {
    this.confirm(!1, "onerror"), this.unbindProxyEvents(event)
  }, Resource.prototype.confirm = function(isLoaded, message) {
    this.isConfirmed = !0, this.isLoaded = isLoaded, this.emit("confirm", this, message)
  }, Resource.prototype.unbindProxyEvents = function(event) {
    eventie.unbind(event.target, "load", this), eventie.unbind(event.target, "error", this)
  }, ImagesLoaded
}),
function() {
  var Util, WeakMap, __bind = function(fn, me) {
      return function() {
        return fn.apply(me, arguments)
      }
    };
  Util = function() {
    function Util() {}
    return Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for(key in custom) value = custom[key], null != value && (defaults[key] = value);
      return defaults
    }, Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)
    }, Util
  }(), WeakMap = this.WeakMap || (WeakMap = function() {
    function WeakMap() {
      this.keys = [], this.values = []
    }
    return WeakMap.prototype.get = function(key) {
      var i, item, _i, _len, _ref;
      for(_ref = this.keys, i = _i = 0, _len = _ref.length; _len > _i; i = ++_i)
        if(item = _ref[i], item === key) return this.values[i]
    }, WeakMap.prototype.set = function(key, value) {
      var i, item, _i, _len, _ref;
      for(_ref = this.keys, i = _i = 0, _len = _ref.length; _len > _i; i = ++_i)
        if(item = _ref[i], item === key) return void(this.values[i] = value);
      return this.keys.push(key), this.values.push(value)
    }, WeakMap
  }()), this.WOW = function() {
    function WOW(options) {
      null == options && (options = {}), this.scrollCallback = __bind(this.scrollCallback, this), this.scrollHandler = __bind(this.scrollHandler, this), this.start = __bind(this.start, this), this.scrolled = !0, this.config = this.util().extend(options, this.defaults), this.animationNameCache = new WeakMap
    }
    return WOW.prototype.defaults = {
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: !0
    }, WOW.prototype.init = function() {
      var _ref;
      return this.element = window.document.documentElement, "interactive" === (_ref = document.readyState) || "complete" === _ref ? this.start() : document.addEventListener("DOMContentLoaded", this.start)
    }, WOW.prototype.start = function() {
      var box, _i, _len, _ref;
      if(this.boxes = this.element.getElementsByClassName(this.config.boxClass), this.boxes.length) {
        if(this.disabled()) return this.resetStyle();
        for(_ref = this.boxes, _i = 0, _len = _ref.length; _len > _i; _i++) box = _ref[_i], this.applyStyle(box, !0);
        return window.addEventListener("scroll", this.scrollHandler, !1), window.addEventListener("resize", this.scrollHandler, !1), this.interval = setInterval(this.scrollCallback, 50)
      }
    }, WOW.prototype.stop = function() {
      return window.removeEventListener("scroll", this.scrollHandler, !1), window.removeEventListener("resize", this.scrollHandler, !1), null != this.interval ? clearInterval(this.interval) : void 0
    }, WOW.prototype.show = function(box) {
      return this.applyStyle(box), box.className = "" + box.className + " " + this.config.animateClass
    }, WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      return duration = box.getAttribute("data-wow-duration"), delay = box.getAttribute("data-wow-delay"), iteration = box.getAttribute("data-wow-iteration"), this.animate(function(_this) {
        return function() {
          return _this.customStyle(box, hidden, duration, delay, iteration)
        }
      }(this))
    }, WOW.prototype.animate = function() {
      return "requestAnimationFrame" in window ? function(callback) {
        return window.requestAnimationFrame(callback)
      } : function(callback) {
        return callback()
      }
    }(), WOW.prototype.resetStyle = function() {
      var box, _i, _len, _ref, _results;
      for(_ref = this.boxes, _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) box = _ref[_i], _results.push(box.setAttribute("style", "visibility: visible;"));
      return _results
    }, WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
      return hidden && this.cacheAnimationName(box), box.style.visibility = hidden ? "hidden" : "visible", duration && this.vendorSet(box.style, {
        animationDuration: duration
      }), delay && this.vendorSet(box.style, {
        animationDelay: delay
      }), iteration && this.vendorSet(box.style, {
        animationIterationCount: iteration
      }), this.vendorSet(box.style, {
        animationName: hidden ? "none" : this.cachedAnimationName(box)
      }), box
    }, WOW.prototype.vendors = ["moz", "webkit"], WOW.prototype.vendorSet = function(elem, properties) {
      var name, value, vendor, _results;
      _results = [];
      for(name in properties) value = properties[name], elem["" + name] = value, _results.push(function() {
        var _i, _len, _ref, _results1;
        for(_ref = this.vendors, _results1 = [], _i = 0, _len = _ref.length; _len > _i; _i++) vendor = _ref[_i], _results1.push(elem["" + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value);
        return _results1
      }.call(this));
      return _results
    }, WOW.prototype.vendorCSS = function(elem, property) {
      var result, style, vendor, _i, _len, _ref;
      for(style = window.getComputedStyle(elem), result = style.getPropertyCSSValue(property), _ref = this.vendors, _i = 0, _len = _ref.length; _len > _i; _i++) vendor = _ref[_i], result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
      return result
    }, WOW.prototype.animationName = function(box) {
      var animationName;
      try {
        animationName = this.vendorCSS(box, "animation-name").cssText
      } catch(_error) {
        animationName = window.getComputedStyle(box).getPropertyValue("animation-name")
      }
      return "none" === animationName ? "" : animationName
    }, WOW.prototype.cacheAnimationName = function(box) {
      return this.animationNameCache.set(box, this.animationName(box))
    }, WOW.prototype.cachedAnimationName = function(box) {
      return this.animationNameCache.get(box)
    }, WOW.prototype.scrollHandler = function() {
      return this.scrolled = !0
    }, WOW.prototype.scrollCallback = function() {
      var box;
      return this.scrolled && (this.scrolled = !1, this.boxes = function() {
        var _i, _len, _ref, _results;
        for(_ref = this.boxes, _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) box = _ref[_i], box && (this.isVisible(box) ? this.show(box) : _results.push(box));
        return _results
      }.call(this), !this.boxes.length) ? this.stop() : void 0
    }, WOW.prototype.offsetTop = function(element) {
      for(var top; void 0 === element.offsetTop;) element = element.parentNode;
      for(top = element.offsetTop; element = element.offsetParent;) top += element.offsetTop;
      return top
    }, WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      return offset = box.getAttribute("data-wow-offset") || this.config.offset, viewTop = window.pageYOffset, viewBottom = viewTop + this.element.clientHeight - offset, top = this.offsetTop(box), bottom = top + box.clientHeight, viewBottom >= top && bottom >= viewTop
    }, WOW.prototype.util = function() {
      return this._util || (this._util = new Util)
    }, WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent)
    }, WOW
  }()
}.call(this);