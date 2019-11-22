import fs from 'fs';
import genDiff from '../src';
import parser from '../src/parsers';

test('Config JSON test', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
  const after = parser(`${__dirname}/../__fixtures__/after.json`);
  const before = parser(`${__dirname}/../__fixtures__/before.json`);

  expect(genDiff(before, after)).toEqual(result);
});

test('Config YAML test', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
  const after = parser(`${__dirname}/../__fixtures__/after.yaml`);
  const before = parser(`${__dirname}/../__fixtures__/before.yaml`);

  expect(genDiff(before, after)).toEqual(result);
});

test('Config INI test', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
  const after = parser(`${__dirname}/../__fixtures__/after.ini`);
  const before = parser(`${__dirname}/../__fixtures__/before.ini`);

  expect(genDiff(before, after)).toEqual(result);
});
