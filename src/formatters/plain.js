const getValue = (value) => (value instanceof Object ? '[complex value]' : value);

const stringifyPath = (path) => path.join('.');

const statusActions = {
  normal: ({ children }, path, f) => (children.length > 0 ? f(children, path) : ''),
  added: ({ value }, path) => `Property '${stringifyPath(path)}' was added with value: ${getValue(value)}`,
  deleted: (_, path) => `Property '${stringifyPath(path)}' was removed`,
  changed: ({ value, valueOld }, path) => (
    `Property '${stringifyPath(path)}' was updated. From ${getValue(valueOld)} to ${getValue(value)}`
  ),
};

const renderPlain = (data, path = []) => data
  .map((el) => statusActions[el.status](el, path.concat(el.name), renderPlain))
  .filter((el) => el !== '')
  .join('\n');

export default renderPlain;
