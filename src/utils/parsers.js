import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (pathToConfig) => {
  const absolutePath = path.isAbsolute(pathToConfig) ? pathToConfig : path.resolve(`${pathToConfig}`);
  const dataConfig = fs.readFileSync(absolutePath, 'utf-8');
  const typeConfig = path.extname(absolutePath).toLocaleLowerCase();

  const parsers = {
    '.json': (data) => JSON.parse(data),
    '.yaml': (data) => yaml.safeLoad(data),
    '.yml': (data) => yaml.safeLoad(data),
    '.ini': (data) => ini.parse(data),
  };

  return parsers[typeConfig](dataConfig);
};
