#!/usr/bin/env node

import program from 'commander';
import parser from '../utils/parsers';
import generateAst from '../utils/generateAst';
import render from '../formatters/index';

program
  .version('0.0.1')
  .arguments('format <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'tree')
  .action((firstConfig, secondConfig, { format: type }) => {
    const config1 = parser(firstConfig);
    const config2 = parser(secondConfig);
    const configsAst = generateAst(config1, config2);

    console.log(render(configsAst, type));
  });

program.parse(process.argv);
