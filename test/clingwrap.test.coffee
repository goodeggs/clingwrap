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
        },
        "npm": {
          "version": "2.13.5",
          "from": "npm@2.13.5",
          "resolved": "https://registry.npmjs.org/npm/-/npm-2.13.5.tgz"
        }
      }
    }

  describe 'npmbegone', ->
    beforeEach ->
      clingwrap.npmbegone shrinkwrap

    it 'removes "resolved" key pointing to registry.npmjs.org', ->
      shrinkwrap.dependencies.async.should.not.have.property 'resolved'
      shrinkwrap.dependencies.octocat.should.have.property 'resolved'
      shrinkwrap.dependencies.octocat.resolved.should.match /github/
      shrinkwrap.dependencies.npm.should.not.have.property 'resolved'

    it 'removes "from"', ->
      shrinkwrap.dependencies.async.should.not.have.property 'from'
      shrinkwrap.dependencies.octocat.should.not.have.property 'from'
      shrinkwrap.dependencies.npm.should.not.have.property 'from'

    it 'preserves "version" key with whatever value it has', ->
      shrinkwrap.dependencies.async.should.have.property 'version'
      shrinkwrap.dependencies.octocat.should.have.property 'version'
      shrinkwrap.dependencies.npm.should.have.property 'version'
