(function() {
    var comp = angular.module('dotjem.angular.tree', []),
        SW_REGEX  = /^(\S+)(\s+as\s+(\w+))?$/;;

    comp.controller("dxTreeCtrl", [function () {
        var template;

        this.template = function (value) {
            if (angular.isDefined(value)) {
                template = value;
            } else {
                return template;
            }
        };
    }]);

    function $NodeDirective(isRoot, name, req) {
        var factory = function(compile){
            var directive = {
                restrict: 'AEC',
                require: req,
                scope: true,
                compile: function(elm, attr) {
                    var exp = attr[name] || (isRoot ? attr.root : attr.node),
                        match = exp.match(SW_REGEX),
                        watch = match[1],
                        priorAlias = match[3] || '',
                        template,
                        link = {
                            post: function (scope, elm, attr, ctrl) {
                                scope.$dxLevel = isRoot ? 0 : scope.$dxLevel + 1;
                                scope.$dxIsRoot = isRoot;

                                elm.html(ctrl.template());
                                compile(elm.contents())(scope);

                                function updatePrior(value){
                                    scope.$dxPrior = value;
                                    if(priorAlias !== ''){
                                        scope[priorAlias] = value;
                                    }
                                }
                                scope.$watch(watch, updatePrior);
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
        factory.$inject=['$compile'];
        return factory;
    }

    comp.directive('dxTree', $NodeDirective(true, 'dxTree','dxTree'));
    comp.directive('dxNode', $NodeDirective(false, 'dxNode', '^dxTree'));

    comp.directive('dxStartWith', $NodeDirective(true, 'dxStartWith', 'dxStartWith'));
    comp.directive('dxConnect', $NodeDirective(false, 'dxConnect', '^dxStartWith'));
}());
