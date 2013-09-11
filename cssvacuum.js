/**
 * CSSVacuum
 * Version 0.1.0
 *
 * Copyright Nick Dreckshage, MIT Licensed
 * https://github.com/ndreckshage/cssvacuum
 */
(function(){
  var instance = null;

  /**
   * @constructor
   * @param {number} ABOVE_THE_FOLD line for elements that should be included
   * @param {number} SAFE_INDEX     z-index of cssvacuum
   */
  function CSSVacuum (ABOVE_THE_FOLD, SAFE_INDEX) {
    // general properties
    this.ABOVE_THE_FOLD = ABOVE_THE_FOLD;
    this.SAFE_INDEX = SAFE_INDEX;
    this.WIDTH = $(window).width();
    this.SELECTORS = [];
    
    // storages for generating new css
    this.BARTY_CROUCH_JR = [];
    this.OLLIVANDERS = {};
    
    // elements
    this.$POTTER = null;
    this.$BUTTON = null;
    this.$CONTAIN = null;
    this.$CANVAS = null;
    this.$BODY = $('body');

    this.init();
  }

  /**
   * initialize cssvacuum
   */
  CSSVacuum.prototype.init = function () {
    var _this = this;
    $(function(){
      _this.$POTTER = $('*').filter(function(index){
        return $(this).offset().top <= _this.ABOVE_THE_FOLD;
      });

      $.each(_this.$POTTER, function () {
        _this.dementorsKiss($(this), _this);
      });

      _this.buildHTML();
      _this.browseOllivanders();
    });
  };
  
  /**
   * all html/styling
   */
  CSSVacuum.prototype.buildHTML = function () {
    var $innerButton = $('<span/>').text('CSS').css({
      'color':'#5bc0de'
    });

    this.$BUTTON = $('<button/>').css({
      'font-family':'\'Helvetica Neue\', Helvetica',
      'width':'100%',
      'margin-top':'0',
      'background-color':'rgb(255, 255, 255)',
      'font-size':'30px',
      'color':'rgb(226, 93, 93)',
      'border':'none',
      'cursor':'pointer',
      '-webkit-box-shadow':'rgba(0, 0, 0, .4) 0px 0px 10px 0px',
      'box-shadow':'rgba(0, 0, 0, .4) 0px 0px 10px 0px',
      'opacity':'.5'
    }).html($innerButton).append('vacuum');

    this.$CONTAIN = $('<div/>').css({
      'font-family':'\'Helvetica Neue\',Helvetica',
      'width':'200px',
      'background-color':'#fff',
      'position':'fixed',
      'top':'0px',
      'margin':'0',
      'left':'45%',
      'z-index':this.SAFE_INDEX,
      'text-align':'center'
    }).html(this.$BUTTON);

    this.$INPUT = $('<textarea/>').css({
      'height':'36px',
      'width':'190px',
      'padding':'6px 12px',
      'font-size':'14px',
      'line-height':'1.428571429',
      'color':'#555555',
      'vertical-align':'middle',
      'background-color':'#ffffff',
      'border':'1px solid #cccccc',
      'border-radius':'4px',
      'margin':'5px',
      'resize':'none',
      'box-sizing':'border-box'
    });

    this.$BODY.prepend(this.$CONTAIN);
    this.$BUTTON.on('CSSVACUUM_READY', $.proxy(this.enableVacuum, this));
  };

  /**
   * initialize listeners when elements on page
   */
  CSSVacuum.prototype.enableVacuum = function () {
    this.$BUTTON.css({
      'opacity':'1'
    }).on('click', $.proxy(this.sortingHat, this));
  }
  
  /**
   * look at styles from all loaded stylesheets.
   */
  CSSVacuum.prototype.browseOllivanders = function () {
    var _this = this;
    var count = document.styleSheets.length;
    
    $.each(document.styleSheets, function (k, v) {
      if (v.cssRules != null) {
        _this.takeWands(v.cssRules);
      } else if (v.href != null) {
        // if the stylesheet is from a cdn, we have to get creative
        $.ajax({
          url: v.href,
          dataTypes: 'text',
          async: false
        }).done(function(data){
          var a = document.createElement('a');
          var url = v.href;

          a.href = url;
          data = data.replace(/url\(\//g, 'url(' + a.origin + '/');
          $('head').append('<style type="text/css">' + data + '</style>');
          var repairedWands = document.styleSheets[document.styleSheets.length - 1];
          if (repairedWands.cssRules != null) {
            _this.takeWands(repairedWands.cssRules);
          }
        });
      }

      if (!--count) {
        _this.$BUTTON.trigger('CSSVACUUM_READY');
      }
    });
  };
  
  /**
   * build full list of all styles
   */  
  CSSVacuum.prototype.takeWands = function (wands) {
    var _this = this;
    $.each(wands, function (k, v) {
      if (_this.OLLIVANDERS[v.selectorText] != null) {
        _this.OLLIVANDERS[v.selectorText] += v.cssText;
      } else {
        _this.OLLIVANDERS[v.selectorText] = v.cssText;
      }
    });
  };
  
  /**
   * build new stylesheet based on relevant above fold styles
   */  
  CSSVacuum.prototype.sortingHat = function () {
    var _this = this;
    var count = _this.SELECTORS.length, revCount = 0;

    _this.$CANVAS = Raphael(0, 0, _this.WIDTH, _this.ABOVE_THE_FOLD);

    $.each(_this.SELECTORS, function (k, selectorName) {
      for (k in _this.OLLIVANDERS) {
        if (!!~k.indexOf(selectorName)) {
          _this.addIfUnique(_this.BARTY_CROUCH_JR, _this.OLLIVANDERS[k], '');
        }
      }

      if (count % 15 === 0) {
        setTimeout(function(){
          _this.abracadabra();
        }, revCount * 5);
      }

      revCount++;
      if (!--count){
        _this.$INPUT.text(_this.BARTY_CROUCH_JR.join('').replace(/\'/g, "\\'"));
        _this.$CONTAIN.html(_this.$INPUT);
        setTimeout(function(){
          $('style, link').remove();
        }, 2000);
      }
    });
  };
  
  /**
   * initialize animation
   */  
  CSSVacuum.prototype.abracadabra = function () {
    $(this.$CANVAS.canvas).css({
      'z-index': this.SAFE_INDEX - 1387
    });

    var pos = {
      top: Math.floor(Math.random() * this.ABOVE_THE_FOLD),
      left: Math.floor(Math.random() * this.WIDTH)
    }

    var line = this.$CANVAS.path("M" + pos.left + " " + pos.top);
      
    var colors = [
      '#01ADA6',
      '#02BD74',
      '#ECEA48',
      '#EF932F',
      '#D54511'
    ];

    line.attr({
      stroke: colors[Math.floor(Math.random() * 5)],
      "stroke-width": 10
    });

    this.waveWand(line, pos);
  };
  
  /**
   * animate lines
   */  
  CSSVacuum.prototype.waveWand = function (line, pos) {
    var _this = this;
    line.animate({
      path: "M" + pos.left + " " + pos.top + " L" + _this.WIDTH / 2 + " 0"
    }, 500, function () {
      line.animate({
        path: "M" + _this.WIDTH / 2 + " 0"
      }, 500);
    });
  };
  
  /**
   * add above the fold styles to master list
   */  
  CSSVacuum.prototype.dementorsKiss = function ($el, _this) {
    _this.addIfUnique(_this.SELECTORS, $el.prop('tagName').toLowerCase(), '');
    _this.addIfUnique(_this.SELECTORS, $el.attr('id'), '#');
    var classList = $el.attr('class');
    if (classList != null) {
      var classes = classList.split(' ');
      $.each(classes, function (k, v) {
        _this.addIfUnique(_this.SELECTORS, v, '.');
      });
    }
  };

  /**
   * check that elements are unique
   */  
  CSSVacuum.prototype.addIfUnique = function (ar, v, prefix) {
    if (v != null) {
      v = prefix + v;
      if ($.inArray(v, ar) === -1) {
        ar.push(v);
      }
    }
  };

  /**
   * enable vacuum if ?CSSVacuum in search param
   */
  function getInstance (instance) {
    if (!instance && !!document.location.search && !!~document.location.search.indexOf('CSSVacuum')) {
      instance = new CSSVacuum (600, 3298492)
    }
  }

  return getInstance();
})();