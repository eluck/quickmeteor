require 'shelljs/global'
_ = require 'underscore'


quickmeteor =
  main: ->
    switch process.argv[2]?.toLowerCase()
      when 'reset' then quickmeteor.reset()
      else quickmeteor.usage()



  reset: ->
    exec 'readlink .meteor/local/db', (code, output) ->
      quickmeteor.linkTarget = output.trim() || ''
    quickmeteor.waitUntilDefined ['linkTarget'], ->
      if quickmeteor.linkTarget
        rm '-rf', '.meteor/local/db/*'
      else
        console.log('quickmeteor: .meteor/local/db is not a symbolic link')
        console.log('quickmeteor: an empty db will be created there the next time you run the project')
      exec 'meteor reset'
      if quickmeteor.linkTarget
        rm '-rf', '.meteor/local/db'
        mkdir '-p', '.meteor/local'
        ln '-sf', quickmeteor.linkTarget, '.meteor/local/db'



  usage: ->
    console.log("
       Usage: quickmeteor reset\n\n" +
      "Works like `meteor reset`, but if the Meteor project\n" +
      "has a symlink at `.meteor/local/db`, it deletes\n" +
      "all the db files in the target directory and restores\n" +
      "the symlink after `meteor reset`.\n"
    )



  waitUntilDefined: (args, callback) ->
    if _.some(args, (arg) -> typeof quickmeteor[arg] == 'undefined')
      originalArgs = arguments
      return setTimeout ->
        quickmeteor.waitUntilDefined.apply(null, originalArgs)
      , 10
    callback()




quickmeteor.main()
