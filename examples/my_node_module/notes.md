# Writing your own node module

- Write you code in a file with js extenstion
- use **module.export** or **exports** to make that available outside
- use `require(path)` to import those functions/ojbect elsewhere which look for files with .js extension on the `path`
- if you import a node module default file that node look for is index.js
- `module.export` returns a empty object as default. We can override it and return any other object, function, constructor function, or attach a property to same default empty object.
- require function() maintains a cache. If you return a object through module.export and call the require() twice then same object is returned. Require checks the cache before creating new object.

# Exports v/s module.exports

- `exports` is a shorthand for `module.exports`. But there is one big difference. You cannot reassign the `exports` to point to some other object or function as it will break the ref to `module.exports'. With `exports' all you can do is modify the same object, i.e. add or remove the properties. But you can make `module.exports` point to anything you want. Belw code would make it clear.

- Your code that you write to be exported as a module is wrapped by this function.
```javascript
    function(exports, require, module, __filename, __dirname) {
        // your code -------------------
        var greet = function() {
            console.log('hello');
        }
        module.exports = greet;
        // you code ends here -----------
    }
    // module.exports and export are references to same same property on module object
    fn(module.exports, require, module, __filename, __dirname);
```

> As long as you exports and module.exports keep pointing to same object there won't be any issue.