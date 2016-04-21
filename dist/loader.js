(function(factory) {
  if (typeof define === 'function' && define.amd) {
    return define([], factory);
  } else if (typeof exports === 'object') {
    return module.exports = factory();
  } else {
    return window.SubmitButton = factory();
  }
})(function() {
  'use strict';
  var SubmitButton;
  SubmitButton = (function() {
    function SubmitButton(target, url1, active) {
      this.target = target;
      this.url = url1;
      this.active = active;
      this.element = document.querySelector(this.target);
      this.requestComplete = false;
      this.classPrefix = 'submit-button-loader';
      this.addNodes();
      this.setClasses();
      this.bindEvents();
    }

    SubmitButton.prototype.addNodes = function() {
      var node;
      node = document.createElement("span");
      node.className = this.classPrefix + '-progress';
      return this.element.appendChild(node);
    };

    SubmitButton.prototype.setClasses = function() {
      this.addClass(this.classPrefix);
      if (this.active) {
        return this.addClass(this.classPrefix + '-active');
      }
    };

    SubmitButton.prototype.hasClass = function(className) {
      return this.element.className.indexOf(className) > -1;
    };

    SubmitButton.prototype.addClass = function(className) {
      if (!this.hasClass(className)) {
        this.element.className += ' ' + className;
        return this.element.className = this.element.className.trim();
      }
    };

    SubmitButton.prototype.removeClass = function(className) {
      if (this.hasClass(className)) {
        this.element.className = this.element.className.replace(className, '');
        return this.element.className = this.element.className.trim();
      }
    };

    SubmitButton.prototype.bindEvents = function() {
      return this.element.addEventListener("click", this.clickButton.bind(this), false);
    };

    SubmitButton.prototype.clickButton = function(event) {
      event.preventDefault();
      return this.startLoading();
    };

    SubmitButton.prototype.startLoading = function() {
      var _this, interval;
      if (!this.hasClass(this.classPrefix + '-loading')) {
        this.addClass(this.classPrefix + '-loading');
        this.performRequest();
        _this = this;
        return interval = setInterval(function() {
          if (_this.requestComplete) {
            clearInterval(interval);
            return _this.stopLoading();
          }
        }, 2000);
      }
    };

    SubmitButton.prototype.stopLoading = function() {
      var _this;
      this.removeClass(this.classPrefix + '-loading');
      this.addClass(this.classPrefix + '-complete');
      _this = this;
      return setTimeout(function() {
        _this.removeClass(_this.classPrefix + '-complete');
        if (_this.hasClass(_this.classPrefix + '-active')) {
          return _this.removeClass(_this.classPrefix + '-active');
        } else {
          return _this.addClass(_this.classPrefix + '-active');
        }
      }, 1000);
    };

    SubmitButton.prototype.performRequest = function() {
      var parms, request, url;
      request = new XMLHttpRequest();
      url = this.url;
      parms = 'fname=Chris&lname=Raley&age=26&favoriteFood=turkey';
      request.open('POST', url, false);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      request.onprogress = this.updateProgress.bind(this);
      request.send(parms);
      if (request.status === 200) {
        return this.requestComplete = true;
      }
    };

    SubmitButton.prototype.updateProgress = function(event) {
      var percentComplete;
      percentComplete = (evt.loaded / evt.total) * 100;
      return console.log(percentComplete);
    };

    return SubmitButton;

  })();
  return SubmitButton;
});
