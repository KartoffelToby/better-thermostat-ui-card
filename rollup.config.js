import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import ignore from "./rollup-ignore-plugin.js";
import cssImports from 'rollup-plugin-import-css';
const IGNORED_FILES = [

];

const dev = process.env.ROLLUP_WATCH;

const serveOptions = {
    contentBase: ["./dist"],
    host: "0.0.0.0",
    port: 4000,
    allowCrossOrigin: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
};

const plugins = [
    ignore({
        files: IGNORED_FILES.map((file) => require.resolve(file)),
    }),
    resolve(),
    cssImports(),
    typescript({
        declaration: false,
    }),
    json(),
    commonjs(),
    babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
    }),
    terser({
        compress: {
            defaults: true
        },
        warnings: true,
        output: {
          comments: function (node, comment) {
            var text = comment.value;
            var type = comment.type;
            if (type == "comment2") {
              // multiline comment
              return /@preserve|@license|@cc_on/i.test(text);
            }
          },
        },
    }),
    ...(dev ? [serve(serveOptions)] : []),
];

export default [
    {
        input: "src/better-thermostat-ui.ts",
        output: {
            inlineDynamicImports: true,
            file: "dist/better-thermostat-ui-card.js",
            format: "es",
        },
        plugins,
        moduleContext: (id) => {
            const thisAsWindowForModules = [
                "node_modules/@formatjs/intl-utils/lib/src/diff.js",
                "node_modules/@formatjs/intl-utils/lib/src/resolve-locale.js",
            ];
            if (thisAsWindowForModules.some((id_) => id.trimRight().endsWith(id_))) {
                return "window";
            }
        },
    },
];