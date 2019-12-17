import renderTree from './tree';
import renderPlain from './plain';

const renderFormats = {
  tree: renderTree,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (data, format = 'tree') => renderFormats[format](data);
