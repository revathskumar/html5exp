(function(){
  'use strict';
  var MarqueeModule = function() {

    var _private = {
      move: function(){
        var currentLeft = parseInt(this.el.style.left, 10);
        var left = currentLeft;
        var parentWidth = (this.el.parentNode.offsetWidth - this.el.parentNode.offsetLeft);
        if(left < parentWidth && this.direction === 'forward'){
          left += 10;
          this.el.style.left = left + 'px';
        }
        else{
          this.direction = 'backward';
        }

        if(left > this.el.offsetParent.offsetLeft && this.direction === 'backward'){
          left -= 10;
          this.el.style.left = left + 'px';
        }
        else{
          this.direction = 'forward';
        }

      }
    };

    var Marquee = function(el) {
      this.el = el;
      this.direction = 'forward';
      this.el.style.position = 'relative';
      this.el.style.left = '0px';
      this.interval = setInterval(function(){ _private.move.call(this); }.bind(this), 100);
    };

    Marquee.prototype.stop = function () {
      setTimeout(function(){ clearInterval(this.interval); }.bind(this), 5000);
    };

    return Marquee;
  };

  window.Marquee = new MarqueeModule();
})();

var marq = new Marquee(document.getElementById('marq'));
marq.stop();
