# Angular Boilerplate

[![Tag](https://img.shields.io/github/tag/paradox41/app-template.svg?style=flat)](https://github.com/paradox41/app-template)
[![Build](https://travis-ci.org/paradox41/app-template.svg)](https://travis-ci.org/paradox41/app-template)
[![Dependency Status](https://david-dm.org/paradox41/app-template.svg)](https://david-dm.org/paradox41/app-template)
[![devDependency Status](https://david-dm.org/paradox41/app-template/dev-status.svg)](https://david-dm.org/paradox41/app-template#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/paradox41/app-template/badge.svg?branch=master&service=github)](https://coveralls.io/github/paradox41/app-template?branch=master)

## Summary

Angular 1.x starter kit featuring:
- [Angular](https://angularjs.org/)
- [Bootstrap](http://getbootstrap.com/)
- [Gulp](http://gulpjs.com/)
- [Webpack](https://webpack.github.io/)
- [Karma](https://karma-runner.github.io/)
- [Mocha](http://mochajs.org/)
- [Chai](http://chaijs.com/)
- [Conventional Changelog](https://github.com/ajoslin/conventional-changelog)

## Usage

Clone the repo or download the zip file. If you cloned, `rm -rf .git`

`npm install && npm run start`

## Build

`npm run build`

## Lint 

`npm run lint`

## Cutting Releases

Run `npm run <release-type>` where `release-type` is 'patch', 'minor' or 'major'

This will:

1. Lint and run tests
2. Build and cachebust into `./build`
3. Generate a changelog and tag the version appropriately.

### Commit Conventions

Follow [conventional changelog](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)

### Documentation

Documentation via [JSDoc](http://usejsdoc.org/)

1. `npm run docs`
2. `gulp documentation:serve`
