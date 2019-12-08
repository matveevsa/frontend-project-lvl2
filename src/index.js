import render from './formatters/index';
import generateAst from './utils/generateAst';

export default (beforeData, afterData) => {
  const ast = generateAst(beforeData, afterData);
  return render(ast);
};
