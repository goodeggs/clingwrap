clingwrap = require '..'

describe 'clingwrap', ->
  {shrinkwrap} = {}
  beforeEach ->
    shrinkwrap = {
      "name": "myapp",
      "version": "0.0.0",
      "dependencies": {
        "async": {
          "version": "0.2.9",
          "from": "https://registry.npmjs.org/async/-/async-0.2.9.tgz",
          "resolved": "https://registry.npmjs.org/async/-/async-0.2.9.tgz"
        },
        "octocat": {
          "version": "22.22.22",
          "from": "git+https://github.com/octocat/cookie.git#001643ca951583caa58a9134a245080c62b6f06e"
          "resolved": "git+https://github.com/octocat/cookie.git#001643ca951583caa58a9134a245080c62b6f06e"
        }
      }
    }

  describe 'npmbegone', ->
    beforeEach ->
      clingwrap.npmbegone shrinkwrap

    it 'removes "from" and "resolved" keys pointing to registry.npmjs.org', ->
      shrinkwrap.dependencies.async.should.not.have.property 'resolved'
      shrinkwrap.dependencies.async.should.not.have.property 'from'

    it 'preserves "from" and "resolved" keys pointing elsewhere', ->
      shrinkwrap.dependencies.octocat.resolved.should.match /github/
      shrinkwrap.dependencies.octocat.from.should.match /github/

