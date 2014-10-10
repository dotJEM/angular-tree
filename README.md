dotJEM Angular Tree
===================

Small set of directives that helps to render templates based on tree's
In reality calling it a tree-view is a bit missguided as rendering data like this is so incredible easy in angular.

In essense, all we really need to do is something like:

```html
    <script type="text/ng-template" id="node_template.html">
        {{node.label}} 
        <ul><li ng-repeat="node in node.nodes" ng-include = "'node_template.html'" ></li></ul>
    </script>
    <div ng-include="'node_template.html'"></div>
```

So in essense, we don't really need any custom directives or that sort...

But this doesn't entirely feel right... Why should we have to pass things through the template cache to achieve this, why can't we just provide the template directly in our html in a more natural way?...

Angular Tree Repeat
-------------------

https://github.com/stackfull/angular-tree-repeat

Angular Tree Repeat is another directive that solves this problem in a nice way.

```html
<ul>
  <li sf-treepeat="node in children of treeData">
    {{node.name}}
    <ul>
      <li sf-treecurse></li>
    </ul>
  </li>
</ul>
```

But overall I felt the implementation could be done even more simple while also gaining all the functions of ng-repeat by reusing it as is.

Iverting the idea
-----------------

So... Rather than focusing on the "repeater" part of it which becomes really complex really fast if we wish to keep up with the ng-repeat directive, dotJEM Angular Tree focuses only on the recursive delegation and instead leaves ng-repeat to do it's job on the nodes.

So in essence we can do:

```html
<ul dx-tree="rootNode">
  <li ng-repeat="node in $dxParent.nodes">
    {{ node.name }}
    <ul dx-node="node"/>
  </li>
</ul>
```

So dx-node will reuse the block defined by dx-tree and provide the means to point to an actual child node.

An alternative syntax is given that might make it more obvious what we are doing:

```html
<ul dx-start-with="rootNode">
  <li ng-repeat="node in $dxPrior.nodes">
    {{ node.name }}
    <ul dx-connect="node"/>
  </li>
</ul>
```

`dx-start-with` and `dx-connect` provides the variables: 

 - `$dxPrior`: (`$dxParent`) the object passed to `dx-start-with` or `dx-connect`.
 - `$dxIsRoot`: true if this is the root level, otherwise false.
 - `$dxLevel`: the level of recursion we are at starting at 0.
 
`$dxPrior` can be aliased using the the same syntax known from controller as, as such you can name it more appropriately to the needs.

```html
<ul dx-start-with="rootNode as prior">
  <li ng-repeat="node in prior.nodes">
    {{ node.name }}
    <ul dx-connect="node"/>
  </li>
</ul>
```

IMPORTANT!:

The template is the inner html of the dx-tree directive, this is important to know so that you get it right when defining the dx-node. as such if you put the dx-tree directly on the ul, the dx-node must also be an ul (or ol).

## Install

Install with `bower`:

```shell
bower install dotjem-angular-tree
```

Add a `<script>` to your `index.html`:

```html
<script src="/bower_components/dotjem-angular-tree/dotjem-angular-tree.js"></script>
```

And add `dotjem.angular.tree` as a dependency for your app:

```javascript
angular.module('myApp', ['dotjem.angular.tree']);
```

