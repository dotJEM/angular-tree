(function() {
    var comp = angular.module('dotjem.angular.tree', []);

    comp.controller("dxTreeCtrl", [function () {
        var template;
        return {
            template: function (value) {
                if (angular.isDefined(value)) {
                    template = value;
                } else {
                    return template;
                }
            }
        };
    }]);

    function $NodeDirective(isRoot, name, req) {
        var factory = function(compile, parse){
            var directive = {
                restrict: 'AEC',
                require: req,
                scope: true,
                compile: function(elm, attr) {
                    var watchExp = attr[name] || (isRoot ? attr.root : attr.node),
                        template,
                        link = {
                        post: function (scope, elm, attr, ctrl) {
                            scope.$dxLevel = isRoot ? 0 : scope.$dxLevel + 1;
                            scope.$dxIsRoot = isRoot;

                            elm.html(ctrl.template());
                            compile(elm.contents())(scope);
                            
                            function updatePrior(value){
                              scope.$dxPrior = value;
                            }
                            scope.$watch(watchExp, updatePrior);
                        }
                    };
                    if(isRoot){
                        template = elm.html();
                        elm.html('');
                        link.pre = function(scope, elm, attr, ctrl) {
                            ctrl.template(template);
                        };
                    }
                    return link;
                }
            };
            if (isRoot) {
                directive.controller = 'dxTreeCtrl';
            }
            return directive;
        };
        factory.$inject=['$compile', '$parse'];
        return factory;
    }

    comp.directive('dxTree', $NodeDirective(true, 'dxTree','dxTree'));
    comp.directive('dxNode', $NodeDirective(false, 'dxNode', '^dxTree'));

    comp.directive('dxStartWith', $NodeDirective(true, 'dxStartWith', 'dxStartWith'));
    comp.directive('dxConnect', $NodeDirective(false, 'dxConnect', '^dxStartWith'));
}());
