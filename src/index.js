import _ from 'lodash';

const genAst = (data1, data2) => {
  const unionData = { ...data1, ...data2 };
  const allKeys = Object.keys(unionData).sort();

  return allKeys.reduce((acc, key) => {
    const el = {
      name: key,
      value: '',
      valueOld: '',
      status: 'normal',
      children: [],
    };

    if (data1[key] instanceof Object && data2[key] instanceof Object) {
      return [...acc, {
        ...el,
        children: genAst(data1[key], data2[key]),
      }];
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return [...acc, {
        ...el,
        value: data1[key],
        status: 'deleted',
      }];
    }

    if (!_.has(data1, key) && _.has(data2, key)) {
      return [...acc, {
        ...el,
        value: data2[key],
        status: 'added',
      }];
    }

    if (_.has(data1, key) && _.has(data2, key) && (data1[key] !== data2[key])) {
      return [...acc, {
        ...el,
        value: data2[key],
        valueOld: data1[key],
        status: 'changed',
      }];
    }


    return [...acc, { ...el, value: data1[key] }];
  }, []);
};

const getDepth = (count = 0) => ' '.repeat(count);

const stringify = (item, count) => {
  if (item instanceof Object) {
    return Object.entries(item)
      .map(([key, value]) => `{\n${getDepth(count + 4)}${key}: ${value}\n${getDepth(count)}}`).join('');
  }
  return item;
};

const statusActions = {
  normal: (el, count, f) => {
    const value = el.children.length > 0 ? `{\n${f(el.children, count + 4)}\n${getDepth(count + 2)}}` : stringify(el.value, count + 2);
    return `${getDepth(count + 2)}${el.name}: ${value}`;
  },
  added: (el, count) => `${getDepth(count)}+ ${el.name}: ${stringify(el.value, count + 2)}`,
  deleted: (el, count) => `${getDepth(count)}- ${el.name}: ${stringify(el.value, count + 2)}`,
  changed: (el, count) => `${getDepth(count)}- ${el.name}: ${stringify(el.valueOld, count + 2)}\n${getDepth(count)}+ ${el.name}: ${stringify(el.value, count + 2)}`,
};

const render = (data, count) => `${data.map((el) => `${statusActions[el.status](el, count, render)}`).join('\n')}`;


export default (data1, data2) => {
  const ast = genAst(data1, data2);
  return `{\n${render(ast, 2)}\n}`;
};
