# Disallow unnecessary constructor (no-useless-constructor)

ES2015 provides a default constructor if one is not specified. As such, it is unnecessary to provide an empty constructor or one that simply delegates into its parent class.

## Rule Details

This proposal is to provide a rule to warn against this type of redundant dead code so it can be removed. This rule is similar to `no-empty`.

The following patterns are considered problems:

```js
/*eslint no-useless-constructor: 2*/
/*eslint-env es6*/

class A {
    constructor () {
    }
}

class A extends B {
    constructor (...args) {
      super(...args);
    }
}
```

The following patterns are not considered problems:

```js
/*eslint no-useless-constructor: 2*/

class A { }

class A {
    constructor () {
        doSomething();
    }
}

class A extends B {
    constructor() {
        super('foo');
    }
}

class A extends B {
    constructor() {
        super();
        doSomething();
    }
}
```

## When Not To Use It

If you don't want to be notified about unnecessary constructors, you can safely disable this rule.
