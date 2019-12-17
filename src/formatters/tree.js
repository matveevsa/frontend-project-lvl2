import _ from 'lodash';

const getDepth = (count = 0) => ' '.repeat(count);

const stringify = (item, count) => {
  if (!_.isObject(item)) {
    return item;
  }

  return Object.entries(item)
    .map(([key, value]) => `{\n${getDepth(count + 4)}${key}: ${value}\n${getDepth(count)}}`).join('');
};

const statusActions = {
  unchanged: ({ name, value }, count) => `${getDepth(count + 2)}${name}: ${stringify(value, count + 2)}`,
  hasChildren: (el, count, func) => `${getDepth(count + 2)}${el.name}: {\n${func(el.children, count + 4)}\n${getDepth(count + 2)}}`,
  added: (el, count) => `${getDepth(count)}+ ${el.name}: ${stringify(el.value, count + 2)}`,
  deleted: (el, count) => `${getDepth(count)}- ${el.name}: ${stringify(el.value, count + 2)}`,
  changed: (el, count) => `${getDepth(count)}- ${el.name}: ${stringify(el.oldValue, count + 2)}\n${getDepth(count)}+ ${el.name}: ${stringify(el.newValue, count + 2)}`,
};

const renderTree = (data, count = 2) => data
  .map((el) => statusActions[el.status](el, count, renderTree))
  .join('\n');

const renderFinishTree = (tree) => `{\n${renderTree(tree)}\n}`;

export default renderFinishTree;
