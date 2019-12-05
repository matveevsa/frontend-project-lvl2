import renderTree from './tree';
import renderPlain from './plain';

const renderFormats = {
  tree: (data) => renderTree(data),
  plain: (data) => renderPlain(data),
};

export default (data, format) => renderFormats[format](data);
