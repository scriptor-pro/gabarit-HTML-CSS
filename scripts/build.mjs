import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";
import { minify as minifyHtml } from "html-minifier-terser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const [indexHtml, appJs, styleCss] = await Promise.all([
  readFile(path.join(rootDir, "index.html"), "utf8"),
  readFile(path.join(rootDir, "app.js"), "utf8"),
  readFile(path.join(rootDir, "style.css"), "utf8"),
]);

const [{ code: appMin }, { code: styleMin }] = await Promise.all([
  transform(appJs, {
    loader: "js",
    minify: true,
    target: "es2018",
    charset: "utf8",
  }),
  transform(styleCss, {
    loader: "css",
    minify: true,
    target: "es2018",
    charset: "utf8",
  }),
]);

let distHtml = indexHtml
  .replace('href="style.css"', 'href="style.min.css"')
  .replace('src="app.js"', 'src="app.min.js"');

distHtml = await minifyHtml(distHtml, {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: false,
  minifyJS: false,
  keepClosingSlash: false,
  removeRedundantAttributes: true,
  removeAttributeQuotes: false,
  useShortDoctype: true,
});

await mkdir(distDir, { recursive: true });

await Promise.all([
  writeFile(path.join(distDir, "app.min.js"), appMin, "utf8"),
  writeFile(path.join(distDir, "style.min.css"), styleMin, "utf8"),
  writeFile(path.join(distDir, "index.html"), distHtml, "utf8"),
  copyFile(path.join(rootDir, "captions-fr.vtt"), path.join(distDir, "captions-fr.vtt")),
  copyFile(path.join(rootDir, "VERSION"), path.join(distDir, "VERSION")),
]);
