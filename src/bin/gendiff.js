#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('0.0.1')
  .arguments('format <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'tree')
  .action((firstConfig, secondConfig, { format: type }) => {
    const difference = genDiff(firstConfig, secondConfig, type);
    console.log(difference);
  });

program.parse(process.argv);
