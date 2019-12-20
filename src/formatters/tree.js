import { isObject } from 'lodash';

const getCountSpace = (countSpace = 0) => ' '.repeat(countSpace);

const stringify = (item, countSpace) => {
  if (!isObject(item)) {
    return item;
  }

  return `{${Object.entries(item)
    .map(([key, value]) => `\n${getCountSpace(countSpace + 4)}${key}: ${value}`).join('')}\n${getCountSpace(countSpace)}}`;
};

const statusActions = {
  unchanged: ({ name, value }, countSpace) => `${getCountSpace(countSpace + 2)}${name}: ${stringify(value, countSpace + 2)}`,
  hasChildren: ({ name, children }, countSpace, func) => `${getCountSpace(countSpace + 2)}${name}: {\n${func(children, countSpace + 4)}\n${getCountSpace(countSpace + 2)}}`,
  added: ({ name, value }, countSpace) => `${getCountSpace(countSpace)}+ ${name}: ${stringify(value, countSpace + 2)}`,
  deleted: ({ name, value }, countSpace) => `${getCountSpace(countSpace)}- ${name}: ${stringify(value, countSpace + 2)}`,
  changed: ({ name, oldValue, newValue }, countSpace) => (
    `${getCountSpace(countSpace)}- ${name}: ${stringify(oldValue, countSpace + 2)}\n${getCountSpace(countSpace)}+ ${name}: ${stringify(newValue, countSpace + 2)}`
  ),
};

const renderTree = (data, countSpace = 2) => data
  .map((el) => statusActions[el.status](el, countSpace, renderTree))
  .join('\n');

const renderFinishTree = (tree) => `{\n${renderTree(tree)}\n}`;

export default renderFinishTree;
