import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

test.each`
  ext       | format     | expected
  ${'json'} | ${'tree'}  | ${'treeResult'}
  ${'json'} | ${'plain'} | ${'plainResult'}
  ${'json'} | ${'json'}  | ${'jsonResult'}
  ${'yaml'} | ${'tree'}  | ${'treeResult'}
  ${'yaml'} | ${'plain'} | ${'plainResult'}
  ${'yaml'} | ${'json'}  | ${'jsonResult'}
  ${'ini'}  | ${'tree'}  | ${'treeResult'}
  ${'ini'}  | ${'plain'} | ${'plainResult'}
  ${'ini'}  | ${'json'}  | ${'jsonResultIni'}
`('Test $ext format $format', ({ ext, format, expected }) => {
  const pathToFile1 = getFixturePath(`before.${ext}`);
  const pathToFile2 = getFixturePath(`after.${ext}`);
  const result = fs.readFileSync(getFixturePath(`${expected}.txt`), 'utf-8');

  expect(genDiff(pathToFile1, pathToFile2, format)).toEqual(result);
});

test('Test tree deep', () => {
  const pathToFile1 = getFixturePath('beforeDeep.json');
  const pathToFile2 = getFixturePath('afterDeep.json');
  const result = fs.readFileSync(getFixturePath('treeDeepResult.txt'), 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
});
