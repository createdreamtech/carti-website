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
```
### Installation
```
npm install -g @createdreamtech/carti 
carti --help
```

### Add your first package repository  
```
carti repo list
# here you should see no packages
carti repo add github.com/createdreamtech/carti-examples
# now you will see a few packages
carti repo list  
```

### Install your first bundle
```
carti install hello-world-drive
```

### Initialize your first machine config
This configuration default that's generated allows you to specify what bundles are required to run a cartesi machine
```
carti machine init
```

### Add hello world drive to flash 
Here we'll add hello world drive to the flash section of the config
```
carti machine add flash hello-world-drive
```

### Let's add some new bootargs to rom 
Here we'll add hello world drive to the flash section of the config
```
carti machine add rom --resovledpath "somepath" 
```

### Let's create a Cartesi Machine Lua config file from our carti-machine-package.json
```
carti machine build
cat run-machine.lua
```
### Let's run the stored machine 
```

```
### That's it!
You've just started building machines from bundles

}

## Next Steps

- Take the Tutorial [/tutorial](/tutorial)
- Read the main concepts [/concepts](/docs#concepts)
- Deep dive into the code [github.com/createdreamtech/carti](https://github.com/createdreamtech/carti)
