const esbuild = require('esbuild')
const ElmPlugin = require('esbuild-plugin-elm')

esbuild.build({
  entryPoints: ['index.js'],
  bundle: true,
  outdir: '.',
  minify: true,
  plugins: [
    ElmPlugin({ debug: false, optimize: true })
  ],
}).catch(e => (console.error(e), process.exit(1)))
