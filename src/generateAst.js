import _ from 'lodash';

const generateAst = (beforeData, afterData) => {
  const keys = _.union(_.keys(beforeData), _.keys(afterData)).sort();

  return keys.map((key) => {
    const element = {
      name: key,
      value: '',
      status: 'unchanged',
      children: [],
    };

    if (_.isObject(beforeData[key]) && _.isObject(afterData[key])) {
      return {
        ...element,
        status: 'hasChildren',
        children: generateAst(beforeData[key], afterData[key]),
      };
    }

    if (_.has(beforeData, key) && !_.has(afterData, key)) {
      return {
        ...element,
        value: beforeData[key],
        status: 'deleted',
      };
    }

    if (!_.has(beforeData, key) && _.has(afterData, key)) {
      return {
        ...element,
        value: afterData[key],
        status: 'added',
      };
    }

    if (_.has(beforeData, key) && _.has(afterData, key) && (beforeData[key] !== afterData[key])) {
      return {
        ...element,
        newValue: afterData[key],
        oldValue: beforeData[key],
        status: 'changed',
      };
    }

    return { ...element, value: beforeData[key] };
  });
};

export default generateAst;
