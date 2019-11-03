install:
	npm install
help:
	npx babel-node src/bin/gendiff.js -h
test:
	npx jest
watch:
	npx jest --watch
publish:
	npm publish --dry-run
lint:
	npx eslint .
build:
	rm -rf dist
	npm run build