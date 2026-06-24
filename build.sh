#!/bin/bash
set -e

# Pull in hub_repo (Hub modules) and comma_agents_repo (docs source).
git submodule update --init --recursive

# Build the Astro site into ./dist
npx astro build

# Build the Sphinx docs from the comma_agents_repo submodule and copy the
# generated HTML into ./dist/docs so it is served under /docs.
cd ./comma_agents_repo
pip install -q poetry
poetry export --only=docs --without-hashes > requirements.txt
pip install -r requirements.txt
cd docs && make html
cd ../../

mkdir -p ./dist/docs
cp -r ./comma_agents_repo/docs/build/html/* ./dist/docs/
