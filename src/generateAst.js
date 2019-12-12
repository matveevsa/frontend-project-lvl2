import _ from 'lodash';

const generateAst = (beforeData, afterData) => {
  const keys = _.union(_.keys(beforeData), _.keys(afterData)).sort();

  return keys.map((key) => {
    const el = {
      name: key,
      value: '',
      status: 'normal',
      children: [],
    };

    if (_.isObject(beforeData[key]) && _.isObject(afterData[key])) {
      return {
        ...el,
        children: generateAst(beforeData[key], afterData[key]),
      };
    }

    if (_.has(beforeData, key) && !_.has(afterData, key)) {
      return {
        ...el,
        value: beforeData[key],
        status: 'deleted',
      };
    }

    if (!_.has(beforeData, key) && _.has(afterData, key)) {
      return {
        ...el,
        value: afterData[key],
        status: 'added',
      };
    }

    if (_.has(beforeData, key) && _.has(afterData, key) && (beforeData[key] !== afterData[key])) {
      return {
        ...el,
        newValue: afterData[key],
        oldValue: beforeData[key],
        status: 'changed',
      };
    }

    return { ...el, value: beforeData[key] };
  });
};

export default generateAst;
