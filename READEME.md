forerunner-standalone
===

A simple utility script to run forerunner jobs without a worker pool. Useful for performing one-off tasks or testing worker scripts.

```
npm install forerunner-standalone -g
```

example
---

```
forerunner-standalone -h

  Usage: forerunner-standalone [options]

  Options:

    -h, --help                     output usage information
    -V, --version                  output the version number
    -i, --input <file>             Input jobs (json format)
    -w, --worker <file>            Worker script
    -o, --output [file]            Output json [standalone.json]
    -n, --numThreads [numThreads]  Number of worker threads [1]

# in the forerunner-standalone dir
forerunner-standalone -i ./example/input.json -w ./example/worker.js -o output.json -n 4
```


LICENSE
---

<MIT>

Copyright (c) 2014 Kiernan Tim McGowan (dropdownmenu)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

