

#### A lookahead 
- ##### Overview
- ##### Concepts
- ##### Bundles
- ##### Bundles.json Listing
- ##### Carti Machine Package

# Overview 
Carti: A decentralized package manager for Cartesi Machines. What does this mean? Carti makes it possible for developers to define
cartesi machine drives, boot specification, and add descriptive metadata to the components. This enables developers to share drives,
and entire machines in json. The decentralized bit is that you can store, and share these components anywhere, there is no central repository.
This means that you the developer are ultimately in control of how you want to serve your machine.
## Concepts
There are 3 main concepts that make up Carti. There are `bundles`, `carti-machine-package.json`, `bundles.json`. In this section we'll go over them and  
see how they relate.

Bundles are everything in Carti. Bundles describe cartesi rom, ram, and flash drives. [Bundles](https://github.com/createdreamtech/carti-core/blob/main/src/bundle-config-schema.json#L20) look like.
```
{
    bundleType: "flashdrive",
    name: "calculator-output",
    fileName: "output.raw",
    id: "baenrwia5pfe7b6dvoys33k7umgsbbixgpympwcfjpqowpaye3bghmrs24m",
    version: "0.0.1",
    uri: "https://github.com/createdreamtech/carti-sample/blob/feat/complete/output.raw"
}
```
- **bundleType** - Is one of rom, ram or flash drive and sets the type of asset you're describing
- **name** - Is whatever you want to logically call the drive, so when people are looking for it they'll type this in
- **fileName** - this field is again whatever you want the asset to be called when people refer to it, it's useful in context of the machine, say an ext2 drive might be *.ext2
- **id** - this field is a content id. These ids use a [multiformat](https://github.com/multiformats/multiformats) [IPLD](https://docs.ipld.io/) content identifier, so there's a self describing encoding that describes the type of hash used to compute the identifier. Generally not self computed
- **version** - this is version metadata field it's not strict yet, as it's not enforced we recommend x.x.x prefix where x is integer based and semantic compatible
- **uri** - Where to get the asset, so right now uri is http based, with hooks for supporting s3. In future there will be plugins to support ipfs/storj/swarm ... directly vs. through a gateway.
##### Bundles Usage
Bundles are created via the `carti bundle add --help` command. When they are created or installed via `carti install` or `carti get` the are located in either the 
global space `~/.carti/carti_bundles` or within the current working directory `./carti_bundles`. The bundles are installed in a id based fashion to disk. They are prefixed, via id and look like.
```
├── baenrwia5vqqvdu5chzjqq57tfo45z2txorpnmljeiuwemcibba43noqpvu
│   ├── carti-meta.json
│   └── linux-5.5.19-ctsi-2.bin
├── baenrwig2hfjzzeqmozb7sws6tyxmyazvuipjp5hxamtllifsokwh73eucy
│   ├── carti-meta.json
│   └── rootfs.ext2
└── baenrwigwdfweve3apyvwicc2zpmzz6vdhsg62xnmzhauruw6ud4dbbafuq
    ├── carti-meta.json
    └── rom.bin
```
The carti-meta.json is just the bundle data stored next to the asset, to enable faster indexing. In future this may change.
### Bundles.json 
Bundles.json ([schema](https://github.com/createdreamtech/carti-core/blob/main/src/bundle-config-schema.json)) is the mechanism that makes sharing bundles possible. Whenever you publish a bundle you're adding that bundle to bundles.json. What this does is allow you 
to control when and how you release bundles that you're developing. Additionally, you control the listing, so if you want to unpublish something or keep multiple versions 
around, or keep an experimental development branch going you can simply commit this bundles.json to a git repository.
#### Bundles.json looks like
```
{
  "bundles": [
    {
      "bundleType": "flashdrive",
      "name": "calculator-input",
      "fileName": "input.raw",
      "id": "baenrwigmw66wmp2vwjejrmmlw5sbvwpsx3zjtnd7rep4oo6wd3glahtfl4",
      "version": "0.0.1",
      "uri": "https://github.com/createdreamtech/carti-sample/blob/feat/complete/input.raw"
    },
    {
      "bundleType": "flashdrive",
      "name": "calculator-output",
      "fileName": "output.raw",
      "id": "baenrwia5pfe7b6dvoys33k7umgsbbixgpympwcfjpqowpaye3bghmrs24m",
      "version": "0.0.1",
      "uri": "https://github.com/createdreamtech/carti-sample/blob/feat/complete/output.raw"
    }
  ]
}
```
#### How bundles.json works
Well any time you're calling `carti bundle publish` you're taking a locally installed bundle and either directly publishing it to s3 using the storage, disk (in development mode) or uploading your bundle raw asset to a predetermined uri endpoint that users will fetch the data from ( this could even be git). When this happens
you then get an entry added to the listing. It's up to you when you make this known or how you make this none to your users. 
- There is a current restriction on bundles.json, so because we want users to have some insight into whose publishing what, there is a req. that bundles.json be in git, be that github,gitlab, company home spun git, but this is the mechanism of package discover. It's good enough for go lang so I think it works well in this context. In future this may change and open up. Right now github is supported but gitlab etc... is coming soon.
### Carti Machine Package 
Carti machine package is what we've been working towards. A portable description of a cartesi machine that allows you to describe dependencies that can be automatically resolved and shared with other developers. Simply put it allows you to describe dependencies, and how to resolve them.  Additionally, it describes the operation of a machine. It is a [superset](https://github.com/createdreamtech/carti-core/blob/main/src/machine-config-package-schema.json) of [Cartesi Machine Config](https://www.cartesi.io/en/docs/machine/host/lua/#instantiation-by-configuration). In fact we use this to produce a cartesi machine config lua file to be used in the playground and other cartesi ecosystem. 
#### How cartesi machine package works
All commands pretaining to the machine are prefixed by `carti machine` . Carti machine relies on bundle data to add and refer to drives and boot configuration. Drives are added to machine config via `carti machine add`. This mechanism looks at global and local bundles to allow you to select what bundle you'd like to refer to in the configuration. All bundles are refered to via content id. A machine config looks like this.
```
{
  "assets": [
    {
      "cid": "baenrwigwdfweve3apyvwicc2zpmzz6vdhsg62xnmzhauruw6ud4dbbafuq",
      "name": "default-rom",
      "fileName": "rom.bin"
    },
    {
      "cid": "baenrwia5vqqvdu5chzjqq57tfo45z2txorpnmljeiuwemcibba43noqpvu",
      "name": "default-ram",
      "fileName": "linux-5.5.19-ctsi-2.bin"
    },
    {
      "cid": "baenrwig2hfjzzeqmozb7sws6tyxmyazvuipjp5hxamtllifsokwh73eucy",
      "name": "default-root",
      "fileName": "rootfs.ext2"
    }
  ],
  "machineConfig": {
    "flash_drive": [
      {
        "cid": "baenrwig2hfjzzeqmozb7sws6tyxmyazvuipjp5hxamtllifsokwh73eucy",
        "start": "0x8000000000000000",
        "label": "root",
        "length": "0x3c00000",
        "shared": false
      }
    ],
    "ram": {
      "cid": "baenrwia5vqqvdu5chzjqq57tfo45z2txorpnmljeiuwemcibba43noqpvu",
      "length": "0x4000000"
    },
    "rom": {
      "cid": "baenrwigwdfweve3apyvwicc2zpmzz6vdhsg62xnmzhauruw6ud4dbbafuq"
    },
    "boot": {
      "args": "ls"
    }
  },
  "version": "0.0.0-development",
  "repos": [
    "https://github.com/createdreamtech/carti-default"
  ]
}
```
- **assets** - assets are generated linkages between the id's specified in the machineConfig sections and the data to retrieve providing annotations for that data.
- **machineConfig** - this section represents the superset of machine config it allows you to fully specify all the items from cartesi machine configuration. Here's the [spec](https://github.com/createdreamtech/carti-core/blob/main/src/machine-config-package-schema.json)
- - **boot** - this allows you to specify bootargs for your machine so using this you can reference flash drives etc... see the [tutorial](/tutorial) for how this works in practice. `carti machine add boot` allows you to change set config. Note here `boot` section pre computes a prefix that can be overriden with the prefix field. However, this prefix structures a preamble to the boot that orders the flash drives. This is automatically handled but can be overriden by setting prefix. 
- - **rom** - this section allows you to specify the drive you want for rom 
- - **ram** - this section allows you to set the ram you want, it has a default length that can be altered 
- - **flash_drive** - this section allows you to set the flash drives. Flash drives have a field called a label, unlike the lua config we can must set a label for the drives. This allows us to reference the drive via label in the boot args section. Drives can also be added and removed via label, Additionally drives don't need to refer to a specific bundle, they can be bundleless which is useful in the context of output drives. `carti machine add flash`
- **version** - this is just version metadata for hte package if you have multiple of these floating around over time it might be useful metadata
- **repos** - this is an optional field, it is a simple annotation that might help users fight the assets you refer to in the  config. The repo is just a pointer to a bundle listing ( which atm is restricted to git). So when a user installs this package, if they don't have a listing already that contains the cid, they can resolve that using the repos here. This is added internally to an index which allows them to resolve where to retrieve the bundles.

## What's next 
Contribute to the project, even filing an issue is a great contribution, also let us know what missing we'd love to patch it up!

## What's missing that we're working on adding?
- We could use a break down of all the permutations of commands
- A nice carchitecture drive in
- A developer overview of the components of carti-core
- An explanation of the restrictions around config
- An explanation of how to apply json-schema restrictions to config with vs code
- More tutorials that show how to add all the drives and load them with Descartes
- Are we still missing things ? Just create a github issue we'll add them to our docs!

