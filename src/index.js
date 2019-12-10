import render from './formatters/index';
import generateAst from './utils/generateAst';
import parser from './utils/parsers';

export default (pathToFile1, pathToFile2, type) => {
  const data1 = parser(pathToFile1);
  const data2 = parser(pathToFile2);

  const ast = generateAst(data1, data2);

  return render(ast, type);
};
