#!/bin/sh
echo "Ready!! to Deploy"
# Start Nginx
nginx -g "daemon off;" &
echo "Angular start"
ng serve &

exec sleep infinity