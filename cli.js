#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs-extra';
import bendscript from 'bendscript/transpiler/index.js';

// Configure yargs to handle CLI arguments
const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 -i [input file] -o [output file]')
  .option('i', {
    alias: 'input',
    describe: 'Input file to read',
    type: 'string',
    demandOption: true
  })
  .option('o', {
    alias: 'output',
    describe: 'Output file to write',
    type: 'string',
    demandOption: true
  })
  .help('h')
  .alias('h', 'help')
  .argv;

// Read the input file
fs.readFile(argv.input, 'utf8')
  .then(content => {
    // Compile the content using bendscript
    const result = bendscript.eval.lang(content);

    // Write the compiled content to the output file
    return fs.writeFile(argv.output, result.value, 'utf8');
  })
  .then(() => {
    console.log(`File compiled successfully to ${argv.output}`);
  })
  .catch(err => {
    console.error(`Error: ${err.message}`);
  });
