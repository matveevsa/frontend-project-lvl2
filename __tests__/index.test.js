import fs from 'fs';
import genDiff from '../src';

const before = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const after = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('fixtures test', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');

  expect(genDiff(before, after)).toEqual(result);
});
