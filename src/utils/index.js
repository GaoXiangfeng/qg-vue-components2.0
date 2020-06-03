let zIndex = 20141223
export const getZIndex = function () {
  return zIndex++
}
/* 监听事件*/
export function on(ele, ev, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(ev, handler, false)
  } else {
    ele.attachEvent('on' + ev, function () {
      fn.call(handler);
    })
  }
}
/* 取消监听*/
export function off(ele, ev, handler) {
  if (ele.removeEventListener) {
    ele.removeEventListener(ev, handler, false)
  } else {
    ele.detachEvent('on' + ev, function () {
      fn.call(handler);
    })
  }
}

/* istanbul ignore next */
export const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};


export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};