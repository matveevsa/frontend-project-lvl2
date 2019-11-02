install:
	npm install
start:
	npx babel-node src/bin/gendiff.js
help:
	npx babel-node src/bin/gendiff.js -h
publish:
	npm publish --dry-run
lint:
	npx eslint .