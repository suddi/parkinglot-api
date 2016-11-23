#!/bin/sh

# Install Node.js
NODE_VERSION=6.9.1
NVM_DIR=$HOME/.nvm

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
. $NVM_DIR/nvm.sh
nvm install $NODE_VERSION
nvm alias default $NODE_VERSION
npm install -g pm2
