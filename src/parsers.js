import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (pathToConfig) => {
  const absolutePath = path.isAbsolute(pathToConfig) ? pathToConfig : path.resolve(pathToConfig);
  const dataConfig = fs.readFileSync(absolutePath, 'utf-8');
  const typeConfig = path.extname(absolutePath).slice(1);

  const parsers = {
    json: JSON.parse,
    yaml: yaml.safeLoad,
    yml: yaml.safeLoad,
    ini: ini.parse,
  };

  return parsers[typeConfig](dataConfig);
};
