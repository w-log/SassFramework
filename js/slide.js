(function(){

    var Option = function(option){
        if ( typeof option === "undefined" ) {
            this.fullScreen = false;
        } else {
            this.fullScreen = option.fullScreen;
        }
    };
    function getSlide(element){
      var ele = element;
      while ( ele !== null ){
        if( twCom.fn.hasClass(ele, "slide") ){
          slide = ele;
          break;
        }
        ele = ele.parentElement;
      }
      return ele;
    }


    function triggerClick(e){
      var self = this;
      var _Element = self._Element;
      var indexElement = _Element.querySelector(".active");
      var nextElement= indexElement.nextSibling;
      var prevElement = indexElement.previousSibling;
      var lastIndex = self.slideLength - 1;
      var triggerElement, trigger;

      if( e instanceof MouseEvent ){
        triggerElement = e.target || e.srcElement;
        trigger = twCom.fn.hasClass(triggerElement, "next") ? "next" : "prev";
      }else{
        trigger = e.type === "swipeleft" ? "next" : "prev";
      }


      if ( indexElement.getAttribute("data-index") === "0" &&  prevElement === null ){
        prevElement = indexElement.parentElement.childNodes[self.slideLength - 1];
      }

      if ( indexElement.getAttribute("data-index") === lastIndex.toString() &&  nextElement === null ){
        nextElement = indexElement.parentElement.childNodes[0];
      }

      if( trigger === "next" ){
        twCom.fn.removeClass(indexElement, "active");
        twCom.fn.addClass(nextElement, "active");
        self.setSliding(nextElement);
      }else{
        twCom.fn.removeClass(indexElement, "active");
        twCom.fn.addClass(prevElement, "active");
        self.setSliding(prevElement);
      }
    }

/*
옵션
풀스크린
실행시간
크기
*/
      var slide = function(selector, option){
        if ( this instanceof slide ){
          this.init(selector, option);
        } else {
          return new slide(selector, option);
        }
      };

      slide.prototype.init = function(selector, option){
        this._Element = document.querySelector(selector);
        this.setDisplay(this._Element.getElementsByClassName("slide"));
        this.setSlideimage();
        this.setSwipe();
        this.setTrigger();
        // this.setAutosliding(true, 10000);
        // console.log(TweenLite);
     };

     slide.prototype.setAutosliding = function(bool, time){
        var self = this;
        var _Element = self._Element;
        var displayList = self._displayList;

        setInterval(function(){
            var indexElement = displayList.querySelector(".active");
            var nextElement = indexElement.nextSibling === null ? displayList.childNodes[0] : indexElement.nextSibling;
            self.displayClick({target : nextElement});
        }, time);
     };

     slide.prototype.setTrigger = function(){
        var self = this;
        var _Element = self._Element;
        var nextTrigger = _Element.getElementsByClassName("next")[0];
        var prevTrigger = _Element.getElementsByClassName("prev")[0];

        nextTrigger.addEventListener("click", triggerClick.bind(this));
        prevTrigger.addEventListener("click", triggerClick.bind(this));
     };

     slide.prototype.setSwipe = function(){
        var self = this;
        var _Element = this._Element;
        var mc = new Hammer(_Element);
        mc.on("swipeleft swiperight", triggerClick.bind(self));
    };

     slide.prototype.displayClick = function(e){
        var clickElement = e.target || e.srcElement;
        var activeElement = this._displayList.querySelector(".active");
        if( activeElement !== null ){
            twCom.fn.removeClass(activeElement, "active");
        }
        twCom.fn.addClass(clickElement, "active");
        this.setSliding(clickElement);
    };


    slide.prototype.setSliding = function(element){
        var slides = this._slides;
        var index = parseInt(element.getAttribute("data-index"));
        var nextIndex = index === slides.length - 1 ? 0 : index + 1;
        var prevIndex = index === 0 ? slides.length - 1 : index - 1;
        var width = this._Element.clientWidth;
        var indexWidth, slide_css, translateX,zIndex,opacity;
        for(var i = 0; i < slides.length; i++){

            slide_css = twCom.fn.cssObject(slides[i]);
            zIndex = i === index ? 1 : -2;
            indexWidth = (i - index) * width;
            translateX = "translateX("+indexWidth+"px)";
            slide_css.setCss("z-index",zIndex);
            slide_css.setCss("-o-transform", translateX);
            slide_css.setCss("-webkit-transform", translateX);
            slide_css.setCss("-ms-transform", translateX);
            slide_css.setCss("-moz-transform", translateX);
            slide_css.setCss("transform", translateX);
            slide_css.setCss("z-index", zIndex);
        }
    };

    slide.prototype.setDisplay = function(slides){
        var ul = document.createElement("ul");
        var i,li;
        this.slideLength = slides.length;

        twCom.fn.addClass(ul,"displayList");
        for ( i = 0; i < slides.length; i++ ) {
            li = document.createElement("li");
            li.setAttribute("data-index" , i);
            if (i === 0){
              twCom.fn.addClass(li, "active");
            }
            twCom.fn.addClass(li, "display-item");
            li.addEventListener("click", this.displayClick.bind(this));
            ul.appendChild(li);
            li = null;
        }
        this._displayList = ul;
        this._slides = slides;
        this._Element.appendChild(ul);
        ul = null;
    };



    slide.prototype.setSlideimage = function(){
        var slides = this._slides;
        var displayList = this._displayList;
        var width = this._Element.clientWidth;
        var duration = 1500 + "ms";
        var easing = "cubic-bezier(0.075, 0.82, 0.300, 1)"; //animation 시간
        var cssObject = {}, cssObject2 = {};
        var index = 0;
        var nextIndex = index === slides.length - 1 ? 0 : index + 1;
        var prevIndex = index === 0 ? slides.length - 1 : index - 1;
        var indexWidth,translateX,zIndex,slide_css,property;

        property = "transform";
        cssObject['-webkit-transition-property'] = property;
        cssObject['-moz-transition-property']    = property;
        cssObject['-o-transition-property']      = property;
        cssObject['transition-property']         = property;
        //animation 시간
        cssObject['-webkit-transition-duration'] = duration;
        cssObject['-moz-transition-duration']    = duration;
        cssObject['-o-transition-duration']      = duration;
        cssObject['transition-duration']         = duration;
        //easing
        cssObject['-webkit-transition-timing-function'] = easing;
        cssObject['-moz-transition-timing-function']    = easing;
        cssObject['-o-transition-timing-function']      = easing;
        cssObject['transition-timing-function']         = easing;

        for(var i = 0; i < slides.length; i++){
            slide_css = twCom.fn.cssObject(slides[i]);
            zIndex = i === index ? 1 : -2;
            indexWidth = (i - index) * width;
            translateX = "translateX("+indexWidth+"px)";

            cssObject['-webkit-transform'] = translateX;
            cssObject['-moz-transform'] = translateX;
            cssObject['-ms-transform'] = translateX;
            cssObject['-o-transform'] = translateX;
            slide_css.cssEach(cssObject);
            slide_css.setCss("z-index",zIndex);
        }
    };

    //추후 개발예정

    // for(var i = 0; i < slides.length; i++){
    //     if( i === nextIndex ){
    //       opacity = 1;
    //       zIndex = -1;
    //       indexWidth = 1 * width;
    //     }else if ( i === prevIndex ){
    //       opacity = 1;
    //       zIndex = -1;
    //       indexWidth =  width * -1;
    //     }else{
    //       opacity = i === index ? 1 : 0;
    //       zIndex = i === index ? 1 : -2;
    //       indexWidth = (i - index)  *  width;
    //     }
    //     slide_css = twCom.fn.cssObject(slides[i]);
    //     if(i === index ){
    //         translateX = "translateX(0px) translateX(0px) translateX(0px) translateZ(0px)";
    //     }else{
    //       translateX = "translateX(0px) translateX("+indexWidth+"px) translateZ(0px)";
    //     }
    //     slide_css.setCss("opacity", opacity);
    //     slide_css.setCss("-o-transform", translateX);
    //     slide_css.setCss("-webkit-transform", translateX);
    //     slide_css.setCss("-ms-transform", translateX);
    //     slide_css.setCss("-moz-transform", translateX);
    //     slide_css.setCss("transform", translateX);
    //     slide_css.setCss("z-index", zIndex);
    // }







    //
    // function(e){
    //     console.log(e);
    //     var slide = getSlide(e.target);
    //     if ( slide === null) { return false; }
    //
    //     var indexElement = slide.parentElement.querySelector(".active");
    //     var nextElement= indexElement.nextSibling;
    //     var prevElement = indexElement.previousSibling;
    //     var lastIndex = self.slideLength - 1;
    //     if ( indexElement.getAttribute("data-index") === "0" &&  prevElement === null ){
    //         prevElement = indexElement.parentElement.childNodes[self.slideLength - 1];
    //     }
    //
    //     if ( indexElement.getAttribute("data-index") === lastIndex.toString() &&  nextElement === null ){
    //         nextElement = indexElement.parentElement.childNodes[0];
    //     }
    //     if ( e.type === "swiperight" ){
    //       twCom.fn.removeClass(indexElement, "active");
    //       twCom.fn.addClass(prevElement, "active");
    //       self.setSliding(prevElement);
    //     } else if( e.type === "swipeleft" ){
    //       twCom.fn.removeClass(indexElement, "active");
    //       twCom.fn.addClass(nextElement, "active");
    //       self.setSliding(nextElement);
    //     }
    //
    //
    //
    //
    //
    // }
    //



twCom.slide = slide;


window.addEventListener("DOMContentLoaded", function(e){
    twCom.slide("#topSlide");
});
})();
