import render from './formatters';
import generateAst from './generateAst';
import getData from './parsers';

export default (pathToFile1, pathToFile2, type) => {
  const data1 = getData(pathToFile1);
  const data2 = getData(pathToFile2);

  const ast = generateAst(data1, data2);

  return render(ast, type);
};
