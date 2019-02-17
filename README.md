# vuex-fullstory-plugin

A logging plugin to output vuex actions to Fullystory.

## Installation
`npm i --save vuex-fullstory-plugin`

## Usage
Ensure that Fullstory is already loaded in the head of your app. Then simply import/require the `vuex-fullstory-plugin` and configure it with your vuex store:
```js
import createPlugin from 'vuex-fullstory-plugin';

const fullstoryPlugin = createPlugin();

const store = new Vuex.Store({
  // ...
  plugins: [fullstoryPlugin]
});
```

If you'd like to scrub sensitive data from mutations, or prevent some types of mutations from being logged, you can pass a sanitizer function as the second argument to createPlugin.

The sanitizer function should take mutation and return a new object to log. If the sanitizer returns null, the mutation will not be logged.

```js
const fullstoryPlugin = createPlugin(function(mutation) {
  if (mutation.type === 'SET_SECRET_TOKEN') {
    return null;
  }

  return mutation;
})
```

## Getting started
1. Install dependencies
  * Run `yarn install` (recommended) or `npm install` to get the project's dependencies
  * Run `yarn build` or `npm run build` to produce minified version of the library.
2. Development mode
  * Having all the dependencies installed run `yarn dev` or `npm run dev`. This command will generate an non-minified version of the library and will run a watcher so you get the compilation on file change.
3. Running the tests
  * Run `yarn test` or `npm run test`. Can also run in watch mode with `yarn test:watch` or `npm run test:watch`

## Scripts

* `yarn build` or `npm run build` - produces production version of the library under the `lib` folder
* `yarn dev` or `npm run dev` - produces development version of the library and runs a watcher
* `yarn test` or `npm run test` - runs the tests
* `yarn test:watch` or `npm run test:watch` - same as above but in a watch mode
* `npm publish` - publishes a new version of the package to npm.
