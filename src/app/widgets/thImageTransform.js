'use strict';

angular.module('app.widgets')
  .directive('thImageTransform', ['$timeout','$window', '$document', 'DesignData', function($timeout, $window, $document, DesignData) {
    // Runs during compile

    return {
      scope: {
        image: '=thImage'
      },
      restrict: 'E',
      templateUrl : 'app/widgets/thImageTransform.html',
      replace: true,
      transclude: true,
      link: function(scope, element) {
        scope.designData = DesignData;
        var
          isInitialized = false,
          isTouchSupported = ('ontouchstart' in $window) || ($window.navigator.msPointerEnable) ? true : false,
          events = (isTouchSupported ? {
            start: 'touchstart',
            end: 'touchend',
            move: 'touchmove'
          } : {
            start: 'mousedown',
            end: 'mouseup',
            move: 'mousemove'
          }),
          scaleImage = 315/315,

          getPosition = function(evt) {
            var posX = 0,
              posY = 0;

            if (evt.originalEvent.targetTouches) {
              posX = evt.originalEvent.targetTouches[0].pageX;
              posY = evt.originalEvent.targetTouches[0].pageY;
            } else if (evt.pageX || evt.pageY) {
              posX = evt.pageX;
              posY = evt.pageY;
            } else if (evt.clientX || evt.clientY) {
              posX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
              posY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            return {
              x: posX,
              y: posY
            };
          },
          clamp = function(value, min, max) {
            return Math.min(Math.max(value, min), max);
          };

        var transform = {
          init: function() {
            this.cache();
            return this;
          },
          reload: function() {
            var self = this;
            self.unbind();
            self.cache();
          },
          // cache the elements to work
          cache: function() {
            var self = this;
            self.dragArea = element.find('.tfm-area');
            self.dragImage = element.find('.tfm-image');
            self.dragMask = element.find('.tfm-mask');
            self.dragImage.css({
              'width': 'auto',
              'top': 0,
              'left': 0
            });
            self.initVectors();
            self.centerImage();
            this.bind();
          },
          centerImage: function() {
            var self = this;

            self.dragImage.one('load', function() {

              var
                rect = self.rect($(this)),
                mask = self.rect(self.dragMask),
                ratio = rect.width / rect.height,
                direction = (ratio > 1) ? 'horizontal' : 'vertical',
                newWidth = 0,
                newHeight = 0;

              if (direction === 'vertical') {
                newWidth = mask.width * 1.2;
                newHeight = newWidth / ratio;

                $(this).width(newWidth);
                $(this).height(newHeight);

              } else if (direction === 'horizontal') {
                newHeight = mask.height * 1.2;
                newWidth = newHeight * ratio;

                $(this).width(newWidth);
                $(this).height(newHeight);
              }

              var
                centerX = (mask.width - $(this).width()) * 0.5,
                centerY = (mask.height - $(this).height()) * 0.5;

              transform.vector.imgInit.x = centerX;
              transform.vector.imgInit.y = centerY;

              transform.imgRect = {
                width : newWidth,
                height: newHeight,
                top: centerY,
                left: centerX
              };

             scope.$apply(function() {
                scope.designData.transform.left = transform.imgRect.left * scaleImage;
                scope.designData.transform.top = transform.imgRect.top * scaleImage;
                scope.designData.transform.width = transform.imgRect.width * scaleImage;
                scope.designData.transform.height = transform.imgRect.height * scaleImage;
              });

              $(this).css({
                left: centerX,
                top: centerY
              });

            }).each(function() {
              if (this.complete) {
                $(this).load();
              }
            });
          },
          initVectors: function() {
            var self = this;

            self.vector = {
              init: { x: 0,    y: 0},
              current: { x: 0, y: 0},
              imgInit: { x: 0, y: 0},
              imgDest: { x: 0, y: 0}
            };

          },
          scale: function(range){
            console.log(range);
            var self = this,
              nw = range.value * self.imgRect.width, //clamp( ( range.value * self.imgRect.width )  , self.imgRect.width, ( self.imgRect.width * range.max )),
              nh = nw * self.imgRect.height / self.imgRect.width,
              ot = self.vector.imgInit.y,
              ol = self.vector.imgInit.x,
              s = range.value / range.lastValue,
              nt = s * ot + (1 - s) * self.dragMask.outerHeight(true) / 2,
              nl = s * ol + (1 - s) * self.dragMask.outerWidth(true) / 2;

              //nt = clamp( nt , self.dragMask.outerHeight(true) - nh, 0);
              //nl = clamp( nl , self.dragMask.outerWidth(true) - nw, 0);

              self.dragImage.css({
                width : nw,
                height : nh,
                top: nt,
                left: nl
              });
              scope.$apply(function() {
                scope.designData.transform.left = nl * scaleImage;
                scope.designData.transform.top = nt * scaleImage;
                scope.designData.transform.width = nw * scaleImage;
                scope.designData.transform.height = nh * scaleImage;
              });
          },
          lastPosition: function(){
            var
              self = this,
              imgPosition = self.dragImage.position();

            self.vector.imgInit.x = imgPosition.left;
            self.vector.imgInit.y = imgPosition.top;
          },
          bind: function() {
            var self = this;
            self.dragArea.on(events.start, self.onStartHandler);
          },
          onStartHandler: function(evt){
            this.allowUp = (this.scrollTop > 0);
            this.allowDown = (this.scrollTop < this.scrollHeight - this.clientHeight);
            this.prevTop = null;
            this.prevBot = null;
            this.lastY = evt.pageY;

            transform.vector.init.x = getPosition(evt).x;
            transform.vector.init.y = getPosition(evt).y;

            $document.on(events.end, transform.onEndHandler);
            $document.on(events.move, transform.onMoveHandler);

            transform.dragImage.on('dragstart', function (evt) {
              evt.preventDefault();
            });
          },
          onEndHandler: function(evt){
            $document.off(events.move, transform.onMoveHandler);
            $document.off(events.end, transform.onEndHandler);

          },
          onMoveHandler: function(evt){
            var up = (evt.pageY > this.lastY), down = !up;
            this.lastY = evt.pageY;

            if ((up && this.allowUp) || (down && this.allowDown)) evt.stopPropagation();
            else evt.preventDefault();

            var
              mouse = getPosition(evt),
              bound = {
                //top: transform.dragMask.outerHeight() - transform.dragImage.height(),
                top: -transform.dragImage.height(),
                //left : transform.dragMask.outerWidth() - transform.dragImage.width(),
                left : - transform.dragImage.width(),
                right : transform.dragMask.outerWidth(),
                bottom : transform.dragMask.outerHeight()
              };

              transform.vector.current.x = mouse.x;
              transform.vector.current.y = mouse.y;
              var
                dx = transform.vector.current.x - transform.vector.init.x,
                dy = transform.vector.current.y - transform.vector.init.y,
                nx = clamp(transform.vector.imgInit.x + dx , bound.left, bound.right),
                ny = clamp(transform.vector.imgInit.y + dy , bound.top, bound.bottom);

              transform.vector.imgDest.x = nx;
              transform.vector.imgDest.y = ny;

              transform.dragImage.css({
                left : transform.vector.imgDest.x,
                top : transform.vector.imgDest.y
              });

              transform.vector.init.x = transform.vector.current.x;
              transform.vector.init.y = transform.vector.current.y;

              transform.vector.imgInit.x = transform.vector.imgDest.x;
              transform.vector.imgInit.y = transform.vector.imgDest.y;



              scope.$apply(function() {
                scope.designData.transform.left = transform.vector.imgDest.x * scaleImage;
                scope.designData.transform.top = transform.vector.imgDest.y * scaleImage;
              });
          },
          unbind: function() {
          },
          rect: function(el) {
            return el[0].getBoundingClientRect();
          }
        };

        var range = {
          init: function() {
            var self = this;
            // settings default
            self.data = {
              min: 1/3,
              max : 3,
              value : 1,
              lastValue : 1
            };

            this.cache();
            return this;
          },
          reload: function() {
            var self = this;
            self.unbind();
            self.cache();
          },
          cache: function() {
            var self = this;

            self.thumb = element.find('.tfm-range-thumb');
            self.track = element.find('.tfm-range-track');

            var left = ( ( self.track.width() - self.thumb.width() ) /( self.data.max - self.data.min )   * (self.data.value - self.data.min ) );

            // reset styles
            self.thumb.css({
              top: 0,
              left: left
            });

            // reset default values
            self.data.value = 1;
            self.data.lastValue  = 1;

            self.bound = {
              min : self.track.position().left,
              max : self.track.width() - self.thumb.width()
            };


            self.offsetX = 0;

            self.bind();

          },
          bind: function() {
            var self = this;
            self.thumb.on(events.start, self.onStartHandler);
          },
          onStartHandler: function(evt){
            evt.preventDefault();
            range.offsetX = getPosition(evt).x - range.thumb.position().left;

            $document.on(events.end, range.onEndHandler);
            $document.on(events.move, range.onMoveHandler);
          },
          onEndHandler: function(evt){
            $document.off(events.end, range.onEndHandler);
            $document.off(events.move, range.onMoveHandler);

            range.data.lastValue = range.data.value;
            transform.lastPosition();
          },
          onMoveHandler: function(evt){
             var
              mouse = getPosition(evt),
              proportion = (range.data.max - range.data.min) / (range.bound.max - range.bound.min),
              point = ( mouse.x - range.offsetX ),
              newPoint = clamp(point, range.bound.min, range.bound.max),
              value = (point - range.bound.min) * proportion + range.data.min;

              range.thumb.css({ left : newPoint });

              value = clamp( value, range.data.min, range.data.max);
              range.data.value = value;

            transform.scale(range.data);
          },
          unbind: function() {
            range.thumb.off(events.start, range.onStartHandler);
          }
        };

        // listen if a new image has been uploaded
        scope.$watch('image', function(newVal) {
          if (isInitialized) {
            transform.reload();
            range.reload();
          } else if (!_.isUndefined(newVal) && !_.isEmpty(newVal)) {
            $timeout(function () {
              transform.init();
              range.init();
              isInitialized = true;
            },1000);

          }
        });
      }
    };
  }]);
