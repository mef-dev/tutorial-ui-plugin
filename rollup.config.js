import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
// import copy from "rollup-plugin-copy-assets";
// import angular from "rollup-plugin-angular";
// import nodeResolve from "rollup-plugin-node-resolve";
//import replace from "rollup-plugin-replace";
//import uglify from "rollup-plugin-uglify";
//import sass from "node-sass";
//import CleanCSS from "clean-css";
//import { minify as minifyHtml } from "html-minifier";
//import { terser } from "rollup-plugin-terser";
import { PLUGIN_VERSION } from "./src/environments/version";

// const cssmin = new CleanCSS();
// const htmlminOpts = {
// 	caseSensitive: true,
// 	collapseWhitespace: true,
// 	removeComments: true,
// };
const pluginPath = `external_plugins/${PLUGIN_VERSION.name}-${PLUGIN_VERSION.version}`;

//let defaults = { compilerOptions: { declaration: true } };
//let override = { compilerOptions: { declaration: false } };
export default {
  input: "src/main-plugin.ts",
  output: [
    {
      file: `${pluginPath}/${PLUGIN_VERSION.name}-${PLUGIN_VERSION.version}.bundle.js`,
      format: "system",
      //format: "iife",
      //name: "bundle",
      //compact: true,
    },
    // поки не може підхопити iife без додаткових маніпуляції - білдити як ото є
    // {
    // 	file: `${pluginPath}/${PLUGIN_VERSION.name}-${PLUGIN_VERSION.version}.bundle.js`,
    // 	//format: "es",
    // 	name: "base",
    // 	//plugins: [terser()],
    // 	compact: true,
    // 	format: "iife",
    // 	sourceMap: "inline",
    // },
    // {
    // 	file: `${pluginPath}/${PLUGIN_VERSION.name}-${PLUGIN_VERSION.version}.bundle.min.js`,
    // 	//format: "es",
    // 	name: "bundle",
    // 	//plugins: [terser()],
    // 	//compact: true,
    // 	format: "es",
    // 	//sourceMap: "inline",
    // },
  ],
  plugins: [
    // copy({
    // 	assets: ["assets"],
    // }),
    resolve({
      // pass custom options to the resolve plugin
      customResolveOptions: {
        moduleDirectory: "node_modules",
      },
    }),

    typescript({
      typescript: require("typescript"),
      //tsconfigDefaults: defaults,
      //tsconfig: "tsconfig.json",
      //tsconfigOverride: override,
      objectHashIgnoreUnknownHack: true,
    }),

    // angular({
    // 	// additional replace `templateUrl` and `stylesUrls` in every `.js` file
    // 	// default: true
    // 	replace: true,
    // 	// preprocessors: {
    // 	// 	template: (template) => minifyHtml(template, htmlminOpts),
    // 	// 	style: (scss) => {
    // 	// 		const css = sass.renderSync({ data: scss }).css;
    // 	// 		return cssmin.minify(css).styles;
    // 	// 	},
    // 	// },
    // 	exclude: ["*.d.ts", "**/*.d.ts"],
    // 	clean: true,
    // }),
    // nodeResolve({ jsnext: true, main: true }),
    // replace({
    // 	ENV: JSON.stringify(process.env.NODE_ENV || "development"),
    // }),
    // process.env.NODE_ENV === "production" && uglify(),
  ],
  external: [
    "plugins-core",
    "@angular/core",
    "@angular/forms",
    "@angular/common",
    "@angular/common/http",
    "@angular/animations",
    "@ngx-translate",
    "@ngx-translate/core",
    "@ngx-translate/http-loader",
    "file-saver",
    "xlsx",
    "rxjs",
    "rxjs/internal/Subject",
    "ngx-bootstrap",
    "jqwidgets-scripts/jqwidgets-ng/jqxgrid",
    "jqwidgets-scripts/jqwidgets-ng/jqxdatetimeinput",
    "jqwidgets-scripts/jqwidgets-ng/jqxdropdownlist",
    "jqwidgets-scripts/jqwidgets-ng/jqxchart",
    "jqwidgets-scripts/jqwidgets-ng/jqxinput",
    "jqwidgets-scripts/jqwidgets-ng/jqxcombobox",
    "jqwidgets-scripts/jqwidgets-ng/jqxtooltip",
    "jqwidgets-scripts/jqwidgets-ng/jqxloader",
    "jqwidgets-scripts/jqwidgets-ng/jqxwindow",
    "jqwidgets-scripts/jqwidgets-ng/jqxexpander",
  ],
};
