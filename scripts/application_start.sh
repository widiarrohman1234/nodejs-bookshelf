#!/bin/bash

DIR="~/express-app"
cd $DIR

export NVM_DIR="~/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

npm install

node index.js > app.out.log 2> app.err.log < /dev/null &