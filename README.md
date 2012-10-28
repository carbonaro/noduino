## About
Welcome to this custom Noduino fork based on the awesome Noduino project! 

Extra features:
* support of the LCD4884 shield
* tweaked to be run on Raspberry Pi board

All information is available at [http://semu.github.com/noduino/](http://semu.github.com/noduino/)

## Install

node-gyp might need to be installed manually before installing all dependencies. In case, check [https://github.com/voodootikigod/node-serialport/issues/81](https://github.com/voodootikigod/node-serialport/issues/81)

And to build the bindings manually, check [https://github.com/voodootikigod/node-serialport/issues/79](https://github.com/voodootikigod/node-serialport/issues/79). Might have to do something like:

    npm install serialport
    cd serialport
    node_modules/node-gyp/bin/node-gyp.js configure binding.gyp
    node_modules/node-gyp/bin/node-gyp.js build
    node_modules/node-gyp/bin/node-gyp.js install
