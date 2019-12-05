import fs from 'fs';
import genDiff from '../src';
import parser from '../src/utils/parsers';

const tree = 'tree';
const plain = 'plain';

test('Config JSON test tree format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/treeTest.txt`, 'utf-8');
  const after = parser(`${__dirname}/../__fixtures__/after.json`);
  const before = parser(`${__dirname}/../__fixtures__/before.json`);

  expect(genDiff(before, after, tree)).toEqual(result);
});

test('Config YAML test tree format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/treeTest.txt`, 'utf-8');
  const after = parser(`${__dirname}/../__fixtures__/after.yaml`);
  const before = parser(`${__dirname}/../__fixtures__/before.yaml`);

  expect(genDiff(before, after, tree)).toEqual(result);
});

test('Config INI test tree format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/treeTest.txt`, 'utf-8');
  const after = parser(`${__dirname}/../__fixtures__/after.ini`);
  const before = parser(`${__dirname}/../__fixtures__/before.ini`);

  expect(genDiff(before, after, tree)).toEqual(result);
});

test('Config JSON test Plain format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/plainTest.txt`, 'utf-8');
  const after = parser(`${__dirname}/../__fixtures__/after.json`);
  const before = parser(`${__dirname}/../__fixtures__/before.json`);

  expect(genDiff(before, after, plain)).toEqual(result);
});

test('Config YAML test Plain format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/plainTest.txt`, 'utf-8');
  const after = parser(`${__dirname}/../__fixtures__/after.yaml`);
  const before = parser(`${__dirname}/../__fixtures__/before.yaml`);

  expect(genDiff(before, after, plain)).toEqual(result);
});

test('Config INI test Plain format', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/plainTest.txt`, 'utf-8');
  const after = parser(`${__dirname}/../__fixtures__/after.ini`);
  const before = parser(`${__dirname}/../__fixtures__/before.ini`);

  expect(genDiff(before, after, plain)).toEqual(result);
});
