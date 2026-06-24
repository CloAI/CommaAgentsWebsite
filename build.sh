#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
docs_patch="$root_dir/patches/comma-agents-docs-static-export.patch"
docs_patch_applied=false

cleanup() {
  if [[ "$docs_patch_applied" == true ]]; then
    git -C comma_agents_repo apply --reverse "$docs_patch"
  fi
}

trap cleanup EXIT

cd "$root_dir"

git submodule sync --recursive
git submodule update --init --recursive

test -f hub_repo/registry.json

npm run build:site

if ! grep -q "COMMA_DOCS_STATIC_EXPORT" comma_agents_repo/docs/next.config.mjs; then
  git -C comma_agents_repo apply "$docs_patch"
  docs_patch_applied=true
fi

bun install --cwd comma_agents_repo/docs --frozen-lockfile
COMMA_DOCS_STATIC_EXPORT=true bun run --cwd comma_agents_repo/docs build

rm -rf dist/docs dist/_next dist/api/search
mkdir -p dist/docs
cp -R comma_agents_repo/docs/out/docs/. dist/docs/
cp -R comma_agents_repo/docs/out/_next dist/_next
mkdir -p dist/api
cp -R comma_agents_repo/docs/out/api/search dist/api/search
