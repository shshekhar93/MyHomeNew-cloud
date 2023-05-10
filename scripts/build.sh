#!/bin/bash

# Configuration
WEBAPP_PATH="server/web-app"

# Cleanup
[ -d "$WEBAPP_PATH" ] && rm -rf $WEBAPP_PATH

# Build
cd client
npm run build

# Move to web-app path
mv build ../server/web-app
