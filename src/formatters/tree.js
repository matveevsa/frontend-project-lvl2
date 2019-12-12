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
    const value = el.children.length > 0
      ? `{\n${f(el.children, count + 4)}\n${getDepth(count + 2)}}`
      : stringify(el.value, count + 2);
    return `${getDepth(count + 2)}${el.name}: ${value}`;
  },
  added: (el, count) => `${getDepth(count)}+ ${el.name}: ${stringify(el.value, count + 2)}`,
  deleted: (el, count) => `${getDepth(count)}- ${el.name}: ${stringify(el.value, count + 2)}`,
  changed: (el, count) => `${getDepth(count)}- ${el.name}: ${stringify(el.oldValue, count + 2)}\n${getDepth(count)}+ ${el.name}: ${stringify(el.newValue, count + 2)}`,
};

const renderTree = (data, count = 2) => data
  .map((el) => statusActions[el.status](el, count, renderTree))
  .join('\n');

const renderFinishTree = (tree) => `{\n${renderTree(tree)}\n}`;

export default renderFinishTree;
