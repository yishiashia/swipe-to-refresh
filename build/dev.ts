import serve from 'rollup-plugin-serve'
import baseConfig from '../rollup.config'

const config = baseConfig[0];
config.plugins.concat([
    serve({
      open: true,
      host: 'localhost',
      port: 3001,
      contentBase: ['public', 'dist']
    })
]);
export default config