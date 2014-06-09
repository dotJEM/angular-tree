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

    function $NodeDirective(isRoot) {
        var factory = function(compile, parse){
            var directive = {
                restrict: 'AEC',
                require: (isRoot ? 'dxTree' : '^dxTree'),
                scope: true,
                compile: function(elm) {
                    var link = {
                        post: function (scope, elm, attr, ctrl) {
                            scope.$dxLevel = isRoot ? 0 : scope.$dxLevel + 1;
                            scope.$dxIsRoot = isRoot;
                            scope.$dxParent = isRoot
                                ? parse(attr.dxTree || attr.root)(scope)
                                : parse(attr.dxNode || attr.node)(scope);

                            elm.html(ctrl.template());
                            compile(elm.contents())(scope);
                        }
                    };
                    if(isRoot){
                        var template = elm.html();
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

    comp.directive('dxTree', $NodeDirective(true));
    comp.directive('dxNode', $NodeDirective(false));
}());