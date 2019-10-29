"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var domReady = function domReady() {
  var Mask =
  /*#__PURE__*/
  function () {
    function Mask(elementId, _char, length, positions) {
      var _this = this;

      var expiryField = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      _classCallCheck(this, Mask);

      _defineProperty(this, "validateKeyInput", function (e) {
        // Allow arrow, backspace, shift and tab keys
        if (e.key.charCodeAt() === 65 || e.key.charCodeAt() === 66 || e.key.charCodeAt() === 83 || e.key.charCodeAt() === 84) {
          return;
        } // Allow crtl + x, ctrl + c and ctrl + v


        if ((e.metaKey || e.ctrlKey) && (e.key === 'x' || e.key === 'c' || e.key === 'v')) {
          return;
        }

        if (e.key.charCodeAt() > 57 && e.key.charCodeAt() !== 127) {
          e.preventDefault();
          return false;
        }

        if (e.key.charCodeAt() > 31 && e.key.charCodeAt() < 48) {
          e.preventDefault();
          return false;
        }

        if (e.target.value.length > _this.length - 1 && e.code.includes("Digit")) {
          e.preventDefault();
          return false;
        }
      });

      _defineProperty(this, "formatMask", function (e) {
        var formattedValiue = '';
        var inputValue = e.target.value.split('');
        inputValue.forEach(function (character, index) {
          for (var i = 0; i < _this.positions.length; i++) {
            if (formattedValiue.length === _this.positions[i]) {
              formattedValiue += _this["char"];
            }
          }

          if (character.search(/[\d]/) > -1) {
            formattedValiue += character;
          }
        });

        if (formattedValiue.length > _this.length) {
          formattedValiue = formattedValiue.substring(0, _this.length);
        }

        return formattedValiue;
      });

      _defineProperty(this, "updateValue", function (e) {
        var previous = e.target.dataset.previous; // Check that the input isn't longer than the maximum length

        if (e.target.value.length > _this.length && !_this.expiryField) {
          e.target.value = e.target.value.slice(0, _this.length - 1);
        } else if (_this.expiryField) {
          console.log(e.target.value);
        } // Determine if the input had multiple values or if the input has been completely filled out otherwise run the single mask


        if (e.target.value.length - e.target.dataset.previous.length > 1 || e.target.value.length === _this.length - _this.positions.length || e.target.value.length === _this.length) {
          e.target.value = _this.formatMask(e);
        } else if (previous && previous[previous.length - 1] != _this["char"]) {
          e.target.value = _this.formatMask(e);
        }

        e.target.dataset.previous = e.target.value;
      });

      this.elementId = elementId;
      this["char"] = _char;
      this.length = length;
      this.positions = positions;
      this.expiryField = expiryField;
      this.initiate();
    }

    _createClass(Mask, [{
      key: "initiate",
      value: function initiate() {
        if (document.getElementById(this.elementId)) {
          document.getElementById(this.elementId).addEventListener('input', this.updateValue);
          document.getElementById(this.elementId).addEventListener('keydown', this.validateKeyInput);
          document.getElementById(this.elementId).dataset.previous = "";
        }
      }
    }]);

    return Mask;
  }();

  var dateMask = new Mask('text-2019101045289', '/', 10, [2, 5]);
  var creditCardMask = new Mask('credit-card-number', ' ', 19, [4, 9, 14]);
  var creditCardExpiryDate = new Mask('credit-card-expiry', '/', 5, [2]);
};

if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
  domReady();
} else {
  document.addEventListener("DOMContentLoaded", domReady);
}