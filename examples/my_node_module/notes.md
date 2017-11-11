# Writing your own node module

- Write you code in a file with js extenstion
- use **module.export** or **exports** to make that available outside
- use `require(path)` to import those functions/ojbect elsewhere which look for files with .js extension on the `path`
- if you import a node module default file that node look for is index.js
