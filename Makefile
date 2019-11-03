install:
	npm install
start:
	npx babel-node src/bin/gendiff.js
help:
	npx babel-node src/bin/gendiff.js -h
test:
	npx jest
publish:
	npm publish --dry-run
lint:
	npx eslint .
build:
	rm -rf dist
	npm run build