clingwrap [![NPM version](https://badge.fury.io/js/clingwrap.png)](http://badge.fury.io/js/clingwrap) [![Build Status](https://travis-ci.org/goodeggs/clingwrap.png)](https://travis-ci.org/goodeggs/clingwrap)
==============

Command line tool for predictable npm-shrinkwrap updates.  Tired of [unexpected changes to npm-shrinkwrap](https://github.com/npm/npm/issues/3581) when you just want to update a package?  Just `clingwrap foo-package`.

```sh
$ npm install -g clingwrap
```

```

  Usage: clingwrap <package ...>

  Commands:

    * <package>            Update shrinkwrapped tree for named package(s) to match local install
    npmbegone              Strip hardcoded npmjs.org urls from shrinkwrap for faster installs

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

Examples:
--------

Add a new package:
``` sh
$ npm install underscore@1.5.0 --save
$ clingwrap underscore
> underscore 1.5.0
```

Update an exisiting package:
``` sh
 $ npm install underscore@1.6.0 --save
 $ clingwrap underscore
 > underscore 1.5.0 → 1.6.0
```

Remove a package:
``` sh
 $ npm uninstall underscore --save
 $ clingwrap underscore
 > underscore removed
```

## License

The MIT License (MIT)

Copyright (c) 2014 Good Eggs Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
