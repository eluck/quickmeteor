# Quickmeteor

Quickmeteor is a tool for better handling of Meteor projects placed in a RAM drive. Read about it at [solidmeteor.com](http://www.solidmeteor.com/fasten-your-seatbelt-were-going-to-speed-up-a-meteor-gear-1-the-linux-speedway/).


Quickmeteor provides the command `quickmeteor`, which can be used to reset Meteor projects configured in the following way:

1. A project resides in a RAM drive
2. Its mongo database resides outside of the RAM drive and is symlinked by `.meteor/local/db`

``` sh
# To reset the project use this command instead of 'meteor reset'
$ quickmeteor reset
```

## Installing Quickmeteor

Quickmeteor can be installed via [npm](https://npmjs.org/).

``` sh
$ npm install -g quickmeteor
```

### NOTE:
If your system requires root access to install global npm packages, make sure you use the `-H` flag:

``` sh
$ sudo -H npm install -g quickmeteor
```

### Supported systems

- This software uses a Linux-specific command: `readlink`, so that it shouldn't work properly under a different OS.


## Usage

### `quickmeteor reset`

Works like `meteor reset`, but if the Meteor project has a symlink at `.meteor/local/db`, it deletes all the db files in the target directory and restores the symlink after `meteor reset.