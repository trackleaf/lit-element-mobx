const { createDefaultConfig } = require('@open-wc/testing-karma')
const merge = require('deepmerge')

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        {
          pattern: config.grep ? config.grep : 'test/**/*.test.js',
          type: 'module'
        }
      ],

      // see the karma-esm docs for all options
      esm: {
        // if you are using 'bare module imports' you will need this option
        nodeResolve: true,
        babel: true,
        importMap: 'test/importmap.json',
        moduleDirs: [__dirname + '/src', 'node_modules']
      },

      // configuration for import map support
      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--enable-experimental-web-platform-features'
          ]
        },
        ChromeExt: {
          base: 'Chrome',
          flags: ['--enable-experimental-web-platform-features']
        }
      }
    })
  )
  return config
}
