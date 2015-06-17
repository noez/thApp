'use strict';

angular.module('app.widgets')
  .directive('thSidebar', ['$parse', '$timeout', '$state','Types',function($parse, $timeout,$state,Types){
    // Runs during compile
    return {
      restrict: 'E',
      templateUrl: 'app/widgets/thSidebar.html',
      replace: true,
      transclude: true,
      link: function(scope, element, attrs) {
        scope.action =  $parse(attrs.thAction)(scope);
        scope.types = [];

        Types
          .getAll()
          .then(function(data) {
            scope.types = data;
          })
          .catch(function(err) {
            console.log(err);
          });
        var
          menu = element,
          triggerMmenu = menu.find('a.logo-image'),
          thin = menu.find('div.thin'),
          wide = menu.find('div.wide'),
          overlay = menu.find('div.background'),
          closeButton = menu.find('div.main-close-button'),
          timeline = new TimelineMax();

        timeline
          .to(thin, 0.1, { left: -50 })
          .to(overlay, 0.1, { display: 'block' })
          .to(overlay, 0.2, { opacity: 0.7 })
          .to(wide, 0.3, { left: 0})
          //.to(closeButton, 0.3, { left: 700 })
          .to(closeButton, 0.1, { display: 'block'})
          .to(closeButton, 0.3, { rotationY: '0deg' , force3D: true});

        timeline.stop();

        triggerMmenu.on('click', function (evt) {
          evt.preventDefault();
          scope.collapseMenu();
          return false;
        });

        scope.selected = function (type) {
          console.log(type);
          scope.collapseMenu();
        };

        scope.goHome = function() {
          $state.go('home');
          scope.collapseMenu();
        };

        scope.startCustom = function() {
          $state.go('wizard.type');
          scope.collapseMenu();
        };

        scope.collapseMenu = function () {
          $timeout(function() {
            if (scope.action === true) {
              timeline.play();
            }else {
              timeline.reverse();
            }
            scope.action = !scope.action;
            scope.$apply();
          },0);
        };
      }
    };
  }]);
