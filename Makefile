install:
	npm install
start:
	npx babel-node src/bin/gendiff.js
help:
	npx babel-node src/bin/gendiff.js -h
test:
	npx babel-node src/bin/gendiff.js before.json after.json
publish:
	npm publish --dry-run
lint:
	npx eslint .