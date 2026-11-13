import {build} from 'esbuild';
const test=process.argv.includes('--test');
await build({entryPoints:[test?'tests/game.test.js':'src/app.js'],bundle:true,format:test?'cjs':'iife',platform:test?'node':'browser',target:test?'node22':'es2020',outfile:test?'.test-bundle.cjs':'game.js',minify:!test,legalComments:'eof',banner:{js:'/*! Bramblepost. Includes match-three-js, Copyright (c) 2016 Playtester\'s Kitchen, MIT. See LICENSE and NOTICE.md. */'}});
