"use strict";

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/*:
 * @plugindesc Scenario message management plug-in for RPG Maker MV
 * @author Had2Apps
 *
 * @help 
 * https://github.com/katai5plate/rpgmv-drama/blob/master/README.md
 *
 */
(function() {
  var _drama = {
    libraries: [],
    faces: {},
    define: function define() {
      window.drama = typeof window.drama === "undefined" ? _objectSpread({}, this) : window.drama;
    },
    chara: function chara(items) {
      this.faces = _objectSpread({}, this.faces, items);
    },
    write: function write(book, pages) {
      if (this.getBook(book).length !== 0) {
        console.error("The \"".concat(book, "\" book has already been booked."));
        return;
      }

      this.libraries = _toConsumableArray(this.libraries).concat([{
        book: book,
        pages: pages
      }]);
    },
    read: function read(book, page) {
      var _this$getBook$pages$p,
        _this = this;

      var slice = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var paper = (_this$getBook$pages$p = this.getBook(book).pages[page]).slice.apply(_this$getBook$pages$p, _toConsumableArray(slice));

      paper.forEach(function(message) {
        var mes = message.split(/[\n|\r]/g).map(function(v) {
          return v.replace(/^.*?(\S.*?)/, "$1");
        });
        var face = _this.faces[mes[0]] || ["", 0];
        $gameMessage.setFaceImage(face[0], face[1]);
        $gameMessage.add("".concat(mes.slice(1).join("\n"), "\f"));
      });
    },
    getBook: function getBook(book) {
      return this.libraries.filter(function(v) {
        return v.book === book;
      })[0] || [];
    }
  };

  _drama.define();
})();
