#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import path from 'path';
import genDiff from '..';

program
  .version('0.0.1')
  .arguments('format <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const pathFirstConfig = path.resolve('data', `${firstConfig}`);
    const pathSecondConfig = path.resolve('data', `${secondConfig}`);

    const dataFirstConfig = fs.readFileSync(pathFirstConfig, 'utf-8');
    const dataSecondConfig = fs.readFileSync(pathSecondConfig, 'utf-8');
    const objectFromDataFirst = JSON.parse(dataFirstConfig);
    const objectFromDataSecond = JSON.parse(dataSecondConfig);

    console.log(genDiff(objectFromDataFirst, objectFromDataSecond));
  });

program.parse(process.argv);
