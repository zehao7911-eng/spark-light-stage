import { build } from "esbuild";
await build({
	entryPoints: ["src/app.js"],
	bundle: true,
	format: "esm",
	target: ["es2022"],
	outfile: "game.js",
	minify: true,
	legalComments: "eof",
});
