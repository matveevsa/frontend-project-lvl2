import fs from 'fs';
import genDiff from '../src';
import parser from '../src/utils/parsers';

const tree = 'tree';
const plain = 'plain';
const afterJson = parser(`${__dirname}/../__fixtures__/after.json`);
const beforeJson = parser(`${__dirname}/../__fixtures__/before.json`);
const afterYml = parser(`${__dirname}/../__fixtures__/after.yaml`);
const beforeYml = parser(`${__dirname}/../__fixtures__/before.yaml`);
const afterIni = parser(`${__dirname}/../__fixtures__/after.ini`);
const beforeIni = parser(`${__dirname}/../__fixtures__/before.ini`);

test('Config JSON test tree format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/treeTest.txt`, 'utf-8');

  expect(genDiff(beforeJson, afterJson, tree)).toEqual(result);
});

test('Config YAML test tree format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/treeTest.txt`, 'utf-8');

  expect(genDiff(beforeYml, afterYml, tree)).toEqual(result);
});

test('Config INI test tree format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/treeTest.txt`, 'utf-8');

  expect(genDiff(beforeIni, afterIni, tree)).toEqual(result);
});

test('Config JSON test Plain format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/plainTest.txt`, 'utf-8');

  expect(genDiff(beforeJson, afterJson, plain)).toEqual(result);
});

test('Config YAML test Plain format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/plainTest.txt`, 'utf-8');

  expect(genDiff(beforeYml, afterYml, plain)).toEqual(result);
});

test('Config INI test Plain format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/plainTest.txt`, 'utf-8');

  expect(genDiff(beforeIni, afterIni, plain)).toEqual(result);
});
