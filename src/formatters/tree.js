import { isObject } from 'lodash';

const getSpace = (count) => ' '.repeat(count);

const stringify = (item, depth) => {
  if (!isObject(item)) {
    return item;
  }

  return `{${Object.entries(item)
    .map(([key, value]) => `\n${getSpace((depth + 1) * 4)}${key}: ${value}`).join('')}\n${getSpace(depth * 4)}}`;
};

const statusActions = {
  unchanged: ({ name, value }, depth) => `${getSpace(depth * 4)}${name}: ${stringify(value, depth)}`,
  hasChildren: ({ name, children }, depth, func) => `${getSpace(depth * 4)}${name}: {\n${func(children, depth)}\n${getSpace(depth * 4)}}`,
  added: ({ name, value }, depth) => `${getSpace(depth * 4 - 2)}+ ${name}: ${stringify(value, depth)}`,
  deleted: ({ name, value }, depth) => `${getSpace(depth * 4 - 2)}- ${name}: ${stringify(value, depth)}`,
  changed: ({ name, oldValue, newValue }, depth) => (
    `${getSpace(depth * 4 - 2)}- ${name}: ${stringify(oldValue, depth)}\n${getSpace(depth * 4 - 2)}+ ${name}: ${stringify(newValue, depth)}`
  ),
};

const renderTree = (data, depth = 0) => data
  .map((el) => statusActions[el.status](el, depth + 1, renderTree))
  .join('\n');

const renderFinishTree = (tree) => `{\n${renderTree(tree)}\n}`;

export default renderFinishTree;
