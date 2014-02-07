clingwrap [![NPM version](https://badge.fury.io/js/clingwrap.png)](http://badge.fury.io/js/clingwrap) [![Build Status](https://travis-ci.org/goodeggs/clingwrap.png)](https://travis-ci.org/goodeggs/clingwrap)
==============

Command line tool for predictable npm-shrinkwrap updates.

```sh
$ npm install -g clingwrap
```

Update shrinkwrap for a single package and its dependencies:
```sh
$ clingwrap update foo-package
```

Strip hardcoded npmjs.org urls from shrinkwrap for [faster installs](https://github.com/npm/npm/issues/3581):
```sh
$ clingwrap npmbegone
```

