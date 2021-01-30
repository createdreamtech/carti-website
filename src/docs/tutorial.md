## Summary
In this tutorial we will walk you through building a cartesi machine that you publish from scratch. We'll also show what it looks for a user
to download the machine and run it. This mirrors a bit [https://www.cartesi.io/en/docs/tutorials/calculator/cartesi-machine/](https://www.cartesi.io/en/docs/tutorials/calculator/cartesi-machine/). 
For full details on the why and interworkings of Cartesi the tutorial linked above, is immensely helpful. This will focus on using Carti.
## Requirements 
```
#Carti
npm install -g @createdreamtech/carti
# Probably docker if you want to run the end results
```
## Create a project repo
```
git clone git@github.com:createdreamtech/carti-sample.git
cd carti-sample
```
## Setup defaults if you haven't already
```
carti machine install --global https://raw.githubusercontent.com/createdreamtech/carti-default/main/carti-machine-package.json --nobundle --nobuild
carti machine init
cat carti-machine-package.json
```
## Create some custom drives  
Here we will be creating a custom flash drive, that will house a calculation
```
# Pop into docker so we produce these under a consistent environment
docker run -e USER=$(id -u -n) -e UID=$(id -u) -e GID=$(id -g) -e GROUP=$(id -g -n) \
-v $(pwd):/opt/cartesi -it cartesi/playground /bin/bash
# Our future input flash drive
echo "2^71 + 36^12" > input.raw
# size it up to be on a 4K size interval as required by the cartesi machines
truncate -s 4K input.raw
truncate -s 4K output.raw
```
## Let's start adding drives to our machine
The first thing we need to do once we have the drive is bundle it so we can use it as well as other people 
```
carti bundle -t flashdrive -n calculator-input -v 0.0.1 -d "calculator input" ./input.raw
# outputs bundled: calculator-input as baenrwigmw66wmp2vwjejrmmlw5sbvwpsx3zjtnd7rep4oo6wd3glahtfl4
carti bundle -t flashdrive -n calculator-output -v 0.0.1 -d "calculator output" ./output.raw
# outputs bundled: calculator-output as baenrwia5pfe7b6dvoys33k7umgsbbixgpympwcfjpqowpaye3bghmrs24m
```
The result should look like
```
.
├── LICENSE
├── README.md
├── carti-machine-package.json
├── carti_bundles
│   ├── baenrwia5pfe7b6dvoys33k7umgsbbixgpympwcfjpqowpaye3bghmrs24m
│   │   ├── carti-meta.json
│   │   └── output.raw
│   └── baenrwigmw66wmp2vwjejrmmlw5sbvwpsx3zjtnd7rep4oo6wd3glahtfl4
│       ├── carti-meta.json
│       └── input.raw
├── input.raw
└── output.raw
```
We created a carti_bundles/ directory this functions as a local store for any data that you've bundle up
The recommendation is that carti_bundles/ not be uploaded to git.
```
echo "carti_bundles/" >> .gitignore
```
What do we have installed?
```
carti list
```
We have the following bundles installed:
```
@flashdrive/calculator-input:0.0.1:baenrwigmw66wmp2vwjejrmmlw5sbvwpsx3zjtnd7rep4oo6wd3glahtfl4:local
@flashdrive/calculator-output:0.0.1:baenrwia5pfe7b6dvoys33k7umgsbbixgpympwcfjpqowpaye3bghmrs24m:local
@rom/default-rom:v0.4.0:baenrwigwdfweve3apyvwicc2zpmzz6vdhsg62xnmzhauruw6ud4dbbafuq:global
@ram/default-ram:v0.7.0:baenrwia5vqqvdu5chzjqq57tfo45z2txorpnmljeiuwemcibba43noqpvu:global
@flash/default-root:v0.6.0:baenrwig2hfjzzeqmozb7sws6tyxmyazvuipjp5hxamtllifsokwh73eucy:global
```
### Let's make these bundles accessible
There are many ways to make a bundle accessible, disk, s3, or other
We're going to use other, because it's just a flexible way for us to link data. so let's use github
```
carti publish uri calculator-input https://github.com/createdreamtech/carti-sample/blob/feat/complete/input.raw
carti publish uri calculator-output https://github.com/createdreamtech/carti-sample/blob/feat/complete/output.raw
cat bundles.json
```
### What's package listing file aka. bundles.json ...  
So bundles.json provides a way for listing drives and assets that you know about, they can be local to you or not, they are simply
bundle metadata that allows a user to download the assets associated with the content-addressed ids.
Currently we restrict package listing to git based endpoints, so users can add the listing files and discover packages. Think
npm regsitry but distributed across participants.
```
git add bundles.json 
git commit -m "feat: add listing file to public repo"
git push origin main
```
### Now let's add these drives to a machine!
```
cat carti-machine-package.json
```
You should see this in flash drive entry
```
    "flash_drive": [
      {
        "cid": "baenrwig2hfjzzeqmozb7sws6tyxmyazvuipjp5hxamtllifsokwh73eucy",
        "start": "0x8000000000000000",
        "label": "root",
        "length": "0x3c00000",
        "shared": false
      },
      {
        "cid": "baenrwigmw66wmp2vwjejrmmlw5sbvwpsx3zjtnd7rep4oo6wd3glahtfl4",
        "start": "0x9000000000000000",
        "label": "input",
        "length": "0x1000",
        "shared": false
      },
      {
        "cid": "baenrwia5pfe7b6dvoys33k7umgsbbixgpympwcfjpqowpaye3bghmrs24m",
        "start": "0xa000000000000000",
        "label": "output",
        "length": "0x1000",
        "shared": false
      }
    ],
```
### It's a complete spec: carti-machine-package.json
The machine package.json is a superset of [features](https://github.com/createdreamtech/carti-core/blob/main/src/machine-config-package-schema.json) supported by a lua [cartesi machine configuration](https://www.cartesi.io/en/docs/machine/host/lua/)

When we add drives we are creating a shareable superset of a lua config for running machines. 
cid's link back to bundles, which are assumed to be stored either locally or globally in carti_bundles/.

### Let's create a build dir of all the deps by installing the machine we have so far
```
carti machine install ./carti-machine-package.json
```
With install we have created a carti_build/ directory that will serve as mountable or clear demarcation of bundles/drives that are required to run the machine
### Let's add a boot command
```
carti machine add boot "dd status=none if=\$(flashdrive input) | lua -e 'print((string.unpack(\\\"z\\\", io.read(\\\"a\\\"))))' | bc | dd status=none of=\$(flashdrive output)"
```
### Build a new cartesi machine config w/ the updates 
The following will generate a cartesi machine configuration file as well as easy to use runscript that will allow you to run and store the machine
```
carti machine build --runscript
cat machine-config.lua
```
### Run the machine
```
docker run -e USER=$(id -u -n) -e UID=$(id -u) -e GID=$(id -g) -e GROUP=$(id -g -n) \
-v $(pwd):/opt/cartesi -it cartesi/playground /bin/bash
cd /opt/carti; luapp5.3 run-config.lua machine-config
```
### Check the results
Because our configuration mounts the carti_build directory as the directory for all our drives and stuff, we can see the results 
of the data output to our output drive via
```
cat carti_build/bundles/baenrwia5pfe7b6dvoys33k7umgsbbixgpympwcfjpqowpaye3bghmrs24m/output.raw
```
### Let's prep for release 
Here we list all the external repo dependencies we might have with `machine repo list` then we just simply add our 
own repo to the list and call `carti machine repo add` to make an entry
```
carti machine repo add $(echo "https://github.com/createdreamtech/carti-sample/tree/feat/complete,$(carti machine repo list)"
```
### If we're happy and we think it's good let's release the machine and bundles info
```
echo "carti_build" >> .gitignore
echo "machine-config.lua" >> .gitignore
echo "run-config.lua" >> .gitignore
git add bundles.json 
git add carti-machine-package.json 
git push origin main 
```

### Let's try and do a one shot install and run 
```
cd ..
mkdir test-project
cd test-project
carti machine install https://github.com/createdreamtech/carti-sample/tree/feat/complete
```

### That about wraps it up
The next step would to see about the larger concepts and details.
[Concepts](/docs)
