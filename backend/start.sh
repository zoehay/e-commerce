#!/bin/sh

sh db-setup.sh

location1=$(type openssl)
echo "Location of program: $location1"

location2=$(type postgresql-client)
echo "Location of program: $location2"

echo "Start the node server"
node src/index.js
echo "Tried to start server"