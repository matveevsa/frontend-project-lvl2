#!/usr/bin/env node

import program from 'commander';
import parser from '../parsers';
import genDiff from '..';


program
  .version('0.0.1')
  .arguments('format <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', '.json')
  .action((firstConfig, secondConfig) => {
    const config1 = parser(firstConfig);
    const config2 = parser(secondConfig);

    console.log(genDiff(config1, config2));
  });

program.parse(process.argv);
