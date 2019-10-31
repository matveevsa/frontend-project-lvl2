install:
	npm install
start:
	npx babel-node src/bin/index.js
publish:
	npm publish --dry-run
lint:
	npx eslint .