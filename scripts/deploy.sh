#!/usr/bin/env bash
# Build the static export and publish it to the gh-pages branch that
# GitHub Pages serves. Usage: npm run deploy
set -euo pipefail

cd "$(dirname "$0")/.."

BASE_PATH="${NEXT_PUBLIC_BASE_PATH:-/pluco}"
echo "Building with base path $BASE_PATH"
rm -rf .next out
NEXT_PUBLIC_BASE_PATH="$BASE_PATH" npm run build
touch out/.nojekyll

REMOTE="$(git remote get-url origin)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

git clone --depth 1 --branch gh-pages "$REMOTE" "$TMP" 2>/dev/null || {
  mkdir -p "$TMP"
  git -C "$TMP" init -q
  git -C "$TMP" checkout -q -b gh-pages
  git -C "$TMP" remote add origin "$REMOTE"
}

rsync -a --delete --exclude .git out/ "$TMP"/
git -C "$TMP" add -A
if git -C "$TMP" diff --cached --quiet; then
  echo "No changes to publish"
  exit 0
fi
git -C "$TMP" -c user.name="${GIT_AUTHOR_NAME:-pluco}" -c user.email="${GIT_AUTHOR_EMAIL:-pluco@users.noreply.github.com}" commit -q -m "deploy: $(git rev-parse --short HEAD)"
git -C "$TMP" push -q origin gh-pages
echo "Published to gh-pages"
