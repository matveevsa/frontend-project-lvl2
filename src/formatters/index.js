import renderTree from './tree';
import renderPlain from './plain';
import renderJson from './json';

const renderFormats = {
  tree: (data) => renderTree(data),
  plain: (data) => renderPlain(data),
  json: (data) => renderJson(data),
};

export default (data, format) => renderFormats[format](data);
