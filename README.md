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

So in essence the goal is to be able to do something like: 

```html
<ul dx-tree="rootNode">
  <li ng-repeat="node in $dxParent.nodes">
    {{ node.name }}
    <dx-node node="node"/>
  </li>
</ul>
```

So dx-node will reuse the block defined by dx-tree and provide the means to point to an actual child node.

Not there yet
-------------

We are not quite there yet, and to go the entire way to the above might be more trouble that it is worth. Currently this is what we can do:

```html
<dx-tree root="rootNode">
  <dx-tree-template>
    <ul>
      <li ng-repeat="node in $dxParent.nodes">
        {{node.name}}
        <dx-node node="node"></dx-node>
      </li>
    </ul>    
  </dx-tree-template>
</dx-tree>
```

That is a bit more html than Angular Tree Repeat, but we have all the abilities of ng-repeat, which means we can repeat over anything that ng-repeat allows now and in the future.

But the above syntax is what we will work on aproaching.
