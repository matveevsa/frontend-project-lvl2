import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (pathToConfig) => {
  const absolutePath = path.isAbsolute(pathToConfig) ? pathToConfig : path.resolve(`${pathToConfig}`);
  const dataConfig = fs.readFileSync(absolutePath, 'utf-8');
  const typeConfig = path.extname(absolutePath).toLocaleLowerCase();

  const parsers = {
    '.json': (data) => JSON.parse(data),
    '.yaml': (data) => yaml.safeLoad(data),
  };

  return parsers[typeConfig](dataConfig);
};
