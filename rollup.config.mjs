import {
  getBabelInputPlugin,
  getBabelOutputPlugin,
} from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import ignore from "./rollup-ignore-plugin.js";
import alias from "@rollup/plugin-alias";
import path from "path";

const IGNORED_FILES = [
  "@material/mwc-notched-outline/mwc-notched-outline.js",
  "@material/mwc-ripple/mwc-ripple.js",
  "@material/mwc-list/mwc-list.js",
  "@material/mwc-list/mwc-list-item.js",
  "@material/mwc-menu/mwc-menu.js",
  "@material/mwc-menu/mwc-menu-surface.js",
  "@material/mwc-icon/mwc-icon.js",
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
  alias({
    entries: [
      { find: "@lit-labs/observers/resize-controller", replacement: path.resolve(__dirname, "node_modules/@lit-labs/observers/resize-controller.js") }
    ]
  }),
  ignore({
    files: IGNORED_FILES.map((file) => require.resolve(file)),
  }),
  typescript({
    tsconfig: "tsconfig.build.json",
    declaration: false,
  }),
  nodeResolve(),
  json(),
  commonjs(),
  getBabelInputPlugin({
    babelHelpers: "bundled",
    exclude: ["node_modules/**"],
    include: ["src/**"],
    extensions: [".js", ".ts"],
  }),
  getBabelOutputPlugin({
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
        },
      ],
    ],
    compact: true,
  }),
  ...(dev ? [serve(serveOptions)] : [terser()]),
];

export default [
  {
    input: "src/better-thermostat-ui-card.ts",
    output: {
      dir: "dist",
      format: "es",
      inlineDynamicImports: true,
      // Prepend a guard to prevent duplicate customElements.define calls
      // This ensures that, when the bundle is loaded on a page that
      // registers the same custom element from another bundle or module,
      // the define call is only effective once and a console warning is issued.
      banner:
        'const _customElementsDefine = window.customElements.define;\n' +
        'window.customElements.define = (name, cl, conf) => {\n' +
        '  if (!customElements.get(name)) {\n' +
        '    _customElementsDefine.call(window.customElements, name, cl, conf);\n' +
        '  }\n' +
        '  else {\n' +
        '    console.warn(`BT UI: ${name} is loaded use the other`);\n' +
        '  }\n' +
        '};',
    },
    plugins,
    // Don't treat local ha-frontend source files as external; only exclude node_modules and core libs
    // Only mark Node builtin modules as external; bundle everything else so
    // 'lit' and other ESM modules are included in the output bundle.
    external: (id) => id.startsWith('node:'),
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