import fs from 'fs';
import path from 'path';
import render from './formatters';
import generateAst from './generateAst';
import parse from './parsers';

export default (pathToConfig1, pathToConfig2, type) => {
  const dataConfig1 = fs.readFileSync(path.resolve(pathToConfig1), 'utf-8');
  const typeConfig1 = path.extname(pathToConfig1).slice(1);

  const dataConfig2 = fs.readFileSync(path.resolve(pathToConfig2), 'utf-8');
  const typeConfig2 = path.extname(pathToConfig2).slice(1);

  const data1 = parse(dataConfig1, typeConfig1);
  const data2 = parse(dataConfig2, typeConfig2);

  const ast = generateAst(data1, data2);

  return render(ast, type);
};
