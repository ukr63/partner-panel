#!/bin/bash

echo "Starting with NODE_ENV=${NODE_ENV}"

cd /app

echo "Start npm install"
npm install --force
if [ "$NODE_ENV" == "production" ]; then
    echo "Running in production mode"

    npm run build
    service nginx start
    npm start
else
    echo "Running in development mode"

    npm run dev
fi