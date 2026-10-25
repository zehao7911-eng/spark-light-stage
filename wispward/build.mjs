import {build} from 'esbuild';
const test=process.argv.includes('--test');
await build({entryPoints:[test?'tests/game.test.ts':'src/app.js'],bundle:true,format:test?'cjs':'iife',platform:test?'node':'browser',target:test?'node22':'es2020',outfile:test?'.test-bundle.cjs':'game.js',minify:!test,legalComments:'eof',banner:{js:'/*! Wispward. Includes PROXX game logic, Copyright 2019 Google Inc., Apache-2.0. See LICENSE and NOTICE.md. */'}});
