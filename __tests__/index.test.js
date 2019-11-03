import genDiff from './../src/';

const before = {
  host: "hexlet.io",
  timeout: 50,
  proxy: "123.234.53.22",
  follow: false,
};

const after = {
  timeout: 20,
  verbose: true,
  host: "hexlet.io",
};

const result = `  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true`;

test('Generator', () => {
  expect(genDiff(before, after)).toEqual(result);
});
