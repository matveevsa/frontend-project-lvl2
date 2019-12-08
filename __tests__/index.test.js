import fs from 'fs';
import render from '../src/formatters/index';
import generateAst from '../src/utils/generateAst';
import parser from '../src/utils/parsers';

const tree = 'tree';
const plain = 'plain';
const json = 'json';

const afterJson = parser(`${__dirname}/../__fixtures__/after.json`);
const beforeJson = parser(`${__dirname}/../__fixtures__/before.json`);

const afterYml = parser(`${__dirname}/../__fixtures__/after.yaml`);
const beforeYml = parser(`${__dirname}/../__fixtures__/before.yaml`);

const afterIni = parser(`${__dirname}/../__fixtures__/after.ini`);
const beforeIni = parser(`${__dirname}/../__fixtures__/before.ini`);

const resultTree = fs.readFileSync(`${__dirname}/../__fixtures__/treeTest.txt`, 'utf-8');
const resultPlain = fs.readFileSync(`${__dirname}/../__fixtures__/plainTest.txt`, 'utf-8');
const resultJson = fs.readFileSync(`${__dirname}/../__fixtures__/jsonTest.txt`, 'utf-8');
const resultJsonIni = fs.readFileSync(`${__dirname}/../__fixtures__/jsonTestIni.txt`, 'utf-8');

const astFromJson = generateAst(beforeJson, afterJson);
const astFromYml = generateAst(beforeYml, afterYml);
const astFromIni = generateAst(beforeIni, afterIni);

test('Config JSON test tree format', () => {
  expect(render(astFromJson, tree)).toEqual(resultTree);
});

test('Config YAML test tree format', () => {
  expect(render(astFromYml, tree)).toEqual(resultTree);
});

test('Config INI test tree format', () => {
  expect(render(astFromIni, tree)).toEqual(resultTree);
});

test('Config JSON test Plain format', () => {
  expect(render(astFromJson, plain)).toEqual(resultPlain);
});

test('Config YAML test Plain format', () => {
  expect(render(astFromYml, plain)).toEqual(resultPlain);
});

test('Config INI test Plain format', () => {
  expect(render(astFromIni, plain)).toEqual(resultPlain);
});

test('Config JSON test JSON format', () => {
  expect(render(astFromJson, json)).toEqual(resultJson);
});

test('Config YAML test JSON format', () => {
  expect(render(astFromYml, json)).toEqual(resultJson);
});

test('Config INI test JSON format', () => {
  expect(render(astFromIni, json)).toEqual(resultJsonIni);
});
