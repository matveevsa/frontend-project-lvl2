import _ from 'lodash';
import render from './formatters/index';

const generateAst = (beforeData, afterData) => {
  const unionData = { ...beforeData, ...afterData };
  const allKeys = Object.keys(unionData).sort();

  return allKeys.reduce((acc, key) => {
    const el = {
      name: key,
      value: '',
      valueOld: '',
      status: 'normal',
      children: [],
    };

    if (beforeData[key] instanceof Object && afterData[key] instanceof Object) {
      return [...acc, {
        ...el,
        children: generateAst(beforeData[key], afterData[key]),
      }];
    }

    if (_.has(beforeData, key) && !_.has(afterData, key)) {
      return [...acc, {
        ...el,
        value: beforeData[key],
        status: 'deleted',
      }];
    }

    if (!_.has(beforeData, key) && _.has(afterData, key)) {
      return [...acc, {
        ...el,
        value: afterData[key],
        status: 'added',
      }];
    }

    if (_.has(beforeData, key) && _.has(afterData, key) && (beforeData[key] !== afterData[key])) {
      return [...acc, {
        ...el,
        value: afterData[key],
        valueOld: beforeData[key],
        status: 'changed',
      }];
    }

    return [...acc, { ...el, value: beforeData[key] }];
  }, []);
};

export default (beforeData, afterData, format) => {
  const ast = generateAst(beforeData, afterData);
  return render(ast, format);
};
