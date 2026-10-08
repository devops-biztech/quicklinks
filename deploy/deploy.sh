#!/usr/bin/env bash
# Checks content, then copies the site to the web server.
# Usage: deploy/deploy.sh user@server
set -euo pipefail

TARGET="${1:?Usage: deploy/deploy.sh user@server}"
DEST="/var/www/quicklinks/"
cd "$(dirname "$0")/.."

node scripts/check-content.mjs

rsync -avz --delete \
  --exclude='files/README.md' \
  --include='index.html' \
  --include='assets/***' \
  --include='data/***' \
  --include='files/***' \
  --exclude='*' \
  ./ "$TARGET:$DEST"

echo "✓ Deployed to $TARGET:$DEST"
