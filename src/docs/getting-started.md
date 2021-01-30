---
title: OpenRPC Getting Started Guide | A guide through OpenRPC
---
# Getting Started

In this guide we'll go over installation and basic usage to get going.
### Requirements
```
nodejs v15.x.x or greater
# I recommend using nvm
# https://github.com/nvm-sh/nvm
# example usage: nvm use v15.0.1 
# Suggestion to run the entire tutorial install docker
```
### Installation
```
npm install -g @createdreamtech/carti 
carti --help
carti version 
```
### Add the default machine data
Here we will add the default bundles to our global store, this will allow us to create
packages from a default base, without downloading the requirements each time.
```
carti machine install -g --nobundle --nobuild \
https://raw.githubusercontent.com/createdreamtech/carti-default/main/carti-machine-package.json 
```
### Create a default machine 
Here will use the default packages to create a cartesi machine
```
mkdir carti-example
cd carti-example
carti machine init
cat carti-machine-package.json
```
### Install a cartesi machine config
Since we aren't adding new packages we can just build the machine without installing missing bundles
```
carti machine install carti-machine-package.json
```
Your directory should look like this
```
.
├── carti-machine-package.json
├── carti_build
│   └── bundles
│       ├── baenrwia5vqqvdu5chzjqq57tfo45z2txorpnmljeiuwemcibba43noqpvu
│       │   ├── carti-meta.json
│       │   └── linux-5.5.19-ctsi-2.bin
│       ├── baenrwig2hfjzzeqmozb7sws6tyxmyazvuipjp5hxamtllifsokwh73eucy
│       │   ├── carti-meta.json
│       │   └── rootfs.ext2
│       └── baenrwigwdfweve3apyvwicc2zpmzz6vdhsg62xnmzhauruw6ud4dbbafuq
│           ├── carti-meta.json
│           └── rom.bin
└── machine-config.lua
```
This outputs by default a mountable build directory that contains all the bundles related to your machine

### Create a runscript so we can test the machine
machine build - allows us to determine what the machine config looks like
internally we map to a virtual directory so we can use this in any context we want
```
cat carti-machine-package.json

return {
    ram = {
      length = 0x4000000,
      image_filename = "/opt/carti/packages/baenrwia5vqqvdu5chzjqq57tfo45z2txorpnmljeiuwemcibba43noqpvu/linux-5.5.19-ctsi-2.bin",
    },
    rom = {
      image_filename = "/opt/carti/packages/baenrwigwdfweve3apyvwicc2zpmzz6vdhsg62xnmzhauruw6ud4dbbafuq/rom.bin",
       bootargs = "console=hvc0 rootfstype=ext2 root=/dev/mtdblock0 rw quiet mtdparts=flash.0:-(root) -- ls",
    },
    flash_drive = {
      {
        start = 0x8000000000000000,
        length = 0x3c00000,
        image_filename = "/opt/carti/packages/baenrwig2hfjzzeqmozb7sws6tyxmyazvuipjp5hxamtllifsokwh73eucy/rootfs.ext2",
        shared = false,
      },
    },
  }

```
Note how image_filename points to /opt/carti/packages this can be changed using `carti machine build --dir /some/path`
```
carti machine build --norunscript
```
### Run the machine with the playground 
```
carti docker
```
Outputs some hints on how to run machine . Try the following if you have docker and the playground
```
docker run -e USER=$(id -u -n) -e UID=$(id -u)  -e GID=$(id -g) -e GROUP=$(id -g -n) \
-v$(pwd):/opt/carti -v $(pwd)/carti_build/bundles:/opt/carti/packages \
-it cartesi/playground /bin/bash

cd /opt/carti; luapp5.3 run-config.lua machine-config
```
When you run the run script it also by default creates a [stored machine](https://www.cartesi.io/en/docs/machine/host/lua/#instantiation-from-persistent-state). That machine is generated as cartesi-machine folder in the cwd. 
### Change the boot args to echo Hello World
```
carti machine add boot "echo 'Hello World'"
```
### See the changes  
```
rm -rf cartesi-machine/

docker run -e USER=$(id -u -n) -e UID=$(id -u)  -e GID=$(id -g) -e GROUP=$(id -g -n) \
-v$(pwd):/opt/carti -v $(pwd)/carti_build/bundles:/opt/carti/packages \
-it cartesi/playground /bin/bash

cd /opt/carti; luapp5.3 run-config.lua machine-config
```

### That's it!
I'd recommend checking out the tutorial to do some more intricate things,
such as create your own bundle, a bundless flashdrive, and publish a machine

## Next Steps

- Take the Tutorial [/tutorial](/tutorial)
- Read the main concepts [/concepts](/docs#concepts)
- Deep dive into the code [github.com/createdreamtech/carti](https://github.com/createdreamtech/carti)
