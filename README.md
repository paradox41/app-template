# Angular Boilerplate

[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/paradox41/app-template)
[![Tag](https://img.shields.io/github/tag/paradox41/app-template.svg?style=flat)](https://github.com/paradox41/app-template)
[![Build](https://travis-ci.org/paradox41/app-template.svg)](https://travis-ci.org/paradox41/app-template)
[![David](https://david-dm.org/paradox41/app-template.svg)](https://github.com/paradox41/app-template)
[![devDependency Status](https://david-dm.org/paradox41/app-template/dev-status.svg)](https://david-dm.org/paradox41/app-template#info=devDependencies)
Boilerplate for my Angular apps

## Usage

Clone the repo or download the zip file. If you cloned, `rm -rf .git`

1. `make dependencies`
2. `gulp`

## Build

1. `make build`

## Style

### JavaScript
- Each module should be totally self-contained. Any functionality shared across modules should be moved into `common/`.
- Modules can have their own directives, services, filters, etc. If multiple files are needed in order to maintain file size,
a folder should be created (`directives/`, `services/`, etc) and the broken up files should be placed into their respective folders
with less abstract naming conventions.
- JavaScript files should always be as close as possible - preferably on the same level - as their HTML partials.
- If a directive has a partial - which they tend to - a new folder should be created that is named accordingly (meaning not something generic)
and the HTML partial and the JavaScript file should be placed together in that folder.

### Sass
- `app.scss` is merely a table of contents. There should be no Sass in the file.
- Each module is responsible for exporting its submodules. In other words, `app.scss` should only import top level modules.
- Sass that needs to be shared among modules should be moved into `assets/stylesheets/`.

### Modules

A typical module will look something like this:

```javascript
import _ from 'lodash';

class ExampleCtrl {
    constructor(data) {
        this.exampleData = data;
    }

    someMethod() {
        return _.map(this.exampleData, function(data) {
            return (data * 2);
        });
    }

    get data() {
        return this.exampleData;
    }
}

ExampleCtrl.$inject = ['data'];

function ExampleState($stateProvider) {
    $stateProvider.state('app.example', {
        controller: [
            'data',
            ExampleCtrl
        ],
        controllerAs: 'Example',
        url: '/example',
        template: require('./_example.html'),
        resolve: {
            data: [function() {
                return [1, 2, 3, 4, 5, 6];
            }]
        }
    });
}

ExampleState.$inject = ['$stateProvider'];

export default ExampleState;

export {
    ExampleCtrl
};
```

### Commit Conventions

Follow [conventional changelog](https://github.com/ajoslin/conventional-changelog/blob/master/CONVENTIONS.md)
