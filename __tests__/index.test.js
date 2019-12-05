import fs from 'fs';
import genDiff from '../src';
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

test('Config JSON test tree format', () => {
  expect(genDiff(beforeJson, afterJson, tree)).toEqual(resultTree);
});

test('Config YAML test tree format', () => {
  expect(genDiff(beforeYml, afterYml, tree)).toEqual(resultTree);
});

test('Config INI test tree format', () => {
  expect(genDiff(beforeIni, afterIni, tree)).toEqual(resultTree);
});

test('Config JSON test Plain format', () => {
  expect(genDiff(beforeJson, afterJson, plain)).toEqual(resultPlain);
});

test('Config YAML test Plain format', () => {
  expect(genDiff(beforeYml, afterYml, plain)).toEqual(resultPlain);
});

test('Config INI test Plain format', () => {
  expect(genDiff(beforeIni, afterIni, plain)).toEqual(resultPlain);
});

test('Config JSON test JSON format', () => {
  expect(genDiff(beforeJson, afterJson, json)).toEqual(resultJson);
});

test('Config YAML test JSON format', () => {
  expect(genDiff(beforeYml, afterYml, json)).toEqual(resultJson);
});

test('Config INI test JSON format', () => {
  expect(genDiff(beforeIni, afterIni, json)).toEqual(resultJsonIni);
});