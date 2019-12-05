#!/usr/bin/env node

import program from 'commander';
import parser from '../utils/parsers';
import genDiff from '..';


program
  .version('0.0.1')
  .arguments('format <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'tree')
  .action((firstConfig, secondConfig, { format: type }) => {
    const config1 = parser(firstConfig);
    const config2 = parser(secondConfig);

    console.log(genDiff(config1, config2, type));
  });

program.parse(process.argv);
