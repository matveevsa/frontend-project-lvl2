import _ from 'lodash';

export default (data1, data2) => {
  const unionData = { ...data1, ...data2 };
  const allKeys = Object.keys(unionData);

  const result = allKeys.reduce((acc, key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return [...acc, `- ${key}: ${data1[key]}`];
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return [...acc, `+ ${key}: ${data2[key]}`];
    }
    if (data1[key] !== data2[key]) {
      return [...acc, `+ ${key}: ${data2[key]}\n- ${key}: ${data1[key]}`];
    }
    return [...acc, `  ${key}: ${data1[key]}`];
  }, []);

  return result.join('\n');
};
